import * as i0 from '@angular/core';
import { TemplateRef, Component, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, Input, EventEmitter, Optional, ContentChildren, Output, NgModule } from '@angular/core';
import { Subject, fromEvent, Subscription, merge } from 'rxjs';
import { filter, takeUntil, startWith } from 'rxjs/operators';
import * as i1 from 'ng-zorro-antd/core/services';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { InputBoolean, toBoolean } from 'ng-zorro-antd/core/util';
import { __decorate } from 'tslib';
import * as i2 from 'ng-zorro-antd/progress';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i5 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import * as i1$1 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';

class NzStepComponent {
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

class NzStepsComponent {
    constructor(ngZone, elementRef, renderer, cdr, directionality, destroy$) {
        this.ngZone = ngZone;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.cdr = cdr;
        this.directionality = directionality;
        this.destroy$ = destroy$;
        this.nzCurrent = 0;
        this.nzDirection = 'horizontal';
        this.nzLabelPlacement = 'horizontal';
        this.nzType = 'default';
        this.nzSize = 'default';
        this.nzStartIndex = 0;
        this.nzStatus = 'process';
        this.nzIndexChange = new EventEmitter();
        this.indexChangeSubscription = Subscription.EMPTY;
        this.showProcessDot = false;
        this.classMap = {};
        this.dir = 'ltr';
        this.setClassMap();
    }
    set nzProgressDot(value) {
        if (value instanceof TemplateRef) {
            this.showProcessDot = true;
            this.customProcessDotTemplate = value;
        }
        else {
            this.showProcessDot = toBoolean(value);
        }
        this.updateChildrenSteps();
    }
    ngOnChanges(changes) {
        if (changes.nzStartIndex || changes.nzDirection || changes.nzStatus || changes.nzCurrent) {
            this.updateChildrenSteps();
        }
        if (changes.nzDirection || changes.nzProgressDot || changes.nzLabelPlacement || changes.nzSize) {
            this.setClassMap();
        }
    }
    ngOnInit() {
        var _a;
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.setClassMap();
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
        this.setClassMap();
        this.updateChildrenSteps();
    }
    ngAfterContentInit() {
        if (this.steps) {
            this.steps.changes.pipe(startWith(null), takeUntil(this.destroy$)).subscribe(() => {
                this.updateHostProgressClass();
                this.updateChildrenSteps();
            });
        }
    }
    updateHostProgressClass() {
        if (this.steps && !this.showProcessDot) {
            const hasPercent = !!this.steps.toArray().find(step => step.nzPercentage !== null);
            const className = 'ant-steps-with-progress';
            const hasClass = this.elementRef.nativeElement.classList.contains(className);
            if (hasPercent && !hasClass) {
                this.renderer.addClass(this.elementRef.nativeElement, className);
            }
            else if (!hasPercent && hasClass) {
                this.renderer.removeClass(this.elementRef.nativeElement, className);
            }
        }
    }
    updateChildrenSteps() {
        if (this.steps) {
            const length = this.steps.length;
            this.steps.toArray().forEach((step, index) => {
                Promise.resolve().then(() => {
                    step.outStatus = this.nzStatus;
                    step.showProcessDot = this.showProcessDot;
                    if (this.customProcessDotTemplate) {
                        step.customProcessTemplate = this.customProcessDotTemplate;
                    }
                    step.clickable = this.nzIndexChange.observers.length > 0;
                    step.direction = this.nzDirection;
                    step.index = index + this.nzStartIndex;
                    step.currentIndex = this.nzCurrent;
                    step.last = length === index + 1;
                    step.markForCheck();
                });
            });
            this.indexChangeSubscription.unsubscribe();
            this.indexChangeSubscription = merge(...this.steps.map(step => step.clickOutsideAngular$))
                .pipe(takeUntil(this.destroy$))
                .subscribe(index => {
                if (this.nzIndexChange.observers.length) {
                    this.ngZone.run(() => this.nzIndexChange.emit(index));
                }
            });
        }
    }
    setClassMap() {
        this.classMap = {
            [`ant-steps-${this.nzDirection}`]: true,
            [`ant-steps-label-horizontal`]: this.nzDirection === 'horizontal',
            [`ant-steps-label-vertical`]: (this.showProcessDot || this.nzLabelPlacement === 'vertical') && this.nzDirection === 'horizontal',
            [`ant-steps-dot`]: this.showProcessDot,
            ['ant-steps-small']: this.nzSize === 'small',
            ['ant-steps-navigation']: this.nzType === 'navigation',
            ['ant-steps-rtl']: this.dir === 'rtl'
        };
    }
}
NzStepsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzStepsComponent, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i1$1.Directionality, optional: true }, { token: i1.NzDestroyService }], target: i0.ɵɵFactoryTarget.Component });
NzStepsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzStepsComponent, selector: "nz-steps", inputs: { nzCurrent: "nzCurrent", nzDirection: "nzDirection", nzLabelPlacement: "nzLabelPlacement", nzType: "nzType", nzSize: "nzSize", nzStartIndex: "nzStartIndex", nzStatus: "nzStatus", nzProgressDot: "nzProgressDot" }, outputs: { nzIndexChange: "nzIndexChange" }, providers: [NzDestroyService], queries: [{ propertyName: "steps", predicate: NzStepComponent }], exportAs: ["nzSteps"], usesOnChanges: true, ngImport: i0, template: `
    <div class="ant-steps" [ngClass]="classMap">
      <ng-content></ng-content>
    </div>
  `, isInline: true, directives: [{ type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzStepsComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    selector: 'nz-steps',
                    exportAs: 'nzSteps',
                    template: `
    <div class="ant-steps" [ngClass]="classMap">
      <ng-content></ng-content>
    </div>
  `,
                    providers: [NzDestroyService]
                }]
        }], ctorParameters: function () {
        return [{ type: i0.NgZone }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i1$1.Directionality, decorators: [{
                        type: Optional
                    }] }, { type: i1.NzDestroyService }];
    }, propDecorators: { steps: [{
                type: ContentChildren,
                args: [NzStepComponent]
            }], nzCurrent: [{
                type: Input
            }], nzDirection: [{
                type: Input
            }], nzLabelPlacement: [{
                type: Input
            }], nzType: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzStartIndex: [{
                type: Input
            }], nzStatus: [{
                type: Input
            }], nzProgressDot: [{
                type: Input
            }], nzIndexChange: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzStepsModule {
}
NzStepsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzStepsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzStepsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzStepsModule, declarations: [NzStepsComponent, NzStepComponent], imports: [BidiModule, CommonModule, NzIconModule, NzOutletModule, NzProgressModule], exports: [NzStepsComponent, NzStepComponent] });
NzStepsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzStepsModule, imports: [[BidiModule, CommonModule, NzIconModule, NzOutletModule, NzProgressModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzStepsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BidiModule, CommonModule, NzIconModule, NzOutletModule, NzProgressModule],
                    exports: [NzStepsComponent, NzStepComponent],
                    declarations: [NzStepsComponent, NzStepComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzStepComponent, NzStepsComponent, NzStepsModule };
//# sourceMappingURL=ng-zorro-antd-steps.mjs.map
