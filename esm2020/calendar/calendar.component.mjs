import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, forwardRef, Input, Optional, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzDateCellDirective as DateCell, NzDateFullCellDirective as DateFullCell, NzMonthCellDirective as MonthCell, NzMonthFullCellDirective as MonthFullCell } from './calendar-cells';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
import * as i2 from "./calendar-header.component";
import * as i3 from "ng-zorro-antd/date-picker";
import * as i4 from "@angular/common";
export class NzCalendarComponent {
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
NzCalendarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCalendarComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzCalendarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzCalendarComponent, selector: "nz-calendar", inputs: { nzMode: "nzMode", nzValue: "nzValue", nzDisabledDate: "nzDisabledDate", nzDateCell: "nzDateCell", nzDateFullCell: "nzDateFullCell", nzMonthCell: "nzMonthCell", nzMonthFullCell: "nzMonthFullCell", nzFullscreen: "nzFullscreen" }, outputs: { nzModeChange: "nzModeChange", nzPanelChange: "nzPanelChange", nzSelectChange: "nzSelectChange", nzValueChange: "nzValueChange" }, host: { properties: { "class.ant-picker-calendar-full": "nzFullscreen", "class.ant-picker-calendar-mini": "!nzFullscreen", "class.ant-picker-calendar-rtl": "dir === 'rtl'" }, classAttribute: "ant-picker-calendar" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NzCalendarComponent), multi: true }], queries: [{ propertyName: "nzDateCellChild", first: true, predicate: DateCell, descendants: true, read: TemplateRef }, { propertyName: "nzDateFullCellChild", first: true, predicate: DateFullCell, descendants: true, read: TemplateRef }, { propertyName: "nzMonthCellChild", first: true, predicate: MonthCell, descendants: true, read: TemplateRef }, { propertyName: "nzMonthFullCellChild", first: true, predicate: MonthFullCell, descendants: true, read: TemplateRef }], exportAs: ["nzCalendar"], usesOnChanges: true, ngImport: i0, template: `
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
  `, isInline: true, components: [{ type: i2.NzCalendarHeaderComponent, selector: "nz-calendar-header", inputs: ["mode", "fullscreen", "activeDate"], outputs: ["modeChange", "yearChange", "monthChange"], exportAs: ["nzCalendarHeader"] }, { type: i3.ɵDateTableComponent, selector: "date-table", inputs: ["locale"], exportAs: ["dateTable"] }, { type: i3.ɵMonthTableComponent, selector: "month-table", exportAs: ["monthTable"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
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
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.Directionality, decorators: [{
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
                args: [DateCell, { static: false, read: TemplateRef }]
            }], nzDateFullCell: [{
                type: Input
            }], nzDateFullCellChild: [{
                type: ContentChild,
                args: [DateFullCell, { static: false, read: TemplateRef }]
            }], nzMonthCell: [{
                type: Input
            }], nzMonthCellChild: [{
                type: ContentChild,
                args: [MonthCell, { static: false, read: TemplateRef }]
            }], nzMonthFullCell: [{
                type: Input
            }], nzMonthFullCellChild: [{
                type: ContentChild,
                args: [MonthFullCell, { static: false, read: TemplateRef }]
            }], nzFullscreen: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9jYWxlbmRhci9jYWxlbmRhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFJTCxRQUFRLEVBQ1IsTUFBTSxFQUVOLFdBQVcsRUFDWCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUNMLG1CQUFtQixJQUFJLFFBQVEsRUFDL0IsdUJBQXVCLElBQUksWUFBWSxFQUN2QyxvQkFBb0IsSUFBSSxTQUFTLEVBQ2pDLHdCQUF3QixJQUFJLGFBQWEsRUFDMUMsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7O0FBNEQxQixNQUFNLE9BQU8sbUJBQW1CO0lBa0Q5QixZQUFvQixHQUFzQixFQUFzQixjQUE4QjtRQUExRSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUFzQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUEvQzlGLGVBQVUsR0FBYyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQ3hDLGNBQVMsR0FBVyxxQkFBcUIsQ0FBQztRQUNsQyxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUN2QyxRQUFHLEdBQWMsS0FBSyxDQUFDO1FBRWYsZUFBVSxHQUF5QixHQUFHLEVBQUUsR0FBRSxD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QW9CO3NCQUF0RixZQUFZO3VCQUFDLGFBQWEsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtnQkFLeEMsWUFBWTtzQkFBcEMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IENhbmR5RGF0ZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90aW1lJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7XG4gIE56RGF0ZUNlbGxEaXJlY3RpdmUgYXMgRGF0ZUNlbGwsXG4gIE56RGF0ZUZ1bGxDZWxsRGlyZWN0aXZlIGFzIERhdGVGdWxsQ2VsbCxcbiAgTnpNb250aENlbGxEaXJlY3RpdmUgYXMgTW9udGhDZWxsLFxuICBOek1vbnRoRnVsbENlbGxEaXJlY3RpdmUgYXMgTW9udGhGdWxsQ2VsbFxufSBmcm9tICcuL2NhbGVuZGFyLWNlbGxzJztcblxuZXhwb3J0IHR5cGUgTnpDYWxlbmRhck1vZGUgPSAnbW9udGgnIHwgJ3llYXInO1xudHlwZSBOekNhbGVuZGFyRGF0ZVRlbXBsYXRlID0gVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IERhdGUgfT47XG5cbkBDb21wb25lbnQoe1xuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc2VsZWN0b3I6ICduei1jYWxlbmRhcicsXG4gIGV4cG9ydEFzOiAnbnpDYWxlbmRhcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG56LWNhbGVuZGFyLWhlYWRlclxuICAgICAgW2Z1bGxzY3JlZW5dPVwibnpGdWxsc2NyZWVuXCJcbiAgICAgIFthY3RpdmVEYXRlXT1cImFjdGl2ZURhdGVcIlxuICAgICAgWyhtb2RlKV09XCJuek1vZGVcIlxuICAgICAgKG1vZGVDaGFuZ2UpPVwib25Nb2RlQ2hhbmdlKCRldmVudClcIlxuICAgICAgKHllYXJDaGFuZ2UpPVwib25ZZWFyU2VsZWN0KCRldmVudClcIlxuICAgICAgKG1vbnRoQ2hhbmdlKT1cIm9uTW9udGhTZWxlY3QoJGV2ZW50KVwiXG4gICAgPjwvbnotY2FsZW5kYXItaGVhZGVyPlxuXG4gICAgPGRpdiBjbGFzcz1cImFudC1waWNrZXItcGFuZWxcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhbnQtcGlja2VyLXt7IG56TW9kZSA9PT0gJ21vbnRoJyA/ICdkYXRlJyA6ICdtb250aCcgfX0tcGFuZWxcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC1waWNrZXItYm9keVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJuek1vZGUgPT09ICdtb250aCc7IHRoZW4gbW9udGhNb2RlVGFibGU7IGVsc2UgeWVhck1vZGVUYWJsZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxuZy10ZW1wbGF0ZSAjbW9udGhNb2RlVGFibGU+XG4gICAgICA8IS0tICBUT0RPKEB3ZW5xaTczKSBbY2VsbFJlbmRlcl0gW2Z1bGxDZWxsUmVuZGVyXSAtLT5cbiAgICAgIDxkYXRlLXRhYmxlXG4gICAgICAgIFtwcmVmaXhDbHNdPVwicHJlZml4Q2xzXCJcbiAgICAgICAgW3ZhbHVlXT1cImFjdGl2ZURhdGVcIlxuICAgICAgICBbYWN0aXZlRGF0ZV09XCJhY3RpdmVEYXRlXCJcbiAgICAgICAgW2NlbGxSZW5kZXJdPVwiJGFueShkYXRlQ2VsbClcIlxuICAgICAgICBbZnVsbENlbGxSZW5kZXJdPVwiJGFueShkYXRlRnVsbENlbGwpXCJcbiAgICAgICAgW2Rpc2FibGVkRGF0ZV09XCJuekRpc2FibGVkRGF0ZVwiXG4gICAgICAgICh2YWx1ZUNoYW5nZSk9XCJvbkRhdGVTZWxlY3QoJGV2ZW50KVwiXG4gICAgICA+PC9kYXRlLXRhYmxlPlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8IS0tICBUT0RPKEB3ZW5xaTczKSBbY2VsbFJlbmRlcl0gW2Z1bGxDZWxsUmVuZGVyXSAtLT5cbiAgICA8bmctdGVtcGxhdGUgI3llYXJNb2RlVGFibGU+XG4gICAgICA8bW9udGgtdGFibGVcbiAgICAgICAgW3ByZWZpeENsc109XCJwcmVmaXhDbHNcIlxuICAgICAgICBbdmFsdWVdPVwiYWN0aXZlRGF0ZVwiXG4gICAgICAgIFthY3RpdmVEYXRlXT1cImFjdGl2ZURhdGVcIlxuICAgICAgICBbY2VsbFJlbmRlcl09XCIkYW55KG1vbnRoQ2VsbClcIlxuICAgICAgICBbZnVsbENlbGxSZW5kZXJdPVwiJGFueShtb250aEZ1bGxDZWxsKVwiXG4gICAgICAgICh2YWx1ZUNoYW5nZSk9XCJvbkRhdGVTZWxlY3QoJGV2ZW50KVwiXG4gICAgICA+PC9tb250aC10YWJsZT5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtcGlja2VyLWNhbGVuZGFyJyxcbiAgICAnW2NsYXNzLmFudC1waWNrZXItY2FsZW5kYXItZnVsbF0nOiAnbnpGdWxsc2NyZWVuJyxcbiAgICAnW2NsYXNzLmFudC1waWNrZXItY2FsZW5kYXItbWluaV0nOiAnIW56RnVsbHNjcmVlbicsXG4gICAgJ1tjbGFzcy5hbnQtcGlja2VyLWNhbGVuZGFyLXJ0bF0nOiBgZGlyID09PSAncnRsJ2BcbiAgfSxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUiwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnpDYWxlbmRhckNvbXBvbmVudCksIG11bHRpOiB0cnVlIH1dXG59KVxuZXhwb3J0IGNsYXNzIE56Q2FsZW5kYXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekZ1bGxzY3JlZW46IEJvb2xlYW5JbnB1dDtcblxuICBhY3RpdmVEYXRlOiBDYW5keURhdGUgPSBuZXcgQ2FuZHlEYXRlKCk7XG4gIHByZWZpeENsczogc3RyaW5nID0gJ2FudC1waWNrZXItY2FsZW5kYXInO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgZGlyOiBEaXJlY3Rpb24gPSAnbHRyJztcblxuICBwcml2YXRlIG9uQ2hhbmdlRm46IChkYXRlOiBEYXRlKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIHByaXZhdGUgb25Ub3VjaEZuOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgQElucHV0KCkgbnpNb2RlOiBOekNhbGVuZGFyTW9kZSA9ICdtb250aCc7XG4gIEBJbnB1dCgpIG56VmFsdWU/OiBEYXRlO1xuICBASW5wdXQoKSBuekRpc2FibGVkRGF0ZT86IChkYXRlOiBEYXRlKSA9PiBib29sZWFuO1xuXG4gIEBPdXRwdXQoKSByZWFkb25seSBuek1vZGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxOekNhbGVuZGFyTW9kZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuelBhbmVsQ2hhbmdlOiBFdmVudEVtaXR0ZXI8eyBkYXRlOiBEYXRlOyBtb2RlOiBOekNhbGVuZGFyTW9kZSB9PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56U2VsZWN0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuelZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIENhbm5vdCB1c2UgQElucHV0IGFuZCBAQ29udGVudENoaWxkIG9uIG9uZSB2YXJpYWJsZVxuICAgKiBiZWNhdXNlIHsgc3RhdGljOiBmYWxzZSB9IHdpbGwgbWFrZSBASW5wdXQgcHJvcGVydHkgZ2V0IGRlbGF5ZWRcbiAgICoqL1xuICBASW5wdXQoKSBuekRhdGVDZWxsPzogTnpDYWxlbmRhckRhdGVUZW1wbGF0ZTtcbiAgQENvbnRlbnRDaGlsZChEYXRlQ2VsbCwgeyBzdGF0aWM6IGZhbHNlLCByZWFkOiBUZW1wbGF0ZVJlZiB9KSBuekRhdGVDZWxsQ2hpbGQ/OiBOekNhbGVuZGFyRGF0ZVRlbXBsYXRlO1xuICBnZXQgZGF0ZUNlbGwoKTogTnpDYWxlbmRhckRhdGVUZW1wbGF0ZSB7XG4gICAgcmV0dXJuICh0aGlzLm56RGF0ZUNlbGwgfHwgdGhpcy5uekRhdGVDZWxsQ2hpbGQpITtcbiAgfVxuXG4gIEBJbnB1dCgpIG56RGF0ZUZ1bGxDZWxsPzogTnpDYWxlbmRhckRhdGVUZW1wbGF0ZTtcbiAgQENvbnRlbnRDaGlsZChEYXRlRnVsbENlbGwsIHsgc3RhdGljOiBmYWxzZSwgcmVhZDogVGVtcGxhdGVSZWYgfSkgbnpEYXRlRnVsbENlbGxDaGlsZD86IE56Q2FsZW5kYXJEYXRlVGVtcGxhdGU7XG4gIGdldCBkYXRlRnVsbENlbGwoKTogTnpDYWxlbmRhckRhdGVUZW1wbGF0ZSB7XG4gICAgcmV0dXJuICh0aGlzLm56RGF0ZUZ1bGxDZWxsIHx8IHRoaXMubnpEYXRlRnVsbENlbGxDaGlsZCkhO1xuICB9XG5cbiAgQElucHV0KCkgbnpNb250aENlbGw/OiBOekNhbGVuZGFyRGF0ZVRlbXBsYXRlO1xuICBAQ29udGVudENoaWxkKE1vbnRoQ2VsbCwgeyBzdGF0aWM6IGZhbHNlLCByZWFkOiBUZW1wbGF0ZVJlZiB9KSBuek1vbnRoQ2VsbENoaWxkPzogTnpDYWxlbmRhckRhdGVUZW1wbGF0ZTtcbiAgZ2V0IG1vbnRoQ2VsbCgpOiBOekNhbGVuZGFyRGF0ZVRlbXBsYXRlIHtcbiAgICByZXR1cm4gKHRoaXMubnpNb250aENlbGwgfHwgdGhpcy5uek1vbnRoQ2VsbENoaWxkKSE7XG4gIH1cblxuICBASW5wdXQoKSBuek1vbnRoRnVsbENlbGw/OiBOekNhbGVuZGFyRGF0ZVRlbXBsYXRlO1xuICBAQ29udGVudENoaWxkKE1vbnRoRnVsbENlbGwsIHsgc3RhdGljOiBmYWxzZSwgcmVhZDogVGVtcGxhdGVSZWYgfSkgbnpNb250aEZ1bGxDZWxsQ2hpbGQ/OiBOekNhbGVuZGFyRGF0ZVRlbXBsYXRlO1xuICBnZXQgbW9udGhGdWxsQ2VsbCgpOiBOekNhbGVuZGFyRGF0ZVRlbXBsYXRlIHtcbiAgICByZXR1cm4gKHRoaXMubnpNb250aEZ1bGxDZWxsIHx8IHRoaXMubnpNb250aEZ1bGxDZWxsQ2hpbGQpITtcbiAgfVxuXG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekZ1bGxzY3JlZW46IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXJlY3Rpb25hbGl0eTogRGlyZWN0aW9uYWxpdHkpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5kaXIgPSB0aGlzLmRpcmVjdGlvbmFsaXR5LnZhbHVlO1xuICAgIHRoaXMuZGlyZWN0aW9uYWxpdHkuY2hhbmdlPy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuZGlyID0gdGhpcy5kaXJlY3Rpb25hbGl0eS52YWx1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uTW9kZUNoYW5nZShtb2RlOiBOekNhbGVuZGFyTW9kZSk6IHZvaWQge1xuICAgIHRoaXMubnpNb2RlQ2hhbmdlLmVtaXQobW9kZSk7XG4gICAgdGhpcy5uelBhbmVsQ2hhbmdlLmVtaXQoeyBkYXRlOiB0aGlzLmFjdGl2ZURhdGUubmF0aXZlRGF0ZSwgbW9kZSB9KTtcbiAgfVxuXG4gIG9uWWVhclNlbGVjdCh5ZWFyOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBkYXRlID0gdGhpcy5hY3RpdmVEYXRlLnNldFllYXIoeWVhcik7XG4gICAgdGhpcy51cGRhdGVEYXRlKGRhdGUpO1xuICB9XG5cbiAgb25Nb250aFNlbGVjdChtb250aDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgZGF0ZSA9IHRoaXMuYWN0aXZlRGF0ZS5zZXRNb250aChtb250aCk7XG4gICAgdGhpcy51cGRhdGVEYXRlKGRhdGUpO1xuICB9XG5cbiAgb25EYXRlU2VsZWN0KGRhdGU6IENhbmR5RGF0ZSk6IHZvaWQge1xuICAgIC8vIE9ubHkgYWN0aXZlRGF0ZSBpcyBlbm91Z2ggaW4gY2FsZW5kYXJcbiAgICAvLyB0aGlzLnZhbHVlID0gZGF0ZTtcbiAgICB0aGlzLnVwZGF0ZURhdGUoZGF0ZSk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBEYXRlIHwgbnVsbCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlRGF0ZShuZXcgQ2FuZHlEYXRlKHZhbHVlIGFzIERhdGUpLCBmYWxzZSk7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoZGF0ZTogRGF0ZSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2VGbiA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hGbiA9IGZuO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVEYXRlKGRhdGU6IENhbmR5RGF0ZSwgdG91Y2hlZDogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2ZURhdGUgPSBkYXRlO1xuXG4gICAgaWYgKHRvdWNoZWQpIHtcbiAgICAgIHRoaXMub25DaGFuZ2VGbihkYXRlLm5hdGl2ZURhdGUpO1xuICAgICAgdGhpcy5vblRvdWNoRm4oKTtcbiAgICAgIHRoaXMubnpTZWxlY3RDaGFuZ2UuZW1pdChkYXRlLm5hdGl2ZURhdGUpO1xuICAgICAgdGhpcy5uelZhbHVlQ2hhbmdlLmVtaXQoZGF0ZS5uYXRpdmVEYXRlKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMubnpWYWx1ZSkge1xuICAgICAgdGhpcy51cGRhdGVEYXRlKG5ldyBDYW5keURhdGUodGhpcy5uelZhbHVlKSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19