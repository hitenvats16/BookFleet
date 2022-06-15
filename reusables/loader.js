import { ActivityIndicator, View } from "react-native";
import { colorPallet } from "../constants/colorpallet";

export default function Loader(){
    return(
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ActivityIndicator size={'small'} color={colorPallet.primaryDark}/>
        </View>
    );
}