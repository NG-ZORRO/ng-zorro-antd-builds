import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, EventEmitter, Host, Input, Optional, Output, TemplateRef, ViewChildren, ViewEncapsulation } from '@angular/core';
import { forkJoin, ReplaySubject, Subject } from 'rxjs';
import { finalize, take, takeUntil } from 'rxjs/operators';
import { buildGraph } from 'dagre-compound';
import { cancelRequestAnimationFrame } from 'ng-zorro-antd/core/polyfill';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { calculateTransform } from './core/utils';
import { NzGraph } from './graph';
import { NzGraphEdgeDirective } from './graph-edge.directive';
import { NzGraphGroupNodeDirective } from './graph-group-node.directive';
import { NzGraphNodeComponent } from './graph-node.component';
import { NzGraphNodeDirective } from './graph-node.directive';
import { nzTypeDefinition, NZ_GRAPH_LAYOUT_SETTING } from './interface';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/no-animation";
import * as i2 from "./graph-zoom.directive";
import * as i3 from "./graph-defs.component";
import * as i4 from "./graph-edge.component";
import * as i5 from "./graph-node.component";
import * as i6 from "@angular/common";
/** Checks whether an object is a data source. */
export function isDataSource(value) {
    // Check if the value is a DataSource by observing if it has a connect function. Cannot
    // be checked as an `instanceof DataSource` since people could create their own sources
    // that match the interface, but don't extend DataSource.
    return value && typeof value.connect === 'function';
}
export class NzGraphComponent {
    constructor(cdr, elementRef, noAnimation, nzGraphZoom) {
        this.cdr = cdr;
        this.elementRef = elementRef;
        this.noAnimation = noAnimation;
        this.nzGraphZoom = nzGraphZoom;
        this.nzRankDirection = 'LR';
        this.nzAutoSize = false;
        this.nzGraphInitialized = new EventEmitter();
        this.nzGraphRendered = new EventEmitter();
        this.nzNodeClick = new EventEmitter();
        this.requestId = -1;
        this.transformStyle = '';
        this.graphRenderedSubject$ = new ReplaySubject(1);
        this.renderInfo = { labelHeight: 0 };
        this.mapOfNodeAttr = {};
        this.mapOfEdgeAttr = {};
        this.zoom = 1;
        this.typedNodes = nzTypeDefinition();
        this.layoutSetting = NZ_GRAPH_LAYOUT_SETTING;
        this.destroy$ = new Subject();
        this.nodeTrackByFun = (_, node) => node.name;
        this.edgeTrackByFun = (_, edge) => `${edge.v}-${edge.w}`;
        this.subGraphTransform = (node) => {
            const x = node.x - node.coreBox.width / 2.0;
            const y = node.y - node.height / 2.0 + node.paddingTop;
            return `translate(${x}, ${y})`;
        };
        this.$asNzGraphEdges = (data) => data;
        this.coreTransform = (node) => `translate(0, ${node.parentNodeName ? node.labelHeight : 0})`;
    }
    ngOnInit() {
        this.graphRenderedSubject$.pipe(take(1), takeUntil(this.destroy$)).subscribe(() => {
            // Only zooming is not set, move graph to center
            if (!this.nzGraphZoom) {
                this.fitCenter();
            }
            this.nzGraphInitialized.emit(this);
        });
    }
    ngOnChanges(changes) {
        const { nzAutoFit, nzRankDirection, nzGraphData, nzGraphLayoutConfig } = changes;
        if (nzGraphLayoutConfig) {
            this.layoutSetting = this.mergeConfig(nzGraphLayoutConfig.currentValue);
        }
        if (nzGraphData) {
            if (this.dataSource !== this.nzGraphData) {
                this._switchDataSource(this.nzGraphData);
            }
        }
        if ((nzAutoFit && !nzAutoFit.firstChange) || (nzRankDirection && !nzRankDirection.firstChange)) {
            // Render graph
            if (this.dataSource.dataSource) {
                this.drawGraph(this.dataSource.dataSource, {
                    rankDirection: this.nzRankDirection,
                    expanded: this.dataSource.expansionModel.selected || []
                }).then(() => {
                    this.cdr.markForCheck();
                });
            }
        }
        this.cdr.markForCheck();
    }
    ngAfterContentChecked() {
        if (this.dataSource && !this._dataSubscription) {
            this.observeRenderChanges();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        if (this.dataSource && typeof this.dataSource.disconnect === 'function') {
            this.dataSource.disconnect();
        }
        if (this._dataSubscription) {
            this._dataSubscription.unsubscribe();
            this._dataSubscription = null;
        }
        cancelRequestAnimationFrame(this.requestId);
    }
    /**
     * Move graph to center and scale automatically
     */
    fitCenter() {
        const { x, y, k } = calculateTransform(this.elementRef.nativeElement.querySelector('svg'), this.elementRef.nativeElement.querySelector('svg > g'));
        if (k) {
            this.zoom = k;
            this.transformStyle = `translate(${x}, ${y})scale(${k})`;
        }
        this.cdr.markForCheck();
    }
    /**
     * re-Draw graph
     *
     * @param data
     * @param options
     * @param needResize
     */
    drawGraph(data, options, needResize = false) {
        return new Promise(resolve => {
            this.requestId = requestAnimationFrame(() => {
                const renderInfo = this.buildGraphInfo(data, options);
                // TODO
                // Need better performance
                this.renderInfo = renderInfo;
                this.cdr.markForCheck();
                this.requestId = requestAnimationFrame(() => {
                    this.drawNodes(!this.noAnimation?.nzNoAnimation).then(() => {
                        // Update element
                        this.cdr.markForCheck();
                        if (needResize) {
                            this.resizeNodeSize().then(() => {
                                const dataSource = this.dataSource.dataSource;
                                this.drawGraph(dataSource, options, false).then(() => resolve());
                            });
                        }
                        else {
                            this.graphRenderedSubject$.next();
                            this.nzGraphRendered.emit(this);
                            resolve();
                        }
                    });
                });
            });
            this.cdr.markForCheck();
        });
    }
    /**
     * Redraw all nodes
     *
     * @param animate
     */
    drawNodes(animate = true) {
        return new Promise(resolve => {
            if (animate) {
                this.makeNodesAnimation().subscribe(() => {
                    resolve();
                });
            }
            else {
                this.listOfNodeComponent.map(node => {
                    node.makeNoAnimation();
                });
                resolve();
            }
        });
    }
    resizeNodeSize() {
        return new Promise(resolve => {
            const dataSource = this.dataSource.dataSource;
            let scale = this.nzGraphZoom?.nzZoom || this.zoom || 1;
            this.listOfNodeElement.forEach(nodeEle => {
                const contentEle = nodeEle.nativeElement;
                if (contentEle) {
                    let width;
                    let height;
                    // Check if foreignObject is set
                    const clientRect = contentEle.querySelector('foreignObject > :first-child')?.getBoundingClientRect();
                    if (clientRect) {
                        width = clientRect.width;
                        height = clientRect.height;
                    }
                    else {
                        const bBoxRect = contentEle.getBBox();
                        width = bBoxRect.width;
                        height = bBoxRect.height;
                        // getBBox will return actual value
                        scale = 1;
                    }
                    // Element id type is string
                    const node = dataSource.nodes.find(n => `${n.id}` === nodeEle.nativeElement.id);
                    if (node && width && height) {
                        node.height = height / scale;
                        node.width = width / scale;
                    }
                }
            });
            resolve();
        });
    }
    /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the node outlet. Otherwise start listening for new data.
     */
    _switchDataSource(dataSource) {
        if (this.dataSource && typeof this.dataSource.disconnect === 'function') {
            this.nzGraphData.disconnect();
        }
        if (this._dataSubscription) {
            this._dataSubscription.unsubscribe();
            this._dataSubscription = null;
        }
        this.dataSource = dataSource;
        this.observeRenderChanges();
    }
    /** Set up a subscription for the data provided by the data source. */
    observeRenderChanges() {
        let dataStream;
        let graphOptions = {
            rankDirection: this.nzRankDirection
        };
        if (isDataSource(this.dataSource)) {
            dataStream = this.dataSource.connect();
        }
        if (dataStream) {
            this._dataSubscription = dataStream.pipe(takeUntil(this.destroy$)).subscribe(data => {
                graphOptions = {
                    rankDirection: this.nzRankDirection,
                    expanded: this.nzGraphData.expansionModel.selected
                };
                this.drawGraph(data, graphOptions, this.nzAutoSize).then(() => {
                    this.cdr.detectChanges();
                });
            });
        }
        else {
            throw Error(`A valid data source must be provided.`);
        }
    }
    /**
     * Get renderInfo and prepare some data
     *
     * @param data
     * @param options
     * @private
     */
    buildGraphInfo(data, options) {
        this.parseInfo(data);
        const renderInfo = buildGraph(data, options, this.layoutSetting);
        const dig = (nodes) => {
            nodes.forEach(node => {
                const { x, y } = node;
                node.xOffset = x;
                node.yOffset = y;
                if (node.type === 1 && this.mapOfNodeAttr.hasOwnProperty(node.name)) {
                    Object.assign(node, this.mapOfNodeAttr[node.name]);
                }
                else if (node.type === 0) {
                    node.edges.forEach(edge => {
                        if (this.mapOfEdgeAttr.hasOwnProperty(`${edge.v}-${edge.w}`)) {
                            Object.assign(edge, this.mapOfEdgeAttr[`${edge.v}-${edge.w}`]);
                        }
                    });
                    dig(node.nodes);
                }
            });
        };
        dig(renderInfo.nodes);
        // Assign data to edges of root graph
        renderInfo.edges.forEach(edge => {
            if (this.mapOfEdgeAttr.hasOwnProperty(`${edge.v}-${edge.w}`)) {
                Object.assign(edge, this.mapOfEdgeAttr[`${edge.v}-${edge.w}`]);
            }
        });
        return renderInfo;
    }
    /**
     * Play with animation
     *
     * @private
     */
    makeNodesAnimation() {
        return forkJoin(...this.listOfNodeComponent.map(node => node.makeAnimation())).pipe(finalize(() => {
            this.cdr.detectChanges();
        }));
    }
    parseInfo(data) {
        data.nodes.forEach(n => {
            this.mapOfNodeAttr[n.id] = n;
        });
        data.edges.forEach(e => {
            this.mapOfEdgeAttr[`${e.v}-${e.w}`] = e;
        });
    }
    /**
     * Merge config with user inputs
     *
     * @param config
     * @private
     */
    mergeConfig(config) {
        const graphMeta = config?.layout || {};
        const subSceneMeta = config?.subScene || {};
        const defaultNodeMeta = config?.defaultNode || {};
        const defaultCompoundNodeMeta = config?.defaultCompoundNode || {};
        const bridge = NZ_GRAPH_LAYOUT_SETTING.nodeSize.bridge;
        const graph = { meta: { ...NZ_GRAPH_LAYOUT_SETTING.graph.meta, ...graphMeta } };
        const subScene = {
            meta: { ...NZ_GRAPH_LAYOUT_SETTING.subScene.meta, ...subSceneMeta }
        };
        const nodeSize = {
            meta: { ...NZ_GRAPH_LAYOUT_SETTING.nodeSize.meta, ...defaultCompoundNodeMeta },
            node: { ...NZ_GRAPH_LAYOUT_SETTING.nodeSize.node, ...defaultNodeMeta },
            bridge
        };
        return { graph, subScene, nodeSize };
    }
}
NzGraphComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzGraphComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i1.NzNoAnimationDirective, host: true, optional: true }, { token: i2.NzGraphZoomDirective, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzGraphComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzGraphComponent, selector: "nz-graph", inputs: { nzGraphData: "nzGraphData", nzRankDirection: "nzRankDirection", nzGraphLayoutConfig: "nzGraphLayoutConfig", nzAutoSize: "nzAutoSize" }, outputs: { nzGraphInitialized: "nzGraphInitialized", nzGraphRendered: "nzGraphRendered", nzNodeClick: "nzNodeClick" }, host: { properties: { "class.nz-graph": "true", "class.nz-graph-auto-size": "nzAutoSize" } }, providers: [{ provide: NzGraph, useExisting: NzGraphComponent }], queries: [{ propertyName: "nodeTemplate", first: true, predicate: NzGraphNodeDirective, descendants: true, read: TemplateRef, static: true }, { propertyName: "groupNodeTemplate", first: true, predicate: NzGraphGroupNodeDirective, descendants: true, read: TemplateRef, static: true }, { propertyName: "customGraphEdgeTemplate", first: true, predicate: NzGraphEdgeDirective, descendants: true, read: TemplateRef, static: true }], viewQueries: [{ propertyName: "listOfNodeElement", predicate: NzGraphNodeComponent, descendants: true, read: ElementRef }, { propertyName: "listOfNodeComponent", predicate: NzGraphNodeComponent, descendants: true }], exportAs: ["nzGraph"], usesOnChanges: true, ngImport: i0, template: `
    <ng-content></ng-content>
    <svg width="100%" height="100%">
      <svg:defs nz-graph-defs></svg:defs>
      <svg:g [attr.transform]="transformStyle">
        <ng-container
          [ngTemplateOutlet]="groupTemplate"
          [ngTemplateOutletContext]="{ renderNode: renderInfo, type: 'root' }"
        ></ng-container>
      </svg:g>
    </svg>

    <ng-template #groupTemplate let-renderNode="renderNode" let-type="type">
      <svg:g [attr.transform]="type === 'sub' ? subGraphTransform(renderNode) : null">
        <svg:g class="core" [attr.transform]="coreTransform(renderNode)">
          <svg:g class="nz-graph-edges">
            <ng-container *ngFor="let edge of $asNzGraphEdges(renderNode.edges); trackBy: edgeTrackByFun">
              <g
                class="nz-graph-edge"
                nz-graph-edge
                [edge]="edge"
                [edgeType]="nzGraphLayoutConfig?.defaultEdge?.type"
                [customTemplate]="customGraphEdgeTemplate"
              ></g>
            </ng-container>
          </svg:g>

          <svg:g class="nz-graph-nodes">
            <ng-container *ngFor="let node of typedNodes(renderNode.nodes); trackBy: nodeTrackByFun">
              <g
                *ngIf="node.type === 1"
                class="nz-graph-node"
                nz-graph-node
                [node]="node"
                [customTemplate]="nodeTemplate"
              ></g>
              <g
                *ngIf="node.type === 0"
                class="nz-graph-node"
                nz-graph-node
                [node]="node"
                [customTemplate]="groupNodeTemplate"
              ></g>
              <ng-container
                *ngIf="node.expanded"
                [ngTemplateOutlet]="groupTemplate"
                [ngTemplateOutletContext]="{ renderNode: node, type: 'sub' }"
              ></ng-container>
            </ng-container>
          </svg:g>
        </svg:g>
      </svg:g>
    </ng-template>
  `, isInline: true, components: [{ type: i3.NzGraphDefsComponent, selector: "svg:defs[nz-graph-defs]" }, { type: i4.NzGraphEdgeComponent, selector: "[nz-graph-edge]", inputs: ["edge", "edgeType", "customTemplate"] }, { type: i5.NzGraphNodeComponent, selector: "[nz-graph-node]", inputs: ["node", "noAnimation", "customTemplate"] }], directives: [{ type: i6.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzGraphComponent.prototype, "nzAutoSize", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzGraphComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-graph',
                    exportAs: 'nzGraph',
                    providers: [{ provide: NzGraph, useExisting: NzGraphComponent }],
                    template: `
    <ng-content></ng-content>
    <svg width="100%" height="100%">
      <svg:defs nz-graph-defs></svg:defs>
      <svg:g [attr.transform]="transformStyle">
        <ng-container
          [ngTemplateOutlet]="groupTemplate"
          [ngTemplateOutletContext]="{ renderNode: renderInfo, type: 'root' }"
        ></ng-container>
      </svg:g>
    </svg>

    <ng-template #groupTemplate let-renderNode="renderNode" let-type="type">
      <svg:g [attr.transform]="type === 'sub' ? subGraphTransform(renderNode) : null">
        <svg:g class="core" [attr.transform]="coreTransform(renderNode)">
          <svg:g class="nz-graph-edges">
            <ng-container *ngFor="let edge of $asNzGraphEdges(renderNode.edges); trackBy: edgeTrackByFun">
              <g
                class="nz-graph-edge"
                nz-graph-edge
                [edge]="edge"
                [edgeType]="nzGraphLayoutConfig?.defaultEdge?.type"
                [customTemplate]="customGraphEdgeTemplate"
              ></g>
            </ng-container>
          </svg:g>

          <svg:g class="nz-graph-nodes">
            <ng-container *ngFor="let node of typedNodes(renderNode.nodes); trackBy: nodeTrackByFun">
              <g
                *ngIf="node.type === 1"
                class="nz-graph-node"
                nz-graph-node
                [node]="node"
                [customTemplate]="nodeTemplate"
              ></g>
              <g
                *ngIf="node.type === 0"
                class="nz-graph-node"
                nz-graph-node
                [node]="node"
                [customTemplate]="groupNodeTemplate"
              ></g>
              <ng-container
                *ngIf="node.expanded"
                [ngTemplateOutlet]="groupTemplate"
                [ngTemplateOutletContext]="{ renderNode: node, type: 'sub' }"
              ></ng-container>
            </ng-container>
          </svg:g>
        </svg:g>
      </svg:g>
    </ng-template>
  `,
                    host: {
                        '[class.nz-graph]': 'true',
                        '[class.nz-graph-auto-size]': 'nzAutoSize'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i1.NzNoAnimationDirective, decorators: [{
                    type: Host
                }, {
                    type: Optional
                }] }, { type: i2.NzGraphZoomDirective, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { listOfNodeElement: [{
                type: ViewChildren,
                args: [NzGraphNodeComponent, { read: ElementRef }]
            }], listOfNodeComponent: [{
                type: ViewChildren,
                args: [NzGraphNodeComponent]
            }], nodeTemplate: [{
                type: ContentChild,
                args: [NzGraphNodeDirective, { static: true, read: TemplateRef }]
            }], groupNodeTemplate: [{
                type: ContentChild,
                args: [NzGraphGroupNodeDirective, { static: true, read: TemplateRef }]
            }], customGraphEdgeTemplate: [{
                type: ContentChild,
                args: [NzGraphEdgeDirective, { static: true, read: TemplateRef }]
            }], nzGraphData: [{
                type: Input
            }], nzRankDirection: [{
                type: Input
            }], nzGraphLayoutConfig: [{
                type: Input
            }], nzAutoSize: [{
                type: Input
            }], nzGraphInitialized: [{
                type: Output
            }], nzGraphRendered: [{
                type: Output
            }], nzNodeClick: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGguY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9ncmFwaC9ncmFwaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFFTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLElBQUksRUFDSixLQUFLLEVBSUwsUUFBUSxFQUNSLE1BQU0sRUFHTixXQUFXLEVBQ1gsWUFBWSxFQUNaLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFjLGFBQWEsRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc1QyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRWxELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDbEMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDekUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFOUQsT0FBTyxFQVdMLGdCQUFnQixFQUNoQix1QkFBdUIsRUFDeEIsTUFBTSxhQUFhLENBQUM7Ozs7Ozs7O0FBRXJCLGlE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QUNHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFDbUIsVUFBVTtzQkFBbEMsS0FBSztnQkFFYSxrQkFBa0I7c0JBQXBDLE1BQU07Z0JBQ1ksZUFBZTtzQkFBakMsTUFBTTtnQkFDWSxXQUFXO3NCQUE3QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkcmVuLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZvcmtKb2luLCBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0LCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbmFsaXplLCB0YWtlLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IGJ1aWxkR3JhcGggfSBmcm9tICdkYWdyZS1jb21wb3VuZCc7XG5cbmltcG9ydCB7IE56Tm9BbmltYXRpb25EaXJlY3RpdmUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvbm8tYW5pbWF0aW9uJztcbmltcG9ydCB7IGNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9wb2x5ZmlsbCc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IGNhbGN1bGF0ZVRyYW5zZm9ybSB9IGZyb20gJy4vY29yZS91dGlscyc7XG5pbXBvcnQgeyBOekdyYXBoRGF0YSB9IGZyb20gJy4vZGF0YS1zb3VyY2UvZ3JhcGgtZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHsgTnpHcmFwaCB9IGZyb20gJy4vZ3JhcGgnO1xuaW1wb3J0IHsgTnpHcmFwaEVkZ2VEaXJlY3RpdmUgfSBmcm9tICcuL2dyYXBoLWVkZ2UuZGlyZWN0aXZlJztcbmltcG9ydCB7IE56R3JhcGhHcm91cE5vZGVEaXJlY3RpdmUgfSBmcm9tICcuL2dyYXBoLWdyb3VwLW5vZGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IE56R3JhcGhOb2RlQ29tcG9uZW50IH0gZnJvbSAnLi9ncmFwaC1ub2RlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOekdyYXBoTm9kZURpcmVjdGl2ZSB9IGZyb20gJy4vZ3JhcGgtbm9kZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpHcmFwaFpvb21EaXJlY3RpdmUgfSBmcm9tICcuL2dyYXBoLXpvb20uZGlyZWN0aXZlJztcbmltcG9ydCB7XG4gIE56R3JhcGhEYXRhRGVmLFxuICBOekdyYXBoRWRnZSxcbiAgTnpHcmFwaEVkZ2VEZWYsXG4gIE56R3JhcGhHcm91cE5vZGUsXG4gIE56R3JhcGhMYXlvdXRDb25maWcsXG4gIE56R3JhcGhOb2RlLFxuICBOekdyYXBoTm9kZURlZixcbiAgTnpHcmFwaE9wdGlvbixcbiAgTnpMYXlvdXRTZXR0aW5nLFxuICBOelJhbmtEaXJlY3Rpb24sXG4gIG56VHlwZURlZmluaXRpb24sXG4gIE5aX0dSQVBIX0xBWU9VVF9TRVRUSU5HXG59IGZyb20gJy4vaW50ZXJmYWNlJztcblxuLyoqIENoZWNrcyB3aGV0aGVyIGFuIG9iamVjdCBpcyBhIGRhdGEgc291cmNlLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRGF0YVNvdXJjZSh2YWx1ZTogTnpTYWZlQW55KTogdmFsdWUgaXMgTnpHcmFwaERhdGEge1xuICAvLyBDaGVjayBpZiB0aGUgdmFsdWUgaXMgYSBEYXRhU291cmNlIGJ5IG9ic2VydmluZyBpZiBpdCBoYXMgYSBjb25uZWN0IGZ1bmN0aW9uLiBDYW5ub3RcbiAgLy8gYmUgY2hlY2tlZCBhcyBhbiBgaW5zdGFuY2VvZiBEYXRhU291cmNlYCBzaW5jZSBwZW9wbGUgY291bGQgY3JlYXRlIHRoZWlyIG93biBzb3VyY2VzXG4gIC8vIHRoYXQgbWF0Y2ggdGhlIGludGVyZmFjZSwgYnV0IGRvbid0IGV4dGVuZCBEYXRhU291cmNlLlxuICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlLmNvbm5lY3QgPT09ICdmdW5jdGlvbic7XG59XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6ICduei1ncmFwaCcsXG4gIGV4cG9ydEFzOiAnbnpHcmFwaCcsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTnpHcmFwaCwgdXNlRXhpc3Rpbmc6IE56R3JhcGhDb21wb25lbnQgfV0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPlxuICAgICAgPHN2ZzpkZWZzIG56LWdyYXBoLWRlZnM+PC9zdmc6ZGVmcz5cbiAgICAgIDxzdmc6ZyBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtU3R5bGVcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImdyb3VwVGVtcGxhdGVcIlxuICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IHJlbmRlck5vZGU6IHJlbmRlckluZm8sIHR5cGU6ICdyb290JyB9XCJcbiAgICAgICAgPjwvbmctY29udGFpbmVyPlxuICAgICAgPC9zdmc6Zz5cbiAgICA8L3N2Zz5cblxuICAgIDxuZy10ZW1wbGF0ZSAjZ3JvdXBUZW1wbGF0ZSBsZXQtcmVuZGVyTm9kZT1cInJlbmRlck5vZGVcIiBsZXQtdHlwZT1cInR5cGVcIj5cbiAgICAgIDxzdmc6ZyBbYXR0ci50cmFuc2Zvcm1dPVwidHlwZSA9PT0gJ3N1YicgPyBzdWJHcmFwaFRyYW5zZm9ybShyZW5kZXJOb2RlKSA6IG51bGxcIj5cbiAgICAgICAgPHN2ZzpnIGNsYXNzPVwiY29yZVwiIFthdHRyLnRyYW5zZm9ybV09XCJjb3JlVHJhbnNmb3JtKHJlbmRlck5vZGUpXCI+XG4gICAgICAgICAgPHN2ZzpnIGNsYXNzPVwibnotZ3JhcGgtZWRnZXNcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGVkZ2Ugb2YgJGFzTnpHcmFwaEVkZ2VzKHJlbmRlck5vZGUuZWRnZXMpOyB0cmFja0J5OiBlZGdlVHJhY2tCeUZ1blwiPlxuICAgICAgICAgICAgICA8Z1xuICAgICAgICAgICAgICAgIGNsYXNzPVwibnotZ3JhcGgtZWRnZVwiXG4gICAgICAgICAgICAgICAgbnotZ3JhcGgtZWRnZVxuICAgICAgICAgICAgICAgIFtlZGdlXT1cImVkZ2VcIlxuICAgICAgICAgICAgICAgIFtlZGdlVHlwZV09XCJuekdyYXBoTGF5b3V0Q29uZmlnPy5kZWZhdWx0RWRnZT8udHlwZVwiXG4gICAgICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImN1c3RvbUdyYXBoRWRnZVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgPjwvZz5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvc3ZnOmc+XG5cbiAgICAgICAgICA8c3ZnOmcgY2xhc3M9XCJuei1ncmFwaC1ub2Rlc1wiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbm9kZSBvZiB0eXBlZE5vZGVzKHJlbmRlck5vZGUubm9kZXMpOyB0cmFja0J5OiBub2RlVHJhY2tCeUZ1blwiPlxuICAgICAgICAgICAgICA8Z1xuICAgICAgICAgICAgICAgICpuZ0lmPVwibm9kZS50eXBlID09PSAxXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cIm56LWdyYXBoLW5vZGVcIlxuICAgICAgICAgICAgICAgIG56LWdyYXBoLW5vZGVcbiAgICAgICAgICAgICAgICBbbm9kZV09XCJub2RlXCJcbiAgICAgICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwibm9kZVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgPjwvZz5cbiAgICAgICAgICAgICAgPGdcbiAgICAgICAgICAgICAgICAqbmdJZj1cIm5vZGUudHlwZSA9PT0gMFwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJuei1ncmFwaC1ub2RlXCJcbiAgICAgICAgICAgICAgICBuei1ncmFwaC1ub2RlXG4gICAgICAgICAgICAgICAgW25vZGVdPVwibm9kZVwiXG4gICAgICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImdyb3VwTm9kZVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgPjwvZz5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgICAgICpuZ0lmPVwibm9kZS5leHBhbmRlZFwiXG4gICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiZ3JvdXBUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgcmVuZGVyTm9kZTogbm9kZSwgdHlwZTogJ3N1YicgfVwiXG4gICAgICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvc3ZnOmc+XG4gICAgICAgIDwvc3ZnOmc+XG4gICAgICA8L3N2ZzpnPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm56LWdyYXBoXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLm56LWdyYXBoLWF1dG8tc2l6ZV0nOiAnbnpBdXRvU2l6ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekdyYXBoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudENoZWNrZWQsIE9uRGVzdHJveSwgTnpHcmFwaCB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekF1dG9TaXplOiBCb29sZWFuSW5wdXQ7XG5cbiAgQFZpZXdDaGlsZHJlbihOekdyYXBoTm9kZUNvbXBvbmVudCwgeyByZWFkOiBFbGVtZW50UmVmIH0pIGxpc3RPZk5vZGVFbGVtZW50ITogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuICBAVmlld0NoaWxkcmVuKE56R3JhcGhOb2RlQ29tcG9uZW50KSBsaXN0T2ZOb2RlQ29tcG9uZW50ITogUXVlcnlMaXN0PE56R3JhcGhOb2RlQ29tcG9uZW50PjtcblxuICBAQ29udGVudENoaWxkKE56R3JhcGhOb2RlRGlyZWN0aXZlLCB7IHN0YXRpYzogdHJ1ZSwgcmVhZDogVGVtcGxhdGVSZWYgfSkgbm9kZVRlbXBsYXRlPzogVGVtcGxhdGVSZWY8e1xuICAgICRpbXBsaWNpdDogTnpHcmFwaE5vZGU7XG4gIH0+O1xuICBAQ29udGVudENoaWxkKE56R3JhcGhHcm91cE5vZGVEaXJlY3RpdmUsIHsgc3RhdGljOiB0cnVlLCByZWFkOiBUZW1wbGF0ZVJlZiB9KSBncm91cE5vZGVUZW1wbGF0ZT86IFRlbXBsYXRlUmVmPHtcbiAgICAkaW1wbGljaXQ6IE56R3JhcGhHcm91cE5vZGU7XG4gIH0+O1xuICBAQ29udGVudENoaWxkKE56R3JhcGhFZGdlRGlyZWN0aXZlLCB7IHN0YXRpYzogdHJ1ZSwgcmVhZDogVGVtcGxhdGVSZWYgfSkgY3VzdG9tR3JhcGhFZGdlVGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjx7XG4gICAgJGltcGxpY2l0OiBOekdyYXBoRWRnZTtcbiAgfT47XG4gIC8qKlxuICAgKiBQcm92aWRlcyBhIHN0cmVhbSBjb250YWluaW5nIHRoZSBsYXRlc3QgZGF0YSBhcnJheSB0byByZW5kZXIuXG4gICAqIERhdGEgc291cmNlIGNhbiBiZSBhbiBvYnNlcnZhYmxlIG9mIE56R3JhcGhEYXRhLCBvciBhIE56R3JhcGhEYXRhIHRvIHJlbmRlci5cbiAgICovXG4gIEBJbnB1dCgpIG56R3JhcGhEYXRhITogTnpHcmFwaERhdGE7XG4gIEBJbnB1dCgpIG56UmFua0RpcmVjdGlvbjogTnpSYW5rRGlyZWN0aW9uID0gJ0xSJztcbiAgQElucHV0KCkgbnpHcmFwaExheW91dENvbmZpZz86IE56R3JhcGhMYXlvdXRDb25maWc7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekF1dG9TaXplID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56R3JhcGhJbml0aWFsaXplZCA9IG5ldyBFdmVudEVtaXR0ZXI8TnpHcmFwaENvbXBvbmVudD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56R3JhcGhSZW5kZXJlZCA9IG5ldyBFdmVudEVtaXR0ZXI8TnpHcmFwaENvbXBvbmVudD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Tm9kZUNsaWNrOiBFdmVudEVtaXR0ZXI8TnpHcmFwaE5vZGUgfCBOekdyYXBoR3JvdXBOb2RlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICByZXF1ZXN0SWQ6IG51bWJlciA9IC0xO1xuICB0cmFuc2Zvcm1TdHlsZSA9ICcnO1xuICBncmFwaFJlbmRlcmVkU3ViamVjdCQgPSBuZXcgUmVwbGF5U3ViamVjdDx2b2lkPigxKTtcbiAgcmVuZGVySW5mbzogTnpHcmFwaEdyb3VwTm9kZSA9IHsgbGFiZWxIZWlnaHQ6IDAgfSBhcyBOekdyYXBoR3JvdXBOb2RlO1xuICBtYXBPZk5vZGVBdHRyOiB7IFtrZXk6IHN0cmluZ106IE56R3JhcGhOb2RlRGVmIH0gPSB7fTtcbiAgbWFwT2ZFZGdlQXR0cjogeyBba2V5OiBzdHJpbmddOiBOekdyYXBoRWRnZURlZiB9ID0ge307XG4gIHpvb20gPSAxO1xuXG4gIHB1YmxpYyByZWFkb25seSB0eXBlZE5vZGVzID0gbnpUeXBlRGVmaW5pdGlvbjxBcnJheTxOekdyYXBoTm9kZSB8IE56R3JhcGhHcm91cE5vZGU+PigpO1xuICBwcml2YXRlIGRhdGFTb3VyY2U/OiBOekdyYXBoRGF0YTtcbiAgcHJpdmF0ZSBsYXlvdXRTZXR0aW5nOiBOekxheW91dFNldHRpbmcgPSBOWl9HUkFQSF9MQVlPVVRfU0VUVElORztcbiAgLyoqIERhdGEgc3Vic2NyaXB0aW9uICovXG4gIHByaXZhdGUgX2RhdGFTdWJzY3JpcHRpb24/OiBTdWJzY3JpcHRpb24gfCBudWxsO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBub2RlVHJhY2tCeUZ1biA9IChfOiBudW1iZXIsIG5vZGU6IE56R3JhcGhOb2RlIHwgTnpHcmFwaEdyb3VwTm9kZSk6IHN0cmluZyA9PiBub2RlLm5hbWU7XG4gIGVkZ2VUcmFja0J5RnVuID0gKF86IG51bWJlciwgZWRnZTogTnpHcmFwaEVkZ2UpOiBzdHJpbmcgPT4gYCR7ZWRnZS52fS0ke2VkZ2Uud31gO1xuXG4gIHN1YkdyYXBoVHJhbnNmb3JtID0gKG5vZGU6IE56R3JhcGhHcm91cE5vZGUpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IHggPSBub2RlLnggLSBub2RlLmNvcmVCb3gud2lkdGggLyAyLjA7XG4gICAgY29uc3QgeSA9IG5vZGUueSAtIG5vZGUuaGVpZ2h0IC8gMi4wICsgbm9kZS5wYWRkaW5nVG9wO1xuICAgIHJldHVybiBgdHJhbnNsYXRlKCR7eH0sICR7eX0pYDtcbiAgfTtcblxuICAkYXNOekdyYXBoRWRnZXMgPSAoZGF0YTogdW5rbm93bik6IE56R3JhcGhFZGdlW10gPT4gZGF0YSBhcyBOekdyYXBoRWRnZVtdO1xuXG4gIGNvcmVUcmFuc2Zvcm0gPSAobm9kZTogTnpHcmFwaEdyb3VwTm9kZSk6IHN0cmluZyA9PiBgdHJhbnNsYXRlKDAsICR7bm9kZS5wYXJlbnROb2RlTmFtZSA/IG5vZGUubGFiZWxIZWlnaHQgOiAwfSlgO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQEhvc3QoKSBAT3B0aW9uYWwoKSBwdWJsaWMgbm9BbmltYXRpb24/OiBOek5vQW5pbWF0aW9uRGlyZWN0aXZlLFxuICAgIEBPcHRpb25hbCgpIHB1YmxpYyBuekdyYXBoWm9vbT86IE56R3JhcGhab29tRGlyZWN0aXZlXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmdyYXBoUmVuZGVyZWRTdWJqZWN0JC5waXBlKHRha2UoMSksIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIC8vIE9ubHkgem9vbWluZyBpcyBub3Qgc2V0LCBtb3ZlIGdyYXBoIHRvIGNlbnRlclxuICAgICAgaWYgKCF0aGlzLm56R3JhcGhab29tKSB7XG4gICAgICAgIHRoaXMuZml0Q2VudGVyKCk7XG4gICAgICB9XG4gICAgICB0aGlzLm56R3JhcGhJbml0aWFsaXplZC5lbWl0KHRoaXMpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbnpBdXRvRml0LCBuelJhbmtEaXJlY3Rpb24sIG56R3JhcGhEYXRhLCBuekdyYXBoTGF5b3V0Q29uZmlnIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChuekdyYXBoTGF5b3V0Q29uZmlnKSB7XG4gICAgICB0aGlzLmxheW91dFNldHRpbmcgPSB0aGlzLm1lcmdlQ29uZmlnKG56R3JhcGhMYXlvdXRDb25maWcuY3VycmVudFZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAobnpHcmFwaERhdGEpIHtcbiAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2UgIT09IHRoaXMubnpHcmFwaERhdGEpIHtcbiAgICAgICAgdGhpcy5fc3dpdGNoRGF0YVNvdXJjZSh0aGlzLm56R3JhcGhEYXRhKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoKG56QXV0b0ZpdCAmJiAhbnpBdXRvRml0LmZpcnN0Q2hhbmdlKSB8fCAobnpSYW5rRGlyZWN0aW9uICYmICFuelJhbmtEaXJlY3Rpb24uZmlyc3RDaGFuZ2UpKSB7XG4gICAgICAvLyBSZW5kZXIgZ3JhcGhcbiAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2UhLmRhdGFTb3VyY2UpIHtcbiAgICAgICAgdGhpcy5kcmF3R3JhcGgodGhpcy5kYXRhU291cmNlIS5kYXRhU291cmNlLCB7XG4gICAgICAgICAgcmFua0RpcmVjdGlvbjogdGhpcy5uelJhbmtEaXJlY3Rpb24sXG4gICAgICAgICAgZXhwYW5kZWQ6IHRoaXMuZGF0YVNvdXJjZSEuZXhwYW5zaW9uTW9kZWwuc2VsZWN0ZWQgfHwgW11cbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRhdGFTb3VyY2UgJiYgIXRoaXMuX2RhdGFTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMub2JzZXJ2ZVJlbmRlckNoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG5cbiAgICBpZiAodGhpcy5kYXRhU291cmNlICYmIHR5cGVvZiB0aGlzLmRhdGFTb3VyY2UuZGlzY29ubmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5kYXRhU291cmNlLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZGF0YVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fZGF0YVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fZGF0YVN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuICAgIGNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlcXVlc3RJZCk7XG4gIH1cblxuICAvKipcbiAgICogTW92ZSBncmFwaCB0byBjZW50ZXIgYW5kIHNjYWxlIGF1dG9tYXRpY2FsbHlcbiAgICovXG4gIGZpdENlbnRlcigpOiB2b2lkIHtcbiAgICBjb25zdCB7IHgsIHksIGsgfSA9IGNhbGN1bGF0ZVRyYW5zZm9ybShcbiAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N2ZycpLFxuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3Rvcignc3ZnID4gZycpXG4gICAgKSE7XG4gICAgaWYgKGspIHtcbiAgICAgIHRoaXMuem9vbSA9IGs7XG4gICAgICB0aGlzLnRyYW5zZm9ybVN0eWxlID0gYHRyYW5zbGF0ZSgke3h9LCAke3l9KXNjYWxlKCR7a30pYDtcbiAgICB9XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogcmUtRHJhdyBncmFwaFxuICAgKlxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKiBAcGFyYW0gbmVlZFJlc2l6ZVxuICAgKi9cbiAgZHJhd0dyYXBoKGRhdGE6IE56R3JhcGhEYXRhRGVmLCBvcHRpb25zOiBOekdyYXBoT3B0aW9uLCBuZWVkUmVzaXplOiBib29sZWFuID0gZmFsc2UpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLnJlcXVlc3RJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlbmRlckluZm8gPSB0aGlzLmJ1aWxkR3JhcGhJbmZvKGRhdGEsIG9wdGlvbnMpO1xuICAgICAgICAvLyBUT0RPXG4gICAgICAgIC8vIE5lZWQgYmV0dGVyIHBlcmZvcm1hbmNlXG4gICAgICAgIHRoaXMucmVuZGVySW5mbyA9IHJlbmRlckluZm87XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB0aGlzLnJlcXVlc3RJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kcmF3Tm9kZXMoIXRoaXMubm9BbmltYXRpb24/Lm56Tm9BbmltYXRpb24pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gVXBkYXRlIGVsZW1lbnRcbiAgICAgICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgaWYgKG5lZWRSZXNpemUpIHtcbiAgICAgICAgICAgICAgdGhpcy5yZXNpemVOb2RlU2l6ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFTb3VyY2U6IE56R3JhcGhEYXRhRGVmID0gdGhpcy5kYXRhU291cmNlIS5kYXRhU291cmNlITtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdHcmFwaChkYXRhU291cmNlLCBvcHRpb25zLCBmYWxzZSkudGhlbigoKSA9PiByZXNvbHZlKCkpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuZ3JhcGhSZW5kZXJlZFN1YmplY3QkLm5leHQoKTtcbiAgICAgICAgICAgICAgdGhpcy5uekdyYXBoUmVuZGVyZWQuZW1pdCh0aGlzKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVkcmF3IGFsbCBub2Rlc1xuICAgKlxuICAgKiBAcGFyYW0gYW5pbWF0ZVxuICAgKi9cbiAgZHJhd05vZGVzKGFuaW1hdGU6IGJvb2xlYW4gPSB0cnVlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgaWYgKGFuaW1hdGUpIHtcbiAgICAgICAgdGhpcy5tYWtlTm9kZXNBbmltYXRpb24oKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxpc3RPZk5vZGVDb21wb25lbnQubWFwKG5vZGUgPT4ge1xuICAgICAgICAgIG5vZGUubWFrZU5vQW5pbWF0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlc2l6ZU5vZGVTaXplKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IGRhdGFTb3VyY2U6IE56R3JhcGhEYXRhRGVmID0gdGhpcy5kYXRhU291cmNlIS5kYXRhU291cmNlITtcbiAgICAgIGxldCBzY2FsZSA9IHRoaXMubnpHcmFwaFpvb20/Lm56Wm9vbSB8fCB0aGlzLnpvb20gfHwgMTtcbiAgICAgIHRoaXMubGlzdE9mTm9kZUVsZW1lbnQuZm9yRWFjaChub2RlRWxlID0+IHtcbiAgICAgICAgY29uc3QgY29udGVudEVsZSA9IG5vZGVFbGUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgaWYgKGNvbnRlbnRFbGUpIHtcbiAgICAgICAgICBsZXQgd2lkdGg6IG51bWJlcjtcbiAgICAgICAgICBsZXQgaGVpZ2h0OiBudW1iZXI7XG4gICAgICAgICAgLy8gQ2hlY2sgaWYgZm9yZWlnbk9iamVjdCBpcyBzZXRcbiAgICAgICAgICBjb25zdCBjbGllbnRSZWN0ID0gY29udGVudEVsZS5xdWVyeVNlbGVjdG9yKCdmb3JlaWduT2JqZWN0ID4gOmZpcnN0LWNoaWxkJyk/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgIGlmIChjbGllbnRSZWN0KSB7XG4gICAgICAgICAgICB3aWR0aCA9IGNsaWVudFJlY3Qud2lkdGg7XG4gICAgICAgICAgICBoZWlnaHQgPSBjbGllbnRSZWN0LmhlaWdodDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgYkJveFJlY3QgPSBjb250ZW50RWxlLmdldEJCb3goKTtcbiAgICAgICAgICAgIHdpZHRoID0gYkJveFJlY3Qud2lkdGg7XG4gICAgICAgICAgICBoZWlnaHQgPSBiQm94UmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICAvLyBnZXRCQm94IHdpbGwgcmV0dXJuIGFjdHVhbCB2YWx1ZVxuICAgICAgICAgICAgc2NhbGUgPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBFbGVtZW50IGlkIHR5cGUgaXMgc3RyaW5nXG4gICAgICAgICAgY29uc3Qgbm9kZSA9IGRhdGFTb3VyY2Uubm9kZXMuZmluZChuID0+IGAke24uaWR9YCA9PT0gbm9kZUVsZS5uYXRpdmVFbGVtZW50LmlkKTtcbiAgICAgICAgICBpZiAobm9kZSAmJiB3aWR0aCAmJiBoZWlnaHQpIHtcbiAgICAgICAgICAgIG5vZGUuaGVpZ2h0ID0gaGVpZ2h0IC8gc2NhbGU7XG4gICAgICAgICAgICBub2RlLndpZHRoID0gd2lkdGggLyBzY2FsZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN3aXRjaCB0byB0aGUgcHJvdmlkZWQgZGF0YSBzb3VyY2UgYnkgcmVzZXR0aW5nIHRoZSBkYXRhIGFuZCB1bnN1YnNjcmliaW5nIGZyb20gdGhlIGN1cnJlbnRcbiAgICogcmVuZGVyIGNoYW5nZSBzdWJzY3JpcHRpb24gaWYgb25lIGV4aXN0cy4gSWYgdGhlIGRhdGEgc291cmNlIGlzIG51bGwsIGludGVycHJldCB0aGlzIGJ5XG4gICAqIGNsZWFyaW5nIHRoZSBub2RlIG91dGxldC4gT3RoZXJ3aXNlIHN0YXJ0IGxpc3RlbmluZyBmb3IgbmV3IGRhdGEuXG4gICAqL1xuICBwcml2YXRlIF9zd2l0Y2hEYXRhU291cmNlKGRhdGFTb3VyY2U6IE56R3JhcGhEYXRhKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGF0YVNvdXJjZSAmJiB0eXBlb2YgdGhpcy5kYXRhU291cmNlLmRpc2Nvbm5lY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMubnpHcmFwaERhdGEuZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9kYXRhU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9kYXRhU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9kYXRhU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLmRhdGFTb3VyY2UgPSBkYXRhU291cmNlO1xuICAgIHRoaXMub2JzZXJ2ZVJlbmRlckNoYW5nZXMoKTtcbiAgfVxuXG4gIC8qKiBTZXQgdXAgYSBzdWJzY3JpcHRpb24gZm9yIHRoZSBkYXRhIHByb3ZpZGVkIGJ5IHRoZSBkYXRhIHNvdXJjZS4gKi9cbiAgcHJpdmF0ZSBvYnNlcnZlUmVuZGVyQ2hhbmdlcygpOiB2b2lkIHtcbiAgICBsZXQgZGF0YVN0cmVhbTogT2JzZXJ2YWJsZTxOekdyYXBoRGF0YURlZj4gfCB1bmRlZmluZWQ7XG4gICAgbGV0IGdyYXBoT3B0aW9uczogTnpHcmFwaE9wdGlvbiA9IHtcbiAgICAgIHJhbmtEaXJlY3Rpb246IHRoaXMubnpSYW5rRGlyZWN0aW9uXG4gICAgfTtcbiAgICBpZiAoaXNEYXRhU291cmNlKHRoaXMuZGF0YVNvdXJjZSkpIHtcbiAgICAgIGRhdGFTdHJlYW0gPSB0aGlzLmRhdGFTb3VyY2UuY29ubmVjdCgpO1xuICAgIH1cblxuICAgIGlmIChkYXRhU3RyZWFtKSB7XG4gICAgICB0aGlzLl9kYXRhU3Vic2NyaXB0aW9uID0gZGF0YVN0cmVhbS5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICBncmFwaE9wdGlvbnMgPSB7XG4gICAgICAgICAgcmFua0RpcmVjdGlvbjogdGhpcy5uelJhbmtEaXJlY3Rpb24sXG4gICAgICAgICAgZXhwYW5kZWQ6IHRoaXMubnpHcmFwaERhdGEuZXhwYW5zaW9uTW9kZWwuc2VsZWN0ZWRcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kcmF3R3JhcGgoZGF0YSwgZ3JhcGhPcHRpb25zLCB0aGlzLm56QXV0b1NpemUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoYEEgdmFsaWQgZGF0YSBzb3VyY2UgbXVzdCBiZSBwcm92aWRlZC5gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHJlbmRlckluZm8gYW5kIHByZXBhcmUgc29tZSBkYXRhXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIGJ1aWxkR3JhcGhJbmZvKGRhdGE6IE56R3JhcGhEYXRhRGVmLCBvcHRpb25zOiBOekdyYXBoT3B0aW9uKTogTnpHcmFwaEdyb3VwTm9kZSB7XG4gICAgdGhpcy5wYXJzZUluZm8oZGF0YSk7XG4gICAgY29uc3QgcmVuZGVySW5mbyA9IGJ1aWxkR3JhcGgoZGF0YSwgb3B0aW9ucywgdGhpcy5sYXlvdXRTZXR0aW5nKSBhcyBOekdyYXBoR3JvdXBOb2RlO1xuICAgIGNvbnN0IGRpZyA9IChub2RlczogQXJyYXk8TnpHcmFwaE5vZGUgfCBOekdyYXBoR3JvdXBOb2RlPik6IHZvaWQgPT4ge1xuICAgICAgbm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgY29uc3QgeyB4LCB5IH0gPSBub2RlO1xuICAgICAgICBub2RlLnhPZmZzZXQgPSB4O1xuICAgICAgICBub2RlLnlPZmZzZXQgPSB5O1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSAxICYmIHRoaXMubWFwT2ZOb2RlQXR0ci5oYXNPd25Qcm9wZXJ0eShub2RlLm5hbWUpKSB7XG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihub2RlLCB0aGlzLm1hcE9mTm9kZUF0dHJbbm9kZS5uYW1lXSk7XG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAwKSB7XG4gICAgICAgICAgKG5vZGUgYXMgTnpHcmFwaEdyb3VwTm9kZSkuZWRnZXMuZm9yRWFjaChlZGdlID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcE9mRWRnZUF0dHIuaGFzT3duUHJvcGVydHkoYCR7ZWRnZS52fS0ke2VkZ2Uud31gKSkge1xuICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVkZ2UsIHRoaXMubWFwT2ZFZGdlQXR0cltgJHtlZGdlLnZ9LSR7ZWRnZS53fWBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBkaWcobm9kZS5ub2Rlcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgZGlnKHJlbmRlckluZm8ubm9kZXMpO1xuICAgIC8vIEFzc2lnbiBkYXRhIHRvIGVkZ2VzIG9mIHJvb3QgZ3JhcGhcbiAgICByZW5kZXJJbmZvLmVkZ2VzLmZvckVhY2goZWRnZSA9PiB7XG4gICAgICBpZiAodGhpcy5tYXBPZkVkZ2VBdHRyLmhhc093blByb3BlcnR5KGAke2VkZ2Uudn0tJHtlZGdlLnd9YCkpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihlZGdlLCB0aGlzLm1hcE9mRWRnZUF0dHJbYCR7ZWRnZS52fS0ke2VkZ2Uud31gXSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlbmRlckluZm87XG4gIH1cblxuICAvKipcbiAgICogUGxheSB3aXRoIGFuaW1hdGlvblxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBtYWtlTm9kZXNBbmltYXRpb24oKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIGZvcmtKb2luKC4uLnRoaXMubGlzdE9mTm9kZUNvbXBvbmVudC5tYXAobm9kZSA9PiBub2RlLm1ha2VBbmltYXRpb24oKSkpLnBpcGUoXG4gICAgICBmaW5hbGl6ZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VJbmZvKGRhdGE6IE56R3JhcGhEYXRhRGVmKTogdm9pZCB7XG4gICAgZGF0YS5ub2Rlcy5mb3JFYWNoKG4gPT4ge1xuICAgICAgdGhpcy5tYXBPZk5vZGVBdHRyW24uaWRdID0gbjtcbiAgICB9KTtcbiAgICBkYXRhLmVkZ2VzLmZvckVhY2goZSA9PiB7XG4gICAgICB0aGlzLm1hcE9mRWRnZUF0dHJbYCR7ZS52fS0ke2Uud31gXSA9IGU7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTWVyZ2UgY29uZmlnIHdpdGggdXNlciBpbnB1dHNcbiAgICpcbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBtZXJnZUNvbmZpZyhjb25maWc6IE56R3JhcGhMYXlvdXRDb25maWcpOiBOekxheW91dFNldHRpbmcge1xuICAgIGNvbnN0IGdyYXBoTWV0YSA9IGNvbmZpZz8ubGF5b3V0IHx8IHt9O1xuICAgIGNvbnN0IHN1YlNjZW5lTWV0YSA9IGNvbmZpZz8uc3ViU2NlbmUgfHwge307XG4gICAgY29uc3QgZGVmYXVsdE5vZGVNZXRhID0gY29uZmlnPy5kZWZhdWx0Tm9kZSB8fCB7fTtcbiAgICBjb25zdCBkZWZhdWx0Q29tcG91bmROb2RlTWV0YSA9IGNvbmZpZz8uZGVmYXVsdENvbXBvdW5kTm9kZSB8fCB7fTtcbiAgICBjb25zdCBicmlkZ2UgPSBOWl9HUkFQSF9MQVlPVVRfU0VUVElORy5ub2RlU2l6ZS5icmlkZ2U7XG5cbiAgICBjb25zdCBncmFwaDogTnpMYXlvdXRTZXR0aW5nWydncmFwaCddID0geyBtZXRhOiB7IC4uLk5aX0dSQVBIX0xBWU9VVF9TRVRUSU5HLmdyYXBoLm1ldGEsIC4uLmdyYXBoTWV0YSB9IH07XG4gICAgY29uc3Qgc3ViU2NlbmU6IE56TGF5b3V0U2V0dGluZ1snc3ViU2NlbmUnXSA9IHtcbiAgICAgIG1ldGE6IHsgLi4uTlpfR1JBUEhfTEFZT1VUX1NFVFRJTkcuc3ViU2NlbmUubWV0YSwgLi4uc3ViU2NlbmVNZXRhIH1cbiAgICB9O1xuICAgIGNvbnN0IG5vZGVTaXplOiBOekxheW91dFNldHRpbmdbJ25vZGVTaXplJ10gPSB7XG4gICAgICBtZXRhOiB7IC4uLk5aX0dSQVBIX0xBWU9VVF9TRVRUSU5HLm5vZGVTaXplLm1ldGEsIC4uLmRlZmF1bHRDb21wb3VuZE5vZGVNZXRhIH0sXG4gICAgICBub2RlOiB7IC4uLk5aX0dSQVBIX0xBWU9VVF9TRVRUSU5HLm5vZGVTaXplLm5vZGUsIC4uLmRlZmF1bHROb2RlTWV0YSB9LFxuICAgICAgYnJpZGdlXG4gICAgfTtcblxuICAgIHJldHVybiB7IGdyYXBoLCBzdWJTY2VuZSwgbm9kZVNpemUgfTtcbiAgfVxufVxuIl19