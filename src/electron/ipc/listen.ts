import { ipcMain, BrowserWindow } from "electron";
import _ from "lodash";

import * as EVENT from "./constants";

export default function (win: BrowserWindow) {
  // 关闭窗口
  ipcMain.on(EVENT.CLOSE, () => {
    win.close();
  });
  // 最小化
  ipcMain.on(EVENT.MINIMIZE, () => {
    win.minimize();
  });
  // 最大化
  ipcMain.on(EVENT.MAXIMIZE, () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.isMaximizable() && win.maximize();
    }
  });
  // 窗口变化
  win.on(
    "resize",
    _.throttle(() => {
      win.webContents.send(EVENT.RESIZE, win.getSize());
    }, 500),
  );
}
