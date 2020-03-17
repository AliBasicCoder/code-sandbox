import * as vscode from "vscode";
import * as langs from "./code_runners/exporter";
import { createInActual, createInCache, parsePath } from "./pathManger";
import { parse, join } from "path";

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

  // @ts-ignore    
  const command = langs[lang](
    createInActual(fileName, lang),
    filePath,
    dir,
    needFilePath
  );

  const terminal = vscode.window.createTerminal("Runner");

  terminal.show();

  terminal.sendText(command, true);
}