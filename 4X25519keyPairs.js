const { subtle } = require('node:crypto').webcrypto;

const generateEd25519Key = async () => {
  return subtle.generateKey({
    name: 'Ed25519',
  }, true, ['sign', 'verify']);
};

generateEd25519Key()
  .then((generatedEd25519Key) =>
    console.log('Ed25519 key pair:', generatedEd25519Key),
  )
  .catch((error) => console.error(error));

const generateX25519Key = async () => {
  return subtle.generateKey({
    name: 'X25519',
  }, true, ['deriveKey']);
};

generateX25519Key()
  .then((generatedX25519Key) =>
    console.log('X25519 key pair:', generatedX25519Key),
  )
  .catch((error) => console.error(error));