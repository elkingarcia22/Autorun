import { handleUserMessage } from './packages/autorun-core/src/helpers/autoMessageHandler.js';

const userMessage = process.argv[2] || "implementa unos tabs debajo del subnav";

async function run() {
  try {
    const result = await handleUserMessage(userMessage);
    console.log('\n--- RESULTADO FINAL ---');
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

run();
