
# 介绍

使用 Electron + React + TS 开发的一个简单的音乐桌面软件.

开发中使用到的库有：
- Electron
- Electron-forge
- React
- Nextui
- Zustand
- Tailwindcss
- ...

## 项目结构

```sh

│  forge.config.ts	# 项目打包配置以及入口文件配置
│  tailwind.config.js	# 主题颜色配置
│  webpack.main.config.ts
│  webpack.renderer.config.ts
│  webpack.plugins.ts
│  webpack.rules.ts
├─docs # 存放关于后端API接口
│      index.md
│      NeteaseCloudMusicApi.md
│      NeteaseCloudMusicApi.xlsx
└─src
	├─electron # 关于electron的代码
	│	│  index.ts # 入口文件
	│	├─@types # 关于electron的代码所用到的类型
	│	└─ipc # electron代码和窗口进行通信相关的模块
	└─renderer # 窗口渲染代码
    ├─@types
    ├─assets
    │  ├─img
    │  └─svg       
    ├─components
    ├─page
    ├─routes
    ├─service
    ├─store
    ├─style
    └─utils
```

