const { autoUpdater } = require("electron-updater");
const { dialog, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

module.exports = (minWindow) => {
  if (isDev) {
    autoUpdater.updateConfigPath = path.join(__dirname, "./dev-app-update.yml");
  }
  autoUpdater.autoDownload = false;
  autoUpdater.on("error", (error) => {
    dialog.showErrorBox(
      "更新失败",
      `请到https://github.com/wyzgo/electron-playground/releases下载，${JSON.stringify(error)}`
    );
    minWindow && minWindow.webContents.send("app-update-reply", false);
  });
  autoUpdater.on("update-available", () => {
    minWindow && minWindow.webContents.send("app-update-reply", false);
    dialog
      .showMessageBox({
        type: "info",
        title: "存在新版本",
        message: "发现新版本，是否现在更新？",
        buttons: ["是", "否"],
      })
      .then(({ response }) => {
        console.log(response);
        if (response === 0) {
          minWindow && minWindow.webContents.send("app-update-reply", true);
          autoUpdater.downloadUpdate();
        }
      });
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
    dialog
      .showMessageBox({
        title: "下载完成",
        message: "准备重新安装应用",
      })
      .then(() => {
        setTimeout(() => autoUpdater.quitAndInstall(), 1000);
      });
  });
  autoUpdater.on(
    "download-progress",
    (progress, bytesPerSecond, percent, total, transferred) => {
      console.log({ progress, bytesPerSecond, percent, total, transferred });
      minWindow.webContents.send("app-update-reply", {
        progress,
        bytesPerSecond,
        percent,
        total,
        transferred,
      });
    }
  );
  ipcMain.on("app-update", function (event, message) {
    autoUpdater.checkForUpdates();
  });
};
