import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../assets/firebase/firebase.init";


const googleProvider= new GoogleAuthProvider()
 export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const[isdark,setIsdark]=useState(false)

// new user
const createNewUser = (email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
}
  // user sign in
  const signInUser = (email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
}
    // update user profile
    const updateUserProfile= (updateData)=>{
      
        return updateProfile(auth.currentUser,updateData)
    }
     // log out
     const logOut = ()=>{
        setLoading(true)
      return  signOut (auth)
    }
    // sign in with google
    const signInWithGoogle = ()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }
  

    const authInfo = {
    createNewUser,
      user,
      setUser,
loading,
logOut,
signInUser,
signInWithGoogle,
updateUserProfile,
setIsdark,
isdark
    }
     // state change
   useEffect(()=>{
    const unSubsCribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
        setLoading(false)
    });
    return()=>{
        unSubsCribe()
    }
   },[])
      
      
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;