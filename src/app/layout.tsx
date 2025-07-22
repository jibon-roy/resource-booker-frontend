import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import ReduxStoreProvider from "@/redux/ReduxStoreProvider";
import MyContextProvider from "@/lib/MyContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resource Booker",
  description: "Book shared resources with conflict detection",
  generator: "Jibon Krishna Roy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <ReduxStoreProvider>
            <MyContextProvider>
              <Navigation />
              <main>{children}</main>
            </MyContextProvider>
          </ReduxStoreProvider>
        </div>
      </body>
    </html> 
  );
}
