import _ from "lodash";
import { Food } from "../services/fakeFoodService";
import Favorite from "./Favorite";
import { column } from "./TableHeader";

interface Props {
  foods: Food[];
  columns: column[];
  onDelete(id: string): void;
  onFavor(id: string): void;
}

function TableBody({ foods, columns, onDelete, onFavor }: Props) {
  return (
    <tbody>
      {foods.map((food) => (
        <tr key={food._id}>
          {columns.map(
            (column) =>
              "path" in column && (
                <td key={column.path}>{_.get(food, column.path)}</td>
              )
          )}

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
  );
}

export default TableBody;
