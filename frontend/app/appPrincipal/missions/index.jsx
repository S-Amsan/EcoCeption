import { Platform } from "react-native";
import MissionsMobile from "./MissionsMobile";
import MissionsWeb from "./MissionsWeb";

export default function MissionsIndex() {
    return Platform.OS === "web"
        ? <MissionsWeb />
        : <MissionsMobile />;
}
