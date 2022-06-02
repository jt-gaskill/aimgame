import React from "react"

export default function Lobby(props){
    // const limembers = props.members.map(mem => <li>{props.host=== mem ? mem+"(Host)": mem}</li>)

    return(
        <div className="w-1/6 bg-red-600">
            <h3>Room #: {props.room}</h3>
            <ul>
                {props.members}
            </ul>
            <button className="bg-slate-400 rounded-md p-1" onClick={props.leaveRoom}>Leave</button>
        </div>
    )
}