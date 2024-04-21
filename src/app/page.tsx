'use client'

import Card from "@/Components/Card/Card";
import Header from "@/Components/Header/Header";
import { useFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
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
      const response = await useFetch("/api/task");
      setTasks(response.task);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <div>
      <Header title="All Tasks" api="task" />
      <Card tasks={tasks} loadings={loading} />
    </div>
  );
}
