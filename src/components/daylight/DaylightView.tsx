import DayScene from "./scenes/DayScene";
import NightScene from "./scenes/NightScene";

interface DaylightViewProps {
  isDaytime: boolean;
  progress: number;
}

export default function DaylightView({
  isDaytime,
  progress,
}: DaylightViewProps) {
  if (isDaytime) {
    return <DayScene progress={progress} />;
  }

  return <NightScene />;
}
