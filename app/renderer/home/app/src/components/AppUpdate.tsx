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
  electron.ipcRenderer.on("app-update-reply", (notCare: any, data: boolean) => {
    if (typeof data === "boolean") {
      setLoading(data);
    } else {
      console.log(data);
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
