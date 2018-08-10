import config from "../config";

export default (req, res) => {
  res.header('Content-Type', 'text/plain');
  if (config.appEnv === 'prod')
    res.status(200).send(`User-agent: *
Allow: /
Allow: /demo
Allow: /login
Allow: /assets/
Allow: /static/
Disallow: /*/
Sitemap: ` + config.appUri + `/sitemap.xml
`);
  else
    res.status(200).send(`User-agent: *
Disallow: /
`);
};