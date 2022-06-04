import React from "react"

export default function Lobby(props){
    // const limembers = props.members.map(mem => <li>{props.host=== mem ? mem+"(Host)": mem}</li>)
    let tempMembers = []
    const datakeys = Object.keys(props.members)
    // console.log(datakeys)
    // let presentHost = false
    for (let i = 0; i < datakeys.length; i++) {
        tempMembers.push(<li className={props.name === props.members[datakeys[i]]["name"] ? "font-bold":""} 
        key={datakeys[i]}>{props.members[datakeys[i]]["name"]}
            {props.members[datakeys[i]]["host"] ? " (Host)" : ""}</li>)
        // if (props.members[datakeys[i]]["host"]) {
        //     presentHost = true
        // }
    }
    // console.log(presentHost)

    return(
        <div className="w-1/6 bg-[#9ffac2] p-4 rounded-3xl flex flex-col justify-between">
            <div>
                <h5 className="text-center font-bold text-2xl">Lobby</h5>
                <hr className="border-black"></hr>
                <h3 className="mt-3">Room #: {props.room}</h3>
                <ul className="list-disc ml-6 mt-3">
                    {/* {props.members} */}
                    {tempMembers}
                </ul>
            </div>
            <button className="bg-red-500 rounded-md p-1" onClick={props.leaveRoom}>Leave</button>
        </div>
    )
}