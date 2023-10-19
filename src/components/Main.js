import React, { useEffect, useState } from "react";
import Task from "./Task";

export default function Main() {

    const[data,setData] = useState({
        message : "",
        dueDate : "",
        status : ""    
    })
    
    const [formState,setFormState] = useState(false)
    const [editFormState,setEditFormState] = useState(false)
    const [specTask, setSpecTask] = useState(null);
    const [tasks,setTasks] = useState([])

    useEffect(()=> {
        fetch("/taskList")
            .then(res=>res.json())
            .then(data=>setTasks(data))
    },[])

    function handleFormState() {
      setFormState(prevFormState => !prevFormState)
    }

    function handleEditTaskReceived(data) {
      setSpecTask(data);
    }
    
    useEffect(() => {
      if (specTask) {
        const selectedDate = new Date(specTask.taskDueDate);
        const formattedDate = `${selectedDate.getFullYear()}-${
          String(selectedDate.getMonth() + 1).padStart(2, "0")
        }-${String(selectedDate.getDate()).padStart(2, "0")}`;
        
        setData({
          message: specTask.taskMessage,
          dueDate: formattedDate
        });
      }
      setEditFormState(prevState => !prevState)
    }, [specTask]);

    
    function handleClose() {
      setEditFormState(prevState => !prevState)
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

      function handleUpdateSubmit() {
        const updatedTaskData = {
          taskId: specTask.taskid,
          message: data.message,
          dueDate: data.dueDate,
        };
      
        fetch("/editTask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTaskData),
        })
          .then((response) => response.text())
          .then((data) => {
            console.log("Success");
            window.location.reload();

            setTasks((prevTasks) =>
              prevTasks.map((task) =>
                task.taskid === updatedTaskData.taskId ? updatedTaskData : task
              )
            );
            handleClose();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
      

      const tasksArray = tasks.map((task,i) => {
        return(
            <Task
              key={i}
              tasksDetail = {task}
              onEditTask={handleEditTaskReceived}
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
                <div className="Form--Container" style={{ display: editFormState ? "block" : "none" }}>
                  <h1>Edit Task</h1>
                  <form action="/editTask" method="post" onSubmit={handleUpdateSubmit}>
                          <p onClick={handleClose}>X</p>
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
                          <button>Update Task</button>
                  </form>
                </div>
                  {tasksArray}
            </div>

        </div>
    )
}