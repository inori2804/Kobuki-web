let rosServer = null;
let isConnected = false;


function setRosServer(newValue) {
  rosServer = newValue;
}

function setIsConnected(newValue) {
  isConnected = newValue;
}

export { rosServer, isConnected, setRosServer, setIsConnected };