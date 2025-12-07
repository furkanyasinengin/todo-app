import { prisma } from "@/lib/prisma";
import { Priority } from "@prisma/client";

interface CreateTodoData {
  title: string;
  category: string;
  description?: string;
  priority?: Priority;
  dueDate?: string | Date;
}

export const getTodoList = async (userId: string) => {
  return prisma.todo.findMany({
    where: { authorId: userId },
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
