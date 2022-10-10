import React, { useState, useEffect } from "react";
import { createContext, useContext } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from "../js/firebase/firebase";
import useToggleNavbar from "../hooks/useToggleNavbar";
import aforosRealtime from "../hooks/useGetData";
import useGetTotalContagios from '../hooks/useGetTotalContagios';
import useGetExcesosMensual from "../hooks/useGetExcesosMensual";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('There is not auth provider');
    return context;
}

export function AuthProvider({ children }) {



    // user interface
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { clickToggle, toggle } = useToggleNavbar();

    //database firebase
    const { aforos } = aforosRealtime();
    const { totalContagioCount, loadTotalContags } = useGetTotalContagios();
    console.log('contagios auth ->', totalContagioCount)

    //time for dashboard
    var timeToday = new Date();     // get all datatime
    //var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //console.log(date);

    //// excesos mensuales
    const {emVar , emVarAlta, emDam, 
        exMonthsVar, exMonthsVarAlta, exMonthsDam } = useGetExcesosMensual();

    const login = async (email, password) => {
        console.log("verificando user and password", email, password);
        signInWithEmailAndPassword(auth, email, password);
    }
    const logout = () => signOut(auth);

    useEffect(() => {
        // setSumEmVar(Object.entries(emVar).map(([key,value]) => value).reduce((previusValue, currentValue) => previusValue+ currentValue, 0));
        // setSumEmVarAlta(Object.entries(emVarAlta).map(([key,value]) => value).reduce((previusValue, currentValue) => previusValue+ currentValue, 0));
        // setSumEmDam(Object.entries(emDam).map(([key,value]) => value).reduce((previusValue, currentValue) => previusValue+ currentValue, 0));

        console.log("auth provider loader");
        const unsubuscribe = onAuthStateChanged(auth, currentUser => {
            console.log("currentUser", currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubuscribe();
    }, [])

    return (
        <AuthContext.Provider value={{ 
            toggle, 
            clickToggle, 
            login, 
            logout, 
            user, 
            loading, 
            aforos, 
            totalContagioCount, 
            loadTotalContags, 
            timeToday,
            
            //excesos mensuales
            emVar,
            emVarAlta,
            emDam,

            exMonthsVar,
            exMonthsVarAlta,
            exMonthsDam
            }}>
            {children}
        </AuthContext.Provider>
    )
}