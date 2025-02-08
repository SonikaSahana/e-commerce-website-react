import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { CartContext } from "./CartContext";

const Home = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState({}); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products"); 
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setAddingToCart((prev) => ({ ...prev, [product.id]: true }));
    addToCart(product);
    setTimeout(() => {
      setAddingToCart((prev) => ({ ...prev, [product.id]: false }));
    }, 500); 
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Music Albums</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Loading Products...</p>
        </div>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product.id} md={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src={product.image} alt={product.title} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>Price: ${product.price}</Card.Text>
                  <Button
                    variant="success"
                    onClick={() => handleAddToCart(product)}
                    disabled={addingToCart[product.id]}
                  >
                    {addingToCart[product.id] ? "Adding..." : "Add to Cart"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Home;
