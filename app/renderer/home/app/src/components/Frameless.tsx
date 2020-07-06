import React from "react";
import { Button } from "antd";
import "./Frameless.css";

//@ts-ignore
const electron = window.electron;

function Frameless() {
  const buttonClick = () => {
    electron.ipcRenderer.send("open-frameless-window", true);
  };
  return (
    <div className="frame-less">
      <Button onClick={buttonClick}>打开无边框窗口</Button>
    </div>
  );
}

export default Frameless;
