import Card from "@/Components/Card/Card";
import Header from "@/Components/Header/Header";
import AddTaskCard from '@/Components/Card/AddTaskCard'

export default function Home() {
  return (
    <div>
      <Header title="All Tasks" />
      <div className="flex gap-6 items-center mt-10">
        <Card />
        <AddTaskCard/>
      </div>
    </div>
  );
}
