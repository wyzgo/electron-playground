const { BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

module.exports = () => {
  const createWindow = () => {
    const ipcWindow = new BrowserWindow({
      width: 300,
      height: 300,
      x: 0,
      y: 0,
      webPreferences: {
        nodeIntegration: true,
      },
    });
    ipcWindow.loadFile(path.join(__dirname, "../renderer/ipc/ipcTest.html"));
    return ipcWindow;
  };

  let ipcWindow = null;

  //接受main窗口的message
  ipcMain.on("renderer-process-to-main-process", function (event, message) {
    dialog.showMessageBox({
      type: "info",
      message: `主进程已拿到message：${message}`,
    });
    ipcWindow.webContents.send("main-process-to-renderer-process", message);
  });

  ipcMain.on("open-ipc-test-window", function (event, message) {
    ipcWindow = createWindow();
  });
};
