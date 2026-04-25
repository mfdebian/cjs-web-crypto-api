const { subtle } = require('node:crypto').webcrypto;

async function digest(data, algorithm = 'SHA-512') {
  const ec = new TextEncoder();
  const digest = await subtle.digest(algorithm, ec.encode(data));
  return digest;
}

digest('My dog is named Pitu')
  .then(console.log)
  .catch(console.error);