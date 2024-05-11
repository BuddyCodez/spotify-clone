"use client";
import React from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { TbMusicShare, TbPlaylist } from "react-icons/tb";
import { PiMusicNotesPlusBold } from "react-icons/pi";
import { AiOutlinePlus } from "react-icons/ai";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import usePlaylistModal from "@/hooks/usePlaylistModal";
import { Playlist as PlaylistType } from "@/types";
import Playlist from "./utils/Playlist";

interface LibraryProps {
  playlists?: PlaylistType[];
}
const Library: React.FC<LibraryProps> = ({playlists}) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const playlistModal = usePlaylistModal();
  const { user } = useUser();
  const handelUpload = () => {
    if (!user) return authModal.onOpen();
    return uploadModal.onOpen();
  }; 
  const handleCreate = () => {
    if (!user) return authModal.onOpen();
    return playlistModal.onOpen();
  }
  const classN =
    "hover:bg-[#4d4b4b] px-3 py-2 rounded-sm cursor-pointer flex gap-2 items-center";
  return (
    <>
      <Card className="bg-neutral-900 rounded-lg border-none h-full p-2 py-4">
        <CardTitle className="flex justify-between items-center text-neutral-400 px-2">
          <div className="inline-flex gap-2">
            <TbPlaylist size={16} />
            <h2 className="font-medium text-md">Your Library</h2>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <AiOutlinePlus className="text-neutral-400 cursor-pointer hover:text-white transition" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#313030] outline-none border-none rounded-md text-white ">
              <DropdownMenuLabel className={classN} onClick={handleCreate}>
                <PiMusicNotesPlusBold size={16}  />
                Create Playlist
              </DropdownMenuLabel>
              <DropdownMenuLabel className={classN} onClick={handelUpload}>
                <TbMusicShare size={16} />
                Upload Song
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
        <CardContent className="w-full p-0">
          <div className="flex flex-col gap-y-2 w-full mt-2 p-2">
            {playlists?.map((playlist) => (
              <Playlist key={playlist!.id} {...playlist!} />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Library;
