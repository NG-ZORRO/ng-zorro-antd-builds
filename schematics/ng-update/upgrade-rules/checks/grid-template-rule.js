"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridTemplateRule = void 0;
const schematics_1 = require("@angular/cdk/schematics");
class GridTemplateRule extends schematics_1.Migration {
    constructor() {
        super(...arguments);
        this.enabled = this.targetVersion === schematics_1.TargetVersion.V10;
    }
    visitTemplate(template) {
        const offsets = [];
        offsets.push(...schematics_1.findInputsOnElementWithAttr(template.content, 'nzType', ['nz-row']));
        offsets.push(...schematics_1.findInputsOnElementWithTag(template.content, 'nzType', ['nz-form-item', 'nz-row']));
        offsets.forEach(offset => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(offset),
                message: `Found deprecated input '[nzType]'. Please manually remove this input.`
            });
        });
        schematics_1.findInputsOnElementWithTag(template.content, 'nzFlex', ['nz-form-item']).forEach(offset => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(offset),
                message: `Found deprecated input '[nzFlex]'. Please manually remove this input.`
            });
        });
    }
}
exports.GridTemplateRule = GridTemplateRule;
//# sourceMappingURL=grid-template-rule.js.map