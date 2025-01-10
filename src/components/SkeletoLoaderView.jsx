'use client';
import '../../styles/skeleton.css'

const SkeletonProductView = () => {
  return (
    <div className="skeleton-product-view">
      {/* Contenedor de la imagen del producto */}
      <div className="product-view-content-img skeleton" />

      {/* Contenedor de la información del producto */}
      <div className="product-view-content-info">
        <h1 className="skeleton" />
        <p className="skeleton" />
        <p className="skeleton" />
        <div className="skeleton-button skeleton" />
      </div>

      {/* Contenedor de enlaces de la descripción */}
      <div className="product-view-content-descript">
        <div className="product-view-content-descript-mas skeleton" />
      </div>

      {/* Contenedor de las descripciones adicionales */}
      <div className="product-view-content-descriptions skeleton" />
    </div>
  );
};

export default SkeletonProductView;
