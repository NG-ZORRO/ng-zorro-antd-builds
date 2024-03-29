/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, DebugElement, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { DateHelperService } from 'ng-zorro-antd/i18n';
import { TimeHolder } from './time-holder';
import * as i0 from "@angular/core";
export declare type NzTimePickerUnit = 'hour' | 'minute' | 'second' | '12-hour';
export declare class NzTimePickerPanelComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
    private ngZone;
    private cdr;
    dateHelper: DateHelperService;
    private elementRef;
    static ngAcceptInputType_nzUse12Hours: BooleanInput;
    private _nzHourStep;
    private _nzMinuteStep;
    private _nzSecondStep;
    private unsubscribe$;
    private onChange?;
    private onTouch?;
    private _format;
    private _disabledHours?;
    private _disabledMinutes?;
    private _disabledSeconds?;
    private _allowEmpty;
    time: TimeHolder;
    hourEnabled: boolean;
    minuteEnabled: boolean;
    secondEnabled: boolean;
    firstScrolled: boolean;
    enabledColumns: number;
    hourRange: ReadonlyArray<{
        index: number;
        disabled: boolean;
    }>;
    minuteRange: ReadonlyArray<{
        index: number;
        disabled: boolean;
    }>;
    secondRange: ReadonlyArray<{
        index: number;
        disabled: boolean;
    }>;
    use12HoursRange: ReadonlyArray<{
        index: number;
        value: string;
    }>;
    hourListElement?: DebugElement;
    minuteListElement?: DebugElement;
    secondListElement?: DebugElement;
    use12HoursListElement?: DebugElement;
    nzInDatePicker: boolean;
    nzAddOn?: TemplateRef<void>;
    nzHideDisabledOptions: boolean;
    nzClearText?: string;
    nzNowText?: string;
    nzOkText?: string;
    nzPlaceHolder?: string | null;
    nzUse12Hours: boolean;
    nzDefaultOpenValue?: Date;
    readonly closePanel: EventEmitter<void>;
    set nzAllowEmpty(value: boolean);
    get nzAllowEmpty(): boolean;
    set nzDisabledHours(value: undefined | (() => number[]));
    get nzDisabledHours(): undefined | (() => number[]);
    set nzDisabledMinutes(value: undefined | ((hour: number) => number[]));
    get nzDisabledMinutes(): undefined | ((hour: number) => number[]);
    set nzDisabledSeconds(value: undefined | ((hour: number, minute: number) => number[]));
    get nzDisabledSeconds(): undefined | ((hour: number, minute: number) => number[]);
    set format(value: string);
    get format(): string;
    set nzHourStep(value: number);
    get nzHourStep(): number;
    set nzMinuteStep(value: number);
    get nzMinuteStep(): number;
    set nzSecondStep(value: number);
    get nzSecondStep(): number;
    trackByFn(index: number): number;
    buildHours(): void;
    buildMinutes(): void;
    buildSeconds(): void;
    build12Hours(): void;
    buildTimes(): void;
    scrollToTime(delay?: number): void;
    selectHour(hour: {
        index: number;
        disabled: boolean;
    }): void;
    selectMinute(minute: {
        index: number;
        disabled: boolean;
    }): void;
    selectSecond(second: {
        index: number;
        disabled: boolean;
    }): void;
    select12Hours(value: {
        index: number;
        value: string;
    }): void;
    scrollToSelected(instance: HTMLElement, index: number, duration: number | undefined, unit: NzTimePickerUnit): void;
    translateIndex(index: number, unit: NzTimePickerUnit): number;
    scrollTo(element: HTMLElement, to: number, duration: number): void;
    calcIndex(array: number[] | undefined, index: number): number;
    protected changed(): void;
    protected touched(): void;
    timeDisabled(value: Date): boolean;
    onClickNow(): void;
    onClickOk(): void;
    isSelectedHour(hour: {
        index: number;
        disabled: boolean;
    }): boolean;
    isSelectedMinute(minute: {
        index: number;
        disabled: boolean;
    }): boolean;
    isSelectedSecond(second: {
        index: number;
        disabled: boolean;
    }): boolean;
    isSelected12Hours(value: {
        index: number;
        value: string;
    }): boolean;
    constructor(ngZone: NgZone, cdr: ChangeDetectorRef, dateHelper: DateHelperService, elementRef: ElementRef<HTMLElement>);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    writeValue(value: Date): void;
    registerOnChange(fn: (value: Date) => void): void;
    registerOnTouched(fn: () => void): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTimePickerPanelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzTimePickerPanelComponent, "nz-time-picker-panel", ["nzTimePickerPanel"], { "nzInDatePicker": "nzInDatePicker"; "nzAddOn": "nzAddOn"; "nzHideDisabledOptions": "nzHideDisabledOptions"; "nzClearText": "nzClearText"; "nzNowText": "nzNowText"; "nzOkText": "nzOkText"; "nzPlaceHolder": "nzPlaceHolder"; "nzUse12Hours": "nzUse12Hours"; "nzDefaultOpenValue": "nzDefaultOpenValue"; "nzAllowEmpty": "nzAllowEmpty"; "nzDisabledHours": "nzDisabledHours"; "nzDisabledMinutes": "nzDisabledMinutes"; "nzDisabledSeconds": "nzDisabledSeconds"; "format": "format"; "nzHourStep": "nzHourStep"; "nzMinuteStep": "nzMinuteStep"; "nzSecondStep": "nzSecondStep"; }, { "closePanel": "closePanel"; }, never, never>;
}
