export async function fetchMedia(profileId: string) {
  const res = await fetch(`http://localhost:3000/media/${profileId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch media');
  }
  return res.json();
}

