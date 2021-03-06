import React from "react"

export default function Intro(props){
    return(
        <div className="w-auto h-screen flex">
            <div className="h-[240px] w-[470px] bg-[#05386b] mx-auto my-auto rounded-lg flex flex-col justify-evenly relative drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
                <h1 className="absolute text-7xl top-[-170px] text-center">Rapidfire games</h1>
                <div className="flex flex-col">
                    <input className="w-48 p-2 mx-auto rounded-md mb-2"
                        placeholder="room number" onChange={(event) => props.handleRoom(event.target.value)} />
                    <input className="w-48 p-2 mx-auto rounded-md mt-2"
                        placeholder="name" onChange={(event) => props.handleChange(event.target.value)} />
                </div>  
                <div className="flex justify-evenly">
                    <button className="w-32 rounded-xl px-4 py-1 drop-shadow-2xl bg-[#8ee4af] hover:bg-[#76c293]" onClick={props.joinGame}>Join</button>
                    <button className="w-32 rounded-xl px-4 py-1 drop-shadow-2xl bg-[#8ee4af] hover:bg-[#76c293]" onClick={props.createLobby}>Create lobby</button>
                    {/* <button className="w-32 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 px-4 py-1" onClick={props.createLobby}>Create lobby</button> */}
                </div>
            </div>
        </div>
            
    )
    
}