const { autoUpdater } = require("electron-updater");
const { dialog, ipcMain } = require("electron");

module.exports = (minWindow) => {
  autoUpdater.autoDownload = false;
  autoUpdater.on("error", (error) => {
    dialog.showErrorBox("Error：", JSON.stringify(error));
  });
  autoUpdater.on("update-available", () => {
    minWindow && minWindow.webContents.send("app-update-reply", false);
    dialog.showMessageBox(
      {
        type: "info",
        title: "存在新版本",
        message: "发现新版本，是否现在更新？",
        buttons: ["是", "否"],
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          minWindow && minWindow.webContents.send("app-update-reply", true);
          autoUpdater.downloadUpdate();
        }
      }
    );
  });
  autoUpdater.on("update-not-available", () => {
    minWindow && minWindow.webContents.send("app-update-reply", false);
    dialog.showMessageBox({
      title: "没有新版本",
      message: "当前已经是最新版本",
    });
  });
  autoUpdater.on("update-downloaded", (ev, info) => {
    minWindow.webContents.send("app-update-reply", false);
    dialog.showMessageBox(
      {
        title: "下载完成",
        message: "准备重新安装应用",
      },
      () => {
        setTimeout(() => autoUpdater.quitAndInstall(), 1000);
      }
    );
  });
  ipcMain.on("app-update", function (event, message) {
    autoUpdater.checkForUpdates();
  });
};
