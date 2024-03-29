/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { NzBreakpointService } from 'ng-zorro-antd/core/services';
import { BooleanInput, NumberInput } from 'ng-zorro-antd/core/types';
import { NzI18nService, NzPaginationI18nInterface } from 'ng-zorro-antd/i18n';
import { PaginationItemRenderContext } from './pagination.types';
import * as i0 from "@angular/core";
export declare class NzPaginationComponent implements OnInit, OnDestroy, OnChanges {
    private i18n;
    private cdr;
    private breakpointService;
    protected nzConfigService: NzConfigService;
    private directionality;
    readonly _nzModuleName: NzConfigKey;
    static ngAcceptInputType_nzDisabled: BooleanInput;
    static ngAcceptInputType_nzShowSizeChanger: BooleanInput;
    static ngAcceptInputType_nzHideOnSinglePage: BooleanInput;
    static ngAcceptInputType_nzShowQuickJumper: BooleanInput;
    static ngAcceptInputType_nzSimple: BooleanInput;
    static ngAcceptInputType_nzResponsive: BooleanInput;
    static ngAcceptInputType_nzTotal: NumberInput;
    static ngAcceptInputType_nzPageIndex: NumberInput;
    static ngAcceptInputType_nzPageSize: NumberInput;
    readonly nzPageSizeChange: EventEmitter<number>;
    readonly nzPageIndexChange: EventEmitter<number>;
    nzShowTotal: TemplateRef<{
        $implicit: number;
        range: [number, number];
    }> | null;
    nzItemRender: TemplateRef<PaginationItemRenderContext> | null;
    nzSize: 'default' | 'small';
    nzPageSizeOptions: number[];
    nzShowSizeChanger: boolean;
    nzShowQuickJumper: boolean;
    nzSimple: boolean;
    nzDisabled: boolean;
    nzResponsive: boolean;
    nzHideOnSinglePage: boolean;
    nzTotal: number;
    nzPageIndex: number;
    nzPageSize: number;
    showPagination: boolean;
    locale: NzPaginationI18nInterface;
    size: 'default' | 'small';
    dir: Direction;
    private destroy$;
    private total$;
    validatePageIndex(value: number, lastIndex: number): number;
    onPageIndexChange(index: number): void;
    onPageSizeChange(size: number): void;
    onTotalChange(total: number): void;
    getLastIndex(total: number, pageSize: number): number;
    constructor(i18n: NzI18nService, cdr: ChangeDetectorRef, breakpointService: NzBreakpointService, nzConfigService: NzConfigService, directionality: Directionality);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzPaginationComponent, [null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzPaginationComponent, "nz-pagination", ["nzPagination"], { "nzShowTotal": "nzShowTotal"; "nzItemRender": "nzItemRender"; "nzSize": "nzSize"; "nzPageSizeOptions": "nzPageSizeOptions"; "nzShowSizeChanger": "nzShowSizeChanger"; "nzShowQuickJumper": "nzShowQuickJumper"; "nzSimple": "nzSimple"; "nzDisabled": "nzDisabled"; "nzResponsive": "nzResponsive"; "nzHideOnSinglePage": "nzHideOnSinglePage"; "nzTotal": "nzTotal"; "nzPageIndex": "nzPageIndex"; "nzPageSize": "nzPageSize"; }, { "nzPageSizeChange": "nzPageSizeChange"; "nzPageIndexChange": "nzPageIndexChange"; }, never, never>;
}
