import { Food, SortColumn, column } from "@types";
import { Favorite, Table } from "@components/common";
import { Link } from "react-router-dom";
import { auth } from "@services";
import CartButton from "./common/CartButton";

interface Props {
  foods: Food[];
  sortColumn: SortColumn;
  onSort(sortColumn: SortColumn): void;
  onDelete(id: string): void;
  onFavor(id: string): void;
  onCartToggle(id: string): void;
  isInCart: (id: string) => boolean;
}

function FoodsTable({
  foods,
  sortColumn,
  onDelete,
  onFavor,
  onSort,
  onCartToggle,
  isInCart,
}: Props) {
  const user = auth.getCurrentUser();

  const columns: column<Food>[] = [
    {
      path: "name",
      label: "Name",
      key: "name",
      content: (food) => <Link to={`/foods/${food.id}`}>{food.name}</Link>,
    },
    { path: "category.name", label: "Category" },
    { path: "price", label: "Price" },
    { path: "numberInStock", label: "Stock" },
    {
      key: "cart",
      content: (food) => (
        <CartButton
          isInCart={isInCart(food.id)}
          onToggleCart={() => onCartToggle(food.id)}
        />
      ),
    },
    {
      key: "favorite",
      content: (food) => (
        <Favorite
          isFavored={Boolean(food.isFavored)}
          onFavor={() => onFavor(food.id)}
        />
      ),
    },
    {
      key: "delete",
      content: (food) => (
        <>
          {user?.isAdmin && (
            <button
              className="btn btn-danger"
              onClick={() => onDelete(food.id)}
            >
              Delete
            </button>
          )}
        </>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      items={foods}
      onSort={onSort}
      sortColumn={sortColumn}
    />
  );
}

export default FoodsTable;
