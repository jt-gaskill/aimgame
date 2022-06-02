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
        <div className="w-1/6 bg-red-600">
            <p className="">Best: {best}</p>
            {(items.host && !items.active) && <button className="toggle-active" onClick={items.startGame}>toggle active</button>}
            <p className="counter">Count: {items.count}</p>
            <Countdown time={items.time} />
        </div>
    )
}