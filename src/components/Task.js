import React, { useEffect, useState } from "react";
import More from '../images/viewmoreicon.png'

export default function Task(props) {
    const [status , setStatus] = useState(props.tasksDetail.status)
    const [more,setMore] = useState(false)

    useEffect(() => {
        setStatus(props.tasksDetail.status);
      }, [props.tasksDetail.status]);
      
    let backgroundStyle = {}
    let colorStyle = {}
    if(status === "On Going") {
        backgroundStyle = {
            backgroundColor : "#0984E3"
        }
        colorStyle = {
            color : "#0984E3"
        }
    }else if(status === "Completed") {
        backgroundStyle = {
            backgroundColor : "#00B894"
        }
        colorStyle = {
            color : "#00B894"
        }
    }else {
        backgroundStyle = {
            backgroundColor : "#da5656"
        }
        colorStyle = {
            color : "#da5656"
        }
    }

    function handleStatus () {
        let newStatus;

        if(status === "On Going") {
            setStatus("Completed")
            newStatus = "Completed";
        }
        if(status === "Completed") {
            setStatus("Cancelled")
            newStatus = "Cancelled";
        }
        if(status === "Cancelled") {
            setStatus("On Going")
            newStatus = "On Going";
        }

        fetch("/updateStatus", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              taskId: props.tasksDetail._id,
              newStatus,
            }),
          })
            .then((response) => response.text())
            .then((data) => {
              console.log("Success");
            })
            .catch((error) => {
              console.error("Error:", error);
            });
    }

    function handleMore(){
        setMore(prevMore => !prevMore)
    }

    function onEditClick() {
        fetch("/specTask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                taskId: props.tasksDetail._id
            })
        })
        .then((res) => res.json())
        .then((data) => {
            props.onEditTask(data);
        })
        .catch((err) => {
            console.log("Error: ", err);
        });
    }

    function onDeleteClick() {
        fetch("/deleteTask",{
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                taskId: props.tasksDetail._id,
            })
        })
        .then((res)=> res.text())
        .then((data) => {
            console.log("Success")
            window.location.reload();
        })
        .catch((err) => {
            console.log("Error :", err)
        })
    }

    function formatDate(dateString) {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return "Invalid Date";
            }
            return date.toISOString().split('T')[0];
        } catch (error) {
            console.error("Error formatting date:", error);
            return "Invalid Date";
        }
    }
    

    return (
        <div className="Task--Container">
            <div className="Hor--Bar" style={backgroundStyle}></div>
            <div className="Task--Elements">
                <div className="Task--Main">
                    <p>{props.tasksDetail.message}</p>
                    <img src={More} alt="blyat" onClick={handleMore}/>
                </div>
                <div className="Task--Lower">
                    <p onClick={handleStatus} style={{cursor:"pointer"}}>Status : <span style={colorStyle}>{status}</span></p>
                    <p>Due date: {formatDate(props.tasksDetail.dueDate)}</p>
                </div>
            </div>
            <div className="More--Container" style={{ display: more ? "block" : "none" }}>
                <p onClick={onEditClick}>Edit</p>
                <p onClick={onDeleteClick}>Delete</p>
            </div>
        </div>
    )
}