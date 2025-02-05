import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AdminPanel from "./components/Adminpanel.jsx";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { ShopContext } from "./context/ShopContext";

const App = () => {
  const { token } = useContext(ShopContext);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
