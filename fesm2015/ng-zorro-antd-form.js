import { LayoutModule } from '@angular/cdk/layout';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { Directive, ElementRef, Renderer2, Input, Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, Optional, Host, ContentChild, SkipSelf, NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AbstractControl, NgModel, FormControlName, FormControlDirective, NgControl } from '@angular/forms';
import { helpMotion } from 'ng-zorro-antd/core/animation';
import { InputBoolean, toBoolean } from 'ng-zorro-antd/core/util';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { Subject, Subscription } from 'rxjs';
import { filter, map, tap, startWith, takeUntil } from 'rxjs/operators';
import { __decorate, __metadata } from 'tslib';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { warnDeprecation } from 'ng-zorro-antd/core/logger';

/**
 * @fileoverview added by tsickle
 * Generated from: form.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const NZ_CONFIG_COMPONENT_NAME = 'form';
class NzFormDirective {
    /**
     * @param {?} nzConfigService
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(nzConfigService, elementRef, renderer) {
        this.nzConfigService = nzConfigService;
        this.renderer = renderer;
        this.nzLayout = 'horizontal';
        this.nzNoColon = false;
        this.nzAutoTips = {};
        this.nzDisableAutoTips = false;
        this.destroy$ = new Subject();
        this.inputChanges$ = new Subject();
        this.renderer.addClass(elementRef.nativeElement, 'ant-form');
    }
    /**
     * @template K
     * @param {?} changeType
     * @return {?}
     */
    getInputObservable(changeType) {
        return this.inputChanges$.pipe(filter((/**
         * @param {?} changes
         * @return {?}
         */
        changes => changeType in changes)), map((/**
         * @param {?} value
         * @return {?}
         */
        value => value[(/** @type {?} */ (changeType))])));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.inputChanges$.next(changes);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzFormDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nz-form]',
                exportAs: 'nzForm',
                host: {
                    '[class.ant-form-horizontal]': `nzLayout === 'horizontal'`,
                    '[class.ant-form-vertical]': `nzLayout === 'vertical'`,
                    '[class.ant-form-inline]': `nzLayout === 'inline'`
                }
            },] }
];
/** @nocollapse */
NzFormDirective.ctorParameters = () => [
    { type: NzConfigService },
    { type: ElementRef },
    { type: Renderer2 }
];
NzFormDirective.propDecorators = {
    nzLayout: [{ type: Input }],
    nzNoColon: [{ type: Input }],
    nzAutoTips: [{ type: Input }],
    nzDisableAutoTips: [{ type: Input }]
};
__decorate([
    WithConfig(NZ_CONFIG_COMPONENT_NAME), InputBoolean(),
    __metadata("design:type", Boolean)
], NzFormDirective.prototype, "nzNoColon", void 0);
__decorate([
    WithConfig(NZ_CONFIG_COMPONENT_NAME),
    __metadata("design:type", Object)
], NzFormDirective.prototype, "nzAutoTips", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzFormDirective.prototype, "nzDisableAutoTips", void 0);
if (false) {
    /** @type {?} */
    NzFormDirective.ngAcceptInputType_nzNoColon;
    /** @type {?} */
    NzFormDirective.ngAcceptInputType_nzDisableAutoTips;
    /** @type {?} */
    NzFormDirective.prototype.nzLayout;
    /** @type {?} */
    NzFormDirective.prototype.nzNoColon;
    /** @type {?} */
    NzFormDirective.prototype.nzAutoTips;
    /** @type {?} */
    NzFormDirective.prototype.nzDisableAutoTips;
    /** @type {?} */
    NzFormDirective.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    NzFormDirective.prototype.inputChanges$;
    /** @type {?} */
    NzFormDirective.prototype.nzConfigService;
    /**
     * @type {?}
     * @private
     */
    NzFormDirective.prototype.renderer;
}

/**
 * @fileoverview added by tsickle
 * Generated from: form-item.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * should add nz-row directive to host, track https://github.com/angular/angular/issues/8785 *
 */
class NzFormItemComponent {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     * @param {?} cdr
     */
    constructor(elementRef, renderer, cdr) {
        this.cdr = cdr;
        this.status = null;
        this.hasFeedback = false;
        this.withHelpClass = false;
        this.destroy$ = new Subject();
        renderer.addClass(elementRef.nativeElement, 'ant-form-item');
    }
    /**
     * @deprecated 10.0.0. 'nzFlex' is deprecated and going to be removed in 10.0.0.
     * @param {?} _
     * @return {?}
     */
    set nzFlex(_) {
        warnDeprecation(`'nzFlex' is deprecated and going to be removed in 10.0.0.`);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setWithHelpViaTips(value) {
        this.withHelpClass = value;
        this.cdr.markForCheck();
    }
    /**
     * @param {?} status
     * @return {?}
     */
    setStatus(status) {
        this.status = status;
        this.cdr.markForCheck();
    }
    /**
     * @param {?} hasFeedback
     * @return {?}
     */
    setHasFeedback(hasFeedback) {
        this.hasFeedback = hasFeedback;
        this.cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzFormItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-form-item',
                exportAs: 'nzFormItem',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: {
                    '[class.ant-form-item-has-success]': 'status === "success"',
                    '[class.ant-form-item-has-warning]': 'status === "warning"',
                    '[class.ant-form-item-has-error]': 'status === "error"',
                    '[class.ant-form-item-is-validating]': 'status === "validating"',
                    '[class.ant-form-item-has-feedback]': 'hasFeedback && status',
                    '[class.ant-form-item-with-help]': 'withHelpClass'
                },
                template: ` <ng-content></ng-content> `
            }] }
];
/** @nocollapse */
NzFormItemComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
NzFormItemComponent.propDecorators = {
    nzFlex: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NzFormItemComponent.prototype.status;
    /** @type {?} */
    NzFormItemComponent.prototype.hasFeedback;
    /** @type {?} */
    NzFormItemComponent.prototype.withHelpClass;
    /**
     * @type {?}
     * @private
     */
    NzFormItemComponent.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    NzFormItemComponent.prototype.cdr;
}

/**
 * @fileoverview added by tsickle
 * Generated from: form-control.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const iconTypeMap = (/** @type {?} */ ({
    error: 'close-circle-fill',
    validating: 'loading',
    success: 'check-circle-fill',
    warning: 'exclamation-circle-fill'
}));
class NzFormControlComponent {
    /**
     * @param {?} elementRef
     * @param {?} nzFormItemComponent
     * @param {?} cdr
     * @param {?} renderer
     * @param {?} i18n
     * @param {?} nzFormDirective
     */
    constructor(elementRef, nzFormItemComponent, cdr, renderer, i18n, nzFormDirective) {
        var _a, _b;
        this.nzFormItemComponent = nzFormItemComponent;
        this.cdr = cdr;
        this.nzFormDirective = nzFormDirective;
        this._hasFeedback = false;
        this.validateChanges = Subscription.EMPTY;
        this.validateString = null;
        this.status = null;
        this.destroyed$ = new Subject();
        this.validateControl = null;
        this.iconType = null;
        this.innerTip = null;
        this.nzAutoTips = {};
        this.nzDisableAutoTips = 'default';
        renderer.addClass(elementRef.nativeElement, 'ant-form-item-control');
        this.subscribeAutoTips(i18n.localeChange.pipe(tap((/**
         * @param {?} locale
         * @return {?}
         */
        locale => (this.localeId = locale.locale)))));
        this.subscribeAutoTips((_a = this.nzFormDirective) === null || _a === void 0 ? void 0 : _a.getInputObservable('nzAutoTips'));
        this.subscribeAutoTips((_b = this.nzFormDirective) === null || _b === void 0 ? void 0 : _b.getInputObservable('nzDisableAutoTips').pipe(filter((/**
         * @return {?}
         */
        () => this.nzDisableAutoTips === 'default'))));
    }
    /**
     * @private
     * @return {?}
     */
    get disableAutoTips() {
        var _a;
        return this.nzDisableAutoTips !== 'default' ? toBoolean(this.nzDisableAutoTips) : (_a = this.nzFormDirective) === null || _a === void 0 ? void 0 : _a.nzDisableAutoTips;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzHasFeedback(value) {
        this._hasFeedback = toBoolean(value);
        if (this.nzFormItemComponent) {
            this.nzFormItemComponent.setHasFeedback(this._hasFeedback);
        }
    }
    /**
     * @return {?}
     */
    get nzHasFeedback() {
        return this._hasFeedback;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzValidateStatus(value) {
        if (value instanceof AbstractControl || value instanceof NgModel) {
            this.validateControl = value;
            this.validateString = null;
            this.watchControl();
        }
        else if (value instanceof FormControlName) {
            this.validateControl = value.control;
            this.validateString = null;
            this.watchControl();
        }
        else {
            this.validateString = value;
            this.validateControl = null;
            this.setStatus();
        }
    }
    /**
     * @private
     * @return {?}
     */
    watchControl() {
        this.validateChanges.unsubscribe();
        /** miss detect https://github.com/angular/angular/issues/10887 **/
        if (this.validateControl && this.validateControl.statusChanges) {
            this.validateChanges = this.validateControl.statusChanges.pipe(startWith(null), takeUntil(this.destroyed$)).subscribe((/**
             * @param {?} _
             * @return {?}
             */
            _ => {
                if (!this.disableAutoTips) {
                    this.updateAutoErrorTip();
                }
                this.setStatus();
                this.cdr.markForCheck();
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    setStatus() {
        this.status = this.getControlStatus(this.validateString);
        this.iconType = this.status ? iconTypeMap[this.status] : null;
        this.innerTip = this.getInnerTip(this.status);
        if (this.nzFormItemComponent) {
            this.nzFormItemComponent.setWithHelpViaTips(!!this.innerTip);
            this.nzFormItemComponent.setStatus(this.status);
        }
    }
    /**
     * @private
     * @param {?} validateString
     * @return {?}
     */
    getControlStatus(validateString) {
        /** @type {?} */
        let status;
        if (validateString === 'warning' || this.validateControlStatus('INVALID', 'warning')) {
            status = 'warning';
        }
        else if (validateString === 'error' || this.validateControlStatus('INVALID')) {
            status = 'error';
        }
        else if (validateString === 'validating' || validateString === 'pending' || this.validateControlStatus('PENDING')) {
            status = 'validating';
        }
        else if (validateString === 'success' || this.validateControlStatus('VALID')) {
            status = 'success';
        }
        else {
            status = null;
        }
        return status;
    }
    /**
     * @private
     * @param {?} validStatus
     * @param {?=} statusType
     * @return {?}
     */
    validateControlStatus(validStatus, statusType) {
        if (!this.validateControl) {
            return false;
        }
        else {
            const { dirty, touched, status } = this.validateControl;
            return (!!dirty || !!touched) && (statusType ? this.validateControl.hasError(statusType) : status === validStatus);
        }
    }
    /**
     * @private
     * @param {?} status
     * @return {?}
     */
    getInnerTip(status) {
        switch (status) {
            case 'error':
                return (!this.disableAutoTips && this.autoErrorTip) || this.nzErrorTip || null;
            case 'validating':
                return this.nzValidatingTip || null;
            case 'success':
                return this.nzSuccessTip || null;
            case 'warning':
                return this.nzWarningTip || null;
            default:
                return null;
        }
    }
    /**
     * @private
     * @return {?}
     */
    updateAutoErrorTip() {
        var _a, _b, _c, _d, _e, _f, _g;
        if (this.validateControl) {
            /** @type {?} */
            const errors = this.validateControl.errors || {};
            /** @type {?} */
            let autoErrorTip = '';
            for (const key in errors) {
                if (errors.hasOwnProperty(key)) {
                    autoErrorTip = (_d = (_a = errors[key][this.localeId]) !== null && _a !== void 0 ? _a : (_c = (_b = this.nzAutoTips) === null || _b === void 0 ? void 0 : _b[this.localeId]) === null || _c === void 0 ? void 0 : _c[key]) !== null && _d !== void 0 ? _d : (_g = (_f = (_e = this.nzFormDirective) === null || _e === void 0 ? void 0 : _e.nzAutoTips) === null || _f === void 0 ? void 0 : _f[this.localeId]) === null || _g === void 0 ? void 0 : _g[key];
                }
                if (!!autoErrorTip) {
                    break;
                }
            }
            this.autoErrorTip = autoErrorTip;
        }
    }
    /**
     * @private
     * @param {?} observable
     * @return {?}
     */
    subscribeAutoTips(observable) {
        observable === null || observable === void 0 ? void 0 : observable.pipe(takeUntil(this.destroyed$)).subscribe((/**
         * @return {?}
         */
        () => {
            if (!this.disableAutoTips) {
                this.updateAutoErrorTip();
                this.setStatus();
                this.cdr.markForCheck();
            }
        }));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const { nzDisableAutoTips, nzAutoTips, nzSuccessTip, nzWarningTip, nzErrorTip, nzValidatingTip } = changes;
        if (nzDisableAutoTips || nzAutoTips) {
            this.updateAutoErrorTip();
            this.setStatus();
        }
        else if (nzSuccessTip || nzWarningTip || nzErrorTip || nzValidatingTip) {
            this.setStatus();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.setStatus();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (!this.validateControl && !this.validateString) {
            if (this.defaultValidateControl instanceof FormControlDirective) {
                this.nzValidateStatus = this.defaultValidateControl.control;
            }
            else {
                this.nzValidateStatus = (/** @type {?} */ (this.defaultValidateControl));
            }
        }
    }
}
NzFormControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-form-control',
                exportAs: 'nzFormControl',
                preserveWhitespaces: false,
                animations: [helpMotion],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div class="ant-form-item-control-input">
      <div class="ant-form-item-control-input-content">
        <ng-content></ng-content>
      </div>
      <span class="ant-form-item-children-icon">
        <i *ngIf="nzHasFeedback && iconType" nz-icon [nzType]="iconType"></i>
      </span>
    </div>
    <div class="ant-form-item-explain" *ngIf="innerTip">
      <div @helpMotion>
        <ng-container *nzStringTemplateOutlet="innerTip; context: { $implicit: validateControl }">{{ innerTip }}</ng-container>
      </div>
    </div>
    <div class="ant-form-item-extra" *ngIf="nzExtra">
      <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
    </div>
  `
            }] }
];
/** @nocollapse */
NzFormControlComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NzFormItemComponent, decorators: [{ type: Optional }, { type: Host }] },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: NzI18nService },
    { type: NzFormDirective, decorators: [{ type: Optional }, { type: Host }] }
];
NzFormControlComponent.propDecorators = {
    defaultValidateControl: [{ type: ContentChild, args: [NgControl, { static: false },] }],
    nzSuccessTip: [{ type: Input }],
    nzWarningTip: [{ type: Input }],
    nzErrorTip: [{ type: Input }],
    nzValidatingTip: [{ type: Input }],
    nzExtra: [{ type: Input }],
    nzAutoTips: [{ type: Input }],
    nzDisableAutoTips: [{ type: Input }],
    nzHasFeedback: [{ type: Input }],
    nzValidateStatus: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NzFormControlComponent.ngAcceptInputType_nzHasFeedback;
    /** @type {?} */
    NzFormControlComponent.ngAcceptInputType_nzRequired;
    /** @type {?} */
    NzFormControlComponent.ngAcceptInputType_nzNoColon;
    /** @type {?} */
    NzFormControlComponent.ngAcceptInputType_nzDisableAutoTips;
    /**
     * @type {?}
     * @private
     */
    NzFormControlComponent.prototype._hasFeedback;
    /**
     * @type {?}
     * @private
     */
    NzFormControlComponent.prototype.validateChanges;
    /**
     * @type {?}
     * @private
     */
    NzFormControlComponent.prototype.validateString;
    /**
     * @type {?}
     * @private
     */
    NzFormControlComponent.prototype.status;
    /**
     * @type {?}
     * @private
     */
    NzFormControlComponent.prototype.destroyed$;
    /**
     * @type {?}
     * @private
     */
    NzFormControlComponent.prototype.localeId;
    /**
     * @type {?}
     * @private
     */
    NzFormControlComponent.prototype.autoErrorTip;
    /** @type {?} */
    NzFormControlComponent.prototype.validateControl;
    /** @type {?} */
    NzFormControlComponent.prototype.iconType;
    /** @type {?} */
    NzFormControlComponent.prototype.innerTip;
    /** @type {?} */
    NzFormControlComponent.prototype.defaultValidateControl;
    /** @type {?} */
    NzFormControlComponent.prototype.nzSuccessTip;
    /** @type {?} */
    NzFormControlComponent.prototype.nzWarningTip;
    /** @type {?} */
    NzFormControlComponent.prototype.nzErrorTip;
    /** @type {?} */
    NzFormControlComponent.prototype.nzValidatingTip;
    /** @type {?} */
    NzFormControlComponent.prototype.nzExtra;
    /** @type {?} */
    NzFormControlComponent.prototype.nzAutoTips;
    /** @type {?} */
    NzFormControlComponent.prototype.nzDisableAutoTips;
    /**
     * @type {?}
     * @private
     */
    NzFormControlComponent.prototype.nzFormItemComponent;
    /**
     * @type {?}
     * @private
     */
    NzFormControlComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    NzFormControlComponent.prototype.nzFormDirective;
}

/**
 * @fileoverview added by tsickle
 * Generated from: form-label.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzFormLabelComponent {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     * @param {?} cdr
     * @param {?} nzFormDirective
     */
    constructor(elementRef, renderer, cdr, nzFormDirective) {
        this.cdr = cdr;
        this.nzFormDirective = nzFormDirective;
        this.nzRequired = false;
        this.noColon = 'default';
        this.destroy$ = new Subject();
        renderer.addClass(elementRef.nativeElement, 'ant-form-item-label');
        if (this.nzFormDirective) {
            this.nzFormDirective
                .getInputObservable('nzNoColon')
                .pipe(filter((/**
             * @return {?}
             */
            () => this.noColon === 'default')), takeUntil(this.destroy$))
                .subscribe((/**
             * @return {?}
             */
            () => this.cdr.markForCheck()));
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzNoColon(value) {
        this.noColon = toBoolean(value);
    }
    /**
     * @return {?}
     */
    get nzNoColon() {
        var _a;
        return this.noColon !== 'default' ? this.noColon : (_a = this.nzFormDirective) === null || _a === void 0 ? void 0 : _a.nzNoColon;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzFormLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-form-label',
                exportAs: 'nzFormLabel',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <label [attr.for]="nzFor" [class.ant-form-item-no-colon]="nzNoColon" [class.ant-form-item-required]="nzRequired">
      <ng-content></ng-content>
    </label>
  `
            }] }
];
/** @nocollapse */
NzFormLabelComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: NzFormDirective, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
NzFormLabelComponent.propDecorators = {
    nzFor: [{ type: Input }],
    nzRequired: [{ type: Input }],
    nzNoColon: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzFormLabelComponent.prototype, "nzRequired", void 0);
if (false) {
    /** @type {?} */
    NzFormLabelComponent.ngAcceptInputType_nzRequired;
    /** @type {?} */
    NzFormLabelComponent.ngAcceptInputType_nzNoColon;
    /** @type {?} */
    NzFormLabelComponent.prototype.nzFor;
    /** @type {?} */
    NzFormLabelComponent.prototype.nzRequired;
    /** @type {?} */
    NzFormLabelComponent.prototype.noColon;
    /**
     * @type {?}
     * @private
     */
    NzFormLabelComponent.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    NzFormLabelComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    NzFormLabelComponent.prototype.nzFormDirective;
}

/**
 * @fileoverview added by tsickle
 * Generated from: form-split.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzFormSplitComponent {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.renderer.addClass(this.elementRef.nativeElement, 'ant-form-split');
    }
}
NzFormSplitComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-form-split',
                exportAs: 'nzFormSplit',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: ` <ng-content></ng-content> `
            }] }
];
/** @nocollapse */
NzFormSplitComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
if (false) {
    /** @type {?} */
    NzFormSplitComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NzFormSplitComponent.prototype.renderer;
}

/**
 * @fileoverview added by tsickle
 * Generated from: form-text.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzFormTextComponent {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.renderer.addClass(this.elementRef.nativeElement, 'ant-form-text');
    }
}
NzFormTextComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-form-text',
                exportAs: 'nzFormText',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: ` <ng-content></ng-content> `
            }] }
];
/** @nocollapse */
NzFormTextComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
if (false) {
    /** @type {?} */
    NzFormTextComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NzFormTextComponent.prototype.renderer;
}

/**
 * @fileoverview added by tsickle
 * Generated from: form.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzFormModule {
}
NzFormModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    NzFormDirective,
                    NzFormItemComponent,
                    NzFormLabelComponent,
                    NzFormControlComponent,
                    NzFormTextComponent,
                    NzFormSplitComponent
                ],
                exports: [
                    NzGridModule,
                    NzFormDirective,
                    NzFormItemComponent,
                    NzFormLabelComponent,
                    NzFormControlComponent,
                    NzFormTextComponent,
                    NzFormSplitComponent
                ],
                imports: [CommonModule, NzGridModule, NzIconModule, LayoutModule, PlatformModule, NzOutletModule]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ng-zorro-antd-form.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent, NzFormModule, NzFormSplitComponent, NzFormTextComponent };
//# sourceMappingURL=ng-zorro-antd-form.js.map
