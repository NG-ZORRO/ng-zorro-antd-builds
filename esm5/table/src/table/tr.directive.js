/**
 * @fileoverview added by tsickle
 * Generated from: src/table/tr.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __spread } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ContentChildren, Directive, Optional, QueryList } from '@angular/core';
import { combineLatest, merge, ReplaySubject, Subject } from 'rxjs';
import { flatMap, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { NzCellFixedDirective } from '../cell/cell-fixed.directive';
import { NzThMeasureDirective } from '../cell/th-measure.directive';
import { NzTableStyleService } from '../table-style.service';
var NzTrDirective = /** @class */ (function () {
    function NzTrDirective(nzTableStyleService) {
        var _this = this;
        this.nzTableStyleService = nzTableStyleService;
        this.destroy$ = new Subject();
        this.listOfFixedColumns$ = new ReplaySubject(1);
        this.listOfColumns$ = new ReplaySubject(1);
        this.listOfFixedColumnsChanges$ = this.listOfFixedColumns$.pipe(switchMap((/**
         * @param {?} list
         * @return {?}
         */
        function (list) {
            return merge.apply(void 0, __spread([_this.listOfFixedColumns$], list.map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.changes$; })))).pipe(flatMap((/**
             * @return {?}
             */
            function () { return _this.listOfFixedColumns$; })));
        })), takeUntil(this.destroy$));
        this.listOfFixedLeftColumnChanges$ = this.listOfFixedColumnsChanges$.pipe(map((/**
         * @param {?} list
         * @return {?}
         */
        function (list) { return list.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.nzLeft !== false; })); })));
        this.listOfFixedRightColumnChanges$ = this.listOfFixedColumnsChanges$.pipe(map((/**
         * @param {?} list
         * @return {?}
         */
        function (list) { return list.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.nzRight !== false; })); })));
        this.listOfColumnsChanges$ = this.listOfColumns$.pipe(switchMap((/**
         * @param {?} list
         * @return {?}
         */
        function (list) {
            return merge.apply(void 0, __spread([_this.listOfColumns$], list.map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.changes$; })))).pipe(flatMap((/**
             * @return {?}
             */
            function () { return _this.listOfColumns$; })));
        })), takeUntil(this.destroy$));
        this.isInsideTable = false;
        this.isInsideTable = !!nzTableStyleService;
    }
    /**
     * @return {?}
     */
    NzTrDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        if (this.nzTableStyleService) {
            this.listOfCellFixedDirective.changes
                .pipe(startWith(this.listOfCellFixedDirective), takeUntil(this.destroy$))
                .subscribe(this.listOfFixedColumns$);
            this.listOfNzThDirective.changes.pipe(startWith(this.listOfNzThDirective), takeUntil(this.destroy$)).subscribe(this.listOfColumns$);
            /** set last left and first right **/
            this.listOfFixedLeftColumnChanges$.subscribe((/**
             * @param {?} listOfFixedLeft
             * @return {?}
             */
            function (listOfFixedLeft) {
                listOfFixedLeft.forEach((/**
                 * @param {?} cell
                 * @return {?}
                 */
                function (cell) { return cell.setIsLastLeft(cell === listOfFixedLeft[listOfFixedLeft.length - 1]); }));
            }));
            this.listOfFixedRightColumnChanges$.subscribe((/**
             * @param {?} listOfFixedRight
             * @return {?}
             */
            function (listOfFixedRight) {
                listOfFixedRight.forEach((/**
                 * @param {?} cell
                 * @return {?}
                 */
                function (cell) { return cell.setIsFirstRight(cell === listOfFixedRight[0]); }));
            }));
            /** calculate fixed nzLeft and nzRight **/
            combineLatest([this.nzTableStyleService.listOfListOfThWidth$, this.listOfFixedLeftColumnChanges$]).subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), listOfAutoWidth = _b[0], listOfLeftCell = _b[1];
                listOfLeftCell.forEach((/**
                 * @param {?} cell
                 * @param {?} index
                 * @return {?}
                 */
                function (cell, index) {
                    if (cell.isAutoLeft) {
                        /** @type {?} */
                        var currentArray = listOfLeftCell.slice(0, index);
                        /** @type {?} */
                        var count = currentArray.reduce((/**
                         * @param {?} pre
                         * @param {?} cur
                         * @return {?}
                         */
                        function (pre, cur) { return pre + (cur.colspan || 1); }), 0);
                        /** @type {?} */
                        var width = listOfAutoWidth.slice(0, count).reduce((/**
                         * @param {?} pre
                         * @param {?} cur
                         * @return {?}
                         */
                        function (pre, cur) { return pre + cur; }), 0);
                        cell.setAutoLeftWidth(width + "px");
                    }
                }));
            }));
            combineLatest([this.nzTableStyleService.listOfListOfThWidth$, this.listOfFixedRightColumnChanges$]).subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), listOfAutoWidth = _b[0], listOfRightCell = _b[1];
                listOfRightCell.forEach((/**
                 * @param {?} _
                 * @param {?} index
                 * @return {?}
                 */
                function (_, index) {
                    /** @type {?} */
                    var cell = listOfRightCell[listOfRightCell.length - index - 1];
                    if (cell.isAutoRight) {
                        /** @type {?} */
                        var currentArray = listOfRightCell.slice(listOfRightCell.length - index, listOfRightCell.length);
                        /** @type {?} */
                        var count = currentArray.reduce((/**
                         * @param {?} pre
                         * @param {?} cur
                         * @return {?}
                         */
                        function (pre, cur) { return pre + (cur.colspan || 1); }), 0);
                        /** @type {?} */
                        var width = listOfAutoWidth
                            .slice(listOfAutoWidth.length - count, listOfAutoWidth.length)
                            .reduce((/**
                         * @param {?} pre
                         * @param {?} cur
                         * @return {?}
                         */
                        function (pre, cur) { return pre + cur; }), 0);
                        cell.setAutoRightWidth(width + "px");
                    }
                }));
            }));
        }
    };
    /**
     * @return {?}
     */
    NzTrDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    NzTrDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'tr:not([mat-row]):not([mat-header-row]):not([nz-table-measure-row]):not([nzExpand]):not([nz-table-fixed-row])',
                    host: {
                        '[class.ant-table-row]': 'isInsideTable'
                    }
                },] }
    ];
    /** @nocollapse */
    NzTrDirective.ctorParameters = function () { return [
        { type: NzTableStyleService, decorators: [{ type: Optional }] }
    ]; };
    NzTrDirective.propDecorators = {
        listOfNzThDirective: [{ type: ContentChildren, args: [NzThMeasureDirective,] }],
        listOfCellFixedDirective: [{ type: ContentChildren, args: [NzCellFixedDirective,] }]
    };
    return NzTrDirective;
}());
export { NzTrDirective };
if (false) {
    /** @type {?} */
    NzTrDirective.prototype.listOfNzThDirective;
    /** @type {?} */
    NzTrDirective.prototype.listOfCellFixedDirective;
    /**
     * @type {?}
     * @private
     */
    NzTrDirective.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    NzTrDirective.prototype.listOfFixedColumns$;
    /**
     * @type {?}
     * @private
     */
    NzTrDirective.prototype.listOfColumns$;
    /** @type {?} */
    NzTrDirective.prototype.listOfFixedColumnsChanges$;
    /** @type {?} */
    NzTrDirective.prototype.listOfFixedLeftColumnChanges$;
    /** @type {?} */
    NzTrDirective.prototype.listOfFixedRightColumnChanges$;
    /** @type {?} */
    NzTrDirective.prototype.listOfColumnsChanges$;
    /** @type {?} */
    NzTrDirective.prototype.isInsideTable;
    /**
     * @type {?}
     * @private
     */
    NzTrDirective.prototype.nzTableStyleService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC90YWJsZS8iLCJzb3VyY2VzIjpbInNyYy90YWJsZS90ci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBb0IsZUFBZSxFQUFFLFNBQVMsRUFBYSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdHLE9BQU8sRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFjLGFBQWEsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEYsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU3RDtJQThCRSx1QkFBZ0MsbUJBQXdDO1FBQXhFLGlCQUVDO1FBRitCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFyQmhFLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQy9CLHdCQUFtQixHQUFHLElBQUksYUFBYSxDQUF5QixDQUFDLENBQUMsQ0FBQztRQUNuRSxtQkFBYyxHQUFHLElBQUksYUFBYSxDQUF5QixDQUFDLENBQUMsQ0FBQztRQUN0RSwrQkFBMEIsR0FBdUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FDNUYsU0FBUzs7OztRQUFDLFVBQUEsSUFBSTtZQUNaLE9BQUEsS0FBSyx5QkFBSyxLQUFJLENBQUMsbUJBQW1CLEdBQUssSUFBSSxDQUFDLEdBQUc7Ozs7WUFBQyxVQUFDLENBQXVCLElBQUssT0FBQSxDQUFDLENBQUMsUUFBUSxFQUFWLENB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O1NBNUVZLGFBQWE7OztJQUN4Qiw0Q0FBNkY7O0lBQzdGLGlEQUFrRzs7Ozs7SUFDbEcsaUNBQXVDOzs7OztJQUN2Qyw0Q0FBMkU7Ozs7O0lBQzNFLHVDQUFzRTs7SUFDdEUsbURBT0U7O0lBQ0Ysc0RBQThIOztJQUM5SCx1REFBZ0k7O0lBQ2hJLDhDQUtFOztJQUNGLHNDQUFzQjs7Ozs7SUFFViw0Q0FBNEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgT25EZXN0cm95LCBPcHRpb25hbCwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBtZXJnZSwgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmxhdE1hcCwgbWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTnpDZWxsRml4ZWREaXJlY3RpdmUgfSBmcm9tICcuLi9jZWxsL2NlbGwtZml4ZWQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE56VGhNZWFzdXJlRGlyZWN0aXZlIH0gZnJvbSAnLi4vY2VsbC90aC1tZWFzdXJlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOelRhYmxlU3R5bGVTZXJ2aWNlIH0gZnJvbSAnLi4vdGFibGUtc3R5bGUuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RyOm5vdChbbWF0LXJvd10pOm5vdChbbWF0LWhlYWRlci1yb3ddKTpub3QoW256LXRhYmxlLW1lYXN1cmUtcm93XSk6bm90KFtuekV4cGFuZF0pOm5vdChbbnotdGFibGUtZml4ZWQtcm93XSknLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtdGFibGUtcm93XSc6ICdpc0luc2lkZVRhYmxlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VHJEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBAQ29udGVudENoaWxkcmVuKE56VGhNZWFzdXJlRGlyZWN0aXZlKSBsaXN0T2ZOelRoRGlyZWN0aXZlITogUXVlcnlMaXN0PE56VGhNZWFzdXJlRGlyZWN0aXZlPjtcbiAgQENvbnRlbnRDaGlsZHJlbihOekNlbGxGaXhlZERpcmVjdGl2ZSkgbGlzdE9mQ2VsbEZpeGVkRGlyZWN0aXZlITogUXVlcnlMaXN0PE56Q2VsbEZpeGVkRGlyZWN0aXZlPjtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgbGlzdE9mRml4ZWRDb2x1bW5zJCA9IG5ldyBSZXBsYXlTdWJqZWN0PE56Q2VsbEZpeGVkRGlyZWN0aXZlW10+KDEpO1xuICBwcml2YXRlIGxpc3RPZkNvbHVtbnMkID0gbmV3IFJlcGxheVN1YmplY3Q8TnpUaE1lYXN1cmVEaXJlY3RpdmVbXT4oMSk7XG4gIGxpc3RPZkZpeGVkQ29sdW1uc0NoYW5nZXMkOiBPYnNlcnZhYmxlPE56Q2VsbEZpeGVkRGlyZWN0aXZlW10+ID0gdGhpcy5saXN0T2ZGaXhlZENvbHVtbnMkLnBpcGUoXG4gICAgc3dpdGNoTWFwKGxpc3QgPT5cbiAgICAgIG1lcmdlKC4uLlt0aGlzLmxpc3RPZkZpeGVkQ29sdW1ucyQsIC4uLmxpc3QubWFwKChjOiBOekNlbGxGaXhlZERpcmVjdGl2ZSkgPT4gYy5jaGFuZ2VzJCldKS5waXBlKFxuICAgICAgICBmbGF0TWFwKCgpID0+IHRoaXMubGlzdE9mRml4ZWRDb2x1bW5zJClcbiAgICAgIClcbiAgICApLFxuICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKVxuICApO1xuICBsaXN0T2ZGaXhlZExlZnRDb2x1bW5DaGFuZ2VzJCA9IHRoaXMubGlzdE9mRml4ZWRDb2x1bW5zQ2hhbmdlcyQucGlwZShtYXAobGlzdCA9PiBsaXN0LmZpbHRlcihpdGVtID0+IGl0ZW0ubnpMZWZ0ICE9PSBmYWxzZSkpKTtcbiAgbGlzdE9mRml4ZWRSaWdodENvbHVtbkNoYW5nZXMkID0gdGhpcy5saXN0T2ZGaXhlZENvbHVtbnNDaGFuZ2VzJC5waXBlKG1hcChsaXN0ID0+IGxpc3QuZmlsdGVyKGl0ZW0gPT4gaXRlbS5uelJpZ2h0ICE9PSBmYWxzZSkpKTtcbiAgbGlzdE9mQ29sdW1uc0NoYW5nZXMkOiBPYnNlcnZhYmxlPE56VGhNZWFzdXJlRGlyZWN0aXZlW10+ID0gdGhpcy5saXN0T2ZDb2x1bW5zJC5waXBlKFxuICAgIHN3aXRjaE1hcChsaXN0ID0+XG4gICAgICBtZXJnZSguLi5bdGhpcy5saXN0T2ZDb2x1bW5zJCwgLi4ubGlzdC5tYXAoKGM6IE56VGhNZWFzdXJlRGlyZWN0aXZlKSA9PiBjLmNoYW5nZXMkKV0pLnBpcGUoZmxhdE1hcCgoKSA9PiB0aGlzLmxpc3RPZkNvbHVtbnMkKSlcbiAgICApLFxuICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKVxuICApO1xuICBpc0luc2lkZVRhYmxlID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgcHJpdmF0ZSBuelRhYmxlU3R5bGVTZXJ2aWNlOiBOelRhYmxlU3R5bGVTZXJ2aWNlKSB7XG4gICAgdGhpcy5pc0luc2lkZVRhYmxlID0gISFuelRhYmxlU3R5bGVTZXJ2aWNlO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56VGFibGVTdHlsZVNlcnZpY2UpIHtcbiAgICAgIHRoaXMubGlzdE9mQ2VsbEZpeGVkRGlyZWN0aXZlLmNoYW5nZXNcbiAgICAgICAgLnBpcGUoc3RhcnRXaXRoKHRoaXMubGlzdE9mQ2VsbEZpeGVkRGlyZWN0aXZlKSwgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMubGlzdE9mRml4ZWRDb2x1bW5zJCk7XG4gICAgICB0aGlzLmxpc3RPZk56VGhEaXJlY3RpdmUuY2hhbmdlcy5waXBlKHN0YXJ0V2l0aCh0aGlzLmxpc3RPZk56VGhEaXJlY3RpdmUpLCB0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSh0aGlzLmxpc3RPZkNvbHVtbnMkKTtcbiAgICAgIC8qKiBzZXQgbGFzdCBsZWZ0IGFuZCBmaXJzdCByaWdodCAqKi9cbiAgICAgIHRoaXMubGlzdE9mRml4ZWRMZWZ0Q29sdW1uQ2hhbmdlcyQuc3Vic2NyaWJlKGxpc3RPZkZpeGVkTGVmdCA9PiB7XG4gICAgICAgIGxpc3RPZkZpeGVkTGVmdC5mb3JFYWNoKGNlbGwgPT4gY2VsbC5zZXRJc0xhc3RMZWZ0KGNlbGwgPT09IGxpc3RPZkZpeGVkTGVmdFtsaXN0T2ZGaXhlZExlZnQubGVuZ3RoIC0gMV0pKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5saXN0T2ZGaXhlZFJpZ2h0Q29sdW1uQ2hhbmdlcyQuc3Vic2NyaWJlKGxpc3RPZkZpeGVkUmlnaHQgPT4ge1xuICAgICAgICBsaXN0T2ZGaXhlZFJpZ2h0LmZvckVhY2goY2VsbCA9PiBjZWxsLnNldElzRmlyc3RSaWdodChjZWxsID09PSBsaXN0T2ZGaXhlZFJpZ2h0WzBdKSk7XG4gICAgICB9KTtcbiAgICAgIC8qKiBjYWxjdWxhdGUgZml4ZWQgbnpMZWZ0IGFuZCBuelJpZ2h0ICoqL1xuICAgICAgY29tYmluZUxhdGVzdChbdGhpcy5uelRhYmxlU3R5bGVTZXJ2aWNlLmxpc3RPZkxpc3RPZlRoV2lkdGgkLCB0aGlzLmxpc3RPZkZpeGVkTGVmdENvbHVtbkNoYW5nZXMkXSkuc3Vic2NyaWJlKFxuICAgICAgICAoW2xpc3RPZkF1dG9XaWR0aCwgbGlzdE9mTGVmdENlbGxdKSA9PiB7XG4gICAgICAgICAgbGlzdE9mTGVmdENlbGwuZm9yRWFjaCgoY2VsbCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChjZWxsLmlzQXV0b0xlZnQpIHtcbiAgICAgICAgICAgICAgY29uc3QgY3VycmVudEFycmF5ID0gbGlzdE9mTGVmdENlbGwuc2xpY2UoMCwgaW5kZXgpO1xuICAgICAgICAgICAgICBjb25zdCBjb3VudCA9IGN1cnJlbnRBcnJheS5yZWR1Y2UoKHByZSwgY3VyKSA9PiBwcmUgKyAoY3VyLmNvbHNwYW4gfHwgMSksIDApO1xuICAgICAgICAgICAgICBjb25zdCB3aWR0aCA9IGxpc3RPZkF1dG9XaWR0aC5zbGljZSgwLCBjb3VudCkucmVkdWNlKChwcmUsIGN1cikgPT4gcHJlICsgY3VyLCAwKTtcbiAgICAgICAgICAgICAgY2VsbC5zZXRBdXRvTGVmdFdpZHRoKGAke3dpZHRofXB4YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICBjb21iaW5lTGF0ZXN0KFt0aGlzLm56VGFibGVTdHlsZVNlcnZpY2UubGlzdE9mTGlzdE9mVGhXaWR0aCQsIHRoaXMubGlzdE9mRml4ZWRSaWdodENvbHVtbkNoYW5nZXMkXSkuc3Vic2NyaWJlKFxuICAgICAgICAoW2xpc3RPZkF1dG9XaWR0aCwgbGlzdE9mUmlnaHRDZWxsXSkgPT4ge1xuICAgICAgICAgIGxpc3RPZlJpZ2h0Q2VsbC5mb3JFYWNoKChfLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IGxpc3RPZlJpZ2h0Q2VsbFtsaXN0T2ZSaWdodENlbGwubGVuZ3RoIC0gaW5kZXggLSAxXTtcbiAgICAgICAgICAgIGlmIChjZWxsLmlzQXV0b1JpZ2h0KSB7XG4gICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRBcnJheSA9IGxpc3RPZlJpZ2h0Q2VsbC5zbGljZShsaXN0T2ZSaWdodENlbGwubGVuZ3RoIC0gaW5kZXgsIGxpc3RPZlJpZ2h0Q2VsbC5sZW5ndGgpO1xuICAgICAgICAgICAgICBjb25zdCBjb3VudCA9IGN1cnJlbnRBcnJheS5yZWR1Y2UoKHByZSwgY3VyKSA9PiBwcmUgKyAoY3VyLmNvbHNwYW4gfHwgMSksIDApO1xuICAgICAgICAgICAgICBjb25zdCB3aWR0aCA9IGxpc3RPZkF1dG9XaWR0aFxuICAgICAgICAgICAgICAgIC5zbGljZShsaXN0T2ZBdXRvV2lkdGgubGVuZ3RoIC0gY291bnQsIGxpc3RPZkF1dG9XaWR0aC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgocHJlLCBjdXIpID0+IHByZSArIGN1ciwgMCk7XG4gICAgICAgICAgICAgIGNlbGwuc2V0QXV0b1JpZ2h0V2lkdGgoYCR7d2lkdGh9cHhgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==