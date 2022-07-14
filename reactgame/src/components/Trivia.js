import React from "react"
import cities from "./../triviadata/cities.js" 
import records from "./../triviadata/records.js"
import movies from "./../triviadata/movies.js"

export default function Trivia(props){
    // const [cityquestions, setCityQuestions] = React.useState(() => [...Array(50).keys()])
    const [questionsets, setQuestionSets] = React.useState(() => [[...Array(50).keys()], [...Array(50).keys()], [...Array(50).keys()]])

    // console.log(position)
    // console.log("peen", qcount)

    const sets = [cities, records, movies]
    const setkeys = ["cities", "records", "movies"]
    const [addcount, setAddCount] = React.useState(false)
    const [minuscount, setMinusCount] = React.useState(false)
 
    const [active, setActive] = React.useState(() => {
        let qs = []
        qs.push(getPair())
        qs.push(getPair())
        qs.push(getPair())
        return qs
    })

    function getPair(){
        // let templist = questionsets[triviaset]
        let tempset = Math.floor(Math.random()*3)
        let templist = questionsets[tempset]
        if(templist.length < 2){
            templist = [...Array(50).keys()]
        }
        let num1;
        while(true){
            let num = Math.ceil(Math.random()*49)
            if((num || num === 0) && templist.includes(num)){
                templist.splice(templist.indexOf(num), 1)
                num1 = num
                break;
            }
        }
        while(true){
            let num = Math.ceil(Math.random()*49)
            if((num || num === 0) && templist.includes(num)){
                templist.splice(templist.indexOf(num), 1)
                return {"set":tempset, "choice1":num1, "choice2":num}
            }
        }
    }

    React.useEffect(() => {
        if(addcount){
            // console.log("top g")
            props.handleCount(props.count + 1)
        }
    }, [addcount])

    React.useEffect(() => {
        if(minuscount){
            // console.log("top g")
            props.handleCount(props.count - 1)
        }
    }, [minuscount])

    function select(side){
        
        if(side){
            if(parseFloat(sets[active[1]["set"]][setkeys[active[1]["set"]]][active[1]["choice1"]]['data'].replace(/,/g,"")) > parseFloat(sets[active[1]["set"]][setkeys[active[1]["set"]]][active[1]["choice2"]]['data'].replace(/,/g,""))){
                console.log(1)
                setAddCount(Date.now())
            }
            else{
                console.log(2)
                setMinusCount(Date.now())
            }
        }
        else{
            if(parseFloat(sets[active[1]["set"]][setkeys[active[1]["set"]]][active[1]["choice2"]]['data'].replace(/,/g,"")) > parseFloat(sets[active[1]["set"]][setkeys[active[1]["set"]]][active[1]["choice1"]]['data'].replace(/,/g,""))){
                console.log(3)
                setAddCount(Date.now())
            }
            else{
                console.log(4)
                setMinusCount(Date.now())
            }
        }
        // setTriviaSet(Math.floor(Math.random()*3))

        // newTiles()
        let tempactive = active
        tempactive.pop()
        tempactive.unshift(getPair())
        // console.log(tempactive)
        setActive(tempactive)
        let templefttiles = lefttiles 
        let len = lefttiles.length
        templefttiles[len] = <div className={"h-80 w-60 wrapper absolute top-[-372px] a"}>
            <div onClick={() => select(true)} className={"bg-[#ec7729] my-auto h-80 w-60 rounded-3xl flex flex-col justify-center text-center p-3\
            hovertrans hover:scale-[1.03] hover:bg-orange-400 duration-300 drop-shadow-xl hover:drop-shadow-2xl cursor-pointer\
            "}>
                <div className="font-bold text-2xl">{sets[active[0]["set"]][setkeys[active[0]["set"]]][active[0]["choice1"]]['name']}</div>
                {active[0]["set"] !== 1 && <div className="text-xl">{sets[active[0]["set"]][setkeys[active[0]["set"]]][active[1]["choice1"]]['extra']}</div>}
            </div>
        </div>
        templefttiles[len-1] = <div className={"h-80 w-60 wrapper absolute top-[-372px] aa"}>
            <div onClick={() => select(true)} className={"bg-[#ec7729] my-auto h-80 w-60 rounded-3xl flex flex-col justify-center text-center p-3\
            hovertrans hover:scale-[1.03] hover:bg-orange-400 duration-300 drop-shadow-xl hover:drop-shadow-2xl cursor-pointer\
            "}>
                <div className="font-bold text-2xl">{sets[active[1]["set"]][setkeys[active[1]["set"]]][active[1]["choice1"]]['name']}</div>
                {active[1]["set"] !== 1 && <div className="text-xl">{sets[active[1]["set"]][setkeys[active[1]["set"]]][active[1]["choice1"]]['extra']}</div>}
            </div>
        </div>
        templefttiles[len-2] = <div className={"h-80 w-60 wrapper absolute top-[-372px] aaa"}>
            <div onClick={() => select(true)} className={"bg-[#ec7729] my-auto h-80 w-60 rounded-3xl flex flex-col justify-center text-center p-3\
            hovertrans hover:scale-[1.03] hover:bg-orange-400 duration-300 drop-shadow-xl hover:drop-shadow-2xl cursor-pointer\
            "}>
                <div className="font-bold text-2xl">{sets[active[2]["set"]][setkeys[active[2]["set"]]][active[2]["choice1"]]['name']}</div>
                {active[2]["set"] !== 1 && <div className="text-xl">{sets[active[2]["set"]][setkeys[active[2]["set"]]][active[2]["choice1"]]['extra']}</div>}
            </div>
        </div>
        
        templefttiles[len-3] = undefined
        setLeftTiles(templefttiles)
        // console.log(lefttiles)
        let temprighttiles = righttiles 
        temprighttiles[len] = <div className={"h-80 w-60 wrapper absolute top-[-372px] a"}>
            <div onClick={() => select(false)} className={"bg-[#4bcf68] my-auto h-80 w-60 rounded-3xl flex flex-col justify-center text-center p-3\
            hovertrans hover:scale-[1.03] hover:bg-[#59df6f] duration-300 drop-shadow-xl hover:drop-shadow-2xl cursor-pointer\
            "}>
                <div className="font-bold text-2xl">{sets[active[0]["set"]][setkeys[active[0]["set"]]][active[0]["choice2"]]['name']}</div>
                {active[0]["set"] !== 1 && <div className="text-xl">{sets[active[0]["set"]][setkeys[active[0]["set"]]][active[1]["choice2"]]['extra']}</div>}
            </div>
        </div>
        temprighttiles[len-1] = <div className={"h-80 w-60 wrapper absolute top-[-372px] aa"}>
            <div onClick={() => select(false)} className={"bg-[#4bcf68] my-auto h-80 w-60 rounded-3xl flex flex-col justify-center text-center p-3\
            hovertrans hover:scale-[1.03] hover:bg-[#59df6f] duration-300 drop-shadow-xl hover:drop-shadow-2xl cursor-pointer\
            "}>
                <div className="font-bold text-2xl">{sets[active[1]["set"]][setkeys[active[1]["set"]]][active[1]["choice2"]]['name']}</div>
                {active[1]["set"] !== 1 && <div className="text-xl">{sets[active[1]["set"]][setkeys[active[1]["set"]]][active[1]["choice2"]]['extra']}</div>}
            </div>
        </div>
        temprighttiles[len-2] = <div className={"h-80 w-60 wrapper absolute top-[-372px] aaa"}>
            <div onClick={() => select(false)} className={"bg-[#4bcf68] my-auto h-80 w-60 rounded-3xl flex flex-col justify-center text-center p-3\
            hovertrans hover:scale-[1.03] hover:bg-[#59df6f] duration-300 drop-shadow-xl hover:drop-shadow-2xl cursor-pointer\
            "}>
                <div className="font-bold text-2xl">{sets[active[2]["set"]][setkeys[active[2]["set"]]][active[2]["choice2"]]['name']}</div>
                {active[2]["set"] !== 1 && <div className="text-xl">{sets[active[2]["set"]][setkeys[active[2]["set"]]][active[2]["choice2"]]['extra']}</div>}
            </div>
        </div>
        
        temprighttiles[len-3] = undefined
        setRightTiles(temprighttiles)
    }



    const [lefttiles, setLeftTiles] = React.useState(() => ([
        <div className={"h-80 w-60 wrapper absolute top-[-372px] aaa"}>
            <div onClick={() => select(true)} className={"bg-[#ec7729] my-auto h-80 w-60 rounded-3xl flex flex-col justify-center text-center p-3\
            hovertrans hover:scale-[1.03] hover:bg-orange-400 duration-300 drop-shadow-xl hover:drop-shadow-2xl cursor-pointer\
            "}>
                <div className="font-bold text-2xl">{sets[active[2]["set"]][setkeys[active[2]["set"]]][active[2]["choice1"]]['name']}</div>
                {active[2]["set"] !== 1 && <div className="text-xl">{sets[active[2]["set"]][setkeys[active[2]["set"]]][active[2]["choice1"]]['extra']}</div>}
            </div>
        </div>,
        <div className={"h-80 w-60 wrapper absolute top-[-372px] aa"}>
            <div onClick={() => select(true)} className={"bg-[#ec7729] my-auto h-80 w-60 rounded-3xl flex flex-col justify-center text-center p-3\
            hovertrans hover:scale-[1.03] hover:bg-orange-400 duration-300 drop-shadow-xl hover:drop-shadow-2xl cursor-pointer\
            "}>
                <div className="font-bold text-2xl">{sets[active[1]["set"]][setkeys[active[1]["set"]]][active[1]["choice1"]]['name']}</div>
                {active[1]["set"] !== 1 && <div className="text-xl">{sets[active[1]["set"]][setkeys[active[1]["set"]]][active[1]["choice1"]]['extra']}</div>}
            </div>
        </div>,
        <div className={"h-80 w-60 wrapper absolute top-[-372px] a"}>
            <div onClick={() => select(true)} className={"bg-[#ec7729] my-auto h-80 w-60 rounded-3xl flex flex-col justify-center text-center p-3\
            hovertrans hover:scale-[1.03] hover:bg-orange-400 duration-300 drop-shadow-xl hover:drop-shadow-2xl cursor-pointer\
            "}>
                <div className="font-bold text-2xl">{sets[active[0]["set"]][setkeys[active[0]["set"]]][active[0]["choice1"]]['name']}</div>
                {active[0]["set"] !== 1 && <div className="text-xl">{sets[active[0]["set"]][setkeys[active[0]["set"]]][active[0]["choice1"]]['extra']}</div>}
            </div>
        </div>
    ]))
    // console.log(lefttiles)
    const [righttiles, setRightTiles] = React.useState(() => ([
        <div onClick={() => select(false)} className={"h-80 w-60 wrapper absolute top-[-372px] aaa"}>
            <div className={"bg-[#4bcf68] my-auto h-80 w-60 rounded-3xl flex flex-col justify-center text-center p-3\
            hovertrans hover:scale-[1.03] hover:[#59df6f] duration-300 drop-shadow-xl hover:drop-shadow-2xl cursor-pointer\
            "}>
                <div className="font-bold text-2xl">{sets[active[2]["set"]][setkeys[active[2]["set"]]][active[2]["choice2"]]['name']}</div>
                {active[2]["set"] !== 1 && <div className="text-xl">{sets[active[2]["set"]][setkeys[active[2]["set"]]][active[2]["choice2"]]['extra']}</div>}
            </div>
        </div>,
        <div onClick={() => select(false)} className={"h-80 w-60 wrapper absolute top-[-372px] aa"}>
            <div className={"bg-[#4bcf68] my-auto h-80 w-60 rounded-3xl flex flex-col justify-center text-center p-3\
            hovertrans hover:scale-[1.03] hover:[#59df6f] duration-300 drop-shadow-xl hover:drop-shadow-2xl cursor-pointer\
            "}>
                <div className="font-bold text-2xl">{sets[active[1]["set"]][setkeys[active[1]["set"]]][active[1]["choice2"]]['name']}</div>
                {active[1]["set"] !== 1 && <div className="text-xl">{sets[active[1]["set"]][setkeys[active[1]["set"]]][active[1]["choice2"]]['extra']}</div>}
            </div>
        </div>,
        <div onClick={() => select(false)} className={"h-80 w-60 wrapper absolute top-[-372px] a"}>
            <div className={"bg-[#4bcf68] my-auto h-80 w-60 rounded-3xl flex flex-col justify-center text-center p-3\
            hovertrans hover:scale-[1.03] hover:[#59df6f] duration-300 drop-shadow-xl hover:drop-shadow-2xl cursor-pointer\
            "}>
                <div className="font-bold text-2xl">{sets[active[0]["set"]][setkeys[active[0]["set"]]][active[0]["choice2"]]['name']}</div>
                {active[0]["set"] !== 1 && <div className="text-xl">{sets[active[0]["set"]][setkeys[active[0]["set"]]][active[0]["choice2"]]['extra']}</div>}
            </div>
        </div>
    ]))
    
    return(
        
        <div className="flex-col">
            {props.active ? 
            <div>
                <div className="bg-black h-32 text-white flex flex-col justify-center px-6">
                    <div className="bg-gray-600 h-[90px] rounded-2xl flex justify-center">
                        <div className="flex flex-col justify-center text-2xl">
                            {sets[active[1]["set"]]['question']}
                        </div>
                        
                    </div>
                    
                </div>
                <div className="h-[372px] w-[800px] flex justify-center select-none">
                    <div className="h-[372px] w-[400px] bg-orange-800 flex justify-center overflow-hidden relative">
                        {lefttiles}
                    </div>
                    <div className="h-[372px] w-[400px] bg-green-700 flex justify-center overflow-hidden relative">
                        {righttiles}
                    </div>
                </div>
            </div> 
            : <div className="h-[500px] w-[800px] bg-black flex justify-center select-none">
                <p className="text-white leading-[500px]">Select the true statement</p>
            </div>}
            
            
            
        </div>
        
    )
}