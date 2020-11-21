/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedOverlayPositionChange, ConnectionPositionPair, HorizontalConnectionPos, VerticalConnectionPos } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { NzResizeObserver } from 'ng-zorro-antd/core/resize-observers';
import { CandyDate, CompatibleValue } from 'ng-zorro-antd/core/time';
import { NgStyleInterface, NzSafeAny } from 'ng-zorro-antd/core/types';
import { DateHelperService } from 'ng-zorro-antd/i18n';
import { Subject } from 'rxjs';
import { DatePickerService } from './date-picker.service';
import { DateRangePopupComponent } from './date-range-popup.component';
import { RangePartType } from './standard-types';
export declare class NzPickerComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    private elementRef;
    private dateHelper;
    private cdr;
    private platform;
    private nzResizeObserver;
    datePickerService: DatePickerService;
    noAnimation: boolean;
    isRange: boolean;
    open: boolean | undefined;
    disabled: boolean;
    inputReadOnly: boolean;
    placeholder: string | string[];
    allowClear?: boolean;
    autoFocus?: boolean;
    format: string;
    separator?: string;
    popupStyle: NgStyleInterface | null;
    dropdownClassName?: string;
    suffixIcon?: string | TemplateRef<NzSafeAny>;
    readonly focusChange: EventEmitter<boolean>;
    readonly valueChange: EventEmitter<CandyDate | CandyDate[] | null>;
    readonly openChange: EventEmitter<boolean>;
    cdkConnectedOverlay?: CdkConnectedOverlay;
    separatorElement?: ElementRef;
    pickerInput?: ElementRef<HTMLInputElement>;
    rangePickerInputs?: QueryList<ElementRef<HTMLInputElement>>;
    panel: DateRangePopupComponent;
    origin: CdkOverlayOrigin;
    document: Document;
    inputSize: number;
    inputWidth?: number;
    destroy$: Subject<unknown>;
    prefixCls: string;
    inputValue: NzSafeAny;
    overlayOpen: boolean;
    overlayPositions: ConnectionPositionPair[];
    currentPositionX: HorizontalConnectionPos;
    currentPositionY: VerticalConnectionPos;
    get realOpenState(): boolean;
    constructor(elementRef: ElementRef, dateHelper: DateHelperService, cdr: ChangeDetectorRef, platform: Platform, nzResizeObserver: NzResizeObserver, datePickerService: DatePickerService, doc: NzSafeAny);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    updateInputWidthAndArrowLeft(): void;
    getInput(partType?: RangePartType): HTMLInputElement | undefined;
    focus(): void;
    onFocus(event: FocusEvent, partType?: RangePartType): void;
    onBlur(event: FocusEvent): void;
    showOverlay(): void;
    hideOverlay(): void;
    showClear(): boolean;
    onClickInputBox(event: MouseEvent): void;
    onClickOutside(event: MouseEvent): void;
    onOverlayDetach(): void;
    onOverlayKeydown(event: KeyboardEvent): void;
    onPositionChange(position: ConnectedOverlayPositionChange): void;
    onClickClear(event: MouseEvent): void;
    updateInputValue(): void;
    formatValue(value: CandyDate): string;
    onInputChange(value: string, isEnter?: boolean): void;
    onKeyupEnter(event: Event): void;
    private checkValidDate;
    getPlaceholder(partType?: RangePartType): string;
    isEmptyValue(value: CompatibleValue): boolean;
    isOpenHandledByUser(): boolean;
}
