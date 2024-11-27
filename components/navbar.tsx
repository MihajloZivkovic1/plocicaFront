'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";
import { NextResponse } from "next/server";
import { QrCode, QrCodeIcon } from "lucide-react";


export function Navbar({ session, logout }: NavbarProps) {
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
            <QrCodeIcon className="h-6 w-6" />
          </Link>
          {/* Mobile menu toggle button */}
          <button onClick={toggleMenu} className="md:hidden text-gray-800 dark:text-gray-200 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-4">
            <NavLink href="/" label="Home" className={classNameForLinks} />
            <NavLink href="/contact" label="Contact" className={classNameForLinks} />
            <NavLink href="/dashboard" label="Dashboard" className={classNameForLinks} />
            <NavLink href="/order-now" label="Order Now" className={classNameForLinks} />

          </nav>
          {/* Desktop Menu */}
          {/* <nav className="hidden md:flex gap-4">
            <NavLink href="/" label="Home" />
            <NavLink href="/contact" label="Contact" />
            <NavLink href="/dashboard" label="Dashboard" />
          </nav> */}

          {/* Sign-in button */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <form action="/api/auth/logout" method="POST">
                <Button type="submit" variant="outline" size="sm">
                  Logout
                </Button>
              </form>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Sign in
                </Button>
              </Link>
            )}
          </div>
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
              <NavLink href="/" label="Home" onClick={toggleMenu} className={classNameForLinks} />
              <NavLink href="/contact" label="Contact" onClick={toggleMenu} className={classNameForLinks} />
              <NavLink href="/dashboard" label="Dashboard" onClick={toggleMenu} className={classNameForLinks} />
              <NavLink href="/order-now" label="Order Now" onClick={toggleMenu} className={classNameForLinks} />

              <div>{isLoggedIn ? (
                < Link href="/login" onClick={logout}>
                  <Button variant="outline" size="sm" onClick={toggleMenu}>
                    Logout
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button variant="outline" size="sm" onClick={toggleMenu}>
                    Sign in
                  </Button>
                </Link>
              )}
              </div>

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
  } | null, logout: () => Promise<NextResponse> | null,
}
const NavLink: React.FC<NavLinkProps> = ({ href, label, onClick, className }) => (
  <Link href={href} onClick={onClick} className={className}>
    {label}
  </Link >
);

function QRCodeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect x="2" y="2" width="8" height="8" fill="black" />
      <rect x="4" y="4" width="4" height="4" fill="white" />
      <rect x="2" y="14" width="8" height="8" fill="black" />
      <rect x="4" y="16" width="4" height="4" fill="white" />
      <rect x="14" y="2" width="8" height="8" fill="black" />
      <rect x="16" y="4" width="4" height="4" fill="white" />
      <rect x="10" y="10" width="4" height="4" fill="black" />
      <rect x="16" y="16" width="2" height="2" fill="black" />
    </svg>
  );
}