import * as cryptoJS from "crypto-js";

// Generate key and IV from a password
function deriveKeyAndIv(
  password: string,
  salt: string
): { key: cryptoJS.lib.WordArray; iv: cryptoJS.lib.WordArray } {
  const keySize = 256 / 32; // 256-bit key
  const ivSize = 128 / 32; // 128-bit IV

  const key = cryptoJS.PBKDF2(password, cryptoJS.enc.Hex.parse(salt), {
    keySize: keySize + ivSize,
    iterations: 1000,
  });

  return {
    key: cryptoJS.lib.WordArray.create(key.words.slice(0, keySize)),
    iv: cryptoJS.lib.WordArray.create(
      key.words.slice(keySize, keySize + ivSize)
    ),
  };
}

// Encryption
export function encrypt(text: string, password: string): string {
  // Generate a random salt
  const salt = cryptoJS.lib.WordArray.random(128 / 8).toString(
    cryptoJS.enc.Hex
  );

  // Derive key and IV from the password and salt
  const { key, iv } = deriveKeyAndIv(password, salt);

  // Encrypt the text
  const encrypted = cryptoJS.AES.encrypt(text, key, {
    iv: iv,
    mode: cryptoJS.mode.CBC,
    padding: cryptoJS.pad.Pkcs7,
  });

  // Combine salt and encrypted message
  return salt + ":" + encrypted.toString();
}

// Decrypt text with salt included in the encrypted message
export function decrypt(encryptedText: string, password: string): string {
  // Split the salt and the encrypted message
  const [salt, encryptedMessage] = encryptedText.split(":");

  // Derive key and IV from the password and salt
  const { key, iv } = deriveKeyAndIv(password, salt);

  // Decrypt the message
  const decrypted = cryptoJS.AES.decrypt(encryptedMessage, key, {
    iv: iv,
    mode: cryptoJS.mode.CBC,
    padding: cryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(cryptoJS.enc.Utf8);
}
