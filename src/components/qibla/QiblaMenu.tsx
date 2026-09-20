import { MenuView } from "@expo/ui/community/menu";
import { FontAwesome6 as Fa } from "@expo/vector-icons";
import { View } from "react-native";

interface QiblaMenuProps {
  hapticsEnabled: boolean;
  onHapticsChange: (enabled: boolean) => void;
}

const QiblaMenu = ({ hapticsEnabled, onHapticsChange }: QiblaMenuProps) => {
  return (
    <MenuView
      actions={[
        {
          id: "haptics",
          title: "Haptic Feedback",
          state: hapticsEnabled ? "on" : "off",
        },
      ]}
      onPressAction={(event) => {
        if (event.nativeEvent.event === "haptics") {
          onHapticsChange(!hapticsEnabled);
        }
      }}
    >
      <View className="h-10 w-10 items-center justify-center">
        <Fa name="ellipsis" size={18} className="text-foreground" />
      </View>
    </MenuView>
  );
};

export default QiblaMenu;
