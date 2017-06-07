export default function (req, res, next) {
  let oneof = false;

  if (
    req.headers.origin &&
    req.headers.origin.match(/^https?:[/][/]localhost/)
  ) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    oneof = true;
  }

  if (req.headers['access-control-request-method']) {
    res.header(
      'Access-Control-Allow-Methods',
      req.headers['access-control-request-method'],
    );
    oneof = true;
  }

  if (req.headers['access-control-request-headers']) {
    res.header(
      'Access-Control-Allow-Headers',
      req.headers['access-control-request-headers'],
    );
    oneof = true;
  }

  if (oneof) {
    res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
  }

  // Intercept OPTIONS method.
  if (oneof && req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
}
