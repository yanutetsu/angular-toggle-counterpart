'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    let disposableToggleCounterpart = vscode.commands.registerCommand('extension.toggleCounterpart', () => {
        const filePath: string = vscode.window.activeTextEditor.document.fileName;

        if (!isAngularFile(filePath)) {
            return;
        }

        const path: PathStr = splitByExtension(filePath);

        if (!(path.ext === 'ts' || path.ext === 'html')) {
            return;
        }

        const counterpart: string = path.base + (path.ext === 'ts' ? '.html' : '.ts');

        vscode.workspace.openTextDocument(counterpart)
            .then((document: vscode.TextDocument) => {
                vscode.window.showTextDocument(document);
            });
    });

    let disposableToggleCounterpartOfTesting = vscode.commands.registerCommand('extension.toggleCounterpartTesting', () => {
        const filePath: string = vscode.window.activeTextEditor.document.fileName;

        if (!isAngularFile(filePath)) {
            return;
        }

        const path: PathStr = splitByExtension(filePath);

        if (path.ext !== 'ts') {
            return;
        }

        const extend: PathStr = splitByExtension(path.base);

        const counterpart: string = extend.ext === 'spec' ? extend.base + '.ts' : path.base + '.spec.ts';

        vscode.workspace.openTextDocument(counterpart)
            .then((document: vscode.TextDocument) => {
                vscode.window.showTextDocument(document);
            });
    })

    let disposableToggleCounterpartOfThree = vscode.commands.registerCommand('extension.toggleCounterpartThreeFiles', () => {
        const filePath: string = vscode.window.activeTextEditor.document.fileName;

        if (!isAngularFile(filePath)) {
            return;
        }

        const path: PathStr = splitByExtension(filePath);

        let counterpart: string;
        if (path.ext === 'html') {
            counterpart = path.base + '.ts';
        } else if (path.ext === 'ts') {
            const extendPath: PathStr = splitByExtension(path.base);

            if (extendPath.ext === 'spec') {
                counterpart = extendPath.base + '.html';
            } else {
                counterpart = path.base + '.spec.ts';
            }
        } else {
            return;
        }

        vscode.workspace.openTextDocument(counterpart)
            .then((document: vscode.TextDocument) => {
                vscode.window.showTextDocument(document);
            });
    })

    let disposableToggleCounterpartRandom = vscode.commands.registerCommand('extension.toggleCounterpartRandom', () => {
        const filePath: string = vscode.window.activeTextEditor.document.fileName;

        if (!isAngularFile(filePath)) {
            return;
        }

        const path: PathStr = splitByExtension(filePath);
        let base: string = path.base;

        if (path.ext === 'ts') {
            const extraPath: PathStr = splitByExtension(base);
            if (extraPath.ext === 'spec') {
                base = extraPath.base;
            }
        }

        const extensions: string[] = ['.ts', '.spec.ts', '.html', '.scss'];
        const extension: string = extensions[Math.floor(Math.random() * extensions.length)];
        const counterpart: string = base + extension;

        vscode.workspace.openTextDocument(counterpart)
            .then((document: vscode.TextDocument) => {
                vscode.window.showTextDocument(document);
            });
    });

    let disposableToggleCounterpartOfModule = vscode.commands.registerCommand('extension.toggleCounterpartModule', () => {
        const filePath: string = vscode.window.activeTextEditor.document.fileName;

        if (!isAngularFile(filePath)) {
            return;
        }

        const dirfile: DirFile = splitDirAndFile(filePath);

        const path1: PathStr = splitByExtension(dirfile.file);

        if (path1.ext !== 'ts') {
            return;
        }

        const path2: PathStr = splitByExtension(path1.base);

        if (path2.ext !== 'module') {
            return;
        }

        const routingStr: string = '-routing';
        const routingStrPosition: number = path2.base.indexOf(routingStr);
        const counterpart: string = dirfile.dir + [
                0 < routingStrPosition ? path2.base.substring(0, routingStrPosition) : path2.base + routingStr,
                path2.ext,
                path1.ext
            ].join('.');

        vscode.workspace.openTextDocument(counterpart)
            .then((document: vscode.TextDocument) => {
                vscode.window.showTextDocument(document);
            });
    })

    context.subscriptions.push(disposableToggleCounterpart);
    context.subscriptions.push(disposableToggleCounterpartOfTesting);
    context.subscriptions.push(disposableToggleCounterpartOfThree);
    context.subscriptions.push(disposableToggleCounterpartRandom);
    context.subscriptions.push(disposableToggleCounterpartOfModule);
}

function isAngularFile(filepath: string): boolean {
    return isAngularFileType(filepath, 'component')
        || isAngularFileType(filepath, 'service')
        || isAngularFileType(filepath, 'directive')
        || isAngularFileType(filepath, 'pipe')
        || isAngularFileType(filepath, 'module');
}

function isAngularFileType(filepath: string, type: string): boolean {
    return 0 <= filepath.indexOf(type);
}

function splitByExtension(filepath: string): PathStr {
    const splittedfilepath: string[] = filepath.split('.');
    const ext: string = splittedfilepath.pop();

    return <PathStr>{
        base: splittedfilepath.join('.'),
        ext: ext
    };
}

interface PathStr {
    base: string;
    ext: string;
}

function splitDirAndFile(filepath: string): DirFile {
    const slash: number = filepath.lastIndexOf('/') + 1;
    return <DirFile>{
        dir: filepath.substring(0, slash),
        file: filepath.substring(slash)
    }
}

interface DirFile {
    dir: string;
    file: string;
}

// this method is called when your extension is deactivated
export function deactivate() {
}