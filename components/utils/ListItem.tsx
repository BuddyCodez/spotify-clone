"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
interface ListItemProps {
  image: string;
  name: string;
  href: string;
}
const ListItem: React.FC<ListItemProps> = ({ name, image, href }) => {
  const router = useRouter();
  const onClick = () => {
    // add authentication
    router.push(href);
  };
  return (
    <Card
      className="
   relative 
   group 
   flex 
   items-center
   overflow-hidden
   gap-x-4
   border-none
   bg-neutral-100/10
   hover:bg-neutral-100/20
   transition
   pr-4
   "
   style={{
    cursor: "pointer",
   }}
   onClick={onClick}
    >
      <CardContent className="relative min-h-[64px] min-w-[64px]">
        <Image
          src={image}
          alt="Image"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </CardContent>
      <p className="font-medium truncate py-5">
        {name}
      </p>
      <div className="absolute transition opacity-0 rounded-full flex  items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
        <FaPlay />
      </div>
    </Card>
  );
};

export default ListItem;
