import { __decorate } from 'tslib';
import * as i11 from '@angular/cdk/overlay';
import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import * as i0 from '@angular/core';
import { EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, Input, Output, Optional, NgModule } from '@angular/core';
import * as i6 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { Subject, fromEvent, of } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { isValid } from 'date-fns';
import { slideMotion } from 'ng-zorro-antd/core/animation';
import * as i1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { warn } from 'ng-zorro-antd/core/logger';
import { isNotNil, isNil, InputBoolean } from 'ng-zorro-antd/core/util';
import * as i2 from 'ng-zorro-antd/i18n';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import * as i3$1 from '@angular/cdk/platform';
import * as i4$1 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import { reqAnimFrame } from 'ng-zorro-antd/core/polyfill';
import * as i2$1 from 'ng-zorro-antd/button';
import { NzButtonModule } from 'ng-zorro-antd/button';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4 from 'ng-zorro-antd/core/wave';
import * as i5 from 'ng-zorro-antd/core/transition-patch';
import * as i7 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import * as i8 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i12 from 'ng-zorro-antd/core/overlay';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class TimeHolder {
    constructor() {
        this.selected12Hours = undefined;
        this._use12Hours = false;
        this._changes = new Subject();
    }
    setMinutes(value, disabled) {
        if (!disabled) {
            this.initValue();
            this.value.setMinutes(value);
            this.update();
        }
        return this;
    }
    setHours(value, disabled) {
        if (!disabled) {
            this.initValue();
            if (this._use12Hours) {
                if (this.selected12Hours === 'PM' && value !== 12) {
                    this.value.setHours(value + 12);
                }
                else if (this.selected12Hours === 'AM' && value === 12) {
                    this.value.setHours(0);
                }
                else {
                    this.value.setHours(value);
                }
            }
            else {
                this.value.setHours(value);
            }
            this.update();
        }
        return this;
    }
    setSeconds(value, disabled) {
        if (!disabled) {
            this.initValue();
            this.value.setSeconds(value);
            this.update();
        }
        return this;
    }
    setUse12Hours(value) {
        this._use12Hours = value;
        return this;
    }
    get changes() {
        return this._changes.asObservable();
    }
    setValue(value, use12Hours) {
        if (isNotNil(use12Hours)) {
            this._use12Hours = use12Hours;
        }
        if (value !== this.value) {
            this._value = value;
            if (isNotNil(this.value)) {
                if (this._use12Hours && isNotNil(this.hours)) {
                    this.selected12Hours = this.hours >= 12 ? 'PM' : 'AM';
                }
            }
            else {
                this._clear();
            }
        }
        return this;
    }
    initValue() {
        if (isNil(this.value)) {
            this.setValue(new Date(), this._use12Hours);
        }
    }
    clear() {
        this._clear();
        this.update();
    }
    get isEmpty() {
        return !(isNotNil(this.hours) || isNotNil(this.minutes) || isNotNil(this.seconds));
    }
    _clear() {
        this._value = undefined;
        this.selected12Hours = undefined;
    }
    update() {
        if (this.isEmpty) {
            this._value = undefined;
        }
        else {
            if (isNotNil(this.hours)) {
                this.value.setHours(this.hours);
            }
            if (isNotNil(this.minutes)) {
                this.value.setMinutes(this.minutes);
            }
            if (isNotNil(this.seconds)) {
                this.value.setSeconds(this.seconds);
            }
            if (this._use12Hours) {
                if (this.selected12Hours === 'PM' && this.hours < 12) {
                    this.value.setHours(this.hours + 12);
                }
                if (this.selected12Hours === 'AM' && this.hours >= 12) {
                    this.value.setHours(this.hours - 12);
                }
            }
        }
        this.changed();
    }
    changed() {
        this._changes.next(this.value);
    }
    /**
     * @description
     * UI view hours
     * Get viewHours which is selected in `time-picker-panel` and its range is [12, 1, 2, ..., 11]
     */
    get viewHours() {
        return this._use12Hours && isNotNil(this.hours) ? this.calculateViewHour(this.hours) : this.hours;
    }
    setSelected12Hours(value) {
        if (value.toUpperCase() !== this.selected12Hours) {
            this.selected12Hours = value.toUpperCase();
            this.update();
        }
    }
    get value() {
        return this._value || this._defaultOpenValue;
    }
    get hours() {
        var _a;
        return (_a = this.value) === null || _a === void 0 ? void 0 : _a.getHours();
    }
    get minutes() {
        var _a;
        return (_a = this.value) === null || _a === void 0 ? void 0 : _a.getMinutes();
    }
    get seconds() {
        var _a;
        return (_a = this.value) === null || _a === void 0 ? void 0 : _a.getSeconds();
    }
    setDefaultOpenValue(value) {
        this._defaultOpenValue = value;
        return this;
    }
    calculateViewHour(value) {
        const selected12Hours = this.selected12Hours;
        if (selected12Hours === 'PM' && value > 12) {
            return value - 12;
        }
        if (selected12Hours === 'AM' && value === 0) {
            return 12;
        }
        return value;
    }
}

function makeRange(length, step = 1, start = 0) {
    return new Array(Math.ceil(length / step)).fill(0).map((_, i) => (i + start) * step);
}
class NzTimePickerPanelComponent {
    constructor(ngZone, cdr, dateHelper, elementRef) {
        this.ngZone = ngZone;
        this.cdr = cdr;
        this.dateHelper = dateHelper;
        this.elementRef = elementRef;
        this._nzHourStep = 1;
        this._nzMinuteStep = 1;
        this._nzSecondStep = 1;
        this.unsubscribe$ = new Subject();
        this._format = 'HH:mm:ss';
        this._disabledHours = () => [];
        this._disabledMinutes = () => [];
        this._disabledSeconds = () => [];
        this._allowEmpty = true;
        this.time = new TimeHolder();
        this.hourEnabled = true;
        this.minuteEnabled = true;
        this.secondEnabled = true;
        this.firstScrolled = false;
        this.enabledColumns = 3;
        this.nzInDatePicker = false; // If inside a date-picker, more diff works need to be done
        this.nzHideDisabledOptions = false;
        this.nzUse12Hours = false;
        this.closePanel = new EventEmitter();
    }
    set nzAllowEmpty(value) {
        if (isNotNil(value)) {
            this._allowEmpty = value;
        }
    }
    get nzAllowEmpty() {
        return this._allowEmpty;
    }
    set nzDisabledHours(value) {
        this._disabledHours = value;
        if (this._disabledHours) {
            this.buildHours();
        }
    }
    get nzDisabledHours() {
        return this._disabledHours;
    }
    set nzDisabledMinutes(value) {
        if (isNotNil(value)) {
            this._disabledMinutes = value;
            this.buildMinutes();
        }
    }
    get nzDisabledMinutes() {
        return this._disabledMinutes;
    }
    set nzDisabledSeconds(value) {
        if (isNotNil(value)) {
            this._disabledSeconds = value;
            this.buildSeconds();
        }
    }
    get nzDisabledSeconds() {
        return this._disabledSeconds;
    }
    set format(value) {
        if (isNotNil(value)) {
            this._format = value;
            this.enabledColumns = 0;
            const charSet = new Set(value);
            this.hourEnabled = charSet.has('H') || charSet.has('h');
            this.minuteEnabled = charSet.has('m');
            this.secondEnabled = charSet.has('s');
            if (this.hourEnabled) {
                this.enabledColumns++;
            }
            if (this.minuteEnabled) {
                this.enabledColumns++;
            }
            if (this.secondEnabled) {
                this.enabledColumns++;
            }
            if (this.nzUse12Hours) {
                this.build12Hours();
            }
        }
    }
    get format() {
        return this._format;
    }
    set nzHourStep(value) {
        if (isNotNil(value)) {
            this._nzHourStep = value;
            this.buildHours();
        }
    }
    get nzHourStep() {
        return this._nzHourStep;
    }
    set nzMinuteStep(value) {
        if (isNotNil(value)) {
            this._nzMinuteStep = value;
            this.buildMinutes();
        }
    }
    get nzMinuteStep() {
        return this._nzMinuteStep;
    }
    set nzSecondStep(value) {
        if (isNotNil(value)) {
            this._nzSecondStep = value;
            this.buildSeconds();
        }
    }
    get nzSecondStep() {
        return this._nzSecondStep;
    }
    trackByFn(index) {
        return index;
    }
    buildHours() {
        var _a;
        let hourRanges = 24;
        let disabledHours = (_a = this.nzDisabledHours) === null || _a === void 0 ? void 0 : _a.call(this);
        let startIndex = 0;
        if (this.nzUse12Hours) {
            hourRanges = 12;
            if (disabledHours) {
                if (this.time.selected12Hours === 'PM') {
                    /**
                     * Filter and transform hours which greater or equal to 12
                     * [0, 1, 2, ..., 12, 13, 14, 15, ..., 23] => [12, 1, 2, 3, ..., 11]
                     */
                    disabledHours = disabledHours.filter(i => i >= 12).map(i => (i > 12 ? i - 12 : i));
                }
                else {
                    /**
                     * Filter and transform hours which less than 12
                     * [0, 1, 2,..., 12, 13, 14, 15, ...23] => [12, 1, 2, 3, ..., 11]
                     */
                    disabledHours = disabledHours.filter(i => i < 12 || i === 24).map(i => (i === 24 || i === 0 ? 12 : i));
                }
            }
            startIndex = 1;
        }
        this.hourRange = makeRange(hourRanges, this.nzHourStep, startIndex).map(r => ({
            index: r,
            disabled: !!disabledHours && disabledHours.indexOf(r) !== -1
        }));
        if (this.nzUse12Hours && this.hourRange[this.hourRange.length - 1].index === 12) {
            const temp = [...this.hourRange];
            temp.unshift(temp[temp.length - 1]);
            temp.splice(temp.length - 1, 1);
            this.hourRange = temp;
        }
    }
    buildMinutes() {
        this.minuteRange = makeRange(60, this.nzMinuteStep).map(r => ({
            index: r,
            disabled: !!this.nzDisabledMinutes && this.nzDisabledMinutes(this.time.hours).indexOf(r) !== -1
        }));
    }
    buildSeconds() {
        this.secondRange = makeRange(60, this.nzSecondStep).map(r => ({
            index: r,
            disabled: !!this.nzDisabledSeconds && this.nzDisabledSeconds(this.time.hours, this.time.minutes).indexOf(r) !== -1
        }));
    }
    build12Hours() {
        const isUpperFormat = this._format.includes('A');
        this.use12HoursRange = [
            {
                index: 0,
                value: isUpperFormat ? 'AM' : 'am'
            },
            {
                index: 1,
                value: isUpperFormat ? 'PM' : 'pm'
            }
        ];
    }
    buildTimes() {
        this.buildHours();
        this.buildMinutes();
        this.buildSeconds();
        this.build12Hours();
    }
    scrollToTime(delay = 0) {
        if (this.hourEnabled && this.hourListElement) {
            this.scrollToSelected(this.hourListElement.nativeElement, this.time.viewHours, delay, 'hour');
        }
        if (this.minuteEnabled && this.minuteListElement) {
            this.scrollToSelected(this.minuteListElement.nativeElement, this.time.minutes, delay, 'minute');
        }
        if (this.secondEnabled && this.secondListElement) {
            this.scrollToSelected(this.secondListElement.nativeElement, this.time.seconds, delay, 'second');
        }
        if (this.nzUse12Hours && this.use12HoursListElement) {
            const selectedHours = this.time.selected12Hours;
            const index = selectedHours === 'AM' ? 0 : 1;
            this.scrollToSelected(this.use12HoursListElement.nativeElement, index, delay, '12-hour');
        }
    }
    selectHour(hour) {
        this.time.setHours(hour.index, hour.disabled);
        if (this._disabledMinutes) {
            this.buildMinutes();
        }
        if (this._disabledSeconds || this._disabledMinutes) {
            this.buildSeconds();
        }
    }
    selectMinute(minute) {
        this.time.setMinutes(minute.index, minute.disabled);
        if (this._disabledSeconds) {
            this.buildSeconds();
        }
    }
    selectSecond(second) {
        this.time.setSeconds(second.index, second.disabled);
    }
    select12Hours(value) {
        this.time.setSelected12Hours(value.value);
        if (this._disabledHours) {
            this.buildHours();
        }
        if (this._disabledMinutes) {
            this.buildMinutes();
        }
        if (this._disabledSeconds) {
            this.buildSeconds();
        }
    }
    scrollToSelected(instance, index, duration = 0, unit) {
        if (!instance) {
            return;
        }
        const transIndex = this.translateIndex(index, unit);
        const currentOption = (instance.children[transIndex] || instance.children[0]);
        this.scrollTo(instance, currentOption.offsetTop, duration);
    }
    translateIndex(index, unit) {
        var _a, _b, _c;
        if (unit === 'hour') {
            return this.calcIndex((_a = this.nzDisabledHours) === null || _a === void 0 ? void 0 : _a.call(this), this.hourRange.map(item => item.index).indexOf(index));
        }
        else if (unit === 'minute') {
            return this.calcIndex((_b = this.nzDisabledMinutes) === null || _b === void 0 ? void 0 : _b.call(this, this.time.hours), this.minuteRange.map(item => item.index).indexOf(index));
        }
        else if (unit === 'second') {
            // second
            return this.calcIndex((_c = this.nzDisabledSeconds) === null || _c === void 0 ? void 0 : _c.call(this, this.time.hours, this.time.minutes), this.secondRange.map(item => item.index).indexOf(index));
        }
        else {
            // 12-hour
            return this.calcIndex([], this.use12HoursRange.map(item => item.index).indexOf(index));
        }
    }
    scrollTo(element, to, duration) {
        if (duration <= 0) {
            element.scrollTop = to;
            return;
        }
        const difference = to - element.scrollTop;
        const perTick = (difference / duration) * 10;
        this.ngZone.runOutsideAngular(() => {
            reqAnimFrame(() => {
                element.scrollTop = element.scrollTop + perTick;
                if (element.scrollTop === to) {
                    return;
                }
                this.scrollTo(element, to, duration - 10);
            });
        });
    }
    calcIndex(array, index) {
        if ((array === null || array === void 0 ? void 0 : array.length) && this.nzHideDisabledOptions) {
            return index - array.reduce((pre, value) => pre + (value < index ? 1 : 0), 0);
        }
        else {
            return index;
        }
    }
    changed() {
        if (this.onChange) {
            this.onChange(this.time.value);
        }
    }
    touched() {
        if (this.onTouch) {
            this.onTouch();
        }
    }
    timeDisabled(value) {
        var _a, _b, _c, _d, _e, _f;
        const hour = value.getHours();
        const minute = value.getMinutes();
        const second = value.getSeconds();
        return (((_b = (_a = this.nzDisabledHours) === null || _a === void 0 ? void 0 : _a.call(this).indexOf(hour)) !== null && _b !== void 0 ? _b : -1) > -1 ||
            ((_d = (_c = this.nzDisabledMinutes) === null || _c === void 0 ? void 0 : _c.call(this, hour).indexOf(minute)) !== null && _d !== void 0 ? _d : -1) > -1 ||
            ((_f = (_e = this.nzDisabledSeconds) === null || _e === void 0 ? void 0 : _e.call(this, hour, minute).indexOf(second)) !== null && _f !== void 0 ? _f : -1) > -1);
    }
    onClickNow() {
        const now = new Date();
        if (this.timeDisabled(now)) {
            return;
        }
        this.time.setValue(now);
        this.changed();
        this.closePanel.emit();
    }
    onClickOk() {
        this.time.setValue(this.time.value, this.nzUse12Hours);
        this.changed();
        this.closePanel.emit();
    }
    isSelectedHour(hour) {
        return hour.index === this.time.viewHours;
    }
    isSelectedMinute(minute) {
        return minute.index === this.time.minutes;
    }
    isSelectedSecond(second) {
        return second.index === this.time.seconds;
    }
    isSelected12Hours(value) {
        return value.value.toUpperCase() === this.time.selected12Hours;
    }
    ngOnInit() {
        this.time.changes.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.changed();
            this.touched();
            this.scrollToTime(120);
        });
        this.buildTimes();
        setTimeout(() => {
            this.scrollToTime();
            this.firstScrolled = true;
        });
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.elementRef.nativeElement, 'mousedown')
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe(event => {
                event.preventDefault();
            });
        });
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    ngOnChanges(changes) {
        const { nzUse12Hours, nzDefaultOpenValue } = changes;
        if (!(nzUse12Hours === null || nzUse12Hours === void 0 ? void 0 : nzUse12Hours.previousValue) && (nzUse12Hours === null || nzUse12Hours === void 0 ? void 0 : nzUse12Hours.currentValue)) {
            this.build12Hours();
            this.enabledColumns++;
        }
        if (nzDefaultOpenValue === null || nzDefaultOpenValue === void 0 ? void 0 : nzDefaultOpenValue.currentValue) {
            this.time.setDefaultOpenValue(this.nzDefaultOpenValue || new Date());
        }
    }
    writeValue(value) {
        this.time.setValue(value, this.nzUse12Hours);
        this.buildTimes();
        if (value && this.firstScrolled) {
            this.scrollToTime(120);
        }
        // Mark this component to be checked manually with internal properties changing (see: https://github.com/angular/angular/issues/10816)
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
}
NzTimePickerPanelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTimePickerPanelComponent, deps: [{ token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i2.DateHelperService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NzTimePickerPanelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTimePickerPanelComponent, selector: "nz-time-picker-panel", inputs: { nzInDatePicker: "nzInDatePicker", nzAddOn: "nzAddOn", nzHideDisabledOptions: "nzHideDisabledOptions", nzClearText: "nzClearText", nzNowText: "nzNowText", nzOkText: "nzOkText", nzPlaceHolder: "nzPlaceHolder", nzUse12Hours: "nzUse12Hours", nzDefaultOpenValue: "nzDefaultOpenValue", nzAllowEmpty: "nzAllowEmpty", nzDisabledHours: "nzDisabledHours", nzDisabledMinutes: "nzDisabledMinutes", nzDisabledSeconds: "nzDisabledSeconds", format: "format", nzHourStep: "nzHourStep", nzMinuteStep: "nzMinuteStep", nzSecondStep: "nzSecondStep" }, outputs: { closePanel: "closePanel" }, host: { properties: { "class.ant-picker-time-panel-column-0": "enabledColumns === 0 && !nzInDatePicker", "class.ant-picker-time-panel-column-1": "enabledColumns === 1 && !nzInDatePicker", "class.ant-picker-time-panel-column-2": "enabledColumns === 2 && !nzInDatePicker", "class.ant-picker-time-panel-column-3": "enabledColumns === 3 && !nzInDatePicker", "class.ant-picker-time-panel-narrow": "enabledColumns < 3", "class.ant-picker-time-panel-placement-bottomLeft": "!nzInDatePicker" }, classAttribute: "ant-picker-time-panel" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NzTimePickerPanelComponent, multi: true }], viewQueries: [{ propertyName: "hourListElement", first: true, predicate: ["hourListElement"], descendants: true }, { propertyName: "minuteListElement", first: true, predicate: ["minuteListElement"], descendants: true }, { propertyName: "secondListElement", first: true, predicate: ["secondListElement"], descendants: true }, { propertyName: "use12HoursListElement", first: true, predicate: ["use12HoursListElement"], descendants: true }], exportAs: ["nzTimePickerPanel"], usesOnChanges: true, ngImport: i0, template: `
    <div *ngIf="nzInDatePicker" class="ant-picker-header">
      <div class="ant-picker-header-view">{{ dateHelper.format($any(time?.value), format) || '&nbsp;' }}</div>
    </div>
    <div class="ant-picker-content">
      <ul *ngIf="hourEnabled" #hourListElement class="ant-picker-time-panel-column" style="position: relative;">
        <ng-container *ngFor="let hour of hourRange; trackBy: trackByFn">
          <li
            *ngIf="!(nzHideDisabledOptions && hour.disabled)"
            class="ant-picker-time-panel-cell"
            (click)="selectHour(hour)"
            [class.ant-picker-time-panel-cell-selected]="isSelectedHour(hour)"
            [class.ant-picker-time-panel-cell-disabled]="hour.disabled"
          >
            <div class="ant-picker-time-panel-cell-inner">{{ hour.index | number: '2.0-0' }}</div>
          </li>
        </ng-container>
      </ul>
      <ul *ngIf="minuteEnabled" #minuteListElement class="ant-picker-time-panel-column" style="position: relative;">
        <ng-container *ngFor="let minute of minuteRange; trackBy: trackByFn">
          <li
            *ngIf="!(nzHideDisabledOptions && minute.disabled)"
            class="ant-picker-time-panel-cell"
            (click)="selectMinute(minute)"
            [class.ant-picker-time-panel-cell-selected]="isSelectedMinute(minute)"
            [class.ant-picker-time-panel-cell-disabled]="minute.disabled"
          >
            <div class="ant-picker-time-panel-cell-inner">{{ minute.index | number: '2.0-0' }}</div>
          </li>
        </ng-container>
      </ul>
      <ul *ngIf="secondEnabled" #secondListElement class="ant-picker-time-panel-column" style="position: relative;">
        <ng-container *ngFor="let second of secondRange; trackBy: trackByFn">
          <li
            *ngIf="!(nzHideDisabledOptions && second.disabled)"
            class="ant-picker-time-panel-cell"
            (click)="selectSecond(second)"
            [class.ant-picker-time-panel-cell-selected]="isSelectedSecond(second)"
            [class.ant-picker-time-panel-cell-disabled]="second.disabled"
          >
            <div class="ant-picker-time-panel-cell-inner">{{ second.index | number: '2.0-0' }}</div>
          </li>
        </ng-container>
      </ul>
      <ul *ngIf="nzUse12Hours" #use12HoursListElement class="ant-picker-time-panel-column" style="position: relative;">
        <ng-container *ngFor="let range of use12HoursRange">
          <li
            *ngIf="!nzHideDisabledOptions"
            (click)="select12Hours(range)"
            class="ant-picker-time-panel-cell"
            [class.ant-picker-time-panel-cell-selected]="isSelected12Hours(range)"
          >
            <div class="ant-picker-time-panel-cell-inner">{{ range.value }}</div>
          </li>
        </ng-container>
      </ul>
    </div>
    <div *ngIf="!nzInDatePicker" class="ant-picker-footer">
      <div *ngIf="nzAddOn" class="ant-picker-footer-extra">
        <ng-template [ngTemplateOutlet]="nzAddOn"></ng-template>
      </div>
      <ul class="ant-picker-ranges">
        <li class="ant-picker-now">
          <a (click)="onClickNow()">
            {{ nzNowText || ('Calendar.lang.now' | nzI18n) }}
          </a>
        </li>
        <li class="ant-picker-ok">
          <button nz-button type="button" nzSize="small" nzType="primary" (click)="onClickOk()">
            {{ nzOkText || ('Calendar.lang.ok' | nzI18n) }}
          </button>
        </li>
      </ul>
    </div>
  `, isInline: true, components: [{ type: i2$1.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i4.NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: ["nzWaveExtraNode"], exportAs: ["nzWave"] }, { type: i5.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }], pipes: { "number": i3.DecimalPipe, "nzI18n": i2.NzI18nPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzTimePickerPanelComponent.prototype, "nzUse12Hours", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTimePickerPanelComponent, decorators: [{
            type: Component,
            args: [{
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'nz-time-picker-panel',
                    exportAs: 'nzTimePickerPanel',
                    template: `
    <div *ngIf="nzInDatePicker" class="ant-picker-header">
      <div class="ant-picker-header-view">{{ dateHelper.format($any(time?.value), format) || '&nbsp;' }}</div>
    </div>
    <div class="ant-picker-content">
      <ul *ngIf="hourEnabled" #hourListElement class="ant-picker-time-panel-column" style="position: relative;">
        <ng-container *ngFor="let hour of hourRange; trackBy: trackByFn">
          <li
            *ngIf="!(nzHideDisabledOptions && hour.disabled)"
            class="ant-picker-time-panel-cell"
            (click)="selectHour(hour)"
            [class.ant-picker-time-panel-cell-selected]="isSelectedHour(hour)"
            [class.ant-picker-time-panel-cell-disabled]="hour.disabled"
          >
            <div class="ant-picker-time-panel-cell-inner">{{ hour.index | number: '2.0-0' }}</div>
          </li>
        </ng-container>
      </ul>
      <ul *ngIf="minuteEnabled" #minuteListElement class="ant-picker-time-panel-column" style="position: relative;">
        <ng-container *ngFor="let minute of minuteRange; trackBy: trackByFn">
          <li
            *ngIf="!(nzHideDisabledOptions && minute.disabled)"
            class="ant-picker-time-panel-cell"
            (click)="selectMinute(minute)"
            [class.ant-picker-time-panel-cell-selected]="isSelectedMinute(minute)"
            [class.ant-picker-time-panel-cell-disabled]="minute.disabled"
          >
            <div class="ant-picker-time-panel-cell-inner">{{ minute.index | number: '2.0-0' }}</div>
          </li>
        </ng-container>
      </ul>
      <ul *ngIf="secondEnabled" #secondListElement class="ant-picker-time-panel-column" style="position: relative;">
        <ng-container *ngFor="let second of secondRange; trackBy: trackByFn">
          <li
            *ngIf="!(nzHideDisabledOptions && second.disabled)"
            class="ant-picker-time-panel-cell"
            (click)="selectSecond(second)"
            [class.ant-picker-time-panel-cell-selected]="isSelectedSecond(second)"
            [class.ant-picker-time-panel-cell-disabled]="second.disabled"
          >
            <div class="ant-picker-time-panel-cell-inner">{{ second.index | number: '2.0-0' }}</div>
          </li>
        </ng-container>
      </ul>
      <ul *ngIf="nzUse12Hours" #use12HoursListElement class="ant-picker-time-panel-column" style="position: relative;">
        <ng-container *ngFor="let range of use12HoursRange">
          <li
            *ngIf="!nzHideDisabledOptions"
            (click)="select12Hours(range)"
            class="ant-picker-time-panel-cell"
            [class.ant-picker-time-panel-cell-selected]="isSelected12Hours(range)"
          >
            <div class="ant-picker-time-panel-cell-inner">{{ range.value }}</div>
          </li>
        </ng-container>
      </ul>
    </div>
    <div *ngIf="!nzInDatePicker" class="ant-picker-footer">
      <div *ngIf="nzAddOn" class="ant-picker-footer-extra">
        <ng-template [ngTemplateOutlet]="nzAddOn"></ng-template>
      </div>
      <ul class="ant-picker-ranges">
        <li class="ant-picker-now">
          <a (click)="onClickNow()">
            {{ nzNowText || ('Calendar.lang.now' | nzI18n) }}
          </a>
        </li>
        <li class="ant-picker-ok">
          <button nz-button type="button" nzSize="small" nzType="primary" (click)="onClickOk()">
            {{ nzOkText || ('Calendar.lang.ok' | nzI18n) }}
          </button>
        </li>
      </ul>
    </div>
  `,
                    host: {
                        class: 'ant-picker-time-panel',
                        '[class.ant-picker-time-panel-column-0]': `enabledColumns === 0 && !nzInDatePicker`,
                        '[class.ant-picker-time-panel-column-1]': `enabledColumns === 1 && !nzInDatePicker`,
                        '[class.ant-picker-time-panel-column-2]': `enabledColumns === 2 && !nzInDatePicker`,
                        '[class.ant-picker-time-panel-column-3]': `enabledColumns === 3 && !nzInDatePicker`,
                        '[class.ant-picker-time-panel-narrow]': `enabledColumns < 3`,
                        '[class.ant-picker-time-panel-placement-bottomLeft]': `!nzInDatePicker`
                    },
                    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NzTimePickerPanelComponent, multi: true }]
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i2.DateHelperService }, { type: i0.ElementRef }]; }, propDecorators: { hourListElement: [{
                type: ViewChild,
                args: ['hourListElement', { static: false }]
            }], minuteListElement: [{
                type: ViewChild,
                args: ['minuteListElement', { static: false }]
            }], secondListElement: [{
                type: ViewChild,
                args: ['secondListElement', { static: false }]
            }], use12HoursListElement: [{
                type: ViewChild,
                args: ['use12HoursListElement', { static: false }]
            }], nzInDatePicker: [{
                type: Input
            }], nzAddOn: [{
                type: Input
            }], nzHideDisabledOptions: [{
                type: Input
            }], nzClearText: [{
                type: Input
            }], nzNowText: [{
                type: Input
            }], nzOkText: [{
                type: Input
            }], nzPlaceHolder: [{
                type: Input
            }], nzUse12Hours: [{
                type: Input
            }], nzDefaultOpenValue: [{
                type: Input
            }], closePanel: [{
                type: Output
            }], nzAllowEmpty: [{
                type: Input
            }], nzDisabledHours: [{
                type: Input
            }], nzDisabledMinutes: [{
                type: Input
            }], nzDisabledSeconds: [{
                type: Input
            }], format: [{
                type: Input
            }], nzHourStep: [{
                type: Input
            }], nzMinuteStep: [{
                type: Input
            }], nzSecondStep: [{
                type: Input
            }] } });

const NZ_CONFIG_MODULE_NAME = 'timePicker';
class NzTimePickerComponent {
    constructor(nzConfigService, i18n, element, renderer, cdr, dateHelper, platform, directionality) {
        this.nzConfigService = nzConfigService;
        this.i18n = i18n;
        this.element = element;
        this.renderer = renderer;
        this.cdr = cdr;
        this.dateHelper = dateHelper;
        this.platform = platform;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.destroy$ = new Subject();
        this.isInit = false;
        this.focused = false;
        this.inputValue = '';
        this.value = null;
        this.preValue = null;
        this.i18nPlaceHolder$ = of(undefined);
        this.overlayPositions = [
            {
                offsetY: 3,
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top'
            },
            {
                offsetY: -3,
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom'
            },
            {
                offsetY: 3,
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top'
            },
            {
                offsetY: -3,
                originX: 'end',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'bottom'
            }
        ];
        this.dir = 'ltr';
        this.nzId = null;
        this.nzSize = null;
        this.nzHourStep = 1;
        this.nzMinuteStep = 1;
        this.nzSecondStep = 1;
        this.nzClearText = 'clear';
        this.nzNowText = '';
        this.nzOkText = '';
        this.nzPopupClassName = '';
        this.nzPlaceHolder = '';
        this.nzFormat = 'HH:mm:ss';
        this.nzOpen = false;
        this.nzUse12Hours = false;
        this.nzSuffixIcon = 'clock-circle';
        this.nzOpenChange = new EventEmitter();
        this.nzHideDisabledOptions = false;
        this.nzAllowEmpty = true;
        this.nzDisabled = false;
        this.nzAutoFocus = false;
        this.nzBackdrop = false;
    }
    emitValue(value) {
        this.setValue(value, true);
        if (this._onChange) {
            this._onChange(this.value);
        }
        if (this._onTouched) {
            this._onTouched();
        }
    }
    setValue(value, syncPreValue = false) {
        if (syncPreValue) {
            this.preValue = isValid(value) ? new Date(value) : null;
        }
        this.value = isValid(value) ? new Date(value) : null;
        this.inputValue = this.dateHelper.format(value, this.nzFormat);
        this.cdr.markForCheck();
    }
    open() {
        if (this.nzDisabled || this.nzOpen) {
            return;
        }
        this.focus();
        this.nzOpen = true;
        this.nzOpenChange.emit(this.nzOpen);
    }
    close() {
        this.nzOpen = false;
        this.cdr.markForCheck();
        this.nzOpenChange.emit(this.nzOpen);
    }
    updateAutoFocus() {
        if (this.isInit && !this.nzDisabled) {
            if (this.nzAutoFocus) {
                this.renderer.setAttribute(this.inputRef.nativeElement, 'autofocus', 'autofocus');
            }
            else {
                this.renderer.removeAttribute(this.inputRef.nativeElement, 'autofocus');
            }
        }
    }
    onClickClearBtn(event) {
        event.stopPropagation();
        this.emitValue(null);
    }
    onClickOutside(event) {
        if (!this.element.nativeElement.contains(event.target)) {
            this.setCurrentValueAndClose();
        }
    }
    onFocus(value) {
        this.focused = value;
        if (!value) {
            if (this.checkTimeValid(this.value)) {
                this.setCurrentValueAndClose();
            }
            else {
                this.setValue(this.preValue);
                this.close();
            }
        }
    }
    focus() {
        if (this.inputRef.nativeElement) {
            this.inputRef.nativeElement.focus();
        }
    }
    blur() {
        if (this.inputRef.nativeElement) {
            this.inputRef.nativeElement.blur();
        }
    }
    onKeyupEsc() {
        this.setValue(this.preValue);
    }
    onKeyupEnter() {
        if (this.nzOpen && isValid(this.value)) {
            this.setCurrentValueAndClose();
        }
        else if (!this.nzOpen) {
            this.open();
        }
    }
    onInputChange(str) {
        if (!this.platform.TRIDENT && document.activeElement === this.inputRef.nativeElement) {
            this.open();
            this.parseTimeString(str);
        }
    }
    onPanelValueChange(value) {
        this.setValue(value);
        this.focus();
    }
    setCurrentValueAndClose() {
        this.emitValue(this.value);
        this.close();
    }
    ngOnInit() {
        var _a;
        this.inputSize = Math.max(8, this.nzFormat.length) + 2;
        this.origin = new CdkOverlayOrigin(this.element);
        this.i18nPlaceHolder$ = this.i18n.localeChange.pipe(map((nzLocale) => nzLocale.TimePicker.placeholder));
        this.dir = this.directionality.value;
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    ngOnChanges(changes) {
        const { nzUse12Hours, nzFormat, nzDisabled, nzAutoFocus } = changes;
        if (nzUse12Hours && !nzUse12Hours.previousValue && nzUse12Hours.currentValue && !nzFormat) {
            this.nzFormat = 'h:mm:ss a';
        }
        if (nzDisabled) {
            const value = nzDisabled.currentValue;
            const input = this.inputRef.nativeElement;
            if (value) {
                this.renderer.setAttribute(input, 'disabled', '');
            }
            else {
                this.renderer.removeAttribute(input, 'disabled');
            }
        }
        if (nzAutoFocus) {
            this.updateAutoFocus();
        }
    }
    parseTimeString(str) {
        const value = this.dateHelper.parseTime(str, this.nzFormat) || null;
        if (isValid(value)) {
            this.value = value;
            this.cdr.markForCheck();
        }
    }
    ngAfterViewInit() {
        this.isInit = true;
        this.updateAutoFocus();
    }
    writeValue(time) {
        let result;
        if (time instanceof Date) {
            result = time;
        }
        else if (isNil(time)) {
            result = null;
        }
        else {
            warn('Non-Date type is not recommended for time-picker, use "Date" type.');
            result = new Date(time);
        }
        this.setValue(result, true);
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.nzDisabled = isDisabled;
        this.cdr.markForCheck();
    }
    checkTimeValid(value) {
        var _a, _b, _c;
        if (!value) {
            return true;
        }
        const disabledHours = (_a = this.nzDisabledHours) === null || _a === void 0 ? void 0 : _a.call(this);
        const disabledMinutes = (_b = this.nzDisabledMinutes) === null || _b === void 0 ? void 0 : _b.call(this, value.getHours());
        const disabledSeconds = (_c = this.nzDisabledSeconds) === null || _c === void 0 ? void 0 : _c.call(this, value.getHours(), value.getMinutes());
        return !((disabledHours === null || disabledHours === void 0 ? void 0 : disabledHours.includes(value.getHours())) ||
            (disabledMinutes === null || disabledMinutes === void 0 ? void 0 : disabledMinutes.includes(value.getMinutes())) ||
            (disabledSeconds === null || disabledSeconds === void 0 ? void 0 : disabledSeconds.includes(value.getSeconds())));
    }
}
NzTimePickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTimePickerComponent, deps: [{ token: i1.NzConfigService }, { token: i2.NzI18nService }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i2.DateHelperService }, { token: i3$1.Platform }, { token: i4$1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzTimePickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTimePickerComponent, selector: "nz-time-picker", inputs: { nzId: "nzId", nzSize: "nzSize", nzHourStep: "nzHourStep", nzMinuteStep: "nzMinuteStep", nzSecondStep: "nzSecondStep", nzClearText: "nzClearText", nzNowText: "nzNowText", nzOkText: "nzOkText", nzPopupClassName: "nzPopupClassName", nzPlaceHolder: "nzPlaceHolder", nzAddOn: "nzAddOn", nzDefaultOpenValue: "nzDefaultOpenValue", nzDisabledHours: "nzDisabledHours", nzDisabledMinutes: "nzDisabledMinutes", nzDisabledSeconds: "nzDisabledSeconds", nzFormat: "nzFormat", nzOpen: "nzOpen", nzUse12Hours: "nzUse12Hours", nzSuffixIcon: "nzSuffixIcon", nzHideDisabledOptions: "nzHideDisabledOptions", nzAllowEmpty: "nzAllowEmpty", nzDisabled: "nzDisabled", nzAutoFocus: "nzAutoFocus", nzBackdrop: "nzBackdrop" }, outputs: { nzOpenChange: "nzOpenChange" }, host: { listeners: { "click": "open()" }, properties: { "class.ant-picker-large": "nzSize === 'large'", "class.ant-picker-small": "nzSize === 'small'", "class.ant-picker-disabled": "nzDisabled", "class.ant-picker-focused": "focused", "class.ant-picker-rtl": "dir === 'rtl'" }, classAttribute: "ant-picker" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NzTimePickerComponent, multi: true }], viewQueries: [{ propertyName: "inputRef", first: true, predicate: ["inputElement"], descendants: true, static: true }], exportAs: ["nzTimePicker"], usesOnChanges: true, ngImport: i0, template: `
    <div class="ant-picker-input">
      <input
        #inputElement
        [attr.id]="nzId"
        type="text"
        [size]="inputSize"
        autocomplete="off"
        [placeholder]="nzPlaceHolder || (i18nPlaceHolder$ | async)"
        [(ngModel)]="inputValue"
        [disabled]="nzDisabled"
        (focus)="onFocus(true)"
        (blur)="onFocus(false)"
        (keyup.enter)="onKeyupEnter()"
        (keyup.escape)="onKeyupEsc()"
        (ngModelChange)="onInputChange($event)"
      />
      <span class="ant-picker-suffix">
        <ng-container *nzStringTemplateOutlet="nzSuffixIcon; let suffixIcon">
          <i nz-icon [nzType]="suffixIcon"></i>
        </ng-container>
      </span>
      <span *ngIf="nzAllowEmpty && !nzDisabled && value" class="ant-picker-clear" (click)="onClickClearBtn($event)">
        <i nz-icon nzType="close-circle" nzTheme="fill" [attr.aria-label]="nzClearText" [attr.title]="nzClearText"></i>
      </span>
    </div>

    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayPositions]="overlayPositions"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="nzOpen"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-picker-dropdown'"
      (detach)="close()"
      (overlayOutsideClick)="onClickOutside($event)"
    >
      <div [@slideMotion]="'enter'" class="ant-picker-dropdown" style="position: relative">
        <div class="ant-picker-panel-container">
          <div tabindex="-1" class="ant-picker-panel">
            <nz-time-picker-panel
              [ngClass]="nzPopupClassName"
              [format]="nzFormat"
              [nzHourStep]="nzHourStep"
              [nzMinuteStep]="nzMinuteStep"
              [nzSecondStep]="nzSecondStep"
              [nzDisabledHours]="nzDisabledHours"
              [nzDisabledMinutes]="nzDisabledMinutes"
              [nzDisabledSeconds]="nzDisabledSeconds"
              [nzPlaceHolder]="nzPlaceHolder || (i18nPlaceHolder$ | async)"
              [nzHideDisabledOptions]="nzHideDisabledOptions"
              [nzUse12Hours]="nzUse12Hours"
              [nzDefaultOpenValue]="nzDefaultOpenValue"
              [nzAddOn]="nzAddOn"
              [nzClearText]="nzClearText"
              [nzNowText]="nzNowText"
              [nzOkText]="nzOkText"
              [nzAllowEmpty]="nzAllowEmpty"
              [(ngModel)]="value"
              (ngModelChange)="onPanelValueChange($event)"
              (closePanel)="setCurrentValueAndClose()"
            ></nz-time-picker-panel>
          </div>
        </div>
      </div>
    </ng-template>
  `, isInline: true, components: [{ type: NzTimePickerPanelComponent, selector: "nz-time-picker-panel", inputs: ["nzInDatePicker", "nzAddOn", "nzHideDisabledOptions", "nzClearText", "nzNowText", "nzOkText", "nzPlaceHolder", "nzUse12Hours", "nzDefaultOpenValue", "nzAllowEmpty", "nzDisabledHours", "nzDisabledMinutes", "nzDisabledSeconds", "format", "nzHourStep", "nzMinuteStep", "nzSecondStep"], outputs: ["closePanel"], exportAs: ["nzTimePickerPanel"] }], directives: [{ type: i6.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i7.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i8.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i5.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i11.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { type: i12.NzConnectedOverlayDirective, selector: "[cdkConnectedOverlay][nzConnectedOverlay]", inputs: ["nzArrowPointAtCenter"], exportAs: ["nzConnectedOverlay"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "async": i3.AsyncPipe }, animations: [slideMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    WithConfig()
], NzTimePickerComponent.prototype, "nzHourStep", void 0);
__decorate([
    WithConfig()
], NzTimePickerComponent.prototype, "nzMinuteStep", void 0);
__decorate([
    WithConfig()
], NzTimePickerComponent.prototype, "nzSecondStep", void 0);
__decorate([
    WithConfig()
], NzTimePickerComponent.prototype, "nzClearText", void 0);
__decorate([
    WithConfig()
], NzTimePickerComponent.prototype, "nzNowText", void 0);
__decorate([
    WithConfig()
], NzTimePickerComponent.prototype, "nzOkText", void 0);
__decorate([
    WithConfig()
], NzTimePickerComponent.prototype, "nzPopupClassName", void 0);
__decorate([
    WithConfig()
], NzTimePickerComponent.prototype, "nzFormat", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzTimePickerComponent.prototype, "nzUse12Hours", void 0);
__decorate([
    WithConfig()
], NzTimePickerComponent.prototype, "nzSuffixIcon", void 0);
__decorate([
    InputBoolean()
], NzTimePickerComponent.prototype, "nzHideDisabledOptions", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzTimePickerComponent.prototype, "nzAllowEmpty", void 0);
__decorate([
    InputBoolean()
], NzTimePickerComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean()
], NzTimePickerComponent.prototype, "nzAutoFocus", void 0);
__decorate([
    WithConfig()
], NzTimePickerComponent.prototype, "nzBackdrop", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTimePickerComponent, decorators: [{
            type: Component,
            args: [{
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'nz-time-picker',
                    exportAs: 'nzTimePicker',
                    template: `
    <div class="ant-picker-input">
      <input
        #inputElement
        [attr.id]="nzId"
        type="text"
        [size]="inputSize"
        autocomplete="off"
        [placeholder]="nzPlaceHolder || (i18nPlaceHolder$ | async)"
        [(ngModel)]="inputValue"
        [disabled]="nzDisabled"
        (focus)="onFocus(true)"
        (blur)="onFocus(false)"
        (keyup.enter)="onKeyupEnter()"
        (keyup.escape)="onKeyupEsc()"
        (ngModelChange)="onInputChange($event)"
      />
      <span class="ant-picker-suffix">
        <ng-container *nzStringTemplateOutlet="nzSuffixIcon; let suffixIcon">
          <i nz-icon [nzType]="suffixIcon"></i>
        </ng-container>
      </span>
      <span *ngIf="nzAllowEmpty && !nzDisabled && value" class="ant-picker-clear" (click)="onClickClearBtn($event)">
        <i nz-icon nzType="close-circle" nzTheme="fill" [attr.aria-label]="nzClearText" [attr.title]="nzClearText"></i>
      </span>
    </div>

    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayPositions]="overlayPositions"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="nzOpen"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-picker-dropdown'"
      (detach)="close()"
      (overlayOutsideClick)="onClickOutside($event)"
    >
      <div [@slideMotion]="'enter'" class="ant-picker-dropdown" style="position: relative">
        <div class="ant-picker-panel-container">
          <div tabindex="-1" class="ant-picker-panel">
            <nz-time-picker-panel
              [ngClass]="nzPopupClassName"
              [format]="nzFormat"
              [nzHourStep]="nzHourStep"
              [nzMinuteStep]="nzMinuteStep"
              [nzSecondStep]="nzSecondStep"
              [nzDisabledHours]="nzDisabledHours"
              [nzDisabledMinutes]="nzDisabledMinutes"
              [nzDisabledSeconds]="nzDisabledSeconds"
              [nzPlaceHolder]="nzPlaceHolder || (i18nPlaceHolder$ | async)"
              [nzHideDisabledOptions]="nzHideDisabledOptions"
              [nzUse12Hours]="nzUse12Hours"
              [nzDefaultOpenValue]="nzDefaultOpenValue"
              [nzAddOn]="nzAddOn"
              [nzClearText]="nzClearText"
              [nzNowText]="nzNowText"
              [nzOkText]="nzOkText"
              [nzAllowEmpty]="nzAllowEmpty"
              [(ngModel)]="value"
              (ngModelChange)="onPanelValueChange($event)"
              (closePanel)="setCurrentValueAndClose()"
            ></nz-time-picker-panel>
          </div>
        </div>
      </div>
    </ng-template>
  `,
                    host: {
                        class: 'ant-picker',
                        '[class.ant-picker-large]': `nzSize === 'large'`,
                        '[class.ant-picker-small]': `nzSize === 'small'`,
                        '[class.ant-picker-disabled]': `nzDisabled`,
                        '[class.ant-picker-focused]': `focused`,
                        '[class.ant-picker-rtl]': `dir === 'rtl'`,
                        '(click)': 'open()'
                    },
                    animations: [slideMotion],
                    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NzTimePickerComponent, multi: true }]
                }]
        }], ctorParameters: function () {
        return [{ type: i1.NzConfigService }, { type: i2.NzI18nService }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i2.DateHelperService }, { type: i3$1.Platform }, { type: i4$1.Directionality, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { inputRef: [{
                type: ViewChild,
                args: ['inputElement', { static: true }]
            }], nzId: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzHourStep: [{
                type: Input
            }], nzMinuteStep: [{
                type: Input
            }], nzSecondStep: [{
                type: Input
            }], nzClearText: [{
                type: Input
            }], nzNowText: [{
                type: Input
            }], nzOkText: [{
                type: Input
            }], nzPopupClassName: [{
                type: Input
            }], nzPlaceHolder: [{
                type: Input
            }], nzAddOn: [{
                type: Input
            }], nzDefaultOpenValue: [{
                type: Input
            }], nzDisabledHours: [{
                type: Input
            }], nzDisabledMinutes: [{
                type: Input
            }], nzDisabledSeconds: [{
                type: Input
            }], nzFormat: [{
                type: Input
            }], nzOpen: [{
                type: Input
            }], nzUse12Hours: [{
                type: Input
            }], nzSuffixIcon: [{
                type: Input
            }], nzOpenChange: [{
                type: Output
            }], nzHideDisabledOptions: [{
                type: Input
            }], nzAllowEmpty: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzAutoFocus: [{
                type: Input
            }], nzBackdrop: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTimePickerModule {
}
NzTimePickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTimePickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzTimePickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTimePickerModule, declarations: [NzTimePickerComponent, NzTimePickerPanelComponent], imports: [BidiModule,
        CommonModule,
        FormsModule,
        NzI18nModule,
        OverlayModule,
        NzIconModule,
        NzOverlayModule,
        NzOutletModule,
        NzButtonModule], exports: [NzTimePickerPanelComponent, NzTimePickerComponent] });
NzTimePickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTimePickerModule, imports: [[
            BidiModule,
            CommonModule,
            FormsModule,
            NzI18nModule,
            OverlayModule,
            NzIconModule,
            NzOverlayModule,
            NzOutletModule,
            NzButtonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTimePickerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzTimePickerComponent, NzTimePickerPanelComponent],
                    exports: [NzTimePickerPanelComponent, NzTimePickerComponent],
                    imports: [
                        BidiModule,
                        CommonModule,
                        FormsModule,
                        NzI18nModule,
                        OverlayModule,
                        NzIconModule,
                        NzOverlayModule,
                        NzOutletModule,
                        NzButtonModule
                    ]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzTimePickerComponent, NzTimePickerModule, NzTimePickerPanelComponent };
//# sourceMappingURL=ng-zorro-antd-time-picker.mjs.map
