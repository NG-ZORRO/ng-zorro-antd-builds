"use strict";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyNames = void 0;
const schematics_1 = require("@angular/cdk/schematics");
exports.propertyNames = {
    [schematics_1.TargetVersion.V10]: [
        {
            pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/5779',
            changes: [
                {
                    replace: 'nzPosition',
                    replaceWith: 'nzPlacement',
                    limitedTo: { classes: ['NzNotificationDataOptions'] }
                }
            ]
        },
        {
            pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/5789',
            changes: [
                {
                    replace: 'isAllChecked',
                    replaceWith: 'isChecked',
                    limitedTo: { classes: ['NzTreeNode'] }
                },
                {
                    replace: 'setSelected',
                    replaceWith: '/** TODO(NG-ZORRO V10) setSelected is deprecated, use `isSelected` instead **/setSelected',
                    limitedTo: { classes: ['NzTreeNode'] }
                }
            ]
        },
        {
            pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/5798',
            changes: [
                {
                    replace: 'updateDefaultOption',
                    replaceWith: '/** TODO(NG-ZORRO V10) updateDefaultOption is deprecated, Please use `set` of `NzConfigService` instead. **/updateDefaultOption',
                    limitedTo: { classes: ['NzCodeEditorService'] }
                }
            ]
        }
    ],
    [schematics_1.TargetVersion.V11]: [
        {
            pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/6172',
            changes: [
                {
                    replace: 'nzGetContainer',
                    replaceWith: '/** TODO(NG-ZORRO V11) nzGetContainer is deprecated, please remove it manually. **/nzGetContainer',
                    limitedTo: { classes: ['ModalOptions'] }
                },
                {
                    replace: 'open',
                    replaceWith: '/** TODO(NG-ZORRO V11) open is deprecated, please remove it manually. **/open',
                    limitedTo: { classes: ['NzModalRef'] }
                }
            ]
        }
    ]
};
//# sourceMappingURL=property-names.js.map