
import { Toast } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";

const useGetSongById = (id?: string) => {
  const [isLoading, setisLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const { supabaseClient } = useSessionContext();
  useEffect(() => {
    if(!id) return;
    setisLoading(true);
    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error(error);
        setisLoading(false);
        return Toast({
            title: "Something went wrong",
            variant: "destructive"
        });
      }
      setSong(data as Song);
      setisLoading(false);
    };
    fetchSong();
  }, [id, supabaseClient]);
  return useMemo(() => ({
    isLoading, song
  }), [isLoading, song]);
};
export default useGetSongById;
