/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ElementRef, NgZone } from '@angular/core';
import { NzTabPositionMode } from './interfaces';
import * as i0 from "@angular/core";
export declare class NzTabsInkBarDirective {
    private elementRef;
    private ngZone;
    animationMode?: string | undefined;
    position: NzTabPositionMode;
    animated: boolean;
    get _animated(): boolean;
    constructor(elementRef: ElementRef<HTMLElement>, ngZone: NgZone, animationMode?: string | undefined);
    alignToElement(element: HTMLElement): void;
    setStyles(element: HTMLElement): void;
    getLeftPosition(element: HTMLElement): string;
    getElementWidth(element: HTMLElement): string;
    getTopPosition(element: HTMLElement): string;
    getElementHeight(element: HTMLElement): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTabsInkBarDirective, [null, null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzTabsInkBarDirective, "nz-tabs-ink-bar, [nz-tabs-ink-bar]", never, { "position": "position"; "animated": "animated"; }, {}, never>;
}
