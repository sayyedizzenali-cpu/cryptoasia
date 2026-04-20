export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/_next/',
        '/static/',
        '/favicon.ico',
        '/robots.txt'
      ]
    },
    sitemap: 'https://cryptoasia.com/sitemap.xml'
  }
}
