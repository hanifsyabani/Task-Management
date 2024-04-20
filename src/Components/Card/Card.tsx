"use client";

import { FaTrash } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import AddCardTask from "./AddTaskCard";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
}

export default function Card({
  tasks,
  loadings,
}: {
  tasks: Task[];
  loadings: boolean;
}) {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLElement | null>(null);

  async function deleteById(id: any) {
    try {
      const response = await fetch(`/api/task/id`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      if (response.ok) {
        toast({
          title: "Task deleted.",
          description: "We've deleted your task for you.",
          status: "error",
          duration: 900,
          isClosable: true,
          position: "top",
          variant: "top-accent",
        });

        setTimeout(() => {
          window.location.reload();
        }, 900);
      } else {
        toast({
          title: "Failed to delete task.",
          description: "We've failed to delete your task for you.",
          status: "error",
          duration: 1000,
          isClosable: true,
          position: "top",
          variant: "top-accent",
        });
        throw new Error("Failed to delete task");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCompleted(id: any, isCompleted: boolean) {
    const confirm = window.confirm(
      "Are you sure you want to complete this task?"
    )
    if(!confirm) return;
    
    try {
      const res = await fetch("/api/task/id", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, isCompleted }),
      });

      if (res.ok) {
        toast({
          title: "Task updated.",
          description: "We've updated your task for you.",
          status: "success",
          duration: 500,
          isClosable: true,
          position: "top",
          variant: "top-accent",
        });
        setTimeout(() => {
          window.location.reload();
        }, 510);
      } else {
        toast({
          title: "Failed to update task.",
          description: "We've failed to update your task for you.",
          status: "error",
          duration: 1000,
          isClosable: true,
          position: "top",
          variant: "top-accent",
        });
        throw new Error("Failed to update task");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-6 mt-10 px-7">
        {loadings ? (
          <div className="absolute top-1/2 left-[60%] transform -translate-x-1/2 -translate-y-1/2">
            <Spinner color="white" size={"xl"} />
          </div>
        ) : (
          <>
            {tasks.map((task) => (
              <>
                <div
                  className={`w-72 bg-secondary p-3 rounded-lg border  h-56 ${
                    task.isImportant ? "border-red-600" : "border-gray-500"
                  }`}
                  key={task.id}
                >
                  <h1 className="text-white text-xl font-semibold">
                    {task.title}
                  </h1>
                  <p className="text-sm text-gray-200 py-5">
                    {task.description
                      ? task.description.length > 50
                        ? task.description.slice(0, 50) + "..."
                        : task.description
                      : ""}
                  </p>
                  <p className="text-white font-semibold text-sm mt-7">
                    {task.date}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <button
                      className={`px-3 py-1 mt-2 rounded-full text-white font-semibold text-sm ${
                        task.isCompleted ? "bg-green-600" : "bg-gray-600"
                      }`}
                      onClick={() =>
                        updateCompleted(task.id, !task.isCompleted)
                      }
                    >
                      {task.isCompleted ? "Completed" : "Incomplete"}
                    </button>
                    <div className="flex items-center gap-4">
                      <MdEditDocument
                        size={20}
                        className="text-gray-400 cursor-pointer"
                      />
                      <FaTrash
                        size={20}
                        className="text-gray-400 cursor-pointer hover:text-red-500"
                        onClick={onOpen}
                      />
                    </div>
                  </div>
                </div>

                {/* modal for delete */}
                <AlertDialog
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Task
                      </AlertDialogHeader>

                      <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button
                          colorScheme="red"
                          onClick={() => deleteById(task.id)}
                          ml={3}
                        >
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </>
            ))}

            <AddCardTask />
          </>
        )}
      </div>
    </>
  );
}
