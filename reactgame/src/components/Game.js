import React from "react"
import Aim from "./Aim"
import Lobby from "./Lobby"
import GameInfo from "./GameInfo"
import Clicker from "./Clicker"

export default function Game({items}){

    const games = [
        <Clicker count={items.count} handleCount={items.setCount} active={items.active} />,
        <Aim count={items.count} handleCount={items.setCount} active={items.active} />
    ]

    return (
        <div className="flex justify-between 2xl:justify-center overflow-auto">
            <GameInfo items={items} />
            <div className="2xl:mx-24">
                {/* <Clicker count={items.count} handleCount={items.setCount} active={items.active} />
                <Aim count={items.count} handleCount={items.setCount} active={items.active} /> */}
                {games[items.game]}
            </div>
            <Lobby room={items.room} members={items.members} leaveRoom={items.leaveRoom} name={items.name}/>
            
        </div>
    )
}