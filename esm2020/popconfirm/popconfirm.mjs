import { __decorate } from "tslib";
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Directive, ElementRef, EventEmitter, Host, Inject, Input, Optional, Output, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { zoomBigMotion } from 'ng-zorro-antd/core/animation';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzTooltipBaseDirective, NzToolTipComponent } from 'ng-zorro-antd/tooltip';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/no-animation";
import * as i2 from "ng-zorro-antd/core/config";
import * as i3 from "@angular/cdk/bidi";
import * as i4 from "ng-zorro-antd/button";
import * as i5 from "@angular/cdk/overlay";
import * as i6 from "ng-zorro-antd/core/overlay";
import * as i7 from "@angular/cdk/a11y";
import * as i8 from "@angular/common";
import * as i9 from "ng-zorro-antd/core/outlet";
import * as i10 from "ng-zorro-antd/core/transition-patch";
import * as i11 from "ng-zorro-antd/icon";
import * as i12 from "ng-zorro-antd/core/wave";
import * as i13 from "ng-zorro-antd/i18n";
const NZ_CONFIG_MODULE_NAME = 'popconfirm';
export class NzPopconfirmDirective extends NzTooltipBaseDirective {
    constructor(elementRef, hostView, resolver, renderer, noAnimation, nzConfigService) {
        super(elementRef, hostView, resolver, renderer, noAnimation, nzConfigService);
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.trigger = 'click';
        this.placement = 'top';
        this.nzCondition = false;
        this.nzPopconfirmShowArrow = true;
        this.nzPopconfirmBackdrop = false;
        this.nzAutofocus = null;
        this.nzOnCancel = new EventEmitter();
        this.nzOnConfirm = new EventEmitter();
        this.componentRef = this.hostView.createComponent(NzPopconfirmComponent);
    }
    getProxyPropertyMap() {
        return {
            nzOkText: ['nzOkText', () => this.nzOkText],
            nzOkType: ['nzOkType', () => this.nzOkType],
            nzOkDanger: ['nzOkDanger', () => this.nzOkDanger],
            nzCancelText: ['nzCancelText', () => this.nzCancelText],
            nzCondition: ['nzCondition', () => this.nzCondition],
            nzIcon: ['nzIcon', () => this.nzIcon],
            nzPopconfirmShowArrow: ['nzPopconfirmShowArrow', () => this.nzPopconfirmShowArrow],
            nzPopconfirmBackdrop: ['nzBackdrop', () => this.nzPopconfirmBackdrop],
            nzAutoFocus: ['nzAutoFocus', () => this.nzAutofocus],
            ...super.getProxyPropertyMap()
        };
    }
    /**
     * @override
     */
    createComponent() {
        super.createComponent();
        this.component.nzOnCancel.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.nzOnCancel.emit();
        });
        this.component.nzOnConfirm.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.nzOnConfirm.emit();
        });
    }
}
NzPopconfirmDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPopconfirmDirective, deps: [{ token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i0.ComponentFactoryResolver }, { token: i0.Renderer2 }, { token: i1.NzNoAnimationDirective, host: true, optional: true }, { token: i2.NzConfigService }], target: i0.ɵɵFactoryTarget.Directive });
NzPopconfirmDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzPopconfirmDirective, selector: "[nz-popconfirm]", inputs: { arrowPointAtCenter: ["nzPopconfirmArrowPointAtCenter", "arrowPointAtCenter"], title: ["nzPopconfirmTitle", "title"], directiveTitle: ["nz-popconfirm", "directiveTitle"], trigger: ["nzPopconfirmTrigger", "trigger"], placement: ["nzPopconfirmPlacement", "placement"], origin: ["nzPopconfirmOrigin", "origin"], mouseEnterDelay: ["nzPopconfirmMouseEnterDelay", "mouseEnterDelay"], mouseLeaveDelay: ["nzPopconfirmMouseLeaveDelay", "mouseLeaveDelay"], overlayClassName: ["nzPopconfirmOverlayClassName", "overlayClassName"], overlayStyle: ["nzPopconfirmOverlayStyle", "overlayStyle"], visible: ["nzPopconfirmVisible", "visible"], nzOkText: "nzOkText", nzOkType: "nzOkType", nzOkDanger: "nzOkDanger", nzCancelText: "nzCancelText", nzIcon: "nzIcon", nzCondition: "nzCondition", nzPopconfirmShowArrow: "nzPopconfirmShowArrow", nzPopconfirmBackdrop: "nzPopconfirmBackdrop", nzAutofocus: "nzAutofocus" }, outputs: { nzOnCancel: "nzOnCancel", nzOnConfirm: "nzOnConfirm" }, host: { properties: { "class.ant-popover-open": "visible" } }, exportAs: ["nzPopconfirm"], usesInheritance: true, ngImport: i0 });
__decorate([
    InputBoolean()
], NzPopconfirmDirective.prototype, "arrowPointAtCenter", void 0);
__decorate([
    InputBoolean()
], NzPopconfirmDirective.prototype, "nzCondition", void 0);
__decorate([
    InputBoolean()
], NzPopconfirmDirective.prototype, "nzPopconfirmShowArrow", void 0);
__decorate([
    WithConfig()
], NzPopconfirmDirective.prototype, "nzPopconfirmBackdrop", void 0);
__decorate([
    WithConfig()
], NzPopconfirmDirective.prototype, "nzAutofocus", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPopconfirmDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-popconfirm]',
                    exportAs: 'nzPopconfirm',
                    host: {
                        '[class.ant-popover-open]': 'visible'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: i0.ComponentFactoryResolver }, { type: i0.Renderer2 }, { type: i1.NzNoAnimationDirective, decorators: [{
                    type: Host
                }, {
                    type: Optional
                }] }, { type: i2.NzConfigService }]; }, propDecorators: { arrowPointAtCenter: [{
                type: Input,
                args: ['nzPopconfirmArrowPointAtCenter']
            }], title: [{
                type: Input,
                args: ['nzPopconfirmTitle']
            }], directiveTitle: [{
                type: Input,
                args: ['nz-popconfirm']
            }], trigger: [{
                type: Input,
                args: ['nzPopconfirmTrigger']
            }], placement: [{
                type: Input,
                args: ['nzPopconfirmPlacement']
            }], origin: [{
                type: Input,
                args: ['nzPopconfirmOrigin']
            }], mouseEnterDelay: [{
                type: Input,
                args: ['nzPopconfirmMouseEnterDelay']
            }], mouseLeaveDelay: [{
                type: Input,
                args: ['nzPopconfirmMouseLeaveDelay']
            }], overlayClassName: [{
                type: Input,
                args: ['nzPopconfirmOverlayClassName']
            }], overlayStyle: [{
                type: Input,
                args: ['nzPopconfirmOverlayStyle']
            }], visible: [{
                type: Input,
                args: ['nzPopconfirmVisible']
            }], nzOkText: [{
                type: Input
            }], nzOkType: [{
                type: Input
            }], nzOkDanger: [{
                type: Input
            }], nzCancelText: [{
                type: Input
            }], nzIcon: [{
                type: Input
            }], nzCondition: [{
                type: Input
            }], nzPopconfirmShowArrow: [{
                type: Input
            }], nzPopconfirmBackdrop: [{
                type: Input
            }], nzAutofocus: [{
                type: Input
            }], nzOnCancel: [{
                type: Output
            }], nzOnConfirm: [{
                type: Output
            }] } });
export class NzPopconfirmComponent extends NzToolTipComponent {
    constructor(cdr, elementRef, directionality, document, noAnimation) {
        super(cdr, directionality, noAnimation);
        this.elementRef = elementRef;
        this.nzCondition = false;
        this.nzPopconfirmShowArrow = true;
        this.nzOkType = 'primary';
        this.nzOkDanger = false;
        this.nzAutoFocus = null;
        this.nzOnCancel = new Subject();
        this.nzOnConfirm = new Subject();
        this._trigger = 'click';
        this.elementFocusedBeforeModalWasOpened = null;
        this._prefix = 'ant-popover';
        this.document = document;
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.nzOnCancel.complete();
        this.nzOnConfirm.complete();
    }
    /**
     * @override
     */
    show() {
        if (!this.nzCondition) {
            this.capturePreviouslyFocusedElement();
            super.show();
        }
        else {
            this.onConfirm();
        }
    }
    hide() {
        super.hide();
        this.restoreFocus();
    }
    onCancel() {
        this.nzOnCancel.next();
        super.hide();
    }
    onConfirm() {
        this.nzOnConfirm.next();
        super.hide();
    }
    capturePreviouslyFocusedElement() {
        if (this.document) {
            this.elementFocusedBeforeModalWasOpened = this.document.activeElement;
        }
    }
    restoreFocus() {
        const toFocus = this.elementFocusedBeforeModalWasOpened;
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (toFocus && typeof toFocus.focus === 'function') {
            const activeElement = this.document.activeElement;
            const element = this.elementRef.nativeElement;
            if (!activeElement ||
                activeElement === this.document.body ||
                activeElement === element ||
                element.contains(activeElement)) {
                toFocus.focus();
            }
        }
    }
}
NzPopconfirmComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPopconfirmComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i3.Directionality, optional: true }, { token: DOCUMENT, optional: true }, { token: i1.NzNoAnimationDirective, host: true, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzPopconfirmComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzPopconfirmComponent, selector: "nz-popconfirm", viewQueries: [{ propertyName: "okBtn", predicate: ["okBtn"], descendants: true, read: ElementRef }, { propertyName: "cancelBtn", predicate: ["cancelBtn"], descendants: true, read: ElementRef }], exportAs: ["nzPopconfirmComponent"], usesInheritance: true, ngImport: i0, template: `
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayOrigin]="origin"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayPush]="true"
      [nzArrowPointAtCenter]="nzArrowPointAtCenter"
    >
      <div
        cdkTrapFocus
        [cdkTrapFocusAutoCapture]="nzAutoFocus !== null"
        class="ant-popover"
        [ngClass]="_classMap"
        [class.ant-popover-rtl]="dir === 'rtl'"
        [ngStyle]="nzOverlayStyle"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="ant-popover-content">
          <div class="ant-popover-arrow" *ngIf="nzPopconfirmShowArrow">
            <span class="ant-popover-arrow-content"></span>
          </div>
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
                  <button
                    nz-button
                    #cancelBtn
                    [nzSize]="'small'"
                    (click)="onCancel()"
                    [attr.cdkFocusInitial]="nzAutoFocus === 'cancel' || null"
                  >
                    <ng-container *ngIf="nzCancelText">{{ nzCancelText }}</ng-container>
                    <ng-container *ngIf="!nzCancelText">{{ 'Modal.cancelText' | nzI18n }}</ng-container>
                  </button>
                  <button
                    nz-button
                    #okBtn
                    [nzSize]="'small'"
                    [nzType]="nzOkType !== 'danger' ? nzOkType : 'primary'"
                    [nzDanger]="nzOkDanger || nzOkType === 'danger'"
                    (click)="onConfirm()"
                    [attr.cdkFocusInitial]="nzAutoFocus === 'ok' || null"
                  >
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
  `, isInline: true, components: [{ type: i4.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }], directives: [{ type: i5.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { type: i6.NzConnectedOverlayDirective, selector: "[cdkConnectedOverlay][nzConnectedOverlay]", inputs: ["nzArrowPointAtCenter"], exportAs: ["nzConnectedOverlay"] }, { type: i7.CdkTrapFocus, selector: "[cdkTrapFocus]", inputs: ["cdkTrapFocus", "cdkTrapFocusAutoCapture"], exportAs: ["cdkTrapFocus"] }, { type: i8.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i8.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NzNoAnimationDirective, selector: "[nzNoAnimation]", inputs: ["nzNoAnimation"], exportAs: ["nzNoAnimation"] }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i9.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i10.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { type: i11.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i12.NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: ["nzWaveExtraNode"], exportAs: ["nzWave"] }], pipes: { "nzI18n": i13.NzI18nPipe }, animations: [zoomBigMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPopconfirmComponent, decorators: [{
            type: Component,
            args: [{
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
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayOrigin]="origin"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayPush]="true"
      [nzArrowPointAtCenter]="nzArrowPointAtCenter"
    >
      <div
        cdkTrapFocus
        [cdkTrapFocusAutoCapture]="nzAutoFocus !== null"
        class="ant-popover"
        [ngClass]="_classMap"
        [class.ant-popover-rtl]="dir === 'rtl'"
        [ngStyle]="nzOverlayStyle"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="ant-popover-content">
          <div class="ant-popover-arrow" *ngIf="nzPopconfirmShowArrow">
            <span class="ant-popover-arrow-content"></span>
          </div>
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
                  <button
                    nz-button
                    #cancelBtn
                    [nzSize]="'small'"
                    (click)="onCancel()"
                    [attr.cdkFocusInitial]="nzAutoFocus === 'cancel' || null"
                  >
                    <ng-container *ngIf="nzCancelText">{{ nzCancelText }}</ng-container>
                    <ng-container *ngIf="!nzCancelText">{{ 'Modal.cancelText' | nzI18n }}</ng-container>
                  </button>
                  <button
                    nz-button
                    #okBtn
                    [nzSize]="'small'"
                    [nzType]="nzOkType !== 'danger' ? nzOkType : 'primary'"
                    [nzDanger]="nzOkDanger || nzOkType === 'danger'"
                    (click)="onConfirm()"
                    [attr.cdkFocusInitial]="nzAutoFocus === 'ok' || null"
                  >
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
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i3.Directionality, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.NzNoAnimationDirective, decorators: [{
                    type: Host
                }, {
                    type: Optional
                }] }]; }, propDecorators: { okBtn: [{
                type: ViewChildren,
                args: ['okBtn', { read: ElementRef }]
            }], cancelBtn: [{
                type: ViewChildren,
                args: ['cancelBtn', { read: ElementRef }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wY29uZmlybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvcG9wY29uZmlybS9wb3Bjb25maXJtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFNQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBR1QsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osSUFBSSxFQUNKLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFJTixZQUFZLEVBRVosaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3RCxPQUFPLEVBQWdDLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBR3JGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsa0JBQWtCLEVBQXFDLE1BQU0sdUJBQXVCLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQUl0SCxNQUFNLHFCQUFxQixHQUFnQixZQUFZLENBQUM7QUFTeEQsTUFBTSxPQUFPLHFCQUFzQixTQUFRLHNCQUFzQjtJQWdEL0QsWUFDRSxVQUFzQixFQUN0QixRQUEwQixFQUMxQixRQUFrQyxFQUNsQyxRQUFtQixFQUNDLFdBQW9DLEVBQ3hELGVBQWlDO1FBRWpDLEtBQUssQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBdkR2RSxrQkFBYSxHQUFnQixxQkFBcUIsQ0FBQztRQVFyQixZQUFPLEdBQXNCLE9BQU8s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QzNCLElBQUk7OzBCQUFJLFFBQVE7NENBMUIwQixLQUFLO3NCQUFqRCxZQUFZO3VCQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7Z0JBQ00sU0FBUztzQkFBekQsWUFBWTt1QkFBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0LFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkcmVuLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpCdXR0b25UeXBlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9idXR0b24nO1xuaW1wb3J0IHsgem9vbUJpZ01vdGlvbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9hbmltYXRpb24nO1xuaW1wb3J0IHsgTnpDb25maWdLZXksIE56Q29uZmlnU2VydmljZSwgV2l0aENvbmZpZyB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9jb25maWcnO1xuaW1wb3J0IHsgTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9uby1hbmltYXRpb24nO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOZ1N0eWxlSW50ZXJmYWNlLCBOelNhZmVBbnksIE56VFNUeXBlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IE56VG9vbHRpcEJhc2VEaXJlY3RpdmUsIE56VG9vbFRpcENvbXBvbmVudCwgTnpUb29sdGlwVHJpZ2dlciwgUHJvcGVydHlNYXBwaW5nIH0gZnJvbSAnbmctem9ycm8tYW50ZC90b29sdGlwJztcblxuZXhwb3J0IHR5cGUgTnpBdXRvRm9jdXNUeXBlID0gbnVsbCB8ICdvaycgfCAnY2FuY2VsJztcblxuY29uc3QgTlpfQ09ORklHX01PRFVMRV9OQU1FOiBOekNvbmZpZ0tleSA9ICdwb3Bjb25maXJtJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW256LXBvcGNvbmZpcm1dJyxcbiAgZXhwb3J0QXM6ICduelBvcGNvbmZpcm0nLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtcG9wb3Zlci1vcGVuXSc6ICd2aXNpYmxlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56UG9wY29uZmlybURpcmVjdGl2ZSBleHRlbmRzIE56VG9vbHRpcEJhc2VEaXJlY3RpdmUge1xuICByZWFkb25seSBfbnpNb2R1bGVOYW1lOiBOekNvbmZpZ0tleSA9IE5aX0NPTkZJR19NT0RVTEVfTkFNRTtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Q29uZGl0aW9uOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelBvcGNvbmZpcm1TaG93QXJyb3c6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256UG9wY29uZmlybUFycm93UG9pbnRBdENlbnRlcjogQm9vbGVhbklucHV0O1xuXG4gIEBJbnB1dCgnbnpQb3Bjb25maXJtQXJyb3dQb2ludEF0Q2VudGVyJykgQElucHV0Qm9vbGVhbigpIG92ZXJyaWRlIGFycm93UG9pbnRBdENlbnRlcj86IGJvb2xlYW47XG4gIEBJbnB1dCgnbnpQb3Bjb25maXJtVGl0bGUnKSBvdmVycmlkZSB0aXRsZT86IE56VFNUeXBlO1xuICBASW5wdXQoJ256LXBvcGNvbmZpcm0nKSBvdmVycmlkZSBkaXJlY3RpdmVUaXRsZT86IE56VFNUeXBlIHwgbnVsbDtcbiAgQElucHV0KCduelBvcGNvbmZpcm1UcmlnZ2VyJykgb3ZlcnJpZGUgdHJpZ2dlcj86IE56VG9vbHRpcFRyaWdnZXIgPSAnY2xpY2snO1xuICBASW5wdXQoJ256UG9wY29uZmlybVBsYWNlbWVudCcpIG92ZXJyaWRlIHBsYWNlbWVudD86IHN0cmluZyB8IHN0cmluZ1tdID0gJ3RvcCc7XG4gIEBJbnB1dCgnbnpQb3Bjb25maXJtT3JpZ2luJykgb3ZlcnJpZGUgb3JpZ2luPzogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIEBJbnB1dCgnbnpQb3Bjb25maXJtTW91c2VFbnRlckRlbGF5Jykgb3ZlcnJpZGUgbW91c2VFbnRlckRlbGF5PzogbnVtYmVyO1xuICBASW5wdXQoJ256UG9wY29uZmlybU1vdXNlTGVhdmVEZWxheScpIG92ZXJyaWRlIG1vdXNlTGVhdmVEZWxheT86IG51bWJlcjtcbiAgQElucHV0KCduelBvcGNvbmZpcm1PdmVybGF5Q2xhc3NOYW1lJykgb3ZlcnJpZGUgb3ZlcmxheUNsYXNzTmFtZT86IHN0cmluZztcbiAgQElucHV0KCduelBvcGNvbmZpcm1PdmVybGF5U3R5bGUnKSBvdmVycmlkZSBvdmVybGF5U3R5bGU/OiBOZ1N0eWxlSW50ZXJmYWNlO1xuICBASW5wdXQoJ256UG9wY29uZmlybVZpc2libGUnKSBvdmVycmlkZSB2aXNpYmxlPzogYm9vbGVhbjtcbiAgQElucHV0KCkgbnpPa1RleHQ/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG56T2tUeXBlPzogc3RyaW5nO1xuICBASW5wdXQoKSBuek9rRGFuZ2VyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgbnpDYW5jZWxUZXh0Pzogc3RyaW5nO1xuICBASW5wdXQoKSBuekljb24/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56Q29uZGl0aW9uOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelBvcGNvbmZpcm1TaG93QXJyb3c6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56UG9wY29uZmlybUJhY2tkcm9wPzogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56QXV0b2ZvY3VzOiBOekF1dG9Gb2N1c1R5cGUgPSBudWxsO1xuXG4gIEBPdXRwdXQoKSByZWFkb25seSBuek9uQ2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpPbkNvbmZpcm0gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIHJlYWRvbmx5IGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPE56UG9wY29uZmlybUNvbXBvbmVudD4gPVxuICAgIHRoaXMuaG9zdFZpZXcuY3JlYXRlQ29tcG9uZW50KE56UG9wY29uZmlybUNvbXBvbmVudCk7XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGdldFByb3h5UHJvcGVydHlNYXAoKTogUHJvcGVydHlNYXBwaW5nIHtcbiAgICByZXR1cm4ge1xuICAgICAgbnpPa1RleHQ6IFsnbnpPa1RleHQnLCAoKSA9PiB0aGlzLm56T2tUZXh0XSxcbiAgICAgIG56T2tUeXBlOiBbJ256T2tUeXBlJywgKCkgPT4gdGhpcy5uek9rVHlwZV0sXG4gICAgICBuek9rRGFuZ2VyOiBbJ256T2tEYW5nZXInLCAoKSA9PiB0aGlzLm56T2tEYW5nZXJdLFxuICAgICAgbnpDYW5jZWxUZXh0OiBbJ256Q2FuY2VsVGV4dCcsICgpID0+IHRoaXMubnpDYW5jZWxUZXh0XSxcbiAgICAgIG56Q29uZGl0aW9uOiBbJ256Q29uZGl0aW9uJywgKCkgPT4gdGhpcy5uekNvbmRpdGlvbl0sXG4gICAgICBuekljb246IFsnbnpJY29uJywgKCkgPT4gdGhpcy5uekljb25dLFxuICAgICAgbnpQb3Bjb25maXJtU2hvd0Fycm93OiBbJ256UG9wY29uZmlybVNob3dBcnJvdycsICgpID0+IHRoaXMubnpQb3Bjb25maXJtU2hvd0Fycm93XSxcbiAgICAgIG56UG9wY29uZmlybUJhY2tkcm9wOiBbJ256QmFja2Ryb3AnLCAoKSA9PiB0aGlzLm56UG9wY29uZmlybUJhY2tkcm9wXSxcbiAgICAgIG56QXV0b0ZvY3VzOiBbJ256QXV0b0ZvY3VzJywgKCkgPT4gdGhpcy5uekF1dG9mb2N1c10sXG4gICAgICAuLi5zdXBlci5nZXRQcm94eVByb3BlcnR5TWFwKClcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBob3N0VmlldzogVmlld0NvbnRhaW5lclJlZixcbiAgICByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQEhvc3QoKSBAT3B0aW9uYWwoKSBub0FuaW1hdGlvbj86IE56Tm9BbmltYXRpb25EaXJlY3RpdmUsXG4gICAgbnpDb25maWdTZXJ2aWNlPzogTnpDb25maWdTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIGhvc3RWaWV3LCByZXNvbHZlciwgcmVuZGVyZXIsIG5vQW5pbWF0aW9uLCBuekNvbmZpZ1NlcnZpY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGNyZWF0ZUNvbXBvbmVudCgpOiB2b2lkIHtcbiAgICBzdXBlci5jcmVhdGVDb21wb25lbnQoKTtcblxuICAgICh0aGlzLmNvbXBvbmVudCBhcyBOelBvcGNvbmZpcm1Db21wb25lbnQpLm56T25DYW5jZWwucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLm56T25DYW5jZWwuZW1pdCgpO1xuICAgIH0pO1xuICAgICh0aGlzLmNvbXBvbmVudCBhcyBOelBvcGNvbmZpcm1Db21wb25lbnQpLm56T25Db25maXJtLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5uek9uQ29uZmlybS5lbWl0KCk7XG4gICAgfSk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvcjogJ256LXBvcGNvbmZpcm0nLFxuICBleHBvcnRBczogJ256UG9wY29uZmlybUNvbXBvbmVudCcsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBhbmltYXRpb25zOiBbem9vbUJpZ01vdGlvbl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICAjb3ZlcmxheT1cImNka0Nvbm5lY3RlZE92ZXJsYXlcIlxuICAgICAgY2RrQ29ubmVjdGVkT3ZlcmxheVxuICAgICAgbnpDb25uZWN0ZWRPdmVybGF5XG4gICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheUhhc0JhY2tkcm9wXT1cIm56QmFja2Ryb3BcIlxuICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcmlnaW5dPVwib3JpZ2luXCJcbiAgICAgIChvdmVybGF5T3V0c2lkZUNsaWNrKT1cIm9uQ2xpY2tPdXRzaWRlKCRldmVudClcIlxuICAgICAgKGRldGFjaCk9XCJoaWRlKClcIlxuICAgICAgKHBvc2l0aW9uQ2hhbmdlKT1cIm9uUG9zaXRpb25DaGFuZ2UoJGV2ZW50KVwiXG4gICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uc109XCJfcG9zaXRpb25zXCJcbiAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3Blbl09XCJfdmlzaWJsZVwiXG4gICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheVB1c2hdPVwidHJ1ZVwiXG4gICAgICBbbnpBcnJvd1BvaW50QXRDZW50ZXJdPVwibnpBcnJvd1BvaW50QXRDZW50ZXJcIlxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgY2RrVHJhcEZvY3VzXG4gICAgICAgIFtjZGtUcmFwRm9jdXNBdXRvQ2FwdHVyZV09XCJuekF1dG9Gb2N1cyAhPT0gbnVsbFwiXG4gICAgICAgIGNsYXNzPVwiYW50LXBvcG92ZXJcIlxuICAgICAgICBbbmdDbGFzc109XCJfY2xhc3NNYXBcIlxuICAgICAgICBbY2xhc3MuYW50LXBvcG92ZXItcnRsXT1cImRpciA9PT0gJ3J0bCdcIlxuICAgICAgICBbbmdTdHlsZV09XCJuek92ZXJsYXlTdHlsZVwiXG4gICAgICAgIFtALmRpc2FibGVkXT1cIm5vQW5pbWF0aW9uPy5uek5vQW5pbWF0aW9uXCJcbiAgICAgICAgW256Tm9BbmltYXRpb25dPVwibm9BbmltYXRpb24/Lm56Tm9BbmltYXRpb25cIlxuICAgICAgICBbQHpvb21CaWdNb3Rpb25dPVwiJ2FjdGl2ZSdcIlxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXBvcG92ZXItY29udGVudFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtcG9wb3Zlci1hcnJvd1wiICpuZ0lmPVwibnpQb3Bjb25maXJtU2hvd0Fycm93XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFudC1wb3BvdmVyLWFycm93LWNvbnRlbnRcIj48L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFudC1wb3BvdmVyLWlubmVyXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXBvcG92ZXItaW5uZXItY29udGVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtcG9wb3Zlci1tZXNzYWdlXCI+XG4gICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpUaXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpJY29uOyBsZXQgaWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpIG56LWljb24gW256VHlwZV09XCJpY29uIHx8ICdleGNsYW1hdGlvbi1jaXJjbGUnXCIgbnpUaGVtZT1cImZpbGxcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXBvcG92ZXItbWVzc2FnZS10aXRsZVwiPnt7IG56VGl0bGUgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtcG9wb3Zlci1idXR0b25zXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG56LWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAjY2FuY2VsQnRuXG4gICAgICAgICAgICAgICAgICAgIFtuelNpemVdPVwiJ3NtYWxsJ1wiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkNhbmNlbCgpXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuY2RrRm9jdXNJbml0aWFsXT1cIm56QXV0b0ZvY3VzID09PSAnY2FuY2VsJyB8fCBudWxsXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm56Q2FuY2VsVGV4dFwiPnt7IG56Q2FuY2VsVGV4dCB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIW56Q2FuY2VsVGV4dFwiPnt7ICdNb2RhbC5jYW5jZWxUZXh0JyB8IG56STE4biB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG56LWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAjb2tCdG5cbiAgICAgICAgICAgICAgICAgICAgW256U2l6ZV09XCInc21hbGwnXCJcbiAgICAgICAgICAgICAgICAgICAgW256VHlwZV09XCJuek9rVHlwZSAhPT0gJ2RhbmdlcicgPyBuek9rVHlwZSA6ICdwcmltYXJ5J1wiXG4gICAgICAgICAgICAgICAgICAgIFtuekRhbmdlcl09XCJuek9rRGFuZ2VyIHx8IG56T2tUeXBlID09PSAnZGFuZ2VyJ1wiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkNvbmZpcm0oKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmNka0ZvY3VzSW5pdGlhbF09XCJuekF1dG9Gb2N1cyA9PT0gJ29rJyB8fCBudWxsXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm56T2tUZXh0XCI+e3sgbnpPa1RleHQgfX08L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFuek9rVGV4dFwiPnt7ICdNb2RhbC5va1RleHQnIHwgbnpJMThuIH19PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56UG9wY29uZmlybUNvbXBvbmVudCBleHRlbmRzIE56VG9vbFRpcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGRyZW4oJ29rQnRuJywgeyByZWFkOiBFbGVtZW50UmVmIH0pIG9rQnRuITogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuICBAVmlld0NoaWxkcmVuKCdjYW5jZWxCdG4nLCB7IHJlYWQ6IEVsZW1lbnRSZWYgfSkgY2FuY2VsQnRuITogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuXG4gIG56Q2FuY2VsVGV4dD86IHN0cmluZztcbiAgbnpDb25kaXRpb24gPSBmYWxzZTtcbiAgbnpQb3Bjb25maXJtU2hvd0Fycm93ID0gdHJ1ZTtcbiAgbnpJY29uPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIG56T2tUZXh0Pzogc3RyaW5nO1xuICBuek9rVHlwZTogTnpCdXR0b25UeXBlIHwgJ2RhbmdlcicgPSAncHJpbWFyeSc7XG4gIG56T2tEYW5nZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgbnpBdXRvRm9jdXM6IE56QXV0b0ZvY3VzVHlwZSA9IG51bGw7XG5cbiAgcmVhZG9ubHkgbnpPbkNhbmNlbCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHJlYWRvbmx5IG56T25Db25maXJtID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX3RyaWdnZXI6IE56VG9vbHRpcFRyaWdnZXIgPSAnY2xpY2snO1xuICBwcml2YXRlIGVsZW1lbnRGb2N1c2VkQmVmb3JlTW9kYWxXYXNPcGVuZWQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50O1xuXG4gIG92ZXJyaWRlIF9wcmVmaXggPSAnYW50LXBvcG92ZXInO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBPcHRpb25hbCgpIGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERPQ1VNRU5UKSBkb2N1bWVudDogTnpTYWZlQW55LFxuICAgIEBIb3N0KCkgQE9wdGlvbmFsKCkgbm9BbmltYXRpb24/OiBOek5vQW5pbWF0aW9uRGlyZWN0aXZlXG4gICkge1xuICAgIHN1cGVyKGNkciwgZGlyZWN0aW9uYWxpdHksIG5vQW5pbWF0aW9uKTtcbiAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gIH1cblxuICBvdmVycmlkZSBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuXG4gICAgdGhpcy5uek9uQ2FuY2VsLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5uek9uQ29uZmlybS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgb3ZlcnJpZGUgc2hvdygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubnpDb25kaXRpb24pIHtcbiAgICAgIHRoaXMuY2FwdHVyZVByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCgpO1xuICAgICAgc3VwZXIuc2hvdygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uQ29uZmlybSgpO1xuICAgIH1cbiAgfVxuXG4gIG92ZXJyaWRlIGhpZGUoKTogdm9pZCB7XG4gICAgc3VwZXIuaGlkZSgpO1xuICAgIHRoaXMucmVzdG9yZUZvY3VzKCk7XG4gIH1cblxuICBvbkNhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLm56T25DYW5jZWwubmV4dCgpO1xuICAgIHN1cGVyLmhpZGUoKTtcbiAgfVxuXG4gIG9uQ29uZmlybSgpOiB2b2lkIHtcbiAgICB0aGlzLm56T25Db25maXJtLm5leHQoKTtcbiAgICBzdXBlci5oaWRlKCk7XG4gIH1cblxuICBwcml2YXRlIGNhcHR1cmVQcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZG9jdW1lbnQpIHtcbiAgICAgIHRoaXMuZWxlbWVudEZvY3VzZWRCZWZvcmVNb2RhbFdhc09wZW5lZCA9IHRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc3RvcmVGb2N1cygpOiB2b2lkIHtcbiAgICBjb25zdCB0b0ZvY3VzID0gdGhpcy5lbGVtZW50Rm9jdXNlZEJlZm9yZU1vZGFsV2FzT3BlbmVkIGFzIEhUTUxFbGVtZW50O1xuXG4gICAgLy8gV2UgbmVlZCB0aGUgZXh0cmEgY2hlY2ssIGJlY2F1c2UgSUUgY2FuIHNldCB0aGUgYGFjdGl2ZUVsZW1lbnRgIHRvIG51bGwgaW4gc29tZSBjYXNlcy5cbiAgICBpZiAodG9Gb2N1cyAmJiB0eXBlb2YgdG9Gb2N1cy5mb2N1cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3QgYWN0aXZlRWxlbWVudCA9IHRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBFbGVtZW50O1xuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICBpZiAoXG4gICAgICAgICFhY3RpdmVFbGVtZW50IHx8XG4gICAgICAgIGFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuZG9jdW1lbnQuYm9keSB8fFxuICAgICAgICBhY3RpdmVFbGVtZW50ID09PSBlbGVtZW50IHx8XG4gICAgICAgIGVsZW1lbnQuY29udGFpbnMoYWN0aXZlRWxlbWVudClcbiAgICAgICkge1xuICAgICAgICB0b0ZvY3VzLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=