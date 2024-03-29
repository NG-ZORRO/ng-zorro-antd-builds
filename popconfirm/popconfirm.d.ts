/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, OnDestroy, QueryList, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { NzButtonType } from 'ng-zorro-antd/button';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { BooleanInput, NgStyleInterface, NzSafeAny, NzTSType } from 'ng-zorro-antd/core/types';
import { NzTooltipBaseDirective, NzToolTipComponent, NzTooltipTrigger, PropertyMapping } from 'ng-zorro-antd/tooltip';
import * as i0 from "@angular/core";
export declare type NzAutoFocusType = null | 'ok' | 'cancel';
export declare class NzPopconfirmDirective extends NzTooltipBaseDirective {
    readonly _nzModuleName: NzConfigKey;
    static ngAcceptInputType_nzCondition: BooleanInput;
    static ngAcceptInputType_nzPopconfirmShowArrow: BooleanInput;
    static ngAcceptInputType_nzPopconfirmArrowPointAtCenter: BooleanInput;
    arrowPointAtCenter?: boolean;
    title?: NzTSType;
    directiveTitle?: NzTSType | null;
    trigger?: NzTooltipTrigger;
    placement?: string | string[];
    origin?: ElementRef<HTMLElement>;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    overlayClassName?: string;
    overlayStyle?: NgStyleInterface;
    visible?: boolean;
    nzOkText?: string;
    nzOkType?: string;
    nzOkDanger?: boolean;
    nzCancelText?: string;
    nzIcon?: string | TemplateRef<void>;
    nzCondition: boolean;
    nzPopconfirmShowArrow: boolean;
    nzPopconfirmBackdrop?: boolean;
    nzAutofocus: NzAutoFocusType;
    readonly nzOnCancel: EventEmitter<void>;
    readonly nzOnConfirm: EventEmitter<void>;
    protected readonly componentRef: ComponentRef<NzPopconfirmComponent>;
    protected getProxyPropertyMap(): PropertyMapping;
    constructor(elementRef: ElementRef, hostView: ViewContainerRef, resolver: ComponentFactoryResolver, renderer: Renderer2, noAnimation?: NzNoAnimationDirective, nzConfigService?: NzConfigService);
    /**
     * @override
     */
    protected createComponent(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzPopconfirmDirective, [null, null, null, null, { optional: true; host: true; }, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzPopconfirmDirective, "[nz-popconfirm]", ["nzPopconfirm"], { "arrowPointAtCenter": "nzPopconfirmArrowPointAtCenter"; "title": "nzPopconfirmTitle"; "directiveTitle": "nz-popconfirm"; "trigger": "nzPopconfirmTrigger"; "placement": "nzPopconfirmPlacement"; "origin": "nzPopconfirmOrigin"; "mouseEnterDelay": "nzPopconfirmMouseEnterDelay"; "mouseLeaveDelay": "nzPopconfirmMouseLeaveDelay"; "overlayClassName": "nzPopconfirmOverlayClassName"; "overlayStyle": "nzPopconfirmOverlayStyle"; "visible": "nzPopconfirmVisible"; "nzOkText": "nzOkText"; "nzOkType": "nzOkType"; "nzOkDanger": "nzOkDanger"; "nzCancelText": "nzCancelText"; "nzIcon": "nzIcon"; "nzCondition": "nzCondition"; "nzPopconfirmShowArrow": "nzPopconfirmShowArrow"; "nzPopconfirmBackdrop": "nzPopconfirmBackdrop"; "nzAutofocus": "nzAutofocus"; }, { "nzOnCancel": "nzOnCancel"; "nzOnConfirm": "nzOnConfirm"; }, never>;
}
export declare class NzPopconfirmComponent extends NzToolTipComponent implements OnDestroy {
    private elementRef;
    okBtn: QueryList<ElementRef>;
    cancelBtn: QueryList<ElementRef>;
    nzCancelText?: string;
    nzCondition: boolean;
    nzPopconfirmShowArrow: boolean;
    nzIcon?: string | TemplateRef<void>;
    nzOkText?: string;
    nzOkType: NzButtonType | 'danger';
    nzOkDanger: boolean;
    nzAutoFocus: NzAutoFocusType;
    readonly nzOnCancel: Subject<void>;
    readonly nzOnConfirm: Subject<void>;
    protected _trigger: NzTooltipTrigger;
    private elementFocusedBeforeModalWasOpened;
    private document;
    _prefix: string;
    constructor(cdr: ChangeDetectorRef, elementRef: ElementRef, directionality: Directionality, document: NzSafeAny, noAnimation?: NzNoAnimationDirective);
    ngOnDestroy(): void;
    /**
     * @override
     */
    show(): void;
    hide(): void;
    onCancel(): void;
    onConfirm(): void;
    private capturePreviouslyFocusedElement;
    private restoreFocus;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzPopconfirmComponent, [null, null, { optional: true; }, { optional: true; }, { optional: true; host: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzPopconfirmComponent, "nz-popconfirm", ["nzPopconfirmComponent"], {}, {}, never, never>;
}
