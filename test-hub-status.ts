import { getAutorunHubStatus } from './packages/autorun-core/src/AutorunAgent.ts';

async function test() {
  try {
    const status = await getAutorunHubStatus();
    console.log(JSON.stringify(status, null, 2));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

test();
