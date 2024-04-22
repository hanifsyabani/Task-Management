'use client'
import Card from "@/Components/Card/Card";
import Header from "@/Components/Header/Header";
import { useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
}
export default function Completed() {
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  async function fetchCompletedTasks() {
    setLoading(true);
    try {
      const response = await fetch("/api/task");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setCompletedTasks(data.completed);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <div>
      <Header title="Completed" api="completed" />
      <Card tasks={completedTasks} loadings={loading} />
    </div>
  );
}
