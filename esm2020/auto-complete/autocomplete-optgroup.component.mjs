/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/outlet";
export class NzAutocompleteOptgroupComponent {
    constructor() { }
}
NzAutocompleteOptgroupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAutocompleteOptgroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzAutocompleteOptgroupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzAutocompleteOptgroupComponent, selector: "nz-auto-optgroup", inputs: { nzLabel: "nzLabel" }, exportAs: ["nzAutoOptgroup"], ngImport: i0, template: `
    <div class="ant-select-item ant-select-item-group">
      <ng-container *nzStringTemplateOutlet="nzLabel">{{ nzLabel }}</ng-container>
    </div>
    <ng-content select="nz-auto-option"></ng-content>
  `, isInline: true, directives: [{ type: i1.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAutocompleteOptgroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-auto-optgroup',
                    exportAs: 'nzAutoOptgroup',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <div class="ant-select-item ant-select-item-group">
      <ng-container *nzStringTemplateOutlet="nzLabel">{{ nzLabel }}</ng-container>
    </div>
    <ng-content select="nz-auto-option"></ng-content>
  `
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { nzLabel: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLW9wdGdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvYXV0by1jb21wbGV0ZS9hdXRvY29tcGxldGUtb3B0Z3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFlLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFlMUcsTUFBTSxPQUFPLCtCQUErQjtJQUcxQyxnQkFBZSxDQUFDOzs0SEFITCwrQkFBK0I7Z0hBQS9CLCtCQUErQixzSEFQaEM7Ozs7O0dBS1Q7MkZBRVUsK0JBQStCO2tCQWIzQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFOzs7OztHQUtUO2lCQUNGOzBFQUVVLE9BQU87c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotYXV0by1vcHRncm91cCcsXG4gIGV4cG9ydEFzOiAnbnpBdXRvT3B0Z3JvdXAnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFudC1zZWxlY3QtaXRlbSBhbnQtc2VsZWN0LWl0ZW0tZ3JvdXBcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuekxhYmVsXCI+e3sgbnpMYWJlbCB9fTwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm56LWF1dG8tb3B0aW9uXCI+PC9uZy1jb250ZW50PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56QXV0b2NvbXBsZXRlT3B0Z3JvdXBDb21wb25lbnQge1xuICBASW5wdXQoKSBuekxhYmVsPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG5cbiAgY29uc3RydWN0b3IoKSB7fVxufVxuIl19