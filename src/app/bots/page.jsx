"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "../../Utils/api";
import Link from "next/link";
import "../../../styles/skeleton.css";
import "../../../styles/main.css";
import { Icon } from "@iconify/react";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cargar productos ordenados por fecha
    fetchProducts()
      .then((data) => {
        // Ordenar productos por fecha de creación/actualización, asumiendo que 'updated_at' existe
        const sortedProducts = data.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
        setProducts(sortedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="skeleton-container">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) return <div>{error}</div>;
  if (!products.length) return <div>No products found.</div>;
  return (
    <>
      <div className="category-products-container">
        <h1>Products - Bots</h1>
        <ul className="category-products-list">
          {products.map((product) => (
            <li key={product.id} className="category-product-item">
              <Link href={`/bots/${product.category}/${product.name}`}>
                <div className="category-product-img">
                  <img src={product.image_url} alt={product.name} />
                </div>
                <h2>{product.name}</h2>
                <span>
                  <Icon
                    className="icon-product-item"
                    icon="solar:round-arrow-down-bold-duotone"
                  />{" "}
                  {product.downloads}{" "}
                </span>
                <p>{product.description}</p>
                <span className="btn-product-items">Ver Mas...</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Category;
