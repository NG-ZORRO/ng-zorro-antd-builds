/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ZoomBehavior, ZoomTransform } from 'd3-zoom';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzZoomTransform } from '../interface';
export declare class Minimap {
    private minimap;
    private canvas;
    private canvasRect;
    private canvasBuffer;
    private minimapSvg;
    private viewpoint;
    private scaleMinimap;
    private scaleMain;
    private maxWidth;
    private translate;
    private viewpointCoord;
    private minimapSize;
    private labelPadding;
    private svg;
    private zoomG;
    private mainZoom;
    constructor(svg: SVGSVGElement, zoomG: SVGGElement, mainZoom: ZoomBehavior<NzSafeAny, NzSafeAny>, minimap: HTMLElement, maxWidth: number, labelPadding: number);
    private minimapOffset;
    private updateViewpoint;
    update(): void;
    /**
     * Handles changes in zooming/panning. Should be called from the main svg
     * to notify that a zoom/pan was performed and this minimap will update it's
     * viewpoint rectangle.
     * @param transform
     */
    zoom(transform?: ZoomTransform | NzZoomTransform): void;
}
