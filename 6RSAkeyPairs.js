const { subtle } = require('node:crypto').webcrypto;
const publicExponent = new Uint8Array([1, 0, 1]);

async function generateRsaKey(modulusLength = 2048, hash = 'SHA-256') {
  return subtle.generateKey({
    name: 'RSASSA-PKCS1-v1_5',
    modulusLength,
    publicExponent,
    hash,
  }, true, ['sign', 'verify']);
};

generateRsaKey()
  .then(({ publicKey, privateKey }) => {
    console.log(publicKey);
    console.log(privateKey);
  })
  .catch((error) => console.error(error));