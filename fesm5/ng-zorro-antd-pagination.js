import { __decorate, __metadata, __spread } from 'tslib';
import { EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, Output, Input, Renderer2, ElementRef, ViewChild, NgModule } from '@angular/core';
import { gridResponsiveMap, NzBreakpointEnum, NzBreakpointService } from 'ng-zorro-antd/core/services';
import { InputBoolean, InputNumber, toNumber } from 'ng-zorro-antd/core/util';
import { NzI18nService, NzI18nModule } from 'ng-zorro-antd/i18n';
import { Subject, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';

/**
 * @fileoverview added by tsickle
 * Generated from: pagination.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzPaginationComponent = /** @class */ (function () {
    function NzPaginationComponent(i18n, cdr, breakpointService) {
        this.i18n = i18n;
        this.cdr = cdr;
        this.breakpointService = breakpointService;
        this.nzPageSizeChange = new EventEmitter();
        this.nzPageIndexChange = new EventEmitter();
        this.nzShowTotal = null;
        this.nzSize = 'default';
        this.nzPageSizeOptions = [10, 20, 30, 40];
        this.nzItemRender = null;
        this.nzDisabled = false;
        this.nzShowSizeChanger = false;
        this.nzHideOnSinglePage = false;
        this.nzShowQuickJumper = false;
        this.nzSimple = false;
        this.nzResponsive = false;
        this.nzTotal = 0;
        this.nzPageIndex = 1;
        this.nzPageSize = 10;
        this.showPagination = true;
        this.size = 'default';
        this.destroy$ = new Subject();
        this.total$ = new ReplaySubject(1);
    }
    /**
     * @param {?} value
     * @param {?} lastIndex
     * @return {?}
     */
    NzPaginationComponent.prototype.validatePageIndex = /**
     * @param {?} value
     * @param {?} lastIndex
     * @return {?}
     */
    function (value, lastIndex) {
        if (value > lastIndex) {
            return lastIndex;
        }
        else if (value < 1) {
            return 1;
        }
        else {
            return value;
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NzPaginationComponent.prototype.onPageIndexChange = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var lastIndex = this.getLastIndex(this.nzTotal, this.nzPageSize);
        /** @type {?} */
        var validIndex = this.validatePageIndex(index, lastIndex);
        if (validIndex !== this.nzPageIndex && !this.nzDisabled) {
            this.nzPageIndex = validIndex;
            this.nzPageIndexChange.emit(this.nzPageIndex);
        }
    };
    /**
     * @param {?} size
     * @return {?}
     */
    NzPaginationComponent.prototype.onPageSizeChange = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        this.nzPageSize = size;
        this.nzPageSizeChange.emit(size);
        /** @type {?} */
        var lastIndex = this.getLastIndex(this.nzTotal, this.nzPageSize);
        if (this.nzPageIndex > lastIndex) {
            this.onPageIndexChange(lastIndex);
        }
    };
    /**
     * @param {?} total
     * @return {?}
     */
    NzPaginationComponent.prototype.onTotalChange = /**
     * @param {?} total
     * @return {?}
     */
    function (total) {
        var _this = this;
        /** @type {?} */
        var lastIndex = this.getLastIndex(total, this.nzPageSize);
        if (this.nzPageIndex > lastIndex) {
            Promise.resolve().then((/**
             * @return {?}
             */
            function () { return _this.onPageIndexChange(lastIndex); }));
        }
    };
    /**
     * @param {?} total
     * @param {?} pageSize
     * @return {?}
     */
    NzPaginationComponent.prototype.getLastIndex = /**
     * @param {?} total
     * @param {?} pageSize
     * @return {?}
     */
    function (total, pageSize) {
        return Math.ceil(total / pageSize);
    };
    /**
     * @return {?}
     */
    NzPaginationComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.locale = _this.i18n.getLocaleData('Pagination');
            _this.cdr.markForCheck();
        }));
        this.total$.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @param {?} total
         * @return {?}
         */
        function (total) {
            _this.onTotalChange(total);
        }));
        this.breakpointService
            .subscribe(gridResponsiveMap)
            .pipe(takeUntil(this.destroy$))
            .subscribe((/**
         * @param {?} bp
         * @return {?}
         */
        function (bp) {
            if (_this.nzResponsive) {
                _this.size = bp === NzBreakpointEnum.xs ? 'small' : 'default';
                _this.cdr.markForCheck();
            }
        }));
    };
    /**
     * @return {?}
     */
    NzPaginationComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzPaginationComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var nzHideOnSinglePage = changes.nzHideOnSinglePage, nzTotal = changes.nzTotal, nzPageSize = changes.nzPageSize, nzSize = changes.nzSize;
        if (nzTotal) {
            this.total$.next(this.nzTotal);
        }
        if (nzHideOnSinglePage || nzTotal || nzPageSize) {
            this.showPagination = (this.nzHideOnSinglePage && this.nzTotal > this.nzPageSize) || (this.nzTotal > 0 && !this.nzHideOnSinglePage);
        }
        if (nzSize) {
            this.size = nzSize.currentValue;
        }
    };
    NzPaginationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-pagination',
                    exportAs: 'nzPagination',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <ng-container *ngIf=\"showPagination\">\n      <ng-container *ngIf=\"nzSimple; else defaultPagination.template\">\n        <ng-template [ngTemplateOutlet]=\"simplePagination.template\"></ng-template>\n      </ng-container>\n    </ng-container>\n    <nz-pagination-simple\n      #simplePagination\n      [disabled]=\"nzDisabled\"\n      [itemRender]=\"nzItemRender\"\n      [locale]=\"locale\"\n      [pageSize]=\"nzPageSize\"\n      [total]=\"nzTotal\"\n      [pageIndex]=\"nzPageIndex\"\n      (pageIndexChange)=\"onPageIndexChange($event)\"\n    ></nz-pagination-simple>\n    <nz-pagination-default\n      #defaultPagination\n      [nzSize]=\"size\"\n      [itemRender]=\"nzItemRender\"\n      [showTotal]=\"nzShowTotal\"\n      [disabled]=\"nzDisabled\"\n      [locale]=\"locale\"\n      [showSizeChanger]=\"nzShowSizeChanger\"\n      [showQuickJumper]=\"nzShowQuickJumper\"\n      [total]=\"nzTotal\"\n      [pageIndex]=\"nzPageIndex\"\n      [pageSize]=\"nzPageSize\"\n      [pageSizeOptions]=\"nzPageSizeOptions\"\n      (pageIndexChange)=\"onPageIndexChange($event)\"\n      (pageSizeChange)=\"onPageSizeChange($event)\"\n    ></nz-pagination-default>\n  ",
                    host: {
                        '[class.ant-pagination]': 'true',
                        '[class.ant-pagination-simple]': 'nzSimple',
                        '[class.ant-pagination-disabled]': 'nzDisabled',
                        '[class.mini]': "!nzSimple && size === 'small'"
                    }
                }] }
    ];
    /** @nocollapse */
    NzPaginationComponent.ctorParameters = function () { return [
        { type: NzI18nService },
        { type: ChangeDetectorRef },
        { type: NzBreakpointService }
    ]; };
    NzPaginationComponent.propDecorators = {
        nzPageSizeChange: [{ type: Output }],
        nzPageIndexChange: [{ type: Output }],
        nzShowTotal: [{ type: Input }],
        nzSize: [{ type: Input }],
        nzPageSizeOptions: [{ type: Input }],
        nzItemRender: [{ type: Input }],
        nzDisabled: [{ type: Input }],
        nzShowSizeChanger: [{ type: Input }],
        nzHideOnSinglePage: [{ type: Input }],
        nzShowQuickJumper: [{ type: Input }],
        nzSimple: [{ type: Input }],
        nzResponsive: [{ type: Input }],
        nzTotal: [{ type: Input }],
        nzPageIndex: [{ type: Input }],
        nzPageSize: [{ type: Input }]
    };
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzPaginationComponent.prototype, "nzDisabled", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzPaginationComponent.prototype, "nzShowSizeChanger", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzPaginationComponent.prototype, "nzHideOnSinglePage", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzPaginationComponent.prototype, "nzShowQuickJumper", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzPaginationComponent.prototype, "nzSimple", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzPaginationComponent.prototype, "nzResponsive", void 0);
    __decorate([
        InputNumber(),
        __metadata("design:type", Object)
    ], NzPaginationComponent.prototype, "nzTotal", void 0);
    __decorate([
        InputNumber(),
        __metadata("design:type", Object)
    ], NzPaginationComponent.prototype, "nzPageIndex", void 0);
    __decorate([
        InputNumber(),
        __metadata("design:type", Object)
    ], NzPaginationComponent.prototype, "nzPageSize", void 0);
    return NzPaginationComponent;
}());
if (false) {
    /** @type {?} */
    NzPaginationComponent.ngAcceptInputType_nzDisabled;
    /** @type {?} */
    NzPaginationComponent.ngAcceptInputType_nzShowSizeChanger;
    /** @type {?} */
    NzPaginationComponent.ngAcceptInputType_nzHideOnSinglePage;
    /** @type {?} */
    NzPaginationComponent.ngAcceptInputType_nzShowQuickJumper;
    /** @type {?} */
    NzPaginationComponent.ngAcceptInputType_nzSimple;
    /** @type {?} */
    NzPaginationComponent.ngAcceptInputType_nzResponsive;
    /** @type {?} */
    NzPaginationComponent.ngAcceptInputType_nzTotal;
    /** @type {?} */
    NzPaginationComponent.ngAcceptInputType_nzPageIndex;
    /** @type {?} */
    NzPaginationComponent.ngAcceptInputType_nzPageSize;
    /** @type {?} */
    NzPaginationComponent.prototype.nzPageSizeChange;
    /** @type {?} */
    NzPaginationComponent.prototype.nzPageIndexChange;
    /** @type {?} */
    NzPaginationComponent.prototype.nzShowTotal;
    /** @type {?} */
    NzPaginationComponent.prototype.nzSize;
    /** @type {?} */
    NzPaginationComponent.prototype.nzPageSizeOptions;
    /** @type {?} */
    NzPaginationComponent.prototype.nzItemRender;
    /** @type {?} */
    NzPaginationComponent.prototype.nzDisabled;
    /** @type {?} */
    NzPaginationComponent.prototype.nzShowSizeChanger;
    /** @type {?} */
    NzPaginationComponent.prototype.nzHideOnSinglePage;
    /** @type {?} */
    NzPaginationComponent.prototype.nzShowQuickJumper;
    /** @type {?} */
    NzPaginationComponent.prototype.nzSimple;
    /** @type {?} */
    NzPaginationComponent.prototype.nzResponsive;
    /** @type {?} */
    NzPaginationComponent.prototype.nzTotal;
    /** @type {?} */
    NzPaginationComponent.prototype.nzPageIndex;
    /** @type {?} */
    NzPaginationComponent.prototype.nzPageSize;
    /** @type {?} */
    NzPaginationComponent.prototype.showPagination;
    /** @type {?} */
    NzPaginationComponent.prototype.locale;
    /** @type {?} */
    NzPaginationComponent.prototype.size;
    /**
     * @type {?}
     * @private
     */
    NzPaginationComponent.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    NzPaginationComponent.prototype.total$;
    /**
     * @type {?}
     * @private
     */
    NzPaginationComponent.prototype.i18n;
    /**
     * @type {?}
     * @private
     */
    NzPaginationComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    NzPaginationComponent.prototype.breakpointService;
}

/**
 * @fileoverview added by tsickle
 * Generated from: pagination-default.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzPaginationDefaultComponent = /** @class */ (function () {
    function NzPaginationDefaultComponent(renderer, elementRef) {
        this.nzSize = 'default';
        this.itemRender = null;
        this.showTotal = null;
        this.disabled = false;
        this.showSizeChanger = false;
        this.showQuickJumper = false;
        this.total = 0;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.pageSizeOptions = [10, 20, 30, 40];
        this.pageIndexChange = new EventEmitter();
        this.pageSizeChange = new EventEmitter();
        this.ranges = [0, 0];
        this.listOfPageItem = [];
        renderer.removeChild(renderer.parentNode(elementRef.nativeElement), elementRef.nativeElement);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    NzPaginationDefaultComponent.prototype.jumpPage = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.onPageIndexChange(index);
    };
    /**
     * @param {?} diff
     * @return {?}
     */
    NzPaginationDefaultComponent.prototype.jumpDiff = /**
     * @param {?} diff
     * @return {?}
     */
    function (diff) {
        this.jumpPage(this.pageIndex + diff);
    };
    /**
     * @param {?} _
     * @param {?} value
     * @return {?}
     */
    NzPaginationDefaultComponent.prototype.trackByPageItem = /**
     * @param {?} _
     * @param {?} value
     * @return {?}
     */
    function (_, value) {
        return value.type + "-" + value.index;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NzPaginationDefaultComponent.prototype.onPageIndexChange = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.pageIndexChange.next(index);
    };
    /**
     * @param {?} size
     * @return {?}
     */
    NzPaginationDefaultComponent.prototype.onPageSizeChange = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        this.pageSizeChange.next(size);
    };
    /**
     * @param {?} total
     * @param {?} pageSize
     * @return {?}
     */
    NzPaginationDefaultComponent.prototype.getLastIndex = /**
     * @param {?} total
     * @param {?} pageSize
     * @return {?}
     */
    function (total, pageSize) {
        return Math.ceil(total / pageSize);
    };
    /**
     * @return {?}
     */
    NzPaginationDefaultComponent.prototype.buildIndexes = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var lastIndex = this.getLastIndex(this.total, this.pageSize);
        this.listOfPageItem = this.getListOfPageItem(this.pageIndex, lastIndex);
    };
    /**
     * @param {?} pageIndex
     * @param {?} lastIndex
     * @return {?}
     */
    NzPaginationDefaultComponent.prototype.getListOfPageItem = /**
     * @param {?} pageIndex
     * @param {?} lastIndex
     * @return {?}
     */
    function (pageIndex, lastIndex) {
        /** @type {?} */
        var concatWithPrevNext = (/**
         * @param {?} listOfPage
         * @return {?}
         */
        function (listOfPage) {
            /** @type {?} */
            var prevItem = {
                type: 'prev',
                disabled: pageIndex === 1
            };
            /** @type {?} */
            var nextItem = {
                type: 'next',
                disabled: pageIndex === lastIndex
            };
            return __spread([prevItem], listOfPage, [nextItem]);
        });
        /** @type {?} */
        var generatePage = (/**
         * @param {?} start
         * @param {?} end
         * @return {?}
         */
        function (start, end) {
            /** @type {?} */
            var list = [];
            for (var i = start; i <= end; i++) {
                list.push({
                    index: i,
                    type: 'page'
                });
            }
            return list;
        });
        if (lastIndex <= 9) {
            return concatWithPrevNext(generatePage(1, lastIndex));
        }
        else {
            /** @type {?} */
            var generateRangeItem = (/**
             * @param {?} selected
             * @param {?} last
             * @return {?}
             */
            function (selected, last) {
                /** @type {?} */
                var listOfRange = [];
                /** @type {?} */
                var prevFiveItem = {
                    type: 'prev_5'
                };
                /** @type {?} */
                var nextFiveItem = {
                    type: 'next_5'
                };
                /** @type {?} */
                var firstPageItem = generatePage(1, 1);
                /** @type {?} */
                var lastPageItem = generatePage(lastIndex, lastIndex);
                if (selected < 4) {
                    listOfRange = __spread(generatePage(2, 5), [nextFiveItem]);
                }
                else if (selected < last - 3) {
                    listOfRange = __spread([prevFiveItem], generatePage(selected - 2, selected + 2), [nextFiveItem]);
                }
                else {
                    listOfRange = __spread([prevFiveItem], generatePage(last - 4, last - 1));
                }
                return __spread(firstPageItem, listOfRange, lastPageItem);
            });
            return concatWithPrevNext(generateRangeItem(pageIndex, lastIndex));
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzPaginationDefaultComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var pageIndex = changes.pageIndex, pageSize = changes.pageSize, total = changes.total;
        if (pageIndex || pageSize || total) {
            this.ranges = [(this.pageIndex - 1) * this.pageSize + 1, Math.min(this.pageIndex * this.pageSize, this.total)];
            this.buildIndexes();
        }
    };
    NzPaginationDefaultComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-pagination-default',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <ng-template #containerTemplate>\n      <li class=\"ant-pagination-total-text\" *ngIf=\"showTotal\">\n        <ng-template [ngTemplateOutlet]=\"showTotal\" [ngTemplateOutletContext]=\"{ $implicit: total, range: ranges }\"></ng-template>\n      </li>\n      <li\n        *ngFor=\"let page of listOfPageItem; trackBy: trackByPageItem\"\n        nz-pagination-item\n        [locale]=\"locale\"\n        [type]=\"page.type\"\n        [index]=\"page.index\"\n        [disabled]=\"!!page.disabled\"\n        [itemRender]=\"itemRender\"\n        [active]=\"pageIndex === page.index\"\n        (gotoIndex)=\"jumpPage($event)\"\n        (diffIndex)=\"jumpDiff($event)\"\n      ></li>\n      <div\n        nz-pagination-options\n        *ngIf=\"showQuickJumper || showSizeChanger\"\n        [total]=\"total\"\n        [locale]=\"locale\"\n        [disabled]=\"disabled\"\n        [nzSize]=\"nzSize\"\n        [showSizeChanger]=\"showSizeChanger\"\n        [showQuickJumper]=\"showQuickJumper\"\n        [pageIndex]=\"pageIndex\"\n        [pageSize]=\"pageSize\"\n        [pageSizeOptions]=\"pageSizeOptions\"\n        (pageIndexChange)=\"onPageIndexChange($event)\"\n        (pageSizeChange)=\"onPageSizeChange($event)\"\n      ></div>\n    </ng-template>\n  "
                }] }
    ];
    /** @nocollapse */
    NzPaginationDefaultComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    NzPaginationDefaultComponent.propDecorators = {
        template: [{ type: ViewChild, args: ['containerTemplate', { static: true },] }],
        nzSize: [{ type: Input }],
        itemRender: [{ type: Input }],
        showTotal: [{ type: Input }],
        disabled: [{ type: Input }],
        locale: [{ type: Input }],
        showSizeChanger: [{ type: Input }],
        showQuickJumper: [{ type: Input }],
        total: [{ type: Input }],
        pageIndex: [{ type: Input }],
        pageSize: [{ type: Input }],
        pageSizeOptions: [{ type: Input }],
        pageIndexChange: [{ type: Output }],
        pageSizeChange: [{ type: Output }]
    };
    return NzPaginationDefaultComponent;
}());
if (false) {
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.template;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.nzSize;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.itemRender;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.showTotal;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.disabled;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.locale;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.showSizeChanger;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.showQuickJumper;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.total;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.pageIndex;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.pageSize;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.pageSizeOptions;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.pageIndexChange;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.pageSizeChange;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.ranges;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.listOfPageItem;
}

/**
 * @fileoverview added by tsickle
 * Generated from: pagination-item.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzPaginationItemComponent = /** @class */ (function () {
    function NzPaginationItemComponent() {
        this.active = false;
        this.index = null;
        this.disabled = false;
        this.type = null;
        this.itemRender = null;
        this.diffIndex = new EventEmitter();
        this.gotoIndex = new EventEmitter();
        this.title = null;
    }
    /**
     * @return {?}
     */
    NzPaginationItemComponent.prototype.clickItem = /**
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            if (this.type === 'page') {
                this.gotoIndex.emit((/** @type {?} */ (this.index)));
            }
            else {
                this.diffIndex.emit(((/** @type {?} */ ({
                    next: 1,
                    prev: -1,
                    prev_5: -5,
                    next_5: 5
                })))[(/** @type {?} */ (this.type))]);
            }
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzPaginationItemComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _a, _b, _c, _d;
        var locale = changes.locale, index = changes.index, type = changes.type;
        if (locale || index || type) {
            this.title = ((/** @type {?} */ ({
                page: "" + this.index,
                next: (_a = this.locale) === null || _a === void 0 ? void 0 : _a.next_page,
                prev: (_b = this.locale) === null || _b === void 0 ? void 0 : _b.prev_page,
                prev_5: (_c = this.locale) === null || _c === void 0 ? void 0 : _c.prev_5,
                next_5: (_d = this.locale) === null || _d === void 0 ? void 0 : _d.next_5
            })))[(/** @type {?} */ (this.type))];
        }
    };
    NzPaginationItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'li[nz-pagination-item]',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <ng-template #renderItemTemplate let-type let-page=\"page\">\n      <ng-container [ngSwitch]=\"type\">\n        <a *ngSwitchCase=\"'page'\">{{ page }}</a>\n        <ng-container *ngSwitchDefault>\n          <a class=\"ant-pagination-item-link\" [ngSwitch]=\"type\">\n            <i nz-icon nzType=\"left\" *ngSwitchCase=\"'prev'\"></i>\n            <i nz-icon nzType=\"right\" *ngSwitchCase=\"'next'\"></i>\n            <div class=\"ant-pagination-item-container\" *ngSwitchDefault>\n              <ng-container [ngSwitch]=\"type\">\n                <i *ngSwitchCase=\"'prev_5'\" nz-icon nzType=\"double-left\" class=\"ant-pagination-item-link-icon\"></i>\n                <i *ngSwitchCase=\"'next_5'\" nz-icon nzType=\"double-right\" class=\"ant-pagination-item-link-icon\"></i>\n              </ng-container>\n              <span class=\"ant-pagination-item-ellipsis\">\u2022\u2022\u2022</span>\n            </div>\n          </a>\n        </ng-container>\n      </ng-container>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"itemRender || renderItemTemplate\"\n      [ngTemplateOutletContext]=\"{ $implicit: type, page: index }\"\n    ></ng-template>\n  ",
                    host: {
                        '[class.ant-pagination-prev]': "type === 'prev'",
                        '[class.ant-pagination-next]': "type === 'next'",
                        '[class.ant-pagination-item]': "type === 'page'",
                        '[class.ant-pagination-jump-prev]': "type === 'prev_5'",
                        '[class.ant-pagination-jump-prev-custom-icon]': "type === 'prev_5'",
                        '[class.ant-pagination-jump-next]': "type === 'next_5'",
                        '[class.ant-pagination-jump-next-custom-icon]': "type === 'next_5'",
                        '[class.ant-pagination-disabled]': 'disabled',
                        '[class.ant-pagination-item-active]]': 'active',
                        '[attr.title]': 'title',
                        '(click)': 'clickItem()'
                    }
                }] }
    ];
    NzPaginationItemComponent.propDecorators = {
        active: [{ type: Input }],
        locale: [{ type: Input }],
        index: [{ type: Input }],
        disabled: [{ type: Input }],
        type: [{ type: Input }],
        itemRender: [{ type: Input }],
        diffIndex: [{ type: Output }],
        gotoIndex: [{ type: Output }]
    };
    return NzPaginationItemComponent;
}());
if (false) {
    /** @type {?} */
    NzPaginationItemComponent.ngAcceptInputType_type;
    /** @type {?} */
    NzPaginationItemComponent.ngAcceptInputType_index;
    /** @type {?} */
    NzPaginationItemComponent.prototype.active;
    /** @type {?} */
    NzPaginationItemComponent.prototype.locale;
    /** @type {?} */
    NzPaginationItemComponent.prototype.index;
    /** @type {?} */
    NzPaginationItemComponent.prototype.disabled;
    /** @type {?} */
    NzPaginationItemComponent.prototype.type;
    /** @type {?} */
    NzPaginationItemComponent.prototype.itemRender;
    /** @type {?} */
    NzPaginationItemComponent.prototype.diffIndex;
    /** @type {?} */
    NzPaginationItemComponent.prototype.gotoIndex;
    /** @type {?} */
    NzPaginationItemComponent.prototype.title;
}

/**
 * @fileoverview added by tsickle
 * Generated from: pagination-options.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzPaginationOptionsComponent = /** @class */ (function () {
    function NzPaginationOptionsComponent() {
        this.nzSize = 'default';
        this.disabled = false;
        this.showSizeChanger = false;
        this.showQuickJumper = false;
        this.total = 0;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.pageSizeOptions = [];
        this.pageIndexChange = new EventEmitter();
        this.pageSizeChange = new EventEmitter();
        this.listOfPageSizeOption = [];
    }
    /**
     * @param {?} size
     * @return {?}
     */
    NzPaginationOptionsComponent.prototype.onPageSizeChange = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        if (this.pageSize !== size) {
            this.pageSizeChange.next(size);
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NzPaginationOptionsComponent.prototype.jumpToPageViaInput = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var target = (/** @type {?} */ ($event.target));
        /** @type {?} */
        var index = toNumber(target.value, this.pageIndex);
        this.pageIndexChange.next(index);
        target.value = '';
    };
    /**
     * @param {?} _
     * @param {?} option
     * @return {?}
     */
    NzPaginationOptionsComponent.prototype.trackByOption = /**
     * @param {?} _
     * @param {?} option
     * @return {?}
     */
    function (_, option) {
        return option.value;
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzPaginationOptionsComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        var pageSize = changes.pageSize, pageSizeOptions = changes.pageSizeOptions, locale = changes.locale;
        if (pageSize || pageSizeOptions || locale) {
            this.listOfPageSizeOption = __spread(new Set(__spread(this.pageSizeOptions, [this.pageSize]))).map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                return {
                    value: item,
                    label: item + " " + _this.locale.items_per_page
                };
            }));
        }
    };
    NzPaginationOptionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'div[nz-pagination-options]',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <nz-select\n      class=\"ant-pagination-options-size-changer\"\n      *ngIf=\"showSizeChanger\"\n      [nzDisabled]=\"disabled\"\n      [nzSize]=\"nzSize\"\n      [ngModel]=\"pageSize\"\n      (ngModelChange)=\"onPageSizeChange($event)\"\n    >\n      <nz-option\n        *ngFor=\"let option of listOfPageSizeOption; trackBy: trackByOption\"\n        [nzLabel]=\"option.label\"\n        [nzValue]=\"option.value\"\n      ></nz-option>\n    </nz-select>\n    <div class=\"ant-pagination-options-quick-jumper\" *ngIf=\"showQuickJumper\">\n      {{ locale.jump_to }}\n      <input [disabled]=\"disabled\" (keydown.enter)=\"jumpToPageViaInput($event)\" />\n      {{ locale.page }}\n    </div>\n  ",
                    host: {
                        '[class.ant-pagination-options]': 'true'
                    }
                }] }
    ];
    NzPaginationOptionsComponent.propDecorators = {
        nzSize: [{ type: Input }],
        disabled: [{ type: Input }],
        showSizeChanger: [{ type: Input }],
        showQuickJumper: [{ type: Input }],
        locale: [{ type: Input }],
        total: [{ type: Input }],
        pageIndex: [{ type: Input }],
        pageSize: [{ type: Input }],
        pageSizeOptions: [{ type: Input }],
        pageIndexChange: [{ type: Output }],
        pageSizeChange: [{ type: Output }]
    };
    return NzPaginationOptionsComponent;
}());
if (false) {
    /** @type {?} */
    NzPaginationOptionsComponent.prototype.nzSize;
    /** @type {?} */
    NzPaginationOptionsComponent.prototype.disabled;
    /** @type {?} */
    NzPaginationOptionsComponent.prototype.showSizeChanger;
    /** @type {?} */
    NzPaginationOptionsComponent.prototype.showQuickJumper;
    /** @type {?} */
    NzPaginationOptionsComponent.prototype.locale;
    /** @type {?} */
    NzPaginationOptionsComponent.prototype.total;
    /** @type {?} */
    NzPaginationOptionsComponent.prototype.pageIndex;
    /** @type {?} */
    NzPaginationOptionsComponent.prototype.pageSize;
    /** @type {?} */
    NzPaginationOptionsComponent.prototype.pageSizeOptions;
    /** @type {?} */
    NzPaginationOptionsComponent.prototype.pageIndexChange;
    /** @type {?} */
    NzPaginationOptionsComponent.prototype.pageSizeChange;
    /** @type {?} */
    NzPaginationOptionsComponent.prototype.listOfPageSizeOption;
}

/**
 * @fileoverview added by tsickle
 * Generated from: pagination-simple.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzPaginationSimpleComponent = /** @class */ (function () {
    function NzPaginationSimpleComponent(renderer, elementRef) {
        this.itemRender = null;
        this.disabled = false;
        this.total = 0;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.pageIndexChange = new EventEmitter();
        this.lastIndex = 0;
        this.isFirstIndex = false;
        this.isLastIndex = false;
        renderer.removeChild(renderer.parentNode(elementRef.nativeElement), elementRef.nativeElement);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    NzPaginationSimpleComponent.prototype.jumpToPageViaInput = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var target = (/** @type {?} */ ($event.target));
        /** @type {?} */
        var index = toNumber(target.value, this.pageIndex);
        this.onPageIndexChange(index);
        target.value = "" + this.pageIndex;
    };
    /**
     * @return {?}
     */
    NzPaginationSimpleComponent.prototype.prePage = /**
     * @return {?}
     */
    function () {
        this.onPageIndexChange(this.pageIndex - 1);
    };
    /**
     * @return {?}
     */
    NzPaginationSimpleComponent.prototype.nextPage = /**
     * @return {?}
     */
    function () {
        this.onPageIndexChange(this.pageIndex + 1);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NzPaginationSimpleComponent.prototype.onPageIndexChange = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.pageIndexChange.next(index);
    };
    /**
     * @return {?}
     */
    NzPaginationSimpleComponent.prototype.updateBindingValue = /**
     * @return {?}
     */
    function () {
        this.lastIndex = Math.ceil(this.total / this.pageSize);
        this.isFirstIndex = this.pageIndex === 1;
        this.isLastIndex = this.pageIndex === this.lastIndex;
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzPaginationSimpleComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var pageIndex = changes.pageIndex, total = changes.total, pageSize = changes.pageSize;
        if (pageIndex || total || pageSize) {
            this.updateBindingValue();
        }
    };
    NzPaginationSimpleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-pagination-simple',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <ng-template #containerTemplate>\n      <li\n        nz-pagination-item\n        [attr.title]=\"locale.prev_page\"\n        [disabled]=\"isFirstIndex\"\n        (click)=\"prePage()\"\n        type=\"prev\"\n        [itemRender]=\"itemRender\"\n      ></li>\n      <li [attr.title]=\"pageIndex + '/' + lastIndex\" class=\"ant-pagination-simple-pager\">\n        <input [disabled]=\"disabled\" [value]=\"pageIndex\" (keydown.enter)=\"jumpToPageViaInput($event)\" size=\"3\" />\n        <span class=\"ant-pagination-slash\">/</span>\n        {{ lastIndex }}\n      </li>\n      <li\n        nz-pagination-item\n        [attr.title]=\"locale?.next_page\"\n        [disabled]=\"isLastIndex\"\n        (click)=\"nextPage()\"\n        type=\"next\"\n        [itemRender]=\"itemRender\"\n      ></li>\n    </ng-template>\n  "
                }] }
    ];
    /** @nocollapse */
    NzPaginationSimpleComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    NzPaginationSimpleComponent.propDecorators = {
        template: [{ type: ViewChild, args: ['containerTemplate', { static: true },] }],
        itemRender: [{ type: Input }],
        disabled: [{ type: Input }],
        locale: [{ type: Input }],
        total: [{ type: Input }],
        pageIndex: [{ type: Input }],
        pageSize: [{ type: Input }],
        pageIndexChange: [{ type: Output }]
    };
    return NzPaginationSimpleComponent;
}());
if (false) {
    /** @type {?} */
    NzPaginationSimpleComponent.prototype.template;
    /** @type {?} */
    NzPaginationSimpleComponent.prototype.itemRender;
    /** @type {?} */
    NzPaginationSimpleComponent.prototype.disabled;
    /** @type {?} */
    NzPaginationSimpleComponent.prototype.locale;
    /** @type {?} */
    NzPaginationSimpleComponent.prototype.total;
    /** @type {?} */
    NzPaginationSimpleComponent.prototype.pageIndex;
    /** @type {?} */
    NzPaginationSimpleComponent.prototype.pageSize;
    /** @type {?} */
    NzPaginationSimpleComponent.prototype.pageIndexChange;
    /** @type {?} */
    NzPaginationSimpleComponent.prototype.lastIndex;
    /** @type {?} */
    NzPaginationSimpleComponent.prototype.isFirstIndex;
    /** @type {?} */
    NzPaginationSimpleComponent.prototype.isLastIndex;
}

/**
 * @fileoverview added by tsickle
 * Generated from: pagination.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzPaginationModule = /** @class */ (function () {
    function NzPaginationModule() {
    }
    NzPaginationModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        NzPaginationComponent,
                        NzPaginationSimpleComponent,
                        NzPaginationOptionsComponent,
                        NzPaginationItemComponent,
                        NzPaginationDefaultComponent
                    ],
                    exports: [NzPaginationComponent],
                    imports: [CommonModule, FormsModule, NzSelectModule, NzI18nModule, NzIconModule]
                },] }
    ];
    return NzPaginationModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: pagination.types.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * @record
 */
function PaginationItemRenderContext() { }
if (false) {
    /** @type {?} */
    PaginationItemRenderContext.prototype.$implicit;
    /** @type {?} */
    PaginationItemRenderContext.prototype.page;
}

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ng-zorro-antd-pagination.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NzPaginationComponent, NzPaginationDefaultComponent, NzPaginationItemComponent, NzPaginationModule, NzPaginationOptionsComponent, NzPaginationSimpleComponent };
//# sourceMappingURL=ng-zorro-antd-pagination.js.map
