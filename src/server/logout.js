import config from "../config";

export default (req, res) => {
  res.writeHead(302, {
    'Set-Cookie': config.cookie + '=' + '; Path=/',
    'Content-Type': 'text/plain',
    'Location': '/demo'
  });
  res.end();
};