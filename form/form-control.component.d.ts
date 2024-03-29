/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { AfterContentInit, ChangeDetectorRef, ElementRef, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';
import { AbstractControl, FormControlDirective, FormControlName, NgModel } from '@angular/forms';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { NzFormControlStatusType, NzFormItemComponent } from './form-item.component';
import { NzFormDirective } from './form.directive';
import * as i0 from "@angular/core";
declare const iconTypeMap: {
    readonly error: "close-circle-fill";
    readonly validating: "loading";
    readonly success: "check-circle-fill";
    readonly warning: "exclamation-circle-fill";
};
export declare class NzFormControlComponent implements OnChanges, OnDestroy, OnInit, AfterContentInit, OnDestroy {
    private nzFormItemComponent;
    private cdr;
    private nzFormDirective;
    static ngAcceptInputType_nzHasFeedback: BooleanInput;
    static ngAcceptInputType_nzRequired: BooleanInput;
    static ngAcceptInputType_nzNoColon: BooleanInput;
    static ngAcceptInputType_nzDisableAutoTips: BooleanInput;
    private _hasFeedback;
    private validateChanges;
    private validateString;
    private destroyed$;
    private localeId;
    private autoErrorTip?;
    private get disableAutoTips();
    status: NzFormControlStatusType;
    validateControl: AbstractControl | NgModel | null;
    iconType: typeof iconTypeMap[keyof typeof iconTypeMap] | null;
    innerTip: string | TemplateRef<{
        $implicit: AbstractControl | NgModel;
    }> | null;
    defaultValidateControl?: FormControlName | FormControlDirective;
    nzSuccessTip?: string | TemplateRef<{
        $implicit: AbstractControl | NgModel;
    }>;
    nzWarningTip?: string | TemplateRef<{
        $implicit: AbstractControl | NgModel;
    }>;
    nzErrorTip?: string | TemplateRef<{
        $implicit: AbstractControl | NgModel;
    }>;
    nzValidatingTip?: string | TemplateRef<{
        $implicit: AbstractControl | NgModel;
    }>;
    nzExtra?: string | TemplateRef<void>;
    nzAutoTips: Record<string, Record<string, string>>;
    nzDisableAutoTips: boolean | 'default';
    set nzHasFeedback(value: boolean);
    get nzHasFeedback(): boolean;
    set nzValidateStatus(value: string | AbstractControl | FormControlName | NgModel);
    private watchControl;
    private setStatus;
    private getControlStatus;
    private validateControlStatus;
    private getInnerTip;
    private updateAutoErrorTip;
    private subscribeAutoTips;
    constructor(elementRef: ElementRef, nzFormItemComponent: NzFormItemComponent, cdr: ChangeDetectorRef, renderer: Renderer2, i18n: NzI18nService, nzFormDirective: NzFormDirective);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzFormControlComponent, [null, { optional: true; host: true; }, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzFormControlComponent, "nz-form-control", ["nzFormControl"], { "nzSuccessTip": "nzSuccessTip"; "nzWarningTip": "nzWarningTip"; "nzErrorTip": "nzErrorTip"; "nzValidatingTip": "nzValidatingTip"; "nzExtra": "nzExtra"; "nzAutoTips": "nzAutoTips"; "nzDisableAutoTips": "nzDisableAutoTips"; "nzHasFeedback": "nzHasFeedback"; "nzValidateStatus": "nzValidateStatus"; }, {}, ["defaultValidateControl"], ["*"]>;
}
export {};
