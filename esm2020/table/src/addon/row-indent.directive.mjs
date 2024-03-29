/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class NzRowIndentDirective {
    constructor() {
        this.indentSize = 0;
    }
}
NzRowIndentDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRowIndentDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzRowIndentDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzRowIndentDirective, selector: "nz-row-indent", inputs: { indentSize: "indentSize" }, host: { properties: { "style.padding-left.px": "indentSize" }, classAttribute: "ant-table-row-indent" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRowIndentDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-row-indent',
                    host: {
                        class: 'ant-table-row-indent',
                        '[style.padding-left.px]': 'indentSize'
                    }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { indentSize: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWluZGVudC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb21wb25lbnRzL3RhYmxlL3NyYy9hZGRvbi9yb3ctaW5kZW50LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFTakQsTUFBTSxPQUFPLG9CQUFvQjtJQUcvQjtRQUZTLGVBQVUsR0FBRyxDQUFDLENBQUM7SUFFVCxDQUFDOztpSEFITCxvQkFBb0I7cUdBQXBCLG9CQUFvQjsyRkFBcEIsb0JBQW9CO2tCQVBoQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLHNCQUFzQjt3QkFDN0IseUJBQXlCLEVBQUUsWUFBWTtxQkFDeEM7aUJBQ0Y7MEVBRVUsVUFBVTtzQkFBbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbnotcm93LWluZGVudCcsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC10YWJsZS1yb3ctaW5kZW50JyxcbiAgICAnW3N0eWxlLnBhZGRpbmctbGVmdC5weF0nOiAnaW5kZW50U2l6ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelJvd0luZGVudERpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIGluZGVudFNpemUgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cbn1cbiJdfQ==