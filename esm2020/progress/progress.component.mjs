import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, Input, Optional, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputNumber, isNotNil } from 'ng-zorro-antd/core/util';
import { handleCircleGradient, handleLinearGradient } from './utils';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "@angular/cdk/bidi";
import * as i3 from "@angular/common";
import * as i4 from "ng-zorro-antd/icon";
import * as i5 from "ng-zorro-antd/core/outlet";
let gradientIdSeed = 0;
const NZ_CONFIG_MODULE_NAME = 'progress';
const statusIconNameMap = new Map([
    ['success', 'check'],
    ['exception', 'close']
]);
const statusColorMap = new Map([
    ['normal', '#108ee9'],
    ['exception', '#ff5500'],
    ['success', '#87d068']
]);
const defaultFormatter = (p) => `${p}%`;
export class NzProgressComponent {
    constructor(cdr, nzConfigService, directionality) {
        this.cdr = cdr;
        this.nzConfigService = nzConfigService;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzShowInfo = true;
        this.nzWidth = 132;
        this.nzStrokeColor = undefined;
        this.nzSize = 'default';
        this.nzPercent = 0;
        this.nzStrokeWidth = undefined;
        this.nzGapDegree = undefined;
        this.nzType = 'line';
        this.nzGapPosition = 'top';
        this.nzStrokeLinecap = 'round';
        this.nzSteps = 0;
        this.steps = [];
        /** Gradient style when `nzType` is `line`. */
        this.lineGradient = null;
        /** If user uses gradient color. */
        this.isGradient = false;
        /** If the linear progress is a step progress. */
        this.isSteps = false;
        /**
         * Each progress whose `nzType` is circle or dashboard should have unique id to
         * define `<linearGradient>`.
         */
        this.gradientId = gradientIdSeed++;
        /** Paths to rendered in the template. */
        this.progressCirclePath = [];
        this.trailPathStyle = null;
        this.dir = 'ltr';
        this.trackByFn = (index) => `${index}`;
        this.cachedStatus = 'normal';
        this.inferredStatus = 'normal';
        this.destroy$ = new Subject();
    }
    get formatter() {
        return this.nzFormat || defaultFormatter;
    }
    get status() {
        return this.nzStatus || this.inferredStatus;
    }
    get strokeWidth() {
        return this.nzStrokeWidth || (this.nzType === 'line' && this.nzSize !== 'small' ? 8 : 6);
    }
    get isCircleStyle() {
        return this.nzType === 'circle' || this.nzType === 'dashboard';
    }
    ngOnChanges(changes) {
        const { nzSteps, nzGapPosition, nzStrokeLinecap, nzStrokeColor, nzGapDegree, nzType, nzStatus, nzPercent, nzSuccessPercent, nzStrokeWidth } = changes;
        if (nzStatus) {
            this.cachedStatus = this.nzStatus || this.cachedStatus;
        }
        if (nzPercent || nzSuccessPercent) {
            const fillAll = parseInt(this.nzPercent.toString(), 10) >= 100;
            if (fillAll) {
                if ((isNotNil(this.nzSuccessPercent) && this.nzSuccessPercent >= 100) || this.nzSuccessPercent === undefined) {
                    this.inferredStatus = 'success';
                }
            }
            else {
                this.inferredStatus = this.cachedStatus;
            }
        }
        if (nzStatus || nzPercent || nzSuccessPercent || nzStrokeColor) {
            this.updateIcon();
        }
        if (nzStrokeColor) {
            this.setStrokeColor();
        }
        if (nzGapPosition || nzStrokeLinecap || nzGapDegree || nzType || nzPercent || nzStrokeColor || nzStrokeColor) {
            this.getCirclePaths();
        }
        if (nzPercent || nzSteps || nzStrokeWidth) {
            this.isSteps = this.nzSteps > 0;
            if (this.isSteps) {
                this.getSteps();
            }
        }
    }
    ngOnInit() {
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.updateIcon();
            this.setStrokeColor();
            this.getCirclePaths();
        });
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    updateIcon() {
        const ret = statusIconNameMap.get(this.status);
        this.icon = ret ? ret + (this.isCircleStyle ? '-o' : '-circle-fill') : '';
    }
    /**
     * Calculate step render configs.
     */
    getSteps() {
        const current = Math.floor(this.nzSteps * (this.nzPercent / 100));
        const stepWidth = this.nzSize === 'small' ? 2 : 14;
        const steps = [];
        for (let i = 0; i < this.nzSteps; i++) {
            let color;
            if (i <= current - 1) {
                color = this.nzStrokeColor;
            }
            const stepStyle = {
                backgroundColor: `${color}`,
                width: `${stepWidth}px`,
                height: `${this.strokeWidth}px`
            };
            steps.push(stepStyle);
        }
        this.steps = steps;
    }
    /**
     * Calculate paths when the type is circle or dashboard.
     */
    getCirclePaths() {
        if (!this.isCircleStyle) {
            return;
        }
        const values = isNotNil(this.nzSuccessPercent) ? [this.nzSuccessPercent, this.nzPercent] : [this.nzPercent];
        // Calculate shared styles.
        const radius = 50 - this.strokeWidth / 2;
        const gapPosition = this.nzGapPosition || (this.nzType === 'circle' ? 'top' : 'bottom');
        const len = Math.PI * 2 * radius;
        const gapDegree = this.nzGapDegree || (this.nzType === 'circle' ? 0 : 75);
        let beginPositionX = 0;
        let beginPositionY = -radius;
        let endPositionX = 0;
        let endPositionY = radius * -2;
        switch (gapPosition) {
            case 'left':
                beginPositionX = -radius;
                beginPositionY = 0;
                endPositionX = radius * 2;
                endPositionY = 0;
                break;
            case 'right':
                beginPositionX = radius;
                beginPositionY = 0;
                endPositionX = radius * -2;
                endPositionY = 0;
                break;
            case 'bottom':
                beginPositionY = radius;
                endPositionY = radius * 2;
                break;
            default:
        }
        this.pathString = `M 50,50 m ${beginPositionX},${beginPositionY}
       a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
       a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`;
        this.trailPathStyle = {
            strokeDasharray: `${len - gapDegree}px ${len}px`,
            strokeDashoffset: `-${gapDegree / 2}px`,
            transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
        };
        // Calculate styles for each path.
        this.progressCirclePath = values
            .map((value, index) => {
            const isSuccessPercent = values.length === 2 && index === 0;
            return {
                stroke: this.isGradient && !isSuccessPercent ? `url(#gradient-${this.gradientId})` : null,
                strokePathStyle: {
                    stroke: !this.isGradient
                        ? isSuccessPercent
                            ? statusColorMap.get('success')
                            : this.nzStrokeColor
                        : null,
                    transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s',
                    strokeDasharray: `${((value || 0) / 100) * (len - gapDegree)}px ${len}px`,
                    strokeDashoffset: `-${gapDegree / 2}px`
                }
            };
        })
            .reverse();
    }
    setStrokeColor() {
        const color = this.nzStrokeColor;
        const isGradient = (this.isGradient = !!color && typeof color !== 'string');
        if (isGradient && !this.isCircleStyle) {
            this.lineGradient = handleLinearGradient(color);
        }
        else if (isGradient && this.isCircleStyle) {
            this.circleGradient = handleCircleGradient(this.nzStrokeColor);
        }
        else {
            this.lineGradient = null;
            this.circleGradient = [];
        }
    }
}
NzProgressComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzProgressComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.NzConfigService }, { token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzProgressComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzProgressComponent, selector: "nz-progress", inputs: { nzShowInfo: "nzShowInfo", nzWidth: "nzWidth", nzStrokeColor: "nzStrokeColor", nzSize: "nzSize", nzFormat: "nzFormat", nzSuccessPercent: "nzSuccessPercent", nzPercent: "nzPercent", nzStrokeWidth: "nzStrokeWidth", nzGapDegree: "nzGapDegree", nzStatus: "nzStatus", nzType: "nzType", nzGapPosition: "nzGapPosition", nzStrokeLinecap: "nzStrokeLinecap", nzSteps: "nzSteps" }, exportAs: ["nzProgress"], usesOnChanges: true, ngImport: i0, template: `
    <ng-template #progressInfoTemplate>
      <span class="ant-progress-text" *ngIf="nzShowInfo">
        <ng-container *ngIf="(status === 'exception' || status === 'success') && !nzFormat; else formatTemplate">
          <i nz-icon [nzType]="icon"></i>
        </ng-container>
        <ng-template #formatTemplate>
          <ng-container *nzStringTemplateOutlet="formatter; context: { $implicit: nzPercent }; let formatter">
            {{ formatter(nzPercent) }}
          </ng-container>
        </ng-template>
      </span>
    </ng-template>

    <div
      [ngClass]="'ant-progress ant-progress-status-' + status"
      [class.ant-progress-line]="nzType === 'line'"
      [class.ant-progress-small]="nzSize === 'small'"
      [class.ant-progress-show-info]="nzShowInfo"
      [class.ant-progress-circle]="isCircleStyle"
      [class.ant-progress-steps]="isSteps"
      [class.ant-progress-rtl]="dir === 'rtl'"
    >
      <!-- line progress -->
      <div *ngIf="nzType === 'line'">
        <!-- normal line style -->
        <ng-container *ngIf="!isSteps">
          <div class="ant-progress-outer" *ngIf="!isSteps">
            <div class="ant-progress-inner">
              <div
                class="ant-progress-bg"
                [style.width.%]="nzPercent"
                [style.border-radius]="nzStrokeLinecap === 'round' ? '100px' : '0'"
                [style.background]="!isGradient ? nzStrokeColor : null"
                [style.background-image]="isGradient ? lineGradient : null"
                [style.height.px]="strokeWidth"
              ></div>
              <div
                *ngIf="nzSuccessPercent || nzSuccessPercent === 0"
                class="ant-progress-success-bg"
                [style.width.%]="nzSuccessPercent"
                [style.border-radius]="nzStrokeLinecap === 'round' ? '100px' : '0'"
                [style.height.px]="strokeWidth"
              ></div>
            </div>
          </div>
          <ng-template [ngTemplateOutlet]="progressInfoTemplate"></ng-template>
        </ng-container>
        <!-- step style -->
        <div class="ant-progress-steps-outer" *ngIf="isSteps">
          <div *ngFor="let step of steps; let i = index" class="ant-progress-steps-item" [ngStyle]="step"></div>
          <ng-template [ngTemplateOutlet]="progressInfoTemplate"></ng-template>
        </div>
      </div>

      <!-- circle / dashboard progress -->
      <div
        [style.width.px]="this.nzWidth"
        [style.height.px]="this.nzWidth"
        [style.fontSize.px]="this.nzWidth * 0.15 + 6"
        class="ant-progress-inner"
        [class.ant-progress-circle-gradient]="isGradient"
        *ngIf="isCircleStyle"
      >
        <svg class="ant-progress-circle " viewBox="0 0 100 100">
          <defs *ngIf="isGradient">
            <linearGradient [id]="'gradient-' + gradientId" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop *ngFor="let i of circleGradient" [attr.offset]="i.offset" [attr.stop-color]="i.color"></stop>
            </linearGradient>
          </defs>
          <path
            class="ant-progress-circle-trail"
            stroke="#f3f3f3"
            fill-opacity="0"
            [attr.stroke-width]="strokeWidth"
            [attr.d]="pathString"
            [ngStyle]="trailPathStyle"
          ></path>
          <path
            *ngFor="let p of progressCirclePath; trackBy: trackByFn"
            class="ant-progress-circle-path"
            fill-opacity="0"
            [attr.d]="pathString"
            [attr.stroke-linecap]="nzStrokeLinecap"
            [attr.stroke]="p.stroke"
            [attr.stroke-width]="nzPercent ? strokeWidth : 0"
            [ngStyle]="p.strokePathStyle"
          ></path>
        </svg>
        <ng-template [ngTemplateOutlet]="progressInfoTemplate"></ng-template>
      </div>
    </div>
  `, isInline: true, directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i5.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    WithConfig()
], NzProgressComponent.prototype, "nzShowInfo", void 0);
__decorate([
    WithConfig()
], NzProgressComponent.prototype, "nzStrokeColor", void 0);
__decorate([
    WithConfig()
], NzProgressComponent.prototype, "nzSize", void 0);
__decorate([
    InputNumber()
], NzProgressComponent.prototype, "nzSuccessPercent", void 0);
__decorate([
    InputNumber()
], NzProgressComponent.prototype, "nzPercent", void 0);
__decorate([
    WithConfig(),
    InputNumber()
], NzProgressComponent.prototype, "nzStrokeWidth", void 0);
__decorate([
    WithConfig(),
    InputNumber()
], NzProgressComponent.prototype, "nzGapDegree", void 0);
__decorate([
    WithConfig()
], NzProgressComponent.prototype, "nzGapPosition", void 0);
__decorate([
    WithConfig()
], NzProgressComponent.prototype, "nzStrokeLinecap", void 0);
__decorate([
    InputNumber()
], NzProgressComponent.prototype, "nzSteps", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzProgressComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-progress',
                    exportAs: 'nzProgress',
                    preserveWhitespaces: false,
                    template: `
    <ng-template #progressInfoTemplate>
      <span class="ant-progress-text" *ngIf="nzShowInfo">
        <ng-container *ngIf="(status === 'exception' || status === 'success') && !nzFormat; else formatTemplate">
          <i nz-icon [nzType]="icon"></i>
        </ng-container>
        <ng-template #formatTemplate>
          <ng-container *nzStringTemplateOutlet="formatter; context: { $implicit: nzPercent }; let formatter">
            {{ formatter(nzPercent) }}
          </ng-container>
        </ng-template>
      </span>
    </ng-template>

    <div
      [ngClass]="'ant-progress ant-progress-status-' + status"
      [class.ant-progress-line]="nzType === 'line'"
      [class.ant-progress-small]="nzSize === 'small'"
      [class.ant-progress-show-info]="nzShowInfo"
      [class.ant-progress-circle]="isCircleStyle"
      [class.ant-progress-steps]="isSteps"
      [class.ant-progress-rtl]="dir === 'rtl'"
    >
      <!-- line progress -->
      <div *ngIf="nzType === 'line'">
        <!-- normal line style -->
        <ng-container *ngIf="!isSteps">
          <div class="ant-progress-outer" *ngIf="!isSteps">
            <div class="ant-progress-inner">
              <div
                class="ant-progress-bg"
                [style.width.%]="nzPercent"
                [style.border-radius]="nzStrokeLinecap === 'round' ? '100px' : '0'"
                [style.background]="!isGradient ? nzStrokeColor : null"
                [style.background-image]="isGradient ? lineGradient : null"
                [style.height.px]="strokeWidth"
              ></div>
              <div
                *ngIf="nzSuccessPercent || nzSuccessPercent === 0"
                class="ant-progress-success-bg"
                [style.width.%]="nzSuccessPercent"
                [style.border-radius]="nzStrokeLinecap === 'round' ? '100px' : '0'"
                [style.height.px]="strokeWidth"
              ></div>
            </div>
          </div>
          <ng-template [ngTemplateOutlet]="progressInfoTemplate"></ng-template>
        </ng-container>
        <!-- step style -->
        <div class="ant-progress-steps-outer" *ngIf="isSteps">
          <div *ngFor="let step of steps; let i = index" class="ant-progress-steps-item" [ngStyle]="step"></div>
          <ng-template [ngTemplateOutlet]="progressInfoTemplate"></ng-template>
        </div>
      </div>

      <!-- circle / dashboard progress -->
      <div
        [style.width.px]="this.nzWidth"
        [style.height.px]="this.nzWidth"
        [style.fontSize.px]="this.nzWidth * 0.15 + 6"
        class="ant-progress-inner"
        [class.ant-progress-circle-gradient]="isGradient"
        *ngIf="isCircleStyle"
      >
        <svg class="ant-progress-circle " viewBox="0 0 100 100">
          <defs *ngIf="isGradient">
            <linearGradient [id]="'gradient-' + gradientId" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop *ngFor="let i of circleGradient" [attr.offset]="i.offset" [attr.stop-color]="i.color"></stop>
            </linearGradient>
          </defs>
          <path
            class="ant-progress-circle-trail"
            stroke="#f3f3f3"
            fill-opacity="0"
            [attr.stroke-width]="strokeWidth"
            [attr.d]="pathString"
            [ngStyle]="trailPathStyle"
          ></path>
          <path
            *ngFor="let p of progressCirclePath; trackBy: trackByFn"
            class="ant-progress-circle-path"
            fill-opacity="0"
            [attr.d]="pathString"
            [attr.stroke-linecap]="nzStrokeLinecap"
            [attr.stroke]="p.stroke"
            [attr.stroke-width]="nzPercent ? strokeWidth : 0"
            [ngStyle]="p.strokePathStyle"
          ></path>
        </svg>
        <ng-template [ngTemplateOutlet]="progressInfoTemplate"></ng-template>
      </div>
    </div>
  `
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.NzConfigService }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzShowInfo: [{
                type: Input
            }], nzWidth: [{
                type: Input
            }], nzStrokeColor: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzFormat: [{
                type: Input
            }], nzSuccessPercent: [{
                type: Input
            }], nzPercent: [{
                type: Input
            }], nzStrokeWidth: [{
                type: Input
            }], nzGapDegree: [{
                type: Input
            }], nzStatus: [{
                type: Input
            }], nzType: [{
                type: Input
            }], nzGapPosition: [{
                type: Input
            }], nzStrokeLinecap: [{
                type: Input
            }], nzSteps: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9wcm9ncmVzcy9wcm9ncmVzcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULEtBQUssRUFJTCxRQUFRLEVBRVIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBZ0MsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFckYsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQWNoRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxTQUFTLENBQUM7Ozs7Ozs7QUFFckUsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO0FBRXZCLE1BQU0scUJBQXFCLEdBQWdCLFVBQVUsQ0FBQztBQUN0RCxNQUFNLGlCQUFpQixHQUFHLElBQUksR0FBRyxDQUFDO0lBQ2hDLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQztJQUNwQixDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUM7Q0FDdkIsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUM7SUFDN0IsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDO0lBQ3JCLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQztJQUN4QixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUM7Q0FDdkIsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxnQkFBZ0IsR0FBd0IsQ0FBQyxDQUFTLEVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7QUFzRzdFLE1BQU0sT0FBTyxtQkFBbUI7SUF5RTlC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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEZUO2lCQUNGOzswQkE2RUksUUFBUTs0Q0FuRVksVUFBVTtzQkFBaEMsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ2lCLGFBQWE7c0JBQW5DLEtBQUs7Z0JBQ2lCLE1BQU07c0JBQTVCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDa0IsZ0JBQWdCO3NCQUF2QyxLQUFLO2dCQUNrQixTQUFTO3NCQUFoQyxLQUFLO2dCQUNnQyxhQUFhO3NCQUFsRCxLQUFLO2dCQUNnQyxXQUFXO3NCQUFoRCxLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNpQixhQUFhO3NCQUFuQyxLQUFLO2dCQUNpQixlQUFlO3NCQUFyQyxLQUFLO2dCQUVrQixPQUFPO3NCQUE5QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aW9uLCBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOekNvbmZpZ0tleSwgTnpDb25maWdTZXJ2aWNlLCBXaXRoQ29uZmlnIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2NvbmZpZyc7XG5pbXBvcnQgeyBOZ1N0eWxlSW50ZXJmYWNlLCBOdW1iZXJJbnB1dCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dE51bWJlciwgaXNOb3ROaWwgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7XG4gIE56UHJvZ3Jlc3NDaXJjbGVQYXRoLFxuICBOelByb2dyZXNzQ29sb3JHcmFkaWVudCxcbiAgTnpQcm9ncmVzc0Zvcm1hdHRlcixcbiAgTnpQcm9ncmVzc0dhcFBvc2l0aW9uVHlwZSxcbiAgTnpQcm9ncmVzc0dyYWRpZW50UHJvZ3Jlc3MsXG4gIE56UHJvZ3Jlc3NTdGF0dXNUeXBlLFxuICBOelByb2dyZXNzU3RlcEl0ZW0sXG4gIE56UHJvZ3Jlc3NTdHJva2VDb2xvclR5cGUsXG4gIE56UHJvZ3Jlc3NTdHJva2VMaW5lY2FwVHlwZSxcbiAgTnpQcm9ncmVzc1R5cGVUeXBlXG59IGZyb20gJy4vdHlwaW5ncyc7XG5pbXBvcnQgeyBoYW5kbGVDaXJjbGVHcmFkaWVudCwgaGFuZGxlTGluZWFyR3JhZGllbnQgfSBmcm9tICcuL3V0aWxzJztcblxubGV0IGdyYWRpZW50SWRTZWVkID0gMDtcblxuY29uc3QgTlpfQ09ORklHX01PRFVMRV9OQU1FOiBOekNvbmZpZ0tleSA9ICdwcm9ncmVzcyc7XG5jb25zdCBzdGF0dXNJY29uTmFtZU1hcCA9IG5ldyBNYXAoW1xuICBbJ3N1Y2Nlc3MnLCAnY2hlY2snXSxcbiAgWydleGNlcHRpb24nLCAnY2xvc2UnXVxuXSk7XG5jb25zdCBzdGF0dXNDb2xvck1hcCA9IG5ldyBNYXAoW1xuICBbJ25vcm1hbCcsICcjMTA4ZWU5J10sXG4gIFsnZXhjZXB0aW9uJywgJyNmZjU1MDAnXSxcbiAgWydzdWNjZXNzJywgJyM4N2QwNjgnXVxuXSk7XG5jb25zdCBkZWZhdWx0Rm9ybWF0dGVyOiBOelByb2dyZXNzRm9ybWF0dGVyID0gKHA6IG51bWJlcik6IHN0cmluZyA9PiBgJHtwfSVgO1xuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yOiAnbnotcHJvZ3Jlc3MnLFxuICBleHBvcnRBczogJ256UHJvZ3Jlc3MnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI3Byb2dyZXNzSW5mb1RlbXBsYXRlPlxuICAgICAgPHNwYW4gY2xhc3M9XCJhbnQtcHJvZ3Jlc3MtdGV4dFwiICpuZ0lmPVwibnpTaG93SW5mb1wiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiKHN0YXR1cyA9PT0gJ2V4Y2VwdGlvbicgfHwgc3RhdHVzID09PSAnc3VjY2VzcycpICYmICFuekZvcm1hdDsgZWxzZSBmb3JtYXRUZW1wbGF0ZVwiPlxuICAgICAgICAgIDxpIG56LWljb24gW256VHlwZV09XCJpY29uXCI+PC9pPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLXRlbXBsYXRlICNmb3JtYXRUZW1wbGF0ZT5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwiZm9ybWF0dGVyOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogbnpQZXJjZW50IH07IGxldCBmb3JtYXR0ZXJcIj5cbiAgICAgICAgICAgIHt7IGZvcm1hdHRlcihuelBlcmNlbnQpIH19XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L3NwYW4+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxkaXZcbiAgICAgIFtuZ0NsYXNzXT1cIidhbnQtcHJvZ3Jlc3MgYW50LXByb2dyZXNzLXN0YXR1cy0nICsgc3RhdHVzXCJcbiAgICAgIFtjbGFzcy5hbnQtcHJvZ3Jlc3MtbGluZV09XCJuelR5cGUgPT09ICdsaW5lJ1wiXG4gICAgICBbY2xhc3MuYW50LXByb2dyZXNzLXNtYWxsXT1cIm56U2l6ZSA9PT0gJ3NtYWxsJ1wiXG4gICAgICBbY2xhc3MuYW50LXByb2dyZXNzLXNob3ctaW5mb109XCJuelNob3dJbmZvXCJcbiAgICAgIFtjbGFzcy5hbnQtcHJvZ3Jlc3MtY2lyY2xlXT1cImlzQ2lyY2xlU3R5bGVcIlxuICAgICAgW2NsYXNzLmFudC1wcm9ncmVzcy1zdGVwc109XCJpc1N0ZXBzXCJcbiAgICAgIFtjbGFzcy5hbnQtcHJvZ3Jlc3MtcnRsXT1cImRpciA9PT0gJ3J0bCdcIlxuICAgID5cbiAgICAgIDwhLS0gbGluZSBwcm9ncmVzcyAtLT5cbiAgICAgIDxkaXYgKm5nSWY9XCJuelR5cGUgPT09ICdsaW5lJ1wiPlxuICAgICAgICA8IS0tIG5vcm1hbCBsaW5lIHN0eWxlIC0tPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzU3RlcHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXByb2dyZXNzLW91dGVyXCIgKm5nSWY9XCIhaXNTdGVwc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFudC1wcm9ncmVzcy1pbm5lclwiPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3M9XCJhbnQtcHJvZ3Jlc3MtYmdcIlxuICAgICAgICAgICAgICAgIFtzdHlsZS53aWR0aC4lXT1cIm56UGVyY2VudFwiXG4gICAgICAgICAgICAgICAgW3N0eWxlLmJvcmRlci1yYWRpdXNdPVwibnpTdHJva2VMaW5lY2FwID09PSAncm91bmQnID8gJzEwMHB4JyA6ICcwJ1wiXG4gICAgICAgICAgICAgICAgW3N0eWxlLmJhY2tncm91bmRdPVwiIWlzR3JhZGllbnQgPyBuelN0cm9rZUNvbG9yIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgW3N0eWxlLmJhY2tncm91bmQtaW1hZ2VdPVwiaXNHcmFkaWVudCA/IGxpbmVHcmFkaWVudCA6IG51bGxcIlxuICAgICAgICAgICAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwic3Ryb2tlV2lkdGhcIlxuICAgICAgICAgICAgICA+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAqbmdJZj1cIm56U3VjY2Vzc1BlcmNlbnQgfHwgbnpTdWNjZXNzUGVyY2VudCA9PT0gMFwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJhbnQtcHJvZ3Jlc3Mtc3VjY2Vzcy1iZ1wiXG4gICAgICAgICAgICAgICAgW3N0eWxlLndpZHRoLiVdPVwibnpTdWNjZXNzUGVyY2VudFwiXG4gICAgICAgICAgICAgICAgW3N0eWxlLmJvcmRlci1yYWRpdXNdPVwibnpTdHJva2VMaW5lY2FwID09PSAncm91bmQnID8gJzEwMHB4JyA6ICcwJ1wiXG4gICAgICAgICAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJzdHJva2VXaWR0aFwiXG4gICAgICAgICAgICAgID48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJwcm9ncmVzc0luZm9UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8IS0tIHN0ZXAgc3R5bGUgLS0+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtcHJvZ3Jlc3Mtc3RlcHMtb3V0ZXJcIiAqbmdJZj1cImlzU3RlcHNcIj5cbiAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBzdGVwIG9mIHN0ZXBzOyBsZXQgaSA9IGluZGV4XCIgY2xhc3M9XCJhbnQtcHJvZ3Jlc3Mtc3RlcHMtaXRlbVwiIFtuZ1N0eWxlXT1cInN0ZXBcIj48L2Rpdj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwicHJvZ3Jlc3NJbmZvVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8IS0tIGNpcmNsZSAvIGRhc2hib2FyZCBwcm9ncmVzcyAtLT5cbiAgICAgIDxkaXZcbiAgICAgICAgW3N0eWxlLndpZHRoLnB4XT1cInRoaXMubnpXaWR0aFwiXG4gICAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwidGhpcy5ueldpZHRoXCJcbiAgICAgICAgW3N0eWxlLmZvbnRTaXplLnB4XT1cInRoaXMubnpXaWR0aCAqIDAuMTUgKyA2XCJcbiAgICAgICAgY2xhc3M9XCJhbnQtcHJvZ3Jlc3MtaW5uZXJcIlxuICAgICAgICBbY2xhc3MuYW50LXByb2dyZXNzLWNpcmNsZS1ncmFkaWVudF09XCJpc0dyYWRpZW50XCJcbiAgICAgICAgKm5nSWY9XCJpc0NpcmNsZVN0eWxlXCJcbiAgICAgID5cbiAgICAgICAgPHN2ZyBjbGFzcz1cImFudC1wcm9ncmVzcy1jaXJjbGUgXCIgdmlld0JveD1cIjAgMCAxMDAgMTAwXCI+XG4gICAgICAgICAgPGRlZnMgKm5nSWY9XCJpc0dyYWRpZW50XCI+XG4gICAgICAgICAgICA8bGluZWFyR3JhZGllbnQgW2lkXT1cIidncmFkaWVudC0nICsgZ3JhZGllbnRJZFwiIHgxPVwiMTAwJVwiIHkxPVwiMCVcIiB4Mj1cIjAlXCIgeTI9XCIwJVwiPlxuICAgICAgICAgICAgICA8c3RvcCAqbmdGb3I9XCJsZXQgaSBvZiBjaXJjbGVHcmFkaWVudFwiIFthdHRyLm9mZnNldF09XCJpLm9mZnNldFwiIFthdHRyLnN0b3AtY29sb3JdPVwiaS5jb2xvclwiPjwvc3RvcD5cbiAgICAgICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgICAgPC9kZWZzPlxuICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICBjbGFzcz1cImFudC1wcm9ncmVzcy1jaXJjbGUtdHJhaWxcIlxuICAgICAgICAgICAgc3Ryb2tlPVwiI2YzZjNmM1wiXG4gICAgICAgICAgICBmaWxsLW9wYWNpdHk9XCIwXCJcbiAgICAgICAgICAgIFthdHRyLnN0cm9rZS13aWR0aF09XCJzdHJva2VXaWR0aFwiXG4gICAgICAgICAgICBbYXR0ci5kXT1cInBhdGhTdHJpbmdcIlxuICAgICAgICAgICAgW25nU3R5bGVdPVwidHJhaWxQYXRoU3R5bGVcIlxuICAgICAgICAgID48L3BhdGg+XG4gICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBwIG9mIHByb2dyZXNzQ2lyY2xlUGF0aDsgdHJhY2tCeTogdHJhY2tCeUZuXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYW50LXByb2dyZXNzLWNpcmNsZS1wYXRoXCJcbiAgICAgICAgICAgIGZpbGwtb3BhY2l0eT1cIjBcIlxuICAgICAgICAgICAgW2F0dHIuZF09XCJwYXRoU3RyaW5nXCJcbiAgICAgICAgICAgIFthdHRyLnN0cm9rZS1saW5lY2FwXT1cIm56U3Ryb2tlTGluZWNhcFwiXG4gICAgICAgICAgICBbYXR0ci5zdHJva2VdPVwicC5zdHJva2VcIlxuICAgICAgICAgICAgW2F0dHIuc3Ryb2tlLXdpZHRoXT1cIm56UGVyY2VudCA/IHN0cm9rZVdpZHRoIDogMFwiXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJwLnN0cm9rZVBhdGhTdHlsZVwiXG4gICAgICAgICAgPjwvcGF0aD5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJwcm9ncmVzc0luZm9UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOelByb2dyZXNzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHJlYWRvbmx5IF9uek1vZHVsZU5hbWU6IE56Q29uZmlnS2V5ID0gTlpfQ09ORklHX01PRFVMRV9OQU1FO1xuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelN1Y2Nlc3NQZXJjZW50OiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256UGVyY2VudDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelN0cm9rZVdpZHRoOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256R2FwRGVncmVlOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U3RlcHM6IE51bWJlcklucHV0O1xuXG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgbnpTaG93SW5mbzogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIG56V2lkdGggPSAxMzI7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgbnpTdHJva2VDb2xvcj86IE56UHJvZ3Jlc3NTdHJva2VDb2xvclR5cGUgPSB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgbnpTaXplOiAnZGVmYXVsdCcgfCAnc21hbGwnID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKSBuekZvcm1hdD86IE56UHJvZ3Jlc3NGb3JtYXR0ZXI7XG4gIEBJbnB1dCgpIEBJbnB1dE51bWJlcigpIG56U3VjY2Vzc1BlcmNlbnQ/OiBudW1iZXI7XG4gIEBJbnB1dCgpIEBJbnB1dE51bWJlcigpIG56UGVyY2VudDogbnVtYmVyID0gMDtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBASW5wdXROdW1iZXIoKSBuelN0cm9rZVdpZHRoPzogbnVtYmVyID0gdW5kZWZpbmVkO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIEBJbnB1dE51bWJlcigpIG56R2FwRGVncmVlPzogbnVtYmVyID0gdW5kZWZpbmVkO1xuICBASW5wdXQoKSBuelN0YXR1cz86IE56UHJvZ3Jlc3NTdGF0dXNUeXBlO1xuICBASW5wdXQoKSBuelR5cGU6IE56UHJvZ3Jlc3NUeXBlVHlwZSA9ICdsaW5lJztcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBuekdhcFBvc2l0aW9uOiBOelByb2dyZXNzR2FwUG9zaXRpb25UeXBlID0gJ3RvcCc7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgbnpTdHJva2VMaW5lY2FwOiBOelByb2dyZXNzU3Ryb2tlTGluZWNhcFR5cGUgPSAncm91bmQnO1xuXG4gIEBJbnB1dCgpIEBJbnB1dE51bWJlcigpIG56U3RlcHM6IG51bWJlciA9IDA7XG5cbiAgc3RlcHM6IE56UHJvZ3Jlc3NTdGVwSXRlbVtdID0gW107XG5cbiAgLyoqIEdyYWRpZW50IHN0eWxlIHdoZW4gYG56VHlwZWAgaXMgYGxpbmVgLiAqL1xuICBsaW5lR3JhZGllbnQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiBJZiB1c2VyIHVzZXMgZ3JhZGllbnQgY29sb3IuICovXG4gIGlzR3JhZGllbnQgPSBmYWxzZTtcblxuICAvKiogSWYgdGhlIGxpbmVhciBwcm9ncmVzcyBpcyBhIHN0ZXAgcHJvZ3Jlc3MuICovXG4gIGlzU3RlcHMgPSBmYWxzZTtcblxuICAvKipcbiAgICogRWFjaCBwcm9ncmVzcyB3aG9zZSBgbnpUeXBlYCBpcyBjaXJjbGUgb3IgZGFzaGJvYXJkIHNob3VsZCBoYXZlIHVuaXF1ZSBpZCB0b1xuICAgKiBkZWZpbmUgYDxsaW5lYXJHcmFkaWVudD5gLlxuICAgKi9cbiAgZ3JhZGllbnRJZCA9IGdyYWRpZW50SWRTZWVkKys7XG5cbiAgLyoqIFBhdGhzIHRvIHJlbmRlcmVkIGluIHRoZSB0ZW1wbGF0ZS4gKi9cbiAgcHJvZ3Jlc3NDaXJjbGVQYXRoOiBOelByb2dyZXNzQ2lyY2xlUGF0aFtdID0gW107XG4gIGNpcmNsZUdyYWRpZW50PzogQXJyYXk8eyBvZmZzZXQ6IHN0cmluZzsgY29sb3I6IHN0cmluZyB9PjtcbiAgdHJhaWxQYXRoU3R5bGU6IE5nU3R5bGVJbnRlcmZhY2UgfCBudWxsID0gbnVsbDtcbiAgcGF0aFN0cmluZz86IHN0cmluZztcbiAgaWNvbiE6IHN0cmluZztcblxuICBkaXI6IERpcmVjdGlvbiA9ICdsdHInO1xuXG4gIHRyYWNrQnlGbiA9IChpbmRleDogbnVtYmVyKTogc3RyaW5nID0+IGAke2luZGV4fWA7XG5cbiAgZ2V0IGZvcm1hdHRlcigpOiBOelByb2dyZXNzRm9ybWF0dGVyIHtcbiAgICByZXR1cm4gdGhpcy5uekZvcm1hdCB8fCBkZWZhdWx0Rm9ybWF0dGVyO1xuICB9XG5cbiAgZ2V0IHN0YXR1cygpOiBOelByb2dyZXNzU3RhdHVzVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMubnpTdGF0dXMgfHwgdGhpcy5pbmZlcnJlZFN0YXR1cztcbiAgfVxuXG4gIGdldCBzdHJva2VXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm56U3Ryb2tlV2lkdGggfHwgKHRoaXMubnpUeXBlID09PSAnbGluZScgJiYgdGhpcy5uelNpemUgIT09ICdzbWFsbCcgPyA4IDogNik7XG4gIH1cblxuICBnZXQgaXNDaXJjbGVTdHlsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5uelR5cGUgPT09ICdjaXJjbGUnIHx8IHRoaXMubnpUeXBlID09PSAnZGFzaGJvYXJkJztcbiAgfVxuXG4gIHByaXZhdGUgY2FjaGVkU3RhdHVzOiBOelByb2dyZXNzU3RhdHVzVHlwZSA9ICdub3JtYWwnO1xuICBwcml2YXRlIGluZmVycmVkU3RhdHVzOiBOelByb2dyZXNzU3RhdHVzVHlwZSA9ICdub3JtYWwnO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHVibGljIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5XG4gICkge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3Qge1xuICAgICAgbnpTdGVwcyxcbiAgICAgIG56R2FwUG9zaXRpb24sXG4gICAgICBuelN0cm9rZUxpbmVjYXAsXG4gICAgICBuelN0cm9rZUNvbG9yLFxuICAgICAgbnpHYXBEZWdyZWUsXG4gICAgICBuelR5cGUsXG4gICAgICBuelN0YXR1cyxcbiAgICAgIG56UGVyY2VudCxcbiAgICAgIG56U3VjY2Vzc1BlcmNlbnQsXG4gICAgICBuelN0cm9rZVdpZHRoXG4gICAgfSA9IGNoYW5nZXM7XG5cbiAgICBpZiAobnpTdGF0dXMpIHtcbiAgICAgIHRoaXMuY2FjaGVkU3RhdHVzID0gdGhpcy5uelN0YXR1cyB8fCB0aGlzLmNhY2hlZFN0YXR1cztcbiAgICB9XG5cbiAgICBpZiAobnpQZXJjZW50IHx8IG56U3VjY2Vzc1BlcmNlbnQpIHtcbiAgICAgIGNvbnN0IGZpbGxBbGwgPSBwYXJzZUludCh0aGlzLm56UGVyY2VudC50b1N0cmluZygpLCAxMCkgPj0gMTAwO1xuICAgICAgaWYgKGZpbGxBbGwpIHtcbiAgICAgICAgaWYgKChpc05vdE5pbCh0aGlzLm56U3VjY2Vzc1BlcmNlbnQpICYmIHRoaXMubnpTdWNjZXNzUGVyY2VudCEgPj0gMTAwKSB8fCB0aGlzLm56U3VjY2Vzc1BlcmNlbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMuaW5mZXJyZWRTdGF0dXMgPSAnc3VjY2Vzcyc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaW5mZXJyZWRTdGF0dXMgPSB0aGlzLmNhY2hlZFN0YXR1cztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobnpTdGF0dXMgfHwgbnpQZXJjZW50IHx8IG56U3VjY2Vzc1BlcmNlbnQgfHwgbnpTdHJva2VDb2xvcikge1xuICAgICAgdGhpcy51cGRhdGVJY29uKCk7XG4gICAgfVxuXG4gICAgaWYgKG56U3Ryb2tlQ29sb3IpIHtcbiAgICAgIHRoaXMuc2V0U3Ryb2tlQ29sb3IoKTtcbiAgICB9XG5cbiAgICBpZiAobnpHYXBQb3NpdGlvbiB8fCBuelN0cm9rZUxpbmVjYXAgfHwgbnpHYXBEZWdyZWUgfHwgbnpUeXBlIHx8IG56UGVyY2VudCB8fCBuelN0cm9rZUNvbG9yIHx8IG56U3Ryb2tlQ29sb3IpIHtcbiAgICAgIHRoaXMuZ2V0Q2lyY2xlUGF0aHMoKTtcbiAgICB9XG5cbiAgICBpZiAobnpQZXJjZW50IHx8IG56U3RlcHMgfHwgbnpTdHJva2VXaWR0aCkge1xuICAgICAgdGhpcy5pc1N0ZXBzID0gdGhpcy5uelN0ZXBzID4gMDtcbiAgICAgIGlmICh0aGlzLmlzU3RlcHMpIHtcbiAgICAgICAgdGhpcy5nZXRTdGVwcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMubnpDb25maWdTZXJ2aWNlXG4gICAgICAuZ2V0Q29uZmlnQ2hhbmdlRXZlbnRGb3JDb21wb25lbnQoTlpfQ09ORklHX01PRFVMRV9OQU1FKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlSWNvbigpO1xuICAgICAgICB0aGlzLnNldFN0cm9rZUNvbG9yKCk7XG4gICAgICAgIHRoaXMuZ2V0Q2lyY2xlUGF0aHMoKTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5kaXJlY3Rpb25hbGl0eS5jaGFuZ2U/LnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKGRpcmVjdGlvbjogRGlyZWN0aW9uKSA9PiB7XG4gICAgICB0aGlzLmRpciA9IGRpcmVjdGlvbjtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGlyID0gdGhpcy5kaXJlY3Rpb25hbGl0eS52YWx1ZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlSWNvbigpOiB2b2lkIHtcbiAgICBjb25zdCByZXQgPSBzdGF0dXNJY29uTmFtZU1hcC5nZXQodGhpcy5zdGF0dXMpO1xuICAgIHRoaXMuaWNvbiA9IHJldCA/IHJldCArICh0aGlzLmlzQ2lyY2xlU3R5bGUgPyAnLW8nIDogJy1jaXJjbGUtZmlsbCcpIDogJyc7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHN0ZXAgcmVuZGVyIGNvbmZpZ3MuXG4gICAqL1xuICBwcml2YXRlIGdldFN0ZXBzKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnQgPSBNYXRoLmZsb29yKHRoaXMubnpTdGVwcyAqICh0aGlzLm56UGVyY2VudCAvIDEwMCkpO1xuICAgIGNvbnN0IHN0ZXBXaWR0aCA9IHRoaXMubnpTaXplID09PSAnc21hbGwnID8gMiA6IDE0O1xuXG4gICAgY29uc3Qgc3RlcHMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5uelN0ZXBzOyBpKyspIHtcbiAgICAgIGxldCBjb2xvcjtcbiAgICAgIGlmIChpIDw9IGN1cnJlbnQgLSAxKSB7XG4gICAgICAgIGNvbG9yID0gdGhpcy5uelN0cm9rZUNvbG9yO1xuICAgICAgfVxuICAgICAgY29uc3Qgc3RlcFN0eWxlID0ge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGAke2NvbG9yfWAsXG4gICAgICAgIHdpZHRoOiBgJHtzdGVwV2lkdGh9cHhgLFxuICAgICAgICBoZWlnaHQ6IGAke3RoaXMuc3Ryb2tlV2lkdGh9cHhgXG4gICAgICB9O1xuICAgICAgc3RlcHMucHVzaChzdGVwU3R5bGUpO1xuICAgIH1cblxuICAgIHRoaXMuc3RlcHMgPSBzdGVwcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgcGF0aHMgd2hlbiB0aGUgdHlwZSBpcyBjaXJjbGUgb3IgZGFzaGJvYXJkLlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRDaXJjbGVQYXRocygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNDaXJjbGVTdHlsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlcyA9IGlzTm90TmlsKHRoaXMubnpTdWNjZXNzUGVyY2VudCkgPyBbdGhpcy5uelN1Y2Nlc3NQZXJjZW50ISwgdGhpcy5uelBlcmNlbnRdIDogW3RoaXMubnpQZXJjZW50XTtcblxuICAgIC8vIENhbGN1bGF0ZSBzaGFyZWQgc3R5bGVzLlxuICAgIGNvbnN0IHJhZGl1cyA9IDUwIC0gdGhpcy5zdHJva2VXaWR0aCAvIDI7XG4gICAgY29uc3QgZ2FwUG9zaXRpb24gPSB0aGlzLm56R2FwUG9zaXRpb24gfHwgKHRoaXMubnpUeXBlID09PSAnY2lyY2xlJyA/ICd0b3AnIDogJ2JvdHRvbScpO1xuICAgIGNvbnN0IGxlbiA9IE1hdGguUEkgKiAyICogcmFkaXVzO1xuICAgIGNvbnN0IGdhcERlZ3JlZSA9IHRoaXMubnpHYXBEZWdyZWUgfHwgKHRoaXMubnpUeXBlID09PSAnY2lyY2xlJyA/IDAgOiA3NSk7XG5cbiAgICBsZXQgYmVnaW5Qb3NpdGlvblggPSAwO1xuICAgIGxldCBiZWdpblBvc2l0aW9uWSA9IC1yYWRpdXM7XG4gICAgbGV0IGVuZFBvc2l0aW9uWCA9IDA7XG4gICAgbGV0IGVuZFBvc2l0aW9uWSA9IHJhZGl1cyAqIC0yO1xuXG4gICAgc3dpdGNoIChnYXBQb3NpdGlvbikge1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIGJlZ2luUG9zaXRpb25YID0gLXJhZGl1cztcbiAgICAgICAgYmVnaW5Qb3NpdGlvblkgPSAwO1xuICAgICAgICBlbmRQb3NpdGlvblggPSByYWRpdXMgKiAyO1xuICAgICAgICBlbmRQb3NpdGlvblkgPSAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgYmVnaW5Qb3NpdGlvblggPSByYWRpdXM7XG4gICAgICAgIGJlZ2luUG9zaXRpb25ZID0gMDtcbiAgICAgICAgZW5kUG9zaXRpb25YID0gcmFkaXVzICogLTI7XG4gICAgICAgIGVuZFBvc2l0aW9uWSA9IDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgYmVnaW5Qb3NpdGlvblkgPSByYWRpdXM7XG4gICAgICAgIGVuZFBvc2l0aW9uWSA9IHJhZGl1cyAqIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICB9XG5cbiAgICB0aGlzLnBhdGhTdHJpbmcgPSBgTSA1MCw1MCBtICR7YmVnaW5Qb3NpdGlvblh9LCR7YmVnaW5Qb3NpdGlvbll9XG4gICAgICAgYSAke3JhZGl1c30sJHtyYWRpdXN9IDAgMSAxICR7ZW5kUG9zaXRpb25YfSwkey1lbmRQb3NpdGlvbll9XG4gICAgICAgYSAke3JhZGl1c30sJHtyYWRpdXN9IDAgMSAxICR7LWVuZFBvc2l0aW9uWH0sJHtlbmRQb3NpdGlvbll9YDtcblxuICAgIHRoaXMudHJhaWxQYXRoU3R5bGUgPSB7XG4gICAgICBzdHJva2VEYXNoYXJyYXk6IGAke2xlbiAtIGdhcERlZ3JlZX1weCAke2xlbn1weGAsXG4gICAgICBzdHJva2VEYXNob2Zmc2V0OiBgLSR7Z2FwRGVncmVlIC8gMn1weGAsXG4gICAgICB0cmFuc2l0aW9uOiAnc3Ryb2tlLWRhc2hvZmZzZXQgLjNzIGVhc2UgMHMsIHN0cm9rZS1kYXNoYXJyYXkgLjNzIGVhc2UgMHMsIHN0cm9rZSAuM3MnXG4gICAgfTtcblxuICAgIC8vIENhbGN1bGF0ZSBzdHlsZXMgZm9yIGVhY2ggcGF0aC5cbiAgICB0aGlzLnByb2dyZXNzQ2lyY2xlUGF0aCA9IHZhbHVlc1xuICAgICAgLm1hcCgodmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGlzU3VjY2Vzc1BlcmNlbnQgPSB2YWx1ZXMubGVuZ3RoID09PSAyICYmIGluZGV4ID09PSAwO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHN0cm9rZTogdGhpcy5pc0dyYWRpZW50ICYmICFpc1N1Y2Nlc3NQZXJjZW50ID8gYHVybCgjZ3JhZGllbnQtJHt0aGlzLmdyYWRpZW50SWR9KWAgOiBudWxsLFxuICAgICAgICAgIHN0cm9rZVBhdGhTdHlsZToge1xuICAgICAgICAgICAgc3Ryb2tlOiAhdGhpcy5pc0dyYWRpZW50XG4gICAgICAgICAgICAgID8gaXNTdWNjZXNzUGVyY2VudFxuICAgICAgICAgICAgICAgID8gc3RhdHVzQ29sb3JNYXAuZ2V0KCdzdWNjZXNzJylcbiAgICAgICAgICAgICAgICA6ICh0aGlzLm56U3Ryb2tlQ29sb3IgYXMgc3RyaW5nKVxuICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOlxuICAgICAgICAgICAgICAnc3Ryb2tlLWRhc2hvZmZzZXQgLjNzIGVhc2UgMHMsIHN0cm9rZS1kYXNoYXJyYXkgLjNzIGVhc2UgMHMsIHN0cm9rZSAuM3MsIHN0cm9rZS13aWR0aCAuMDZzIGVhc2UgLjNzJyxcbiAgICAgICAgICAgIHN0cm9rZURhc2hhcnJheTogYCR7KCh2YWx1ZSB8fCAwKSAvIDEwMCkgKiAobGVuIC0gZ2FwRGVncmVlKX1weCAke2xlbn1weGAsXG4gICAgICAgICAgICBzdHJva2VEYXNob2Zmc2V0OiBgLSR7Z2FwRGVncmVlIC8gMn1weGBcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICAgLnJldmVyc2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0U3Ryb2tlQ29sb3IoKTogdm9pZCB7XG4gICAgY29uc3QgY29sb3IgPSB0aGlzLm56U3Ryb2tlQ29sb3I7XG4gICAgY29uc3QgaXNHcmFkaWVudCA9ICh0aGlzLmlzR3JhZGllbnQgPSAhIWNvbG9yICYmIHR5cGVvZiBjb2xvciAhPT0gJ3N0cmluZycpO1xuICAgIGlmIChpc0dyYWRpZW50ICYmICF0aGlzLmlzQ2lyY2xlU3R5bGUpIHtcbiAgICAgIHRoaXMubGluZUdyYWRpZW50ID0gaGFuZGxlTGluZWFyR3JhZGllbnQoY29sb3IgYXMgTnpQcm9ncmVzc0NvbG9yR3JhZGllbnQpO1xuICAgIH0gZWxzZSBpZiAoaXNHcmFkaWVudCAmJiB0aGlzLmlzQ2lyY2xlU3R5bGUpIHtcbiAgICAgIHRoaXMuY2lyY2xlR3JhZGllbnQgPSBoYW5kbGVDaXJjbGVHcmFkaWVudCh0aGlzLm56U3Ryb2tlQ29sb3IgYXMgTnpQcm9ncmVzc0dyYWRpZW50UHJvZ3Jlc3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxpbmVHcmFkaWVudCA9IG51bGw7XG4gICAgICB0aGlzLmNpcmNsZUdyYWRpZW50ID0gW107XG4gICAgfVxuICB9XG59XG4iXX0=