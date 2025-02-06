import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { CartContext } from "./CartContext";
import Cart from "./Cart"; 
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./Home";
import About from "./About";

const App = () => {
  const { totalItems } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#">E-Commerce</Navbar.Brand>
          <Nav className="ms-auto">
            <NavLink to="/" className="nav-link" style={{ color: "white" }}>Home</NavLink>
            <NavLink to="/about" className="nav-link" style={{ color: "white" }}>About</NavLink>
            <Button variant="light" onClick={() => setShowCart(true)}>
              🛒 Cart ({totalItems})
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Cart show={showCart} handleClose={() => setShowCart(false)} />
    </Router>
  );
};

export default App;
