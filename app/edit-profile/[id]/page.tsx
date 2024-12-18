'use client'

import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import GeneralEdit from "../components/generalEdit";
import BioEdit from "../components/bioEdit";
import EventsEdit from "../components/eventsEdit";
import StoriesEdit from "../components/storiesEdit";
import MediaEdit from "../components/mediaEdit";

type Profile = {
  id: number;
};

async function fetchUserProfiles(userId: number) {
  const response = await fetch(`https://plocicaapi.onrender.com/users/getUsersProfiles/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch profiles");
  return response.json();
}

async function fetchUserId() {
  const res = await fetch('/api/auth/getSession');
  if (!res.ok) throw new Error('Not authenticated');
  const data = await res.json();
  return data.userId;
}

export default function EditProfile() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const [tab, setTab] = useState<string>('');
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const pathParts = pathname.split('/');
    const profileId = pathParts[pathParts.length - 1];
    setId(profileId);

    const verifyAuthorization = async () => {
      try {
        const userId = await fetchUserId();
        const userProfiles = await fetchUserProfiles(userId);
        const profileIds = userProfiles.map((profile: Profile) => profile.id.toString());

        if (profileIds.includes(profileId)) {
          setIsAuthorized(true);
        } else {
          router.replace("/404");
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
        router.replace("/404");
      }
    };

    verifyAuthorization();
  }, [pathname, router]);

  useEffect(() => {
    const tabValue = searchParams.get('tab');
    setTab(tabValue || '');
  }, [searchParams]);

  if (!isAuthorized) return null;

  const tabs = [
    { name: 'Generalno', value: 'general' },
    { name: 'Biografija', value: 'bio' },
    { name: 'Pomeni', value: 'events' },
    { name: 'Priče', value: 'stories' },
    { name: 'Slike', value: 'media' },
  ];

  return (
    <div className="container mx-auto px-4 mt-16">
      <nav className="overflow-x-auto whitespace-nowrap pb-2 mb-4 pt-1">
        <div className="inline-flex space-x-2">
          {tabs.map((item) => (
            <Link
              key={item.value}
              href={`/edit-profile/${id}?tab=${item.value}`}
              className={`px-3 py-2 rounded-md text-sm font-medium ${tab === item.value
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
                } transition-colors duration-200`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
      <div className="mt-4">
        {tab === 'general' && <GeneralEdit id={id} />}
        {tab === 'bio' && <BioEdit id={id} />}
        {tab === 'events' && <EventsEdit id={id} />}
        {tab === 'stories' && <StoriesEdit id={id} />}
        {tab === 'media' && <MediaEdit id={id} />}
      </div>
    </div>
  );
}

