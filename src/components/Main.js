import React, { useEffect, useState } from "react";
import Task from "./Task";

export default function Main() {

    const[data,setData] = useState({
        text : "",
        dueDate : ""    
    })
    
    const [formState,setFormState] = useState(false)

    // TO RETRIEVE TASKS FROM DB
    // const [tasks,setTasks] = useState([])
    // useEffect(()=> {
    //     fetch("/taskList")
    //         .then(res=>res.json())
    //         .then(data=>setTasks(data))
    // },[])

    function handleFormState() {
      setFormState(prevFormState => !prevFormState)
    }

    console.log(formState)

    function handleChange(e) {
        const { value, name } = e.target;
        if (name === "dueDate") {
          const selectedDate = new Date(value);
          const formattedDate = `${selectedDate.getFullYear()}-${
            String(selectedDate.getMonth() + 1).padStart(2, "0")
          }-${String(selectedDate.getDate()).padStart(2, "0")}`;
      
          setData(prevData => ({
            ...prevData,
            [name]: formattedDate
          }));
        } else {
          setData(prevData => ({
            ...prevData,
            [name]: value
          }));
        }
      }
      
    return (
        <div className="Container">
            <div className="Title">
                <h1>Task Management Application</h1>
            </div>
            <div className="Header">
                    <h2>This Month</h2>
                    <button onClick={handleFormState}>Add Task</button>
            </div>
            <div className="Main">
                <div className="Form--Container" style={{ display: formState ? "block" : "none" }}>
                  <h1>Add Task</h1>
                  <form action="/addTask" method="post">
                          <textarea 
                          placeholder='Task'
                          type='text'
                          name="text"
                          value={data.text}
                          onChange={handleChange}
                          required
                          /><br/>
                          <span>Due Date : </span><input 
                          placeholder='Due Date'
                          type='date'
                          name="dueDate"
                          value={data.dueDate}
                          onChange={handleChange}
                          required
                          /><br/><br/>
                          <button>Add Task</button>
                  </form>
                </div>
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
            </div>

        </div>
    )
}