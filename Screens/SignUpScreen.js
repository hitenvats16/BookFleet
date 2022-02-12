import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { colorPallet } from "../constants/colorpallet";
import { auth } from '../firebase/firebase';
import useAuth from '../hooks/UseAuth';

export default function SignUpScreen({ navigation }) {

    const { setLogin } = useAuth();

    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [pass, setPass] = useState();
    const [confpass, setConfpass] = useState();
    const [isloading, setloading] = useState(false);

    const HandleSigup = async ()=>{
        if(pass!=confpass) alert("password does not match")
        setloading(true);
        createUserWithEmailAndPassword(auth,email,pass)
            .then( async(userInfo) => {
                await updateProfile(auth.currentUser,{ displayName: name })
                setLogin(true);
            })
            .catch(e=>{
                alert(e.message);
            })
            .finally(()=>{ setloading(false); });
    }

    return (
        <View style={styles.Card}>
            <TextInput style={styles.input} placeholder="Name" onChangeText={(val) => { setName(val); }} />
            <TextInput style={styles.input} placeholder="Email" onChangeText={(val) => { setEmail(val); }} />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={(val) => { setPass(val); }} />
            <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry onChangeText={(val) => { setConfpass(val); }} />
            <TouchableOpacity style={styles.btnOutlined} onPress={async () => {
                await HandleSigup();
            }}>
                {
                    isloading?(
                        <ActivityIndicator color={colorPallet.primary} size={'small'}/>
                    ):(
                        <Text style={{ color: colorPallet.primary }}>SignUp</Text>
                    )
                }
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    Card: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
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