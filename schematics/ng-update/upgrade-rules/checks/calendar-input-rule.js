"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarTemplateRule = void 0;
const schematics_1 = require("@angular/cdk/schematics");
class CalendarTemplateRule extends schematics_1.Migration {
    constructor() {
        super(...arguments);
        this.enabled = this.targetVersion === schematics_1.TargetVersion.V9;
    }
    visitTemplate(template) {
        schematics_1.findInputsOnElementWithTag(template.content, 'nzCard', ['nz-calendar'])
            .forEach(offset => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(offset),
                message: `Found deprecated input "nzCard" component. Use "nzFullscreen" to instead please.`
            });
        });
    }
}
exports.CalendarTemplateRule = CalendarTemplateRule;
//# sourceMappingURL=calendar-input-rule.js.map