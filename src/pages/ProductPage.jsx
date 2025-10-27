import React, { useState, useEffect, useRef } from "react"; // include useRef

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
import { products as initialProducts } from "../data/products";

export default function ProductManagementApp() {
  const formRef = useRef(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [productId, setProductId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productList, setProductList] = useState(
    JSON.parse(localStorage.getItem("products")) || initialProducts
  );

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(productList));
  }, [productList]);

  const categories = [...new Set(products.map((p) => p.category))].sort();

  useEffect(() => {
    handleProductSearch2(products);
  }, [products]);

  const handleProductSearch = () => {
    const product = products.find((p) => p.product_id === parseInt(productId));
    setSelectedProduct(product);
  };
  const handleProductSearch2 = (data) => {
    const product = products.find((p) => p.product_id === parseInt(data));
    setSelectedProduct(product);
  };

  const getProductsByCategory = (category) => {
    return products.filter((p) => p.category === category);
  };
  const getAllProduct = (category) => {
    return products;
  };

  const clearFun = () => {
    setProductId("");
    setSelectedCategory("");
    setSelectedProduct("");
  };

  // CRUD Functions
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price_per_unit: "",
    unit_type: "",
    quantity_in_stock: "",
    expiration_date: "",
    supplier_id: "",
  });

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (!formData.name || !formData.category || !formData.price_per_unit) {
      alert("Please fill all required fields!");
      return;
    }

    if (editingId) {
      // Update existing product
      const updated = productList.map((p) =>
        p.product_id === editingId ? { ...formData, product_id: editingId } : p
      );
      setProductList(updated);
      setEditingId(null);
    } else {
      // Add new product
      const newProduct = {
        ...formData,
        product_id: productList.length + 1,
      };
      setProductList([...productList, newProduct]);
    }

    setFormData({
      name: "",
      category: "",
      price_per_unit: "",
      unit_type: "",
      quantity_in_stock: "",
      expiration_date: "",
      supplier_id: "",
    });
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product.product_id);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProductList(productList.filter((p) => p.product_id !== id));
    }
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
                onClick={() => {
                  setCurrentPage("home");
                  clearFun();
                }}
                className={`nav-button ${
                  currentPage === "home" ? "active" : ""
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage("product");
                  clearFun();
                }}
                className={`nav-button ${
                  currentPage === "product" ? "active" : ""
                }`}
              >
                Search Product
              </button>
              <button
                onClick={() => {
                  setCurrentPage("category");
                  clearFun();
                }}
                className={`nav-button ${
                  currentPage === "category" ? "active" : ""
                }`}
              >
                Browse Categories
              </button>
              <button
                onClick={() => {
                  setCurrentPage("AllProducts");
                  clearFun();
                }}
                className={`nav-button ${
                  currentPage === "AllProducts" ? "active" : ""
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => {
                  setCurrentPage("manage");
                  clearFun();
                }}
                className={`nav-button ${
                  currentPage === "manage" ? "active" : ""
                }`}
              >
                Manage Products
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
                onClick={() => {
                  setCurrentPage("product");
                  clearFun();
                }}
                className="btn-primary"
              >
                Search Product
              </button>
              <button
                onClick={() => {
                  setCurrentPage("category");
                  clearFun();
                }}
                className="btn-secondary"
              >
                Browse Categories
              </button>
              <button
                onClick={() => {
                  setCurrentPage("AllProducts");
                  clearFun();
                }}
                className="btn-secondary"
              >
                All Products
              </button>
              <button
                onClick={() => {
                  setCurrentPage("manage");
                  clearFun();
                }}
                className="btn-secondary"
              >
                Manage Products
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
                onChange={(e) => {
                  setProductId(e.target.value);
                  handleProductSearch2(e.target.value);
                }}
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

        {currentPage === "AllProducts" && (
          <div className="content-box">
            <h2 className="page-title">
              <Tag className="icon-green" />
              All Products
            </h2>

            {
              <div>
                <div className="products-grid">
                  {getAllProduct().map((product) => (
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
            }
          </div>
        )}

        {currentPage === "manage" && (
          <div className="content-box">
            <h2 className="page-title">
              <Package className="icon-primary" />
              Manage Products
            </h2>

            {/* ADD/EDIT FORM */}
            <div ref={formRef} className="crud-form">
              <h3>{editingId ? "Edit Product" : "Add New Product"}</h3>
              <div className="form-grid">
                <input
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  name="category"
                  placeholder="Category"
                  value={formData.category}
                  onChange={handleChange}
                />
                <input
                  name="price_per_unit"
                  type="number"
                  placeholder="Price"
                  value={formData.price_per_unit}
                  onChange={handleChange}
                />
                <input
                  name="unit_type"
                  placeholder="Unit Type (kg, pcs)"
                  value={formData.unit_type}
                  onChange={handleChange}
                />
                <input
                  name="quantity_in_stock"
                  type="number"
                  placeholder="Stock"
                  value={formData.quantity_in_stock}
                  onChange={handleChange}
                />
                <input
                  name="expiration_date"
                  placeholder="Expiration Date"
                  value={formData.expiration_date}
                  onChange={handleChange}
                />
                <input
                  name="supplier_id"
                  placeholder="Supplier ID"
                  value={formData.supplier_id}
                  onChange={handleChange}
                />
              </div>
              <button className="btn-primary" onClick={handleAddOrUpdate}>
                {editingId ? "Update Product" : "Add Product"}
              </button>
            </div>

            {/* PRODUCT TABLE */}
            <h3 style={{ marginTop: "30px" }}>Product List</h3>
            <table className="crud-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Supplier</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((p) => (
                  <tr key={p.product_id}>
                    <td>{p.product_id}</td>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>${p.price_per_unit}</td>
                    <td>{p.quantity_in_stock}</td>
                    <td>{p.supplier_id}</td>
                    <td>
                      <button
                        className="btn-secondary"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => handleDelete(p.product_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
