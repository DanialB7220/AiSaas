
import { User, auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import Message from "@/models/Message";
import connectMongoDB from "@/lib/mongodb";
import { checkApiLimit } from "@/lib/apilimit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
});

export async function POST(
    req: Request,
) {
    try{
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;
        console.log(prompt);

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        if(!prompt){
            return new NextResponse("Prompt is required", {status: 400});
        }

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();

        if(!freeTrial && !isPro){
            return new NextResponse("Your Free Trial Has Expired :(", {status: 403});
        }

        const input = {
            prompt_a: prompt
        };

        const output = await replicate.run("riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05", { input });
    

        connectMongoDB();
        const message = new Message({ user: userId, role: "Music", prompt: prompt });
        await message.save();

        return NextResponse.json(output);

    } catch (error) {
        console.error("[MUSIC_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

