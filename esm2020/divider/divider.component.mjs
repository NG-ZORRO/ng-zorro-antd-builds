import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "ng-zorro-antd/core/outlet";
export class NzDividerComponent {
    constructor() {
        this.nzType = 'horizontal';
        this.nzOrientation = 'center';
        this.nzDashed = false;
        this.nzPlain = false;
    }
}
NzDividerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDividerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzDividerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzDividerComponent, selector: "nz-divider", inputs: { nzText: "nzText", nzType: "nzType", nzOrientation: "nzOrientation", nzDashed: "nzDashed", nzPlain: "nzPlain" }, host: { properties: { "class.ant-divider-horizontal": "nzType === 'horizontal'", "class.ant-divider-vertical": "nzType === 'vertical'", "class.ant-divider-with-text": "nzText", "class.ant-divider-plain": "nzPlain", "class.ant-divider-with-text-left": "nzText && nzOrientation === 'left'", "class.ant-divider-with-text-right": "nzText && nzOrientation === 'right'", "class.ant-divider-with-text-center": "nzText && nzOrientation === 'center'", "class.ant-divider-dashed": "nzDashed" }, classAttribute: "ant-divider" }, exportAs: ["nzDivider"], ngImport: i0, template: `
    <span *ngIf="nzText" class="ant-divider-inner-text">
      <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
    </span>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzDividerComponent.prototype, "nzDashed", void 0);
__decorate([
    InputBoolean()
], NzDividerComponent.prototype, "nzPlain", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDividerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-divider',
                    exportAs: 'nzDivider',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <span *ngIf="nzText" class="ant-divider-inner-text">
      <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
    </span>
  `,
                    host: {
                        class: 'ant-divider',
                        '[class.ant-divider-horizontal]': `nzType === 'horizontal'`,
                        '[class.ant-divider-vertical]': `nzType === 'vertical'`,
                        '[class.ant-divider-with-text]': `nzText`,
                        '[class.ant-divider-plain]': `nzPlain`,
                        '[class.ant-divider-with-text-left]': `nzText && nzOrientation === 'left'`,
                        '[class.ant-divider-with-text-right]': `nzText && nzOrientation === 'right'`,
                        '[class.ant-divider-with-text-center]': `nzText && nzOrientation === 'center'`,
                        '[class.ant-divider-dashed]': `nzDashed`
                    }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { nzText: [{
                type: Input
            }], nzType: [{
                type: Input
            }], nzOrientation: [{
                type: Input
            }], nzDashed: [{
                type: Input
            }], nzPlain: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGl2aWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2RpdmlkZXIvZGl2aWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFlLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzFHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7OztBQXlCdkQsTUFBTSxPQUFPLGtCQUFrQjtJQVU3QjtRQUxTLFdBQU0sR0FBOEIsWUFBWSxDQUFDO1FBQ2pELGtCQUFhLEdBQWdDLFFBQVEsQ0FBQztRQUN0QyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLFlBQU8sR0FBRyxLQUFLLENBQUM7SUFFMUIsQ0FBQzs7K0dBVkwsa0JBQWtCO21HQUFsQixrQkFBa0IsMnNCQWpCbkI7Ozs7R0FJVDtBQW9Cd0I7SUFBZixZQUFZLEVBQUU7b0RBQWtCO0FBQ2pCO0lBQWYsWUFBWSxFQUFFO21EQUFpQjsyRkFSOUIsa0JBQWtCO2tCQXZCOUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFOzs7O0dBSVQ7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxhQUFhO3dCQUNwQixnQ0FBZ0MsRUFBRSx5QkFBeUI7d0JBQzNELDhCQUE4QixFQUFFLHVCQUF1Qjt3QkFDdkQsK0JBQStCLEVBQUUsUUFBUTt3QkFDekMsMkJBQTJCLEVBQUUsU0FBUzt3QkFDdEMsb0NBQW9DLEVBQUUsb0NBQW9DO3dCQUMxRSxxQ0FBcUMsRUFBRSxxQ0FBcUM7d0JBQzVFLHNDQUFzQyxFQUFFLHNDQUFzQzt3QkFDOUUsNEJBQTRCLEVBQUUsVUFBVTtxQkFDekM7aUJBQ0Y7MEVBS1UsTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNtQixRQUFRO3NCQUFoQyxLQUFLO2dCQUNtQixPQUFPO3NCQUEvQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1kaXZpZGVyJyxcbiAgZXhwb3J0QXM6ICduekRpdmlkZXInLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW4gKm5nSWY9XCJuelRleHRcIiBjbGFzcz1cImFudC1kaXZpZGVyLWlubmVyLXRleHRcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuelRleHRcIj57eyBuelRleHQgfX08L25nLWNvbnRhaW5lcj5cbiAgICA8L3NwYW4+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC1kaXZpZGVyJyxcbiAgICAnW2NsYXNzLmFudC1kaXZpZGVyLWhvcml6b250YWxdJzogYG56VHlwZSA9PT0gJ2hvcml6b250YWwnYCxcbiAgICAnW2NsYXNzLmFudC1kaXZpZGVyLXZlcnRpY2FsXSc6IGBuelR5cGUgPT09ICd2ZXJ0aWNhbCdgLFxuICAgICdbY2xhc3MuYW50LWRpdmlkZXItd2l0aC10ZXh0XSc6IGBuelRleHRgLFxuICAgICdbY2xhc3MuYW50LWRpdmlkZXItcGxhaW5dJzogYG56UGxhaW5gLFxuICAgICdbY2xhc3MuYW50LWRpdmlkZXItd2l0aC10ZXh0LWxlZnRdJzogYG56VGV4dCAmJiBuek9yaWVudGF0aW9uID09PSAnbGVmdCdgLFxuICAgICdbY2xhc3MuYW50LWRpdmlkZXItd2l0aC10ZXh0LXJpZ2h0XSc6IGBuelRleHQgJiYgbnpPcmllbnRhdGlvbiA9PT0gJ3JpZ2h0J2AsXG4gICAgJ1tjbGFzcy5hbnQtZGl2aWRlci13aXRoLXRleHQtY2VudGVyXSc6IGBuelRleHQgJiYgbnpPcmllbnRhdGlvbiA9PT0gJ2NlbnRlcidgLFxuICAgICdbY2xhc3MuYW50LWRpdmlkZXItZGFzaGVkXSc6IGBuekRhc2hlZGBcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekRpdmlkZXJDb21wb25lbnQge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEYXNoZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256UGxhaW46IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBuelRleHQ/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgbnpUeXBlOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuICBASW5wdXQoKSBuek9yaWVudGF0aW9uOiAnbGVmdCcgfCAncmlnaHQnIHwgJ2NlbnRlcicgPSAnY2VudGVyJztcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RGFzaGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelBsYWluID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxufVxuIl19