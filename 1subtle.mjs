const { subtle } = globalThis.crypto;

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

const signature = await signMessage('I love cupcakes');
console.log(signature);
