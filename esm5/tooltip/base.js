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
        this.specificVisibleChange = new EventEmitter();
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
        this.visible = false;
        this.needProxyProperties = ['nzOverlayClassName', 'nzOverlayStyle', 'nzMouseEnterDelay', 'nzMouseLeaveDelay', 'noAnimation'];
        this.nzVisibleChange = new EventEmitter();
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
    Object.defineProperty(NzTooltipBaseDirective.prototype, "isVisible", {
        get: /**
         * @protected
         * @return {?}
         */
        function () {
            return this.specificVisible || this.nzVisible || false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    NzTooltipBaseDirective.prototype.warnDeprecationByChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var getWarnDeprecation = (/**
         * @param {?} property
         * @param {?} newProperty
         * @param {?=} comp
         * @param {?=} shared
         * @return {?}
         */
        function (property, newProperty, comp, shared) {
            if (comp === void 0) { comp = 'nz-tooltip'; }
            if (shared === void 0) { shared = true; }
            /** @type {?} */
            var prefix = "'" + property + "' of '" + comp + "' is deprecated and will be removed in 10.0.0.\n      Please use '" + newProperty + "' instead.";
            if (shared) {
                return prefix + " The same with 'nz-popover' and 'nz-popconfirm'.";
            }
            else {
                return "" + prefix;
            }
        });
        // warn deprecated things when specific property is not given
        if (changes.nzTitle && !this.specificTitle && !this.directiveNameTitle) {
            warnDeprecation(getWarnDeprecation('nzTitle', 'nzTooltipTitle'));
        }
        if (changes.nzContent && !this.specificContent) {
            warnDeprecation(getWarnDeprecation('nzContent', 'nzPopoverContent', 'nz-popover', false));
        }
        if (changes.nzPlacement && !this.specificPlacement) {
            warnDeprecation(getWarnDeprecation('nzPlacement', 'nzTooltipPlacement'));
        }
        if (changes.nzTrigger && !this.specificTrigger) {
            warnDeprecation(getWarnDeprecation('nzTrigger', 'nzTooltipTrigger'));
        }
        if (changes.nzVisible && !this.specificVisible) {
            warnDeprecation(getWarnDeprecation('nzVisible', 'nzTooltipVisible'));
        }
    };
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
        this.warnDeprecationByChanges(changes);
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
            _this.specificVisibleChange.emit(visible);
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
            this.updateComponentValue('nzVisible', this.isVisible);
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
            if (c.specificVisible || c.nzVisible) {
                this.updateComponentValue('nzVisible', this.isVisible);
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
    /** @type {?} */
    NzTooltipBaseDirective.prototype.specificVisible;
    /** @type {?} */
    NzTooltipBaseDirective.prototype.specificVisibleChange;
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
    /** @type {?} */
    NzTooltipBaseDirective.prototype.visible;
    /**
     * @type {?}
     * @protected
     */
    NzTooltipBaseDirective.prototype.needProxyProperties;
    /** @type {?} */
    NzTooltipBaseDirective.prototype.nzVisibleChange;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvdG9vbHRpcC8iLCJzb3VyY2VzIjpbImJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxtQkFBbUIsRUFBNEUsTUFBTSxzQkFBc0IsQ0FBQztBQUNySSxPQUFPLEVBTUwsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBR04sV0FBVyxFQUNYLFNBQVMsRUFFVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFNUQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXZHLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFJakU7SUFtRkUsZ0NBQ1MsVUFBc0IsRUFDbkIsUUFBMEIsRUFDMUIsUUFBa0MsRUFDbEMsUUFBbUIsRUFDbkIsV0FBb0M7UUFKdkMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFrQjtRQUMxQixhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUNsQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGdCQUFXLEdBQVgsV0FBVyxDQUF5QjtRQTlFaEQsMEJBQXFCLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQzs7Ozs7UUFpQjNDLGNBQVMsR0FBcUIsT0FBTyxDQUFDOzs7OztRQU10QyxnQkFBVyxHQUFXLEtBQUssQ0FBQztRQUU1QixzQkFBaUIsR0FBVyxJQUFJLENBQUM7UUFDakMsc0JBQWlCLEdBQVcsR0FBRyxDQUFDO1FBa0N6QyxZQUFPLEdBQUcsS0FB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Qzs7Ozs7SUFFRCxpREFBZ0I7Ozs7SUFBaEIsVUFBaUIsTUFBd0I7UUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNLLHdEQUF1Qjs7Ozs7SUFBL0I7UUFDRSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNsQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDYjtJQUNILENBQUM7OzBCQTlIQSxTQUFTLFNBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs7SUFvSXpDLDZCQUFDO0NBQUEsQUFySUQsSUFxSUM7U0FySXFCLHNCQUFzQjs7O0lBQzFDLHlDQUF1RTs7SUFFdkUsaURBQXlDOztJQUN6Qyx5Q0FBZ0M7O0lBQ2hDLDJDQUFrQzs7SUFDbEMsb0RBQTRCOztJQUM1QixnREFBc0M7O0lBQ3RDLG1EQUEyQjs7SUFDM0IsbURBQTJCOztJQWMzQiwwQ0FBaUI7Ozs7O0lBV2pCLDBDQUErQzs7SUFhL0Msd0NBQTBCOztJQUMxQixvREFBMkI7O0lBRTNCLDJDQUFpQzs7SUFDakMsOENBQXFCOztJQUNyQix5Q0FBa0M7O0lBQ2xDLDRDQUFzRTs7SUFFMUQscUNBQTZCOztJQUFFLDZDQUEyQzs7Ozs7OztJQTZFdEYsMkRBQXNDOzs7Ozs7QUFHeEMsTUFBTSxVQUFVLGNBQWMsQ0FBQyxLQUF3QztJQUNyRSxPQUFPLEtBQUssWUFBWSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNqRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2RrQ29ubmVjdGVkT3ZlcmxheSwgQ2RrT3ZlcmxheU9yaWdpbiwgQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlLCBDb25uZWN0aW9uUG9zaXRpb25QYWlyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudEZhY3RvcnksXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgd2FybkRlcHJlY2F0aW9uIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2xvZ2dlcic7XG5pbXBvcnQgeyBOek5vQW5pbWF0aW9uRGlyZWN0aXZlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL25vLWFuaW1hdGlvbic7XG5pbXBvcnQgeyBERUZBVUxUX1RPT0xUSVBfUE9TSVRJT05TLCBnZXRQbGFjZW1lbnROYW1lLCBQT1NJVElPTl9NQVAgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvb3ZlcmxheSc7XG5pbXBvcnQgeyBOZ0NsYXNzSW50ZXJmYWNlLCBOZ1N0eWxlSW50ZXJmYWNlLCBOelNhZmVBbnksIE56VFNUeXBlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IGlzTm90TmlsLCB0b0Jvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgdHlwZSBOelRvb2x0aXBUcmlnZ2VyID0gJ2NsaWNrJyB8ICdmb2N1cycgfCAnaG92ZXInIHwgbnVsbDtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE56VG9vbHRpcEJhc2VEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XG4gIGRpcmVjdGl2ZU5hbWVUaXRsZT86IE56VFNUeXBlIHwgbnVsbDtcbiAgc3BlY2lmaWNUaXRsZT86IE56VFNUeXBlIHwgbnVsbDtcbiAgZGlyZWN0aXZlTmFtZUNvbnRlbnQ/OiBOelRTVHlwZSB8IG51bGw7XG4gIHNwZWNpZmljQ29udGVudD86IE56VFNUeXBlIHwgbnVsbDtcbiAgc3BlY2lmaWNUcmlnZ2VyPzogTnpUb29sdGlwVHJpZ2dlcjtcbiAgc3BlY2lmaWNQbGFjZW1lbnQ/OiBzdHJpbmc7XG4gIHNwZWNpZmljT3JpZ2luPzogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIHNwZWNpZmljVmlzaWJsZT86IGJvb2xlYW47XG5cbiAgc3BlY2lmaWNWaXNpYmxlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgMTAuMC4wLiBUaGlzIGlzIGRlcHJlY2F0ZWQgYW5kIGdvaW5nIHRvIGJlIHJlbW92ZWQgaW4gMTAuMC4wLlxuICAgKiBQbGVhc2UgdXNlIGEgbW9yZSBzcGVjaWZpYyBBUEkuIExpa2UgYG56VG9vbHRpcFRpdGxlYC5cbiAgICovXG4gIEBJbnB1dCgpIG56VGl0bGU/OiBOelRTVHlwZSB8IG51bGw7XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIDEwLjAuMC4gVGhpcyBpcyBkZXByZWNhdGVkIGFuZCBnb2luZyB0byBiZSByZW1vdmVkIGluIDEwLjAuMC5cbiAgICogUGxlYXNlIHVzZSBhIG1vcmUgc3BlY2lmaWMgQVBJLiBMaWtlIGBuelBvcG92ZXJDb250ZW50YC5cbiAgICovXG4gIEBJbnB1dCgpIG56Q29udGVudD86IE56VFNUeXBlIHwgbnVsbDtcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgMTAuMC4wLiBUaGlzIGlzIGRlcHJlY2F0ZWQgYW5kIGdvaW5nIHRvIGJlIHJlbW92ZWQgaW4gMTAuMC4wLlxuICAgKiBQbGVhc2UgdXNlIGEgbW9yZSBzcGVjaWZpYyBBUEkuIExpa2UgYG56VG9vbHRpcFRyaWdnZXJgLlxuICAgKi9cbiAgQElucHV0KCkgbnpUcmlnZ2VyOiBOelRvb2x0aXBUcmlnZ2VyID0gJ2hvdmVyJztcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgMTAuMC4wLiBUaGlzIGlzIGRlcHJlY2F0ZWQgYW5kIGdvaW5nIHRvIGJlIHJlbW92ZWQgaW4gMTAuMC4wLlxuICAgKiBQbGVhc2UgdXNlIGEgbW9yZSBzcGVjaWZpYyBBUEkuIExpa2UgYG56VG9vbHRpcFBsYWNlbWVudGAuXG4gICAqL1xuICBASW5wdXQoKSBuelBsYWNlbWVudDogc3RyaW5nID0gJ3RvcCc7XG5cbiAgQElucHV0KCkgbnpNb3VzZUVudGVyRGVsYXk6IG51bWJlciA9IDAuMTU7XG4gIEBJbnB1dCgpIG56TW91c2VMZWF2ZURlbGF5OiBudW1iZXIgPSAwLjE7XG4gIEBJbnB1dCgpIG56T3ZlcmxheUNsYXNzTmFtZT86IHN0cmluZztcbiAgQElucHV0KCkgbnpPdmVybGF5U3R5bGU/OiBOZ1N0eWxlSW50ZXJmYWNlO1xuICBASW5wdXQoKSBuelZpc2libGU/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBGb3IgY3JlYXRlIHRvb2x0aXAgZHluYW1pY2FsbHkuIFRoaXMgc2hvdWxkIGJlIG92ZXJyaWRlIGZvciBlYWNoIGRpZmZlcmVudCBjb21wb25lbnQuXG4gICAqL1xuICBwcm90ZWN0ZWQgY29tcG9uZW50RmFjdG9yeSE6IENvbXBvbmVudEZhY3Rvcnk8TnpUb29sdGlwQmFzZUNvbXBvbmVudD47XG5cbiAgLyoqXG4gICAqIFRoaXMgdHJ1ZSB0aXRsZSB0aGF0IHdvdWxkIGJlIHVzZWQgaW4gb3RoZXIgcGFydHMgb24gdGhpcyBjb21wb25lbnQuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0IHRpdGxlKCk6IE56VFNUeXBlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuc3BlY2lmaWNUaXRsZSB8fCB0aGlzLmRpcmVjdGl2ZU5hbWVUaXRsZSB8fCB0aGlzLm56VGl0bGUgfHwgbnVsbDtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgY29udGVudCgpOiBOelRTVHlwZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnNwZWNpZmljQ29udGVudCB8fCB0aGlzLmRpcmVjdGl2ZU5hbWVDb250ZW50IHx8IHRoaXMubnpDb250ZW50IHx8IG51bGw7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IHBsYWNlbWVudCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNwZWNpZmljUGxhY2VtZW50IHx8IHRoaXMubnpQbGFjZW1lbnQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IHRyaWdnZXIoKTogTnpUb29sdGlwVHJpZ2dlciB7XG4gICAgLy8gTnpUb29sdGlwVHJpZ2dlciBjYW4gYmUgbnVsbC5cbiAgICByZXR1cm4gdHlwZW9mIHRoaXMuc3BlY2lmaWNUcmlnZ2VyICE9PSAndW5kZWZpbmVkJyA/IHRoaXMuc3BlY2lmaWNUcmlnZ2VyIDogdGhpcy5uelRyaWdnZXI7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IGlzVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zcGVjaWZpY1Zpc2libGUgfHwgdGhpcy5uelZpc2libGUgfHwgZmFsc2U7XG4gIH1cblxuICB2aXNpYmxlID0gZmFsc2U7XG5cbiAgcHJvdGVjdGVkIG5lZWRQcm94eVByb3BlcnRpZXMgPSBbJ256T3ZlcmxheUNsYXNzTmFtZScsICduek92ZXJsYXlTdHlsZScsICduek1vdXNlRW50ZXJEZWxheScsICduek1vdXNlTGVhdmVEZWxheScsICdub0FuaW1hdGlvbiddO1xuXG4gIEBPdXRwdXQoKSByZWFkb25seSBuelZpc2libGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgY29tcG9uZW50PzogTnpUb29sdGlwQmFzZUNvbXBvbmVudDtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgdHJpZ2dlckRpc3Bvc2FibGVzOiBBcnJheTwoKSA9PiB2b2lkPiA9IFtdO1xuXG4gIHByaXZhdGUgZGVsYXlUaW1lcj86IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcm90ZWN0ZWQgaG9zdFZpZXc6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJvdGVjdGVkIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJvdGVjdGVkIG5vQW5pbWF0aW9uPzogTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZVxuICApIHt9XG5cbiAgd2FybkRlcHJlY2F0aW9uQnlDaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCBnZXRXYXJuRGVwcmVjYXRpb24gPSAocHJvcGVydHk6IHN0cmluZywgbmV3UHJvcGVydHk6IHN0cmluZywgY29tcDogc3RyaW5nID0gJ256LXRvb2x0aXAnLCBzaGFyZWQ6IGJvb2xlYW4gPSB0cnVlKTogc3RyaW5nID0+IHtcbiAgICAgIGNvbnN0IHByZWZpeCA9IGAnJHtwcm9wZXJ0eX0nIG9mICcke2NvbXB9JyBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gMTAuMC4wLlxuICAgICAgUGxlYXNlIHVzZSAnJHtuZXdQcm9wZXJ0eX0nIGluc3RlYWQuYDtcblxuICAgICAgaWYgKHNoYXJlZCkge1xuICAgICAgICByZXR1cm4gYCR7cHJlZml4fSBUaGUgc2FtZSB3aXRoICduei1wb3BvdmVyJyBhbmQgJ256LXBvcGNvbmZpcm0nLmA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYCR7cHJlZml4fWA7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIHdhcm4gZGVwcmVjYXRlZCB0aGluZ3Mgd2hlbiBzcGVjaWZpYyBwcm9wZXJ0eSBpcyBub3QgZ2l2ZW5cbiAgICBpZiAoY2hhbmdlcy5uelRpdGxlICYmICF0aGlzLnNwZWNpZmljVGl0bGUgJiYgIXRoaXMuZGlyZWN0aXZlTmFtZVRpdGxlKSB7XG4gICAgICB3YXJuRGVwcmVjYXRpb24oZ2V0V2FybkRlcHJlY2F0aW9uKCduelRpdGxlJywgJ256VG9vbHRpcFRpdGxlJykpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLm56Q29udGVudCAmJiAhdGhpcy5zcGVjaWZpY0NvbnRlbnQpIHtcbiAgICAgIHdhcm5EZXByZWNhdGlvbihnZXRXYXJuRGVwcmVjYXRpb24oJ256Q29udGVudCcsICduelBvcG92ZXJDb250ZW50JywgJ256LXBvcG92ZXInLCBmYWxzZSkpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLm56UGxhY2VtZW50ICYmICF0aGlzLnNwZWNpZmljUGxhY2VtZW50KSB7XG4gICAgICB3YXJuRGVwcmVjYXRpb24oZ2V0V2FybkRlcHJlY2F0aW9uKCduelBsYWNlbWVudCcsICduelRvb2x0aXBQbGFjZW1lbnQnKSk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMubnpUcmlnZ2VyICYmICF0aGlzLnNwZWNpZmljVHJpZ2dlcikge1xuICAgICAgd2FybkRlcHJlY2F0aW9uKGdldFdhcm5EZXByZWNhdGlvbignbnpUcmlnZ2VyJywgJ256VG9vbHRpcFRyaWdnZXInKSk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMubnpWaXNpYmxlICYmICF0aGlzLnNwZWNpZmljVmlzaWJsZSkge1xuICAgICAgd2FybkRlcHJlY2F0aW9uKGdldFdhcm5EZXByZWNhdGlvbignbnpWaXNpYmxlJywgJ256VG9vbHRpcFZpc2libGUnKSk7XG4gICAgfVxuICB9XG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56VHJpZ2dlciwgc3BlY2lmaWNUcmlnZ2VyIH0gPSBjaGFuZ2VzO1xuICAgIGNvbnN0IHRyaWdnZXIgPSBzcGVjaWZpY1RyaWdnZXIgfHwgbnpUcmlnZ2VyO1xuXG4gICAgaWYgKHRyaWdnZXIgJiYgIXRyaWdnZXIuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLnJlZ2lzdGVyVHJpZ2dlcnMoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb21wb25lbnQpIHtcbiAgICAgIHRoaXMudXBkYXRlQ2hhbmdlZFByb3BlcnRpZXMoY2hhbmdlcyk7XG4gICAgfVxuXG4gICAgdGhpcy53YXJuRGVwcmVjYXRpb25CeUNoYW5nZXMoY2hhbmdlcyk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jcmVhdGVDb21wb25lbnQoKTtcbiAgICB0aGlzLnJlZ2lzdGVyVHJpZ2dlcnMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcblxuICAgIC8vIENsZWFyIHRvZ2dsaW5nIHRpbWVyLiBJc3N1ZSAjMzg3NSAjNDMxNyAjNDM4NlxuICAgIHRoaXMuY2xlYXJUb2dnbGluZ1RpbWVyKCk7XG4gICAgdGhpcy5yZW1vdmVUcmlnZ2VyTGlzdGVuZXJzKCk7XG4gIH1cblxuICBzaG93KCk6IHZvaWQge1xuICAgIHRoaXMuY29tcG9uZW50Py5zaG93KCk7XG4gIH1cblxuICBoaWRlKCk6IHZvaWQge1xuICAgIHRoaXMuY29tcG9uZW50Py5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICogRm9yY2UgdGhlIGNvbXBvbmVudCB0byB1cGRhdGUgaXRzIHBvc2l0aW9uLlxuICAgKi9cbiAgdXBkYXRlUG9zaXRpb24oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29tcG9uZW50KSB7XG4gICAgICB0aGlzLmNvbXBvbmVudC51cGRhdGVQb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBkeW5hbWljIHRvb2x0aXAgY29tcG9uZW50LiBUaGlzIG1ldGhvZCBjYW4gYmUgb3ZlcnJpZGUuXG4gICAqL1xuICBwcm90ZWN0ZWQgY3JlYXRlQ29tcG9uZW50KCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuaG9zdFZpZXcuY3JlYXRlQ29tcG9uZW50KHRoaXMuY29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcblxuICAgIC8vIFJlbW92ZSB0aGUgY29tcG9uZW50J3MgRE9NIGJlY2F1c2UgaXQgc2hvdWxkIGJlIGluIHRoZSBvdmVybGF5IGNvbnRhaW5lci5cbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCksIGNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLmNvbXBvbmVudC5zZXRPdmVybGF5T3JpZ2luKHsgZWxlbWVudFJlZjogdGhpcy5zcGVjaWZpY09yaWdpbiB8fCB0aGlzLmVsZW1lbnRSZWYgfSk7XG5cbiAgICB0aGlzLnVwZGF0ZUNoYW5nZWRQcm9wZXJ0aWVzKHRoaXMubmVlZFByb3h5UHJvcGVydGllcyk7XG5cbiAgICB0aGlzLmNvbXBvbmVudC5uelZpc2libGVDaGFuZ2UucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLCB0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgodmlzaWJsZTogYm9vbGVhbikgPT4ge1xuICAgICAgdGhpcy52aXNpYmxlID0gdmlzaWJsZTtcbiAgICAgIHRoaXMuc3BlY2lmaWNWaXNpYmxlQ2hhbmdlLmVtaXQodmlzaWJsZSk7XG4gICAgICB0aGlzLm56VmlzaWJsZUNoYW5nZS5lbWl0KHZpc2libGUpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlZ2lzdGVyVHJpZ2dlcnMoKTogdm9pZCB7XG4gICAgLy8gV2hlbiB0aGUgbWV0aG9kIGdldHMgaW52b2tlZCwgYWxsIHByb3BlcnRpZXMgaGFzIGJlZW4gc3luY2VkIHRvIHRoZSBkeW5hbWljIGNvbXBvbmVudC5cbiAgICAvLyBBZnRlciByZW1vdmluZyB0aGUgb2xkIEFQSSwgd2UgY2FuIGp1c3QgY2hlY2sgdGhlIGRpcmVjdGl2ZSdzIG93biBgbnpUcmlnZ2VyYC5cbiAgICBjb25zdCBlbCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IHRyaWdnZXIgPSB0aGlzLnRyaWdnZXI7XG5cbiAgICB0aGlzLnJlbW92ZVRyaWdnZXJMaXN0ZW5lcnMoKTtcblxuICAgIGlmICh0cmlnZ2VyID09PSAnaG92ZXInKSB7XG4gICAgICBsZXQgb3ZlcmxheUVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgICAgdGhpcy50cmlnZ2VyRGlzcG9zYWJsZXMucHVzaChcbiAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oZWwsICdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZGVsYXlFbnRlckxlYXZlKHRydWUsIHRydWUsIHRoaXMubnpNb3VzZUVudGVyRGVsYXkpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICAgIHRoaXMudHJpZ2dlckRpc3Bvc2FibGVzLnB1c2goXG4gICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsLCAnbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgICAgICB0aGlzLmRlbGF5RW50ZXJMZWF2ZSh0cnVlLCBmYWxzZSwgdGhpcy5uek1vdXNlTGVhdmVEZWxheSk7XG4gICAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50Py5vdmVybGF5Lm92ZXJsYXlSZWYgJiYgIW92ZXJsYXlFbGVtZW50KSB7XG4gICAgICAgICAgICBvdmVybGF5RWxlbWVudCA9IHRoaXMuY29tcG9uZW50Lm92ZXJsYXkub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckRpc3Bvc2FibGVzLnB1c2goXG4gICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKG92ZXJsYXlFbGVtZW50LCAnbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGF5RW50ZXJMZWF2ZShmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyRGlzcG9zYWJsZXMucHVzaChcbiAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4ob3ZlcmxheUVsZW1lbnQsICdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsYXlFbnRlckxlYXZlKGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICh0cmlnZ2VyID09PSAnZm9jdXMnKSB7XG4gICAgICB0aGlzLnRyaWdnZXJEaXNwb3NhYmxlcy5wdXNoKHRoaXMucmVuZGVyZXIubGlzdGVuKGVsLCAnZm9jdXMnLCAoKSA9PiB0aGlzLnNob3coKSkpO1xuICAgICAgdGhpcy50cmlnZ2VyRGlzcG9zYWJsZXMucHVzaCh0aGlzLnJlbmRlcmVyLmxpc3RlbihlbCwgJ2JsdXInLCAoKSA9PiB0aGlzLmhpZGUoKSkpO1xuICAgIH0gZWxzZSBpZiAodHJpZ2dlciA9PT0gJ2NsaWNrJykge1xuICAgICAgdGhpcy50cmlnZ2VyRGlzcG9zYWJsZXMucHVzaChcbiAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oZWwsICdjbGljaycsIGUgPT4ge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSAvLyBFbHNlIGRvIG5vdGhpbmcgYmVjYXVzZSB1c2VyIHdhbnRzIHRvIGNvbnRyb2wgdGhlIHZpc2liaWxpdHkgcHJvZ3JhbW1hdGljYWxseS5cbiAgfVxuXG4gIC8qKlxuICAgKiBTeW5jIGNoYW5nZWQgcHJvcGVydGllcyB0byB0aGUgY29tcG9uZW50IGFuZCB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb24gaW4gdGhhdCBjb21wb25lbnQuXG4gICAqL1xuICBwcm90ZWN0ZWQgdXBkYXRlQ2hhbmdlZFByb3BlcnRpZXMocHJvcGVydGllc09yQ2hhbmdlczogc3RyaW5nW10gfCBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkocHJvcGVydGllc09yQ2hhbmdlcyk7XG4gICAgY29uc3Qga2V5cyA9IGlzQXJyYXkgPyAocHJvcGVydGllc09yQ2hhbmdlcyBhcyBzdHJpbmdbXSkgOiBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzT3JDaGFuZ2VzKTtcblxuICAgIGtleXMuZm9yRWFjaCgocHJvcGVydHk6IE56U2FmZUFueSkgPT4ge1xuICAgICAgaWYgKHRoaXMubmVlZFByb3h5UHJvcGVydGllcy5pbmRleE9mKHByb3BlcnR5KSAhPT0gLTEpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudFZhbHVlKHByb3BlcnR5LCB0aGlzW3Byb3BlcnR5XSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoaXNBcnJheSkge1xuICAgICAgdGhpcy51cGRhdGVDb21wb25lbnRWYWx1ZSgnbnpUaXRsZScsIHRoaXMudGl0bGUpO1xuICAgICAgdGhpcy51cGRhdGVDb21wb25lbnRWYWx1ZSgnbnpDb250ZW50JywgdGhpcy5jb250ZW50KTtcbiAgICAgIHRoaXMudXBkYXRlQ29tcG9uZW50VmFsdWUoJ256UGxhY2VtZW50JywgdGhpcy5wbGFjZW1lbnQpO1xuICAgICAgdGhpcy51cGRhdGVDb21wb25lbnRWYWx1ZSgnbnpUcmlnZ2VyJywgdGhpcy50cmlnZ2VyKTtcbiAgICAgIHRoaXMudXBkYXRlQ29tcG9uZW50VmFsdWUoJ256VmlzaWJsZScsIHRoaXMuaXNWaXNpYmxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYyA9IHByb3BlcnRpZXNPckNoYW5nZXMgYXMgU2ltcGxlQ2hhbmdlcztcbiAgICAgIGlmIChjLnNwZWNpZmljVGl0bGUgfHwgYy5kaXJlY3RpdmVOYW1lVGl0bGUgfHwgYy5uelRpdGxlKSB7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcG9uZW50VmFsdWUoJ256VGl0bGUnLCB0aGlzLnRpdGxlKTtcbiAgICAgIH1cbiAgICAgIGlmIChjLnNwZWNpZmljQ29udGVudCB8fCBjLmRpcmVjdGl2ZU5hbWVDb250ZW50IHx8IGMubnpDb250ZW50KSB7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcG9uZW50VmFsdWUoJ256Q29udGVudCcsIHRoaXMuY29udGVudCk7XG4gICAgICB9XG4gICAgICBpZiAoYy5zcGVjaWZpY1RyaWdnZXIgfHwgYy5uelRyaWdnZXIpIHtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wb25lbnRWYWx1ZSgnbnpUcmlnZ2VyJywgdGhpcy50cmlnZ2VyKTtcbiAgICAgIH1cbiAgICAgIGlmIChjLnNwZWNpZmljUGxhY2VtZW50IHx8IGMubnpQbGFjZW1lbnQpIHtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wb25lbnRWYWx1ZSgnbnpQbGFjZW1lbnQnLCB0aGlzLnBsYWNlbWVudCk7XG4gICAgICB9XG4gICAgICBpZiAoYy5zcGVjaWZpY1Zpc2libGUgfHwgYy5uelZpc2libGUpIHtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wb25lbnRWYWx1ZSgnbnpWaXNpYmxlJywgdGhpcy5pc1Zpc2libGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY29tcG9uZW50Py51cGRhdGVCeURpcmVjdGl2ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDb21wb25lbnRWYWx1ZShrZXk6IHN0cmluZywgdmFsdWU6IE56U2FmZUFueSk6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICB0aGlzLmNvbXBvbmVudFtrZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZWxheUVudGVyTGVhdmUoaXNPcmlnaW46IGJvb2xlYW4sIGlzRW50ZXI6IGJvb2xlYW4sIGRlbGF5OiBudW1iZXIgPSAtMSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRlbGF5VGltZXIpIHtcbiAgICAgIHRoaXMuY2xlYXJUb2dnbGluZ1RpbWVyKCk7XG4gICAgfSBlbHNlIGlmIChkZWxheSA+IDApIHtcbiAgICAgIHRoaXMuZGVsYXlUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmRlbGF5VGltZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlzRW50ZXIgPyB0aGlzLnNob3coKSA6IHRoaXMuaGlkZSgpO1xuICAgICAgfSwgZGVsYXkgKiAxMDAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYGlzT3JpZ2luYCBpcyB1c2VkIGR1ZSB0byB0aGUgdG9vbHRpcCB3aWxsIG5vdCBoaWRlIGltbWVkaWF0ZWx5XG4gICAgICAvLyAobWF5IGNhdXNlZCBieSB0aGUgZmFkZS1vdXQgYW5pbWF0aW9uKS5cbiAgICAgIGlzRW50ZXIgJiYgaXNPcmlnaW4gPyB0aGlzLnNob3coKSA6IHRoaXMuaGlkZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlVHJpZ2dlckxpc3RlbmVycygpOiB2b2lkIHtcbiAgICB0aGlzLnRyaWdnZXJEaXNwb3NhYmxlcy5mb3JFYWNoKGRpc3Bvc2UgPT4gZGlzcG9zZSgpKTtcbiAgICB0aGlzLnRyaWdnZXJEaXNwb3NhYmxlcy5sZW5ndGggPSAwO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhclRvZ2dsaW5nVGltZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGVsYXlUaW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZGVsYXlUaW1lcik7XG4gICAgICB0aGlzLmRlbGF5VGltZXIgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOelRvb2x0aXBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnb3ZlcmxheScsIHsgc3RhdGljOiBmYWxzZSB9KSBvdmVybGF5ITogQ2RrQ29ubmVjdGVkT3ZlcmxheTtcblxuICBuelZpc2libGVDaGFuZ2UgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuICBuelRpdGxlOiBOelRTVHlwZSB8IG51bGwgPSBudWxsO1xuICBuekNvbnRlbnQ6IE56VFNUeXBlIHwgbnVsbCA9IG51bGw7XG4gIG56T3ZlcmxheUNsYXNzTmFtZSE6IHN0cmluZztcbiAgbnpPdmVybGF5U3R5bGU6IE5nU3R5bGVJbnRlcmZhY2UgPSB7fTtcbiAgbnpNb3VzZUVudGVyRGVsYXk/OiBudW1iZXI7XG4gIG56TW91c2VMZWF2ZURlbGF5PzogbnVtYmVyO1xuXG4gIHNldCBuelZpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBjb25zdCB2aXNpYmxlID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgICBpZiAodGhpcy5fdmlzaWJsZSAhPT0gdmlzaWJsZSkge1xuICAgICAgdGhpcy5fdmlzaWJsZSA9IHZpc2libGU7XG4gICAgICB0aGlzLm56VmlzaWJsZUNoYW5nZS5uZXh0KHZpc2libGUpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBuelZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XG4gIH1cblxuICBfdmlzaWJsZSA9IGZhbHNlO1xuXG4gIHNldCBuelRyaWdnZXIodmFsdWU6IE56VG9vbHRpcFRyaWdnZXIpIHtcbiAgICB0aGlzLl90cmlnZ2VyID0gdmFsdWU7XG4gICAgdGhpcy5faGFzQmFja2Ryb3AgPSB0aGlzLl90cmlnZ2VyID09PSAnY2xpY2snO1xuICB9XG5cbiAgZ2V0IG56VHJpZ2dlcigpOiBOelRvb2x0aXBUcmlnZ2VyIHtcbiAgICByZXR1cm4gdGhpcy5fdHJpZ2dlcjtcbiAgfVxuXG4gIHByb3RlY3RlZCBfdHJpZ2dlcjogTnpUb29sdGlwVHJpZ2dlciA9ICdob3Zlcic7XG5cbiAgc2V0IG56UGxhY2VtZW50KHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMucHJlZmVycmVkUGxhY2VtZW50KSB7XG4gICAgICB0aGlzLnByZWZlcnJlZFBsYWNlbWVudCA9IHZhbHVlO1xuICAgICAgdGhpcy5fcG9zaXRpb25zID0gW1BPU0lUSU9OX01BUFt0aGlzLm56UGxhY2VtZW50XSwgLi4udGhpcy5fcG9zaXRpb25zXTtcbiAgICB9XG4gIH1cblxuICBnZXQgbnpQbGFjZW1lbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wcmVmZXJyZWRQbGFjZW1lbnQ7XG4gIH1cblxuICBvcmlnaW4/OiBDZGtPdmVybGF5T3JpZ2luO1xuICBwcmVmZXJyZWRQbGFjZW1lbnQgPSAndG9wJztcblxuICBfY2xhc3NNYXA6IE5nQ2xhc3NJbnRlcmZhY2UgPSB7fTtcbiAgX2hhc0JhY2tkcm9wID0gZmFsc2U7XG4gIF9wcmVmaXggPSAnYW50LXRvb2x0aXAtcGxhY2VtZW50JztcbiAgX3Bvc2l0aW9uczogQ29ubmVjdGlvblBvc2l0aW9uUGFpcltdID0gWy4uLkRFRkFVTFRfVE9PTFRJUF9QT1NJVElPTlNdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgbm9BbmltYXRpb24/OiBOek5vQW5pbWF0aW9uRGlyZWN0aXZlKSB7fVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMubnpWaXNpYmxlQ2hhbmdlLmNvbXBsZXRlKCk7XG4gIH1cblxuICBzaG93KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56VmlzaWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pc0VtcHR5KCkpIHtcbiAgICAgIHRoaXMubnpWaXNpYmxlID0gdHJ1ZTtcbiAgICAgIHRoaXMubnpWaXNpYmxlQ2hhbmdlLm5leHQodHJ1ZSk7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgaGlkZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubnpWaXNpYmxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5uelZpc2libGUgPSBmYWxzZTtcbiAgICB0aGlzLm56VmlzaWJsZUNoYW5nZS5uZXh0KGZhbHNlKTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICB1cGRhdGVCeURpcmVjdGl2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICB0aGlzLnVwZGF0ZVZpc2liaWxpdHlCeVRpdGxlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRm9yY2UgdGhlIGNvbXBvbmVudCB0byB1cGRhdGUgaXRzIHBvc2l0aW9uLlxuICAgKi9cbiAgdXBkYXRlUG9zaXRpb24oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3JpZ2luICYmIHRoaXMub3ZlcmxheSAmJiB0aGlzLm92ZXJsYXkub3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5vdmVybGF5Lm92ZXJsYXlSZWYudXBkYXRlUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBvblBvc2l0aW9uQ2hhbmdlKHBvc2l0aW9uOiBDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2UpOiB2b2lkIHtcbiAgICB0aGlzLnByZWZlcnJlZFBsYWNlbWVudCA9IGdldFBsYWNlbWVudE5hbWUocG9zaXRpb24pITtcbiAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgc2V0Q2xhc3NNYXAoKTogdm9pZCB7XG4gICAgdGhpcy5fY2xhc3NNYXAgPSB7XG4gICAgICBbdGhpcy5uek92ZXJsYXlDbGFzc05hbWVdOiB0cnVlLFxuICAgICAgW2Ake3RoaXMuX3ByZWZpeH0tJHt0aGlzLnByZWZlcnJlZFBsYWNlbWVudH1gXTogdHJ1ZVxuICAgIH07XG4gIH1cblxuICBzZXRPdmVybGF5T3JpZ2luKG9yaWdpbjogQ2RrT3ZlcmxheU9yaWdpbik6IHZvaWQge1xuICAgIHRoaXMub3JpZ2luID0gb3JpZ2luO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGUgdGhlIGNvbXBvbmVudCB3aGlsZSB0aGUgY29udGVudCBpcyBlbXB0eS5cbiAgICovXG4gIHByaXZhdGUgdXBkYXRlVmlzaWJpbGl0eUJ5VGl0bGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNFbXB0eSgpKSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRW1wdHkgY29tcG9uZW50IGNhbm5vdCBiZSBvcGVuZWQuXG4gICAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgaXNFbXB0eSgpOiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUb29sdGlwRW1wdHkodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbCk6IGJvb2xlYW4ge1xuICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZiA/IGZhbHNlIDogdmFsdWUgPT09ICcnIHx8ICFpc05vdE5pbCh2YWx1ZSk7XG59XG4iXX0=