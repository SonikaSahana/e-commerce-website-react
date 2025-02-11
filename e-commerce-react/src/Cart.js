import React, { useContext } from "react";
import { Modal, Table, Button } from "react-bootstrap";
import { CartContext } from "./store/CartContext";

const Cart = ({ show, handleClose }) => {
  const { cart, removeItem } = useContext(CartContext);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cart.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src={item.imageUrl} alt={item.title} width="50" />
                  </td>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => removeItem(index)}>Remove</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>Your cart is empty!</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default Cart;
