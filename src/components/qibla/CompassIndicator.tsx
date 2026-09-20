import Svg, { Circle, Path } from "react-native-svg";

interface CompassIndicatorProps {
  size: number;
  color: string;
  cardColor: string;
}

const CompassIndicator = ({
  size,
  color,
  cardColor,
}: CompassIndicatorProps) => {
  const center = size / 2;

  return (
    <Svg
      pointerEvents="none"
      width={size}
      height={size}
      style={{ position: "absolute" }}
    >
      <Path
        d={`M ${center} 8 L ${center + 7} 30 L ${center} 24 L ${center - 7} 30 Z`}
        fill={color}
      />
      <Circle
        cx={center}
        cy={center}
        r={5}
        fill={cardColor}
        stroke={color}
        strokeWidth={2}
      />
    </Svg>
  );
};

export default CompassIndicator;
