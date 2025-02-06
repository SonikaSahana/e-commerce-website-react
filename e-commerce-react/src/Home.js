import React, { useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { CartContext } from "./CartContext";

const productsArr = [
  { title: "Colors", price: 100, imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png" },
  { title: "Black and white Colors", price: 50, imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png" },
  { title: "Yellow and Black Colors", price: 70, imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png" },
  { title: "Blue Color", price: 100, imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png" },
];

const Home = () => {
  const { addToCart } = useContext(CartContext);

  return (
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
  );
};

export default Home;
