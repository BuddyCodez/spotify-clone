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
  return (
    <Wrapper>
      <Header />
      PlaylistPage.
    </Wrapper>
  );
}
