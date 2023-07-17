import { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase.config";
import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, } from 'firebase/auth'
export const AuthContext = createContext();

const auth = getAuth(app)
const UserContext = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true)

    const googleprovider = new GoogleAuthProvider()
    const  createUser = (email,password) => {
       
       return createUserWithEmailAndPassword(auth,email,password);
    }

    const signIn = (email,password) => {
     
        return signInWithEmailAndPassword(auth,email,password)
     }
     const googleSingIn = ()  => {
        return signInWithPopup(auth,googleprovider)
    }
     const logOut = () => {
        return signOut(auth)
     }

     useEffect(() => {
        const unsubscribe  = onAuthStateChanged(auth,currentUser => {
              setUser(currentUser);
              setLoading(false)
              
          });
          return () => unsubscribe()
      },[])
      

    const authInfo = {createUser,signIn,logOut,googleSingIn,user,loading}

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default UserContext;