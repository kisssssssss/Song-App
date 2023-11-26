import { memo } from 'react'
import { useRoutes } from "react-router-dom";
import routes from "./routes";

import "normalize.css"

const App = memo(() => {
  return (
    <div>
      {useRoutes(routes)}
    </div>
  )
})

export default App