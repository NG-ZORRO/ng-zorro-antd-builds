import { Location, CommonModule } from '@angular/common';
import { Directive, EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Optional, ElementRef, ChangeDetectorRef, Input, Output, ContentChild, NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { __read, __decorate, __metadata } from 'tslib';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { PREFIX } from 'ng-zorro-antd/core/logger';
import { NzResizeObserver } from 'ng-zorro-antd/core/resize-observers';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * Generated from: page-header-cells.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzPageHeaderTitleDirective = /** @class */ (function () {
    function NzPageHeaderTitleDirective() {
    }
    NzPageHeaderTitleDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'nz-page-header-title, [nz-page-header-title]',
                    exportAs: 'nzPageHeaderTitle',
                    host: {
                        class: 'ant-page-header-heading-title'
                    }
                },] }
    ];
    return NzPageHeaderTitleDirective;
}());
var NzPageHeaderSubtitleDirective = /** @class */ (function () {
    function NzPageHeaderSubtitleDirective() {
    }
    NzPageHeaderSubtitleDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'nz-page-header-subtitle, [nz-page-header-subtitle]',
                    exportAs: 'nzPageHeaderSubtitle',
                    host: {
                        class: 'ant-page-header-heading-sub-title'
                    }
                },] }
    ];
    return NzPageHeaderSubtitleDirective;
}());
var NzPageHeaderContentDirective = /** @class */ (function () {
    function NzPageHeaderContentDirective() {
    }
    NzPageHeaderContentDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'nz-page-header-content, [nz-page-header-content]',
                    exportAs: 'nzPageHeaderContent',
                    host: {
                        class: 'ant-page-header-content'
                    }
                },] }
    ];
    return NzPageHeaderContentDirective;
}());
var NzPageHeaderTagDirective = /** @class */ (function () {
    function NzPageHeaderTagDirective() {
    }
    NzPageHeaderTagDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'nz-page-header-tags, [nz-page-header-tags]',
                    exportAs: 'nzPageHeaderTags',
                    host: {
                        class: 'ant-page-header-heading-tags'
                    }
                },] }
    ];
    return NzPageHeaderTagDirective;
}());
var NzPageHeaderExtraDirective = /** @class */ (function () {
    function NzPageHeaderExtraDirective() {
    }
    NzPageHeaderExtraDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'nz-page-header-extra, [nz-page-header-extra]',
                    exportAs: 'nzPageHeaderExtra',
                    host: {
                        class: 'ant-page-header-heading-extra'
                    }
                },] }
    ];
    return NzPageHeaderExtraDirective;
}());
var NzPageHeaderFooterDirective = /** @class */ (function () {
    function NzPageHeaderFooterDirective() {
    }
    NzPageHeaderFooterDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'nz-page-header-footer, [nz-page-header-footer]',
                    exportAs: 'nzPageHeaderFooter',
                    host: {
                        class: 'ant-page-header-footer'
                    }
                },] }
    ];
    return NzPageHeaderFooterDirective;
}());
var NzPageHeaderBreadcrumbDirective = /** @class */ (function () {
    function NzPageHeaderBreadcrumbDirective() {
    }
    NzPageHeaderBreadcrumbDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'nz-breadcrumb[nz-page-header-breadcrumb]',
                    exportAs: 'nzPageHeaderBreadcrumb'
                },] }
    ];
    return NzPageHeaderBreadcrumbDirective;
}());
var NzPageHeaderAvatarDirective = /** @class */ (function () {
    function NzPageHeaderAvatarDirective() {
    }
    NzPageHeaderAvatarDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'nz-avatar[nz-page-header-avatar]',
                    exportAs: 'nzPageHeaderAvatar'
                },] }
    ];
    return NzPageHeaderAvatarDirective;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: page-header.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var NZ_CONFIG_COMPONENT_NAME = 'pageHeader';
var NzPageHeaderComponent = /** @class */ (function () {
    function NzPageHeaderComponent(location, nzConfigService, elementRef, nzResizeObserver, cdr) {
        this.location = location;
        this.nzConfigService = nzConfigService;
        this.elementRef = elementRef;
        this.nzResizeObserver = nzResizeObserver;
        this.cdr = cdr;
        this.nzBackIcon = null;
        this.nzGhost = true;
        this.nzBack = new EventEmitter();
        this.compact = false;
        this.destroy$ = new Subject();
    }
    /**
     * @return {?}
     */
    NzPageHeaderComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.nzResizeObserver
            .observe(this.elementRef)
            .pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 1), entry = _b[0];
            return entry.contentRect.width;
        })), takeUntil(this.destroy$))
            .subscribe((/**
         * @param {?} width
         * @return {?}
         */
        function (width) {
            _this.compact = width < 768;
            _this.cdr.markForCheck();
        }));
    };
    /**
     * @return {?}
     */
    NzPageHeaderComponent.prototype.onBack = /**
     * @return {?}
     */
    function () {
        if (this.nzBack.observers.length) {
            this.nzBack.emit();
        }
        else {
            if (!this.location) {
                throw new Error(PREFIX + " you should import 'RouterModule' or register 'Location' if you want to use 'nzBack' default event!");
            }
            this.location.back();
        }
    };
    /**
     * @return {?}
     */
    NzPageHeaderComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    NzPageHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-page-header',
                    exportAs: 'nzPageHeader',
                    template: "\n    <ng-content select=\"nz-breadcrumb[nz-page-header-breadcrumb]\"></ng-content>\n\n    <div class=\"ant-page-header-heading\">\n      <div class=\"ant-page-header-heading-left\">\n        <!--back-->\n        <div *ngIf=\"nzBackIcon !== null\" (click)=\"onBack()\" class=\"ant-page-header-back\">\n          <div role=\"button\" tabindex=\"0\" class=\"ant-page-header-back-button\">\n            <ng-container *nzStringTemplateOutlet=\"nzBackIcon; let backIcon\">\n              <i nz-icon [nzType]=\"backIcon || 'arrow-left'\" nzTheme=\"outline\"></i>\n            </ng-container>\n          </div>\n        </div>\n        <!--avatar-->\n        <ng-content select=\"nz-avatar[nz-page-header-avatar]\"></ng-content>\n        <!--title-->\n        <span class=\"ant-page-header-heading-title\" *ngIf=\"nzTitle\">\n          <ng-container *nzStringTemplateOutlet=\"nzTitle\">{{ nzTitle }}</ng-container>\n        </span>\n        <ng-content *ngIf=\"!nzTitle\" select=\"nz-page-header-title, [nz-page-header-title]\"></ng-content>\n        <!--subtitle-->\n        <span class=\"ant-page-header-heading-sub-title\" *ngIf=\"nzSubtitle\">\n          <ng-container *nzStringTemplateOutlet=\"nzSubtitle\">{{ nzSubtitle }}</ng-container>\n        </span>\n        <ng-content *ngIf=\"!nzSubtitle\" select=\"nz-page-header-subtitle, [nz-page-header-subtitle]\"></ng-content>\n        <ng-content select=\"nz-page-header-tags, [nz-page-header-tags]\"></ng-content>\n      </div>\n\n      <ng-content select=\"nz-page-header-extra, [nz-page-header-extra]\"></ng-content>\n    </div>\n\n    <ng-content select=\"nz-page-header-content, [nz-page-header-content]\"></ng-content>\n    <ng-content select=\"nz-page-header-footer, [nz-page-header-footer]\"></ng-content>\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'ant-page-header',
                        '[class.has-footer]': 'nzPageHeaderFooter',
                        '[class.ant-page-header-ghost]': 'nzGhost',
                        '[class.has-breadcrumb]': 'nzPageHeaderBreadcrumb',
                        '[class.ant-page-header-compact]': 'compact'
                    }
                }] }
    ];
    /** @nocollapse */
    NzPageHeaderComponent.ctorParameters = function () { return [
        { type: Location, decorators: [{ type: Optional }] },
        { type: NzConfigService },
        { type: ElementRef },
        { type: NzResizeObserver },
        { type: ChangeDetectorRef }
    ]; };
    NzPageHeaderComponent.propDecorators = {
        nzBackIcon: [{ type: Input }],
        nzTitle: [{ type: Input }],
        nzSubtitle: [{ type: Input }],
        nzGhost: [{ type: Input }],
        nzBack: [{ type: Output }],
        nzPageHeaderFooter: [{ type: ContentChild, args: [NzPageHeaderFooterDirective, { static: false },] }],
        nzPageHeaderBreadcrumb: [{ type: ContentChild, args: [NzPageHeaderBreadcrumbDirective, { static: false },] }]
    };
    __decorate([
        WithConfig(NZ_CONFIG_COMPONENT_NAME),
        __metadata("design:type", Boolean)
    ], NzPageHeaderComponent.prototype, "nzGhost", void 0);
    return NzPageHeaderComponent;
}());
if (false) {
    /** @type {?} */
    NzPageHeaderComponent.prototype.nzBackIcon;
    /** @type {?} */
    NzPageHeaderComponent.prototype.nzTitle;
    /** @type {?} */
    NzPageHeaderComponent.prototype.nzSubtitle;
    /** @type {?} */
    NzPageHeaderComponent.prototype.nzGhost;
    /** @type {?} */
    NzPageHeaderComponent.prototype.nzBack;
    /** @type {?} */
    NzPageHeaderComponent.prototype.nzPageHeaderFooter;
    /** @type {?} */
    NzPageHeaderComponent.prototype.nzPageHeaderBreadcrumb;
    /** @type {?} */
    NzPageHeaderComponent.prototype.compact;
    /** @type {?} */
    NzPageHeaderComponent.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    NzPageHeaderComponent.prototype.location;
    /** @type {?} */
    NzPageHeaderComponent.prototype.nzConfigService;
    /**
     * @type {?}
     * @private
     */
    NzPageHeaderComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NzPageHeaderComponent.prototype.nzResizeObserver;
    /**
     * @type {?}
     * @private
     */
    NzPageHeaderComponent.prototype.cdr;
}

/**
 * @fileoverview added by tsickle
 * Generated from: page-header.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var NzPageHeaderCells = [
    NzPageHeaderTitleDirective,
    NzPageHeaderSubtitleDirective,
    NzPageHeaderContentDirective,
    NzPageHeaderTagDirective,
    NzPageHeaderExtraDirective,
    NzPageHeaderFooterDirective,
    NzPageHeaderBreadcrumbDirective,
    NzPageHeaderAvatarDirective
];
var NzPageHeaderModule = /** @class */ (function () {
    function NzPageHeaderModule() {
    }
    NzPageHeaderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, NzOutletModule, NzIconModule],
                    exports: [NzPageHeaderComponent, NzPageHeaderCells],
                    declarations: [NzPageHeaderComponent, NzPageHeaderCells]
                },] }
    ];
    return NzPageHeaderModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ng-zorro-antd-page-header.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NzPageHeaderAvatarDirective, NzPageHeaderBreadcrumbDirective, NzPageHeaderComponent, NzPageHeaderContentDirective, NzPageHeaderExtraDirective, NzPageHeaderFooterDirective, NzPageHeaderModule, NzPageHeaderSubtitleDirective, NzPageHeaderTagDirective, NzPageHeaderTitleDirective };
//# sourceMappingURL=ng-zorro-antd-page-header.js.map
