const path = require("path");
const { BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");

//创建home窗口
module.exports = () => {
  const preloadUrl = path.join(__dirname, "../renderer/home/preload.js");
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 200,
    webPreferences: {
      nodeIntegration: false,
      preload: preloadUrl,
    },
  });
  if (isDev) {
    mainWindow.loadURL("http://localhost:3000/");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/home/app/build/index.html"));
  }

  return mainWindow;
};
