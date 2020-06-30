/**
 * @fileoverview added by tsickle
 * Generated from: drawer.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __decorate, __extends, __metadata } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ConfigurableFocusTrapFactory } from '@angular/cdk/a11y';
import { ESCAPE } from '@angular/cdk/keycodes';
import { Overlay, OverlayConfig, OverlayKeyboardDispatcher } from '@angular/cdk/overlay';
import { CdkPortalOutlet, ComponentPortal, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Injector, Input, Optional, Output, Renderer2, TemplateRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean, toCssPixel } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzDrawerRef } from './drawer-ref';
/** @type {?} */
export var DRAWER_ANIMATE_DURATION = 300;
/** @type {?} */
var NZ_CONFIG_COMPONENT_NAME = 'drawer';
/**
 * @template T, R, D
 */
var NzDrawerComponent = /** @class */ (function (_super) {
    __extends(NzDrawerComponent, _super);
    function NzDrawerComponent(document, nzConfigService, renderer, overlay, injector, changeDetectorRef, focusTrapFactory, viewContainerRef, overlayKeyboardDispatcher) {
        var _this = _super.call(this) || this;
        _this.document = document;
        _this.nzConfigService = nzConfigService;
        _this.renderer = renderer;
        _this.overlay = overlay;
        _this.injector = injector;
        _this.changeDetectorRef = changeDetectorRef;
        _this.focusTrapFactory = focusTrapFactory;
        _this.viewContainerRef = viewContainerRef;
        _this.overlayKeyboardDispatcher = overlayKeyboardDispatcher;
        _this.nzClosable = true;
        _this.nzMaskClosable = true;
        _this.nzMask = true;
        _this.nzCloseOnNavigation = true;
        _this.nzNoAnimation = false;
        _this.nzKeyboard = true;
        _this.nzPlacement = 'right';
        _this.nzMaskStyle = {};
        _this.nzBodyStyle = {};
        _this.nzWidth = 256;
        _this.nzHeight = 256;
        _this.nzZIndex = 1000;
        _this.nzOffsetX = 0;
        _this.nzOffsetY = 0;
        _this.nzOnViewInit = new EventEmitter();
        _this.nzOnClose = new EventEmitter();
        _this.destroy$ = new Subject();
        _this.placementChanging = false;
        _this.placementChangeTimeoutId = -1;
        _this.isOpen = false;
        _this.templateContext = {
            $implicit: undefined,
            drawerRef: (/** @type {?} */ (_this))
        };
        _this.nzAfterOpen = new Subject();
        _this.nzAfterClose = new Subject();
        return _this;
    }
    Object.defineProperty(NzDrawerComponent.prototype, "nzVisible", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isOpen;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.isOpen = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzDrawerComponent.prototype, "offsetTransform", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this.isOpen || this.nzOffsetX + this.nzOffsetY === 0) {
                return null;
            }
            switch (this.nzPlacement) {
                case 'left':
                    return "translateX(" + this.nzOffsetX + "px)";
                case 'right':
                    return "translateX(-" + this.nzOffsetX + "px)";
                case 'top':
                    return "translateY(" + this.nzOffsetY + "px)";
                case 'bottom':
                    return "translateY(-" + this.nzOffsetY + "px)";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzDrawerComponent.prototype, "transform", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.isOpen) {
                return null;
            }
            switch (this.nzPlacement) {
                case 'left':
                    return "translateX(-100%)";
                case 'right':
                    return "translateX(100%)";
                case 'top':
                    return "translateY(-100%)";
                case 'bottom':
                    return "translateY(100%)";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzDrawerComponent.prototype, "width", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isLeftOrRight ? toCssPixel(this.nzWidth) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzDrawerComponent.prototype, "height", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.isLeftOrRight ? toCssPixel(this.nzHeight) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzDrawerComponent.prototype, "isLeftOrRight", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nzPlacement === 'left' || this.nzPlacement === 'right';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzDrawerComponent.prototype, "afterOpen", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nzAfterOpen.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzDrawerComponent.prototype, "afterClose", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nzAfterClose.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    NzDrawerComponent.prototype.isTemplateRef = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value instanceof TemplateRef;
    };
    /**
     * @return {?}
     */
    NzDrawerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.attachOverlay();
        this.updateOverlayStyle();
        this.updateBodyOverflow();
        this.templateContext = { $implicit: this.nzContentParams, drawerRef: (/** @type {?} */ (this)) };
        this.changeDetectorRef.detectChanges();
    };
    /**
     * @return {?}
     */
    NzDrawerComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.attachBodyContent();
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.nzOnViewInit.emit();
        }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzDrawerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var nzPlacement = changes.nzPlacement, nzVisible = changes.nzVisible;
        if (nzVisible) {
            /** @type {?} */
            var value = changes.nzVisible.currentValue;
            if (value) {
                this.open();
            }
            else {
                this.close();
            }
        }
        if (nzPlacement && !nzPlacement.isFirstChange()) {
            this.triggerPlacementChangeCycleOnce();
        }
    };
    /**
     * @return {?}
     */
    NzDrawerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
        clearTimeout(this.placementChangeTimeoutId);
        this.disposeOverlay();
    };
    /**
     * @private
     * @return {?}
     */
    NzDrawerComponent.prototype.getAnimationDuration = /**
     * @private
     * @return {?}
     */
    function () {
        return this.nzNoAnimation ? 0 : DRAWER_ANIMATE_DURATION;
    };
    // Disable the transition animation temporarily when the placement changing
    // Disable the transition animation temporarily when the placement changing
    /**
     * @private
     * @return {?}
     */
    NzDrawerComponent.prototype.triggerPlacementChangeCycleOnce = 
    // Disable the transition animation temporarily when the placement changing
    /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.nzNoAnimation) {
            this.placementChanging = true;
            this.changeDetectorRef.markForCheck();
            clearTimeout(this.placementChangeTimeoutId);
            this.placementChangeTimeoutId = setTimeout((/**
             * @return {?}
             */
            function () {
                _this.placementChanging = false;
                _this.changeDetectorRef.markForCheck();
            }), this.getAnimationDuration());
        }
    };
    /**
     * @param {?=} result
     * @return {?}
     */
    NzDrawerComponent.prototype.close = /**
     * @param {?=} result
     * @return {?}
     */
    function (result) {
        var _this = this;
        this.isOpen = false;
        this.updateOverlayStyle();
        this.overlayKeyboardDispatcher.remove((/** @type {?} */ (this.overlayRef)));
        this.changeDetectorRef.detectChanges();
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.updateBodyOverflow();
            _this.restoreFocus();
            _this.nzAfterClose.next(result);
            _this.nzAfterClose.complete();
        }), this.getAnimationDuration());
    };
    /**
     * @return {?}
     */
    NzDrawerComponent.prototype.open = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.attachOverlay();
        this.isOpen = true;
        this.overlayKeyboardDispatcher.add((/** @type {?} */ (this.overlayRef)));
        this.updateOverlayStyle();
        this.updateBodyOverflow();
        this.savePreviouslyFocusedElement();
        this.trapFocus();
        this.changeDetectorRef.detectChanges();
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.nzAfterOpen.next();
        }), this.getAnimationDuration());
    };
    /**
     * @return {?}
     */
    NzDrawerComponent.prototype.closeClick = /**
     * @return {?}
     */
    function () {
        this.nzOnClose.emit();
    };
    /**
     * @return {?}
     */
    NzDrawerComponent.prototype.maskClick = /**
     * @return {?}
     */
    function () {
        if (this.nzMaskClosable && this.nzMask) {
            this.nzOnClose.emit();
        }
    };
    /**
     * @private
     * @return {?}
     */
    NzDrawerComponent.prototype.attachBodyContent = /**
     * @private
     * @return {?}
     */
    function () {
        (/** @type {?} */ (this.bodyPortalOutlet)).dispose();
        if (this.nzContent instanceof Type) {
            /** @type {?} */
            var childInjector = new PortalInjector(this.injector, new WeakMap([[NzDrawerRef, this]]));
            /** @type {?} */
            var componentPortal = new ComponentPortal(this.nzContent, null, childInjector);
            /** @type {?} */
            var componentRef = (/** @type {?} */ (this.bodyPortalOutlet)).attachComponentPortal(componentPortal);
            Object.assign(componentRef.instance, this.nzContentParams);
            componentRef.changeDetectorRef.detectChanges();
        }
    };
    /**
     * @private
     * @return {?}
     */
    NzDrawerComponent.prototype.attachOverlay = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.overlayRef) {
            this.portal = new TemplatePortal(this.drawerTemplate, this.viewContainerRef);
            this.overlayRef = this.overlay.create(this.getOverlayConfig());
        }
        if (this.overlayRef && !this.overlayRef.hasAttached()) {
            this.overlayRef.attach(this.portal);
            (/** @type {?} */ (this.overlayRef)).keydownEvents()
                .pipe(takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (event.keyCode === ESCAPE && _this.isOpen && _this.nzKeyboard) {
                    _this.nzOnClose.emit();
                }
            }));
            this.overlayRef
                .detachments()
                .pipe(takeUntil(this.destroy$))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.disposeOverlay();
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    NzDrawerComponent.prototype.disposeOverlay = /**
     * @private
     * @return {?}
     */
    function () {
        var _a;
        (_a = this.overlayRef) === null || _a === void 0 ? void 0 : _a.dispose();
        this.overlayRef = null;
    };
    /**
     * @private
     * @return {?}
     */
    NzDrawerComponent.prototype.getOverlayConfig = /**
     * @private
     * @return {?}
     */
    function () {
        return new OverlayConfig({
            disposeOnNavigation: this.nzCloseOnNavigation,
            positionStrategy: this.overlay.position().global(),
            scrollStrategy: this.overlay.scrollStrategies.block()
        });
    };
    /**
     * @private
     * @return {?}
     */
    NzDrawerComponent.prototype.updateOverlayStyle = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.overlayRef && this.overlayRef.overlayElement) {
            this.renderer.setStyle(this.overlayRef.overlayElement, 'pointer-events', this.isOpen ? 'auto' : 'none');
        }
    };
    /**
     * @private
     * @return {?}
     */
    NzDrawerComponent.prototype.updateBodyOverflow = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.overlayRef) {
            if (this.isOpen) {
                (/** @type {?} */ (this.overlayRef.getConfig().scrollStrategy)).enable();
            }
            else {
                (/** @type {?} */ (this.overlayRef.getConfig().scrollStrategy)).disable();
            }
        }
    };
    /**
     * @return {?}
     */
    NzDrawerComponent.prototype.savePreviouslyFocusedElement = /**
     * @return {?}
     */
    function () {
        if (this.document && !this.previouslyFocusedElement) {
            this.previouslyFocusedElement = (/** @type {?} */ (this.document.activeElement));
            // We need the extra check, because IE's svg element has no blur method.
            if (this.previouslyFocusedElement && typeof this.previouslyFocusedElement.blur === 'function') {
                this.previouslyFocusedElement.blur();
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    NzDrawerComponent.prototype.trapFocus = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.focusTrap && this.overlayRef && this.overlayRef.overlayElement) {
            this.focusTrap = this.focusTrapFactory.create((/** @type {?} */ (this.overlayRef)).overlayElement);
            this.focusTrap.focusInitialElement();
        }
    };
    /**
     * @private
     * @return {?}
     */
    NzDrawerComponent.prototype.restoreFocus = /**
     * @private
     * @return {?}
     */
    function () {
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (this.previouslyFocusedElement && typeof this.previouslyFocusedElement.focus === 'function') {
            this.previouslyFocusedElement.focus();
        }
        if (this.focusTrap) {
            this.focusTrap.destroy();
        }
    };
    NzDrawerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-drawer',
                    exportAs: 'nzDrawer',
                    template: "\n    <ng-template #drawerTemplate>\n      <div\n        class=\"ant-drawer\"\n        [nzNoAnimation]=\"nzNoAnimation\"\n        [class.ant-drawer-open]=\"isOpen\"\n        [class.no-mask]=\"!nzMask\"\n        [class.ant-drawer-top]=\"nzPlacement === 'top'\"\n        [class.ant-drawer-bottom]=\"nzPlacement === 'bottom'\"\n        [class.ant-drawer-right]=\"nzPlacement === 'right'\"\n        [class.ant-drawer-left]=\"nzPlacement === 'left'\"\n        [style.transform]=\"offsetTransform\"\n        [style.transition]=\"placementChanging ? 'none' : null\"\n        [style.zIndex]=\"nzZIndex\"\n      >\n        <div class=\"ant-drawer-mask\" (click)=\"maskClick()\" *ngIf=\"nzMask\" [ngStyle]=\"nzMaskStyle\"></div>\n        <div\n          class=\"ant-drawer-content-wrapper {{ nzWrapClassName }}\"\n          [style.width]=\"width\"\n          [style.height]=\"height\"\n          [style.transform]=\"transform\"\n          [style.transition]=\"placementChanging ? 'none' : null\"\n        >\n          <div class=\"ant-drawer-content\">\n            <div class=\"ant-drawer-wrapper-body\" [style.height]=\"isLeftOrRight ? '100%' : null\">\n              <div *ngIf=\"nzTitle || nzClosable\" [class.ant-drawer-header]=\"!!nzTitle\" [class.ant-drawer-header-no-title]=\"!nzTitle\">\n                <div *ngIf=\"nzTitle\" class=\"ant-drawer-title\">\n                  <ng-container *nzStringTemplateOutlet=\"nzTitle\"><div [innerHTML]=\"nzTitle\"></div></ng-container>\n                </div>\n                <button *ngIf=\"nzClosable\" (click)=\"closeClick()\" aria-label=\"Close\" class=\"ant-drawer-close\" style=\"--scroll-bar: 0px;\">\n                  <i nz-icon nzType=\"close\"></i>\n                </button>\n              </div>\n              <div class=\"ant-drawer-body\" [ngStyle]=\"nzBodyStyle\">\n                <ng-template cdkPortalOutlet></ng-template>\n                <ng-container *ngIf=\"isTemplateRef(nzContent)\">\n                  <ng-container *ngTemplateOutlet=\"$any(nzContent); context: templateContext\"></ng-container>\n                </ng-container>\n                <ng-content *ngIf=\"!nzContent\"></ng-content>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </ng-template>\n  ",
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    NzDrawerComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] },
        { type: NzConfigService },
        { type: Renderer2 },
        { type: Overlay },
        { type: Injector },
        { type: ChangeDetectorRef },
        { type: ConfigurableFocusTrapFactory },
        { type: ViewContainerRef },
        { type: OverlayKeyboardDispatcher }
    ]; };
    NzDrawerComponent.propDecorators = {
        nzContent: [{ type: Input }],
        nzClosable: [{ type: Input }],
        nzMaskClosable: [{ type: Input }],
        nzMask: [{ type: Input }],
        nzCloseOnNavigation: [{ type: Input }],
        nzNoAnimation: [{ type: Input }],
        nzKeyboard: [{ type: Input }],
        nzTitle: [{ type: Input }],
        nzPlacement: [{ type: Input }],
        nzMaskStyle: [{ type: Input }],
        nzBodyStyle: [{ type: Input }],
        nzWrapClassName: [{ type: Input }],
        nzWidth: [{ type: Input }],
        nzHeight: [{ type: Input }],
        nzZIndex: [{ type: Input }],
        nzOffsetX: [{ type: Input }],
        nzOffsetY: [{ type: Input }],
        nzVisible: [{ type: Input }],
        nzOnViewInit: [{ type: Output }],
        nzOnClose: [{ type: Output }],
        drawerTemplate: [{ type: ViewChild, args: ['drawerTemplate', { static: true },] }],
        bodyPortalOutlet: [{ type: ViewChild, args: [CdkPortalOutlet, { static: false },] }]
    };
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzDrawerComponent.prototype, "nzClosable", void 0);
    __decorate([
        WithConfig(NZ_CONFIG_COMPONENT_NAME), InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzDrawerComponent.prototype, "nzMaskClosable", void 0);
    __decorate([
        WithConfig(NZ_CONFIG_COMPONENT_NAME), InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzDrawerComponent.prototype, "nzMask", void 0);
    __decorate([
        WithConfig(NZ_CONFIG_COMPONENT_NAME), InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzDrawerComponent.prototype, "nzCloseOnNavigation", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzDrawerComponent.prototype, "nzNoAnimation", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzDrawerComponent.prototype, "nzKeyboard", void 0);
    return NzDrawerComponent;
}(NzDrawerRef));
export { NzDrawerComponent };
if (false) {
    /** @type {?} */
    NzDrawerComponent.ngAcceptInputType_nzClosable;
    /** @type {?} */
    NzDrawerComponent.ngAcceptInputType_nzMaskClosable;
    /** @type {?} */
    NzDrawerComponent.ngAcceptInputType_nzMask;
    /** @type {?} */
    NzDrawerComponent.ngAcceptInputType_nzNoAnimation;
    /** @type {?} */
    NzDrawerComponent.ngAcceptInputType_nzKeyboard;
    /** @type {?} */
    NzDrawerComponent.ngAcceptInputType_nzCloseOnNavigation;
    /** @type {?} */
    NzDrawerComponent.prototype.nzContent;
    /** @type {?} */
    NzDrawerComponent.prototype.nzClosable;
    /** @type {?} */
    NzDrawerComponent.prototype.nzMaskClosable;
    /** @type {?} */
    NzDrawerComponent.prototype.nzMask;
    /** @type {?} */
    NzDrawerComponent.prototype.nzCloseOnNavigation;
    /** @type {?} */
    NzDrawerComponent.prototype.nzNoAnimation;
    /** @type {?} */
    NzDrawerComponent.prototype.nzKeyboard;
    /** @type {?} */
    NzDrawerComponent.prototype.nzTitle;
    /** @type {?} */
    NzDrawerComponent.prototype.nzPlacement;
    /** @type {?} */
    NzDrawerComponent.prototype.nzMaskStyle;
    /** @type {?} */
    NzDrawerComponent.prototype.nzBodyStyle;
    /** @type {?} */
    NzDrawerComponent.prototype.nzWrapClassName;
    /** @type {?} */
    NzDrawerComponent.prototype.nzWidth;
    /** @type {?} */
    NzDrawerComponent.prototype.nzHeight;
    /** @type {?} */
    NzDrawerComponent.prototype.nzZIndex;
    /** @type {?} */
    NzDrawerComponent.prototype.nzOffsetX;
    /** @type {?} */
    NzDrawerComponent.prototype.nzOffsetY;
    /** @type {?} */
    NzDrawerComponent.prototype.nzOnViewInit;
    /** @type {?} */
    NzDrawerComponent.prototype.nzOnClose;
    /** @type {?} */
    NzDrawerComponent.prototype.drawerTemplate;
    /** @type {?} */
    NzDrawerComponent.prototype.bodyPortalOutlet;
    /** @type {?} */
    NzDrawerComponent.prototype.destroy$;
    /** @type {?} */
    NzDrawerComponent.prototype.previouslyFocusedElement;
    /** @type {?} */
    NzDrawerComponent.prototype.placementChanging;
    /** @type {?} */
    NzDrawerComponent.prototype.placementChangeTimeoutId;
    /** @type {?} */
    NzDrawerComponent.prototype.nzContentParams;
    /** @type {?} */
    NzDrawerComponent.prototype.overlayRef;
    /** @type {?} */
    NzDrawerComponent.prototype.portal;
    /** @type {?} */
    NzDrawerComponent.prototype.focusTrap;
    /** @type {?} */
    NzDrawerComponent.prototype.isOpen;
    /** @type {?} */
    NzDrawerComponent.prototype.templateContext;
    /** @type {?} */
    NzDrawerComponent.prototype.nzAfterOpen;
    /** @type {?} */
    NzDrawerComponent.prototype.nzAfterClose;
    /**
     * @type {?}
     * @private
     */
    NzDrawerComponent.prototype.document;
    /** @type {?} */
    NzDrawerComponent.prototype.nzConfigService;
    /**
     * @type {?}
     * @private
     */
    NzDrawerComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    NzDrawerComponent.prototype.overlay;
    /**
     * @type {?}
     * @private
     */
    NzDrawerComponent.prototype.injector;
    /**
     * @type {?}
     * @private
     */
    NzDrawerComponent.prototype.changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    NzDrawerComponent.prototype.focusTrapFactory;
    /**
     * @type {?}
     * @private
     */
    NzDrawerComponent.prototype.viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    NzDrawerComponent.prototype.overlayKeyboardDispatcher;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvZHJhd2VyLyIsInNvdXJjZXMiOlsiZHJhd2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLDRCQUE0QixFQUFhLE1BQU0sbUJBQW1CLENBQUM7QUFDNUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLHlCQUF5QixFQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDckcsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZHLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUlMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUVULFdBQVcsRUFDWCxJQUFJLEVBQ0osU0FBUyxFQUNULGdCQUFnQixFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXhFLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFbkUsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7QUFFM0MsTUFBTSxLQUFPLHVCQUF1QixHQUFHLEdBQUc7O0lBRXBDLHdCQUF3QixHQUFHLFFBQVE7Ozs7QUFFekM7SUFv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cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ29uZmlndXJhYmxlRm9jdXNUcmFwRmFjdG9yeSwgRm9jdXNUcmFwIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRVNDQVBFIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IE92ZXJsYXksIE92ZXJsYXlDb25maWcsIE92ZXJsYXlLZXlib2FyZERpc3BhdGNoZXIsIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDZGtQb3J0YWxPdXRsZXQsIENvbXBvbmVudFBvcnRhbCwgUG9ydGFsSW5qZWN0b3IsIFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVHlwZSxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpDb25maWdTZXJ2aWNlLCBXaXRoQ29uZmlnIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2NvbmZpZyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE5nU3R5bGVJbnRlcmZhY2UsIE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4sIHRvQ3NzUGl4ZWwgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE56RHJhd2VyT3B0aW9uc09mQ29tcG9uZW50LCBOekRyYXdlclBsYWNlbWVudCB9IGZyb20gJy4vZHJhd2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgTnpEcmF3ZXJSZWYgfSBmcm9tICcuL2RyYXdlci1yZWYnO1xuXG5leHBvcnQgY29uc3QgRFJBV0VSX0FOSU1BVEVfRFVSQVRJT04gPSAzMDA7XG5cbmNvbnN0IE5aX0NPTkZJR19DT01QT05FTlRfTkFNRSA9ICdkcmF3ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1kcmF3ZXInLFxuICBleHBvcnRBczogJ256RHJhd2VyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI2RyYXdlclRlbXBsYXRlPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cImFudC1kcmF3ZXJcIlxuICAgICAgICBbbnpOb0FuaW1hdGlvbl09XCJuek5vQW5pbWF0aW9uXCJcbiAgICAgICAgW2NsYXNzLmFudC1kcmF3ZXItb3Blbl09XCJpc09wZW5cIlxuICAgICAgICBbY2xhc3Mubm8tbWFza109XCIhbnpNYXNrXCJcbiAgICAgICAgW2NsYXNzLmFudC1kcmF3ZXItdG9wXT1cIm56UGxhY2VtZW50ID09PSAndG9wJ1wiXG4gICAgICAgIFtjbGFzcy5hbnQtZHJhd2VyLWJvdHRvbV09XCJuelBsYWNlbWVudCA9PT0gJ2JvdHRvbSdcIlxuICAgICAgICBbY2xhc3MuYW50LWRyYXdlci1yaWdodF09XCJuelBsYWNlbWVudCA9PT0gJ3JpZ2h0J1wiXG4gICAgICAgIFtjbGFzcy5hbnQtZHJhd2VyLWxlZnRdPVwibnpQbGFjZW1lbnQgPT09ICdsZWZ0J1wiXG4gICAgICAgIFtzdHlsZS50cmFuc2Zvcm1dPVwib2Zmc2V0VHJhbnNmb3JtXCJcbiAgICAgICAgW3N0eWxlLnRyYW5zaXRpb25dPVwicGxhY2VtZW50Q2hhbmdpbmcgPyAnbm9uZScgOiBudWxsXCJcbiAgICAgICAgW3N0eWxlLnpJbmRleF09XCJuelpJbmRleFwiXG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtZHJhd2VyLW1hc2tcIiAoY2xpY2spPVwibWFza0NsaWNrKClcIiAqbmdJZj1cIm56TWFza1wiIFtuZ1N0eWxlXT1cIm56TWFza1N0eWxlXCI+PC9kaXY+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cImFudC1kcmF3ZXItY29udGVudC13cmFwcGVyIHt7IG56V3JhcENsYXNzTmFtZSB9fVwiXG4gICAgICAgICAgW3N0eWxlLndpZHRoXT1cIndpZHRoXCJcbiAgICAgICAgICBbc3R5bGUuaGVpZ2h0XT1cImhlaWdodFwiXG4gICAgICAgICAgW3N0eWxlLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIlxuICAgICAgICAgIFtzdHlsZS50cmFuc2l0aW9uXT1cInBsYWNlbWVudENoYW5naW5nID8gJ25vbmUnIDogbnVsbFwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LWRyYXdlci1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LWRyYXdlci13cmFwcGVyLWJvZHlcIiBbc3R5bGUuaGVpZ2h0XT1cImlzTGVmdE9yUmlnaHQgPyAnMTAwJScgOiBudWxsXCI+XG4gICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJuelRpdGxlIHx8IG56Q2xvc2FibGVcIiBbY2xhc3MuYW50LWRyYXdlci1oZWFkZXJdPVwiISFuelRpdGxlXCIgW2NsYXNzLmFudC1kcmF3ZXItaGVhZGVyLW5vLXRpdGxlXT1cIiFuelRpdGxlXCI+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIm56VGl0bGVcIiBjbGFzcz1cImFudC1kcmF3ZXItdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuelRpdGxlXCI+PGRpdiBbaW5uZXJIVE1MXT1cIm56VGl0bGVcIj48L2Rpdj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwibnpDbG9zYWJsZVwiIChjbGljayk9XCJjbG9zZUNsaWNrKClcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIiBjbGFzcz1cImFudC1kcmF3ZXItY2xvc2VcIiBzdHlsZT1cIi0tc2Nyb2xsLWJhcjogMHB4O1wiPlxuICAgICAgICAgICAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJjbG9zZVwiPjwvaT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtZHJhd2VyLWJvZHlcIiBbbmdTdHlsZV09XCJuekJvZHlTdHlsZVwiPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBjZGtQb3J0YWxPdXRsZXQ+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNUZW1wbGF0ZVJlZihuekNvbnRlbnQpXCI+XG4gICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiJGFueShuekNvbnRlbnQpOyBjb250ZXh0OiB0ZW1wbGF0ZUNvbnRleHRcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCAqbmdJZj1cIiFuekNvbnRlbnRcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE56RHJhd2VyQ29tcG9uZW50PFQgPSBOelNhZmVBbnksIFIgPSBOelNhZmVBbnksIEQgPSBOelNhZmVBbnk+IGV4dGVuZHMgTnpEcmF3ZXJSZWY8Uj5cbiAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBOekRyYXdlck9wdGlvbnNPZkNvbXBvbmVudCB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekNsb3NhYmxlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uek1hc2tDbG9zYWJsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpNYXNrOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uek5vQW5pbWF0aW9uOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uektleWJvYXJkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekNsb3NlT25OYXZpZ2F0aW9uOiBCb29sZWFuSW5wdXQ7XG5cbiAgQElucHV0KCkgbnpDb250ZW50ITogVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IEQ7IGRyYXdlclJlZjogTnpEcmF3ZXJSZWY8Uj4gfT4gfCBUeXBlPFQ+O1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpDbG9zYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKE5aX0NPTkZJR19DT01QT05FTlRfTkFNRSkgQElucHV0Qm9vbGVhbigpIG56TWFza0Nsb3NhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoTlpfQ09ORklHX0NPTVBPTkVOVF9OQU1FKSBASW5wdXRCb29sZWFuKCkgbnpNYXNrOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoTlpfQ09ORklHX0NPTVBPTkVOVF9OQU1FKSBASW5wdXRCb29sZWFuKCkgbnpDbG9zZU9uTmF2aWdhdGlvbjogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuek5vQW5pbWF0aW9uID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuektleWJvYXJkOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgbnpUaXRsZT86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHt9PjtcbiAgQElucHV0KCkgbnpQbGFjZW1lbnQ6IE56RHJhd2VyUGxhY2VtZW50ID0gJ3JpZ2h0JztcbiAgQElucHV0KCkgbnpNYXNrU3R5bGU6IE5nU3R5bGVJbnRlcmZhY2UgPSB7fTtcbiAgQElucHV0KCkgbnpCb2R5U3R5bGU6IE5nU3R5bGVJbnRlcmZhY2UgPSB7fTtcbiAgQElucHV0KCkgbnpXcmFwQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBASW5wdXQoKSBueldpZHRoOiBudW1iZXIgfCBzdHJpbmcgPSAyNTY7XG4gIEBJbnB1dCgpIG56SGVpZ2h0OiBudW1iZXIgfCBzdHJpbmcgPSAyNTY7XG4gIEBJbnB1dCgpIG56WkluZGV4ID0gMTAwMDtcbiAgQElucHV0KCkgbnpPZmZzZXRYID0gMDtcbiAgQElucHV0KCkgbnpPZmZzZXRZID0gMDtcblxuICBASW5wdXQoKVxuICBzZXQgbnpWaXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5pc09wZW4gPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBuelZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNPcGVuO1xuICB9XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56T25WaWV3SW5pdCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56T25DbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICBAVmlld0NoaWxkKCdkcmF3ZXJUZW1wbGF0ZScsIHsgc3RhdGljOiB0cnVlIH0pIGRyYXdlclRlbXBsYXRlITogVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBWaWV3Q2hpbGQoQ2RrUG9ydGFsT3V0bGV0LCB7IHN0YXRpYzogZmFsc2UgfSkgYm9keVBvcnRhbE91dGxldD86IENka1BvcnRhbE91dGxldDtcblxuICBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudD86IEhUTUxFbGVtZW50O1xuICBwbGFjZW1lbnRDaGFuZ2luZyA9IGZhbHNlO1xuICBwbGFjZW1lbnRDaGFuZ2VUaW1lb3V0SWQgPSAtMTtcbiAgbnpDb250ZW50UGFyYW1zPzogRDsgLy8gb25seSBzZXJ2aWNlXG4gIG92ZXJsYXlSZWY/OiBPdmVybGF5UmVmIHwgbnVsbDtcbiAgcG9ydGFsPzogVGVtcGxhdGVQb3J0YWw7XG4gIGZvY3VzVHJhcD86IEZvY3VzVHJhcDtcbiAgaXNPcGVuID0gZmFsc2U7XG4gIHRlbXBsYXRlQ29udGV4dDogeyAkaW1wbGljaXQ6IEQgfCB1bmRlZmluZWQ7IGRyYXdlclJlZjogTnpEcmF3ZXJSZWY8Uj4gfSA9IHtcbiAgICAkaW1wbGljaXQ6IHVuZGVmaW5lZCxcbiAgICBkcmF3ZXJSZWY6IHRoaXMgYXMgTnpEcmF3ZXJSZWY8Uj5cbiAgfTtcblxuICBnZXQgb2Zmc2V0VHJhbnNmb3JtKCk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmICghdGhpcy5pc09wZW4gfHwgdGhpcy5uek9mZnNldFggKyB0aGlzLm56T2Zmc2V0WSA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHN3aXRjaCAodGhpcy5uelBsYWNlbWVudCkge1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIHJldHVybiBgdHJhbnNsYXRlWCgke3RoaXMubnpPZmZzZXRYfXB4KWA7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIHJldHVybiBgdHJhbnNsYXRlWCgtJHt0aGlzLm56T2Zmc2V0WH1weClgO1xuICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgcmV0dXJuIGB0cmFuc2xhdGVZKCR7dGhpcy5uek9mZnNldFl9cHgpYDtcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgIHJldHVybiBgdHJhbnNsYXRlWSgtJHt0aGlzLm56T2Zmc2V0WX1weClgO1xuICAgIH1cbiAgfVxuXG4gIGdldCB0cmFuc2Zvcm0oKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRoaXMubnpQbGFjZW1lbnQpIHtcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICByZXR1cm4gYHRyYW5zbGF0ZVgoLTEwMCUpYDtcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgcmV0dXJuIGB0cmFuc2xhdGVYKDEwMCUpYDtcbiAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgIHJldHVybiBgdHJhbnNsYXRlWSgtMTAwJSlgO1xuICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgcmV0dXJuIGB0cmFuc2xhdGVZKDEwMCUpYDtcbiAgICB9XG4gIH1cblxuICBnZXQgd2lkdGgoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuaXNMZWZ0T3JSaWdodCA/IHRvQ3NzUGl4ZWwodGhpcy5ueldpZHRoKSA6IG51bGw7XG4gIH1cblxuICBnZXQgaGVpZ2h0KCk6IHN0cmluZyB8IG51bGwge1xuICAgIHJldHVybiAhdGhpcy5pc0xlZnRPclJpZ2h0ID8gdG9Dc3NQaXhlbCh0aGlzLm56SGVpZ2h0KSA6IG51bGw7XG4gIH1cblxuICBnZXQgaXNMZWZ0T3JSaWdodCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5uelBsYWNlbWVudCA9PT0gJ2xlZnQnIHx8IHRoaXMubnpQbGFjZW1lbnQgPT09ICdyaWdodCc7XG4gIH1cblxuICBuekFmdGVyT3BlbiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIG56QWZ0ZXJDbG9zZSA9IG5ldyBTdWJqZWN0PFI+KCk7XG5cbiAgZ2V0IGFmdGVyT3BlbigpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5uekFmdGVyT3Blbi5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBhZnRlckNsb3NlKCk6IE9ic2VydmFibGU8Uj4ge1xuICAgIHJldHVybiB0aGlzLm56QWZ0ZXJDbG9zZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGlzVGVtcGxhdGVSZWYodmFsdWU6IHt9KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWY7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBOelNhZmVBbnksXG4gICAgcHVibGljIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBmb2N1c1RyYXBGYWN0b3J5OiBDb25maWd1cmFibGVGb2N1c1RyYXBGYWN0b3J5LFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIG92ZXJsYXlLZXlib2FyZERpc3BhdGNoZXI6IE92ZXJsYXlLZXlib2FyZERpc3BhdGNoZXJcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuYXR0YWNoT3ZlcmxheSgpO1xuICAgIHRoaXMudXBkYXRlT3ZlcmxheVN0eWxlKCk7XG4gICAgdGhpcy51cGRhdGVCb2R5T3ZlcmZsb3coKTtcbiAgICB0aGlzLnRlbXBsYXRlQ29udGV4dCA9IHsgJGltcGxpY2l0OiB0aGlzLm56Q29udGVudFBhcmFtcywgZHJhd2VyUmVmOiB0aGlzIGFzIE56RHJhd2VyUmVmPFI+IH07XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5hdHRhY2hCb2R5Q29udGVudCgpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5uek9uVmlld0luaXQuZW1pdCgpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbnpQbGFjZW1lbnQsIG56VmlzaWJsZSB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpWaXNpYmxlKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGNoYW5nZXMubnpWaXNpYmxlLmN1cnJlbnRWYWx1ZTtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG56UGxhY2VtZW50ICYmICFuelBsYWNlbWVudC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMudHJpZ2dlclBsYWNlbWVudENoYW5nZUN5Y2xlT25jZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5wbGFjZW1lbnRDaGFuZ2VUaW1lb3V0SWQpO1xuICAgIHRoaXMuZGlzcG9zZU92ZXJsYXkoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QW5pbWF0aW9uRHVyYXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5uek5vQW5pbWF0aW9uID8gMCA6IERSQVdFUl9BTklNQVRFX0RVUkFUSU9OO1xuICB9XG5cbiAgLy8gRGlzYWJsZSB0aGUgdHJhbnNpdGlvbiBhbmltYXRpb24gdGVtcG9yYXJpbHkgd2hlbiB0aGUgcGxhY2VtZW50IGNoYW5naW5nXG4gIHByaXZhdGUgdHJpZ2dlclBsYWNlbWVudENoYW5nZUN5Y2xlT25jZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubnpOb0FuaW1hdGlvbikge1xuICAgICAgdGhpcy5wbGFjZW1lbnRDaGFuZ2luZyA9IHRydWU7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucGxhY2VtZW50Q2hhbmdlVGltZW91dElkKTtcbiAgICAgIHRoaXMucGxhY2VtZW50Q2hhbmdlVGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMucGxhY2VtZW50Q2hhbmdpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0sIHRoaXMuZ2V0QW5pbWF0aW9uRHVyYXRpb24oKSk7XG4gICAgfVxuICB9XG5cbiAgY2xvc2UocmVzdWx0PzogUik6IHZvaWQge1xuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgdGhpcy51cGRhdGVPdmVybGF5U3R5bGUoKTtcbiAgICB0aGlzLm92ZXJsYXlLZXlib2FyZERpc3BhdGNoZXIucmVtb3ZlKHRoaXMub3ZlcmxheVJlZiEpO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVCb2R5T3ZlcmZsb3coKTtcbiAgICAgIHRoaXMucmVzdG9yZUZvY3VzKCk7XG4gICAgICB0aGlzLm56QWZ0ZXJDbG9zZS5uZXh0KHJlc3VsdCk7XG4gICAgICB0aGlzLm56QWZ0ZXJDbG9zZS5jb21wbGV0ZSgpO1xuICAgIH0sIHRoaXMuZ2V0QW5pbWF0aW9uRHVyYXRpb24oKSk7XG4gIH1cblxuICBvcGVuKCk6IHZvaWQge1xuICAgIHRoaXMuYXR0YWNoT3ZlcmxheSgpO1xuICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICB0aGlzLm92ZXJsYXlLZXlib2FyZERpc3BhdGNoZXIuYWRkKHRoaXMub3ZlcmxheVJlZiEpO1xuICAgIHRoaXMudXBkYXRlT3ZlcmxheVN0eWxlKCk7XG4gICAgdGhpcy51cGRhdGVCb2R5T3ZlcmZsb3coKTtcbiAgICB0aGlzLnNhdmVQcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQoKTtcbiAgICB0aGlzLnRyYXBGb2N1cygpO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5uekFmdGVyT3Blbi5uZXh0KCk7XG4gICAgfSwgdGhpcy5nZXRBbmltYXRpb25EdXJhdGlvbigpKTtcbiAgfVxuXG4gIGNsb3NlQ2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy5uek9uQ2xvc2UuZW1pdCgpO1xuICB9XG5cbiAgbWFza0NsaWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56TWFza0Nsb3NhYmxlICYmIHRoaXMubnpNYXNrKSB7XG4gICAgICB0aGlzLm56T25DbG9zZS5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhdHRhY2hCb2R5Q29udGVudCgpOiB2b2lkIHtcbiAgICB0aGlzLmJvZHlQb3J0YWxPdXRsZXQhLmRpc3Bvc2UoKTtcblxuICAgIGlmICh0aGlzLm56Q29udGVudCBpbnN0YW5jZW9mIFR5cGUpIHtcbiAgICAgIGNvbnN0IGNoaWxkSW5qZWN0b3IgPSBuZXcgUG9ydGFsSW5qZWN0b3IodGhpcy5pbmplY3RvciwgbmV3IFdlYWtNYXAoW1tOekRyYXdlclJlZiwgdGhpc11dKSk7XG4gICAgICBjb25zdCBjb21wb25lbnRQb3J0YWwgPSBuZXcgQ29tcG9uZW50UG9ydGFsPFQ+KHRoaXMubnpDb250ZW50LCBudWxsLCBjaGlsZEluamVjdG9yKTtcbiAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuYm9keVBvcnRhbE91dGxldCEuYXR0YWNoQ29tcG9uZW50UG9ydGFsKGNvbXBvbmVudFBvcnRhbCk7XG4gICAgICBPYmplY3QuYXNzaWduKGNvbXBvbmVudFJlZi5pbnN0YW5jZSwgdGhpcy5uekNvbnRlbnRQYXJhbXMpO1xuICAgICAgY29tcG9uZW50UmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaE92ZXJsYXkoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgIHRoaXMucG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMuZHJhd2VyVGVtcGxhdGUsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICB0aGlzLm92ZXJsYXlSZWYgPSB0aGlzLm92ZXJsYXkuY3JlYXRlKHRoaXMuZ2V0T3ZlcmxheUNvbmZpZygpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vdmVybGF5UmVmICYmICF0aGlzLm92ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgdGhpcy5vdmVybGF5UmVmLmF0dGFjaCh0aGlzLnBvcnRhbCk7XG4gICAgICB0aGlzLm92ZXJsYXlSZWYhLmtleWRvd25FdmVudHMoKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSAmJiB0aGlzLmlzT3BlbiAmJiB0aGlzLm56S2V5Ym9hcmQpIHtcbiAgICAgICAgICAgIHRoaXMubnpPbkNsb3NlLmVtaXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5vdmVybGF5UmVmXG4gICAgICAgIC5kZXRhY2htZW50cygpXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kaXNwb3NlT3ZlcmxheSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRpc3Bvc2VPdmVybGF5KCk6IHZvaWQge1xuICAgIHRoaXMub3ZlcmxheVJlZj8uZGlzcG9zZSgpO1xuICAgIHRoaXMub3ZlcmxheVJlZiA9IG51bGw7XG4gIH1cblxuICBwcml2YXRlIGdldE92ZXJsYXlDb25maWcoKTogT3ZlcmxheUNvbmZpZyB7XG4gICAgcmV0dXJuIG5ldyBPdmVybGF5Q29uZmlnKHtcbiAgICAgIGRpc3Bvc2VPbk5hdmlnYXRpb246IHRoaXMubnpDbG9zZU9uTmF2aWdhdGlvbixcbiAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMub3ZlcmxheS5wb3NpdGlvbigpLmdsb2JhbCgpLFxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMub3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLmJsb2NrKClcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlT3ZlcmxheVN0eWxlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm92ZXJsYXlSZWYgJiYgdGhpcy5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50KSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudCwgJ3BvaW50ZXItZXZlbnRzJywgdGhpcy5pc09wZW4gPyAnYXV0bycgOiAnbm9uZScpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQm9keU92ZXJmbG93KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZ2V0Q29uZmlnKCkuc2Nyb2xsU3RyYXRlZ3khLmVuYWJsZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmdldENvbmZpZygpLnNjcm9sbFN0cmF0ZWd5IS5kaXNhYmxlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2F2ZVByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kb2N1bWVudCAmJiAhdGhpcy5wcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQpIHtcbiAgICAgIHRoaXMucHJldmlvdXNseUZvY3VzZWRFbGVtZW50ID0gdGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuICAgICAgLy8gV2UgbmVlZCB0aGUgZXh0cmEgY2hlY2ssIGJlY2F1c2UgSUUncyBzdmcgZWxlbWVudCBoYXMgbm8gYmx1ciBtZXRob2QuXG4gICAgICBpZiAodGhpcy5wcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQgJiYgdHlwZW9mIHRoaXMucHJldmlvdXNseUZvY3VzZWRFbGVtZW50LmJsdXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5wcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQuYmx1cigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHJhcEZvY3VzKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5mb2N1c1RyYXAgJiYgdGhpcy5vdmVybGF5UmVmICYmIHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudCkge1xuICAgICAgdGhpcy5mb2N1c1RyYXAgPSB0aGlzLmZvY3VzVHJhcEZhY3RvcnkuY3JlYXRlKHRoaXMub3ZlcmxheVJlZiEub3ZlcmxheUVsZW1lbnQpO1xuICAgICAgdGhpcy5mb2N1c1RyYXAuZm9jdXNJbml0aWFsRWxlbWVudCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzdG9yZUZvY3VzKCk6IHZvaWQge1xuICAgIC8vIFdlIG5lZWQgdGhlIGV4dHJhIGNoZWNrLCBiZWNhdXNlIElFIGNhbiBzZXQgdGhlIGBhY3RpdmVFbGVtZW50YCB0byBudWxsIGluIHNvbWUgY2FzZXMuXG4gICAgaWYgKHRoaXMucHJldmlvdXNseUZvY3VzZWRFbGVtZW50ICYmIHR5cGVvZiB0aGlzLnByZXZpb3VzbHlGb2N1c2VkRWxlbWVudC5mb2N1cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5wcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZm9jdXNUcmFwKSB7XG4gICAgICB0aGlzLmZvY3VzVHJhcC5kZXN0cm95KCk7XG4gICAgfVxuICB9XG59XG4iXX0=