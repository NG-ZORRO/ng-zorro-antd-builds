/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "ng-zorro-antd/icon";
import * as i3 from "ng-zorro-antd/core/transition-patch";
import * as i4 from "ng-zorro-antd/core/outlet";
export class NzSelectArrowComponent {
    constructor() {
        this.loading = false;
        this.search = false;
        this.suffixIcon = null;
    }
}
NzSelectArrowComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSelectArrowComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzSelectArrowComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSelectArrowComponent, selector: "nz-select-arrow", inputs: { loading: "loading", search: "search", suffixIcon: "suffixIcon" }, host: { properties: { "class.ant-select-arrow-loading": "loading" }, classAttribute: "ant-select-arrow" }, ngImport: i0, template: `
    <i nz-icon nzType="loading" *ngIf="loading; else defaultArrow"></i>
    <ng-template #defaultArrow>
      <ng-container *ngIf="!suffixIcon; else suffixTemplate">
        <i nz-icon nzType="down" *ngIf="!search"></i>
        <i nz-icon nzType="search" *ngIf="search"></i>
      </ng-container>
      <ng-template #suffixTemplate>
        <ng-container *nzStringTemplateOutlet="suffixIcon; let suffixIcon">
          <i nz-icon [nzType]="suffixIcon"></i>
        </ng-container>
      </ng-template>
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i3.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { type: i4.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSelectArrowComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-select-arrow',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <i nz-icon nzType="loading" *ngIf="loading; else defaultArrow"></i>
    <ng-template #defaultArrow>
      <ng-container *ngIf="!suffixIcon; else suffixTemplate">
        <i nz-icon nzType="down" *ngIf="!search"></i>
        <i nz-icon nzType="search" *ngIf="search"></i>
      </ng-container>
      <ng-template #suffixTemplate>
        <ng-container *nzStringTemplateOutlet="suffixIcon; let suffixIcon">
          <i nz-icon [nzType]="suffixIcon"></i>
        </ng-container>
      </ng-template>
    </ng-template>
  `,
                    host: {
                        class: 'ant-select-arrow',
                        '[class.ant-select-arrow-loading]': 'loading'
                    }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { loading: [{
                type: Input
            }], search: [{
                type: Input
            }], suffixIcon: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWFycm93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC1hcnJvdy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7OztBQTJCMUcsTUFBTSxPQUFPLHNCQUFzQjtJQUtqQztRQUpTLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLGVBQVUsR0FBMkMsSUFBSSxDQUFDO0lBRXBELENBQUM7O21IQUxMLHNCQUFzQjt1R0FBdEIsc0JBQXNCLDhPQW5CdkI7Ozs7Ozs7Ozs7Ozs7R0FhVDsyRkFNVSxzQkFBc0I7a0JBdkJsQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7O0dBYVQ7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxrQkFBa0I7d0JBQ3pCLGtDQUFrQyxFQUFFLFNBQVM7cUJBQzlDO2lCQUNGOzBFQUVVLE9BQU87c0JBQWYsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotc2VsZWN0LWFycm93JyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGkgbnotaWNvbiBuelR5cGU9XCJsb2FkaW5nXCIgKm5nSWY9XCJsb2FkaW5nOyBlbHNlIGRlZmF1bHRBcnJvd1wiPjwvaT5cbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRBcnJvdz5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhc3VmZml4SWNvbjsgZWxzZSBzdWZmaXhUZW1wbGF0ZVwiPlxuICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cImRvd25cIiAqbmdJZj1cIiFzZWFyY2hcIj48L2k+XG4gICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwic2VhcmNoXCIgKm5nSWY9XCJzZWFyY2hcIj48L2k+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjc3VmZml4VGVtcGxhdGU+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJzdWZmaXhJY29uOyBsZXQgc3VmZml4SWNvblwiPlxuICAgICAgICAgIDxpIG56LWljb24gW256VHlwZV09XCJzdWZmaXhJY29uXCI+PC9pPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LXNlbGVjdC1hcnJvdycsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LWFycm93LWxvYWRpbmddJzogJ2xvYWRpbmcnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpTZWxlY3RBcnJvd0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGxvYWRpbmcgPSBmYWxzZTtcbiAgQElucHV0KCkgc2VhcmNoID0gZmFsc2U7XG4gIEBJbnB1dCgpIHN1ZmZpeEljb246IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG59XG4iXX0=