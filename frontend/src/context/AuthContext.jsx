import { createContext,useContext,useState,useEffect, Children } from "react";
const AuthContext=createContext();

export const AuthProvider =({ children})=>{
    const [user,setuser] =useState(
        JSON.parse(localStorage.getItem("user")) || null
    )

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(user));
    },[user])

    const login=(userdata)=>setuser(userdata)
    const logout=()=>setuser(null)
    return(
        <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
