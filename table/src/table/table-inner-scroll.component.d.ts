/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Platform } from '@angular/cdk/platform';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, ElementRef, NgZone, OnChanges, OnDestroy, Renderer2, SimpleChanges, TemplateRef, TrackByFunction } from '@angular/core';
import { NzResizeService } from 'ng-zorro-antd/core/services';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzTableData } from '../table.types';
export declare class NzTableInnerScrollComponent implements OnChanges, AfterViewInit, OnDestroy {
    private renderer;
    private ngZone;
    private platform;
    private resizeService;
    private elementRef;
    data: ReadonlyArray<NzTableData>;
    scrollX: string | null;
    scrollY: string | null;
    contentTemplate: TemplateRef<NzSafeAny> | null;
    widthConfig: string[];
    listOfColWidth: ReadonlyArray<string | null>;
    theadTemplate: TemplateRef<NzSafeAny> | null;
    virtualTemplate: TemplateRef<NzSafeAny> | null;
    virtualItemSize: number;
    virtualMaxBufferPx: number;
    virtualMinBufferPx: number;
    tableMainElement?: HTMLDivElement;
    virtualForTrackBy: TrackByFunction<NzTableData>;
    tableHeaderElement: ElementRef;
    tableBodyElement: ElementRef;
    cdkVirtualScrollViewport?: CdkVirtualScrollViewport;
    headerStyleMap: {};
    bodyStyleMap: {};
    verticalScrollBarWidth: number;
    noDateVirtualHeight: string;
    private data$;
    private scroll$;
    private destroy$;
    setScrollPositionClassName(clear?: boolean): void;
    constructor(renderer: Renderer2, ngZone: NgZone, platform: Platform, resizeService: NzResizeService, elementRef: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
