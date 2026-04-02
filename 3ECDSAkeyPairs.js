const { subtle } = require('node:crypto').webcrypto;

async function generateEcKey(namedCurve = 'P-256') {
  const { publicKey, privateKey } = await subtle.generateKey(
    {
      name: 'ECDSA',
      namedCurve,
    },
    true,
    ['sign', 'verify'],
  );

  return { publicKey, privateKey };
}

generateEcKey()
  .then(({ publicKey, privateKey }) => {
    console.log(publicKey);
    console.log(privateKey);
  })
  .catch((error) => console.error(error));
