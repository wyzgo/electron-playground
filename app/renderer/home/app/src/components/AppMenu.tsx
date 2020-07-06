import React from "react";
import { Button } from "antd";
import "./AppMenu.css";

//@ts-ignore
const electron = window.electron;

//@ts-ignore
const iconPath = window.publicPath + "/icon_64x64.png";

//@ts-ignore
const isMac = window.isMac;

const { app, Menu, shell, Notification } = electron.remote;

const template = [
  // { role: "appMenu" },
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: "about" },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideothers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" },
          ],
        },
      ]
    : []),
  { role: "fileMenu" },
  // {
  //   label: "File",
  //   submenu: [isMac ? { role: "close" } : { role: "quit" }],
  // },
  // { role: 'editMenu' }
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      ...(isMac
        ? [
            { role: "pasteAndMatchStyle" },
            { role: "delete" },
            { role: "selectAll" },
            { type: "separator" },
            {
              label: "Speech",
              submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }],
            },
          ]
        : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
    ],
  },
  // { role: 'viewMenu' }
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forcereload" },
      { role: "toggledevtools" },
      { type: "separator" },
      { role: "resetzoom" },
      { role: "zoomin" },
      { role: "zoomout" },
      { type: "separator" },
      { role: "togglefullscreen" },
    ],
  },
  // { role: 'windowMenu' }
  {
    label: "Window",
    submenu: [
      { role: "minimize" },
      { role: "zoom" },
      ...(isMac
        ? [
            { type: "separator" },
            { role: "front" },
            { type: "separator" },
            { role: "window" },
          ]
        : [{ role: "close" }]),
    ],
  },
  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click: async () => {
          await shell.openExternal("https://electronjs.org");
        },
      },
    ],
  },
  {
    label: "Custom Menu",
    submenu: [
      {
        label: "Custom Menuitem",
        click: () => {
          const n = new Notification({
            title: "通知",
            body: "这是一个通知",
            icon: iconPath,
          });
          n.show();
        },
        accelerator: "CommandOrControl+L",
      },
      { type: "separator" },
      {
        label: "Checkbox Menuitem",
        type: "checkbox",
        toolTip: "this is a checkbox",
      },
      { type: "separator" },
      {
        label: "Radio Group",
        submenu: [
          { label: "Radio A", type: "radio" },
          { label: "Radio B", type: "radio" },
        ],
      },
    ],
  },
];

function AppMenu() {
  const buttonClick = () => {
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  };

  const contextBtnClick = () => {
    const menu = Menu.buildFromTemplate(template);
    menu.popup();
  };
  return (
    <div className="app-menu">
      <Button onClick={buttonClick}>设置应用菜单</Button>
      <Button onClick={contextBtnClick} className="app-menu-button">
        Context Menu
      </Button>
    </div>
  );
}

export default AppMenu;
