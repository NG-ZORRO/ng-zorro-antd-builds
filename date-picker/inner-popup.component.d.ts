/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { EventEmitter, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { FunctionProp } from 'ng-zorro-antd/core/types';
import { NzCalendarI18nInterface } from 'ng-zorro-antd/i18n';
import { DisabledDateFn, NzDateMode, RangePartType, SupportTimeOptions } from './standard-types';
import * as i0 from "@angular/core";
export declare class InnerPopupComponent implements OnChanges {
    activeDate: CandyDate;
    endPanelMode: NzDateMode;
    panelMode: NzDateMode;
    showWeek: boolean;
    locale: NzCalendarI18nInterface;
    showTimePicker: boolean;
    timeOptions: SupportTimeOptions | null;
    disabledDate?: DisabledDateFn;
    dateRender?: string | TemplateRef<Date> | FunctionProp<TemplateRef<Date> | string>;
    selectedValue: CandyDate[];
    hoverValue: CandyDate[];
    value: CandyDate;
    partType: RangePartType;
    readonly panelModeChange: EventEmitter<NzDateMode>;
    readonly headerChange: EventEmitter<CandyDate>;
    readonly selectDate: EventEmitter<CandyDate>;
    readonly selectTime: EventEmitter<CandyDate>;
    readonly cellHover: EventEmitter<CandyDate>;
    prefixCls: string;
    /**
     * Hide "next" arrow in left panel,
     * hide "prev" arrow in right panel
     *
     * @param direction
     * @param panelMode
     */
    enablePrevNext(direction: 'prev' | 'next', panelMode: NzDateMode): boolean;
    onSelectTime(date: Date): void;
    onSelectDate(date: CandyDate | Date): void;
    onChooseMonth(value: CandyDate): void;
    onChooseYear(value: CandyDate): void;
    onChooseDecade(value: CandyDate): void;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<InnerPopupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<InnerPopupComponent, "inner-popup", ["innerPopup"], { "activeDate": "activeDate"; "endPanelMode": "endPanelMode"; "panelMode": "panelMode"; "showWeek": "showWeek"; "locale": "locale"; "showTimePicker": "showTimePicker"; "timeOptions": "timeOptions"; "disabledDate": "disabledDate"; "dateRender": "dateRender"; "selectedValue": "selectedValue"; "hoverValue": "hoverValue"; "value": "value"; "partType": "partType"; }, { "panelModeChange": "panelModeChange"; "headerChange": "headerChange"; "selectDate": "selectDate"; "selectTime": "selectTime"; "cellHover": "cellHover"; }, never, never>;
}
