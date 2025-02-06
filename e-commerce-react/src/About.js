import React from "react";
import { Container } from "react-bootstrap";

const About = () => {
  return (
    <Container className="mt-5">
      <h2>About Us</h2>
      <p>
        Welcome to our E-Commerce website. We provide the best products with the best prices. 
        Our goal is to offer high-quality items with fast delivery and great customer support.
      </p>
      <img
        src="https://prasadyash2411.github.io/ecom-website/about.jpg"
        alt="About Us"
        width="100%"
      />
    </Container>
  );
};

export default About;
