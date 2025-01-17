const http     = require("http");
const express  = require("express");
const path     = require("path");
const {Server} = require("socket.io");
const { Socket } = require("net");


const port    = 9000;


const app    = express();
const server = http.createServer(app);
const io     = new Server(server);

Handle_send_allClients=(socket,message)=>{io.emit("Server_message",message);console.log("All text send to clients")};


//socket io handleling
io.on('connection', (socket) => {
  const  socket_id = socket.id;
  console.log(`user conntected with id: ${ socket_id}`); 
  // receiving from clients
  socket.on("User_message",(message)=>{
      console.log(`Message recived from "${socket_id}"" is  "${message}"`);
      //send to all clients 
      Handle_send_allClients(socket,message);
  })
  

});





app.use(express.static (path.resolve("./public")));

app.get("/" , (req ,res)=>{
  return sendFile('../public/index.js');
});




server.listen(port , () => {console.log(`sever started at port ${port} !`)})