/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectorRef, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { BooleanInput, NzSizeDSType, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
export declare class NzSwitchComponent implements ControlValueAccessor, AfterViewInit, OnDestroy, OnInit {
    nzConfigService: NzConfigService;
    private cdr;
    private focusMonitor;
    private directionality;
    readonly _nzModuleName: NzConfigKey;
    static ngAcceptInputType_nzLoading: BooleanInput;
    static ngAcceptInputType_nzDisabled: BooleanInput;
    static ngAcceptInputType_nzControl: BooleanInput;
    isChecked: boolean;
    onChange: OnChangeType;
    onTouched: OnTouchedType;
    private switchElement?;
    nzLoading: boolean;
    nzDisabled: boolean;
    nzControl: boolean;
    nzCheckedChildren: string | TemplateRef<void> | null;
    nzUnCheckedChildren: string | TemplateRef<void> | null;
    nzSize: NzSizeDSType;
    dir: Direction;
    private destroy$;
    onHostClick(e: MouseEvent): void;
    updateValue(value: boolean): void;
    onKeyDown(e: KeyboardEvent): void;
    focus(): void;
    blur(): void;
    constructor(nzConfigService: NzConfigService, cdr: ChangeDetectorRef, focusMonitor: FocusMonitor, directionality: Directionality);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    writeValue(value: boolean): void;
    registerOnChange(fn: OnChangeType): void;
    registerOnTouched(fn: OnTouchedType): void;
    setDisabledState(disabled: boolean): void;
}
