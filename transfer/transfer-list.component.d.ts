/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, QueryList, TemplateRef } from '@angular/core';
import { TransferDirection, TransferItem } from './interface';
import * as i0 from "@angular/core";
export declare class NzTransferListComponent implements AfterViewInit {
    private ngZone;
    private cdr;
    direction: TransferDirection;
    titleText: string;
    showSelectAll: boolean;
    dataSource: TransferItem[];
    itemUnit: string | undefined;
    itemsUnit: string | undefined;
    filter: string;
    disabled: boolean;
    showSearch?: boolean;
    searchPlaceholder?: string;
    notFoundContent?: string;
    filterOption?: (inputValue: string, item: TransferItem) => boolean;
    renderList: TemplateRef<void> | null;
    render: TemplateRef<void> | null;
    footer: TemplateRef<void> | null;
    readonly handleSelectAll: EventEmitter<boolean>;
    readonly handleSelect: EventEmitter<TransferItem>;
    readonly filterChange: EventEmitter<{
        direction: TransferDirection;
        value: string;
    }>;
    checkboxes: QueryList<ElementRef<HTMLLabelElement>>;
    stat: {
        checkAll: boolean;
        checkHalf: boolean;
        checkCount: number;
        shownCount: number;
    };
    get validData(): TransferItem[];
    onItemSelect: (item: TransferItem) => void;
    onItemSelectAll: (status: boolean) => void;
    private updateCheckStatus;
    handleFilter(value: string): void;
    handleClear(): void;
    private matchFilter;
    constructor(ngZone: NgZone, cdr: ChangeDetectorRef);
    markForCheck(): void;
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTransferListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzTransferListComponent, "nz-transfer-list", ["nzTransferList"], { "direction": "direction"; "titleText": "titleText"; "showSelectAll": "showSelectAll"; "dataSource": "dataSource"; "itemUnit": "itemUnit"; "itemsUnit": "itemsUnit"; "filter": "filter"; "disabled": "disabled"; "showSearch": "showSearch"; "searchPlaceholder": "searchPlaceholder"; "notFoundContent": "notFoundContent"; "filterOption": "filterOption"; "renderList": "renderList"; "render": "render"; "footer": "footer"; }, { "handleSelectAll": "handleSelectAll"; "handleSelect": "handleSelect"; "filterChange": "filterChange"; }, never, never>;
}
