import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";
import { updateUserPassword } from "@/services/user.service";

export const PATCH = async (req: Request) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const decoded = token ? verifyJwt(token) : null;

    if (!decoded || !decoded.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    await updateUserPassword({
      userId: decoded.id as string,
      currentPassword,
      newPassword,
    });

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    let errorMessage = "Operation failed";
    let status = 500;

    if (error instanceof Error) {
      if (error.message === "Invalid current password") {
        errorMessage = "Current password is wrong";
        status = 400;
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json({ message: errorMessage }, { status: status });
  }
};
