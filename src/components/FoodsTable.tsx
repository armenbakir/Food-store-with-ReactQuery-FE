import { Food } from "../services/fakeFoodService";
import Favorite from "./Favorite";
import TableHeader, { column } from "./TableHeader";

export interface SortColumn {
  path: string;
  order: "asc" | "desc";
}

interface Props {
  foods: Food[];
  sortColumn: SortColumn;
  onSort(sortColumn: SortColumn): void;
  onDelete(id: string): void;
  onFavor(id: string): void;
}

function FoodsTable({ foods, sortColumn, onDelete, onFavor, onSort }: Props) {
  const columns: column[] = [
    { path: "name", label: "Name" },
    { path: "category.name", label: "Category" },
    { path: "price", label: "Price" },
    { path: "numberInStock", label: "Stock" },
    { key: "favorite" },
    { key: "delete" },
  ];
  return (
    <table className="table">
      <TableHeader onSort={onSort} sortColumn={sortColumn} columns={columns} />
      <tbody>
        {foods.map((food) => (
          <tr key={food._id}>
            <td>{food.name}</td>
            <td>{food.category.name}</td>
            <td>{food.price}</td>
            <td>{food.numberInStock}</td>
            <td>
              <Favorite
                isFavored={Boolean(food.isFavored)}
                onFavor={() => onFavor(food._id)}
              />
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(food._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FoodsTable;
