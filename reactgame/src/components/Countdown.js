import React from "react"

export default function Countdown(props){
    return(
        <div className="text-center font-extrabold text-9xl">
            {props.time}
        </div>
    )
    
}