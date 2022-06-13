import React from "react"

export default function Tempo(props){
    const [boxes, setBoxes] = React.useState(30)
    const [bordercolor, setBorderColor] = React.useState("red")

    console.log(boxes)
    React.useEffect(() => {
        if(boxes<790){
            let interval = null
            interval = setInterval(() => setBoxes(boxes + 1), 5)
            return () => clearInterval(interval)
        }
        
    },[boxes])

    document.addEventListener("keydown", function handler(event){
        console.log(event.key)
        if(event.key === "ArrowUp"){
            if(boxes>360 && boxes<400){
                setBorderColor("green")
            }else{
                setBorderColor("red")
            }
        }
        this.removeEventListener('keydown', handler)
    })

    return (
        <div className="h-[500px] w-[800px] bg-black relative text-white select-none overflow-hidden flex">
            <div className="border-white h-20 w-20 border-2 my-auto mx-auto" style={{borderColor: bordercolor}}>

            </div>
            <div className={"w-10 h-10 absolute top-[230px] text-black"} style={{right: boxes, backgroundColor: "red"}}>up</div>
            {/* <div className={pos}></div> */}
            
        </div>
    )
}