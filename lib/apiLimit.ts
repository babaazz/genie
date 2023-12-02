import prismaDb from "@/lib/prismadb";
import { MAX_API_LIMIT } from "@/constants";

export const updateFreeUsageCount = async (userId: string) => {
  const userApiLimit = await prismaDb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (userApiLimit) {
    await prismaDb.userApiLimit.update({
      where: {
        userId,
      },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await prismaDb.userApiLimit.create({
      data: { userId, count: 1 },
    });
  }
};

export const checkApiLimit = async (userId: string) => {
  const userApiLimit = await prismaDb.userApiLimit.findUnique({
    where: { userId },
  });

  return !userApiLimit || userApiLimit.count < MAX_API_LIMIT;
};

export const getFreeTrialCount = async (userId: string) => {
  const userApiLimit = await prismaDb.userApiLimit.findUnique({
    where: { userId },
  });

  if (!userApiLimit) return 0;

  return userApiLimit.count;
};
