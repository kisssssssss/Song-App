import { contextBridge, ipcRenderer, net } from "electron";
import * as EVENT from "./constants";
import _ from "lodash";

export default function () {
  contextBridge.exposeInMainWorld("electron", {
    close: () => {
      ipcRenderer.send(EVENT.CLOSE);
    },
    minimize: () => {
      ipcRenderer.send(EVENT.MINIMIZE);
    },
    maximize: () => {
      ipcRenderer.send(EVENT.MAXIMIZE);
    },
    onResize: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
      ipcRenderer.on(EVENT.RESIZE, callback);
    },
  });
}
