// bin/build.ts
import ts from 'typescript';
import { promises as fs } from 'fs';
import { resolve as resolvePath } from 'path';

const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: (path) => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine,
};

function reportDiagnostic(diagnostic: ts.Diagnostic) {
  console.error(
    'Error',
    diagnostic.code,
    ':',
    ts.flattenDiagnosticMessageText(
      diagnostic.messageText,
      formatHost.getNewLine(),
    ),
  );
}

/**
 * Prints a diagnostic every time the watch status changes.
 * This is mainly for messages like "Starting compilation" or "Compilation completed".
 */
function reportWatchStatusChanged(diagnostic: ts.Diagnostic) {
  console.info(ts.formatDiagnostic(diagnostic, formatHost));
}

// Reports status like Project needs to be built because output file doesnot exist
function reportSolutionBuilderStatus(diagnostic: ts.Diagnostic) {
  console.info(getTextForDiagnostic(diagnostic));
}

function getTextForDiagnostic(diagnostic: ts.Diagnostic): string {
  if (diagnostic.file) {
    const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
      diagnostic.start!,
    );
    const message = ts.flattenDiagnosticMessageText(
      diagnostic.messageText,
      '\n',
    );
    return `${diagnostic.file.fileName} (${line + 1},${
      character + 1
    }): ${message}`;
  } else {
    return `${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`;
  }
}

async function buildTS_ESNode(): Promise<void> {
  console.log('Starting build of TS-ESNode');

  console.info(`Removing 'out/dist' directory`);
  await fs.rmdir('out/dist', { recursive: true });

  const configPath = resolvePath('tsconfig.json');

  const host = ts.createSolutionBuilderHost(
    undefined,
    undefined,
    reportDiagnostic,
    reportSolutionBuilderStatus,
  );

  const solution = ts.createSolutionBuilder(host, [configPath], {
    verbose: true,
  });

  const buildStatus = solution.build();
  console.log(buildStatus);
}

buildTS_ESNode();
