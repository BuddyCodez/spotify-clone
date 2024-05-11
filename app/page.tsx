import getSongs from "@/actions/getSongs";
import PageContent from "@/components/PageContent";
import Header from "@/components/utils/Header";
import ListItem from "@/components/utils/ListItem";
import ScrollBar from "@/components/utils/ScrollBar";
import Wrapper from "@/components/utils/Wrapper";
import { Song } from "@/types";
import Image from "next/image";

export const revalidate = 0;
export default async function Home() {
  const songs = await getSongs();
  return (
    <Wrapper>
      <Header />
      <ScrollBar>
        <div className="mb-2 px-4">
          <h1 className="text-white text-3xl font-semibold">Welcome back</h1>
          {/* Gird */}
          <div className="grid gird-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem
              image="/assets/liked.png"
              name="Liked songs"
              href="/liked"
            />
          </div>
        </div>
        <div className="mt-2 mb-7 px-6 ">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-2xl font-semibold">Newest Songs</h1>
          </div>
        </div>
        <PageContent songs={songs} />
      </ScrollBar>
    </Wrapper>
  );
}
