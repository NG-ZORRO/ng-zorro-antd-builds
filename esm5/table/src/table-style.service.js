/**
 * @fileoverview added by tsickle
 * Generated from: src/table-style.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
var NzTableStyleService = /** @class */ (function () {
    function NzTableStyleService() {
        this.theadTemplate$ = new ReplaySubject(1);
        this.hasFixLeft$ = new ReplaySubject(1);
        this.hasFixRight$ = new ReplaySubject(1);
        this.hostWidth$ = new ReplaySubject(1);
        this.columnCount$ = new ReplaySubject(1);
        this.showEmpty$ = new ReplaySubject(1);
        this.noResult$ = new ReplaySubject(1);
        this.listOfThWidthConfigPx$ = new BehaviorSubject([]);
        this.tableWidthConfigPx$ = new BehaviorSubject([]);
        this.manualWidthConfigPx$ = combineLatest([this.tableWidthConfigPx$, this.listOfThWidthConfigPx$]).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), widthConfig = _b[0], listOfWidth = _b[1];
            return (widthConfig.length ? widthConfig : listOfWidth);
        })));
        this.listOfAutoWidthPx$ = new ReplaySubject(1);
        this.listOfListOfThWidthPx$ = merge(
        /** init with manual width **/
        this.manualWidthConfigPx$, combineLatest([this.listOfAutoWidthPx$, this.manualWidthConfigPx$]).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), autoWidth = _b[0], manualWidth = _b[1];
            /** use autoWidth until column length match **/
            if (autoWidth.length === manualWidth.length) {
                return autoWidth.map((/**
                 * @param {?} width
                 * @param {?} index
                 * @return {?}
                 */
                function (width, index) {
                    if (width === '0px') {
                        return manualWidth[index] || null;
                    }
                    else {
                        return manualWidth[index] || width;
                    }
                }));
            }
            else {
                return manualWidth;
            }
        }))));
        this.listOfMeasureColumn$ = new ReplaySubject(1);
        this.listOfListOfThWidth$ = this.listOfAutoWidthPx$.pipe(map((/**
         * @param {?} list
         * @return {?}
         */
        function (list) { return list.map((/**
         * @param {?} width
         * @return {?}
         */
        function (width) { return parseInt(width, 10); })); })));
        this.enableAutoMeasure$ = new ReplaySubject(1);
    }
    /**
     * @param {?} template
     * @return {?}
     */
    NzTableStyleService.prototype.setTheadTemplate = /**
     * @param {?} template
     * @return {?}
     */
    function (template) {
        this.theadTemplate$.next(template);
    };
    /**
     * @param {?} hasFixLeft
     * @return {?}
     */
    NzTableStyleService.prototype.setHasFixLeft = /**
     * @param {?} hasFixLeft
     * @return {?}
     */
    function (hasFixLeft) {
        this.hasFixLeft$.next(hasFixLeft);
    };
    /**
     * @param {?} hasFixRight
     * @return {?}
     */
    NzTableStyleService.prototype.setHasFixRight = /**
     * @param {?} hasFixRight
     * @return {?}
     */
    function (hasFixRight) {
        this.hasFixRight$.next(hasFixRight);
    };
    /**
     * @param {?} widthConfig
     * @return {?}
     */
    NzTableStyleService.prototype.setTableWidthConfig = /**
     * @param {?} widthConfig
     * @return {?}
     */
    function (widthConfig) {
        this.tableWidthConfigPx$.next(widthConfig);
    };
    /**
     * @param {?} listOfTh
     * @return {?}
     */
    NzTableStyleService.prototype.setListOfTh = /**
     * @param {?} listOfTh
     * @return {?}
     */
    function (listOfTh) {
        /** @type {?} */
        var columnCount = 0;
        listOfTh.forEach((/**
         * @param {?} th
         * @return {?}
         */
        function (th) {
            columnCount += (th.colspan && +th.colspan) || 1;
        }));
        /** @type {?} */
        var listOfThPx = listOfTh.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.nzWidth; }));
        this.columnCount$.next(columnCount);
        this.listOfThWidthConfigPx$.next(listOfThPx);
    };
    /**
     * @param {?} listOfTh
     * @return {?}
     */
    NzTableStyleService.prototype.setListOfMeasureColumn = /**
     * @param {?} listOfTh
     * @return {?}
     */
    function (listOfTh) {
        /** @type {?} */
        var listOfKeys = [];
        listOfTh.forEach((/**
         * @param {?} th
         * @return {?}
         */
        function (th) {
            /** @type {?} */
            var length = (th.colspan && +th.colspan) || 1;
            for (var i = 0; i < length; i++) {
                listOfKeys.push("measure_key_" + i);
            }
        }));
        this.listOfMeasureColumn$.next(listOfKeys);
    };
    /**
     * @param {?} listOfAutoWidth
     * @return {?}
     */
    NzTableStyleService.prototype.setListOfAutoWidth = /**
     * @param {?} listOfAutoWidth
     * @return {?}
     */
    function (listOfAutoWidth) {
        this.listOfAutoWidthPx$.next(listOfAutoWidth.map((/**
         * @param {?} width
         * @return {?}
         */
        function (width) { return width + "px"; })));
    };
    /**
     * @param {?} showEmpty
     * @return {?}
     */
    NzTableStyleService.prototype.setShowEmpty = /**
     * @param {?} showEmpty
     * @return {?}
     */
    function (showEmpty) {
        this.showEmpty$.next(showEmpty);
    };
    /**
     * @param {?} noResult
     * @return {?}
     */
    NzTableStyleService.prototype.setNoResult = /**
     * @param {?} noResult
     * @return {?}
     */
    function (noResult) {
        this.noResult$.next(noResult);
    };
    /**
     * @param {?} scrollX
     * @param {?} scrollY
     * @return {?}
     */
    NzTableStyleService.prototype.setScroll = /**
     * @param {?} scrollX
     * @param {?} scrollY
     * @return {?}
     */
    function (scrollX, scrollY) {
        /** @type {?} */
        var enableAutoMeasure = !!(scrollX || scrollY);
        if (!enableAutoMeasure) {
            this.setListOfAutoWidth([]);
        }
        this.enableAutoMeasure$.next(enableAutoMeasure);
    };
    NzTableStyleService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NzTableStyleService.ctorParameters = function () { return []; };
    return NzTableStyleService;
}());
export { NzTableStyleService };
if (false) {
    /** @type {?} */
    NzTableStyleService.prototype.theadTemplate$;
    /** @type {?} */
    NzTableStyleService.prototype.hasFixLeft$;
    /** @type {?} */
    NzTableStyleService.prototype.hasFixRight$;
    /** @type {?} */
    NzTableStyleService.prototype.hostWidth$;
    /** @type {?} */
    NzTableStyleService.prototype.columnCount$;
    /** @type {?} */
    NzTableStyleService.prototype.showEmpty$;
    /** @type {?} */
    NzTableStyleService.prototype.noResult$;
    /**
     * @type {?}
     * @private
     */
    NzTableStyleService.prototype.listOfThWidthConfigPx$;
    /**
     * @type {?}
     * @private
     */
    NzTableStyleService.prototype.tableWidthConfigPx$;
    /** @type {?} */
    NzTableStyleService.prototype.manualWidthConfigPx$;
    /**
     * @type {?}
     * @private
     */
    NzTableStyleService.prototype.listOfAutoWidthPx$;
    /** @type {?} */
    NzTableStyleService.prototype.listOfListOfThWidthPx$;
    /** @type {?} */
    NzTableStyleService.prototype.listOfMeasureColumn$;
    /** @type {?} */
    NzTableStyleService.prototype.listOfListOfThWidth$;
    /** @type {?} */
    NzTableStyleService.prototype.enableAutoMeasure$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtc3R5bGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvdGFibGUvIiwic291cmNlcyI6WyJzcmMvdGFibGUtc3R5bGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFVBQVUsRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUV4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzVFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdyQztJQWdHRTtRQTlGQSxtQkFBYyxHQUFHLElBQUksYUFBYSxDQUF5QixDQUFDLENBQUMsQ0FBQztRQUM5RCxnQkFBVyxHQUFHLElBQUksYUFBYSxDQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzVDLGlCQUFZLEdBQUcsSUFBSSxhQUFhLENBQVUsQ0FBQyxDQUFDLENBQUM7UUFDN0MsZUFBVSxHQUFHLElBQUksYUFBYSxDQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzFDLGlCQUFZLEdBQUcsSUFBSSxhQUFhLENBQVMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsZUFBVSxHQUFHLElBQUksYUFBYSxDQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzNDLGNBQVMsR0FBRyxJQUFJLGFBQWEsQ0FBOEMsQ0FBQyxDQUFDLENBQUM7UUFDdEUsMkJBQXNCLEdBQUcsSUFBSSxlQUFlLENBQXVCLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLHdCQUFtQixHQUFHLElBQUksZUFBZSxDQUF1QixFQUFFLENBQUMsQ0FBQztRQUM1RSx5QkFBb0IsR0FBRyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ2hHLEdBQUc7Ozs7UUFBQyxVQUFDLEVBQTBCO2dCQUExQixrQkFBMEIsRUFBekIsbUJBQVcsRUFBRSxtQkFBVztZQUFNLE9BQUEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUFoRCxDQUFnRCxFQUFDLENBQ3RGLENBQUM7UUFDTSx1QkFBa0IsR0FBRyxJQUFJLGFBQWEsQ0FBVyxDQUFDLENBQUMsQ0FBQztRQUM1RCwyQkFBc0IsR0FBRyxLQUFLO1FBQzVCLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsb0JBQW9CLEVBQ3pCLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDdEUsR0FBRzs7OztRQUFDLFVBQUMsRUFBd0I7Z0JBQXhCLGtCQUF3QixFQUF2QixpQkFBUyxFQUFFLG1CQUFXO1lBQzFCLCtDQUErQztZQUMvQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssV0FBVyxDQUFDLE1BQU0sRUFBRTtnQkFDM0MsT0FBTyxTQUFTLENBQUMsR0FBRzs7Ozs7Z0JBQUMsVUFBQyxLQUFLLEVBQUUsS0FBSztvQkFDaEMsSUFBSSxLQUFLLEtBQUssS0FBSyxFQUFFO3dCQUNuQixPQUFPLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUM7cUJBQ25DO3lCQUFNO3dCQUNMLE9BQU8sV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQztxQkFDcEM7Z0JBQ0gsQ0FBQyxFQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxPQUFPLFdBQVcsQ0FBQzthQUNwQjtRQUNILENBQUMsRUFBQyxDQUNILENBQ0YsQ0FBQztRQUNGLHlCQUFvQixHQUFHLElBQUksYUFBYSxDQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3RELHlCQUFvQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRzs7OztRQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQW5CLENBQW1CLEVBQUMsRUFBdEMsQ0FBc0MsRUFBQyxDQUFDLENBQUM7UUFDekcsdUJBQWtCLEdBQUcsSUFBSSxhQUFhLENBQVUsQ0FBQyxDQUFDLENBQUM7SUEyRHBDLENBQUM7Ozs7O0lBekRoQiw4Q0FBZ0I7Ozs7SUFBaEIsVUFBaUIsUUFBZ0M7UUFDL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Ozs7SUFFRCwyQ0FBYTs7OztJQUFiLFVBQWMsVUFBbUI7UUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFRCw0Q0FBYzs7OztJQUFkLFVBQWUsV0FBb0I7UUFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFFRCxpREFBbUI7Ozs7SUFBbkIsVUFBb0IsV0FBaUM7UUFDbkQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3QyxDQUFDOzs7OztJQUVELHlDQUFXOzs7O0lBQVgsVUFBWSxRQUFnQzs7WUFDdEMsV0FBVyxHQUFHLENBQUM7UUFDbkIsUUFBUSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFBLEVBQUU7WUFDakIsV0FBVyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxFQUFDLENBQUM7O1lBQ0csVUFBVSxHQUFHLFFBQVEsQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsT0FBTyxFQUFaLENBQVksRUFBQztRQUNyRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Ozs7O0lBRUQsb0RBQXNCOzs7O0lBQXRCLFVBQXVCLFFBQWdDOztZQUMvQyxVQUFVLEdBQWEsRUFBRTtRQUMvQixRQUFRLENBQUMsT0FBTzs7OztRQUFDLFVBQUEsRUFBRTs7Z0JBQ1gsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQy9DLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9CLFVBQVUsQ0FBQyxJQUFJLENBQUMsaUJBQWUsQ0FBRyxDQUFDLENBQUM7YUFDckM7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7Ozs7SUFFRCxnREFBa0I7Ozs7SUFBbEIsVUFBbUIsZUFBeUI7UUFDMUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRzs7OztRQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUcsS0FBSyxPQUFJLEVBQVosQ0FBWSxFQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDOzs7OztJQUVELDBDQUFZOzs7O0lBQVosVUFBYSxTQUFrQjtRQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7OztJQUVELHlDQUFXOzs7O0lBQVgsVUFBWSxRQUFxRDtRQUMvRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7Ozs7SUFFRCx1Q0FBUzs7Ozs7SUFBVCxVQUFVLE9BQXNCLEVBQUUsT0FBc0I7O1lBQ2hELGlCQUFpQixHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUM7UUFDaEQsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3RCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM3QjtRQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNsRCxDQUFDOztnQkE5RkYsVUFBVTs7OztJQWlHWCwwQkFBQztDQUFBLEFBakdELElBaUdDO1NBaEdZLG1CQUFtQjs7O0lBQzlCLDZDQUE4RDs7SUFDOUQsMENBQTRDOztJQUM1QywyQ0FBNkM7O0lBQzdDLHlDQUEwQzs7SUFDMUMsMkNBQTRDOztJQUM1Qyx5Q0FBMkM7O0lBQzNDLHdDQUE4RTs7Ozs7SUFDOUUscURBQStFOzs7OztJQUMvRSxrREFBNEU7O0lBQzVFLG1EQUVFOzs7OztJQUNGLGlEQUE0RDs7SUFDNUQscURBbUJFOztJQUNGLG1EQUFzRDs7SUFDdEQsbURBQXlHOztJQUN6RyxpREFBbUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgbWVyZ2UsIFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE56VGhNZWFzdXJlRGlyZWN0aXZlIH0gZnJvbSAnLi9jZWxsL3RoLW1lYXN1cmUuZGlyZWN0aXZlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE56VGFibGVTdHlsZVNlcnZpY2Uge1xuICB0aGVhZFRlbXBsYXRlJCA9IG5ldyBSZXBsYXlTdWJqZWN0PFRlbXBsYXRlUmVmPE56U2FmZUFueT4+KDEpO1xuICBoYXNGaXhMZWZ0JCA9IG5ldyBSZXBsYXlTdWJqZWN0PGJvb2xlYW4+KDEpO1xuICBoYXNGaXhSaWdodCQgPSBuZXcgUmVwbGF5U3ViamVjdDxib29sZWFuPigxKTtcbiAgaG9zdFdpZHRoJCA9IG5ldyBSZXBsYXlTdWJqZWN0PG51bWJlcj4oMSk7XG4gIGNvbHVtbkNvdW50JCA9IG5ldyBSZXBsYXlTdWJqZWN0PG51bWJlcj4oMSk7XG4gIHNob3dFbXB0eSQgPSBuZXcgUmVwbGF5U3ViamVjdDxib29sZWFuPigxKTtcbiAgbm9SZXN1bHQkID0gbmV3IFJlcGxheVN1YmplY3Q8c3RyaW5nIHwgVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IHVuZGVmaW5lZD4oMSk7XG4gIHByaXZhdGUgbGlzdE9mVGhXaWR0aENvbmZpZ1B4JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QXJyYXk8c3RyaW5nIHwgbnVsbD4+KFtdKTtcbiAgcHJpdmF0ZSB0YWJsZVdpZHRoQ29uZmlnUHgkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBcnJheTxzdHJpbmcgfCBudWxsPj4oW10pO1xuICBtYW51YWxXaWR0aENvbmZpZ1B4JCA9IGNvbWJpbmVMYXRlc3QoW3RoaXMudGFibGVXaWR0aENvbmZpZ1B4JCwgdGhpcy5saXN0T2ZUaFdpZHRoQ29uZmlnUHgkXSkucGlwZShcbiAgICBtYXAoKFt3aWR0aENvbmZpZywgbGlzdE9mV2lkdGhdKSA9PiAod2lkdGhDb25maWcubGVuZ3RoID8gd2lkdGhDb25maWcgOiBsaXN0T2ZXaWR0aCkpXG4gICk7XG4gIHByaXZhdGUgbGlzdE9mQXV0b1dpZHRoUHgkID0gbmV3IFJlcGxheVN1YmplY3Q8c3RyaW5nW10+KDEpO1xuICBsaXN0T2ZMaXN0T2ZUaFdpZHRoUHgkID0gbWVyZ2UoXG4gICAgLyoqIGluaXQgd2l0aCBtYW51YWwgd2lkdGggKiovXG4gICAgdGhpcy5tYW51YWxXaWR0aENvbmZpZ1B4JCxcbiAgICBjb21iaW5lTGF0ZXN0KFt0aGlzLmxpc3RPZkF1dG9XaWR0aFB4JCwgdGhpcy5tYW51YWxXaWR0aENvbmZpZ1B4JF0pLnBpcGUoXG4gICAgICBtYXAoKFthdXRvV2lkdGgsIG1hbnVhbFdpZHRoXSkgPT4ge1xuICAgICAgICAvKiogdXNlIGF1dG9XaWR0aCB1bnRpbCBjb2x1bW4gbGVuZ3RoIG1hdGNoICoqL1xuICAgICAgICBpZiAoYXV0b1dpZHRoLmxlbmd0aCA9PT0gbWFudWFsV2lkdGgubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIGF1dG9XaWR0aC5tYXAoKHdpZHRoLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdpZHRoID09PSAnMHB4Jykge1xuICAgICAgICAgICAgICByZXR1cm4gbWFudWFsV2lkdGhbaW5kZXhdIHx8IG51bGw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gbWFudWFsV2lkdGhbaW5kZXhdIHx8IHdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBtYW51YWxXaWR0aDtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApXG4gICk7XG4gIGxpc3RPZk1lYXN1cmVDb2x1bW4kID0gbmV3IFJlcGxheVN1YmplY3Q8c3RyaW5nW10+KDEpO1xuICBsaXN0T2ZMaXN0T2ZUaFdpZHRoJCA9IHRoaXMubGlzdE9mQXV0b1dpZHRoUHgkLnBpcGUobWFwKGxpc3QgPT4gbGlzdC5tYXAod2lkdGggPT4gcGFyc2VJbnQod2lkdGgsIDEwKSkpKTtcbiAgZW5hYmxlQXV0b01lYXN1cmUkID0gbmV3IFJlcGxheVN1YmplY3Q8Ym9vbGVhbj4oMSk7XG5cbiAgc2V0VGhlYWRUZW1wbGF0ZSh0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8TnpTYWZlQW55Pik6IHZvaWQge1xuICAgIHRoaXMudGhlYWRUZW1wbGF0ZSQubmV4dCh0ZW1wbGF0ZSk7XG4gIH1cblxuICBzZXRIYXNGaXhMZWZ0KGhhc0ZpeExlZnQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmhhc0ZpeExlZnQkLm5leHQoaGFzRml4TGVmdCk7XG4gIH1cblxuICBzZXRIYXNGaXhSaWdodChoYXNGaXhSaWdodDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuaGFzRml4UmlnaHQkLm5leHQoaGFzRml4UmlnaHQpO1xuICB9XG5cbiAgc2V0VGFibGVXaWR0aENvbmZpZyh3aWR0aENvbmZpZzogQXJyYXk8c3RyaW5nIHwgbnVsbD4pOiB2b2lkIHtcbiAgICB0aGlzLnRhYmxlV2lkdGhDb25maWdQeCQubmV4dCh3aWR0aENvbmZpZyk7XG4gIH1cblxuICBzZXRMaXN0T2ZUaChsaXN0T2ZUaDogTnpUaE1lYXN1cmVEaXJlY3RpdmVbXSk6IHZvaWQge1xuICAgIGxldCBjb2x1bW5Db3VudCA9IDA7XG4gICAgbGlzdE9mVGguZm9yRWFjaCh0aCA9PiB7XG4gICAgICBjb2x1bW5Db3VudCArPSAodGguY29sc3BhbiAmJiArdGguY29sc3BhbikgfHwgMTtcbiAgICB9KTtcbiAgICBjb25zdCBsaXN0T2ZUaFB4ID0gbGlzdE9mVGgubWFwKGl0ZW0gPT4gaXRlbS5ueldpZHRoKTtcbiAgICB0aGlzLmNvbHVtbkNvdW50JC5uZXh0KGNvbHVtbkNvdW50KTtcbiAgICB0aGlzLmxpc3RPZlRoV2lkdGhDb25maWdQeCQubmV4dChsaXN0T2ZUaFB4KTtcbiAgfVxuXG4gIHNldExpc3RPZk1lYXN1cmVDb2x1bW4obGlzdE9mVGg6IE56VGhNZWFzdXJlRGlyZWN0aXZlW10pOiB2b2lkIHtcbiAgICBjb25zdCBsaXN0T2ZLZXlzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGxpc3RPZlRoLmZvckVhY2godGggPT4ge1xuICAgICAgY29uc3QgbGVuZ3RoID0gKHRoLmNvbHNwYW4gJiYgK3RoLmNvbHNwYW4pIHx8IDE7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxpc3RPZktleXMucHVzaChgbWVhc3VyZV9rZXlfJHtpfWApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMubGlzdE9mTWVhc3VyZUNvbHVtbiQubmV4dChsaXN0T2ZLZXlzKTtcbiAgfVxuXG4gIHNldExpc3RPZkF1dG9XaWR0aChsaXN0T2ZBdXRvV2lkdGg6IG51bWJlcltdKTogdm9pZCB7XG4gICAgdGhpcy5saXN0T2ZBdXRvV2lkdGhQeCQubmV4dChsaXN0T2ZBdXRvV2lkdGgubWFwKHdpZHRoID0+IGAke3dpZHRofXB4YCkpO1xuICB9XG5cbiAgc2V0U2hvd0VtcHR5KHNob3dFbXB0eTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuc2hvd0VtcHR5JC5uZXh0KHNob3dFbXB0eSk7XG4gIH1cblxuICBzZXROb1Jlc3VsdChub1Jlc3VsdDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMubm9SZXN1bHQkLm5leHQobm9SZXN1bHQpO1xuICB9XG5cbiAgc2V0U2Nyb2xsKHNjcm9sbFg6IHN0cmluZyB8IG51bGwsIHNjcm9sbFk6IHN0cmluZyB8IG51bGwpOiB2b2lkIHtcbiAgICBjb25zdCBlbmFibGVBdXRvTWVhc3VyZSA9ICEhKHNjcm9sbFggfHwgc2Nyb2xsWSk7XG4gICAgaWYgKCFlbmFibGVBdXRvTWVhc3VyZSkge1xuICAgICAgdGhpcy5zZXRMaXN0T2ZBdXRvV2lkdGgoW10pO1xuICAgIH1cbiAgICB0aGlzLmVuYWJsZUF1dG9NZWFzdXJlJC5uZXh0KGVuYWJsZUF1dG9NZWFzdXJlKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge31cbn1cbiJdfQ==