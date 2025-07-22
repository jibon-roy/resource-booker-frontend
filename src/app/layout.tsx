import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import { Container } from "@/components/ui-library/container";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resource Booker",
  description: "Book shared resources with conflict detection",
  generator: "v0.dev",
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
          <Navigation />
          <main className="mx-auto px-4 py-8">
            <Container>{children}</Container>
          </main>
        </div>
      </body>
    </html>
  );
}
