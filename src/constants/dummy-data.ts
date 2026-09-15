import { Prayer } from "@/types/prayer";

export const prayers: Prayer[] = [
  {
    name: "Fajr",
    time: "05:42 AM",
    description: "Dawn",
    icon: "partly-sunny-outline",
    iconFamily: "ionicons",
    status: "completed",
  },
  {
    name: "Dhuhr",
    time: "12:47 PM",
    description: "Noon",
    icon: "sunny-outline",
    iconFamily: "ionicons",
    status: "completed",
  },
  {
    name: "Asr",
    time: "04:18 PM",
    description: "Afternoon",
    icon: "cloudy-outline",
    iconFamily: "ionicons",
    status: "completed",
  },
  {
    name: "Maghrib",
    time: "07:31 PM",
    description: "Sunset",
    icon: "sunset",
    iconFamily: "feather",
    status: "soon",
  },
  {
    name: "Isha",
    time: "09:02 PM",
    description: "Night",
    icon: "moon-outline",
    iconFamily: "ionicons",
    status: "upcoming",
  },
];
