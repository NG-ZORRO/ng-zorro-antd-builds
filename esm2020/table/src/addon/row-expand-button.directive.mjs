/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
export class NzRowExpandButtonDirective {
    constructor() {
        this.expand = false;
        this.spaceMode = false;
        this.expandChange = new EventEmitter();
    }
    onHostClick() {
        if (!this.spaceMode) {
            this.expand = !this.expand;
            this.expandChange.next(this.expand);
        }
    }
}
NzRowExpandButtonDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRowExpandButtonDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzRowExpandButtonDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzRowExpandButtonDirective, selector: "button[nz-row-expand-button]", inputs: { expand: "expand", spaceMode: "spaceMode" }, outputs: { expandChange: "expandChange" }, host: { listeners: { "click": "onHostClick()" }, properties: { "type": "'button'", "class.ant-table-row-expand-icon-expanded": "!spaceMode && expand === true", "class.ant-table-row-expand-icon-collapsed": "!spaceMode && expand === false", "class.ant-table-row-expand-icon-spaced": "spaceMode" }, classAttribute: "ant-table-row-expand-icon" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRowExpandButtonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[nz-row-expand-button]',
                    host: {
                        class: 'ant-table-row-expand-icon',
                        '[type]': `'button'`,
                        '[class.ant-table-row-expand-icon-expanded]': `!spaceMode && expand === true`,
                        '[class.ant-table-row-expand-icon-collapsed]': `!spaceMode && expand === false`,
                        '[class.ant-table-row-expand-icon-spaced]': 'spaceMode',
                        '(click)': 'onHostClick()'
                    }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { expand: [{
                type: Input
            }], spaceMode: [{
                type: Input
            }], expandChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWV4cGFuZC1idXR0b24uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50cy90YWJsZS9zcmMvYWRkb24vcm93LWV4cGFuZC1idXR0b24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBYXZFLE1BQU0sT0FBTywwQkFBMEI7SUFLckM7UUFKUyxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNSLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUV0QyxDQUFDO0lBRWhCLFdBQVc7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDckM7SUFDSCxDQUFDOzt1SEFaVSwwQkFBMEI7MkdBQTFCLDBCQUEwQjsyRkFBMUIsMEJBQTBCO2tCQVh0QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw4QkFBOEI7b0JBQ3hDLElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsMkJBQTJCO3dCQUNsQyxRQUFRLEVBQUUsVUFBVTt3QkFDcEIsNENBQTRDLEVBQUUsK0JBQStCO3dCQUM3RSw2Q0FBNkMsRUFBRSxnQ0FBZ0M7d0JBQy9FLDBDQUEwQyxFQUFFLFdBQVc7d0JBQ3ZELFNBQVMsRUFBRSxlQUFlO3FCQUMzQjtpQkFDRjswRUFFVSxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDYSxZQUFZO3NCQUE5QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYnV0dG9uW256LXJvdy1leHBhbmQtYnV0dG9uXScsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC10YWJsZS1yb3ctZXhwYW5kLWljb24nLFxuICAgICdbdHlwZV0nOiBgJ2J1dHRvbidgLFxuICAgICdbY2xhc3MuYW50LXRhYmxlLXJvdy1leHBhbmQtaWNvbi1leHBhbmRlZF0nOiBgIXNwYWNlTW9kZSAmJiBleHBhbmQgPT09IHRydWVgLFxuICAgICdbY2xhc3MuYW50LXRhYmxlLXJvdy1leHBhbmQtaWNvbi1jb2xsYXBzZWRdJzogYCFzcGFjZU1vZGUgJiYgZXhwYW5kID09PSBmYWxzZWAsXG4gICAgJ1tjbGFzcy5hbnQtdGFibGUtcm93LWV4cGFuZC1pY29uLXNwYWNlZF0nOiAnc3BhY2VNb2RlJyxcbiAgICAnKGNsaWNrKSc6ICdvbkhvc3RDbGljaygpJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56Um93RXhwYW5kQnV0dG9uRGlyZWN0aXZlIHtcbiAgQElucHV0KCkgZXhwYW5kID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNwYWNlTW9kZSA9IGZhbHNlO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgZXhwYW5kQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBvbkhvc3RDbGljaygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc3BhY2VNb2RlKSB7XG4gICAgICB0aGlzLmV4cGFuZCA9ICF0aGlzLmV4cGFuZDtcbiAgICAgIHRoaXMuZXhwYW5kQ2hhbmdlLm5leHQodGhpcy5leHBhbmQpO1xuICAgIH1cbiAgfVxufVxuIl19