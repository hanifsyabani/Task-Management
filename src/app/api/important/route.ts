import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    await prisma.task.deleteMany({ where: { isImportant: true } });
    return NextResponse.json({ message: "Task Deleted" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}