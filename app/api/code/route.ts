import { checkApiLimit } from "@/lib/apilimit";
import connectMongoDB from "@/lib/mongodb";
import { checkSubscription } from "@/lib/subscription";
import Message from "@/models/Message";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,

});


const instructionMessage: any = {
    role: "system",
    content: "You are a Code Generator. You must only answer in markdown code snippets, Use code comments for explanations, Explain in addition to the code explaining everything step by step dont forget the explanation.",
};

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
            return new NextResponse("Messages is required", {status: 400});
        }
        
        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();


        if(!freeTrial && !isPro){
            return new NextResponse("Your Free Trial Has Expired :(", {status: 403});
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [instructionMessage, { role: "user", content: prompt}],
        });

        connectMongoDB();
        const message = new Message({ user: userId, role: "code", content: response.choices[0].message.content, prompt: prompt });
        await message.save();

        return new NextResponse(response.choices[0].message.content);
    } catch (error) { {
        console.error("[CODE_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
}
