import { configureStore } from "@reduxjs/toolkit";

import dataReducer from "./module/data";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;