import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJwt } from "@/lib/jwt";
import { cookies } from "next/headers";
import { updateUserProfile } from "@/services/user.service";

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const decoded = token ? verifyJwt(token) : null;

    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, image } = body;

    const updatedUser = await updateUserProfile({
      userId: decoded.id as string,
      name,
      image,
    });

    return NextResponse.json(
      {
        message: "Profile updated successfully.",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    let errorMessage = "Update failed.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log("Profile Update Error: ", errorMessage);

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
