import * as vscode from "vscode";
import { writeFileSync } from "fs";
import { createInActual, makeDefault } from "./pathManger";

export async function createTap(filename: string, lang: string) {
  makeDefault();
  const filePath = createInActual(filename, lang);
  const uri = vscode.Uri.parse(`file://${filePath}`);
  writeFileSync(filePath, "");
  const doc = await vscode.workspace.openTextDocument(uri);
  vscode.window.showInformationMessage(`create file at: ${filePath}`);
  vscode.window.showTextDocument(doc);
}