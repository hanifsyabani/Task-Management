import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Sidebar from "@/Components/Sidebar/Sidebar";
import { Providers } from "./provider";
import NextTopLoader from "nextjs-toploader";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RemindME",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/next.svg" />
      <body className={montserrat.className}>
        <h1 className="text-white bg-primary font-bold text-2xl p-3 lg:hidden">
          Remind<span className="text-green-500">ME</span>
        </h1>
        <div className="bg-primary px-2 py-6 w-full lg:flex h-full min-h-screen">
          <NextTopLoader color="#ffffff" />
          <Sidebar />
          <main className="lg:ml-[20%] bg-tertiary p-4 rounded-xl border border-gray-600 w-full">
            <Providers>{children}</Providers>
          </main>
        </div>
      </body>
    </html>
  );
}
