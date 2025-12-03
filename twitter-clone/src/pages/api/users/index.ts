import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching current user:', error);
    return res.status(400).end();
  }
}
