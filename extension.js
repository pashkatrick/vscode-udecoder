const vscode = require('vscode');
const editor = vscode.window.activeTextEditor;


async function GetSelectedText() {
	let decorations = [];
	let text = editor.document.getText(editor.selection);
	let decoded = unicodeToChar(text);
	decorations.push(editor.selection)

	let style = vscode.window.createTextEditorDecorationType({ color: "white", backgroundColor: "#cf6a87" });
	editor.setDecorations(style, decorations);

	editor.edit(function (editBuilder) {
		editBuilder.replace(editor.selection, decoded);
	});
}

function unicodeToChar(text) {
	return text.replace(/\\u[\dA-F]{4}/gi, 
		   function (match) {
				return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
		   });
 }

function activate(context) {
	console.log('Congratulations, your extension "udecoder" is now active!');
	let disposable = vscode.commands.registerCommand('udecoder.decode', function () {
		GetSelectedText();
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;


function deactivate() {}

module.exports = {
	activate,
	deactivate
}
