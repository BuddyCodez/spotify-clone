"use client";
import React from "react";
import { Slider as ShadSlider } from "./ui/slider";
interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}
const Slider: React.FC<SliderProps> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };
  return (
    <ShadSlider
      defaultValue={[value]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
    />
  );
};

export default Slider;
