/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/outlet";
import * as i2 from "ng-zorro-antd/icon";
export class NzTabAddButtonComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.addIcon = 'plus';
        this.element = this.elementRef.nativeElement;
    }
    getElementWidth() {
        return this.element?.offsetWidth || 0;
    }
    getElementHeight() {
        return this.element?.offsetHeight || 0;
    }
}
NzTabAddButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTabAddButtonComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NzTabAddButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTabAddButtonComponent, selector: "nz-tab-add-button, button[nz-tab-add-button]", inputs: { addIcon: "addIcon" }, host: { attributes: { "aria-label": "Add tab", "type": "button" }, classAttribute: "ant-tabs-nav-add" }, ngImport: i0, template: `
    <ng-container *nzStringTemplateOutlet="addIcon; let icon">
      <i nz-icon [nzType]="icon" nzTheme="outline"></i>
    </ng-container>
  `, isInline: true, directives: [{ type: i1.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i2.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTabAddButtonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tab-add-button, button[nz-tab-add-button]',
                    template: `
    <ng-container *nzStringTemplateOutlet="addIcon; let icon">
      <i nz-icon [nzType]="icon" nzTheme="outline"></i>
    </ng-container>
  `,
                    host: {
                        class: 'ant-tabs-nav-add',
                        'aria-label': 'Add tab',
                        type: 'button'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { addIcon: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWFkZC1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy90YWJzL3RhYi1hZGQtYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFjLEtBQUssRUFBZSxNQUFNLGVBQWUsQ0FBQzs7OztBQWlCMUUsTUFBTSxPQUFPLHVCQUF1QjtJQUtsQyxZQUFvQixVQUFtQztRQUFuQyxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUo5QyxZQUFPLEdBQW9DLE1BQU0sQ0FBQztRQUt6RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQy9DLENBQUM7SUFFRCxlQUFlO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLFdBQVcsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELGdCQUFnQjtRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxZQUFZLElBQUksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7O29IQWZVLHVCQUF1Qjt3R0FBdkIsdUJBQXVCLDZOQVh4Qjs7OztHQUlUOzJGQU9VLHVCQUF1QjtrQkFibkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsOENBQThDO29CQUN4RCxRQUFRLEVBQUU7Ozs7R0FJVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLGtCQUFrQjt3QkFDekIsWUFBWSxFQUFFLFNBQVM7d0JBQ3ZCLElBQUksRUFBRSxRQUFRO3FCQUNmO2lCQUNGO2lHQUVVLE9BQU87c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXRhYi1hZGQtYnV0dG9uLCBidXR0b25bbnotdGFiLWFkZC1idXR0b25dJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwiYWRkSWNvbjsgbGV0IGljb25cIj5cbiAgICAgIDxpIG56LWljb24gW256VHlwZV09XCJpY29uXCIgbnpUaGVtZT1cIm91dGxpbmVcIj48L2k+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC10YWJzLW5hdi1hZGQnLFxuICAgICdhcmlhLWxhYmVsJzogJ0FkZCB0YWInLFxuICAgIHR5cGU6ICdidXR0b24nXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUYWJBZGRCdXR0b25Db21wb25lbnQge1xuICBASW5wdXQoKSBhZGRJY29uOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+ID0gJ3BsdXMnO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgZ2V0RWxlbWVudFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudD8ub2Zmc2V0V2lkdGggfHwgMDtcbiAgfVxuXG4gIGdldEVsZW1lbnRIZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50Py5vZmZzZXRIZWlnaHQgfHwgMDtcbiAgfVxufVxuIl19