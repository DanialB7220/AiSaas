// pages/api/saved.ts
import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Message from '@/models/Message';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        await connectMongoDB();
        const messages = await Message.find({ user: userId }).sort({ timestamp: -1 }).exec();

        return NextResponse.json(messages);
    } catch (error) {
        console.error('[SAVED_ERROR]', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
