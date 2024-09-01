import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import UserSub from "@/models/UserSub";
import connectMongoDB from "@/lib/mongodb";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
    try {
        await connectMongoDB();
        const { userId } = auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        console.log("[DEBUG] userId:", userId);
        console.log("[DEBUG] user:", user);
        console.log("[DEBUG] settingsUrl:", settingsUrl);

        const userSubscription = await UserSub.findOne({ user: userId });
        console.log("[DEBUG] userSubscription:", userSubscription);

        if (userSubscription && userSubscription.stripeCustomerId) {
            try {
                const stripeSession = await stripe.billingPortal.sessions.create({
                    customer: userSubscription.stripeCustomerId,
                    return_url: settingsUrl,
                    
                });

                return new NextResponse(JSON.stringify({ url: stripeSession.url }));


            } catch (error) {
                console.error("[STRIPE_ERROR]", error);
            }
        }

        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "Liberator Pro",
                            description: "Unlock all the features of Liberator Pro and get access to Unlimited AI Powers",
                        },
                        unit_amount: 1000000,
                        recurring: {
                            interval: "month",
                        }
                    },
                    quantity: 1,
                }
            ],
            metadata: {
                userId,
            },
        });

        return new NextResponse(JSON.stringify({ url: stripeCheckoutSession.url }));
    } catch (error) {
        console.error("[STRIPE_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

