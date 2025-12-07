import { NextResponse } from "next/server";
import { loginUser } from "@/services/auth.service";
import { signJwtAccessToken } from "@/lib/jwt";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = await loginUser({ email, password });

    const accessToken = signJwtAccessToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });
    const { password: _hashedPassword, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "Login Successful.",
        user: userWithoutPassword,
        accessToken: accessToken,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    let errorMessage = "Login failed.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log("Login Error: ", errorMessage);

    return NextResponse.json({ message: errorMessage }, { status: 401 });
  }
};
