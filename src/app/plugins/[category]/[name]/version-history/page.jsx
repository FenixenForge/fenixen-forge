'use client';

import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  fetchProductDetail,
  fetchProductVersionHistory,
  incrementDownloads,
} from '../../../../../Utils/api';
import Link from 'next/link';
import Head from 'next/head';
import { Icon } from '@iconify/react';
import SkeletonProductView from '../../../../../components/SkeletoLoaderView';

const ProductVersionHistoryPage = () => {
  const params = useParams();
  const pathname = usePathname();
  const { category, name } = params;

  const [product, setProduct] = useState(null);
  const [versionHistory, setVersionHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (name) {
      setLoading(true);
      fetchProductDetail(name)
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching product:', err);
          setError('Failed to load product details.');
          setLoading(false);
        });
    }
  }, [name]);

  useEffect(() => {
    if (name) {
      fetchProductVersionHistory(name)
        .then((data) => {
          setVersionHistory(data);
        })
        .catch((err) => {
          console.error('Error fetching product version history:', err);
          setError('Failed to load product version history.');
        });
    }
  }, [name]);

  useEffect(() => {
    if (name) {
      document.title = `Version History ${name} - Fenixen Forge`;
    }
  }, [name]);

  const handleDownloadClick = async (url) => {
    try {
      await incrementDownloads(name); // Incrementa el número de descargas
      console.log('Download count incremented successfully');
      window.open(url, '_blank'); // Redirige a la URL de descarga
    } catch (err) {
      console.error('Failed to increment download count:', err);
    }
  };

  if (loading) return <SkeletonProductView />;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product found.</div>;
  if (!versionHistory.length)
    return <div>No version history found for this product.</div>;

  const displayCategory = category.replace(/%20/g, ' ');
  const displayName = product.name.replace(/%20/g, ' ');

  return (
    <div>
      <Head>
        <meta
          name="description"
          content={`Version history for the product ${displayName}.`}
        />
        <meta
          property="og:title"
          content={`Version History for ${displayName} - Fenixen Forge`}
        />
        <meta
          property="og:description"
          content={`Explore the version history for the product ${displayName}.`}
        />
        <meta
          name="twitter:title"
          content={`Version History for ${displayName} - Fenixen Forge`}
        />
        <meta
          name="twitter:description"
          content={`Discover the version history for ${displayName}.`}
        />
      </Head>

      <div className="product-view-container">
        <div className="product-view-content">
          <div className="product-view-content-img">
            {product.image_url && (
              <img src={product.image_url} width={100} alt={product.name} />
            )}
          </div>
          <div className="product-view-content-info">
            <h1>{product.name}</h1>
            <p>
              Category:{' '}
              <Icon icon="material-symbols:category" className="icon-view" />{' '}
              <strong>{displayCategory}</strong>
            </p>
            <p>{product.description}</p>
            <p>
              Downloads:{' '}
              <Icon
                icon="grommet-icons:download-option"
                className="icon-view"
              />{' '}
              {product.downloads}
            </p>
            <button
              onClick={() => handleDownloadClick(product.url_download)}
              className="download-button">
              <Icon
                className="icon-view"
                icon="grommet-icons:download-option"
              />{' '}
              Descargar
            </button>
          </div>
        </div>

        <div className="product-view-content-descript">
          <div className="product-view-content-descript-mas">
            <div>
              <Link
                href={`/plugins/${category}/${name}`}
                className={
                  pathname === `/plugins/${category}/${name}`
                    ? 'active-product-view'
                    : ''
                }>
                Descripcion
              </Link>
            </div>
            <div>
              <Link
                href={`/plugins/${category}/${name}/updates`}
                className={
                  pathname === `/plugins/${category}/${name}/updates`
                    ? 'active-product-view'
                    : ''
                }>
                View Updates
              </Link>
            </div>
            <div>
              <Link
                href={`/plugins/${category}/${name}/version-history`}
                className={
                  pathname === `/plugins/${category}/${name}/version-history`
                    ? 'active-product-view'
                    : ''
                }>
                View Version History
              </Link>
            </div>
          </div>

          <div className="product-view-content-descriptions">
            <h2>Version History</h2>
            {versionHistory.length > 0 ? (
              versionHistory.map((version, index) => (
                <div key={index} className="product-description-items">
                  <h3>Version: {version.version}</h3>
                  <small>
                    Released on:{' '}
                    {new Date(version.created_at).toLocaleDateString()}
                  </small>
                  <button
                    onClick={() => handleDownloadClick(version.url_download)}
                    className="download-button">
                    <Icon
                      className="icon-view"
                      icon="grommet-icons:download-option"
                    />{' '}
                    Download Version
                  </button>
                </div>
              ))
            ) : (
              <p>No version history available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductVersionHistoryPage;
