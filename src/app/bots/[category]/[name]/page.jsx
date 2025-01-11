"use client";

import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProductDetail, incrementDownloads } from "../../../../Utils/api";
import Link from "next/link";
import Head from "next/head";
import { Icon } from "@iconify/react";
import SkeletonProductView from "../../../../components/SkeletoLoaderView";

const ProductPage = () => {
  const params = useParams();
  const pathname = usePathname();
  const { category, name } = params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar los detalles del producto
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

  // Esperar que los datos estén disponibles antes de cambiar el título
  useEffect(() => {
    if (product) {
      const displayCategory = category.replace(/%20/g, " ");
      const displayName = product.name.replace(/%20/g, " ");
      document.title = `${displayName} - ${displayCategory} - Fenixen Forge`;
    }
  }, [product, category]);

  // Incrementar descargas y redirigir
  const handleDownloadClick = async (url) => {
    try {
      await incrementDownloads(name);
      console.log("Download count incremented successfully");
      window.open(url, "_blank");
    } catch (err) {
      console.error("Failed to increment download count:", err);
    }
  };

  if (loading) return <SkeletonProductView />;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product found.</div>;

  const displayCategory = category.replace(/%20/g, " ");
  const displayName = product.name.replace(/%20/g, " ");
  const metaDescription =
    product.description || `Discover details about ${displayName}.`;
  const metaImage =
    product.image || `/images/${displayName.toLowerCase()}-og.jpg`;
  const metaTwitterImage =
    product.image || `/images/${displayName.toLowerCase()}-twitter.jpg`;
  const BaseURL = "https://api.fenixenforge.com/";
  return (
    <div>
      <Head>
        <meta name="description" content={metaDescription} />
        <meta
          property="og:title"
          content={`${displayName} - ${displayCategory} - Fenixen Forge`}
        />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta
          name="twitter:title"
          content={`${displayName} - ${displayCategory} - Fenixen Forge`}
        />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaTwitterImage} />
      </Head>

      <div className="product-view-container">
        <div className="product-view-content">
          <div className="product-view-content-img">
            {product.image && (
              <img
                src={`${BaseURL}${product.image}`}
                width={100}
                alt={product.name}
              />
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
                    ? "active"
                    : ""
                }
              >
                View Version History
              </Link>
            </div>
          </div>
          <div className="product-view-content-descriptions">
            <h2>Additional Descriptions</h2>
            {product.descriptions.length > 0 ? (
              product.descriptions.map((desc) => (
                <div key={desc.id} className="product-description-itemss">
                  <h3> {desc.titulo} </h3>
                  <p>{desc.description}</p>
                  {desc.image && (
                    <img
                      src={`http://127.0.0.1:8000${desc.image}`}
                      alt={desc.titulo}
                    />
                  )}
                </div>
              ))
            ) : (
              <p>No additional descriptions available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
