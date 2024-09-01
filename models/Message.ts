// models/Message.ts
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    user: { type: String, required: true },
    role: { type: String, required: true },
    content: { type: String, required: false },
    prompt: { type: String, required: false },
    timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default Message;