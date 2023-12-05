import { app, BrowserWindow, Tray, Menu, nativeImage } from "electron";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import path from "node:path";
import _ from "lodash";

import ipcListen from "./ipc/listen";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  const win = new BrowserWindow({
    height: 700,
    width: 1000,
    minWidth: 1000,
    minHeight: 680,
    center: true,
    // frame: false,
    icon: path.join(__dirname, "../../public/icon.png"),
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  ipcListen(win);

  win.webContents.openDevTools();

  win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

const createTray = () => {
  const tray = new Tray(
    nativeImage.createFromPath(path.join(__dirname, "../../public/icon.png"))
  );
  tray.setContextMenu(
    Menu.buildFromTemplate([{ label: "退出", click: () => app.quit() }])
  );
  tray.setToolTip("This is my application");
};

app.whenReady().then(() => {
  // 安装开发插件
  installExtension([REACT_DEVELOPER_TOOLS])
    .then(() => {})
    .catch(() => {});

  // 创建窗口
  createWindow();

  // 创建托盘
  createTray();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
