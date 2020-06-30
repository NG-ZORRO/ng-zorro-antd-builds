/**
 * @fileoverview added by tsickle
 * Generated from: popconfirm.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __decorate, __extends, __metadata } from "tslib";
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
var NzPopconfirmDirective = /** @class */ (function (_super) {
    __extends(NzPopconfirmDirective, _super);
    function NzPopconfirmDirective(elementRef, hostView, resolver, renderer, noAnimation) {
        var _this = _super.call(this, elementRef, hostView, resolver, renderer, noAnimation) || this;
        _this.nzCondition = false;
        /**
         * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
         * Please use a more specific API. Like `nzTooltipTrigger`.
         */
        _this.nzTrigger = 'click';
        _this.nzOnCancel = new EventEmitter();
        _this.nzOnConfirm = new EventEmitter();
        _this.componentFactory = _this.resolver.resolveComponentFactory(NzPopconfirmComponent);
        _this.needProxyProperties = [
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
        return _this;
    }
    /**
     * @override
     */
    /**
     * @override
     * @protected
     * @return {?}
     */
    NzPopconfirmDirective.prototype.createComponent = /**
     * @override
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.createComponent.call(this);
        ((/** @type {?} */ (this.component))).nzOnCancel.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.nzOnCancel.emit();
        }));
        ((/** @type {?} */ (this.component))).nzOnConfirm.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.nzOnConfirm.emit();
        }));
    };
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
    NzPopconfirmDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ViewContainerRef },
        { type: ComponentFactoryResolver },
        { type: Renderer2 },
        { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
    ]; };
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
        nzOnCancel: [{ type: Output }],
        nzOnConfirm: [{ type: Output }]
    };
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzPopconfirmDirective.prototype, "nzCondition", void 0);
    return NzPopconfirmDirective;
}(NzTooltipBaseDirective));
export { NzPopconfirmDirective };
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
var NzPopconfirmComponent = /** @class */ (function (_super) {
    __extends(NzPopconfirmComponent, _super);
    function NzPopconfirmComponent(cdr, noAnimation) {
        var _this = _super.call(this, cdr, noAnimation) || this;
        _this.noAnimation = noAnimation;
        _this.nzCondition = false;
        _this.nzOkType = 'primary';
        _this.nzOnCancel = new Subject();
        _this.nzOnConfirm = new Subject();
        _this._trigger = 'click';
        _this._prefix = 'ant-popover-placement';
        _this._hasBackdrop = true;
        return _this;
    }
    /**
     * @return {?}
     */
    NzPopconfirmComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        this.nzOnCancel.complete();
        this.nzOnConfirm.complete();
    };
    /**
     * @override
     */
    /**
     * @override
     * @return {?}
     */
    NzPopconfirmComponent.prototype.show = /**
     * @override
     * @return {?}
     */
    function () {
        if (!this.nzCondition) {
            _super.prototype.show.call(this);
        }
        else {
            this.onConfirm();
        }
    };
    /**
     * @return {?}
     */
    NzPopconfirmComponent.prototype.onCancel = /**
     * @return {?}
     */
    function () {
        this.nzOnCancel.next();
        _super.prototype.hide.call(this);
    };
    /**
     * @return {?}
     */
    NzPopconfirmComponent.prototype.onConfirm = /**
     * @return {?}
     */
    function () {
        this.nzOnConfirm.next();
        _super.prototype.hide.call(this);
    };
    NzPopconfirmComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-popconfirm',
                    exportAs: 'nzPopconfirmComponent',
                    preserveWhitespaces: false,
                    animations: [zoomBigMotion],
                    template: "\n    <ng-template\n      #overlay=\"cdkConnectedOverlay\"\n      cdkConnectedOverlay\n      nzConnectedOverlay\n      [cdkConnectedOverlayOrigin]=\"origin\"\n      [cdkConnectedOverlayHasBackdrop]=\"_hasBackdrop\"\n      (backdropClick)=\"hide()\"\n      (detach)=\"hide()\"\n      (positionChange)=\"onPositionChange($event)\"\n      [cdkConnectedOverlayPositions]=\"_positions\"\n      [cdkConnectedOverlayOpen]=\"_visible\"\n    >\n      <div\n        class=\"ant-popover\"\n        [ngClass]=\"_classMap\"\n        [ngStyle]=\"nzOverlayStyle\"\n        [@.disabled]=\"noAnimation?.nzNoAnimation\"\n        [nzNoAnimation]=\"noAnimation?.nzNoAnimation\"\n        [@zoomBigMotion]=\"'active'\"\n      >\n        <div class=\"ant-popover-content\">\n          <div class=\"ant-popover-arrow\"></div>\n          <div class=\"ant-popover-inner\">\n            <div>\n              <div class=\"ant-popover-inner-content\">\n                <div class=\"ant-popover-message\">\n                  <ng-container *nzStringTemplateOutlet=\"nzTitle\">\n                    <ng-container *nzStringTemplateOutlet=\"nzIcon; let icon\">\n                      <i nz-icon [nzType]=\"icon || 'exclamation-circle'\" nzTheme=\"fill\"></i>\n                    </ng-container>\n                    <div class=\"ant-popover-message-title\">{{ nzTitle }}</div>\n                  </ng-container>\n                </div>\n                <div class=\"ant-popover-buttons\">\n                  <button nz-button [nzSize]=\"'small'\" (click)=\"onCancel()\">\n                    <ng-container *ngIf=\"nzCancelText\">{{ nzCancelText }}</ng-container>\n                    <ng-container *ngIf=\"!nzCancelText\">{{ 'Modal.cancelText' | nzI18n }}</ng-container>\n                  </button>\n                  <button nz-button [nzSize]=\"'small'\" [nzType]=\"nzOkType\" (click)=\"onConfirm()\">\n                    <ng-container *ngIf=\"nzOkText\">{{ nzOkText }}</ng-container>\n                    <ng-container *ngIf=\"!nzOkText\">{{ 'Modal.okText' | nzI18n }}</ng-container>\n                  </button>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </ng-template>\n  "
                }] }
    ];
    /** @nocollapse */
    NzPopconfirmComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
    ]; };
    return NzPopconfirmComponent;
}(NzToolTipComponent));
export { NzPopconfirmComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wY29uZmlybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvcG9wY29uZmlybS8iLCJzb3VyY2VzIjpbInBvcGNvbmZpcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFFVCx3QkFBd0IsRUFDeEIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osSUFBSSxFQUNKLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFFVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUd6RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLGtCQUFrQixFQUFvQixNQUFNLHVCQUF1QixDQUFDO0FBQ3JHLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDO0lBTzJDLHlDQUFzQjtJQXdDL0QsK0JBQ0UsVUFBc0IsRUFDdEIsUUFBMEIsRUFDMUIsUUFBa0MsRUFDbEMsUUFBbUIsRUFDQyxXQUFvQztRQUwxRCxZQU9FLGtCQUFNLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUMsU0FDN0Q7UUFwQ3dCLGlCQUFXLEdBQVksS0FBSyxDQUFDOzs7OztRQU03QyxlQUFTLEdBQXFCLE9BQU8sQ0FBQztRQUU1QixnQkFBVSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDdEMsaUJBQVcsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBRXZDLHNC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Qjs7SUFFZ0IsNENBQStEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbXBvbmVudEZhY3RvcnksXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpCdXR0b25UeXBlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9idXR0b24nO1xuaW1wb3J0IHsgem9vbUJpZ01vdGlvbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9hbmltYXRpb24nO1xuaW1wb3J0IHsgTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9uby1hbmltYXRpb24nO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOelRTVHlwZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IE56VG9vbHRpcEJhc2VEaXJlY3RpdmUsIE56VG9vbFRpcENvbXBvbmVudCwgTnpUb29sdGlwVHJpZ2dlciB9IGZyb20gJ25nLXpvcnJvLWFudGQvdG9vbHRpcCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuei1wb3Bjb25maXJtXScsXG4gIGV4cG9ydEFzOiAnbnpQb3Bjb25maXJtJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LXBvcG92ZXItb3Blbl0nOiAndmlzaWJsZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelBvcGNvbmZpcm1EaXJlY3RpdmUgZXh0ZW5kcyBOelRvb2x0aXBCYXNlRGlyZWN0aXZlIHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Q29uZGl0aW9uOiBCb29sZWFuSW5wdXQ7XG5cbiAgQElucHV0KCduelBvcGNvbmZpcm1UaXRsZScpIHNwZWNpZmljVGl0bGU/OiBOelRTVHlwZTtcbiAgQElucHV0KCduei1wb3Bjb25maXJtJykgZGlyZWN0aXZlTmFtZVRpdGxlPzogTnpUU1R5cGUgfCBudWxsO1xuICBASW5wdXQoJ256UG9wY29uZmlybVRyaWdnZXInKSBzcGVjaWZpY1RyaWdnZXI/OiBOelRvb2x0aXBUcmlnZ2VyO1xuICBASW5wdXQoJ256UG9wY29uZmlybVBsYWNlbWVudCcpIHNwZWNpZmljUGxhY2VtZW50Pzogc3RyaW5nO1xuICBASW5wdXQoJ256UG9wY29uZmlybU9yaWdpbicpIHNwZWNpZmljT3JpZ2luPzogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIEBJbnB1dCgpIG56T2tUZXh0Pzogc3RyaW5nO1xuICBASW5wdXQoKSBuek9rVHlwZT86IHN0cmluZztcbiAgQElucHV0KCkgbnpDYW5jZWxUZXh0Pzogc3RyaW5nO1xuICBASW5wdXQoKSBuekljb24/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56Q29uZGl0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIDEwLjAuMC4gVGhpcyBpcyBkZXByZWNhdGVkIGFuZCBnb2luZyB0byBiZSByZW1vdmVkIGluIDEwLjAuMC5cbiAgICogUGxlYXNlIHVzZSBhIG1vcmUgc3BlY2lmaWMgQVBJLiBMaWtlIGBuelRvb2x0aXBUcmlnZ2VyYC5cbiAgICovXG4gIEBJbnB1dCgpIG56VHJpZ2dlcjogTnpUb29sdGlwVHJpZ2dlciA9ICdjbGljayc7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56T25DYW5jZWwgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuek9uQ29uZmlybSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgY29tcG9uZW50RmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeTxOelBvcGNvbmZpcm1Db21wb25lbnQ+ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcbiAgICBOelBvcGNvbmZpcm1Db21wb25lbnRcbiAgKTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgbmVlZFByb3h5UHJvcGVydGllcyA9IFtcbiAgICAnbnpPdmVybGF5Q2xhc3NOYW1lJyxcbiAgICAnbnpPdmVybGF5U3R5bGUnLFxuICAgICduek1vdXNlRW50ZXJEZWxheScsXG4gICAgJ256TW91c2VMZWF2ZURlbGF5JyxcbiAgICAnbnpWaXNpYmxlJyxcbiAgICAnbnpPa1RleHQnLFxuICAgICduek9rVHlwZScsXG4gICAgJ256Q2FuY2VsVGV4dCcsXG4gICAgJ256Q29uZGl0aW9uJyxcbiAgICAnbnpJY29uJ1xuICBdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgaG9zdFZpZXc6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBIb3N0KCkgQE9wdGlvbmFsKCkgbm9BbmltYXRpb24/OiBOek5vQW5pbWF0aW9uRGlyZWN0aXZlXG4gICkge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIGhvc3RWaWV3LCByZXNvbHZlciwgcmVuZGVyZXIsIG5vQW5pbWF0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIHByb3RlY3RlZCBjcmVhdGVDb21wb25lbnQoKTogdm9pZCB7XG4gICAgc3VwZXIuY3JlYXRlQ29tcG9uZW50KCk7XG5cbiAgICAodGhpcy5jb21wb25lbnQgYXMgTnpQb3Bjb25maXJtQ29tcG9uZW50KS5uek9uQ2FuY2VsLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5uek9uQ2FuY2VsLmVtaXQoKTtcbiAgICB9KTtcbiAgICAodGhpcy5jb21wb25lbnQgYXMgTnpQb3Bjb25maXJtQ29tcG9uZW50KS5uek9uQ29uZmlybS5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMubnpPbkNvbmZpcm0uZW1pdCgpO1xuICAgIH0pO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6ICduei1wb3Bjb25maXJtJyxcbiAgZXhwb3J0QXM6ICduelBvcGNvbmZpcm1Db21wb25lbnQnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgYW5pbWF0aW9uczogW3pvb21CaWdNb3Rpb25dLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgI292ZXJsYXk9XCJjZGtDb25uZWN0ZWRPdmVybGF5XCJcbiAgICAgIGNka0Nvbm5lY3RlZE92ZXJsYXlcbiAgICAgIG56Q29ubmVjdGVkT3ZlcmxheVxuICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcmlnaW5dPVwib3JpZ2luXCJcbiAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5SGFzQmFja2Ryb3BdPVwiX2hhc0JhY2tkcm9wXCJcbiAgICAgIChiYWNrZHJvcENsaWNrKT1cImhpZGUoKVwiXG4gICAgICAoZGV0YWNoKT1cImhpZGUoKVwiXG4gICAgICAocG9zaXRpb25DaGFuZ2UpPVwib25Qb3NpdGlvbkNoYW5nZSgkZXZlbnQpXCJcbiAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25zXT1cIl9wb3NpdGlvbnNcIlxuICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcGVuXT1cIl92aXNpYmxlXCJcbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwiYW50LXBvcG92ZXJcIlxuICAgICAgICBbbmdDbGFzc109XCJfY2xhc3NNYXBcIlxuICAgICAgICBbbmdTdHlsZV09XCJuek92ZXJsYXlTdHlsZVwiXG4gICAgICAgIFtALmRpc2FibGVkXT1cIm5vQW5pbWF0aW9uPy5uek5vQW5pbWF0aW9uXCJcbiAgICAgICAgW256Tm9BbmltYXRpb25dPVwibm9BbmltYXRpb24/Lm56Tm9BbmltYXRpb25cIlxuICAgICAgICBbQHpvb21CaWdNb3Rpb25dPVwiJ2FjdGl2ZSdcIlxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXBvcG92ZXItY29udGVudFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtcG9wb3Zlci1hcnJvd1wiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtcG9wb3Zlci1pbm5lclwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFudC1wb3BvdmVyLWlubmVyLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXBvcG92ZXItbWVzc2FnZVwiPlxuICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56VGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56SWNvbjsgbGV0IGljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aSBuei1pY29uIFtuelR5cGVdPVwiaWNvbiB8fCAnZXhjbGFtYXRpb24tY2lyY2xlJ1wiIG56VGhlbWU9XCJmaWxsXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFudC1wb3BvdmVyLW1lc3NhZ2UtdGl0bGVcIj57eyBuelRpdGxlIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXBvcG92ZXItYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBuei1idXR0b24gW256U2l6ZV09XCInc21hbGwnXCIgKGNsaWNrKT1cIm9uQ2FuY2VsKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm56Q2FuY2VsVGV4dFwiPnt7IG56Q2FuY2VsVGV4dCB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIW56Q2FuY2VsVGV4dFwiPnt7ICdNb2RhbC5jYW5jZWxUZXh0JyB8IG56STE4biB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIG56LWJ1dHRvbiBbbnpTaXplXT1cIidzbWFsbCdcIiBbbnpUeXBlXT1cIm56T2tUeXBlXCIgKGNsaWNrKT1cIm9uQ29uZmlybSgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJuek9rVGV4dFwiPnt7IG56T2tUZXh0IH19PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbnpPa1RleHRcIj57eyAnTW9kYWwub2tUZXh0JyB8IG56STE4biB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOelBvcGNvbmZpcm1Db21wb25lbnQgZXh0ZW5kcyBOelRvb2xUaXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBuekNhbmNlbFRleHQ/OiBzdHJpbmc7XG4gIG56Q29uZGl0aW9uID0gZmFsc2U7XG4gIG56SWNvbj86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBuek9rVGV4dD86IHN0cmluZztcbiAgbnpPa1R5cGU6IE56QnV0dG9uVHlwZSA9ICdwcmltYXJ5JztcblxuICByZWFkb25seSBuek9uQ2FuY2VsID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcmVhZG9ubHkgbnpPbkNvbmZpcm0gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIHByb3RlY3RlZCBfdHJpZ2dlcjogTnpUb29sdGlwVHJpZ2dlciA9ICdjbGljayc7XG5cbiAgX3ByZWZpeCA9ICdhbnQtcG9wb3Zlci1wbGFjZW1lbnQnO1xuICBfaGFzQmFja2Ryb3AgPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIEBIb3N0KCkgQE9wdGlvbmFsKCkgcHVibGljIG5vQW5pbWF0aW9uPzogTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZSkge1xuICAgIHN1cGVyKGNkciwgbm9BbmltYXRpb24pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcblxuICAgIHRoaXMubnpPbkNhbmNlbC5jb21wbGV0ZSgpO1xuICAgIHRoaXMubnpPbkNvbmZpcm0uY29tcGxldGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIHNob3coKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm56Q29uZGl0aW9uKSB7XG4gICAgICBzdXBlci5zaG93KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25Db25maXJtKCk7XG4gICAgfVxuICB9XG5cbiAgb25DYW5jZWwoKTogdm9pZCB7XG4gICAgdGhpcy5uek9uQ2FuY2VsLm5leHQoKTtcbiAgICBzdXBlci5oaWRlKCk7XG4gIH1cblxuICBvbkNvbmZpcm0oKTogdm9pZCB7XG4gICAgdGhpcy5uek9uQ29uZmlybS5uZXh0KCk7XG4gICAgc3VwZXIuaGlkZSgpO1xuICB9XG59XG4iXX0=