import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";
import { addTodoList, getTodoList } from "@/services/todo.service";
import { Priority } from "@prisma/client";

const getAuthenticatedUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized: No token found.");
  }

  const decoded = verifyJwt(token);

  if (!decoded || !decoded.id) {
    throw new Error("Unauthorized: Invalid token.");
  }

  return decoded.id as string;
};

export const GET = async (req: Request) => {
  try {
    const userId = await getAuthenticatedUser();

    const todoList = await getTodoList(userId);

    return NextResponse.json(
      { message: "Fetched todo list.", data: todoList },
      { status: 200 }
    );
  } catch (error) {
    let errorMessage = "Todo list fecthing failed.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log("Fetch Error: ", errorMessage);

    const status = errorMessage.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json({ message: errorMessage }, { status });
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const {
      title,
      category = "General",
      description,
      priority,
      dueDate,
    } = body;

    const userId = await getAuthenticatedUser();

    if (!title) {
      return NextResponse.json(
        { message: "Title is required." },
        { status: 400 }
      );
    }
    const newTodo = await addTodoList(userId, {
      title,
      category,
      description,
      priority: priority as Priority,
      dueDate,
    });

    return NextResponse.json(
      { message: "New task added.", data: newTodo },
      { status: 201 }
    );
  } catch (error) {
    let errorMessage = "Task adding failed.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log("Task Add Error: ", errorMessage);

    const status = errorMessage.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json({ message: errorMessage }, { status });
  }
};
