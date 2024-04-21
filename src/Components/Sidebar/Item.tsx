import { usePathname } from "next/navigation";
import { IoHome, IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import Link from "next/link";
import { sideItem } from "./SideItem";

export default function Item({ setSidebar }: { setSidebar?: any }) {
  const pathname = usePathname();
  return (
    <div className="mt-40">
      {sideItem.map((item, i) => (
        <Link href={`${item.path}`} key={i} onClick={() => setSidebar(false)}>
          <div
            className={`flex items-center gap-5 group hover:bg-secondary py-4  justify-center transition-all hover:border-r-4 hover:border-green-600 ${
              pathname === `${item.path}`
                ? "bg-secondary border-r-4 border-green-600"
                : "bg-tertiary"
            }`}
          >
            {i === 0 && <IoHome size={25} className="text-white" />}
            {i === 1 && <FaTasks size={25} className="text-white" />}
            {i === 2 && (
              <IoCheckmarkDoneCircle size={25} className="text-white" />
            )}
            {i === 3 && <MdEditDocument size={25} className="text-white" />}
            <h1 className="text-gray-400 font-semibold">{item.name}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
}
