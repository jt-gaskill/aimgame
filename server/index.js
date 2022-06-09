const express = require('express');
const app = express()
const http = require("http")
// const socketio = require("socket.io");
const {Server} = require("socket.io");
const cors = require("cors")

app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        // origin: "https://629f8037be9e183140d8228d--the-awesome-jt-gaskill-site.netlify.app",
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

// const io = socketio(server)
const PORT = process.env.PORT || 3001

const rooms = {}
const games = {}

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on("join_room", (data, name) => {
        // console.log(socket.rooms)
        // console.log(data, name)
        // console.log(games)
        const [, room] = socket.rooms;
        // console.log(rooms)
        // console.log(room)
        // console.log(rooms[data])
        if (!rooms[data] || JSON.stringify(rooms[data]) === '{}'){
            socket.emit("join_fail", "This room does not exist")
            
        }else{
            if (room) {
                socket.leave(room)
                // rooms[room] = rooms[room].filter(user => !(user.id === socket.id))
                delete rooms[room][socket.id]
                socket.to(room).emit("room_members", rooms[room])
            }
            // console.log(data)
            socket.join(data)
            socket.emit("joined", data)
            if (!rooms[data]) {
                rooms[data] = {}
            }
            // rooms[data].push({ name: name, id: socket.id })
            rooms[data][socket.id] = {name: name, host: false, roundwins: 0, count: 0}
            // console.log(io.sockets.adapter.rooms.get(data))
            // console.log(rooms[data])
            socket.nsp.to(data).emit("room_members", rooms[data], games[data])
        }   
        console.log(rooms)
    })

    socket.on("disconnecting", () => {
        const [, room] = socket.rooms;
        // console.log(rooms[room])
        if(rooms[room]){
            // rooms[room] = rooms[room].filter(user => !(user.id === socket.id))
            delete rooms[room][socket.id]
            socket.to(room).emit("room_members", rooms[room])
            
        }
    })

    socket.on("leave_room", (curgame) => {
        const [, room] = socket.rooms;
        // console.log(rooms[room])
        if (rooms[room]) {
            // rooms[room] = rooms[room].filter(user => !(user.id === socket.id))
            socket.leave(room)
            delete rooms[room][socket.id]
            socket.to(room).emit("room_members", rooms[room], curgame)

        }
    })

    socket.on("create_room", (data, name) => {
        // console.log(data, "|", name)
        // console.log(rooms)
        if (rooms[data] && (Object.keys(rooms[data]).length != 0)) {
            // console.log("taken")
            socket.emit("join_fail", "This room id is taken")
        }else{
            socket.join(data)
            rooms[data] = {[socket.id]:{name:name, host: true, roundwins: 0, count: 0}}
            // console.log(rooms)
            socket.emit("joined", data)
            socket.emit("room_members", rooms[data], true)
        }
    })

    socket.on("update_time", (room, time, roundstart) => {
        socket.to(room).emit("new_time", time, roundstart)
    })

    socket.on("update_count", (count) => {
        // console.log(rooms)
        const [, room] = socket.rooms;
        // console.log(rooms)
        // console.log(room)
        if(rooms[room]){
            if (rooms[room][socket.id] !== undefined) {
                rooms[room][socket.id]["count"] = count
            } 
        }
        

        socket.nsp.to(room).emit("new_counts", rooms[room])
    })

    socket.on("zero_counts", () => {
        const [, room] = socket.rooms
        // console.log(rooms)
        if(rooms[room]){
            const roomkeys = Object.keys(rooms[room])
            for (let i = 0; i < roomkeys.length; i++) {
                rooms[room][roomkeys[i]]["count"] = 0
            }
            socket.nsp.to(room).emit("new_counts", rooms[room])
            socket.nsp.to(room).emit("zero_self_count")
        }
     
    })

    socket.on("game_ended", () => {
        // console.log(rooms)
        const [, room] = socket.rooms
        let highest = 0
        if(rooms[room] !== undefined){
            const roomkeys = Object.keys(rooms[room])
            socket.to(room).emit("new_time", 0)
            for (let i = 0; i < roomkeys.length; i++) {
                if (rooms[room][roomkeys[i]]["count"] > highest) {
                    highest = rooms[room][roomkeys[i]]["count"]
                }
            }
            for (let i = 0; i < roomkeys.length; i++) {
                if (rooms[room][roomkeys[i]]["count"] === highest) {
                    rooms[room][roomkeys[i]]["roundwins"] += 1
                }
            }
            socket.nsp.to(room).emit("new_counts", rooms[room])
        }
        
    })

    socket.on("get_game", (game) => {

        const [, room] = socket.rooms
        let newgame = Math.floor(Math.random() *2)
        
        while(newgame === game){
            newgame = Math.floor(Math.random() * 2)
        }
        console.log(newgame)
        games[room] = newgame
        socket.nsp.to(room).emit("new_game", newgame)

    })
})

// server.listen(3001, () => console.log("server is running"))
server.listen(PORT, () => console.log("server is running"))


