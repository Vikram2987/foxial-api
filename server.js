const express = require('express')
const http = require('http');
const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');
require("dotenv").config()
const dbUrl = process.env.MONGODB_STRING
const cors = require('cors')
const app = express()
const server = http.createServer(app);
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


const path = require('path');
// Using Cors

// Getting router
const Router = require("./routes/index");






app.use('/uploads', express.static(path.join(__dirname+'/uploads')));
// Using the router
app.use("/",Router)
const PORT = process.env.PORT;
//Listening to the port

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_STRING);
      console.log(`MongoDB Connected`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})

// const io = require('socket.io')(Server, {
//     pingTimeout: 60000, // Set the ping timeout to 60 seconds
//     cors: {
//         origin: "*" // Allow all origins
//     }
// });

// io.on("connection",(socket)=>{

//     socket.on('setup',(userData)=>{
//         socket.join(userData._id);
//         console.log("SUer is:",userData._id)
//         socket.emit('connected')
//     })

//     socket.on('join chat',(room)=>{
//         socket.join(room);
//         console.log("User Jpoined Room",room)
//     })

//     socket.on("new message", (newMessageRecieved) => {
//         console.log("new message : ",newMessageRecieved)
//         var chat = newMessageRecieved.chat;
    
//         if (!chat.users) return console.log("chat.users not defined");
    
//         chat.users.forEach((user) => {
//           if (user._id === newMessageRecieved.sender._id) return;
    
//           socket.in(user._id).emit("message received", newMessageRecieved);
//         });
//       });
// })