"use client";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useLoadPlaylistImage from "@/hooks/useLoadPlaylistImage";
import { useRouter } from "next/navigation";

interface PlaylistProps {
  image?: string;
  name: string;
  // description?: string;
  id: string;
}
const Playlist: React.FC<PlaylistProps> = ({ image, name, id }) => {
    const img = useLoadPlaylistImage(image) ?? undefined;
    const router = useRouter();
  return (
    <div
    className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800 p-2 rounded-md transition-colors duration-200 text-white"
    onClick={() => router.push(`/playlist/${id}`)}
    >
      <Avatar className="rounded-sm" style={{
        borderRadius: "7px"
      }}>
        <AvatarImage src={img ?? ""} style={{
        borderRadius: "7px"
      }} />
        <AvatarFallback className="bg-neutral-600 " style={{
        borderRadius: "7px"
      }}>
          {name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <p className="truncate w-full text-inherit">{name}</p>
    </div>
  );
};

export default Playlist;
