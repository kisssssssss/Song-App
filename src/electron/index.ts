import { app, session, BrowserWindow, Tray, Menu, nativeImage } from "electron";
import path from "node:path";
import _ from "lodash";

import ipcListen from "./ipc/listen";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// 关闭 Electron Security Warning 警告
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  const win = new BrowserWindow({
    height: 700,
    width: 1024,
    // minWidth: 1024,
    // minHeight: 680,
    center: true,
    frame: false,
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
  const tray = new Tray(nativeImage.createFromPath(path.join(__dirname, "../../public/icon.png")));
  tray.setContextMenu(Menu.buildFromTemplate([{ label: "退出", click: () => app.quit() }]));
  tray.setToolTip("This is my application");
};

app
  .whenReady()
  .then(() => {
    // 创建窗口
    createWindow();

    // 创建托盘
    createTray();

    // 使指定网址响应标头的 set-cookie 正常执行 -- https://github.com/electron/electron/issues/22345
    session.defaultSession.webRequest.onHeadersReceived(
      { urls: ["https://netease-cloud-music-api-bice-five.vercel.app/*/*", "https://httpbin.org/*/*"] },
      (details, callback) => {
        const cookies = details.responseHeaders["set-cookie"];
        if (cookies) {
          const newCookie = Array.from(cookies).map((cookie) => cookie.concat("; SameSite=None; Secure;"));
          details.responseHeaders["set-cookie"] = [...newCookie];
          callback({
            responseHeaders: details.responseHeaders,
          });
        } else {
          callback({ cancel: false });
        }
      },
    );

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  })
  .then(async () => {
    // 添加 Redux DevTools 3.1.6
    await session.defaultSession.loadExtension(
      "C:\\Users\\23300\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\lmhkpmbekcpmknklioeibfkpmmfibljd\\3.1.6_0",
    );
    // 添加 React Developer Tools -- https://github.com/facebook/react/issues/25843
    await session.defaultSession.loadExtension("E:\\ReactDevTools-Manifest V2");
  });

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
