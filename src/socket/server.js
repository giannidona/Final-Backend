import chatSocket from "../socket/chatSocket.js";

const init = (socketServer) => {
  chatSocket(socketServer);
};

export default init;
