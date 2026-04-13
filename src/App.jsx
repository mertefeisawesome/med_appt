import Home from "@/pages/Home/Home";
import Navbar from "@/components/Navbar/Navbar";
import Login from "@/pages/Login/Login";
import Sign_Up from "@/pages/Sign_Up/Sign_Up";
import InstantConsultation from "@/components/InstantConsultation/InstantConsultation";
import FindDoctorSearch from "@/components/FindDoctorSearch/FindDoctorSearch";
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
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          <Route path="/find-doctor" element={<FindDoctorSearch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
