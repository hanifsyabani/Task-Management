import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import DarkModeProvider from "@/context/Darkmode";
import Layout from "@/Components/Layout/Layouts";

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
        <NextTopLoader color="#ffffff" />
        <DarkModeProvider>
          <h1 className="text-white bg-primary font-bold text-2xl p-3 lg:hidden">
            Remind<span className="text-green-500">ME</span>
          </h1>
          <Layout>
            {children}
          </Layout>
        </DarkModeProvider>
      </body>
    </html>
  );
}
