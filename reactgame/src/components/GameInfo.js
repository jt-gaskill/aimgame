import React from "react"
import Countdown from "./Countdown"

export default function GameInfo({items}){
    const gamenames = ["Clicker", "Aim"]

    const [best, setBest] = React.useState(() => (JSON.parse(localStorage.getItem("best"+gamenames[items.game])) || 0))
    console.log(gamenames[items.game])
    React.useEffect(() => {
        if (items.count > best) {
            setBest(items.count)
            localStorage.setItem("best"+gamenames[items.game], JSON.stringify(items.count))
        }
    }, [items.active])

    React.useEffect(() => {
        setBest(JSON.parse(localStorage.getItem("best" + gamenames[items.game])) || 0)
    },[items.game])


    return (
        <div className="w-1/6 bg-[#9ffac2] p-4 pt-3 rounded-3xl border-solid border-black flex flex-col justify-between">
            <div className="">
                <h5 className="text-center font-bold text-2xl">Game Information</h5>
                <hr className="border-black"></hr>
                <p className="mt-3">Game: {gamenames[items.game]}</p>
                <p className="mt-3">Best: {best}</p>
                <p className="mt-4">Count: {items.count}</p>
            </div>
            <Countdown time={items.time} />
            {/* {(items.host && !items.active) ? <button className="bg-green-600 rounded-md p-1" onClick={items.startGame}>Start Round</button> :
                <button className="bg-slate-400 rounded-md p-1 cursor-default">In Progress</button> } */}
            {items.host ? (!items.active ? 
                <button className="bg-green-600 rounded-md p-1" onClick={items.startGame}>Start Round</button> :
                <button className="bg-slate-400 rounded-md p-1 cursor-default">In Progress</button> 
            ) : (!items.active ? 
                    <button className="bg-yellow-500 rounded-md p-1 cursor-default">Waiting for host...</button> :
                    <button className="bg-slate-400 rounded-md p-1 cursor-default">In Progress</button> 
            )}
            
        </div>
    )
}