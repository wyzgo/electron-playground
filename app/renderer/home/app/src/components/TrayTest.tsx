import React from "react";
import { Button } from "antd";
import "./TrayTest.css";

//@ts-ignore
const electron = window.electron;

//@ts-ignore
const trayIconPath = window.publicPath + '/icon_16x16@2x.png';

const { Tray, Menu } = electron.remote;

function TrayTest() {
  let tray: any = null;
  const buttonClick = () => {
    if (!tray) {
      tray = new Tray(trayIconPath);
      const contextMenu = Menu.buildFromTemplate([
        { label: "Item1", type: "radio" },
        { label: "Item2", type: "radio", checked: true },
        {
          label: "Remove",
          click: () => {
            tray.destroy();
            tray = null;
          },
        },
      ]);
      tray.setToolTip("This is my application.");
      tray.setTitle('This is a tray');
      tray.setContextMenu(contextMenu);
    }
  };

  return (
    <div className="tray-test">
      <Button onClick={buttonClick}>设置Tray</Button>
    </div>
  );
}

export default TrayTest;
