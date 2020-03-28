// Testing/Runner/Utils/run.ts
import { spawn } from 'child_process';

export function run(
  command: string,
  options: {
    cwd?: string;
  } = {},
) {
  return new Promise((resolve, reject) => {
    const args = command.split(' ');
    const bin = args.shift() as string;

    console.log(`Executing...\n${bin} ${args.join(' ')}`);

    spawn(bin, args, {
      stdio: 'inherit',
      cwd: options.cwd || process.cwd(),
      shell: true,
    }).on('close', (code: number) => {
      if (code === 0) {
        console.log('Complete');
        resolve();
      } else {
        reject(new Error(`return code ${code}`));
      }
    });
  });
}
