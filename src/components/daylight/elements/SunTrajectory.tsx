import Svg, { Path } from "react-native-svg";

const VIEWBOX_WIDTH = 320;
const VIEWBOX_HEIGHT = 180;

export default function SunTrajectory() {
  return (
    <Svg
      pointerEvents="none"
      width="100%"
      height="100%"
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      style={{
        position: "absolute",
        inset: 0,
      }}
    >
      <Path
        d="
          M32 142
          Q160 34 288 142
        "
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeDasharray="5 7"
        strokeLinecap="round"
        opacity={0.55}
      />
    </Svg>
  );
}
