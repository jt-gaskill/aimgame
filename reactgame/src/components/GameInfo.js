import React from "react"
import Countdown from "./Countdown"

export default function GameInfo({items}){
    const [best, setBest] = React.useState(() => (JSON.parse(localStorage.getItem("bestAim")) || 0))

    React.useEffect(() => {
        if (items.count > best) {
            setBest(items.count)
            localStorage.setItem("bestAim", JSON.stringify(items.count))
        }
    }, [items.active])


    return (
        <div className="w-1/6 bg-[#9ffac2] p-4 rounded-3xl border-solid border-black flex flex-col justify-between">
            <div className="">
                <h5 className="text-center font-bold text-2xl">Game Information</h5>
                <hr className="border-black"></hr>
                <p className="mt-3">Count: {items.count}</p>
                
                <p className="">Best: {best}</p>
            </div>
            <Countdown time={items.time} />
            {/* {(items.host && !items.active) ? <button className="bg-green-600 rounded-md p-1" onClick={items.startGame}>Start Round</button> :
                <button className="bg-slate-400 rounded-md p-1 cursor-default">In Progress</button> } */}
            {items.host ? (!items.active ? 
                <button className="bg-green-600 rounded-md p-1" onClick={items.startGame}>Start Round</button> :
                <button className="bg-slate-400 rounded-md p-1 cursor-default">In Progress</button> 
            ) : (!items.active ? 
                    <button className="bg-purple-800 rounded-md p-1" onClick={items.startGame}>Waiting for host...</button> :
                    <button className="bg-slate-400 rounded-md p-1 cursor-default">In Progress</button> 
            )}
            
        </div>
    )
}