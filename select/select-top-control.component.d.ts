import { ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzSelectSearchComponent } from './select-search.component';
import { NzSelectItemInterface, NzSelectModeType, NzSelectTopControlItemType } from './select.types';
import * as i0 from "@angular/core";
export declare class NzSelectTopControlComponent implements OnChanges, OnInit, OnDestroy {
    private elementRef;
    private ngZone;
    noAnimation: NzNoAnimationDirective | null;
    nzId: string | null;
    showSearch: boolean;
    placeHolder: string | TemplateRef<NzSafeAny> | null;
    open: boolean;
    maxTagCount: number;
    autofocus: boolean;
    disabled: boolean;
    mode: NzSelectModeType;
    customTemplate: TemplateRef<{
        $implicit: NzSelectItemInterface;
    }> | null;
    maxTagPlaceholder: TemplateRef<{
        $implicit: NzSafeAny[];
    }> | null;
    removeIcon: TemplateRef<NzSafeAny> | null;
    listOfTopItem: NzSelectItemInterface[];
    tokenSeparators: string[];
    readonly tokenize: EventEmitter<string[]>;
    readonly inputValueChange: EventEmitter<string>;
    readonly deleteItem: EventEmitter<NzSelectItemInterface>;
    nzSelectSearchComponent: NzSelectSearchComponent;
    listOfSlicedItem: NzSelectTopControlItemType[];
    isShowPlaceholder: boolean;
    isShowSingleLabel: boolean;
    isComposing: boolean;
    inputValue: string | null;
    private destroy$;
    updateTemplateVariable(): void;
    isComposingChange(isComposing: boolean): void;
    onInputValueChange(value: string): void;
    tokenSeparate(inputValue: string, tokenSeparators: string[]): void;
    clearInputValue(): void;
    focus(): void;
    blur(): void;
    trackValue(_index: number, option: NzSelectTopControlItemType): NzSafeAny;
    onDeleteItem(item: NzSelectItemInterface): void;
    constructor(elementRef: ElementRef<HTMLElement>, ngZone: NgZone, noAnimation: NzNoAnimationDirective | null);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzSelectTopControlComponent, [null, null, { optional: true; host: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzSelectTopControlComponent, "nz-select-top-control", ["nzSelectTopControl"], { "nzId": "nzId"; "showSearch": "showSearch"; "placeHolder": "placeHolder"; "open": "open"; "maxTagCount": "maxTagCount"; "autofocus": "autofocus"; "disabled": "disabled"; "mode": "mode"; "customTemplate": "customTemplate"; "maxTagPlaceholder": "maxTagPlaceholder"; "removeIcon": "removeIcon"; "listOfTopItem": "listOfTopItem"; "tokenSeparators": "tokenSeparators"; }, { "tokenize": "tokenize"; "inputValueChange": "inputValueChange"; "deleteItem": "deleteItem"; }, never, never>;
}
