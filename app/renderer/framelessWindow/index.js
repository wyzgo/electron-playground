const { BrowserWindow, ipcMain } = require("electron");
const path = require("path");

module.exports = () => {
  const createWindow = () => {
    const framelessWindow = new BrowserWindow({
      x: 0,
      y: 0,
      transparent: true,
      frame: false,
    });
    framelessWindow.loadFile(path.join(__dirname, "./frameless.html"));
  };

  ipcMain.on("open-frameless-window", function (event, message) {
    createWindow();
  });
};
