const jwt = require('jsonwebtoken');

async function authenticationMiddleware(req, res, next) {
  try {
          // Use secretKey here
      const { getSecret, getEnvKeys } = await import('../helper/secret-key.mjs');
// console.log(getSecret('MONDAY_SIGNING_SECRET'))
   
    let { authorization } = req.headers;
    if (!authorization && req.query) {
      authorization = req.query.token;
    }

    const { accountId, userId, backToUrl, shortLivedToken, subscription } = jwt.verify(
      authorization,
       process.env.MONDAY_SIGNING_SECRET? process.env.MONDAY_SIGNING_SECRET: getSecret( 'MONDAY_SEC' )
    );
    req.session = { accountId, userId, backToUrl, shortLivedToken ,subscription};
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'not authenticated' });
  }
}

module.exports = {
  authenticationMiddleware,
};
