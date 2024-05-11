"use client"
import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/types'
import Image from 'next/image'
import React from 'react'
interface MediaItemProps {
    data: Song
}
const MediaItem: React.FC<MediaItemProps>= ({data}) => {
    const imagePath= useLoadImage(data);
  return (
    <div className='flex gap-x-3 hover:bg-neutral-600/55 transition px-2 py-[6px] rounded-sm cursor-pointer min-w-[250px]'>
        <Image className='object-cover h-14 w-14 rounded-sm' src={imagePath || "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="Song Image" width={120} height={120} />
        <div className='flex flex-col items-start justify-center h-full w-full gap-y-0 py-2'>
            <p className='text-sm font-medium truncate'>{data.title}</p>
            <p className='text-sm text-neutral-400 truncate'>{data.author}</p>
    </div>
    </div>
  )
}

export default MediaItem