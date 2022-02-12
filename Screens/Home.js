import { StyleSheet, ScrollView, StatusBar, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Card from '../reusables/Card';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs } from "firebase/firestore";
import { colorPallet } from '../constants/colorpallet';

export default function Home({ navigation }) {
    // const [books, setBooks] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);

    async function getDataFromFirestore() {
        const dataRefrence = collection(db, "Books");
        const retrievedData = await getDocs(dataRefrence);
        let tempBooks = [];
        retrievedData.forEach((data) => {
            tempBooks.push(data.data());
        })
        setBooks(tempBooks);
        console.log(books);
    }

    useEffect(async () => {
        setLoading(true);
        await getDataFromFirestore();
        setLoading(false);
    }, [])

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
            <ScrollView style={styles.cont} contentContainerStyle={{ alignItems: 'center' }}>
                {
                    books.map((items) =>
                        <TouchableOpacity onPress={() => { navigation.navigate("ProductScreen", { Title: items.title, Author: items.author, Publisher: items.publisher, img_link: items.img_link, email: items.email, Condition: items.conditionScore }) }} key={items.id} id={items.id}>
                            <Card t={items.title} a={items.author} p={items.publisher} i={items.img_link} />
                        </TouchableOpacity>
                    )
                }
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
        marginTop: StatusBar.currentHeight
    }
})

