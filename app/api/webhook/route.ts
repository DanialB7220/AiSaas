import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import { stripe } from "@/lib/stripe";
import UserSub from "@/models/UserSub";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        await connectMongoDB(); // Ensure DB is connected before any other logic

        if (event.type === "checkout.session.completed") {
            const session = event.data.object as unknown as Stripe.Checkout.Session;
            const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

            if (!session?.metadata?.userId) {
                return new NextResponse("UserId not found", { status: 400 });
            }

            const sub = new UserSub({
                user: session?.metadata?.userId,
                stripeCustomerId: subscription.customer,
                stripeSubscriptionId: subscription.id as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            });
            await sub.save();
        } else if (event.type === "invoice.payment_succeeded") {
            const session = event.data.object as unknown as Stripe.Checkout.Session;
            const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

            const userSub = await UserSub.findOne({ stripeCustomerId: subscription.customer as string });

            if (!userSub) {
                return new NextResponse("User Subscription not found", { status: 400 });
            }

            userSub.stripeCurrentPeriodEnd = new Date(subscription.current_period_end * 1000);
            await userSub.save();
        }

        return new NextResponse('Success', { status: 200 });

    } catch (error: any) {
        console.error(`Webhook Error: ${error.message}`);
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 401 });
    }
}
