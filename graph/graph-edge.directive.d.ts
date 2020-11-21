/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ElementRef, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NzGraphEdge } from './interface';
export declare class NzGraphEdgeDirective implements OnInit, OnChanges {
    private elementRef;
    private ngZone;
    edge: NzGraphEdge;
    get id(): string;
    private readonly el;
    private readonly line;
    constructor(elementRef: ElementRef<SVGPathElement>, ngZone: NgZone);
    ngOnInit(): void;
    setLine(): void;
    setPath(d: string): void;
    setElementData(): void;
    getAdjoiningEdgeElement(): SVGPathElement | null;
    ngOnChanges(_changes: SimpleChanges): void;
}
