"use client"
import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import GeneralEdit from "../components/generalEdit";
import BioEdit from "../components/bioEdit";
import EventsEdit from "../components/eventsEdit";
import StoriesEdit from "../components/storiesEdit";
import MediaEdit from "../components/mediaEdit";

async function fetchUserProfiles(userId: number) {
  const response = await fetch(`http://localhost:3000/users/getUsersProfiles/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch profiles");
  return response.json();
}
//iz sesije izvuci profile id i ne jesti govna
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
  const [userId, setUserId] = useState(null);


  useEffect(() => {
    const pathParts = pathname.split('/');
    const profileId = pathParts[pathParts.length - 1];
    setId(profileId);

    const verifyAuthorization = async () => {
      try {

        const userId = await fetchUserId();

        const userProfiles = await fetchUserProfiles(userId);
        const profileIds = userProfiles.map((profile: any) => profile.id.toString());


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

  return (
    <div>
      <nav className="p-5">
        <Link href={`/edit-profile/${id}?tab=general`} className="p-1">
          <span className={tab === 'general' ? 'text-blue-500' : ''}>General</span>
        </Link>
        <Link href={`/edit-profile/${id}?tab=bio`} className="p-5">
          <span className={tab === 'bio' ? 'text-blue-500' : ''}>Bio</span>
        </Link>
        <Link href={`/edit-profile/${id}?tab=events`} className="p-5">
          <span className={tab === 'events' ? 'text-blue-500' : ''}>Events</span>
        </Link>
        <Link href={`/edit-profile/${id}?tab=stories`} className="p-5">
          <span className={tab === 'stories' ? 'text-blue-500' : ''}>Stories</span>
        </Link>
        <Link href={`/edit-profile/${id}?tab=media`} className="p-5">
          <span className={tab === 'media' ? 'text-blue-500' : ''}>Media</span>
        </Link>
      </nav>
      {tab === 'general' && <div><GeneralEdit id={id} /></div>}
      {tab === 'bio' && <div><BioEdit id={id} /></div>}
      {tab === 'events' && <div><EventsEdit id={id} /></div>}
      {tab === 'stories' && <div><StoriesEdit id={id} /></div>}
      {tab === 'media' && <div><MediaEdit id={id} /></div>}
    </div>
  );
}