/**
 * @fileoverview added by tsickle
 * Generated from: src/table-style.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
export class NzTableStyleService {
    constructor() {
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
        ([widthConfig, listOfWidth]) => (widthConfig.length ? widthConfig : listOfWidth))));
        this.listOfAutoWidthPx$ = new ReplaySubject(1);
        this.listOfListOfThWidthPx$ = merge(
        /** init with manual width **/
        this.manualWidthConfigPx$, combineLatest([this.listOfAutoWidthPx$, this.manualWidthConfigPx$]).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([autoWidth, manualWidth]) => {
            /** use autoWidth until column length match **/
            if (autoWidth.length === manualWidth.length) {
                return autoWidth.map((/**
                 * @param {?} width
                 * @param {?} index
                 * @return {?}
                 */
                (width, index) => {
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
        list => list.map((/**
         * @param {?} width
         * @return {?}
         */
        width => parseInt(width, 10))))));
        this.enableAutoMeasure$ = new ReplaySubject(1);
    }
    /**
     * @param {?} template
     * @return {?}
     */
    setTheadTemplate(template) {
        this.theadTemplate$.next(template);
    }
    /**
     * @param {?} hasFixLeft
     * @return {?}
     */
    setHasFixLeft(hasFixLeft) {
        this.hasFixLeft$.next(hasFixLeft);
    }
    /**
     * @param {?} hasFixRight
     * @return {?}
     */
    setHasFixRight(hasFixRight) {
        this.hasFixRight$.next(hasFixRight);
    }
    /**
     * @param {?} widthConfig
     * @return {?}
     */
    setTableWidthConfig(widthConfig) {
        this.tableWidthConfigPx$.next(widthConfig);
    }
    /**
     * @param {?} listOfTh
     * @return {?}
     */
    setListOfTh(listOfTh) {
        /** @type {?} */
        let columnCount = 0;
        listOfTh.forEach((/**
         * @param {?} th
         * @return {?}
         */
        th => {
            columnCount += (th.colspan && +th.colspan) || 1;
        }));
        /** @type {?} */
        const listOfThPx = listOfTh.map((/**
         * @param {?} item
         * @return {?}
         */
        item => item.nzWidth));
        this.columnCount$.next(columnCount);
        this.listOfThWidthConfigPx$.next(listOfThPx);
    }
    /**
     * @param {?} listOfTh
     * @return {?}
     */
    setListOfMeasureColumn(listOfTh) {
        /** @type {?} */
        const listOfKeys = [];
        listOfTh.forEach((/**
         * @param {?} th
         * @return {?}
         */
        th => {
            /** @type {?} */
            const length = (th.colspan && +th.colspan) || 1;
            for (let i = 0; i < length; i++) {
                listOfKeys.push(`measure_key_${i}`);
            }
        }));
        this.listOfMeasureColumn$.next(listOfKeys);
    }
    /**
     * @param {?} listOfAutoWidth
     * @return {?}
     */
    setListOfAutoWidth(listOfAutoWidth) {
        this.listOfAutoWidthPx$.next(listOfAutoWidth.map((/**
         * @param {?} width
         * @return {?}
         */
        width => `${width}px`)));
    }
    /**
     * @param {?} showEmpty
     * @return {?}
     */
    setShowEmpty(showEmpty) {
        this.showEmpty$.next(showEmpty);
    }
    /**
     * @param {?} noResult
     * @return {?}
     */
    setNoResult(noResult) {
        this.noResult$.next(noResult);
    }
    /**
     * @param {?} scrollX
     * @param {?} scrollY
     * @return {?}
     */
    setScroll(scrollX, scrollY) {
        /** @type {?} */
        const enableAutoMeasure = !!(scrollX || scrollY);
        if (!enableAutoMeasure) {
            this.setListOfAutoWidth([]);
        }
        this.enableAutoMeasure$.next(enableAutoMeasure);
    }
}
NzTableStyleService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NzTableStyleService.ctorParameters = () => [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtc3R5bGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvdGFibGUvIiwic291cmNlcyI6WyJzcmMvdGFibGUtc3R5bGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsVUFBVSxFQUFlLE1BQU0sZUFBZSxDQUFDO0FBRXhELE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXJDLE1BQU0sT0FBTyxtQkFBbUI7SUErRjlCO1FBOUZBLG1CQUFjLEdBQUcsSUFBSSxhQUFhLENBQXlCLENBQUMsQ0FBQyxDQUFDO1FBQzlELGdCQUFXLEdBQUcsSUFBSSxhQUFhLENBQVUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsaUJBQVksR0FBRyxJQUFJLGFBQWEsQ0FBVSxDQUFDLENBQUMsQ0FBQztRQUM3QyxlQUFVLEdBQUcsSUFBSSxhQUFhLENBQVMsQ0FBQyxDQUFDLENBQUM7UUFDMUMsaUJBQVksR0FBRyxJQUFJLGFBQWEsQ0FBUyxDQUFDLENBQUMsQ0FBQztRQUM1QyxlQUFVLEdBQUcsSUFBSSxhQUFhLENBQVUsQ0FBQyxDQUFDLENBQUM7UUFDM0MsY0FBUyxHQUFHLElBQUksYUFBYSxDQUE4QyxDQUFDLENBQUMsQ0FBQztRQUN0RSwyQkFBc0IsR0FBRyxJQUFJLGVBQWUsQ0FBdUIsRUFBRSxDQUFDLENBQUM7UUFDdkUsd0JBQW1CLEdBQUcsSUFBSSxlQUFlLENBQXVCLEVBQUUsQ0FBQyxDQUFDO1FBQzVFLHlCQUFvQixHQUFHLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDaEcsR0FBRzs7OztRQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUs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RVQsNkNBQThEOztJQUM5RCwwQ0FBNEM7O0lBQzVDLDJDQUE2Qzs7SUFDN0MseUNBQTBDOztJQUMxQywyQ0FBNEM7O0lBQzVDLHlDQUEyQzs7SUFDM0Msd0NBQThFOzs7OztJQUM5RSxxREFBK0U7Ozs7O0lBQy9FLGtEQUE0RTs7SUFDNUUsbURBRUU7Ozs7O0lBQ0YsaURBQTREOztJQUM1RCxxREFtQkU7O0lBQ0YsbURBQXNEOztJQUN0RCxtREFBeUc7O0lBQ3pHLGlEQUFtRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBtZXJnZSwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTnpUaE1lYXN1cmVEaXJlY3RpdmUgfSBmcm9tICcuL2NlbGwvdGgtbWVhc3VyZS5kaXJlY3RpdmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTnpUYWJsZVN0eWxlU2VydmljZSB7XG4gIHRoZWFkVGVtcGxhdGUkID0gbmV3IFJlcGxheVN1YmplY3Q8VGVtcGxhdGVSZWY8TnpTYWZlQW55Pj4oMSk7XG4gIGhhc0ZpeExlZnQkID0gbmV3IFJlcGxheVN1YmplY3Q8Ym9vbGVhbj4oMSk7XG4gIGhhc0ZpeFJpZ2h0JCA9IG5ldyBSZXBsYXlTdWJqZWN0PGJvb2xlYW4+KDEpO1xuICBob3N0V2lkdGgkID0gbmV3IFJlcGxheVN1YmplY3Q8bnVtYmVyPigxKTtcbiAgY29sdW1uQ291bnQkID0gbmV3IFJlcGxheVN1YmplY3Q8bnVtYmVyPigxKTtcbiAgc2hvd0VtcHR5JCA9IG5ldyBSZXBsYXlTdWJqZWN0PGJvb2xlYW4+KDEpO1xuICBub1Jlc3VsdCQgPSBuZXcgUmVwbGF5U3ViamVjdDxzdHJpbmcgfCBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgdW5kZWZpbmVkPigxKTtcbiAgcHJpdmF0ZSBsaXN0T2ZUaFdpZHRoQ29uZmlnUHgkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBcnJheTxzdHJpbmcgfCBudWxsPj4oW10pO1xuICBwcml2YXRlIHRhYmxlV2lkdGhDb25maWdQeCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFycmF5PHN0cmluZyB8IG51bGw+PihbXSk7XG4gIG1hbnVhbFdpZHRoQ29uZmlnUHgkID0gY29tYmluZUxhdGVzdChbdGhpcy50YWJsZVdpZHRoQ29uZmlnUHgkLCB0aGlzLmxpc3RPZlRoV2lkdGhDb25maWdQeCRdKS5waXBlKFxuICAgIG1hcCgoW3dpZHRoQ29uZmlnLCBsaXN0T2ZXaWR0aF0pID0+ICh3aWR0aENvbmZpZy5sZW5ndGggPyB3aWR0aENvbmZpZyA6IGxpc3RPZldpZHRoKSlcbiAgKTtcbiAgcHJpdmF0ZSBsaXN0T2ZBdXRvV2lkdGhQeCQgPSBuZXcgUmVwbGF5U3ViamVjdDxzdHJpbmdbXT4oMSk7XG4gIGxpc3RPZkxpc3RPZlRoV2lkdGhQeCQgPSBtZXJnZShcbiAgICAvKiogaW5pdCB3aXRoIG1hbnVhbCB3aWR0aCAqKi9cbiAgICB0aGlzLm1hbnVhbFdpZHRoQ29uZmlnUHgkLFxuICAgIGNvbWJpbmVMYXRlc3QoW3RoaXMubGlzdE9mQXV0b1dpZHRoUHgkLCB0aGlzLm1hbnVhbFdpZHRoQ29uZmlnUHgkXSkucGlwZShcbiAgICAgIG1hcCgoW2F1dG9XaWR0aCwgbWFudWFsV2lkdGhdKSA9PiB7XG4gICAgICAgIC8qKiB1c2UgYXV0b1dpZHRoIHVudGlsIGNvbHVtbiBsZW5ndGggbWF0Y2ggKiovXG4gICAgICAgIGlmIChhdXRvV2lkdGgubGVuZ3RoID09PSBtYW51YWxXaWR0aC5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gYXV0b1dpZHRoLm1hcCgod2lkdGgsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAod2lkdGggPT09ICcwcHgnKSB7XG4gICAgICAgICAgICAgIHJldHVybiBtYW51YWxXaWR0aFtpbmRleF0gfHwgbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBtYW51YWxXaWR0aFtpbmRleF0gfHwgd2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG1hbnVhbFdpZHRoO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIClcbiAgKTtcbiAgbGlzdE9mTWVhc3VyZUNvbHVtbiQgPSBuZXcgUmVwbGF5U3ViamVjdDxzdHJpbmdbXT4oMSk7XG4gIGxpc3RPZkxpc3RPZlRoV2lkdGgkID0gdGhpcy5saXN0T2ZBdXRvV2lkdGhQeCQucGlwZShtYXAobGlzdCA9PiBsaXN0Lm1hcCh3aWR0aCA9PiBwYXJzZUludCh3aWR0aCwgMTApKSkpO1xuICBlbmFibGVBdXRvTWVhc3VyZSQgPSBuZXcgUmVwbGF5U3ViamVjdDxib29sZWFuPigxKTtcblxuICBzZXRUaGVhZFRlbXBsYXRlKHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+KTogdm9pZCB7XG4gICAgdGhpcy50aGVhZFRlbXBsYXRlJC5uZXh0KHRlbXBsYXRlKTtcbiAgfVxuXG4gIHNldEhhc0ZpeExlZnQoaGFzRml4TGVmdDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuaGFzRml4TGVmdCQubmV4dChoYXNGaXhMZWZ0KTtcbiAgfVxuXG4gIHNldEhhc0ZpeFJpZ2h0KGhhc0ZpeFJpZ2h0OiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5oYXNGaXhSaWdodCQubmV4dChoYXNGaXhSaWdodCk7XG4gIH1cblxuICBzZXRUYWJsZVdpZHRoQ29uZmlnKHdpZHRoQ29uZmlnOiBBcnJheTxzdHJpbmcgfCBudWxsPik6IHZvaWQge1xuICAgIHRoaXMudGFibGVXaWR0aENvbmZpZ1B4JC5uZXh0KHdpZHRoQ29uZmlnKTtcbiAgfVxuXG4gIHNldExpc3RPZlRoKGxpc3RPZlRoOiBOelRoTWVhc3VyZURpcmVjdGl2ZVtdKTogdm9pZCB7XG4gICAgbGV0IGNvbHVtbkNvdW50ID0gMDtcbiAgICBsaXN0T2ZUaC5mb3JFYWNoKHRoID0+IHtcbiAgICAgIGNvbHVtbkNvdW50ICs9ICh0aC5jb2xzcGFuICYmICt0aC5jb2xzcGFuKSB8fCAxO1xuICAgIH0pO1xuICAgIGNvbnN0IGxpc3RPZlRoUHggPSBsaXN0T2ZUaC5tYXAoaXRlbSA9PiBpdGVtLm56V2lkdGgpO1xuICAgIHRoaXMuY29sdW1uQ291bnQkLm5leHQoY29sdW1uQ291bnQpO1xuICAgIHRoaXMubGlzdE9mVGhXaWR0aENvbmZpZ1B4JC5uZXh0KGxpc3RPZlRoUHgpO1xuICB9XG5cbiAgc2V0TGlzdE9mTWVhc3VyZUNvbHVtbihsaXN0T2ZUaDogTnpUaE1lYXN1cmVEaXJlY3RpdmVbXSk6IHZvaWQge1xuICAgIGNvbnN0IGxpc3RPZktleXM6IHN0cmluZ1tdID0gW107XG4gICAgbGlzdE9mVGguZm9yRWFjaCh0aCA9PiB7XG4gICAgICBjb25zdCBsZW5ndGggPSAodGguY29sc3BhbiAmJiArdGguY29sc3BhbikgfHwgMTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGlzdE9mS2V5cy5wdXNoKGBtZWFzdXJlX2tleV8ke2l9YCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5saXN0T2ZNZWFzdXJlQ29sdW1uJC5uZXh0KGxpc3RPZktleXMpO1xuICB9XG5cbiAgc2V0TGlzdE9mQXV0b1dpZHRoKGxpc3RPZkF1dG9XaWR0aDogbnVtYmVyW10pOiB2b2lkIHtcbiAgICB0aGlzLmxpc3RPZkF1dG9XaWR0aFB4JC5uZXh0KGxpc3RPZkF1dG9XaWR0aC5tYXAod2lkdGggPT4gYCR7d2lkdGh9cHhgKSk7XG4gIH1cblxuICBzZXRTaG93RW1wdHkoc2hvd0VtcHR5OiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5zaG93RW1wdHkkLm5leHQoc2hvd0VtcHR5KTtcbiAgfVxuXG4gIHNldE5vUmVzdWx0KG5vUmVzdWx0OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgdW5kZWZpbmVkKTogdm9pZCB7XG4gICAgdGhpcy5ub1Jlc3VsdCQubmV4dChub1Jlc3VsdCk7XG4gIH1cblxuICBzZXRTY3JvbGwoc2Nyb2xsWDogc3RyaW5nIHwgbnVsbCwgc2Nyb2xsWTogc3RyaW5nIHwgbnVsbCk6IHZvaWQge1xuICAgIGNvbnN0IGVuYWJsZUF1dG9NZWFzdXJlID0gISEoc2Nyb2xsWCB8fCBzY3JvbGxZKTtcbiAgICBpZiAoIWVuYWJsZUF1dG9NZWFzdXJlKSB7XG4gICAgICB0aGlzLnNldExpc3RPZkF1dG9XaWR0aChbXSk7XG4gICAgfVxuICAgIHRoaXMuZW5hYmxlQXV0b01lYXN1cmUkLm5leHQoZW5hYmxlQXV0b01lYXN1cmUpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7fVxufVxuIl19