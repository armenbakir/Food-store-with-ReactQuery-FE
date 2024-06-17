import { Food } from "../services/fakeFoodService";
import Favorite from "./Favorite";

interface Props {
  foods: Food[];
  onSort(path: string): void;
  onDelete(id: string): void;
  onFavor(id: string): void;
}

function FoodsTable({ onDelete, onFavor, foods, onSort }: Props) {
  return (
    <table className="table">
      <thead className="clickable">
        <tr>
          <th scope="col" onClick={() => onSort("name")}>
            Name
          </th>
          <th scope="col" onClick={() => onSort("category.name")}>
            Category
          </th>
          <th scope="col" onClick={() => onSort("price")}>
            Price
          </th>
          <th scope="col" onClick={() => onSort("numberInStock")}>
            Stock
          </th>
          <th />
          <th />
        </tr>
      </thead>
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
