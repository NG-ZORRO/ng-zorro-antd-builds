/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzGraphData } from './data-source/graph-data-source';
import { NzGraphNodeComponent } from './graph-node.component';
import { NzGraphZoomDirective } from './graph-zoom.directive';
import { NzGraphDataDef, NzGraphEdge, NzGraphEdgeDef, NzGraphGroupNode, NzGraphLayoutConfig, NzGraphNode, NzGraphNodeDef, NzGraphOption, NzRankDirection } from './interface';
/** Checks whether an object is a data source. */
export declare function isDataSource(value: NzSafeAny): value is NzGraphData;
export declare class NzGraphComponent implements OnInit, OnChanges, AfterViewInit, AfterContentChecked, OnDestroy {
    private cdr;
    private elementRef;
    noAnimation?: NzNoAnimationDirective | undefined;
    nzGraphZoom?: NzGraphZoomDirective | undefined;
    static ngAcceptInputType_nzAutoSize: BooleanInput;
    listOfNodeElement: QueryList<ElementRef>;
    listOfNodeComponent: QueryList<NzGraphNodeComponent>;
    nodeTemplate?: TemplateRef<{
        $implicit: NzGraphNode;
    }>;
    groupNodeTemplate?: TemplateRef<{
        $implicit: NzGraphGroupNode;
    }>;
    customGraphEdgeTemplate?: TemplateRef<{
        $implicit: NzGraphEdge;
    }>;
    /**
     * Provides a stream containing the latest data array to render.
     * Data source can be an observable of NzGraphData, or a NzGraphData to render.
     */
    nzGraphData: NzGraphData;
    nzRankDirection: NzRankDirection;
    nzGraphLayoutConfig?: NzGraphLayoutConfig;
    nzAutoSize: boolean;
    readonly nzGraphInitialized: EventEmitter<NzGraphComponent>;
    readonly nzGraphRendered: EventEmitter<NzGraphComponent>;
    readonly nzNodeClick: EventEmitter<NzGraphNode | NzGraphGroupNode>;
    requestId: number;
    transformStyle: string;
    graphRenderedSubject$: ReplaySubject<void>;
    renderInfo: NzGraphGroupNode;
    mapOfNodeAttr: {
        [key: string]: NzGraphNodeDef;
    };
    mapOfEdgeAttr: {
        [key: string]: NzGraphEdgeDef;
    };
    zoom: number;
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
    constructor(cdr: ChangeDetectorRef, elementRef: ElementRef, noAnimation?: NzNoAnimationDirective | undefined, nzGraphZoom?: NzGraphZoomDirective | undefined);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngAfterContentChecked(): void;
    ngOnDestroy(): void;
    /**
     * Emit event
     */
    clickNode(node: NzGraphNode | NzGraphGroupNode): void;
    /**
     * Move graph to center and scale automatically
     */
    fitCenter(): void;
    /**
     * re-Draw graph
     * @param data
     * @param options
     * @param needResize
     */
    drawGraph(data: NzGraphDataDef, options: NzGraphOption, needResize?: boolean): Promise<void>;
    /**
     * Redraw all nodes
     * @param animate
     */
    drawNodes(animate?: boolean): Promise<void>;
    private resizeNodeSize;
    /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the node outlet. Otherwise start listening for new data.
     */
    private _switchDataSource;
    /** Set up a subscription for the data provided by the data source. */
    private observeRenderChanges;
    /**
     * Get renderInfo and prepare some data
     * @param data
     * @param options
     * @private
     */
    private buildGraphInfo;
    /**
     * Play with animation
     * @private
     */
    private makeNodesAnimation;
    private parseInfo;
    /**
     * Merge config with user inputs
     * @param config
     * @private
     */
    private mergeConfig;
}
