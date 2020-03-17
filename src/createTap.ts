import * as vscode from "vscode";
import { writeFileSync } from "fs";
import { createInActual, makeDefault, addToData } from "./pathManger";

export async function createTap(filename: string, lang: string) {
  makeDefault();
  const filePath = createInActual(filename, lang);
  const uri = vscode.Uri.parse(`file://${filePath}`);
  writeFileSync(filePath, "");
  const doc = await vscode.workspace.openTextDocument(uri);
  vscode.window.showTextDocument(doc);
  addToData({
    js: [
      {
        madeIn: Date.now().toString(),
        dir: vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : "",
        path: createInActual(filename, lang)
      }
    ]
  });
}