// test/src/Lab2.ts
export async function startLab2(testing = false): Promise<string> {
  console.log('Starting Lab #2');

  if (testing) {
    console.log('Lab #2 is running in testing mode');

    return 'lab#2-Test';
  }

  return 'lab#2';
}
