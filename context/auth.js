import { useState, createContext, useEffect } from "react";

import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../config";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({
    user: null,
    token: ""
  })

  useEffect (() => {
    loadFromAsyncStorage()
  }, [])

  axios.defaults.baseURL = API
  axios.defaults.headers.common["Authorization"] = auth?.token
  axios.interceptors.response.use((response) => { return response }, 
  async (err) => {
    if (err.response.status === 401 || err.response.status === 403) {
      await AsyncStorage.removeItem("@auth")
      setAuth({user: null, token: ""});
      alert("Session expried. Please login!")
    }
    return Promise.reject(err)
  })

  const loadFromAsyncStorage = async () => {
    let data = await AsyncStorage.getItem('@auth')
    data = JSON.parse(data)
    setAuth({...auth, user: data.user, token: data.token})
  }

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContext, AuthProvider}