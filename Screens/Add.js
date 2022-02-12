import { StyleSheet, ScrollView, TouchableOpacity, StatusBar, View, Text, ActivityIndicator } from "react-native";
import { colorPallet } from "../constants/colorpallet";
import Card from "../reusables/Card";
import { Entypo } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

export default function Add({navigation}) {

    const [books,setBooks] = useState([]);
    const [isLoading, setLoading] = useState(false);

    async function getDataFromFirestore(){
        const dataRefrence = collection(db, "Books");
        const retrievedData = await getDocs(dataRefrence);
        let tempBooks = [];
        retrievedData.forEach((data)=>{
            if(data.data()?.email==auth.currentUser.email){
                tempBooks.push(data.data());
            }
        })
        setBooks(tempBooks);
        console.log(books);
    }

    useEffect(async()=>{
        setLoading(true);
        await getDataFromFirestore();
        setLoading(false);
    },[])

    return (
        <>
        {
                isLoading ? (
                    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', top: 0 }}>
                        <ActivityIndicator size={"large"} color={colorPallet.primary} />
                    </View>
                ) : (
                    <></>
                )
            }
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.cont} contentContainerStyle={{ alignItems: 'center' }}>
                {
                    books.map((items) =>
                        <Card t={items.title} a={items.author} p={items.publisher} i={items.img_link} id={items.id} key={items.id} />
                    )
                }

            </ScrollView>
            <TouchableOpacity style={styles.floatingbtn} onPress={()=>{ navigation.navigate("AddBooks") }}>
                <Entypo name="plus" size={40} color="white" />
            </TouchableOpacity>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
        marginTop: StatusBar.currentHeight
    },
    floatingbtn: {
        width: 50,
        height: 50,
        elevation: 1,
        borderRadius: 50 / 2,
        backgroundColor: colorPallet.orange,
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
