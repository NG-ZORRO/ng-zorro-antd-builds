/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';
import * as i0 from "@angular/core";
export declare class NzOverflowItemDirective {
    private nzResizeObserver;
    elementRef: ElementRef;
    private cdr;
    overflowStyle: {
        [key: string]: string | number | undefined;
    } | undefined;
    itemWidth$: import("rxjs").Observable<number | undefined>;
    itemWidth: number | undefined;
    constructor(nzResizeObserver: NzResizeObserver, elementRef: ElementRef, cdr: ChangeDetectorRef);
    setItemStyle(display: boolean, order: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzOverflowItemDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzOverflowItemDirective, "[nzOverflowItem]", never, {}, {}, never>;
}
