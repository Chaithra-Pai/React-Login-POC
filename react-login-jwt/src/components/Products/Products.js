import Basket from "./Basket";
import Filter from "./Filter";
import ProductList from "./ProductList";
import "./Products.css";

const Products = () => {
  return (
    <div className="container">
      <h1>E-commerce Shopping Cart Application</h1>
      <hr />
      <div className="row">
        <div className="col-md-9">
          <ProductList />
        </div>
        <div className="col-md-3">
          <Basket />
        </div>
      </div>
    </div>
  );
};

export default Products
