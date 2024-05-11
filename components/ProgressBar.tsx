import React, { useEffect, useRef } from "react";
import { Slider } from "./ui/slider";
import { useGlobalAudioPlayer } from "react-use-audio-player";
interface ProgressBarProps {
  value?: number;
  duration?: number;
  onChange?: (value: number) => void;
}
const ProgressBar: React.FC<ProgressBarProps> = ({}) => {
  const [pos, setPos] = React.useState(0);
  const frameRef = useRef<number>();
  const { getPosition, duration, seek } = useGlobalAudioPlayer();
  const handleChange = (newValue: number[]) => {
    seek(newValue[0]);
    setPos(newValue[0]);
  };
  useEffect(() => {
    const animate = () => {
      setPos(getPosition());
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  //   duration is in seconds so we need to convert it to a human-readable format leading is zero then remove it
  let formattedDuration = new Date(duration! * 1000)
    .toISOString()
    .substr(11, 8);
  if (formattedDuration.startsWith("00:")) {
    formattedDuration = formattedDuration.substr(3);
  }
  const formattedPos = (pos: number) => {
    let formattedPos = new Date(pos * 1000).toISOString().substr(11, 8);
    if (formattedPos.startsWith("00:")) {
      formattedPos = formattedPos.substr(3);
    }
    return formattedPos;
  };
  return (
    <div className="flex gap-x-4 w-full">
      {/* value */}
      <div className="text-neutral-400">{formattedPos(pos)}</div>
      <Slider
        max={duration}
        step={1}
        defaultValue={[pos]}
        value={[pos]}
        onValueChange={handleChange}
      />
      {/* duration */}
      <div className="text-neutral-400">{formattedDuration}</div>
    </div>
  );
};

export default ProgressBar;
