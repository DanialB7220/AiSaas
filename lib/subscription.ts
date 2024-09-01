// import { auth } from "@clerk/nextjs/server";
// import connectMongoDB from "@/lib/mongodb";
// import UserSub from "@/models/UserSub";

// const DAY_IN_MS = 86_400_000; // One day in milliseconds

// export const checkSubscription = async () => {
//     const { userId } = auth();

//     if (!userId) {
//         return false; // User is not authenticated
//     }

//     await connectMongoDB(); // Connect to MongoDB

//     // Find the user's subscription in the database
//     const userSubscription = await UserSub.findOne({ user: userId });

//     if (!userSubscription) {
//         return false; // User does not have an active subscription
//     }

//     const currentTime = new Date().getTime();
//     const subscriptionEnd = new Date(userSubscription.stripeCurrentPeriodEnd).getTime();

//     // Add a day (grace period) to the subscription end time
//     const gracePeriodEnd = subscriptionEnd + DAY_IN_MS;

//     // Check if the subscription is still active within the grace period
//     if (gracePeriodEnd > currentTime) {
//         return true; // User has an active subscription within the grace period
//     } else {
//         return false; // User's subscription (and grace period) has expired
//     }
// };


import { auth } from "@clerk/nextjs/server";
import connectMongoDB from "@/lib/mongodb";
import UserSub from "@/models/UserSub";

const DAY_IN_MS = 86_400_000; // One day in milliseconds

export const checkSubscription = async () => {
    try {
        // Get the authenticated user ID
        const { userId } = auth();

        if (!userId) {
            return false; // User is not authenticated
        }

        // Connect to MongoDB
        await connectMongoDB();

        // Find the user's subscription in the database
        const userSubscription = await UserSub.findOne({ user: userId });

        if (!userSubscription) {
            return false; // User does not have an active subscription
        }

        // Ensure stripeCurrentPeriodEnd is a valid date
        const subscriptionEnd = new Date(userSubscription.stripeCurrentPeriodEnd).getTime();

        if (isNaN(subscriptionEnd)) {
            console.error("Invalid subscription end date:", userSubscription.stripeCurrentPeriodEnd);
            return false; // Invalid date format
        }

        const currentTime = Date.now();
        const gracePeriodEnd = subscriptionEnd + DAY_IN_MS;

        // Check if the subscription is still active within the grace period
        return gracePeriodEnd > currentTime;
    } catch (error) {
        console.error("Error checking subscription:", error);
        return false; // Handle unexpected errors

        console.log(checkSubscription);
    }
};
