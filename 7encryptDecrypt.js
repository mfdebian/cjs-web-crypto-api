const { subtle } = require('node:crypto').webcrypto;

const generateAesKey = async (length = 256) => {
  const key = await subtle.generateKey(
    {
      name: 'AES-CBC',
      length,
    },
    true,
    ['encrypt', 'decrypt'],
  );

  return key;
};

async function aesEncrypt(plaintext) {
  const ec = new TextEncoder();
  const key = await generateAesKey();
  const iv = crypto.getRandomValues(new Uint8Array(16));

  const ciphertext = await subtle.encrypt({
    name: 'AES-CBC',
    iv,
  }, key, ec.encode(plaintext));

  return {
    key,
    iv,
    ciphertext,
  };
}

async function aesDecrypt(aesEncrypted) {
  const { ciphertext, key, iv } = aesEncrypted;
  const dec = new TextDecoder();
  const plaintext = await subtle.decrypt({
    name: 'AES-CBC',
    iv,
  }, key, ciphertext);

  return dec.decode(plaintext);
}

aesEncrypt('Just one more cup of coffee')
  .then(aesDecrypt)
  .then(console.log)
  .catch(console.error);