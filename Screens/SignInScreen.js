import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { colorPallet } from "../constants/colorpallet";
import { auth } from "../firebase/firebase";
import useAuth from "../hooks/UseAuth";

export default function SignInScreen({ navigation }) {

    const { setLogin } = useAuth();

    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [loadingSignIN, setloadingsi] = useState(false);
    const [loadingPass, setloadingPass] = useState(false);

    const HandleSignIn = async () => {
        setloadingsi(true);
        signInWithEmailAndPassword(auth, email, pass)
            .then(() => {
                setLogin(true);
            })
            .catch(e => {
                alert(e.message);
            })
            .finally(()=>{ setloadingsi(false); });
    }
    const HandlePassReset = async () => {
        setloadingPass(true);
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Email Sent Successfully!! Reset Password and login again");
            })
            .catch((error) => {
                alert(error.message);
            })
            .finally(()=>{ setloadingPass(false); });
    }

    return (
        <View style={styles.signInCard}>
            <TextInput style={styles.input} placeholder="Email" onChangeText={(val) => { setEmail(val); }} />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={(val) => { setPass(val); }} />
            <TouchableOpacity style={[styles.btnSolid, { backgroundColor: colorPallet.primary }]} onPress={async () => {
                await HandleSignIn();
            }} disabled={loadingSignIN}>
                {
                    loadingSignIN?(
                        <ActivityIndicator size={'small'} color={"white"}/>
                    ):(
                        <Text style={{ color: 'white' }}>SignIn</Text>
                    )
                }
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnSolid, { backgroundColor: 'red', marginTop: 5 }]} onPress={async () => {
                await HandlePassReset();
            }} disabled={loadingPass}>
                {
                    loadingPass?(
                        <ActivityIndicator size={'small'} color={"white"}/>
                    ):(
                        <Text style={{ color: 'white' }}>Send Password Reset Link</Text>
                    )
                }
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    signInCard: {
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
    btnSolid: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 7,
        borderRadius: 5,
    },
})