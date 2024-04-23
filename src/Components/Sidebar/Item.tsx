import { usePathname } from "next/navigation";
import { IoHome, IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import Link from "next/link";
import { sideItem } from "./SideItem";
import { useContext } from "react";
import { Darkmode } from "@/context/Darkmode";

export default function Item({ setSidebar }: { setSidebar?: any }) {
  const pathname = usePathname();
  const { darkMode, setDarkMode } = useContext(Darkmode);
  return (
    <div className="mt-40">
      {sideItem.map((item, i) => (
        <Link href={`${item.path}`} key={i} onClick={() => setSidebar(false)}>
          <div
            className={`flex items-center gap-5 group ${darkMode ?"hover:bg-secondary": "hover:bg-green-800"} py-4  justify-center transition-all hover:border-r-4 hover:border-green-600 ${
              pathname === `${item.path}`
                ? `${
                    darkMode ? "bg-secondary" : "bg-white"
                  } border-r-4 border-green-600`
                : `${darkMode ? "bg-tertiary" : "bg-green-500"}`
            }`}
          >
            {i === 0 && (
              <IoHome
                size={25}
                className={`${darkMode ? "text-white" : "text-secondary"}`}
              />
            )}
            {i === 1 && (
              <FaTasks
                size={25}
                className={`${darkMode ? "text-white" : "text-secondary"}`}
              />
            )}
            {i === 2 && (
              <IoCheckmarkDoneCircle
                size={25}
                className={`${darkMode ? "text-white" : "text-secondary"}`}
              />
            )}
            {i === 3 && (
              <MdEditDocument
                size={25}
                className={`${darkMode ? "text-white" : "text-secondary"}`}
              />
            )}
            <h1
              className={`${
                darkMode ? "text-gray-400" : "text-primary"
              } font-semibold`}
            >
              {item.name}
            </h1>
          </div>
        </Link>
      ))}
    </div>
  );
}
