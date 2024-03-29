/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { CdkConnectedOverlay, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { BooleanInput, NzSafeAny, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { NzOptionGroupComponent } from './option-group.component';
import { NzOptionComponent } from './option.component';
import { NzSelectTopControlComponent } from './select-top-control.component';
import { NzFilterOptionType, NzSelectItemInterface, NzSelectModeType, NzSelectOptionInterface } from './select.types';
import * as i0 from "@angular/core";
export declare type NzSelectSizeType = 'large' | 'default' | 'small';
export declare class NzSelectComponent implements ControlValueAccessor, OnInit, AfterContentInit, OnChanges, OnDestroy {
    private destroy$;
    nzConfigService: NzConfigService;
    private cdr;
    private elementRef;
    private platform;
    private focusMonitor;
    private directionality;
    noAnimation?: NzNoAnimationDirective | undefined;
    readonly _nzModuleName: NzConfigKey;
    static ngAcceptInputType_nzAllowClear: BooleanInput;
    static ngAcceptInputType_nzBorderless: BooleanInput;
    static ngAcceptInputType_nzShowSearch: BooleanInput;
    static ngAcceptInputType_nzLoading: BooleanInput;
    static ngAcceptInputType_nzAutoFocus: BooleanInput;
    static ngAcceptInputType_nzAutoClearSearchValue: BooleanInput;
    static ngAcceptInputType_nzServerSearch: BooleanInput;
    static ngAcceptInputType_nzDisabled: BooleanInput;
    static ngAcceptInputType_nzOpen: BooleanInput;
    nzId: string | null;
    nzSize: NzSelectSizeType;
    nzOptionHeightPx: number;
    nzOptionOverflowSize: number;
    nzDropdownClassName: string | null;
    nzDropdownMatchSelectWidth: boolean;
    nzDropdownStyle: {
        [key: string]: string;
    } | null;
    nzNotFoundContent: string | TemplateRef<NzSafeAny> | undefined;
    nzPlaceHolder: string | TemplateRef<NzSafeAny> | null;
    nzMaxTagCount: number;
    nzDropdownRender: TemplateRef<NzSafeAny> | null;
    nzCustomTemplate: TemplateRef<{
        $implicit: NzSelectItemInterface;
    }> | null;
    nzSuffixIcon: TemplateRef<NzSafeAny> | string | null;
    nzClearIcon: TemplateRef<NzSafeAny> | null;
    nzRemoveIcon: TemplateRef<NzSafeAny> | null;
    nzMenuItemSelectedIcon: TemplateRef<NzSafeAny> | null;
    nzTokenSeparators: string[];
    nzMaxTagPlaceholder: TemplateRef<{
        $implicit: NzSafeAny[];
    }> | null;
    nzMaxMultipleCount: number;
    nzMode: NzSelectModeType;
    nzFilterOption: NzFilterOptionType;
    compareWith: (o1: NzSafeAny, o2: NzSafeAny) => boolean;
    nzAllowClear: boolean;
    nzBorderless: boolean;
    nzShowSearch: boolean;
    nzLoading: boolean;
    nzAutoFocus: boolean;
    nzAutoClearSearchValue: boolean;
    nzServerSearch: boolean;
    nzDisabled: boolean;
    nzOpen: boolean;
    nzBackdrop: boolean;
    nzOptions: NzSelectOptionInterface[];
    set nzShowArrow(value: boolean);
    get nzShowArrow(): boolean;
    readonly nzOnSearch: EventEmitter<string>;
    readonly nzScrollToBottom: EventEmitter<void>;
    readonly nzOpenChange: EventEmitter<boolean>;
    readonly nzBlur: EventEmitter<void>;
    readonly nzFocus: EventEmitter<void>;
    originElement: ElementRef;
    cdkConnectedOverlay: CdkConnectedOverlay;
    nzSelectTopControlComponent: NzSelectTopControlComponent;
    listOfNzOptionComponent: QueryList<NzOptionComponent>;
    listOfNzOptionGroupComponent: QueryList<NzOptionGroupComponent>;
    nzOptionGroupComponentElement: ElementRef;
    nzSelectTopControlComponentElement: ElementRef;
    private listOfValue$;
    private listOfTemplateItem$;
    private listOfTagAndTemplateItem;
    private searchValue;
    private isReactiveDriven;
    private value;
    private _nzShowArrow;
    private requestId;
    onChange: OnChangeType;
    onTouched: OnTouchedType;
    dropDownPosition: 'top' | 'center' | 'bottom';
    triggerWidth: number | null;
    listOfContainerItem: NzSelectItemInterface[];
    listOfTopItem: NzSelectItemInterface[];
    activatedValue: NzSafeAny | null;
    listOfValue: NzSafeAny[];
    focused: boolean;
    dir: Direction;
    generateTagItem(value: string): NzSelectItemInterface;
    onItemClick(value: NzSafeAny): void;
    onItemDelete(item: NzSelectItemInterface): void;
    onHostClick(): void;
    updateListOfContainerItem(): void;
    clearInput(): void;
    updateListOfValue(listOfValue: NzSafeAny[]): void;
    onTokenSeparate(listOfLabel: string[]): void;
    onOverlayKeyDown(e: KeyboardEvent): void;
    onKeyDown(e: KeyboardEvent): void;
    setOpenState(value: boolean): void;
    onOpenChange(): void;
    onInputValueChange(value: string): void;
    onClearSelection(): void;
    onClickOutside(event: MouseEvent): void;
    focus(): void;
    blur(): void;
    onPositionChange(position: ConnectedOverlayPositionChange): void;
    updateCdkConnectedOverlayStatus(): void;
    updateCdkConnectedOverlayPositions(): void;
    constructor(destroy$: NzDestroyService, nzConfigService: NzConfigService, cdr: ChangeDetectorRef, elementRef: ElementRef, platform: Platform, focusMonitor: FocusMonitor, directionality: Directionality, noAnimation?: NzNoAnimationDirective | undefined);
    writeValue(modelValue: NzSafeAny | NzSafeAny[]): void;
    registerOnChange(fn: OnChangeType): void;
    registerOnTouched(fn: OnTouchedType): void;
    setDisabledState(disabled: boolean): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzSelectComponent, [null, null, null, null, null, null, { optional: true; }, { optional: true; host: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzSelectComponent, "nz-select", ["nzSelect"], { "nzId": "nzId"; "nzSize": "nzSize"; "nzOptionHeightPx": "nzOptionHeightPx"; "nzOptionOverflowSize": "nzOptionOverflowSize"; "nzDropdownClassName": "nzDropdownClassName"; "nzDropdownMatchSelectWidth": "nzDropdownMatchSelectWidth"; "nzDropdownStyle": "nzDropdownStyle"; "nzNotFoundContent": "nzNotFoundContent"; "nzPlaceHolder": "nzPlaceHolder"; "nzMaxTagCount": "nzMaxTagCount"; "nzDropdownRender": "nzDropdownRender"; "nzCustomTemplate": "nzCustomTemplate"; "nzSuffixIcon": "nzSuffixIcon"; "nzClearIcon": "nzClearIcon"; "nzRemoveIcon": "nzRemoveIcon"; "nzMenuItemSelectedIcon": "nzMenuItemSelectedIcon"; "nzTokenSeparators": "nzTokenSeparators"; "nzMaxTagPlaceholder": "nzMaxTagPlaceholder"; "nzMaxMultipleCount": "nzMaxMultipleCount"; "nzMode": "nzMode"; "nzFilterOption": "nzFilterOption"; "compareWith": "compareWith"; "nzAllowClear": "nzAllowClear"; "nzBorderless": "nzBorderless"; "nzShowSearch": "nzShowSearch"; "nzLoading": "nzLoading"; "nzAutoFocus": "nzAutoFocus"; "nzAutoClearSearchValue": "nzAutoClearSearchValue"; "nzServerSearch": "nzServerSearch"; "nzDisabled": "nzDisabled"; "nzOpen": "nzOpen"; "nzBackdrop": "nzBackdrop"; "nzOptions": "nzOptions"; "nzShowArrow": "nzShowArrow"; }, { "nzOnSearch": "nzOnSearch"; "nzScrollToBottom": "nzScrollToBottom"; "nzOpenChange": "nzOpenChange"; "nzBlur": "nzBlur"; "nzFocus": "nzFocus"; }, ["listOfNzOptionComponent", "listOfNzOptionGroupComponent"], never>;
}
