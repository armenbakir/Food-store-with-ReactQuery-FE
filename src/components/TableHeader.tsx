import { SortColumn } from "./FoodsTable";

interface Props<T> {
  columns: column<T>[];
  sortColumn: SortColumn;
  onSort(sortColumn: SortColumn): void;
}

interface TextColumn {
  path: string;
  label: string;
}

interface ContentColumn<T> {
  key: string;
  content(item: T): JSX.Element;
}

export type column<T> = TextColumn | ContentColumn<T>;

function TableHeader<T>({ sortColumn, columns, onSort }: Props<T>) {
  function handleSort(path: string) {
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    onSort({ ...sortColumn });
  }

  function renderSortIcon(column: TextColumn) {
    if (column.path !== sortColumn.path) return null;

    if (sortColumn.order === "asc")
      return <i className="fa-solid fa-sort-down" />;

    return <i className="fa-solid fa-sort-up" />;
  }

  return (
    <thead className="clickable">
      <tr>
        {columns.map((column) =>
          "path" in column ? (
            <th
              key={column.path}
              scope="col"
              onClick={() => handleSort(column.path)}
            >
              {column.label} {renderSortIcon(column)}
            </th>
          ) : (
            <th key={column.key} />
          )
        )}
      </tr>
    </thead>
  );
}

export default TableHeader;
