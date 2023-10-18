import React, { useEffect, useState } from "react";
import Task from "./Task";

export default function Main() {

    const[data,setData] = useState({
        message : "",
        dueDate : "",
        status : ""    
    })
    
    const [formState,setFormState] = useState(false)

    const [tasks,setTasks] = useState([])
    useEffect(()=> {
        fetch("/taskList")
            .then(res=>res.json())
            .then(data=>setTasks(data))
    },[])

    function handleFormState() {
      setFormState(prevFormState => !prevFormState)
    }


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
      
      function handleAddSubmit() {
        if(data.text === "") {
          // handle empty text field swal
        }
        if(data.dueDate === "") {
          // handle empty text field using swal
        }
      }

      const tasksArray = tasks.map((task,i) => {
        return(
            <Task
              key={i}
              tasksDetail = {task}
            />
        )
      })

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
                  <form action="/addTask" method="post" onSubmit={handleAddSubmit}>
                          <textarea 
                          placeholder='Task'
                          type='text'
                          name="message"
                          value={data.message}
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
                  {tasksArray}
            </div>

        </div>
    )
}