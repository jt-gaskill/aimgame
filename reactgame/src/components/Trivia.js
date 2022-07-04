import React from "react"
import cities from "./../triviadata/cities.js" 

export default function Trivia(props){
    const [cityquestions, setCityQuestions] = React.useState(() => [...Array(50).keys()])
    console.log(cityquestions)
    function getChoice(){
        let templist = cityquestions
        if(templist.length < 2){
            templist = [...Array(50).keys()]
        }

        while(true){
            let num = Math.ceil(Math.random()*49)
            // console.log(num)
            if((num || num === 0) && templist.includes(num)){
                console.log(num)
                console.log(templist)
                templist.splice(templist.indexOf(num), 1)
                console.log(templist)
                setCityQuestions(templist)
                console.log('ret')
                return num
            }
        }
    }

    const[choice1, setChoice1] = React.useState(() => getChoice())
    const[choice2, setChoice2] = React.useState(() => getChoice())

    function left(){
        if(cities['cities']['data'][choice1]['population'] > cities['cities']['data'][choice2]['population']){
            props.handleCount(props.count + 1)
        }
        else{
            props.handleCount(props.count - 1)
        }
        setChoice1(getChoice())
        setChoice2(getChoice())
    }

    function right(){
        if(cities['cities']['data'][choice2]['population'] > cities['cities']['data'][choice1]['population']){
            props.handleCount(props.count + 1)
        }
        else{
            props.handleCount(props.count - 1)
        }
        setChoice1(getChoice())
        setChoice2(getChoice())
    }

    return(
        <div className="flex-col">
            <div className="bg-black h-32 text-white">{cities['cities']['question']}</div>
            <div className="h-[372px] w-[800px]  flex justify-center select-none">
                <div className="h-[372px] w-[400px] bg-green-600" onClick={left}>{cities['cities']['data'][choice1]['name']}</div>
                <div className="h-[372px] w-[400px] bg-red-600" onClick={right}>{cities['cities']['data'][choice2]['name']}</div>
                {/* <div>{JSON.stringify(cities['cities'][0])}</div> */}
            </div>
            
        </div>
        
    )
}