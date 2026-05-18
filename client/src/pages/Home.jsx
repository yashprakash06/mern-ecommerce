import { useEffect, useState } from "react";
import API from "../services/api";
import { ProductGrid } from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products when the page loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Show loading message while API request is in progress
  if (loading) {
    return <h2>Loading products...</h2>;
  }

return (
  <div className="p-5">
    <h1 className="text-3xl font-bold mb-6">
      Latest Products
    </h1>

    {products.length === 0 ? (
      <p>No products found.</p>
    ) : (
      <ProductGrid products={products} />
    )}
  </div>
);
}

export default Home;