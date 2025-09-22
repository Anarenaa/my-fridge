import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Header } from "./components/Header";
import { ProductsList } from "./components/ProductsList";
import { AddItemForm } from "./components/AddItemForm";
import { EmptyListMessage } from "./components/EmptyListMessage";
import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false); //for add-product-form
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products')) || []);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.name.toLowerCase().includes(query))
      );
    }
  }

  function handleAddProduct(productData) {
    const newProduct = {
      id: Date.now(),
      ...productData,
    };
    setProducts((prev) => [...prev, newProduct]);
    setShowForm(false);
  }

  //for amount changes
  function handleUpdateProduct(id, updates) {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
  }

  function handleDeleteProduct(id) {
    setProducts(products.filter((product) => product.id !== id));
  }

  // Sync filteredProducts when products or searchQuery changes
  useEffect(() => {
    if (!searchQuery) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [products, searchQuery]);
  
  //Save products
  useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products))
    }, [products])

  return (
    <>
      <Header onSearch={handleSearch} />
      {products.length === 0 && <EmptyListMessage />}
      <ProductsList
        products={filteredProducts}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
      />
      {showForm && (
        <div className="form-overlay">
          <AddItemForm
            onSave={handleAddProduct}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}
      <FaPlus
        className="add-item-button icon"
        onClick={() => setShowForm(true)}
      />
    </>
  );
}

export default App;
