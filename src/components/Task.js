import React, { useState } from "react";
import More from '../images/viewmoreicon.png'
export default function Task() {
    const [status , setStatus] = useState("On Going")

    let styles = {}
    if(status === "On Going") {
        styles = {
            backgroundColor : "#0984E3",
            color : "#0984E3"
        }
    }else if(status === "Completed") {
        styles = {
            backgroundColor : "#00B894",
            color : "#00B894"
        }
    }else {
        styles = {
            backgroundColor : "#da5656",
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

    return (
        <div className="Task--Container">
            <div className="Hor--Bar" style={styles}></div>
            <div className="Task--Elements">
                <div className="Task--Main">
                    <p>Comfort reached gay perhaps chamber his six detract besides add. Moonlight newspaper up he it enjoyment agreeable depending. Timed voice share led his widen noisy young. On weddings believed laughing although material do exercise of. Up attempt offered ye civilly so sitting to. She new course get living within elinor joy. She her rapturous suffering.</p>
                    <img src={More} alt="blyat"/>
                </div>
                <div className="Task--Lower">
                    <p onClick={handleStatus} style={{cursor:"pointer"}}>Status : {status}</p>
                    <p>Due date : 31/12/2023</p>
                </div>
            </div>
        </div>
    )
}