'use client';

import { useEffect, useState } from 'react';
import { fetchProductsByCategory } from '../../../Utils/api';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@iconify/react';

const CategoryPage = () => {
  const params = useParams();
  const category = params?.category;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      setLoading(true);
      fetchProductsByCategory(category)
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          setLoading(false);
        });
    }

    // Solo se ejecuta cuando se cambia la categoría
    if (category) {
      const displayCategory = category.replace(/%20/g, ' '); // Reemplazamos '%20' por espacio en blanco
      document.title = `${displayCategory} - Fenixen Forge`; // Modificar el título dinámicamente

      // Modificar los metadatos dinámicamente
      const metaDescription = `Browse our collection of ${displayCategory} products.`;
      const metaImage = `/images/${displayCategory.toLowerCase()}-og.jpg`;
      const metaTwitterImage = `/images/${displayCategory.toLowerCase()}-twitter.jpg`;

      const metaTags = [
        { name: 'description', content: metaDescription },
        { property: 'og:title', content: `${displayCategory}` },
        { property: 'og:description', content: metaDescription },
        { property: 'og:image', content: metaImage },
        { name: 'twitter:title', content: `${displayCategory}` },
        { name: 'twitter:description', content: metaDescription },
        { name: 'twitter:image', content: metaTwitterImage },
      ];

      // Insertar los meta tags dinámicamente en el head
      metaTags.forEach((metaTag) => {
        const tag = document.querySelector(`meta[name="${metaTag.name}"], meta[property="${metaTag.property}"]`);
        if (tag) {
          tag.setAttribute('content', metaTag.content);
        } else {
          const newMetaTag = document.createElement('meta');
          Object.keys(metaTag).forEach((key) => {
            newMetaTag.setAttribute(key, metaTag[key]);
          });
          document.head.appendChild(newMetaTag);
        }
      });
    }
  }, [category]);

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
  if (!products.length) return <div>No products found in this category.</div>;

  const displayCategory = category?.replace(/%20/g, ' ');

  return (
    <>
        
        <div className='category-products-container'>
            <h1>Products - Bots</h1>
            <ul className='category-products-list'>
                {products.map((product) => (
                    <li key={product.id} className='category-product-item'>
                        <Link href={`/bots/${product.category}/${product.name}`}>
                            <div className="category-product-img">
                            <img src={`http://127.0.0.1:8000/${product.image}`} alt={product.name} />
                            </div>
                            <h2>{product.name}</h2>
                            <span><Icon className='icon-product-item' icon="solar:round-arrow-down-bold-duotone" /> {product.downloads} </span>
                            <p>{product.description}</p>
                            <span className='btn-product-items'>Ver Mas...</span>
                            
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        </>
  );
};

export default CategoryPage;
