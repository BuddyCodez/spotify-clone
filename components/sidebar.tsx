"use client";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { Card, CardContent, CardTitle } from "./ui/card";
import SidebarItem from "./utils/SidebarItem";
import { TbPlaylist } from "react-icons/tb";
import { Button } from "./ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import Header from "./utils/Header";
import Library from "./Library";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";
import { Playlist } from "@/types";
interface SidebarProps {
  children: React.ReactNode;
  playlists?: Playlist[];
}
const Sidebar: React.FC<SidebarProps> = ({children, playlists}) => {
  console.log(playlists);
  const pathname = usePathname();
  const player = usePlayer();
  const routes = useMemo(
    () => [
      {
        label: "Home",
        active: pathname !== "search",
        href: "/",
        icon: HiHome,
      },
      {
        label: "Search",
        active: pathname === "search",
        href: "/search",
        icon: BiSearch,
      },
    ],
    [pathname]
  );
  return (
    <>
      <div className={
        twMerge("flex h-full", player.activeId && "h-[calc(100%-80px)]")
      }>
        <div className="hidden md:flex flex-col gap-y-2 bg-black  w-[300px] p-2">
          <Card className="bg-neutral-900 rounded-lg border-none">
            <CardContent className="flex flex-col gap-2 items-center justify-center h-full px-4 py-2">
                {routes.map(route => (
                    <SidebarItem key={route.label} {...route} />
                ))}
            </CardContent>
          </Card>
         <Library playlists={playlists}/>
        </div>
        <main className="flex-1 py-2 overflow-hidden max-w-[100vw] overflow-x-hidden bg-black h-[100vh] p-2">
       {children}
        </main>
      </div>
    </>
  );
};

export default Sidebar;
