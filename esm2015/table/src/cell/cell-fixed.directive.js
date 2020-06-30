/**
 * @fileoverview added by tsickle
 * Generated from: src/cell/cell-fixed.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
export class NzCellFixedDirective {
    /**
     * @param {?} renderer
     * @param {?} elementRef
     */
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.nzRight = false;
        this.nzLeft = false;
        this.colspan = null;
        this.changes$ = new Subject();
        this.isAutoLeft = false;
        this.isAutoRight = false;
        this.isFixedLeft = false;
        this.isFixedRight = false;
        this.isFixed = false;
    }
    /**
     * @param {?} autoLeft
     * @return {?}
     */
    setAutoLeftWidth(autoLeft) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'left', autoLeft);
    }
    /**
     * @param {?} autoRight
     * @return {?}
     */
    setAutoRightWidth(autoRight) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'right', autoRight);
    }
    /**
     * @param {?} isFirstRight
     * @return {?}
     */
    setIsFirstRight(isFirstRight) {
        this.setFixClass(isFirstRight, 'ant-table-cell-fix-right-first');
    }
    /**
     * @param {?} isLastLeft
     * @return {?}
     */
    setIsLastLeft(isLastLeft) {
        this.setFixClass(isLastLeft, 'ant-table-cell-fix-left-last');
    }
    /**
     * @private
     * @param {?} flag
     * @param {?} className
     * @return {?}
     */
    setFixClass(flag, className) {
        // the setFixClass function may call many times, so remove it first.
        this.renderer.removeClass(this.elementRef.nativeElement, className);
        if (flag) {
            this.renderer.addClass(this.elementRef.nativeElement, className);
        }
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.setIsFirstRight(false);
        this.setIsLastLeft(false);
        this.isAutoLeft = this.nzLeft === '' || this.nzLeft === true;
        this.isAutoRight = this.nzRight === '' || this.nzRight === true;
        this.isFixedLeft = this.nzLeft !== false;
        this.isFixedRight = this.nzRight !== false;
        this.isFixed = this.isFixedLeft || this.isFixedRight;
        /** @type {?} */
        const validatePx = (/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            if (typeof value === 'string' && value !== '') {
                return value;
            }
            else {
                return null;
            }
        });
        this.setAutoLeftWidth(validatePx(this.nzLeft));
        this.setAutoRightWidth(validatePx(this.nzRight));
        this.changes$.next();
    }
}
NzCellFixedDirective.decorators = [
    { type: Directive, args: [{
                selector: 'td[nzRight],th[nzRight],td[nzLeft],th[nzLeft]',
                host: {
                    '[class.ant-table-cell-fix-right]': `isFixedRight`,
                    '[class.ant-table-cell-fix-left]': `isFixedLeft`,
                    '[style.position]': `isFixed? 'sticky' : null`
                }
            },] }
];
/** @nocollapse */
NzCellFixedDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
NzCellFixedDirective.propDecorators = {
    nzRight: [{ type: Input }],
    nzLeft: [{ type: Input }],
    colspan: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NzCellFixedDirective.prototype.nzRight;
    /** @type {?} */
    NzCellFixedDirective.prototype.nzLeft;
    /** @type {?} */
    NzCellFixedDirective.prototype.colspan;
    /** @type {?} */
    NzCellFixedDirective.prototype.changes$;
    /** @type {?} */
    NzCellFixedDirective.prototype.isAutoLeft;
    /** @type {?} */
    NzCellFixedDirective.prototype.isAutoRight;
    /** @type {?} */
    NzCellFixedDirective.prototype.isFixedLeft;
    /** @type {?} */
    NzCellFixedDirective.prototype.isFixedRight;
    /** @type {?} */
    NzCellFixedDirective.prototype.isFixed;
    /**
     * @type {?}
     * @private
     */
    NzCellFixedDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    NzCellFixedDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1maXhlZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkL3RhYmxlLyIsInNvdXJjZXMiOlsic3JjL2NlbGwvY2VsbC1maXhlZC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBVS9CLE1BQU0sT0FBTyxvQkFBb0I7Ozs7O0lBb0MvQixZQUFvQixRQUFtQixFQUFVLFVBQXNCO1FBQW5ELGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBbkM5RCxZQUFPLEdBQXFCLEtBQUssQ0FBQztRQUNsQyxXQUFNLEdBQXFCLEtBQUssQ0FBQztRQUNqQyxZQUFPLEdBQWtCLElBQUksQ0FBQztRQUN2QyxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUMvQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLFlBQU8sR0FBRyxLQUFLLENBQUM7SUEyQjBELENBQUM7Ozs7O0lBekIzRSxnQkFBZ0IsQ0FBQyxRQUF1QjtRQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDMUUsQ0FBQzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxTQUF3QjtRQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDNUUsQ0FBQzs7Ozs7SUFFRCxlQUFlLENBQUMsWUFBcUI7UUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQztJQUNuRSxDQUFDOzs7OztJQUVELGFBQWEsQ0FBQyxVQUFtQjtRQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Ozs7Ozs7SUFFTyxXQUFXLENBQUMsSUFBYSxFQUFFLFNBQWlCO1FBQ2xELG9FQUFvRTtRQUNwRSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVwRSxJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ2xFO0lBQ0gsQ0FBQzs7OztJQUlELFdBQVc7UUFDVCxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxLQUFLLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQztRQUM3RCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDO1FBQ2hFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUM7UUFDekMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxLQUFLLEtBQUssQ0FBQztRQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQzs7Y0FDL0MsVUFBVTs7OztRQUFHLENBQUMsS0FBdUIsRUFBaUIsRUFBRTtZQUM1RCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO2dCQUM3QyxPQUFPLEtBQUssQ0FBQzthQUNkO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDO2FBQ2I7UUFDSCxDQUFDLENBQUE7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7WUFoRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwrQ0FBK0M7Z0JBQ3pELElBQUksRUFBRTtvQkFDSixrQ0FBa0MsRUFBRSxjQUFjO29CQUNsRCxpQ0FBaUMsRUFBRSxhQUFhO29CQUNoRCxrQkFBa0IsRUFBRSwwQkFBMEI7aUJBQy9DO2FBQ0Y7Ozs7WUFWaUQsU0FBUztZQUF2QyxVQUFVOzs7c0JBWTNCLEtBQUs7cUJBQ0wsS0FBSztzQkFDTCxLQUFLOzs7O0lBRk4sdUNBQTJDOztJQUMzQyxzQ0FBMEM7O0lBQzFDLHVDQUF1Qzs7SUFDdkMsd0NBQStCOztJQUMvQiwwQ0FBbUI7O0lBQ25CLDJDQUFvQjs7SUFDcEIsMkNBQW9COztJQUNwQiw0Q0FBcUI7O0lBQ3JCLHVDQUFnQjs7Ozs7SUEyQkosd0NBQTJCOzs7OztJQUFFLDBDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RkW256UmlnaHRdLHRoW256UmlnaHRdLHRkW256TGVmdF0sdGhbbnpMZWZ0XScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC10YWJsZS1jZWxsLWZpeC1yaWdodF0nOiBgaXNGaXhlZFJpZ2h0YCxcbiAgICAnW2NsYXNzLmFudC10YWJsZS1jZWxsLWZpeC1sZWZ0XSc6IGBpc0ZpeGVkTGVmdGAsXG4gICAgJ1tzdHlsZS5wb3NpdGlvbl0nOiBgaXNGaXhlZD8gJ3N0aWNreScgOiBudWxsYFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56Q2VsbEZpeGVkRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgbnpSaWdodDogc3RyaW5nIHwgYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBuekxlZnQ6IHN0cmluZyB8IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgY29sc3BhbjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIGNoYW5nZXMkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgaXNBdXRvTGVmdCA9IGZhbHNlO1xuICBpc0F1dG9SaWdodCA9IGZhbHNlO1xuICBpc0ZpeGVkTGVmdCA9IGZhbHNlO1xuICBpc0ZpeGVkUmlnaHQgPSBmYWxzZTtcbiAgaXNGaXhlZCA9IGZhbHNlO1xuXG4gIHNldEF1dG9MZWZ0V2lkdGgoYXV0b0xlZnQ6IHN0cmluZyB8IG51bGwpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbGVmdCcsIGF1dG9MZWZ0KTtcbiAgfVxuXG4gIHNldEF1dG9SaWdodFdpZHRoKGF1dG9SaWdodDogc3RyaW5nIHwgbnVsbCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdyaWdodCcsIGF1dG9SaWdodCk7XG4gIH1cblxuICBzZXRJc0ZpcnN0UmlnaHQoaXNGaXJzdFJpZ2h0OiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5zZXRGaXhDbGFzcyhpc0ZpcnN0UmlnaHQsICdhbnQtdGFibGUtY2VsbC1maXgtcmlnaHQtZmlyc3QnKTtcbiAgfVxuXG4gIHNldElzTGFzdExlZnQoaXNMYXN0TGVmdDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuc2V0Rml4Q2xhc3MoaXNMYXN0TGVmdCwgJ2FudC10YWJsZS1jZWxsLWZpeC1sZWZ0LWxhc3QnKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Rml4Q2xhc3MoZmxhZzogYm9vbGVhbiwgY2xhc3NOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyB0aGUgc2V0Rml4Q2xhc3MgZnVuY3Rpb24gbWF5IGNhbGwgbWFueSB0aW1lcywgc28gcmVtb3ZlIGl0IGZpcnN0LlxuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGNsYXNzTmFtZSk7XG5cbiAgICBpZiAoZmxhZykge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgY2xhc3NOYW1lKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICB0aGlzLnNldElzRmlyc3RSaWdodChmYWxzZSk7XG4gICAgdGhpcy5zZXRJc0xhc3RMZWZ0KGZhbHNlKTtcbiAgICB0aGlzLmlzQXV0b0xlZnQgPSB0aGlzLm56TGVmdCA9PT0gJycgfHwgdGhpcy5uekxlZnQgPT09IHRydWU7XG4gICAgdGhpcy5pc0F1dG9SaWdodCA9IHRoaXMubnpSaWdodCA9PT0gJycgfHwgdGhpcy5uelJpZ2h0ID09PSB0cnVlO1xuICAgIHRoaXMuaXNGaXhlZExlZnQgPSB0aGlzLm56TGVmdCAhPT0gZmFsc2U7XG4gICAgdGhpcy5pc0ZpeGVkUmlnaHQgPSB0aGlzLm56UmlnaHQgIT09IGZhbHNlO1xuICAgIHRoaXMuaXNGaXhlZCA9IHRoaXMuaXNGaXhlZExlZnQgfHwgdGhpcy5pc0ZpeGVkUmlnaHQ7XG4gICAgY29uc3QgdmFsaWRhdGVQeCA9ICh2YWx1ZTogc3RyaW5nIHwgYm9vbGVhbik6IHN0cmluZyB8IG51bGwgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUgIT09ICcnKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5zZXRBdXRvTGVmdFdpZHRoKHZhbGlkYXRlUHgodGhpcy5uekxlZnQpKTtcbiAgICB0aGlzLnNldEF1dG9SaWdodFdpZHRoKHZhbGlkYXRlUHgodGhpcy5uelJpZ2h0KSk7XG4gICAgdGhpcy5jaGFuZ2VzJC5uZXh0KCk7XG4gIH1cbn1cbiJdfQ==