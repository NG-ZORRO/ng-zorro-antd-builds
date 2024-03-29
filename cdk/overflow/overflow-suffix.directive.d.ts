/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';
import * as i0 from "@angular/core";
export declare class NzOverflowSuffixDirective {
    private nzResizeObserver;
    private elementRef;
    private cdr;
    suffixStyle: {};
    suffixWidth$: import("rxjs").Observable<number>;
    suffixWidth: number;
    constructor(nzResizeObserver: NzResizeObserver, elementRef: ElementRef, cdr: ChangeDetectorRef);
    setSuffixStyle(start: number | null, order: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzOverflowSuffixDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzOverflowSuffixDirective, "[nzOverflowSuffix]", never, {}, {}, never>;
}
