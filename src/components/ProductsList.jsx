import { Product } from "./product/Product";
import "./ProductsList.css";

export function ProductsList({ products, onUpdateProduct, onDeleteProduct }) {
  return (
    <div className="products-list">
      {products.map((product) => (
        <div key={product.id} className="products-list__item">
          <Product
            {...product}
            onUpdate={(updates) => onUpdateProduct(product.id, updates)}
            onDelete={() => onDeleteProduct(product.id)}
          />
        </div>
      ))}
    </div>
  );
}
