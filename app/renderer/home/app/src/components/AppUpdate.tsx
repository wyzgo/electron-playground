import React, { useState } from "react";
import { Button, Spin } from "antd";
import "./AppUpdate.css";

//@ts-ignore
const electron = window.electron;

function AppUpdate() {
  const [loading, setLoading] = useState<boolean>(false);
  const buttonClick = () => {
    setLoading(true);
    electron.ipcRenderer.send("app-update", true);
  };
  electron.ipcRenderer.on("app-update-reply", (msg: string) => {
    if (msg === "end") {
      setLoading(false);
    }
  });
  return (
    <div className="app-update">
      <Button onClick={buttonClick}>检查更新</Button>
      {loading && <Spin />}
    </div>
  );
}

export default AppUpdate;
