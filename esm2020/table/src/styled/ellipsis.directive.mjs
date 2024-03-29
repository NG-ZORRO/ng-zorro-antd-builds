import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Input } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
export class NzCellEllipsisDirective {
    constructor() {
        this.nzEllipsis = true;
    }
}
NzCellEllipsisDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCellEllipsisDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzCellEllipsisDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzCellEllipsisDirective, selector: "th[nzEllipsis],td[nzEllipsis]", inputs: { nzEllipsis: "nzEllipsis" }, host: { properties: { "class.ant-table-cell-ellipsis": "nzEllipsis" } }, ngImport: i0 });
__decorate([
    InputBoolean()
], NzCellEllipsisDirective.prototype, "nzEllipsis", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCellEllipsisDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'th[nzEllipsis],td[nzEllipsis]',
                    host: {
                        '[class.ant-table-cell-ellipsis]': 'nzEllipsis'
                    }
                }]
        }], propDecorators: { nzEllipsis: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxsaXBzaXMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50cy90YWJsZS9zcmMvc3R5bGVkL2VsbGlwc2lzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDOztBQVF2RCxNQUFNLE9BQU8sdUJBQXVCO0lBTnBDO1FBUzJCLGVBQVUsR0FBRyxJQUFJLENBQUM7S0FDNUM7O29IQUpZLHVCQUF1Qjt3R0FBdkIsdUJBQXVCO0FBR1Q7SUFBZixZQUFZLEVBQUU7MkRBQW1COzJGQUhoQyx1QkFBdUI7a0JBTm5DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLCtCQUErQjtvQkFDekMsSUFBSSxFQUFFO3dCQUNKLGlDQUFpQyxFQUFFLFlBQVk7cUJBQ2hEO2lCQUNGOzhCQUkwQixVQUFVO3NCQUFsQyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aFtuekVsbGlwc2lzXSx0ZFtuekVsbGlwc2lzXScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC10YWJsZS1jZWxsLWVsbGlwc2lzXSc6ICduekVsbGlwc2lzJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56Q2VsbEVsbGlwc2lzRGlyZWN0aXZlIHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RWxsaXBzaXM6IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpFbGxpcHNpcyA9IHRydWU7XG59XG4iXX0=