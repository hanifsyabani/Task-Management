import { FaCirclePlus } from "react-icons/fa6";


export default function Header({ title, setModal }: { title: string, setModal?: any }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-white font-bold text-xl">{title}</h1>
        <hr className="w-10 " />
      </div>
      <FaCirclePlus size={30} className="text-white cursor-pointer" onClick={() => setModal(true)} />
    </div>
  );
}
