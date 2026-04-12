import Home from "@/pages/Home/Home";
import Navbar from "@/components/Navbar/Navbar";
import Login from "@/pages/Login/Login";
import Sign_Up from "@/pages/Sign_Up/Sign_Up";
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
