import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// delete
export async function DELETE(req: Request) {
  const { id } = await req.json();

  try {
    await prisma.task.delete({ where: { id } });
    return NextResponse.json({ message: "Task Deleted" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

// put
export async function PUT(req: Request) {
  const { id, title, description, date, isCompleted, isImportant } =
    await req.json();
  try {
    await prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        date,
        isCompleted,
        isImportant,
      },
    });
    return NextResponse.json({ message: "Task Updated" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function PATCH(req: Request) {
  const { id, isCompleted } = await req.json();

  try {
    await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted,
      },
    });

    return NextResponse.json({ message: "Task Updated" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
