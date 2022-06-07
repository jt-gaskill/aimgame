import React from "react"
import Target from "./Target"

export default function Aim(props) {
                                    // [vertical, horizontal]
    const [position, setPosition] = React.useState([245,395])

    // const [best, setBest] = React.useState(() => (JSON.parse(localStorage.getItem("bestAim")) || 0))

    // React.useEffect(() => {
    //     if(props.count > best){
    //         setBest(props.count)
    //         localStorage.setItem("bestAim", JSON.stringify(props.count))
    //     }
    // }, [props.active])

    function hit(){
        // if(!active){
        //     setActive(true)
        // }
        setPosition([Math.ceil(Math.random() * 490), Math.ceil(Math.random() * 790)])
        props.handleCount(props.count +1)
    }

    return (
        <div>
            {/* <Timer /> */}
            {/* <span className="counter">Count: {props.count}</span> */}
            
            {/* <span className="absolute left-0">Best: {best}</span> */}
            <div className="h-[500px] w-[800px] bg-black relative text-white leading-[500px] flex justify-center select-none">
                {props.active ? <Target handleClick={hit} position={position} />:<p>Click the red dot!</p>}
            </div>
            
            {/* {end && <button onClick={restart} className="restart">Play again</button>} */}
        </div>

    )
}