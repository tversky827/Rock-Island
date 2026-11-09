import Script from "next/script";

/**
 * Analytics integration point.
 *  - NEXT_PUBLIC_GTM_ID  → loads Google Tag Manager (recommended; configure GA4 inside GTM)
 *  - NEXT_PUBLIC_GA4_ID  → loads GA4 directly (used only if GTM is not configured)
 * Nothing loads unless an ID is configured. IP anonymization and no ad
 * personalization are set for GA4. Never configure tags that capture form
 * field values, URLs with query strings containing personal data, or PHI.
 */
export function Analytics() {
  const gtm = process.env.NEXT_PUBLIC_GTM_ID;
  const ga = process.env.NEXT_PUBLIC_GA4_ID;
  if (gtm) {
    return (
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
      </Script>
    );
  }
  if (ga) {
    return (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${ga}',{anonymize_ip:true,allow_google_signals:false,allow_ad_personalization_signals:false});`}
        </Script>
      </>
    );
  }
  return null;
}
