'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserRoundIcon as UserRoundPen, Home, Phone, ShoppingCart, Menu, X } from 'lucide-react';

export function Navbar({ session }: NavbarProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loggedIn = Boolean(session?.user?.user?.id);
    setIsLoggedIn(loggedIn);
  }, [session]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const classNameForLinks = "font-medium text-sm transition-colors hover:text-primary dark:hover:text-primary-foreground flex items-center gap-2";

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between min-h-[64px] items-center gap-4">
          {/* Logo */}
          <Link href="/" className="font-black text-xl">
            MemoryPlate
          </Link>

          {/* Mobile menu toggle button */}
          <button onClick={toggleMenu} className="md:hidden text-gray-800 dark:text-gray-200 focus:outline-none">
            <Menu className="w-6 h-6" />
          </button>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6 items-center">
            <NavLink href="/" label="Početna" icon={<Home className="w-5 h-5" />} className={classNameForLinks} />
            <NavLink href="/contact" label="Kontakt" icon={<Phone className="w-5 h-5" />} className={classNameForLinks} />
            <NavLink href="/dashboard" label="Moje Pločice" icon={
              <div className="bg-black rounded-full p-1">
                <UserRoundPen className="w-5 h-5 text-white" />
              </div>
            } className={classNameForLinks} />
            <NavLink href="/order-now" label="Poruči Pločicu" icon={<ShoppingCart className="w-5 h-5" />} className={classNameForLinks} />

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
        </div>
      </div>

      {/* Sidebar for Mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden">
          <div className="absolute top-0 left-0 w-3/4 max-w-xs h-full bg-white dark:bg-gray-900 p-6 shadow-lg">
            <button onClick={toggleMenu} className="text-gray-800 dark:text-gray-200 mb-6 focus:outline-none">
              <X className="w-6 h-6" />
            </button>
            <nav className="flex flex-col space-y-4">
              <NavLink href="/" label="Početna" icon={<Home className="w-5 h-5" />} onClick={toggleMenu} className={classNameForLinks} />
              <NavLink href="/contact" label="Kontakt" icon={<Phone className="w-5 h-5" />} onClick={toggleMenu} className={classNameForLinks} />
              <NavLink href="/dashboard" label="Moje Pločice" icon={
                <div className="bg-black rounded-full p-1">
                  <UserRoundPen className="w-5 h-5 text-white" />
                </div>
              } onClick={toggleMenu} className={classNameForLinks} />
              <NavLink href="/order-now" label="Poruči Pločicu" icon={<ShoppingCart className="w-5 h-5" />} onClick={toggleMenu} className={classNameForLinks} />

              {isLoggedIn ? (
                <form
                  action="/api/auth/logout"
                  method="POST"
                  onSubmit={toggleMenu}
                >
                  <Button type="submit" variant="outline" size="sm">
                    Izloguj se
                  </Button>
                </form>
              ) : (
                <Link href="/login" onClick={toggleMenu}>
                  <Button variant="outline" size="sm">
                    Uloguj se
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}

interface NavLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
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

const NavLink: React.FC<NavLinkProps> = ({ href, label, icon, onClick, className }) => (
  <Link href={href} onClick={onClick} className={className}>
    {icon}
    {label}
  </Link>
);

