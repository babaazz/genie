import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

import { updateFreeUsageCount, checkApiLimit } from "@/lib/apiLimit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompts are required", { status: 400 });
    }

    const isFreeUsageAvailable = await checkApiLimit(userId);
    const isPremium = await checkSubscription();
    if (!(isFreeUsageAvailable || isPremium))
      return new NextResponse("Free trail has been expired", { status: 403 });

    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt,
        },
      }
    );

    if (isFreeUsageAvailable) {
      await updateFreeUsageCount(userId);
    }

    return NextResponse.json(response);
  } catch (error) {
    console.log("MUSICAL_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
