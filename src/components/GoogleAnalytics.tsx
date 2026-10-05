import Script from "next/script";

const GA_MEASUREMENT_ID = "G-0K2LHYDEZ9";

export function GoogleAnalytics() {
  return (
    <Script id="google-analytics" strategy="afterInteractive">
      {`window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
window.gtag('js', new Date());
window.gtag('config', '${GA_MEASUREMENT_ID}');
var gaScript = document.createElement('script');
gaScript.async = true;
gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';
document.head.appendChild(gaScript);`}
    </Script>
  );
}
