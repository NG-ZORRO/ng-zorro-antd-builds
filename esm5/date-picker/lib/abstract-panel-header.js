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
var AbstractPanelHeader = /** @class */ (function () {
    function AbstractPanelHeader() {
        this.prefixCls = "ant-picker-header";
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
    AbstractPanelHeader.prototype.superPreviousTitle = /**
     * @return {?}
     */
    function () {
        return this.locale.previousYear;
    };
    /**
     * @return {?}
     */
    AbstractPanelHeader.prototype.previousTitle = /**
     * @return {?}
     */
    function () {
        return this.locale.previousMonth;
    };
    /**
     * @return {?}
     */
    AbstractPanelHeader.prototype.superNextTitle = /**
     * @return {?}
     */
    function () {
        return this.locale.nextYear;
    };
    /**
     * @return {?}
     */
    AbstractPanelHeader.prototype.nextTitle = /**
     * @return {?}
     */
    function () {
        return this.locale.nextMonth;
    };
    /**
     * @return {?}
     */
    AbstractPanelHeader.prototype.superPrevious = /**
     * @return {?}
     */
    function () {
        this.changeValue(this.value.addYears(-1));
    };
    /**
     * @return {?}
     */
    AbstractPanelHeader.prototype.superNext = /**
     * @return {?}
     */
    function () {
        this.changeValue(this.value.addYears(1));
    };
    /**
     * @return {?}
     */
    AbstractPanelHeader.prototype.previous = /**
     * @return {?}
     */
    function () {
        this.changeValue(this.value.addMonths(-1));
    };
    /**
     * @return {?}
     */
    AbstractPanelHeader.prototype.next = /**
     * @return {?}
     */
    function () {
        this.changeValue(this.value.addMonths(1));
    };
    /**
     * @param {?} value
     * @return {?}
     */
    AbstractPanelHeader.prototype.changeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.value !== value) {
            this.value = value;
            this.valueChange.emit(this.value);
            this.render();
        }
    };
    /**
     * @param {?} mode
     * @return {?}
     */
    AbstractPanelHeader.prototype.changeMode = /**
     * @param {?} mode
     * @return {?}
     */
    function (mode) {
        this.panelModeChange.emit(mode);
    };
    /**
     * @private
     * @return {?}
     */
    AbstractPanelHeader.prototype.render = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.value) {
            this.selectors = this.getSelectors();
        }
    };
    /**
     * @return {?}
     */
    AbstractPanelHeader.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.value) {
            this.value = new CandyDate(); // Show today by default
        }
        this.selectors = this.getSelectors();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    AbstractPanelHeader.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.value || changes.locale) {
            this.render();
        }
    };
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
    return AbstractPanelHeader;
}());
export { AbstractPanelHeader };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtcGFuZWwtaGVhZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC9kYXRlLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9hYnN0cmFjdC1wYW5lbC1oZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7O0FBS3BEO0lBQUE7UUFDRSxjQUFTLEdBQVcsbUJBQW1CLENBQUM7UUFDeEMsY0FBUyxHQUFvQixFQUFFLENBQUM7UUFJdkIsb0JBQWUsR0FBWSxJQUFJLENBQUM7UUFDaEMscUJBQWdCLEdBQVksSUFBSSxDQUFDO1FBQ2pDLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFFbEIsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBQ2pELGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQWEsQ0FBQztJQWtFakUsQ0FBQzs7OztJQTlEQyxnREFBa0I7OztJQUFsQjtRQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDbEMsQ0FBQzs7OztJQUVELDJDQUFhOzs7SUFBYjtRQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7SUFDbkMsQ0FBQzs7OztJQUVELDRDQUFjOzs7SUFBZDtRQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDOUIsQ0FBQzs7OztJQUVELHVDQUFTOzs7SUFBVDtRQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDL0IsQ0FBQzs7OztJQUVELDJDQUFhOzs7SUFBYjtRQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Ozs7SUFFRCx1Q0FBUzs7O0lBQVQ7UUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7OztJQUVELHNDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7SUFFRCxrQ0FBSTs7O0lBQUo7UUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7Ozs7SUFFRCx5Q0FBVzs7OztJQUFYLFVBQVksS0FBZ0I7UUFDMUIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtZQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7OztJQUVELHdDQUFVOzs7O0lBQVYsVUFBVyxJQUFnQjtRQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7OztJQUVPLG9DQUFNOzs7O0lBQWQ7UUFDRSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN0QztJQUNILENBQUM7Ozs7SUFFRCxzQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQyxDQUFDLHdCQUF3QjtTQUN2RDtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3ZDLENBQUM7Ozs7O0lBRUQseUNBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ25DLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7d0JBekVBLEtBQUs7eUJBQ0wsS0FBSztrQ0FDTCxLQUFLO21DQUNMLEtBQUs7NkJBQ0wsS0FBSzs4QkFDTCxLQUFLO2tDQUVMLE1BQU07OEJBQ04sTUFBTTs7SUFrRVQsMEJBQUM7Q0FBQSxBQTlFRCxJQThFQztTQTlFcUIsbUJBQW1COzs7SUFDdkMsd0NBQXdDOztJQUN4Qyx3Q0FBZ0M7O0lBRWhDLG9DQUEyQjs7SUFDM0IscUNBQTBDOztJQUMxQyw4Q0FBeUM7O0lBQ3pDLCtDQUEwQzs7SUFDMUMseUNBQW9DOztJQUNwQywwQ0FBcUM7O0lBRXJDLDhDQUFvRTs7SUFDcEUsMENBQStEOzs7OztJQUUvRCw2REFBeUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5keURhdGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdGltZSc7XG5pbXBvcnQgeyBOekNhbGVuZGFySTE4bkludGVyZmFjZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaTE4bic7XG5pbXBvcnQgeyBOekRhdGVNb2RlIH0gZnJvbSAnLi4vc3RhbmRhcmQtdHlwZXMnO1xuaW1wb3J0IHsgUGFuZWxTZWxlY3RvciB9IGZyb20gJy4vaW50ZXJmYWNlJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0UGFuZWxIZWFkZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIHByZWZpeENsczogc3RyaW5nID0gYGFudC1waWNrZXItaGVhZGVyYDtcbiAgc2VsZWN0b3JzOiBQYW5lbFNlbGVjdG9yW10gPSBbXTtcblxuICBASW5wdXQoKSB2YWx1ZSE6IENhbmR5RGF0ZTtcbiAgQElucHV0KCkgbG9jYWxlITogTnpDYWxlbmRhckkxOG5JbnRlcmZhY2U7XG4gIEBJbnB1dCgpIHNob3dTdXBlclByZUJ0bjogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dTdXBlck5leHRCdG46IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBzaG93UHJlQnRuOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd05leHRCdG46IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSByZWFkb25seSBwYW5lbE1vZGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE56RGF0ZU1vZGU+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FuZHlEYXRlPigpO1xuXG4gIGFic3RyYWN0IGdldFNlbGVjdG9ycygpOiBQYW5lbFNlbGVjdG9yW107XG5cbiAgc3VwZXJQcmV2aW91c1RpdGxlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubG9jYWxlLnByZXZpb3VzWWVhcjtcbiAgfVxuXG4gIHByZXZpb3VzVGl0bGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhbGUucHJldmlvdXNNb250aDtcbiAgfVxuXG4gIHN1cGVyTmV4dFRpdGxlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubG9jYWxlLm5leHRZZWFyO1xuICB9XG5cbiAgbmV4dFRpdGxlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubG9jYWxlLm5leHRNb250aDtcbiAgfVxuXG4gIHN1cGVyUHJldmlvdXMoKTogdm9pZCB7XG4gICAgdGhpcy5jaGFuZ2VWYWx1ZSh0aGlzLnZhbHVlLmFkZFllYXJzKC0xKSk7XG4gIH1cblxuICBzdXBlck5leHQoKTogdm9pZCB7XG4gICAgdGhpcy5jaGFuZ2VWYWx1ZSh0aGlzLnZhbHVlLmFkZFllYXJzKDEpKTtcbiAgfVxuXG4gIHByZXZpb3VzKCk6IHZvaWQge1xuICAgIHRoaXMuY2hhbmdlVmFsdWUodGhpcy52YWx1ZS5hZGRNb250aHMoLTEpKTtcbiAgfVxuXG4gIG5leHQoKTogdm9pZCB7XG4gICAgdGhpcy5jaGFuZ2VWYWx1ZSh0aGlzLnZhbHVlLmFkZE1vbnRocygxKSk7XG4gIH1cblxuICBjaGFuZ2VWYWx1ZSh2YWx1ZTogQ2FuZHlEYXRlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIGNoYW5nZU1vZGUobW9kZTogTnpEYXRlTW9kZSk6IHZvaWQge1xuICAgIHRoaXMucGFuZWxNb2RlQ2hhbmdlLmVtaXQobW9kZSk7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy5zZWxlY3RvcnMgPSB0aGlzLmdldFNlbGVjdG9ycygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IG5ldyBDYW5keURhdGUoKTsgLy8gU2hvdyB0b2RheSBieSBkZWZhdWx0XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0b3JzID0gdGhpcy5nZXRTZWxlY3RvcnMoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy52YWx1ZSB8fCBjaGFuZ2VzLmxvY2FsZSkge1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==