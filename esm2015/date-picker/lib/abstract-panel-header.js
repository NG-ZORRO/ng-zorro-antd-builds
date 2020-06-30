/**
 * @fileoverview added by tsickle
 * Generated from: lib/abstract-panel-header.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { EventEmitter, Input, Output } from '@angular/core';
import { CandyDate } from 'ng-zorro-antd/core/time';
/**
 * @abstract
 */
export class AbstractPanelHeader {
    constructor() {
        this.prefixCls = `ant-picker-header`;
        this.selectors = [];
        this.showSuperPreBtn = true;
        this.showSuperNextBtn = true;
        this.showPreBtn = true;
        this.showNextBtn = true;
        this.panelModeChange = new EventEmitter();
        this.valueChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    superPreviousTitle() {
        return this.locale.previousYear;
    }
    /**
     * @return {?}
     */
    previousTitle() {
        return this.locale.previousMonth;
    }
    /**
     * @return {?}
     */
    superNextTitle() {
        return this.locale.nextYear;
    }
    /**
     * @return {?}
     */
    nextTitle() {
        return this.locale.nextMonth;
    }
    /**
     * @return {?}
     */
    superPrevious() {
        this.changeValue(this.value.addYears(-1));
    }
    /**
     * @return {?}
     */
    superNext() {
        this.changeValue(this.value.addYears(1));
    }
    /**
     * @return {?}
     */
    previous() {
        this.changeValue(this.value.addMonths(-1));
    }
    /**
     * @return {?}
     */
    next() {
        this.changeValue(this.value.addMonths(1));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    changeValue(value) {
        if (this.value !== value) {
            this.value = value;
            this.valueChange.emit(this.value);
            this.render();
        }
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    changeMode(mode) {
        this.panelModeChange.emit(mode);
    }
    /**
     * @private
     * @return {?}
     */
    render() {
        if (this.value) {
            this.selectors = this.getSelectors();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.value) {
            this.value = new CandyDate(); // Show today by default
        }
        this.selectors = this.getSelectors();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.value || changes.locale) {
            this.render();
        }
    }
}
AbstractPanelHeader.propDecorators = {
    value: [{ type: Input }],
    locale: [{ type: Input }],
    showSuperPreBtn: [{ type: Input }],
    showSuperNextBtn: [{ type: Input }],
    showPreBtn: [{ type: Input }],
    showNextBtn: [{ type: Input }],
    panelModeChange: [{ type: Output }],
    valueChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    AbstractPanelHeader.prototype.prefixCls;
    /** @type {?} */
    AbstractPanelHeader.prototype.selectors;
    /** @type {?} */
    AbstractPanelHeader.prototype.value;
    /** @type {?} */
    AbstractPanelHeader.prototype.locale;
    /** @type {?} */
    AbstractPanelHeader.prototype.showSuperPreBtn;
    /** @type {?} */
    AbstractPanelHeader.prototype.showSuperNextBtn;
    /** @type {?} */
    AbstractPanelHeader.prototype.showPreBtn;
    /** @type {?} */
    AbstractPanelHeader.prototype.showNextBtn;
    /** @type {?} */
    AbstractPanelHeader.prototype.panelModeChange;
    /** @type {?} */
    AbstractPanelHeader.prototype.valueChange;
    /**
     * @abstract
     * @return {?}
     */
    AbstractPanelHeader.prototype.getSelectors = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtcGFuZWwtaGVhZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC9kYXRlLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9hYnN0cmFjdC1wYW5lbC1oZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7O0FBS3BELE1BQU0sT0FBZ0IsbUJBQW1CO0lBQXpDO1FBQ0UsY0FBUyxHQUFXLG1CQUFtQixDQUFDO1FBQ3hDLGNBQVMsR0FBb0IsRUFBRSxDQUFDO1FBSXZCLG9CQUFlLEdBQVksSUFBSSxDQUFDO1FBQ2hDLHFCQUFnQixHQUFZLElBQUksQ0FBQztRQUNqQyxlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBRWxCLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUNqRCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFhLENBQUM7SUFrRWpFLENBQUM7Ozs7SUE5REMsa0JBQWtCO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDbEMsQ0FBQzs7OztJQUVELGFBQWE7UUFDWCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO0lBQ25DLENBQUM7Ozs7SUFFRCxjQUFjO1FBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDL0IsQ0FBQzs7OztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7O0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLEtBQWdCO1FBQzFCLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7WUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsSUFBZ0I7UUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFFTyxNQUFNO1FBQ1osSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdEM7SUFDSCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUMsd0JBQXdCO1NBQ3ZEO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdkMsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDbkMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7b0JBekVBLEtBQUs7cUJBQ0wsS0FBSzs4QkFDTCxLQUFLOytCQUNMLEtBQUs7eUJBQ0wsS0FBSzswQkFDTCxLQUFLOzhCQUVMLE1BQU07MEJBQ04sTUFBTTs7OztJQVhQLHdDQUF3Qzs7SUFDeEMsd0NBQWdDOztJQUVoQyxvQ0FBMkI7O0lBQzNCLHFDQUEwQzs7SUFDMUMsOENBQXlDOztJQUN6QywrQ0FBMEM7O0lBQzFDLHlDQUFvQzs7SUFDcEMsMENBQXFDOztJQUVyQyw4Q0FBb0U7O0lBQ3BFLDBDQUErRDs7Ozs7SUFFL0QsNkRBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuZHlEYXRlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3RpbWUnO1xuaW1wb3J0IHsgTnpDYWxlbmRhckkxOG5JbnRlcmZhY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuaW1wb3J0IHsgTnpEYXRlTW9kZSB9IGZyb20gJy4uL3N0YW5kYXJkLXR5cGVzJztcbmltcG9ydCB7IFBhbmVsU2VsZWN0b3IgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFBhbmVsSGVhZGVyIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBwcmVmaXhDbHM6IHN0cmluZyA9IGBhbnQtcGlja2VyLWhlYWRlcmA7XG4gIHNlbGVjdG9yczogUGFuZWxTZWxlY3RvcltdID0gW107XG5cbiAgQElucHV0KCkgdmFsdWUhOiBDYW5keURhdGU7XG4gIEBJbnB1dCgpIGxvY2FsZSE6IE56Q2FsZW5kYXJJMThuSW50ZXJmYWNlO1xuICBASW5wdXQoKSBzaG93U3VwZXJQcmVCdG46IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBzaG93U3VwZXJOZXh0QnRuOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd1ByZUJ0bjogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dOZXh0QnRuOiBib29sZWFuID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgcmVhZG9ubHkgcGFuZWxNb2RlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOekRhdGVNb2RlPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENhbmR5RGF0ZT4oKTtcblxuICBhYnN0cmFjdCBnZXRTZWxlY3RvcnMoKTogUGFuZWxTZWxlY3RvcltdO1xuXG4gIHN1cGVyUHJldmlvdXNUaXRsZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmxvY2FsZS5wcmV2aW91c1llYXI7XG4gIH1cblxuICBwcmV2aW91c1RpdGxlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubG9jYWxlLnByZXZpb3VzTW9udGg7XG4gIH1cblxuICBzdXBlck5leHRUaXRsZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmxvY2FsZS5uZXh0WWVhcjtcbiAgfVxuXG4gIG5leHRUaXRsZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmxvY2FsZS5uZXh0TW9udGg7XG4gIH1cblxuICBzdXBlclByZXZpb3VzKCk6IHZvaWQge1xuICAgIHRoaXMuY2hhbmdlVmFsdWUodGhpcy52YWx1ZS5hZGRZZWFycygtMSkpO1xuICB9XG5cbiAgc3VwZXJOZXh0KCk6IHZvaWQge1xuICAgIHRoaXMuY2hhbmdlVmFsdWUodGhpcy52YWx1ZS5hZGRZZWFycygxKSk7XG4gIH1cblxuICBwcmV2aW91cygpOiB2b2lkIHtcbiAgICB0aGlzLmNoYW5nZVZhbHVlKHRoaXMudmFsdWUuYWRkTW9udGhzKC0xKSk7XG4gIH1cblxuICBuZXh0KCk6IHZvaWQge1xuICAgIHRoaXMuY2hhbmdlVmFsdWUodGhpcy52YWx1ZS5hZGRNb250aHMoMSkpO1xuICB9XG5cbiAgY2hhbmdlVmFsdWUodmFsdWU6IENhbmR5RGF0ZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLnZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICBjaGFuZ2VNb2RlKG1vZGU6IE56RGF0ZU1vZGUpOiB2b2lkIHtcbiAgICB0aGlzLnBhbmVsTW9kZUNoYW5nZS5lbWl0KG1vZGUpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMuc2VsZWN0b3JzID0gdGhpcy5nZXRTZWxlY3RvcnMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBuZXcgQ2FuZHlEYXRlKCk7IC8vIFNob3cgdG9kYXkgYnkgZGVmYXVsdFxuICAgIH1cbiAgICB0aGlzLnNlbGVjdG9ycyA9IHRoaXMuZ2V0U2VsZWN0b3JzKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMudmFsdWUgfHwgY2hhbmdlcy5sb2NhbGUpIHtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuICB9XG59XG4iXX0=