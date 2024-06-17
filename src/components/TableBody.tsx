import _ from "lodash";
import { Food } from "../services/fakeFoodService";
import { column } from "./TableHeader";

interface Props {
  foods: Food[];
  columns: column[];
  onDelete(id: string): void;
  onFavor(id: string): void;
}

function TableBody({ foods, columns }: Props) {
  return (
    <tbody>
      {foods.map((food) => (
        <tr key={food._id}>
          {columns.map((column) =>
            "path" in column ? (
              <td key={column.path}>{_.get(food, column.path)}</td>
            ) : (
              <td key={column.key}>{column.content(food)}</td>
            )
          )}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
