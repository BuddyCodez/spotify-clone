"use client"
import React from 'react'
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import { twMerge } from 'tailwind-merge';
interface  WrapperProps {
  children: React.ReactNode;
}
const Wrapper: React.FC<WrapperProps> = ({children}) => {
  const {playing} = useGlobalAudioPlayer();
  return (
    <div className={
      twMerge("bg-neutral-900 rounded-lg w-full", playing ? "h-[calc(100%-80px)]": "h-[calc(100%-2px)]")
    }>
      {children}
      </div>
  )
}

export default Wrapper
