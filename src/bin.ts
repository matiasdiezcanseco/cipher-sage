#!/usr/bin/env node

import { decrypt, encrypt } from "./encryption";
import { promptFromValues } from "./prompt";

const main = async () => {
  console.log(
    "Welcome to the encryption tool! The algorithm used is AES-256-CBC."
  );

  const { action, password, text } = await promptFromValues();

  try {
    if (action === "encrypt") {
      // Encrypt the text
      const encryptedText = encrypt(text, password);
      console.log("Encrypted text:", encryptedText);
    } else {
      // Decrypt the text
      const decryptedText = decrypt(text, password);
      console.log("Decrypted text:", decryptedText);
    }
  } catch (error: any) {
    console.error("An error occurred:", error.message);
    console.error("Are you sure you entered the correct inputs?");
  }
};

main();
