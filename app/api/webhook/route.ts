import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import prismaDb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let stripeEvent: Stripe.Event;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook error: ${error.message}`, { status: 400 });
  }

  const session = stripeEvent.data.object as Stripe.Checkout.Session;

  if (stripeEvent.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    if (!session?.metadata?.userId) {
      return new NextResponse("User Id is required", { status: 400 });
    }

    await prismaDb.userSubscriptionModel.create({
      data: {
        userId: session?.metadata?.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  if (stripeEvent.type === "customer.subscription.updated") {
    if (stripeEvent.data.object.canceled_at !== null) {
      await prismaDb.userSubscriptionModel.delete({
        where: {
          stripeSubscriptionId: stripeEvent.data.object.id,
        },
      });
    }
  }
  return new NextResponse(null, { status: 200 });
}
