import React from "react"

export default function Tempo(props){
    const [boxes, setBoxes] = React.useState([{direction: "up", right: 30}])
    const [bordercolor, setBorderColor] = React.useState("red")

    React.useEffect(() => {
        let interval = null
        interval = setInterval(() => {
            const tempboxes = boxes.map((box) => ({...box, right: box.right+1}))
            if(tempboxes[0].right > 750){
                tempboxes.shift()
            }
            if(Math.random() < .008){
                let newdirec = Math.random()
                if(newdirec < .25){newdirec = "up"}
                else if(newdirec < .5){newdirec = "down"}
                else if(newdirec < .75){newdirec = "left"}
                else{newdirec = "right"}

             tempboxes.push({direction: newdirec, right: 30})
            }
            setBoxes(tempboxes)
        }, 5)
        return () => clearInterval(interval)
    },[boxes])

    document.addEventListener("keydown", function handler(event){
        console.log(event.key)
        if(event.key === "ArrowUp"){
            if(boxes[0].right>360 && boxes[0].right<400){
                setBorderColor("green")
            }else{
                setBorderColor("red")
            }
        }
        this.removeEventListener('keydown', handler)
    })

    // const boxdivs = <div className={"w-10 h-10 absolute top-[230px] text-black"} style={{right: boxes[0].right, backgroundColor: "red"}}>{boxes[0].direction}</div>
    const boxdivs = boxes.map((box) => <div className={"w-10 h-10 absolute top-[230px] text-black"} style={{right: box.right, backgroundColor: "red"}}>{box.direction}</div>)

    return (
        <div className="h-[500px] w-[800px] bg-black relative text-white select-none overflow-hidden flex">
            <div className="border-white h-20 w-20 border-2 my-auto mx-auto" style={{borderColor: bordercolor}}></div>

            {boxdivs}
            
        </div>
    )
}