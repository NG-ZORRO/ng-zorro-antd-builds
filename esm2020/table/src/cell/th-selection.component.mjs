import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "../addon/selection.component";
export class NzThSelectionComponent {
    constructor() {
        this.nzSelections = [];
        this.nzChecked = false;
        this.nzDisabled = false;
        this.nzIndeterminate = false;
        this.nzShowCheckbox = false;
        this.nzShowRowSelection = false;
        this.nzCheckedChange = new EventEmitter();
        this.isNzShowExpandChanged = false;
        this.isNzShowCheckboxChanged = false;
    }
    onCheckedChange(checked) {
        this.nzChecked = checked;
        this.nzCheckedChange.emit(checked);
    }
    ngOnChanges(changes) {
        const isFirstChange = (value) => value && value.firstChange && value.currentValue !== undefined;
        const { nzChecked, nzSelections, nzShowExpand, nzShowCheckbox } = changes;
        if (nzShowExpand) {
            this.isNzShowExpandChanged = true;
        }
        if (nzShowCheckbox) {
            this.isNzShowCheckboxChanged = true;
        }
        if (isFirstChange(nzSelections) && !this.isNzShowExpandChanged) {
            this.nzShowRowSelection = true;
        }
        if (isFirstChange(nzChecked) && !this.isNzShowCheckboxChanged) {
            this.nzShowCheckbox = true;
        }
    }
}
NzThSelectionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzThSelectionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzThSelectionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzThSelectionComponent, selector: "th[nzSelections],th[nzChecked],th[nzShowCheckbox],th[nzShowRowSelection]", inputs: { nzSelections: "nzSelections", nzChecked: "nzChecked", nzDisabled: "nzDisabled", nzIndeterminate: "nzIndeterminate", nzShowCheckbox: "nzShowCheckbox", nzShowRowSelection: "nzShowRowSelection" }, outputs: { nzCheckedChange: "nzCheckedChange" }, host: { classAttribute: "ant-table-selection-column" }, usesOnChanges: true, ngImport: i0, template: `
    <nz-table-selection
      [checked]="nzChecked"
      [disabled]="nzDisabled"
      [indeterminate]="nzIndeterminate"
      [listOfSelections]="nzSelections"
      [showCheckbox]="nzShowCheckbox"
      [showRowSelection]="nzShowRowSelection"
      (checkedChange)="onCheckedChange($event)"
    ></nz-table-selection>
    <ng-content></ng-content>
  `, isInline: true, components: [{ type: i1.NzTableSelectionComponent, selector: "nz-table-selection", inputs: ["listOfSelections", "checked", "disabled", "indeterminate", "showCheckbox", "showRowSelection"], outputs: ["checkedChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzThSelectionComponent.prototype, "nzShowCheckbox", void 0);
__decorate([
    InputBoolean()
], NzThSelectionComponent.prototype, "nzShowRowSelection", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzThSelectionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'th[nzSelections],th[nzChecked],th[nzShowCheckbox],th[nzShowRowSelection]',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <nz-table-selection
      [checked]="nzChecked"
      [disabled]="nzDisabled"
      [indeterminate]="nzIndeterminate"
      [listOfSelections]="nzSelections"
      [showCheckbox]="nzShowCheckbox"
      [showRowSelection]="nzShowRowSelection"
      (checkedChange)="onCheckedChange($event)"
    ></nz-table-selection>
    <ng-content></ng-content>
  `,
                    host: { class: 'ant-table-selection-column' }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { nzSelections: [{
                type: Input
            }], nzChecked: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzIndeterminate: [{
                type: Input
            }], nzShowCheckbox: [{
                type: Input
            }], nzShowRowSelection: [{
                type: Input
            }], nzCheckedChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGgtc2VsZWN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NvbXBvbmVudHMvdGFibGUvc3JjL2NlbGwvdGgtc2VsZWN0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7OztHQUdHO0FBRUgsdURBQXVEO0FBQ3ZELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUdOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7OztBQXFCdkQsTUFBTSxPQUFPLHNCQUFzQjtJQWVqQztRQVhTLGlCQUFZLEdBQXVFLEVBQUUsQ0FBQztRQUN0RixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDUixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2Qix1QkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDakMsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBRXpELDBCQUFxQixHQUFHLEtBQUssQ0FBQztRQUM5Qiw0QkFBdUIsR0FBRyxLQUFLLENBQUM7SUFFekIsQ0FBQztJQUVoQixlQUFlLENBQUMsT0FBZ0I7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7UUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxNQUFNLGFBQWEsR0FBRyxDQUFDLEtBQW1CLEVBQVcsRUFBRSxDQUNyRCxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsSUFBSSxLQUFLLENBQUMsWUFBWSxLQUFLLFNBQVMsQ0FBQztRQUNqRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQzFFLElBQUksWUFBWSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7U0FDbkM7UUFDRCxJQUFJLGNBQWMsRUFBRTtZQUNsQixJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDOUQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztTQUNoQztRQUNELElBQUksYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQzdELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQzs7bUhBdENVLHNCQUFzQjt1R0FBdEIsc0JBQXNCLDBiQWR2Qjs7Ozs7Ozs7Ozs7R0FXVDtBQVd3QjtJQUFmLFlBQVksRUFBRTs4REFBd0I7QUFDdkI7SUFBZixZQUFZLEVBQUU7a0VBQTRCOzJGQVR6QyxzQkFBc0I7a0JBbkJsQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwwRUFBMEU7b0JBQ3BGLG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7OztHQVdUO29CQUNELElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSw0QkFBNEIsRUFBRTtpQkFDOUM7MEVBS1UsWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDbUIsY0FBYztzQkFBdEMsS0FBSztnQkFDbUIsa0JBQWtCO3NCQUExQyxLQUFLO2dCQUNhLGVBQWU7c0JBQWpDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAYW5ndWxhci1lc2xpbnQvY29tcG9uZW50LXNlbGVjdG9yICovXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aFtuelNlbGVjdGlvbnNdLHRoW256Q2hlY2tlZF0sdGhbbnpTaG93Q2hlY2tib3hdLHRoW256U2hvd1Jvd1NlbGVjdGlvbl0nLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG56LXRhYmxlLXNlbGVjdGlvblxuICAgICAgW2NoZWNrZWRdPVwibnpDaGVja2VkXCJcbiAgICAgIFtkaXNhYmxlZF09XCJuekRpc2FibGVkXCJcbiAgICAgIFtpbmRldGVybWluYXRlXT1cIm56SW5kZXRlcm1pbmF0ZVwiXG4gICAgICBbbGlzdE9mU2VsZWN0aW9uc109XCJuelNlbGVjdGlvbnNcIlxuICAgICAgW3Nob3dDaGVja2JveF09XCJuelNob3dDaGVja2JveFwiXG4gICAgICBbc2hvd1Jvd1NlbGVjdGlvbl09XCJuelNob3dSb3dTZWxlY3Rpb25cIlxuICAgICAgKGNoZWNrZWRDaGFuZ2UpPVwib25DaGVja2VkQ2hhbmdlKCRldmVudClcIlxuICAgID48L256LXRhYmxlLXNlbGVjdGlvbj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIGAsXG4gIGhvc3Q6IHsgY2xhc3M6ICdhbnQtdGFibGUtc2VsZWN0aW9uLWNvbHVtbicgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRoU2VsZWN0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2hvd0NoZWNrYm94OiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dSb3dTZWxlY3Rpb246IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBuelNlbGVjdGlvbnM6IEFycmF5PHsgdGV4dDogc3RyaW5nOyBvblNlbGVjdCguLi5hcmdzOiBOelNhZmVBbnlbXSk6IE56U2FmZUFueSB9PiA9IFtdO1xuICBASW5wdXQoKSBuekNoZWNrZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgbnpEaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBuekluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56U2hvd0NoZWNrYm94ID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNob3dSb3dTZWxlY3Rpb24gPSBmYWxzZTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Q2hlY2tlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBwcml2YXRlIGlzTnpTaG93RXhwYW5kQ2hhbmdlZCA9IGZhbHNlO1xuICBwcml2YXRlIGlzTnpTaG93Q2hlY2tib3hDaGFuZ2VkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG9uQ2hlY2tlZENoYW5nZShjaGVja2VkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5uekNoZWNrZWQgPSBjaGVja2VkO1xuICAgIHRoaXMubnpDaGVja2VkQ2hhbmdlLmVtaXQoY2hlY2tlZCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgaXNGaXJzdENoYW5nZSA9ICh2YWx1ZTogU2ltcGxlQ2hhbmdlKTogYm9vbGVhbiA9PlxuICAgICAgdmFsdWUgJiYgdmFsdWUuZmlyc3RDaGFuZ2UgJiYgdmFsdWUuY3VycmVudFZhbHVlICE9PSB1bmRlZmluZWQ7XG4gICAgY29uc3QgeyBuekNoZWNrZWQsIG56U2VsZWN0aW9ucywgbnpTaG93RXhwYW5kLCBuelNob3dDaGVja2JveCB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpTaG93RXhwYW5kKSB7XG4gICAgICB0aGlzLmlzTnpTaG93RXhwYW5kQ2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICAgIGlmIChuelNob3dDaGVja2JveCkge1xuICAgICAgdGhpcy5pc056U2hvd0NoZWNrYm94Q2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICAgIGlmIChpc0ZpcnN0Q2hhbmdlKG56U2VsZWN0aW9ucykgJiYgIXRoaXMuaXNOelNob3dFeHBhbmRDaGFuZ2VkKSB7XG4gICAgICB0aGlzLm56U2hvd1Jvd1NlbGVjdGlvbiA9IHRydWU7XG4gICAgfVxuICAgIGlmIChpc0ZpcnN0Q2hhbmdlKG56Q2hlY2tlZCkgJiYgIXRoaXMuaXNOelNob3dDaGVja2JveENoYW5nZWQpIHtcbiAgICAgIHRoaXMubnpTaG93Q2hlY2tib3ggPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuIl19