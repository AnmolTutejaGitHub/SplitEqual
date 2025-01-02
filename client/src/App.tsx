import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
        </Routes>
      </BrowserRouter>
    </div>)
}

export default App
