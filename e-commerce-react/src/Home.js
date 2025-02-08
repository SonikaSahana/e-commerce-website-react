import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const API_URL = "http://localhost:4000/movies"; 

const Home = () => {
  const [movies, setMovies] = useState([]); 
  const [newMovie, setNewMovie] = useState({ title: "", imageUrl: "", rating: "", description: "" });

  // Fetch movies from backend
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // Handle input change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewMovie((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Handle form submission (POST request)
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });

      if (!response.ok) throw new Error("Failed to add movie");

      const addedMovie = await response.json();
      setMovies((prev) => [...prev, addedMovie]); // Update UI with new movie
      setNewMovie({ title: "", imageUrl: "", rating: "", description: "" });
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  }, [newMovie]);

  // Handle delete movie (DELETE request)
  const handleDelete = useCallback(async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete movie");

      setMovies((prev) => prev.filter((movie) => movie.id !== id)); // Update UI
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  }, []);

  // Memoized Movies
  const memoizedMovies = useMemo(() => movies, [movies]);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Movies</h2>

      {/* Add Movie Form */}
      <Form onSubmit={handleSubmit} className="mb-4 p-3 border rounded">
        <Row>
          <Col md={3}>
            <Form.Control type="text" placeholder="Movie Title" name="title" value={newMovie.title} onChange={handleChange} required />
          </Col>
          <Col md={3}>
            <Form.Control type="text" placeholder="Image URL" name="imageUrl" value={newMovie.imageUrl} onChange={handleChange} required />
          </Col>
          <Col md={2}>
            <Form.Control type="number" placeholder="Rating" name="rating" value={newMovie.rating} onChange={handleChange} required />
          </Col>
          <Col md={3}>
            <Form.Control type="text" placeholder="Description" name="description" value={newMovie.description} onChange={handleChange} required />
          </Col>
          <Col md={1}>
            <Button type="submit" variant="primary">Add Movie</Button>
          </Col>
        </Row>
      </Form>

      {/* Movies List */}
      <Row>
        {memoizedMovies.map((movie) => (
          <Col key={movie.id} md={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={movie.imageUrl} alt={movie.title} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>⭐ {movie.rating}</Card.Text>
                <Button variant="danger" onClick={() => handleDelete(movie.id)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
