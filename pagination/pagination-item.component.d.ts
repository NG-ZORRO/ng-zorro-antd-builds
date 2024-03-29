/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { EventEmitter, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { NzPaginationI18nInterface } from 'ng-zorro-antd/i18n';
import { PaginationItemRenderContext, PaginationItemType } from './pagination.types';
import * as i0 from "@angular/core";
export declare class NzPaginationItemComponent implements OnChanges {
    static ngAcceptInputType_type: PaginationItemType | string | null | undefined;
    static ngAcceptInputType_index: number | null | undefined;
    active: boolean;
    locale: NzPaginationI18nInterface;
    index: number | null;
    disabled: boolean;
    direction: string;
    type: PaginationItemType | string | null;
    itemRender: TemplateRef<PaginationItemRenderContext> | null;
    readonly diffIndex: EventEmitter<number>;
    readonly gotoIndex: EventEmitter<number>;
    title: string | null;
    clickItem(): void;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzPaginationItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzPaginationItemComponent, "li[nz-pagination-item]", never, { "active": "active"; "locale": "locale"; "index": "index"; "disabled": "disabled"; "direction": "direction"; "type": "type"; "itemRender": "itemRender"; }, { "diffIndex": "diffIndex"; "gotoIndex": "gotoIndex"; }, never, never>;
}
