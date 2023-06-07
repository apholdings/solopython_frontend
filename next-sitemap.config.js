module.exports = {
  siteUrl: process.env.SITE_URL || 'https://solopython.onrender.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/404'],
  robotsTxtOptions: {
    additionalSitemaps: [
      // If you have dynamic routes, you can add a sitemap for them here
      // 'https://example.com/sitemap-dynamic.xml',
    ],
  },
};
