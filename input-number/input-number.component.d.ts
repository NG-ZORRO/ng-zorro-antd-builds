/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { BooleanInput, NzSizeLDSType, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class NzInputNumberComponent implements ControlValueAccessor, AfterViewInit, OnChanges, OnInit, OnDestroy {
    private ngZone;
    private elementRef;
    private cdr;
    private focusMonitor;
    private directionality;
    static ngAcceptInputType_nzDisabled: BooleanInput;
    static ngAcceptInputType_nzAutoFocus: BooleanInput;
    private autoStepTimer?;
    private parsedValue?;
    private value?;
    private destroy$;
    displayValue?: string | number;
    isFocused: boolean;
    disabledUp: boolean;
    disabledDown: boolean;
    dir: Direction;
    onChange: OnChangeType;
    onTouched: OnTouchedType;
    readonly nzBlur: EventEmitter<any>;
    readonly nzFocus: EventEmitter<any>;
    inputElement: ElementRef<HTMLInputElement>;
    nzSize: NzSizeLDSType;
    nzMin: number;
    nzMax: number;
    nzParser: (value: string) => string;
    nzPrecision?: number;
    nzPrecisionMode: 'cut' | 'toFixed' | ((value: number | string, precision?: number) => number);
    nzPlaceHolder: string;
    nzStep: number;
    nzInputMode: string;
    nzId: string | null;
    nzDisabled: boolean;
    nzAutoFocus: boolean;
    nzFormatter: (value: number) => string | number;
    onModelChange(value: string): void;
    getCurrentValidValue(value: string | number): number;
    isNotCompleteNumber(num: string | number): boolean;
    getValidValue(value?: string | number): string | number | undefined;
    toNumber(num: string | number): number;
    getRatio(e: KeyboardEvent): number;
    down(e: MouseEvent | KeyboardEvent, ratio?: number): void;
    up(e: MouseEvent | KeyboardEvent, ratio?: number): void;
    getPrecision(value: number): number;
    getMaxPrecision(currentValue: string | number, ratio: number): number;
    getPrecisionFactor(currentValue: string | number, ratio: number): number;
    upStep(val: string | number, rat: number): number;
    downStep(val: string | number, rat: number): number;
    step<T extends keyof NzInputNumberComponent>(type: T, e: MouseEvent | KeyboardEvent, ratio?: number): void;
    stop(): void;
    setValue(value: number): void;
    updateDisplayValue(value: number): void;
    writeValue(value: number): void;
    registerOnChange(fn: OnChangeType): void;
    registerOnTouched(fn: OnTouchedType): void;
    setDisabledState(disabled: boolean): void;
    focus(): void;
    blur(): void;
    constructor(ngZone: NgZone, elementRef: ElementRef<HTMLElement>, cdr: ChangeDetectorRef, focusMonitor: FocusMonitor, directionality: Directionality);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzInputNumberComponent, [null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzInputNumberComponent, "nz-input-number", ["nzInputNumber"], { "nzSize": "nzSize"; "nzMin": "nzMin"; "nzMax": "nzMax"; "nzParser": "nzParser"; "nzPrecision": "nzPrecision"; "nzPrecisionMode": "nzPrecisionMode"; "nzPlaceHolder": "nzPlaceHolder"; "nzStep": "nzStep"; "nzInputMode": "nzInputMode"; "nzId": "nzId"; "nzDisabled": "nzDisabled"; "nzAutoFocus": "nzAutoFocus"; "nzFormatter": "nzFormatter"; }, { "nzBlur": "nzBlur"; "nzFocus": "nzFocus"; }, never, never>;
}
