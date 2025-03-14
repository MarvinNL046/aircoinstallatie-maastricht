
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://aircoinstallatie-maastricht.nl",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
        ],
      },
    ],
    additionalSitemaps: [
      "https://aircoinstallatie-maastricht.nl/sitemap-locations.xml",
      "https://aircoinstallatie-maastricht.nl/sitemap-services.xml",
    ],
  },
  exclude: ['/404', '/500', '/offline'],
  generateIndexSitemap: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  autoLastmod: true,
}
