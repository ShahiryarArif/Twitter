import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function serverAuth (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    throw new Error('Not signed in');
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  if(!currentUser) {
    throw new Error('Not signed in');
  }

  return { currentUser };
}
