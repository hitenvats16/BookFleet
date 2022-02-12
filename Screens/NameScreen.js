import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { colorPallet } from "../constants/colorpallet";
import { auth } from '../firebase/firebase';

export default function LoginScreen({ navigation }) {

    const [name,setName] = useState();

    const UpdateDisplay = async ()=>{
        updateProfile(auth.currentUser,{
            displayName: name,
        }
        ).then(()=>{
            navigation.navigate("HomeScreen");
        })
        .catch((e)=>{
            alert(e.message);
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.signInCard}>
                <Text style={styles.txt}>Update Name</Text>
                <TextInput style={styles.input} placeholder="Name" onChangeText={(val)=>{ setName(val); }}/>
                <View style={styles.btngrp}>
                    <TouchableOpacity style={styles.btnOutlined} onPress={async ()=>{
                       await UpdateDisplay();
                    }}>
                        <Text style={{color: colorPallet.primary}} onPress={()=>{}}>Update Name</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colorPallet.primary,
        justifyContent: 'center'
    },
    signInCard: {
        width: '80%',
        height: 'auto',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        justifyContent: 'center',
    },
    txt: {
        color: colorPallet.primaryDark,
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        width: '100%',
        backgroundColor: colorPallet.primaryLight,
        paddingVertical: 5,
        paddingHorizontal: 7,
        borderRadius: 5,
        marginBottom: 5
    },
    btngrp: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnOutlined: {
        borderColor: colorPallet.primary,
        borderWidth: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 7,
        borderRadius: 5,
    }
})