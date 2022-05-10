import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NewEditOrder from "./components/NewEditOrder";
import Orders from "./components/Orders";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/new-edit-order">New order</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/new-edit-order" element={<NewEditOrder />}></Route>
        <Route path="/new-edit-order/:orderId" element={<NewEditOrder />}></Route>
        <Route path="/" element={<Orders />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
