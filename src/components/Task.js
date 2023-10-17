import React, { useState } from "react";
import More from '../images/viewmoreicon.png'
export default function Task(props) {
    const [status , setStatus] = useState("On Going")
    const [more,setMore] = useState(false)

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
        if(status === "On Going") {
            setStatus("Completed")
        }
        if(status === "Completed") {
            setStatus("Cancelled")
        }
        if(status === "Cancelled") {
            setStatus("On Going")
        }
    }
    function handleMore(){
        setMore(prevMore => !prevMore)
    }
    function onEditClick() {
        console.log("Edit Called");
    }
    function onDeleteClick() {
        console.log("Delete Called");
    }
    return (
        <div className="Task--Container">
            <div className="Hor--Bar" style={backgroundStyle}></div>
            <div className="Task--Elements">
                <div className="Task--Main">
                    <p>Comfort reached gay perhaps chamber his six detract besides add. Moonlight newspaper up he it enjoyment agreeable depending. Timed voice share led his widen noisy young. On weddings believed laughing although material do exercise of. Up attempt offered ye civilly so sitting to. She new course get living within elinor joy. She her rapturous suffering.</p>
                    <img src={More} alt="blyat" onClick={handleMore}/>
                </div>
                <div className="Task--Lower">
                    <p onClick={handleStatus} style={{cursor:"pointer"}}>Status : <span style={colorStyle}>{status}</span></p>
                    <p>Due date : 31/12/2023</p>
                </div>
            </div>
            <div className="More--Container" style={{ display: more ? "block" : "none" }}>
                <p onClick={onEditClick}>Edit</p>
                <p onClick={onDeleteClick}>Delete</p>
            </div>
        </div>
    )
}