import { View, StyleSheet, Text } from "react-native";
import { Feather } from '@expo/vector-icons';
import { colorPallet } from "../constants/colorpallet";

export default function TabButton({ title, focused = false, iconName }) {
    if (!focused) {
        return(
            <View>
                <Feather name={iconName} size={24} color={colorPallet.primaryLight} />
            </View>
        );
    } else {
        return(
            <View style = {styles.btn}>
                <Feather name={iconName} size={20} color={colorPallet.primary} />
                <Text style={{color:colorPallet.primary,fontSize: 15, paddingLeft: 5, fontWeight: '700'}}>{title}</Text>
            </View>
        );
    }
}

const styles= StyleSheet.create({
    btn:{
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: "center",
        flexDirection: 'row',
    }
})