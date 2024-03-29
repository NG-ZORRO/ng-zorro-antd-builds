/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/outlet";
export class NzTableTitleFooterComponent {
    constructor() {
        this.title = null;
        this.footer = null;
    }
}
NzTableTitleFooterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableTitleFooterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzTableTitleFooterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTableTitleFooterComponent, selector: "nz-table-title-footer", inputs: { title: "title", footer: "footer" }, host: { properties: { "class.ant-table-title": "title !== null", "class.ant-table-footer": "footer !== null" } }, ngImport: i0, template: `
    <ng-container *nzStringTemplateOutlet="title">{{ title }}</ng-container>
    <ng-container *nzStringTemplateOutlet="footer">{{ footer }}</ng-container>
  `, isInline: true, directives: [{ type: i1.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableTitleFooterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-table-title-footer',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <ng-container *nzStringTemplateOutlet="title">{{ title }}</ng-container>
    <ng-container *nzStringTemplateOutlet="footer">{{ footer }}</ng-container>
  `,
                    host: {
                        '[class.ant-table-title]': `title !== null`,
                        '[class.ant-table-footer]': `footer !== null`
                    }
                }]
        }], propDecorators: { title: [{
                type: Input
            }], footer: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUtZm9vdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NvbXBvbmVudHMvdGFibGUvc3JjL3RhYmxlL3RpdGxlLWZvb3Rlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQWlCMUcsTUFBTSxPQUFPLDJCQUEyQjtJQWJ4QztRQWNXLFVBQUssR0FBMkMsSUFBSSxDQUFDO1FBQ3JELFdBQU0sR0FBMkMsSUFBSSxDQUFDO0tBQ2hFOzt3SEFIWSwyQkFBMkI7NEdBQTNCLDJCQUEyQiw2TkFUNUI7OztHQUdUOzJGQU1VLDJCQUEyQjtrQkFidkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRTs7O0dBR1Q7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLHlCQUF5QixFQUFFLGdCQUFnQjt3QkFDM0MsMEJBQTBCLEVBQUUsaUJBQWlCO3FCQUM5QztpQkFDRjs4QkFFVSxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei10YWJsZS10aXRsZS1mb290ZXInLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwidGl0bGVcIj57eyB0aXRsZSB9fTwvbmctY29udGFpbmVyPlxuICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJmb290ZXJcIj57eyBmb290ZXIgfX08L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LXRhYmxlLXRpdGxlXSc6IGB0aXRsZSAhPT0gbnVsbGAsXG4gICAgJ1tjbGFzcy5hbnQtdGFibGUtZm9vdGVyXSc6IGBmb290ZXIgIT09IG51bGxgXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUYWJsZVRpdGxlRm9vdGVyQ29tcG9uZW50IHtcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgZm9vdGVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG59XG4iXX0=