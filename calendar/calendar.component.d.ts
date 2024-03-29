/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare type NzCalendarMode = 'month' | 'year';
declare type NzCalendarDateTemplate = TemplateRef<{
    $implicit: Date;
}>;
export declare class NzCalendarComponent implements ControlValueAccessor, OnChanges, OnInit, OnDestroy {
    private cdr;
    private directionality;
    static ngAcceptInputType_nzFullscreen: BooleanInput;
    activeDate: CandyDate;
    prefixCls: string;
    private destroy$;
    dir: Direction;
    private onChangeFn;
    private onTouchFn;
    nzMode: NzCalendarMode;
    nzValue?: Date;
    nzDisabledDate?: (date: Date) => boolean;
    readonly nzModeChange: EventEmitter<NzCalendarMode>;
    readonly nzPanelChange: EventEmitter<{
        date: Date;
        mode: NzCalendarMode;
    }>;
    readonly nzSelectChange: EventEmitter<Date>;
    readonly nzValueChange: EventEmitter<Date>;
    /**
     * Cannot use @Input and @ContentChild on one variable
     * because { static: false } will make @Input property get delayed
     **/
    nzDateCell?: NzCalendarDateTemplate;
    nzDateCellChild?: NzCalendarDateTemplate;
    get dateCell(): NzCalendarDateTemplate;
    nzDateFullCell?: NzCalendarDateTemplate;
    nzDateFullCellChild?: NzCalendarDateTemplate;
    get dateFullCell(): NzCalendarDateTemplate;
    nzMonthCell?: NzCalendarDateTemplate;
    nzMonthCellChild?: NzCalendarDateTemplate;
    get monthCell(): NzCalendarDateTemplate;
    nzMonthFullCell?: NzCalendarDateTemplate;
    nzMonthFullCellChild?: NzCalendarDateTemplate;
    get monthFullCell(): NzCalendarDateTemplate;
    nzFullscreen: boolean;
    constructor(cdr: ChangeDetectorRef, directionality: Directionality);
    ngOnInit(): void;
    onModeChange(mode: NzCalendarMode): void;
    onYearSelect(year: number): void;
    onMonthSelect(month: number): void;
    onDateSelect(date: CandyDate): void;
    writeValue(value: Date | null): void;
    registerOnChange(fn: (date: Date) => void): void;
    registerOnTouched(fn: () => void): void;
    private updateDate;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzCalendarComponent, [null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzCalendarComponent, "nz-calendar", ["nzCalendar"], { "nzMode": "nzMode"; "nzValue": "nzValue"; "nzDisabledDate": "nzDisabledDate"; "nzDateCell": "nzDateCell"; "nzDateFullCell": "nzDateFullCell"; "nzMonthCell": "nzMonthCell"; "nzMonthFullCell": "nzMonthFullCell"; "nzFullscreen": "nzFullscreen"; }, { "nzModeChange": "nzModeChange"; "nzPanelChange": "nzPanelChange"; "nzSelectChange": "nzSelectChange"; "nzValueChange": "nzValueChange"; }, ["nzDateCellChild", "nzDateFullCellChild", "nzMonthCellChild", "nzMonthFullCellChild"], never>;
}
export {};
