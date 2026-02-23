const { subtle } = globalThis.crypto;

const generateEd25519Key = async () => {
  return subtle.generateKey({
    name: 'Ed25519',
  }, true, ['sign', 'verify']);
};

const generatedEd25519Key = await generateEd25519Key();
console.log('Ed25519 key pair:', generatedEd25519Key);

const generateX25519Key = async () => {
  return subtle.generateKey({
    name: 'X25519',
  }, true, ['deriveKey']);
};

const generatedX25519Key = await generateX25519Key();
console.log('X25519 key pair:', generatedX25519Key);