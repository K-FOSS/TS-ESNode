// test/Lab.ts
export async function checkIsHelloWorld(testString: string): Promise<boolean> {
  console.log(`Hello, I'm Test: `, testString);

  return testString === 'helloWorld';
}
