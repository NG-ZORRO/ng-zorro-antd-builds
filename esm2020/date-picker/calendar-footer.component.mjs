/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { isNonEmptyString, isTemplateRef } from 'ng-zorro-antd/core/util';
import { transCompatFormat } from './lib/util';
import { PREFIX_CLASS } from './util';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/i18n";
import * as i2 from "ng-zorro-antd/button";
import * as i3 from "@angular/common";
import * as i4 from "ng-zorro-antd/core/wave";
import * as i5 from "ng-zorro-antd/core/transition-patch";
export class CalendarFooterComponent {
    constructor(dateHelper) {
        this.dateHelper = dateHelper;
        this.showToday = false;
        this.showNow = false;
        this.hasTimePicker = false;
        this.isRange = false;
        this.okDisabled = false;
        this.rangeQuickSelector = null;
        this.clickOk = new EventEmitter();
        this.clickToday = new EventEmitter();
        this.prefixCls = PREFIX_CLASS;
        this.isTemplateRef = isTemplateRef;
        this.isNonEmptyString = isNonEmptyString;
        this.isTodayDisabled = false;
        this.todayTitle = '';
    }
    ngOnChanges(changes) {
        const now = new Date();
        if (changes.disabledDate) {
            this.isTodayDisabled = !!(this.disabledDate && this.disabledDate(now));
        }
        if (changes.locale) {
            // NOTE: Compat for DatePipe formatting rules
            const dateFormat = transCompatFormat(this.locale.dateFormat);
            this.todayTitle = this.dateHelper.format(now, dateFormat);
        }
    }
    onClickToday() {
        const now = new CandyDate();
        this.clickToday.emit(now.clone()); // To prevent the "now" being modified from outside, we use clone
    }
}
CalendarFooterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: CalendarFooterComponent, deps: [{ token: i1.DateHelperService }], target: i0.ɵɵFactoryTarget.Component });
CalendarFooterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: CalendarFooterComponent, selector: "calendar-footer", inputs: { locale: "locale", showToday: "showToday", showNow: "showNow", hasTimePicker: "hasTimePicker", isRange: "isRange", okDisabled: "okDisabled", disabledDate: "disabledDate", extraFooter: "extraFooter", rangeQuickSelector: "rangeQuickSelector" }, outputs: { clickOk: "clickOk", clickToday: "clickToday" }, exportAs: ["calendarFooter"], usesOnChanges: true, ngImport: i0, template: `
    <div class="{{ prefixCls }}-footer">
      <div *ngIf="extraFooter" class="{{ prefixCls }}-footer-extra">
        <ng-container [ngSwitch]="true">
          <ng-container *ngSwitchCase="isTemplateRef(extraFooter)">
            <ng-container *ngTemplateOutlet="$any(extraFooter)"></ng-container>
          </ng-container>
          <ng-container *ngSwitchCase="isNonEmptyString(extraFooter)">
            <span [innerHTML]="extraFooter"></span>
          </ng-container>
        </ng-container>
      </div>
      <a
        *ngIf="showToday"
        class="{{ prefixCls }}-today-btn {{ isTodayDisabled ? prefixCls + '-today-btn-disabled' : '' }}"
        role="button"
        (click)="isTodayDisabled ? null : onClickToday()"
        title="{{ todayTitle }}"
      >
        {{ locale.today }}
      </a>
      <ul *ngIf="hasTimePicker || rangeQuickSelector" class="{{ prefixCls }}-ranges">
        <ng-container *ngTemplateOutlet="rangeQuickSelector"></ng-container>
        <li *ngIf="showNow" class="{{ prefixCls }}-now">
          <a class="{{ prefixCls }}-now-btn" (click)="isTodayDisabled ? null : onClickToday()">
            {{ locale.now }}
          </a>
        </li>
        <li *ngIf="hasTimePicker" class="{{ prefixCls }}-ok">
          <button
            nz-button
            type="button"
            nzType="primary"
            nzSize="small"
            [disabled]="okDisabled"
            (click)="okDisabled ? null : clickOk.emit()"
          >
            {{ locale.ok }}
          </button>
        </li>
      </ul>
    </div>
  `, isInline: true, components: [{ type: i2.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i3.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i4.NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: ["nzWaveExtraNode"], exportAs: ["nzWave"] }, { type: i5.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: CalendarFooterComponent, decorators: [{
            type: Component,
            args: [{
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // eslint-disable-next-line @angular-eslint/component-selector
                    selector: 'calendar-footer',
                    exportAs: 'calendarFooter',
                    template: `
    <div class="{{ prefixCls }}-footer">
      <div *ngIf="extraFooter" class="{{ prefixCls }}-footer-extra">
        <ng-container [ngSwitch]="true">
          <ng-container *ngSwitchCase="isTemplateRef(extraFooter)">
            <ng-container *ngTemplateOutlet="$any(extraFooter)"></ng-container>
          </ng-container>
          <ng-container *ngSwitchCase="isNonEmptyString(extraFooter)">
            <span [innerHTML]="extraFooter"></span>
          </ng-container>
        </ng-container>
      </div>
      <a
        *ngIf="showToday"
        class="{{ prefixCls }}-today-btn {{ isTodayDisabled ? prefixCls + '-today-btn-disabled' : '' }}"
        role="button"
        (click)="isTodayDisabled ? null : onClickToday()"
        title="{{ todayTitle }}"
      >
        {{ locale.today }}
      </a>
      <ul *ngIf="hasTimePicker || rangeQuickSelector" class="{{ prefixCls }}-ranges">
        <ng-container *ngTemplateOutlet="rangeQuickSelector"></ng-container>
        <li *ngIf="showNow" class="{{ prefixCls }}-now">
          <a class="{{ prefixCls }}-now-btn" (click)="isTodayDisabled ? null : onClickToday()">
            {{ locale.now }}
          </a>
        </li>
        <li *ngIf="hasTimePicker" class="{{ prefixCls }}-ok">
          <button
            nz-button
            type="button"
            nzType="primary"
            nzSize="small"
            [disabled]="okDisabled"
            (click)="okDisabled ? null : clickOk.emit()"
          >
            {{ locale.ok }}
          </button>
        </li>
      </ul>
    </div>
  `
                }]
        }], ctorParameters: function () { return [{ type: i1.DateHelperService }]; }, propDecorators: { locale: [{
                type: Input
            }], showToday: [{
                type: Input
            }], showNow: [{
                type: Input
            }], hasTimePicker: [{
                type: Input
            }], isRange: [{
                type: Input
            }], okDisabled: [{
                type: Input
            }], disabledDate: [{
                type: Input
            }], extraFooter: [{
                type: Input
            }], rangeQuickSelector: [{
                type: Input
            }], clickOk: [{
                type: Output
            }], clickToday: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZm9vdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvZGF0ZS1waWNrZXIvY2FsZW5kYXItZm9vdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFHTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXBELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUcxRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFFBQVEsQ0FBQzs7Ozs7OztBQW9EdEMsTUFBTSxPQUFPLHVCQUF1QjtJQXFCbEMsWUFBb0IsVUFBNkI7UUFBN0IsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFuQnhDLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixZQUFPLEdBQVksS0FBSyxDQUFDO1FBRXpCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFHNUIsdUJBQWtCLEdBQWtDLElBQUksQ0FBQztRQUUvQyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUNuQyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQWEsQ0FBQztRQUU5RCxjQUFTLEdBQVcsWUFBWSxDQUFDO1FBQ2pDLGtCQUFhLEdBQUcsYUFBYSxDQUFDO1FBQzlCLHFCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3BDLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLGVBQVUsR0FBVyxFQUFFLENBQUM7SUFFNEIsQ0FBQztJQUVyRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsTUFBTSxHQUFHLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUM3QixJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN4RTtRQUNELElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNsQiw2Q0FBNkM7WUFDN0MsTUFBTSxVQUFVLEdBQVcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUMzRDtJQUNILENBQUM7SUFFRCxZQUFZO1FBQ1YsTUFBTSxHQUFHLEdBQWMsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLGlFQUFpRTtJQUN0RyxDQUFDOztvSEF0Q1UsdUJBQXVCO3dHQUF2Qix1QkFBdUIsaWFBNUN4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMENUOzJGQUVVLHVCQUF1QjtrQkFsRG5DLFNBQVM7bUJBQUM7b0JBQ1QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyw4REFBOEQ7b0JBQzlELFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMENUO2lCQUNGO3dHQUVVLE1BQU07c0JBQWQsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFFRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBRWEsT0FBTztzQkFBekIsTUFBTTtnQkFDWSxVQUFVO3NCQUE1QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2FuZHlEYXRlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3RpbWUnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IGlzTm9uRW1wdHlTdHJpbmcsIGlzVGVtcGxhdGVSZWYgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBEYXRlSGVscGVyU2VydmljZSwgTnpDYWxlbmRhckkxOG5JbnRlcmZhY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuXG5pbXBvcnQgeyB0cmFuc0NvbXBhdEZvcm1hdCB9IGZyb20gJy4vbGliL3V0aWwnO1xuaW1wb3J0IHsgUFJFRklYX0NMQVNTIH0gZnJvbSAnLi91dGlsJztcblxuQENvbXBvbmVudCh7XG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2NvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ2NhbGVuZGFyLWZvb3RlcicsXG4gIGV4cG9ydEFzOiAnY2FsZW5kYXJGb290ZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJ7eyBwcmVmaXhDbHMgfX0tZm9vdGVyXCI+XG4gICAgICA8ZGl2ICpuZ0lmPVwiZXh0cmFGb290ZXJcIiBjbGFzcz1cInt7IHByZWZpeENscyB9fS1mb290ZXItZXh0cmFcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwidHJ1ZVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImlzVGVtcGxhdGVSZWYoZXh0cmFGb290ZXIpXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiJGFueShleHRyYUZvb3RlcilcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJpc05vbkVtcHR5U3RyaW5nKGV4dHJhRm9vdGVyKVwiPlxuICAgICAgICAgICAgPHNwYW4gW2lubmVySFRNTF09XCJleHRyYUZvb3RlclwiPjwvc3Bhbj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxhXG4gICAgICAgICpuZ0lmPVwic2hvd1RvZGF5XCJcbiAgICAgICAgY2xhc3M9XCJ7eyBwcmVmaXhDbHMgfX0tdG9kYXktYnRuIHt7IGlzVG9kYXlEaXNhYmxlZCA/IHByZWZpeENscyArICctdG9kYXktYnRuLWRpc2FibGVkJyA6ICcnIH19XCJcbiAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgIChjbGljayk9XCJpc1RvZGF5RGlzYWJsZWQgPyBudWxsIDogb25DbGlja1RvZGF5KClcIlxuICAgICAgICB0aXRsZT1cInt7IHRvZGF5VGl0bGUgfX1cIlxuICAgICAgPlxuICAgICAgICB7eyBsb2NhbGUudG9kYXkgfX1cbiAgICAgIDwvYT5cbiAgICAgIDx1bCAqbmdJZj1cImhhc1RpbWVQaWNrZXIgfHwgcmFuZ2VRdWlja1NlbGVjdG9yXCIgY2xhc3M9XCJ7eyBwcmVmaXhDbHMgfX0tcmFuZ2VzXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJyYW5nZVF1aWNrU2VsZWN0b3JcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPGxpICpuZ0lmPVwic2hvd05vd1wiIGNsYXNzPVwie3sgcHJlZml4Q2xzIH19LW5vd1wiPlxuICAgICAgICAgIDxhIGNsYXNzPVwie3sgcHJlZml4Q2xzIH19LW5vdy1idG5cIiAoY2xpY2spPVwiaXNUb2RheURpc2FibGVkID8gbnVsbCA6IG9uQ2xpY2tUb2RheSgpXCI+XG4gICAgICAgICAgICB7eyBsb2NhbGUubm93IH19XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2xpPlxuICAgICAgICA8bGkgKm5nSWY9XCJoYXNUaW1lUGlja2VyXCIgY2xhc3M9XCJ7eyBwcmVmaXhDbHMgfX0tb2tcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBuei1idXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgbnpUeXBlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICBuelNpemU9XCJzbWFsbFwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwib2tEaXNhYmxlZFwiXG4gICAgICAgICAgICAoY2xpY2spPVwib2tEaXNhYmxlZCA/IG51bGwgOiBjbGlja09rLmVtaXQoKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3sgbG9jYWxlLm9rIH19XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRm9vdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgbG9jYWxlITogTnpDYWxlbmRhckkxOG5JbnRlcmZhY2U7XG4gIEBJbnB1dCgpIHNob3dUb2RheTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBzaG93Tm93OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGhhc1RpbWVQaWNrZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgaXNSYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIG9rRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgZGlzYWJsZWREYXRlPzogKGQ6IERhdGUpID0+IGJvb2xlYW47XG4gIEBJbnB1dCgpIGV4dHJhRm9vdGVyPzogVGVtcGxhdGVSZWY8dm9pZD4gfCBzdHJpbmc7XG4gIEBJbnB1dCgpIHJhbmdlUXVpY2tTZWxlY3RvcjogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuXG4gIEBPdXRwdXQoKSByZWFkb25seSBjbGlja09rID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2xpY2tUb2RheSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FuZHlEYXRlPigpO1xuXG4gIHByZWZpeENsczogc3RyaW5nID0gUFJFRklYX0NMQVNTO1xuICBpc1RlbXBsYXRlUmVmID0gaXNUZW1wbGF0ZVJlZjtcbiAgaXNOb25FbXB0eVN0cmluZyA9IGlzTm9uRW1wdHlTdHJpbmc7XG4gIGlzVG9kYXlEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICB0b2RheVRpdGxlOiBzdHJpbmcgPSAnJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGVIZWxwZXI6IERhdGVIZWxwZXJTZXJ2aWNlKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCBub3c6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGlmIChjaGFuZ2VzLmRpc2FibGVkRGF0ZSkge1xuICAgICAgdGhpcy5pc1RvZGF5RGlzYWJsZWQgPSAhISh0aGlzLmRpc2FibGVkRGF0ZSAmJiB0aGlzLmRpc2FibGVkRGF0ZShub3cpKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMubG9jYWxlKSB7XG4gICAgICAvLyBOT1RFOiBDb21wYXQgZm9yIERhdGVQaXBlIGZvcm1hdHRpbmcgcnVsZXNcbiAgICAgIGNvbnN0IGRhdGVGb3JtYXQ6IHN0cmluZyA9IHRyYW5zQ29tcGF0Rm9ybWF0KHRoaXMubG9jYWxlLmRhdGVGb3JtYXQpO1xuICAgICAgdGhpcy50b2RheVRpdGxlID0gdGhpcy5kYXRlSGVscGVyLmZvcm1hdChub3csIGRhdGVGb3JtYXQpO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2xpY2tUb2RheSgpOiB2b2lkIHtcbiAgICBjb25zdCBub3c6IENhbmR5RGF0ZSA9IG5ldyBDYW5keURhdGUoKTtcbiAgICB0aGlzLmNsaWNrVG9kYXkuZW1pdChub3cuY2xvbmUoKSk7IC8vIFRvIHByZXZlbnQgdGhlIFwibm93XCIgYmVpbmcgbW9kaWZpZWQgZnJvbSBvdXRzaWRlLCB3ZSB1c2UgY2xvbmVcbiAgfVxufVxuIl19