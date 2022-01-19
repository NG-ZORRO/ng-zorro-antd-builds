import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "./node";
export class NzTreeNodeOptionComponent {
    constructor(treeNode) {
        this.treeNode = treeNode;
        this.nzSelected = false;
        this.nzDisabled = false;
        this.nzClick = new EventEmitter();
    }
    get isExpanded() {
        return this.treeNode.isExpanded;
    }
    onClick(e) {
        if (!this.nzDisabled) {
            this.nzClick.emit(e);
        }
    }
    ngOnChanges(changes) {
        const { nzDisabled, nzSelected } = changes;
        if (nzDisabled) {
            if (nzDisabled.currentValue) {
                this.treeNode.disable();
            }
            else {
                this.treeNode.enable();
            }
        }
        if (nzSelected) {
            if (nzSelected.currentValue) {
                this.treeNode.select();
            }
            else {
                this.treeNode.deselect();
            }
        }
    }
}
NzTreeNodeOptionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeOptionComponent, deps: [{ token: i1.NzTreeNodeComponent }], target: i0.ɵɵFactoryTarget.Component });
NzTreeNodeOptionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeOptionComponent, selector: "nz-tree-node-option", inputs: { nzSelected: "nzSelected", nzDisabled: "nzDisabled" }, outputs: { nzClick: "nzClick" }, host: { listeners: { "click": "onClick($event)" }, properties: { "class.ant-tree-node-content-wrapper-open": "isExpanded", "class.ant-tree-node-selected": "nzSelected" }, classAttribute: "ant-tree-node-content-wrapper" }, usesOnChanges: true, ngImport: i0, template: ` <span class="ant-tree-title"><ng-content></ng-content></span> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    InputBoolean()
], NzTreeNodeOptionComponent.prototype, "nzSelected", void 0);
__decorate([
    InputBoolean()
], NzTreeNodeOptionComponent.prototype, "nzDisabled", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeOptionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tree-node-option',
                    template: ` <span class="ant-tree-title"><ng-content></ng-content></span> `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'ant-tree-node-content-wrapper',
                        '[class.ant-tree-node-content-wrapper-open]': 'isExpanded',
                        '[class.ant-tree-node-selected]': 'nzSelected',
                        '(click)': 'onClick($event)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzTreeNodeComponent }]; }, propDecorators: { nzSelected: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzClick: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy90cmVlLXZpZXcvb3B0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFFUCxNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7OztBQWV2RCxNQUFNLE9BQU8seUJBQXlCO0lBUXBDLFlBQW9CLFFBQWdDO1FBQWhDLGFBQVEsR0FBUixRQUFRLENBQXdCO1FBSjNCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUN6QixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQWMsQ0FBQztJQUVMLENBQUM7SUFFeEQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsT0FBTyxDQUFDLENBQWE7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEI7SUFDSCxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQzNDLElBQUksVUFBVSxFQUFFO1lBQ2QsSUFBSSxVQUFVLENBQUMsWUFBWSxFQUFFO2dCQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDeEI7U0FDRjtRQUVELElBQUksVUFBVSxFQUFFO1lBQ2QsSUFBSSxVQUFVLENBQUMsWUFBWSxFQUFFO2dCQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ3hCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDMUI7U0FDRjtJQUNILENBQUM7O3NIQXJDVSx5QkFBeUI7MEdBQXpCLHlCQUF5QiwrWUFUMUIsaUVBQWlFO0FBYWxEO0lBQWYsWUFBWSxFQUFFOzZEQUFvQjtBQUNuQjtJQUFmLFlBQVksRUFBRTs2REFBb0I7MkZBTGpDLHlCQUF5QjtrQkFYckMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUsaUVBQWlFO29CQUMzRSxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSwrQkFBK0I7d0JBQ3RDLDRDQUE0QyxFQUFFLFlBQVk7d0JBQzFELGdDQUFnQyxFQUFFLFlBQVk7d0JBQzlDLFNBQVMsRUFBRSxpQkFBaUI7cUJBQzdCO2lCQUNGOzBHQUswQixVQUFVO3NCQUFsQyxLQUFLO2dCQUNtQixVQUFVO3NCQUFsQyxLQUFLO2dCQUNhLE9BQU87c0JBQXpCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuaW1wb3J0IHsgTnpUcmVlTm9kZUNvbXBvbmVudCB9IGZyb20gJy4vbm9kZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXRyZWUtbm9kZS1vcHRpb24nLFxuICB0ZW1wbGF0ZTogYCA8c3BhbiBjbGFzcz1cImFudC10cmVlLXRpdGxlXCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50Pjwvc3Bhbj4gYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC10cmVlLW5vZGUtY29udGVudC13cmFwcGVyJyxcbiAgICAnW2NsYXNzLmFudC10cmVlLW5vZGUtY29udGVudC13cmFwcGVyLW9wZW5dJzogJ2lzRXhwYW5kZWQnLFxuICAgICdbY2xhc3MuYW50LXRyZWUtbm9kZS1zZWxlY3RlZF0nOiAnbnpTZWxlY3RlZCcsXG4gICAgJyhjbGljayknOiAnb25DbGljaygkZXZlbnQpJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VHJlZU5vZGVPcHRpb25Db21wb25lbnQ8VD4gaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTZWxlY3RlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEaXNhYmxlZDogQm9vbGVhbklucHV0O1xuXG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNlbGVjdGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekRpc2FibGVkID0gZmFsc2U7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJlZU5vZGU6IE56VHJlZU5vZGVDb21wb25lbnQ8VD4pIHt9XG5cbiAgZ2V0IGlzRXhwYW5kZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudHJlZU5vZGUuaXNFeHBhbmRlZDtcbiAgfVxuXG4gIG9uQ2xpY2soZTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5uekRpc2FibGVkKSB7XG4gICAgICB0aGlzLm56Q2xpY2suZW1pdChlKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuekRpc2FibGVkLCBuelNlbGVjdGVkIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChuekRpc2FibGVkKSB7XG4gICAgICBpZiAobnpEaXNhYmxlZC5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgdGhpcy50cmVlTm9kZS5kaXNhYmxlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRyZWVOb2RlLmVuYWJsZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChuelNlbGVjdGVkKSB7XG4gICAgICBpZiAobnpTZWxlY3RlZC5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgdGhpcy50cmVlTm9kZS5zZWxlY3QoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudHJlZU5vZGUuZGVzZWxlY3QoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==