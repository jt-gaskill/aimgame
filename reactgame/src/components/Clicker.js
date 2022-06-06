import React from "react"

export default function Clicker(props){



    return (
        <div className="h-[500px] w-[800px] bg-black flex justify-center select-none leading-[500px]">
            {props.active ? <div className="h-[500px] w-[800px] bg-red-800 flex justify-center"
             onClick={() => props.handleCount(props.count + 1)}>
                <span className="leading-[500px] text-9xl opacity-40">{props.count}</span>
            </div> : <p className="text-white">Click the most in 20 seconds!</p>}
        </div>
    )
}