/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, EventEmitter, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzSelectItemInterface, NzSelectModeType } from './select.types';
import * as i0 from "@angular/core";
export declare class NzOptionContainerComponent implements OnChanges, AfterViewInit {
    notFoundContent: string | TemplateRef<NzSafeAny> | undefined;
    menuItemSelectedIcon: TemplateRef<NzSafeAny> | null;
    dropdownRender: TemplateRef<NzSafeAny> | null;
    activatedValue: NzSafeAny | null;
    listOfSelectedValue: NzSafeAny[];
    compareWith: (o1: NzSafeAny, o2: NzSafeAny) => boolean;
    mode: NzSelectModeType;
    matchWidth: boolean;
    itemSize: number;
    maxItemLength: number;
    listOfContainerItem: NzSelectItemInterface[];
    readonly itemClick: EventEmitter<any>;
    readonly scrollToBottom: EventEmitter<void>;
    cdkVirtualScrollViewport: CdkVirtualScrollViewport;
    private scrolledIndex;
    constructor();
    onItemClick(value: NzSafeAny): void;
    onItemHover(value: NzSafeAny): void;
    trackValue(_index: number, option: NzSelectItemInterface): NzSafeAny;
    onScrolledIndexChange(index: number): void;
    scrollToActivatedValue(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzOptionContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzOptionContainerComponent, "nz-option-container", ["nzOptionContainer"], { "notFoundContent": "notFoundContent"; "menuItemSelectedIcon": "menuItemSelectedIcon"; "dropdownRender": "dropdownRender"; "activatedValue": "activatedValue"; "listOfSelectedValue": "listOfSelectedValue"; "compareWith": "compareWith"; "mode": "mode"; "matchWidth": "matchWidth"; "itemSize": "itemSize"; "maxItemLength": "maxItemLength"; "listOfContainerItem": "listOfContainerItem"; }, { "itemClick": "itemClick"; "scrollToBottom": "scrollToBottom"; }, never, never>;
}
