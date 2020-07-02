/**
 * @fileoverview added by tsickle
 * Generated from: popconfirm.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __decorate, __metadata } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, Renderer2, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { zoomBigMotion } from 'ng-zorro-antd/core/animation';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzTooltipBaseDirective, NzToolTipComponent } from 'ng-zorro-antd/tooltip';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export class NzPopconfirmDirective extends NzTooltipBaseDirective {
    /**
     * @param {?} elementRef
     * @param {?} hostView
     * @param {?} resolver
     * @param {?} renderer
     * @param {?=} noAnimation
     */
    constructor(elementRef, hostView, resolver, renderer, noAnimation) {
        super(elementRef, hostView, resolver, renderer, noAnimation);
        this.nzCondition = false;
        /**
         * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
         * Please use a more specific API. Like `nzTooltipTrigger`.
         */
        this.nzTrigger = 'click';
        // tslint:disable-next-line:no-output-rename
        this.specificVisibleChange = new EventEmitter();
        this.nzOnCancel = new EventEmitter();
        this.nzOnConfirm = new EventEmitter();
        this.componentFactory = this.resolver.resolveComponentFactory(NzPopconfirmComponent);
        this.needProxyProperties = [
            'nzOverlayClassName',
            'nzOverlayStyle',
            'nzMouseEnterDelay',
            'nzMouseLeaveDelay',
            'nzVisible',
            'nzOkText',
            'nzOkType',
            'nzCancelText',
            'nzCondition',
            'nzIcon'
        ];
    }
    /**
     * @override
     * @protected
     * @return {?}
     */
    createComponent() {
        super.createComponent();
        ((/** @type {?} */ (this.component))).nzOnCancel.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @return {?}
         */
        () => {
            this.nzOnCancel.emit();
        }));
        ((/** @type {?} */ (this.component))).nzOnConfirm.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @return {?}
         */
        () => {
            this.nzOnConfirm.emit();
        }));
    }
}
NzPopconfirmDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nz-popconfirm]',
                exportAs: 'nzPopconfirm',
                host: {
                    '[class.ant-popover-open]': 'visible'
                }
            },] }
];
/** @nocollapse */
NzPopconfirmDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver },
    { type: Renderer2 },
    { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
];
NzPopconfirmDirective.propDecorators = {
    specificTitle: [{ type: Input, args: ['nzPopconfirmTitle',] }],
    directiveNameTitle: [{ type: Input, args: ['nz-popconfirm',] }],
    specificTrigger: [{ type: Input, args: ['nzPopconfirmTrigger',] }],
    specificPlacement: [{ type: Input, args: ['nzPopconfirmPlacement',] }],
    specificOrigin: [{ type: Input, args: ['nzPopconfirmOrigin',] }],
    nzOkText: [{ type: Input }],
    nzOkType: [{ type: Input }],
    nzCancelText: [{ type: Input }],
    nzIcon: [{ type: Input }],
    nzCondition: [{ type: Input }],
    nzTrigger: [{ type: Input }],
    specificVisible: [{ type: Input, args: ['nzPopconfirmVisible',] }],
    specificVisibleChange: [{ type: Output, args: ['nzPopconfirmVisibleChange',] }],
    nzOnCancel: [{ type: Output }],
    nzOnConfirm: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzPopconfirmDirective.prototype, "nzCondition", void 0);
if (false) {
    /** @type {?} */
    NzPopconfirmDirective.ngAcceptInputType_nzCondition;
    /** @type {?} */
    NzPopconfirmDirective.prototype.specificTitle;
    /** @type {?} */
    NzPopconfirmDirective.prototype.directiveNameTitle;
    /** @type {?} */
    NzPopconfirmDirective.prototype.specificTrigger;
    /** @type {?} */
    NzPopconfirmDirective.prototype.specificPlacement;
    /** @type {?} */
    NzPopconfirmDirective.prototype.specificOrigin;
    /** @type {?} */
    NzPopconfirmDirective.prototype.nzOkText;
    /** @type {?} */
    NzPopconfirmDirective.prototype.nzOkType;
    /** @type {?} */
    NzPopconfirmDirective.prototype.nzCancelText;
    /** @type {?} */
    NzPopconfirmDirective.prototype.nzIcon;
    /** @type {?} */
    NzPopconfirmDirective.prototype.nzCondition;
    /**
     * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
     * Please use a more specific API. Like `nzTooltipTrigger`.
     * @type {?}
     */
    NzPopconfirmDirective.prototype.nzTrigger;
    /** @type {?} */
    NzPopconfirmDirective.prototype.specificVisible;
    /** @type {?} */
    NzPopconfirmDirective.prototype.specificVisibleChange;
    /** @type {?} */
    NzPopconfirmDirective.prototype.nzOnCancel;
    /** @type {?} */
    NzPopconfirmDirective.prototype.nzOnConfirm;
    /**
     * @type {?}
     * @protected
     */
    NzPopconfirmDirective.prototype.componentFactory;
    /**
     * @type {?}
     * @protected
     */
    NzPopconfirmDirective.prototype.needProxyProperties;
}
export class NzPopconfirmComponent extends NzToolTipComponent {
    /**
     * @param {?} cdr
     * @param {?=} noAnimation
     */
    constructor(cdr, noAnimation) {
        super(cdr, noAnimation);
        this.noAnimation = noAnimation;
        this.nzCondition = false;
        this.nzOkType = 'primary';
        this.nzOnCancel = new Subject();
        this.nzOnConfirm = new Subject();
        this._trigger = 'click';
        this._prefix = 'ant-popover-placement';
        this._hasBackdrop = true;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this.nzOnCancel.complete();
        this.nzOnConfirm.complete();
    }
    /**
     * @override
     * @return {?}
     */
    show() {
        if (!this.nzCondition) {
            super.show();
        }
        else {
            this.onConfirm();
        }
    }
    /**
     * @return {?}
     */
    onCancel() {
        this.nzOnCancel.next();
        super.hide();
    }
    /**
     * @return {?}
     */
    onConfirm() {
        this.nzOnConfirm.next();
        super.hide();
    }
}
NzPopconfirmComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-popconfirm',
                exportAs: 'nzPopconfirmComponent',
                preserveWhitespaces: false,
                animations: [zoomBigMotion],
                template: `
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayHasBackdrop]="_hasBackdrop"
      (backdropClick)="hide()"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayOpen]="_visible"
    >
      <div
        class="ant-popover"
        [ngClass]="_classMap"
        [ngStyle]="nzOverlayStyle"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="ant-popover-content">
          <div class="ant-popover-arrow"></div>
          <div class="ant-popover-inner">
            <div>
              <div class="ant-popover-inner-content">
                <div class="ant-popover-message">
                  <ng-container *nzStringTemplateOutlet="nzTitle">
                    <ng-container *nzStringTemplateOutlet="nzIcon; let icon">
                      <i nz-icon [nzType]="icon || 'exclamation-circle'" nzTheme="fill"></i>
                    </ng-container>
                    <div class="ant-popover-message-title">{{ nzTitle }}</div>
                  </ng-container>
                </div>
                <div class="ant-popover-buttons">
                  <button nz-button [nzSize]="'small'" (click)="onCancel()">
                    <ng-container *ngIf="nzCancelText">{{ nzCancelText }}</ng-container>
                    <ng-container *ngIf="!nzCancelText">{{ 'Modal.cancelText' | nzI18n }}</ng-container>
                  </button>
                  <button nz-button [nzSize]="'small'" [nzType]="nzOkType" (click)="onConfirm()">
                    <ng-container *ngIf="nzOkText">{{ nzOkText }}</ng-container>
                    <ng-container *ngIf="!nzOkText">{{ 'Modal.okText' | nzI18n }}</ng-container>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `
            }] }
];
/** @nocollapse */
NzPopconfirmComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
];
if (false) {
    /** @type {?} */
    NzPopconfirmComponent.prototype.nzCancelText;
    /** @type {?} */
    NzPopconfirmComponent.prototype.nzCondition;
    /** @type {?} */
    NzPopconfirmComponent.prototype.nzIcon;
    /** @type {?} */
    NzPopconfirmComponent.prototype.nzOkText;
    /** @type {?} */
    NzPopconfirmComponent.prototype.nzOkType;
    /** @type {?} */
    NzPopconfirmComponent.prototype.nzOnCancel;
    /** @type {?} */
    NzPopconfirmComponent.prototype.nzOnConfirm;
    /**
     * @type {?}
     * @protected
     */
    NzPopconfirmComponent.prototype._trigger;
    /** @type {?} */
    NzPopconfirmComponent.prototype._prefix;
    /** @type {?} */
    NzPopconfirmComponent.prototype._hasBackdrop;
    /** @type {?} */
    NzPopconfirmComponent.prototype.noAnimation;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wY29uZmlybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvcG9wY29uZmlybS8iLCJzb3VyY2VzIjpbInBvcGNvbmZpcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFFVCx3QkFBd0IsRUFDeEIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osSUFBSSxFQUNKLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFFVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUd6RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLGtCQUFrQixFQUFvQixNQUFNLHVCQUF1QixDQUFDO0FBQ3JHLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBUzNDLE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxzQkFBc0I7Ozs7Ozs7O0lBNEMvRCxZQUNFLFVBQXNCLEVBQ3RCLFFBQTBCLEVBQzFCLFFBQWtDLEVBQ2xDLFFBQW1CLEVBQ0MsV0FBb0M7UUFFeEQsS0FBSyxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztRQXZDdEMsZ0JBQVcsR0FBWSxLQUFLLENBQUM7Ozs7O1FBTTdDLGNBQVMsR0FBcUIsT0FBTyxDQUFDOztRQUtELDBCQUFxQixHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDL0UsZUFBVSxHQUFHLElBQUksWUFB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eUNBQStDOztJQUUvQyx3Q0FBa0M7O0lBQ2xDLDZDQUFvQjs7SUFFZ0IsNENBQStEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbXBvbmVudEZhY3RvcnksXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpCdXR0b25UeXBlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9idXR0b24nO1xuaW1wb3J0IHsgem9vbUJpZ01vdGlvbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9hbmltYXRpb24nO1xuaW1wb3J0IHsgTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9uby1hbmltYXRpb24nO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOelRTVHlwZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IE56VG9vbHRpcEJhc2VEaXJlY3RpdmUsIE56VG9vbFRpcENvbXBvbmVudCwgTnpUb29sdGlwVHJpZ2dlciB9IGZyb20gJ25nLXpvcnJvLWFudGQvdG9vbHRpcCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuei1wb3Bjb25maXJtXScsXG4gIGV4cG9ydEFzOiAnbnpQb3Bjb25maXJtJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LXBvcG92ZXItb3Blbl0nOiAndmlzaWJsZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelBvcGNvbmZpcm1EaXJlY3RpdmUgZXh0ZW5kcyBOelRvb2x0aXBCYXNlRGlyZWN0aXZlIHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Q29uZGl0aW9uOiBCb29sZWFuSW5wdXQ7XG5cbiAgQElucHV0KCduelBvcGNvbmZpcm1UaXRsZScpIHNwZWNpZmljVGl0bGU/OiBOelRTVHlwZTtcbiAgQElucHV0KCduei1wb3Bjb25maXJtJykgZGlyZWN0aXZlTmFtZVRpdGxlPzogTnpUU1R5cGUgfCBudWxsO1xuICBASW5wdXQoJ256UG9wY29uZmlybVRyaWdnZXInKSBzcGVjaWZpY1RyaWdnZXI/OiBOelRvb2x0aXBUcmlnZ2VyO1xuICBASW5wdXQoJ256UG9wY29uZmlybVBsYWNlbWVudCcpIHNwZWNpZmljUGxhY2VtZW50Pzogc3RyaW5nO1xuICBASW5wdXQoJ256UG9wY29uZmlybU9yaWdpbicpIHNwZWNpZmljT3JpZ2luPzogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIEBJbnB1dCgpIG56T2tUZXh0Pzogc3RyaW5nO1xuICBASW5wdXQoKSBuek9rVHlwZT86IHN0cmluZztcbiAgQElucHV0KCkgbnpDYW5jZWxUZXh0Pzogc3RyaW5nO1xuICBASW5wdXQoKSBuekljb24/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56Q29uZGl0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIDEwLjAuMC4gVGhpcyBpcyBkZXByZWNhdGVkIGFuZCBnb2luZyB0byBiZSByZW1vdmVkIGluIDEwLjAuMC5cbiAgICogUGxlYXNlIHVzZSBhIG1vcmUgc3BlY2lmaWMgQVBJLiBMaWtlIGBuelRvb2x0aXBUcmlnZ2VyYC5cbiAgICovXG4gIEBJbnB1dCgpIG56VHJpZ2dlcjogTnpUb29sdGlwVHJpZ2dlciA9ICdjbGljayc7XG5cbiAgQElucHV0KCduelBvcGNvbmZpcm1WaXNpYmxlJykgc3BlY2lmaWNWaXNpYmxlPzogYm9vbGVhbjtcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tb3V0cHV0LXJlbmFtZVxuICBAT3V0cHV0KCduelBvcGNvbmZpcm1WaXNpYmxlQ2hhbmdlJykgcmVhZG9ubHkgc3BlY2lmaWNWaXNpYmxlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpPbkNhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56T25Db25maXJtID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBjb21wb25lbnRGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PE56UG9wY29uZmlybUNvbXBvbmVudD4gPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxuICAgIE56UG9wY29uZmlybUNvbXBvbmVudFxuICApO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBuZWVkUHJveHlQcm9wZXJ0aWVzID0gW1xuICAgICduek92ZXJsYXlDbGFzc05hbWUnLFxuICAgICduek92ZXJsYXlTdHlsZScsXG4gICAgJ256TW91c2VFbnRlckRlbGF5JyxcbiAgICAnbnpNb3VzZUxlYXZlRGVsYXknLFxuICAgICduelZpc2libGUnLFxuICAgICduek9rVGV4dCcsXG4gICAgJ256T2tUeXBlJyxcbiAgICAnbnpDYW5jZWxUZXh0JyxcbiAgICAnbnpDb25kaXRpb24nLFxuICAgICduekljb24nXG4gIF07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBob3N0VmlldzogVmlld0NvbnRhaW5lclJlZixcbiAgICByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQEhvc3QoKSBAT3B0aW9uYWwoKSBub0FuaW1hdGlvbj86IE56Tm9BbmltYXRpb25EaXJlY3RpdmVcbiAgKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgaG9zdFZpZXcsIHJlc29sdmVyLCByZW5kZXJlciwgbm9BbmltYXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgcHJvdGVjdGVkIGNyZWF0ZUNvbXBvbmVudCgpOiB2b2lkIHtcbiAgICBzdXBlci5jcmVhdGVDb21wb25lbnQoKTtcblxuICAgICh0aGlzLmNvbXBvbmVudCBhcyBOelBvcGNvbmZpcm1Db21wb25lbnQpLm56T25DYW5jZWwucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLm56T25DYW5jZWwuZW1pdCgpO1xuICAgIH0pO1xuICAgICh0aGlzLmNvbXBvbmVudCBhcyBOelBvcGNvbmZpcm1Db21wb25lbnQpLm56T25Db25maXJtLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5uek9uQ29uZmlybS5lbWl0KCk7XG4gICAgfSk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvcjogJ256LXBvcGNvbmZpcm0nLFxuICBleHBvcnRBczogJ256UG9wY29uZmlybUNvbXBvbmVudCcsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBhbmltYXRpb25zOiBbem9vbUJpZ01vdGlvbl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICAjb3ZlcmxheT1cImNka0Nvbm5lY3RlZE92ZXJsYXlcIlxuICAgICAgY2RrQ29ubmVjdGVkT3ZlcmxheVxuICAgICAgbnpDb25uZWN0ZWRPdmVybGF5XG4gICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9yaWdpbl09XCJvcmlnaW5cIlxuICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlIYXNCYWNrZHJvcF09XCJfaGFzQmFja2Ryb3BcIlxuICAgICAgKGJhY2tkcm9wQ2xpY2spPVwiaGlkZSgpXCJcbiAgICAgIChkZXRhY2gpPVwiaGlkZSgpXCJcbiAgICAgIChwb3NpdGlvbkNoYW5nZSk9XCJvblBvc2l0aW9uQ2hhbmdlKCRldmVudClcIlxuICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbnNdPVwiX3Bvc2l0aW9uc1wiXG4gICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9wZW5dPVwiX3Zpc2libGVcIlxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJhbnQtcG9wb3ZlclwiXG4gICAgICAgIFtuZ0NsYXNzXT1cIl9jbGFzc01hcFwiXG4gICAgICAgIFtuZ1N0eWxlXT1cIm56T3ZlcmxheVN0eWxlXCJcbiAgICAgICAgW0AuZGlzYWJsZWRdPVwibm9BbmltYXRpb24/Lm56Tm9BbmltYXRpb25cIlxuICAgICAgICBbbnpOb0FuaW1hdGlvbl09XCJub0FuaW1hdGlvbj8ubnpOb0FuaW1hdGlvblwiXG4gICAgICAgIFtAem9vbUJpZ01vdGlvbl09XCInYWN0aXZlJ1wiXG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtcG9wb3Zlci1jb250ZW50XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFudC1wb3BvdmVyLWFycm93XCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFudC1wb3BvdmVyLWlubmVyXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXBvcG92ZXItaW5uZXItY29udGVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtcG9wb3Zlci1tZXNzYWdlXCI+XG4gICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpUaXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpJY29uOyBsZXQgaWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpIG56LWljb24gW256VHlwZV09XCJpY29uIHx8ICdleGNsYW1hdGlvbi1jaXJjbGUnXCIgbnpUaGVtZT1cImZpbGxcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXBvcG92ZXItbWVzc2FnZS10aXRsZVwiPnt7IG56VGl0bGUgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtcG9wb3Zlci1idXR0b25zXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIG56LWJ1dHRvbiBbbnpTaXplXT1cIidzbWFsbCdcIiAoY2xpY2spPVwib25DYW5jZWwoKVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibnpDYW5jZWxUZXh0XCI+e3sgbnpDYW5jZWxUZXh0IH19PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbnpDYW5jZWxUZXh0XCI+e3sgJ01vZGFsLmNhbmNlbFRleHQnIHwgbnpJMThuIH19PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gbnotYnV0dG9uIFtuelNpemVdPVwiJ3NtYWxsJ1wiIFtuelR5cGVdPVwibnpPa1R5cGVcIiAoY2xpY2spPVwib25Db25maXJtKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm56T2tUZXh0XCI+e3sgbnpPa1RleHQgfX08L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFuek9rVGV4dFwiPnt7ICdNb2RhbC5va1RleHQnIHwgbnpJMThuIH19PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56UG9wY29uZmlybUNvbXBvbmVudCBleHRlbmRzIE56VG9vbFRpcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIG56Q2FuY2VsVGV4dD86IHN0cmluZztcbiAgbnpDb25kaXRpb24gPSBmYWxzZTtcbiAgbnpJY29uPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIG56T2tUZXh0Pzogc3RyaW5nO1xuICBuek9rVHlwZTogTnpCdXR0b25UeXBlID0gJ3ByaW1hcnknO1xuXG4gIHJlYWRvbmx5IG56T25DYW5jZWwgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICByZWFkb25seSBuek9uQ29uZmlybSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgcHJvdGVjdGVkIF90cmlnZ2VyOiBOelRvb2x0aXBUcmlnZ2VyID0gJ2NsaWNrJztcblxuICBfcHJlZml4ID0gJ2FudC1wb3BvdmVyLXBsYWNlbWVudCc7XG4gIF9oYXNCYWNrZHJvcCA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgQEhvc3QoKSBAT3B0aW9uYWwoKSBwdWJsaWMgbm9BbmltYXRpb24/OiBOek5vQW5pbWF0aW9uRGlyZWN0aXZlKSB7XG4gICAgc3VwZXIoY2RyLCBub0FuaW1hdGlvbik7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuXG4gICAgdGhpcy5uek9uQ2FuY2VsLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5uek9uQ29uZmlybS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgc2hvdygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubnpDb25kaXRpb24pIHtcbiAgICAgIHN1cGVyLnNob3coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vbkNvbmZpcm0oKTtcbiAgICB9XG4gIH1cblxuICBvbkNhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLm56T25DYW5jZWwubmV4dCgpO1xuICAgIHN1cGVyLmhpZGUoKTtcbiAgfVxuXG4gIG9uQ29uZmlybSgpOiB2b2lkIHtcbiAgICB0aGlzLm56T25Db25maXJtLm5leHQoKTtcbiAgICBzdXBlci5oaWRlKCk7XG4gIH1cbn1cbiJdfQ==