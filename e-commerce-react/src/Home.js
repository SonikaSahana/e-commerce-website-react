import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const Home = () => {
  const [movies, setMovies] = useState([]); 
  const [newMovie, setNewMovie] = useState({ title: "", imageUrl: "", rating: "", description: "" });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY");
        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewMovie((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log("New Movie Object:", newMovie);
    setNewMovie({ title: "", imageUrl: "", rating: "", description: "" });
  }, [newMovie]);

  
  const memoizedMovies = useMemo(() => movies, [movies]);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Movies</h2>

      <Form onSubmit={handleSubmit} className="mb-4 p-3 border rounded">
        <Row>
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Movie Title"
              name="title"
              value={newMovie.title}
              onChange={handleChange}
              required
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Image URL"
              name="imageUrl"
              value={newMovie.imageUrl}
              onChange={handleChange}
              required
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="number"
              placeholder="Rating"
              name="rating"
              value={newMovie.rating}
              onChange={handleChange}
              required
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Description"
              name="description"
              value={newMovie.description}
              onChange={handleChange}
              required
            />
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
              <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>⭐ {movie.vote_average}</Card.Text>
                <Button variant="success">Add to Favorites</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
