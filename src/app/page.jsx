'use client';

import { useEffect, useState } from 'react';
import { fetchProducts } from '../Utils/api';
import { Icon } from '@iconify/react';
import img from '../lib/img';
import Link from 'next/link';
import '../../styles/skeleton.css';

function IndexSkeletonCard() {
  return (
    <div className="index-skeleton-card">
      <div className="index-skeleton-image"></div>
      <div className="index-skeleton-title"></div>
      <div className="index-skeleton-text"></div>
      <div className="index-skeleton-link"></div>
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [topDownloaded, setTopDownloaded] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [botsProducts, setBotsProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();

        const topDownloads = [...products]
          .sort((a, b) => b.downloads - a.downloads)
          .slice(0, 4);
        setTopDownloaded(topDownloads);

        const latest = [...products]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 4);
        setLatestProducts(latest);

        const bots = products.filter(
          (product) => product.category === 'Bots Discord'
        );
        setBotsProducts(bots);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <>
      <div className="banner-container">
        <div className="banner-content">
          <img className="main-banner" src={img.banner} alt="Banner" />
          <img
            className="hover-banner"
            src={img.bannerHover}
            alt="Banner Hover"
          />
        </div>
        <div className="banner-txt">
          <h2>¡Únete a nuestra comunidad en Discord!</h2>
          <p>
            Conoce a otros jugadores, obtén soporte exclusivo y participa en
            eventos especiales.
          </p>

          <a
            href=""
            className="cta-button"
            target="_blank"
            rel="noopener noreferrer">
            <span>
              Únete Ahora{' '}
              <Icon icon="ic:baseline-discord" className="icon-banner" />
            </span>
          </a>
        </div>
      </div>

      {/* Productos con más descargas */}
      <div className="tops-product-download">
        <h3>Productos con más descargas</h3>
        <ul>
          {isLoading
            ? Array.from({ length: 4 }, (_, index) => (
                <IndexSkeletonCard key={index} />
              ))
            : topDownloaded.map((product) => (
                <li key={product.id}>
                  <img src={product.image_url} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p>
                    <strong>{product.category}</strong>
                  </p>
                  <p>Descargas: {product.downloads}</p>
                  <Link href={`/${product.category}/${product.name}`}>
                    Ver Mas..
                  </Link>
                </li>
              ))}
        </ul>
      </div>

      {/* Productos más recientes */}
      <div className="tops-product-download">
        <h3>Últimos productos</h3>
        <ul>
          {isLoading
            ? Array.from({ length: 4 }, (_, index) => (
                <IndexSkeletonCard key={index} />
              ))
            : latestProducts.map((product) => (
                <li key={product.id}>
                  <img src={product.image_url} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                  <Link href={`c/${product.category}/${product.name}`}>
                    Ver Mas..
                  </Link>
                </li>
              ))}
        </ul>
      </div>

      {/* Productos de la categoría "Bots" */}
      <div className="tops-product-download">
        <h3>Productos de Bots</h3>
        <ul>
          {isLoading
            ? Array.from({ length: 4 }, (_, index) => (
                <IndexSkeletonCard key={index} />
              ))
            : botsProducts.map((product) => (
                <li key={product.id}>
                  <img src={product.image_url} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                  <Link href={`/bots/${product.category}/${product.name}`}>
                    Ver Mas..
                  </Link>
                </li>
              ))}
        </ul>
      </div>
    </>
  );
}
