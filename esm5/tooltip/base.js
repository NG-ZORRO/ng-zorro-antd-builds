/**
 * @fileoverview added by tsickle
 * Generated from: base.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __spread } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { warnDeprecation } from 'ng-zorro-antd/core/logger';
import { DEFAULT_TOOLTIP_POSITIONS, getPlacementName, POSITION_MAP } from 'ng-zorro-antd/core/overlay';
import { isNotNil, toBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
/**
 * @abstract
 */
var NzTooltipBaseDirective = /** @class */ (function () {
    function NzTooltipBaseDirective(elementRef, hostView, resolver, renderer, noAnimation) {
        this.elementRef = elementRef;
        this.hostView = hostView;
        this.resolver = resolver;
        this.renderer = renderer;
        this.noAnimation = noAnimation;
        /**
         * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
         * Please use a more specific API. Like `nzTooltipTrigger`.
         */
        this.nzTrigger = 'hover';
        /**
         * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
         * Please use a more specific API. Like `nzTooltipPlacement`.
         */
        this.nzPlacement = 'top';
        this.nzMouseEnterDelay = 0.15;
        this.nzMouseLeaveDelay = 0.1;
        this.needProxyProperties = [
            'nzOverlayClassName',
            'nzOverlayStyle',
            'nzMouseEnterDelay',
            'nzMouseLeaveDelay',
            'nzVisible',
            'noAnimation'
        ];
        this.nzVisibleChange = new EventEmitter();
        this.visible = false;
        this.destroy$ = new Subject();
        this.triggerDisposables = [];
    }
    Object.defineProperty(NzTooltipBaseDirective.prototype, "title", {
        /**
         * This true title that would be used in other parts on this component.
         */
        get: /**
         * This true title that would be used in other parts on this component.
         * @protected
         * @return {?}
         */
        function () {
            return this.specificTitle || this.directiveNameTitle || this.nzTitle || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzTooltipBaseDirective.prototype, "content", {
        get: /**
         * @protected
         * @return {?}
         */
        function () {
            return this.specificContent || this.directiveNameContent || this.nzContent || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzTooltipBaseDirective.prototype, "placement", {
        get: /**
         * @protected
         * @return {?}
         */
        function () {
            return this.specificPlacement || this.nzPlacement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzTooltipBaseDirective.prototype, "trigger", {
        get: /**
         * @protected
         * @return {?}
         */
        function () {
            // NzTooltipTrigger can be null.
            return typeof this.specificTrigger !== 'undefined' ? this.specificTrigger : this.nzTrigger;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    NzTooltipBaseDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var nzTrigger = changes.nzTrigger, specificTrigger = changes.specificTrigger;
        /** @type {?} */
        var trigger = specificTrigger || nzTrigger;
        if (trigger && !trigger.isFirstChange()) {
            this.registerTriggers();
        }
        if (this.component) {
            this.updateChangedProperties(changes);
        }
        // warn deprecated things when specific property is not given
        if (changes.nzTitle && !this.specificTitle && !this.directiveNameTitle) {
            warnDeprecation("'nzTitle' of 'nz-tooltip' is deprecated and will be removed in 10.0.0.\nPlease use 'nzTooltipTitle' instead. The same with 'nz-popover' and 'nz-popconfirm'.");
        }
        if (changes.nzContent && !this.specificContent) {
            warnDeprecation("'nzContent' of 'nz-popover' is deprecated and will be removed in 10.0.0.\nPlease use 'nzPopoverContent' instead.");
        }
        if (changes.nzPlacement && !this.specificPlacement) {
            warnDeprecation("'nzPlacement' of 'nz-tooltip' is deprecated and will be removed in 10.0.0.\nPlease use 'nzTooltipContent' instead. The same with 'nz-popover' and 'nz-popconfirm'.");
        }
        if (changes.nzTrigger && !this.specificTrigger) {
            warnDeprecation("'nzTrigger' of 'nz-tooltip' is deprecated and will be removed in 10.0.0.\nPlease use 'nzTooltipTrigger' instead. The same with 'nz-popover' and 'nz-popconfirm'.");
        }
    };
    /**
     * @return {?}
     */
    NzTooltipBaseDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.createComponent();
        this.registerTriggers();
    };
    /**
     * @return {?}
     */
    NzTooltipBaseDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
        // Clear toggling timer. Issue #3875 #4317 #4386
        this.clearTogglingTimer();
        this.removeTriggerListeners();
    };
    /**
     * @return {?}
     */
    NzTooltipBaseDirective.prototype.show = /**
     * @return {?}
     */
    function () {
        var _a;
        (_a = this.component) === null || _a === void 0 ? void 0 : _a.show();
    };
    /**
     * @return {?}
     */
    NzTooltipBaseDirective.prototype.hide = /**
     * @return {?}
     */
    function () {
        var _a;
        (_a = this.component) === null || _a === void 0 ? void 0 : _a.hide();
    };
    /**
     * Force the component to update its position.
     */
    /**
     * Force the component to update its position.
     * @return {?}
     */
    NzTooltipBaseDirective.prototype.updatePosition = /**
     * Force the component to update its position.
     * @return {?}
     */
    function () {
        if (this.component) {
            this.component.updatePosition();
        }
    };
    /**
     * Create a dynamic tooltip component. This method can be override.
     */
    /**
     * Create a dynamic tooltip component. This method can be override.
     * @protected
     * @return {?}
     */
    NzTooltipBaseDirective.prototype.createComponent = /**
     * Create a dynamic tooltip component. This method can be override.
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var componentRef = this.hostView.createComponent(this.componentFactory);
        this.component = componentRef.instance;
        // Remove the component's DOM because it should be in the overlay container.
        this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), componentRef.location.nativeElement);
        this.component.setOverlayOrigin({ elementRef: this.specificOrigin || this.elementRef });
        this.updateChangedProperties(this.needProxyProperties);
        this.component.nzVisibleChange.pipe(distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((/**
         * @param {?} visible
         * @return {?}
         */
        function (visible) {
            _this.visible = visible;
            _this.nzVisibleChange.emit(visible);
        }));
    };
    /**
     * @protected
     * @return {?}
     */
    NzTooltipBaseDirective.prototype.registerTriggers = /**
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        // When the method gets invoked, all properties has been synced to the dynamic component.
        // After removing the old API, we can just check the directive's own `nzTrigger`.
        /** @type {?} */
        var el = this.elementRef.nativeElement;
        /** @type {?} */
        var trigger = this.trigger;
        this.removeTriggerListeners();
        if (trigger === 'hover') {
            /** @type {?} */
            var overlayElement_1;
            this.triggerDisposables.push(this.renderer.listen(el, 'mouseenter', (/**
             * @return {?}
             */
            function () {
                _this.delayEnterLeave(true, true, _this.nzMouseEnterDelay);
            })));
            this.triggerDisposables.push(this.renderer.listen(el, 'mouseleave', (/**
             * @return {?}
             */
            function () {
                var _a;
                _this.delayEnterLeave(true, false, _this.nzMouseLeaveDelay);
                if (((_a = _this.component) === null || _a === void 0 ? void 0 : _a.overlay.overlayRef) && !overlayElement_1) {
                    overlayElement_1 = _this.component.overlay.overlayRef.overlayElement;
                    _this.triggerDisposables.push(_this.renderer.listen(overlayElement_1, 'mouseenter', (/**
                     * @return {?}
                     */
                    function () {
                        _this.delayEnterLeave(false, true);
                    })));
                    _this.triggerDisposables.push(_this.renderer.listen(overlayElement_1, 'mouseleave', (/**
                     * @return {?}
                     */
                    function () {
                        _this.delayEnterLeave(false, false);
                    })));
                }
            })));
        }
        else if (trigger === 'focus') {
            this.triggerDisposables.push(this.renderer.listen(el, 'focus', (/**
             * @return {?}
             */
            function () { return _this.show(); })));
            this.triggerDisposables.push(this.renderer.listen(el, 'blur', (/**
             * @return {?}
             */
            function () { return _this.hide(); })));
        }
        else if (trigger === 'click') {
            this.triggerDisposables.push(this.renderer.listen(el, 'click', (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                e.preventDefault();
                _this.show();
            })));
        } // Else do nothing because user wants to control the visibility programmatically.
    };
    /**
     * Sync changed properties to the component and trigger change detection in that component.
     */
    /**
     * Sync changed properties to the component and trigger change detection in that component.
     * @protected
     * @param {?} propertiesOrChanges
     * @return {?}
     */
    NzTooltipBaseDirective.prototype.updateChangedProperties = /**
     * Sync changed properties to the component and trigger change detection in that component.
     * @protected
     * @param {?} propertiesOrChanges
     * @return {?}
     */
    function (propertiesOrChanges) {
        var _this = this;
        var _a;
        /** @type {?} */
        var isArray = Array.isArray(propertiesOrChanges);
        /** @type {?} */
        var keys = isArray ? ((/** @type {?} */ (propertiesOrChanges))) : Object.keys(propertiesOrChanges);
        keys.forEach((/**
         * @param {?} property
         * @return {?}
         */
        function (property) {
            if (_this.needProxyProperties.indexOf(property) !== -1) {
                // @ts-ignore
                _this.updateComponentValue(property, _this[property]);
            }
        }));
        if (isArray) {
            this.updateComponentValue('nzTitle', this.title);
            this.updateComponentValue('nzContent', this.content);
            this.updateComponentValue('nzPlacement', this.placement);
            this.updateComponentValue('nzTrigger', this.trigger);
        }
        else {
            /** @type {?} */
            var c = (/** @type {?} */ (propertiesOrChanges));
            if (c.specificTitle || c.directiveNameTitle || c.nzTitle) {
                this.updateComponentValue('nzTitle', this.title);
            }
            if (c.specificContent || c.directiveNameContent || c.nzContent) {
                this.updateComponentValue('nzContent', this.content);
            }
            if (c.specificTrigger || c.nzTrigger) {
                this.updateComponentValue('nzTrigger', this.trigger);
            }
            if (c.specificPlacement || c.nzPlacement) {
                this.updateComponentValue('nzPlacement', this.placement);
            }
        }
        (_a = this.component) === null || _a === void 0 ? void 0 : _a.updateByDirective();
    };
    /**
     * @private
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    NzTooltipBaseDirective.prototype.updateComponentValue = /**
     * @private
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        if (typeof value !== 'undefined') {
            // @ts-ignore
            this.component[key] = value;
        }
    };
    /**
     * @private
     * @param {?} isOrigin
     * @param {?} isEnter
     * @param {?=} delay
     * @return {?}
     */
    NzTooltipBaseDirective.prototype.delayEnterLeave = /**
     * @private
     * @param {?} isOrigin
     * @param {?} isEnter
     * @param {?=} delay
     * @return {?}
     */
    function (isOrigin, isEnter, delay) {
        var _this = this;
        if (delay === void 0) { delay = -1; }
        if (this.delayTimer) {
            this.clearTogglingTimer();
        }
        else if (delay > 0) {
            this.delayTimer = setTimeout((/**
             * @return {?}
             */
            function () {
                _this.delayTimer = undefined;
                isEnter ? _this.show() : _this.hide();
            }), delay * 1000);
        }
        else {
            // `isOrigin` is used due to the tooltip will not hide immediately
            // (may caused by the fade-out animation).
            isEnter && isOrigin ? this.show() : this.hide();
        }
    };
    /**
     * @private
     * @return {?}
     */
    NzTooltipBaseDirective.prototype.removeTriggerListeners = /**
     * @private
     * @return {?}
     */
    function () {
        this.triggerDisposables.forEach((/**
         * @param {?} dispose
         * @return {?}
         */
        function (dispose) { return dispose(); }));
        this.triggerDisposables.length = 0;
    };
    /**
     * @private
     * @return {?}
     */
    NzTooltipBaseDirective.prototype.clearTogglingTimer = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.delayTimer) {
            clearTimeout(this.delayTimer);
            this.delayTimer = undefined;
        }
    };
    NzTooltipBaseDirective.propDecorators = {
        nzTitle: [{ type: Input }],
        nzContent: [{ type: Input }],
        nzTrigger: [{ type: Input }],
        nzPlacement: [{ type: Input }],
        nzMouseEnterDelay: [{ type: Input }],
        nzMouseLeaveDelay: [{ type: Input }],
        nzOverlayClassName: [{ type: Input }],
        nzOverlayStyle: [{ type: Input }],
        nzVisible: [{ type: Input }],
        nzVisibleChange: [{ type: Output }]
    };
    return NzTooltipBaseDirective;
}());
export { NzTooltipBaseDirective };
if (false) {
    /** @type {?} */
    NzTooltipBaseDirective.prototype.directiveNameTitle;
    /** @type {?} */
    NzTooltipBaseDirective.prototype.specificTitle;
    /** @type {?} */
    NzTooltipBaseDirective.prototype.directiveNameContent;
    /** @type {?} */
    NzTooltipBaseDirective.prototype.specificContent;
    /** @type {?} */
    NzTooltipBaseDirective.prototype.specificTrigger;
    /** @type {?} */
    NzTooltipBaseDirective.prototype.specificPlacement;
    /** @type {?} */
    NzTooltipBaseDirective.prototype.specificOrigin;
    /**
     * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
     * Please use a more specific API. Like `nzTooltipTitle`.
     * @type {?}
     */
    NzTooltipBaseDirective.prototype.nzTitle;
    /**
     * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
     * Please use a more specific API. Like `nzPopoverContent`.
     * @type {?}
     */
    NzTooltipBaseDirective.prototype.nzContent;
    /**
     * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
     * Please use a more specific API. Like `nzTooltipTrigger`.
     * @type {?}
     */
    NzTooltipBaseDirective.prototype.nzTrigger;
    /**
     * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
     * Please use a more specific API. Like `nzTooltipPlacement`.
     * @type {?}
     */
    NzTooltipBaseDirective.prototype.nzPlacement;
    /** @type {?} */
    NzTooltipBaseDirective.prototype.nzMouseEnterDelay;
    /** @type {?} */
    NzTooltipBaseDirective.prototype.nzMouseLeaveDelay;
    /** @type {?} */
    NzTooltipBaseDirective.prototype.nzOverlayClassName;
    /** @type {?} */
    NzTooltipBaseDirective.prototype.nzOverlayStyle;
    /** @type {?} */
    NzTooltipBaseDirective.prototype.nzVisible;
    /**
     * For create tooltip dynamically. This should be override for each different component.
     * @type {?}
     * @protected
     */
    NzTooltipBaseDirective.prototype.componentFactory;
    /**
     * @type {?}
     * @protected
     */
    NzTooltipBaseDirective.prototype.needProxyProperties;
    /** @type {?} */
    NzTooltipBaseDirective.prototype.nzVisibleChange;
    /** @type {?} */
    NzTooltipBaseDirective.prototype.visible;
    /** @type {?} */
    NzTooltipBaseDirective.prototype.component;
    /**
     * @type {?}
     * @protected
     */
    NzTooltipBaseDirective.prototype.destroy$;
    /**
     * @type {?}
     * @protected
     */
    NzTooltipBaseDirective.prototype.triggerDisposables;
    /**
     * @type {?}
     * @private
     */
    NzTooltipBaseDirective.prototype.delayTimer;
    /** @type {?} */
    NzTooltipBaseDirective.prototype.elementRef;
    /**
     * @type {?}
     * @protected
     */
    NzTooltipBaseDirective.prototype.hostView;
    /**
     * @type {?}
     * @protected
     */
    NzTooltipBaseDirective.prototype.resolver;
    /**
     * @type {?}
     * @protected
     */
    NzTooltipBaseDirective.prototype.renderer;
    /**
     * @type {?}
     * @protected
     */
    NzTooltipBaseDirective.prototype.noAnimation;
}
/**
 * @abstract
 */
var NzTooltipBaseComponent = /** @class */ (function () {
    function NzTooltipBaseComponent(cdr, noAnimation) {
        this.cdr = cdr;
        this.noAnimation = noAnimation;
        this.nzVisibleChange = new Subject();
        this.nzTitle = null;
        this.nzContent = null;
        this.nzOverlayStyle = {};
        this._visible = false;
        this._trigger = 'hover';
        this.preferredPlacement = 'top';
        this._classMap = {};
        this._hasBackdrop = false;
        this._prefix = 'ant-tooltip-placement';
        this._positions = __spread(DEFAULT_TOOLTIP_POSITIONS);
    }
    Object.defineProperty(NzTooltipBaseComponent.prototype, "nzVisible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._visible;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var visible = toBoolean(value);
            if (this._visible !== visible) {
                this._visible = visible;
                this.nzVisibleChange.next(visible);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzTooltipBaseComponent.prototype, "nzTrigger", {
        get: /**
         * @return {?}
         */
        function () {
            return this._trigger;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._trigger = value;
            this._hasBackdrop = this._trigger === 'click';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzTooltipBaseComponent.prototype, "nzPlacement", {
        get: /**
         * @return {?}
         */
        function () {
            return this.preferredPlacement;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this.preferredPlacement) {
                this.preferredPlacement = value;
                this._positions = __spread([POSITION_MAP[this.nzPlacement]], this._positions);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NzTooltipBaseComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.nzVisibleChange.complete();
    };
    /**
     * @return {?}
     */
    NzTooltipBaseComponent.prototype.show = /**
     * @return {?}
     */
    function () {
        if (this.nzVisible) {
            return;
        }
        if (!this.isEmpty()) {
            this.nzVisible = true;
            this.nzVisibleChange.next(true);
            this.cdr.detectChanges();
        }
    };
    /**
     * @return {?}
     */
    NzTooltipBaseComponent.prototype.hide = /**
     * @return {?}
     */
    function () {
        if (!this.nzVisible) {
            return;
        }
        this.nzVisible = false;
        this.nzVisibleChange.next(false);
        this.cdr.detectChanges();
    };
    /**
     * @return {?}
     */
    NzTooltipBaseComponent.prototype.updateByDirective = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.setClassMap();
        this.cdr.detectChanges();
        Promise.resolve().then((/**
         * @return {?}
         */
        function () {
            _this.updatePosition();
            _this.updateVisibilityByTitle();
        }));
    };
    /**
     * Force the component to update its position.
     */
    /**
     * Force the component to update its position.
     * @return {?}
     */
    NzTooltipBaseComponent.prototype.updatePosition = /**
     * Force the component to update its position.
     * @return {?}
     */
    function () {
        if (this.origin && this.overlay && this.overlay.overlayRef) {
            this.overlay.overlayRef.updatePosition();
        }
    };
    /**
     * @param {?} position
     * @return {?}
     */
    NzTooltipBaseComponent.prototype.onPositionChange = /**
     * @param {?} position
     * @return {?}
     */
    function (position) {
        this.preferredPlacement = (/** @type {?} */ (getPlacementName(position)));
        this.setClassMap();
        this.cdr.detectChanges();
    };
    /**
     * @return {?}
     */
    NzTooltipBaseComponent.prototype.setClassMap = /**
     * @return {?}
     */
    function () {
        var _a;
        this._classMap = (_a = {},
            _a[this.nzOverlayClassName] = true,
            _a[this._prefix + "-" + this.preferredPlacement] = true,
            _a);
    };
    /**
     * @param {?} origin
     * @return {?}
     */
    NzTooltipBaseComponent.prototype.setOverlayOrigin = /**
     * @param {?} origin
     * @return {?}
     */
    function (origin) {
        this.origin = origin;
        this.cdr.markForCheck();
    };
    /**
     * Hide the component while the content is empty.
     */
    /**
     * Hide the component while the content is empty.
     * @private
     * @return {?}
     */
    NzTooltipBaseComponent.prototype.updateVisibilityByTitle = /**
     * Hide the component while the content is empty.
     * @private
     * @return {?}
     */
    function () {
        if (this.isEmpty()) {
            this.hide();
        }
    };
    NzTooltipBaseComponent.propDecorators = {
        overlay: [{ type: ViewChild, args: ['overlay', { static: false },] }]
    };
    return NzTooltipBaseComponent;
}());
export { NzTooltipBaseComponent };
if (false) {
    /** @type {?} */
    NzTooltipBaseComponent.prototype.overlay;
    /** @type {?} */
    NzTooltipBaseComponent.prototype.nzVisibleChange;
    /** @type {?} */
    NzTooltipBaseComponent.prototype.nzTitle;
    /** @type {?} */
    NzTooltipBaseComponent.prototype.nzContent;
    /** @type {?} */
    NzTooltipBaseComponent.prototype.nzOverlayClassName;
    /** @type {?} */
    NzTooltipBaseComponent.prototype.nzOverlayStyle;
    /** @type {?} */
    NzTooltipBaseComponent.prototype.nzMouseEnterDelay;
    /** @type {?} */
    NzTooltipBaseComponent.prototype.nzMouseLeaveDelay;
    /** @type {?} */
    NzTooltipBaseComponent.prototype._visible;
    /**
     * @type {?}
     * @protected
     */
    NzTooltipBaseComponent.prototype._trigger;
    /** @type {?} */
    NzTooltipBaseComponent.prototype.origin;
    /** @type {?} */
    NzTooltipBaseComponent.prototype.preferredPlacement;
    /** @type {?} */
    NzTooltipBaseComponent.prototype._classMap;
    /** @type {?} */
    NzTooltipBaseComponent.prototype._hasBackdrop;
    /** @type {?} */
    NzTooltipBaseComponent.prototype._prefix;
    /** @type {?} */
    NzTooltipBaseComponent.prototype._positions;
    /** @type {?} */
    NzTooltipBaseComponent.prototype.cdr;
    /** @type {?} */
    NzTooltipBaseComponent.prototype.noAnimation;
    /**
     * Empty component cannot be opened.
     * @abstract
     * @protected
     * @return {?}
     */
    NzTooltipBaseComponent.prototype.isEmpty = function () { };
}
/**
 * @param {?} value
 * @return {?}
 */
export function isTooltipEmpty(value) {
    return value instanceof TemplateRef ? false : value === '' || !isNotNil(value);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvdG9vbHRpcC8iLCJzb3VyY2VzIjpbImJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxtQkFBbUIsRUFBNEUsTUFBTSxzQkFBc0IsQ0FBQztBQUNySSxPQUFPLEVBTUwsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBR04sV0FBVyxFQUNYLFNBQVMsRUFFVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFNUQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXZHLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFJakU7SUFtRkUsZ0NBQ1MsVUFBc0IsRUFDbkIsUUFBMEIsRUFDMUIsUUFBa0MsRUFDbEMsUUFBbUIsRUFDbkIsV0FBb0M7UUFKdkMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFrQjtRQUMxQixhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUNsQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGdCQUFXLEdBQVgsV0FBVyxDQUF5Qjs7Ozs7UUEvRHZDLGNBQVMsR0FBcUIsT0FBTyxDQUFDOzs7OztRQU10QyxnQkFBVyxHQUFXLEtBQUssQ0FBQztRQUU1QixzQkFBaUIsR0FBVyxJQUFJLENBQUM7UUFDakMsc0JBQWlCLEdBQVcsR0FBRyxDQUFDO1FBOEIvQix3QkFBbUIsR0FBRztZQUM5QixvQkFBb0I7WUFDcEIsZ0JBQWdCO1lBQ2hCLG1CQUFtQjtZ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QUM7SUFDMUIsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSyx3REFBdUI7Ozs7O0lBQS9CO1FBQ0UsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDbEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2I7SUFDSCxDQUFDOzswQkE5SEEsU0FBUyxTQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7O0lBb0l6Qyw2QkFBQztDQUFBLEFBcklELElBcUlDO1NBcklxQixzQkFBc0I7OztJQUMxQyx5Q0FBdUU7O0lBRXZFLGlEQUF5Qzs7SUFDekMseUNBQWdDOztJQUNoQywyQ0FBa0M7O0lBQ2xDLG9EQUE0Qjs7SUFDNUIsZ0RBQXNDOztJQUN0QyxtREFBMkI7O0lBQzNCLG1EQUEyQjs7SUFjM0IsMENBQWlCOzs7OztJQVdqQiwwQ0FBK0M7O0lBYS9DLHdDQUEwQjs7SUFDMUIsb0RBQTJCOztJQUUzQiwyQ0FBaUM7O0lBQ2pDLDhDQUFxQjs7SUFDckIseUNBQWtDOztJQUNsQyw0Q0FBc0U7O0lBRTFELHFDQUE2Qjs7SUFBRSw2Q0FBMkM7Ozs7Ozs7SUE2RXRGLDJEQUFzQzs7Ozs7O0FBR3hDLE1BQU0sVUFBVSxjQUFjLENBQUMsS0FBd0M7SUFDckUsT0FBTyxLQUFLLFlBQVksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENka0Nvbm5lY3RlZE92ZXJsYXksIENka092ZXJsYXlPcmlnaW4sIENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZSwgQ29ubmVjdGlvblBvc2l0aW9uUGFpciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnRGYWN0b3J5LFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHdhcm5EZXByZWNhdGlvbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9sb2dnZXInO1xuaW1wb3J0IHsgTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9uby1hbmltYXRpb24nO1xuaW1wb3J0IHsgREVGQVVMVF9UT09MVElQX1BPU0lUSU9OUywgZ2V0UGxhY2VtZW50TmFtZSwgUE9TSVRJT05fTUFQIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL292ZXJsYXknO1xuaW1wb3J0IHsgTmdDbGFzc0ludGVyZmFjZSwgTmdTdHlsZUludGVyZmFjZSwgTnpTYWZlQW55LCBOelRTVHlwZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBpc05vdE5pbCwgdG9Cb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IHR5cGUgTnpUb29sdGlwVHJpZ2dlciA9ICdjbGljaycgfCAnZm9jdXMnIHwgJ2hvdmVyJyB8IG51bGw7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOelRvb2x0aXBCYXNlRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBkaXJlY3RpdmVOYW1lVGl0bGU/OiBOelRTVHlwZSB8IG51bGw7XG4gIHNwZWNpZmljVGl0bGU/OiBOelRTVHlwZSB8IG51bGw7XG4gIGRpcmVjdGl2ZU5hbWVDb250ZW50PzogTnpUU1R5cGUgfCBudWxsO1xuICBzcGVjaWZpY0NvbnRlbnQ/OiBOelRTVHlwZSB8IG51bGw7XG4gIHNwZWNpZmljVHJpZ2dlcj86IE56VG9vbHRpcFRyaWdnZXI7XG4gIHNwZWNpZmljUGxhY2VtZW50Pzogc3RyaW5nO1xuICBzcGVjaWZpY09yaWdpbj86IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCAxMC4wLjAuIFRoaXMgaXMgZGVwcmVjYXRlZCBhbmQgZ29pbmcgdG8gYmUgcmVtb3ZlZCBpbiAxMC4wLjAuXG4gICAqIFBsZWFzZSB1c2UgYSBtb3JlIHNwZWNpZmljIEFQSS4gTGlrZSBgbnpUb29sdGlwVGl0bGVgLlxuICAgKi9cbiAgQElucHV0KCkgbnpUaXRsZT86IE56VFNUeXBlIHwgbnVsbDtcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgMTAuMC4wLiBUaGlzIGlzIGRlcHJlY2F0ZWQgYW5kIGdvaW5nIHRvIGJlIHJlbW92ZWQgaW4gMTAuMC4wLlxuICAgKiBQbGVhc2UgdXNlIGEgbW9yZSBzcGVjaWZpYyBBUEkuIExpa2UgYG56UG9wb3ZlckNvbnRlbnRgLlxuICAgKi9cbiAgQElucHV0KCkgbnpDb250ZW50PzogTnpUU1R5cGUgfCBudWxsO1xuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCAxMC4wLjAuIFRoaXMgaXMgZGVwcmVjYXRlZCBhbmQgZ29pbmcgdG8gYmUgcmVtb3ZlZCBpbiAxMC4wLjAuXG4gICAqIFBsZWFzZSB1c2UgYSBtb3JlIHNwZWNpZmljIEFQSS4gTGlrZSBgbnpUb29sdGlwVHJpZ2dlcmAuXG4gICAqL1xuICBASW5wdXQoKSBuelRyaWdnZXI6IE56VG9vbHRpcFRyaWdnZXIgPSAnaG92ZXInO1xuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCAxMC4wLjAuIFRoaXMgaXMgZGVwcmVjYXRlZCBhbmQgZ29pbmcgdG8gYmUgcmVtb3ZlZCBpbiAxMC4wLjAuXG4gICAqIFBsZWFzZSB1c2UgYSBtb3JlIHNwZWNpZmljIEFQSS4gTGlrZSBgbnpUb29sdGlwUGxhY2VtZW50YC5cbiAgICovXG4gIEBJbnB1dCgpIG56UGxhY2VtZW50OiBzdHJpbmcgPSAndG9wJztcblxuICBASW5wdXQoKSBuek1vdXNlRW50ZXJEZWxheTogbnVtYmVyID0gMC4xNTtcbiAgQElucHV0KCkgbnpNb3VzZUxlYXZlRGVsYXk6IG51bWJlciA9IDAuMTtcbiAgQElucHV0KCkgbnpPdmVybGF5Q2xhc3NOYW1lPzogc3RyaW5nO1xuICBASW5wdXQoKSBuek92ZXJsYXlTdHlsZT86IE5nU3R5bGVJbnRlcmZhY2U7XG4gIEBJbnB1dCgpIG56VmlzaWJsZT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEZvciBjcmVhdGUgdG9vbHRpcCBkeW5hbWljYWxseS4gVGhpcyBzaG91bGQgYmUgb3ZlcnJpZGUgZm9yIGVhY2ggZGlmZmVyZW50IGNvbXBvbmVudC5cbiAgICovXG4gIHByb3RlY3RlZCBjb21wb25lbnRGYWN0b3J5ITogQ29tcG9uZW50RmFjdG9yeTxOelRvb2x0aXBCYXNlQ29tcG9uZW50PjtcblxuICAvKipcbiAgICogVGhpcyB0cnVlIHRpdGxlIHRoYXQgd291bGQgYmUgdXNlZCBpbiBvdGhlciBwYXJ0cyBvbiB0aGlzIGNvbXBvbmVudC5cbiAgICovXG4gIHByb3RlY3RlZCBnZXQgdGl0bGUoKTogTnpUU1R5cGUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5zcGVjaWZpY1RpdGxlIHx8IHRoaXMuZGlyZWN0aXZlTmFtZVRpdGxlIHx8IHRoaXMubnpUaXRsZSB8fCBudWxsO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBjb250ZW50KCk6IE56VFNUeXBlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuc3BlY2lmaWNDb250ZW50IHx8IHRoaXMuZGlyZWN0aXZlTmFtZUNvbnRlbnQgfHwgdGhpcy5uekNvbnRlbnQgfHwgbnVsbDtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgcGxhY2VtZW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc3BlY2lmaWNQbGFjZW1lbnQgfHwgdGhpcy5uelBsYWNlbWVudDtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgdHJpZ2dlcigpOiBOelRvb2x0aXBUcmlnZ2VyIHtcbiAgICAvLyBOelRvb2x0aXBUcmlnZ2VyIGNhbiBiZSBudWxsLlxuICAgIHJldHVybiB0eXBlb2YgdGhpcy5zcGVjaWZpY1RyaWdnZXIgIT09ICd1bmRlZmluZWQnID8gdGhpcy5zcGVjaWZpY1RyaWdnZXIgOiB0aGlzLm56VHJpZ2dlcjtcbiAgfVxuXG4gIHByb3RlY3RlZCBuZWVkUHJveHlQcm9wZXJ0aWVzID0gW1xuICAgICduek92ZXJsYXlDbGFzc05hbWUnLFxuICAgICduek92ZXJsYXlTdHlsZScsXG4gICAgJ256TW91c2VFbnRlckRlbGF5JyxcbiAgICAnbnpNb3VzZUxlYXZlRGVsYXknLFxuICAgICduelZpc2libGUnLFxuICAgICdub0FuaW1hdGlvbidcbiAgXTtcblxuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpWaXNpYmxlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIHZpc2libGUgPSBmYWxzZTtcbiAgY29tcG9uZW50PzogTnpUb29sdGlwQmFzZUNvbXBvbmVudDtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgdHJpZ2dlckRpc3Bvc2FibGVzOiBBcnJheTwoKSA9PiB2b2lkPiA9IFtdO1xuXG4gIHByaXZhdGUgZGVsYXlUaW1lcj86IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcm90ZWN0ZWQgaG9zdFZpZXc6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJvdGVjdGVkIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJvdGVjdGVkIG5vQW5pbWF0aW9uPzogTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZVxuICApIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbnpUcmlnZ2VyLCBzcGVjaWZpY1RyaWdnZXIgfSA9IGNoYW5nZXM7XG4gICAgY29uc3QgdHJpZ2dlciA9IHNwZWNpZmljVHJpZ2dlciB8fCBuelRyaWdnZXI7XG5cbiAgICBpZiAodHJpZ2dlciAmJiAhdHJpZ2dlci5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMucmVnaXN0ZXJUcmlnZ2VycygpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbXBvbmVudCkge1xuICAgICAgdGhpcy51cGRhdGVDaGFuZ2VkUHJvcGVydGllcyhjaGFuZ2VzKTtcbiAgICB9XG5cbiAgICAvLyB3YXJuIGRlcHJlY2F0ZWQgdGhpbmdzIHdoZW4gc3BlY2lmaWMgcHJvcGVydHkgaXMgbm90IGdpdmVuXG4gICAgaWYgKGNoYW5nZXMubnpUaXRsZSAmJiAhdGhpcy5zcGVjaWZpY1RpdGxlICYmICF0aGlzLmRpcmVjdGl2ZU5hbWVUaXRsZSkge1xuICAgICAgd2FybkRlcHJlY2F0aW9uKFxuICAgICAgICBgJ256VGl0bGUnIG9mICduei10b29sdGlwJyBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gMTAuMC4wLlxuUGxlYXNlIHVzZSAnbnpUb29sdGlwVGl0bGUnIGluc3RlYWQuIFRoZSBzYW1lIHdpdGggJ256LXBvcG92ZXInIGFuZCAnbnotcG9wY29uZmlybScuYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5uekNvbnRlbnQgJiYgIXRoaXMuc3BlY2lmaWNDb250ZW50KSB7XG4gICAgICB3YXJuRGVwcmVjYXRpb24oXG4gICAgICAgIGAnbnpDb250ZW50JyBvZiAnbnotcG9wb3ZlcicgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIDEwLjAuMC5cblBsZWFzZSB1c2UgJ256UG9wb3ZlckNvbnRlbnQnIGluc3RlYWQuYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5uelBsYWNlbWVudCAmJiAhdGhpcy5zcGVjaWZpY1BsYWNlbWVudCkge1xuICAgICAgd2FybkRlcHJlY2F0aW9uKFxuICAgICAgICBgJ256UGxhY2VtZW50JyBvZiAnbnotdG9vbHRpcCcgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIDEwLjAuMC5cblBsZWFzZSB1c2UgJ256VG9vbHRpcENvbnRlbnQnIGluc3RlYWQuIFRoZSBzYW1lIHdpdGggJ256LXBvcG92ZXInIGFuZCAnbnotcG9wY29uZmlybScuYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5uelRyaWdnZXIgJiYgIXRoaXMuc3BlY2lmaWNUcmlnZ2VyKSB7XG4gICAgICB3YXJuRGVwcmVjYXRpb24oXG4gICAgICAgIGAnbnpUcmlnZ2VyJyBvZiAnbnotdG9vbHRpcCcgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIDEwLjAuMC5cblBsZWFzZSB1c2UgJ256VG9vbHRpcFRyaWdnZXInIGluc3RlYWQuIFRoZSBzYW1lIHdpdGggJ256LXBvcG92ZXInIGFuZCAnbnotcG9wY29uZmlybScuYFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jcmVhdGVDb21wb25lbnQoKTtcbiAgICB0aGlzLnJlZ2lzdGVyVHJpZ2dlcnMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcblxuICAgIC8vIENsZWFyIHRvZ2dsaW5nIHRpbWVyLiBJc3N1ZSAjMzg3NSAjNDMxNyAjNDM4NlxuICAgIHRoaXMuY2xlYXJUb2dnbGluZ1RpbWVyKCk7XG4gICAgdGhpcy5yZW1vdmVUcmlnZ2VyTGlzdGVuZXJzKCk7XG4gIH1cblxuICBzaG93KCk6IHZvaWQge1xuICAgIHRoaXMuY29tcG9uZW50Py5zaG93KCk7XG4gIH1cblxuICBoaWRlKCk6IHZvaWQge1xuICAgIHRoaXMuY29tcG9uZW50Py5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICogRm9yY2UgdGhlIGNvbXBvbmVudCB0byB1cGRhdGUgaXRzIHBvc2l0aW9uLlxuICAgKi9cbiAgdXBkYXRlUG9zaXRpb24oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29tcG9uZW50KSB7XG4gICAgICB0aGlzLmNvbXBvbmVudC51cGRhdGVQb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBkeW5hbWljIHRvb2x0aXAgY29tcG9uZW50LiBUaGlzIG1ldGhvZCBjYW4gYmUgb3ZlcnJpZGUuXG4gICAqL1xuICBwcm90ZWN0ZWQgY3JlYXRlQ29tcG9uZW50KCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuaG9zdFZpZXcuY3JlYXRlQ29tcG9uZW50KHRoaXMuY29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcblxuICAgIC8vIFJlbW92ZSB0aGUgY29tcG9uZW50J3MgRE9NIGJlY2F1c2UgaXQgc2hvdWxkIGJlIGluIHRoZSBvdmVybGF5IGNvbnRhaW5lci5cbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCksIGNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLmNvbXBvbmVudC5zZXRPdmVybGF5T3JpZ2luKHsgZWxlbWVudFJlZjogdGhpcy5zcGVjaWZpY09yaWdpbiB8fCB0aGlzLmVsZW1lbnRSZWYgfSk7XG5cbiAgICB0aGlzLnVwZGF0ZUNoYW5nZWRQcm9wZXJ0aWVzKHRoaXMubmVlZFByb3h5UHJvcGVydGllcyk7XG5cbiAgICB0aGlzLmNvbXBvbmVudC5uelZpc2libGVDaGFuZ2UucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLCB0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgodmlzaWJsZTogYm9vbGVhbikgPT4ge1xuICAgICAgdGhpcy52aXNpYmxlID0gdmlzaWJsZTtcbiAgICAgIHRoaXMubnpWaXNpYmxlQ2hhbmdlLmVtaXQodmlzaWJsZSk7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVnaXN0ZXJUcmlnZ2VycygpOiB2b2lkIHtcbiAgICAvLyBXaGVuIHRoZSBtZXRob2QgZ2V0cyBpbnZva2VkLCBhbGwgcHJvcGVydGllcyBoYXMgYmVlbiBzeW5jZWQgdG8gdGhlIGR5bmFtaWMgY29tcG9uZW50LlxuICAgIC8vIEFmdGVyIHJlbW92aW5nIHRoZSBvbGQgQVBJLCB3ZSBjYW4ganVzdCBjaGVjayB0aGUgZGlyZWN0aXZlJ3Mgb3duIGBuelRyaWdnZXJgLlxuICAgIGNvbnN0IGVsID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgdHJpZ2dlciA9IHRoaXMudHJpZ2dlcjtcblxuICAgIHRoaXMucmVtb3ZlVHJpZ2dlckxpc3RlbmVycygpO1xuXG4gICAgaWYgKHRyaWdnZXIgPT09ICdob3ZlcicpIHtcbiAgICAgIGxldCBvdmVybGF5RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgICB0aGlzLnRyaWdnZXJEaXNwb3NhYmxlcy5wdXNoKFxuICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbCwgJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kZWxheUVudGVyTGVhdmUodHJ1ZSwgdHJ1ZSwgdGhpcy5uek1vdXNlRW50ZXJEZWxheSk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgICAgdGhpcy50cmlnZ2VyRGlzcG9zYWJsZXMucHVzaChcbiAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oZWwsICdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZGVsYXlFbnRlckxlYXZlKHRydWUsIGZhbHNlLCB0aGlzLm56TW91c2VMZWF2ZURlbGF5KTtcbiAgICAgICAgICBpZiAodGhpcy5jb21wb25lbnQ/Lm92ZXJsYXkub3ZlcmxheVJlZiAmJiAhb3ZlcmxheUVsZW1lbnQpIHtcbiAgICAgICAgICAgIG92ZXJsYXlFbGVtZW50ID0gdGhpcy5jb21wb25lbnQub3ZlcmxheS5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50O1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyRGlzcG9zYWJsZXMucHVzaChcbiAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4ob3ZlcmxheUVsZW1lbnQsICdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsYXlFbnRlckxlYXZlKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJEaXNwb3NhYmxlcy5wdXNoKFxuICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihvdmVybGF5RWxlbWVudCwgJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxheUVudGVyTGVhdmUoZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHRyaWdnZXIgPT09ICdmb2N1cycpIHtcbiAgICAgIHRoaXMudHJpZ2dlckRpc3Bvc2FibGVzLnB1c2godGhpcy5yZW5kZXJlci5saXN0ZW4oZWwsICdmb2N1cycsICgpID0+IHRoaXMuc2hvdygpKSk7XG4gICAgICB0aGlzLnRyaWdnZXJEaXNwb3NhYmxlcy5wdXNoKHRoaXMucmVuZGVyZXIubGlzdGVuKGVsLCAnYmx1cicsICgpID0+IHRoaXMuaGlkZSgpKSk7XG4gICAgfSBlbHNlIGlmICh0cmlnZ2VyID09PSAnY2xpY2snKSB7XG4gICAgICB0aGlzLnRyaWdnZXJEaXNwb3NhYmxlcy5wdXNoKFxuICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbCwgJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9IC8vIEVsc2UgZG8gbm90aGluZyBiZWNhdXNlIHVzZXIgd2FudHMgdG8gY29udHJvbCB0aGUgdmlzaWJpbGl0eSBwcm9ncmFtbWF0aWNhbGx5LlxuICB9XG5cbiAgLyoqXG4gICAqIFN5bmMgY2hhbmdlZCBwcm9wZXJ0aWVzIHRvIHRoZSBjb21wb25lbnQgYW5kIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiBpbiB0aGF0IGNvbXBvbmVudC5cbiAgICovXG4gIHByb3RlY3RlZCB1cGRhdGVDaGFuZ2VkUHJvcGVydGllcyhwcm9wZXJ0aWVzT3JDaGFuZ2VzOiBzdHJpbmdbXSB8IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheShwcm9wZXJ0aWVzT3JDaGFuZ2VzKTtcbiAgICBjb25zdCBrZXlzID0gaXNBcnJheSA/IChwcm9wZXJ0aWVzT3JDaGFuZ2VzIGFzIHN0cmluZ1tdKSA6IE9iamVjdC5rZXlzKHByb3BlcnRpZXNPckNoYW5nZXMpO1xuXG4gICAga2V5cy5mb3JFYWNoKChwcm9wZXJ0eTogTnpTYWZlQW55KSA9PiB7XG4gICAgICBpZiAodGhpcy5uZWVkUHJveHlQcm9wZXJ0aWVzLmluZGV4T2YocHJvcGVydHkpICE9PSAtMSkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMudXBkYXRlQ29tcG9uZW50VmFsdWUocHJvcGVydHksIHRoaXNbcHJvcGVydHldKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChpc0FycmF5KSB7XG4gICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudFZhbHVlKCduelRpdGxlJywgdGhpcy50aXRsZSk7XG4gICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudFZhbHVlKCduekNvbnRlbnQnLCB0aGlzLmNvbnRlbnQpO1xuICAgICAgdGhpcy51cGRhdGVDb21wb25lbnRWYWx1ZSgnbnpQbGFjZW1lbnQnLCB0aGlzLnBsYWNlbWVudCk7XG4gICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudFZhbHVlKCduelRyaWdnZXInLCB0aGlzLnRyaWdnZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjID0gcHJvcGVydGllc09yQ2hhbmdlcyBhcyBTaW1wbGVDaGFuZ2VzO1xuICAgICAgaWYgKGMuc3BlY2lmaWNUaXRsZSB8fCBjLmRpcmVjdGl2ZU5hbWVUaXRsZSB8fCBjLm56VGl0bGUpIHtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wb25lbnRWYWx1ZSgnbnpUaXRsZScsIHRoaXMudGl0bGUpO1xuICAgICAgfVxuICAgICAgaWYgKGMuc3BlY2lmaWNDb250ZW50IHx8IGMuZGlyZWN0aXZlTmFtZUNvbnRlbnQgfHwgYy5uekNvbnRlbnQpIHtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wb25lbnRWYWx1ZSgnbnpDb250ZW50JywgdGhpcy5jb250ZW50KTtcbiAgICAgIH1cbiAgICAgIGlmIChjLnNwZWNpZmljVHJpZ2dlciB8fCBjLm56VHJpZ2dlcikge1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudFZhbHVlKCduelRyaWdnZXInLCB0aGlzLnRyaWdnZXIpO1xuICAgICAgfVxuICAgICAgaWYgKGMuc3BlY2lmaWNQbGFjZW1lbnQgfHwgYy5uelBsYWNlbWVudCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudFZhbHVlKCduelBsYWNlbWVudCcsIHRoaXMucGxhY2VtZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNvbXBvbmVudD8udXBkYXRlQnlEaXJlY3RpdmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ29tcG9uZW50VmFsdWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBOelNhZmVBbnkpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgdGhpcy5jb21wb25lbnRba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGVsYXlFbnRlckxlYXZlKGlzT3JpZ2luOiBib29sZWFuLCBpc0VudGVyOiBib29sZWFuLCBkZWxheTogbnVtYmVyID0gLTEpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kZWxheVRpbWVyKSB7XG4gICAgICB0aGlzLmNsZWFyVG9nZ2xpbmdUaW1lcigpO1xuICAgIH0gZWxzZSBpZiAoZGVsYXkgPiAwKSB7XG4gICAgICB0aGlzLmRlbGF5VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5kZWxheVRpbWVyID0gdW5kZWZpbmVkO1xuICAgICAgICBpc0VudGVyID8gdGhpcy5zaG93KCkgOiB0aGlzLmhpZGUoKTtcbiAgICAgIH0sIGRlbGF5ICogMTAwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGBpc09yaWdpbmAgaXMgdXNlZCBkdWUgdG8gdGhlIHRvb2x0aXAgd2lsbCBub3QgaGlkZSBpbW1lZGlhdGVseVxuICAgICAgLy8gKG1heSBjYXVzZWQgYnkgdGhlIGZhZGUtb3V0IGFuaW1hdGlvbikuXG4gICAgICBpc0VudGVyICYmIGlzT3JpZ2luID8gdGhpcy5zaG93KCkgOiB0aGlzLmhpZGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZVRyaWdnZXJMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgdGhpcy50cmlnZ2VyRGlzcG9zYWJsZXMuZm9yRWFjaChkaXNwb3NlID0+IGRpc3Bvc2UoKSk7XG4gICAgdGhpcy50cmlnZ2VyRGlzcG9zYWJsZXMubGVuZ3RoID0gMDtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJUb2dnbGluZ1RpbWVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRlbGF5VGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmRlbGF5VGltZXIpO1xuICAgICAgdGhpcy5kZWxheVRpbWVyID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTnpUb29sdGlwQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ292ZXJsYXknLCB7IHN0YXRpYzogZmFsc2UgfSkgb3ZlcmxheSE6IENka0Nvbm5lY3RlZE92ZXJsYXk7XG5cbiAgbnpWaXNpYmxlQ2hhbmdlID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcbiAgbnpUaXRsZTogTnpUU1R5cGUgfCBudWxsID0gbnVsbDtcbiAgbnpDb250ZW50OiBOelRTVHlwZSB8IG51bGwgPSBudWxsO1xuICBuek92ZXJsYXlDbGFzc05hbWUhOiBzdHJpbmc7XG4gIG56T3ZlcmxheVN0eWxlOiBOZ1N0eWxlSW50ZXJmYWNlID0ge307XG4gIG56TW91c2VFbnRlckRlbGF5PzogbnVtYmVyO1xuICBuek1vdXNlTGVhdmVEZWxheT86IG51bWJlcjtcblxuICBzZXQgbnpWaXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgY29uc3QgdmlzaWJsZSA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gICAgaWYgKHRoaXMuX3Zpc2libGUgIT09IHZpc2libGUpIHtcbiAgICAgIHRoaXMuX3Zpc2libGUgPSB2aXNpYmxlO1xuICAgICAgdGhpcy5uelZpc2libGVDaGFuZ2UubmV4dCh2aXNpYmxlKTtcbiAgICB9XG4gIH1cblxuICBnZXQgbnpWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xuICB9XG5cbiAgX3Zpc2libGUgPSBmYWxzZTtcblxuICBzZXQgbnpUcmlnZ2VyKHZhbHVlOiBOelRvb2x0aXBUcmlnZ2VyKSB7XG4gICAgdGhpcy5fdHJpZ2dlciA9IHZhbHVlO1xuICAgIHRoaXMuX2hhc0JhY2tkcm9wID0gdGhpcy5fdHJpZ2dlciA9PT0gJ2NsaWNrJztcbiAgfVxuXG4gIGdldCBuelRyaWdnZXIoKTogTnpUb29sdGlwVHJpZ2dlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RyaWdnZXI7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3RyaWdnZXI6IE56VG9vbHRpcFRyaWdnZXIgPSAnaG92ZXInO1xuXG4gIHNldCBuelBsYWNlbWVudCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLnByZWZlcnJlZFBsYWNlbWVudCkge1xuICAgICAgdGhpcy5wcmVmZXJyZWRQbGFjZW1lbnQgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX3Bvc2l0aW9ucyA9IFtQT1NJVElPTl9NQVBbdGhpcy5uelBsYWNlbWVudF0sIC4uLnRoaXMuX3Bvc2l0aW9uc107XG4gICAgfVxuICB9XG5cbiAgZ2V0IG56UGxhY2VtZW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucHJlZmVycmVkUGxhY2VtZW50O1xuICB9XG5cbiAgb3JpZ2luPzogQ2RrT3ZlcmxheU9yaWdpbjtcbiAgcHJlZmVycmVkUGxhY2VtZW50ID0gJ3RvcCc7XG5cbiAgX2NsYXNzTWFwOiBOZ0NsYXNzSW50ZXJmYWNlID0ge307XG4gIF9oYXNCYWNrZHJvcCA9IGZhbHNlO1xuICBfcHJlZml4ID0gJ2FudC10b29sdGlwLXBsYWNlbWVudCc7XG4gIF9wb3NpdGlvbnM6IENvbm5lY3Rpb25Qb3NpdGlvblBhaXJbXSA9IFsuLi5ERUZBVUxUX1RPT0xUSVBfUE9TSVRJT05TXTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIG5vQW5pbWF0aW9uPzogTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZSkge31cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLm56VmlzaWJsZUNoYW5nZS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgc2hvdygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uelZpc2libGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaXNFbXB0eSgpKSB7XG4gICAgICB0aGlzLm56VmlzaWJsZSA9IHRydWU7XG4gICAgICB0aGlzLm56VmlzaWJsZUNoYW5nZS5uZXh0KHRydWUpO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIGhpZGUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm56VmlzaWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubnpWaXNpYmxlID0gZmFsc2U7XG4gICAgdGhpcy5uelZpc2libGVDaGFuZ2UubmV4dChmYWxzZSk7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgdXBkYXRlQnlEaXJlY3RpdmUoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcblxuICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgdGhpcy51cGRhdGVWaXNpYmlsaXR5QnlUaXRsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcmNlIHRoZSBjb21wb25lbnQgdG8gdXBkYXRlIGl0cyBwb3NpdGlvbi5cbiAgICovXG4gIHVwZGF0ZVBvc2l0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9yaWdpbiAmJiB0aGlzLm92ZXJsYXkgJiYgdGhpcy5vdmVybGF5Lm92ZXJsYXlSZWYpIHtcbiAgICAgIHRoaXMub3ZlcmxheS5vdmVybGF5UmVmLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgb25Qb3NpdGlvbkNoYW5nZShwb3NpdGlvbjogQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlKTogdm9pZCB7XG4gICAgdGhpcy5wcmVmZXJyZWRQbGFjZW1lbnQgPSBnZXRQbGFjZW1lbnROYW1lKHBvc2l0aW9uKSE7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHNldENsYXNzTWFwKCk6IHZvaWQge1xuICAgIHRoaXMuX2NsYXNzTWFwID0ge1xuICAgICAgW3RoaXMubnpPdmVybGF5Q2xhc3NOYW1lXTogdHJ1ZSxcbiAgICAgIFtgJHt0aGlzLl9wcmVmaXh9LSR7dGhpcy5wcmVmZXJyZWRQbGFjZW1lbnR9YF06IHRydWVcbiAgICB9O1xuICB9XG5cbiAgc2V0T3ZlcmxheU9yaWdpbihvcmlnaW46IENka092ZXJsYXlPcmlnaW4pOiB2b2lkIHtcbiAgICB0aGlzLm9yaWdpbiA9IG9yaWdpbjtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlIHRoZSBjb21wb25lbnQgd2hpbGUgdGhlIGNvbnRlbnQgaXMgZW1wdHkuXG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZVZpc2liaWxpdHlCeVRpdGxlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzRW1wdHkoKSkge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVtcHR5IGNvbXBvbmVudCBjYW5ub3QgYmUgb3BlbmVkLlxuICAgKi9cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGlzRW1wdHkoKTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVG9vbHRpcEVtcHR5KHZhbHVlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPiB8IG51bGwpOiBib29sZWFuIHtcbiAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYgPyBmYWxzZSA6IHZhbHVlID09PSAnJyB8fCAhaXNOb3ROaWwodmFsdWUpO1xufVxuIl19