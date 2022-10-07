import { useState, useContext } from "react";
import { View, Text, ImageBackground } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "../context/auth";

import Button from "../components/Button";
import Input from "../components/Input";

export default function SignUp({navigation}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState("")

  const [auth, setAuth] = useContext(AuthContext)

  const handleSubmit = async () => {    
    try{
      if(password !== confirm){
        alert("Password does not match")
        return
      }

      setLoading(true)
      const {data} = await axios.post("/signup", {
        name, email, password
      })

      if(data.error){
        alert(data.error)
        setLoading(false)
      }else{
        alert("Registration successful")
        setAuth(data)
        await AsyncStorage.setItem('@auth', JSON.stringify(data))
        // setLoading(false)
        navigation.navigate('Home')
      }      
    }catch(err){
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../assets/energy.jpg")}
      style={{
        flex: 1,
        width: "100%",
        borderRadius: 100,
      }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <View style={{ flex: 1, justifyContent: "center", margin: 20 }}>
          <Text
            style={{
              color: "#fff",
              marginBottom: 50,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18
            }}
          >
            Register
          </Text>
          <Input name="Name" value={name} setValue={setName} autoCapitalize="words"/>
          <Input name="Email" value={email} setValue={setEmail} keyboardType="email-address"/>
          <Input name="Password" value={password} setValue={setPassword} secureTextEntry={true} />
          <Input name="Confirm Password" value={confirm} setValue={setConfirm} secureTextEntry={true} />
          <Button title="Submit" loading={loading} handleSubmit={handleSubmit}/>
          <Text
            style={{
              color: "#fff",
              marginTop: 10,
              textAlign: "center",
              fontSize: 12
            }}
          >
            Already registered. <Text
            onPress={() => navigation.navigate('SignIn')}
            style={{
              color: "#fff",
            }}>Login</Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}
