/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzGraphData } from './data-source/graph-data-source';
import { NzGraphMinimapComponent } from './graph-minimap.component';
import { NzGraphNodeDirective } from './graph-node.directive';
import { NzGraphSvgContainerComponent, NzZoomTransform } from './graph-svg-container.component';
import { NzGraphDataDef, NzGraphEdge, NzGraphEdgeDef, NzGraphGroupNode, NzGraphLayoutSetting, NzGraphNode, NzGraphNodeDef, NzGraphOption, NzRankDirection } from './interface';
/** Checks whether an object is a data source. */
export declare function isDataSource(value: NzSafeAny): value is NzGraphData;
export declare class NzGraphComponent implements OnInit, OnChanges, AfterViewInit, AfterContentChecked, OnDestroy {
    private cdr;
    private ngZone;
    private elementRef;
    static ngAcceptInputType_nzShowMinimap: BooleanInput;
    static ngAcceptInputType_nzAutoSize: BooleanInput;
    static ngAcceptInputType_nzShowArrow: BooleanInput;
    graphNodes: QueryList<NzGraphNodeDirective>;
    svgContainerComponent: NzGraphSvgContainerComponent;
    minimap: NzGraphMinimapComponent | undefined;
    set customNode(value: TemplateRef<{
        $implicit: NzGraphNode | NzGraphGroupNode;
    }>);
    /**
     * Provides a stream containing the latest data array to render.
     * Data source can be an observable of NzGraphData, or a NzGraphData to render.
     */
    nzGraphData: NzGraphData;
    nzRankDirection: NzRankDirection;
    nzGraphLayoutSettings?: NzGraphLayoutSetting;
    nzShowMinimap: boolean;
    nzShowArrow: boolean;
    nzZoom: number;
    nzAutoSize: boolean;
    readonly nzGraphInitialized: EventEmitter<void>;
    readonly nzZoomInit: EventEmitter<void>;
    readonly nzTransformEvent: EventEmitter<NzZoomTransform>;
    readonly nzNodeClick: EventEmitter<NzGraphNode | NzGraphGroupNode>;
    renderInfo: NzGraphGroupNode;
    mapOfNodeAttr: {
        [key: string]: NzGraphNodeDef;
    };
    mapOfEdgeAttr: {
        [key: string]: NzGraphEdgeDef;
    };
    customNodeTemplate: TemplateRef<{
        $implicit: NzGraphGroupNode | NzGraphNode;
    }> | null;
    readonly typedNodes: (item: unknown) => (NzGraphGroupNode | NzGraphNode)[];
    private dataSource?;
    private layoutSetting;
    /** Data subscription */
    private _dataSubscription?;
    private destroy$;
    nodeTrackByFun: (_: number, node: NzGraphNode | NzGraphGroupNode) => any;
    edgeTrackByFun: (_: number, edge: NzGraphEdge) => string;
    subGraphTransform: (node: NzGraphGroupNode) => string;
    coreTransform: (node: NzGraphGroupNode) => string;
    constructor(cdr: ChangeDetectorRef, ngZone: NgZone, elementRef: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngAfterContentChecked(): void;
    ngOnDestroy(): void;
    /**
     * Transform event
     */
    triggerTransform($event: {
        x: number;
        y: number;
        k: number;
    }): void;
    /**
     * Emit event
     */
    clickNode(node: NzGraphNode | NzGraphGroupNode): void;
    /**
     * Move graph to center
     */
    autoFit(): void;
    /**
     * Refactor
     */
    toggleNode(node: string, expanded: boolean): void;
    renderGraph(data: NzGraphDataDef, options: NzGraphOption): void;
    /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the node outlet. Otherwise start listening for new data.
     */
    private _switchDataSource;
    /** Set up a subscription for the data provided by the data source. */
    private observeRenderChanges;
    private setRenderInfo;
    private buildGraphInfo;
    private resizeNodes;
    private assignRenderInfo;
    private makeNodesAnimation;
    private parseInfo;
    private drawMinimap;
}
