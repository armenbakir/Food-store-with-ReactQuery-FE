import _ from "lodash";
import { column } from "./TableHeader";

type WithId<T> = T & { _id: string };

interface Props<T> {
  items: WithId<T>[];
  columns: column<T>[];
  onDelete(id: string): void;
  onFavor(id: string): void;
}

function TableBody<T>({ items, columns }: Props<T>) {
  return (
    <tbody>
      {items.map((item) => (
        <tr key={item._id}>
          {columns.map((column) =>
            "path" in column ? (
              <td key={column.path}>{_.get(item, column.path)}</td>
            ) : (
              <td key={column.key}>{column.content(item)}</td>
            )
          )}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
