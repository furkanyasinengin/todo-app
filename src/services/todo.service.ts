import { prisma } from "@/lib/prisma";
import { Priority } from "@prisma/client";

interface CreateTodoData {
  title: string;
  category: string;
  description?: string;
  priority?: Priority;
  dueDate?: string | Date;
}

interface UpdateTodoData {
  title?: string;
  category?: string;
  description?: string;
  priority?: Priority;
  dueDate?: string | Date;
  isCompleted?: boolean;
}

export const getTodoList = async (
  userId: string,
  search?: string,
  priority?: string
) => {
  return prisma.todo.findMany({
    where: {
      authorId: userId,
      title: { contains: search || "", mode: "insensitive" },
      priority:
        priority && priority !== "ALL" ? (priority as Priority) : undefined,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const addTodoList = async (userId: string, data: CreateTodoData) => {
  return prisma.todo.create({
    data: {
      authorId: userId,
      title: data.title,
      category: data.category,
      description: data.description,
      priority: data.priority || "MEDIUM",
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
    },
  });
};

export const updateTodo = async (
  userId: string,
  todoId: string,
  data: UpdateTodoData
) => {
  return prisma.todo.updateMany({
    where: {
      id: todoId,
      authorId: userId,
    },
    data: {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    },
  });
};

export const deleteTodo = async (userId: string, todoId: string) => {
  return prisma.todo.deleteMany({
    where: {
      id: todoId,
      authorId: userId,
    },
  });
};
