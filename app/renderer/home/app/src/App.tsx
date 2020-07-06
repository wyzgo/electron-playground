import React, { useState } from "react";
import { Tabs } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import IpcTest from "./components/IpcTest";
import Frameless from "./components/Frameless";
import AppMenu from "./components/AppMenu";
import TrayTest from "./components/TrayTest";
import "./App.css";

const { TabPane } = Tabs;

function App() {
  const [selectedKey, setSelectedKey] = useState("ipc-test");
  return (
    <div className="app">
      <Router>
        <header className="app-header">
          <Tabs
            onChange={(key) => {
              setSelectedKey(key);
            }}
            defaultActiveKey={selectedKey}
          >
            <TabPane
              tab={<Link to="/ipc-test">IPC-Test</Link>}
              key="ipc-test"
            ></TabPane>
            <TabPane
              tab={<Link to="/frameless">Frameless Window</Link>}
              key="frameless"
            ></TabPane>
            <TabPane
              tab={<Link to="/app-menu">App Menu</Link>}
              key="app-menu"
            ></TabPane>
            <TabPane
              tab={<Link to="/tray-test">Tray</Link>}
              key="tray-test"
            ></TabPane>
          </Tabs>
        </header>
        <Switch>
          <Route path="/ipc-test" exact component={IpcTest} />
          <Route path="/frameless" exact component={Frameless} />
          <Route path="/tray-test" exact component={TrayTest} />
          <Route path="/app-menu" exact component={AppMenu} />
          <Redirect to="/ipc-test" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
