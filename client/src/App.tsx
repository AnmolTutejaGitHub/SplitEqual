import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import Home from "./Components/Home";
import NewGroup from "./Components/NewGroup";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/home/*" element={<Home />}></Route>
          <Route path="/newGroup" element={<NewGroup />}></Route>
        </Routes>
      </BrowserRouter>
    </div>)
}

export default App
