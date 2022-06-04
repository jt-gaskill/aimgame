import React from "react"
import Aim from "./Aim"
import Lobby from "./Lobby"
import GameInfo from "./GameInfo"

export default function Game({items}){

    return (
        <div className="flex justify-between 2xl:justify-center overflow-auto">
            <GameInfo items={items} />
            <div className="2xl:mx-24">
                <Aim count={items.count} handleCount={items.setCount} active={items.active} />
            </div>
            <Lobby room={items.room} members={items.members} leaveRoom={items.leaveRoom} name={items.name}/>
            
        </div>
    )
}