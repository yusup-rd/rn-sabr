import MosqueMap from "@/components/mosques/MosqueMap";
import MosqueRadiusSheet from "@/components/mosques/MosqueRadiusSheet";
import MosquesList from "@/components/mosques/MosquesList";
import { useNearbyMosques } from "@/hooks/useNearbyMosques";
import { styled } from "nativewind";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView as NativeSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(NativeSafeAreaView);

const DEFAULT_RADIUS_KM = 10;

const Mosques = () => {
  const [radiusKm, setRadiusKm] = useState(DEFAULT_RADIUS_KM);
  const [radiusSheetVisible, setRadiusSheetVisible] = useState(false);
  const [selectedMosqueId, setSelectedMosqueId] = useState<string | null>(null);

  const mosques = useNearbyMosques(radiusKm);

  const handleRadiusChange = (value: number) => {
    setRadiusKm(value);
    setSelectedMosqueId(null);
  };

  return (
    <>
      <SafeAreaView className="bg-background flex-1" edges={["top"]}>
        <View className="flex-1/3">
          <MosqueMap
            mosques={mosques}
            radiusKm={radiusKm}
            selectedMosqueId={selectedMosqueId}
            onSelectMosque={setSelectedMosqueId}
          />
        </View>

        <View className="flex-2/3">
          <MosquesList
            mosques={mosques}
            radiusKm={radiusKm}
            selectedMosqueId={selectedMosqueId}
            onSelectMosque={setSelectedMosqueId}
            onRadiusPress={() => setRadiusSheetVisible(true)}
            onDirectionsPress={() => {}}
          />
        </View>
      </SafeAreaView>

      <MosqueRadiusSheet
        visible={radiusSheetVisible}
        radiusKm={radiusKm}
        onClose={() => setRadiusSheetVisible(false)}
        onRadiusChange={handleRadiusChange}
      />
    </>
  );
};

export default Mosques;
