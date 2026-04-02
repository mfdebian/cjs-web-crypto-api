const { subtle } = require('node:crypto').webcrypto;

const generateHmacKey = async (hash = 'SHA-256') => {
  const key = await subtle.generateKey({
    name: 'HMAC',
    hash,
  }, true, ['sign', 'verify']);

  return key;
}

generateHmacKey()
  .then((hmacKey) => console.log(hmacKey))
  .catch((error) => console.error(error));
