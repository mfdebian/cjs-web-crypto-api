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

generateAesKey()
  .then((aesKey) => console.log(aesKey))
  .catch((error) => console.error(error));
