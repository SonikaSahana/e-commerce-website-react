import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, Row, Col, Card, Button } from "react-bootstrap";
import { CartContext } from "./CartContext";
import Cart from "./Cart"; 

const productsArr = [
  { title: "Colors", price: 100, imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png" },
  { title: "Black and white Colors", price: 50, imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png" },
  { title: "Yellow and Black Colors", price: 70, imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png" },
  { title: "Blue Color", price: 100, imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png" },
];

const App = () => {
  const { totalItems, addToCart } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#">E-Commerce</Navbar.Brand>
          <Nav className="ms-auto">
            <Button variant="light" onClick={() => setShowCart(true)}>
              🛒 Cart ({totalItems})
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <h2 className="text-center mb-4">Products</h2>
        <Row>
          {productsArr.map((product, index) => (
            <Col key={index} md={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src={product.imageUrl} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>Price: ${product.price}</Card.Text>
                  <Button variant="success" onClick={() => addToCart(product)}>Add to Cart</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Cart show={showCart} handleClose={() => setShowCart(false)} />
    </>
  );
};

export default App;
