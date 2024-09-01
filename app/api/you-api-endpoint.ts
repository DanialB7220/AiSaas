// pages/api/your-api-endpoint.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { checkApiLimit, increaseApiLimit } from '@/lib/apilimit';
import { NextResponse } from 'next/server';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const canProceed = await checkApiLimit();

    if (!canProceed) {
      return res.status(429).json({ message: "API limit exceeded" });
    }

    // Your API logic here

    await increaseApiLimit();
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handler;
