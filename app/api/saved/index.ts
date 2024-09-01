// pages/api/saved/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongoDB from '@/lib/mongodb'; // Your database connection function
import mongoose from 'mongoose';

// Define a Mongoose schema and model for messages (if not defined elsewhere)
const messageSchema = new mongoose.Schema({
    content: String,
    prompt: String,
    role: String,
    timestamp: Date,
}, { collection: 'messages' });

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectMongoDB(); // Ensure the database is connected

    switch (req.method) {
        case 'GET':
            const { page = 1, limit = 5 } = req.query; // Default to page 1 and 5 messages per page

            try {
                const messages = await Message.find({})
                    .skip((Number(page) - 1) * Number(limit))
                    .limit(Number(limit))
                    .exec();

                const totalMessages = await Message.countDocuments();
                const totalPages = Math.ceil(totalMessages / Number(limit));

                res.status(200).json({
                    messages,
                    totalPages
                });
            } catch (err) {
                res.status(500).json({ error: 'Failed to fetch messages' });
            }
            break;

        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
