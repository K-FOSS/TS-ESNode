// bin/Utils/Logging/index.ts
import ts from 'typescript';
import { tsSys } from '../tsSystem';

const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: (path) => path,
  getCurrentDirectory: tsSys.getCurrentDirectory,
  getNewLine: () => tsSys.newLine,
};

export function reportDiagnostic(diagnostic: ts.Diagnostic): void {
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

export function getTextForDiagnostic(diagnostic: ts.Diagnostic): string {
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

// Reports status like Project needs to be built because output file doesnot exist
export function reportSolutionBuilderStatus(diagnostic: ts.Diagnostic): void {
  console.info(getTextForDiagnostic(diagnostic));
}

export function reportWatchStatusChanged(diagnostic: ts.Diagnostic): void {
  console.info(ts.formatDiagnostic(diagnostic, formatHost));
}
