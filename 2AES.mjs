const { subtle } = globalThis.crypto;

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

const aesKey = await generateAesKey();
console.log(aesKey);
