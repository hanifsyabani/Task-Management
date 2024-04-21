"use client";

import { useState } from "react";
import { TfiMenu } from "react-icons/tfi";
import Item from "./Item";

export default function Sidebar() {
  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      <div
        className={`lg:hidden bg-tertiary h-screen w-1/2 border border-gray-600 rounded-xl fixed top-20 ${
          sidebar ? "left-0" : "-left-[12.5rem]"
        } transition-all`}
      >
        <TfiMenu
          size={40}
          className="text-white absolute top-[4rem] -right-10 bg-tertiary border border-gray-600 p-2 rounded-tr-md rounded-br-md cursor-pointer"
          onClick={() => setSidebar(!sidebar)}
        />

        <Item setSidebar={setSidebar} />
      </div>

      <div className="hidden lg:block fixed h-screen w-[17%] bg-tertiary border border-gray-600 rounded-xl">
        <h1 className="text-white font-bold text-2xl p-3">
          Remind<span className="text-green-500">ME</span>
        </h1>

        <Item />
      </div>
    </>
  );
}
