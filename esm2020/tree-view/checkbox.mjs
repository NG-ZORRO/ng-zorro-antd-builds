import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
export class NzTreeNodeCheckboxComponent {
    constructor() {
        this.nzClick = new EventEmitter();
    }
    onClick(e) {
        if (!this.nzDisabled) {
            this.nzClick.emit(e);
        }
    }
}
NzTreeNodeCheckboxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeCheckboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzTreeNodeCheckboxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeCheckboxComponent, selector: "nz-tree-node-checkbox:not([builtin])", inputs: { nzChecked: "nzChecked", nzIndeterminate: "nzIndeterminate", nzDisabled: "nzDisabled" }, outputs: { nzClick: "nzClick" }, host: { listeners: { "click": "onClick($event)" }, properties: { "class.ant-tree-checkbox-checked": "nzChecked", "class.ant-tree-checkbox-indeterminate": "nzIndeterminate", "class.ant-tree-checkbox-disabled": "nzDisabled" }, classAttribute: "ant-tree-checkbox" }, ngImport: i0, template: ` <span class="ant-tree-checkbox-inner"></span> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    InputBoolean()
], NzTreeNodeCheckboxComponent.prototype, "nzDisabled", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeCheckboxComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tree-node-checkbox:not([builtin])',
                    template: ` <span class="ant-tree-checkbox-inner"></span> `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    host: {
                        class: 'ant-tree-checkbox',
                        '[class.ant-tree-checkbox-checked]': `nzChecked`,
                        '[class.ant-tree-checkbox-indeterminate]': `nzIndeterminate`,
                        '[class.ant-tree-checkbox-disabled]': `nzDisabled`,
                        '(click)': 'onClick($event)'
                    }
                }]
        }], propDecorators: { nzChecked: [{
                type: Input
            }], nzIndeterminate: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzClick: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3RyZWUtdmlldy9jaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdoRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBZXZELE1BQU0sT0FBTywyQkFBMkI7SUFieEM7UUFtQnFCLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO0tBTzdEO0lBTEMsT0FBTyxDQUFDLENBQWE7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEI7SUFDSCxDQUFDOzt3SEFaVSwyQkFBMkI7NEdBQTNCLDJCQUEyQix1ZEFYNUIsaURBQWlEO0FBZ0JsQztJQUFmLFlBQVksRUFBRTsrREFBc0I7MkZBTG5DLDJCQUEyQjtrQkFidkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0NBQXNDO29CQUNoRCxRQUFRLEVBQUUsaURBQWlEO29CQUMzRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxtQkFBbUI7d0JBQzFCLG1DQUFtQyxFQUFFLFdBQVc7d0JBQ2hELHlDQUF5QyxFQUFFLGlCQUFpQjt3QkFDNUQsb0NBQW9DLEVBQUUsWUFBWTt3QkFDbEQsU0FBUyxFQUFFLGlCQUFpQjtxQkFDN0I7aUJBQ0Y7OEJBSVUsU0FBUztzQkFBakIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNtQixVQUFVO3NCQUFsQyxLQUFLO2dCQUNhLE9BQU87c0JBQXpCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdHJlZS1ub2RlLWNoZWNrYm94Om5vdChbYnVpbHRpbl0pJyxcbiAgdGVtcGxhdGU6IGAgPHNwYW4gY2xhc3M9XCJhbnQtdHJlZS1jaGVja2JveC1pbm5lclwiPjwvc3Bhbj4gYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtdHJlZS1jaGVja2JveCcsXG4gICAgJ1tjbGFzcy5hbnQtdHJlZS1jaGVja2JveC1jaGVja2VkXSc6IGBuekNoZWNrZWRgLFxuICAgICdbY2xhc3MuYW50LXRyZWUtY2hlY2tib3gtaW5kZXRlcm1pbmF0ZV0nOiBgbnpJbmRldGVybWluYXRlYCxcbiAgICAnW2NsYXNzLmFudC10cmVlLWNoZWNrYm94LWRpc2FibGVkXSc6IGBuekRpc2FibGVkYCxcbiAgICAnKGNsaWNrKSc6ICdvbkNsaWNrKCRldmVudCknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUcmVlTm9kZUNoZWNrYm94Q29tcG9uZW50IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBuekNoZWNrZWQ/OiBib29sZWFuO1xuICBASW5wdXQoKSBuekluZGV0ZXJtaW5hdGU/OiBib29sZWFuO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpEaXNhYmxlZD86IGJvb2xlYW47XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIG9uQ2xpY2soZTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5uekRpc2FibGVkKSB7XG4gICAgICB0aGlzLm56Q2xpY2suZW1pdChlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==