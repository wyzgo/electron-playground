import React, { useRef, useState } from "react";
import { Button, Input } from "antd";
import "./IpcTest.css";

//@ts-ignore
const electron = window.electron;

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const buttonClick = () => {
    electron.ipcRenderer.send("renderer-process-to-main-process", inputValue);
  };
  const openWindow = () => {
    electron.ipcRenderer.send("open-ipc-test-window", true);
  };
  return (
    <div className="ipc-test">
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="ipc-test-input"
      />
      <Button onClick={openWindow} className="ipc-test-button">
        打开ipc测试窗口
      </Button>
      <Button onClick={buttonClick} className="ipc-test-button">
        传递消息到主进程
      </Button>
    </div>
  );
}

export default App;
