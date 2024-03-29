import * as i1$1 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i5 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Directive, EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, forwardRef, TemplateRef, Optional, ContentChild, NgModule } from '@angular/core';
import * as i4 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import * as i3$1 from 'ng-zorro-antd/date-picker';
import { LibPackerModule } from 'ng-zorro-antd/date-picker';
import * as i1 from 'ng-zorro-antd/i18n';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import * as i3 from 'ng-zorro-antd/radio';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import * as i2 from 'ng-zorro-antd/select';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { __decorate } from 'tslib';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InputBoolean } from 'ng-zorro-antd/core/util';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzDateCellDirective {
}
NzDateCellDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDateCellDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzDateCellDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzDateCellDirective, selector: "[nzDateCell]", exportAs: ["nzDateCell"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDateCellDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzDateCell]',
                    exportAs: 'nzDateCell'
                }]
        }] });
class NzMonthCellDirective {
}
NzMonthCellDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMonthCellDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzMonthCellDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzMonthCellDirective, selector: "[nzMonthCell]", exportAs: ["nzMonthCell"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMonthCellDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzMonthCell]',
                    exportAs: 'nzMonthCell'
                }]
        }] });
class NzDateFullCellDirective {
}
NzDateFullCellDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDateFullCellDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzDateFullCellDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzDateFullCellDirective, selector: "[nzDateFullCell]", exportAs: ["nzDateFullCell"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDateFullCellDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzDateFullCell]',
                    exportAs: 'nzDateFullCell'
                }]
        }] });
class NzMonthFullCellDirective {
}
NzMonthFullCellDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMonthFullCellDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzMonthFullCellDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzMonthFullCellDirective, selector: "[nzMonthFullCell]", exportAs: ["nzMonthFullCell"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMonthFullCellDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzMonthFullCell]',
                    exportAs: 'nzMonthFullCell'
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCalendarHeaderComponent {
    constructor(i18n, dateHelper) {
        this.i18n = i18n;
        this.dateHelper = dateHelper;
        this.mode = 'month';
        this.fullscreen = true;
        this.activeDate = new CandyDate();
        this.modeChange = new EventEmitter();
        this.yearChange = new EventEmitter();
        this.monthChange = new EventEmitter();
        // @Output() readonly valueChange: EventEmitter<CandyDate> = new EventEmitter();
        this.yearOffset = 10;
        this.yearTotal = 20;
        this.years = [];
        this.months = [];
    }
    get activeYear() {
        return this.activeDate.getYear();
    }
    get activeMonth() {
        return this.activeDate.getMonth();
    }
    get size() {
        return this.fullscreen ? 'default' : 'small';
    }
    get yearTypeText() {
        return this.i18n.getLocale().Calendar.lang.year;
    }
    get monthTypeText() {
        return this.i18n.getLocale().Calendar.lang.month;
    }
    ngOnInit() {
        this.setUpYears();
        this.setUpMonths();
    }
    updateYear(year) {
        this.yearChange.emit(year);
        this.setUpYears(year);
    }
    setUpYears(year) {
        const start = (year || this.activeYear) - this.yearOffset;
        const end = start + this.yearTotal;
        this.years = [];
        for (let i = start; i < end; i++) {
            this.years.push({ label: `${i}`, value: i });
        }
    }
    setUpMonths() {
        this.months = [];
        for (let i = 0; i < 12; i++) {
            const dateInMonth = this.activeDate.setMonth(i);
            const monthText = this.dateHelper.format(dateInMonth.nativeDate, 'MMM');
            this.months.push({ label: monthText, value: i });
        }
    }
}
NzCalendarHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCalendarHeaderComponent, deps: [{ token: i1.NzI18nService }, { token: i1.DateHelperService }], target: i0.ɵɵFactoryTarget.Component });
NzCalendarHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzCalendarHeaderComponent, selector: "nz-calendar-header", inputs: { mode: "mode", fullscreen: "fullscreen", activeDate: "activeDate" }, outputs: { modeChange: "modeChange", yearChange: "yearChange", monthChange: "monthChange" }, host: { properties: { "style.display": "'block'" }, classAttribute: "ant-fullcalendar-header" }, exportAs: ["nzCalendarHeader"], ngImport: i0, template: `
    <div class="ant-picker-calendar-header">
      <nz-select
        class="ant-picker-calendar-year-select"
        [nzSize]="size"
        [nzDropdownMatchSelectWidth]="false"
        [ngModel]="activeYear"
        (ngModelChange)="updateYear($event)"
      >
        <nz-option *ngFor="let year of years" [nzLabel]="year.label" [nzValue]="year.value"></nz-option>
      </nz-select>

      <nz-select
        *ngIf="mode === 'month'"
        class="ant-picker-calendar-month-select"
        [nzSize]="size"
        [nzDropdownMatchSelectWidth]="false"
        [ngModel]="activeMonth"
        (ngModelChange)="monthChange.emit($event)"
      >
        <nz-option *ngFor="let month of months" [nzLabel]="month.label" [nzValue]="month.value"></nz-option>
      </nz-select>

      <nz-radio-group
        class="ant-picker-calendar-mode-switch"
        [(ngModel)]="mode"
        (ngModelChange)="modeChange.emit($event)"
        [nzSize]="size"
      >
        <label nz-radio-button nzValue="month">{{ monthTypeText }}</label>
        <label nz-radio-button nzValue="year">{{ yearTypeText }}</label>
      </nz-radio-group>
    </div>
  `, isInline: true, components: [{ type: i2.NzSelectComponent, selector: "nz-select", inputs: ["nzId", "nzSize", "nzOptionHeightPx", "nzOptionOverflowSize", "nzDropdownClassName", "nzDropdownMatchSelectWidth", "nzDropdownStyle", "nzNotFoundContent", "nzPlaceHolder", "nzMaxTagCount", "nzDropdownRender", "nzCustomTemplate", "nzSuffixIcon", "nzClearIcon", "nzRemoveIcon", "nzMenuItemSelectedIcon", "nzTokenSeparators", "nzMaxTagPlaceholder", "nzMaxMultipleCount", "nzMode", "nzFilterOption", "compareWith", "nzAllowClear", "nzBorderless", "nzShowSearch", "nzLoading", "nzAutoFocus", "nzAutoClearSearchValue", "nzServerSearch", "nzDisabled", "nzOpen", "nzBackdrop", "nzOptions", "nzShowArrow"], outputs: ["nzOnSearch", "nzScrollToBottom", "nzOpenChange", "nzBlur", "nzFocus"], exportAs: ["nzSelect"] }, { type: i2.NzOptionComponent, selector: "nz-option", inputs: ["nzLabel", "nzValue", "nzDisabled", "nzHide", "nzCustomContent"], exportAs: ["nzOption"] }, { type: i3.NzRadioGroupComponent, selector: "nz-radio-group", inputs: ["nzDisabled", "nzButtonStyle", "nzSize", "nzName"], exportAs: ["nzRadioGroup"] }, { type: i3.NzRadioComponent, selector: "[nz-radio],[nz-radio-button]", inputs: ["nzValue", "nzDisabled", "nzAutoFocus"], exportAs: ["nzRadio"] }], directives: [{ type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NzRadioButtonDirective, selector: "[nz-radio-button]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCalendarHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'nz-calendar-header',
                    exportAs: 'nzCalendarHeader',
                    template: `
    <div class="ant-picker-calendar-header">
      <nz-select
        class="ant-picker-calendar-year-select"
        [nzSize]="size"
        [nzDropdownMatchSelectWidth]="false"
        [ngModel]="activeYear"
        (ngModelChange)="updateYear($event)"
      >
        <nz-option *ngFor="let year of years" [nzLabel]="year.label" [nzValue]="year.value"></nz-option>
      </nz-select>

      <nz-select
        *ngIf="mode === 'month'"
        class="ant-picker-calendar-month-select"
        [nzSize]="size"
        [nzDropdownMatchSelectWidth]="false"
        [ngModel]="activeMonth"
        (ngModelChange)="monthChange.emit($event)"
      >
        <nz-option *ngFor="let month of months" [nzLabel]="month.label" [nzValue]="month.value"></nz-option>
      </nz-select>

      <nz-radio-group
        class="ant-picker-calendar-mode-switch"
        [(ngModel)]="mode"
        (ngModelChange)="modeChange.emit($event)"
        [nzSize]="size"
      >
        <label nz-radio-button nzValue="month">{{ monthTypeText }}</label>
        <label nz-radio-button nzValue="year">{{ yearTypeText }}</label>
      </nz-radio-group>
    </div>
  `,
                    host: {
                        class: 'ant-fullcalendar-header',
                        '[style.display]': `'block'`
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzI18nService }, { type: i1.DateHelperService }]; }, propDecorators: { mode: [{
                type: Input
            }], fullscreen: [{
                type: Input
            }], activeDate: [{
                type: Input
            }], modeChange: [{
                type: Output
            }], yearChange: [{
                type: Output
            }], monthChange: [{
                type: Output
            }] } });

class NzCalendarComponent {
    constructor(cdr, directionality) {
        this.cdr = cdr;
        this.directionality = directionality;
        this.activeDate = new CandyDate();
        this.prefixCls = 'ant-picker-calendar';
        this.destroy$ = new Subject();
        this.dir = 'ltr';
        this.onChangeFn = () => { };
        this.onTouchFn = () => { };
        this.nzMode = 'month';
        this.nzModeChange = new EventEmitter();
        this.nzPanelChange = new EventEmitter();
        this.nzSelectChange = new EventEmitter();
        this.nzValueChange = new EventEmitter();
        this.nzFullscreen = true;
    }
    get dateCell() {
        return (this.nzDateCell || this.nzDateCellChild);
    }
    get dateFullCell() {
        return (this.nzDateFullCell || this.nzDateFullCellChild);
    }
    get monthCell() {
        return (this.nzMonthCell || this.nzMonthCellChild);
    }
    get monthFullCell() {
        return (this.nzMonthFullCell || this.nzMonthFullCellChild);
    }
    ngOnInit() {
        this.dir = this.directionality.value;
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.dir = this.directionality.value;
        });
    }
    onModeChange(mode) {
        this.nzModeChange.emit(mode);
        this.nzPanelChange.emit({ date: this.activeDate.nativeDate, mode });
    }
    onYearSelect(year) {
        const date = this.activeDate.setYear(year);
        this.updateDate(date);
    }
    onMonthSelect(month) {
        const date = this.activeDate.setMonth(month);
        this.updateDate(date);
    }
    onDateSelect(date) {
        // Only activeDate is enough in calendar
        // this.value = date;
        this.updateDate(date);
    }
    writeValue(value) {
        this.updateDate(new CandyDate(value), false);
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChangeFn = fn;
    }
    registerOnTouched(fn) {
        this.onTouchFn = fn;
    }
    updateDate(date, touched = true) {
        this.activeDate = date;
        if (touched) {
            this.onChangeFn(date.nativeDate);
            this.onTouchFn();
            this.nzSelectChange.emit(date.nativeDate);
            this.nzValueChange.emit(date.nativeDate);
        }
    }
    ngOnChanges(changes) {
        if (changes.nzValue) {
            this.updateDate(new CandyDate(this.nzValue), false);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzCalendarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCalendarComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1$1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzCalendarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzCalendarComponent, selector: "nz-calendar", inputs: { nzMode: "nzMode", nzValue: "nzValue", nzDisabledDate: "nzDisabledDate", nzDateCell: "nzDateCell", nzDateFullCell: "nzDateFullCell", nzMonthCell: "nzMonthCell", nzMonthFullCell: "nzMonthFullCell", nzFullscreen: "nzFullscreen" }, outputs: { nzModeChange: "nzModeChange", nzPanelChange: "nzPanelChange", nzSelectChange: "nzSelectChange", nzValueChange: "nzValueChange" }, host: { properties: { "class.ant-picker-calendar-full": "nzFullscreen", "class.ant-picker-calendar-mini": "!nzFullscreen", "class.ant-picker-calendar-rtl": "dir === 'rtl'" }, classAttribute: "ant-picker-calendar" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NzCalendarComponent), multi: true }], queries: [{ propertyName: "nzDateCellChild", first: true, predicate: NzDateCellDirective, descendants: true, read: TemplateRef }, { propertyName: "nzDateFullCellChild", first: true, predicate: NzDateFullCellDirective, descendants: true, read: TemplateRef }, { propertyName: "nzMonthCellChild", first: true, predicate: NzMonthCellDirective, descendants: true, read: TemplateRef }, { propertyName: "nzMonthFullCellChild", first: true, predicate: NzMonthFullCellDirective, descendants: true, read: TemplateRef }], exportAs: ["nzCalendar"], usesOnChanges: true, ngImport: i0, template: `
    <nz-calendar-header
      [fullscreen]="nzFullscreen"
      [activeDate]="activeDate"
      [(mode)]="nzMode"
      (modeChange)="onModeChange($event)"
      (yearChange)="onYearSelect($event)"
      (monthChange)="onMonthSelect($event)"
    ></nz-calendar-header>

    <div class="ant-picker-panel">
      <div class="ant-picker-{{ nzMode === 'month' ? 'date' : 'month' }}-panel">
        <div class="ant-picker-body">
          <ng-container *ngIf="nzMode === 'month'; then monthModeTable; else yearModeTable"></ng-container>
        </div>
      </div>
    </div>
    <ng-template #monthModeTable>
      <!--  TODO(@wenqi73) [cellRender] [fullCellRender] -->
      <date-table
        [prefixCls]="prefixCls"
        [value]="activeDate"
        [activeDate]="activeDate"
        [cellRender]="$any(dateCell)"
        [fullCellRender]="$any(dateFullCell)"
        [disabledDate]="nzDisabledDate"
        (valueChange)="onDateSelect($event)"
      ></date-table>
    </ng-template>

    <!--  TODO(@wenqi73) [cellRender] [fullCellRender] -->
    <ng-template #yearModeTable>
      <month-table
        [prefixCls]="prefixCls"
        [value]="activeDate"
        [activeDate]="activeDate"
        [cellRender]="$any(monthCell)"
        [fullCellRender]="$any(monthFullCell)"
        (valueChange)="onDateSelect($event)"
      ></month-table>
    </ng-template>
  `, isInline: true, components: [{ type: NzCalendarHeaderComponent, selector: "nz-calendar-header", inputs: ["mode", "fullscreen", "activeDate"], outputs: ["modeChange", "yearChange", "monthChange"], exportAs: ["nzCalendarHeader"] }, { type: i3$1.ɵDateTableComponent, selector: "date-table", inputs: ["locale"], exportAs: ["dateTable"] }, { type: i3$1.ɵMonthTableComponent, selector: "month-table", exportAs: ["monthTable"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzCalendarComponent.prototype, "nzFullscreen", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCalendarComponent, decorators: [{
            type: Component,
            args: [{
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'nz-calendar',
                    exportAs: 'nzCalendar',
                    template: `
    <nz-calendar-header
      [fullscreen]="nzFullscreen"
      [activeDate]="activeDate"
      [(mode)]="nzMode"
      (modeChange)="onModeChange($event)"
      (yearChange)="onYearSelect($event)"
      (monthChange)="onMonthSelect($event)"
    ></nz-calendar-header>

    <div class="ant-picker-panel">
      <div class="ant-picker-{{ nzMode === 'month' ? 'date' : 'month' }}-panel">
        <div class="ant-picker-body">
          <ng-container *ngIf="nzMode === 'month'; then monthModeTable; else yearModeTable"></ng-container>
        </div>
      </div>
    </div>
    <ng-template #monthModeTable>
      <!--  TODO(@wenqi73) [cellRender] [fullCellRender] -->
      <date-table
        [prefixCls]="prefixCls"
        [value]="activeDate"
        [activeDate]="activeDate"
        [cellRender]="$any(dateCell)"
        [fullCellRender]="$any(dateFullCell)"
        [disabledDate]="nzDisabledDate"
        (valueChange)="onDateSelect($event)"
      ></date-table>
    </ng-template>

    <!--  TODO(@wenqi73) [cellRender] [fullCellRender] -->
    <ng-template #yearModeTable>
      <month-table
        [prefixCls]="prefixCls"
        [value]="activeDate"
        [activeDate]="activeDate"
        [cellRender]="$any(monthCell)"
        [fullCellRender]="$any(monthFullCell)"
        (valueChange)="onDateSelect($event)"
      ></month-table>
    </ng-template>
  `,
                    host: {
                        class: 'ant-picker-calendar',
                        '[class.ant-picker-calendar-full]': 'nzFullscreen',
                        '[class.ant-picker-calendar-mini]': '!nzFullscreen',
                        '[class.ant-picker-calendar-rtl]': `dir === 'rtl'`
                    },
                    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NzCalendarComponent), multi: true }]
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1$1.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzMode: [{
                type: Input
            }], nzValue: [{
                type: Input
            }], nzDisabledDate: [{
                type: Input
            }], nzModeChange: [{
                type: Output
            }], nzPanelChange: [{
                type: Output
            }], nzSelectChange: [{
                type: Output
            }], nzValueChange: [{
                type: Output
            }], nzDateCell: [{
                type: Input
            }], nzDateCellChild: [{
                type: ContentChild,
                args: [NzDateCellDirective, { static: false, read: TemplateRef }]
            }], nzDateFullCell: [{
                type: Input
            }], nzDateFullCellChild: [{
                type: ContentChild,
                args: [NzDateFullCellDirective, { static: false, read: TemplateRef }]
            }], nzMonthCell: [{
                type: Input
            }], nzMonthCellChild: [{
                type: ContentChild,
                args: [NzMonthCellDirective, { static: false, read: TemplateRef }]
            }], nzMonthFullCell: [{
                type: Input
            }], nzMonthFullCellChild: [{
                type: ContentChild,
                args: [NzMonthFullCellDirective, { static: false, read: TemplateRef }]
            }], nzFullscreen: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCalendarModule {
}
NzCalendarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCalendarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzCalendarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCalendarModule, declarations: [NzCalendarHeaderComponent,
        NzCalendarComponent,
        NzDateCellDirective,
        NzDateFullCellDirective,
        NzMonthCellDirective,
        NzMonthFullCellDirective], imports: [BidiModule, CommonModule, FormsModule, NzI18nModule, NzRadioModule, NzSelectModule, LibPackerModule], exports: [NzCalendarComponent,
        NzDateCellDirective,
        NzDateFullCellDirective,
        NzMonthCellDirective,
        NzMonthFullCellDirective] });
NzCalendarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCalendarModule, imports: [[BidiModule, CommonModule, FormsModule, NzI18nModule, NzRadioModule, NzSelectModule, LibPackerModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCalendarModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NzCalendarHeaderComponent,
                        NzCalendarComponent,
                        NzDateCellDirective,
                        NzDateFullCellDirective,
                        NzMonthCellDirective,
                        NzMonthFullCellDirective
                    ],
                    exports: [
                        NzCalendarComponent,
                        NzDateCellDirective,
                        NzDateFullCellDirective,
                        NzMonthCellDirective,
                        NzMonthFullCellDirective
                    ],
                    imports: [BidiModule, CommonModule, FormsModule, NzI18nModule, NzRadioModule, NzSelectModule, LibPackerModule]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzCalendarComponent, NzCalendarHeaderComponent, NzCalendarModule, NzDateCellDirective, NzDateFullCellDirective, NzMonthCellDirective, NzMonthFullCellDirective };
//# sourceMappingURL=ng-zorro-antd-calendar.mjs.map
