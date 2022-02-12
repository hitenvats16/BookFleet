import { View, Text, Image } from 'react-native'
import { colorPallet } from '../constants/colorpallet';

export default function NetworkPrompt() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'white', padding: 10 }}>
            <Image source={require('../assets/snap.png')} style={{ width: 400, height: 275 }} />
            <Text style={{
                fontSize: 20,
                color: colorPallet.primaryDark,
                fontWeight: 'bold',
                textAlign: 'center'
            }}>Please Connect to a network and restart the app.</Text>
        </View>
    );
}