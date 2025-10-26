import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles/Dashboard.css";

export default function Dashboard({ products }) {
  const totalProducts = products.length;

  const avgPrice =
    products.length > 0
      ? (products.reduce((sum, p) => sum + p.price_per_unit, 0) / products.length).toFixed(2)
      : 0;

  const totalStockValue = products
    .reduce((sum, p) => sum + p.price_per_unit * (p.quantity_in_stock || 1), 0)
    .toFixed(2);

  const categoryCount = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.entries(categoryCount).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"];

  const topProducts = [...products]
    .sort((a, b) => b.price_per_unit - a.price_per_unit)
    .slice(0, 5);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title"> Product Dashboard</h1>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card blue">
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>
        <div className="card green">
          <h3>Average Price</h3>
          <p>₹{avgPrice}</p>
        </div>
        <div className="card yellow">
          <h3>Total Categories</h3>
          <p>{categoryData.length}</p>
        </div>
        <div className="card purple">
          <h3>Total Stock Value</h3>
          <p>₹{totalStockValue}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-box">
          <h3>Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Category Count (Bar Chart)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="table-container">
        <h3>🏆 Top 5 Expensive Products</h3>
        <table className="top-products-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((p) => (
              <tr key={p.product_id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.price_per_unit}</td>
                <td>{p.quantity_in_stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
