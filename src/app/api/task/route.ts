import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, description, date, completed, important } = await req.json();

    if (!title || !description || !date) {
      return NextResponse.json({ error: "Missing Data" }, { status: 400 });
    }

    if(title.length <3){
      return NextResponse.json({ error: "Title too short" }, { status: 400 });
    }

    const task = await prisma.task.create({
      data:{
        title,
        description,
        date,
        isCompleted: completed,
        isImportant:important,
      }
    })

    return NextResponse.json({ task }, { status: 201 });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function GET() {
  try {
    const task = await prisma.task.findMany();

    const completed = await prisma.task.findMany({
      where: {
        isCompleted: true,
      },
    });

    const doit = await prisma.task.findMany({
      where: {
        isCompleted: false,
      },
    });

    const important = await prisma.task.findMany({
      where: {
        isImportant: true,
      },
    });

    const responseData = {
      task,
      completed,
      doit,
      important,
    };
    return NextResponse.json(responseData);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function DELETE() {
  try {
    await prisma.task.deleteMany();
    return NextResponse.json({ message: "Task Deleted" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}