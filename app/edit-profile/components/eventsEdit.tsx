import React from 'react'
import ProfileEvents from "../../../components/profileEvents"

export default function EventsEdit({ id }: { id: string | undefined }) {
  return (
    <div>
      <ProfileEvents id={id}></ProfileEvents>
    </div>
  )
} 
