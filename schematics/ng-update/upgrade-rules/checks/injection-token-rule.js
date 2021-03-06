"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectionTokenRule = void 0;
const schematics_1 = require("@angular/cdk/schematics");
const ts = require("typescript");
const module_specifiers_1 = require("../../../utils/ng-update/module-specifiers");
class InjectionTokenRule extends schematics_1.Migration {
    visitNode(node) {
        if (ts.isImportDeclaration(node)) {
            this._visitImportDeclaration(node);
        }
    }
    _visitImportDeclaration(node) {
        if (!module_specifiers_1.isNgZorroImportDeclaration(node) || !node.importClause ||
            !node.importClause.namedBindings) {
            return;
        }
        const namedBindings = node.importClause.namedBindings;
        if (ts.isNamedImports(namedBindings)) {
            this._checkInjectionToken(namedBindings);
        }
    }
    _checkInjectionToken(namedImports) {
        namedImports.elements.filter(element => ts.isIdentifier(element.name)).forEach(element => {
            const importName = element.name.text;
            if (this.tokens.indexOf(importName) !== -1) {
                this.createFailureAtNode(element, this.getFailure(importName));
            }
        });
    }
}
exports.InjectionTokenRule = InjectionTokenRule;
//# sourceMappingURL=injection-token-rule.js.map