/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { formatDate } from '@angular/common';
import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { format as fnsFormat, getISOWeek as fnsGetISOWeek, parse as fnsParse } from 'date-fns';
import { ɵNgTimeParser } from 'ng-zorro-antd/core/time';
import { mergeDateConfig, NZ_DATE_CONFIG } from './date-config';
import { NzI18nService } from './nz-i18n.service';
import * as i0 from "@angular/core";
import * as i1 from "./nz-i18n.service";
export function DATE_HELPER_SERVICE_FACTORY(injector, config) {
    const i18n = injector.get(NzI18nService);
    return i18n.getDateLocale() ? new DateHelperByDateFns(i18n, config) : new DateHelperByDatePipe(i18n, config);
}
/**
 * Abstract DateHelperService(Token via Class)
 * Compatibility: compact for original usage by default which using DatePipe
 */
export class DateHelperService {
    constructor(i18n, config) {
        this.i18n = i18n;
        this.config = config;
        this.config = mergeDateConfig(this.config);
    }
}
DateHelperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DateHelperService, deps: [{ token: i1.NzI18nService }, { token: NZ_DATE_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
DateHelperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DateHelperService, providedIn: 'root', useFactory: DATE_HELPER_SERVICE_FACTORY, deps: [{ token: Injector }, { token: NZ_DATE_CONFIG, optional: true }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DateHelperService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: DATE_HELPER_SERVICE_FACTORY,
                    deps: [Injector, [new Optional(), NZ_DATE_CONFIG]]
                }]
        }], ctorParameters: function () { return [{ type: i1.NzI18nService }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NZ_DATE_CONFIG]
                }] }]; } });
/**
 * DateHelper that handles date formats with date-fns
 */
export class DateHelperByDateFns extends DateHelperService {
    getISOWeek(date) {
        return fnsGetISOWeek(date);
    }
    // Use date-fns's "weekStartsOn" to support different locale when "config.firstDayOfWeek" is null
    // https://github.com/date-fns/date-fns/blob/v2.0.0-alpha.27/src/locale/en-US/index.js#L23
    getFirstDayOfWeek() {
        let defaultWeekStartsOn;
        try {
            defaultWeekStartsOn = this.i18n.getDateLocale().options.weekStartsOn;
        }
        catch (e) {
            defaultWeekStartsOn = 1;
        }
        return this.config.firstDayOfWeek == null ? defaultWeekStartsOn : this.config.firstDayOfWeek;
    }
    /**
     * Format a date
     *
     * @see https://date-fns.org/docs/format#description
     * @param date Date
     * @param formatStr format string
     */
    format(date, formatStr) {
        return date ? fnsFormat(date, formatStr, { locale: this.i18n.getDateLocale() }) : '';
    }
    parseDate(text, formatStr) {
        return fnsParse(text, formatStr, new Date(), {
            locale: this.i18n.getDateLocale(),
            weekStartsOn: this.getFirstDayOfWeek()
        });
    }
    parseTime(text, formatStr) {
        return this.parseDate(text, formatStr);
    }
}
/**
 * DateHelper that handles date formats with angular's date-pipe
 *
 * @see https://github.com/NG-ZORRO/ng-zorro-antd/issues/2406 - DatePipe may cause non-standard week bug, see:
 *
 */
export class DateHelperByDatePipe extends DateHelperService {
    getISOWeek(date) {
        return +this.format(date, 'w');
    }
    getFirstDayOfWeek() {
        if (this.config.firstDayOfWeek === undefined) {
            const locale = this.i18n.getLocaleId();
            return locale && ['zh-cn', 'zh-tw'].indexOf(locale.toLowerCase()) > -1 ? 1 : 0;
        }
        return this.config.firstDayOfWeek;
    }
    format(date, formatStr) {
        return date ? formatDate(date, formatStr, this.i18n.getLocaleId()) : '';
    }
    parseDate(text) {
        return new Date(text);
    }
    parseTime(text, formatStr) {
        const parser = new ɵNgTimeParser(formatStr, this.i18n.getLocaleId());
        return parser.toDate(text);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1oZWxwZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvaTE4bi9kYXRlLWhlbHBlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZFLE9BQU8sRUFBRSxNQUFNLElBQUksU0FBUyxFQUFFLFVBQVUsSUFBSSxhQUFhLEVBQUUsS0FBSyxJQUFJLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUUvRixPQUFPLEVBQWdCLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXRFLE9BQU8sRUFBRSxlQUFlLEVBQWdCLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7OztBQUVsRCxNQUFNLFVBQVUsMkJBQTJCLENBQUMsUUFBa0IsRUFBRSxNQUFvQjtJQUNsRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3pDLE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLG1CQUFtQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDL0csQ0FBQztBQUVEOzs7R0FHRztBQU1ILE1BQU0sT0FBZ0IsaUJBQWlCO0lBQ3JDLFlBQXNCLElBQW1CLEVBQWdELE1BQW9CO1FBQXZGLFNBQUksR0FBSixJQUFJLENBQWU7UUFBZ0QsV0FBTSxHQUFOLE1BQU0sQ0FBYztRQUMzRyxJQUFJLENBQUMsTUFBTSxHQUFHLGVB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LElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDM0UsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFZO1FBQ3BCLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFZLEVBQUUsU0FBaUI7UUFDdkMsTUFBTSxNQUFNLEdBQUcsSUFBSSxhQUFhLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNyRSxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgZm9ybWF0RGF0ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdG9yLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBmb3JtYXQgYXMgZm5zRm9ybWF0LCBnZXRJU09XZWVrIGFzIGZuc0dldElTT1dlZWssIHBhcnNlIGFzIGZuc1BhcnNlIH0gZnJvbSAnZGF0ZS1mbnMnO1xuXG5pbXBvcnQgeyBXZWVrRGF5SW5kZXgsIMm1TmdUaW1lUGFyc2VyIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3RpbWUnO1xuXG5pbXBvcnQgeyBtZXJnZURhdGVDb25maWcsIE56RGF0ZUNvbmZpZywgTlpfREFURV9DT05GSUcgfSBmcm9tICcuL2RhdGUtY29uZmlnJztcbmltcG9ydCB7IE56STE4blNlcnZpY2UgfSBmcm9tICcuL256LWkxOG4uc2VydmljZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBEQVRFX0hFTFBFUl9TRVJWSUNFX0ZBQ1RPUlkoaW5qZWN0b3I6IEluamVjdG9yLCBjb25maWc6IE56RGF0ZUNvbmZpZyk6IERhdGVIZWxwZXJTZXJ2aWNlIHtcbiAgY29uc3QgaTE4biA9IGluamVjdG9yLmdldChOekkxOG5TZXJ2aWNlKTtcbiAgcmV0dXJuIGkxOG4uZ2V0RGF0ZUxvY2FsZSgpID8gbmV3IERhdGVIZWxwZXJCeURhdGVGbnMoaTE4biwgY29uZmlnKSA6IG5ldyBEYXRlSGVscGVyQnlEYXRlUGlwZShpMThuLCBjb25maWcpO1xufVxuXG4vKipcbiAqIEFic3RyYWN0IERhdGVIZWxwZXJTZXJ2aWNlKFRva2VuIHZpYSBDbGFzcylcbiAqIENvbXBhdGliaWxpdHk6IGNvbXBhY3QgZm9yIG9yaWdpbmFsIHVzYWdlIGJ5IGRlZmF1bHQgd2hpY2ggdXNpbmcgRGF0ZVBpcGVcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIHVzZUZhY3Rvcnk6IERBVEVfSEVMUEVSX1NFUlZJQ0VfRkFDVE9SWSxcbiAgZGVwczogW0luamVjdG9yLCBbbmV3IE9wdGlvbmFsKCksIE5aX0RBVEVfQ09ORklHXV1cbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGF0ZUhlbHBlclNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaTE4bjogTnpJMThuU2VydmljZSwgQE9wdGlvbmFsKCkgQEluamVjdChOWl9EQVRFX0NPTkZJRykgcHJvdGVjdGVkIGNvbmZpZzogTnpEYXRlQ29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSBtZXJnZURhdGVDb25maWcodGhpcy5jb25maWcpO1xuICB9XG5cbiAgYWJzdHJhY3QgZ2V0SVNPV2VlayhkYXRlOiBEYXRlKTogbnVtYmVyO1xuICBhYnN0cmFjdCBnZXRGaXJzdERheU9mV2VlaygpOiBXZWVrRGF5SW5kZXg7XG4gIGFic3RyYWN0IGZvcm1hdChkYXRlOiBEYXRlIHwgbnVsbCwgZm9ybWF0U3RyOiBzdHJpbmcpOiBzdHJpbmc7XG4gIGFic3RyYWN0IHBhcnNlRGF0ZSh0ZXh0OiBzdHJpbmcsIGZvcm1hdFN0cj86IHN0cmluZyk6IERhdGU7XG4gIGFic3RyYWN0IHBhcnNlVGltZSh0ZXh0OiBzdHJpbmcsIGZvcm1hdFN0cj86IHN0cmluZyk6IERhdGUgfCB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogRGF0ZUhlbHBlciB0aGF0IGhhbmRsZXMgZGF0ZSBmb3JtYXRzIHdpdGggZGF0ZS1mbnNcbiAqL1xuZXhwb3J0IGNsYXNzIERhdGVIZWxwZXJCeURhdGVGbnMgZXh0ZW5kcyBEYXRlSGVscGVyU2VydmljZSB7XG4gIGdldElTT1dlZWsoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGZuc0dldElTT1dlZWsoZGF0ZSk7XG4gIH1cblxuICAvLyBVc2UgZGF0ZS1mbnMncyBcIndlZWtTdGFydHNPblwiIHRvIHN1cHBvcnQgZGlmZmVyZW50IGxvY2FsZSB3aGVuIFwiY29uZmlnLmZpcnN0RGF5T2ZXZWVrXCIgaXMgbnVsbFxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi92Mi4wLjAtYWxwaGEuMjcvc3JjL2xvY2FsZS9lbi1VUy9pbmRleC5qcyNMMjNcbiAgZ2V0Rmlyc3REYXlPZldlZWsoKTogV2Vla0RheUluZGV4IHtcbiAgICBsZXQgZGVmYXVsdFdlZWtTdGFydHNPbjogV2Vla0RheUluZGV4O1xuICAgIHRyeSB7XG4gICAgICBkZWZhdWx0V2Vla1N0YXJ0c09uID0gdGhpcy5pMThuLmdldERhdGVMb2NhbGUoKS5vcHRpb25zIS53ZWVrU3RhcnRzT24hO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGRlZmF1bHRXZWVrU3RhcnRzT24gPSAxO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb25maWcuZmlyc3REYXlPZldlZWsgPT0gbnVsbCA/IGRlZmF1bHRXZWVrU3RhcnRzT24gOiB0aGlzLmNvbmZpZy5maXJzdERheU9mV2VlaztcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtYXQgYSBkYXRlXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy9mb3JtYXQjZGVzY3JpcHRpb25cbiAgICogQHBhcmFtIGRhdGUgRGF0ZVxuICAgKiBAcGFyYW0gZm9ybWF0U3RyIGZvcm1hdCBzdHJpbmdcbiAgICovXG4gIGZvcm1hdChkYXRlOiBEYXRlLCBmb3JtYXRTdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGRhdGUgPyBmbnNGb3JtYXQoZGF0ZSwgZm9ybWF0U3RyLCB7IGxvY2FsZTogdGhpcy5pMThuLmdldERhdGVMb2NhbGUoKSB9KSA6ICcnO1xuICB9XG5cbiAgcGFyc2VEYXRlKHRleHQ6IHN0cmluZywgZm9ybWF0U3RyOiBzdHJpbmcpOiBEYXRlIHtcbiAgICByZXR1cm4gZm5zUGFyc2UodGV4dCwgZm9ybWF0U3RyLCBuZXcgRGF0ZSgpLCB7XG4gICAgICBsb2NhbGU6IHRoaXMuaTE4bi5nZXREYXRlTG9jYWxlKCksXG4gICAgICB3ZWVrU3RhcnRzT246IHRoaXMuZ2V0Rmlyc3REYXlPZldlZWsoKVxuICAgIH0pO1xuICB9XG5cbiAgcGFyc2VUaW1lKHRleHQ6IHN0cmluZywgZm9ybWF0U3RyOiBzdHJpbmcpOiBEYXRlIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5wYXJzZURhdGUodGV4dCwgZm9ybWF0U3RyKTtcbiAgfVxufVxuXG4vKipcbiAqIERhdGVIZWxwZXIgdGhhdCBoYW5kbGVzIGRhdGUgZm9ybWF0cyB3aXRoIGFuZ3VsYXIncyBkYXRlLXBpcGVcbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2lzc3Vlcy8yNDA2IC0gRGF0ZVBpcGUgbWF5IGNhdXNlIG5vbi1zdGFuZGFyZCB3ZWVrIGJ1Zywgc2VlOlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIERhdGVIZWxwZXJCeURhdGVQaXBlIGV4dGVuZHMgRGF0ZUhlbHBlclNlcnZpY2Uge1xuICBnZXRJU09XZWVrKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgIHJldHVybiArdGhpcy5mb3JtYXQoZGF0ZSwgJ3cnKTtcbiAgfVxuXG4gIGdldEZpcnN0RGF5T2ZXZWVrKCk6IFdlZWtEYXlJbmRleCB7XG4gICAgaWYgKHRoaXMuY29uZmlnLmZpcnN0RGF5T2ZXZWVrID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGxvY2FsZSA9IHRoaXMuaTE4bi5nZXRMb2NhbGVJZCgpO1xuICAgICAgcmV0dXJuIGxvY2FsZSAmJiBbJ3poLWNuJywgJ3poLXR3J10uaW5kZXhPZihsb2NhbGUudG9Mb3dlckNhc2UoKSkgPiAtMSA/IDEgOiAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb25maWcuZmlyc3REYXlPZldlZWs7XG4gIH1cblxuICBmb3JtYXQoZGF0ZTogRGF0ZSB8IG51bGwsIGZvcm1hdFN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZGF0ZSA/IGZvcm1hdERhdGUoZGF0ZSwgZm9ybWF0U3RyLCB0aGlzLmkxOG4uZ2V0TG9jYWxlSWQoKSkhIDogJyc7XG4gIH1cblxuICBwYXJzZURhdGUodGV4dDogc3RyaW5nKTogRGF0ZSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHRleHQpO1xuICB9XG5cbiAgcGFyc2VUaW1lKHRleHQ6IHN0cmluZywgZm9ybWF0U3RyOiBzdHJpbmcpOiBEYXRlIHtcbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgybVOZ1RpbWVQYXJzZXIoZm9ybWF0U3RyLCB0aGlzLmkxOG4uZ2V0TG9jYWxlSWQoKSk7XG4gICAgcmV0dXJuIHBhcnNlci50b0RhdGUodGV4dCk7XG4gIH1cbn1cbiJdfQ==