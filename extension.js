const vscode = require('vscode');
const { exec } = require('child_process');

function activate(context) {
  const runIterm = vscode.commands.registerCommand('run-external.iterm', function() {
    const editor = vscode.window.activeTextEditor;
    let textToPaste;
    if (editor.selection.isEmpty) {
      textToPaste = editor.document.lineAt(editor.selection.active.line).text;
    } else {
      textToPaste = editor.document.getText(editor.selection);
    }
    exec(
      `osascript ` +
        ` -e 'tell app "iTerm"' ` +
        ` -e 'set mysession to current session of current window' ` +
        ` -e 'tell mysession to write text "${textToPaste}"' ` +
        ` -e 'end tell'`
    );
  });

  context.subscriptions.push(runIterm);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map
