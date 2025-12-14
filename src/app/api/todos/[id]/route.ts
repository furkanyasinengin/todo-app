import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";
import { deleteTodo, updateTodo } from "@/services/todo.service";
import { Priority } from "@prisma/client";

const getAuthenticatedUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = verifyJwt(token);

  if (!decoded || !decoded.id) {
    throw new Error("Unauthorized");
  }

  return decoded.id as string;
};

export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const userId = await getAuthenticatedUser();
    const { id } = await params;
    const body = await req.json();
    const { title, description, priority, category, dueDate, isCompleted } =
      body;

    await updateTodo(userId, id, {
      title,
      category,
      description,
      priority: priority as Priority,
      dueDate,
      isCompleted,
    });
    return NextResponse.json({ message: "Updated" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const userId = await getAuthenticatedUser();
    const { id } = await params;

    await deleteTodo(userId, id);
    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
};
