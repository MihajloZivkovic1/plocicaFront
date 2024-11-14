import React from 'react'
import ProfileMedia from "../../../components/profileMedia"
export default function MediaEdit({ id }: { id: string | undefined }) {
  return (
    <div>
      <ProfileMedia id={id}></ProfileMedia>
    </div>
  )
}
