import "./App.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
function App() {
  const isAuthenticated = useSelector((state) => state.user);
  const isAuth = useSelector((state) => state.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="app">
      <Routes>
        {isAuthenticated && (
          <Route
            path="/"
            element={isAuth ? <Home /> : <Navigate to="/auth" />}
          />
        )}
        <Route path="/auth" element={<Auth />} />
        {isAuthenticated && (
          <Route
            path="/user/:id"
            element={isAuth ? <Profile /> : <Navigate to="/auth" />}
          />
        )}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
