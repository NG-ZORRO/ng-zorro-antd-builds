/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Injector } from '@angular/core';
import { WeekDayIndex } from 'ng-zorro-antd/core/time';
import { NzDateConfig } from './date-config';
import { NzI18nService } from './nz-i18n.service';
export declare function DATE_HELPER_SERVICE_FACTORY(injector: Injector, config: NzDateConfig): DateHelperService;
/**
 * Abstract DateHelperService(Token via Class)
 * Compatibility: compact for original usage by default which using DatePipe
 */
export declare abstract class DateHelperService {
    protected i18n: NzI18nService;
    protected config: NzDateConfig;
    constructor(i18n: NzI18nService, config: NzDateConfig);
    abstract getISOWeek(date: Date): number;
    abstract getFirstDayOfWeek(): WeekDayIndex;
    abstract format(date: Date | null, formatStr: string): string;
    abstract parseDate(text: string, formatStr?: string): Date;
    abstract parseTime(text: string, formatStr?: string): Date | undefined;
}
/**
 * DateHelper that handles date formats with date-fns
 */
export declare class DateHelperByDateFns extends DateHelperService {
    getISOWeek(date: Date): number;
    getFirstDayOfWeek(): WeekDayIndex;
    /**
     * Format a date
     * @see https://date-fns.org/docs/format#description
     * @param date Date
     * @param formatStr format string
     */
    format(date: Date, formatStr: string): string;
    parseDate(text: string, formatStr: string): Date;
    parseTime(text: string, formatStr: string): Date | undefined;
}
/**
 * DateHelper that handles date formats with angular's date-pipe
 *
 * @see https://github.com/NG-ZORRO/ng-zorro-antd/issues/2406 - DatePipe may cause non-standard week bug, see:
 *
 */
export declare class DateHelperByDatePipe extends DateHelperService {
    getISOWeek(date: Date): number;
    getFirstDayOfWeek(): WeekDayIndex;
    format(date: Date | null, formatStr: string): string;
    parseDate(text: string): Date;
    parseTime(text: string, formatStr: string): Date;
}
