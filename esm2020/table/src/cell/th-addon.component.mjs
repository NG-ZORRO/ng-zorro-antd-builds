import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "../addon/filter.component";
import * as i2 from "../addon/sorters.component";
import * as i3 from "@angular/common";
export class NzThAddOnComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this.manualClickOrder$ = new Subject();
        this.calcOperatorChange$ = new Subject();
        this.nzFilterValue = null;
        this.sortOrder = null;
        this.sortDirections = ['ascend', 'descend', null];
        this.sortOrderChange$ = new Subject();
        this.destroy$ = new Subject();
        this.isNzShowSortChanged = false;
        this.isNzShowFilterChanged = false;
        this.nzFilterMultiple = true;
        this.nzSortOrder = null;
        this.nzSortPriority = false;
        this.nzSortDirections = ['ascend', 'descend', null];
        this.nzFilters = [];
        this.nzSortFn = null;
        this.nzFilterFn = null;
        this.nzShowSort = false;
        this.nzShowFilter = false;
        this.nzCustomFilter = false;
        this.nzCheckedChange = new EventEmitter();
        this.nzSortOrderChange = new EventEmitter();
        this.nzFilterChange = new EventEmitter();
    }
    getNextSortDirection(sortDirections, current) {
        const index = sortDirections.indexOf(current);
        if (index === sortDirections.length - 1) {
            return sortDirections[0];
        }
        else {
            return sortDirections[index + 1];
        }
    }
    emitNextSortValue() {
        if (this.nzShowSort) {
            const nextOrder = this.getNextSortDirection(this.sortDirections, this.sortOrder);
            this.setSortOrder(nextOrder);
            this.manualClickOrder$.next(this);
        }
    }
    setSortOrder(order) {
        this.sortOrderChange$.next(order);
    }
    clearSortOrder() {
        if (this.sortOrder !== null) {
            this.setSortOrder(null);
        }
    }
    onFilterValueChange(value) {
        this.nzFilterChange.emit(value);
        this.nzFilterValue = value;
        this.updateCalcOperator();
    }
    updateCalcOperator() {
        this.calcOperatorChange$.next();
    }
    ngOnInit() {
        this.sortOrderChange$.pipe(takeUntil(this.destroy$)).subscribe(order => {
            if (this.sortOrder !== order) {
                this.sortOrder = order;
                this.nzSortOrderChange.emit(order);
            }
            this.updateCalcOperator();
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        const { nzSortDirections, nzFilters, nzSortOrder, nzSortFn, nzFilterFn, nzSortPriority, nzFilterMultiple, nzShowSort, nzShowFilter } = changes;
        if (nzSortDirections) {
            if (this.nzSortDirections && this.nzSortDirections.length) {
                this.sortDirections = this.nzSortDirections;
            }
        }
        if (nzSortOrder) {
            this.sortOrder = this.nzSortOrder;
            this.setSortOrder(this.nzSortOrder);
        }
        if (nzShowSort) {
            this.isNzShowSortChanged = true;
        }
        if (nzShowFilter) {
            this.isNzShowFilterChanged = true;
        }
        const isFirstChange = (value) => value && value.firstChange && value.currentValue !== undefined;
        if ((isFirstChange(nzSortOrder) || isFirstChange(nzSortFn)) && !this.isNzShowSortChanged) {
            this.nzShowSort = true;
        }
        if (isFirstChange(nzFilters) && !this.isNzShowFilterChanged) {
            this.nzShowFilter = true;
        }
        if ((nzFilters || nzFilterMultiple) && this.nzShowFilter) {
            const listOfValue = this.nzFilters.filter(item => item.byDefault).map(item => item.value);
            this.nzFilterValue = this.nzFilterMultiple ? listOfValue : listOfValue[0] || null;
        }
        if (nzSortFn || nzFilterFn || nzSortPriority || nzFilters) {
            this.updateCalcOperator();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzThAddOnComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzThAddOnComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NzThAddOnComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzThAddOnComponent, selector: "th[nzColumnKey], th[nzSortFn], th[nzSortOrder], th[nzFilters], th[nzShowSort], th[nzShowFilter], th[nzCustomFilter]", inputs: { nzColumnKey: "nzColumnKey", nzFilterMultiple: "nzFilterMultiple", nzSortOrder: "nzSortOrder", nzSortPriority: "nzSortPriority", nzSortDirections: "nzSortDirections", nzFilters: "nzFilters", nzSortFn: "nzSortFn", nzFilterFn: "nzFilterFn", nzShowSort: "nzShowSort", nzShowFilter: "nzShowFilter", nzCustomFilter: "nzCustomFilter" }, outputs: { nzCheckedChange: "nzCheckedChange", nzSortOrderChange: "nzSortOrderChange", nzFilterChange: "nzFilterChange" }, host: { listeners: { "click": "emitNextSortValue()" }, properties: { "class.ant-table-column-has-sorters": "nzShowSort", "class.ant-table-column-sort": "sortOrder === 'descend' || sortOrder === 'ascend'" } }, usesOnChanges: true, ngImport: i0, template: `
    <nz-table-filter
      *ngIf="nzShowFilter || nzCustomFilter; else notFilterTemplate"
      [contentTemplate]="notFilterTemplate"
      [extraTemplate]="extraTemplate"
      [customFilter]="nzCustomFilter"
      [filterMultiple]="nzFilterMultiple"
      [listOfFilter]="nzFilters"
      (filterChange)="onFilterValueChange($event)"
    ></nz-table-filter>
    <ng-template #notFilterTemplate>
      <ng-template [ngTemplateOutlet]="nzShowSort ? sortTemplate : contentTemplate"></ng-template>
    </ng-template>
    <ng-template #extraTemplate>
      <ng-content select="[nz-th-extra]"></ng-content>
      <ng-content select="nz-filter-trigger"></ng-content>
    </ng-template>
    <ng-template #sortTemplate>
      <nz-table-sorters
        [sortOrder]="sortOrder"
        [sortDirections]="sortDirections"
        [contentTemplate]="contentTemplate"
      ></nz-table-sorters>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `, isInline: true, components: [{ type: i1.NzTableFilterComponent, selector: "nz-table-filter", inputs: ["contentTemplate", "customFilter", "extraTemplate", "filterMultiple", "listOfFilter"], outputs: ["filterChange"] }, { type: i2.NzTableSortersComponent, selector: "nz-table-sorters", inputs: ["sortDirections", "sortOrder", "contentTemplate"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzThAddOnComponent.prototype, "nzShowSort", void 0);
__decorate([
    InputBoolean()
], NzThAddOnComponent.prototype, "nzShowFilter", void 0);
__decorate([
    InputBoolean()
], NzThAddOnComponent.prototype, "nzCustomFilter", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzThAddOnComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'th[nzColumnKey], th[nzSortFn], th[nzSortOrder], th[nzFilters], th[nzShowSort], th[nzShowFilter], th[nzCustomFilter]',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <nz-table-filter
      *ngIf="nzShowFilter || nzCustomFilter; else notFilterTemplate"
      [contentTemplate]="notFilterTemplate"
      [extraTemplate]="extraTemplate"
      [customFilter]="nzCustomFilter"
      [filterMultiple]="nzFilterMultiple"
      [listOfFilter]="nzFilters"
      (filterChange)="onFilterValueChange($event)"
    ></nz-table-filter>
    <ng-template #notFilterTemplate>
      <ng-template [ngTemplateOutlet]="nzShowSort ? sortTemplate : contentTemplate"></ng-template>
    </ng-template>
    <ng-template #extraTemplate>
      <ng-content select="[nz-th-extra]"></ng-content>
      <ng-content select="nz-filter-trigger"></ng-content>
    </ng-template>
    <ng-template #sortTemplate>
      <nz-table-sorters
        [sortOrder]="sortOrder"
        [sortDirections]="sortDirections"
        [contentTemplate]="contentTemplate"
      ></nz-table-sorters>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
                    host: {
                        '[class.ant-table-column-has-sorters]': 'nzShowSort',
                        '[class.ant-table-column-sort]': `sortOrder === 'descend' || sortOrder === 'ascend'`,
                        '(click)': 'emitNextSortValue()'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { nzColumnKey: [{
                type: Input
            }], nzFilterMultiple: [{
                type: Input
            }], nzSortOrder: [{
                type: Input
            }], nzSortPriority: [{
                type: Input
            }], nzSortDirections: [{
                type: Input
            }], nzFilters: [{
                type: Input
            }], nzSortFn: [{
                type: Input
            }], nzFilterFn: [{
                type: Input
            }], nzShowSort: [{
                type: Input
            }], nzShowFilter: [{
                type: Input
            }], nzCustomFilter: [{
                type: Input
            }], nzCheckedChange: [{
                type: Output
            }], nzSortOrderChange: [{
                type: Output
            }], nzFilterChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGgtYWRkb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50cy90YWJsZS9zcmMvY2VsbC90aC1hZGRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7R0FHRztBQUVILHVEQUF1RDtBQUN2RCxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFHTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7OztBQWtEdkQsTUFBTSxPQUFPLGtCQUFrQjtJQWtFN0IsWUFBb0IsR0FBc0I7UUFBdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUE3RDFDLHNCQUFpQixHQUFHLElBQUksT0FBTyxFQUF5QixDQUFDO1FBQ3pELHdCQUFtQixHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDcEMsa0JBQWEsR0FBdUIsSUFBSSxDQUFDO1FBQ3pDLGNBQVMsR0FBcUIsSUFBSSxDQUFDO1FBQ25DLG1CQUFjLEdBQXVCLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6RCxxQkFBZ0IsR0FBRyxJQUFJLE9BQU8sRUFBb0IsQ0FBQztRQUNuRCxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUN6Qix3QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFDNUIsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBRTdCLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUN4QixnQkFBVyxHQUFxQixJQUFJLENBQUM7UUFDckMsbUJBQWMsR0FBcUIsS0FBSyxDQUFDO1FBQ3pDLHFCQUFn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U0FBUztzQkFBakIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ21CLFVBQVU7c0JBQWxDLEtBQUs7Z0JBQ21CLFlBQVk7c0JBQXBDLEtBQUs7Z0JBQ21CLGNBQWM7c0JBQXRDLEtBQUs7Z0JBQ2EsZUFBZTtzQkFBakMsTUFBTTtnQkFDWSxpQkFBaUI7c0JBQW5DLE1BQU07Z0JBQ1ksY0FBYztzQkFBaEMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIEBhbmd1bGFyLWVzbGludC9jb21wb25lbnQtc2VsZWN0b3IgKi9cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7XG4gIE56VGFibGVGaWx0ZXJGbixcbiAgTnpUYWJsZUZpbHRlckxpc3QsXG4gIE56VGFibGVGaWx0ZXJWYWx1ZSxcbiAgTnpUYWJsZVNvcnRGbixcbiAgTnpUYWJsZVNvcnRPcmRlclxufSBmcm9tICcuLi90YWJsZS50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjpcbiAgICAndGhbbnpDb2x1bW5LZXldLCB0aFtuelNvcnRGbl0sIHRoW256U29ydE9yZGVyXSwgdGhbbnpGaWx0ZXJzXSwgdGhbbnpTaG93U29ydF0sIHRoW256U2hvd0ZpbHRlcl0sIHRoW256Q3VzdG9tRmlsdGVyXScsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bnotdGFibGUtZmlsdGVyXG4gICAgICAqbmdJZj1cIm56U2hvd0ZpbHRlciB8fCBuekN1c3RvbUZpbHRlcjsgZWxzZSBub3RGaWx0ZXJUZW1wbGF0ZVwiXG4gICAgICBbY29udGVudFRlbXBsYXRlXT1cIm5vdEZpbHRlclRlbXBsYXRlXCJcbiAgICAgIFtleHRyYVRlbXBsYXRlXT1cImV4dHJhVGVtcGxhdGVcIlxuICAgICAgW2N1c3RvbUZpbHRlcl09XCJuekN1c3RvbUZpbHRlclwiXG4gICAgICBbZmlsdGVyTXVsdGlwbGVdPVwibnpGaWx0ZXJNdWx0aXBsZVwiXG4gICAgICBbbGlzdE9mRmlsdGVyXT1cIm56RmlsdGVyc1wiXG4gICAgICAoZmlsdGVyQ2hhbmdlKT1cIm9uRmlsdGVyVmFsdWVDaGFuZ2UoJGV2ZW50KVwiXG4gICAgPjwvbnotdGFibGUtZmlsdGVyPlxuICAgIDxuZy10ZW1wbGF0ZSAjbm90RmlsdGVyVGVtcGxhdGU+XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibnpTaG93U29ydCA/IHNvcnRUZW1wbGF0ZSA6IGNvbnRlbnRUZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI2V4dHJhVGVtcGxhdGU+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbbnotdGgtZXh0cmFdXCI+PC9uZy1jb250ZW50PlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibnotZmlsdGVyLXRyaWdnZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI3NvcnRUZW1wbGF0ZT5cbiAgICAgIDxuei10YWJsZS1zb3J0ZXJzXG4gICAgICAgIFtzb3J0T3JkZXJdPVwic29ydE9yZGVyXCJcbiAgICAgICAgW3NvcnREaXJlY3Rpb25zXT1cInNvcnREaXJlY3Rpb25zXCJcbiAgICAgICAgW2NvbnRlbnRUZW1wbGF0ZV09XCJjb250ZW50VGVtcGxhdGVcIlxuICAgICAgPjwvbnotdGFibGUtc29ydGVycz5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSAjY29udGVudFRlbXBsYXRlPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC10YWJsZS1jb2x1bW4taGFzLXNvcnRlcnNdJzogJ256U2hvd1NvcnQnLFxuICAgICdbY2xhc3MuYW50LXRhYmxlLWNvbHVtbi1zb3J0XSc6IGBzb3J0T3JkZXIgPT09ICdkZXNjZW5kJyB8fCBzb3J0T3JkZXIgPT09ICdhc2NlbmQnYCxcbiAgICAnKGNsaWNrKSc6ICdlbWl0TmV4dFNvcnRWYWx1ZSgpJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VGhBZGRPbkNvbXBvbmVudDxUPiBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTaG93U29ydDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTaG93RmlsdGVyOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekN1c3RvbUZpbHRlcjogQm9vbGVhbklucHV0O1xuXG4gIG1hbnVhbENsaWNrT3JkZXIkID0gbmV3IFN1YmplY3Q8TnpUaEFkZE9uQ29tcG9uZW50PFQ+PigpO1xuICBjYWxjT3BlcmF0b3JDaGFuZ2UkID0gbmV3IFN1YmplY3QoKTtcbiAgbnpGaWx0ZXJWYWx1ZTogTnpUYWJsZUZpbHRlclZhbHVlID0gbnVsbDtcbiAgc29ydE9yZGVyOiBOelRhYmxlU29ydE9yZGVyID0gbnVsbDtcbiAgc29ydERpcmVjdGlvbnM6IE56VGFibGVTb3J0T3JkZXJbXSA9IFsnYXNjZW5kJywgJ2Rlc2NlbmQnLCBudWxsXTtcbiAgcHJpdmF0ZSBzb3J0T3JkZXJDaGFuZ2UkID0gbmV3IFN1YmplY3Q8TnpUYWJsZVNvcnRPcmRlcj4oKTtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgaXNOelNob3dTb3J0Q2hhbmdlZCA9IGZhbHNlO1xuICBwcml2YXRlIGlzTnpTaG93RmlsdGVyQ2hhbmdlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBuekNvbHVtbktleT86IHN0cmluZztcbiAgQElucHV0KCkgbnpGaWx0ZXJNdWx0aXBsZSA9IHRydWU7XG4gIEBJbnB1dCgpIG56U29ydE9yZGVyOiBOelRhYmxlU29ydE9yZGVyID0gbnVsbDtcbiAgQElucHV0KCkgbnpTb3J0UHJpb3JpdHk6IG51bWJlciB8IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgbnpTb3J0RGlyZWN0aW9uczogTnpUYWJsZVNvcnRPcmRlcltdID0gWydhc2NlbmQnLCAnZGVzY2VuZCcsIG51bGxdO1xuICBASW5wdXQoKSBuekZpbHRlcnM6IE56VGFibGVGaWx0ZXJMaXN0ID0gW107XG4gIEBJbnB1dCgpIG56U29ydEZuOiBOelRhYmxlU29ydEZuPFQ+IHwgYm9vbGVhbiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuekZpbHRlckZuOiBOelRhYmxlRmlsdGVyRm48VD4gfCBib29sZWFuIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNob3dTb3J0ID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNob3dGaWx0ZXIgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56Q3VzdG9tRmlsdGVyID0gZmFsc2U7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekNoZWNrZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuelNvcnRPcmRlckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nIHwgbnVsbD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56RmlsdGVyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOelRhYmxlRmlsdGVyVmFsdWU+KCk7XG5cbiAgZ2V0TmV4dFNvcnREaXJlY3Rpb24oc29ydERpcmVjdGlvbnM6IE56VGFibGVTb3J0T3JkZXJbXSwgY3VycmVudDogTnpUYWJsZVNvcnRPcmRlcik6IE56VGFibGVTb3J0T3JkZXIge1xuICAgIGNvbnN0IGluZGV4ID0gc29ydERpcmVjdGlvbnMuaW5kZXhPZihjdXJyZW50KTtcbiAgICBpZiAoaW5kZXggPT09IHNvcnREaXJlY3Rpb25zLmxlbmd0aCAtIDEpIHtcbiAgICAgIHJldHVybiBzb3J0RGlyZWN0aW9uc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNvcnREaXJlY3Rpb25zW2luZGV4ICsgMV07XG4gICAgfVxuICB9XG5cbiAgZW1pdE5leHRTb3J0VmFsdWUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpTaG93U29ydCkge1xuICAgICAgY29uc3QgbmV4dE9yZGVyID0gdGhpcy5nZXROZXh0U29ydERpcmVjdGlvbih0aGlzLnNvcnREaXJlY3Rpb25zLCB0aGlzLnNvcnRPcmRlciEpO1xuICAgICAgdGhpcy5zZXRTb3J0T3JkZXIobmV4dE9yZGVyKTtcbiAgICAgIHRoaXMubWFudWFsQ2xpY2tPcmRlciQubmV4dCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBzZXRTb3J0T3JkZXIob3JkZXI6IE56VGFibGVTb3J0T3JkZXIpOiB2b2lkIHtcbiAgICB0aGlzLnNvcnRPcmRlckNoYW5nZSQubmV4dChvcmRlcik7XG4gIH1cblxuICBjbGVhclNvcnRPcmRlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zb3J0T3JkZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuc2V0U29ydE9yZGVyKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIG9uRmlsdGVyVmFsdWVDaGFuZ2UodmFsdWU6IE56VGFibGVGaWx0ZXJWYWx1ZSk6IHZvaWQge1xuICAgIHRoaXMubnpGaWx0ZXJDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgdGhpcy5uekZpbHRlclZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy51cGRhdGVDYWxjT3BlcmF0b3IoKTtcbiAgfVxuXG4gIHVwZGF0ZUNhbGNPcGVyYXRvcigpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGNPcGVyYXRvckNoYW5nZSQubmV4dCgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc29ydE9yZGVyQ2hhbmdlJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKG9yZGVyID0+IHtcbiAgICAgIGlmICh0aGlzLnNvcnRPcmRlciAhPT0gb3JkZXIpIHtcbiAgICAgICAgdGhpcy5zb3J0T3JkZXIgPSBvcmRlcjtcbiAgICAgICAgdGhpcy5uelNvcnRPcmRlckNoYW5nZS5lbWl0KG9yZGVyKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudXBkYXRlQ2FsY09wZXJhdG9yKCk7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7XG4gICAgICBuelNvcnREaXJlY3Rpb25zLFxuICAgICAgbnpGaWx0ZXJzLFxuICAgICAgbnpTb3J0T3JkZXIsXG4gICAgICBuelNvcnRGbixcbiAgICAgIG56RmlsdGVyRm4sXG4gICAgICBuelNvcnRQcmlvcml0eSxcbiAgICAgIG56RmlsdGVyTXVsdGlwbGUsXG4gICAgICBuelNob3dTb3J0LFxuICAgICAgbnpTaG93RmlsdGVyXG4gICAgfSA9IGNoYW5nZXM7XG4gICAgaWYgKG56U29ydERpcmVjdGlvbnMpIHtcbiAgICAgIGlmICh0aGlzLm56U29ydERpcmVjdGlvbnMgJiYgdGhpcy5uelNvcnREaXJlY3Rpb25zLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnNvcnREaXJlY3Rpb25zID0gdGhpcy5uelNvcnREaXJlY3Rpb25zO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAobnpTb3J0T3JkZXIpIHtcbiAgICAgIHRoaXMuc29ydE9yZGVyID0gdGhpcy5uelNvcnRPcmRlcjtcbiAgICAgIHRoaXMuc2V0U29ydE9yZGVyKHRoaXMubnpTb3J0T3JkZXIpO1xuICAgIH1cbiAgICBpZiAobnpTaG93U29ydCkge1xuICAgICAgdGhpcy5pc056U2hvd1NvcnRDaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG56U2hvd0ZpbHRlcikge1xuICAgICAgdGhpcy5pc056U2hvd0ZpbHRlckNoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBpc0ZpcnN0Q2hhbmdlID0gKHZhbHVlOiBTaW1wbGVDaGFuZ2UpOiBib29sZWFuID0+XG4gICAgICB2YWx1ZSAmJiB2YWx1ZS5maXJzdENoYW5nZSAmJiB2YWx1ZS5jdXJyZW50VmFsdWUgIT09IHVuZGVmaW5lZDtcbiAgICBpZiAoKGlzRmlyc3RDaGFuZ2UobnpTb3J0T3JkZXIpIHx8IGlzRmlyc3RDaGFuZ2UobnpTb3J0Rm4pKSAmJiAhdGhpcy5pc056U2hvd1NvcnRDaGFuZ2VkKSB7XG4gICAgICB0aGlzLm56U2hvd1NvcnQgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoaXNGaXJzdENoYW5nZShuekZpbHRlcnMpICYmICF0aGlzLmlzTnpTaG93RmlsdGVyQ2hhbmdlZCkge1xuICAgICAgdGhpcy5uelNob3dGaWx0ZXIgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoKG56RmlsdGVycyB8fCBuekZpbHRlck11bHRpcGxlKSAmJiB0aGlzLm56U2hvd0ZpbHRlcikge1xuICAgICAgY29uc3QgbGlzdE9mVmFsdWUgPSB0aGlzLm56RmlsdGVycy5maWx0ZXIoaXRlbSA9PiBpdGVtLmJ5RGVmYXVsdCkubWFwKGl0ZW0gPT4gaXRlbS52YWx1ZSk7XG4gICAgICB0aGlzLm56RmlsdGVyVmFsdWUgPSB0aGlzLm56RmlsdGVyTXVsdGlwbGUgPyBsaXN0T2ZWYWx1ZSA6IGxpc3RPZlZhbHVlWzBdIHx8IG51bGw7XG4gICAgfVxuICAgIGlmIChuelNvcnRGbiB8fCBuekZpbHRlckZuIHx8IG56U29ydFByaW9yaXR5IHx8IG56RmlsdGVycykge1xuICAgICAgdGhpcy51cGRhdGVDYWxjT3BlcmF0b3IoKTtcbiAgICB9XG4gIH1cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=