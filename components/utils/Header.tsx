"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import useAuthModal from "@/hooks/useAuthModal";
import { User, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { Show } from "./Show";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { useToast } from "../ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
interface props {
  // children: React.ReactNode;
}
const Header: React.FC<props> = ({}) => {
  const router = useRouter();
  const authModal = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const { toast } = useToast();
  console.log(user?.user_metadata);
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    // reset playing songs!
    router.refresh();
    error && console.error(error);
    if (error)
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    else
      toast({
        title: "Logged out",
        className: "bg-green-400 border-none ",
      });
  };
  // console.log(user);
  return (
    <div
      className={twMerge(`
        h-fit bg-gradient-to-b from-emerald-800 p-6
        rounded-lg
        `)}
    >
      <div className="w-full mb-4 flex items-center justify-between ">
        <div className="hidden md:flex gap-x-2  items-center  ">
          <Button
            className="bg-black rounded-full px-2 "
            onClick={() => router.back()}
          >
            <RxCaretLeft className="text-xl" />
          </Button>
          <Button
            className="bg-black rounded-full px-2 "
            onClick={() => router.forward()}
          >
            <RxCaretRight className="text-xl" />
          </Button>
        </div>
        <div
          className="flex md:hidden gap-x-2 items-center "
          onClick={() => router.push("/")}
        >
          <Button className="bg-white rounded-full px-2 hover:opacity-90 transition text-black hover:text-gray-500">
            <HiHome size={20} className="" />
          </Button>
          <Button className="bg-white rounded-full px-2 hover:opacity-90 transition text-black hover:text-gray-500">
            <BiSearch
              size={20}
              className=""
              onClick={() => router.push("/search")}
            />
          </Button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <Show>
            <Show.when isTrue={user}>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src={
                        user?.user_metadata?.avatar_url ??
                        user?.user_metadata?.picture
                      }
                    />
                    <AvatarFallback>
                      {String(user?.user_metadata?.full_name)
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{getName(user)}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Show.when>
            <Show.Else>
              <Button
                className="rounded-xl font-bold text-white text-md px-6 py-2"
                variant="link"
                onClick={authModal.onOpen}
              >
                Sign up
              </Button>
              <Button
                className="rounded-2xl font-bold text-md px-6 py-2"
                variant="secondary"
                onClick={authModal.onOpen}
              >
                Login
              </Button>
            </Show.Else>
          </Show>
        </div>
      </div>
      {/* {children} */}
    </div>
  );
};

export default Header;
function getName(userObj: User | null): string {
  return (
    userObj?.user_metadata?.custom_claims?.global_name ??
    userObj?.user_metadata?.full_name ??
    userObj?.user_metadata?.name ??
    "User Name"
  );
}
export { getName };
