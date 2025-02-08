import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);
  const [retryTimeout, setRetryTimeout] = useState(null);

  
  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://fakestoreapi.com/products"); 
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const data = await response.json();
      setMovies(data);
      setRetrying(false);
      clearTimeout(retryTimeout); 
    } catch (err) {
      setError("Something went wrong ...Retrying");
      if (!retrying) {
        startRetry();
      }
    } finally {
      setLoading(false);
    }
  }, [retrying, retryTimeout]);

  const startRetry = useCallback(() => {
    setRetrying(true);
    const timeout = setTimeout(() => {
      fetchMovies();
    }, 5000);
    setRetryTimeout(timeout);
  }, [fetchMovies]);


  const stopRetry = useCallback(() => {
    setRetrying(false);
    clearTimeout(retryTimeout);
    setError("Retrying stopped by user.");
  }, [retryTimeout]);

  
  useEffect(() => {
    fetchMovies();
    return () => clearTimeout(retryTimeout); 
  }, [fetchMovies, retryTimeout]); 

  
  const memoizedMovies = useMemo(() => movies, [movies]);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Movie List</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Loading Movies...</p>
        </div>
      ) : error ? (
        <div className="text-center">
          <p className="text-danger">{error}</p>
          <Button variant="danger" onClick={stopRetry}>
            Cancel Retry
          </Button>
        </div>
      ) : (
        <Row>
          {memoizedMovies.map((movie) => (
            <Col key={movie.id} md={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src={movie.image} alt={movie.title} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>Price: ${movie.price}</Card.Text>
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
