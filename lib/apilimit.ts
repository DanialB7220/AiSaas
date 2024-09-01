import { auth } from "@clerk/nextjs/server";
import { GOD, MAX_FREE_COUNTS } from "@/constants";
import Message from "@/models/Message";
import connectToDatabase from '@/lib/mongodb';


export const increaseApiLimit = async (): Promise<boolean> => {
  await connectToDatabase();
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  // Check if the userId matches the special user
  // if (userId === 'user_2hVf0LE6UGySvda3O8mAGO2voIH') {
  //   return true; // Ignore the API limit for this user
  // }

  const userApiUsage = await Message.countDocuments({ user: userId });

  if (userApiUsage >= MAX_FREE_COUNTS) {
    // If the user has reached the limit, still increase the count
    await Message.create({ user: userId, role: 'api', content: 'API Limit Reached' });
  } else {
    await Message.create({ user: userId, role: 'api', content: 'API Request' });
  }

  return true;
}

export const checkApiLimit = async (): Promise<boolean> => {
  await connectToDatabase();
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  // Check if the userId matches the special user
  // if (userId === 'user_2hVf0LE6UGySvda3O8mAGO2voIH') {
  //   return true; // Ignore the API limit for this user
  // }

  const userApiUsage = await Message.countDocuments({ user: userId });

  if (userApiUsage >= MAX_FREE_COUNTS) {
    return false;
  }

  return true;
}

export const getApiLimitCount = async (): Promise<number> => {
  await connectToDatabase();
  const { userId } = auth();

  // if (userId === 'user_2hVf0LE6UGySvda3O8mAGO2voIH') {
  //   return GOD; // Ignore the API limit for this user
  // }

  if (!userId) {
    return 0;
  }

  const userApiUsage = await Message.countDocuments({ user: userId });

  return userApiUsage;
}
