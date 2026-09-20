import { memo, useMemo } from "react";

import Svg, { Circle, Line, Text as SvgText } from "react-native-svg";

import QiblaMarker from "./QiblaMarker";

interface CompassDialProps {
  size: number;
  color: string;
  mutedColor: string;
  cardColor: string;
  qiblaBearing: number;
  qiblaColor: string;
}

const DIRECTIONS = [
  { label: "N", angle: 0 },
  { label: "NE", angle: 45 },
  { label: "E", angle: 90 },
  { label: "SE", angle: 135 },
  { label: "S", angle: 180 },
  { label: "SW", angle: 225 },
  { label: "W", angle: 270 },
  { label: "NW", angle: 315 },
] as const;

const LABEL_ROTATIONS: Record<number, number> = {
  0: 0,
  45: 45,
  90: 90,
  135: 135,
  180: 180,
  225: 225,
  270: -90,
  315: -45,
};

const CompassDial = ({
  size,
  color,
  mutedColor,
  cardColor,
  qiblaBearing,
  qiblaColor,
}: CompassDialProps) => {
  const center = size / 2;
  const radius = center - 12;
  const labelRadius = radius - 32;
  const tickInnerRadius = radius - 18;

  const ticks = useMemo(
    () =>
      DIRECTIONS.map(({ angle }) => {
        const radians = (angle * Math.PI) / 180;

        return {
          x1: center + Math.sin(radians) * tickInnerRadius,
          y1: center - Math.cos(radians) * tickInnerRadius,
          x2: center + Math.sin(radians) * radius,
          y2: center - Math.cos(radians) * radius,
        };
      }),
    [center, radius, tickInnerRadius],
  );

  return (
    <Svg width={size} height={size}>
      <Circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={mutedColor}
        strokeWidth={1.5}
      />

      {ticks.map((tick, index) => (
        <Line
          key={index}
          x1={tick.x1}
          y1={tick.y1}
          x2={tick.x2}
          y2={tick.y2}
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
        />
      ))}

      {DIRECTIONS.map(({ label, angle }) => {
        const radians = (angle * Math.PI) / 180;

        const x = center + Math.sin(radians) * labelRadius;
        const y = center - Math.cos(radians) * labelRadius;

        return (
          <SvgText
            key={label}
            x={x}
            y={y}
            fill={label === "N" ? color : mutedColor}
            fontSize={label === "N" ? 16 : 13}
            fontWeight="600"
            textAnchor="middle"
            alignmentBaseline="middle"
            transform={`rotate(${LABEL_ROTATIONS[angle]} ${x} ${y})`}
          >
            {label}
          </SvgText>
        );
      })}

      <QiblaMarker
        center={center}
        radius={radius}
        bearing={qiblaBearing}
        accentColor={qiblaColor}
        badgeColor={cardColor}
      />
    </Svg>
  );
};

export default memo(CompassDial);
