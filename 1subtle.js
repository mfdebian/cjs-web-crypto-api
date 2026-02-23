const { subtle } = require('node:crypto').webcrypto;

const signMessage = async (message) => {
  const key = await subtle.generateKey(
    {
      name: 'HMAC',
      hash: 'SHA-256',
      length: 256,
    },
    false,
    ['sign'],
  );

  const encodedMessage = new TextEncoder().encode(message);

  return subtle.sign({ name: 'HMAC' }, key, encodedMessage);
};

signMessage('I love cupcakes')
  .then((signature) => console.log(signature))
  .catch((error) => console.error(error));
