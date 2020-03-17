import * as vscode from "vscode";
import { createInActual, createInCache, parsePath, createAddCopyBefore } from "./pathManger";
import { parse, join } from "path";
import { makeRequire } from "./makeRequire";

export function runFile(file: string) {
  vscode.window.showInformationMessage("starting file...");
  const { lang, fileName } = parsePath(file);
  const filePath = createInCache(fileName, lang);
  const { workspaceFolders } = vscode.workspace;
  const dir = workspaceFolders ? workspaceFolders[0].uri.fsPath : parse(filePath).dir;
  const needFilePath =
    workspaceFolders ?
      join(workspaceFolders[0].uri.fsPath, `${fileName}.${lang}`) :
      filePath;

  createAddCopyBefore(
    createInActual(fileName, lang),
    filePath,
    `console.clear();__dirname="${dir}";__filename="${needFilePath}";${makeRequire(dir)}\n`
  );

  const terminal = vscode.window.createTerminal("Runner");

  terminal.show();

  terminal.sendText(`node ${filePath}`, true);
}