const { subtle } = globalThis.crypto;
const salt = crypto.getRandomValues(new Uint8Array(16));

async function pbkdf2(pass, salt, iterations = 1000, length = 256) {
  const ec = new TextEncoder();
  const key = await subtle.importKey('raw', ec.encode(pass), 'PBKDF2', false, [
    'deriveBits',
  ]);
  const bits = await subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-512',
      salt: ec.encode(salt),
      iterations,
    },
    key,
    length,
  );
  return bits;
}

async function pbkdf2Key(pass, salt, iterations = 1000, length = 256) {
  const ec = new TextEncoder();
  const keyMaterial = await subtle.importKey(
    'raw',
    ec.encode(pass),
    'PBKDF2',
    false,
    ['deriveKey'],
  );
  const key = await subtle.deriveKey(
    {
      name: 'PBKDF2',
      hash: 'SHA-512',
      salt: ec.encode(salt),
      iterations,
    },
    keyMaterial,
    {
      name: 'AES-GCM',
      length,
    },
    true,
    ['encrypt', 'decrypt'],
  );
  return key;
}

const bits = await pbkdf2('Totally secret password', salt);
const derivedKey = await pbkdf2Key('Totally secret password', salt);

console.log(bits, derivedKey);
