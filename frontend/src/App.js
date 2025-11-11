import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AddBlog from "./components/AddBlog";
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar onLogout={handleLogout} />}
        <div
          style={{
            paddingTop: isAuthenticated ? "80px" : "0",
            minHeight: "100vh",
          }}
        >
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <BlogList isAuthenticated={isAuthenticated} />
                  ) : (
                    <Login onLogin={handleLogin} />
                  )
                }
              />
              <Route
                path="/login"
                element={
                  isAuthenticated ? (
                    <Navigate to="/" />
                  ) : (
                    <Login onLogin={handleLogin} />
                  )
                }
              />
              <Route
                path="/register"
                element={
                  isAuthenticated ? (
                    <Navigate to="/" />
                  ) : (
                    <Register onLogin={handleLogin} />
                  )
                }
              />
              <Route
                path="/dashboard"
                element={
                  isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/add-blog"
                element={
                  isAuthenticated ? <AddBlog /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/blog/:id"
                element={
                  isAuthenticated ? <BlogDetail /> : <Navigate to="/login" />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
