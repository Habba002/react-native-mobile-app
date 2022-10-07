import { useState, useContext } from "react";
import { View, Text, ImageBackground } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "../context/auth";

import Button from "../components/Button";
import Input from "../components/Input";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  const [auth, setAuth] = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/signin", {
        email,
        password,
      });

      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        setAuth(data);
        await AsyncStorage.setItem("@auth", JSON.stringify(data));
        // setLoading(false);
        navigation.navigate("Home");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

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
              fontSize: 18,
            }}
          >
            Login
          </Text>
          <Input
            name="Email"
            value={email}
            setValue={setEmail}
            keyboardType="email-address"
          />
          <Input
            name="Password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
          <Button title="Login" loading={loading} handleSubmit={handleSubmit} />
          <Text
            style={{
              color: "#fff",
              marginTop: 10,
              textAlign: "center",
              fontSize: 12,
            }}
          >
            Don't have an account?{" "}
            <Text
              onPress={() => navigation.navigate("SignUp")}
              style={{
                color: "#fff",
              }}
            >
              Register
            </Text>
          </Text>
          <Text
            onPress={() => navigation.navigate("ForgotPassword")}
            style={{
              color: "#fff",
              marginTop: 10,
              textAlign: "center",
              fontSize: 12,
            }}
          >
            Forgot Password
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}
