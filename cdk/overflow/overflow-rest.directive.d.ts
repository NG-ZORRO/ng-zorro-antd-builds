/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';
import * as i0 from "@angular/core";
export declare class NzOverflowRestDirective {
    private nzResizeObserver;
    private elementRef;
    private cdr;
    restStyle: {
        [key: string]: string | number | undefined;
    } | undefined;
    restWidth$: import("rxjs").Observable<number>;
    restWidth: number;
    constructor(nzResizeObserver: NzResizeObserver, elementRef: ElementRef, cdr: ChangeDetectorRef);
    setRestStyle(display: boolean, order: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzOverflowRestDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzOverflowRestDirective, "[nzOverflowRest]", never, {}, {}, never>;
}
