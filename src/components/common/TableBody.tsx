import _ from "lodash";
import { Id, column } from "@types";

interface Props<T extends Id> {
  items: T[];
  columns: column<T>[];
}

function TableBody<T extends Id>({ items, columns }: Props<T>) {
  return (
    <tbody>
      {items.map((item) => (
        <tr key={item.id}>
          {columns.map((column) =>
            "content" in column ? (
              <td key={column.key}>{column.content(item)}</td>
            ) : (
              <td key={column.path}>{_.get(item, column.path)}</td>
            )
          )}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
