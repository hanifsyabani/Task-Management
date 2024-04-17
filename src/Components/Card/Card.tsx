"use client";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import AddCardTask from "./AddTaskCard";
import { Spinner } from "@chakra-ui/react";

interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
}

export default function Card({tasks, loadings} : {tasks:Task[], loadings :boolean}) {
  
  return (
    <div className="flex flex-wrap items-center gap-6 mt-10">
      {loadings ? (
        <div className="absolute top-1/2 left-[60%] transform -translate-x-1/2 -translate-y-1/2">
          <Spinner color="white" size={"xl"}/>
        </div>
      ) : (
        <>
          {tasks.map((task) => (
            <div
              className="w-72 bg-secondary p-3 rounded-lg border border-gray-500 h-56"
              key={task.id}
            >
              <h1 className="text-white text-xl font-semibold">{task.title}</h1>
              <p className="text-sm text-gray-200 py-5">{task.description}</p>
              <p className="text-white font-semibold text-sm">{task.date}</p>
              <div className="flex justify-between items-center">
                <button
                  className={`px-3 py-1 mt-2 rounded-full text-white font-semibold text-sm ${
                    task.isCompleted ? "bg-green-600" : "bg-gray-600"
                  }`}
                >
                  {task.isCompleted ? "Completed" : "Incomplete"}
                </button>
                <div className="flex items-center gap-4">
                  <MdEditDocument
                    size={20}
                    className="text-gray-400 cursor-pointer"
                  />
                  <FaTrash size={20} className="text-gray-400 cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
          <AddCardTask />
        </>
      )}
    </div>
  );
}
