import { ActivityIndicator, View } from "react-native";
import { colorPallet } from "../constants/colorpallet";


export default function LoadScreen() {
    return (
      <View style={{ width: '100%',height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: colorPallet.primary }}>
        <ActivityIndicator size="large" color={colorPallet.primaryLight} />
      </View>
    );
}