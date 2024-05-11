import { Playlist, Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadPlaylistImage = (path?: string) => {
    const supabaseClient = useSupabaseClient();
    if(!path) return null;
    const {data: imageData,} = supabaseClient.storage.from('images').getPublicUrl(path);
    return imageData.publicUrl;
};
export default useLoadPlaylistImage;