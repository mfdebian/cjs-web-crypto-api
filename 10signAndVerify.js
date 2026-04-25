const { subtle } = require('node:crypto').webcrypto;

async function sign(key, data) {
  const ec = new TextEncoder();
  const signature = await subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    ec.encode(data),
  );
  return signature;
}

async function verify(key, signature, data) {
  const ec = new TextEncoder();
  const verified = await subtle.verify(
    'RSASSA-PKCS1-v1_5',
    key,
    signature,
    ec.encode(data),
  );
  return verified;
}

async function generateRsaKeyPair() {
  return subtle.generateKey(
    {
      name: 'RSASSA-PKCS1-v1_5',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['sign', 'verify'],
  );
}

generateRsaKeyPair()
  .then(({ privateKey, publicKey }) =>
    sign(privateKey, 'My dog is part of my family').then((signature) =>
      verify(publicKey, signature, 'My dog is part of my family'),
    ),
  )
  .then((isDogPartOfFamily) =>
    console.log(
      isDogPartOfFamily
        ? 'I told you! They definitely are'
        : 'I am more of a cat person',
    ),
  )
  .catch(console.error);
