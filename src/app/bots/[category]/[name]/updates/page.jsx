"use client";

import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  fetchProductDetail,
  fetchProductUpdates,
  incrementDownloads,
} from "../../../../../Utils/api";
import Link from "next/link";
import Head from "next/head";
import { Icon } from "@iconify/react";
import SkeletonProductView from "../../../../../components/SkeletoLoaderView";

const ProductUpdatesPage = () => {
  const params = useParams();
  const pathname = usePathname();
  const { category, name } = params;

  const [product, setProduct] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar detalles del producto
  useEffect(() => {
    if (name) {
      setLoading(true);
      fetchProductDetail(name)
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
          setError("Failed to load product details.");
          setLoading(false);
        });
    }
  }, [name]);

  // Cargar actualizaciones del producto
  useEffect(() => {
    if (name) {
      setLoading(true);
      fetchProductUpdates(name)
        .then((data) => {
          setUpdates(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching product updates:", err);
          setError("Failed to load product updates.");
          setLoading(false);
        });
    }
  }, [name]);

  useEffect(() => {
    if (name) {
      document.title = `Updates ${name} - Fenixen Forge`;
    }
  }, [name]);

  const handleDownloadClick = async (url) => {
    try {
      await incrementDownloads(name); // Incrementa el contador de descargas
      console.log("Download count incremented successfully");
      window.open(url, "_blank"); // Redirige a la URL de descarga
    } catch (err) {
      console.error("Failed to increment download count:", err);
    }
  };

  if (loading) return <SkeletonProductView />;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product found.</div>;
  if (!updates.length) return <div>No updates found for this product.</div>;

  const displayCategory = category.replace(/%20/g, " ");
  const displayName = product.name.replace(/%20/g, " ");

  return (
    <div>
      <Head>
        <meta
          name="description"
          content={`Updates for the product ${displayName}.`}
        />
        <meta
          property="og:title"
          content={`Updates for ${displayName} - Fenixen Forge`}
        />
        <meta
          property="og:description"
          content={`Explore the updates for the product ${displayName}.`}
        />
        <meta
          name="twitter:title"
          content={`Updates for ${displayName} - Fenixen Forge`}
        />
        <meta
          name="twitter:description"
          content={`Discover the updates for ${displayName}.`}
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
              Category:{" "}
              <Icon icon="material-symbols:category" className="icon-view" />{" "}
              <strong>{displayCategory}</strong>
            </p>
            <p>{product.description}</p>
            <p>
              Downloads:{" "}
              <Icon
                icon="grommet-icons:download-option"
                className="icon-view"
              />{" "}
              {product.downloads}
            </p>
            <button
              onClick={() => handleDownloadClick(product.url_download)}
              className="download-button"
            >
              <Icon
                className="icon-view"
                icon="grommet-icons:download-option"
              />{" "}
              Descargar
            </button>
          </div>
        </div>

        <div className="product-view-content-descript">
          <div className="product-view-content-descript-mas">
            <div>
              <Link
                href={`/bots/${category}/${name}`}
                className={
                  pathname === `/bots/${category}/${name}`
                    ? "active-product-view"
                    : ""
                }
              >
                Descripcion
              </Link>
            </div>
            <div>
              <Link
                href={`/bots/${category}/${name}/updates`}
                className={
                  pathname === `/bots/${category}/${name}/updates`
                    ? "active-product-view"
                    : ""
                }
              >
                View Updates
              </Link>
            </div>
            <div>
              <Link
                href={`/bots/${category}/${name}/version-history`}
                className={
                  pathname === `/bots/${category}/${name}/version-history`
                    ? "active-product-view"
                    : ""
                }
              >
                View Version History
              </Link>
            </div>
          </div>

          <div className="product-view-content-descriptions">
            <h2>Updates</h2>
            {updates.length > 0 ? (
              updates.map((update, index) => (
                <div key={index} className="product-description-item">
                  <h3>{update.title}</h3>
                  <p>{update.content}</p>
                  <small>
                    Plublicado el:{" "}
                    {new Date(update.created_at).toLocaleDateString()}
                  </small>
                </div>
              ))
            ) : (
              <p>No updates available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdatesPage;
