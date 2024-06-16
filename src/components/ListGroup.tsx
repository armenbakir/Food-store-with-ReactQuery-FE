interface Item {
  _id: string;
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
          key={item._id}
          onClick={() => onItemSelect(item)}
          className={`list-group-item ${
            item._id === selectedItem._id ? "active" : ""
          } `}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}

export default ListGroup;
