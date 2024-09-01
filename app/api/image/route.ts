import { Data } from './../../../node_modules/unified/index.d';

import { User, auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import Message from "@/models/Message";
import connectMongoDB from "@/lib/mongodb";
import { checkApiLimit } from '@/lib/apilimit';
import { checkSubscription } from '@/lib/subscription';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,

});

export async function POST(
    req: Request,
) {
    try{
        const { userId } = auth();
        const body = await req.json();
        const { prompt, amount, resolution, quality } = body;
        console.log(prompt);

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        if(!prompt){
            return new NextResponse("Prompt is required", {status: 400});
        }


        if(!resolution){
            return new NextResponse("Resolution is required", {status: 400});
        }

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();


        if(!freeTrial && !isPro){
            return new NextResponse("Your Free Trial Has Expired :(", {status: 403});
        }

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            n: 1,
            quality: "hd",
            size: resolution,
        });
        connectMongoDB();
        const message = new Message({ user: userId, role: "image", content:amount, prompt: prompt });
        await message.save();

        return new NextResponse(JSON.stringify(response.data), { status: 200 });

    } catch (error) {
        console.error("[IMAGE_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
