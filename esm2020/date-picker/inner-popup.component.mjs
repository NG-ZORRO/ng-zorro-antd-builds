/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { PREFIX_CLASS } from './util';
import * as i0 from "@angular/core";
import * as i1 from "./lib/decade-header.component";
import * as i2 from "./lib/decade-table.component";
import * as i3 from "./lib/year-header.component";
import * as i4 from "./lib/year-table.component";
import * as i5 from "./lib/month-header.component";
import * as i6 from "./lib/month-table.component";
import * as i7 from "./lib/date-header.component";
import * as i8 from "./lib/date-table.component";
import * as i9 from "ng-zorro-antd/time-picker";
import * as i10 from "@angular/common";
import * as i11 from "@angular/forms";
export class InnerPopupComponent {
    constructor() {
        this.panelModeChange = new EventEmitter();
        // TODO: name is not proper
        this.headerChange = new EventEmitter(); // Emitted when user changed the header's value
        this.selectDate = new EventEmitter(); // Emitted when the date is selected by click the date panel
        this.selectTime = new EventEmitter();
        this.cellHover = new EventEmitter(); // Emitted when hover on a day by mouse enter
        this.prefixCls = PREFIX_CLASS;
    }
    /**
     * Hide "next" arrow in left panel,
     * hide "prev" arrow in right panel
     *
     * @param direction
     * @param panelMode
     */
    enablePrevNext(direction, panelMode) {
        return !(!this.showTimePicker &&
            panelMode === this.endPanelMode &&
            ((this.partType === 'left' && direction === 'next') || (this.partType === 'right' && direction === 'prev')));
    }
    onSelectTime(date) {
        this.selectTime.emit(new CandyDate(date));
    }
    // The value real changed to outside
    onSelectDate(date) {
        const value = date instanceof CandyDate ? date : new CandyDate(date);
        const timeValue = this.timeOptions && this.timeOptions.nzDefaultOpenValue;
        // Display timeValue when value is null
        if (!this.value && timeValue) {
            value.setHms(timeValue.getHours(), timeValue.getMinutes(), timeValue.getSeconds());
        }
        this.selectDate.emit(value);
    }
    onChooseMonth(value) {
        this.activeDate = this.activeDate.setMonth(value.getMonth());
        if (this.endPanelMode === 'month') {
            this.value = value;
            this.selectDate.emit(value);
        }
        else {
            this.headerChange.emit(value);
            this.panelModeChange.emit(this.endPanelMode);
        }
    }
    onChooseYear(value) {
        this.activeDate = this.activeDate.setYear(value.getYear());
        if (this.endPanelMode === 'year') {
            this.value = value;
            this.selectDate.emit(value);
        }
        else {
            this.headerChange.emit(value);
            this.panelModeChange.emit(this.endPanelMode);
        }
    }
    onChooseDecade(value) {
        this.activeDate = this.activeDate.setYear(value.getYear());
        if (this.endPanelMode === 'decade') {
            this.value = value;
            this.selectDate.emit(value);
        }
        else {
            this.headerChange.emit(value);
            this.panelModeChange.emit('year');
        }
    }
    ngOnChanges(changes) {
        if (changes.activeDate && !changes.activeDate.currentValue) {
            this.activeDate = new CandyDate();
        }
        // New Antd vesion has merged 'date' ant 'time' to one panel,
        // So there is not 'time' panel
        if (changes.panelMode && changes.panelMode.currentValue === 'time') {
            this.panelMode = 'date';
        }
    }
}
InnerPopupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: InnerPopupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
InnerPopupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: InnerPopupComponent, selector: "inner-popup", inputs: { activeDate: "activeDate", endPanelMode: "endPanelMode", panelMode: "panelMode", showWeek: "showWeek", locale: "locale", showTimePicker: "showTimePicker", timeOptions: "timeOptions", disabledDate: "disabledDate", dateRender: "dateRender", selectedValue: "selectedValue", hoverValue: "hoverValue", value: "value", partType: "partType" }, outputs: { panelModeChange: "panelModeChange", headerChange: "headerChange", selectDate: "selectDate", selectTime: "selectTime", cellHover: "cellHover" }, exportAs: ["innerPopup"], usesOnChanges: true, ngImport: i0, template: `
    <div [class.ant-picker-datetime-panel]="showTimePicker">
      <div class="{{ prefixCls }}-{{ panelMode }}-panel">
        <ng-container [ngSwitch]="panelMode">
          <ng-container *ngSwitchCase="'decade'">
            <decade-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'decade')"
              [showSuperNextBtn]="enablePrevNext('next', 'decade')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelModeChange)="panelModeChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            ></decade-header>
            <div class="{{ prefixCls }}-body">
              <decade-table
                [activeDate]="activeDate"
                [value]="value"
                [locale]="locale"
                (valueChange)="onChooseDecade($event)"
                [disabledDate]="disabledDate"
              ></decade-table>
            </div>
          </ng-container>
          <ng-container *ngSwitchCase="'year'">
            <year-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'year')"
              [showSuperNextBtn]="enablePrevNext('next', 'year')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelModeChange)="panelModeChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            ></year-header>
            <div class="{{ prefixCls }}-body">
              <year-table
                [activeDate]="activeDate"
                [value]="value"
                [locale]="locale"
                [disabledDate]="disabledDate"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                (valueChange)="onChooseYear($event)"
                (cellHover)="cellHover.emit($event)"
              ></year-table>
            </div>
          </ng-container>
          <ng-container *ngSwitchCase="'month'">
            <month-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'month')"
              [showSuperNextBtn]="enablePrevNext('next', 'month')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelModeChange)="panelModeChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            ></month-header>
            <div class="{{ prefixCls }}-body">
              <month-table
                [value]="value"
                [activeDate]="activeDate"
                [locale]="locale"
                [disabledDate]="disabledDate"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                (valueChange)="onChooseMonth($event)"
                (cellHover)="cellHover.emit($event)"
              ></month-table>
            </div>
          </ng-container>

          <ng-container *ngSwitchDefault>
            <date-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="showWeek ? enablePrevNext('prev', 'week') : enablePrevNext('prev', 'date')"
              [showSuperNextBtn]="showWeek ? enablePrevNext('next', 'week') : enablePrevNext('next', 'date')"
              [showPreBtn]="showWeek ? enablePrevNext('prev', 'week') : enablePrevNext('prev', 'date')"
              [showNextBtn]="showWeek ? enablePrevNext('next', 'week') : enablePrevNext('next', 'date')"
              (panelModeChange)="panelModeChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            ></date-header>
            <div class="{{ prefixCls }}-body">
              <date-table
                [locale]="locale"
                [showWeek]="showWeek"
                [value]="value"
                [activeDate]="activeDate"
                [disabledDate]="disabledDate"
                [cellRender]="dateRender"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                (valueChange)="onSelectDate($event)"
                (cellHover)="cellHover.emit($event)"
              ></date-table>
            </div>
          </ng-container>
        </ng-container>
      </div>
      <ng-container *ngIf="showTimePicker && timeOptions">
        <nz-time-picker-panel
          [nzInDatePicker]="true"
          [ngModel]="value?.nativeDate"
          (ngModelChange)="onSelectTime($event)"
          [format]="$any(timeOptions.nzFormat)"
          [nzHourStep]="$any(timeOptions.nzHourStep)"
          [nzMinuteStep]="$any(timeOptions.nzMinuteStep)"
          [nzSecondStep]="$any(timeOptions.nzSecondStep)"
          [nzDisabledHours]="$any(timeOptions.nzDisabledHours)"
          [nzDisabledMinutes]="$any(timeOptions.nzDisabledMinutes)"
          [nzDisabledSeconds]="$any(timeOptions.nzDisabledSeconds)"
          [nzHideDisabledOptions]="!!timeOptions.nzHideDisabledOptions"
          [nzDefaultOpenValue]="$any(timeOptions.nzDefaultOpenValue)"
          [nzUse12Hours]="!!timeOptions.nzUse12Hours"
          [nzAddOn]="$any(timeOptions.nzAddOn)"
        ></nz-time-picker-panel>
        <!-- use [opened] to trigger time panel 'initPosition()' -->
      </ng-container>
    </div>
  `, isInline: true, components: [{ type: i1.DecadeHeaderComponent, selector: "decade-header", exportAs: ["decadeHeader"] }, { type: i2.DecadeTableComponent, selector: "decade-table", exportAs: ["decadeTable"] }, { type: i3.YearHeaderComponent, selector: "year-header", exportAs: ["yearHeader"] }, { type: i4.YearTableComponent, selector: "year-table", exportAs: ["yearTable"] }, { type: i5.MonthHeaderComponent, selector: "month-header", exportAs: ["monthHeader"] }, { type: i6.MonthTableComponent, selector: "month-table", exportAs: ["monthTable"] }, { type: i7.DateHeaderComponent, selector: "date-header", exportAs: ["dateHeader"] }, { type: i8.DateTableComponent, selector: "date-table", inputs: ["locale"], exportAs: ["dateTable"] }, { type: i9.NzTimePickerPanelComponent, selector: "nz-time-picker-panel", inputs: ["nzInDatePicker", "nzAddOn", "nzHideDisabledOptions", "nzClearText", "nzNowText", "nzOkText", "nzPlaceHolder", "nzUse12Hours", "nzDefaultOpenValue", "nzAllowEmpty", "nzDisabledHours", "nzDisabledMinutes", "nzDisabledSeconds", "format", "nzHourStep", "nzMinuteStep", "nzSecondStep"], outputs: ["closePanel"], exportAs: ["nzTimePickerPanel"] }], directives: [{ type: i10.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i10.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i10.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { type: i10.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i11.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i11.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: InnerPopupComponent, decorators: [{
            type: Component,
            args: [{
                    // eslint-disable-next-line @angular-eslint/component-selector
                    selector: 'inner-popup',
                    exportAs: 'innerPopup',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <div [class.ant-picker-datetime-panel]="showTimePicker">
      <div class="{{ prefixCls }}-{{ panelMode }}-panel">
        <ng-container [ngSwitch]="panelMode">
          <ng-container *ngSwitchCase="'decade'">
            <decade-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'decade')"
              [showSuperNextBtn]="enablePrevNext('next', 'decade')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelModeChange)="panelModeChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            ></decade-header>
            <div class="{{ prefixCls }}-body">
              <decade-table
                [activeDate]="activeDate"
                [value]="value"
                [locale]="locale"
                (valueChange)="onChooseDecade($event)"
                [disabledDate]="disabledDate"
              ></decade-table>
            </div>
          </ng-container>
          <ng-container *ngSwitchCase="'year'">
            <year-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'year')"
              [showSuperNextBtn]="enablePrevNext('next', 'year')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelModeChange)="panelModeChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            ></year-header>
            <div class="{{ prefixCls }}-body">
              <year-table
                [activeDate]="activeDate"
                [value]="value"
                [locale]="locale"
                [disabledDate]="disabledDate"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                (valueChange)="onChooseYear($event)"
                (cellHover)="cellHover.emit($event)"
              ></year-table>
            </div>
          </ng-container>
          <ng-container *ngSwitchCase="'month'">
            <month-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'month')"
              [showSuperNextBtn]="enablePrevNext('next', 'month')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelModeChange)="panelModeChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            ></month-header>
            <div class="{{ prefixCls }}-body">
              <month-table
                [value]="value"
                [activeDate]="activeDate"
                [locale]="locale"
                [disabledDate]="disabledDate"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                (valueChange)="onChooseMonth($event)"
                (cellHover)="cellHover.emit($event)"
              ></month-table>
            </div>
          </ng-container>

          <ng-container *ngSwitchDefault>
            <date-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="showWeek ? enablePrevNext('prev', 'week') : enablePrevNext('prev', 'date')"
              [showSuperNextBtn]="showWeek ? enablePrevNext('next', 'week') : enablePrevNext('next', 'date')"
              [showPreBtn]="showWeek ? enablePrevNext('prev', 'week') : enablePrevNext('prev', 'date')"
              [showNextBtn]="showWeek ? enablePrevNext('next', 'week') : enablePrevNext('next', 'date')"
              (panelModeChange)="panelModeChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            ></date-header>
            <div class="{{ prefixCls }}-body">
              <date-table
                [locale]="locale"
                [showWeek]="showWeek"
                [value]="value"
                [activeDate]="activeDate"
                [disabledDate]="disabledDate"
                [cellRender]="dateRender"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                (valueChange)="onSelectDate($event)"
                (cellHover)="cellHover.emit($event)"
              ></date-table>
            </div>
          </ng-container>
        </ng-container>
      </div>
      <ng-container *ngIf="showTimePicker && timeOptions">
        <nz-time-picker-panel
          [nzInDatePicker]="true"
          [ngModel]="value?.nativeDate"
          (ngModelChange)="onSelectTime($event)"
          [format]="$any(timeOptions.nzFormat)"
          [nzHourStep]="$any(timeOptions.nzHourStep)"
          [nzMinuteStep]="$any(timeOptions.nzMinuteStep)"
          [nzSecondStep]="$any(timeOptions.nzSecondStep)"
          [nzDisabledHours]="$any(timeOptions.nzDisabledHours)"
          [nzDisabledMinutes]="$any(timeOptions.nzDisabledMinutes)"
          [nzDisabledSeconds]="$any(timeOptions.nzDisabledSeconds)"
          [nzHideDisabledOptions]="!!timeOptions.nzHideDisabledOptions"
          [nzDefaultOpenValue]="$any(timeOptions.nzDefaultOpenValue)"
          [nzUse12Hours]="!!timeOptions.nzUse12Hours"
          [nzAddOn]="$any(timeOptions.nzAddOn)"
        ></nz-time-picker-panel>
        <!-- use [opened] to trigger time panel 'initPosition()' -->
      </ng-container>
    </div>
  `
                }]
        }], propDecorators: { activeDate: [{
                type: Input
            }], endPanelMode: [{
                type: Input
            }], panelMode: [{
                type: Input
            }], showWeek: [{
                type: Input
            }], locale: [{
                type: Input
            }], showTimePicker: [{
                type: Input
            }], timeOptions: [{
                type: Input
            }], disabledDate: [{
                type: Input
            }], dateRender: [{
                type: Input
            }], selectedValue: [{
                type: Input
            }], hoverValue: [{
                type: Input
            }], value: [{
                type: Input
            }], partType: [{
                type: Input
            }], panelModeChange: [{
                type: Output
            }], headerChange: [{
                type: Output
            }], selectDate: [{
                type: Output
            }], selectTime: [{
                type: Output
            }], cellHover: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5uZXItcG9wdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9kYXRlLXBpY2tlci9pbm5lci1wb3B1cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBR04saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUtwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sUUFBUSxDQUFDOzs7Ozs7Ozs7Ozs7O0FBb0l0QyxNQUFNLE9BQU8sbUJBQW1CO0lBbEloQztRQWlKcUIsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBQ3BFLDJCQUEyQjtRQUNSLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQWEsQ0FBQyxDQUFDLCtDQUErQztRQUM3RixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQWEsQ0FBQyxDQUFDLDREQUE0RDtRQUN4RyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQWEsQ0FBQztRQUMzQyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQWEsQ0FBQyxDQUFDLDZDQUE2QztRQUUzRyxjQUFTLEdBQVcsWUFBWSxDQUFDO0tBNkVsQztJQTNFQzs7Ozs7O09BTUc7SUFDSCxjQUFjLENBQUMsU0FBMEIsRUFBRSxTQUFxQjtRQUM5RCxPQUFPLENBQUMsQ0FDTixDQUFDLElBQUksQ0FBQyxjQUFjO1lBQ3BCLFNBQVMsS0FBSyxJQUFJLENBQUMsWUFBWTtZQUMvQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxNQUFNLElBQUksU0FBUyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxPQUFPLElBQUksU0FBUyxLQUFLLE1BQU0sQ0FB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O3NCQUFiLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFFYSxlQUFlO3NCQUFqQyxNQUFNO2dCQUVZLFlBQVk7c0JBQTlCLE1BQU07Z0JBQ1ksVUFBVTtzQkFBNUIsTUFBTTtnQkFDWSxVQUFVO3NCQUE1QixNQUFNO2dCQUNZLFNBQVM7c0JBQTNCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDYW5keURhdGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdGltZSc7XG5pbXBvcnQgeyBGdW5jdGlvblByb3AgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgTnpDYWxlbmRhckkxOG5JbnRlcmZhY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuXG5pbXBvcnQgeyBEaXNhYmxlZERhdGVGbiwgTnpEYXRlTW9kZSwgUmFuZ2VQYXJ0VHlwZSwgU3VwcG9ydFRpbWVPcHRpb25zIH0gZnJvbSAnLi9zdGFuZGFyZC10eXBlcyc7XG5pbXBvcnQgeyBQUkVGSVhfQ0xBU1MgfSBmcm9tICcuL3V0aWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9jb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdpbm5lci1wb3B1cCcsXG4gIGV4cG9ydEFzOiAnaW5uZXJQb3B1cCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzLmFudC1waWNrZXItZGF0ZXRpbWUtcGFuZWxdPVwic2hvd1RpbWVQaWNrZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ7eyBwcmVmaXhDbHMgfX0te3sgcGFuZWxNb2RlIH19LXBhbmVsXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cInBhbmVsTW9kZVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIidkZWNhZGUnXCI+XG4gICAgICAgICAgICA8ZGVjYWRlLWhlYWRlclxuICAgICAgICAgICAgICBbKHZhbHVlKV09XCJhY3RpdmVEYXRlXCJcbiAgICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICAgICAgICBbc2hvd1N1cGVyUHJlQnRuXT1cImVuYWJsZVByZXZOZXh0KCdwcmV2JywgJ2RlY2FkZScpXCJcbiAgICAgICAgICAgICAgW3Nob3dTdXBlck5leHRCdG5dPVwiZW5hYmxlUHJldk5leHQoJ25leHQnLCAnZGVjYWRlJylcIlxuICAgICAgICAgICAgICBbc2hvd05leHRCdG5dPVwiZmFsc2VcIlxuICAgICAgICAgICAgICBbc2hvd1ByZUJ0bl09XCJmYWxzZVwiXG4gICAgICAgICAgICAgIChwYW5lbE1vZGVDaGFuZ2UpPVwicGFuZWxNb2RlQ2hhbmdlLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICh2YWx1ZUNoYW5nZSk9XCJoZWFkZXJDaGFuZ2UuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgID48L2RlY2FkZS1oZWFkZXI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwie3sgcHJlZml4Q2xzIH19LWJvZHlcIj5cbiAgICAgICAgICAgICAgPGRlY2FkZS10YWJsZVxuICAgICAgICAgICAgICAgIFthY3RpdmVEYXRlXT1cImFjdGl2ZURhdGVcIlxuICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICAgICAgICAgICh2YWx1ZUNoYW5nZSk9XCJvbkNob29zZURlY2FkZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWREYXRlXT1cImRpc2FibGVkRGF0ZVwiXG4gICAgICAgICAgICAgID48L2RlY2FkZS10YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIid5ZWFyJ1wiPlxuICAgICAgICAgICAgPHllYXItaGVhZGVyXG4gICAgICAgICAgICAgIFsodmFsdWUpXT1cImFjdGl2ZURhdGVcIlxuICAgICAgICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICAgICAgICAgIFtzaG93U3VwZXJQcmVCdG5dPVwiZW5hYmxlUHJldk5leHQoJ3ByZXYnLCAneWVhcicpXCJcbiAgICAgICAgICAgICAgW3Nob3dTdXBlck5leHRCdG5dPVwiZW5hYmxlUHJldk5leHQoJ25leHQnLCAneWVhcicpXCJcbiAgICAgICAgICAgICAgW3Nob3dOZXh0QnRuXT1cImZhbHNlXCJcbiAgICAgICAgICAgICAgW3Nob3dQcmVCdG5dPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAocGFuZWxNb2RlQ2hhbmdlKT1cInBhbmVsTW9kZUNoYW5nZS5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgICAodmFsdWVDaGFuZ2UpPVwiaGVhZGVyQ2hhbmdlLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICA+PC95ZWFyLWhlYWRlcj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ7eyBwcmVmaXhDbHMgfX0tYm9keVwiPlxuICAgICAgICAgICAgICA8eWVhci10YWJsZVxuICAgICAgICAgICAgICAgIFthY3RpdmVEYXRlXT1cImFjdGl2ZURhdGVcIlxuICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZERhdGVdPVwiZGlzYWJsZWREYXRlXCJcbiAgICAgICAgICAgICAgICBbc2VsZWN0ZWRWYWx1ZV09XCJzZWxlY3RlZFZhbHVlXCJcbiAgICAgICAgICAgICAgICBbaG92ZXJWYWx1ZV09XCJob3ZlclZhbHVlXCJcbiAgICAgICAgICAgICAgICAodmFsdWVDaGFuZ2UpPVwib25DaG9vc2VZZWFyKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChjZWxsSG92ZXIpPVwiY2VsbEhvdmVyLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgID48L3llYXItdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCInbW9udGgnXCI+XG4gICAgICAgICAgICA8bW9udGgtaGVhZGVyXG4gICAgICAgICAgICAgIFsodmFsdWUpXT1cImFjdGl2ZURhdGVcIlxuICAgICAgICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICAgICAgICAgIFtzaG93U3VwZXJQcmVCdG5dPVwiZW5hYmxlUHJldk5leHQoJ3ByZXYnLCAnbW9udGgnKVwiXG4gICAgICAgICAgICAgIFtzaG93U3VwZXJOZXh0QnRuXT1cImVuYWJsZVByZXZOZXh0KCduZXh0JywgJ21vbnRoJylcIlxuICAgICAgICAgICAgICBbc2hvd05leHRCdG5dPVwiZmFsc2VcIlxuICAgICAgICAgICAgICBbc2hvd1ByZUJ0bl09XCJmYWxzZVwiXG4gICAgICAgICAgICAgIChwYW5lbE1vZGVDaGFuZ2UpPVwicGFuZWxNb2RlQ2hhbmdlLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICh2YWx1ZUNoYW5nZSk9XCJoZWFkZXJDaGFuZ2UuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgID48L21vbnRoLWhlYWRlcj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ7eyBwcmVmaXhDbHMgfX0tYm9keVwiPlxuICAgICAgICAgICAgICA8bW9udGgtdGFibGVcbiAgICAgICAgICAgICAgICBbdmFsdWVdPVwidmFsdWVcIlxuICAgICAgICAgICAgICAgIFthY3RpdmVEYXRlXT1cImFjdGl2ZURhdGVcIlxuICAgICAgICAgICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWREYXRlXT1cImRpc2FibGVkRGF0ZVwiXG4gICAgICAgICAgICAgICAgW3NlbGVjdGVkVmFsdWVdPVwic2VsZWN0ZWRWYWx1ZVwiXG4gICAgICAgICAgICAgICAgW2hvdmVyVmFsdWVdPVwiaG92ZXJWYWx1ZVwiXG4gICAgICAgICAgICAgICAgKHZhbHVlQ2hhbmdlKT1cIm9uQ2hvb3NlTW9udGgoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGNlbGxIb3Zlcik9XCJjZWxsSG92ZXIuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgPjwvbW9udGgtdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoRGVmYXVsdD5cbiAgICAgICAgICAgIDxkYXRlLWhlYWRlclxuICAgICAgICAgICAgICBbKHZhbHVlKV09XCJhY3RpdmVEYXRlXCJcbiAgICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICAgICAgICBbc2hvd1N1cGVyUHJlQnRuXT1cInNob3dXZWVrID8gZW5hYmxlUHJldk5leHQoJ3ByZXYnLCAnd2VlaycpIDogZW5hYmxlUHJldk5leHQoJ3ByZXYnLCAnZGF0ZScpXCJcbiAgICAgICAgICAgICAgW3Nob3dTdXBlck5leHRCdG5dPVwic2hvd1dlZWsgPyBlbmFibGVQcmV2TmV4dCgnbmV4dCcsICd3ZWVrJykgOiBlbmFibGVQcmV2TmV4dCgnbmV4dCcsICdkYXRlJylcIlxuICAgICAgICAgICAgICBbc2hvd1ByZUJ0bl09XCJzaG93V2VlayA/IGVuYWJsZVByZXZOZXh0KCdwcmV2JywgJ3dlZWsnKSA6IGVuYWJsZVByZXZOZXh0KCdwcmV2JywgJ2RhdGUnKVwiXG4gICAgICAgICAgICAgIFtzaG93TmV4dEJ0bl09XCJzaG93V2VlayA/IGVuYWJsZVByZXZOZXh0KCduZXh0JywgJ3dlZWsnKSA6IGVuYWJsZVByZXZOZXh0KCduZXh0JywgJ2RhdGUnKVwiXG4gICAgICAgICAgICAgIChwYW5lbE1vZGVDaGFuZ2UpPVwicGFuZWxNb2RlQ2hhbmdlLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICh2YWx1ZUNoYW5nZSk9XCJoZWFkZXJDaGFuZ2UuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgID48L2RhdGUtaGVhZGVyPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInt7IHByZWZpeENscyB9fS1ib2R5XCI+XG4gICAgICAgICAgICAgIDxkYXRlLXRhYmxlXG4gICAgICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICAgICAgICAgIFtzaG93V2Vla109XCJzaG93V2Vla1wiXG4gICAgICAgICAgICAgICAgW3ZhbHVlXT1cInZhbHVlXCJcbiAgICAgICAgICAgICAgICBbYWN0aXZlRGF0ZV09XCJhY3RpdmVEYXRlXCJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWREYXRlXT1cImRpc2FibGVkRGF0ZVwiXG4gICAgICAgICAgICAgICAgW2NlbGxSZW5kZXJdPVwiZGF0ZVJlbmRlclwiXG4gICAgICAgICAgICAgICAgW3NlbGVjdGVkVmFsdWVdPVwic2VsZWN0ZWRWYWx1ZVwiXG4gICAgICAgICAgICAgICAgW2hvdmVyVmFsdWVdPVwiaG92ZXJWYWx1ZVwiXG4gICAgICAgICAgICAgICAgKHZhbHVlQ2hhbmdlKT1cIm9uU2VsZWN0RGF0ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoY2VsbEhvdmVyKT1cImNlbGxIb3Zlci5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgICA+PC9kYXRlLXRhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic2hvd1RpbWVQaWNrZXIgJiYgdGltZU9wdGlvbnNcIj5cbiAgICAgICAgPG56LXRpbWUtcGlja2VyLXBhbmVsXG4gICAgICAgICAgW256SW5EYXRlUGlja2VyXT1cInRydWVcIlxuICAgICAgICAgIFtuZ01vZGVsXT1cInZhbHVlPy5uYXRpdmVEYXRlXCJcbiAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJvblNlbGVjdFRpbWUoJGV2ZW50KVwiXG4gICAgICAgICAgW2Zvcm1hdF09XCIkYW55KHRpbWVPcHRpb25zLm56Rm9ybWF0KVwiXG4gICAgICAgICAgW256SG91clN0ZXBdPVwiJGFueSh0aW1lT3B0aW9ucy5uekhvdXJTdGVwKVwiXG4gICAgICAgICAgW256TWludXRlU3RlcF09XCIkYW55KHRpbWVPcHRpb25zLm56TWludXRlU3RlcClcIlxuICAgICAgICAgIFtuelNlY29uZFN0ZXBdPVwiJGFueSh0aW1lT3B0aW9ucy5uelNlY29uZFN0ZXApXCJcbiAgICAgICAgICBbbnpEaXNhYmxlZEhvdXJzXT1cIiRhbnkodGltZU9wdGlvbnMubnpEaXNhYmxlZEhvdXJzKVwiXG4gICAgICAgICAgW256RGlzYWJsZWRNaW51dGVzXT1cIiRhbnkodGltZU9wdGlvbnMubnpEaXNhYmxlZE1pbnV0ZXMpXCJcbiAgICAgICAgICBbbnpEaXNhYmxlZFNlY29uZHNdPVwiJGFueSh0aW1lT3B0aW9ucy5uekRpc2FibGVkU2Vjb25kcylcIlxuICAgICAgICAgIFtuekhpZGVEaXNhYmxlZE9wdGlvbnNdPVwiISF0aW1lT3B0aW9ucy5uekhpZGVEaXNhYmxlZE9wdGlvbnNcIlxuICAgICAgICAgIFtuekRlZmF1bHRPcGVuVmFsdWVdPVwiJGFueSh0aW1lT3B0aW9ucy5uekRlZmF1bHRPcGVuVmFsdWUpXCJcbiAgICAgICAgICBbbnpVc2UxMkhvdXJzXT1cIiEhdGltZU9wdGlvbnMubnpVc2UxMkhvdXJzXCJcbiAgICAgICAgICBbbnpBZGRPbl09XCIkYW55KHRpbWVPcHRpb25zLm56QWRkT24pXCJcbiAgICAgICAgPjwvbnotdGltZS1waWNrZXItcGFuZWw+XG4gICAgICAgIDwhLS0gdXNlIFtvcGVuZWRdIHRvIHRyaWdnZXIgdGltZSBwYW5lbCAnaW5pdFBvc2l0aW9uKCknIC0tPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgSW5uZXJQb3B1cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGFjdGl2ZURhdGUhOiBDYW5keURhdGU7XG4gIEBJbnB1dCgpIGVuZFBhbmVsTW9kZSE6IE56RGF0ZU1vZGU7XG4gIEBJbnB1dCgpIHBhbmVsTW9kZSE6IE56RGF0ZU1vZGU7XG4gIEBJbnB1dCgpIHNob3dXZWVrITogYm9vbGVhbjtcbiAgQElucHV0KCkgbG9jYWxlITogTnpDYWxlbmRhckkxOG5JbnRlcmZhY2U7XG4gIEBJbnB1dCgpIHNob3dUaW1lUGlja2VyITogYm9vbGVhbjtcbiAgQElucHV0KCkgdGltZU9wdGlvbnMhOiBTdXBwb3J0VGltZU9wdGlvbnMgfCBudWxsO1xuICBASW5wdXQoKSBkaXNhYmxlZERhdGU/OiBEaXNhYmxlZERhdGVGbjtcbiAgQElucHV0KCkgZGF0ZVJlbmRlcj86IHN0cmluZyB8IFRlbXBsYXRlUmVmPERhdGU+IHwgRnVuY3Rpb25Qcm9wPFRlbXBsYXRlUmVmPERhdGU+IHwgc3RyaW5nPjtcbiAgQElucHV0KCkgc2VsZWN0ZWRWYWx1ZSE6IENhbmR5RGF0ZVtdOyAvLyBSYW5nZSBPTkxZXG4gIEBJbnB1dCgpIGhvdmVyVmFsdWUhOiBDYW5keURhdGVbXTsgLy8gUmFuZ2UgT05MWVxuICBASW5wdXQoKSB2YWx1ZSE6IENhbmR5RGF0ZTtcbiAgQElucHV0KCkgcGFydFR5cGUhOiBSYW5nZVBhcnRUeXBlO1xuXG4gIEBPdXRwdXQoKSByZWFkb25seSBwYW5lbE1vZGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE56RGF0ZU1vZGU+KCk7XG4gIC8vIFRPRE86IG5hbWUgaXMgbm90IHByb3BlclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgaGVhZGVyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDYW5keURhdGU+KCk7IC8vIEVtaXR0ZWQgd2hlbiB1c2VyIGNoYW5nZWQgdGhlIGhlYWRlcidzIHZhbHVlXG4gIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3REYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxDYW5keURhdGU+KCk7IC8vIEVtaXR0ZWQgd2hlbiB0aGUgZGF0ZSBpcyBzZWxlY3RlZCBieSBjbGljayB0aGUgZGF0ZSBwYW5lbFxuICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0VGltZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FuZHlEYXRlPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2VsbEhvdmVyID0gbmV3IEV2ZW50RW1pdHRlcjxDYW5keURhdGU+KCk7IC8vIEVtaXR0ZWQgd2hlbiBob3ZlciBvbiBhIGRheSBieSBtb3VzZSBlbnRlclxuXG4gIHByZWZpeENsczogc3RyaW5nID0gUFJFRklYX0NMQVNTO1xuXG4gIC8qKlxuICAgKiBIaWRlIFwibmV4dFwiIGFycm93IGluIGxlZnQgcGFuZWwsXG4gICAqIGhpZGUgXCJwcmV2XCIgYXJyb3cgaW4gcmlnaHQgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gcGFuZWxNb2RlXG4gICAqL1xuICBlbmFibGVQcmV2TmV4dChkaXJlY3Rpb246ICdwcmV2JyB8ICduZXh0JywgcGFuZWxNb2RlOiBOekRhdGVNb2RlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEoXG4gICAgICAhdGhpcy5zaG93VGltZVBpY2tlciAmJlxuICAgICAgcGFuZWxNb2RlID09PSB0aGlzLmVuZFBhbmVsTW9kZSAmJlxuICAgICAgKCh0aGlzLnBhcnRUeXBlID09PSAnbGVmdCcgJiYgZGlyZWN0aW9uID09PSAnbmV4dCcpIHx8ICh0aGlzLnBhcnRUeXBlID09PSAncmlnaHQnICYmIGRpcmVjdGlvbiA9PT0gJ3ByZXYnKSlcbiAgICApO1xuICB9XG5cbiAgb25TZWxlY3RUaW1lKGRhdGU6IERhdGUpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdFRpbWUuZW1pdChuZXcgQ2FuZHlEYXRlKGRhdGUpKTtcbiAgfVxuXG4gIC8vIFRoZSB2YWx1ZSByZWFsIGNoYW5nZWQgdG8gb3V0c2lkZVxuICBvblNlbGVjdERhdGUoZGF0ZTogQ2FuZHlEYXRlIHwgRGF0ZSk6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlID0gZGF0ZSBpbnN0YW5jZW9mIENhbmR5RGF0ZSA/IGRhdGUgOiBuZXcgQ2FuZHlEYXRlKGRhdGUpO1xuICAgIGNvbnN0IHRpbWVWYWx1ZSA9IHRoaXMudGltZU9wdGlvbnMgJiYgdGhpcy50aW1lT3B0aW9ucy5uekRlZmF1bHRPcGVuVmFsdWU7XG5cbiAgICAvLyBEaXNwbGF5IHRpbWVWYWx1ZSB3aGVuIHZhbHVlIGlzIG51bGxcbiAgICBpZiAoIXRoaXMudmFsdWUgJiYgdGltZVZhbHVlKSB7XG4gICAgICB2YWx1ZS5zZXRIbXModGltZVZhbHVlLmdldEhvdXJzKCksIHRpbWVWYWx1ZS5nZXRNaW51dGVzKCksIHRpbWVWYWx1ZS5nZXRTZWNvbmRzKCkpO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0RGF0ZS5lbWl0KHZhbHVlKTtcbiAgfVxuXG4gIG9uQ2hvb3NlTW9udGgodmFsdWU6IENhbmR5RGF0ZSk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuYWN0aXZlRGF0ZS5zZXRNb250aCh2YWx1ZS5nZXRNb250aCgpKTtcbiAgICBpZiAodGhpcy5lbmRQYW5lbE1vZGUgPT09ICdtb250aCcpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuc2VsZWN0RGF0ZS5lbWl0KHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oZWFkZXJDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgICB0aGlzLnBhbmVsTW9kZUNoYW5nZS5lbWl0KHRoaXMuZW5kUGFuZWxNb2RlKTtcbiAgICB9XG4gIH1cblxuICBvbkNob29zZVllYXIodmFsdWU6IENhbmR5RGF0ZSk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuYWN0aXZlRGF0ZS5zZXRZZWFyKHZhbHVlLmdldFllYXIoKSk7XG4gICAgaWYgKHRoaXMuZW5kUGFuZWxNb2RlID09PSAneWVhcicpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuc2VsZWN0RGF0ZS5lbWl0KHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oZWFkZXJDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgICB0aGlzLnBhbmVsTW9kZUNoYW5nZS5lbWl0KHRoaXMuZW5kUGFuZWxNb2RlKTtcbiAgICB9XG4gIH1cblxuICBvbkNob29zZURlY2FkZSh2YWx1ZTogQ2FuZHlEYXRlKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5hY3RpdmVEYXRlLnNldFllYXIodmFsdWUuZ2V0WWVhcigpKTtcbiAgICBpZiAodGhpcy5lbmRQYW5lbE1vZGUgPT09ICdkZWNhZGUnKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLnNlbGVjdERhdGUuZW1pdCh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGVhZGVyQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgICAgdGhpcy5wYW5lbE1vZGVDaGFuZ2UuZW1pdCgneWVhcicpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5hY3RpdmVEYXRlICYmICFjaGFuZ2VzLmFjdGl2ZURhdGUuY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLmFjdGl2ZURhdGUgPSBuZXcgQ2FuZHlEYXRlKCk7XG4gICAgfVxuICAgIC8vIE5ldyBBbnRkIHZlc2lvbiBoYXMgbWVyZ2VkICdkYXRlJyBhbnQgJ3RpbWUnIHRvIG9uZSBwYW5lbCxcbiAgICAvLyBTbyB0aGVyZSBpcyBub3QgJ3RpbWUnIHBhbmVsXG4gICAgaWYgKGNoYW5nZXMucGFuZWxNb2RlICYmIGNoYW5nZXMucGFuZWxNb2RlLmN1cnJlbnRWYWx1ZSA9PT0gJ3RpbWUnKSB7XG4gICAgICB0aGlzLnBhbmVsTW9kZSA9ICdkYXRlJztcbiAgICB9XG4gIH1cbn1cbiJdfQ==