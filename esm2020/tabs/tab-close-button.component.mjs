/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/outlet";
import * as i2 from "ng-zorro-antd/icon";
export class NzTabCloseButtonComponent {
    constructor() {
        this.closeIcon = 'close';
    }
}
NzTabCloseButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTabCloseButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzTabCloseButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTabCloseButtonComponent, selector: "nz-tab-close-button, button[nz-tab-close-button]", inputs: { closeIcon: "closeIcon" }, host: { attributes: { "aria-label": "Close tab", "type": "button" }, classAttribute: "ant-tabs-tab-remove" }, ngImport: i0, template: `
    <ng-container *nzStringTemplateOutlet="closeIcon; let icon">
      <i nz-icon [nzType]="icon" nzTheme="outline"></i>
    </ng-container>
  `, isInline: true, directives: [{ type: i1.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i2.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTabCloseButtonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tab-close-button, button[nz-tab-close-button]',
                    template: `
    <ng-container *nzStringTemplateOutlet="closeIcon; let icon">
      <i nz-icon [nzType]="icon" nzTheme="outline"></i>
    </ng-container>
  `,
                    host: {
                        class: 'ant-tabs-tab-remove',
                        'aria-label': 'Close tab',
                        type: 'button'
                    }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { closeIcon: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWNsb3NlLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3RhYnMvdGFiLWNsb3NlLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWUsTUFBTSxlQUFlLENBQUM7Ozs7QUFpQjlELE1BQU0sT0FBTyx5QkFBeUI7SUFHcEM7UUFGUyxjQUFTLEdBQW9DLE9BQU8sQ0FBQztJQUUvQyxDQUFDOztzSEFITCx5QkFBeUI7MEdBQXpCLHlCQUF5QiwwT0FYMUI7Ozs7R0FJVDsyRkFPVSx5QkFBeUI7a0JBYnJDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGtEQUFrRDtvQkFDNUQsUUFBUSxFQUFFOzs7O0dBSVQ7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxxQkFBcUI7d0JBQzVCLFlBQVksRUFBRSxXQUFXO3dCQUN6QixJQUFJLEVBQUUsUUFBUTtxQkFDZjtpQkFDRjswRUFFVSxTQUFTO3NCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdGFiLWNsb3NlLWJ1dHRvbiwgYnV0dG9uW256LXRhYi1jbG9zZS1idXR0b25dJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwiY2xvc2VJY29uOyBsZXQgaWNvblwiPlxuICAgICAgPGkgbnotaWNvbiBbbnpUeXBlXT1cImljb25cIiBuelRoZW1lPVwib3V0bGluZVwiPjwvaT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LXRhYnMtdGFiLXJlbW92ZScsXG4gICAgJ2FyaWEtbGFiZWwnOiAnQ2xvc2UgdGFiJyxcbiAgICB0eXBlOiAnYnV0dG9uJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VGFiQ2xvc2VCdXR0b25Db21wb25lbnQge1xuICBASW5wdXQoKSBjbG9zZUljb246IHN0cmluZyB8IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gPSAnY2xvc2UnO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cbn1cbiJdfQ==