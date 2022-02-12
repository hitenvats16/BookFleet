import { FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { colorPallet } from "../constants/colorpallet";
import * as Linking from 'expo-linking';
import ConditionCard from "../reusables/ConditionCard";

export default function ProductScreen({ route, navigation }) {
    return (
        <View style={styles.cont}>
            <TouchableOpacity style={styles.BackBtn}>
                <Ionicons name="caret-back-circle" size={50} color={colorPallet.primary} onPress={() => { navigation.goBack() }} />
            </TouchableOpacity>
            <View style={styles.Main} contentContainerStyle={{ alignItems: 'center' }}>
                <View style={styles.item}>
                    <Image
                        source={{
                            uri: route.params.img_link,
                        }}
                        style={styles.itemPhoto}
                        resizeMode="cover"
                    />
                </View>
                <Text style={styles.Title}>{route.params.Title}</Text>
                <Text style={styles.Author}>{route.params.Author}</Text>
                <Text style={styles.Publisher}>{route.params.Publisher}</Text>
                <ConditionCard conditionScore={route.params.Condition}/>
            </View>
            <TouchableOpacity style={styles.contactBTN} onPress={async () => { await Linking.openURL(`mailto: ${route.params.email}`); }}>
                <Text style={{ fontSize: 20, fontWeight: '800', color: 'white' }}>Contact Person</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        alignItems: 'center',
        marginTop: StatusBar.currentHeight,
        padding: 10,
    },
    BackBtn: {
        width: '100%',
        height: 50,
        margin: 10,
        zIndex: 50,
        justifyContent: 'flex-start'
    },
    item: {
        margin: 10,
    },
    itemPhoto: {
        width: 350,
        height: 200,
    },
    Main: {
        flex: 1,
        alignItems:'center'
    },
    Title: {
        fontSize: 30,
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
        color: colorPallet.primaryDark,
    },
    Publisher: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
        color: colorPallet.subheading,
        marginVertical: 10
    },
    Author: {
        textAlign: 'center',
        fontSize: 25,
        color: colorPallet.primary,
        fontWeight: '700',
        marginVertical: 10
    },
    contactBTN: {
        width: '200%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorPallet.orange,
        position: 'absolute',
        bottom: 0
    }
})
