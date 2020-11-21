/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Selection } from 'd3-selection';
import { ZoomBehavior } from 'd3-zoom';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
export interface NzZoomTransform {
    x: number;
    y: number;
    k: number;
}
export interface RelativePositionInfo {
    topLeft: {
        x: number;
        y: number;
    };
    bottomRight: {
        x: number;
        y: number;
    };
}
export declare class NzGraphSvgContainerComponent implements OnInit, OnDestroy {
    private cdr;
    containerElement: ElementRef<SVGSVGElement>;
    zoomElement: ElementRef<SVGAElement>;
    maxZoomLevel: number;
    minZoomLevel: number;
    zoom: number;
    readonly zoomEvent: EventEmitter<number>;
    readonly transformEvent: EventEmitter<NzZoomTransform>;
    transform: NzZoomTransform;
    transformStyle: string;
    svgSelect: Selection<NzSafeAny, NzSafeAny, NzSafeAny, NzSafeAny>;
    zoomController: ZoomBehavior<NzSafeAny, NzSafeAny>;
    constructor(cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    bind(): void;
    unbind(): void;
    /**
     * Zoom to fit
     */
    fit(duration?: number, scale?: number): void;
    setNodeToCenter(node: SVGGElement): void;
    private getRelativePositionInfo;
}
