import ProfileLinks from '@/components/profileLinks';
import React from 'react'

export default function LinksEdit({ id }: { id: string | undefined }) {
  return (
    <div>
      <ProfileLinks id={id} />
    </div>
  )
}
