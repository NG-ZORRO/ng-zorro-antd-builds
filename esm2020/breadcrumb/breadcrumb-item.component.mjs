/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./breadcrumb";
import * as i2 from "@angular/common";
import * as i3 from "ng-zorro-antd/dropdown";
import * as i4 from "ng-zorro-antd/icon";
import * as i5 from "ng-zorro-antd/core/outlet";
export class NzBreadCrumbItemComponent {
    constructor(nzBreadCrumbComponent) {
        this.nzBreadCrumbComponent = nzBreadCrumbComponent;
    }
}
NzBreadCrumbItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBreadCrumbItemComponent, deps: [{ token: i1.NzBreadcrumb }], target: i0.ɵɵFactoryTarget.Component });
NzBreadCrumbItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzBreadCrumbItemComponent, selector: "nz-breadcrumb-item", inputs: { nzOverlay: "nzOverlay" }, exportAs: ["nzBreadcrumbItem"], ngImport: i0, template: `
    <ng-container *ngIf="!!nzOverlay; else noMenuTpl">
      <span class="ant-breadcrumb-overlay-link" nz-dropdown [nzDropdownMenu]="nzOverlay">
        <ng-template [ngTemplateOutlet]="noMenuTpl"></ng-template>
        <i *ngIf="!!nzOverlay" nz-icon nzType="down"></i>
      </span>
    </ng-container>

    <ng-template #noMenuTpl>
      <span class="ant-breadcrumb-link">
        <ng-content></ng-content>
      </span>
    </ng-template>

    <span class="ant-breadcrumb-separator" *ngIf="nzBreadCrumbComponent.nzSeparator">
      <ng-container *nzStringTemplateOutlet="nzBreadCrumbComponent.nzSeparator">
        {{ nzBreadCrumbComponent.nzSeparator }}
      </ng-container>
    </span>
  `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i4.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i5.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBreadCrumbItemComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-breadcrumb-item',
                    exportAs: 'nzBreadcrumbItem',
                    preserveWhitespaces: false,
                    template: `
    <ng-container *ngIf="!!nzOverlay; else noMenuTpl">
      <span class="ant-breadcrumb-overlay-link" nz-dropdown [nzDropdownMenu]="nzOverlay">
        <ng-template [ngTemplateOutlet]="noMenuTpl"></ng-template>
        <i *ngIf="!!nzOverlay" nz-icon nzType="down"></i>
      </span>
    </ng-container>

    <ng-template #noMenuTpl>
      <span class="ant-breadcrumb-link">
        <ng-content></ng-content>
      </span>
    </ng-template>

    <span class="ant-breadcrumb-separator" *ngIf="nzBreadCrumbComponent.nzSeparator">
      <ng-container *nzStringTemplateOutlet="nzBreadCrumbComponent.nzSeparator">
        {{ nzBreadCrumbComponent.nzSeparator }}
      </ng-container>
    </span>
  `
                }]
        }], ctorParameters: function () { return [{ type: i1.NzBreadcrumb }]; }, propDecorators: { nzOverlay: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWRjcnVtYi1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvYnJlYWRjcnVtYi9icmVhZGNydW1iLWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7O0FBaUM3RixNQUFNLE9BQU8seUJBQXlCO0lBTXBDLFlBQW1CLHFCQUFtQztRQUFuQywwQkFBcUIsR0FBckIscUJBQXFCLENBQWM7SUFBRyxDQUFDOztzSEFOL0MseUJBQXlCOzBHQUF6Qix5QkFBeUIsOEhBckIxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CVDsyRkFFVSx5QkFBeUI7a0JBM0JyQyxTQUFTO21CQUFDO29CQUNULGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJUO2lCQUNGO21HQUtVLFNBQVM7c0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpEcm9wZG93bk1lbnVDb21wb25lbnQgfSBmcm9tICduZy16b3Jyby1hbnRkL2Ryb3Bkb3duJztcblxuaW1wb3J0IHsgTnpCcmVhZGNydW1iIH0gZnJvbSAnLi9icmVhZGNydW1iJztcblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvcjogJ256LWJyZWFkY3J1bWItaXRlbScsXG4gIGV4cG9ydEFzOiAnbnpCcmVhZGNydW1iSXRlbScsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhIW56T3ZlcmxheTsgZWxzZSBub01lbnVUcGxcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYW50LWJyZWFkY3J1bWItb3ZlcmxheS1saW5rXCIgbnotZHJvcGRvd24gW256RHJvcGRvd25NZW51XT1cIm56T3ZlcmxheVwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibm9NZW51VHBsXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPGkgKm5nSWY9XCIhIW56T3ZlcmxheVwiIG56LWljb24gbnpUeXBlPVwiZG93blwiPjwvaT5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDxuZy10ZW1wbGF0ZSAjbm9NZW51VHBsPlxuICAgICAgPHNwYW4gY2xhc3M9XCJhbnQtYnJlYWRjcnVtYi1saW5rXCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJhbnQtYnJlYWRjcnVtYi1zZXBhcmF0b3JcIiAqbmdJZj1cIm56QnJlYWRDcnVtYkNvbXBvbmVudC5uelNlcGFyYXRvclwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56QnJlYWRDcnVtYkNvbXBvbmVudC5uelNlcGFyYXRvclwiPlxuICAgICAgICB7eyBuekJyZWFkQ3J1bWJDb21wb25lbnQubnpTZXBhcmF0b3IgfX1cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvc3Bhbj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOekJyZWFkQ3J1bWJJdGVtQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIERyb3Bkb3duIGNvbnRlbnQgb2YgYSBicmVhZGNydW1iIGl0ZW0uXG4gICAqL1xuICBASW5wdXQoKSBuek92ZXJsYXk/OiBOekRyb3Bkb3duTWVudUNvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbnpCcmVhZENydW1iQ29tcG9uZW50OiBOekJyZWFkY3J1bWIpIHt9XG59XG4iXX0=