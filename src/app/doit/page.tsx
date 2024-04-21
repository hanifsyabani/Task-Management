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

export default function Doit() {
  const [doItTasks, setDoItTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDoItTasks();
  }, []);

  async function fetchDoItTasks() {
    setLoading(true);
    try {
      const response = await useFetch("/api/task");
      setDoItTasks(response.doit);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <div>
      <Header title="Do it Task" api="doit" />
      <Card tasks={doItTasks} loadings={loading} />
    </div>
  );
}
