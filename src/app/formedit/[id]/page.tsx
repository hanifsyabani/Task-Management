"use client";

import { Spinner, useToast } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
}

export default function FormEdit() {
  const [task, setTask] = useState({} as Task);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    async function fetchTaskByid() {
      const taskId = params.id;
      setLoading(true);
      try {
        const res = await fetch(`/api/task/${taskId}`);
        if (res.ok) {
          const data = await res.json();
          setTask(data);
        } else {
          toast({
            title: "Task not found.",
            description: "Please check your task and try again.",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right",
            variant: "top-accent",
          });
          setLoading(false);
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTaskByid();
  }, []);

  const handleInput = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const inputValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setTask((old) => ({ ...old, [name]: inputValue }));
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    const taskId = params.id;
    try {
      const res = await fetch(`/api/task/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (res.ok) {
        toast({
          title: "Task updated.",
          description: "We've updated your task for you.",
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top-right",
          variant: "top-accent",
        });
        router.push("/");
      } else {
        toast({
          title: "Task failed to update.",
          description: "Please check your task and try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
          variant: "top-accent",
        });
        setLoading(false);
        throw new Error("Failed to update task");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-white font-semibold text-lg">Edit Task</h1>
        <MdOutlineKeyboardBackspace
          size={25}
          className="text-white cursor-pointer"
          onClick={() => router.back()}
        />
      </div>
      <form className="mt-7" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-white text-semibold mb-3"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="e.g Buy groceries"
            value={task?.title || ""}
            onChange={handleInput}
            className="text-sm bg-primary px-2 py-3 rounded-md w-full outline-none text-gray-200"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-white text-semibold mb-3"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={task?.description || ""}
            onChange={handleInput}
            placeholder="e.g Buy grocires from the market"
            className="text-sm bg-primary px-2 py-3 rounded-md w-full outline-none text-gray-200 h-24"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-white text-semibold mb-3">
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={task?.date || ""}
            onChange={handleInput}
            placeholder="e.g Buy groceries"
            className="text-sm bg-primary px-2 py-3 rounded-md w-full outline-none text-gray-200"
          />
        </div>
        <div className="flex justify-between my-4">
          <p className="text-gray-200 text-sm">Completed</p>
          <input
            type="checkbox"
            name="completed"
            id="completed"
            onChange={handleInput}
            value={task?.isCompleted ? "true" : "false"}
          />
        </div>
        <div className="flex justify-between">
          <p className="text-gray-200 text-sm">Important!</p>
          <input
            type="checkbox"
            name="important"
            id="important"
            onChange={handleInput}
            value={task?.isImportant ? "true" : "false"}
          />
        </div>

        <div className="flex items-center justify-center gap-4 bg-purple-600 py-2 px-3 text-sm rounded-lg w-44 text-white font-semibold mt-5 hover:bg-purple-800 transition-all mx-auto ">
          <FaPlus size={15} className="text-white cursor-pointer" />
          <button type="submit">{loading ? <Spinner /> : "Update Task"}</button>
        </div>
      </form>
    </div>
  );
}
