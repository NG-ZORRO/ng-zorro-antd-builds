/**
 * @fileoverview added by tsickle
 * Generated from: src/table/thead.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __decorate, __metadata, __read, __spread } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/* tslint:disable:component-selector */
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, Input, Optional, Output, QueryList, Renderer2, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { warnDeprecation } from 'ng-zorro-antd/core/logger';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { EMPTY, merge, of, Subject } from 'rxjs';
import { delay, flatMap, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { NzThAddOnComponent } from '../cell/th-addon.component';
import { NzTableDataService } from '../table-data.service';
import { NzTableStyleService } from '../table-style.service';
import { NzTrDirective } from './tr.directive';
var NzTheadComponent = /** @class */ (function () {
    function NzTheadComponent(elementRef, renderer, nzTableStyleService, nzTableDataService) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.nzTableStyleService = nzTableStyleService;
        this.nzTableDataService = nzTableDataService;
        this.destroy$ = new Subject();
        this.isInsideTable = false;
        /**
         * @deprecated use nzSortFn and nzSortPriority instead *
         */
        this.nzSingleSort = false;
        /**
         * @deprecated use nzSortOrderChange instead *
         */
        this.nzSortChange = new EventEmitter();
        this.nzSortOrderChange = new EventEmitter();
        this.isInsideTable = !!this.nzTableStyleService;
    }
    /**
     * @return {?}
     */
    NzTheadComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.nzTableStyleService) {
            this.nzTableStyleService.setTheadTemplate(this.templateRef);
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzTheadComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var nzSingleSort = changes.nzSingleSort;
        if (nzSingleSort) {
            warnDeprecation("'nzSingleSort' is deprecated and will be removed in 10.0.0. Please use 'nzSortFn' and 'nzSortPriority' instead.");
        }
    };
    /**
     * @return {?}
     */
    NzTheadComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.nzTableStyleService) {
            /** @type {?} */
            var firstTableRow$ = (/** @type {?} */ (this.listOfNzTrDirective.changes.pipe(startWith(this.listOfNzTrDirective), map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item && item.first; })))));
            /** @type {?} */
            var listOfColumnsChanges$_1 = firstTableRow$.pipe(switchMap((/**
             * @param {?} firstTableRow
             * @return {?}
             */
            function (firstTableRow) { return (firstTableRow ? firstTableRow.listOfColumnsChanges$ : EMPTY); })), takeUntil(this.destroy$));
            listOfColumnsChanges$_1.subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return _this.nzTableStyleService.setListOfTh(data); }));
            /** TODO: need reset the measure row when scrollX change **/
            this.nzTableStyleService.enableAutoMeasure$
                .pipe(switchMap((/**
             * @param {?} enable
             * @return {?}
             */
            function (enable) { return (enable ? listOfColumnsChanges$_1 : of([])); })))
                .pipe(takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return _this.nzTableStyleService.setListOfMeasureColumn(data); }));
            /** @type {?} */
            var listOfFixedLeftColumnChanges$ = firstTableRow$.pipe(switchMap((/**
             * @param {?} firstTr
             * @return {?}
             */
            function (firstTr) { return (firstTr ? firstTr.listOfFixedLeftColumnChanges$ : EMPTY); })), takeUntil(this.destroy$));
            /** @type {?} */
            var listOfFixedRightColumnChanges$ = firstTableRow$.pipe(switchMap((/**
             * @param {?} firstTr
             * @return {?}
             */
            function (firstTr) { return (firstTr ? firstTr.listOfFixedRightColumnChanges$ : EMPTY); })), takeUntil(this.destroy$));
            listOfFixedLeftColumnChanges$.subscribe((/**
             * @param {?} listOfFixedLeftColumn
             * @return {?}
             */
            function (listOfFixedLeftColumn) {
                _this.nzTableStyleService.setHasFixLeft(listOfFixedLeftColumn.length !== 0);
            }));
            listOfFixedRightColumnChanges$.subscribe((/**
             * @param {?} listOfFixedRightColumn
             * @return {?}
             */
            function (listOfFixedRightColumn) {
                _this.nzTableStyleService.setHasFixRight(listOfFixedRightColumn.length !== 0);
            }));
        }
        if (this.nzTableDataService) {
            /** @type {?} */
            var listOfColumn$_1 = (/** @type {?} */ (this.listOfNzThAddOnComponent.changes.pipe(startWith(this.listOfNzThAddOnComponent))));
            /** @type {?} */
            var manualSort$ = listOfColumn$_1.pipe(switchMap((/**
             * @return {?}
             */
            function () { return merge.apply(void 0, __spread(_this.listOfNzThAddOnComponent.map((/**
             * @param {?} th
             * @return {?}
             */
            function (th) { return th.manualClickOrder$; })))); })), takeUntil(this.destroy$));
            manualSort$.subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                /** @type {?} */
                var emitValue = { key: data.nzColumnKey, value: data.sortOrder };
                _this.nzSortChange.emit(emitValue);
                _this.nzSortOrderChange.emit(emitValue);
                if (_this.nzSingleSort || (data.nzSortFn && data.nzSortPriority === false)) {
                    _this.listOfNzThAddOnComponent.filter((/**
                     * @param {?} th
                     * @return {?}
                     */
                    function (th) { return th !== data; })).forEach((/**
                     * @param {?} th
                     * @return {?}
                     */
                    function (th) { return th.clearSortOrder(); }));
                }
            }));
            /** @type {?} */
            var listOfCalcOperator$ = listOfColumn$_1.pipe(switchMap((/**
             * @param {?} list
             * @return {?}
             */
            function (list) {
                return merge.apply(void 0, __spread([listOfColumn$_1], list.map((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c.calcOperatorChange$; })))).pipe(flatMap((/**
                 * @return {?}
                 */
                function () { return listOfColumn$_1; })));
            })), map((/**
             * @param {?} list
             * @return {?}
             */
            function (list) {
                return list
                    .filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return !!item.nzSortFn || !!item.nzFilterFn; }))
                    .map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    var nzSortFn = item.nzSortFn, sortOrder = item.sortOrder, nzFilterFn = item.nzFilterFn, nzFilterValue = item.nzFilterValue, nzSortPriority = item.nzSortPriority, nzColumnKey = item.nzColumnKey;
                    return {
                        key: nzColumnKey,
                        sortFn: nzSortFn,
                        sortPriority: nzSortPriority,
                        sortOrder: (/** @type {?} */ (sortOrder)),
                        filterFn: (/** @type {?} */ (nzFilterFn)),
                        filterValue: nzFilterValue
                    };
                }));
            })), 
            // TODO: after checked error here
            delay(0));
            listOfCalcOperator$.subscribe((/**
             * @param {?} list
             * @return {?}
             */
            function (list) {
                _this.nzTableDataService.listOfCalcOperator$.next(list);
            }));
        }
    };
    /**
     * @return {?}
     */
    NzTheadComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (this.nzTableStyleService) {
            this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), this.elementRef.nativeElement);
        }
    };
    /**
     * @return {?}
     */
    NzTheadComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    NzTheadComponent.decorators = [
        { type: Component, args: [{
                    selector: 'thead:not(.ant-table-thead)',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <ng-template #contentTemplate>\n      <ng-content></ng-content>\n    </ng-template>\n    <ng-container *ngIf=\"!isInsideTable\">\n      <ng-template [ngTemplateOutlet]=\"contentTemplate\"></ng-template>\n    </ng-container>\n  "
                }] }
    ];
    /** @nocollapse */
    NzTheadComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: NzTableStyleService, decorators: [{ type: Optional }] },
        { type: NzTableDataService, decorators: [{ type: Optional }] }
    ]; };
    NzTheadComponent.propDecorators = {
        templateRef: [{ type: ViewChild, args: ['contentTemplate', { static: true },] }],
        listOfNzTrDirective: [{ type: ContentChildren, args: [NzTrDirective,] }],
        listOfNzThAddOnComponent: [{ type: ContentChildren, args: [NzThAddOnComponent, { descendants: true },] }],
        nzSingleSort: [{ type: Input }],
        nzSortChange: [{ type: Output }],
        nzSortOrderChange: [{ type: Output }]
    };
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzTheadComponent.prototype, "nzSingleSort", void 0);
    return NzTheadComponent;
}());
export { NzTheadComponent };
if (false) {
    /** @type {?} */
    NzTheadComponent.ngAcceptInputType_nzSingleSort;
    /**
     * @type {?}
     * @private
     */
    NzTheadComponent.prototype.destroy$;
    /** @type {?} */
    NzTheadComponent.prototype.isInsideTable;
    /** @type {?} */
    NzTheadComponent.prototype.templateRef;
    /** @type {?} */
    NzTheadComponent.prototype.listOfNzTrDirective;
    /** @type {?} */
    NzTheadComponent.prototype.listOfNzThAddOnComponent;
    /**
     * @deprecated use nzSortFn and nzSortPriority instead *
     * @type {?}
     */
    NzTheadComponent.prototype.nzSingleSort;
    /**
     * @deprecated use nzSortOrderChange instead *
     * @type {?}
     */
    NzTheadComponent.prototype.nzSortChange;
    /** @type {?} */
    NzTheadComponent.prototype.nzSortOrderChange;
    /**
     * @type {?}
     * @private
     */
    NzTheadComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NzTheadComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    NzTheadComponent.prototype.nzTableStyleService;
    /**
     * @type {?}
     * @private
     */
    NzTheadComponent.prototype.nzTableDataService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC90YWJsZS8iLCJzb3VyY2VzIjpbInNyYy90YWJsZS90aGVhZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFLQSxPQUFPLEVBR0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBSUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUVULFdBQVcsRUFDWCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUc1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0M7SUEyQkUsMEJBQ1UsVUFBc0IsRUFDdEIsUUFBbUIsRUFDUCxtQkFBd0MsRUFDeEMsa0JBQXNDO1FBSGxELGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNQLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFD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QUFJLEVBQUU7c0NBQzdDLGVBQWUsU0FBQyxhQUFhOzJDQUM3QixlQUFlLFNBQUMsa0JBQWtCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFOytCQUV6RCxLQUFLOytCQUVMLE1BQU07b0NBQ04sTUFBTTs7SUFIa0I7UUFBZixZQUFZLEVBQUU7OzBEQUFzQjtJQWtIaEQsdUJBQUM7Q0FBQSxBQXhJRCxJQXdJQztTQTNIWSxnQkFBZ0I7OztJQUMzQixnREFBb0Q7Ozs7O0lBRXBELG9DQUF1Qzs7SUFDdkMseUNBQXNCOztJQUN0Qix1Q0FBcUY7O0lBQ3JGLCtDQUErRTs7SUFDL0Usb0RBQXFIOzs7OztJQUVySCx3Q0FBOEM7Ozs7O0lBRTlDLHdDQUErRjs7SUFDL0YsNkNBQW9HOzs7OztJQUdsRyxzQ0FBOEI7Ozs7O0lBQzlCLG9DQUEyQjs7Ozs7SUFDM0IsK0NBQTREOzs7OztJQUM1RCw4Q0FBMEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuLyogdHNsaW50OmRpc2FibGU6Y29tcG9uZW50LXNlbGVjdG9yICovXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHdhcm5EZXByZWNhdGlvbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9sb2dnZXInO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBFTVBUWSwgbWVyZ2UsIE9ic2VydmFibGUsIG9mLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWxheSwgZmxhdE1hcCwgbWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTnpUaEFkZE9uQ29tcG9uZW50IH0gZnJvbSAnLi4vY2VsbC90aC1hZGRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpUYWJsZURhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vdGFibGUtZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IE56VGFibGVTdHlsZVNlcnZpY2UgfSBmcm9tICcuLi90YWJsZS1zdHlsZS5zZXJ2aWNlJztcbmltcG9ydCB7IE56VHJEaXJlY3RpdmUgfSBmcm9tICcuL3RyLmRpcmVjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoZWFkOm5vdCguYW50LXRhYmxlLXRoZWFkKScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjY29udGVudFRlbXBsYXRlPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc0luc2lkZVRhYmxlXCI+XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudFRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOelRoZWFkQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNpbmdsZVNvcnQ6IEJvb2xlYW5JbnB1dDtcblxuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgaXNJbnNpZGVUYWJsZSA9IGZhbHNlO1xuICBAVmlld0NoaWxkKCdjb250ZW50VGVtcGxhdGUnLCB7IHN0YXRpYzogdHJ1ZSB9KSB0ZW1wbGF0ZVJlZiE6IFRlbXBsYXRlUmVmPE56U2FmZUFueT47XG4gIEBDb250ZW50Q2hpbGRyZW4oTnpUckRpcmVjdGl2ZSkgbGlzdE9mTnpUckRpcmVjdGl2ZSE6IFF1ZXJ5TGlzdDxOelRyRGlyZWN0aXZlPjtcbiAgQENvbnRlbnRDaGlsZHJlbihOelRoQWRkT25Db21wb25lbnQsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgbGlzdE9mTnpUaEFkZE9uQ29tcG9uZW50ITogUXVlcnlMaXN0PE56VGhBZGRPbkNvbXBvbmVudD47XG4gIC8qKiBAZGVwcmVjYXRlZCB1c2UgbnpTb3J0Rm4gYW5kIG56U29ydFByaW9yaXR5IGluc3RlYWQgKiovXG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNpbmdsZVNvcnQgPSBmYWxzZTtcbiAgLyoqIEBkZXByZWNhdGVkIHVzZSBuelNvcnRPcmRlckNoYW5nZSBpbnN0ZWFkICoqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpTb3J0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7IGtleTogTnpTYWZlQW55OyB2YWx1ZTogc3RyaW5nIHwgbnVsbCB9PigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpTb3J0T3JkZXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHsga2V5OiBOelNhZmVBbnk7IHZhbHVlOiBzdHJpbmcgfCBudWxsIH0+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIG56VGFibGVTdHlsZVNlcnZpY2U6IE56VGFibGVTdHlsZVNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBuelRhYmxlRGF0YVNlcnZpY2U6IE56VGFibGVEYXRhU2VydmljZVxuICApIHtcbiAgICB0aGlzLmlzSW5zaWRlVGFibGUgPSAhIXRoaXMubnpUYWJsZVN0eWxlU2VydmljZTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56VGFibGVTdHlsZVNlcnZpY2UpIHtcbiAgICAgIHRoaXMubnpUYWJsZVN0eWxlU2VydmljZS5zZXRUaGVhZFRlbXBsYXRlKHRoaXMudGVtcGxhdGVSZWYpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56U2luZ2xlU29ydCB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpTaW5nbGVTb3J0KSB7XG4gICAgICB3YXJuRGVwcmVjYXRpb24oXG4gICAgICAgIGAnbnpTaW5nbGVTb3J0JyBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gMTAuMC4wLiBQbGVhc2UgdXNlICduelNvcnRGbicgYW5kICduelNvcnRQcmlvcml0eScgaW5zdGVhZC5gXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uelRhYmxlU3R5bGVTZXJ2aWNlKSB7XG4gICAgICBjb25zdCBmaXJzdFRhYmxlUm93JCA9IHRoaXMubGlzdE9mTnpUckRpcmVjdGl2ZS5jaGFuZ2VzLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCh0aGlzLmxpc3RPZk56VHJEaXJlY3RpdmUpLFxuICAgICAgICBtYXAoaXRlbSA9PiBpdGVtICYmIGl0ZW0uZmlyc3QpXG4gICAgICApIGFzIE9ic2VydmFibGU8TnpUckRpcmVjdGl2ZT47XG4gICAgICBjb25zdCBsaXN0T2ZDb2x1bW5zQ2hhbmdlcyQgPSBmaXJzdFRhYmxlUm93JC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoZmlyc3RUYWJsZVJvdyA9PiAoZmlyc3RUYWJsZVJvdyA/IGZpcnN0VGFibGVSb3cubGlzdE9mQ29sdW1uc0NoYW5nZXMkIDogRU1QVFkpKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICApO1xuICAgICAgbGlzdE9mQ29sdW1uc0NoYW5nZXMkLnN1YnNjcmliZShkYXRhID0+IHRoaXMubnpUYWJsZVN0eWxlU2VydmljZS5zZXRMaXN0T2ZUaChkYXRhKSk7XG4gICAgICAvKiogVE9ETzogbmVlZCByZXNldCB0aGUgbWVhc3VyZSByb3cgd2hlbiBzY3JvbGxYIGNoYW5nZSAqKi9cbiAgICAgIHRoaXMubnpUYWJsZVN0eWxlU2VydmljZS5lbmFibGVBdXRvTWVhc3VyZSRcbiAgICAgICAgLnBpcGUoc3dpdGNoTWFwKGVuYWJsZSA9PiAoZW5hYmxlID8gbGlzdE9mQ29sdW1uc0NoYW5nZXMkIDogb2YoW10pKSkpXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgLnN1YnNjcmliZShkYXRhID0+IHRoaXMubnpUYWJsZVN0eWxlU2VydmljZS5zZXRMaXN0T2ZNZWFzdXJlQ29sdW1uKGRhdGEpKTtcbiAgICAgIGNvbnN0IGxpc3RPZkZpeGVkTGVmdENvbHVtbkNoYW5nZXMkID0gZmlyc3RUYWJsZVJvdyQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKGZpcnN0VHIgPT4gKGZpcnN0VHIgPyBmaXJzdFRyLmxpc3RPZkZpeGVkTGVmdENvbHVtbkNoYW5nZXMkIDogRU1QVFkpKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICApO1xuICAgICAgY29uc3QgbGlzdE9mRml4ZWRSaWdodENvbHVtbkNoYW5nZXMkID0gZmlyc3RUYWJsZVJvdyQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKGZpcnN0VHIgPT4gKGZpcnN0VHIgPyBmaXJzdFRyLmxpc3RPZkZpeGVkUmlnaHRDb2x1bW5DaGFuZ2VzJCA6IEVNUFRZKSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKVxuICAgICAgKTtcbiAgICAgIGxpc3RPZkZpeGVkTGVmdENvbHVtbkNoYW5nZXMkLnN1YnNjcmliZShsaXN0T2ZGaXhlZExlZnRDb2x1bW4gPT4ge1xuICAgICAgICB0aGlzLm56VGFibGVTdHlsZVNlcnZpY2Uuc2V0SGFzRml4TGVmdChsaXN0T2ZGaXhlZExlZnRDb2x1bW4ubGVuZ3RoICE9PSAwKTtcbiAgICAgIH0pO1xuICAgICAgbGlzdE9mRml4ZWRSaWdodENvbHVtbkNoYW5nZXMkLnN1YnNjcmliZShsaXN0T2ZGaXhlZFJpZ2h0Q29sdW1uID0+IHtcbiAgICAgICAgdGhpcy5uelRhYmxlU3R5bGVTZXJ2aWNlLnNldEhhc0ZpeFJpZ2h0KGxpc3RPZkZpeGVkUmlnaHRDb2x1bW4ubGVuZ3RoICE9PSAwKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5uelRhYmxlRGF0YVNlcnZpY2UpIHtcbiAgICAgIGNvbnN0IGxpc3RPZkNvbHVtbiQgPSB0aGlzLmxpc3RPZk56VGhBZGRPbkNvbXBvbmVudC5jaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKHRoaXMubGlzdE9mTnpUaEFkZE9uQ29tcG9uZW50KSkgYXMgT2JzZXJ2YWJsZTxcbiAgICAgICAgUXVlcnlMaXN0PE56VGhBZGRPbkNvbXBvbmVudD5cbiAgICAgID47XG4gICAgICBjb25zdCBtYW51YWxTb3J0JCA9IGxpc3RPZkNvbHVtbiQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IG1lcmdlKC4uLnRoaXMubGlzdE9mTnpUaEFkZE9uQ29tcG9uZW50Lm1hcCh0aCA9PiB0aC5tYW51YWxDbGlja09yZGVyJCkpKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICApO1xuICAgICAgbWFudWFsU29ydCQuc3Vic2NyaWJlKChkYXRhOiBOelRoQWRkT25Db21wb25lbnQpID0+IHtcbiAgICAgICAgY29uc3QgZW1pdFZhbHVlID0geyBrZXk6IGRhdGEubnpDb2x1bW5LZXksIHZhbHVlOiBkYXRhLnNvcnRPcmRlciB9O1xuICAgICAgICB0aGlzLm56U29ydENoYW5nZS5lbWl0KGVtaXRWYWx1ZSk7XG4gICAgICAgIHRoaXMubnpTb3J0T3JkZXJDaGFuZ2UuZW1pdChlbWl0VmFsdWUpO1xuICAgICAgICBpZiAodGhpcy5uelNpbmdsZVNvcnQgfHwgKGRhdGEubnpTb3J0Rm4gJiYgZGF0YS5uelNvcnRQcmlvcml0eSA9PT0gZmFsc2UpKSB7XG4gICAgICAgICAgdGhpcy5saXN0T2ZOelRoQWRkT25Db21wb25lbnQuZmlsdGVyKHRoID0+IHRoICE9PSBkYXRhKS5mb3JFYWNoKHRoID0+IHRoLmNsZWFyU29ydE9yZGVyKCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGxpc3RPZkNhbGNPcGVyYXRvciQgPSBsaXN0T2ZDb2x1bW4kLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcChsaXN0ID0+XG4gICAgICAgICAgbWVyZ2UoLi4uW2xpc3RPZkNvbHVtbiQsIC4uLmxpc3QubWFwKChjOiBOelRoQWRkT25Db21wb25lbnQpID0+IGMuY2FsY09wZXJhdG9yQ2hhbmdlJCldKS5waXBlKGZsYXRNYXAoKCkgPT4gbGlzdE9mQ29sdW1uJCkpXG4gICAgICAgICksXG4gICAgICAgIG1hcChsaXN0ID0+XG4gICAgICAgICAgbGlzdFxuICAgICAgICAgICAgLmZpbHRlcihpdGVtID0+ICEhaXRlbS5uelNvcnRGbiB8fCAhIWl0ZW0ubnpGaWx0ZXJGbilcbiAgICAgICAgICAgIC5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgbnpTb3J0Rm4sIHNvcnRPcmRlciwgbnpGaWx0ZXJGbiwgbnpGaWx0ZXJWYWx1ZSwgbnpTb3J0UHJpb3JpdHksIG56Q29sdW1uS2V5IH0gPSBpdGVtO1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGtleTogbnpDb2x1bW5LZXksXG4gICAgICAgICAgICAgICAgc29ydEZuOiBuelNvcnRGbixcbiAgICAgICAgICAgICAgICBzb3J0UHJpb3JpdHk6IG56U29ydFByaW9yaXR5LFxuICAgICAgICAgICAgICAgIHNvcnRPcmRlcjogc29ydE9yZGVyISxcbiAgICAgICAgICAgICAgICBmaWx0ZXJGbjogbnpGaWx0ZXJGbiEsXG4gICAgICAgICAgICAgICAgZmlsdGVyVmFsdWU6IG56RmlsdGVyVmFsdWVcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIC8vIFRPRE86IGFmdGVyIGNoZWNrZWQgZXJyb3IgaGVyZVxuICAgICAgICBkZWxheSgwKVxuICAgICAgKTtcbiAgICAgIGxpc3RPZkNhbGNPcGVyYXRvciQuc3Vic2NyaWJlKGxpc3QgPT4ge1xuICAgICAgICB0aGlzLm56VGFibGVEYXRhU2VydmljZS5saXN0T2ZDYWxjT3BlcmF0b3IkLm5leHQobGlzdCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpUYWJsZVN0eWxlU2VydmljZSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=