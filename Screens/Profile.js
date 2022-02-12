import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { auth, db } from '../firebase/firebase';
import useAuth from '../hooks/UseAuth';
import * as ImagePicker from 'expo-image-picker';
import { colorPallet } from '../constants/colorpallet';
import { AntDesign } from '@expo/vector-icons';
import DialogInput from 'react-native-dialog-input';
import { collection, getDocs } from 'firebase/firestore';

export default function Profile({navigation}) {

    const [ image, setImage ] = useState();
    const { setLogin } = useAuth();
    const [ DialogVisible, setVisibilty ] = useState(false);
    const [ name,setName ] = useState();
    const [books,setBooks] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [count,setCount] = useState(0);

    async function getDataFromFirestore(){
        const dataRefrence = collection(db, "Books");
        const retrievedData = await getDocs(dataRefrence);
        retrievedData.forEach((data)=>{
            if(data.data()?.email==auth.currentUser.email){
                setCount(count+1);
            }
        })
    }

    useEffect(async() => {
        const unsubscribe = onAuthStateChanged(auth, (userData) => {
            setName(userData.displayName);
        })
        setLoading(true);
        await getDataFromFirestore();
        setLoading(false);
        return unsubscribe;
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const ChangeName = () => {
        return (
            <DialogInput isDialogVisible={DialogVisible}
                title={"Change Name"}
                message={"Enter your New Name given below"}
                submitInput={async(inputText) => { 
                    await updateProfile(auth.currentUser,{ displayName: inputText });
                    setName(inputText);
                    setVisibilty(false);
                 }}
                closeDialog={() => { setVisibilty(false) }}>
            </DialogInput>
        );
    }

    return (
        <View style={styles.cont}>
            <TouchableOpacity onPress={async () => { await pickImage(); }}>
                <Image source={!image ? require('../assets/user.png') : { uri: image }} style={styles.pic} />
            </TouchableOpacity>
            <View style={styles.name}>
                <Text style={{ color: colorPallet.primaryDark, fontSize: 20, fontWeight: 'bold' }}>{name}</Text>
            </View>
            <View style={styles.subCont}>
                <View style={styles.listings} >
                    <Text style={{ fontSize: 40, fontWeight: '900' }}>
                        {
                            isLoading?(
                                <ActivityIndicator size={"small"} color={colorPallet.primary}/>
                            ):(
                                count
                            )
                        }
                    </Text>
                </View>
                <TouchableOpacity style={styles.btn} onPress={()=>{ setVisibilty(true) }}>
                    <AntDesign name="setting" size={24} color="black" />
                    <Text>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => {
                    Alert.alert("Confirmation", "Do you really want to SignOut??", [
                        {
                            text: 'Yes',
                            onPress: () => { setLogin(false); auth.signOut(); }
                        },
                        {
                            text: 'No'
                        }
                    ])
                }}>
                    <AntDesign name="logout" size={24} color="black" />
                    <Text>SignOut</Text>
                </TouchableOpacity>
            </View>
            <ChangeName/>
        </View>
    );
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight,
    },
    pic: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
    },
    name: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subCont: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listings: {
        width: 100,
        height: 100,
        backgroundColor: '#e4e6e7',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 60
    },
    btn: {
        width: 100,
        height: 50,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    }
})