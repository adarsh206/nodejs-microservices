const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();

const server = http.createServer(app);

// initiate socket.io and attach this to the http server
const io = socketIo(server);

app.use(express.static("public"));

const users = new Set();

io.on("connection", (socket) => {
    console.log("A user is now connected");

    // handle users when they will join the chat
    socket.on("join", (userName) => {
        users.add(userName);
        socket.userName = userName;

        // broadcast to all clients/users that a new user has joined
        io.emit('userJoined', userName);

        // send the updated list to all the clients
        io.emit("userList", Array.from(users));
    })

    // handle incoming chat message
    socket.on("chatMessage", (message) => {
        // broadcast the received message to all  connected clients/users
        io.emit("chatMessage", message);
    })

    // handle user disconnection
    socket.on("disconnect", () => {
        console.log("An User is disconnected", socket.userName);

        users.forEach((user) => {
            if(user === socket.userName){
                users.delete(user);

                // broadcast to all the clients/users that a user has left the chat
                io.emit("userLeft", user);

                io.emit("userList", Array.from(users));
            }
        })
    })

}
);


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})