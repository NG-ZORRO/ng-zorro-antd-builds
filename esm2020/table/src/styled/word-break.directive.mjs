import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Input } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
export class NzCellBreakWordDirective {
    constructor() {
        this.nzBreakWord = true;
    }
}
NzCellBreakWordDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCellBreakWordDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzCellBreakWordDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzCellBreakWordDirective, selector: "th[nzBreakWord],td[nzBreakWord]", inputs: { nzBreakWord: "nzBreakWord" }, host: { properties: { "style.word-break": "nzBreakWord ? 'break-all' : ''" } }, ngImport: i0 });
__decorate([
    InputBoolean()
], NzCellBreakWordDirective.prototype, "nzBreakWord", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCellBreakWordDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'th[nzBreakWord],td[nzBreakWord]',
                    host: {
                        '[style.word-break]': `nzBreakWord ? 'break-all' : ''`
                    }
                }]
        }], propDecorators: { nzBreakWord: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yZC1icmVhay5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb21wb25lbnRzL3RhYmxlL3NyYy9zdHlsZWQvd29yZC1icmVhay5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFRdkQsTUFBTSxPQUFPLHdCQUF3QjtJQU5yQztRQVMyQixnQkFBVyxHQUFHLElBQUksQ0FBQztLQUM3Qzs7cUhBSlksd0JBQXdCO3lHQUF4Qix3QkFBd0I7QUFHVjtJQUFmLFlBQVksRUFBRTs2REFBb0I7MkZBSGpDLHdCQUF3QjtrQkFOcEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUNBQWlDO29CQUMzQyxJQUFJLEVBQUU7d0JBQ0osb0JBQW9CLEVBQUUsZ0NBQWdDO3FCQUN2RDtpQkFDRjs4QkFJMEIsV0FBVztzQkFBbkMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhbbnpCcmVha1dvcmRdLHRkW256QnJlYWtXb3JkXScsXG4gIGhvc3Q6IHtcbiAgICAnW3N0eWxlLndvcmQtYnJlYWtdJzogYG56QnJlYWtXb3JkID8gJ2JyZWFrLWFsbCcgOiAnJ2BcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekNlbGxCcmVha1dvcmREaXJlY3RpdmUge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpCcmVha1dvcmQ6IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpCcmVha1dvcmQgPSB0cnVlO1xufVxuIl19