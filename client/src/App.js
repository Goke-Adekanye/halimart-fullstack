import { BrowserRouter as Router, Route } from "react-router-dom";
import { Footer } from "./components";
import {
  Cart,
  Home,
  Product,
  Signin,
  ShippingAddress,
  PaymentMethod,
  PlaceOrder,
} from "./pages";

function App() {
  return (
    <Router>
      <div className="">
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/product/:id" component={Product} />
          <Route exact path="/cart/:id?" component={Cart} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/shipping" component={ShippingAddress} />
          <Route exact path="/payment" component={PaymentMethod} />
          <Route exact path="/placeorder" component={PlaceOrder} />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
