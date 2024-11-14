
import React from 'react'
import ProfileStories from "../../../components/profileStories"

//u komponenti profileStories dohvatiti sve korisnikove storije..
export default function StoriesEdit({ id }: { id: string | undefined }) {

  return (
    <div>
      <ProfileStories id={id}></ProfileStories>
    </div>

  )
}
