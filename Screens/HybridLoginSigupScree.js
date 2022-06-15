import { View, Text, StyleSheet } from 'react-native';
import { colorPallet } from '../constants/colorpallet';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Screen1 from '../reusables/SignInScreen';
import Screen2 from '../reusables/SignUpScreen';


const Tab = createMaterialTopTabNavigator();

export default function HybridScreen({ navigation }) {
    return (
        <View style={styles.cont}>
            <Text style={styles.heading}>Continue to App</Text>
            <View style={styles.card}>
                    <Tab.Navigator style={{borderRadius: 10}}>
                        <Tab.Screen name="SignIn" component={Screen1} />
                        <Tab.Screen name="SignUp" component={Screen2} />
                    </Tab.Navigator>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorPallet.primary
    },
    card: {
        height: 400,
        backgroundColor: 'white',
        width: 350,
        borderRadius: 10,
        elevation: 5
    },
    heading: {
        marginBottom: 40,
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold'
    }
})