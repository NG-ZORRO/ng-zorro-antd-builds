/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { NzTableFilterFn, NzTableFilterList, NzTableFilterValue, NzTableSortFn, NzTableSortOrder } from '../table.types';
import * as i0 from "@angular/core";
export declare class NzThAddOnComponent<T> implements OnChanges, OnInit, OnDestroy {
    private cdr;
    static ngAcceptInputType_nzShowSort: BooleanInput;
    static ngAcceptInputType_nzShowFilter: BooleanInput;
    static ngAcceptInputType_nzCustomFilter: BooleanInput;
    manualClickOrder$: Subject<NzThAddOnComponent<T>>;
    calcOperatorChange$: Subject<unknown>;
    nzFilterValue: NzTableFilterValue;
    sortOrder: NzTableSortOrder;
    sortDirections: NzTableSortOrder[];
    private sortOrderChange$;
    private destroy$;
    private isNzShowSortChanged;
    private isNzShowFilterChanged;
    nzColumnKey?: string;
    nzFilterMultiple: boolean;
    nzSortOrder: NzTableSortOrder;
    nzSortPriority: number | boolean;
    nzSortDirections: NzTableSortOrder[];
    nzFilters: NzTableFilterList;
    nzSortFn: NzTableSortFn<T> | boolean | null;
    nzFilterFn: NzTableFilterFn<T> | boolean | null;
    nzShowSort: boolean;
    nzShowFilter: boolean;
    nzCustomFilter: boolean;
    readonly nzCheckedChange: EventEmitter<boolean>;
    readonly nzSortOrderChange: EventEmitter<string | null>;
    readonly nzFilterChange: EventEmitter<any>;
    getNextSortDirection(sortDirections: NzTableSortOrder[], current: NzTableSortOrder): NzTableSortOrder;
    emitNextSortValue(): void;
    setSortOrder(order: NzTableSortOrder): void;
    clearSortOrder(): void;
    onFilterValueChange(value: NzTableFilterValue): void;
    updateCalcOperator(): void;
    constructor(cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzThAddOnComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzThAddOnComponent<any>, "th[nzColumnKey], th[nzSortFn], th[nzSortOrder], th[nzFilters], th[nzShowSort], th[nzShowFilter], th[nzCustomFilter]", never, { "nzColumnKey": "nzColumnKey"; "nzFilterMultiple": "nzFilterMultiple"; "nzSortOrder": "nzSortOrder"; "nzSortPriority": "nzSortPriority"; "nzSortDirections": "nzSortDirections"; "nzFilters": "nzFilters"; "nzSortFn": "nzSortFn"; "nzFilterFn": "nzFilterFn"; "nzShowSort": "nzShowSort"; "nzShowFilter": "nzShowFilter"; "nzCustomFilter": "nzCustomFilter"; }, { "nzCheckedChange": "nzCheckedChange"; "nzSortOrderChange": "nzSortOrderChange"; "nzFilterChange": "nzFilterChange"; }, never, ["[nz-th-extra]", "nz-filter-trigger", "*"]>;
}
