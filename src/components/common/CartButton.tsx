interface Props {
  isInCart: boolean;
  onToggleCart(): void;
}

function CartButton({ isInCart, onToggleCart }: Props) {
  let classes = "btn btn-";
  classes += isInCart ? "secondary" : "primary";
  return (
    <button className={classes} onClick={onToggleCart}>
      {isInCart ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="16"
            fill="currentColor"
            className="bi bi-check2"
            viewBox="0 0 16 16"
          >
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
          </svg>
          Remove
        </>
      ) : (
        "Add to Cart"
      )}
    </button>
  );
}

export default CartButton;
