import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default function AddTaskCard() {

  return (
    <Link href={'/formadd'}>
    <div className="w-72  p-3 rounded-lg border border-gray-500 h-56 flex justify-center items-center cursor-pointer hover:bg-gray-700">
      <div className="flex justify-center items-center gap-3">
        <FaPlus size={20} className="text-gray-400" />
        <h1 className="text-gray-400 text-lg">Add Task New</h1>
      </div>
    </div>
    </Link>
  );
}
