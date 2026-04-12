import Home from "@/Home/Home";
import Navbar from "@/Navbar/Navbar";
import Login from "@/Login/Login";
import Sign_Up from "@/Sign_Up/Sign_Up";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Sign_Up />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
