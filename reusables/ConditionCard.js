import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ConditionCard({ conditionScore }) {

    const [color, setColor] = useState();
    const [cond, setCond] = useState();

    useEffect(() => {
        if (conditionScore == 1) {
            setCond("Bad");
            setColor("#FC4F4F");
        } else if (conditionScore == 2) {
            setCond("Acceptable");
            setColor("#F1D00A");
        } else {
            setCond("Good");
            setColor("#06FF00");
        }
    }, [])

    return (
        <View style={[styles.Condition,{ backgroundColor: color }]}>
            <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }} >{cond}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Condition: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 10,
        borderRadius: 10
    },
})