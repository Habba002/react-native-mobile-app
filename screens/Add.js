import { useState, useContext } from "react";
import { View, Text, ImageBackground } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import axios from "axios";

import { AuthContext } from "../context/auth";
import { TaskContext } from "../context/task";

import Button from "../components/Button";
import Input from "../components/Input";

export default function Add({ navigation }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // const [auth, setAuth] = useContext(AuthContext);
  const [task, setTask] = useContext(TaskContext);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/task", {
        content,
      });

      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        setTask({...task, tasks: [data, ...task.tasks, ]});       
        alert('Task created')
        setLoading(false);
        setContent("")
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
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
            marginBottom: 50,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          New Task
        </Text>
        <Input
          name="Write something"
          color="#333"
          value={content}
          setValue={setContent}
        />
        <Button title="Create" loading={loading} handleSubmit={handleSubmit} />        
      </View>
    </KeyboardAwareScrollView>
  );
}
