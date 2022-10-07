import { useState, useContext } from "react";
import { View, Text, ImageBackground } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "../context/auth";

import Button from "../components/Button";
import Input from "../components/Input";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetCode, setResetCode] = useState(false);
  const [loading, setLoading] = useState("");
  const [visible, setVisible] = useState(false);

  const [auth, setAuth] = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/forgot-password", {
        email,
      });

      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        alert("Enter the new password ad reset code sent to your email");
        setLoading(false);
        setVisible(true);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handlePasswordRecet = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/reset-password", {
        email, password, resetCode
      });

      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        alert("Login to using your password");
        setLoading(false);
        navigation.navigate('SignIn')
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
            Forgot Password
          </Text>
          <Input
            name="Email"
            value={email}
            setValue={setEmail}
            keyboardType="email-address"
          />
          {visible && (
            <>
              <Input
                name="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
              />
              <Input
                name="Reset Code"
                value={resetCode}
                setValue={setResetCode}
                secureTextEntry={true}
              />
            </>
          )}
          <Button
            title="Submit"
            loading={loading}
            handleSubmit={visible ? handlePasswordRecet : handleSubmit}
          />
          <Text
            onPress={() => navigation.navigate("SignIn")}
            style={{
              color: "#fff",
              marginTop: 10,
              textAlign: "center",
              fontSize: 12,
            }}
          >
            Login
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}
