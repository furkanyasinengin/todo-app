import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";

export const registerUser = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}): Promise<User> => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new Error("User already exits.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return newUser;
};
