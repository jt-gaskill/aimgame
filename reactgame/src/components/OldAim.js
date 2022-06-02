import React from "react"
import Target from "./Target"
import Countdown from "./Countdown"

export default function Aim() {
    const [count, setCount] = React.useState(0)

    // [vertical, horizontal]
    const [position, setPosition] = React.useState([245, 395])

    const [time, setTime] = React.useState(20)
    const [active, setActive] = React.useState(false)
    const [best, setBest] = React.useState(() => (JSON.parse(localStorage.getItem("bestAim")) || 0))
    const [end, setEnd] = React.useState(false)

    React.useEffect(() => {
        let interval = null;
        if (time > 0 && active) {
            interval = setInterval(() => setTime(time - 1), 1000)
        } else if (time === 0) {
            setActive(false)
            setEnd(true)
        }
        return () => clearInterval(interval)
    }, [time, active])

    React.useEffect(() => {
        if (count > best) {
            setBest(count)
            localStorage.setItem("bestAim", JSON.stringify(count))
        }
    }, [end])

    function restart() {
        setTime(20)
        setEnd(false)
        setActive(false)
        setCount(0)
        setPosition([245, 395])
    }

    function hit() {
        if (!active) {
            setActive(true)
        }
        setPosition([Math.ceil(Math.random() * 490), Math.ceil(Math.random() * 790)])
        setCount(count + 1)
    }

    return (
        <div className="aim">
            {/* <Timer /> */}
            <span className="counter">Count: {count}</span>
            <Countdown time={time} />
            <span className="best">Best: {best}</span>
            <div className="area">
                {!end && <Target handleClick={hit} position={position} />}
            </div>
            {end && <button onClick={restart} className="restart">Play again</button>}
        </div>

    )
}