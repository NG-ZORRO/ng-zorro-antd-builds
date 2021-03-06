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
exports.addAnimationsModule = void 0;
const schematics_1 = require("@angular/cdk/schematics");
const ng_ast_utils_1 = require("@schematics/angular/utility/ng-ast-utils");
const workspace_1 = require("@schematics/angular/utility/workspace");
const chalk_1 = require("chalk");
const browserAnimationsModuleName = 'BrowserAnimationsModule';
const noopAnimationsModuleName = 'NoopAnimationsModule';
const animationsModulePath = '@angular/platform-browser/animations';
function addAnimationsModule(options) {
    return (host) => __awaiter(this, void 0, void 0, function* () {
        const workspace = yield workspace_1.getWorkspace(host);
        const project = schematics_1.getProjectFromWorkspace(workspace, options.project);
        const appModulePath = ng_ast_utils_1.getAppModulePath(host, schematics_1.getProjectMainFile(project));
        if (options.animations) {
            if (schematics_1.hasNgModuleImport(host, appModulePath, noopAnimationsModuleName)) {
                console.log();
                return console.log(chalk_1.yellow(`Could not set up "${chalk_1.blue(browserAnimationsModuleName)}" ` +
                    `because "${chalk_1.blue(noopAnimationsModuleName)}" is already imported. Please manually ` +
                    `set up browser animations.`));
            }
            schematics_1.addModuleImportToRootModule(host, browserAnimationsModuleName, animationsModulePath, project);
        }
        else if (!schematics_1.hasNgModuleImport(host, appModulePath, browserAnimationsModuleName)) {
            schematics_1.addModuleImportToRootModule(host, noopAnimationsModuleName, animationsModulePath, project);
        }
        return;
    });
}
exports.addAnimationsModule = addAnimationsModule;
//# sourceMappingURL=add-animations-module.js.map