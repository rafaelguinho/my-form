import { createServer } from "miragejs";

export const generateUUID = () => {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export interface Order {
  id: number | null;
  timestamp: Date;
  crust: string;
  flavor: string;
  size?: "S" | "M" | "L" | "XL";
  tableNo: number;
}

export interface Error {
  message: string;
}

export const createdFakeEndpoint = () => {
  let server = createServer({
    routes() {
      this.namespace = "api";
      this.get("/orders", (schema, request): Order[] => {
        return schema.db.orders as Order[];
      })

      this.get("api/orders/:id", (schema, request): Order[] => {
        let id = request.params.id;

        return schema.db.orders.find(id);
      })

      this.post("/orders", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);

        const newOrder = { ...attrs, id: generateUUID(), timestamp: new Date() };

        return schema.db.orders.insert(newOrder);
      })
      this.passthrough() 
    },
  });

  server.db.loadData({
    orders: [],
  });
};
