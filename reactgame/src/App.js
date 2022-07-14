import io from "socket.io-client"
import React from "react"
import Intro from "./components/Intro"
import Game from "./components/Game"

const socket = io.connect("https://react-aimgame.herokuapp.com/")
// const socket = io.connect("http://localhost:3001")

export default function App(){
    const [name, setName] = React.useState("")
    const [begin, setBegin] = React.useState(false)
    const [host, setHost] = React.useState(false)

    const [active, setActive] = React.useState(false)
    const [time, setTime] = React.useState(20)
    const [startround, setStartRound] = React.useState(false)

    const [count, setCount] = React.useState(0)

    const [room, setRoom] = React.useState("")
    const [inputroom, setInputRoom] = React.useState("")

    const [members, setMembers] = React.useState([])
    const [game, setGame] = React.useState(0)

    React.useEffect(() => {
        // console.log("beginning", room)
        if(room !== "" && !begin){
            console.log(room)
            setBegin(true)
        }
    },[room])
    // console.log(host, "|", time, "|", count, "|", active, "|", room, '|', begin)

    React.useEffect(() => {
        
        socket.on("room_members", (data, roomgame) => {
            // console.log(data, roomgame)
            const datakeys = Object.keys(data)
            // // console.log(datakeys)
            let presentHost = false
            for(let i=0; i<datakeys.length; i++){
                if(data[datakeys[i]]["host"]){
                    presentHost = true
                }
            }
            setMembers(data)
            if(!presentHost){
                console.log('no host')
                alert("The host has quit, ending game...")
                leaveRoom()
            }
            if(roomgame !== game){
                setGame(roomgame)
            }
        })

        socket.on("new_counts", (data) => {
            setMembers(data)

        })

        socket.on("zero_self_count", () => setCount(0))

        socket.on("new_time", (data, activeround) => {
            if(!activeround){
                if (!active) {
                    setActive(true)
                }
                if (data === 0) {
                    setActive(false)
                }
            }
            setTime(data)
        })

        socket.on("joined", (newroom) => {
            setRoom(newroom)           
            setCount(0) 
        })

        socket.on("join_fail", (message) => {
            alert(message)
            setHost(false)
        })

        socket.on("new_game", (newgame) => {
            setGame(newgame)
        })
    }, [socket])

    function joinGame(){
        if (inputroom !== "") {
            socket.emit("join_room", inputroom, name)
        }
    }

    function createLobby(){
        if (inputroom !== "") {
            socket.emit("create_room", inputroom, name)
        }
        setHost(true)
        socket.emit("get_game", game)
    }

    React.useEffect(() => {
        if(host){
            let interval = null;
            if(startround){
                if(time > 0){
                    interval = setInterval(() => setTime(time - 1), 1000)
                    socket.emit("update_time", room, time, true)
                } else{
                    setStartRound(false)
                    setTime(20)
                    setActive(true)
                }
            }
            else if (time > 0 && active) {
                interval = setInterval(() => setTime(time - 1), 1000)
                socket.emit("update_time", room, time, false)
            } else if (time === 0) {
                if(!active){
                    // console.log("game ended")
                    socket.emit("game_ended")
                }
                setActive(false)
                
                // setEnd(true)
            }
            
            return () => clearInterval(interval)
        }
    }, [time, active])

    function leaveRoom(){
        // console.log("leaving")
        socket.emit("leave_room", game)
        setActive(false)
        setBegin(false)
        setHost(false)
        setRoom("")
        setTime(20)
        setGame(0)
    }

    React.useEffect(() => {
        // console.log("weens")
        if(begin){
            socket.emit("update_count", count)
        }
    }, [count])

    function startGame(){
        socket.emit("zero_counts", room)
        // setTime(20)
        // setActive(!active)
        setStartRound(true)
        setTime(3)

    }

    const items = {
        count: count,
        setCount: setCount,
        active: active,
        room: room,
        members: members,
        time: time,
        host: host,
        startGame: startGame,
        leaveRoom: leaveRoom,
        name: name,
        game: game
    }

    React.useEffect(() => {
        if(host && !active){
            console.log("new game")
            socket.emit("get_game", game)
        }
    },[active])

    return (
        // <div className="px-4 bg-[#5CDB95] h-screen w-screen flex pt-6 justify-center">
        <div className="px-4 bg-gradient-to-r from-[#5CDB95] to-[#70c5f7] h-screen w-screen flex pt-10 justify-center
        overflow-hidden">
            <div className="w-screen">
                {begin ? 
                    <Game items={items} />
                :
                    <Intro joinGame={joinGame} createLobby={createLobby} handleChange={setName} 
                    inputroom={inputroom} handleRoom={setInputRoom}/>
                }
            </div>
            

        </div>
        
    )   
}