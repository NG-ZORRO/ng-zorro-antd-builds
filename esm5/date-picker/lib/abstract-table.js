/**
 * @fileoverview added by tsickle
 * Generated from: lib/abstract-table.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { EventEmitter, Input, Output } from '@angular/core';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { isNonEmptyString, isTemplateRef } from 'ng-zorro-antd/core/util';
/**
 * @abstract
 */
var AbstractTable = /** @class */ (function () {
    function AbstractTable() {
        this.isTemplateRef = isTemplateRef;
        this.isNonEmptyString = isNonEmptyString;
        this.headRow = [];
        this.bodyRows = [];
        this.MAX_ROW = 6;
        this.MAX_COL = 7;
        this.prefixCls = 'ant-picker';
        this.activeDate = new CandyDate();
        this.showWeek = false;
        this.valueChange = new EventEmitter();
    }
    /**
     * @protected
     * @return {?}
     */
    AbstractTable.prototype.render = /**
     * @protected
     * @return {?}
     */
    function () {
        if (this.activeDate) {
            this.headRow = this.makeHeadRow();
            this.bodyRows = this.makeBodyRows();
        }
    };
    /**
     * @param {?} _index
     * @param {?} item
     * @return {?}
     */
    AbstractTable.prototype.trackByBodyRow = /**
     * @param {?} _index
     * @param {?} item
     * @return {?}
     */
    function (_index, item) {
        return item;
    };
    // Item usually is an object, so trackby has no use by default.
    // Item usually is an object, so trackby has no use by default.
    /**
     * @param {?} _index
     * @param {?} item
     * @return {?}
     */
    AbstractTable.prototype.trackByBodyColumn = 
    // Item usually is an object, so trackby has no use by default.
    /**
     * @param {?} _index
     * @param {?} item
     * @return {?}
     */
    function (_index, item) {
        return item;
    };
    /**
     * @return {?}
     */
    AbstractTable.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.render();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    AbstractTable.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.activeDate && !changes.activeDate.currentValue) {
            this.activeDate = new CandyDate();
        }
    };
    AbstractTable.propDecorators = {
        prefixCls: [{ type: Input }],
        value: [{ type: Input }],
        activeDate: [{ type: Input }],
        showWeek: [{ type: Input }],
        disabledDate: [{ type: Input }],
        cellRender: [{ type: Input }],
        fullCellRender: [{ type: Input }],
        valueChange: [{ type: Output }]
    };
    return AbstractTable;
}());
export { AbstractTable };
if (false) {
    /** @type {?} */
    AbstractTable.prototype.isTemplateRef;
    /** @type {?} */
    AbstractTable.prototype.isNonEmptyString;
    /** @type {?} */
    AbstractTable.prototype.headRow;
    /** @type {?} */
    AbstractTable.prototype.bodyRows;
    /** @type {?} */
    AbstractTable.prototype.MAX_ROW;
    /** @type {?} */
    AbstractTable.prototype.MAX_COL;
    /** @type {?} */
    AbstractTable.prototype.prefixCls;
    /** @type {?} */
    AbstractTable.prototype.value;
    /** @type {?} */
    AbstractTable.prototype.activeDate;
    /** @type {?} */
    AbstractTable.prototype.showWeek;
    /** @type {?} */
    AbstractTable.prototype.disabledDate;
    /** @type {?} */
    AbstractTable.prototype.cellRender;
    /** @type {?} */
    AbstractTable.prototype.fullCellRender;
    /** @type {?} */
    AbstractTable.prototype.valueChange;
    /**
     * @abstract
     * @return {?}
     */
    AbstractTable.prototype.makeHeadRow = function () { };
    /**
     * @abstract
     * @return {?}
     */
    AbstractTable.prototype.makeBodyRows = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtdGFibGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkL2RhdGUtcGlja2VyLyIsInNvdXJjZXMiOlsibGliL2Fic3RyYWN0LXRhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQThCLE1BQU0sZUFBZSxDQUFDO0FBQzNHLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7QUFHMUU7SUFBQTtRQUNFLGtCQUFhLEdBQUcsYUFBYSxDQUFDO1FBQzlCLHFCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3BDLFlBQU8sR0FBZSxFQUFFLENBQUM7UUFDekIsYUFBUSxHQUFrQixFQUFFLENBQUM7UUFDN0IsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFFSCxjQUFTLEdBQVcsWUFBWSxDQUFDO1FBRWpDLGVBQVUsR0FBYyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQ3hDLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFLaEIsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBYSxDQUFDO0lBOEJqRSxDQUFDOzs7OztJQTVCVyw4QkFBTTs7OztJQUFoQjtRQUNFLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQztJQUNILENBQUM7Ozs7OztJQUVELHNDQUFjOzs7OztJQUFkLFVBQWUsTUFBYyxFQUFFLElBQWlCO1FBQzlDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELCtEQUErRDs7Ozs7OztJQUMvRCx5Q0FBaUI7Ozs7Ozs7SUFBakIsVUFBa0IsTUFBYyxFQUFFLElBQWM7UUFDOUMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7O0lBS0QsZ0NBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7Ozs7O0lBRUQsbUNBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLFVBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFO1lBQzFELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztTQUNuQztJQUNILENBQUM7OzRCQXJDQSxLQUFLO3dCQUNMLEtBQUs7NkJBQ0wsS0FBSzsyQkFDTCxLQUFLOytCQUNMLEtBQUs7NkJBQ0wsS0FBSztpQ0FDTCxLQUFLOzhCQUVMLE1BQU07O0lBOEJULG9CQUFDO0NBQUEsQUE5Q0QsSUE4Q0M7U0E5Q3FCLGFBQWE7OztJQUNqQyxzQ0FBOEI7O0lBQzlCLHlDQUFvQzs7SUFDcEMsZ0NBQXlCOztJQUN6QixpQ0FBNkI7O0lBQzdCLGdDQUFZOztJQUNaLGdDQUFZOztJQUVaLGtDQUEwQzs7SUFDMUMsOEJBQTJCOztJQUMzQixtQ0FBaUQ7O0lBQ2pELGlDQUFtQzs7SUFDbkMscUNBQTZDOztJQUM3QyxtQ0FBNEY7O0lBQzVGLHVDQUFnRzs7SUFFaEcsb0NBQStEOzs7OztJQWtCL0Qsc0RBQW1DOzs7OztJQUNuQyx1REFBdUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuZHlEYXRlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3RpbWUnO1xuaW1wb3J0IHsgRnVuY3Rpb25Qcm9wLCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgaXNOb25FbXB0eVN0cmluZywgaXNUZW1wbGF0ZVJlZiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IERhdGVCb2R5Um93LCBEYXRlQ2VsbCB9IGZyb20gJy4vaW50ZXJmYWNlJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0VGFibGUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIGlzVGVtcGxhdGVSZWYgPSBpc1RlbXBsYXRlUmVmO1xuICBpc05vbkVtcHR5U3RyaW5nID0gaXNOb25FbXB0eVN0cmluZztcbiAgaGVhZFJvdzogRGF0ZUNlbGxbXSA9IFtdO1xuICBib2R5Um93czogRGF0ZUJvZHlSb3dbXSA9IFtdO1xuICBNQVhfUk9XID0gNjtcbiAgTUFYX0NPTCA9IDc7XG5cbiAgQElucHV0KCkgcHJlZml4Q2xzOiBzdHJpbmcgPSAnYW50LXBpY2tlcic7XG4gIEBJbnB1dCgpIHZhbHVlITogQ2FuZHlEYXRlO1xuICBASW5wdXQoKSBhY3RpdmVEYXRlOiBDYW5keURhdGUgPSBuZXcgQ2FuZHlEYXRlKCk7XG4gIEBJbnB1dCgpIHNob3dXZWVrOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRpc2FibGVkRGF0ZT86IChkOiBEYXRlKSA9PiBib29sZWFuO1xuICBASW5wdXQoKSBjZWxsUmVuZGVyPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8RGF0ZT4gfCBGdW5jdGlvblByb3A8VGVtcGxhdGVSZWY8RGF0ZT4gfCBzdHJpbmc+O1xuICBASW5wdXQoKSBmdWxsQ2VsbFJlbmRlcj86IHN0cmluZyB8IFRlbXBsYXRlUmVmPERhdGU+IHwgRnVuY3Rpb25Qcm9wPFRlbXBsYXRlUmVmPERhdGU+IHwgc3RyaW5nPjtcblxuICBAT3V0cHV0KCkgcmVhZG9ubHkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENhbmR5RGF0ZT4oKTtcblxuICBwcm90ZWN0ZWQgcmVuZGVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFjdGl2ZURhdGUpIHtcbiAgICAgIHRoaXMuaGVhZFJvdyA9IHRoaXMubWFrZUhlYWRSb3coKTtcbiAgICAgIHRoaXMuYm9keVJvd3MgPSB0aGlzLm1ha2VCb2R5Um93cygpO1xuICAgIH1cbiAgfVxuXG4gIHRyYWNrQnlCb2R5Um93KF9pbmRleDogbnVtYmVyLCBpdGVtOiBEYXRlQm9keVJvdyk6IE56U2FmZUFueSB7XG4gICAgcmV0dXJuIGl0ZW07XG4gIH1cblxuICAvLyBJdGVtIHVzdWFsbHkgaXMgYW4gb2JqZWN0LCBzbyB0cmFja2J5IGhhcyBubyB1c2UgYnkgZGVmYXVsdC5cbiAgdHJhY2tCeUJvZHlDb2x1bW4oX2luZGV4OiBudW1iZXIsIGl0ZW06IERhdGVDZWxsKTogTnpTYWZlQW55IHtcbiAgICByZXR1cm4gaXRlbTtcbiAgfVxuXG4gIGFic3RyYWN0IG1ha2VIZWFkUm93KCk6IERhdGVDZWxsW107XG4gIGFic3RyYWN0IG1ha2VCb2R5Um93cygpOiBEYXRlQm9keVJvd1tdO1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMuYWN0aXZlRGF0ZSAmJiAhY2hhbmdlcy5hY3RpdmVEYXRlLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5hY3RpdmVEYXRlID0gbmV3IENhbmR5RGF0ZSgpO1xuICAgIH1cbiAgfVxufVxuIl19