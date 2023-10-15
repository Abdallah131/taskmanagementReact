import React from "react";
import Task from "./Task";

export default function Main() {
    return (
        <div className="Container">
            <div className="Title">
                <h1>Task Management Application</h1>
            </div>
            <div className="Header">
                    <h2>This Month</h2>
                    <button>Add Task</button>
            </div>
            <div className="Main">
                <Task />
                <Task />
            </div>

        </div>
    )
}