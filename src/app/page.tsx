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
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    setLoading(true);
    try {
      const response = await fetch("/api/task");
      if (response.ok) {
        const data = await response.json();
        setTasks(data.task);
      } else {
        throw new Error("Failed to fetch tasks");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <div>
      <Header title="All Tasks" />
      <Card tasks={tasks} loadings ={loading} />
    </div>
  );
}
