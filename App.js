import { AuthWrapper } from './hooks/UseAuth';
import StackNavigator from "./StackNavigator";
import { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import NetInfo from '@react-native-community/netinfo';
import NetworkPrompt from './Screens/NetworkPromt';

export default function App() {

  const [isConnected, setConnected] = useState(false);
  useEffect(() => {
    const unSubscribe =  NetInfo.fetch().then(state => {
      setConnected(state.isConnected);
    });
    return unSubscribe;
  }, []);

  if (isConnected) {
    return (
      <NavigationContainer>
        <AuthWrapper>
          <StackNavigator />
        </AuthWrapper>
      </NavigationContainer >
    );
  }
  return <NetworkPrompt/>
}
