import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import Sign_Up from "@/pages/Sign_Up/Sign_Up";
import InstantConsultation from "@/components/InstantConsultation/InstantConsultation";
import BookingConsultation from "@/pages/BookingConsultation/BookingConsultation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notifications from "@/components/Notifications/Notifications";
import Reviews from "@/pages/Reviews/Reviews";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Notifications>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Sign_Up />} />
            <Route
              path="/instant-consultation"
              element={<InstantConsultation />}
            />
            <Route
              path="/booking-consultation"
              element={<BookingConsultation />}
            />
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
        </Notifications>
      </BrowserRouter>
    </div>
  );
}

export default App;
