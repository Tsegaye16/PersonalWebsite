import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import PostDetails from "./components/postDetails/PostDetails";

const App: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("profile") || "null");
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/posts/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/posts/" />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
