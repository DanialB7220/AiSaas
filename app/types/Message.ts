export interface Message {
    _id: string;
    user: string;
    role: string;
    content?: string;
    prompt?: string;
    timestamp: string; // ISO string representation
}
