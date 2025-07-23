"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Plus,
  LayoutDashboard,
  Menu as MenuIcon,
  X as CloseIcon,
} from "lucide-react";
import { Container } from "../ui-library/container";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navItems = [
    { href: "/", label: "Book Resource", icon: Plus },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/calendar", label: "Calendar View", icon: CalendarDays },
  ];

  const drawerVariants = {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
    exit: {
      x: "-100%",
      transition: { duration: 0.3, ease: "easeInOut" as const },
    },
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 relative z-50">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                ResourceBooker
              </h1>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden flex items-center justify-center p-2 rounded-lg hover:bg-gray-100"
          >
            <MenuIcon className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </Container>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex"
          >
            {/* drawer closer  */}
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30"
            ></div>

            <div className="relative w-64 h-full bg-white shadow-xl p-4 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <CalendarDays className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-lg font-bold text-gray-900">
                      ResourceBooker
                    </h1>
                  </div>
                </Link>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <CloseIcon className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
