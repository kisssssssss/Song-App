import React, { memo, Suspense } from 'react'
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client"
import { HashRouter, useRoutes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ConfigProvider } from "antd";

import routes from "./routes";
import store from "./store"
import theme from "./style/theme";

import TitleBar from './components/TitleBar';
import CustomizedLayout from './components/Layout';

import "normalize.css"
import "./style/base.css"

window.electron.onResize((event, val) => {
})

const App = memo(() => (
  <Suspense fallback={'loading...'}>
    <Provider store={store}>
      <ThemeProvider theme={{ ...theme }}>
        <ConfigProvider theme={{
          token: {
            colorPrimary: theme.themeColor.color6,
          },
        }}>
          <TitleBar />
          <CustomizedLayout>{useRoutes(routes)}</CustomizedLayout>
        </ConfigProvider>
      </ThemeProvider>
    </Provider>
  </Suspense>

))

createRoot(document.getElementById("root")).render(<HashRouter><App /></HashRouter>);