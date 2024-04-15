'use client'

import Card from "@/Components/Card/Card";
import Header from "@/Components/Header/Header";
import AddTaskCard from '@/Components/Card/AddTaskCard'
import { useState } from "react";
import FormAddTask from "@/Components/Form/FormAddTask";

export default function Home() {

  const[openModal, setOpenModal] = useState(false);
  return (
    <div>
      <Header title="All Tasks" />
      <div className="flex gap-6 items-center mt-10">
        <Card />
        <AddTaskCard modal={openModal} setModal={setOpenModal}  />
      </div>
      {openModal && <FormAddTask setModal={setOpenModal} />}
    </div>
  );
}
