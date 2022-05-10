import { Link } from "react-router-dom";
import { Order } from "../../../server";

interface OrderItemProps {
  item: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  const formatTime = (timestamp: Date) => {
    var date = new Date(timestamp);
    return date.toLocaleTimeString("pt-BR");
  };
  return (
    <li className="item" key={item.id}>
      <span className="size">{item.size}</span> {item.flavor}
      <span className="timestamp">{formatTime(item.timestamp)}</span>
      <span className="link">
        <Link to={`/new-edit-order/${item.id}`}>Edit order</Link>
      </span>
    </li>
  );
};

export default OrderItem;
