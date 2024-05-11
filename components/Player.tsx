"use client";
import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import React, { useState } from "react";
import MediaItem from "./MediaItem";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiMiniSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import Slider from "./Slider";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const songUrl = useLoadSongUrl(song!);
  if (!song || !songUrl || !player.activeId) return null;
  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4 transition">

      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};

export default Player;
