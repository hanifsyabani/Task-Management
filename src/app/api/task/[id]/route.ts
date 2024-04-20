import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
    const task = await prisma.task.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}


// delete
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.task.delete({ where: { id :  Number(params.id) } });
    return NextResponse.json({ message: "Task Deleted" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

// put
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const {  title, description, date, isCompleted, isImportant } =
    await req.json();
  try {
    await prisma.task.update({
      where: {
        id : Number(params.id),
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

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { isCompleted } = await req.json();

  try {
    await prisma.task.update({
      where: {
        id : Number(params.id),
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

