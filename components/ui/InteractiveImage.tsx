"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";

interface Profile {
  photo: string,
  profileName: string,
  dateOfBirth: string,
  dateOfDeath: string
}
export default function InteractiveImage({ profile }: { profile: Profile }) {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const uuid = self.crypto.randomUUID();

  return (
    <div
      className={`relative mb-4 transition-all duration-300 ${scrolled ? "border-4 rounded-b-[9%]" : ""
        }`}
    >
      <Image
        key={uuid}
        src={profile?.photo ?? "/avatarmenwoman.jpg"}
        alt={profile?.profileName || "Profile photo"}
        width={1000}
        height={562}
        layout="responsive"
        className={`object-cover transition-all duration-300 ${scrolled ? "rounded-b-[9%]" : ""
          }`}
      />
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 flex items-end transition-all duration-300 ${scrolled ? "rounded-b-[9%]" : ""
          }`}
      >
        <div className="p-4 text-white">
          <h1
            className={`font-bold mb-2 transition-all duration-300 ${scrolled ? "text-4xl sm:text-6xl" : "text-2xl sm:text-4xl"
              }`}
          >
            {profile?.profileName || "No Profile Name"}
          </h1>
          <p
            className={`transition-all duration-300 ${scrolled ? "text-lg sm:text-xl" : "text-lg sm:text-sm"
              }`}
          >
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
