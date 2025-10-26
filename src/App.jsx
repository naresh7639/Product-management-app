import React, { useState } from "react";
import ProductPage from "./pages/ProductPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#007bff",
    color: "white",
    padding: "15px 20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  };

  const navButton = (isActive) => ({
    backgroundColor: isActive ? "white" : "transparent",
    color: isActive ? "#007bff" : "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s ease",
  });

  const mainStyle = {
    padding: "20px",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh",
  };

  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      <header style={headerStyle}>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setCurrentPage("dashboard")}
            style={navButton(currentPage === "dashboard")}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentPage("product")}
            style={navButton(currentPage === "product")}
          >
            Products
          </button>
        </div>
      </header>

      <main style={mainStyle}>
        {currentPage === "dashboard" && <Dashboard products={products} />}
        {currentPage === "product" && (
          <ProductPage products={products} setProducts={setProducts} />
        )}
      </main>
    </div>
  );
}

export default App;
