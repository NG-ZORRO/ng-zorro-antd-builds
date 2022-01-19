/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "ng-zorro-antd/icon";
import * as i3 from "ng-zorro-antd/core/transition-patch";
export class NzOptionItemComponent {
    constructor() {
        this.selected = false;
        this.activated = false;
        this.grouped = false;
        this.customContent = false;
        this.template = null;
        this.disabled = false;
        this.showState = false;
        this.label = null;
        this.value = null;
        this.activatedValue = null;
        this.listOfSelectedValue = [];
        this.icon = null;
        this.itemClick = new EventEmitter();
        this.itemHover = new EventEmitter();
    }
    onHostMouseEnter() {
        if (!this.disabled) {
            this.itemHover.next(this.value);
        }
    }
    onHostClick() {
        if (!this.disabled) {
            this.itemClick.next(this.value);
        }
    }
    ngOnChanges(changes) {
        const { value, activatedValue, listOfSelectedValue } = changes;
        if (value || listOfSelectedValue) {
            this.selected = this.listOfSelectedValue.some(v => this.compareWith(v, this.value));
        }
        if (value || activatedValue) {
            this.activated = this.compareWith(this.activatedValue, this.value);
        }
    }
}
NzOptionItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOptionItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzOptionItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzOptionItemComponent, selector: "nz-option-item", inputs: { grouped: "grouped", customContent: "customContent", template: "template", disabled: "disabled", showState: "showState", label: "label", value: "value", activatedValue: "activatedValue", listOfSelectedValue: "listOfSelectedValue", icon: "icon", compareWith: "compareWith" }, outputs: { itemClick: "itemClick", itemHover: "itemHover" }, host: { listeners: { "mouseenter": "onHostMouseEnter()", "click": "onHostClick()" }, properties: { "attr.title": "label", "class.ant-select-item-option-grouped": "grouped", "class.ant-select-item-option-selected": "selected && !disabled", "class.ant-select-item-option-disabled": "disabled", "class.ant-select-item-option-active": "activated && !disabled" }, classAttribute: "ant-select-item ant-select-item-option" }, usesOnChanges: true, ngImport: i0, template: `
    <div class="ant-select-item-option-content">
      <ng-container *ngIf="!customContent">{{ label }}</ng-container>
      <ng-container *ngIf="customContent">
        <ng-template [ngTemplateOutlet]="template"></ng-template>
      </ng-container>
    </div>
    <div *ngIf="showState && selected" class="ant-select-item-option-state" style="user-select: none" unselectable="on">
      <i nz-icon nzType="check" class="ant-select-selected-icon" *ngIf="!icon; else icon"></i>
    </div>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i3.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOptionItemComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-option-item',
                    template: `
    <div class="ant-select-item-option-content">
      <ng-container *ngIf="!customContent">{{ label }}</ng-container>
      <ng-container *ngIf="customContent">
        <ng-template [ngTemplateOutlet]="template"></ng-template>
      </ng-container>
    </div>
    <div *ngIf="showState && selected" class="ant-select-item-option-state" style="user-select: none" unselectable="on">
      <i nz-icon nzType="check" class="ant-select-selected-icon" *ngIf="!icon; else icon"></i>
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'ant-select-item ant-select-item-option',
                        '[attr.title]': 'label',
                        '[class.ant-select-item-option-grouped]': 'grouped',
                        '[class.ant-select-item-option-selected]': 'selected && !disabled',
                        '[class.ant-select-item-option-disabled]': 'disabled',
                        '[class.ant-select-item-option-active]': 'activated && !disabled',
                        '(mouseenter)': 'onHostMouseEnter()',
                        '(click)': 'onHostClick()'
                    }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { grouped: [{
                type: Input
            }], customContent: [{
                type: Input
            }], template: [{
                type: Input
            }], disabled: [{
                type: Input
            }], showState: [{
                type: Input
            }], label: [{
                type: Input
            }], value: [{
                type: Input
            }], activatedValue: [{
                type: Input
            }], listOfSelectedValue: [{
                type: Input
            }], icon: [{
                type: Input
            }], compareWith: [{
                type: Input
            }], itemClick: [{
                type: Output
            }], itemHover: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9zZWxlY3Qvb3B0aW9uLWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUdOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQzs7Ozs7QUE4QnZCLE1BQU0sT0FBTyxxQkFBcUI7SUFpQmhDO1FBaEJBLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNULFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsYUFBUSxHQUFrQyxJQUFJLENBQUM7UUFDL0MsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLFVBQUssR0FBMkIsSUFBSSxDQUFDO1FBQ3JDLFVBQUssR0FBcUIsSUFBSSxDQUFDO1FBQy9CLG1CQUFjLEdBQXFCLElBQUksQ0FBQztRQUN4Qyx3QkFBbUIsR0FBZ0IsRUFBRSxDQUFDO1FBQ3RDLFNBQUksR0FBa0MsSUFBSSxDQUFDO1FBRWpDLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBYSxDQUFDO1FBQzFDLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBYSxDQUFDO0lBRTlDLENBQUM7SUFFaEIsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUNELFdBQVc7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDO0lBQ0QsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQy9ELElBQUksS0FBSyxJQUFJLG1CQUFtQixFQUFFO1lBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3JGO1FBQ0QsSUFBSSxLQUFLLElBQUksY0FBYyxFQUFFO1lBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwRTtJQUNILENBQUM7O2tIQXJDVSxxQkFBcUI7c0dBQXJCLHFCQUFxQix1MEJBeEJ0Qjs7Ozs7Ozs7OztHQVVUOzJGQWNVLHFCQUFxQjtrQkExQmpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFOzs7Ozs7Ozs7O0dBVVQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLHdDQUF3Qzt3QkFDL0MsY0FBYyxFQUFFLE9BQU87d0JBQ3ZCLHdDQUF3QyxFQUFFLFNBQVM7d0JBQ25ELHlDQUF5QyxFQUFFLHVCQUF1Qjt3QkFDbEUseUNBQXlDLEVBQUUsVUFBVTt3QkFDckQsdUNBQXVDLEVBQUUsd0JBQXdCO3dCQUNqRSxjQUFjLEVBQUUsb0JBQW9CO3dCQUNwQyxTQUFTLEVBQUUsZUFBZTtxQkFDM0I7aUJBQ0Y7MEVBSVUsT0FBTztzQkFBZixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDYSxTQUFTO3NCQUEzQixNQUFNO2dCQUNZLFNBQVM7c0JBQTNCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1vcHRpb24taXRlbScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFudC1zZWxlY3QtaXRlbS1vcHRpb24tY29udGVudFwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjdXN0b21Db250ZW50XCI+e3sgbGFiZWwgfX08L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjdXN0b21Db250ZW50XCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2ICpuZ0lmPVwic2hvd1N0YXRlICYmIHNlbGVjdGVkXCIgY2xhc3M9XCJhbnQtc2VsZWN0LWl0ZW0tb3B0aW9uLXN0YXRlXCIgc3R5bGU9XCJ1c2VyLXNlbGVjdDogbm9uZVwiIHVuc2VsZWN0YWJsZT1cIm9uXCI+XG4gICAgICA8aSBuei1pY29uIG56VHlwZT1cImNoZWNrXCIgY2xhc3M9XCJhbnQtc2VsZWN0LXNlbGVjdGVkLWljb25cIiAqbmdJZj1cIiFpY29uOyBlbHNlIGljb25cIj48L2k+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtc2VsZWN0LWl0ZW0gYW50LXNlbGVjdC1pdGVtLW9wdGlvbicsXG4gICAgJ1thdHRyLnRpdGxlXSc6ICdsYWJlbCcsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LWl0ZW0tb3B0aW9uLWdyb3VwZWRdJzogJ2dyb3VwZWQnLFxuICAgICdbY2xhc3MuYW50LXNlbGVjdC1pdGVtLW9wdGlvbi1zZWxlY3RlZF0nOiAnc2VsZWN0ZWQgJiYgIWRpc2FibGVkJyxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtaXRlbS1vcHRpb24tZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtaXRlbS1vcHRpb24tYWN0aXZlXSc6ICdhY3RpdmF0ZWQgJiYgIWRpc2FibGVkJyxcbiAgICAnKG1vdXNlZW50ZXIpJzogJ29uSG9zdE1vdXNlRW50ZXIoKScsXG4gICAgJyhjbGljayknOiAnb25Ib3N0Q2xpY2soKSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOek9wdGlvbkl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBzZWxlY3RlZCA9IGZhbHNlO1xuICBhY3RpdmF0ZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgZ3JvdXBlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBjdXN0b21Db250ZW50ID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNob3dTdGF0ZSA9IGZhbHNlO1xuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHZhbHVlOiBOelNhZmVBbnkgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgYWN0aXZhdGVkVmFsdWU6IE56U2FmZUFueSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBsaXN0T2ZTZWxlY3RlZFZhbHVlOiBOelNhZmVBbnlbXSA9IFtdO1xuICBASW5wdXQoKSBpY29uOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGNvbXBhcmVXaXRoITogKG8xOiBOelNhZmVBbnksIG8yOiBOelNhZmVBbnkpID0+IGJvb2xlYW47XG4gIEBPdXRwdXQoKSByZWFkb25seSBpdGVtQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE56U2FmZUFueT4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGl0ZW1Ib3ZlciA9IG5ldyBFdmVudEVtaXR0ZXI8TnpTYWZlQW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBvbkhvc3RNb3VzZUVudGVyKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5pdGVtSG92ZXIubmV4dCh0aGlzLnZhbHVlKTtcbiAgICB9XG4gIH1cbiAgb25Ib3N0Q2xpY2soKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLml0ZW1DbGljay5uZXh0KHRoaXMudmFsdWUpO1xuICAgIH1cbiAgfVxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyB2YWx1ZSwgYWN0aXZhdGVkVmFsdWUsIGxpc3RPZlNlbGVjdGVkVmFsdWUgfSA9IGNoYW5nZXM7XG4gICAgaWYgKHZhbHVlIHx8IGxpc3RPZlNlbGVjdGVkVmFsdWUpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmxpc3RPZlNlbGVjdGVkVmFsdWUuc29tZSh2ID0+IHRoaXMuY29tcGFyZVdpdGgodiwgdGhpcy52YWx1ZSkpO1xuICAgIH1cbiAgICBpZiAodmFsdWUgfHwgYWN0aXZhdGVkVmFsdWUpIHtcbiAgICAgIHRoaXMuYWN0aXZhdGVkID0gdGhpcy5jb21wYXJlV2l0aCh0aGlzLmFjdGl2YXRlZFZhbHVlLCB0aGlzLnZhbHVlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==