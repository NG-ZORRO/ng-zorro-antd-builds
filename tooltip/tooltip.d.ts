/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, Renderer2, ViewContainerRef } from '@angular/core';
import { NzPresetColor } from 'ng-zorro-antd/core/color';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { BooleanInput, NgStyleInterface, NzTSType } from 'ng-zorro-antd/core/types';
import { NzTooltipBaseComponent, NzTooltipBaseDirective, NzTooltipTrigger, PropertyMapping } from './base';
import * as i0 from "@angular/core";
export declare class NzTooltipDirective extends NzTooltipBaseDirective {
    static ngAcceptInputType_nzTooltipArrowPointAtCenter: BooleanInput;
    title?: NzTSType | null;
    titleContext?: Object | null;
    directiveTitle?: NzTSType | null;
    trigger?: NzTooltipTrigger;
    placement?: string | string[];
    origin?: ElementRef<HTMLElement>;
    visible?: boolean;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    overlayClassName?: string;
    overlayStyle?: NgStyleInterface;
    arrowPointAtCenter?: boolean;
    nzTooltipColor?: string;
    readonly visibleChange: EventEmitter<boolean>;
    componentRef: ComponentRef<NzToolTipComponent>;
    constructor(elementRef: ElementRef, hostView: ViewContainerRef, resolver: ComponentFactoryResolver, renderer: Renderer2, noAnimation?: NzNoAnimationDirective);
    protected getProxyPropertyMap(): PropertyMapping;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTooltipDirective, [null, null, null, null, { optional: true; host: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzTooltipDirective, "[nz-tooltip]", ["nzTooltip"], { "title": "nzTooltipTitle"; "titleContext": "nzTooltipTitleContext"; "directiveTitle": "nz-tooltip"; "trigger": "nzTooltipTrigger"; "placement": "nzTooltipPlacement"; "origin": "nzTooltipOrigin"; "visible": "nzTooltipVisible"; "mouseEnterDelay": "nzTooltipMouseEnterDelay"; "mouseLeaveDelay": "nzTooltipMouseLeaveDelay"; "overlayClassName": "nzTooltipOverlayClassName"; "overlayStyle": "nzTooltipOverlayStyle"; "arrowPointAtCenter": "nzTooltipArrowPointAtCenter"; "nzTooltipColor": "nzTooltipColor"; }, { "visibleChange": "nzTooltipVisibleChange"; }, never>;
}
export declare class NzToolTipComponent extends NzTooltipBaseComponent {
    nzTitle: NzTSType | null;
    nzTitleContext: Object | null;
    nzColor?: string | NzPresetColor;
    _contentStyleMap: NgStyleInterface;
    constructor(cdr: ChangeDetectorRef, directionality: Directionality, noAnimation?: NzNoAnimationDirective);
    protected isEmpty(): boolean;
    protected updateStyles(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzToolTipComponent, [null, { optional: true; }, { optional: true; host: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzToolTipComponent, "nz-tooltip", ["nzTooltipComponent"], {}, {}, never, never>;
}
