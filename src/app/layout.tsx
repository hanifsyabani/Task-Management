import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Sidebar from "@/Components/Sidebar/Sidebar";
import { Providers } from "./provider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <div className="bg-primary px-2 py-6 w-full lg:flex min-h-screen">
          <Sidebar />
          <main className="lg:ml-[20%] bg-tertiary p-4 rounded-xl border border-gray-600 w-full">
            <Providers>{children}</Providers>
          </main>
        </div>
      </body>
    </html>
  );
}
