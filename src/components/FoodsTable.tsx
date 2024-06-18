import { Food, SortColumn, column } from "@types";
import { Favorite, Table } from "@components/common";
import { Link } from "react-router-dom";

interface Props {
  foods: Food[];
  sortColumn: SortColumn;
  onSort(sortColumn: SortColumn): void;
  onDelete(id: string): void;
  onFavor(id: string): void;
}

function FoodsTable({ foods, sortColumn, onDelete, onFavor, onSort }: Props) {
  const columns: column<Food>[] = [
    {
      path: "name",
      label: "Name",
      key: "name",
      content: (food) => <Link to={`/foods/${food._id}`}>{food.name}</Link>,
    },
    { path: "category.name", label: "Category" },
    { path: "price", label: "Price" },
    { path: "numberInStock", label: "Stock" },
    {
      key: "favorite",
      content: (food) => (
        <Favorite
          isFavored={Boolean(food.isFavored)}
          onFavor={() => onFavor(food._id)}
        />
      ),
    },
    {
      key: "delete",
      content: (food) => (
        <button className="btn btn-danger" onClick={() => onDelete(food._id)}>
          Delete
        </button>
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
