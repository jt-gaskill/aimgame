import React from "react"

export default function Lobby(props){
    // const limembers = props.members.map(mem => <li>{props.host=== mem ? mem+"(Host)": mem}</li>)
    let tempMembers = []
    const datakeys = Object.keys(props.members)
    // console.log(datakeys)
    // let presentHost = false
    tempMembers.push(<div className="decoration-solid">Name</div>)
    tempMembers.push(<div className="text-right decoration-solid">Score</div>)
    tempMembers.push(<div className="text-right decoration-solid">Wins</div>)
    for (let i = 0; i < datakeys.length; i++) {
        tempMembers.push(
        // <div className={
        // "flex justify-between "+(props.name === props.members[datakeys[i]]["name"] ? "font-bold" : "")}>
        //     <li  key={datakeys[i]}>{props.members[datakeys[i]]["name"]}
        //         {props.members[datakeys[i]]["host"] ? " (Host)" : ""}
        //     </li>
        //     <span>{props.members[datakeys[i]]["count"]}</span>
        //     <span>{props.members[datakeys[i]]["roundwins"]}</span>
        // </div>
            <div className={
        "flex justify-between "+(props.name === props.members[datakeys[i]]["name"] ? "font-bold" : "")}>
                <span>{props.members[datakeys[i]]["name"]}</span>
                <span className="ml-1">{props.members[datakeys[i]]["host"] ? " (Host)" : ""}</span>
            </div>
        
        
        )
        tempMembers.push(<div className="text-right">{props.members[datakeys[i]]["count"]}</div>)
        tempMembers.push(<div className="text-right">{props.members[datakeys[i]]["roundwins"]}</div>)
        // if (props.members[datakeys[i]]["host"]) {
        //     presentHost = true
        // }
    }
    // console.log(presentHost)

    return(
        <div className="w-1/6 bg-[#9ffac2] p-4 pt-3 rounded-3xl flex flex-col justify-between">
            <div>
                <h5 className="text-center font-bold text-2xl">Room # {props.room}</h5>
                <hr className="border-black"></hr>
                {/* <div className="flex justify-between mt-3">
                    <h3 className="">Room # {props.room}</h3>
                    <span>Wins</span>
                </div> */}
                
                {/* <ul className="list-disc ml-6 mt-3">
                    {props.members}
                    {tempMembers}
                </ul> */}
                <div className="grid grid-cols-3 gap-2">
                    {tempMembers}
                </div>
            </div>
            <button className="bg-red-500 rounded-md p-1" onClick={props.leaveRoom}>Leave</button>
        </div>
    )
}