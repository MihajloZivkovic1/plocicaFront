export async function fetchMedia(profileId: string) {
  const res = await fetch(`https://plocicaapi.onrender.com/media/${profileId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch media');
  }
  return res.json();
}

