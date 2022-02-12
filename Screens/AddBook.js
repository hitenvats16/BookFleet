import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ToastAndroid, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { colorPallet } from '../constants/colorpallet';
import { auth } from '../firebase/firebase';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { db } from '../firebase/firebase';

export default function AddBook({ navigation }) {
    const [Condition, setCondition] = useState();
    const [Title, setTitle] = useState();
    const [Author, setAuthor] = useState();
    const [Publisher, setPublisher] = useState();
    const [image, setImage] = useState(null);
    const [picker, setPicker] = useState();
    const [uploadUrl, setUploadUrl] = useState();
    const [isloading, setLoading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            setPicker(result);
        }
    };

    const HandleUploadDataToDB = async () => {
        try {
            await addDoc(collection(db, "Books"), {
                title: Title,
                author: Author,
                publisher: Publisher,
                conditionScore: Condition,
                email: auth.currentUser.email,
                img_link: uploadUrl
            });
        } catch (e) {
            alert(e.message);
        }
    }

    async function _handleImagePicked(pickerResult) {
        setLoading(true);
        let _uploadUrl;
        if (!pickerResult.cancelled) {
            _uploadUrl = await uploadImageAsync(pickerResult.uri);
        }
        setUploadUrl(_uploadUrl);
        setLoading(false);
        return;
    }

    async function uploadImageAsync(uri) {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
        let id = uuidv4();
        const fileRef = ref(getStorage(), id);
        await uploadBytes(fileRef, blob);
        blob.close();
        return await getDownloadURL(fileRef);
    }

    return (
        <>
            {
                isloading ? (
                    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', top: 0 }}>
                        <ActivityIndicator size={"large"} color={colorPallet.primary} />
                    </View>
                ) : (
                    <></>
                )
            }
            <View style={styles.cont}>
                <View style={styles.upper}>
                    {
                        image ? (
                            <TouchableOpacity onPress={() => { pickImage(); }} style={{ width: '100%', height: '100%' }}>
                                <Image source={{ uri: image }} resizeMode={'contain'} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => { pickImage(); }}>
                                <AntDesign name="pluscircleo" size={50} color="black" />
                            </TouchableOpacity>
                        )
                    }
                </View>
                <View style={styles.lower}>
                    <TextInput style={styles.input} placeholder="Book Title" onChangeText={(val) => { setTitle(val) }} />
                    <TextInput style={styles.input} placeholder="Book Author" onChangeText={(val) => { setAuthor(val) }} />
                    <TextInput style={styles.input} placeholder="Book Publisher" onChangeText={(val) => { setPublisher(val) }} />
                    <Text style={{ marginVertical: 5, color: '#b1b1b1' }}>Select Condition:</Text>
                    <Picker
                        selectedValue={Condition}
                        onValueChange={(itemValue, itemIndex) => {
                            setCondition(itemValue);
                        }}
                    >
                        <Picker.Item label={"Good"} value={"3"} />
                        <Picker.Item label={"Acceptable"} value={"2"} />
                        <Picker.Item label={"Bad"} value={"1"} />
                    </Picker>
                    <TouchableOpacity style={styles.btn} onPress={async () => {
                        if (Title && Author && Publisher && Condition && image) {
                            await _handleImagePicked(picker);
                            if (!uploadUrl) {
                                ToastAndroid.showWithGravity("Please press Button again", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                                return;
                            }
                            await HandleUploadDataToDB();
                            ToastAndroid.showWithGravity("data uploaded succesfully", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                            navigation.goBack();
                            return;
                        } else {
                            alert("Please fill all the details.");
                            return;
                        }
                    }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Add This Book</Text>
                    </TouchableOpacity>
                </View>
            </View >
        </>
    );
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
    },
    upper: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lower: {
        flex: 0.7,
        padding: 10
    },
    input: {
        width: '100%',
        backgroundColor: '#fbfbfb',
        paddingVertical: 5,
        paddingHorizontal: 7,
        borderRadius: 5,
        marginVertical: 5
    },
    btn: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorPallet.orange,
        borderRadius: 10,
        marginVertical: 10
    }
})