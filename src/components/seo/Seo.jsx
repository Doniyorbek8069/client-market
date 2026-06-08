/**
 * SEO component using React 19 native metadata hoisting.
 * <title>, <meta>, <link> placed in any component are auto-hoisted to <head>.
 */
import { memo } from 'react';

const SITE = {
  name: 'UstaMarket',
  url: 'https://ustamarket.uz',
  defaultImage: 'https://ustamarket.uz/og-image.png',
};

function Seo({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  jsonLd,
  keywords,
  noindex = false,
}) {
  const fullTitle = title
    ? `${title} | ${SITE.name}`
    : `${SITE.name} — Qurilish materiallari va xizmatlar marketplace`;
  const desc =
    description ||
    `UstaMarket.uz — O'zbekistondagi qurilish mahsulotlari va xizmatlari marketplace. Sement, metall, g'isht, bo'yoq, qurilish xizmatlari.`;
  const canonical = `${SITE.url}${path}`;
  const imgUrl = image || SITE.defaultImage;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:locale" content="uz_UZ" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={imgUrl} />

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      )}
    </>
  );
}

export default memo(Seo);
export const SITE_URL = SITE.url;
export const SITE_NAME = SITE.name;
