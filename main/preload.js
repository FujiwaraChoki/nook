const { contextBridge, ipcRenderer } = require("electron");

const handler = {
  send: function (channel, value) {
    ipcRenderer.send(channel, value);
  },
  on: function (channel, callback) {
    const subscription = function (_event, ...args) {
      callback(...args);
    };
    ipcRenderer.on(channel, subscription);

    return function () {
      ipcRenderer.removeListener(channel, subscription);
    };
  },
};

contextBridge.exposeInMainWorld("ipc", handler);

// Define the type for IpcHandler
const IpcHandler = typeof handler;

module.exports = { IpcHandler };
