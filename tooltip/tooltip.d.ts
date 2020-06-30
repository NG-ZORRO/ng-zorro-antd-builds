/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, ComponentFactory, ComponentFactoryResolver, ElementRef, Renderer2, ViewContainerRef } from '@angular/core';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NzTSType } from 'ng-zorro-antd/core/types';
import { NzTooltipBaseComponent, NzTooltipBaseDirective, NzTooltipTrigger } from './base';
export declare class NzTooltipDirective extends NzTooltipBaseDirective {
    specificTitle?: NzTSType | null;
    directiveNameTitle?: NzTSType | null;
    specificTrigger?: NzTooltipTrigger;
    specificPlacement?: string;
    specificOrigin?: ElementRef<HTMLElement>;
    componentFactory: ComponentFactory<NzToolTipComponent>;
    constructor(elementRef: ElementRef, hostView: ViewContainerRef, resolver: ComponentFactoryResolver, renderer: Renderer2, noAnimation?: NzNoAnimationDirective);
}
export declare class NzToolTipComponent extends NzTooltipBaseComponent {
    noAnimation?: NzNoAnimationDirective | undefined;
    nzTitle: NzTSType | null;
    constructor(cdr: ChangeDetectorRef, noAnimation?: NzNoAnimationDirective | undefined);
    protected isEmpty(): boolean;
}
