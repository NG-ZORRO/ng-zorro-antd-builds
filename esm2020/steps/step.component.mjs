import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/services";
import * as i2 from "ng-zorro-antd/progress";
import * as i3 from "@angular/common";
import * as i4 from "ng-zorro-antd/icon";
import * as i5 from "ng-zorro-antd/core/outlet";
export class NzStepComponent {
    constructor(cdr, ngZone, destroy$) {
        this.cdr = cdr;
        this.ngZone = ngZone;
        this.destroy$ = destroy$;
        this.nzDisabled = false;
        this.nzPercentage = null;
        this.isCustomStatus = false;
        this._status = 'wait';
        this.oldAPIIcon = true;
        this.direction = 'horizontal';
        this.index = 0;
        this.last = false;
        this.outStatus = 'process';
        this.showProcessDot = false;
        this.clickable = false;
        this.clickOutsideAngular$ = new Subject();
        this.nullProcessFormat = () => null;
        this._currentIndex = 0;
    }
    get nzStatus() {
        return this._status;
    }
    set nzStatus(status) {
        this._status = status;
        this.isCustomStatus = true;
    }
    get nzIcon() {
        return this._icon;
    }
    set nzIcon(value) {
        if (!(value instanceof TemplateRef)) {
            this.oldAPIIcon = typeof value === 'string' && value.indexOf('anticon') > -1;
        }
        else {
        }
        this._icon = value;
    }
    get showProgress() {
        return (this.nzPercentage !== null &&
            !this.nzIcon &&
            this.nzStatus === 'process' &&
            this.nzPercentage >= 0 &&
            this.nzPercentage <= 100);
    }
    get currentIndex() {
        return this._currentIndex;
    }
    set currentIndex(current) {
        this._currentIndex = current;
        if (!this.isCustomStatus) {
            this._status = current > this.index ? 'finish' : current === this.index ? this.outStatus || '' : 'wait';
        }
    }
    ngOnInit() {
        this.ngZone.runOutsideAngular(() => fromEvent(this.itemContainer.nativeElement, 'click')
            .pipe(filter(() => this.clickable && this.currentIndex !== this.index && !this.nzDisabled), takeUntil(this.destroy$))
            .subscribe(() => {
            this.clickOutsideAngular$.next(this.index);
        }));
    }
    enable() {
        this.nzDisabled = false;
        this.cdr.markForCheck();
    }
    disable() {
        this.nzDisabled = true;
        this.cdr.markForCheck();
    }
    markForCheck() {
        this.cdr.markForCheck();
    }
}
NzStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzStepComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i1.NzDestroyService }], target: i0.ɵɵFactoryTarget.Component });
NzStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzStepComponent, selector: "nz-step", inputs: { nzTitle: "nzTitle", nzSubtitle: "nzSubtitle", nzDescription: "nzDescription", nzDisabled: "nzDisabled", nzPercentage: "nzPercentage", nzStatus: "nzStatus", nzIcon: "nzIcon" }, host: { properties: { "class.ant-steps-item-wait": "nzStatus === \"wait\"", "class.ant-steps-item-process": "nzStatus === \"process\"", "class.ant-steps-item-finish": "nzStatus === \"finish\"", "class.ant-steps-item-error": "nzStatus === \"error\"", "class.ant-steps-item-active": "currentIndex === index", "class.ant-steps-item-disabled": "nzDisabled", "class.ant-steps-item-custom": "!!nzIcon", "class.ant-steps-next-error": "(outStatus === \"error\") && (currentIndex === index + 1)" }, classAttribute: "ant-steps-item" }, providers: [NzDestroyService], viewQueries: [{ propertyName: "processDotTemplate", first: true, predicate: ["processDotTemplate"], descendants: true }, { propertyName: "itemContainer", first: true, predicate: ["itemContainer"], descendants: true, static: true }], exportAs: ["nzStep"], ngImport: i0, template: `
    <div
      #itemContainer
      class="ant-steps-item-container"
      [attr.role]="clickable && !nzDisabled ? 'button' : null"
      [tabindex]="clickable && !nzDisabled ? 0 : null"
    >
      <div class="ant-steps-item-tail" *ngIf="last !== true"></div>
      <div class="ant-steps-item-icon">
        <ng-template [ngIf]="!showProcessDot">
          <div *ngIf="showProgress" class="ant-steps-progress-icon">
            <nz-progress
              [nzPercent]="nzPercentage"
              nzType="circle"
              [nzWidth]="40"
              [nzFormat]="nullProcessFormat"
              [nzStrokeWidth]="4"
            ></nz-progress>
          </div>
          <span class="ant-steps-icon" *ngIf="nzStatus === 'finish' && !nzIcon"><i nz-icon nzType="check"></i></span>
          <span class="ant-steps-icon" *ngIf="nzStatus === 'error'"><i nz-icon nzType="close"></i></span>
          <span class="ant-steps-icon" *ngIf="(nzStatus === 'process' || nzStatus === 'wait') && !nzIcon">
            {{ index + 1 }}
          </span>
          <span class="ant-steps-icon" *ngIf="nzIcon">
            <ng-container *nzStringTemplateOutlet="nzIcon; let icon">
              <i nz-icon [nzType]="!oldAPIIcon && icon" [ngClass]="oldAPIIcon && icon"></i>
            </ng-container>
          </span>
        </ng-template>
        <ng-template [ngIf]="showProcessDot">
          <span class="ant-steps-icon">
            <ng-template #processDotTemplate>
              <span class="ant-steps-icon-dot"></span>
            </ng-template>
            <ng-template
              [ngTemplateOutlet]="customProcessTemplate || processDotTemplate"
              [ngTemplateOutletContext]="{
                $implicit: processDotTemplate,
                status: nzStatus,
                index: index
              }"
            ></ng-template>
          </span>
        </ng-template>
      </div>
      <div class="ant-steps-item-content">
        <div class="ant-steps-item-title">
          <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          <div *ngIf="nzSubtitle" class="ant-steps-item-subtitle">
            <ng-container *nzStringTemplateOutlet="nzSubtitle">{{ nzSubtitle }}</ng-container>
          </div>
        </div>
        <div class="ant-steps-item-description">
          <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
        </div>
      </div>
    </div>
  `, isInline: true, components: [{ type: i2.NzProgressComponent, selector: "nz-progress", inputs: ["nzShowInfo", "nzWidth", "nzStrokeColor", "nzSize", "nzFormat", "nzSuccessPercent", "nzPercent", "nzStrokeWidth", "nzGapDegree", "nzStatus", "nzType", "nzGapPosition", "nzStrokeLinecap", "nzSteps"], exportAs: ["nzProgress"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i5.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzStepComponent.prototype, "nzDisabled", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzStepComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-step',
                    exportAs: 'nzStep',
                    preserveWhitespaces: false,
                    template: `
    <div
      #itemContainer
      class="ant-steps-item-container"
      [attr.role]="clickable && !nzDisabled ? 'button' : null"
      [tabindex]="clickable && !nzDisabled ? 0 : null"
    >
      <div class="ant-steps-item-tail" *ngIf="last !== true"></div>
      <div class="ant-steps-item-icon">
        <ng-template [ngIf]="!showProcessDot">
          <div *ngIf="showProgress" class="ant-steps-progress-icon">
            <nz-progress
              [nzPercent]="nzPercentage"
              nzType="circle"
              [nzWidth]="40"
              [nzFormat]="nullProcessFormat"
              [nzStrokeWidth]="4"
            ></nz-progress>
          </div>
          <span class="ant-steps-icon" *ngIf="nzStatus === 'finish' && !nzIcon"><i nz-icon nzType="check"></i></span>
          <span class="ant-steps-icon" *ngIf="nzStatus === 'error'"><i nz-icon nzType="close"></i></span>
          <span class="ant-steps-icon" *ngIf="(nzStatus === 'process' || nzStatus === 'wait') && !nzIcon">
            {{ index + 1 }}
          </span>
          <span class="ant-steps-icon" *ngIf="nzIcon">
            <ng-container *nzStringTemplateOutlet="nzIcon; let icon">
              <i nz-icon [nzType]="!oldAPIIcon && icon" [ngClass]="oldAPIIcon && icon"></i>
            </ng-container>
          </span>
        </ng-template>
        <ng-template [ngIf]="showProcessDot">
          <span class="ant-steps-icon">
            <ng-template #processDotTemplate>
              <span class="ant-steps-icon-dot"></span>
            </ng-template>
            <ng-template
              [ngTemplateOutlet]="customProcessTemplate || processDotTemplate"
              [ngTemplateOutletContext]="{
                $implicit: processDotTemplate,
                status: nzStatus,
                index: index
              }"
            ></ng-template>
          </span>
        </ng-template>
      </div>
      <div class="ant-steps-item-content">
        <div class="ant-steps-item-title">
          <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          <div *ngIf="nzSubtitle" class="ant-steps-item-subtitle">
            <ng-container *nzStringTemplateOutlet="nzSubtitle">{{ nzSubtitle }}</ng-container>
          </div>
        </div>
        <div class="ant-steps-item-description">
          <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
        </div>
      </div>
    </div>
  `,
                    host: {
                        class: 'ant-steps-item',
                        '[class.ant-steps-item-wait]': 'nzStatus === "wait"',
                        '[class.ant-steps-item-process]': 'nzStatus === "process"',
                        '[class.ant-steps-item-finish]': 'nzStatus === "finish"',
                        '[class.ant-steps-item-error]': 'nzStatus === "error"',
                        '[class.ant-steps-item-active]': 'currentIndex === index',
                        '[class.ant-steps-item-disabled]': 'nzDisabled',
                        '[class.ant-steps-item-custom]': '!!nzIcon',
                        '[class.ant-steps-next-error]': '(outStatus === "error") && (currentIndex === index + 1)'
                    },
                    providers: [NzDestroyService]
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i1.NzDestroyService }]; }, propDecorators: { processDotTemplate: [{
                type: ViewChild,
                args: ['processDotTemplate', { static: false }]
            }], itemContainer: [{
                type: ViewChild,
                args: ['itemContainer', { static: true }]
            }], nzTitle: [{
                type: Input
            }], nzSubtitle: [{
                type: Input
            }], nzDescription: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzPercentage: [{
                type: Input
            }], nzStatus: [{
                type: Input
            }], nzIcon: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3N0ZXBzL3N0ZXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxLQUFLLEVBR0wsV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7Ozs7QUFpRnZELE1BQU0sT0FBTyxlQUFlO0lBNEUxQixZQUFvQixHQUFzQixFQUFVLE1BQWMsRUFBVSxRQUEwQjtRQUFsRixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFrQjtRQW5FN0UsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQyxpQkFBWSxHQUFrQixJQUFJLENBQUM7UUFZNUMsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDZixZQUFPLEdBQUcsTUFBTSxDQUFDO1FBZXpCLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFJbEIsY0FBUyxHQUFHLFlBQVksQ0FBQztRQUN6QixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsU0FBSSxHQUFHLEtBQUssQ0FBQztRQUNiLGNBQVMsR0FBRyxTQUFTLENBQUM7UUFDdEIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDdkIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVsQix5QkFBb0IsR0FBRyxJQUFJLE9BQU8s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QUFLO2dCQWNGLE1BQU07c0JBRFQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkluaXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpEZXN0cm95U2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE5nQ2xhc3NUeXBlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IE56UHJvZ3Jlc3NGb3JtYXR0ZXIgfSBmcm9tICduZy16b3Jyby1hbnRkL3Byb2dyZXNzJztcblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvcjogJ256LXN0ZXAnLFxuICBleHBvcnRBczogJ256U3RlcCcsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgICNpdGVtQ29udGFpbmVyXG4gICAgICBjbGFzcz1cImFudC1zdGVwcy1pdGVtLWNvbnRhaW5lclwiXG4gICAgICBbYXR0ci5yb2xlXT1cImNsaWNrYWJsZSAmJiAhbnpEaXNhYmxlZCA/ICdidXR0b24nIDogbnVsbFwiXG4gICAgICBbdGFiaW5kZXhdPVwiY2xpY2thYmxlICYmICFuekRpc2FibGVkID8gMCA6IG51bGxcIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3M9XCJhbnQtc3RlcHMtaXRlbS10YWlsXCIgKm5nSWY9XCJsYXN0ICE9PSB0cnVlXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYW50LXN0ZXBzLWl0ZW0taWNvblwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiIXNob3dQcm9jZXNzRG90XCI+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cInNob3dQcm9ncmVzc1wiIGNsYXNzPVwiYW50LXN0ZXBzLXByb2dyZXNzLWljb25cIj5cbiAgICAgICAgICAgIDxuei1wcm9ncmVzc1xuICAgICAgICAgICAgICBbbnpQZXJjZW50XT1cIm56UGVyY2VudGFnZVwiXG4gICAgICAgICAgICAgIG56VHlwZT1cImNpcmNsZVwiXG4gICAgICAgICAgICAgIFtueldpZHRoXT1cIjQwXCJcbiAgICAgICAgICAgICAgW256Rm9ybWF0XT1cIm51bGxQcm9jZXNzRm9ybWF0XCJcbiAgICAgICAgICAgICAgW256U3Ryb2tlV2lkdGhdPVwiNFwiXG4gICAgICAgICAgICA+PC9uei1wcm9ncmVzcz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImFudC1zdGVwcy1pY29uXCIgKm5nSWY9XCJuelN0YXR1cyA9PT0gJ2ZpbmlzaCcgJiYgIW56SWNvblwiPjxpIG56LWljb24gbnpUeXBlPVwiY2hlY2tcIj48L2k+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW50LXN0ZXBzLWljb25cIiAqbmdJZj1cIm56U3RhdHVzID09PSAnZXJyb3InXCI+PGkgbnotaWNvbiBuelR5cGU9XCJjbG9zZVwiPjwvaT48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJhbnQtc3RlcHMtaWNvblwiICpuZ0lmPVwiKG56U3RhdHVzID09PSAncHJvY2VzcycgfHwgbnpTdGF0dXMgPT09ICd3YWl0JykgJiYgIW56SWNvblwiPlxuICAgICAgICAgICAge3sgaW5kZXggKyAxIH19XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW50LXN0ZXBzLWljb25cIiAqbmdJZj1cIm56SWNvblwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56SWNvbjsgbGV0IGljb25cIj5cbiAgICAgICAgICAgICAgPGkgbnotaWNvbiBbbnpUeXBlXT1cIiFvbGRBUElJY29uICYmIGljb25cIiBbbmdDbGFzc109XCJvbGRBUElJY29uICYmIGljb25cIj48L2k+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJzaG93UHJvY2Vzc0RvdFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW50LXN0ZXBzLWljb25cIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjcHJvY2Vzc0RvdFRlbXBsYXRlPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFudC1zdGVwcy1pY29uLWRvdFwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tUHJvY2Vzc1RlbXBsYXRlIHx8IHByb2Nlc3NEb3RUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgICAgICAgICAgJGltcGxpY2l0OiBwcm9jZXNzRG90VGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBuelN0YXR1cyxcbiAgICAgICAgICAgICAgICBpbmRleDogaW5kZXhcbiAgICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICA+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhbnQtc3RlcHMtaXRlbS1jb250ZW50XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtc3RlcHMtaXRlbS10aXRsZVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuelRpdGxlXCI+e3sgbnpUaXRsZSB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJuelN1YnRpdGxlXCIgY2xhc3M9XCJhbnQtc3RlcHMtaXRlbS1zdWJ0aXRsZVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56U3VidGl0bGVcIj57eyBuelN1YnRpdGxlIH19PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXN0ZXBzLWl0ZW0tZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpEZXNjcmlwdGlvblwiPnt7IG56RGVzY3JpcHRpb24gfX08L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LXN0ZXBzLWl0ZW0nLFxuICAgICdbY2xhc3MuYW50LXN0ZXBzLWl0ZW0td2FpdF0nOiAnbnpTdGF0dXMgPT09IFwid2FpdFwiJyxcbiAgICAnW2NsYXNzLmFudC1zdGVwcy1pdGVtLXByb2Nlc3NdJzogJ256U3RhdHVzID09PSBcInByb2Nlc3NcIicsXG4gICAgJ1tjbGFzcy5hbnQtc3RlcHMtaXRlbS1maW5pc2hdJzogJ256U3RhdHVzID09PSBcImZpbmlzaFwiJyxcbiAgICAnW2NsYXNzLmFudC1zdGVwcy1pdGVtLWVycm9yXSc6ICduelN0YXR1cyA9PT0gXCJlcnJvclwiJyxcbiAgICAnW2NsYXNzLmFudC1zdGVwcy1pdGVtLWFjdGl2ZV0nOiAnY3VycmVudEluZGV4ID09PSBpbmRleCcsXG4gICAgJ1tjbGFzcy5hbnQtc3RlcHMtaXRlbS1kaXNhYmxlZF0nOiAnbnpEaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5hbnQtc3RlcHMtaXRlbS1jdXN0b21dJzogJyEhbnpJY29uJyxcbiAgICAnW2NsYXNzLmFudC1zdGVwcy1uZXh0LWVycm9yXSc6ICcob3V0U3RhdHVzID09PSBcImVycm9yXCIpICYmIChjdXJyZW50SW5kZXggPT09IGluZGV4ICsgMSknXG4gIH0sXG4gIHByb3ZpZGVyczogW056RGVzdHJveVNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE56U3RlcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekRpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG5cbiAgQFZpZXdDaGlsZCgncHJvY2Vzc0RvdFRlbXBsYXRlJywgeyBzdGF0aWM6IGZhbHNlIH0pIHByb2Nlc3NEb3RUZW1wbGF0ZT86IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBAVmlld0NoaWxkKCdpdGVtQ29udGFpbmVyJywgeyBzdGF0aWM6IHRydWUgfSkgaXRlbUNvbnRhaW5lciE6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIEBJbnB1dCgpIG56VGl0bGU/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgbnpTdWJ0aXRsZT86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBASW5wdXQoKSBuekRlc2NyaXB0aW9uPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56UGVyY2VudGFnZTogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgQElucHV0KClcbiAgZ2V0IG56U3RhdHVzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXR1cztcbiAgfVxuXG4gIHNldCBuelN0YXR1cyhzdGF0dXM6IHN0cmluZykge1xuICAgIHRoaXMuX3N0YXR1cyA9IHN0YXR1cztcbiAgICB0aGlzLmlzQ3VzdG9tU3RhdHVzID0gdHJ1ZTtcbiAgfVxuXG4gIGlzQ3VzdG9tU3RhdHVzID0gZmFsc2U7XG4gIHByaXZhdGUgX3N0YXR1cyA9ICd3YWl0JztcblxuICBASW5wdXQoKVxuICBnZXQgbnpJY29uKCk6IE5nQ2xhc3NUeXBlIHwgVGVtcGxhdGVSZWY8dm9pZD4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9pY29uO1xuICB9XG5cbiAgc2V0IG56SWNvbih2YWx1ZTogTmdDbGFzc1R5cGUgfCBUZW1wbGF0ZVJlZjx2b2lkPiB8IHVuZGVmaW5lZCkge1xuICAgIGlmICghKHZhbHVlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpKSB7XG4gICAgICB0aGlzLm9sZEFQSUljb24gPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLmluZGV4T2YoJ2FudGljb24nKSA+IC0xO1xuICAgIH0gZWxzZSB7XG4gICAgfVxuICAgIHRoaXMuX2ljb24gPSB2YWx1ZTtcbiAgfVxuXG4gIG9sZEFQSUljb24gPSB0cnVlO1xuICBwcml2YXRlIF9pY29uPzogTmdDbGFzc1R5cGUgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcblxuICBjdXN0b21Qcm9jZXNzVGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogVGVtcGxhdGVSZWY8dm9pZD47IHN0YXR1czogc3RyaW5nOyBpbmRleDogbnVtYmVyIH0+OyAvLyBTZXQgYnkgcGFyZW50LlxuICBkaXJlY3Rpb24gPSAnaG9yaXpvbnRhbCc7XG4gIGluZGV4ID0gMDtcbiAgbGFzdCA9IGZhbHNlO1xuICBvdXRTdGF0dXMgPSAncHJvY2Vzcyc7XG4gIHNob3dQcm9jZXNzRG90ID0gZmFsc2U7XG4gIGNsaWNrYWJsZSA9IGZhbHNlO1xuXG4gIGNsaWNrT3V0c2lkZUFuZ3VsYXIkID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuXG4gIHJlYWRvbmx5IG51bGxQcm9jZXNzRm9ybWF0OiBOelByb2dyZXNzRm9ybWF0dGVyID0gKCkgPT4gbnVsbDtcblxuICBnZXQgc2hvd1Byb2dyZXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLm56UGVyY2VudGFnZSAhPT0gbnVsbCAmJlxuICAgICAgIXRoaXMubnpJY29uICYmXG4gICAgICB0aGlzLm56U3RhdHVzID09PSAncHJvY2VzcycgJiZcbiAgICAgIHRoaXMubnpQZXJjZW50YWdlID49IDAgJiZcbiAgICAgIHRoaXMubnpQZXJjZW50YWdlIDw9IDEwMFxuICAgICk7XG4gIH1cblxuICBnZXQgY3VycmVudEluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRJbmRleDtcbiAgfVxuXG4gIHNldCBjdXJyZW50SW5kZXgoY3VycmVudDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudEluZGV4ID0gY3VycmVudDtcbiAgICBpZiAoIXRoaXMuaXNDdXN0b21TdGF0dXMpIHtcbiAgICAgIHRoaXMuX3N0YXR1cyA9IGN1cnJlbnQgPiB0aGlzLmluZGV4ID8gJ2ZpbmlzaCcgOiBjdXJyZW50ID09PSB0aGlzLmluZGV4ID8gdGhpcy5vdXRTdGF0dXMgfHwgJycgOiAnd2FpdCc7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY3VycmVudEluZGV4ID0gMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgZGVzdHJveSQ6IE56RGVzdHJveVNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT5cbiAgICAgIGZyb21FdmVudCh0aGlzLml0ZW1Db250YWluZXIubmF0aXZlRWxlbWVudCwgJ2NsaWNrJylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuY2xpY2thYmxlICYmIHRoaXMuY3VycmVudEluZGV4ICE9PSB0aGlzLmluZGV4ICYmICF0aGlzLm56RGlzYWJsZWQpLFxuICAgICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2xpY2tPdXRzaWRlQW5ndWxhciQubmV4dCh0aGlzLmluZGV4KTtcbiAgICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZW5hYmxlKCk6IHZvaWQge1xuICAgIHRoaXMubnpEaXNhYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZGlzYWJsZSgpOiB2b2lkIHtcbiAgICB0aGlzLm56RGlzYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgbWFya0ZvckNoZWNrKCk6IHZvaWQge1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iXX0=