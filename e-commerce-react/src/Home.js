import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retrying, setRetrying] = useState(false);
  const [retryTimeout, setRetryTimeout] = useState(null); // Track retry timeout

  // Function to fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("https://fakestoreapi.com/products");
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError("Something went wrong... Retrying");
      setLoading(false);
      
      setRetrying(true);
      const timeout = setTimeout(fetchProducts, 5000); 
      setRetryTimeout(timeout);
    }
  };

  useEffect(() => {
    fetchProducts();
    return () => clearTimeout(retryTimeout); 
  }, []);

  
  const stopRetrying = () => {
    clearTimeout(retryTimeout);
    setRetrying(false);
    setError("Fetching stopped by user.");
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Music Albums</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Loading Products...</p>
        </div>
      ) : error ? (
        <div className="text-center">
          <p className="text-danger">{error}</p>
          {retrying && (
            <Button variant="danger" onClick={stopRetrying}>
              Cancel Retry
            </Button>
          )}
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
                  <Button variant="success">Add to Cart</Button>
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
