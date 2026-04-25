const { subtle, SubtleCrypto } = require('node:crypto').webcrypto;

const password = 'correct horse battery staple';
const derivationAlg =
  SubtleCrypto.supports?.('importKey', 'Argon2id') ?
    'Argon2id' :
    'PBKDF2';
const encryptionAlg =
  SubtleCrypto.supports?.('importKey', 'AES-OCB') ?
    'AES-OCB' :
    'AES-GCM';
const nonce = crypto.getRandomValues(new Uint8Array(16));
const derivationParams =
  derivationAlg === 'Argon2id' ?
    { nonce, parallelism: 4, memory: 2 ** 21, passes: 1 } :
    { salt: nonce, iterations: 100_000, hash: 'SHA-256' };
const plaintext = 'Hello, world!';
const iv = crypto.getRandomValues(new Uint8Array(encryptionAlg === 'AES-OCB' ? 15 : 16));

subtle.importKey(
  derivationAlg === 'Argon2id' ? 'raw-secret' : 'raw',
  new TextEncoder().encode(password),
  derivationAlg,
  false,
  ['deriveKey'],
)
  .then(passwordKey => subtle.deriveKey(
    { name: derivationAlg, ...derivationParams },
    passwordKey,
    { name: encryptionAlg, length: 256 },
    false,
    ['encrypt', 'decrypt'],
  ))
  .then(key =>
    subtle.encrypt({ name: encryptionAlg, iv }, key, new TextEncoder().encode(plaintext))
      .then(encrypted => subtle.decrypt({ name: encryptionAlg, iv }, key, encrypted)))
  .then(decrypted => console.log(new TextDecoder().decode(decrypted)))
  .catch(console.error);