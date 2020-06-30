/**
 * @fileoverview added by tsickle
 * Generated from: src/addon/filter.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/**
 * @record
 */
function NzThItemInterface() { }
if (false) {
    /** @type {?} */
    NzThItemInterface.prototype.text;
    /** @type {?} */
    NzThItemInterface.prototype.value;
    /** @type {?} */
    NzThItemInterface.prototype.checked;
}
var NzTableFilterComponent = /** @class */ (function () {
    function NzTableFilterComponent(cdr, i18n) {
        this.cdr = cdr;
        this.i18n = i18n;
        this.contentTemplate = null;
        this.customFilter = false;
        this.extraTemplate = null;
        this.filterMultiple = true;
        this.listOfFilter = [];
        this.filterChange = new EventEmitter();
        this.destroy$ = new Subject();
        this.isChanged = false;
        this.isChecked = false;
        this.isVisible = false;
        this.listOfParsedFilter = [];
    }
    /**
     * @param {?} _
     * @param {?} item
     * @return {?}
     */
    NzTableFilterComponent.prototype.trackByValue = /**
     * @param {?} _
     * @param {?} item
     * @return {?}
     */
    function (_, item) {
        return item.value;
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    NzTableFilterComponent.prototype.check = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        this.isChanged = true;
        if (this.filterMultiple) {
            this.listOfParsedFilter = this.listOfParsedFilter.map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                if (item === filter) {
                    return __assign(__assign({}, item), { checked: !filter.checked });
                }
                else {
                    return item;
                }
            }));
            filter.checked = !filter.checked;
        }
        else {
            this.listOfParsedFilter = this.listOfParsedFilter.map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                return __assign(__assign({}, item), { checked: item === filter });
            }));
        }
        this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
    };
    /**
     * @return {?}
     */
    NzTableFilterComponent.prototype.confirm = /**
     * @return {?}
     */
    function () {
        this.isVisible = false;
        this.emitFilterData();
    };
    /**
     * @return {?}
     */
    NzTableFilterComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.isChanged = true;
        this.isVisible = false;
        this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter, true);
        this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
        this.emitFilterData();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NzTableFilterComponent.prototype.onVisibleChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.isVisible = value;
        if (!value) {
            this.emitFilterData();
        }
    };
    /**
     * @return {?}
     */
    NzTableFilterComponent.prototype.emitFilterData = /**
     * @return {?}
     */
    function () {
        if (this.isChanged) {
            /** @type {?} */
            var listOfChecked = this.listOfParsedFilter.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.checked; })).map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.value; }));
            if (this.filterMultiple) {
                this.filterChange.emit(listOfChecked);
            }
            else {
                this.filterChange.emit(listOfChecked[0] || null);
            }
            this.isChanged = false;
        }
    };
    /**
     * @param {?} listOfFilter
     * @param {?=} reset
     * @return {?}
     */
    NzTableFilterComponent.prototype.parseListOfFilter = /**
     * @param {?} listOfFilter
     * @param {?=} reset
     * @return {?}
     */
    function (listOfFilter, reset) {
        return listOfFilter.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            /** @type {?} */
            var checked = reset ? false : !!item.byDefault;
            return { text: item.text, value: item.value, checked: checked };
        }));
    };
    /**
     * @param {?} listOfParsedFilter
     * @return {?}
     */
    NzTableFilterComponent.prototype.getCheckedStatus = /**
     * @param {?} listOfParsedFilter
     * @return {?}
     */
    function (listOfParsedFilter) {
        return listOfParsedFilter.some((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.checked; }));
    };
    /**
     * @return {?}
     */
    NzTableFilterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.locale = _this.i18n.getLocaleData('Table');
            _this.cdr.markForCheck();
        }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzTableFilterComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var listOfFilter = changes.listOfFilter;
        if (listOfFilter && this.listOfFilter && this.listOfFilter.length) {
            this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter);
            this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
        }
    };
    /**
     * @return {?}
     */
    NzTableFilterComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    NzTableFilterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-table-filter',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <span class=\"ant-table-filter-column-title\">\n      <ng-template [ngTemplateOutlet]=\"contentTemplate\"></ng-template>\n    </span>\n    <ng-container *ngIf=\"!customFilter; else extraTemplate\">\n      <nz-filter-trigger\n        [nzVisible]=\"isVisible\"\n        [nzActive]=\"isChecked\"\n        [nzDropdownMenu]=\"filterMenu\"\n        (nzVisibleChange)=\"onVisibleChange($event)\"\n      >\n        <i nz-icon nzType=\"filter\" nzTheme=\"fill\"></i>\n      </nz-filter-trigger>\n      <nz-dropdown-menu #filterMenu=\"nzDropdownMenu\">\n        <div class=\"ant-table-filter-dropdown\">\n          <ul nz-menu>\n            <li nz-menu-item [nzSelected]=\"f.checked\" *ngFor=\"let f of listOfParsedFilter; trackBy: trackByValue\" (click)=\"check(f)\">\n              <label nz-radio *ngIf=\"!filterMultiple\" [ngModel]=\"f.checked\" (ngModelChange)=\"check(f)\"></label>\n              <label nz-checkbox *ngIf=\"filterMultiple\" [ngModel]=\"f.checked\" (ngModelChange)=\"check(f)\"></label>\n              <span>{{ f.text }}</span>\n            </li>\n          </ul>\n          <div class=\"ant-table-filter-dropdown-btns\">\n            <button nz-button nzType=\"link\" nzSize=\"small\" (click)=\"reset()\" [disabled]=\"!isChecked\">{{ locale.filterReset }}</button>\n            <button nz-button nzType=\"primary\" nzSize=\"small\" (click)=\"confirm()\">{{ locale.filterConfirm }}</button>\n          </div>\n        </div>\n      </nz-dropdown-menu>\n    </ng-container>\n  ",
                    host: {
                        '[class.ant-table-filter-column]': 'true'
                    }
                }] }
    ];
    /** @nocollapse */
    NzTableFilterComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: NzI18nService }
    ]; };
    NzTableFilterComponent.propDecorators = {
        contentTemplate: [{ type: Input }],
        customFilter: [{ type: Input }],
        extraTemplate: [{ type: Input }],
        filterMultiple: [{ type: Input }],
        listOfFilter: [{ type: Input }],
        filterChange: [{ type: Output }]
    };
    return NzTableFilterComponent;
}());
export { NzTableFilterComponent };
if (false) {
    /** @type {?} */
    NzTableFilterComponent.prototype.contentTemplate;
    /** @type {?} */
    NzTableFilterComponent.prototype.customFilter;
    /** @type {?} */
    NzTableFilterComponent.prototype.extraTemplate;
    /** @type {?} */
    NzTableFilterComponent.prototype.filterMultiple;
    /** @type {?} */
    NzTableFilterComponent.prototype.listOfFilter;
    /** @type {?} */
    NzTableFilterComponent.prototype.filterChange;
    /**
     * @type {?}
     * @private
     */
    NzTableFilterComponent.prototype.destroy$;
    /** @type {?} */
    NzTableFilterComponent.prototype.locale;
    /** @type {?} */
    NzTableFilterComponent.prototype.isChanged;
    /** @type {?} */
    NzTableFilterComponent.prototype.isChecked;
    /** @type {?} */
    NzTableFilterComponent.prototype.isVisible;
    /** @type {?} */
    NzTableFilterComponent.prototype.listOfParsedFilter;
    /**
     * @type {?}
     * @private
     */
    NzTableFilterComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    NzTableFilterComponent.prototype.i18n;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvdGFibGUvIiwic291cmNlcyI6WyJzcmMvYWRkb24vZmlsdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxFQUdOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsYUFBYSxFQUF3QixNQUFNLG9CQUFvQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRzNDLGdDQUlDOzs7SUFIQyxpQ0FBYTs7SUFDYixrQ0FBaUI7O0lBQ2pCLG9DQUFpQjs7QUFHbkI7SUF1SEUsZ0NBQW9CLEdBQXNCLEVBQVUsSUFBbUI7UUFBbkQsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFlO1FBL0U5RCxvQkFBZSxHQUFrQyxJQUFJLENBQUM7UUFDdEQsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsa0JBQWEsR0FBa0MsSUFBSSxDQUFDO1FBQ3BELG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGlCQUFZLEdBQXNCLEVBQUUsQ0FBQztRQUMzQixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUEyQixDQUFDO1FBQ3RFLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRWpDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLHVCQUFrQixHQUF3QixFQUFFLENBQUM7SUFvRTZCLENBQUM7Ozs7OztJQWxFM0UsNkNBQVk7Ozs7O0lBQVos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LENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7Z0JBMUlGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixtQkFBbUIsRUFBRSxLQUFLO29CQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRSx3OUNBNkJUO29CQUNELElBQUksRUFBRTt3QkFDSixpQ0FBaUMsRUFBRSxNQUFNO3FCQUMxQztpQkFDRjs7OztnQkE5REMsaUJBQWlCO2dCQWFWLGFBQWE7OztrQ0FtRG5CLEtBQUs7K0JBQ0wsS0FBSztnQ0FDTCxLQUFLO2lDQUNMLEtBQUs7K0JBQ0wsS0FBSzsrQkFDTCxNQUFNOztJQThGVCw2QkFBQztDQUFBLEFBM0lELElBMklDO1NBcEdZLHNCQUFzQjs7O0lBQ2pDLGlEQUErRDs7SUFDL0QsOENBQThCOztJQUM5QiwrQ0FBNkQ7O0lBQzdELGdEQUErQjs7SUFDL0IsOENBQThDOztJQUM5Qyw4Q0FBOEU7Ozs7O0lBQzlFLDBDQUFpQzs7SUFDakMsd0NBQThCOztJQUM5QiwyQ0FBa0I7O0lBQ2xCLDJDQUFrQjs7SUFDbEIsMkNBQWtCOztJQUNsQixvREFBNkM7Ozs7O0lBb0VqQyxxQ0FBOEI7Ozs7O0lBQUUsc0NBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56STE4blNlcnZpY2UsIE56VGFibGVJMThuSW50ZXJmYWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE56VGFibGVGaWx0ZXJMaXN0IH0gZnJvbSAnLi4vdGFibGUudHlwZXMnO1xuXG5pbnRlcmZhY2UgTnpUaEl0ZW1JbnRlcmZhY2Uge1xuICB0ZXh0OiBzdHJpbmc7XG4gIHZhbHVlOiBOelNhZmVBbnk7XG4gIGNoZWNrZWQ6IGJvb2xlYW47XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXRhYmxlLWZpbHRlcicsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3BhbiBjbGFzcz1cImFudC10YWJsZS1maWx0ZXItY29sdW1uLXRpdGxlXCI+XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudFRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L3NwYW4+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjdXN0b21GaWx0ZXI7IGVsc2UgZXh0cmFUZW1wbGF0ZVwiPlxuICAgICAgPG56LWZpbHRlci10cmlnZ2VyXG4gICAgICAgIFtuelZpc2libGVdPVwiaXNWaXNpYmxlXCJcbiAgICAgICAgW256QWN0aXZlXT1cImlzQ2hlY2tlZFwiXG4gICAgICAgIFtuekRyb3Bkb3duTWVudV09XCJmaWx0ZXJNZW51XCJcbiAgICAgICAgKG56VmlzaWJsZUNoYW5nZSk9XCJvblZpc2libGVDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICA+XG4gICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiZmlsdGVyXCIgbnpUaGVtZT1cImZpbGxcIj48L2k+XG4gICAgICA8L256LWZpbHRlci10cmlnZ2VyPlxuICAgICAgPG56LWRyb3Bkb3duLW1lbnUgI2ZpbHRlck1lbnU9XCJuekRyb3Bkb3duTWVudVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXRhYmxlLWZpbHRlci1kcm9wZG93blwiPlxuICAgICAgICAgIDx1bCBuei1tZW51PlxuICAgICAgICAgICAgPGxpIG56LW1lbnUtaXRlbSBbbnpTZWxlY3RlZF09XCJmLmNoZWNrZWRcIiAqbmdGb3I9XCJsZXQgZiBvZiBsaXN0T2ZQYXJzZWRGaWx0ZXI7IHRyYWNrQnk6IHRyYWNrQnlWYWx1ZVwiIChjbGljayk9XCJjaGVjayhmKVwiPlxuICAgICAgICAgICAgICA8bGFiZWwgbnotcmFkaW8gKm5nSWY9XCIhZmlsdGVyTXVsdGlwbGVcIiBbbmdNb2RlbF09XCJmLmNoZWNrZWRcIiAobmdNb2RlbENoYW5nZSk9XCJjaGVjayhmKVwiPjwvbGFiZWw+XG4gICAgICAgICAgICAgIDxsYWJlbCBuei1jaGVja2JveCAqbmdJZj1cImZpbHRlck11bHRpcGxlXCIgW25nTW9kZWxdPVwiZi5jaGVja2VkXCIgKG5nTW9kZWxDaGFuZ2UpPVwiY2hlY2soZilcIj48L2xhYmVsPlxuICAgICAgICAgICAgICA8c3Bhbj57eyBmLnRleHQgfX08L3NwYW4+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFudC10YWJsZS1maWx0ZXItZHJvcGRvd24tYnRuc1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiBuei1idXR0b24gbnpUeXBlPVwibGlua1wiIG56U2l6ZT1cInNtYWxsXCIgKGNsaWNrKT1cInJlc2V0KClcIiBbZGlzYWJsZWRdPVwiIWlzQ2hlY2tlZFwiPnt7IGxvY2FsZS5maWx0ZXJSZXNldCB9fTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBuei1idXR0b24gbnpUeXBlPVwicHJpbWFyeVwiIG56U2l6ZT1cInNtYWxsXCIgKGNsaWNrKT1cImNvbmZpcm0oKVwiPnt7IGxvY2FsZS5maWx0ZXJDb25maXJtIH19PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uei1kcm9wZG93bi1tZW51PlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtdGFibGUtZmlsdGVyLWNvbHVtbl0nOiAndHJ1ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRhYmxlRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBjdXN0b21GaWx0ZXIgPSBmYWxzZTtcbiAgQElucHV0KCkgZXh0cmFUZW1wbGF0ZTogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBmaWx0ZXJNdWx0aXBsZSA9IHRydWU7XG4gIEBJbnB1dCgpIGxpc3RPZkZpbHRlcjogTnpUYWJsZUZpbHRlckxpc3QgPSBbXTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGZpbHRlckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TnpTYWZlQW55W10gfCBOelNhZmVBbnk+KCk7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuICBsb2NhbGUhOiBOelRhYmxlSTE4bkludGVyZmFjZTtcbiAgaXNDaGFuZ2VkID0gZmFsc2U7XG4gIGlzQ2hlY2tlZCA9IGZhbHNlO1xuICBpc1Zpc2libGUgPSBmYWxzZTtcbiAgbGlzdE9mUGFyc2VkRmlsdGVyOiBOelRoSXRlbUludGVyZmFjZVtdID0gW107XG5cbiAgdHJhY2tCeVZhbHVlKF86IG51bWJlciwgaXRlbTogTnpUaEl0ZW1JbnRlcmZhY2UpOiBOelNhZmVBbnkge1xuICAgIHJldHVybiBpdGVtLnZhbHVlO1xuICB9XG5cbiAgY2hlY2soZmlsdGVyOiBOelRoSXRlbUludGVyZmFjZSk6IHZvaWQge1xuICAgIHRoaXMuaXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5maWx0ZXJNdWx0aXBsZSkge1xuICAgICAgdGhpcy5saXN0T2ZQYXJzZWRGaWx0ZXIgPSB0aGlzLmxpc3RPZlBhcnNlZEZpbHRlci5tYXAoaXRlbSA9PiB7XG4gICAgICAgIGlmIChpdGVtID09PSBmaWx0ZXIpIHtcbiAgICAgICAgICByZXR1cm4geyAuLi5pdGVtLCBjaGVja2VkOiAhZmlsdGVyLmNoZWNrZWQgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBmaWx0ZXIuY2hlY2tlZCA9ICFmaWx0ZXIuY2hlY2tlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5saXN0T2ZQYXJzZWRGaWx0ZXIgPSB0aGlzLmxpc3RPZlBhcnNlZEZpbHRlci5tYXAoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiB7IC4uLml0ZW0sIGNoZWNrZWQ6IGl0ZW0gPT09IGZpbHRlciB9O1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuaXNDaGVja2VkID0gdGhpcy5nZXRDaGVja2VkU3RhdHVzKHRoaXMubGlzdE9mUGFyc2VkRmlsdGVyKTtcbiAgfVxuXG4gIGNvbmZpcm0oKTogdm9pZCB7XG4gICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcbiAgICB0aGlzLmVtaXRGaWx0ZXJEYXRhKCk7XG4gIH1cblxuICByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLmlzQ2hhbmdlZCA9IHRydWU7XG4gICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcbiAgICB0aGlzLmxpc3RPZlBhcnNlZEZpbHRlciA9IHRoaXMucGFyc2VMaXN0T2ZGaWx0ZXIodGhpcy5saXN0T2ZGaWx0ZXIsIHRydWUpO1xuICAgIHRoaXMuaXNDaGVja2VkID0gdGhpcy5nZXRDaGVja2VkU3RhdHVzKHRoaXMubGlzdE9mUGFyc2VkRmlsdGVyKTtcbiAgICB0aGlzLmVtaXRGaWx0ZXJEYXRhKCk7XG4gIH1cblxuICBvblZpc2libGVDaGFuZ2UodmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmlzVmlzaWJsZSA9IHZhbHVlO1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRoaXMuZW1pdEZpbHRlckRhdGEoKTtcbiAgICB9XG4gIH1cblxuICBlbWl0RmlsdGVyRGF0YSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0NoYW5nZWQpIHtcbiAgICAgIGNvbnN0IGxpc3RPZkNoZWNrZWQgPSB0aGlzLmxpc3RPZlBhcnNlZEZpbHRlci5maWx0ZXIoaXRlbSA9PiBpdGVtLmNoZWNrZWQpLm1hcChpdGVtID0+IGl0ZW0udmFsdWUpO1xuICAgICAgaWYgKHRoaXMuZmlsdGVyTXVsdGlwbGUpIHtcbiAgICAgICAgdGhpcy5maWx0ZXJDaGFuZ2UuZW1pdChsaXN0T2ZDaGVja2VkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZmlsdGVyQ2hhbmdlLmVtaXQobGlzdE9mQ2hlY2tlZFswXSB8fCBudWxsKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VMaXN0T2ZGaWx0ZXIobGlzdE9mRmlsdGVyOiBOelRhYmxlRmlsdGVyTGlzdCwgcmVzZXQ/OiBib29sZWFuKTogTnpUaEl0ZW1JbnRlcmZhY2VbXSB7XG4gICAgcmV0dXJuIGxpc3RPZkZpbHRlci5tYXAoaXRlbSA9PiB7XG4gICAgICBjb25zdCBjaGVja2VkID0gcmVzZXQgPyBmYWxzZSA6ICEhaXRlbS5ieURlZmF1bHQ7XG4gICAgICByZXR1cm4geyB0ZXh0OiBpdGVtLnRleHQsIHZhbHVlOiBpdGVtLnZhbHVlLCBjaGVja2VkIH07XG4gICAgfSk7XG4gIH1cblxuICBnZXRDaGVja2VkU3RhdHVzKGxpc3RPZlBhcnNlZEZpbHRlcjogTnpUaEl0ZW1JbnRlcmZhY2VbXSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBsaXN0T2ZQYXJzZWRGaWx0ZXIuc29tZShpdGVtID0+IGl0ZW0uY2hlY2tlZCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgaTE4bjogTnpJMThuU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmkxOG4ubG9jYWxlQ2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5sb2NhbGUgPSB0aGlzLmkxOG4uZ2V0TG9jYWxlRGF0YSgnVGFibGUnKTtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbGlzdE9mRmlsdGVyIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChsaXN0T2ZGaWx0ZXIgJiYgdGhpcy5saXN0T2ZGaWx0ZXIgJiYgdGhpcy5saXN0T2ZGaWx0ZXIubGVuZ3RoKSB7XG4gICAgICB0aGlzLmxpc3RPZlBhcnNlZEZpbHRlciA9IHRoaXMucGFyc2VMaXN0T2ZGaWx0ZXIodGhpcy5saXN0T2ZGaWx0ZXIpO1xuICAgICAgdGhpcy5pc0NoZWNrZWQgPSB0aGlzLmdldENoZWNrZWRTdGF0dXModGhpcy5saXN0T2ZQYXJzZWRGaWx0ZXIpO1xuICAgIH1cbiAgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==