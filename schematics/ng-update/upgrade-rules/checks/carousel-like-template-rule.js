"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarouselTemplateRule = void 0;
const schematics_1 = require("@angular/cdk/schematics");
class CarouselTemplateRule extends schematics_1.Migration {
    constructor() {
        super(...arguments);
        this.enabled = this.targetVersion === schematics_1.TargetVersion.V9;
    }
    visitTemplate(template) {
        schematics_1.findInputsOnElementWithTag(template.content, 'nzVertical', ['nz-carousel'])
            .forEach(offset => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(offset),
                message: `Found deprecated "[nzVertical]" input. Use "[nzDotPosition]" to instead please.`
            });
        });
    }
}
exports.CarouselTemplateRule = CarouselTemplateRule;
//# sourceMappingURL=carousel-like-template-rule.js.map