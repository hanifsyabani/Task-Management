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
      if (response.ok) {
        const data = await response.json();
        setCompletedTasks(data.completed);
      } else {
        throw new Error("Failed to fetch tasks");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  
  return (
    <div >
      <Header title="Completed" />
      <Card tasks={completedTasks} loadings ={loading}/>
    </div>
  );
}
