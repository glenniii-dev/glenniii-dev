import React from 'react'
import blogs from '@/utils/blogs'

export default function page({ params }: { params: { id: string } }) {
  const id = params.id

  // using the blogid get the title, technology, content, and date
  // also dangerousely set html for the content
  return (
    <div>page</div>
  )
}
