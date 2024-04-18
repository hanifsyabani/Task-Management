import Link from "next/link";
import { FaCirclePlus } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";

export default function Header({ title }: { title: string }) {

  async function handleDelete() {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");

      if (!confirm) {
        return;
      }

      const res =await fetch("/api/task", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if(res.ok) {
        window.location.reload();
      } else {
        throw new Error("Failed to delete task");
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-white font-bold text-xl">{title}</h1>
        <hr className="w-10 " />
      </div>
      <div className="flex items-center gap-3">
        <Link href={"/formadd"}>
          <FaCirclePlus size={30} className="text-white cursor-pointer" />
        </Link>
        <MdOutlineDelete size={30} className="text-white cursor-pointer" onClick={handleDelete} />
      </div>
    </div>
  );
}
