import { Playlist } from "@/types";

import { client } from "./client";

const getPlaylistById = async (): Promise<Playlist[]> => {
    
    const {data: sessionData, error: seissonError} = await client.auth.getSession();
    if (seissonError) {
      console.error(seissonError.message);
      return [];
    }
    const {data, error} = await client.from('playlist').select('*').eq('user_id', sessionData.session?.user.id);
    if (error) {
      console.error(error);
      return [];
    }
    return (data as any) || [];
};
export default getPlaylistById;