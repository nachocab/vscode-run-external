const vscode = require('vscode');
const { exec } = require('child_process');

function activate(context) {
  const runIterm = vscode.commands.registerCommand('run-external.iterm', function() {
    const editor = vscode.window.activeTextEditor;

    let textToPaste = editor.selections
      .sort((a, b) => a.start.line - b.start.line) // sort selections by line
      .map(selection => {
        // combine multiple cursors
        if (selection.isEmpty) {
          return editor.document.lineAt(selection.active.line).text;
        } else {
          return editor.document.getText(selection);
        }
      })
      .join('\n')
      .replace(/\\/g, '\\\\') // escape quotes
      .replace(/'/g, "'\\''") // escape quotes
      .replace(/\"/g, '\\"');
    // console.log('textToPaste', textToPaste);
    // console.log(editor.selections);

    const command =
      `osascript ` +
      ` -e 'tell app "iTerm"' ` +
      ` -e 'set mysession to current session of current window' ` +
      ` -e 'tell mysession to write text "${textToPaste}"' ` +
      ` -e 'end tell'`;
    // console.log("command", command);
    exec(command);
  });

  context.subscriptions.push(runIterm);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map
