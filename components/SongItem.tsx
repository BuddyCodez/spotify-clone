"use client";
import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types';
import Image from 'next/image';
import React from 'react'
import { FaPlay } from 'react-icons/fa';
interface SongItemProps {
    data: Song;
    onClick: (id: string) => void;
}
const SongItem: React.FC<SongItemProps> = ({data, onClick}) => {
    const imagePath = useLoadImage(data);
  return (
    <div
    onClick={() => onClick(data.id)}
     className='relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3'
    >
        <div className='relative aspect-square w-full h-full roudned-md overflow-hidden rounded-sm'>
            <Image className='object-cover ' src={imagePath || "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="Song Image" fill />
        </div>
        <div className='flex flex-col items-start w-full pt-4 gap-y-1'>
            <p className='text-sm font-medium truncate'>{data.title}</p>
            <p className='text-sm text-neutral-400 truncate pb-4 w-full'>By {data.author}</p>
        </div>
        <div className="absolute  bottom-24 right-5">
            <PlayButton />
        </div>
    </div>
  )
}

export default SongItem
const PlayButton = () => {
return (
    <button className='transition opacity-0 rounded-full flex items-center bg-green-500 p-4 drop-shadow-md translate-y-1/4 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-110'>
        <FaPlay  className='text-black'/>
    </button>
);
}