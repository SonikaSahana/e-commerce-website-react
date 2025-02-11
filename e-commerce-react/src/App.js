import React, { useState, useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { CartContext } from "./store/CartContext";
import { AuthContext } from "./store/AuthContext";
import Home from "./Home";
import About from "./About";
import ContactUs from "./ContactUs";
import ProductDetails from "./ProductDetails";
import Signup from "./Signup"; 
import Login from "./Login";

const App = () => {
  const { totalItems } = useContext(CartContext);
  const { token, logout } = useContext(AuthContext); 
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#">E-Commerce</Navbar.Brand>
          <Nav className="ms-auto">
            <NavLink to="/" className="nav-link" style={{ color: "white" }}>Home</NavLink>
            <NavLink to="/about" className="nav-link" style={{ color: "white" }}>About</NavLink>

            {!token ? (
              <>
                <NavLink to="/signup" className="nav-link" style={{ color: "white" }}>Sign Up</NavLink>
                <NavLink to="/login" className="nav-link" style={{ color: "white" }}>Login</NavLink>
              </>
            ) : (
              <>
                <Button variant="light">🛒 Cart ({totalItems})</Button>
                <Button variant="danger" onClick={logout}>Logout</Button> 
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
