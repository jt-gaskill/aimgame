import React from "react"

export default function Intro(props){
    return(
        <div className="w-auto h-screen flex">
            <div className="h-1/4 w-1/4 bg-cyan-500 mx-auto my-auto rounded-lg flex flex-col justify-evenly ">
                <div className="flex flex-col">
                    <input className="w-48 p-2 mx-auto rounded-md mb-2"
                        placeholder="room number" onChange={(event) => props.handleRoom(event.target.value)} />
                    <input className="w-48 p-2 mx-auto rounded-md mt-2"
                        placeholder="name" onChange={(event) => props.handleChange(event.target.value)} />
                </div>  
                <div className="flex justify-evenly">
                    <button className="w-32 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 px-4 py-1" onClick={props.joinGame}>Join</button>
                    <button className="w-32 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 px-4 py-1" onClick={props.createLobby}>Create lobby</button>
                </div>
            </div>
        </div>
            
            )
    
}