"use client";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { twMerge } from "tailwind-merge";
interface ScrollBarProps {
  children: React.ReactNode;
}
const ScrollBar: React.FC<ScrollBarProps> = ({ children }) => {
  const { playing } = useGlobalAudioPlayer();
  return (
    <div
      className={twMerge(
        "bg-neutral-900 rounded-lg w-full px-2 max-h-[calc(100%-80px)] overflow-y-auto scroll-smooth",
        playing ? "h-[calc(100%-103px)]" : "calc(100%-2px)",
        ""
      )}
    >
      {children}
    </div>
  );
};

export default ScrollBar;
