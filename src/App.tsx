import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./pages/sidebar";
import Calendar from "./components/calendar";
import Events from "./pages/events";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Calendar/>} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
