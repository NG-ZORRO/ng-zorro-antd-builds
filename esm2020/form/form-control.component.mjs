/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ContentChild, Host, Input, Optional, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControlDirective, FormControlName, NgControl, NgModel } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { filter, startWith, takeUntil, tap } from 'rxjs/operators';
import { helpMotion } from 'ng-zorro-antd/core/animation';
import { toBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "./form-item.component";
import * as i2 from "ng-zorro-antd/i18n";
import * as i3 from "./form.directive";
import * as i4 from "@angular/common";
import * as i5 from "ng-zorro-antd/icon";
import * as i6 from "ng-zorro-antd/core/outlet";
const iconTypeMap = {
    error: 'close-circle-fill',
    validating: 'loading',
    success: 'check-circle-fill',
    warning: 'exclamation-circle-fill'
};
export class NzFormControlComponent {
    constructor(elementRef, nzFormItemComponent, cdr, renderer, i18n, nzFormDirective) {
        this.nzFormItemComponent = nzFormItemComponent;
        this.cdr = cdr;
        this.nzFormDirective = nzFormDirective;
        this._hasFeedback = false;
        this.validateChanges = Subscription.EMPTY;
        this.validateString = null;
        this.destroyed$ = new Subject();
        this.status = null;
        this.validateControl = null;
        this.iconType = null;
        this.innerTip = null;
        this.nzAutoTips = {};
        this.nzDisableAutoTips = 'default';
        renderer.addClass(elementRef.nativeElement, 'ant-form-item-control');
        this.subscribeAutoTips(i18n.localeChange.pipe(tap(locale => (this.localeId = locale.locale))));
        this.subscribeAutoTips(this.nzFormDirective?.getInputObservable('nzAutoTips'));
        this.subscribeAutoTips(this.nzFormDirective
            ?.getInputObservable('nzDisableAutoTips')
            .pipe(filter(() => this.nzDisableAutoTips === 'default')));
    }
    get disableAutoTips() {
        return this.nzDisableAutoTips !== 'default'
            ? toBoolean(this.nzDisableAutoTips)
            : this.nzFormDirective?.nzDisableAutoTips;
    }
    set nzHasFeedback(value) {
        this._hasFeedback = toBoolean(value);
        if (this.nzFormItemComponent) {
            this.nzFormItemComponent.setHasFeedback(this._hasFeedback);
        }
    }
    get nzHasFeedback() {
        return this._hasFeedback;
    }
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
    watchControl() {
        this.validateChanges.unsubscribe();
        /** miss detect https://github.com/angular/angular/issues/10887 **/
        if (this.validateControl && this.validateControl.statusChanges) {
            this.validateChanges = this.validateControl.statusChanges
                .pipe(startWith(null), takeUntil(this.destroyed$))
                .subscribe(_ => {
                if (!this.disableAutoTips) {
                    this.updateAutoErrorTip();
                }
                this.setStatus();
                this.cdr.markForCheck();
            });
        }
    }
    setStatus() {
        this.status = this.getControlStatus(this.validateString);
        this.iconType = this.status ? iconTypeMap[this.status] : null;
        this.innerTip = this.getInnerTip(this.status);
        if (this.nzFormItemComponent) {
            this.nzFormItemComponent.setWithHelpViaTips(!!this.innerTip);
            this.nzFormItemComponent.setStatus(this.status);
        }
    }
    getControlStatus(validateString) {
        let status;
        if (validateString === 'warning' || this.validateControlStatus('INVALID', 'warning')) {
            status = 'warning';
        }
        else if (validateString === 'error' || this.validateControlStatus('INVALID')) {
            status = 'error';
        }
        else if (validateString === 'validating' ||
            validateString === 'pending' ||
            this.validateControlStatus('PENDING')) {
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
    validateControlStatus(validStatus, statusType) {
        if (!this.validateControl) {
            return false;
        }
        else {
            const { dirty, touched, status } = this.validateControl;
            return ((!!dirty || !!touched) && (statusType ? this.validateControl.hasError(statusType) : status === validStatus));
        }
    }
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
    updateAutoErrorTip() {
        if (this.validateControl) {
            const errors = this.validateControl.errors || {};
            let autoErrorTip = '';
            for (const key in errors) {
                if (errors.hasOwnProperty(key)) {
                    autoErrorTip =
                        errors[key]?.[this.localeId] ??
                            this.nzAutoTips?.[this.localeId]?.[key] ??
                            this.nzAutoTips.default?.[key] ??
                            this.nzFormDirective?.nzAutoTips?.[this.localeId]?.[key] ??
                            this.nzFormDirective?.nzAutoTips.default?.[key];
                }
                if (!!autoErrorTip) {
                    break;
                }
            }
            this.autoErrorTip = autoErrorTip;
        }
    }
    subscribeAutoTips(observable) {
        observable?.pipe(takeUntil(this.destroyed$)).subscribe(() => {
            if (!this.disableAutoTips) {
                this.updateAutoErrorTip();
                this.setStatus();
                this.cdr.markForCheck();
            }
        });
    }
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
    ngOnInit() {
        this.setStatus();
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    ngAfterContentInit() {
        if (!this.validateControl && !this.validateString) {
            if (this.defaultValidateControl instanceof FormControlDirective) {
                this.nzValidateStatus = this.defaultValidateControl.control;
            }
            else {
                this.nzValidateStatus = this.defaultValidateControl;
            }
        }
    }
}
NzFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzFormControlComponent, deps: [{ token: i0.ElementRef }, { token: i1.NzFormItemComponent, host: true, optional: true }, { token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i2.NzI18nService }, { token: i3.NzFormDirective, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzFormControlComponent, selector: "nz-form-control", inputs: { nzSuccessTip: "nzSuccessTip", nzWarningTip: "nzWarningTip", nzErrorTip: "nzErrorTip", nzValidatingTip: "nzValidatingTip", nzExtra: "nzExtra", nzAutoTips: "nzAutoTips", nzDisableAutoTips: "nzDisableAutoTips", nzHasFeedback: "nzHasFeedback", nzValidateStatus: "nzValidateStatus" }, queries: [{ propertyName: "defaultValidateControl", first: true, predicate: NgControl, descendants: true }], exportAs: ["nzFormControl"], usesOnChanges: true, ngImport: i0, template: `
    <div class="ant-form-item-control-input">
      <div class="ant-form-item-control-input-content">
        <ng-content></ng-content>
      </div>
      <span class="ant-form-item-children-icon">
        <i *ngIf="nzHasFeedback && iconType" nz-icon [nzType]="iconType"></i>
      </span>
    </div>
    <div @helpMotion class="ant-form-item-explain ant-form-item-explain-connected" *ngIf="innerTip">
      <div role="alert" [ngClass]="['ant-form-item-explain-' + status]">
        <ng-container *nzStringTemplateOutlet="innerTip; context: { $implicit: validateControl }">{{
          innerTip
        }}</ng-container>
      </div>
    </div>
    <div class="ant-form-item-extra" *ngIf="nzExtra">
      <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
    </div>
  `, isInline: true, directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i6.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], animations: [helpMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzFormControlComponent, decorators: [{
            type: Component,
            args: [{
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
    <div @helpMotion class="ant-form-item-explain ant-form-item-explain-connected" *ngIf="innerTip">
      <div role="alert" [ngClass]="['ant-form-item-explain-' + status]">
        <ng-container *nzStringTemplateOutlet="innerTip; context: { $implicit: validateControl }">{{
          innerTip
        }}</ng-container>
      </div>
    </div>
    <div class="ant-form-item-extra" *ngIf="nzExtra">
      <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
    </div>
  `
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NzFormItemComponent, decorators: [{
                    type: Optional
                }, {
                    type: Host
                }] }, { type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i2.NzI18nService }, { type: i3.NzFormDirective, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { defaultValidateControl: [{
                type: ContentChild,
                args: [NgControl, { static: false }]
            }], nzSuccessTip: [{
                type: Input
            }], nzWarningTip: [{
                type: Input
            }], nzErrorTip: [{
                type: Input
            }], nzValidatingTip: [{
                type: Input
            }], nzExtra: [{
                type: Input
            }], nzAutoTips: [{
                type: Input
            }], nzDisableAutoTips: [{
                type: Input
            }], nzHasFeedback: [{
                type: Input
            }], nzValidateStatus: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvZm9ybS9mb3JtLWNvbnRyb2wuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFFTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFFWixJQUFJLEVBQ0osS0FBSyxFQUlMLFFBQVEsRUFJUixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxvQkFBb0IsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVHLE9BQU8sRUFBYyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7OztBQU1wRCxNQUFNLFdBQVcsR0FBRztJQUNsQixLQUFLLEVBQUUsbUJBQW1CO0lBQzFCLFVBQVUsRUFBRSxTQUFTO0lBQ3JCLE9BQU8sRUFBRSxtQkFBbUI7SUFDNUIsT0FBTyxFQUFFLHlCQUF5QjtDQUMxQixDQUFDO0FBOEJYLE1BQU0sT0FBTyxzQkFBc0I7SUF5S2pDLFlBQ0UsVUFBc0IsRUFDTSxtQkFBd0MsRUFDNUQsR0FBc0IsRUFDOUIsUUFBbUIsRUFDbkIsSUFBbUIsRUFDQyxlQUFnQztRQUp4Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQzVELFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBR1Ysb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBeks5QyxpQkFBWSxHQUFHLEtB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LENBQUMsT0FBTyxDQUFDO2FBQzdEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsc0JBQXVCLENBQUM7YUFDdEQ7U0FDRjtJQUNILENBQUM7O21IQXhOVSxzQkFBc0I7dUdBQXRCLHNCQUFzQiw2WUF3Qm5CLFNBQVMsa0dBN0NiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJULHVpQkF0QlcsQ0FBQyxVQUFVLENBQUM7MkZBd0JiLHNCQUFzQjtrQkE1QmxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLFVBQVUsRUFBRSxDQUFDLFVBQVUsQ0FBQztvQkFDeEIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQlQ7aUJBQ0Y7OzBCQTRLSSxRQUFROzswQkFBSSxJQUFJOzswQkFJaEIsUUFBUTs0Q0F2SmlDLHNCQUFzQjtzQkFBakUsWUFBWTt1QkFBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUNqQyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLGlCQUFpQjtzQkFBekIsS0FBSztnQkFHRixhQUFhO3NCQURoQixLQUFLO2dCQWFGLGdCQUFnQjtzQkFEbkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3QsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sRGlyZWN0aXZlLCBGb3JtQ29udHJvbE5hbWUsIE5nQ29udHJvbCwgTmdNb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBzdGFydFdpdGgsIHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBoZWxwTW90aW9uIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2FuaW1hdGlvbic7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyB0b0Jvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBOekkxOG5TZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcblxuaW1wb3J0IHsgTnpGb3JtQ29udHJvbFN0YXR1c1R5cGUsIE56Rm9ybUl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2Zvcm0taXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpGb3JtRGlyZWN0aXZlIH0gZnJvbSAnLi9mb3JtLmRpcmVjdGl2ZSc7XG5cbmNvbnN0IGljb25UeXBlTWFwID0ge1xuICBlcnJvcjogJ2Nsb3NlLWNpcmNsZS1maWxsJyxcbiAgdmFsaWRhdGluZzogJ2xvYWRpbmcnLFxuICBzdWNjZXNzOiAnY2hlY2stY2lyY2xlLWZpbGwnLFxuICB3YXJuaW5nOiAnZXhjbGFtYXRpb24tY2lyY2xlLWZpbGwnXG59IGFzIGNvbnN0O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1mb3JtLWNvbnRyb2wnLFxuICBleHBvcnRBczogJ256Rm9ybUNvbnRyb2wnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgYW5pbWF0aW9uczogW2hlbHBNb3Rpb25dLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiYW50LWZvcm0taXRlbS1jb250cm9sLWlucHV0XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYW50LWZvcm0taXRlbS1jb250cm9sLWlucHV0LWNvbnRlbnRcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgICA8c3BhbiBjbGFzcz1cImFudC1mb3JtLWl0ZW0tY2hpbGRyZW4taWNvblwiPlxuICAgICAgICA8aSAqbmdJZj1cIm56SGFzRmVlZGJhY2sgJiYgaWNvblR5cGVcIiBuei1pY29uIFtuelR5cGVdPVwiaWNvblR5cGVcIj48L2k+XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBAaGVscE1vdGlvbiBjbGFzcz1cImFudC1mb3JtLWl0ZW0tZXhwbGFpbiBhbnQtZm9ybS1pdGVtLWV4cGxhaW4tY29ubmVjdGVkXCIgKm5nSWY9XCJpbm5lclRpcFwiPlxuICAgICAgPGRpdiByb2xlPVwiYWxlcnRcIiBbbmdDbGFzc109XCJbJ2FudC1mb3JtLWl0ZW0tZXhwbGFpbi0nICsgc3RhdHVzXVwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwiaW5uZXJUaXA7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiB2YWxpZGF0ZUNvbnRyb2wgfVwiPnt7XG4gICAgICAgICAgaW5uZXJUaXBcbiAgICAgICAgfX08L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJhbnQtZm9ybS1pdGVtLWV4dHJhXCIgKm5nSWY9XCJuekV4dHJhXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpFeHRyYVwiPnt7IG56RXh0cmEgfX08L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOekZvcm1Db250cm9sQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256SGFzRmVlZGJhY2s6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256UmVxdWlyZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Tm9Db2xvbjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEaXNhYmxlQXV0b1RpcHM6IEJvb2xlYW5JbnB1dDtcblxuICBwcml2YXRlIF9oYXNGZWVkYmFjayA9IGZhbHNlO1xuICBwcml2YXRlIHZhbGlkYXRlQ2hhbmdlczogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIHZhbGlkYXRlU3RyaW5nOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBkZXN0cm95ZWQkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBsb2NhbGVJZCE6IHN0cmluZztcbiAgcHJpdmF0ZSBhdXRvRXJyb3JUaXA/OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBnZXQgZGlzYWJsZUF1dG9UaXBzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm56RGlzYWJsZUF1dG9UaXBzICE9PSAnZGVmYXVsdCdcbiAgICAgID8gdG9Cb29sZWFuKHRoaXMubnpEaXNhYmxlQXV0b1RpcHMpXG4gICAgICA6IHRoaXMubnpGb3JtRGlyZWN0aXZlPy5uekRpc2FibGVBdXRvVGlwcztcbiAgfVxuXG4gIHN0YXR1czogTnpGb3JtQ29udHJvbFN0YXR1c1R5cGUgPSBudWxsO1xuICB2YWxpZGF0ZUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCB8IE5nTW9kZWwgfCBudWxsID0gbnVsbDtcbiAgaWNvblR5cGU6IHR5cGVvZiBpY29uVHlwZU1hcFtrZXlvZiB0eXBlb2YgaWNvblR5cGVNYXBdIHwgbnVsbCA9IG51bGw7XG4gIGlubmVyVGlwOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogQWJzdHJhY3RDb250cm9sIHwgTmdNb2RlbCB9PiB8IG51bGwgPSBudWxsO1xuXG4gIEBDb250ZW50Q2hpbGQoTmdDb250cm9sLCB7IHN0YXRpYzogZmFsc2UgfSkgZGVmYXVsdFZhbGlkYXRlQ29udHJvbD86IEZvcm1Db250cm9sTmFtZSB8IEZvcm1Db250cm9sRGlyZWN0aXZlO1xuICBASW5wdXQoKSBuelN1Y2Nlc3NUaXA/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogQWJzdHJhY3RDb250cm9sIHwgTmdNb2RlbCB9PjtcbiAgQElucHV0KCkgbnpXYXJuaW5nVGlwPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IEFic3RyYWN0Q29udHJvbCB8IE5nTW9kZWwgfT47XG4gIEBJbnB1dCgpIG56RXJyb3JUaXA/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogQWJzdHJhY3RDb250cm9sIHwgTmdNb2RlbCB9PjtcbiAgQElucHV0KCkgbnpWYWxpZGF0aW5nVGlwPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IEFic3RyYWN0Q29udHJvbCB8IE5nTW9kZWwgfT47XG4gIEBJbnB1dCgpIG56RXh0cmE/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgbnpBdXRvVGlwczogUmVjb3JkPHN0cmluZywgUmVjb3JkPHN0cmluZywgc3RyaW5nPj4gPSB7fTtcbiAgQElucHV0KCkgbnpEaXNhYmxlQXV0b1RpcHM6IGJvb2xlYW4gfCAnZGVmYXVsdCcgPSAnZGVmYXVsdCc7XG5cbiAgQElucHV0KClcbiAgc2V0IG56SGFzRmVlZGJhY2sodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oYXNGZWVkYmFjayA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gICAgaWYgKHRoaXMubnpGb3JtSXRlbUNvbXBvbmVudCkge1xuICAgICAgdGhpcy5uekZvcm1JdGVtQ29tcG9uZW50LnNldEhhc0ZlZWRiYWNrKHRoaXMuX2hhc0ZlZWRiYWNrKTtcbiAgICB9XG4gIH1cblxuICBnZXQgbnpIYXNGZWVkYmFjaygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGFzRmVlZGJhY2s7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpWYWxpZGF0ZVN0YXR1cyh2YWx1ZTogc3RyaW5nIHwgQWJzdHJhY3RDb250cm9sIHwgRm9ybUNvbnRyb2xOYW1lIHwgTmdNb2RlbCkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFic3RyYWN0Q29udHJvbCB8fCB2YWx1ZSBpbnN0YW5jZW9mIE5nTW9kZWwpIHtcbiAgICAgIHRoaXMudmFsaWRhdGVDb250cm9sID0gdmFsdWU7XG4gICAgICB0aGlzLnZhbGlkYXRlU3RyaW5nID0gbnVsbDtcbiAgICAgIHRoaXMud2F0Y2hDb250cm9sKCk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZvcm1Db250cm9sTmFtZSkge1xuICAgICAgdGhpcy52YWxpZGF0ZUNvbnRyb2wgPSB2YWx1ZS5jb250cm9sO1xuICAgICAgdGhpcy52YWxpZGF0ZVN0cmluZyA9IG51bGw7XG4gICAgICB0aGlzLndhdGNoQ29udHJvbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbGlkYXRlU3RyaW5nID0gdmFsdWU7XG4gICAgICB0aGlzLnZhbGlkYXRlQ29udHJvbCA9IG51bGw7XG4gICAgICB0aGlzLnNldFN0YXR1cygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgd2F0Y2hDb250cm9sKCk6IHZvaWQge1xuICAgIHRoaXMudmFsaWRhdGVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgLyoqIG1pc3MgZGV0ZWN0IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzEwODg3ICoqL1xuICAgIGlmICh0aGlzLnZhbGlkYXRlQ29udHJvbCAmJiB0aGlzLnZhbGlkYXRlQ29udHJvbC5zdGF0dXNDaGFuZ2VzKSB7XG4gICAgICB0aGlzLnZhbGlkYXRlQ2hhbmdlcyA9ICh0aGlzLnZhbGlkYXRlQ29udHJvbC5zdGF0dXNDaGFuZ2VzIGFzIE9ic2VydmFibGU8TnpTYWZlQW55PilcbiAgICAgICAgLnBpcGUoc3RhcnRXaXRoKG51bGwpLCB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQkKSlcbiAgICAgICAgLnN1YnNjcmliZShfID0+IHtcbiAgICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZUF1dG9UaXBzKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUF1dG9FcnJvclRpcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnNldFN0YXR1cygpO1xuICAgICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFN0YXR1cygpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXR1cyA9IHRoaXMuZ2V0Q29udHJvbFN0YXR1cyh0aGlzLnZhbGlkYXRlU3RyaW5nKTtcbiAgICB0aGlzLmljb25UeXBlID0gdGhpcy5zdGF0dXMgPyBpY29uVHlwZU1hcFt0aGlzLnN0YXR1c10gOiBudWxsO1xuICAgIHRoaXMuaW5uZXJUaXAgPSB0aGlzLmdldElubmVyVGlwKHRoaXMuc3RhdHVzKTtcbiAgICBpZiAodGhpcy5uekZvcm1JdGVtQ29tcG9uZW50KSB7XG4gICAgICB0aGlzLm56Rm9ybUl0ZW1Db21wb25lbnQuc2V0V2l0aEhlbHBWaWFUaXBzKCEhdGhpcy5pbm5lclRpcCk7XG4gICAgICB0aGlzLm56Rm9ybUl0ZW1Db21wb25lbnQuc2V0U3RhdHVzKHRoaXMuc3RhdHVzKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldENvbnRyb2xTdGF0dXModmFsaWRhdGVTdHJpbmc6IHN0cmluZyB8IG51bGwpOiBOekZvcm1Db250cm9sU3RhdHVzVHlwZSB7XG4gICAgbGV0IHN0YXR1czogTnpGb3JtQ29udHJvbFN0YXR1c1R5cGU7XG5cbiAgICBpZiAodmFsaWRhdGVTdHJpbmcgPT09ICd3YXJuaW5nJyB8fCB0aGlzLnZhbGlkYXRlQ29udHJvbFN0YXR1cygnSU5WQUxJRCcsICd3YXJuaW5nJykpIHtcbiAgICAgIHN0YXR1cyA9ICd3YXJuaW5nJztcbiAgICB9IGVsc2UgaWYgKHZhbGlkYXRlU3RyaW5nID09PSAnZXJyb3InIHx8IHRoaXMudmFsaWRhdGVDb250cm9sU3RhdHVzKCdJTlZBTElEJykpIHtcbiAgICAgIHN0YXR1cyA9ICdlcnJvcic7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHZhbGlkYXRlU3RyaW5nID09PSAndmFsaWRhdGluZycgfHxcbiAgICAgIHZhbGlkYXRlU3RyaW5nID09PSAncGVuZGluZycgfHxcbiAgICAgIHRoaXMudmFsaWRhdGVDb250cm9sU3RhdHVzKCdQRU5ESU5HJylcbiAgICApIHtcbiAgICAgIHN0YXR1cyA9ICd2YWxpZGF0aW5nJztcbiAgICB9IGVsc2UgaWYgKHZhbGlkYXRlU3RyaW5nID09PSAnc3VjY2VzcycgfHwgdGhpcy52YWxpZGF0ZUNvbnRyb2xTdGF0dXMoJ1ZBTElEJykpIHtcbiAgICAgIHN0YXR1cyA9ICdzdWNjZXNzJztcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdHVzID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdHVzO1xuICB9XG5cbiAgcHJpdmF0ZSB2YWxpZGF0ZUNvbnRyb2xTdGF0dXModmFsaWRTdGF0dXM6IHN0cmluZywgc3RhdHVzVHlwZT86IE56Rm9ybUNvbnRyb2xTdGF0dXNUeXBlKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLnZhbGlkYXRlQ29udHJvbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB7IGRpcnR5LCB0b3VjaGVkLCBzdGF0dXMgfSA9IHRoaXMudmFsaWRhdGVDb250cm9sO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgKCEhZGlydHkgfHwgISF0b3VjaGVkKSAmJiAoc3RhdHVzVHlwZSA/IHRoaXMudmFsaWRhdGVDb250cm9sLmhhc0Vycm9yKHN0YXR1c1R5cGUpIDogc3RhdHVzID09PSB2YWxpZFN0YXR1cylcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRJbm5lclRpcChcbiAgICBzdGF0dXM6IE56Rm9ybUNvbnRyb2xTdGF0dXNUeXBlXG4gICk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBBYnN0cmFjdENvbnRyb2wgfCBOZ01vZGVsIH0+IHwgbnVsbCB7XG4gICAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgcmV0dXJuICghdGhpcy5kaXNhYmxlQXV0b1RpcHMgJiYgdGhpcy5hdXRvRXJyb3JUaXApIHx8IHRoaXMubnpFcnJvclRpcCB8fCBudWxsO1xuICAgICAgY2FzZSAndmFsaWRhdGluZyc6XG4gICAgICAgIHJldHVybiB0aGlzLm56VmFsaWRhdGluZ1RpcCB8fCBudWxsO1xuICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICAgIHJldHVybiB0aGlzLm56U3VjY2Vzc1RpcCB8fCBudWxsO1xuICAgICAgY2FzZSAnd2FybmluZyc6XG4gICAgICAgIHJldHVybiB0aGlzLm56V2FybmluZ1RpcCB8fCBudWxsO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVBdXRvRXJyb3JUaXAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudmFsaWRhdGVDb250cm9sKSB7XG4gICAgICBjb25zdCBlcnJvcnMgPSB0aGlzLnZhbGlkYXRlQ29udHJvbC5lcnJvcnMgfHwge307XG4gICAgICBsZXQgYXV0b0Vycm9yVGlwID0gJyc7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBlcnJvcnMpIHtcbiAgICAgICAgaWYgKGVycm9ycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgYXV0b0Vycm9yVGlwID1cbiAgICAgICAgICAgIGVycm9yc1trZXldPy5bdGhpcy5sb2NhbGVJZF0gPz9cbiAgICAgICAgICAgIHRoaXMubnpBdXRvVGlwcz8uW3RoaXMubG9jYWxlSWRdPy5ba2V5XSA/P1xuICAgICAgICAgICAgdGhpcy5uekF1dG9UaXBzLmRlZmF1bHQ/LltrZXldID8/XG4gICAgICAgICAgICB0aGlzLm56Rm9ybURpcmVjdGl2ZT8ubnpBdXRvVGlwcz8uW3RoaXMubG9jYWxlSWRdPy5ba2V5XSA/P1xuICAgICAgICAgICAgdGhpcy5uekZvcm1EaXJlY3RpdmU/Lm56QXV0b1RpcHMuZGVmYXVsdD8uW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEhYXV0b0Vycm9yVGlwKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuYXV0b0Vycm9yVGlwID0gYXV0b0Vycm9yVGlwO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlQXV0b1RpcHMob2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxOelNhZmVBbnk+KTogdm9pZCB7XG4gICAgb2JzZXJ2YWJsZT8ucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5kaXNhYmxlQXV0b1RpcHMpIHtcbiAgICAgICAgdGhpcy51cGRhdGVBdXRvRXJyb3JUaXAoKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0dXMoKTtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgcHJpdmF0ZSBuekZvcm1JdGVtQ29tcG9uZW50OiBOekZvcm1JdGVtQ29tcG9uZW50LFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIGkxOG46IE56STE4blNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBuekZvcm1EaXJlY3RpdmU6IE56Rm9ybURpcmVjdGl2ZVxuICApIHtcbiAgICByZW5kZXJlci5hZGRDbGFzcyhlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhbnQtZm9ybS1pdGVtLWNvbnRyb2wnKTtcblxuICAgIHRoaXMuc3Vic2NyaWJlQXV0b1RpcHMoaTE4bi5sb2NhbGVDaGFuZ2UucGlwZSh0YXAobG9jYWxlID0+ICh0aGlzLmxvY2FsZUlkID0gbG9jYWxlLmxvY2FsZSkpKSk7XG4gICAgdGhpcy5zdWJzY3JpYmVBdXRvVGlwcyh0aGlzLm56Rm9ybURpcmVjdGl2ZT8uZ2V0SW5wdXRPYnNlcnZhYmxlKCduekF1dG9UaXBzJykpO1xuICAgIHRoaXMuc3Vic2NyaWJlQXV0b1RpcHMoXG4gICAgICB0aGlzLm56Rm9ybURpcmVjdGl2ZVxuICAgICAgICA/LmdldElucHV0T2JzZXJ2YWJsZSgnbnpEaXNhYmxlQXV0b1RpcHMnKVxuICAgICAgICAucGlwZShmaWx0ZXIoKCkgPT4gdGhpcy5uekRpc2FibGVBdXRvVGlwcyA9PT0gJ2RlZmF1bHQnKSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbnpEaXNhYmxlQXV0b1RpcHMsIG56QXV0b1RpcHMsIG56U3VjY2Vzc1RpcCwgbnpXYXJuaW5nVGlwLCBuekVycm9yVGlwLCBuelZhbGlkYXRpbmdUaXAgfSA9IGNoYW5nZXM7XG5cbiAgICBpZiAobnpEaXNhYmxlQXV0b1RpcHMgfHwgbnpBdXRvVGlwcykge1xuICAgICAgdGhpcy51cGRhdGVBdXRvRXJyb3JUaXAoKTtcbiAgICAgIHRoaXMuc2V0U3RhdHVzKCk7XG4gICAgfSBlbHNlIGlmIChuelN1Y2Nlc3NUaXAgfHwgbnpXYXJuaW5nVGlwIHx8IG56RXJyb3JUaXAgfHwgbnpWYWxpZGF0aW5nVGlwKSB7XG4gICAgICB0aGlzLnNldFN0YXR1cygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0U3RhdHVzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3llZCQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveWVkJC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy52YWxpZGF0ZUNvbnRyb2wgJiYgIXRoaXMudmFsaWRhdGVTdHJpbmcpIHtcbiAgICAgIGlmICh0aGlzLmRlZmF1bHRWYWxpZGF0ZUNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtQ29udHJvbERpcmVjdGl2ZSkge1xuICAgICAgICB0aGlzLm56VmFsaWRhdGVTdGF0dXMgPSB0aGlzLmRlZmF1bHRWYWxpZGF0ZUNvbnRyb2wuY29udHJvbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubnpWYWxpZGF0ZVN0YXR1cyA9IHRoaXMuZGVmYXVsdFZhbGlkYXRlQ29udHJvbCE7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=