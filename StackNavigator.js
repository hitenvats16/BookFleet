import React, { useEffect, useState } from "react";
import HomeScreen from "./Screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HybridScreen from "./Screens/HybridLoginSigupScree";
import ProductScreen from "./Screens/ProductScreen";
import AddBook from "./Screens/AddBook";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "./reusables/loader";
import { auth } from "./firebase/firebase";

const Stack = createNativeStackNavigator();

function StackNavigator() {
  const [isLogin, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // check whether user id previosly logged in or not
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setLogin(true);
      }
    });
    setLoading(false);
  }, []);

  //displays login screen until function checks for previously logged in user
  if(loading){
    return(<Loader/>);
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLogin ? (
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ProductScreen" component={ProductScreen} />
          <Stack.Screen
            name="AddBooks"
            component={AddBook}
            options={{ headerShown: true, headerTitleAlign: "center" }}
          />
        </>
      ) : (
        <Stack.Screen name="HybridScreen" component={HybridScreen} />
      )}
    </Stack.Navigator>
  );
}

export default StackNavigator;
