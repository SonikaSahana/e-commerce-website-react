import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [productId]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <h3>Price: ${product.price}</h3>
      
      {/* Product Images */}
      {product.image && (
        <img 
          src={product.image} 
          alt={product.title} 
          style={{ width: "200px", cursor: "zoom-in" }} 
          onClick={() => window.open(product.image, "_blank")}
        />
      )}

      {/* Reviews (Mock Data) */}
      <h2>Reviews:</h2>
      <ul>
        <li>⭐⭐⭐⭐ - Great product!</li>
        <li>⭐⭐⭐ - Average quality</li>
        <li>⭐⭐⭐⭐⭐ - Worth the price!</li>
      </ul>
    </div>
  );
};

export default ProductDetails;
