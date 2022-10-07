import { useContext, useEffect, useState } from "react"

import { ScrollView, Text, View, Image } from "react-native"

import axios from "axios"

import { TaskContext } from "../context/task"
import Button from "../components/Button"
import TaskList from "../components/TaskList"

export default function Add(){
  const [task, setTask] = useContext(TaskContext)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadTask()
    getTotal()
  }, [])

  useEffect(() => {
    if(page === 1) return
    
    loadMore()
  }, [page])

  const loadTask = async () => {
    try{
      setLoading(true)
      const { data } = await axios.get(`/tasks?page=${page}`)
      setTask({...task, tasks: data})
      setLoading(false)
    }catch(err){
      console.log(err)
      setLoading(false)
    }
  }

  const loadMore = async () => {
    try{
      setLoading(true)
      const { data } = await axios.get(`/tasks?page=${page}`)
      setTask({...task, tasks: [...task.tasks, ...data]})
      console.log('Task', data.length)
      setLoading(false)
    }catch(err){
      console.log(err)
      setLoading(false)
    }
  }

  const getTotal = async () => {
    try{
      const { data } = await axios.get("/task-count")
      setTotal(data)
    }catch(err){
      console.log(err)
    }
  }

  if(loading){
    return (
      <View style={{ alignItems: "center", justifyContent: "center", height: "100%", backgroundColor: "#fff"}}>
        <Image
          source={require("../assets/loading.gif")}
          style={{
            height: 200, width: "100%"
          }}
        />
      </View>
    )
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text>{task?.tasks?.length}</Text>
      
      <TaskList tasks={task?.tasks} loading={loading}/>
      {task?.tasks?.length < total && (
        <View style={{
          margin: 10,
        }}>
          <Button title={'Load more'} disabled={loading} handleSubmit={() => {setPage(page + 1)}}/>
        </View>        
      )}
    </ScrollView>    
  )
}