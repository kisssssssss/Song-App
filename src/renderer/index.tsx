import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

import App from "./App";

import "./style/index.css";
import 'animate.css';

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <Suspense fallback={""}>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </Suspense>
  </HashRouter>,
);
