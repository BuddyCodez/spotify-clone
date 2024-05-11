/* eslint-disable react-hooks/exhaustive-deps */
import usePlayer from "@/hooks/usePlayer";
import MediaItem from "./MediaItem";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import Slider from "./Slider";
import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiMiniSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import { Song } from "@/types";
// @ts-ignore
// import useSound from "use-sound";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import ProgressBar from "./ProgressBar";
import Spinner from "./utils/Spinner";
import { TbHeart } from "react-icons/tb";
interface PlayerContentProps {
  song: Song;
  songUrl: string;
}
const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const [loading, setLoading] = useState(true);
  const player = usePlayer();
  const {
    load,
    volume,
    setVolume,
    play,
    pause,
    playing,
    duration,
    getPosition,
  } = useGlobalAudioPlayer();

  const Icon = playing ?? false ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiMiniSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) return;
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];
    if (!nextSong) return player.setId(player.ids[0]);
    player.setId(nextSong);
  };
  const onPlayPrevious = () => {
    if (player.ids.length === 0) return;
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];
    if (!previousSong) return player.setId(player.ids[player.ids.length - 1]);
    player.setId(previousSong);
  };
  //   const [play, { pause, sound, duration }] = useSound(songUrl, {
  //     volume: volume,
  //     autoplay: true,
  //     onplay: () => setIsPlaying(true),
  //     onend: () => {
  //       setIsPlaying(false);
  //       onPlayNext();
  //     },
  //     onpause: () => setIsPlaying(false),
  //     format: ["mp3"],
  //   });
  //   useEffect(() => {
  //     setLoading(true);
  //     sound?.play();
  //     console.log(sound);
  //     setLoading(false);
  //     return () => {
  //       sound?.unload();
  //     };
  //   }, [sound]);
  useEffect(() => {
    setLoading(true);
    load(songUrl, {
      autoplay: true,
      html5: true,
      format: "mp3",
      initialVolume: 1,
      onend: () => {
        onPlayNext();
      },
      onload: () => setLoading(false),
    });
  }, [songUrl, load]);

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 h-full">
      <div className="flex w-full justify-start items-center">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
        </div>
      </div>
      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          onClick={() => (playing ? pause() : play())}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          {loading ? (
            <Spinner></Spinner>
          ) : (
            <Icon size={30} className="text-black" />
          )}
        </div>
      </div>
      <div className="hidden md:flex md:flex-col h-full justify-center items-center w-full max-w-[722px] gap-y-2">
        <div className="flex gap-x-6 h-full justify-center items-center w-full">
          <AiFillStepBackward
            size={30}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
            onClick={onPlayPrevious}
          />
          <div
            onClick={() => (playing ? pause() : play())}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
          >
            {loading ? (
              <Spinner></Spinner>
            ) : (
              <Icon size={30} className="text-black" />
            )}
          </div>
          <AiFillStepForward
            size={30}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
            onClick={onPlayNext}
          />
        </div>
        <ProgressBar duration={duration} />
      </div>
      {/* volumecontrol */}
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
            size={34}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px] text-white">
          <TbHeart size={30}/>
        </div>
      </div>
    </div>
  );
};
export default PlayerContent;
