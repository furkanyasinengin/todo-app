import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

interface UpdateUserProfileParams {
  userId: string;
  name?: string;
  image?: string;
}

export const updateUserProfile = async ({
  userId,
  name,
  image,
}: UpdateUserProfileParams) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      image,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });

  return user;
};

interface UpdatePasswordParams {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

export const updateUserPassword = async ({
  userId,
  currentPassword,
  newPassword,
}: UpdatePasswordParams) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || !user.password) {
    throw new Error("User not found");
  }

  const isValid = await bcrypt.compare(currentPassword, user.password);

  if (!isValid) {
    throw new Error("Invalid current password");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  return true;
};

export const deleteUser = async (userId: string) => {
  await prisma.user.delete({
    where: { id: userId },
  });

  return true;
};
