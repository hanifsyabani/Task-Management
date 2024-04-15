import { IoMdClose } from "react-icons/io";

export default function FormAddTask({ setModal }: any) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[35rem] rounded-xl bg-secondary p-4">
      <div className="flex justify-between">
        <h1>Add Task</h1>
        <IoMdClose
          size={25}
          className="text-red-500 cursor-pointer"
          onClick={() => setModal(false)}
        />
      </div>
    </div>
  );
}
