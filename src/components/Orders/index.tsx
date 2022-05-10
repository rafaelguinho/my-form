import React, { useState, useEffect } from "react";
import { Error, Order } from "../../server";
import OrderItem from "./OrderItem";

function Orders() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<Order[]>([]);

  useEffect(() => {
    //request

    fetch("http://localhost:5006/api/orders")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul className="items">
        {items.map((item) => (
          <OrderItem key={item.id} item={item} />
        ))}
      </ul>
    );
  }
}

export default Orders;
