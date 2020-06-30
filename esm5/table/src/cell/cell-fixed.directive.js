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
var NzCellFixedDirective = /** @class */ (function () {
    function NzCellFixedDirective(renderer, elementRef) {
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
    NzCellFixedDirective.prototype.setAutoLeftWidth = /**
     * @param {?} autoLeft
     * @return {?}
     */
    function (autoLeft) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'left', autoLeft);
    };
    /**
     * @param {?} autoRight
     * @return {?}
     */
    NzCellFixedDirective.prototype.setAutoRightWidth = /**
     * @param {?} autoRight
     * @return {?}
     */
    function (autoRight) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'right', autoRight);
    };
    /**
     * @param {?} isFirstRight
     * @return {?}
     */
    NzCellFixedDirective.prototype.setIsFirstRight = /**
     * @param {?} isFirstRight
     * @return {?}
     */
    function (isFirstRight) {
        this.setFixClass(isFirstRight, 'ant-table-cell-fix-right-first');
    };
    /**
     * @param {?} isLastLeft
     * @return {?}
     */
    NzCellFixedDirective.prototype.setIsLastLeft = /**
     * @param {?} isLastLeft
     * @return {?}
     */
    function (isLastLeft) {
        this.setFixClass(isLastLeft, 'ant-table-cell-fix-left-last');
    };
    /**
     * @private
     * @param {?} flag
     * @param {?} className
     * @return {?}
     */
    NzCellFixedDirective.prototype.setFixClass = /**
     * @private
     * @param {?} flag
     * @param {?} className
     * @return {?}
     */
    function (flag, className) {
        // the setFixClass function may call many times, so remove it first.
        this.renderer.removeClass(this.elementRef.nativeElement, className);
        if (flag) {
            this.renderer.addClass(this.elementRef.nativeElement, className);
        }
    };
    /**
     * @return {?}
     */
    NzCellFixedDirective.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.setIsFirstRight(false);
        this.setIsLastLeft(false);
        this.isAutoLeft = this.nzLeft === '' || this.nzLeft === true;
        this.isAutoRight = this.nzRight === '' || this.nzRight === true;
        this.isFixedLeft = this.nzLeft !== false;
        this.isFixedRight = this.nzRight !== false;
        this.isFixed = this.isFixedLeft || this.isFixedRight;
        /** @type {?} */
        var validatePx = (/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
    };
    NzCellFixedDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'td[nzRight],th[nzRight],td[nzLeft],th[nzLeft]',
                    host: {
                        '[class.ant-table-cell-fix-right]': "isFixedRight",
                        '[class.ant-table-cell-fix-left]': "isFixedLeft",
                        '[style.position]': "isFixed? 'sticky' : null"
                    }
                },] }
    ];
    /** @nocollapse */
    NzCellFixedDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    NzCellFixedDirective.propDecorators = {
        nzRight: [{ type: Input }],
        nzLeft: [{ type: Input }],
        colspan: [{ type: Input }]
    };
    return NzCellFixedDirective;
}());
export { NzCellFixedDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1maXhlZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkL3RhYmxlLyIsInNvdXJjZXMiOlsic3JjL2NlbGwvY2VsbC1maXhlZC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CO0lBNENFLDhCQUFvQixRQUFtQixFQUFVLFVBQXNCO1FBQW5ELGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBbkM5RCxZQUFPLEdBQXFCLEtBQUssQ0FBQztRQUNsQyxXQUFNLEdBQXFCLEtBQUssQ0FBQztRQUNqQyxZQUFPLEdBQWtCLElBQUksQ0FBQztRQUN2QyxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUMvQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLFlBQU8sR0FBRyxLQUFLLENBQUM7SUEyQjBELENBQUM7Ozs7O0lBekIzRSwrQ0FBZ0I7Ozs7SUFBaEIsVUFBaUIsUUFBdUI7UUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzFFLENBQUM7Ozs7O0lBRUQsZ0RBQWlCOzs7O0lBQWpCLFVBQWtCLFNBQXdCO1FBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM1RSxDQUFDOzs7OztJQUVELDhDQUFlOzs7O0lBQWYsVUFBZ0IsWUFBcUI7UUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQztJQUNuRSxDQUFDOzs7OztJQUVELDRDQUFhOzs7O0lBQWIsVUFBYyxVQUFtQjtRQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Ozs7Ozs7SUFFTywwQ0FBVzs7Ozs7O0lBQW5CLFVBQW9CLElBQWEsRUFBRSxTQUFpQjtRQUNsRCxvRUFBb0U7UUFDcEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFcEUsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNsRTtJQUNILENBQUM7Ozs7SUFJRCwwQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxLQUFLLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQztRQUM3RCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDO1FBQ2hFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUM7UUFDekMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxLQUFLLEtBQUssQ0FBQztRQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQzs7WUFDL0MsVUFBVTs7OztRQUFHLFVBQUMsS0FBdUI7WUFDekMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtnQkFDN0MsT0FBTyxLQUFLLENBQUM7YUFDZDtpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQzthQUNiO1FBQ0gsQ0FBQyxDQUFBO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7Z0JBaEVGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsK0NBQStDO29CQUN6RCxJQUFJLEVBQUU7d0JBQ0osa0NBQWtDLEVBQUUsY0FBYzt3QkFDbEQsaUNBQWlDLEVBQUUsYUFBYTt3QkFDaEQsa0JBQWtCLEVBQUUsMEJBQTBCO3FCQUMvQztpQkFDRjs7OztnQkFWaUQsU0FBUztnQkFBdkMsVUFBVTs7OzBCQVkzQixLQUFLO3lCQUNMLEtBQUs7MEJBQ0wsS0FBSzs7SUFzRFIsMkJBQUM7Q0FBQSxBQWpFRCxJQWlFQztTQXpEWSxvQkFBb0I7OztJQUMvQix1Q0FBMkM7O0lBQzNDLHNDQUEwQzs7SUFDMUMsdUNBQXVDOztJQUN2Qyx3Q0FBK0I7O0lBQy9CLDBDQUFtQjs7SUFDbkIsMkNBQW9COztJQUNwQiwyQ0FBb0I7O0lBQ3BCLDRDQUFxQjs7SUFDckIsdUNBQWdCOzs7OztJQTJCSix3Q0FBMkI7Ozs7O0lBQUUsMENBQThCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGRbbnpSaWdodF0sdGhbbnpSaWdodF0sdGRbbnpMZWZ0XSx0aFtuekxlZnRdJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LXRhYmxlLWNlbGwtZml4LXJpZ2h0XSc6IGBpc0ZpeGVkUmlnaHRgLFxuICAgICdbY2xhc3MuYW50LXRhYmxlLWNlbGwtZml4LWxlZnRdJzogYGlzRml4ZWRMZWZ0YCxcbiAgICAnW3N0eWxlLnBvc2l0aW9uXSc6IGBpc0ZpeGVkPyAnc3RpY2t5JyA6IG51bGxgXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpDZWxsRml4ZWREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBuelJpZ2h0OiBzdHJpbmcgfCBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56TGVmdDogc3RyaW5nIHwgYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBjb2xzcGFuOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgY2hhbmdlcyQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBpc0F1dG9MZWZ0ID0gZmFsc2U7XG4gIGlzQXV0b1JpZ2h0ID0gZmFsc2U7XG4gIGlzRml4ZWRMZWZ0ID0gZmFsc2U7XG4gIGlzRml4ZWRSaWdodCA9IGZhbHNlO1xuICBpc0ZpeGVkID0gZmFsc2U7XG5cbiAgc2V0QXV0b0xlZnRXaWR0aChhdXRvTGVmdDogc3RyaW5nIHwgbnVsbCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgYXV0b0xlZnQpO1xuICB9XG5cbiAgc2V0QXV0b1JpZ2h0V2lkdGgoYXV0b1JpZ2h0OiBzdHJpbmcgfCBudWxsKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3JpZ2h0JywgYXV0b1JpZ2h0KTtcbiAgfVxuXG4gIHNldElzRmlyc3RSaWdodChpc0ZpcnN0UmlnaHQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnNldEZpeENsYXNzKGlzRmlyc3RSaWdodCwgJ2FudC10YWJsZS1jZWxsLWZpeC1yaWdodC1maXJzdCcpO1xuICB9XG5cbiAgc2V0SXNMYXN0TGVmdChpc0xhc3RMZWZ0OiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5zZXRGaXhDbGFzcyhpc0xhc3RMZWZ0LCAnYW50LXRhYmxlLWNlbGwtZml4LWxlZnQtbGFzdCcpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRGaXhDbGFzcyhmbGFnOiBib29sZWFuLCBjbGFzc05hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIC8vIHRoZSBzZXRGaXhDbGFzcyBmdW5jdGlvbiBtYXkgY2FsbCBtYW55IHRpbWVzLCBzbyByZW1vdmUgaXQgZmlyc3QuXG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgY2xhc3NOYW1lKTtcblxuICAgIGlmIChmbGFnKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBjbGFzc05hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxuXG4gIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0SXNGaXJzdFJpZ2h0KGZhbHNlKTtcbiAgICB0aGlzLnNldElzTGFzdExlZnQoZmFsc2UpO1xuICAgIHRoaXMuaXNBdXRvTGVmdCA9IHRoaXMubnpMZWZ0ID09PSAnJyB8fCB0aGlzLm56TGVmdCA9PT0gdHJ1ZTtcbiAgICB0aGlzLmlzQXV0b1JpZ2h0ID0gdGhpcy5uelJpZ2h0ID09PSAnJyB8fCB0aGlzLm56UmlnaHQgPT09IHRydWU7XG4gICAgdGhpcy5pc0ZpeGVkTGVmdCA9IHRoaXMubnpMZWZ0ICE9PSBmYWxzZTtcbiAgICB0aGlzLmlzRml4ZWRSaWdodCA9IHRoaXMubnpSaWdodCAhPT0gZmFsc2U7XG4gICAgdGhpcy5pc0ZpeGVkID0gdGhpcy5pc0ZpeGVkTGVmdCB8fCB0aGlzLmlzRml4ZWRSaWdodDtcbiAgICBjb25zdCB2YWxpZGF0ZVB4ID0gKHZhbHVlOiBzdHJpbmcgfCBib29sZWFuKTogc3RyaW5nIHwgbnVsbCA9PiB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLnNldEF1dG9MZWZ0V2lkdGgodmFsaWRhdGVQeCh0aGlzLm56TGVmdCkpO1xuICAgIHRoaXMuc2V0QXV0b1JpZ2h0V2lkdGgodmFsaWRhdGVQeCh0aGlzLm56UmlnaHQpKTtcbiAgICB0aGlzLmNoYW5nZXMkLm5leHQoKTtcbiAgfVxufVxuIl19