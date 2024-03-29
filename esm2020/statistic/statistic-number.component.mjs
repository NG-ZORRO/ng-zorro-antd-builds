/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { getLocaleNumberSymbol, NumberSymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class NzStatisticNumberComponent {
    constructor(locale_id) {
        this.locale_id = locale_id;
        this.displayInt = '';
        this.displayDecimal = '';
    }
    ngOnChanges() {
        this.formatNumber();
    }
    formatNumber() {
        const decimalSeparator = typeof this.nzValue === 'number' ? '.' : getLocaleNumberSymbol(this.locale_id, NumberSymbol.Decimal);
        const value = String(this.nzValue);
        const [int, decimal] = value.split(decimalSeparator);
        this.displayInt = int;
        this.displayDecimal = decimal ? `${decimalSeparator}${decimal}` : '';
    }
}
NzStatisticNumberComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzStatisticNumberComponent, deps: [{ token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Component });
NzStatisticNumberComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzStatisticNumberComponent, selector: "nz-statistic-number", inputs: { nzValue: "nzValue", nzValueTemplate: "nzValueTemplate" }, exportAs: ["nzStatisticNumber"], usesOnChanges: true, ngImport: i0, template: `
    <span class="ant-statistic-content-value">
      <ng-container
        *ngIf="nzValueTemplate"
        [ngTemplateOutlet]="nzValueTemplate"
        [ngTemplateOutletContext]="{ $implicit: nzValue }"
      ></ng-container>
      <ng-container *ngIf="!nzValueTemplate">
        <span *ngIf="displayInt" class="ant-statistic-content-value-int">{{ displayInt }}</span>
        <span *ngIf="displayDecimal" class="ant-statistic-content-value-decimal">{{ displayDecimal }}</span>
      </ng-container>
    </span>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzStatisticNumberComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    selector: 'nz-statistic-number',
                    exportAs: 'nzStatisticNumber',
                    template: `
    <span class="ant-statistic-content-value">
      <ng-container
        *ngIf="nzValueTemplate"
        [ngTemplateOutlet]="nzValueTemplate"
        [ngTemplateOutletContext]="{ $implicit: nzValue }"
      ></ng-container>
      <ng-container *ngIf="!nzValueTemplate">
        <span *ngIf="displayInt" class="ant-statistic-content-value-int">{{ displayInt }}</span>
        <span *ngIf="displayDecimal" class="ant-statistic-content-value-decimal">{{ displayDecimal }}</span>
      </ng-container>
    </span>
  `
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [LOCALE_ID]
                }] }]; }, propDecorators: { nzValue: [{
                type: Input
            }], nzValueTemplate: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGlzdGljLW51bWJlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3N0YXRpc3RpYy9zdGF0aXN0aWMtbnVtYmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdEUsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsTUFBTSxFQUNOLEtBQUssRUFDTCxTQUFTLEVBR1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDOzs7QUF3QnZCLE1BQU0sT0FBTywwQkFBMEI7SUFPckMsWUFBdUMsU0FBaUI7UUFBakIsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUh4RCxlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLG1CQUFjLEdBQUcsRUFBRSxDQUFDO0lBRXVDLENBQUM7SUFFNUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU8sWUFBWTtRQUNsQixNQUFNLGdCQUFnQixHQUNwQixPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZHLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkMsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFckQsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7UUFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsZ0JBQWdCLEdBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUN2RSxDQUFDOzt1SEFyQlUsMEJBQTBCLGtCQU9qQixTQUFTOzJHQVBsQiwwQkFBMEIscUxBZDNCOzs7Ozs7Ozs7Ozs7R0FZVDsyRkFFVSwwQkFBMEI7a0JBcEJ0QyxTQUFTO21CQUFDO29CQUNULGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7R0FZVDtpQkFDRjs7MEJBUWMsTUFBTTsyQkFBQyxTQUFTOzRDQU5wQixPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IGdldExvY2FsZU51bWJlclN5bWJvbCwgTnVtYmVyU3ltYm9sIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIExPQ0FMRV9JRCxcbiAgT25DaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56U3RhdGlzdGljVmFsdWVUeXBlIH0gZnJvbSAnLi90eXBpbmdzJztcblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgc2VsZWN0b3I6ICduei1zdGF0aXN0aWMtbnVtYmVyJyxcbiAgZXhwb3J0QXM6ICduelN0YXRpc3RpY051bWJlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW4gY2xhc3M9XCJhbnQtc3RhdGlzdGljLWNvbnRlbnQtdmFsdWVcIj5cbiAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgKm5nSWY9XCJuelZhbHVlVGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJuelZhbHVlVGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IG56VmFsdWUgfVwiXG4gICAgICA+PC9uZy1jb250YWluZXI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIW56VmFsdWVUZW1wbGF0ZVwiPlxuICAgICAgICA8c3BhbiAqbmdJZj1cImRpc3BsYXlJbnRcIiBjbGFzcz1cImFudC1zdGF0aXN0aWMtY29udGVudC12YWx1ZS1pbnRcIj57eyBkaXNwbGF5SW50IH19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cImRpc3BsYXlEZWNpbWFsXCIgY2xhc3M9XCJhbnQtc3RhdGlzdGljLWNvbnRlbnQtdmFsdWUtZGVjaW1hbFwiPnt7IGRpc3BsYXlEZWNpbWFsIH19PC9zcGFuPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9zcGFuPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56U3RhdGlzdGljTnVtYmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgbnpWYWx1ZT86IE56U3RhdGlzdGljVmFsdWVUeXBlO1xuICBASW5wdXQoKSBuelZhbHVlVGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogTnpTdGF0aXN0aWNWYWx1ZVR5cGUgfT47XG5cbiAgZGlzcGxheUludCA9ICcnO1xuICBkaXNwbGF5RGVjaW1hbCA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTE9DQUxFX0lEKSBwcml2YXRlIGxvY2FsZV9pZDogc3RyaW5nKSB7fVxuXG4gIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMuZm9ybWF0TnVtYmVyKCk7XG4gIH1cblxuICBwcml2YXRlIGZvcm1hdE51bWJlcigpOiB2b2lkIHtcbiAgICBjb25zdCBkZWNpbWFsU2VwYXJhdG9yOiBzdHJpbmcgPVxuICAgICAgdHlwZW9mIHRoaXMubnpWYWx1ZSA9PT0gJ251bWJlcicgPyAnLicgOiBnZXRMb2NhbGVOdW1iZXJTeW1ib2wodGhpcy5sb2NhbGVfaWQsIE51bWJlclN5bWJvbC5EZWNpbWFsKTtcbiAgICBjb25zdCB2YWx1ZSA9IFN0cmluZyh0aGlzLm56VmFsdWUpO1xuICAgIGNvbnN0IFtpbnQsIGRlY2ltYWxdID0gdmFsdWUuc3BsaXQoZGVjaW1hbFNlcGFyYXRvcik7XG5cbiAgICB0aGlzLmRpc3BsYXlJbnQgPSBpbnQ7XG4gICAgdGhpcy5kaXNwbGF5RGVjaW1hbCA9IGRlY2ltYWwgPyBgJHtkZWNpbWFsU2VwYXJhdG9yfSR7ZGVjaW1hbH1gIDogJyc7XG4gIH1cbn1cbiJdfQ==