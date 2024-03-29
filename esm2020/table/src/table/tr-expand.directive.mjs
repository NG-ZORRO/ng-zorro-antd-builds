/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class NzTrExpandDirective {
    constructor() {
        this.nzExpand = true;
    }
}
NzTrExpandDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTrExpandDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzTrExpandDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTrExpandDirective, selector: "tr[nzExpand]", inputs: { nzExpand: "nzExpand" }, host: { properties: { "hidden": "!nzExpand" }, classAttribute: "ant-table-expanded-row" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTrExpandDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'tr[nzExpand]',
                    host: {
                        class: 'ant-table-expanded-row',
                        '[hidden]': `!nzExpand`
                    }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { nzExpand: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHItZXhwYW5kLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NvbXBvbmVudHMvdGFibGUvc3JjL3RhYmxlL3RyLWV4cGFuZC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBU2pELE1BQU0sT0FBTyxtQkFBbUI7SUFHOUI7UUFGUyxhQUFRLEdBQUcsSUFBSSxDQUFDO0lBRVYsQ0FBQzs7Z0hBSEwsbUJBQW1CO29HQUFuQixtQkFBbUI7MkZBQW5CLG1CQUFtQjtrQkFQL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSx3QkFBd0I7d0JBQy9CLFVBQVUsRUFBRSxXQUFXO3FCQUN4QjtpQkFDRjswRUFFVSxRQUFRO3NCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0cltuekV4cGFuZF0nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtdGFibGUtZXhwYW5kZWQtcm93JyxcbiAgICAnW2hpZGRlbl0nOiBgIW56RXhwYW5kYFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VHJFeHBhbmREaXJlY3RpdmUge1xuICBASW5wdXQoKSBuekV4cGFuZCA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxufVxuIl19