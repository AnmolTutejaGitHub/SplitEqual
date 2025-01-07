import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import Home from "./Components/Home";
import NewGroup from "./Components/NewGroup";
import { Toaster } from 'react-hot-toast';
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import OTPValidation from "./Components/OTPValidation";
import ForgetPassword from "./Components/ForgetPassword";

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
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>\
          <Route path="/otpvalidation" element={<OTPValidation />}></Route>
          <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
        </Routes>
      </BrowserRouter>
    </div>)
}

export default App
