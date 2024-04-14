import { FaTrash } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";

export default function Card() {
  return (
    <div className=" flex items-center gap-6">
      <div className="w-72 bg-secondary p-3 rounded-lg border border-gray-500 h-56">
        <h1 className="text-white text-xl font-semibold">Judul </h1>
        <p className="text-sm text-gray-200 py-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum neque
          eveniet ipsam deserunt
        </p>
        <p className="text-white font-semibold text-sm">13/10/2024</p>
        <div className="flex justify-between items-center">
          <button className="bg-green-600 px-3 py-1 mt-2 rounded-full text-white font-semibold text-sm">
            Completed
          </button>
          <div className="flex items-center gap-4">
            <MdEditDocument size={20} className="text-gray-400 cursor-pointer" />
            <FaTrash size={20} className="text-gray-400 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}
