import StackNavigator from "./StackNavigator";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import NetworkPrompt from "./Screens/NetworkPromt";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function App() {
  const [isConnected, setConnected] = useState(false);
  useEffect(() => {
    NetInfo.fetch().then((state) => {
      setConnected(state.isConnected);
    });
  });

  if (isConnected) {
    return (
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    );
  }
  return <NetworkPrompt />;
}
