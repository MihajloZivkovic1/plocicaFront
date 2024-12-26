"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import dayjs from "dayjs";

interface Profile {
  photo: string;
  profileName: string;
  dateOfBirth: string;
  dateOfDeath: string;
}

export default function InteractiveImage({ profile }: { profile: Profile }) {
  const [scrolled, setScrolled] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerPointRef = useRef<number | null>(null);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setScrolled(scrollPosition > 50);

    if (textRef.current && containerRef.current) {
      const { top } = textRef.current.getBoundingClientRect();

      if (top <= 0 && !isSticky) {
        triggerPointRef.current = scrollPosition;
        setIsSticky(true);
      } else if (triggerPointRef.current && scrollPosition <= triggerPointRef.current) {
        setIsSticky(false);
        triggerPointRef.current = null;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSticky]);

  return (
    <div
      ref={containerRef}
      className="relative mb-4 transition-all duration-300"
    >
      <div className={`transition-all duration-300 ${scrolled ? "px-4 sm:px-8 md:px-16 lg:px-24" : ""
        }`}>
        <Image
          src={profile?.photo ?? "/avatarmenwoman.jpg"}
          alt={profile?.profileName || "Profile photo"}
          width={1000}
          height={562}
          layout="responsive"
          className={`object-cover transition-all duration-300 ${scrolled ? "rounded-b-[30px]" : ""
            }`}
        />
      </div>

      <div className={`absolute inset-0 flex items-end transition-all duration-300 ${scrolled ? "rounded-b-[30px]" : ""
        }`}>
        <div className={`absolute inset-0 bg-black transition-all duration-300 ${scrolled ? "bg-opacity-50 rounded-b-[30px]" : "bg-opacity-0"
          }`}
          style={{
            padding: scrolled ? "0 1rem" : "0",
            left: scrolled ? "1rem" : "0",
            right: scrolled ? "1rem" : "0",
          }}
        />

        <div
          ref={textRef}
          className={`
            w-full p-4 text-white transition-all duration-300
            ${scrolled ? "px-8 sm:px-12 md:px-20 lg:px-28" : ""}
            ${isSticky
              ? "fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm z-50"
              : "relative"
            }
          `}
        >
          <h1 className={`
            font-bold mb-2 transition-all duration-300 
            ${scrolled
              ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
              : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            }
          `}>
            {profile?.profileName || "No Profile Name"}
          </h1>

          <p className={`
            transition-all duration-300
            ${scrolled ? "text-xl sm:text-2xl" : "text-sm sm:text-lg"}
          `}>
            {`${formatDate(profile.dateOfBirth)} - ${formatDate(profile.dateOfDeath)}`}
          </p>
        </div>
      </div>
    </div>
  );
}

function formatDate(date: string | undefined): string {
  if (!date) return "Unknown";
  return dayjs(date).format("MMMM D, YYYY");
}