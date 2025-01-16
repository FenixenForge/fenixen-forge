// src/components/Ads.jsx
import { useEffect } from 'react';

export default function Adsense() {
  useEffect(() => {
    const loadAdsense = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('Error loading AdSense:', e);
      }
    };

    loadAdsense();
  }, []);

  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '250px' }}
        data-ad-client="ca-pub-5764070213530134"
        data-ad-slot="1234567890"></ins>
    </div>
  );
}
