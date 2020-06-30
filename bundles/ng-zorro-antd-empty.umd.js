(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/portal'), require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('ng-zorro-antd/core/config'), require('ng-zorro-antd/i18n'), require('@angular/common'), require('ng-zorro-antd/core/outlet')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/empty', ['exports', '@angular/cdk/portal', '@angular/core', 'rxjs', 'rxjs/operators', 'ng-zorro-antd/core/config', 'ng-zorro-antd/i18n', '@angular/common', 'ng-zorro-antd/core/outlet'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].empty = {}), global.ng.cdk.portal, global.ng.core, global.rxjs, global.rxjs.operators, global['ng-zorro-antd'].core.config, global['ng-zorro-antd'].i18n, global.ng.common, global['ng-zorro-antd'].core.outlet));
}(this, (function (exports, portal, core, rxjs, operators, config, i18n, common, outlet) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: config.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NZ_EMPTY_COMPONENT_NAME = new core.InjectionToken('nz-empty-component-name');

    /**
     * @fileoverview added by tsickle
     * Generated from: embed-empty.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} componentName
     * @return {?}
     */
    function getEmptySize(componentName) {
        switch (componentName) {
            case 'table':
            case 'list':
                return 'normal';
            case 'select':
            case 'tree-select':
            case 'cascader':
            case 'transfer':
                return 'small';
            default:
                return '';
        }
    }
    var NzEmbedEmptyComponent = /** @class */ (function () {
        function NzEmbedEmptyComponent(configService, viewContainerRef, cdr, injector) {
            this.configService = configService;
            this.viewContainerRef = viewContainerRef;
            this.cdr = cdr;
            this.injector = injector;
            this.contentType = 'string';
            this.size = '';
            this.destroy$ = new rxjs.Subject();
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        NzEmbedEmptyComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.nzComponentName) {
                this.size = getEmptySize(changes.nzComponentName.currentValue);
            }
            if (changes.specificContent && !changes.specificContent.isFirstChange()) {
                this.content = changes.specificContent.currentValue;
                this.renderEmpty();
            }
        };
        /**
         * @return {?}
         */
        NzEmbedEmptyComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.subscribeDefaultEmptyContentChange();
        };
        /**
         * @return {?}
         */
        NzEmbedEmptyComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        /**
         * @private
         * @return {?}
         */
        NzEmbedEmptyComponent.prototype.renderEmpty = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var content = this.content;
            if (typeof content === 'string') {
                this.contentType = 'string';
            }
            else if (content instanceof core.TemplateRef) {
                /** @type {?} */
                var context = (/** @type {?} */ ({ $implicit: this.nzComponentName }));
                this.contentType = 'template';
                this.contentPortal = new portal.TemplatePortal(content, this.viewContainerRef, context);
            }
            else if (content instanceof core.Type) {
                /** @type {?} */
                var context = new WeakMap([[NZ_EMPTY_COMPONENT_NAME, this.nzComponentName]]);
                /** @type {?} */
                var injector = new portal.PortalInjector(this.injector, context);
                this.contentType = 'component';
                this.contentPortal = new portal.ComponentPortal(content, this.viewContainerRef, injector);
            }
            else {
                this.contentType = 'string';
                this.contentPortal = undefined;
            }
            this.cdr.detectChanges();
        };
        /**
         * @private
         * @return {?}
         */
        NzEmbedEmptyComponent.prototype.subscribeDefaultEmptyContentChange = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.configService
                .getConfigChangeEventForComponent('empty')
                .pipe(operators.startWith(true), operators.takeUntil(this.destroy$))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.content = _this.specificContent || _this.getUserDefaultEmptyContent();
                _this.renderEmpty();
            }));
        };
        /**
         * @private
         * @return {?}
         */
        NzEmbedEmptyComponent.prototype.getUserDefaultEmptyContent = /**
         * @private
         * @return {?}
         */
        function () {
            return (this.configService.getConfigForComponent('empty') || {}).nzDefaultEmptyContent;
        };
        NzEmbedEmptyComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        selector: 'nz-embed-empty',
                        exportAs: 'nzEmbedEmpty',
                        template: "\n    <ng-container *ngIf=\"!content && specificContent !== null\" [ngSwitch]=\"size\">\n      <nz-empty *ngSwitchCase=\"'normal'\" class=\"ant-empty-normal\" [nzNotFoundImage]=\"'simple'\"></nz-empty>\n      <nz-empty *ngSwitchCase=\"'small'\" class=\"ant-empty-small\" [nzNotFoundImage]=\"'simple'\"></nz-empty>\n      <nz-empty *ngSwitchDefault></nz-empty>\n    </ng-container>\n    <ng-container *ngIf=\"content\">\n      <ng-template *ngIf=\"contentType !== 'string'\" [cdkPortalOutlet]=\"contentPortal\"></ng-template>\n      <ng-container *ngIf=\"contentType === 'string'\">\n        {{ content }}\n      </ng-container>\n    </ng-container>\n  "
                    }] }
        ];
        /** @nocollapse */
        NzEmbedEmptyComponent.ctorParameters = function () { return [
            { type: config.NzConfigService },
            { type: core.ViewContainerRef },
            { type: core.ChangeDetectorRef },
            { type: core.Injector }
        ]; };
        NzEmbedEmptyComponent.propDecorators = {
            nzComponentName: [{ type: core.Input }],
            specificContent: [{ type: core.Input }]
        };
        return NzEmbedEmptyComponent;
    }());
    if (false) {
        /** @type {?} */
        NzEmbedEmptyComponent.prototype.nzComponentName;
        /** @type {?} */
        NzEmbedEmptyComponent.prototype.specificContent;
        /** @type {?} */
        NzEmbedEmptyComponent.prototype.content;
        /** @type {?} */
        NzEmbedEmptyComponent.prototype.contentType;
        /** @type {?} */
        NzEmbedEmptyComponent.prototype.contentPortal;
        /** @type {?} */
        NzEmbedEmptyComponent.prototype.size;
        /**
         * @type {?}
         * @private
         */
        NzEmbedEmptyComponent.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzEmbedEmptyComponent.prototype.configService;
        /**
         * @type {?}
         * @private
         */
        NzEmbedEmptyComponent.prototype.viewContainerRef;
        /**
         * @type {?}
         * @private
         */
        NzEmbedEmptyComponent.prototype.cdr;
        /**
         * @type {?}
         * @private
         */
        NzEmbedEmptyComponent.prototype.injector;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: empty.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NzEmptyDefaultImages = (/** @type {?} */ (['default', 'simple']));
    var NzEmptyComponent = /** @class */ (function () {
        function NzEmptyComponent(i18n, cdr) {
            this.i18n = i18n;
            this.cdr = cdr;
            this.nzNotFoundImage = 'default';
            this.isContentString = false;
            this.isImageBuildIn = true;
            this.destroy$ = new rxjs.Subject();
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        NzEmptyComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var nzNotFoundContent = changes.nzNotFoundContent, nzNotFoundImage = changes.nzNotFoundImage;
            if (nzNotFoundContent) {
                /** @type {?} */
                var content = nzNotFoundContent.currentValue;
                this.isContentString = typeof content === 'string';
            }
            if (nzNotFoundImage) {
                /** @type {?} */
                var image_1 = nzNotFoundImage.currentValue || 'default';
                this.isImageBuildIn = NzEmptyDefaultImages.findIndex((/**
                 * @param {?} i
                 * @return {?}
                 */
                function (i) { return i === image_1; })) > -1;
            }
        };
        /**
         * @return {?}
         */
        NzEmptyComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.i18n.localeChange.pipe(operators.takeUntil(this.destroy$)).subscribe((/**
             * @return {?}
             */
            function () {
                _this.locale = _this.i18n.getLocaleData('Empty');
                _this.cdr.markForCheck();
            }));
        };
        /**
         * @return {?}
         */
        NzEmptyComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzEmptyComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        selector: 'nz-empty',
                        exportAs: 'nzEmpty',
                        template: "\n    <div class=\"ant-empty-image\">\n      <ng-container *ngIf=\"!isImageBuildIn\">\n        <ng-container *nzStringTemplateOutlet=\"nzNotFoundImage\">\n          <img [src]=\"nzNotFoundImage\" [alt]=\"isContentString ? nzNotFoundContent : 'empty'\" />\n        </ng-container>\n      </ng-container>\n      <nz-empty-default *ngIf=\"isImageBuildIn && nzNotFoundImage !== 'simple'\"></nz-empty-default>\n      <nz-empty-simple *ngIf=\"isImageBuildIn && nzNotFoundImage === 'simple'\"></nz-empty-simple>\n    </div>\n    <p class=\"ant-empty-description\" *ngIf=\"nzNotFoundContent !== null\">\n      <ng-container *nzStringTemplateOutlet=\"nzNotFoundContent\">\n        {{ isContentString ? nzNotFoundContent : locale['description'] }}\n      </ng-container>\n    </p>\n    <div class=\"ant-empty-footer\" *ngIf=\"nzNotFoundFooter\">\n      <ng-container *nzStringTemplateOutlet=\"nzNotFoundFooter\">\n        {{ nzNotFoundFooter }}\n      </ng-container>\n    </div>\n  ",
                        host: {
                            class: 'ant-empty'
                        }
                    }] }
        ];
        /** @nocollapse */
        NzEmptyComponent.ctorParameters = function () { return [
            { type: i18n.NzI18nService },
            { type: core.ChangeDetectorRef }
        ]; };
        NzEmptyComponent.propDecorators = {
            nzNotFoundImage: [{ type: core.Input }],
            nzNotFoundContent: [{ type: core.Input }],
            nzNotFoundFooter: [{ type: core.Input }]
        };
        return NzEmptyComponent;
    }());
    if (false) {
        /** @type {?} */
        NzEmptyComponent.prototype.nzNotFoundImage;
        /** @type {?} */
        NzEmptyComponent.prototype.nzNotFoundContent;
        /** @type {?} */
        NzEmptyComponent.prototype.nzNotFoundFooter;
        /** @type {?} */
        NzEmptyComponent.prototype.isContentString;
        /** @type {?} */
        NzEmptyComponent.prototype.isImageBuildIn;
        /** @type {?} */
        NzEmptyComponent.prototype.locale;
        /**
         * @type {?}
         * @private
         */
        NzEmptyComponent.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NzEmptyComponent.prototype.i18n;
        /**
         * @type {?}
         * @private
         */
        NzEmptyComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: partial/default.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzEmptyDefaultComponent = /** @class */ (function () {
        function NzEmptyDefaultComponent() {
        }
        NzEmptyDefaultComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        selector: 'nz-empty-default',
                        exportAs: 'nzEmptyDefault',
                        template: "\n    <svg class=\"ant-empty-img-default\" width=\"184\" height=\"152\" viewBox=\"0 0 184 152\" xmlns=\"http://www.w3.org/2000/svg\">\n      <g fill=\"none\" fill-rule=\"evenodd\">\n        <g transform=\"translate(24 31.67)\">\n          <ellipse class=\"ant-empty-img-default-ellipse\" cx=\"67.797\" cy=\"106.89\" rx=\"67.797\" ry=\"12.668\" />\n          <path\n            class=\"ant-empty-img-default-path-1\"\n            d=\"M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z\"\n          />\n          <path\n            class=\"ant-empty-img-default-path-2\"\n            d=\"M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z\"\n            transform=\"translate(13.56)\"\n          />\n          <path\n            class=\"ant-empty-img-default-path-3\"\n            d=\"M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z\"\n          />\n          <path\n            class=\"ant-empty-img-default-path-4\"\n            d=\"M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z\"\n          />\n        </g>\n        <path\n          class=\"ant-empty-img-default-path-5\"\n          d=\"M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z\"\n        />\n        <g class=\"ant-empty-img-default-g\" transform=\"translate(149.65 15.383)\">\n          <ellipse cx=\"20.654\" cy=\"3.167\" rx=\"2.849\" ry=\"2.815\" />\n          <path d=\"M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z\" />\n        </g>\n      </g>\n    </svg>\n  "
                    }] }
        ];
        return NzEmptyDefaultComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: partial/simple.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzEmptySimpleComponent = /** @class */ (function () {
        function NzEmptySimpleComponent() {
        }
        NzEmptySimpleComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        selector: 'nz-empty-simple',
                        exportAs: 'nzEmptySimple',
                        template: "\n    <svg class=\"ant-empty-img-simple\" width=\"64\" height=\"41\" viewBox=\"0 0 64 41\" xmlns=\"http://www.w3.org/2000/svg\">\n      <g transform=\"translate(0 1)\" fill=\"none\" fill-rule=\"evenodd\">\n        <ellipse class=\"ant-empty-img-simple-ellipse\" cx=\"32\" cy=\"33\" rx=\"32\" ry=\"7\" />\n        <g class=\"ant-empty-img-simple-g\" fill-rule=\"nonzero\">\n          <path d=\"M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z\" />\n          <path\n            d=\"M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z\"\n            class=\"ant-empty-img-simple-path\"\n          />\n        </g>\n      </g>\n    </svg>\n  "
                    }] }
        ];
        return NzEmptySimpleComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: empty.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzEmptyModule = /** @class */ (function () {
        function NzEmptyModule() {
        }
        NzEmptyModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, portal.PortalModule, outlet.NzOutletModule, i18n.NzI18nModule],
                        declarations: [NzEmptyComponent, NzEmbedEmptyComponent, NzEmptyDefaultComponent, NzEmptySimpleComponent],
                        exports: [NzEmptyComponent, NzEmbedEmptyComponent]
                    },] }
        ];
        return NzEmptyModule;
    }());

    exports.NZ_EMPTY_COMPONENT_NAME = NZ_EMPTY_COMPONENT_NAME;
    exports.NzEmbedEmptyComponent = NzEmbedEmptyComponent;
    exports.NzEmptyComponent = NzEmptyComponent;
    exports.NzEmptyDefaultComponent = NzEmptyDefaultComponent;
    exports.NzEmptyModule = NzEmptyModule;
    exports.NzEmptySimpleComponent = NzEmptySimpleComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-empty.umd.js.map
