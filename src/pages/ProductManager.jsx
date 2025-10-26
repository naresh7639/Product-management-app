import React, { useState } from "react";

export default function ProductManager({ productList, setProductList }) {
  const [formData, setFormData] = useState({
    product_id: "",
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
    if (
      !formData.name ||
      !formData.category ||
      !formData.price_per_unit ||
      !formData.unit_type
    ) {
      alert("Please fill required fields!");
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
      product_id: "",
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
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProductList(productList.filter((p) => p.product_id !== id));
    }
  };

  return (
    <div>
      {/* FORM SECTION */}
      <div className="crud-form">
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
            placeholder="Price"
            type="number"
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
            placeholder="Stock"
            type="number"
            value={formData.quantity_in_stock}
            onChange={handleChange}
          />
          <input
            name="expiration_date"
            placeholder="Expiration Date (optional)"
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

      {/* TABLE SECTION */}
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
                <button onClick={() => handleEdit(p)} className="btn-secondary">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.product_id)}
                  className="btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
