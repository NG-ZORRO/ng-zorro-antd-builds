import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Input } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
export class NzCardGridDirective {
    constructor() {
        this.nzHoverable = true;
    }
}
NzCardGridDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCardGridDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzCardGridDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzCardGridDirective, selector: "[nz-card-grid]", inputs: { nzHoverable: "nzHoverable" }, host: { properties: { "class.ant-card-hoverable": "nzHoverable" }, classAttribute: "ant-card-grid" }, exportAs: ["nzCardGrid"], ngImport: i0 });
__decorate([
    InputBoolean()
], NzCardGridDirective.prototype, "nzHoverable", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCardGridDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-card-grid]',
                    exportAs: 'nzCardGrid',
                    host: {
                        class: 'ant-card-grid',
                        '[class.ant-card-hoverable]': 'nzHoverable'
                    }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { nzHoverable: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC1ncmlkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvY2FyZC9jYXJkLWdyaWQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBVXZELE1BQU0sT0FBTyxtQkFBbUI7SUFJOUI7UUFGeUIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7SUFFN0IsQ0FBQzs7Z0hBSkwsbUJBQW1CO29HQUFuQixtQkFBbUI7QUFFTDtJQUFmLFlBQVksRUFBRTt3REFBb0I7MkZBRmpDLG1CQUFtQjtrQkFSL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsWUFBWTtvQkFDdEIsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxlQUFlO3dCQUN0Qiw0QkFBNEIsRUFBRSxhQUFhO3FCQUM1QztpQkFDRjswRUFHMEIsV0FBVztzQkFBbkMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW256LWNhcmQtZ3JpZF0nLFxuICBleHBvcnRBczogJ256Q2FyZEdyaWQnLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtY2FyZC1ncmlkJyxcbiAgICAnW2NsYXNzLmFudC1jYXJkLWhvdmVyYWJsZV0nOiAnbnpIb3ZlcmFibGUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpDYXJkR3JpZERpcmVjdGl2ZSB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekhvdmVyYWJsZTogQm9vbGVhbklucHV0O1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpIb3ZlcmFibGUgPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cbn1cbiJdfQ==