"use strict";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUpdate = exports.updateToV13 = exports.updateToV12 = exports.updateToV11 = exports.updateToV10 = exports.updateToV9 = exports.updateToV7 = void 0;
const schematics_1 = require("@angular/cdk/schematics");
const class_names_1 = require("./data/migrations/class-names");
const upgrade_data_1 = require("./upgrade-data");
const calendar_input_rule_1 = require("./upgrade-rules/checks/calendar-input-rule");
const carousel_like_template_rule_1 = require("./upgrade-rules/checks/carousel-like-template-rule");
const date_fns_compatible_rule_1 = require("./upgrade-rules/checks/date-fns-compatible-rule");
const dropdown_class_rule_1 = require("./upgrade-rules/checks/dropdown-class-rule");
const dropdown_template_rule_1 = require("./upgrade-rules/checks/dropdown-template-rule");
const form_template_rule_1 = require("./upgrade-rules/checks/form-template-rule");
const global_config_rule_1 = require("./upgrade-rules/checks/global-config-rule");
const grid_template_rule_1 = require("./upgrade-rules/checks/grid-template-rule");
const icon_template_rule_1 = require("./upgrade-rules/checks/icon-template-rule");
const modal_template_rule_1 = require("./upgrade-rules/checks/modal-template-rule");
const secondary_entry_points_rule_1 = require("./upgrade-rules/checks/secondary-entry-points-rule");
const space_template_rule_1 = require("./upgrade-rules/checks/space-template-rule");
const table_template_rule_1 = require("./upgrade-rules/checks/table-template-rule");
const tabs_input_rule_1 = require("./upgrade-rules/checks/tabs-input-rule");
const tabs_output_rule_1 = require("./upgrade-rules/checks/tabs-output-rule");
const tabs_template_rule_1 = require("./upgrade-rules/checks/tabs-template-rule");
const tooltip_like_template_rule_1 = require("./upgrade-rules/checks/tooltip-like-template-rule");
const migrations = [
    tooltip_like_template_rule_1.TooltipLikeTemplateRule,
    dropdown_template_rule_1.DropdownTemplateRule,
    dropdown_class_rule_1.DropdownClassRule,
    icon_template_rule_1.IconTemplateRule,
    calendar_input_rule_1.CalendarTemplateRule,
    carousel_like_template_rule_1.CarouselTemplateRule,
    global_config_rule_1.GlobalConfigRule,
    date_fns_compatible_rule_1.DateFnsCompatibleRule,
    form_template_rule_1.FormTemplateRule,
    grid_template_rule_1.GridTemplateRule,
    tabs_input_rule_1.TabsInputRule,
    tabs_output_rule_1.TabsOutputRule,
    tabs_template_rule_1.TabsTemplateRule,
    table_template_rule_1.TableTemplateRule,
    modal_template_rule_1.ModalTemplateRule,
    secondary_entry_points_rule_1.SecondaryEntryPointsRule,
    class_names_1.ClassNamesMigration,
    space_template_rule_1.SpaceTemplateRule
];
/** Entry point for the migration schematics with target of NG-ZORRO v7 */
function updateToV7() {
    return (0, schematics_1.createMigrationSchematicRule)(schematics_1.TargetVersion.V7, migrations, upgrade_data_1.ruleUpgradeData, postUpdate);
}
exports.updateToV7 = updateToV7;
/** Entry point for the migration schematics with target of NG-ZORRO v9 */
function updateToV9() {
    return (0, schematics_1.createMigrationSchematicRule)(schematics_1.TargetVersion.V9, migrations, upgrade_data_1.ruleUpgradeData, postUpdate);
}
exports.updateToV9 = updateToV9;
/** Entry point for the migration schematics with target of NG-ZORRO v10 */
function updateToV10() {
    return (0, schematics_1.createMigrationSchematicRule)(schematics_1.TargetVersion.V10, migrations, upgrade_data_1.ruleUpgradeData, postUpdate);
}
exports.updateToV10 = updateToV10;
/** Entry point for the migration schematics with target of NG-ZORRO v11 */
function updateToV11() {
    return (0, schematics_1.createMigrationSchematicRule)(schematics_1.TargetVersion.V11, migrations, upgrade_data_1.ruleUpgradeData, postUpdate);
}
exports.updateToV11 = updateToV11;
/** Entry point for the migration schematics with target of NG-ZORRO v12 */
function updateToV12() {
    return (0, schematics_1.createMigrationSchematicRule)(schematics_1.TargetVersion.V12, migrations, upgrade_data_1.ruleUpgradeData, postUpdate);
}
exports.updateToV12 = updateToV12;
/** Entry point for the migration schematics with target of NG-ZORRO v12 */
function updateToV13() {
    return (0, schematics_1.createMigrationSchematicRule)(schematics_1.TargetVersion.V13, migrations, upgrade_data_1.ruleUpgradeData, postUpdate);
}
exports.updateToV13 = updateToV13;
/** Post-update schematic to be called when update is finished. */
function postUpdate(context, targetVersion, hasFailures) {
    context.logger.info('');
    context.logger.info(`  ✓  Updated NG-ZORRO to ${targetVersion}`);
    context.logger.info('');
    if (hasFailures) {
        context.logger.warn('  ⚠  Some issues were detected but could not be fixed automatically. Please check the ' +
            'output above and fix these issues manually.');
    }
}
exports.postUpdate = postUpdate;
//# sourceMappingURL=index.js.map