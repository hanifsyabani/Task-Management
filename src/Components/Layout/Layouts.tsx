"use client";

import Sidebar from "@/Components/Sidebar/Sidebar";
import { Providers } from "@/app/provider";
import { Darkmode } from "@/context/Darkmode";
import { useContext } from "react";

export default function Layout({ children }: any) {
  const { darkMode, setDarkMode } = useContext(Darkmode);
  return (
    <div
      className={`${
        darkMode ? "bg-primary " : "bg-white"
      } px-2 py-6 w-full lg:flex h-full min-h-screen`}
    >
      <Sidebar />
      <main className={`lg:ml-[20%] ${darkMode ? "bg-tertiary" : "bg-white"} p-4 rounded-xl border border-gray-600 w-full`}>
        <Providers>{children}</Providers>
      </main>
    </div>
  );
}
