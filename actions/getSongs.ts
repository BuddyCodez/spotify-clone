import { Song } from "@/types";
import { client } from "./client";

const getSongs = async (): Promise<Song[]> => {
    
  const { data, error } = await client
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error(error);
  }
  return (data as any) || [];
};
export default getSongs;
