
import React from "react";
import HomeScreen from "./Screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth from "./hooks/UseAuth";
import HybridScreen from "./Screens/HybridLoginSigupScree";
import ProductScreen from "./Screens/ProductScreen";
import AddBook from "./Screens/AddBook";

const Stack = createNativeStackNavigator();

function StackNavigator() {

  const { isLogin } = useAuth();

  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {
          isLogin ?
            (
              <>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="ProductScreen" component={ProductScreen} />
                <Stack.Screen name="AddBooks" component={AddBook} options={{headerShown: true, headerTitleAlign:'center'}}/>
              </>
            ) : (
              <Stack.Screen name="HybridScreen" component={HybridScreen} />
            )
        }
      </Stack.Navigator>
  );
}

export default StackNavigator;