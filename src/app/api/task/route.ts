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
    return NextResponse.json({ error: "Error Creating Task" }, { status: 500 });
  }
}
