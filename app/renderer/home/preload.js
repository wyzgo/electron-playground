const path = require("path");
const isDev = require("electron-is-dev");
console.log("isDev", isDev);

global.electron = require("electron");

global.isMac = process.platform === "darwin";

global.publicPath = isDev
  ? path.join(__dirname, "./app/public")
  : path.join(__dirname, "./app/build");
