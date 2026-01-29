import { handleUserMessage } from '../packages/autorun-core/src/helpers/autoMessageHandler.js';

async function main() {
  const message = process.argv[2] || '';
  try {
    const result = await handleUserMessage(message);
    console.log('---RESULT_START---');
    console.log(JSON.stringify(result, null, 2));
    console.log('---RESULT_END---');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
