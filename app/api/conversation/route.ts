import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import { updateFreeUsageCount, checkApiLimit } from "@/lib/apiLimit";
import { checkSubscription } from "@/lib/subscription";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("API key is not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const isFreeUsageAvailable = await checkApiLimit(userId);
    const isPremium = await checkSubscription();
    if (!(isFreeUsageAvailable || isPremium))
      return new NextResponse("Free trail has been expired", { status: 403 });

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    if (isFreeUsageAvailable) {
      await updateFreeUsageCount(userId);
    }

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("CONVERSATION_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
