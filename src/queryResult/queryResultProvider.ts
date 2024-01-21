import * as vscode from 'vscode';

export class QueryResultProvider implements vscode.WebviewViewProvider {

	public static readonly viewType = 'objectResult';

	constructor(
		private readonly _extensionUri: vscode.Uri
	) { }

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {

		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,

			localResourceRoots: [
				this._extensionUri
			]
		};

		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

		webviewView.webview.onDidReceiveMessage(data => {

		});
	}

	private _getHtmlForWebview(webview: vscode.Webview) {

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">

				<!--
					Use a content security policy to only allow loading styles from our extension directory,
					and only allow scripts that have a specific nonce.
					(See the 'webview-sample' extension sample for img-src content security policy examples)
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource};">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<title>Cat Colors</title>
			</head>
			<body>
				Hello, World!
			</body>
			</html>`;
	}
}