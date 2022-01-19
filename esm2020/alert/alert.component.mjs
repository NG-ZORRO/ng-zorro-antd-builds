import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Optional, Output, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { slideAlertMotion } from 'ng-zorro-antd/core/animation';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "@angular/cdk/bidi";
import * as i3 from "@angular/common";
import * as i4 from "ng-zorro-antd/icon";
import * as i5 from "ng-zorro-antd/core/outlet";
const NZ_CONFIG_MODULE_NAME = 'alert';
export class NzAlertComponent {
    constructor(nzConfigService, cdr, directionality) {
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzCloseText = null;
        this.nzIconType = null;
        this.nzMessage = null;
        this.nzDescription = null;
        this.nzType = 'info';
        this.nzCloseable = false;
        this.nzShowIcon = false;
        this.nzBanner = false;
        this.nzNoAnimation = false;
        this.nzOnClose = new EventEmitter();
        this.closed = false;
        this.iconTheme = 'fill';
        this.inferredIconType = 'info-circle';
        this.dir = 'ltr';
        this.isTypeSet = false;
        this.isShowIconSet = false;
        this.destroy$ = new Subject();
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.cdr.markForCheck();
        });
    }
    ngOnInit() {
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    closeAlert() {
        this.closed = true;
    }
    onFadeAnimationDone() {
        if (this.closed) {
            this.nzOnClose.emit(true);
        }
    }
    ngOnChanges(changes) {
        const { nzShowIcon, nzDescription, nzType, nzBanner } = changes;
        if (nzShowIcon) {
            this.isShowIconSet = true;
        }
        if (nzType) {
            this.isTypeSet = true;
            switch (this.nzType) {
                case 'error':
                    this.inferredIconType = 'close-circle';
                    break;
                case 'success':
                    this.inferredIconType = 'check-circle';
                    break;
                case 'info':
                    this.inferredIconType = 'info-circle';
                    break;
                case 'warning':
                    this.inferredIconType = 'exclamation-circle';
                    break;
            }
        }
        if (nzDescription) {
            this.iconTheme = this.nzDescription ? 'outline' : 'fill';
        }
        if (nzBanner) {
            if (!this.isTypeSet) {
                this.nzType = 'warning';
            }
            if (!this.isShowIconSet) {
                this.nzShowIcon = true;
            }
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzAlertComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAlertComponent, deps: [{ token: i1.NzConfigService }, { token: i0.ChangeDetectorRef }, { token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzAlertComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzAlertComponent, selector: "nz-alert", inputs: { nzCloseText: "nzCloseText", nzIconType: "nzIconType", nzMessage: "nzMessage", nzDescription: "nzDescription", nzType: "nzType", nzCloseable: "nzCloseable", nzShowIcon: "nzShowIcon", nzBanner: "nzBanner", nzNoAnimation: "nzNoAnimation" }, outputs: { nzOnClose: "nzOnClose" }, exportAs: ["nzAlert"], usesOnChanges: true, ngImport: i0, template: `
    <div
      *ngIf="!closed"
      class="ant-alert"
      [class.ant-alert-rtl]="dir === 'rtl'"
      [class.ant-alert-success]="nzType === 'success'"
      [class.ant-alert-info]="nzType === 'info'"
      [class.ant-alert-warning]="nzType === 'warning'"
      [class.ant-alert-error]="nzType === 'error'"
      [class.ant-alert-no-icon]="!nzShowIcon"
      [class.ant-alert-banner]="nzBanner"
      [class.ant-alert-closable]="nzCloseable"
      [class.ant-alert-with-description]="!!nzDescription"
      [@.disabled]="nzNoAnimation"
      [@slideAlertMotion]
      (@slideAlertMotion.done)="onFadeAnimationDone()"
    >
      <ng-container *ngIf="nzShowIcon">
        <i nz-icon class="ant-alert-icon" [nzType]="nzIconType || inferredIconType" [nzTheme]="iconTheme"></i>
      </ng-container>
      <div class="ant-alert-content" *ngIf="nzMessage || nzDescription">
        <span class="ant-alert-message" *ngIf="nzMessage">
          <ng-container *nzStringTemplateOutlet="nzMessage">{{ nzMessage }}</ng-container>
        </span>
        <span class="ant-alert-description" *ngIf="nzDescription">
          <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
        </span>
      </div>
      <button
        type="button"
        tabindex="0"
        *ngIf="nzCloseable || nzCloseText"
        class="ant-alert-close-icon"
        (click)="closeAlert()"
      >
        <ng-template #closeDefaultTemplate>
          <i nz-icon nzType="close"></i>
        </ng-template>
        <ng-container *ngIf="nzCloseText; else closeDefaultTemplate">
          <ng-container *nzStringTemplateOutlet="nzCloseText">
            <span class="ant-alert-close-text">{{ nzCloseText }}</span>
          </ng-container>
        </ng-container>
      </button>
    </div>
  `, isInline: true, directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i5.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], animations: [slideAlertMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    WithConfig(),
    InputBoolean()
], NzAlertComponent.prototype, "nzCloseable", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzAlertComponent.prototype, "nzShowIcon", void 0);
__decorate([
    InputBoolean()
], NzAlertComponent.prototype, "nzBanner", void 0);
__decorate([
    InputBoolean()
], NzAlertComponent.prototype, "nzNoAnimation", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAlertComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-alert',
                    exportAs: 'nzAlert',
                    animations: [slideAlertMotion],
                    template: `
    <div
      *ngIf="!closed"
      class="ant-alert"
      [class.ant-alert-rtl]="dir === 'rtl'"
      [class.ant-alert-success]="nzType === 'success'"
      [class.ant-alert-info]="nzType === 'info'"
      [class.ant-alert-warning]="nzType === 'warning'"
      [class.ant-alert-error]="nzType === 'error'"
      [class.ant-alert-no-icon]="!nzShowIcon"
      [class.ant-alert-banner]="nzBanner"
      [class.ant-alert-closable]="nzCloseable"
      [class.ant-alert-with-description]="!!nzDescription"
      [@.disabled]="nzNoAnimation"
      [@slideAlertMotion]
      (@slideAlertMotion.done)="onFadeAnimationDone()"
    >
      <ng-container *ngIf="nzShowIcon">
        <i nz-icon class="ant-alert-icon" [nzType]="nzIconType || inferredIconType" [nzTheme]="iconTheme"></i>
      </ng-container>
      <div class="ant-alert-content" *ngIf="nzMessage || nzDescription">
        <span class="ant-alert-message" *ngIf="nzMessage">
          <ng-container *nzStringTemplateOutlet="nzMessage">{{ nzMessage }}</ng-container>
        </span>
        <span class="ant-alert-description" *ngIf="nzDescription">
          <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
        </span>
      </div>
      <button
        type="button"
        tabindex="0"
        *ngIf="nzCloseable || nzCloseText"
        class="ant-alert-close-icon"
        (click)="closeAlert()"
      >
        <ng-template #closeDefaultTemplate>
          <i nz-icon nzType="close"></i>
        </ng-template>
        <ng-container *ngIf="nzCloseText; else closeDefaultTemplate">
          <ng-container *nzStringTemplateOutlet="nzCloseText">
            <span class="ant-alert-close-text">{{ nzCloseText }}</span>
          </ng-container>
        </ng-container>
      </button>
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false
                }]
        }], ctorParameters: function () { return [{ type: i1.NzConfigService }, { type: i0.ChangeDetectorRef }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzCloseText: [{
                type: Input
            }], nzIconType: [{
                type: Input
            }], nzMessage: [{
                type: Input
            }], nzDescription: [{
                type: Input
            }], nzType: [{
                type: Input
            }], nzCloseable: [{
                type: Input
            }], nzShowIcon: [{
                type: Input
            }], nzBanner: [{
                type: Input
            }], nzNoAnimation: [{
                type: Input
            }], nzOnClose: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9hbGVydC9hbGVydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBSUwsUUFBUSxFQUNSLE1BQU0sRUFHTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFnQyxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7Ozs7QUFFdkQsTUFBTSxxQkFBcUIsR0FBZ0IsT0FBTyxDQUFDO0FBd0RuRCxNQUFNLE9BQU8sZ0JBQWdCO0lBeUIzQixZQUNTLGVBQWdDLEVBQy9CLEdBQXNCLEVBQ1YsY0FBOEI7UUFGM0Msb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQy9CLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ1YsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBM0IzQyxrQkFBYSxHQUFnQixxQkFBcUIsQ0FBQztRQU1uRCxnQkFBVyxHQUFzQyxJQUFJLENBQUM7UUFDdEQsZUFBVSxHQUFrQixJQUFJLENBQUM7UUFDakMsY0FBUyxHQUFzQyxJQUFJLENBQUM7UUFDcEQsa0JBQWEsR0FBc0MsSUFBSSxDQUFDO1FBQ3hELFdBQU0sR0FBNkMsTUFBTSxDQUFDO1FBQzVCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDMUMsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNq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QUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7NkdBOUZVLGdCQUFnQjtpR0FBaEIsZ0JBQWdCLHlYQWxEakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZDVCw0ZEE5Q1csQ0FBQyxnQkFBZ0IsQ0FBQztBQStEUztJQUE3QixVQUFVLEVBQUU7SUFBRSxZQUFZLEVBQUU7cURBQThCO0FBQzdCO0lBQTdCLFVBQVUsRUFBRTtJQUFFLFlBQVksRUFBRTtvREFBNkI7QUFDMUM7SUFBZixZQUFZLEVBQUU7a0RBQWtCO0FBQ2pCO0lBQWYsWUFBWSxFQUFFO3VEQUF1QjsyRkFmcEMsZ0JBQWdCO2tCQXRENUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsUUFBUSxFQUFFLFNBQVM7b0JBQ25CLFVBQVUsRUFBRSxDQUFDLGdCQUFnQixDQUFDO29CQUM5QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZDVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLG1CQUFtQixFQUFFLEtBQUs7aUJBQzNCOzswQkE2QkksUUFBUTs0Q0FyQkYsV0FBVztzQkFBbkIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ2lDLFdBQVc7c0JBQWpELEtBQUs7Z0JBQ2lDLFVBQVU7c0JBQWhELEtBQUs7Z0JBQ21CLFFBQVE7c0JBQWhDLEtBQUs7Z0JBQ21CLGFBQWE7c0JBQXJDLEtBQUs7Z0JBQ2EsU0FBUztzQkFBM0IsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBzbGlkZUFsZXJ0TW90aW9uIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2FuaW1hdGlvbic7XG5pbXBvcnQgeyBOekNvbmZpZ0tleSwgTnpDb25maWdTZXJ2aWNlLCBXaXRoQ29uZmlnIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2NvbmZpZyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5jb25zdCBOWl9DT05GSUdfTU9EVUxFX05BTUU6IE56Q29uZmlnS2V5ID0gJ2FsZXJ0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotYWxlcnQnLFxuICBleHBvcnRBczogJ256QWxlcnQnLFxuICBhbmltYXRpb25zOiBbc2xpZGVBbGVydE1vdGlvbl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgKm5nSWY9XCIhY2xvc2VkXCJcbiAgICAgIGNsYXNzPVwiYW50LWFsZXJ0XCJcbiAgICAgIFtjbGFzcy5hbnQtYWxlcnQtcnRsXT1cImRpciA9PT0gJ3J0bCdcIlxuICAgICAgW2NsYXNzLmFudC1hbGVydC1zdWNjZXNzXT1cIm56VHlwZSA9PT0gJ3N1Y2Nlc3MnXCJcbiAgICAgIFtjbGFzcy5hbnQtYWxlcnQtaW5mb109XCJuelR5cGUgPT09ICdpbmZvJ1wiXG4gICAgICBbY2xhc3MuYW50LWFsZXJ0LXdhcm5pbmddPVwibnpUeXBlID09PSAnd2FybmluZydcIlxuICAgICAgW2NsYXNzLmFudC1hbGVydC1lcnJvcl09XCJuelR5cGUgPT09ICdlcnJvcidcIlxuICAgICAgW2NsYXNzLmFudC1hbGVydC1uby1pY29uXT1cIiFuelNob3dJY29uXCJcbiAgICAgIFtjbGFzcy5hbnQtYWxlcnQtYmFubmVyXT1cIm56QmFubmVyXCJcbiAgICAgIFtjbGFzcy5hbnQtYWxlcnQtY2xvc2FibGVdPVwibnpDbG9zZWFibGVcIlxuICAgICAgW2NsYXNzLmFudC1hbGVydC13aXRoLWRlc2NyaXB0aW9uXT1cIiEhbnpEZXNjcmlwdGlvblwiXG4gICAgICBbQC5kaXNhYmxlZF09XCJuek5vQW5pbWF0aW9uXCJcbiAgICAgIFtAc2xpZGVBbGVydE1vdGlvbl1cbiAgICAgIChAc2xpZGVBbGVydE1vdGlvbi5kb25lKT1cIm9uRmFkZUFuaW1hdGlvbkRvbmUoKVwiXG4gICAgPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm56U2hvd0ljb25cIj5cbiAgICAgICAgPGkgbnotaWNvbiBjbGFzcz1cImFudC1hbGVydC1pY29uXCIgW256VHlwZV09XCJuekljb25UeXBlIHx8IGluZmVycmVkSWNvblR5cGVcIiBbbnpUaGVtZV09XCJpY29uVGhlbWVcIj48L2k+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhbnQtYWxlcnQtY29udGVudFwiICpuZ0lmPVwibnpNZXNzYWdlIHx8IG56RGVzY3JpcHRpb25cIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhbnQtYWxlcnQtbWVzc2FnZVwiICpuZ0lmPVwibnpNZXNzYWdlXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56TWVzc2FnZVwiPnt7IG56TWVzc2FnZSB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYW50LWFsZXJ0LWRlc2NyaXB0aW9uXCIgKm5nSWY9XCJuekRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56RGVzY3JpcHRpb25cIj57eyBuekRlc2NyaXB0aW9uIH19PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgKm5nSWY9XCJuekNsb3NlYWJsZSB8fCBuekNsb3NlVGV4dFwiXG4gICAgICAgIGNsYXNzPVwiYW50LWFsZXJ0LWNsb3NlLWljb25cIlxuICAgICAgICAoY2xpY2spPVwiY2xvc2VBbGVydCgpXCJcbiAgICAgID5cbiAgICAgICAgPG5nLXRlbXBsYXRlICNjbG9zZURlZmF1bHRUZW1wbGF0ZT5cbiAgICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cImNsb3NlXCI+PC9pPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibnpDbG9zZVRleHQ7IGVsc2UgY2xvc2VEZWZhdWx0VGVtcGxhdGVcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpDbG9zZVRleHRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW50LWFsZXJ0LWNsb3NlLXRleHRcIj57eyBuekNsb3NlVGV4dCB9fTwvc3Bhbj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIE56QWxlcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgcmVhZG9ubHkgX256TW9kdWxlTmFtZTogTnpDb25maWdLZXkgPSBOWl9DT05GSUdfTU9EVUxFX05BTUU7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekNsb3NlYWJsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTaG93SWNvbjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpCYW5uZXI6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Tm9BbmltYXRpb246IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBuekNsb3NlVGV4dDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpJY29uVHlwZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56TWVzc2FnZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpEZXNjcmlwdGlvbjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpUeXBlOiAnc3VjY2VzcycgfCAnaW5mbycgfCAnd2FybmluZycgfCAnZXJyb3InID0gJ2luZm8nO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIEBJbnB1dEJvb2xlYW4oKSBuekNsb3NlYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIEBJbnB1dEJvb2xlYW4oKSBuelNob3dJY29uOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekJhbm5lciA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpOb0FuaW1hdGlvbiA9IGZhbHNlO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpPbkNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBjbG9zZWQgPSBmYWxzZTtcbiAgaWNvblRoZW1lOiAnb3V0bGluZScgfCAnZmlsbCcgPSAnZmlsbCc7XG4gIGluZmVycmVkSWNvblR5cGU6IHN0cmluZyA9ICdpbmZvLWNpcmNsZSc7XG4gIGRpcjogRGlyZWN0aW9uID0gJ2x0cic7XG4gIHByaXZhdGUgaXNUeXBlU2V0ID0gZmFsc2U7XG4gIHByaXZhdGUgaXNTaG93SWNvblNldCA9IGZhbHNlO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbnpDb25maWdTZXJ2aWNlOiBOekNvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5XG4gICkge1xuICAgIHRoaXMubnpDb25maWdTZXJ2aWNlXG4gICAgICAuZ2V0Q29uZmlnQ2hhbmdlRXZlbnRGb3JDb21wb25lbnQoTlpfQ09ORklHX01PRFVMRV9OQU1FKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmRpcmVjdGlvbmFsaXR5LmNoYW5nZT8ucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoZGlyZWN0aW9uOiBEaXJlY3Rpb24pID0+IHtcbiAgICAgIHRoaXMuZGlyID0gZGlyZWN0aW9uO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kaXIgPSB0aGlzLmRpcmVjdGlvbmFsaXR5LnZhbHVlO1xuICB9XG5cbiAgY2xvc2VBbGVydCgpOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlZCA9IHRydWU7XG4gIH1cblxuICBvbkZhZGVBbmltYXRpb25Eb25lKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgdGhpcy5uek9uQ2xvc2UuZW1pdCh0cnVlKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuelNob3dJY29uLCBuekRlc2NyaXB0aW9uLCBuelR5cGUsIG56QmFubmVyIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChuelNob3dJY29uKSB7XG4gICAgICB0aGlzLmlzU2hvd0ljb25TZXQgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAobnpUeXBlKSB7XG4gICAgICB0aGlzLmlzVHlwZVNldCA9IHRydWU7XG4gICAgICBzd2l0Y2ggKHRoaXMubnpUeXBlKSB7XG4gICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICB0aGlzLmluZmVycmVkSWNvblR5cGUgPSAnY2xvc2UtY2lyY2xlJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICAgICAgdGhpcy5pbmZlcnJlZEljb25UeXBlID0gJ2NoZWNrLWNpcmNsZSc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2luZm8nOlxuICAgICAgICAgIHRoaXMuaW5mZXJyZWRJY29uVHlwZSA9ICdpbmZvLWNpcmNsZSc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3dhcm5pbmcnOlxuICAgICAgICAgIHRoaXMuaW5mZXJyZWRJY29uVHlwZSA9ICdleGNsYW1hdGlvbi1jaXJjbGUnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAobnpEZXNjcmlwdGlvbikge1xuICAgICAgdGhpcy5pY29uVGhlbWUgPSB0aGlzLm56RGVzY3JpcHRpb24gPyAnb3V0bGluZScgOiAnZmlsbCc7XG4gICAgfVxuICAgIGlmIChuekJhbm5lcikge1xuICAgICAgaWYgKCF0aGlzLmlzVHlwZVNldCkge1xuICAgICAgICB0aGlzLm56VHlwZSA9ICd3YXJuaW5nJztcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5pc1Nob3dJY29uU2V0KSB7XG4gICAgICAgIHRoaXMubnpTaG93SWNvbiA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19