/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, Renderer2, ViewContainerRef } from '@angular/core';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { BooleanInput, NgStyleInterface, NzTSType } from 'ng-zorro-antd/core/types';
import { NzTooltipBaseDirective, NzToolTipComponent, NzTooltipTrigger, PropertyMapping } from 'ng-zorro-antd/tooltip';
import * as i0 from "@angular/core";
export declare class NzPopoverDirective extends NzTooltipBaseDirective {
    static ngAcceptInputType_nzPopoverArrowPointAtCenter: BooleanInput;
    readonly _nzModuleName: NzConfigKey;
    arrowPointAtCenter?: boolean;
    title?: NzTSType;
    content?: NzTSType;
    directiveTitle?: NzTSType | null;
    trigger?: NzTooltipTrigger;
    placement?: string | string[];
    origin?: ElementRef<HTMLElement>;
    visible?: boolean;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    overlayClassName?: string;
    overlayStyle?: NgStyleInterface;
    nzPopoverBackdrop?: boolean;
    readonly visibleChange: EventEmitter<boolean>;
    componentRef: ComponentRef<NzPopoverComponent>;
    protected getProxyPropertyMap(): PropertyMapping;
    constructor(elementRef: ElementRef, hostView: ViewContainerRef, resolver: ComponentFactoryResolver, renderer: Renderer2, noAnimation?: NzNoAnimationDirective, nzConfigService?: NzConfigService);
    static ɵfac: i0.ɵɵFactoryDeclaration<NzPopoverDirective, [null, null, null, null, { optional: true; host: true; }, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzPopoverDirective, "[nz-popover]", ["nzPopover"], { "arrowPointAtCenter": "nzPopoverArrowPointAtCenter"; "title": "nzPopoverTitle"; "content": "nzPopoverContent"; "directiveTitle": "nz-popover"; "trigger": "nzPopoverTrigger"; "placement": "nzPopoverPlacement"; "origin": "nzPopoverOrigin"; "visible": "nzPopoverVisible"; "mouseEnterDelay": "nzPopoverMouseEnterDelay"; "mouseLeaveDelay": "nzPopoverMouseLeaveDelay"; "overlayClassName": "nzPopoverOverlayClassName"; "overlayStyle": "nzPopoverOverlayStyle"; "nzPopoverBackdrop": "nzPopoverBackdrop"; }, { "visibleChange": "nzPopoverVisibleChange"; }, never>;
}
export declare class NzPopoverComponent extends NzToolTipComponent {
    _prefix: string;
    constructor(cdr: ChangeDetectorRef, directionality: Directionality, noAnimation?: NzNoAnimationDirective);
    get hasBackdrop(): boolean;
    protected isEmpty(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzPopoverComponent, [null, { optional: true; }, { optional: true; host: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzPopoverComponent, "nz-popover", ["nzPopoverComponent"], {}, {}, never, never>;
}
