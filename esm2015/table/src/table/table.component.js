/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzResizeObserver } from 'ng-zorro-antd/core/resize-observers';
import { InputBoolean, measureScrollbar } from 'ng-zorro-antd/core/util';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { NzTableDataService } from '../table-data.service';
import { NzTableStyleService } from '../table-style.service';
import { NzTableInnerScrollComponent } from './table-inner-scroll.component';
import { NzTableVirtualScrollDirective } from './table-virtual-scroll.directive';
const NZ_CONFIG_MODULE_NAME = 'table';
export class NzTableComponent {
    constructor(elementRef, nzResizeObserver, nzConfigService, cdr, nzTableStyleService, nzTableDataService, directionality) {
        this.elementRef = elementRef;
        this.nzResizeObserver = nzResizeObserver;
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this.nzTableStyleService = nzTableStyleService;
        this.nzTableDataService = nzTableDataService;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzTableLayout = 'auto';
        this.nzShowTotal = null;
        this.nzItemRender = null;
        this.nzTitle = null;
        this.nzFooter = null;
        this.nzNoResult = undefined;
        this.nzPageSizeOptions = [10, 20, 30, 40, 50];
        this.nzVirtualItemSize = 0;
        this.nzVirtualMaxBufferPx = 200;
        this.nzVirtualMinBufferPx = 100;
        this.nzVirtualForTrackBy = index => index;
        this.nzLoadingDelay = 0;
        this.nzPageIndex = 1;
        this.nzPageSize = 10;
        this.nzTotal = 0;
        this.nzWidthConfig = [];
        this.nzData = [];
        this.nzPaginationPosition = 'bottom';
        this.nzScroll = { x: null, y: null };
        this.nzFrontPagination = true;
        this.nzTemplateMode = false;
        this.nzShowPagination = true;
        this.nzLoading = false;
        this.nzOuterBordered = false;
        this.nzLoadingIndicator = null;
        this.nzBordered = false;
        this.nzSize = 'default';
        this.nzShowSizeChanger = false;
        this.nzHideOnSinglePage = false;
        this.nzShowQuickJumper = false;
        this.nzSimple = false;
        this.nzPageSizeChange = new EventEmitter();
        this.nzPageIndexChange = new EventEmitter();
        this.nzQueryParams = new EventEmitter();
        this.nzCurrentPageDataChange = new EventEmitter();
        /** public data for ngFor tr */
        this.data = [];
        this.scrollX = null;
        this.scrollY = null;
        this.theadTemplate = null;
        this.listOfAutoColWidth = [];
        this.listOfManualColWidth = [];
        this.hasFixLeft = false;
        this.hasFixRight = false;
        this.showPagination = true;
        this.destroy$ = new Subject();
        this.loading$ = new BehaviorSubject(false);
        this.templateMode$ = new BehaviorSubject(false);
        this.dir = 'ltr';
        this.verticalScrollBarWidth = 0;
        // TODO: move to host after View Engine deprecation
        this.elementRef.nativeElement.classList.add('ant-table-wrapper');
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.cdr.markForCheck();
        });
    }
    onPageSizeChange(size) {
        this.nzTableDataService.updatePageSize(size);
    }
    onPageIndexChange(index) {
        this.nzTableDataService.updatePageIndex(index);
    }
    ngOnInit() {
        var _a;
        const { pageIndexDistinct$, pageSizeDistinct$, listOfCurrentPageData$, total$, queryParams$ } = this.nzTableDataService;
        const { theadTemplate$, hasFixLeft$, hasFixRight$ } = this.nzTableStyleService;
        this.dir = this.directionality.value;
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        queryParams$.pipe(takeUntil(this.destroy$)).subscribe(this.nzQueryParams);
        pageIndexDistinct$.pipe(takeUntil(this.destroy$)).subscribe(pageIndex => {
            if (pageIndex !== this.nzPageIndex) {
                this.nzPageIndex = pageIndex;
                this.nzPageIndexChange.next(pageIndex);
            }
        });
        pageSizeDistinct$.pipe(takeUntil(this.destroy$)).subscribe(pageSize => {
            if (pageSize !== this.nzPageSize) {
                this.nzPageSize = pageSize;
                this.nzPageSizeChange.next(pageSize);
            }
        });
        total$
            .pipe(takeUntil(this.destroy$), filter(() => this.nzFrontPagination))
            .subscribe(total => {
            if (total !== this.nzTotal) {
                this.nzTotal = total;
                this.cdr.markForCheck();
            }
        });
        listOfCurrentPageData$.pipe(takeUntil(this.destroy$)).subscribe(data => {
            this.data = data;
            this.nzCurrentPageDataChange.next(data);
            this.cdr.markForCheck();
        });
        theadTemplate$.pipe(takeUntil(this.destroy$)).subscribe(theadTemplate => {
            this.theadTemplate = theadTemplate;
            this.cdr.markForCheck();
        });
        hasFixLeft$.pipe(takeUntil(this.destroy$)).subscribe(hasFixLeft => {
            this.hasFixLeft = hasFixLeft;
            this.cdr.markForCheck();
        });
        hasFixRight$.pipe(takeUntil(this.destroy$)).subscribe(hasFixRight => {
            this.hasFixRight = hasFixRight;
            this.cdr.markForCheck();
        });
        combineLatest([total$, this.loading$, this.templateMode$])
            .pipe(map(([total, loading, templateMode]) => total === 0 && !loading && !templateMode), takeUntil(this.destroy$))
            .subscribe(empty => {
            this.nzTableStyleService.setShowEmpty(empty);
        });
        this.verticalScrollBarWidth = measureScrollbar('vertical');
        this.nzTableStyleService.listOfListOfThWidthPx$.pipe(takeUntil(this.destroy$)).subscribe(listOfWidth => {
            this.listOfAutoColWidth = listOfWidth;
            this.cdr.markForCheck();
        });
        this.nzTableStyleService.manualWidthConfigPx$.pipe(takeUntil(this.destroy$)).subscribe(listOfWidth => {
            this.listOfManualColWidth = listOfWidth;
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        const { nzScroll, nzPageIndex, nzPageSize, nzFrontPagination, nzData, nzWidthConfig, nzNoResult, nzLoading, nzTemplateMode } = changes;
        if (nzPageIndex) {
            this.nzTableDataService.updatePageIndex(this.nzPageIndex);
        }
        if (nzPageSize) {
            this.nzTableDataService.updatePageSize(this.nzPageSize);
        }
        if (nzData) {
            this.nzData = this.nzData || [];
            this.nzTableDataService.updateListOfData(this.nzData);
        }
        if (nzFrontPagination) {
            this.nzTableDataService.updateFrontPagination(this.nzFrontPagination);
        }
        if (nzScroll) {
            this.setScrollOnChanges();
        }
        if (nzWidthConfig) {
            this.nzTableStyleService.setTableWidthConfig(this.nzWidthConfig);
        }
        if (nzLoading) {
            this.loading$.next(this.nzLoading);
        }
        if (nzTemplateMode) {
            this.templateMode$.next(this.nzTemplateMode);
        }
        if (nzNoResult) {
            this.nzTableStyleService.setNoResult(this.nzNoResult);
        }
        this.updateShowPagination();
    }
    ngAfterViewInit() {
        this.nzResizeObserver
            .observe(this.elementRef)
            .pipe(map(([entry]) => {
            const { width } = entry.target.getBoundingClientRect();
            const scrollBarWidth = this.scrollY ? this.verticalScrollBarWidth : 0;
            return Math.floor(width - scrollBarWidth);
        }), takeUntil(this.destroy$))
            .subscribe(this.nzTableStyleService.hostWidth$);
        if (this.nzTableInnerScrollComponent && this.nzTableInnerScrollComponent.cdkVirtualScrollViewport) {
            this.cdkVirtualScrollViewport = this.nzTableInnerScrollComponent.cdkVirtualScrollViewport;
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    setScrollOnChanges() {
        this.scrollX = (this.nzScroll && this.nzScroll.x) || null;
        this.scrollY = (this.nzScroll && this.nzScroll.y) || null;
        this.nzTableStyleService.setScroll(this.scrollX, this.scrollY);
    }
    updateShowPagination() {
        this.showPagination =
            (this.nzHideOnSinglePage && this.nzData.length > this.nzPageSize) ||
                (this.nzData.length > 0 && !this.nzHideOnSinglePage) ||
                (!this.nzFrontPagination && this.nzTotal > this.nzPageSize);
    }
}
NzTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-table',
                exportAs: 'nzTable',
                providers: [NzTableStyleService, NzTableDataService],
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <nz-spin [nzDelay]="nzLoadingDelay" [nzSpinning]="nzLoading" [nzIndicator]="nzLoadingIndicator">
      <ng-container *ngIf="nzPaginationPosition === 'both' || nzPaginationPosition === 'top'">
        <ng-template [ngTemplateOutlet]="paginationTemplate"></ng-template>
      </ng-container>
      <div
        #tableMainElement
        class="ant-table"
        [class.ant-table-rtl]="dir === 'rtl'"
        [class.ant-table-fixed-header]="nzData.length && scrollY"
        [class.ant-table-fixed-column]="scrollX"
        [class.ant-table-has-fix-left]="hasFixLeft"
        [class.ant-table-has-fix-right]="hasFixRight"
        [class.ant-table-bordered]="nzBordered"
        [class.nz-table-out-bordered]="nzOuterBordered && !nzBordered"
        [class.ant-table-middle]="nzSize === 'middle'"
        [class.ant-table-small]="nzSize === 'small'"
      >
        <nz-table-title-footer [title]="nzTitle" *ngIf="nzTitle"></nz-table-title-footer>
        <nz-table-inner-scroll
          *ngIf="scrollY || scrollX; else defaultTemplate"
          [data]="data"
          [scrollX]="scrollX"
          [scrollY]="scrollY"
          [contentTemplate]="contentTemplate"
          [listOfColWidth]="listOfAutoColWidth"
          [theadTemplate]="theadTemplate"
          [verticalScrollBarWidth]="verticalScrollBarWidth"
          [virtualTemplate]="nzVirtualScrollDirective ? nzVirtualScrollDirective.templateRef : null"
          [virtualItemSize]="nzVirtualItemSize"
          [virtualMaxBufferPx]="nzVirtualMaxBufferPx"
          [virtualMinBufferPx]="nzVirtualMinBufferPx"
          [tableMainElement]="tableMainElement"
          [virtualForTrackBy]="nzVirtualForTrackBy"
        ></nz-table-inner-scroll>
        <ng-template #defaultTemplate>
          <nz-table-inner-default
            [tableLayout]="nzTableLayout"
            [listOfColWidth]="listOfManualColWidth"
            [theadTemplate]="theadTemplate"
            [contentTemplate]="contentTemplate"
          ></nz-table-inner-default>
        </ng-template>
        <nz-table-title-footer [footer]="nzFooter" *ngIf="nzFooter"></nz-table-title-footer>
      </div>
      <ng-container *ngIf="nzPaginationPosition === 'both' || nzPaginationPosition === 'bottom'">
        <ng-template [ngTemplateOutlet]="paginationTemplate"></ng-template>
      </ng-container>
    </nz-spin>
    <ng-template #paginationTemplate>
      <nz-pagination
        *ngIf="nzShowPagination && showPagination && data.length"
        class="ant-table-pagination ant-table-pagination-right"
        [nzShowSizeChanger]="nzShowSizeChanger"
        [nzPageSizeOptions]="nzPageSizeOptions"
        [nzItemRender]="nzItemRender!"
        [nzShowQuickJumper]="nzShowQuickJumper"
        [nzHideOnSinglePage]="nzHideOnSinglePage"
        [nzShowTotal]="nzShowTotal"
        [nzSize]="nzSize === 'default' ? 'default' : 'small'"
        [nzPageSize]="nzPageSize"
        [nzTotal]="nzTotal"
        [nzSimple]="nzSimple"
        [nzPageIndex]="nzPageIndex"
        (nzPageSizeChange)="onPageSizeChange($event)"
        (nzPageIndexChange)="onPageIndexChange($event)"
      ></nz-pagination>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
                host: {
                    '[class.ant-table-wrapper-rtl]': 'dir === "rtl"'
                }
            },] }
];
NzTableComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NzResizeObserver },
    { type: NzConfigService },
    { type: ChangeDetectorRef },
    { type: NzTableStyleService },
    { type: NzTableDataService },
    { type: Directionality, decorators: [{ type: Optional }] }
];
NzTableComponent.propDecorators = {
    nzTableLayout: [{ type: Input }],
    nzShowTotal: [{ type: Input }],
    nzItemRender: [{ type: Input }],
    nzTitle: [{ type: Input }],
    nzFooter: [{ type: Input }],
    nzNoResult: [{ type: Input }],
    nzPageSizeOptions: [{ type: Input }],
    nzVirtualItemSize: [{ type: Input }],
    nzVirtualMaxBufferPx: [{ type: Input }],
    nzVirtualMinBufferPx: [{ type: Input }],
    nzVirtualForTrackBy: [{ type: Input }],
    nzLoadingDelay: [{ type: Input }],
    nzPageIndex: [{ type: Input }],
    nzPageSize: [{ type: Input }],
    nzTotal: [{ type: Input }],
    nzWidthConfig: [{ type: Input }],
    nzData: [{ type: Input }],
    nzPaginationPosition: [{ type: Input }],
    nzScroll: [{ type: Input }],
    nzFrontPagination: [{ type: Input }],
    nzTemplateMode: [{ type: Input }],
    nzShowPagination: [{ type: Input }],
    nzLoading: [{ type: Input }],
    nzOuterBordered: [{ type: Input }],
    nzLoadingIndicator: [{ type: Input }],
    nzBordered: [{ type: Input }],
    nzSize: [{ type: Input }],
    nzShowSizeChanger: [{ type: Input }],
    nzHideOnSinglePage: [{ type: Input }],
    nzShowQuickJumper: [{ type: Input }],
    nzSimple: [{ type: Input }],
    nzPageSizeChange: [{ type: Output }],
    nzPageIndexChange: [{ type: Output }],
    nzQueryParams: [{ type: Output }],
    nzCurrentPageDataChange: [{ type: Output }],
    nzVirtualScrollDirective: [{ type: ContentChild, args: [NzTableVirtualScrollDirective, { static: false },] }],
    nzTableInnerScrollComponent: [{ type: ViewChild, args: [NzTableInnerScrollComponent,] }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTableComponent.prototype, "nzFrontPagination", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTableComponent.prototype, "nzTemplateMode", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTableComponent.prototype, "nzShowPagination", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTableComponent.prototype, "nzLoading", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTableComponent.prototype, "nzOuterBordered", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", Object)
], NzTableComponent.prototype, "nzLoadingIndicator", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzTableComponent.prototype, "nzBordered", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", String)
], NzTableComponent.prototype, "nzSize", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzTableComponent.prototype, "nzShowSizeChanger", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzTableComponent.prototype, "nzHideOnSinglePage", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzTableComponent.prototype, "nzShowQuickJumper", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzTableComponent.prototype, "nzSimple", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL2NvbXBvbmVudHMvdGFibGUvIiwic291cmNlcyI6WyJzcmMvdGFibGUvdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7QUFFSCxPQUFPLEVBQWEsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFOUQsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFJTCxRQUFRLEVBQ1IsTUFBTSxFQUlOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFlLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUV2RSxPQUFPLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzNELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTdELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRWpGLE1BQU0scUJBQXFCLEdBQWdCLE9BQU8sQ0FBQztBQXFGbkQsTUFBTSxPQUFPLGdCQUFnQjtJQTZFM0IsWUFDVSxVQUFzQixFQUN0QixnQkFBa0Ms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ZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBUcmFja0J5RnVuY3Rpb24sXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOekNvbmZpZ0tleSwgTnpDb25maWdTZXJ2aWNlLCBXaXRoQ29uZmlnIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2NvbmZpZyc7XG5pbXBvcnQgeyBOelJlc2l6ZU9ic2VydmVyIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3Jlc2l6ZS1vYnNlcnZlcnMnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuLCBtZWFzdXJlU2Nyb2xsYmFyIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgUGFnaW5hdGlvbkl0ZW1SZW5kZXJDb250ZXh0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9wYWdpbmF0aW9uJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE56VGFibGVEYXRhU2VydmljZSB9IGZyb20gJy4uL3RhYmxlLWRhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBOelRhYmxlU3R5bGVTZXJ2aWNlIH0gZnJvbSAnLi4vdGFibGUtc3R5bGUuc2VydmljZSc7XG5pbXBvcnQgeyBOelRhYmxlRGF0YSwgTnpUYWJsZUxheW91dCwgTnpUYWJsZVBhZ2luYXRpb25Qb3NpdGlvbiwgTnpUYWJsZVF1ZXJ5UGFyYW1zLCBOelRhYmxlU2l6ZSB9IGZyb20gJy4uL3RhYmxlLnR5cGVzJztcbmltcG9ydCB7IE56VGFibGVJbm5lclNjcm9sbENvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtaW5uZXItc2Nyb2xsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelRhYmxlVmlydHVhbFNjcm9sbERpcmVjdGl2ZSB9IGZyb20gJy4vdGFibGUtdmlydHVhbC1zY3JvbGwuZGlyZWN0aXZlJztcblxuY29uc3QgTlpfQ09ORklHX01PRFVMRV9OQU1FOiBOekNvbmZpZ0tleSA9ICd0YWJsZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXRhYmxlJyxcbiAgZXhwb3J0QXM6ICduelRhYmxlJyxcbiAgcHJvdmlkZXJzOiBbTnpUYWJsZVN0eWxlU2VydmljZSwgTnpUYWJsZURhdGFTZXJ2aWNlXSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuei1zcGluIFtuekRlbGF5XT1cIm56TG9hZGluZ0RlbGF5XCIgW256U3Bpbm5pbmddPVwibnpMb2FkaW5nXCIgW256SW5kaWNhdG9yXT1cIm56TG9hZGluZ0luZGljYXRvclwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm56UGFnaW5hdGlvblBvc2l0aW9uID09PSAnYm90aCcgfHwgbnpQYWdpbmF0aW9uUG9zaXRpb24gPT09ICd0b3AnXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJwYWdpbmF0aW9uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8ZGl2XG4gICAgICAgICN0YWJsZU1haW5FbGVtZW50XG4gICAgICAgIGNsYXNzPVwiYW50LXRhYmxlXCJcbiAgICAgICAgW2NsYXNzLmFudC10YWJsZS1ydGxdPVwiZGlyID09PSAncnRsJ1wiXG4gICAgICAgIFtjbGFzcy5hbnQtdGFibGUtZml4ZWQtaGVhZGVyXT1cIm56RGF0YS5sZW5ndGggJiYgc2Nyb2xsWVwiXG4gICAgICAgIFtjbGFzcy5hbnQtdGFibGUtZml4ZWQtY29sdW1uXT1cInNjcm9sbFhcIlxuICAgICAgICBbY2xhc3MuYW50LXRhYmxlLWhhcy1maXgtbGVmdF09XCJoYXNGaXhMZWZ0XCJcbiAgICAgICAgW2NsYXNzLmFudC10YWJsZS1oYXMtZml4LXJpZ2h0XT1cImhhc0ZpeFJpZ2h0XCJcbiAgICAgICAgW2NsYXNzLmFudC10YWJsZS1ib3JkZXJlZF09XCJuekJvcmRlcmVkXCJcbiAgICAgICAgW2NsYXNzLm56LXRhYmxlLW91dC1ib3JkZXJlZF09XCJuek91dGVyQm9yZGVyZWQgJiYgIW56Qm9yZGVyZWRcIlxuICAgICAgICBbY2xhc3MuYW50LXRhYmxlLW1pZGRsZV09XCJuelNpemUgPT09ICdtaWRkbGUnXCJcbiAgICAgICAgW2NsYXNzLmFudC10YWJsZS1zbWFsbF09XCJuelNpemUgPT09ICdzbWFsbCdcIlxuICAgICAgPlxuICAgICAgICA8bnotdGFibGUtdGl0bGUtZm9vdGVyIFt0aXRsZV09XCJuelRpdGxlXCIgKm5nSWY9XCJuelRpdGxlXCI+PC9uei10YWJsZS10aXRsZS1mb290ZXI+XG4gICAgICAgIDxuei10YWJsZS1pbm5lci1zY3JvbGxcbiAgICAgICAgICAqbmdJZj1cInNjcm9sbFkgfHwgc2Nyb2xsWDsgZWxzZSBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgICAgIFtkYXRhXT1cImRhdGFcIlxuICAgICAgICAgIFtzY3JvbGxYXT1cInNjcm9sbFhcIlxuICAgICAgICAgIFtzY3JvbGxZXT1cInNjcm9sbFlcIlxuICAgICAgICAgIFtjb250ZW50VGVtcGxhdGVdPVwiY29udGVudFRlbXBsYXRlXCJcbiAgICAgICAgICBbbGlzdE9mQ29sV2lkdGhdPVwibGlzdE9mQXV0b0NvbFdpZHRoXCJcbiAgICAgICAgICBbdGhlYWRUZW1wbGF0ZV09XCJ0aGVhZFRlbXBsYXRlXCJcbiAgICAgICAgICBbdmVydGljYWxTY3JvbGxCYXJXaWR0aF09XCJ2ZXJ0aWNhbFNjcm9sbEJhcldpZHRoXCJcbiAgICAgICAgICBbdmlydHVhbFRlbXBsYXRlXT1cIm56VmlydHVhbFNjcm9sbERpcmVjdGl2ZSA/IG56VmlydHVhbFNjcm9sbERpcmVjdGl2ZS50ZW1wbGF0ZVJlZiA6IG51bGxcIlxuICAgICAgICAgIFt2aXJ0dWFsSXRlbVNpemVdPVwibnpWaXJ0dWFsSXRlbVNpemVcIlxuICAgICAgICAgIFt2aXJ0dWFsTWF4QnVmZmVyUHhdPVwibnpWaXJ0dWFsTWF4QnVmZmVyUHhcIlxuICAgICAgICAgIFt2aXJ0dWFsTWluQnVmZmVyUHhdPVwibnpWaXJ0dWFsTWluQnVmZmVyUHhcIlxuICAgICAgICAgIFt0YWJsZU1haW5FbGVtZW50XT1cInRhYmxlTWFpbkVsZW1lbnRcIlxuICAgICAgICAgIFt2aXJ0dWFsRm9yVHJhY2tCeV09XCJuelZpcnR1YWxGb3JUcmFja0J5XCJcbiAgICAgICAgPjwvbnotdGFibGUtaW5uZXItc2Nyb2xsPlxuICAgICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRUZW1wbGF0ZT5cbiAgICAgICAgICA8bnotdGFibGUtaW5uZXItZGVmYXVsdFxuICAgICAgICAgICAgW3RhYmxlTGF5b3V0XT1cIm56VGFibGVMYXlvdXRcIlxuICAgICAgICAgICAgW2xpc3RPZkNvbFdpZHRoXT1cImxpc3RPZk1hbnVhbENvbFdpZHRoXCJcbiAgICAgICAgICAgIFt0aGVhZFRlbXBsYXRlXT1cInRoZWFkVGVtcGxhdGVcIlxuICAgICAgICAgICAgW2NvbnRlbnRUZW1wbGF0ZV09XCJjb250ZW50VGVtcGxhdGVcIlxuICAgICAgICAgID48L256LXRhYmxlLWlubmVyLWRlZmF1bHQ+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxuei10YWJsZS10aXRsZS1mb290ZXIgW2Zvb3Rlcl09XCJuekZvb3RlclwiICpuZ0lmPVwibnpGb290ZXJcIj48L256LXRhYmxlLXRpdGxlLWZvb3Rlcj5cbiAgICAgIDwvZGl2PlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm56UGFnaW5hdGlvblBvc2l0aW9uID09PSAnYm90aCcgfHwgbnpQYWdpbmF0aW9uUG9zaXRpb24gPT09ICdib3R0b20nXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJwYWdpbmF0aW9uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9uei1zcGluPlxuICAgIDxuZy10ZW1wbGF0ZSAjcGFnaW5hdGlvblRlbXBsYXRlPlxuICAgICAgPG56LXBhZ2luYXRpb25cbiAgICAgICAgKm5nSWY9XCJuelNob3dQYWdpbmF0aW9uICYmIHNob3dQYWdpbmF0aW9uICYmIGRhdGEubGVuZ3RoXCJcbiAgICAgICAgY2xhc3M9XCJhbnQtdGFibGUtcGFnaW5hdGlvbiBhbnQtdGFibGUtcGFnaW5hdGlvbi1yaWdodFwiXG4gICAgICAgIFtuelNob3dTaXplQ2hhbmdlcl09XCJuelNob3dTaXplQ2hhbmdlclwiXG4gICAgICAgIFtuelBhZ2VTaXplT3B0aW9uc109XCJuelBhZ2VTaXplT3B0aW9uc1wiXG4gICAgICAgIFtuekl0ZW1SZW5kZXJdPVwibnpJdGVtUmVuZGVyIVwiXG4gICAgICAgIFtuelNob3dRdWlja0p1bXBlcl09XCJuelNob3dRdWlja0p1bXBlclwiXG4gICAgICAgIFtuekhpZGVPblNpbmdsZVBhZ2VdPVwibnpIaWRlT25TaW5nbGVQYWdlXCJcbiAgICAgICAgW256U2hvd1RvdGFsXT1cIm56U2hvd1RvdGFsXCJcbiAgICAgICAgW256U2l6ZV09XCJuelNpemUgPT09ICdkZWZhdWx0JyA/ICdkZWZhdWx0JyA6ICdzbWFsbCdcIlxuICAgICAgICBbbnpQYWdlU2l6ZV09XCJuelBhZ2VTaXplXCJcbiAgICAgICAgW256VG90YWxdPVwibnpUb3RhbFwiXG4gICAgICAgIFtuelNpbXBsZV09XCJuelNpbXBsZVwiXG4gICAgICAgIFtuelBhZ2VJbmRleF09XCJuelBhZ2VJbmRleFwiXG4gICAgICAgIChuelBhZ2VTaXplQ2hhbmdlKT1cIm9uUGFnZVNpemVDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgIChuelBhZ2VJbmRleENoYW5nZSk9XCJvblBhZ2VJbmRleENoYW5nZSgkZXZlbnQpXCJcbiAgICAgID48L256LXBhZ2luYXRpb24+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI2NvbnRlbnRUZW1wbGF0ZT5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtdGFibGUtd3JhcHBlci1ydGxdJzogJ2RpciA9PT0gXCJydGxcIidcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRhYmxlQ29tcG9uZW50PFQgPSBOelNhZmVBbnk+IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG4gIHJlYWRvbmx5IF9uek1vZHVsZU5hbWU6IE56Q29uZmlnS2V5ID0gTlpfQ09ORklHX01PRFVMRV9OQU1FO1xuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekZyb250UGFnaW5hdGlvbjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpUZW1wbGF0ZU1vZGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2hvd1BhZ2luYXRpb246IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256TG9hZGluZzogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpCb3JkZXJlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpPdXRlckJvcmRlcmVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dTaXplQ2hhbmdlcjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpIaWRlT25TaW5nbGVQYWdlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dRdWlja0p1bXBlcjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTaW1wbGU6IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBuelRhYmxlTGF5b3V0OiBOelRhYmxlTGF5b3V0ID0gJ2F1dG8nO1xuICBASW5wdXQoKSBuelNob3dUb3RhbDogVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IG51bWJlcjsgcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0gfT4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpJdGVtUmVuZGVyOiBUZW1wbGF0ZVJlZjxQYWdpbmF0aW9uSXRlbVJlbmRlckNvbnRleHQ+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56VGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpGb290ZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpOb1Jlc3VsdDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgbnpQYWdlU2l6ZU9wdGlvbnMgPSBbMTAsIDIwLCAzMCwgNDAsIDUwXTtcbiAgQElucHV0KCkgbnpWaXJ0dWFsSXRlbVNpemUgPSAwO1xuICBASW5wdXQoKSBuelZpcnR1YWxNYXhCdWZmZXJQeCA9IDIwMDtcbiAgQElucHV0KCkgbnpWaXJ0dWFsTWluQnVmZmVyUHggPSAxMDA7XG4gIEBJbnB1dCgpIG56VmlydHVhbEZvclRyYWNrQnk6IFRyYWNrQnlGdW5jdGlvbjxOelRhYmxlRGF0YT4gPSBpbmRleCA9PiBpbmRleDtcbiAgQElucHV0KCkgbnpMb2FkaW5nRGVsYXkgPSAwO1xuICBASW5wdXQoKSBuelBhZ2VJbmRleCA9IDE7XG4gIEBJbnB1dCgpIG56UGFnZVNpemUgPSAxMDtcbiAgQElucHV0KCkgbnpUb3RhbCA9IDA7XG4gIEBJbnB1dCgpIG56V2lkdGhDb25maWc6IEFycmF5PHN0cmluZyB8IG51bGw+ID0gW107XG4gIEBJbnB1dCgpIG56RGF0YTogVFtdID0gW107XG4gIEBJbnB1dCgpIG56UGFnaW5hdGlvblBvc2l0aW9uOiBOelRhYmxlUGFnaW5hdGlvblBvc2l0aW9uID0gJ2JvdHRvbSc7XG4gIEBJbnB1dCgpIG56U2Nyb2xsOiB7IHg/OiBzdHJpbmcgfCBudWxsOyB5Pzogc3RyaW5nIHwgbnVsbCB9ID0geyB4OiBudWxsLCB5OiBudWxsIH07XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekZyb250UGFnaW5hdGlvbiA9IHRydWU7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelRlbXBsYXRlTW9kZSA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpTaG93UGFnaW5hdGlvbiA9IHRydWU7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekxvYWRpbmcgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56T3V0ZXJCb3JkZXJlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56TG9hZGluZ0luZGljYXRvcjogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIEBJbnB1dEJvb2xlYW4oKSBuekJvcmRlcmVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgbnpTaXplOiBOelRhYmxlU2l6ZSA9ICdkZWZhdWx0JztcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBASW5wdXRCb29sZWFuKCkgbnpTaG93U2l6ZUNoYW5nZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBASW5wdXRCb29sZWFuKCkgbnpIaWRlT25TaW5nbGVQYWdlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgQElucHV0Qm9vbGVhbigpIG56U2hvd1F1aWNrSnVtcGVyOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgQElucHV0Qm9vbGVhbigpIG56U2ltcGxlOiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuelBhZ2VTaXplQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuelBhZ2VJbmRleENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpRdWVyeVBhcmFtcyA9IG5ldyBFdmVudEVtaXR0ZXI8TnpUYWJsZVF1ZXJ5UGFyYW1zPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpDdXJyZW50UGFnZURhdGFDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE56VGFibGVEYXRhW10+KCk7XG5cbiAgLyoqIHB1YmxpYyBkYXRhIGZvciBuZ0ZvciB0ciAqL1xuICBwdWJsaWMgZGF0YTogVFtdID0gW107XG4gIHB1YmxpYyBjZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQ/OiBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQ7XG4gIHNjcm9sbFg6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBzY3JvbGxZOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgdGhlYWRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBsaXN0T2ZBdXRvQ29sV2lkdGg6IEFycmF5PHN0cmluZyB8IG51bGw+ID0gW107XG4gIGxpc3RPZk1hbnVhbENvbFdpZHRoOiBBcnJheTxzdHJpbmcgfCBudWxsPiA9IFtdO1xuICBoYXNGaXhMZWZ0ID0gZmFsc2U7XG4gIGhhc0ZpeFJpZ2h0ID0gZmFsc2U7XG4gIHNob3dQYWdpbmF0aW9uID0gdHJ1ZTtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgbG9hZGluZyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcHJpdmF0ZSB0ZW1wbGF0ZU1vZGUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGRpcjogRGlyZWN0aW9uID0gJ2x0cic7XG4gIEBDb250ZW50Q2hpbGQoTnpUYWJsZVZpcnR1YWxTY3JvbGxEaXJlY3RpdmUsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBuelZpcnR1YWxTY3JvbGxEaXJlY3RpdmUhOiBOelRhYmxlVmlydHVhbFNjcm9sbERpcmVjdGl2ZTtcbiAgQFZpZXdDaGlsZChOelRhYmxlSW5uZXJTY3JvbGxDb21wb25lbnQpIG56VGFibGVJbm5lclNjcm9sbENvbXBvbmVudCE6IE56VGFibGVJbm5lclNjcm9sbENvbXBvbmVudDtcbiAgdmVydGljYWxTY3JvbGxCYXJXaWR0aCA9IDA7XG4gIG9uUGFnZVNpemVDaGFuZ2Uoc2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5uelRhYmxlRGF0YVNlcnZpY2UudXBkYXRlUGFnZVNpemUoc2l6ZSk7XG4gIH1cblxuICBvblBhZ2VJbmRleENoYW5nZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5uelRhYmxlRGF0YVNlcnZpY2UudXBkYXRlUGFnZUluZGV4KGluZGV4KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIG56UmVzaXplT2JzZXJ2ZXI6IE56UmVzaXplT2JzZXJ2ZXIsXG4gICAgcHJpdmF0ZSBuekNvbmZpZ1NlcnZpY2U6IE56Q29uZmlnU2VydmljZSxcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBuelRhYmxlU3R5bGVTZXJ2aWNlOiBOelRhYmxlU3R5bGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgbnpUYWJsZURhdGFTZXJ2aWNlOiBOelRhYmxlRGF0YVNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXJlY3Rpb25hbGl0eTogRGlyZWN0aW9uYWxpdHlcbiAgKSB7XG4gICAgLy8gVE9ETzogbW92ZSB0byBob3N0IGFmdGVyIFZpZXcgRW5naW5lIGRlcHJlY2F0aW9uXG4gICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYW50LXRhYmxlLXdyYXBwZXInKTtcbiAgICB0aGlzLm56Q29uZmlnU2VydmljZVxuICAgICAgLmdldENvbmZpZ0NoYW5nZUV2ZW50Rm9yQ29tcG9uZW50KE5aX0NPTkZJR19NT0RVTEVfTkFNRSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgeyBwYWdlSW5kZXhEaXN0aW5jdCQsIHBhZ2VTaXplRGlzdGluY3QkLCBsaXN0T2ZDdXJyZW50UGFnZURhdGEkLCB0b3RhbCQsIHF1ZXJ5UGFyYW1zJCB9ID0gdGhpcy5uelRhYmxlRGF0YVNlcnZpY2U7XG4gICAgY29uc3QgeyB0aGVhZFRlbXBsYXRlJCwgaGFzRml4TGVmdCQsIGhhc0ZpeFJpZ2h0JCB9ID0gdGhpcy5uelRhYmxlU3R5bGVTZXJ2aWNlO1xuXG4gICAgdGhpcy5kaXIgPSB0aGlzLmRpcmVjdGlvbmFsaXR5LnZhbHVlO1xuICAgIHRoaXMuZGlyZWN0aW9uYWxpdHkuY2hhbmdlPy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChkaXJlY3Rpb246IERpcmVjdGlvbikgPT4ge1xuICAgICAgdGhpcy5kaXIgPSBkaXJlY3Rpb247XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG5cbiAgICBxdWVyeVBhcmFtcyQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSh0aGlzLm56UXVlcnlQYXJhbXMpO1xuICAgIHBhZ2VJbmRleERpc3RpbmN0JC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKHBhZ2VJbmRleCA9PiB7XG4gICAgICBpZiAocGFnZUluZGV4ICE9PSB0aGlzLm56UGFnZUluZGV4KSB7XG4gICAgICAgIHRoaXMubnpQYWdlSW5kZXggPSBwYWdlSW5kZXg7XG4gICAgICAgIHRoaXMubnpQYWdlSW5kZXhDaGFuZ2UubmV4dChwYWdlSW5kZXgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHBhZ2VTaXplRGlzdGluY3QkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUocGFnZVNpemUgPT4ge1xuICAgICAgaWYgKHBhZ2VTaXplICE9PSB0aGlzLm56UGFnZVNpemUpIHtcbiAgICAgICAgdGhpcy5uelBhZ2VTaXplID0gcGFnZVNpemU7XG4gICAgICAgIHRoaXMubnpQYWdlU2l6ZUNoYW5nZS5uZXh0KHBhZ2VTaXplKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0b3RhbCRcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JCksXG4gICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLm56RnJvbnRQYWdpbmF0aW9uKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSh0b3RhbCA9PiB7XG4gICAgICAgIGlmICh0b3RhbCAhPT0gdGhpcy5uelRvdGFsKSB7XG4gICAgICAgICAgdGhpcy5uelRvdGFsID0gdG90YWw7XG4gICAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIGxpc3RPZkN1cnJlbnRQYWdlRGF0YSQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICB0aGlzLm56Q3VycmVudFBhZ2VEYXRhQ2hhbmdlLm5leHQoZGF0YSk7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcblxuICAgIHRoZWFkVGVtcGxhdGUkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUodGhlYWRUZW1wbGF0ZSA9PiB7XG4gICAgICB0aGlzLnRoZWFkVGVtcGxhdGUgPSB0aGVhZFRlbXBsYXRlO1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG5cbiAgICBoYXNGaXhMZWZ0JC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKGhhc0ZpeExlZnQgPT4ge1xuICAgICAgdGhpcy5oYXNGaXhMZWZ0ID0gaGFzRml4TGVmdDtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuXG4gICAgaGFzRml4UmlnaHQkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoaGFzRml4UmlnaHQgPT4ge1xuICAgICAgdGhpcy5oYXNGaXhSaWdodCA9IGhhc0ZpeFJpZ2h0O1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG5cbiAgICBjb21iaW5lTGF0ZXN0KFt0b3RhbCQsIHRoaXMubG9hZGluZyQsIHRoaXMudGVtcGxhdGVNb2RlJF0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChbdG90YWwsIGxvYWRpbmcsIHRlbXBsYXRlTW9kZV0pID0+IHRvdGFsID09PSAwICYmICFsb2FkaW5nICYmICF0ZW1wbGF0ZU1vZGUpLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoZW1wdHkgPT4ge1xuICAgICAgICB0aGlzLm56VGFibGVTdHlsZVNlcnZpY2Uuc2V0U2hvd0VtcHR5KGVtcHR5KTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy52ZXJ0aWNhbFNjcm9sbEJhcldpZHRoID0gbWVhc3VyZVNjcm9sbGJhcigndmVydGljYWwnKTtcbiAgICB0aGlzLm56VGFibGVTdHlsZVNlcnZpY2UubGlzdE9mTGlzdE9mVGhXaWR0aFB4JC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKGxpc3RPZldpZHRoID0+IHtcbiAgICAgIHRoaXMubGlzdE9mQXV0b0NvbFdpZHRoID0gbGlzdE9mV2lkdGg7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgICB0aGlzLm56VGFibGVTdHlsZVNlcnZpY2UubWFudWFsV2lkdGhDb25maWdQeCQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZShsaXN0T2ZXaWR0aCA9PiB7XG4gICAgICB0aGlzLmxpc3RPZk1hbnVhbENvbFdpZHRoID0gbGlzdE9mV2lkdGg7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56U2Nyb2xsLCBuelBhZ2VJbmRleCwgbnpQYWdlU2l6ZSwgbnpGcm9udFBhZ2luYXRpb24sIG56RGF0YSwgbnpXaWR0aENvbmZpZywgbnpOb1Jlc3VsdCwgbnpMb2FkaW5nLCBuelRlbXBsYXRlTW9kZSB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpQYWdlSW5kZXgpIHtcbiAgICAgIHRoaXMubnpUYWJsZURhdGFTZXJ2aWNlLnVwZGF0ZVBhZ2VJbmRleCh0aGlzLm56UGFnZUluZGV4KTtcbiAgICB9XG4gICAgaWYgKG56UGFnZVNpemUpIHtcbiAgICAgIHRoaXMubnpUYWJsZURhdGFTZXJ2aWNlLnVwZGF0ZVBhZ2VTaXplKHRoaXMubnpQYWdlU2l6ZSk7XG4gICAgfVxuICAgIGlmIChuekRhdGEpIHtcbiAgICAgIHRoaXMubnpEYXRhID0gdGhpcy5uekRhdGEgfHwgW107XG4gICAgICB0aGlzLm56VGFibGVEYXRhU2VydmljZS51cGRhdGVMaXN0T2ZEYXRhKHRoaXMubnpEYXRhKTtcbiAgICB9XG4gICAgaWYgKG56RnJvbnRQYWdpbmF0aW9uKSB7XG4gICAgICB0aGlzLm56VGFibGVEYXRhU2VydmljZS51cGRhdGVGcm9udFBhZ2luYXRpb24odGhpcy5uekZyb250UGFnaW5hdGlvbik7XG4gICAgfVxuICAgIGlmIChuelNjcm9sbCkge1xuICAgICAgdGhpcy5zZXRTY3JvbGxPbkNoYW5nZXMoKTtcbiAgICB9XG4gICAgaWYgKG56V2lkdGhDb25maWcpIHtcbiAgICAgIHRoaXMubnpUYWJsZVN0eWxlU2VydmljZS5zZXRUYWJsZVdpZHRoQ29uZmlnKHRoaXMubnpXaWR0aENvbmZpZyk7XG4gICAgfVxuICAgIGlmIChuekxvYWRpbmcpIHtcbiAgICAgIHRoaXMubG9hZGluZyQubmV4dCh0aGlzLm56TG9hZGluZyk7XG4gICAgfVxuICAgIGlmIChuelRlbXBsYXRlTW9kZSkge1xuICAgICAgdGhpcy50ZW1wbGF0ZU1vZGUkLm5leHQodGhpcy5uelRlbXBsYXRlTW9kZSk7XG4gICAgfVxuICAgIGlmIChuek5vUmVzdWx0KSB7XG4gICAgICB0aGlzLm56VGFibGVTdHlsZVNlcnZpY2Uuc2V0Tm9SZXN1bHQodGhpcy5uek5vUmVzdWx0KTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZVNob3dQYWdpbmF0aW9uKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5uelJlc2l6ZU9ic2VydmVyXG4gICAgICAub2JzZXJ2ZSh0aGlzLmVsZW1lbnRSZWYpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChbZW50cnldKSA9PiB7XG4gICAgICAgICAgY29uc3QgeyB3aWR0aCB9ID0gZW50cnkudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgIGNvbnN0IHNjcm9sbEJhcldpZHRoID0gdGhpcy5zY3JvbGxZID8gdGhpcy52ZXJ0aWNhbFNjcm9sbEJhcldpZHRoIDogMDtcbiAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih3aWR0aCAtIHNjcm9sbEJhcldpZHRoKTtcbiAgICAgICAgfSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSh0aGlzLm56VGFibGVTdHlsZVNlcnZpY2UuaG9zdFdpZHRoJCk7XG4gICAgaWYgKHRoaXMubnpUYWJsZUlubmVyU2Nyb2xsQ29tcG9uZW50ICYmIHRoaXMubnpUYWJsZUlubmVyU2Nyb2xsQ29tcG9uZW50LmNka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCkge1xuICAgICAgdGhpcy5jZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQgPSB0aGlzLm56VGFibGVJbm5lclNjcm9sbENvbXBvbmVudC5jZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQ7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRTY3JvbGxPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgdGhpcy5zY3JvbGxYID0gKHRoaXMubnpTY3JvbGwgJiYgdGhpcy5uelNjcm9sbC54KSB8fCBudWxsO1xuICAgIHRoaXMuc2Nyb2xsWSA9ICh0aGlzLm56U2Nyb2xsICYmIHRoaXMubnpTY3JvbGwueSkgfHwgbnVsbDtcbiAgICB0aGlzLm56VGFibGVTdHlsZVNlcnZpY2Uuc2V0U2Nyb2xsKHRoaXMuc2Nyb2xsWCwgdGhpcy5zY3JvbGxZKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlU2hvd1BhZ2luYXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5zaG93UGFnaW5hdGlvbiA9XG4gICAgICAodGhpcy5uekhpZGVPblNpbmdsZVBhZ2UgJiYgdGhpcy5uekRhdGEubGVuZ3RoID4gdGhpcy5uelBhZ2VTaXplKSB8fFxuICAgICAgKHRoaXMubnpEYXRhLmxlbmd0aCA+IDAgJiYgIXRoaXMubnpIaWRlT25TaW5nbGVQYWdlKSB8fFxuICAgICAgKCF0aGlzLm56RnJvbnRQYWdpbmF0aW9uICYmIHRoaXMubnpUb3RhbCA+IHRoaXMubnpQYWdlU2l6ZSk7XG4gIH1cbn1cbiJdfQ==