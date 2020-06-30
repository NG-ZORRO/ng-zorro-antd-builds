/**
 * @fileoverview added by tsickle
 * Generated from: src/table/thead.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __decorate, __metadata } from "tslib";
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
export class NzTheadComponent {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     * @param {?} nzTableStyleService
     * @param {?} nzTableDataService
     */
    constructor(elementRef, renderer, nzTableStyleService, nzTableDataService) {
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
    ngOnInit() {
        if (this.nzTableStyleService) {
            this.nzTableStyleService.setTheadTemplate(this.templateRef);
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const { nzSingleSort } = changes;
        if (nzSingleSort) {
            warnDeprecation(`'nzSingleSort' is deprecated and will be removed in 10.0.0. Please use 'nzSortFn' and 'nzSortPriority' instead.`);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (this.nzTableStyleService) {
            /** @type {?} */
            const firstTableRow$ = (/** @type {?} */ (this.listOfNzTrDirective.changes.pipe(startWith(this.listOfNzTrDirective), map((/**
             * @param {?} item
             * @return {?}
             */
            item => item && item.first)))));
            /** @type {?} */
            const listOfColumnsChanges$ = firstTableRow$.pipe(switchMap((/**
             * @param {?} firstTableRow
             * @return {?}
             */
            firstTableRow => (firstTableRow ? firstTableRow.listOfColumnsChanges$ : EMPTY))), takeUntil(this.destroy$));
            listOfColumnsChanges$.subscribe((/**
             * @param {?} data
             * @return {?}
             */
            data => this.nzTableStyleService.setListOfTh(data)));
            /** TODO: need reset the measure row when scrollX change **/
            this.nzTableStyleService.enableAutoMeasure$
                .pipe(switchMap((/**
             * @param {?} enable
             * @return {?}
             */
            enable => (enable ? listOfColumnsChanges$ : of([])))))
                .pipe(takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} data
             * @return {?}
             */
            data => this.nzTableStyleService.setListOfMeasureColumn(data)));
            /** @type {?} */
            const listOfFixedLeftColumnChanges$ = firstTableRow$.pipe(switchMap((/**
             * @param {?} firstTr
             * @return {?}
             */
            firstTr => (firstTr ? firstTr.listOfFixedLeftColumnChanges$ : EMPTY))), takeUntil(this.destroy$));
            /** @type {?} */
            const listOfFixedRightColumnChanges$ = firstTableRow$.pipe(switchMap((/**
             * @param {?} firstTr
             * @return {?}
             */
            firstTr => (firstTr ? firstTr.listOfFixedRightColumnChanges$ : EMPTY))), takeUntil(this.destroy$));
            listOfFixedLeftColumnChanges$.subscribe((/**
             * @param {?} listOfFixedLeftColumn
             * @return {?}
             */
            listOfFixedLeftColumn => {
                this.nzTableStyleService.setHasFixLeft(listOfFixedLeftColumn.length !== 0);
            }));
            listOfFixedRightColumnChanges$.subscribe((/**
             * @param {?} listOfFixedRightColumn
             * @return {?}
             */
            listOfFixedRightColumn => {
                this.nzTableStyleService.setHasFixRight(listOfFixedRightColumn.length !== 0);
            }));
        }
        if (this.nzTableDataService) {
            /** @type {?} */
            const listOfColumn$ = (/** @type {?} */ (this.listOfNzThAddOnComponent.changes.pipe(startWith(this.listOfNzThAddOnComponent))));
            /** @type {?} */
            const manualSort$ = listOfColumn$.pipe(switchMap((/**
             * @return {?}
             */
            () => merge(...this.listOfNzThAddOnComponent.map((/**
             * @param {?} th
             * @return {?}
             */
            th => th.manualClickOrder$))))), takeUntil(this.destroy$));
            manualSort$.subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                /** @type {?} */
                const emitValue = { key: data.nzColumnKey, value: data.sortOrder };
                this.nzSortChange.emit(emitValue);
                this.nzSortOrderChange.emit(emitValue);
                if (this.nzSingleSort || (data.nzSortFn && data.nzSortPriority === false)) {
                    this.listOfNzThAddOnComponent.filter((/**
                     * @param {?} th
                     * @return {?}
                     */
                    th => th !== data)).forEach((/**
                     * @param {?} th
                     * @return {?}
                     */
                    th => th.clearSortOrder()));
                }
            }));
            /** @type {?} */
            const listOfCalcOperator$ = listOfColumn$.pipe(switchMap((/**
             * @param {?} list
             * @return {?}
             */
            list => merge(...[listOfColumn$, ...list.map((/**
                 * @param {?} c
                 * @return {?}
                 */
                (c) => c.calcOperatorChange$))]).pipe(flatMap((/**
             * @return {?}
             */
            () => listOfColumn$))))), map((/**
             * @param {?} list
             * @return {?}
             */
            list => list
                .filter((/**
             * @param {?} item
             * @return {?}
             */
            item => !!item.nzSortFn || !!item.nzFilterFn))
                .map((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                const { nzSortFn, sortOrder, nzFilterFn, nzFilterValue, nzSortPriority, nzColumnKey } = item;
                return {
                    key: nzColumnKey,
                    sortFn: nzSortFn,
                    sortPriority: nzSortPriority,
                    sortOrder: (/** @type {?} */ (sortOrder)),
                    filterFn: (/** @type {?} */ (nzFilterFn)),
                    filterValue: nzFilterValue
                };
            })))), 
            // TODO: after checked error here
            delay(0));
            listOfCalcOperator$.subscribe((/**
             * @param {?} list
             * @return {?}
             */
            list => {
                this.nzTableDataService.listOfCalcOperator$.next(list);
            }));
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.nzTableStyleService) {
            this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), this.elementRef.nativeElement);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzTheadComponent.decorators = [
    { type: Component, args: [{
                selector: 'thead:not(.ant-table-thead)',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
    <ng-container *ngIf="!isInsideTable">
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    </ng-container>
  `
            }] }
];
/** @nocollapse */
NzTheadComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NzTableStyleService, decorators: [{ type: Optional }] },
    { type: NzTableDataService, decorators: [{ type: Optional }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC90YWJsZS8iLCJzb3VyY2VzIjpbInNyYy90YWJsZS90aGVhZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFLQSxPQUFPLEVBR0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBSUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUVULFdBQVcsRUFDWCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUc1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFlL0MsTUFBTSxPQUFPLGdCQUFnQjs7Ozs7OztJQWMzQixZQUNVLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ1AsbUJBQXdDLEVBQ3hDLGtCQUFzQztRQUhsRCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDUCx3QkFBbUIs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SGtCO0lBQWYsWUFBWSxFQUFFOztzREFBc0I7OztJQVI5QyxnREFBb0Q7Ozs7O0lBRXBELG9DQUF1Qzs7SUFDdkMseUNBQXNCOztJQUN0Qix1Q0FBcUY7O0lBQ3JGLCtDQUErRTs7SUFDL0Usb0RBQXFIOzs7OztJQUVySCx3Q0FBOEM7Ozs7O0lBRTlDLHdDQUErRjs7SUFDL0YsNkNBQW9HOzs7OztJQUdsRyxzQ0FBOEI7Ozs7O0lBQzlCLG9DQUEyQjs7Ozs7SUFDM0IsK0NBQTREOzs7OztJQUM1RCw4Q0FBMEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuLyogdHNsaW50OmRpc2FibGU6Y29tcG9uZW50LXNlbGVjdG9yICovXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHdhcm5EZXByZWNhdGlvbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9sb2dnZXInO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBFTVBUWSwgbWVyZ2UsIE9ic2VydmFibGUsIG9mLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWxheSwgZmxhdE1hcCwgbWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTnpUaEFkZE9uQ29tcG9uZW50IH0gZnJvbSAnLi4vY2VsbC90aC1hZGRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpUYWJsZURhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vdGFibGUtZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IE56VGFibGVTdHlsZVNlcnZpY2UgfSBmcm9tICcuLi90YWJsZS1zdHlsZS5zZXJ2aWNlJztcbmltcG9ydCB7IE56VHJEaXJlY3RpdmUgfSBmcm9tICcuL3RyLmRpcmVjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoZWFkOm5vdCguYW50LXRhYmxlLXRoZWFkKScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjY29udGVudFRlbXBsYXRlPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc0luc2lkZVRhYmxlXCI+XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudFRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOelRoZWFkQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNpbmdsZVNvcnQ6IEJvb2xlYW5JbnB1dDtcblxuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgaXNJbnNpZGVUYWJsZSA9IGZhbHNlO1xuICBAVmlld0NoaWxkKCdjb250ZW50VGVtcGxhdGUnLCB7IHN0YXRpYzogdHJ1ZSB9KSB0ZW1wbGF0ZVJlZiE6IFRlbXBsYXRlUmVmPE56U2FmZUFueT47XG4gIEBDb250ZW50Q2hpbGRyZW4oTnpUckRpcmVjdGl2ZSkgbGlzdE9mTnpUckRpcmVjdGl2ZSE6IFF1ZXJ5TGlzdDxOelRyRGlyZWN0aXZlPjtcbiAgQENvbnRlbnRDaGlsZHJlbihOelRoQWRkT25Db21wb25lbnQsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgbGlzdE9mTnpUaEFkZE9uQ29tcG9uZW50ITogUXVlcnlMaXN0PE56VGhBZGRPbkNvbXBvbmVudD47XG4gIC8qKiBAZGVwcmVjYXRlZCB1c2UgbnpTb3J0Rm4gYW5kIG56U29ydFByaW9yaXR5IGluc3RlYWQgKiovXG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNpbmdsZVNvcnQgPSBmYWxzZTtcbiAgLyoqIEBkZXByZWNhdGVkIHVzZSBuelNvcnRPcmRlckNoYW5nZSBpbnN0ZWFkICoqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpTb3J0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7IGtleTogTnpTYWZlQW55OyB2YWx1ZTogc3RyaW5nIHwgbnVsbCB9PigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpTb3J0T3JkZXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHsga2V5OiBOelNhZmVBbnk7IHZhbHVlOiBzdHJpbmcgfCBudWxsIH0+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIG56VGFibGVTdHlsZVNlcnZpY2U6IE56VGFibGVTdHlsZVNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBuelRhYmxlRGF0YVNlcnZpY2U6IE56VGFibGVEYXRhU2VydmljZVxuICApIHtcbiAgICB0aGlzLmlzSW5zaWRlVGFibGUgPSAhIXRoaXMubnpUYWJsZVN0eWxlU2VydmljZTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56VGFibGVTdHlsZVNlcnZpY2UpIHtcbiAgICAgIHRoaXMubnpUYWJsZVN0eWxlU2VydmljZS5zZXRUaGVhZFRlbXBsYXRlKHRoaXMudGVtcGxhdGVSZWYpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56U2luZ2xlU29ydCB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpTaW5nbGVTb3J0KSB7XG4gICAgICB3YXJuRGVwcmVjYXRpb24oXG4gICAgICAgIGAnbnpTaW5nbGVTb3J0JyBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gMTAuMC4wLiBQbGVhc2UgdXNlICduelNvcnRGbicgYW5kICduelNvcnRQcmlvcml0eScgaW5zdGVhZC5gXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uelRhYmxlU3R5bGVTZXJ2aWNlKSB7XG4gICAgICBjb25zdCBmaXJzdFRhYmxlUm93JCA9IHRoaXMubGlzdE9mTnpUckRpcmVjdGl2ZS5jaGFuZ2VzLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCh0aGlzLmxpc3RPZk56VHJEaXJlY3RpdmUpLFxuICAgICAgICBtYXAoaXRlbSA9PiBpdGVtICYmIGl0ZW0uZmlyc3QpXG4gICAgICApIGFzIE9ic2VydmFibGU8TnpUckRpcmVjdGl2ZT47XG4gICAgICBjb25zdCBsaXN0T2ZDb2x1bW5zQ2hhbmdlcyQgPSBmaXJzdFRhYmxlUm93JC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoZmlyc3RUYWJsZVJvdyA9PiAoZmlyc3RUYWJsZVJvdyA/IGZpcnN0VGFibGVSb3cubGlzdE9mQ29sdW1uc0NoYW5nZXMkIDogRU1QVFkpKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICApO1xuICAgICAgbGlzdE9mQ29sdW1uc0NoYW5nZXMkLnN1YnNjcmliZShkYXRhID0+IHRoaXMubnpUYWJsZVN0eWxlU2VydmljZS5zZXRMaXN0T2ZUaChkYXRhKSk7XG4gICAgICAvKiogVE9ETzogbmVlZCByZXNldCB0aGUgbWVhc3VyZSByb3cgd2hlbiBzY3JvbGxYIGNoYW5nZSAqKi9cbiAgICAgIHRoaXMubnpUYWJsZVN0eWxlU2VydmljZS5lbmFibGVBdXRvTWVhc3VyZSRcbiAgICAgICAgLnBpcGUoc3dpdGNoTWFwKGVuYWJsZSA9PiAoZW5hYmxlID8gbGlzdE9mQ29sdW1uc0NoYW5nZXMkIDogb2YoW10pKSkpXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgLnN1YnNjcmliZShkYXRhID0+IHRoaXMubnpUYWJsZVN0eWxlU2VydmljZS5zZXRMaXN0T2ZNZWFzdXJlQ29sdW1uKGRhdGEpKTtcbiAgICAgIGNvbnN0IGxpc3RPZkZpeGVkTGVmdENvbHVtbkNoYW5nZXMkID0gZmlyc3RUYWJsZVJvdyQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKGZpcnN0VHIgPT4gKGZpcnN0VHIgPyBmaXJzdFRyLmxpc3RPZkZpeGVkTGVmdENvbHVtbkNoYW5nZXMkIDogRU1QVFkpKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICApO1xuICAgICAgY29uc3QgbGlzdE9mRml4ZWRSaWdodENvbHVtbkNoYW5nZXMkID0gZmlyc3RUYWJsZVJvdyQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKGZpcnN0VHIgPT4gKGZpcnN0VHIgPyBmaXJzdFRyLmxpc3RPZkZpeGVkUmlnaHRDb2x1bW5DaGFuZ2VzJCA6IEVNUFRZKSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKVxuICAgICAgKTtcbiAgICAgIGxpc3RPZkZpeGVkTGVmdENvbHVtbkNoYW5nZXMkLnN1YnNjcmliZShsaXN0T2ZGaXhlZExlZnRDb2x1bW4gPT4ge1xuICAgICAgICB0aGlzLm56VGFibGVTdHlsZVNlcnZpY2Uuc2V0SGFzRml4TGVmdChsaXN0T2ZGaXhlZExlZnRDb2x1bW4ubGVuZ3RoICE9PSAwKTtcbiAgICAgIH0pO1xuICAgICAgbGlzdE9mRml4ZWRSaWdodENvbHVtbkNoYW5nZXMkLnN1YnNjcmliZShsaXN0T2ZGaXhlZFJpZ2h0Q29sdW1uID0+IHtcbiAgICAgICAgdGhpcy5uelRhYmxlU3R5bGVTZXJ2aWNlLnNldEhhc0ZpeFJpZ2h0KGxpc3RPZkZpeGVkUmlnaHRDb2x1bW4ubGVuZ3RoICE9PSAwKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5uelRhYmxlRGF0YVNlcnZpY2UpIHtcbiAgICAgIGNvbnN0IGxpc3RPZkNvbHVtbiQgPSB0aGlzLmxpc3RPZk56VGhBZGRPbkNvbXBvbmVudC5jaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKHRoaXMubGlzdE9mTnpUaEFkZE9uQ29tcG9uZW50KSkgYXMgT2JzZXJ2YWJsZTxcbiAgICAgICAgUXVlcnlMaXN0PE56VGhBZGRPbkNvbXBvbmVudD5cbiAgICAgID47XG4gICAgICBjb25zdCBtYW51YWxTb3J0JCA9IGxpc3RPZkNvbHVtbiQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IG1lcmdlKC4uLnRoaXMubGlzdE9mTnpUaEFkZE9uQ29tcG9uZW50Lm1hcCh0aCA9PiB0aC5tYW51YWxDbGlja09yZGVyJCkpKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICApO1xuICAgICAgbWFudWFsU29ydCQuc3Vic2NyaWJlKChkYXRhOiBOelRoQWRkT25Db21wb25lbnQpID0+IHtcbiAgICAgICAgY29uc3QgZW1pdFZhbHVlID0geyBrZXk6IGRhdGEubnpDb2x1bW5LZXksIHZhbHVlOiBkYXRhLnNvcnRPcmRlciB9O1xuICAgICAgICB0aGlzLm56U29ydENoYW5nZS5lbWl0KGVtaXRWYWx1ZSk7XG4gICAgICAgIHRoaXMubnpTb3J0T3JkZXJDaGFuZ2UuZW1pdChlbWl0VmFsdWUpO1xuICAgICAgICBpZiAodGhpcy5uelNpbmdsZVNvcnQgfHwgKGRhdGEubnpTb3J0Rm4gJiYgZGF0YS5uelNvcnRQcmlvcml0eSA9PT0gZmFsc2UpKSB7XG4gICAgICAgICAgdGhpcy5saXN0T2ZOelRoQWRkT25Db21wb25lbnQuZmlsdGVyKHRoID0+IHRoICE9PSBkYXRhKS5mb3JFYWNoKHRoID0+IHRoLmNsZWFyU29ydE9yZGVyKCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGxpc3RPZkNhbGNPcGVyYXRvciQgPSBsaXN0T2ZDb2x1bW4kLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcChsaXN0ID0+XG4gICAgICAgICAgbWVyZ2UoLi4uW2xpc3RPZkNvbHVtbiQsIC4uLmxpc3QubWFwKChjOiBOelRoQWRkT25Db21wb25lbnQpID0+IGMuY2FsY09wZXJhdG9yQ2hhbmdlJCldKS5waXBlKGZsYXRNYXAoKCkgPT4gbGlzdE9mQ29sdW1uJCkpXG4gICAgICAgICksXG4gICAgICAgIG1hcChsaXN0ID0+XG4gICAgICAgICAgbGlzdFxuICAgICAgICAgICAgLmZpbHRlcihpdGVtID0+ICEhaXRlbS5uelNvcnRGbiB8fCAhIWl0ZW0ubnpGaWx0ZXJGbilcbiAgICAgICAgICAgIC5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgbnpTb3J0Rm4sIHNvcnRPcmRlciwgbnpGaWx0ZXJGbiwgbnpGaWx0ZXJWYWx1ZSwgbnpTb3J0UHJpb3JpdHksIG56Q29sdW1uS2V5IH0gPSBpdGVtO1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGtleTogbnpDb2x1bW5LZXksXG4gICAgICAgICAgICAgICAgc29ydEZuOiBuelNvcnRGbixcbiAgICAgICAgICAgICAgICBzb3J0UHJpb3JpdHk6IG56U29ydFByaW9yaXR5LFxuICAgICAgICAgICAgICAgIHNvcnRPcmRlcjogc29ydE9yZGVyISxcbiAgICAgICAgICAgICAgICBmaWx0ZXJGbjogbnpGaWx0ZXJGbiEsXG4gICAgICAgICAgICAgICAgZmlsdGVyVmFsdWU6IG56RmlsdGVyVmFsdWVcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIC8vIFRPRE86IGFmdGVyIGNoZWNrZWQgZXJyb3IgaGVyZVxuICAgICAgICBkZWxheSgwKVxuICAgICAgKTtcbiAgICAgIGxpc3RPZkNhbGNPcGVyYXRvciQuc3Vic2NyaWJlKGxpc3QgPT4ge1xuICAgICAgICB0aGlzLm56VGFibGVEYXRhU2VydmljZS5saXN0T2ZDYWxjT3BlcmF0b3IkLm5leHQobGlzdCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpUYWJsZVN0eWxlU2VydmljZSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=