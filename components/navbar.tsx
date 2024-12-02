'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { NextResponse } from "next/server";
import { UserRoundPen } from "lucide-react";

export function Navbar({ session }: NavbarProps) {
  console.log("Session", session);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = Boolean(session?.user?.user?.id);
    console.log(loggedIn);
    setIsLoggedIn(loggedIn);
  }, [session]);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const classNameForLinks = "font-medium text-sm transition-colors hover:underline text-gray-800 dark:text-gray-200"
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between min-h-[56px] items-center gap-4">
          {/* Logo */}
          <Link href={"/"}>
            <h1 className="font-black">MemoryPlate</h1>
          </Link>
          <Link href="/dashboard" className="flex items-center" prefetch={false}>
            <UserRoundPen className="h-6 w-6" />
          </Link>
          {/* Mobile menu toggle button */}
          <button onClick={toggleMenu} className="md:hidden text-gray-800 dark:text-gray-200 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-4 flex justify-center items-center">
            <NavLink href="/" label="Početna" className={classNameForLinks} />
            <NavLink href="/contact" label="Kontakt" className={classNameForLinks} />
            <NavLink href="/dashboard" label="Moje Pločice" className={classNameForLinks} />
            <NavLink href="/order-now" label="Poruči Pločicu" className={classNameForLinks} />

            {isLoggedIn ? (
              <form action="/api/auth/logout" method="POST">
                <Button type="submit" variant="outline" size="sm">
                  Izloguj se
                </Button>
              </form>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Uloguj se
                </Button>
              </Link>
            )}

          </nav>
          {/* Desktop Menu */}
          {/* <nav className="hidden md:flex gap-4">
            <NavLink href="/" label="Home" />
            <NavLink href="/contact" label="Contact" />
            <NavLink href="/dashboard" label="Dashboard" />
          </nav> */}

          {/* Sign-in button */}

        </div>
      </div>

      {/* Sidebar for Mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden">
          <div className="absolute top-0 left-0 w-3/4 max-w-xs h-full bg-white dark:bg-gray-900 p-6 shadow-lg">
            <button onClick={toggleMenu} className="text-gray-800 dark:text-gray-200 mb-6 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <nav className="flex flex-col space-y-4">
              <NavLink href="/" label="Početna" onClick={toggleMenu} className={classNameForLinks} />
              <NavLink href="/contact" label="Kontakt" onClick={toggleMenu} className={classNameForLinks} />
              <NavLink href="/dashboard" label="Moje Pločice" onClick={toggleMenu} className={classNameForLinks} />
              <NavLink href="/order-now" label="Poruči Pločicu" onClick={toggleMenu} className={classNameForLinks} />

              {isLoggedIn ? (
                <form action="/api/auth/logout" method="POST">
                  <Button type="submit" variant="outline" size="sm" onClick={toggleMenu}>
                    Izloguj se
                  </Button>
                </form>
              ) : (
                <Link href="/login">
                  <Button variant="outline" size="sm" onClick={toggleMenu}>
                    Uloguj se
                  </Button>
                </Link>
              )}


            </nav>
          </div>
        </div >
      )
      }
    </nav >
  );
}

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
  className: string;
}
interface NavbarProps {
  session: {
    user: {
      message: string;
      token: string;
      user: {
        id: number;
        email: string;
      };
    }
  } | null
}
const NavLink: React.FC<NavLinkProps> = ({ href, label, onClick, className }) => (
  <Link href={href} onClick={onClick} className={className}>
    {label}
  </Link >
);

