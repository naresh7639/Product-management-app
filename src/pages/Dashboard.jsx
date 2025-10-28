import React, { useEffect, useState } from "react";
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
  const [data, setData] = useState({
    totalProducts: 0,
    avgPrice: 0,
    totalStockValue: 0,
    categoryData: [],
    topProducts: [],
  });

  useEffect(() => {
    const productList =
      products && products.length > 0
        ? products
        : JSON.parse(localStorage.getItem("products")) || [];

    const totalProducts = productList.length;
    const avgPrice =
      productList.length > 0
        ? (
            productList.reduce((sum, p) => sum + Number(p.price_per_unit || 0), 0) /
            productList.length
          ).toFixed(2)
        : 0;

    const totalStockValue = productList
      .reduce(
        (sum, p) => sum + (p.price_per_unit || 0) * (p.quantity_in_stock || 1),
        0
      )
      .toFixed(2);

    const categoryCount = productList.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});

    const categoryData = Object.entries(categoryCount).map(([name, value]) => ({
      name,
      value,
    }));

    const topProducts = [...productList]
      .sort((a, b) => b.price_per_unit - a.price_per_unit)
      .slice(0, 5);

    setData({
      totalProducts,
      avgPrice,
      totalStockValue,
      categoryData,
      topProducts,
    });
  }, [products]);

  const COLORS = ["#007bff", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Product Dashboard</h1>

      <div className="summary-cards">
        <div className="card blue">
          <h3>Total Products</h3>
          <p>{data.totalProducts}</p>
        </div>
        <div className="card green">
          <h3>Average Price</h3>
          <p>₹{data.avgPrice}</p>
        </div>
        <div className="card yellow">
          <h3>Total Categories</h3>
          <p>{data.categoryData.length}</p>
        </div>
        <div className="card purple">
          <h3>Total Stock Value</h3>
          <p>₹{data.totalStockValue}</p>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-box">
          <h3>Category Distribution</h3>
          {data.categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={data.categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {data.categoryData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="no-data">No category data available</p>
          )}
        </div>

        <div className="chart-box">
          <h3>Category Count</h3>
          {data.categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={data.categoryData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="no-data">No category data available</p>
          )}
        </div>
      </div>

      <div className="table-container">
        <h3>🏆 Top 5 Expensive Products</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {data.topProducts.length > 0 ? (
              data.topProducts.map((p, index) => (
                <tr key={index}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.price_per_unit}</td>
                  <td>{p.quantity_in_stock}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", color: "#777" }}>
                  No product data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
