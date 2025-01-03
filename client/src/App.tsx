import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import Home from "./Components/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/home/*" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>)
}

export default App
