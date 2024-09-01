import { stripe } from '@/lib/stripe';
import mongoose from 'mongoose';

const userSubSchema = new mongoose.Schema({
    user: { type: String, required: true },
    stripeCustomerId: { type: String, required: true },
    stripeSubscriptionId: { type: String, required: true },
    stripePriceId: { type: String, required: true },
    stripeCurrentPeriodEnd: { type: Date, required: true },
    timestamp: { type: Date, default: Date.now },
});

const UserSub = mongoose.models.UserSub || mongoose.model('UserSub', userSubSchema);

export default UserSub;