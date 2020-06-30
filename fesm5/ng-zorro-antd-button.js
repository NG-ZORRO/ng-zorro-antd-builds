import { __decorate, __metadata } from 'tslib';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, ChangeDetectorRef, Renderer2, ContentChild, Input, NgModule } from '@angular/core';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzIconDirective, NzIconModule } from 'ng-zorro-antd/icon';
import { Subject } from 'rxjs';
import { takeUntil, startWith, filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ɵNzTransitionPatchModule } from 'ng-zorro-antd/core/transition-patch';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';

/**
 * @fileoverview added by tsickle
 * Generated from: button.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var NZ_CONFIG_COMPONENT_NAME = 'button';
var NzButtonComponent = /** @class */ (function () {
    function NzButtonComponent(elementRef, cdr, renderer, nzConfigService) {
        var _this = this;
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.renderer = renderer;
        this.nzConfigService = nzConfigService;
        this.nzBlock = false;
        this.nzGhost = false;
        this.nzSearch = false;
        this.nzLoading = false;
        this.nzDanger = false;
        this.disabled = false;
        this.tabIndex = null;
        this.nzType = null;
        this.nzShape = null;
        this.nzSize = 'default';
        this.destroy$ = new Subject();
        this.loading$ = new Subject();
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.cdr.markForCheck();
        }));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    NzButtonComponent.prototype.haltDisabledEvents = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    };
    /**
     * @param {?} nodes
     * @param {?} renderer
     * @return {?}
     */
    NzButtonComponent.prototype.insertSpan = /**
     * @param {?} nodes
     * @param {?} renderer
     * @return {?}
     */
    function (nodes, renderer) {
        nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            if (node.nodeName === '#text') {
                /** @type {?} */
                var span = renderer.createElement('span');
                /** @type {?} */
                var parent_1 = renderer.parentNode(node);
                renderer.insertBefore(parent_1, span, node);
                renderer.appendChild(span, node);
            }
        }));
    };
    /**
     * @param {?} element
     * @param {?} renderer
     * @return {?}
     */
    NzButtonComponent.prototype.assertIconOnly = /**
     * @param {?} element
     * @param {?} renderer
     * @return {?}
     */
    function (element, renderer) {
        /** @type {?} */
        var listOfNode = Array.from(element.childNodes);
        /** @type {?} */
        var iconCount = listOfNode.filter((/**
         * @param {?} node
         * @return {?}
         */
        function (node) { return node.nodeName === 'I'; })).length;
        /** @type {?} */
        var noText = listOfNode.every((/**
         * @param {?} node
         * @return {?}
         */
        function (node) { return node.nodeName !== '#text'; }));
        /** @type {?} */
        var noSpan = listOfNode.every((/**
         * @param {?} node
         * @return {?}
         */
        function (node) { return node.nodeName !== 'SPAN'; }));
        /** @type {?} */
        var isIconOnly = noSpan && noText && iconCount >= 1;
        if (isIconOnly) {
            renderer.addClass(element, 'ant-btn-icon-only');
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzButtonComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var nzLoading = changes.nzLoading;
        if (nzLoading) {
            this.loading$.next(this.nzLoading);
        }
    };
    /**
     * @return {?}
     */
    NzButtonComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.assertIconOnly(this.elementRef.nativeElement, this.renderer);
        this.insertSpan(this.elementRef.nativeElement.childNodes, this.renderer);
    };
    /**
     * @return {?}
     */
    NzButtonComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.loading$
            .pipe(startWith(this.nzLoading), filter((/**
         * @return {?}
         */
        function () { return !!_this.nzIconDirectiveElement; })), takeUntil(this.destroy$))
            .subscribe((/**
         * @param {?} loading
         * @return {?}
         */
        function (loading) {
            /** @type {?} */
            var nativeElement = _this.nzIconDirectiveElement.nativeElement;
            if (loading) {
                _this.renderer.setStyle(nativeElement, 'display', 'none');
            }
            else {
                _this.renderer.removeStyle(nativeElement, 'display');
            }
        }));
    };
    /**
     * @return {?}
     */
    NzButtonComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    NzButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'button[nz-button], a[nz-button]',
                    exportAs: 'nzButton',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <i nz-icon nzType=\"loading\" *ngIf=\"nzLoading\"></i>\n    <ng-content></ng-content>\n  ",
                    host: {
                        '[class.ant-btn]': "true",
                        '[class.ant-btn-primary]': "nzType === 'primary'",
                        '[class.ant-btn-dashed]': "nzType === 'dashed'",
                        '[class.ant-btn-link]': "nzType === 'link'",
                        '[class.ant-btn-danger]': "nzType === 'danger'",
                        '[class.ant-btn-circle]': "nzShape === 'circle'",
                        '[class.ant-btn-round]': "nzShape === 'round'",
                        '[class.ant-btn-lg]': "nzSize === 'large'",
                        '[class.ant-btn-sm]': "nzSize === 'small'",
                        '[class.ant-btn-dangerous]': "nzDanger",
                        '[class.ant-btn-loading]': "nzLoading",
                        '[class.ant-btn-background-ghost]': "nzGhost",
                        '[class.ant-btn-block]': "nzBlock",
                        '[class.ant-input-search-button]': "nzSearch",
                        '[attr.tabindex]': 'disabled ? -1 : (tabIndex === null ? null : tabIndex)',
                        '[attr.disabled]': 'disabled || null',
                        '(click)': 'haltDisabledEvents($event)'
                    }
                }] }
    ];
    /** @nocollapse */
    NzButtonComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 },
        { type: NzConfigService }
    ]; };
    NzButtonComponent.propDecorators = {
        nzIconDirectiveElement: [{ type: ContentChild, args: [NzIconDirective, { read: ElementRef },] }],
        nzBlock: [{ type: Input }],
        nzGhost: [{ type: Input }],
        nzSearch: [{ type: Input }],
        nzLoading: [{ type: Input }],
        nzDanger: [{ type: Input }],
        disabled: [{ type: Input }],
        tabIndex: [{ type: Input }],
        nzType: [{ type: Input }],
        nzShape: [{ type: Input }],
        nzSize: [{ type: Input }]
    };
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzButtonComponent.prototype, "nzBlock", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzButtonComponent.prototype, "nzGhost", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzButtonComponent.prototype, "nzSearch", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzButtonComponent.prototype, "nzLoading", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzButtonComponent.prototype, "nzDanger", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzButtonComponent.prototype, "disabled", void 0);
    __decorate([
        WithConfig(NZ_CONFIG_COMPONENT_NAME),
        __metadata("design:type", String)
    ], NzButtonComponent.prototype, "nzSize", void 0);
    return NzButtonComponent;
}());
if (false) {
    /** @type {?} */
    NzButtonComponent.ngAcceptInputType_nzBlock;
    /** @type {?} */
    NzButtonComponent.ngAcceptInputType_nzGhost;
    /** @type {?} */
    NzButtonComponent.ngAcceptInputType_nzSearch;
    /** @type {?} */
    NzButtonComponent.ngAcceptInputType_nzLoading;
    /** @type {?} */
    NzButtonComponent.ngAcceptInputType_nzDanger;
    /** @type {?} */
    NzButtonComponent.ngAcceptInputType_disabled;
    /** @type {?} */
    NzButtonComponent.prototype.nzIconDirectiveElement;
    /** @type {?} */
    NzButtonComponent.prototype.nzBlock;
    /** @type {?} */
    NzButtonComponent.prototype.nzGhost;
    /** @type {?} */
    NzButtonComponent.prototype.nzSearch;
    /** @type {?} */
    NzButtonComponent.prototype.nzLoading;
    /** @type {?} */
    NzButtonComponent.prototype.nzDanger;
    /** @type {?} */
    NzButtonComponent.prototype.disabled;
    /** @type {?} */
    NzButtonComponent.prototype.tabIndex;
    /** @type {?} */
    NzButtonComponent.prototype.nzType;
    /** @type {?} */
    NzButtonComponent.prototype.nzShape;
    /** @type {?} */
    NzButtonComponent.prototype.nzSize;
    /**
     * @type {?}
     * @private
     */
    NzButtonComponent.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    NzButtonComponent.prototype.loading$;
    /**
     * @type {?}
     * @private
     */
    NzButtonComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NzButtonComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    NzButtonComponent.prototype.renderer;
    /** @type {?} */
    NzButtonComponent.prototype.nzConfigService;
}

/**
 * @fileoverview added by tsickle
 * Generated from: button-group.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzButtonGroupComponent = /** @class */ (function () {
    function NzButtonGroupComponent() {
        this.nzSize = 'default';
    }
    NzButtonGroupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-button-group',
                    exportAs: 'nzButtonGroup',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '[class.ant-btn-group]': "true",
                        '[class.ant-btn-group-lg]': "nzSize === 'large'",
                        '[class.ant-btn-group-sm]': "nzSize === 'small'"
                    },
                    preserveWhitespaces: false,
                    template: " <ng-content></ng-content> "
                }] }
    ];
    NzButtonGroupComponent.propDecorators = {
        nzSize: [{ type: Input }]
    };
    return NzButtonGroupComponent;
}());
if (false) {
    /** @type {?} */
    NzButtonGroupComponent.prototype.nzSize;
}

/**
 * @fileoverview added by tsickle
 * Generated from: button.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzButtonModule = /** @class */ (function () {
    function NzButtonModule() {
    }
    NzButtonModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NzButtonComponent, NzButtonGroupComponent],
                    exports: [NzButtonComponent, NzButtonGroupComponent, ɵNzTransitionPatchModule, NzWaveModule],
                    imports: [CommonModule, NzWaveModule, NzIconModule, ɵNzTransitionPatchModule]
                },] }
    ];
    return NzButtonModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ng-zorro-antd-button.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NzButtonComponent, NzButtonGroupComponent, NzButtonModule };
//# sourceMappingURL=ng-zorro-antd-button.js.map
