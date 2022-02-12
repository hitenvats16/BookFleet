import { useContext, createContext, useState, useEffect } from "react";
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";


const AuthContext = createContext();

export function AuthWrapper({ children }) {
    const [isLogin, setLogin] = useState(false);
    const [displayName, setDisplayName] = useState();

    useEffect(() => {
        const unSubscribe = async()=>{
            onAuthStateChanged(auth, (data) => {
                if (data) {
                    setLogin(true);
                }
            });
        }
        return unSubscribe;
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLogin,
                setLogin,
                setDisplayName,
                displayName
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}