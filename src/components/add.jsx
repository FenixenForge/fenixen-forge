"use client";

import React, { useState, useEffect } from "react";

export default function Ads() {
  const [isAdBlockerActive, setIsAdBlockerActive] = useState(false);

  useEffect(() => {
    const checkAdBlocker = () => {
      const testAd = document.createElement("iframe");
      testAd.style.width = "1px";
      testAd.style.height = "1px";
      testAd.style.position = "absolute";
      testAd.style.zIndex = "999999999";
      testAd.style.top = "-999999999px";
      testAd.src = "https://acdn.adnxs.com/ast/iframe/ast-test.html";

      document.body.appendChild(testAd);

      setTimeout(() => {
        const iframe = document.querySelector(
          'iframe[src="https://acdn.adnxs.com/ast/iframe/ast-test.html"]'
        );
        if (
          !iframe ||
          iframe.getBoundingClientRect().width === 0 ||
          iframe.getBoundingClientRect().height === 0
        ) {
          setIsAdBlockerActive(true);
        } else {
          setIsAdBlockerActive(false);
        }
      }, 250);
    };

    checkAdBlocker();
  }, []);

  if (isAdBlockerActive) {
    return (
      <div className="adblock-content">
        <div className="adblock-warning">
          <h2>Adblocker Detectado</h2>
          <p>
            Para continuar usando este sitio, por favor desactiva tu bloqueador
            de anuncios.
          </p>
          <button onClick={() => window.location.reload()}>
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return null;
}
