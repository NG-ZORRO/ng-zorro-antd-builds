"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDeclaration = exports.addModule = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const schematics_2 = require("@angular/cdk/schematics");
const change_1 = require("@schematics/angular/utility/change");
const find_module_1 = require("@schematics/angular/utility/find-module");
const ng_ast_utils_1 = require("@schematics/angular/utility/ng-ast-utils");
const workspace_1 = require("@schematics/angular/utility/workspace");
const ts = require("typescript");
function readIntoSourceFile(host, modulePath) {
    const text = host.read(modulePath);
    if (text === null) {
        throw new schematics_1.SchematicsException(`File ${modulePath} does not exist.`);
    }
    const sourceText = text.toString('utf-8');
    return ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
}
function addModule(moduleName, modulePath) {
    return (host) => __awaiter(this, void 0, void 0, function* () {
        const workspace = yield workspace_1.getWorkspace(host);
        const project = schematics_2.getProjectFromWorkspace(workspace);
        schematics_2.addModuleImportToRootModule(host, moduleName, modulePath, project);
        return schematics_1.noop();
    });
}
exports.addModule = addModule;
function addDeclaration(componentName, componentPath) {
    return (host) => __awaiter(this, void 0, void 0, function* () {
        const workspace = yield workspace_1.getWorkspace(host);
        const project = schematics_2.getProjectFromWorkspace(workspace);
        const appModulePath = ng_ast_utils_1.getAppModulePath(host, schematics_2.getProjectMainFile(project));
        const source = readIntoSourceFile(host, appModulePath);
        const relativePath = find_module_1.buildRelativePath(appModulePath, componentPath);
        const declarationChanges = schematics_2.addDeclarationToModule(source, appModulePath, componentName, relativePath);
        const declarationRecorder = host.beginUpdate(appModulePath);
        for (const change of declarationChanges) {
            if (change instanceof change_1.InsertChange) {
                declarationRecorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(declarationRecorder);
        return schematics_1.noop();
    });
}
exports.addDeclaration = addDeclaration;
//# sourceMappingURL=root-module.js.map