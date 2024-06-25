interface Item {
  id: string;
  name: string;
}

interface Props<T extends Item> {
  items: T[];
  selectedItem: T;
  onItemSelect(item: T): void;
}

function ListGroup<T extends Item>({
  items,
  selectedItem,
  onItemSelect,
}: Props<T>) {
  return (
    <ul className="clickable list-group">
      {items.map((item) => (
        <li
          key={item.id}
          onClick={() => onItemSelect(item)}
          className={`list-group-item ${
            item.id === selectedItem.id ? "active" : ""
          } `}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}

export default ListGroup;
