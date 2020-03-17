import * as vscode from 'vscode';
import { runFile } from "./runFile";
import { createTap } from "./createTap";
import { langSupported } from "./globalVars";

function registerCommand(context: vscode.ExtensionContext, name: string, func: (...args: any[]) => any) {
	context.subscriptions.push(
		vscode.commands.registerCommand(
			`code-sandbox.${name}`,
			() => {
				try {
					func();
				} catch (error) {
					vscode.window.showErrorMessage(error.message);
				}
			}
		)
	);
}

export function activate(context: vscode.ExtensionContext) {

	registerCommand(context, "sandbox", () => {
		const quickPick = vscode.window.createQuickPick();

		quickPick.items = langSupported.map(label => ({ label }));

		quickPick.onDidChangeSelection(async ([picked]) => {
			quickPick.dispose();
			const lang = picked.label;
			const input = vscode.window.createInputBox();
			input.onDidAccept(async _ => {
				await createTap(input.value, lang);
			});
			input.show();
		});

		quickPick.show();
	});

	registerCommand(context, "runfile", () => {
		if (!vscode.window.activeTextEditor) {
			vscode.window.showErrorMessage("there's no opened editors");
			return;
		}

		const { document } = vscode.window.activeTextEditor;

		runFile(document.fileName);
	});
}

export function deactivate() { }
