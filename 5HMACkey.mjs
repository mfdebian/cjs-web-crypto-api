const { subtle } = globalThis.crypto;

const generateHmacKey = async (hash = 'SHA-256') => {
  const key = await subtle.generateKey({
    name: 'HMAC',
    hash,
  }, true, ['sign', 'verify']);

  return key;
}

const hmacKey = await generateHmacKey();
console.log(hmacKey);