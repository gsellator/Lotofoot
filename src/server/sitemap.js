import config from "../config";

export default (req, res) => {
  res.header('Content-Type', 'application/xml');
  res.status(200).send(`
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>` + config.appUri + `/</loc>
    <changefreq>daily</changefreq>
    <priority>1</priority>
    <image:image>
      <image:loc>` + config.appUri + `/assets/icns.svg</image:loc>
      <image:caption>` + config.appLabel + `</image:caption>
    </image:image>
  </url>
  <url>
    <loc>` + config.appUri + `/login</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>` + config.appUri + `/assets/icns.svg</image:loc>
      <image:caption>` + config.appLabel + `</image:caption>
    </image:image>
  </url>
</urlset>
  `);
};