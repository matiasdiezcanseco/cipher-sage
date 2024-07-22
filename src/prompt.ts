import { input, select } from "@inquirer/prompts";

export const promptFromValues = async () => {
  const action = await select({
    message: "Choose your action:",
    choices: [
      {
        name: "Encrypt",
        value: "encrypt",
      },
      {
        name: "Decrypt",
        value: "decrypt",
      },
    ],
  });

  const password = await input({
    message: "Enter password:",
    required: true,
    transformer: (input) => "*".repeat(input.length),
  });

  const text = await input({
    message: "Enter text:",
    required: true,
  });

  return { action, password, text };
};
