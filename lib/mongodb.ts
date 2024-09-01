// lib/mongodb.ts
import mongoose from 'mongoose';

const URI: string = process.env.MONGODB_URI || '';

let isConnected: boolean = false;

export default async function connectMongoDB() {
    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect(URI);
        isConnected = true;
        console.log("DB connected!");
    } catch (error) {
        throw new Error("Failed to connect to DB");
    }
}

// Compare this snippet from app/api/hello.ts:
