/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { AfterContentInit, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { BooleanInput, NzDirectionVHType, NzSafeAny, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { Observable } from 'rxjs';
import { NzListGrid } from './interface';
import { NzListFooterComponent, NzListLoadMoreDirective, NzListPaginationComponent } from './list-cell';
export declare class NzListComponent implements AfterContentInit, OnChanges, OnDestroy, OnInit {
    private elementRef;
    private directionality;
    static ngAcceptInputType_nzBordered: BooleanInput;
    static ngAcceptInputType_nzLoading: BooleanInput;
    static ngAcceptInputType_nzSplit: BooleanInput;
    static ngAcceptInputType_nzGrid: '' | NzListGrid | null | undefined;
    nzDataSource?: NzSafeAny[];
    nzBordered: boolean;
    nzGrid?: NzListGrid | '';
    nzHeader?: string | TemplateRef<void>;
    nzFooter?: string | TemplateRef<void>;
    nzItemLayout: NzDirectionVHType;
    nzRenderItem: TemplateRef<void> | null;
    nzLoading: boolean;
    nzLoadMore: TemplateRef<void> | null;
    nzPagination?: TemplateRef<void>;
    nzSize: NzSizeLDSType;
    nzSplit: boolean;
    nzNoResult?: string | TemplateRef<void>;
    nzListFooterComponent: NzListFooterComponent;
    nzListPaginationComponent: NzListPaginationComponent;
    nzListLoadMoreDirective: NzListLoadMoreDirective;
    hasSomethingAfterLastItem: boolean;
    dir: Direction;
    private itemLayoutNotifySource;
    private destroy$;
    get itemLayoutNotify$(): Observable<NzDirectionVHType>;
    constructor(elementRef: ElementRef, directionality: Directionality);
    ngOnInit(): void;
    getSomethingAfterLastItem(): boolean;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
}
