import { NextResponse } from "next/server";
import { registerUser } from "@/services/auth.service";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Email, password and name are required." },
        { status: 400 }
      );
    }

    const newUser = await registerUser({ email, password, name });

    return NextResponse.json(
      { message: "Signup Successful.", user: newUser },
      { status: 201 }
    );
  } catch (error: unknown) {
    let errorMessage = "Signup failed.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log("Signup Error: ", errorMessage);

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
};
