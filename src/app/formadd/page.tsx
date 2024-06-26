'use client'

import { FaPlus } from "react-icons/fa";
import { ChangeEvent, useContext, useState } from "react";
import { useToast, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Darkmode } from "@/context/Darkmode";

export default function FormAdd() {
  const [tasks, setTasks] = useState({});
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { darkMode, setDarkMode } = useContext(Darkmode);

  const handleInput = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const inputValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setTasks((old) => ({ ...old, [name]: inputValue }));
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tasks),
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Task created.",
          description: "We've created your task for you.",
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top-right",
          variant: "top-accent",
        });
      } else {
        toast({
          title: "Task failed to create.",
          description: "Please check your task and try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
          variant: "top-accent",
        });
        setLoading(false);
        throw new Error(data.error);
      }
      setTasks({});
      setLoading(false);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="lg:p-4">
      <div className="flex justify-between">
        <h1
          className={`${
            darkMode ? "text-white" : "text-green-500"
          } font-semibold text-lg`}
        >
          Create Task
        </h1>
        <MdOutlineKeyboardBackspace
          size={25}
          className={`${darkMode ? "bg-transparent":"bg-green-500"} rounded-full text-white cursor-pointer`}
          onClick={() => router.back()}
        />
      </div>
      <form className="lg:mt-7 mt-14" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className={`block ${
              darkMode ? "text-white" : "text-tertiary"
            } text-semibold mb-3`}
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="e.g Buy groceries"
            onChange={handleInput}
            className={`text-sm ${
              darkMode ? "bg-primary text-gray-200 " : "bg-white text-black border border-gray-300"
            } px-2 py-3 rounded-md w-full outline-none `}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className={`block ${
              darkMode ? "text-white" : "text-tertiary"
            } text-semibold mb-3`}
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            onChange={handleInput}
            placeholder="e.g Buy grocires from the market"
            className={`text-sm ${
              darkMode ? "bg-primary text-gray-200" : "bg-white text-black border border-gray-300"
            } px-2 py-3 rounded-md w-full outline-none h-24`}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="date"
            className={`block ${
              darkMode ? "text-white" : "text-tertiary"
            } text-semibold mb-3`}
          >
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            onChange={handleInput}
            placeholder="e.g Buy groceries"
            className={`text-sm ${
              darkMode ? "bg-primary text-gray-200" : "bg-white text-black border border-gray-300"
            } px-2 py-3 rounded-md w-full outline-none `}
          />
        </div>
        <div className="flex justify-between my-4">
          <p className={`${darkMode ? "text-gray-200" : "text-black"} text-sm`}>
            Completed
          </p>
          <input
            type="checkbox"
            name="completed"
            id="completed"
            onChange={handleInput}
          />
        </div>
        <div className="flex justify-between">
          <p className={`${darkMode ? "text-gray-200" : "text-black"} text-sm`}>
            Important!
          </p>
          <input
            type="checkbox"
            name="important"
            id="important"
            onChange={handleInput}
          />
        </div>

        <div className="flex items-center justify-center gap-4 bg-purple-600 py-2 px-3 text-sm rounded-lg w-36 text-white font-semibold mt-5 hover:bg-purple-800 transition-all mx-auto cursor-pointer ">
          <FaPlus size={15} className="text-white" />
          <button type="submit">{loading ? <Spinner /> : "Create Task"}</button>
        </div>
      </form>
    </div>
  );
}
