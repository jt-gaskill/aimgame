import React from "react"
import {BsArrowLeft, BsArrowDown, BsArrowUp, BsArrowRight} from "react-icons/bs"

export default function Tempo(props){
    const [boxes, setBoxes] = React.useState([{direction: "up", right: 30}])
    const [missed, setMissed] = React.useState([])
    const [spawn, setSpawn] = React.useState(1)

    React.useEffect(() => {
        let interval = null
        interval = setInterval(() => {
            const tempboxes = boxes.map((box) => ({...box, right: box.right+1}))
            let tempmissed = missed.map((box) => ({...box, right: box.right+1}))
            if(tempmissed[0] && tempmissed[0].right > 750){
                tempmissed.shift()
            }
            
            if(tempboxes[0] && tempboxes[0].right > 400){
                tempmissed.push(tempboxes.shift())
                if(props.active){
                    props.handleCount(props.count - 1)
                }
                
            }
            setMissed(tempmissed)
            if(spawn === 75){
                let newdirec = Math.random()
                if(newdirec < .25){newdirec = "up"}
                else if(newdirec < .5){newdirec = "down"}
                else if(newdirec < .75){newdirec = "left"}
                else{newdirec = "right"}
                tempboxes.push({direction: newdirec, right: 30})
                setSpawn(0)
            }else{
                setSpawn(spawn + 1)
            }
            setBoxes(tempboxes)
        }, 2)
        return () => clearInterval(interval)
    },[boxes])

    React.useEffect(() => {
        if(props.active){
            setBoxes([{direction: "up", right: 30}])
            setMissed([])
        }
    } ,[props.active])

    document.addEventListener("keydown", function handler(event){
        console.log(event.key)
        if(props.active){
            const activeboxes = boxes.filter((box) => (box.right>320 && box.right<400))
            activeboxes.forEach(box => {
                if(event.key === "ArrowUp"){
                    if(box && box.direction === "up"){
                        props.handleCount(props.count + 1)
                        let tempboxes = boxes
                        tempboxes.shift()
                        setBoxes(tempboxes)
                    }
                    else{
                        props.handleCount(props.count -1)
                    }
                }
                else if(event.key === "ArrowLeft"){
                    if(box && box.direction === "left"){
                        props.handleCount(props.count + 1)
                        let tempboxes = boxes
                        tempboxes.shift()
                        setBoxes(tempboxes)
                    }
                    else{
                        props.handleCount(props.count -1)
                    }
                }
                else if(event.key === "ArrowRight"){
                    if(box && box.direction === "right"){
                        props.handleCount(props.count + 1)
                        let tempboxes = boxes
                        tempboxes.shift()
                        setBoxes(tempboxes)
                    }
                    else{
                        props.handleCount(props.count -1)
                    }
                }
                else if(event.key === "ArrowDown"){
                    if(box && box.direction === "down"){
                        props.handleCount(props.count + 1)
                        let tempboxes = boxes
                        tempboxes.shift()
                        setBoxes(tempboxes)
                    }
                    else{
                        props.handleCount(props.count -1)
                    }
                }
            })
        }

        this.removeEventListener('keydown', handler)
    })

    const boxdivs = boxes.map((box) => {
        let offset = {right: 230}
        if(box.direction === "up"){offset = {top: "88px", backgroundColor: "blue", icon: <BsArrowUp />, paddingTop: "5px"}}
        else if(box.direction === "left"){offset = {top: "184px", backgroundColor: "red", icon: <BsArrowLeft />, paddingTop: "5px"}}
        else if(box.direction === "right"){offset = {top: "280px", backgroundColor: "green", icon: <BsArrowRight />, paddingTop: "5px"}}
        else if(box.direction === "down"){offset = {top: "376px", backgroundColor: "yellow", icon: <BsArrowDown />, paddingTop: "5px"}}
        return <div className={"w-10 h-10 absolute text-black flex justify-center text-3xl"} style={{right: box.right, ...offset}}>{offset.icon}</div>
    })

    const misseddivs = missed.map((box) => {
        let offset = {right: 230}
        if(box.direction === "up"){offset = {top: "88px", backgroundColor: "blue", icon: <BsArrowUp />, paddingTop: "5px"}}
        else if(box.direction === "left"){offset = {top: "184px", backgroundColor: "red", icon: <BsArrowLeft />, paddingTop: "5px"}}
        else if(box.direction === "right"){offset = {top: "280px", backgroundColor: "green", icon: <BsArrowRight />, paddingTop: "5px"}}
        else if(box.direction === "down"){offset = {top: "376px", backgroundColor: "yellow", icon: <BsArrowDown />, paddingTop: "5px"}}
        return <div className={"w-10 h-10 absolute text-black flex justify-center text-3xl"} style={{right: box.right, ...offset}}>{offset.icon}</div>
    })
    // 230px
    return (
        
        <div className="h-[500px] w-[800px] bg-black flex justify-center select-none">
            {props.active ? 
            <div className="h-[500px] w-[800px] bg-black relative text-white select-none overflow-hidden flex">
                <div className="mx-auto flex flex-col justify-center">
                    <div className="border-white h-20 w-20 border-2 my-2" style={{borderColor: "blue"}}></div>
                    <div className="border-white h-20 w-20 border-2 my-2" style={{borderColor: "red"}}></div>
                    <div className="border-white h-20 w-20 border-2 my-2" style={{borderColor: "green"}}></div>
                    <div className="border-white h-20 w-20 border-2 my-2" style={{borderColor: "yellow"}}></div>
                </div>
                {boxdivs}
                {misseddivs}
            
            </div>
            : <p className="text-white leading-[500px]">Don't miss a box!</p>}
        </div>
    )
}