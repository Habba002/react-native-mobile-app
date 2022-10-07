import { useState, useContext, useEffect } from "react";
import { View, Text, ImageBackground } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import axios from "axios";

import { AuthContext } from "../context/auth";
import { TaskContext } from "../context/task";

import Button from "../components/Button";
import Input from "../components/Input";

export default function TaskEdit({ navigation }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // const [auth, setAuth] = useContext(AuthContext);
  const [task, setTask] = useContext(TaskContext);

  useEffect(() => {
    if(task) setContent(task?.selected?.task)
  }, [task])

  const handleSubmit = async () => {
    if(!content){
      alert("Please write something before submitting")
      return
    }
    try {
      setLoading(true);
      const { data } = await axios.put(`/task/${task?.selected?._id}`, {
        task: content,
      });

      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        const newList = task?.tasks?.map((t) => {
          if(t._id === data._id) return data

          return t
        })

        setTask({...task, tasks: newList});       
        alert('Task updated')
        setLoading(false);
        setContent("")
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try{
      const { data } = await axios.delete(`/task/${task?.selected?._id}`);

      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        setTask({...task, tasks: task?.tasks?.filter((t) => t._id !== data._id)});       
        alert('Task deleted')
        navigation.goBack()
        
      }
    }catch(err){
      console.log(err)
      setLoading(false);
    }
  }

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
          Edit Task
        </Text>
        <Input
          name="Make some changes"
          color="#333"
          value={content}
          setValue={setContent}
        />
        <Button title="Update" loading={loading} handleSubmit={handleSubmit} /> 
        <Text style={{marginVertical: 10}} />
        <Button title="Delete" loading={loading} handleSubmit={handleDelete} backgroundColor="red"/>      
      </View>
    </KeyboardAwareScrollView>
  );
}
