import { Modal, Button } from "react-bootstrap";
import { CartItem } from "@types";
import { useCart } from "@Context/CartContext";

interface CartModalProps {
  show: boolean;
  onHide(): void;
}

function CartModal({ show, onHide }: CartModalProps) {
  const { cartItems, addToCart, removeFromCart, decreaseQuantity } = useCart();

  const totalPrice = cartItems.reduce((total, { item, quantity }) => {
    return total + item.price * quantity;
  }, 0);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <ul className="list-group mb-3">
              {cartItems.map(({ item, quantity }: CartItem) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <span>
                      {item.name} - ${item.price} x {quantity}
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <Button
                      variant="secondary"
                      onClick={() => decreaseQuantity(item.id)}
                      className="me-2"
                    >
                      -
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => addToCart(item)}
                      className="me-2"
                    >
                      +
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => removeFromCart(item.id)}
                      className="me-3"
                    >
                      Remove
                    </Button>
                    <span className="fw-bold">
                      ${(item.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-end">
              <h5 className="fw-bold">Total: ${totalPrice.toFixed(2)}</h5>
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CartModal;
