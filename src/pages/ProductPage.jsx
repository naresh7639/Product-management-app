import React, { useState } from "react";
import {
  Search,
  Package,
  Tag,
  DollarSign,
  Box,
  Calendar,
  User,
} from "lucide-react";
import "../styles/ProductPage.css";
import { products } from "../data/products";

export default function ProductManagementApp() {
  const [currentPage, setCurrentPage] = useState("home");
  const [productId, setProductId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [...new Set(products.map((p) => p.category))].sort();

  const handleProductSearch = () => {
    const product = products.find((p) => p.product_id === parseInt(productId));
    setSelectedProduct(product);
  };

  const getProductsByCategory = (category) => {
    return products.filter((p) => p.category === category);
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-header">
            <h1 className="nav-title">
              <Package className="title-icon" />
              Product Management System
            </h1>
            <div className="nav-buttons">
              <button
                onClick={() => setCurrentPage("home")}
                className={`nav-button ${
                  currentPage === "home" ? "active" : ""
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage("product")}
                className={`nav-button ${
                  currentPage === "product" ? "active" : ""
                }`}
              >
                Search Product
              </button>
              <button
                onClick={() => setCurrentPage("category")}
                className={`nav-button ${
                  currentPage === "category" ? "active" : ""
                }`}
              >
                Browse Categories
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="main-content">
        {currentPage === "home" && (
          <div className="home-page">
            <Package className="home-icon" />
            <h2 className="home-title">Welcome to Product Management</h2>
            <p className="home-subtitle">
              Search products by ID or browse by category
            </p>
            <div className="home-buttons">
              <button
                onClick={() => setCurrentPage("product")}
                className="btn-primary"
              >
                Search Product
              </button>
              <button
                onClick={() => setCurrentPage("category")}
                className="btn-secondary"
              >
                Browse Categories
              </button>
            </div>
          </div>
        )}

        {currentPage === "product" && (
          <div className="content-box">
            <h2 className="page-title">
              <Search className="icon-primary" />
              Search Product by ID
            </h2>
            <div className="search-container">
              <input
                type="number"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Enter Product ID (1-50)"
                className="search-input"
              />
              <button onClick={handleProductSearch} className="search-button">
                <Search className="button-icon" />
                Search
              </button>
            </div>

            {selectedProduct && (
              <div className="product-details">
                <h3 className="product-name">{selectedProduct.name}</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <Tag /> <span>Product ID:</span>{" "}
                    {selectedProduct.product_id}
                  </div>
                  <div className="detail-item">
                    <Package /> <span>Category:</span>{" "}
                    {selectedProduct.category}
                  </div>
                  <div className="detail-item">
                    <DollarSign /> <span>Price:</span> $
                    {selectedProduct.price_per_unit}/{selectedProduct.unit_type}
                  </div>
                  <div className="detail-item">
                    <Box /> <span>Stock:</span>{" "}
                    {selectedProduct.quantity_in_stock}
                  </div>
                  <div className="detail-item">
                    <Calendar /> <span>Expiration:</span>{" "}
                    {selectedProduct.expiration_date || "N/A"}
                  </div>
                  <div className="detail-item">
                    <User /> <span>Supplier ID:</span>{" "}
                    {selectedProduct.supplier_id}
                  </div>
                </div>
              </div>
            )}

            {productId && !selectedProduct && (
              <div className="error-box">
                Product not found. Please enter a valid Product ID (1–50).
              </div>
            )}
          </div>
        )}

        {currentPage === "category" && (
          <div className="content-box">
            <h2 className="page-title">
              <Tag className="icon-green" />
              Browse by Category
            </h2>

            <div className="category-select">
              <label htmlFor="category">Select Category:</label>
              <select
                id="category"
                className="category-dropdown"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">-- Choose a category --</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {selectedCategory && (
              <div>
                <h3 className="category-title">
                  Products in {selectedCategory} (
                  {getProductsByCategory(selectedCategory).length} items)
                </h3>
                <div className="products-grid">
                  {getProductsByCategory(selectedCategory).map((product) => (
                    <div key={product.product_id} className="product-card">
                      <h4>{product.name}</h4>
                      <div className="card-details">
                        <p>
                          <strong>ID:</strong> {product.product_id}
                        </p>
                        <p>
                          <strong>Price:</strong> ${product.price_per_unit}/
                          {product.unit_type}
                        </p>
                        <p>
                          <strong>Stock:</strong> {product.quantity_in_stock}
                        </p>
                        <p>
                          <strong>Expires:</strong>{" "}
                          {product.expiration_date || "N/A"}
                        </p>
                        <p>
                          <strong>Supplier:</strong> {product.supplier_id}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
