const { subtle } = globalThis.crypto;

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

const { publicKey, privateKey } = await generateEcKey();
console.log('public:', publicKey);
console.log('private:', privateKey);
