/**
 * @description ipc暴露的函数
 */
interface Window {
  electron: {
    close: () => void;
    minimize: () => void;
    maximize: () => void;
    onResize: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => void;
  };
}
