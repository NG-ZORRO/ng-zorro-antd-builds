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
            .pipe(take(1), finalize(() => {
            this.cdr.detectChanges();
        }))
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
              [class.nz-graph-custom-node]="!!customGraphNodeTemplate"
              [style.display]="node.type === 2 ? 'none' : null"
              *ngFor="let node of typedNodes(renderInfo.nodes); trackBy: nodeTrackByFun"
            >
              <svg:g nz-graph-node [node]="node" (nodeClick)="clickNode($event)">
                <foreignObject class="nz-graph-node-rect" x="0" y="0" [attr.width]="node.width" [attr.height]="node.height">
                  <xhtml:div class="nz-graph-node-wrapper">
                    <ng-container
                      *ngIf="customGraphNodeTemplate"
                      [ngTemplateOutlet]="customGraphNodeTemplate"
                      [ngTemplateOutletContext]="{ $implicit: node }"
                    ></ng-container>
                    <div class="node-content" *ngIf="!customGraphNodeTemplate">
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
    customGraphNodeTemplate: [{ type: ContentChild, args: [NzCustomGraphNodeDirective, { static: true, read: TemplateRef },] }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGguY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9ncmFwaC8iLCJzb3VyY2VzIjpbImdyYXBoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUdMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBSU4sTUFBTSxFQUNOLFNBQVMsRUFFVCxXQUFXLEVBQ1gsU0FBUyxFQUNULFlBQVksRUFDWixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsUUFBUSxFQUFjLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsNEJBQTRCLEVBQW1CLE1BQU0saUNBQWlDLENBQUM7QUFDaEcsT0FBTyxFQVdMLGdCQUFnQixFQUNoQix1QkFBdUIsRUFDeEIsTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUV2QyxpREFBaUQ7QUFDakQsTUFBTSxV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SUMsaUJBQWlCO1lBTWpCLE1BQU07WUFITixVQUFVOzs7eUJBdUlULFlBQVksU0FBQyxvQkFBb0I7b0NBQ2pDLFNBQVMsU0FBQyw0QkFBNEI7c0JBQ3RDLFNBQVMsU0FBQyx1QkFBdUI7c0NBRWpDLFlBQVksU0FBQywwQkFBMEIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTswQkFPNUUsS0FBSzs4QkFDTCxLQUFLO29DQUNMLEtBQUs7NEJBQ0wsS0FBSzswQkFDTCxLQUFLO3FCQUVMLEtBQUs7eUJBQ0wsS0FBSztpQ0FFTCxNQUFNO3lCQUNOLE1BQU07K0JBQ04sTUFBTTswQkFDTixNQUFNOztBQVRrQjtJQUFmLFlBQVksRUFBRTs7dURBQXVCO0FBQ3RCO0lBQWYsWUFBWSxFQUFFOztxREFBcUI7QUFHcEI7SUFBZixZQUFZLEVBQUU7O29EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudENoZWNrZWQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDaGlsZHJlbixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBidWlsZEdyYXBoIH0gZnJvbSAnQG54LWNvbXBvbmVudC9oaWVyYXJjaHktZ3JhcGgnO1xuaW1wb3J0IHsgWm9vbVRyYW5zZm9ybSB9IGZyb20gJ2QzLXpvb20nO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgZm9ya0pvaW4sIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmluYWxpemUsIHRha2UsIHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTnpDdXN0b21HcmFwaE5vZGVEaXJlY3RpdmUgfSBmcm9tICcuL2N1c3RvbS1ncmFwaC1ub2RlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOekdyYXBoRGF0YSB9IGZyb20gJy4vZGF0YS1zb3VyY2UvZ3JhcGgtZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHsgTnpHcmFwaE1pbmltYXBDb21wb25lbnQgfSBmcm9tICcuL2dyYXBoLW1pbmltYXAuY29tcG9uZW50JztcbmltcG9ydCB7IE56R3JhcGhOb2RlRGlyZWN0aXZlIH0gZnJvbSAnLi9ncmFwaC1ub2RlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOekdyYXBoU3ZnQ29udGFpbmVyQ29tcG9uZW50LCBOelpvb21UcmFuc2Zvcm0gfSBmcm9tICcuL2dyYXBoLXN2Zy1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIE56R3JhcGhEYXRhRGVmLFxuICBOekdyYXBoRWRnZSxcbiAgTnpHcmFwaEVkZ2VEZWYsXG4gIE56R3JhcGhHcm91cE5vZGUsXG4gIE56R3JhcGhMYXlvdXRTZXR0aW5nLFxuICBOekdyYXBoTm9kZSxcbiAgTnpHcmFwaE5vZGVEZWYsXG4gIE56R3JhcGhPcHRpb24sXG4gIE56TGF5b3V0U2V0dGluZyxcbiAgTnpSYW5rRGlyZWN0aW9uLFxuICBuelR5cGVEZWZpbml0aW9uLFxuICBOWl9HUkFQSF9MQVlPVVRfU0VUVElOR1xufSBmcm9tICcuL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBmbGF0dGVuTm9kZXMgfSBmcm9tICcuL3V0aWxzJztcblxuLyoqIENoZWNrcyB3aGV0aGVyIGFuIG9iamVjdCBpcyBhIGRhdGEgc291cmNlLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRGF0YVNvdXJjZSh2YWx1ZTogTnpTYWZlQW55KTogdmFsdWUgaXMgTnpHcmFwaERhdGEge1xuICAvLyBDaGVjayBpZiB0aGUgdmFsdWUgaXMgYSBEYXRhU291cmNlIGJ5IG9ic2VydmluZyBpZiBpdCBoYXMgYSBjb25uZWN0IGZ1bmN0aW9uLiBDYW5ub3RcbiAgLy8gYmUgY2hlY2tlZCBhcyBhbiBgaW5zdGFuY2VvZiBEYXRhU291cmNlYCBzaW5jZSBwZW9wbGUgY291bGQgY3JlYXRlIHRoZWlyIG93biBzb3VyY2VzXG4gIC8vIHRoYXQgbWF0Y2ggdGhlIGludGVyZmFjZSwgYnV0IGRvbid0IGV4dGVuZCBEYXRhU291cmNlLlxuICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlLmNvbm5lY3QgPT09ICdmdW5jdGlvbic7XG59XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6ICduei1ncmFwaCcsXG4gIGV4cG9ydEFzOiAnbnpHcmFwaCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDxuei1ncmFwaC1zdmctY29udGFpbmVyICh0cmFuc2Zvcm1FdmVudCk9XCJ0cmlnZ2VyVHJhbnNmb3JtKCRldmVudClcIj5cbiAgICAgIDxzdmc6ZGVmcyBuei1ncmFwaC1kZWZzPjwvc3ZnOmRlZnM+XG4gICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImdyb3VwVGVtcGxhdGVcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyByZW5kZXJJbmZvOiByZW5kZXJJbmZvLCB0eXBlOiAncm9vdCcgfVwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvbnotZ3JhcGgtc3ZnLWNvbnRhaW5lcj5cblxuICAgIDxuei1ncmFwaC1taW5pbWFwICpuZ0lmPVwibnpTaG93TWluaW1hcFwiPjwvbnotZ3JhcGgtbWluaW1hcD5cblxuICAgIDxuZy10ZW1wbGF0ZSAjZ3JvdXBUZW1wbGF0ZSBsZXQtcmVuZGVySW5mbz1cInJlbmRlckluZm9cIiBsZXQtdHlwZT1cInR5cGVcIj5cbiAgICAgIDxzdmc6ZyBbYXR0ci50cmFuc2Zvcm1dPVwidHlwZSA9PT0gJ3N1YicgPyBzdWJHcmFwaFRyYW5zZm9ybShyZW5kZXJJbmZvKSA6IG51bGxcIj5cbiAgICAgICAgPHN2ZzpnIGNsYXNzPVwiY29yZVwiIFthdHRyLnRyYW5zZm9ybV09XCJjb3JlVHJhbnNmb3JtKHJlbmRlckluZm8pXCI+XG4gICAgICAgICAgPHN2ZzpnIGNsYXNzPVwibnotZ3JhcGgtZWRnZXNcIj5cbiAgICAgICAgICAgIDxzdmc6ZyBjbGFzcz1cIm56LWdyYXBoLWVkZ2VcIiAqbmdGb3I9XCJsZXQgZWRnZSBvZiByZW5kZXJJbmZvLmVkZ2VzOyBsZXQgaW5kZXggPSBpbmRleDsgdHJhY2tCeTogZWRnZVRyYWNrQnlGdW5cIj5cbiAgICAgICAgICAgICAgPHN2ZzpwYXRoXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJuei1ncmFwaC1lZGdlLWxpbmVcIlxuICAgICAgICAgICAgICAgIG56LWdyYXBoLWVkZ2VcbiAgICAgICAgICAgICAgICBbYXR0ci5tYXJrZXItZW5kXT1cIm56U2hvd0Fycm93ID8gJ3VybCgjZWRnZS1lbmQtYXJyb3cpJyA6IG51bGxcIlxuICAgICAgICAgICAgICAgIFtlZGdlXT1cImVkZ2VcIlxuICAgICAgICAgICAgICA+PC9zdmc6cGF0aD5cbiAgICAgICAgICAgICAgPHN2Zzp0ZXh0IGNsYXNzPVwibnotZ3JhcGgtZWRnZS10ZXh0XCIgdGV4dC1hbmNob3I9XCJtaWRkbGVcIiBkeT1cIjIwXCIgKm5nSWY9XCJlZGdlLmxhYmVsXCI+XG4gICAgICAgICAgICAgICAgPHRleHRQYXRoIFthdHRyLmhyZWZdPVwiJyMnICsgZWRnZS52ICsgJy0tJyArIGVkZ2Uud1wiIHN0YXJ0T2Zmc2V0PVwiNTAlXCI+e3sgZWRnZS5sYWJlbCB9fTwvdGV4dFBhdGg+XG4gICAgICAgICAgICAgIDwvc3ZnOnRleHQ+XG4gICAgICAgICAgICA8L3N2ZzpnPlxuICAgICAgICAgIDwvc3ZnOmc+XG5cbiAgICAgICAgICA8c3ZnOmcgY2xhc3M9XCJuei1ncmFwaC1ub2Rlc1wiPlxuICAgICAgICAgICAgPHN2ZzpnXG4gICAgICAgICAgICAgIGNsYXNzPVwibnotZ3JhcGgtbm9kZVwiXG4gICAgICAgICAgICAgIFtjbGFzcy5uei1ncmFwaC1jdXN0b20tbm9kZV09XCIhIWN1c3RvbUdyYXBoTm9kZVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwibm9kZS50eXBlID09PSAyID8gJ25vbmUnIDogbnVsbFwiXG4gICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBub2RlIG9mIHR5cGVkTm9kZXMocmVuZGVySW5mby5ub2Rlcyk7IHRyYWNrQnk6IG5vZGVUcmFja0J5RnVuXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHN2ZzpnIG56LWdyYXBoLW5vZGUgW25vZGVdPVwibm9kZVwiIChub2RlQ2xpY2spPVwiY2xpY2tOb2RlKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8Zm9yZWlnbk9iamVjdCBjbGFzcz1cIm56LWdyYXBoLW5vZGUtcmVjdFwiIHg9XCIwXCIgeT1cIjBcIiBbYXR0ci53aWR0aF09XCJub2RlLndpZHRoXCIgW2F0dHIuaGVpZ2h0XT1cIm5vZGUuaGVpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICA8eGh0bWw6ZGl2IGNsYXNzPVwibnotZ3JhcGgtbm9kZS13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImN1c3RvbUdyYXBoTm9kZVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21HcmFwaE5vZGVUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBub2RlIH1cIlxuICAgICAgICAgICAgICAgICAgICA+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJub2RlLWNvbnRlbnRcIiAqbmdJZj1cIiFjdXN0b21HcmFwaE5vZGVUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3sgbm9kZS5uYW1lIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8aVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImFjdGlvbi1pY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJub2RlLnR5cGUgPT09IDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBuei1pY29uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtuelR5cGVdPVwibm9kZS5leHBhbmRlZCA/ICdtaW51cycgOiAncGx1cydcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBuelRoZW1lPVwib3V0bGluZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVOb2RlKG5vZGUubmFtZSwgbm9kZS5leHBhbmRlZClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxcIiAqbmdJZj1cIiFub2RlLmV4cGFuZGVkXCI+e3sgbm9kZS5sYWJlbCB9fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwveGh0bWw6ZGl2PlxuICAgICAgICAgICAgICAgIDwvZm9yZWlnbk9iamVjdD5cbiAgICAgICAgICAgICAgPC9zdmc6Zz5cblxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJub2RlLmV4cGFuZGVkXCJcbiAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJncm91cFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyByZW5kZXJJbmZvOiBub2RlLCB0eXBlOiAnc3ViJyB9XCJcbiAgICAgICAgICAgICAgPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9zdmc6Zz5cbiAgICAgICAgICA8L3N2ZzpnPlxuICAgICAgICA8L3N2ZzpnPlxuICAgICAgPC9zdmc6Zz5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5uei1ncmFwaF0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5uei1ncmFwaC1hdXRvLWZpdF0nOiAnbnpBdXRvU2l6ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekdyYXBoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIE9uRGVzdHJveSB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dNaW5pbWFwOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekF1dG9TaXplOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dBcnJvdzogQm9vbGVhbklucHV0O1xuXG4gIEBWaWV3Q2hpbGRyZW4oTnpHcmFwaE5vZGVEaXJlY3RpdmUpIGdyYXBoTm9kZXMhOiBRdWVyeUxpc3Q8TnpHcmFwaE5vZGVEaXJlY3RpdmU+O1xuICBAVmlld0NoaWxkKE56R3JhcGhTdmdDb250YWluZXJDb21wb25lbnQpIHN2Z0NvbnRhaW5lckNvbXBvbmVudCE6IE56R3JhcGhTdmdDb250YWluZXJDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoTnpHcmFwaE1pbmltYXBDb21wb25lbnQpIG1pbmltYXA6IE56R3JhcGhNaW5pbWFwQ29tcG9uZW50IHwgdW5kZWZpbmVkO1xuXG4gIEBDb250ZW50Q2hpbGQoTnpDdXN0b21HcmFwaE5vZGVEaXJlY3RpdmUsIHsgc3RhdGljOiB0cnVlLCByZWFkOiBUZW1wbGF0ZVJlZiB9KSBjdXN0b21HcmFwaE5vZGVUZW1wbGF0ZT86IFRlbXBsYXRlUmVmPHtcbiAgICAkaW1wbGljaXQ6IE56R3JhcGhOb2RlIHwgTnpHcmFwaEdyb3VwTm9kZTtcbiAgfT47XG4gIC8qKlxuICAgKiBQcm92aWRlcyBhIHN0cmVhbSBjb250YWluaW5nIHRoZSBsYXRlc3QgZGF0YSBhcnJheSB0byByZW5kZXIuXG4gICAqIERhdGEgc291cmNlIGNhbiBiZSBhbiBvYnNlcnZhYmxlIG9mIE56R3JhcGhEYXRhLCBvciBhIE56R3JhcGhEYXRhIHRvIHJlbmRlci5cbiAgICovXG4gIEBJbnB1dCgpIG56R3JhcGhEYXRhITogTnpHcmFwaERhdGE7XG4gIEBJbnB1dCgpIG56UmFua0RpcmVjdGlvbjogTnpSYW5rRGlyZWN0aW9uID0gJ0xSJztcbiAgQElucHV0KCkgbnpHcmFwaExheW91dFNldHRpbmdzPzogTnpHcmFwaExheW91dFNldHRpbmc7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNob3dNaW5pbWFwID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNob3dBcnJvdyA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIG56Wm9vbSA9IDE7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekF1dG9TaXplID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56R3JhcGhJbml0aWFsaXplZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Wm9vbUluaXQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuelRyYW5zZm9ybUV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxOelpvb21UcmFuc2Zvcm0+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuek5vZGVDbGljazogRXZlbnRFbWl0dGVyPE56R3JhcGhOb2RlIHwgTnpHcmFwaEdyb3VwTm9kZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcmVuZGVySW5mbzogTnpHcmFwaEdyb3VwTm9kZSA9IHsgbGFiZWxIZWlnaHQ6IDAgfSBhcyBOekdyYXBoR3JvdXBOb2RlO1xuICBtYXBPZk5vZGVBdHRyOiB7IFtrZXk6IHN0cmluZ106IE56R3JhcGhOb2RlRGVmIH0gPSB7fTtcbiAgbWFwT2ZFZGdlQXR0cjogeyBba2V5OiBzdHJpbmddOiBOekdyYXBoRWRnZURlZiB9ID0ge307XG5cbiAgcHVibGljIHJlYWRvbmx5IHR5cGVkTm9kZXMgPSBuelR5cGVEZWZpbml0aW9uPEFycmF5PE56R3JhcGhOb2RlIHwgTnpHcmFwaEdyb3VwTm9kZT4+KCk7XG4gIHByaXZhdGUgZGF0YVNvdXJjZT86IE56R3JhcGhEYXRhO1xuICBwcml2YXRlIGxheW91dFNldHRpbmc6IE56TGF5b3V0U2V0dGluZyA9IE5aX0dSQVBIX0xBWU9VVF9TRVRUSU5HO1xuICAvKiogRGF0YSBzdWJzY3JpcHRpb24gKi9cbiAgcHJpdmF0ZSBfZGF0YVN1YnNjcmlwdGlvbj86IFN1YnNjcmlwdGlvbiB8IG51bGw7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIG5vZGVUcmFja0J5RnVuID0gKF86IG51bWJlciwgbm9kZTogTnpHcmFwaE5vZGUgfCBOekdyYXBoR3JvdXBOb2RlKSA9PiBub2RlLm5hbWU7XG4gIGVkZ2VUcmFja0J5RnVuID0gKF86IG51bWJlciwgZWRnZTogTnpHcmFwaEVkZ2UpID0+IGAke2VkZ2Uudn0tJHtlZGdlLnd9YDtcblxuICBzdWJHcmFwaFRyYW5zZm9ybSA9IChub2RlOiBOekdyYXBoR3JvdXBOb2RlKSA9PiB7XG4gICAgY29uc3QgeCA9IG5vZGUueCAtIG5vZGUuY29yZUJveC53aWR0aCAvIDIuMDtcbiAgICBjb25zdCB5ID0gbm9kZS55IC0gbm9kZS5oZWlnaHQgLyAyLjAgKyBub2RlLnBhZGRpbmdUb3AgLyAyLjA7XG4gICAgcmV0dXJuIGB0cmFuc2xhdGUoJHt4fSwgJHt5fSlgO1xuICB9O1xuXG4gIGNvcmVUcmFuc2Zvcm0gPSAobm9kZTogTnpHcmFwaEdyb3VwTm9kZSkgPT4ge1xuICAgIHJldHVybiBgdHJhbnNsYXRlKDAsICR7bm9kZS5sYWJlbEhlaWdodH0pYDtcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kYXRhU291cmNlICE9PSB0aGlzLm56R3JhcGhEYXRhKSB7XG4gICAgICB0aGlzLl9zd2l0Y2hEYXRhU291cmNlKHRoaXMubnpHcmFwaERhdGEpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56QXV0b0ZpdCwgbnpSYW5rRGlyZWN0aW9uLCBuekdyYXBoRGF0YSwgbnpHcmFwaExheW91dFNldHRpbmdzIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChuekdyYXBoTGF5b3V0U2V0dGluZ3MpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5sYXlvdXRTZXR0aW5nLCB0aGlzLm56R3JhcGhMYXlvdXRTZXR0aW5ncyB8fCB7fSk7XG4gICAgfVxuXG4gICAgaWYgKG56R3JhcGhEYXRhKSB7XG4gICAgICBpZiAodGhpcy5kYXRhU291cmNlICE9PSB0aGlzLm56R3JhcGhEYXRhKSB7XG4gICAgICAgIHRoaXMuX3N3aXRjaERhdGFTb3VyY2UodGhpcy5uekdyYXBoRGF0YSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKChuekF1dG9GaXQgJiYgIW56QXV0b0ZpdC5maXJzdENoYW5nZSkgfHwgKG56UmFua0RpcmVjdGlvbiAmJiAhbnpSYW5rRGlyZWN0aW9uLmZpcnN0Q2hhbmdlKSkge1xuICAgICAgLy8gUmVuZGVyIGdyYXBoXG4gICAgICBpZiAodGhpcy5kYXRhU291cmNlIS5kYXRhU291cmNlKSB7XG4gICAgICAgIHRoaXMucmVuZGVyR3JhcGgodGhpcy5kYXRhU291cmNlIS5kYXRhU291cmNlLCB7XG4gICAgICAgICAgcmFua0RpcmVjdGlvbjogdGhpcy5uelJhbmtEaXJlY3Rpb24sXG4gICAgICAgICAgZXhwYW5kZWQ6IHRoaXMuZGF0YVNvdXJjZSEuZXhwYW5zaW9uTW9kZWwuc2VsZWN0ZWQgfHwgW11cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5hdXRvRml0KCk7XG4gICAgdGhpcy5kcmF3TWluaW1hcCh0cnVlKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kYXRhU291cmNlICYmICF0aGlzLl9kYXRhU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLm9ic2VydmVSZW5kZXJDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuXG4gICAgaWYgKHRoaXMuZGF0YVNvdXJjZSAmJiB0eXBlb2YgdGhpcy5kYXRhU291cmNlLmRpc2Nvbm5lY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2RhdGFTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX2RhdGFTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2RhdGFTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm0gZXZlbnRcbiAgICovXG4gIHRyaWdnZXJUcmFuc2Zvcm0oJGV2ZW50OiB7IHg6IG51bWJlcjsgeTogbnVtYmVyOyBrOiBudW1iZXIgfSk6IHZvaWQge1xuICAgIHRoaXMubnpab29tID0gJGV2ZW50Lms7XG4gICAgaWYgKHRoaXMubWluaW1hcCkge1xuICAgICAgdGhpcy5taW5pbWFwLnpvb20oJGV2ZW50IGFzIFpvb21UcmFuc2Zvcm0pO1xuICAgIH1cbiAgICB0aGlzLm56VHJhbnNmb3JtRXZlbnQuZW1pdCgkZXZlbnQpO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVtaXQgZXZlbnRcbiAgICovXG4gIGNsaWNrTm9kZShub2RlOiBOekdyYXBoTm9kZSB8IE56R3JhcGhHcm91cE5vZGUpOiB2b2lkIHtcbiAgICB0aGlzLm56Tm9kZUNsaWNrLmVtaXQobm9kZSk7XG4gIH1cblxuICAvKipcbiAgICogTW92ZSBncmFwaCB0byBjZW50ZXJcbiAgICovXG4gIGF1dG9GaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVuZGVySW5mbykge1xuICAgICAgdGhpcy5zdmdDb250YWluZXJDb21wb25lbnQ/LmZpdCgwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVmYWN0b3JcbiAgICovXG4gIHRvZ2dsZU5vZGUobm9kZTogc3RyaW5nLCBleHBhbmRlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmIChleHBhbmRlZCkge1xuICAgICAgLy8gY29sbGFwc2UgaXRcbiAgICAgIHRoaXMubnpHcmFwaERhdGEuY29sbGFwc2Uobm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGV4cGFuZCBpdFxuICAgICAgdGhpcy5uekdyYXBoRGF0YS5leHBhbmQobm9kZSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyR3JhcGgoZGF0YTogTnpHcmFwaERhdGFEZWYsIG9wdGlvbnM6IE56R3JhcGhPcHRpb24pOiB2b2lkIHtcbiAgICBjb25zdCByZW5kZXJJbmZvID0gdGhpcy5idWlsZEdyYXBoSW5mbyhkYXRhLCBvcHRpb25zKTtcbiAgICAvLyBUT0RPXG4gICAgLy8gTmVlZCBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAgICB0aGlzLnNldFJlbmRlckluZm8ocmVuZGVySW5mbywgZmFsc2UpO1xuICAgIGlmICh0aGlzLm56QXV0b1NpemUpIHtcbiAgICAgIHRoaXMucmVzaXplTm9kZXMocmVuZGVySW5mbywgb3B0aW9ucyk7XG4gICAgfVxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTd2l0Y2ggdG8gdGhlIHByb3ZpZGVkIGRhdGEgc291cmNlIGJ5IHJlc2V0dGluZyB0aGUgZGF0YSBhbmQgdW5zdWJzY3JpYmluZyBmcm9tIHRoZSBjdXJyZW50XG4gICAqIHJlbmRlciBjaGFuZ2Ugc3Vic2NyaXB0aW9uIGlmIG9uZSBleGlzdHMuIElmIHRoZSBkYXRhIHNvdXJjZSBpcyBudWxsLCBpbnRlcnByZXQgdGhpcyBieVxuICAgKiBjbGVhcmluZyB0aGUgbm9kZSBvdXRsZXQuIE90aGVyd2lzZSBzdGFydCBsaXN0ZW5pbmcgZm9yIG5ldyBkYXRhLlxuICAgKi9cbiAgcHJpdmF0ZSBfc3dpdGNoRGF0YVNvdXJjZShkYXRhU291cmNlOiBOekdyYXBoRGF0YSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRhdGFTb3VyY2UgJiYgdHlwZW9mIHRoaXMuZGF0YVNvdXJjZS5kaXNjb25uZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLm56R3JhcGhEYXRhLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZGF0YVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fZGF0YVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fZGF0YVN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5kYXRhU291cmNlID0gZGF0YVNvdXJjZTtcbiAgICB0aGlzLm9ic2VydmVSZW5kZXJDaGFuZ2VzKCk7XG4gIH1cblxuICAvKiogU2V0IHVwIGEgc3Vic2NyaXB0aW9uIGZvciB0aGUgZGF0YSBwcm92aWRlZCBieSB0aGUgZGF0YSBzb3VyY2UuICovXG4gIHByaXZhdGUgb2JzZXJ2ZVJlbmRlckNoYW5nZXMoKTogdm9pZCB7XG4gICAgbGV0IGRhdGFTdHJlYW06IE9ic2VydmFibGU8TnpHcmFwaERhdGFEZWY+IHwgdW5kZWZpbmVkO1xuICAgIGxldCBncmFwaE9wdGlvbnM6IE56R3JhcGhPcHRpb24gPSB7XG4gICAgICByYW5rRGlyZWN0aW9uOiB0aGlzLm56UmFua0RpcmVjdGlvblxuICAgIH07XG4gICAgaWYgKGlzRGF0YVNvdXJjZSh0aGlzLmRhdGFTb3VyY2UpKSB7XG4gICAgICBkYXRhU3RyZWFtID0gdGhpcy5kYXRhU291cmNlLmNvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YVN0cmVhbSkge1xuICAgICAgdGhpcy5fZGF0YVN1YnNjcmlwdGlvbiA9IGRhdGFTdHJlYW0ucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgZ3JhcGhPcHRpb25zID0ge1xuICAgICAgICAgIHJhbmtEaXJlY3Rpb246IHRoaXMubnpSYW5rRGlyZWN0aW9uLFxuICAgICAgICAgIGV4cGFuZGVkOiB0aGlzLm56R3JhcGhEYXRhLmV4cGFuc2lvbk1vZGVsLnNlbGVjdGVkXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVuZGVyR3JhcGgoZGF0YSwgZ3JhcGhPcHRpb25zKTtcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKGBBIHZhbGlkIGRhdGEgc291cmNlIG11c3QgYmUgcHJvdmlkZWQuYCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRSZW5kZXJJbmZvKHJlbmRlckluZm86IE56R3JhcGhHcm91cE5vZGUsIGFzUGF0Y2g6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgaWYgKGFzUGF0Y2gpIHtcbiAgICAgIHRoaXMuYXNzaWduUmVuZGVySW5mbyhyZW5kZXJJbmZvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJJbmZvID0gcmVuZGVySW5mbztcbiAgICB9XG4gICAgdGhpcy5uZ1pvbmUub25TdGFibGUucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5tYWtlTm9kZXNBbmltYXRpb24oKS5zdWJzY3JpYmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRHcmFwaEluZm8oZGF0YTogTnpHcmFwaERhdGFEZWYsIG9wdGlvbnM6IE56R3JhcGhPcHRpb24pOiBOekdyYXBoR3JvdXBOb2RlIHtcbiAgICB0aGlzLnBhcnNlSW5mbyhkYXRhKTtcbiAgICBjb25zdCByZW5kZXJJbmZvID0gYnVpbGRHcmFwaChkYXRhLCBvcHRpb25zLCB0aGlzLmxheW91dFNldHRpbmcpIGFzIE56R3JhcGhHcm91cE5vZGU7XG4gICAgY29uc3QgZGlnID0gKG5vZGVzOiBBcnJheTxOekdyYXBoTm9kZSB8IE56R3JhcGhHcm91cE5vZGU+KTogdm9pZCA9PiB7XG4gICAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSAxICYmIHRoaXMubWFwT2ZOb2RlQXR0ci5oYXNPd25Qcm9wZXJ0eShub2RlLm5hbWUpKSB7XG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihub2RlLCB0aGlzLm1hcE9mTm9kZUF0dHJbbm9kZS5uYW1lXSk7XG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAwKSB7XG4gICAgICAgICAgKG5vZGUgYXMgTnpHcmFwaEdyb3VwTm9kZSkuZWRnZXMuZm9yRWFjaChlZGdlID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcE9mRWRnZUF0dHIuaGFzT3duUHJvcGVydHkoYCR7ZWRnZS52fS0ke2VkZ2Uud31gKSkge1xuICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVkZ2UsIHRoaXMubWFwT2ZFZGdlQXR0cltgJHtlZGdlLnZ9LSR7ZWRnZS53fWBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBkaWcobm9kZS5ub2Rlcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgZGlnKHJlbmRlckluZm8ubm9kZXMpO1xuICAgIC8vIEFzc2lnbiBkYXRhIHRvIGVkZ2VzIG9mIHJvb3QgZ3JhcGhcbiAgICByZW5kZXJJbmZvLmVkZ2VzLmZvckVhY2goZWRnZSA9PiB7XG4gICAgICBpZiAodGhpcy5tYXBPZkVkZ2VBdHRyLmhhc093blByb3BlcnR5KGAke2VkZ2Uudn0tJHtlZGdlLnd9YCkpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihlZGdlLCB0aGlzLm1hcE9mRWRnZUF0dHJbYCR7ZWRnZS52fS0ke2VkZ2Uud31gXSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlbmRlckluZm87XG4gIH1cblxuICBwcml2YXRlIHJlc2l6ZU5vZGVzKHJlbmRlckluZm86IE56R3JhcGhHcm91cE5vZGUsIG9wdGlvbnM6IE56R3JhcGhPcHRpb24pOiB2b2lkIHtcbiAgICB0aGlzLm5nWm9uZS5vblN0YWJsZVxuICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgZmluYWxpemUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBjb25zdCBkYXRhU291cmNlOiBOekdyYXBoRGF0YURlZiA9IHRoaXMuZGF0YVNvdXJjZSEuZGF0YVNvdXJjZSE7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tuei1ncmFwaC1ub2RlXScpLmZvckVhY2goKG5vZGVFbGU6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgY29udGVudEVsZSA9IG5vZGVFbGUucXVlcnlTZWxlY3RvcignLm56LWdyYXBoLW5vZGUtd3JhcHBlcicpO1xuICAgICAgICAgIGlmIChjb250ZW50RWxlKSB7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBjb250ZW50RWxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gY29udGVudEVsZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgICAgIC8vIEVsZW1lbnQgaWQgdHlwZSBpcyBzdHJpbmdcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldE5vZGUgPSBmbGF0dGVuTm9kZXMocmVuZGVySW5mbykuZmluZChuID0+IGAke24ubmFtZX1gID09PSBub2RlRWxlLmlkKTtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVOYW1lID0gdGFyZ2V0Tm9kZSAmJiB0YXJnZXROb2RlLm5hbWU7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gZGF0YVNvdXJjZS5ub2Rlcy5maW5kKG4gPT4gbi5pZCA9PT0gbm9kZU5hbWUpO1xuXG4gICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICBub2RlLmhlaWdodCA9IGhlaWdodCAvIHRoaXMubnpab29tO1xuICAgICAgICAgICAgICBub2RlLndpZHRoID0gd2lkdGggLyB0aGlzLm56Wm9vbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBuZXdSZW5kZXJJbmZvID0gdGhpcy5idWlsZEdyYXBoSW5mbyhkYXRhU291cmNlLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5zZXRSZW5kZXJJbmZvKG5ld1JlbmRlckluZm8sIGZhbHNlKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3NpZ25SZW5kZXJJbmZvKHJlbmRlckluZm86IE56R3JhcGhHcm91cE5vZGUpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlckluZm8uZWRnZXMgPSByZW5kZXJJbmZvLmVkZ2VzO1xuICAgIHRoaXMucmVuZGVySW5mby5ub2Rlcy5mb3JFYWNoKChub2RlOiBOekdyYXBoTm9kZSB8IE56R3JhcGhHcm91cE5vZGUsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIE9iamVjdC5hc3NpZ24obm9kZSwgcmVuZGVySW5mby5ub2Rlc1tpbmRleF0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBtYWtlTm9kZXNBbmltYXRpb24oKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIGZvcmtKb2luKC4uLnRoaXMuZ3JhcGhOb2Rlcy5tYXAobm9kZSA9PiBub2RlLm1ha2VBbmltYXRpb24oKSkpLnBpcGUoXG4gICAgICB0YXAoKCkgPT4ge1xuICAgICAgICB0aGlzLmRyYXdNaW5pbWFwKCk7XG4gICAgICB9KSxcbiAgICAgIGZpbmFsaXplKCgpID0+IHtcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUluZm8oZGF0YTogTnpHcmFwaERhdGFEZWYpOiB2b2lkIHtcbiAgICBkYXRhLm5vZGVzLmZvckVhY2gobiA9PiB7XG4gICAgICB0aGlzLm1hcE9mTm9kZUF0dHJbbi5pZF0gPSBuO1xuICAgIH0pO1xuICAgIGRhdGEuZWRnZXMuZm9yRWFjaChlID0+IHtcbiAgICAgIHRoaXMubWFwT2ZFZGdlQXR0cltgJHtlLnZ9LSR7ZS53fWBdID0gZTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhd01pbmltYXAoZm9yY2VSZXJlbmRlcjogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm1pbmltYXAgfHwgIXRoaXMubnpTaG93TWluaW1hcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZm9yY2VSZXJlbmRlcikge1xuICAgICAgdGhpcy5taW5pbWFwPy5pbml0KFxuICAgICAgICB0aGlzLnN2Z0NvbnRhaW5lckNvbXBvbmVudC5jb250YWluZXJFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIHRoaXMuc3ZnQ29udGFpbmVyQ29tcG9uZW50Lnpvb21FbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIHRoaXMuc3ZnQ29udGFpbmVyQ29tcG9uZW50Lnpvb21Db250cm9sbGVyXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1pbmltYXA/LnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxufVxuIl19