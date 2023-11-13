const chatSocket = (socketServer) => {
  socketServer.on("connection", (socket) => {
    socket.on("message", (data) => {
      socketServer.emit("new_message", data);
    });
  });
};

export default chatSocket;
