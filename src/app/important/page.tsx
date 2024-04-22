'use client'

import Card from '@/Components/Card/Card';
import Header from '@/Components/Header/Header'
import React, { useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
}

export default function Important() {
  const [importantTasks, setImportantTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImportantTasks();
  }, []);

  async function fetchImportantTasks() {
    setLoading(true);
    try {
      const response = await fetch("/api/task");
      if(!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setImportantTasks(data.important);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  return (
    <div>
      <Header title="Important" api="important" />
      <Card tasks={importantTasks} loadings={loading} />
    </div>
  );
}
