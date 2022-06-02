import React from "react"
import Aim from "./Aim"
import Countdown from "./Countdown"
import Lobby from "./Lobby"
import GameInfo from "./GameInfo"

export default function Game({items}){

    return (
        <div className="flex justify-center">
            <GameInfo items={items} />
            <div className="mx-auto">
                <Aim count={items.count} handleCount={items.setCount} active={items.active} />
            </div>
            <Lobby room={items.room} members={items.members} leaveRoom={items.leaveRoom}/>
            
        </div>
    )
}