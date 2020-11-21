/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, NgZone, Output, QueryList, TemplateRef, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { buildGraph } from '@nx-component/hierarchy-graph';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { forkJoin, Subject } from 'rxjs';
import { finalize, take, takeUntil, tap } from 'rxjs/operators';
import { NzCustomGraphNodeDirective } from './custom-graph-node.directive';
import { NzGraphData } from './data-source/graph-data-source';
import { NzGraphMinimapComponent } from './graph-minimap.component';
import { NzGraphNodeDirective } from './graph-node.directive';
import { NzGraphSvgContainerComponent } from './graph-svg-container.component';
import { nzTypeDefinition, NZ_GRAPH_LAYOUT_SETTING } from './interface';
import { flattenNodes } from './utils';
/** Checks whether an object is a data source. */
export function isDataSource(value) {
    // Check if the value is a DataSource by observing if it has a connect function. Cannot
    // be checked as an `instanceof DataSource` since people could create their own sources
    // that match the interface, but don't extend DataSource.
    return value && typeof value.connect === 'function';
}
export class NzGraphComponent {
    constructor(cdr, ngZone, elementRef) {
        this.cdr = cdr;
        this.ngZone = ngZone;
        this.elementRef = elementRef;
        this.nzRankDirection = 'LR';
        this.nzShowMinimap = false;
        this.nzShowArrow = false;
        this.nzZoom = 1;
        this.nzAutoSize = false;
        this.nzGraphInitialized = new EventEmitter();
        this.nzZoomInit = new EventEmitter();
        this.nzTransformEvent = new EventEmitter();
        this.nzNodeClick = new EventEmitter();
        this.renderInfo = { labelHeight: 0 };
        this.mapOfNodeAttr = {};
        this.mapOfEdgeAttr = {};
        this.customNodeTemplate = null;
        this.typedNodes = nzTypeDefinition();
        this.layoutSetting = NZ_GRAPH_LAYOUT_SETTING;
        this.destroy$ = new Subject();
        this.nodeTrackByFun = (_, node) => node.name;
        this.edgeTrackByFun = (_, edge) => `${edge.v}-${edge.w}`;
        this.subGraphTransform = (node) => {
            const x = node.x - node.coreBox.width / 2.0;
            const y = node.y - node.height / 2.0 + node.paddingTop / 2.0;
            return `translate(${x}, ${y})`;
        };
        this.coreTransform = (node) => {
            return `translate(0, ${node.labelHeight})`;
        };
        this.cdr.detach();
    }
    set customNode(value) {
        if (value) {
            this.customNodeTemplate = value;
        }
    }
    ngOnInit() {
        if (this.dataSource !== this.nzGraphData) {
            this._switchDataSource(this.nzGraphData);
        }
    }
    ngOnChanges(changes) {
        const { nzAutoFit, nzRankDirection, nzGraphData, nzGraphLayoutSettings } = changes;
        if (nzGraphLayoutSettings) {
            Object.assign(this.layoutSetting, this.nzGraphLayoutSettings || {});
        }
        if (nzGraphData) {
            if (this.dataSource !== this.nzGraphData) {
                this._switchDataSource(this.nzGraphData);
            }
        }
        if ((nzAutoFit && !nzAutoFit.firstChange) || (nzRankDirection && !nzRankDirection.firstChange)) {
            // Render graph
            if (this.dataSource.dataSource) {
                this.renderGraph(this.dataSource.dataSource, {
                    rankDirection: this.nzRankDirection,
                    expanded: this.dataSource.expansionModel.selected || []
                });
            }
        }
        this.cdr.markForCheck();
    }
    ngAfterViewInit() {
        this.autoFit();
        this.cdr.detectChanges();
        this.drawMinimap(true);
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
    }
    /**
     * Transform event
     */
    triggerTransform($event) {
        this.nzZoom = $event.k;
        if (this.minimap) {
            this.minimap.zoom($event);
        }
        this.nzTransformEvent.emit($event);
        this.cdr.markForCheck();
    }
    /**
     * Emit event
     */
    clickNode(node) {
        this.nzNodeClick.emit(node);
    }
    /**
     * Move graph to center
     */
    autoFit() {
        var _a;
        if (this.renderInfo) {
            (_a = this.svgContainerComponent) === null || _a === void 0 ? void 0 : _a.fit(0);
        }
    }
    /**
     * Refactor
     */
    toggleNode(node, expanded) {
        if (expanded) {
            // collapse it
            this.nzGraphData.collapse(node);
        }
        else {
            // expand it
            this.nzGraphData.expand(node);
        }
    }
    renderGraph(data, options) {
        const renderInfo = this.buildGraphInfo(data, options);
        // TODO
        // Need better performance
        this.setRenderInfo(renderInfo, false);
        if (this.nzAutoSize) {
            this.resizeNodes(renderInfo, options);
        }
        this.cdr.detectChanges();
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
                this.renderGraph(data, graphOptions);
                this.cdr.detectChanges();
            });
        }
        else {
            throw Error(`A valid data source must be provided.`);
        }
    }
    setRenderInfo(renderInfo, asPatch = true) {
        if (asPatch) {
            this.assignRenderInfo(renderInfo);
        }
        else {
            this.renderInfo = renderInfo;
        }
        this.ngZone.onStable.pipe(take(1)).subscribe(() => {
            this.makeNodesAnimation().subscribe();
        });
    }
    buildGraphInfo(data, options) {
        this.parseInfo(data);
        const renderInfo = buildGraph(data, options, this.layoutSetting);
        const dig = (nodes) => {
            nodes.forEach(node => {
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
    resizeNodes(renderInfo, options) {
        this.ngZone.onStable
            .asObservable()
            .pipe(take(1))
            .subscribe(() => {
            const dataSource = this.dataSource.dataSource;
            this.elementRef.nativeElement.querySelectorAll('[nz-graph-node]').forEach((nodeEle) => {
                const contentEle = nodeEle.querySelector('.nz-graph-node-wrapper');
                if (contentEle) {
                    const height = contentEle.getBoundingClientRect().height;
                    const width = contentEle.getBoundingClientRect().width;
                    // Element id type is string
                    const targetNode = flattenNodes(renderInfo).find(n => `${n.name}` === nodeEle.id);
                    const nodeName = targetNode && targetNode.name;
                    const node = dataSource.nodes.find(n => n.id === nodeName);
                    if (node) {
                        node.height = height / this.nzZoom;
                        node.width = width / this.nzZoom;
                    }
                }
            });
            const newRenderInfo = this.buildGraphInfo(dataSource, options);
            this.setRenderInfo(newRenderInfo, false);
        });
    }
    assignRenderInfo(renderInfo) {
        this.renderInfo.edges = renderInfo.edges;
        this.renderInfo.nodes.forEach((node, index) => {
            Object.assign(node, renderInfo.nodes[index]);
        });
    }
    makeNodesAnimation() {
        return forkJoin(...this.graphNodes.map(node => node.makeAnimation())).pipe(tap(() => {
            this.drawMinimap();
        }), finalize(() => {
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
    drawMinimap(forceRerender = false) {
        var _a, _b;
        if (!this.minimap || !this.nzShowMinimap) {
            return;
        }
        if (forceRerender) {
            (_a = this.minimap) === null || _a === void 0 ? void 0 : _a.init(this.svgContainerComponent.containerElement.nativeElement, this.svgContainerComponent.zoomElement.nativeElement, this.svgContainerComponent.zoomController);
        }
        else {
            (_b = this.minimap) === null || _b === void 0 ? void 0 : _b.update();
        }
    }
}
NzGraphComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-graph',
                exportAs: 'nzGraph',
                template: `
    <ng-content></ng-content>
    <nz-graph-svg-container (transformEvent)="triggerTransform($event)">
      <svg:defs nz-graph-defs></svg:defs>
      <ng-container [ngTemplateOutlet]="groupTemplate" [ngTemplateOutletContext]="{ renderInfo: renderInfo, type: 'root' }"></ng-container>
    </nz-graph-svg-container>

    <nz-graph-minimap *ngIf="nzShowMinimap"></nz-graph-minimap>

    <ng-template #groupTemplate let-renderInfo="renderInfo" let-type="type">
      <svg:g [attr.transform]="type === 'sub' ? subGraphTransform(renderInfo) : null">
        <svg:g class="core" [attr.transform]="coreTransform(renderInfo)">
          <svg:g class="nz-graph-edges">
            <svg:g class="nz-graph-edge" *ngFor="let edge of renderInfo.edges; let index = index; trackBy: edgeTrackByFun">
              <svg:path
                class="nz-graph-edge-line"
                nz-graph-edge
                [attr.marker-end]="nzShowArrow ? 'url(#edge-end-arrow)' : null"
                [edge]="edge"
              ></svg:path>
              <svg:text class="nz-graph-edge-text" text-anchor="middle" dy="20" *ngIf="edge.label">
                <textPath [attr.href]="'#' + edge.v + '--' + edge.w" startOffset="50%">{{ edge.label }}</textPath>
              </svg:text>
            </svg:g>
          </svg:g>

          <svg:g class="nz-graph-nodes">
            <svg:g
              class="nz-graph-node"
              [class.nz-graph-custom-node]="!!customNodeTemplate"
              [style.display]="node.type === 2 ? 'none' : null"
              *ngFor="let node of typedNodes(renderInfo.nodes); trackBy: nodeTrackByFun"
            >
              <svg:g nz-graph-node [node]="node" (nodeClick)="clickNode($event)">
                <svg:rect class="nz-graph-node-rect"></svg:rect>
                <foreignObject x="0" y="0" [attr.width]="node.width" [attr.height]="node.height">
                  <xhtml:div class="nz-graph-node-wrapper">
                    <ng-container
                      *ngIf="customNodeTemplate"
                      [ngTemplateOutlet]="customNodeTemplate"
                      [ngTemplateOutletContext]="{ $implicit: node, group: node.type === 0 }"
                    ></ng-container>
                    <div class="node-content" *ngIf="!customNodeTemplate">
                      <div class="title">
                        {{ node.name }}
                        <i
                          class="action-icon"
                          *ngIf="node.type === 0"
                          nz-icon
                          [nzType]="node.expanded ? 'minus' : 'plus'"
                          nzTheme="outline"
                          (click)="toggleNode(node.name, node.expanded)"
                        ></i>
                      </div>
                      <div class="label" *ngIf="!node.expanded">{{ node.label }}</div>
                    </div>
                  </xhtml:div>
                </foreignObject>
              </svg:g>

              <ng-container
                *ngIf="node.expanded"
                [ngTemplateOutlet]="groupTemplate"
                [ngTemplateOutletContext]="{ renderInfo: node, type: 'sub' }"
              ></ng-container>
            </svg:g>
          </svg:g>
        </svg:g>
      </svg:g>
    </ng-template>
  `,
                host: {
                    '[class.nz-graph]': 'true',
                    '[class.nz-graph-auto-fit]': 'nzAutoSize'
                }
            },] }
];
NzGraphComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: ElementRef }
];
NzGraphComponent.propDecorators = {
    graphNodes: [{ type: ViewChildren, args: [NzGraphNodeDirective,] }],
    svgContainerComponent: [{ type: ViewChild, args: [NzGraphSvgContainerComponent,] }],
    minimap: [{ type: ViewChild, args: [NzGraphMinimapComponent,] }],
    customNode: [{ type: ContentChild, args: [NzCustomGraphNodeDirective, { static: false, read: TemplateRef },] }],
    nzGraphData: [{ type: Input }],
    nzRankDirection: [{ type: Input }],
    nzGraphLayoutSettings: [{ type: Input }],
    nzShowMinimap: [{ type: Input }],
    nzShowArrow: [{ type: Input }],
    nzZoom: [{ type: Input }],
    nzAutoSize: [{ type: Input }],
    nzGraphInitialized: [{ type: Output }],
    nzZoomInit: [{ type: Output }],
    nzTransformEvent: [{ type: Output }],
    nzNodeClick: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzGraphComponent.prototype, "nzShowMinimap", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzGraphComponent.prototype, "nzShowArrow", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzGraphComponent.prototype, "nzAutoSize", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGguY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9ncmFwaC8iLCJzb3VyY2VzIjpbImdyYXBoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUdMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBSU4sTUFBTSxFQUNOLFNBQVMsRUFFVCxXQUFXLEVBQ1gsU0FBUyxFQUNULFlBQVksRUFDWixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsUUFBUSxFQUFjLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsNEJBQTRCLEVBQW1CLE1BQU0saUNBQWlDLENBQUM7QUFDaEcsT0FBTyxFQVdMLGdCQUFnQixFQUNoQix1QkFBdUIsRUFDeEIsTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUV2QyxpREFBaUQ7QUFDakQsTUFBTSxV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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzRVQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLGtCQUFrQixFQUFFLE1BQU07b0JBQzFCLDJCQUEyQixFQUFFLFlBQVk7aUJBQzFDO2FBQ0Y7OztZQXJJQyxpQkFBaUI7WUFNakIsTUFBTTtZQUhOLFVBQVU7Ozt5QkF3SVQsWUFBWSxTQUFDLG9CQUFvQjtvQ0FDakMsU0FBUyxTQUFDLDRCQUE0QjtzQkFDdEMsU0FBUyxTQUFDLHVCQUF1Qjt5QkFFakMsWUFBWSxTQUFDLDBCQUEwQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFOzBCQVU3RSxLQUFLOzhCQUNMLEtBQUs7b0NBQ0wsS0FBSzs0QkFDTCxLQUFLOzBCQUNMLEtBQUs7cUJBRUwsS0FBSzt5QkFDTCxLQUFLO2lDQUVMLE1BQU07eUJBQ04sTUFBTTsrQkFDTixNQUFNOzBCQUNOLE1BQU07O0FBVGtCO0lBQWYsWUFBWSxFQUFFOzt1REFBdUI7QUFDdEI7SUFBZixZQUFZLEVBQUU7O3FEQUFxQjtBQUdwQjtJQUFmLFlBQVksRUFBRTs7b0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGJ1aWxkR3JhcGggfSBmcm9tICdAbngtY29tcG9uZW50L2hpZXJhcmNoeS1ncmFwaCc7XG5pbXBvcnQgeyBab29tVHJhbnNmb3JtIH0gZnJvbSAnZDMtem9vbSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBmb3JrSm9pbiwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaW5hbGl6ZSwgdGFrZSwgdGFrZVVudGlsLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOekN1c3RvbUdyYXBoTm9kZURpcmVjdGl2ZSB9IGZyb20gJy4vY3VzdG9tLWdyYXBoLW5vZGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IE56R3JhcGhEYXRhIH0gZnJvbSAnLi9kYXRhLXNvdXJjZS9ncmFwaC1kYXRhLXNvdXJjZSc7XG5pbXBvcnQgeyBOekdyYXBoTWluaW1hcENvbXBvbmVudCB9IGZyb20gJy4vZ3JhcGgtbWluaW1hcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpHcmFwaE5vZGVEaXJlY3RpdmUgfSBmcm9tICcuL2dyYXBoLW5vZGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IE56R3JhcGhTdmdDb250YWluZXJDb21wb25lbnQsIE56Wm9vbVRyYW5zZm9ybSB9IGZyb20gJy4vZ3JhcGgtc3ZnLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgTnpHcmFwaERhdGFEZWYsXG4gIE56R3JhcGhFZGdlLFxuICBOekdyYXBoRWRnZURlZixcbiAgTnpHcmFwaEdyb3VwTm9kZSxcbiAgTnpHcmFwaExheW91dFNldHRpbmcsXG4gIE56R3JhcGhOb2RlLFxuICBOekdyYXBoTm9kZURlZixcbiAgTnpHcmFwaE9wdGlvbixcbiAgTnpMYXlvdXRTZXR0aW5nLFxuICBOelJhbmtEaXJlY3Rpb24sXG4gIG56VHlwZURlZmluaXRpb24sXG4gIE5aX0dSQVBIX0xBWU9VVF9TRVRUSU5HXG59IGZyb20gJy4vaW50ZXJmYWNlJztcbmltcG9ydCB7IGZsYXR0ZW5Ob2RlcyB9IGZyb20gJy4vdXRpbHMnO1xuXG4vKiogQ2hlY2tzIHdoZXRoZXIgYW4gb2JqZWN0IGlzIGEgZGF0YSBzb3VyY2UuICovXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRhU291cmNlKHZhbHVlOiBOelNhZmVBbnkpOiB2YWx1ZSBpcyBOekdyYXBoRGF0YSB7XG4gIC8vIENoZWNrIGlmIHRoZSB2YWx1ZSBpcyBhIERhdGFTb3VyY2UgYnkgb2JzZXJ2aW5nIGlmIGl0IGhhcyBhIGNvbm5lY3QgZnVuY3Rpb24uIENhbm5vdFxuICAvLyBiZSBjaGVja2VkIGFzIGFuIGBpbnN0YW5jZW9mIERhdGFTb3VyY2VgIHNpbmNlIHBlb3BsZSBjb3VsZCBjcmVhdGUgdGhlaXIgb3duIHNvdXJjZXNcbiAgLy8gdGhhdCBtYXRjaCB0aGUgaW50ZXJmYWNlLCBidXQgZG9uJ3QgZXh0ZW5kIERhdGFTb3VyY2UuXG4gIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUuY29ubmVjdCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvcjogJ256LWdyYXBoJyxcbiAgZXhwb3J0QXM6ICduekdyYXBoJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPG56LWdyYXBoLXN2Zy1jb250YWluZXIgKHRyYW5zZm9ybUV2ZW50KT1cInRyaWdnZXJUcmFuc2Zvcm0oJGV2ZW50KVwiPlxuICAgICAgPHN2ZzpkZWZzIG56LWdyYXBoLWRlZnM+PC9zdmc6ZGVmcz5cbiAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwiZ3JvdXBUZW1wbGF0ZVwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IHJlbmRlckluZm86IHJlbmRlckluZm8sIHR5cGU6ICdyb290JyB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgPC9uei1ncmFwaC1zdmctY29udGFpbmVyPlxuXG4gICAgPG56LWdyYXBoLW1pbmltYXAgKm5nSWY9XCJuelNob3dNaW5pbWFwXCI+PC9uei1ncmFwaC1taW5pbWFwPlxuXG4gICAgPG5nLXRlbXBsYXRlICNncm91cFRlbXBsYXRlIGxldC1yZW5kZXJJbmZvPVwicmVuZGVySW5mb1wiIGxldC10eXBlPVwidHlwZVwiPlxuICAgICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJ0eXBlID09PSAnc3ViJyA/IHN1YkdyYXBoVHJhbnNmb3JtKHJlbmRlckluZm8pIDogbnVsbFwiPlxuICAgICAgICA8c3ZnOmcgY2xhc3M9XCJjb3JlXCIgW2F0dHIudHJhbnNmb3JtXT1cImNvcmVUcmFuc2Zvcm0ocmVuZGVySW5mbylcIj5cbiAgICAgICAgICA8c3ZnOmcgY2xhc3M9XCJuei1ncmFwaC1lZGdlc1wiPlxuICAgICAgICAgICAgPHN2ZzpnIGNsYXNzPVwibnotZ3JhcGgtZWRnZVwiICpuZ0Zvcj1cImxldCBlZGdlIG9mIHJlbmRlckluZm8uZWRnZXM7IGxldCBpbmRleCA9IGluZGV4OyB0cmFja0J5OiBlZGdlVHJhY2tCeUZ1blwiPlxuICAgICAgICAgICAgICA8c3ZnOnBhdGhcbiAgICAgICAgICAgICAgICBjbGFzcz1cIm56LWdyYXBoLWVkZ2UtbGluZVwiXG4gICAgICAgICAgICAgICAgbnotZ3JhcGgtZWRnZVxuICAgICAgICAgICAgICAgIFthdHRyLm1hcmtlci1lbmRdPVwibnpTaG93QXJyb3cgPyAndXJsKCNlZGdlLWVuZC1hcnJvdyknIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgW2VkZ2VdPVwiZWRnZVwiXG4gICAgICAgICAgICAgID48L3N2ZzpwYXRoPlxuICAgICAgICAgICAgICA8c3ZnOnRleHQgY2xhc3M9XCJuei1ncmFwaC1lZGdlLXRleHRcIiB0ZXh0LWFuY2hvcj1cIm1pZGRsZVwiIGR5PVwiMjBcIiAqbmdJZj1cImVkZ2UubGFiZWxcIj5cbiAgICAgICAgICAgICAgICA8dGV4dFBhdGggW2F0dHIuaHJlZl09XCInIycgKyBlZGdlLnYgKyAnLS0nICsgZWRnZS53XCIgc3RhcnRPZmZzZXQ9XCI1MCVcIj57eyBlZGdlLmxhYmVsIH19PC90ZXh0UGF0aD5cbiAgICAgICAgICAgICAgPC9zdmc6dGV4dD5cbiAgICAgICAgICAgIDwvc3ZnOmc+XG4gICAgICAgICAgPC9zdmc6Zz5cblxuICAgICAgICAgIDxzdmc6ZyBjbGFzcz1cIm56LWdyYXBoLW5vZGVzXCI+XG4gICAgICAgICAgICA8c3ZnOmdcbiAgICAgICAgICAgICAgY2xhc3M9XCJuei1ncmFwaC1ub2RlXCJcbiAgICAgICAgICAgICAgW2NsYXNzLm56LWdyYXBoLWN1c3RvbS1ub2RlXT1cIiEhY3VzdG9tTm9kZVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwibm9kZS50eXBlID09PSAyID8gJ25vbmUnIDogbnVsbFwiXG4gICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBub2RlIG9mIHR5cGVkTm9kZXMocmVuZGVySW5mby5ub2Rlcyk7IHRyYWNrQnk6IG5vZGVUcmFja0J5RnVuXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHN2ZzpnIG56LWdyYXBoLW5vZGUgW25vZGVdPVwibm9kZVwiIChub2RlQ2xpY2spPVwiY2xpY2tOb2RlKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8c3ZnOnJlY3QgY2xhc3M9XCJuei1ncmFwaC1ub2RlLXJlY3RcIj48L3N2ZzpyZWN0PlxuICAgICAgICAgICAgICAgIDxmb3JlaWduT2JqZWN0IHg9XCIwXCIgeT1cIjBcIiBbYXR0ci53aWR0aF09XCJub2RlLndpZHRoXCIgW2F0dHIuaGVpZ2h0XT1cIm5vZGUuaGVpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICA8eGh0bWw6ZGl2IGNsYXNzPVwibnotZ3JhcGgtbm9kZS13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImN1c3RvbU5vZGVUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tTm9kZVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IG5vZGUsIGdyb3VwOiBub2RlLnR5cGUgPT09IDAgfVwiXG4gICAgICAgICAgICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5vZGUtY29udGVudFwiICpuZ0lmPVwiIWN1c3RvbU5vZGVUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3sgbm9kZS5uYW1lIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8aVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImFjdGlvbi1pY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJub2RlLnR5cGUgPT09IDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBuei1pY29uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtuelR5cGVdPVwibm9kZS5leHBhbmRlZCA/ICdtaW51cycgOiAncGx1cydcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBuelRoZW1lPVwib3V0bGluZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVOb2RlKG5vZGUubmFtZSwgbm9kZS5leHBhbmRlZClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxcIiAqbmdJZj1cIiFub2RlLmV4cGFuZGVkXCI+e3sgbm9kZS5sYWJlbCB9fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwveGh0bWw6ZGl2PlxuICAgICAgICAgICAgICAgIDwvZm9yZWlnbk9iamVjdD5cbiAgICAgICAgICAgICAgPC9zdmc6Zz5cblxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJub2RlLmV4cGFuZGVkXCJcbiAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJncm91cFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyByZW5kZXJJbmZvOiBub2RlLCB0eXBlOiAnc3ViJyB9XCJcbiAgICAgICAgICAgICAgPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9zdmc6Zz5cbiAgICAgICAgICA8L3N2ZzpnPlxuICAgICAgICA8L3N2ZzpnPlxuICAgICAgPC9zdmc6Zz5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5uei1ncmFwaF0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5uei1ncmFwaC1hdXRvLWZpdF0nOiAnbnpBdXRvU2l6ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekdyYXBoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIE9uRGVzdHJveSB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dNaW5pbWFwOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekF1dG9TaXplOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dBcnJvdzogQm9vbGVhbklucHV0O1xuXG4gIEBWaWV3Q2hpbGRyZW4oTnpHcmFwaE5vZGVEaXJlY3RpdmUpIGdyYXBoTm9kZXMhOiBRdWVyeUxpc3Q8TnpHcmFwaE5vZGVEaXJlY3RpdmU+O1xuICBAVmlld0NoaWxkKE56R3JhcGhTdmdDb250YWluZXJDb21wb25lbnQpIHN2Z0NvbnRhaW5lckNvbXBvbmVudCE6IE56R3JhcGhTdmdDb250YWluZXJDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoTnpHcmFwaE1pbmltYXBDb21wb25lbnQpIG1pbmltYXA6IE56R3JhcGhNaW5pbWFwQ29tcG9uZW50IHwgdW5kZWZpbmVkO1xuXG4gIEBDb250ZW50Q2hpbGQoTnpDdXN0b21HcmFwaE5vZGVEaXJlY3RpdmUsIHsgc3RhdGljOiBmYWxzZSwgcmVhZDogVGVtcGxhdGVSZWYgfSlcbiAgc2V0IGN1c3RvbU5vZGUodmFsdWU6IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBOekdyYXBoTm9kZSB8IE56R3JhcGhHcm91cE5vZGUgfT4pIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuY3VzdG9tTm9kZVRlbXBsYXRlID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBQcm92aWRlcyBhIHN0cmVhbSBjb250YWluaW5nIHRoZSBsYXRlc3QgZGF0YSBhcnJheSB0byByZW5kZXIuXG4gICAqIERhdGEgc291cmNlIGNhbiBiZSBhbiBvYnNlcnZhYmxlIG9mIE56R3JhcGhEYXRhLCBvciBhIE56R3JhcGhEYXRhIHRvIHJlbmRlci5cbiAgICovXG4gIEBJbnB1dCgpIG56R3JhcGhEYXRhITogTnpHcmFwaERhdGE7XG4gIEBJbnB1dCgpIG56UmFua0RpcmVjdGlvbjogTnpSYW5rRGlyZWN0aW9uID0gJ0xSJztcbiAgQElucHV0KCkgbnpHcmFwaExheW91dFNldHRpbmdzPzogTnpHcmFwaExheW91dFNldHRpbmc7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNob3dNaW5pbWFwID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNob3dBcnJvdyA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIG56Wm9vbSA9IDE7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekF1dG9TaXplID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56R3JhcGhJbml0aWFsaXplZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Wm9vbUluaXQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuelRyYW5zZm9ybUV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxOelpvb21UcmFuc2Zvcm0+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuek5vZGVDbGljazogRXZlbnRFbWl0dGVyPE56R3JhcGhOb2RlIHwgTnpHcmFwaEdyb3VwTm9kZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcmVuZGVySW5mbzogTnpHcmFwaEdyb3VwTm9kZSA9IHsgbGFiZWxIZWlnaHQ6IDAgfSBhcyBOekdyYXBoR3JvdXBOb2RlO1xuICBtYXBPZk5vZGVBdHRyOiB7IFtrZXk6IHN0cmluZ106IE56R3JhcGhOb2RlRGVmIH0gPSB7fTtcbiAgbWFwT2ZFZGdlQXR0cjogeyBba2V5OiBzdHJpbmddOiBOekdyYXBoRWRnZURlZiB9ID0ge307XG4gIGN1c3RvbU5vZGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IE56R3JhcGhHcm91cE5vZGUgfCBOekdyYXBoTm9kZSB9PiB8IG51bGwgPSBudWxsO1xuXG4gIHB1YmxpYyByZWFkb25seSB0eXBlZE5vZGVzID0gbnpUeXBlRGVmaW5pdGlvbjxBcnJheTxOekdyYXBoTm9kZSB8IE56R3JhcGhHcm91cE5vZGU+PigpO1xuICBwcml2YXRlIGRhdGFTb3VyY2U/OiBOekdyYXBoRGF0YTtcbiAgcHJpdmF0ZSBsYXlvdXRTZXR0aW5nOiBOekxheW91dFNldHRpbmcgPSBOWl9HUkFQSF9MQVlPVVRfU0VUVElORztcbiAgLyoqIERhdGEgc3Vic2NyaXB0aW9uICovXG4gIHByaXZhdGUgX2RhdGFTdWJzY3JpcHRpb24/OiBTdWJzY3JpcHRpb24gfCBudWxsO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBub2RlVHJhY2tCeUZ1biA9IChfOiBudW1iZXIsIG5vZGU6IE56R3JhcGhOb2RlIHwgTnpHcmFwaEdyb3VwTm9kZSkgPT4gbm9kZS5uYW1lO1xuICBlZGdlVHJhY2tCeUZ1biA9IChfOiBudW1iZXIsIGVkZ2U6IE56R3JhcGhFZGdlKSA9PiBgJHtlZGdlLnZ9LSR7ZWRnZS53fWA7XG5cbiAgc3ViR3JhcGhUcmFuc2Zvcm0gPSAobm9kZTogTnpHcmFwaEdyb3VwTm9kZSkgPT4ge1xuICAgIGNvbnN0IHggPSBub2RlLnggLSBub2RlLmNvcmVCb3gud2lkdGggLyAyLjA7XG4gICAgY29uc3QgeSA9IG5vZGUueSAtIG5vZGUuaGVpZ2h0IC8gMi4wICsgbm9kZS5wYWRkaW5nVG9wIC8gMi4wO1xuICAgIHJldHVybiBgdHJhbnNsYXRlKCR7eH0sICR7eX0pYDtcbiAgfTtcblxuICBjb3JlVHJhbnNmb3JtID0gKG5vZGU6IE56R3JhcGhHcm91cE5vZGUpID0+IHtcbiAgICByZXR1cm4gYHRyYW5zbGF0ZSgwLCAke25vZGUubGFiZWxIZWlnaHR9KWA7XG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIG5nWm9uZTogTmdab25lLCBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLmNkci5kZXRhY2goKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRhdGFTb3VyY2UgIT09IHRoaXMubnpHcmFwaERhdGEpIHtcbiAgICAgIHRoaXMuX3N3aXRjaERhdGFTb3VyY2UodGhpcy5uekdyYXBoRGF0YSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbnpBdXRvRml0LCBuelJhbmtEaXJlY3Rpb24sIG56R3JhcGhEYXRhLCBuekdyYXBoTGF5b3V0U2V0dGluZ3MgfSA9IGNoYW5nZXM7XG4gICAgaWYgKG56R3JhcGhMYXlvdXRTZXR0aW5ncykge1xuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmxheW91dFNldHRpbmcsIHRoaXMubnpHcmFwaExheW91dFNldHRpbmdzIHx8IHt9KTtcbiAgICB9XG5cbiAgICBpZiAobnpHcmFwaERhdGEpIHtcbiAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2UgIT09IHRoaXMubnpHcmFwaERhdGEpIHtcbiAgICAgICAgdGhpcy5fc3dpdGNoRGF0YVNvdXJjZSh0aGlzLm56R3JhcGhEYXRhKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoKG56QXV0b0ZpdCAmJiAhbnpBdXRvRml0LmZpcnN0Q2hhbmdlKSB8fCAobnpSYW5rRGlyZWN0aW9uICYmICFuelJhbmtEaXJlY3Rpb24uZmlyc3RDaGFuZ2UpKSB7XG4gICAgICAvLyBSZW5kZXIgZ3JhcGhcbiAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2UhLmRhdGFTb3VyY2UpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJHcmFwaCh0aGlzLmRhdGFTb3VyY2UhLmRhdGFTb3VyY2UsIHtcbiAgICAgICAgICByYW5rRGlyZWN0aW9uOiB0aGlzLm56UmFua0RpcmVjdGlvbixcbiAgICAgICAgICBleHBhbmRlZDogdGhpcy5kYXRhU291cmNlIS5leHBhbnNpb25Nb2RlbC5zZWxlY3RlZCB8fCBbXVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmF1dG9GaXQoKTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgdGhpcy5kcmF3TWluaW1hcCh0cnVlKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kYXRhU291cmNlICYmICF0aGlzLl9kYXRhU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLm9ic2VydmVSZW5kZXJDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuXG4gICAgaWYgKHRoaXMuZGF0YVNvdXJjZSAmJiB0eXBlb2YgdGhpcy5kYXRhU291cmNlLmRpc2Nvbm5lY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2RhdGFTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX2RhdGFTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2RhdGFTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm0gZXZlbnRcbiAgICovXG4gIHRyaWdnZXJUcmFuc2Zvcm0oJGV2ZW50OiB7IHg6IG51bWJlcjsgeTogbnVtYmVyOyBrOiBudW1iZXIgfSk6IHZvaWQge1xuICAgIHRoaXMubnpab29tID0gJGV2ZW50Lms7XG4gICAgaWYgKHRoaXMubWluaW1hcCkge1xuICAgICAgdGhpcy5taW5pbWFwLnpvb20oJGV2ZW50IGFzIFpvb21UcmFuc2Zvcm0pO1xuICAgIH1cbiAgICB0aGlzLm56VHJhbnNmb3JtRXZlbnQuZW1pdCgkZXZlbnQpO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVtaXQgZXZlbnRcbiAgICovXG4gIGNsaWNrTm9kZShub2RlOiBOekdyYXBoTm9kZSB8IE56R3JhcGhHcm91cE5vZGUpOiB2b2lkIHtcbiAgICB0aGlzLm56Tm9kZUNsaWNrLmVtaXQobm9kZSk7XG4gIH1cblxuICAvKipcbiAgICogTW92ZSBncmFwaCB0byBjZW50ZXJcbiAgICovXG4gIGF1dG9GaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVuZGVySW5mbykge1xuICAgICAgdGhpcy5zdmdDb250YWluZXJDb21wb25lbnQ/LmZpdCgwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVmYWN0b3JcbiAgICovXG4gIHRvZ2dsZU5vZGUobm9kZTogc3RyaW5nLCBleHBhbmRlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmIChleHBhbmRlZCkge1xuICAgICAgLy8gY29sbGFwc2UgaXRcbiAgICAgIHRoaXMubnpHcmFwaERhdGEuY29sbGFwc2Uobm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGV4cGFuZCBpdFxuICAgICAgdGhpcy5uekdyYXBoRGF0YS5leHBhbmQobm9kZSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyR3JhcGgoZGF0YTogTnpHcmFwaERhdGFEZWYsIG9wdGlvbnM6IE56R3JhcGhPcHRpb24pOiB2b2lkIHtcbiAgICBjb25zdCByZW5kZXJJbmZvID0gdGhpcy5idWlsZEdyYXBoSW5mbyhkYXRhLCBvcHRpb25zKTtcbiAgICAvLyBUT0RPXG4gICAgLy8gTmVlZCBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAgICB0aGlzLnNldFJlbmRlckluZm8ocmVuZGVySW5mbywgZmFsc2UpO1xuICAgIGlmICh0aGlzLm56QXV0b1NpemUpIHtcbiAgICAgIHRoaXMucmVzaXplTm9kZXMocmVuZGVySW5mbywgb3B0aW9ucyk7XG4gICAgfVxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTd2l0Y2ggdG8gdGhlIHByb3ZpZGVkIGRhdGEgc291cmNlIGJ5IHJlc2V0dGluZyB0aGUgZGF0YSBhbmQgdW5zdWJzY3JpYmluZyBmcm9tIHRoZSBjdXJyZW50XG4gICAqIHJlbmRlciBjaGFuZ2Ugc3Vic2NyaXB0aW9uIGlmIG9uZSBleGlzdHMuIElmIHRoZSBkYXRhIHNvdXJjZSBpcyBudWxsLCBpbnRlcnByZXQgdGhpcyBieVxuICAgKiBjbGVhcmluZyB0aGUgbm9kZSBvdXRsZXQuIE90aGVyd2lzZSBzdGFydCBsaXN0ZW5pbmcgZm9yIG5ldyBkYXRhLlxuICAgKi9cbiAgcHJpdmF0ZSBfc3dpdGNoRGF0YVNvdXJjZShkYXRhU291cmNlOiBOekdyYXBoRGF0YSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRhdGFTb3VyY2UgJiYgdHlwZW9mIHRoaXMuZGF0YVNvdXJjZS5kaXNjb25uZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLm56R3JhcGhEYXRhLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZGF0YVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fZGF0YVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fZGF0YVN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5kYXRhU291cmNlID0gZGF0YVNvdXJjZTtcbiAgICB0aGlzLm9ic2VydmVSZW5kZXJDaGFuZ2VzKCk7XG4gIH1cblxuICAvKiogU2V0IHVwIGEgc3Vic2NyaXB0aW9uIGZvciB0aGUgZGF0YSBwcm92aWRlZCBieSB0aGUgZGF0YSBzb3VyY2UuICovXG4gIHByaXZhdGUgb2JzZXJ2ZVJlbmRlckNoYW5nZXMoKTogdm9pZCB7XG4gICAgbGV0IGRhdGFTdHJlYW06IE9ic2VydmFibGU8TnpHcmFwaERhdGFEZWY+IHwgdW5kZWZpbmVkO1xuICAgIGxldCBncmFwaE9wdGlvbnM6IE56R3JhcGhPcHRpb24gPSB7XG4gICAgICByYW5rRGlyZWN0aW9uOiB0aGlzLm56UmFua0RpcmVjdGlvblxuICAgIH07XG4gICAgaWYgKGlzRGF0YVNvdXJjZSh0aGlzLmRhdGFTb3VyY2UpKSB7XG4gICAgICBkYXRhU3RyZWFtID0gdGhpcy5kYXRhU291cmNlLmNvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YVN0cmVhbSkge1xuICAgICAgdGhpcy5fZGF0YVN1YnNjcmlwdGlvbiA9IGRhdGFTdHJlYW0ucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgZ3JhcGhPcHRpb25zID0ge1xuICAgICAgICAgIHJhbmtEaXJlY3Rpb246IHRoaXMubnpSYW5rRGlyZWN0aW9uLFxuICAgICAgICAgIGV4cGFuZGVkOiB0aGlzLm56R3JhcGhEYXRhLmV4cGFuc2lvbk1vZGVsLnNlbGVjdGVkXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVuZGVyR3JhcGgoZGF0YSwgZ3JhcGhPcHRpb25zKTtcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKGBBIHZhbGlkIGRhdGEgc291cmNlIG11c3QgYmUgcHJvdmlkZWQuYCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRSZW5kZXJJbmZvKHJlbmRlckluZm86IE56R3JhcGhHcm91cE5vZGUsIGFzUGF0Y2g6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgaWYgKGFzUGF0Y2gpIHtcbiAgICAgIHRoaXMuYXNzaWduUmVuZGVySW5mbyhyZW5kZXJJbmZvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJJbmZvID0gcmVuZGVySW5mbztcbiAgICB9XG4gICAgdGhpcy5uZ1pvbmUub25TdGFibGUucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5tYWtlTm9kZXNBbmltYXRpb24oKS5zdWJzY3JpYmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRHcmFwaEluZm8oZGF0YTogTnpHcmFwaERhdGFEZWYsIG9wdGlvbnM6IE56R3JhcGhPcHRpb24pOiBOekdyYXBoR3JvdXBOb2RlIHtcbiAgICB0aGlzLnBhcnNlSW5mbyhkYXRhKTtcbiAgICBjb25zdCByZW5kZXJJbmZvID0gYnVpbGRHcmFwaChkYXRhLCBvcHRpb25zLCB0aGlzLmxheW91dFNldHRpbmcpIGFzIE56R3JhcGhHcm91cE5vZGU7XG4gICAgY29uc3QgZGlnID0gKG5vZGVzOiBBcnJheTxOekdyYXBoTm9kZSB8IE56R3JhcGhHcm91cE5vZGU+KTogdm9pZCA9PiB7XG4gICAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSAxICYmIHRoaXMubWFwT2ZOb2RlQXR0ci5oYXNPd25Qcm9wZXJ0eShub2RlLm5hbWUpKSB7XG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihub2RlLCB0aGlzLm1hcE9mTm9kZUF0dHJbbm9kZS5uYW1lXSk7XG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAwKSB7XG4gICAgICAgICAgKG5vZGUgYXMgTnpHcmFwaEdyb3VwTm9kZSkuZWRnZXMuZm9yRWFjaChlZGdlID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcE9mRWRnZUF0dHIuaGFzT3duUHJvcGVydHkoYCR7ZWRnZS52fS0ke2VkZ2Uud31gKSkge1xuICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVkZ2UsIHRoaXMubWFwT2ZFZGdlQXR0cltgJHtlZGdlLnZ9LSR7ZWRnZS53fWBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBkaWcobm9kZS5ub2Rlcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgZGlnKHJlbmRlckluZm8ubm9kZXMpO1xuICAgIC8vIEFzc2lnbiBkYXRhIHRvIGVkZ2VzIG9mIHJvb3QgZ3JhcGhcbiAgICByZW5kZXJJbmZvLmVkZ2VzLmZvckVhY2goZWRnZSA9PiB7XG4gICAgICBpZiAodGhpcy5tYXBPZkVkZ2VBdHRyLmhhc093blByb3BlcnR5KGAke2VkZ2Uudn0tJHtlZGdlLnd9YCkpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihlZGdlLCB0aGlzLm1hcE9mRWRnZUF0dHJbYCR7ZWRnZS52fS0ke2VkZ2Uud31gXSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlbmRlckluZm87XG4gIH1cblxuICBwcml2YXRlIHJlc2l6ZU5vZGVzKHJlbmRlckluZm86IE56R3JhcGhHcm91cE5vZGUsIG9wdGlvbnM6IE56R3JhcGhPcHRpb24pOiB2b2lkIHtcbiAgICB0aGlzLm5nWm9uZS5vblN0YWJsZVxuICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGFTb3VyY2U6IE56R3JhcGhEYXRhRGVmID0gdGhpcy5kYXRhU291cmNlIS5kYXRhU291cmNlITtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW256LWdyYXBoLW5vZGVdJykuZm9yRWFjaCgobm9kZUVsZTogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBjb250ZW50RWxlID0gbm9kZUVsZS5xdWVyeVNlbGVjdG9yKCcubnotZ3JhcGgtbm9kZS13cmFwcGVyJyk7XG4gICAgICAgICAgaWYgKGNvbnRlbnRFbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGNvbnRlbnRFbGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBjb250ZW50RWxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICAgICAgLy8gRWxlbWVudCBpZCB0eXBlIGlzIHN0cmluZ1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0Tm9kZSA9IGZsYXR0ZW5Ob2RlcyhyZW5kZXJJbmZvKS5maW5kKG4gPT4gYCR7bi5uYW1lfWAgPT09IG5vZGVFbGUuaWQpO1xuICAgICAgICAgICAgY29uc3Qgbm9kZU5hbWUgPSB0YXJnZXROb2RlICYmIHRhcmdldE5vZGUubmFtZTtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBkYXRhU291cmNlLm5vZGVzLmZpbmQobiA9PiBuLmlkID09PSBub2RlTmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgIG5vZGUuaGVpZ2h0ID0gaGVpZ2h0IC8gdGhpcy5uelpvb207XG4gICAgICAgICAgICAgIG5vZGUud2lkdGggPSB3aWR0aCAvIHRoaXMubnpab29tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IG5ld1JlbmRlckluZm8gPSB0aGlzLmJ1aWxkR3JhcGhJbmZvKGRhdGFTb3VyY2UsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnNldFJlbmRlckluZm8obmV3UmVuZGVySW5mbywgZmFsc2UpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzc2lnblJlbmRlckluZm8ocmVuZGVySW5mbzogTnpHcmFwaEdyb3VwTm9kZSk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVySW5mby5lZGdlcyA9IHJlbmRlckluZm8uZWRnZXM7XG4gICAgdGhpcy5yZW5kZXJJbmZvLm5vZGVzLmZvckVhY2goKG5vZGU6IE56R3JhcGhOb2RlIHwgTnpHcmFwaEdyb3VwTm9kZSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgT2JqZWN0LmFzc2lnbihub2RlLCByZW5kZXJJbmZvLm5vZGVzW2luZGV4XSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG1ha2VOb2Rlc0FuaW1hdGlvbigpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gZm9ya0pvaW4oLi4udGhpcy5ncmFwaE5vZGVzLm1hcChub2RlID0+IG5vZGUubWFrZUFuaW1hdGlvbigpKSkucGlwZShcbiAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZHJhd01pbmltYXAoKTtcbiAgICAgIH0pLFxuICAgICAgZmluYWxpemUoKCkgPT4ge1xuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlSW5mbyhkYXRhOiBOekdyYXBoRGF0YURlZik6IHZvaWQge1xuICAgIGRhdGEubm9kZXMuZm9yRWFjaChuID0+IHtcbiAgICAgIHRoaXMubWFwT2ZOb2RlQXR0cltuLmlkXSA9IG47XG4gICAgfSk7XG4gICAgZGF0YS5lZGdlcy5mb3JFYWNoKGUgPT4ge1xuICAgICAgdGhpcy5tYXBPZkVkZ2VBdHRyW2Ake2Uudn0tJHtlLnd9YF0gPSBlO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3TWluaW1hcChmb3JjZVJlcmVuZGVyOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubWluaW1hcCB8fCAhdGhpcy5uelNob3dNaW5pbWFwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChmb3JjZVJlcmVuZGVyKSB7XG4gICAgICB0aGlzLm1pbmltYXA/LmluaXQoXG4gICAgICAgIHRoaXMuc3ZnQ29udGFpbmVyQ29tcG9uZW50LmNvbnRhaW5lckVsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgdGhpcy5zdmdDb250YWluZXJDb21wb25lbnQuem9vbUVsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgdGhpcy5zdmdDb250YWluZXJDb21wb25lbnQuem9vbUNvbnRyb2xsZXJcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWluaW1hcD8udXBkYXRlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=