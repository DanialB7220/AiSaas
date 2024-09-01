// pages/api/saved/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongoDB from '@/lib/mongodb';
import Message from '@/models/Message';
import { ObjectId } from 'mongodb'; // Import ObjectId for converting the string ID to ObjectId

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectMongoDB(); // Ensure DB is connected

    switch (req.method) {
        case 'DELETE':
            const { id } = req.query;
            
            if (typeof id === 'string') { // Ensure id is a string
                try {
                    // Convert the id to ObjectId
                    const objectId = new ObjectId(id);
                    
                    // Attempt to delete the document
                    const result = await Message.deleteOne({ _id: objectId });
                    
                    // Check if the deletion was successful
                    if (result.deletedCount === 0) {
                        return res.status(404).json({ error: 'Message not found' });
                    }
                    
                    res.status(200).json({ message: 'Message deleted' });
                } catch (err) {
                    console.error('Error deleting message:', err); // Log error details
                    res.status(500).json({ error: 'Failed to delete message' });
                }
            } else {
                res.status(400).json({ error: 'Invalid message ID' });
            }
            break;

        default:
            res.setHeader('Allow', ['DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
