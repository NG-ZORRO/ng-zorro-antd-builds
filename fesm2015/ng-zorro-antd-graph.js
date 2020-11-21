import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, merge, Subject, forkJoin } from 'rxjs';
import { map, take, takeUntil, tap, finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Directive, Component, ElementRef, NgZone, Input, EventEmitter, Renderer2, Output, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, ViewChild, ViewChildren, ContentChild, TemplateRef, NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { line, curveBasis } from 'd3-shape';
import { drag } from 'd3-drag';
import { select, pointer } from 'd3-selection';
import { zoomIdentity, zoom, zoomTransform } from 'd3-zoom';
import { style, query, group, animate, AnimationBuilder } from '@angular/animations';
import { __decorate, __metadata } from 'tslib';
import { buildGraph } from '@nx-component/hierarchy-graph';
import { InputBoolean } from 'ng-zorro-antd/core/util';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function nzTypeDefinition() {
    return item => item;
}
const NZ_GRAPH_LAYOUT_SETTING = {
    animation: {
        /** Default duration for graph animations in ms. */
        duration: 250
    },
    graph: {
        /** Graph parameter for metanode. */
        meta: {
            /**
             * Dagre's nodesep param - number of pixels that
             * separate nodes horizontally in the layout.
             *
             * See https://github.com/cpettitt/dagre/wiki#configuring-the-layout
             */
            nodeSep: 50,
            /**
             * Dagre's ranksep param - number of pixels
             * between each rank in the layout.
             *
             * See https://github.com/cpettitt/dagre/wiki#configuring-the-layout
             */
            rankSep: 40,
            /**
             * Dagre's edgesep param - number of pixels that separate
             * edges horizontally in the layout.
             */
            edgeSep: 5
        },
        /**
         * Padding is used to correctly position the graph SVG inside of its parent
         * element. The padding amounts are applied using an SVG transform of X and
         * Y coordinates.
         */
        padding: { paddingTop: 10, paddingLeft: 0 }
    },
    subscene: {
        meta: {
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            /**
             * Used to leave room for the label on top of the highest node in
             * the groupCore graph.
             */
            labelHeight: 20,
            /** X-space between each extracted node and the groupCore graph. */
            extractXOffset: 0,
            /** Y-space between each extracted node. */
            extractYOffset: 0
        }
    },
    nodeSize: {
        /** Size of meta nodes. */
        meta: {
            radius: 2,
            width: 160,
            maxLabelWidth: 0,
            /** A scale for the node's height based on number of nodes inside */
            // Hack - set this as an any type to avoid issues in exporting a type
            // from an external module.
            height: 100,
            /** The radius of the circle denoting the expand button. */
            expandButtonRadius: 3
        },
        /** Size of op nodes. */
        op: {
            width: 160,
            height: 100,
            radius: 1,
            labelOffset: 10,
            maxLabelWidth: 40
        },
        /** Size of bridge nodes. */
        bridge: {
            // NOTE: bridge nodes will normally be invisible, but they must
            // take up some space so that the layout step leaves room for
            // their edges.
            width: 10,
            height: 10,
            radius: 2,
            labelOffset: 0
        }
    },
    shortcutSize: {
        /** Size of shortcuts for op nodes */
        op: { width: 10, height: 4 },
        /** Size of shortcuts for meta nodes */
        meta: { width: 12, height: 4, radius: 1 },
        /** Size of shortcuts for series nodes */
        series: {
            width: 14,
            height: 4
        }
    },
    annotations: {
        /** Maximum possible width of the bounding box for in annotations */
        inboxWidth: 50,
        /** Maximum possible width of the bounding box for out annotations */
        outboxWidth: 50,
        /** X-space between the shape and each annotation-node. */
        xOffset: 10,
        /** Y-space between each annotation-node. */
        yOffset: 3,
        /** X-space between each annotation-node and its label. */
        labelOffset: 2,
        /** Defines the max width for annotation label */
        maxLabelWidth: 120
    },
    constant: { size: { width: 4, height: 4 } },
    minimap: {
        /** The maximum width/height the minimap can have. */
        size: 150
    }
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzGraphData {
    constructor(source) {
        var _a;
        this._data = new BehaviorSubject({});
        /** A selection model with multi-selection to track expansion status. */
        this.expansionModel = new SelectionModel(true);
        if (source) {
            (_a = this.expansionModel) === null || _a === void 0 ? void 0 : _a.clear();
            this.dataSource = source;
            this._data.next(source);
        }
    }
    /** Toggles one single data node's expanded/collapsed state. */
    toggle(nodeName) {
        this.expansionModel.toggle(nodeName);
    }
    /** Expands one single data node. */
    expand(nodeName) {
        this.expansionModel.select(nodeName);
    }
    /** Collapses one single data node. */
    collapse(nodeName) {
        this.expansionModel.deselect(nodeName);
    }
    /** Whether a given data node is expanded or not. Returns true if the data node is expanded. */
    isExpanded(nodeName) {
        return this.expansionModel.isSelected(nodeName);
    }
    /** Collapse all dataNodes in the tree. */
    collapseAll() {
        this.expansionModel.clear();
    }
    expandAll() {
        this.expansionModel.select(...Object.keys(this._data.value.compound || {}));
    }
    setData(data) {
        var _a;
        (_a = this.expansionModel) === null || _a === void 0 ? void 0 : _a.clear();
        this.dataSource = data;
        this._data.next(data);
    }
    connect() {
        const changes = [this._data, this.expansionModel.changed];
        return merge(...changes).pipe(map(() => this._data.value));
    }
    disconnect() {
        // do nothing for now
    }
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCustomGraphNodeDirective {
}
NzCustomGraphNodeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nzGraphNode]',
                exportAs: 'nzGraphNode'
            },] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzGraphDefsComponent {
    constructor() { }
}
NzGraphDefsComponent.decorators = [
    { type: Component, args: [{
                selector: 'svg:defs[nz-graph-defs]',
                template: `
    <svg:marker
      class="nz-graph-edge-marker"
      id="edge-end-arrow"
      viewBox="1 0 20 20"
      refX="9"
      refY="3.5"
      markerWidth="10"
      markerHeight="10"
      orient="auto"
    >
      <svg:polygon points="0 0, 10 3.5, 0 7"></svg:polygon>
    </svg:marker>
  `
            },] }
];
NzGraphDefsComponent.ctorParameters = () => [];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzGraphEdgeDirective {
    constructor(elementRef, ngZone) {
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        this.line = line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(curveBasis);
        this.el = this.elementRef.nativeElement;
    }
    get id() {
        var _a;
        return ((_a = this.edge) === null || _a === void 0 ? void 0 : _a.id) || `${this.edge.v}--${this.edge.w}`;
    }
    ngOnInit() {
        this.setElementData();
    }
    setLine() {
        const adjoiningPath = this.getAdjoiningEdgeElement();
        if (adjoiningPath) {
            const adjoiningPoint = adjoiningPath
                .getPointAtLength(this.edge.inbound ? adjoiningPath.getTotalLength() : 0)
                .matrixTransform(adjoiningPath.getCTM())
                .matrixTransform(this.el.getCTM().inverse());
            const points = [...this.edge.points];
            const index = this.edge.inbound ? 0 : points.length - 1;
            points[index].x = adjoiningPoint.x;
            points[index].y = adjoiningPoint.y;
            this.setPath(this.line(points));
        }
        else {
            this.setPath(this.line(this.edge.points));
        }
    }
    setPath(d) {
        this.el.setAttribute('d', d);
    }
    setElementData() {
        this.el.setAttribute('data-edge', `${this.edge.v}--${this.edge.w}`);
        this.el.setAttribute('data-v', `${this.edge.v}`);
        this.el.setAttribute('data-w', `${this.edge.w}`);
    }
    getAdjoiningEdgeElement() {
        const adjoiningEdge = this.edge.adjoiningEdge;
        if (adjoiningEdge) {
            return document.querySelector(`path[data-edge="${adjoiningEdge.v}--${adjoiningEdge.w}"]`);
        }
        else {
            return null;
        }
    }
    ngOnChanges(_changes) {
        this.ngZone.onStable.pipe(take(1)).subscribe(() => {
            this.setLine();
        });
    }
}
NzGraphEdgeDirective.decorators = [
    { type: Directive, args: [{
                selector: 'svg:path[nz-graph-edge]',
                host: {
                    '[class.nz-graph-edge-line]': 'true',
                    '[id]': 'id'
                }
            },] }
];
NzGraphEdgeDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
NzGraphEdgeDirective.propDecorators = {
    edge: [{ type: Input }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const FRAC_VIEWPOINT_AREA = 0.8;
class Minimap {
    constructor(svg, zoomG, mainZoom, minimap, maxWandH, labelPadding) {
        this.svg = svg;
        this.labelPadding = labelPadding;
        this.zoomG = zoomG;
        this.mainZoom = mainZoom;
        this.maxWandH = maxWandH;
        const minimapElement = select(minimap);
        const minimapSvgElement = minimapElement.select('svg');
        const viewpointElement = minimapSvgElement.select('rect');
        this.canvas = minimapElement.select('canvas.viewport').node();
        this.canvasRect = this.canvas.getBoundingClientRect();
        const handleEvent = (event) => {
            const minimapOffset = this.minimapOffset();
            const width = Number(viewpointElement.attr('width'));
            const height = Number(viewpointElement.attr('height'));
            const clickCoords = pointer(event, minimapSvgElement.node());
            this.viewpointCoord.x = clickCoords[0] - width / 2 - minimapOffset.x;
            this.viewpointCoord.y = clickCoords[1] - height / 2 - minimapOffset.y;
            this.updateViewpoint();
        };
        this.viewpointCoord = { x: 0, y: 0 };
        const dragEvent = drag().subject(Object).on('drag', handleEvent);
        viewpointElement.datum(this.viewpointCoord).call(dragEvent);
        // Make the minimap clickable.
        minimapSvgElement.on('click', event => {
            if (event.defaultPrevented) {
                // This click was part of a drag event, so suppress it.
                return;
            }
            handleEvent(event);
        });
        this.viewpoint = viewpointElement.node();
        this.minimapSvg = minimapSvgElement.node();
        this.minimap = minimap;
        this.canvasBuffer = minimapElement.select('canvas.buffer').node();
        this.update();
    }
    minimapOffset() {
        return {
            x: (this.canvasRect.width - this.minimapSize.width) / 2,
            y: (this.canvasRect.height - this.minimapSize.height) / 2
        };
    }
    updateViewpoint() {
        // Update the coordinates of the viewpoint rectangle.
        select(this.viewpoint).attr('x', this.viewpointCoord.x).attr('y', this.viewpointCoord.y);
        // Update the translation vector of the main svg to reflect the
        // new viewpoint.
        const mainX = (-this.viewpointCoord.x * this.scaleMain) / this.scaleMinimap;
        const mainY = (-this.viewpointCoord.y * this.scaleMain) / this.scaleMinimap;
        select(this.svg).call(this.mainZoom.transform, zoomIdentity.translate(mainX, mainY).scale(this.scaleMain));
    }
    update() {
        let sceneSize = null;
        try {
            // Get the size of the entire scene.
            sceneSize = this.zoomG.getBBox();
            if (sceneSize.width === 0) {
                // There is no scene anymore. We have been detached from the dom.
                return;
            }
        }
        catch (e) {
            // Firefox produced NS_ERROR_FAILURE if we have been
            // detached from the dom.
            return;
        }
        const svgSelection = select(this.svg);
        // Read all the style rules in the document and embed them into the svg.
        // The svg needs to be self contained, i.e. all the style rules need to be
        // embedded so the canvas output matches the origin.
        let stylesText = '';
        for (const k of new Array(document.styleSheets.length).keys()) {
            try {
                const cssRules = document.styleSheets[k].cssRules || document.styleSheets[k].rules;
                if (cssRules == null) {
                    continue;
                }
                for (const i of new Array(cssRules.length).keys()) {
                    // Remove tf-* selectors from the styles.
                    stylesText += cssRules[i].cssText.replace(/ ?tf-[\w-]+ ?/g, '') + '\n';
                }
            }
            catch (e) {
                if (e.name !== 'SecurityError') {
                    throw e;
                }
            }
        }
        // Temporarily add the css rules to the main svg.
        const svgStyle = svgSelection.append('style');
        svgStyle.text(stylesText);
        // Temporarily remove the zoom/pan transform from the main svg since we
        // want the minimap to show a zoomed-out and centered view.
        const zoomGSelection = select(this.zoomG);
        const zoomTransform = zoomGSelection.attr('transform');
        zoomGSelection.attr('transform', null);
        // Since we add padding, account for that here.
        sceneSize.height += this.labelPadding * 2;
        sceneSize.width += this.labelPadding * 2;
        // Temporarily assign an explicit width/height to the main svg, since
        // it doesn't have one (uses flex-box), but we need it for the canvas
        // to work.
        svgSelection.attr('width', sceneSize.width).attr('height', sceneSize.height);
        // Since the content inside the svg changed (e.g. a node was expanded),
        // the aspect ratio have also changed. Thus, we need to update the scale
        // factor of the minimap. The scale factor is determined such that both
        // the width and height of the minimap are <= maximum specified w/h.
        this.scaleMinimap = this.maxWandH / Math.max(sceneSize.width, sceneSize.height);
        this.minimapSize = {
            width: sceneSize.width * this.scaleMinimap,
            height: sceneSize.height * this.scaleMinimap
        };
        const minimapOffset = this.minimapOffset();
        // Update the size of the minimap's svg, the buffer canvas and the
        // viewpoint rect.
        select(this.minimapSvg).attr(this.minimapSize);
        select(this.canvasBuffer).attr(this.minimapSize);
        if (this.translate != null && this.zoom != null) {
            // Update the viewpoint rectangle shape since the aspect ratio of the
            // map has changed.
            requestAnimationFrame(() => this.zoom());
        }
        // Serialize the main svg to a string which will be used as the rendering
        // content for the canvas.
        const svgXml = new XMLSerializer().serializeToString(this.svg);
        // Now that the svg is serialized for rendering, remove the temporarily
        // assigned styles, explicit width and height and bring back the pan/zoom
        // transform.
        svgStyle.remove();
        svgSelection.attr('width', '100%').attr('height', '100%');
        zoomGSelection.attr('transform', zoomTransform);
        const image = new Image();
        image.onload = () => {
            // Draw the svg content onto the buffer canvas.
            const context = this.canvasBuffer.getContext('2d');
            context.clearRect(0, 0, this.canvasBuffer.width, this.canvasBuffer.height);
            context.drawImage(image, minimapOffset.x, minimapOffset.y, this.minimapSize.width, this.minimapSize.height);
            requestAnimationFrame(() => {
                // Hide the old canvas and show the new buffer canvas.
                select(this.canvasBuffer).style('display', 'block');
                select(this.canvas).style('display', 'none');
                // Swap the two canvases.
                [this.canvas, this.canvasBuffer] = [this.canvasBuffer, this.canvas];
            });
        };
        image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgXml);
    }
    /**
     * Handles changes in zooming/panning. Should be called from the main svg
     * to notify that a zoom/pan was performed and this minimap will update it's
     * viewpoint rectangle.
     * @param transform
     */
    zoom(transform) {
        if (this.scaleMinimap == null) {
            // Scene is not ready yet.
            return;
        }
        // Update the new translate and scale params, only if specified.
        if (transform) {
            this.translate = [transform.x, transform.y];
            this.scaleMain = transform.k;
        }
        // Update the location of the viewpoint rectangle.
        const svgRect = this.svg.getBoundingClientRect();
        const minimapOffset = this.minimapOffset();
        const viewpointSelection = select(this.viewpoint);
        this.viewpointCoord.x = (-this.translate[0] * this.scaleMinimap) / this.scaleMain;
        this.viewpointCoord.y = (-this.translate[1] * this.scaleMinimap) / this.scaleMain;
        const viewpointWidth = (svgRect.width * this.scaleMinimap) / this.scaleMain;
        const viewpointHeight = (svgRect.height * this.scaleMinimap) / this.scaleMain;
        viewpointSelection
            .attr('x', this.viewpointCoord.x + minimapOffset.x)
            .attr('y', this.viewpointCoord.y + minimapOffset.y)
            .attr('width', viewpointWidth)
            .attr('height', viewpointHeight);
        // Show/hide the minimap depending on the viewpoint area as fraction of the
        // whole minimap.
        const mapWidth = this.minimapSize.width;
        const mapHeight = this.minimapSize.height;
        const x = this.viewpointCoord.x;
        const y = this.viewpointCoord.y;
        const w = Math.min(Math.max(0, x + viewpointWidth), mapWidth) - Math.min(Math.max(0, x), mapWidth);
        const h = Math.min(Math.max(0, y + viewpointHeight), mapHeight) - Math.min(Math.max(0, y), mapHeight);
        const fracIntersect = (w * h) / (mapWidth * mapHeight);
        if (fracIntersect < FRAC_VIEWPOINT_AREA) {
            this.minimap.classList.remove('hidden');
        }
        else {
            this.minimap.classList.add('hidden');
        }
    }
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzGraphMinimapComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() { }
    init(svgEle, zoomEle, zoomBehavior) {
        this.minimap = new Minimap(svgEle, zoomEle, zoomBehavior, this.elementRef.nativeElement, NZ_GRAPH_LAYOUT_SETTING.minimap.size, NZ_GRAPH_LAYOUT_SETTING.subscene.meta.labelHeight);
    }
    zoom(transform) {
        if (this.minimap) {
            this.minimap.zoom(transform);
        }
    }
    update() {
        if (this.minimap) {
            this.minimap.update();
        }
    }
}
NzGraphMinimapComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-graph-minimap',
                template: `
    <svg>
      <defs>
        <filter id="minimapDropShadow" x="-20%" y="-20%" width="150%" height="150%">
          <feOffset result="offOut" in="SourceGraphic" dx="1" dy="1"></feOffset>
          <feColorMatrix
            result="matrixOut"
            in="offOut"
            type="matrix"
            values="0.1 0 0 0 0 0 0.1 0 0 0 0 0 0.1 0 0 0 0 0 0.5 0"
          ></feColorMatrix>
          <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2"></feGaussianBlur>
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>
        </filter>
      </defs>
      <rect></rect>
    </svg>
    <canvas class="viewport"></canvas>
    <!-- Additional canvas to use as buffer to avoid flickering between updates -->
    <canvas class="buffer"></canvas>
  `,
                host: {
                    '[class.nz-graph-minimap]': 'true'
                }
            },] }
];
NzGraphMinimapComponent.ctorParameters = () => [
    { type: ElementRef }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzGraphNodeDirective {
    constructor(el, builder, renderer2) {
        this.el = el;
        this.builder = builder;
        this.renderer2 = renderer2;
        this.nodeClick = new EventEmitter();
        this.animationInfo = null;
        this.animationPlayer = null;
    }
    onTriggerClick(event) {
        event.preventDefault();
        this.nodeClick.emit(this.node);
    }
    makeAnimation(isFirstChange = false) {
        if (this.animationPlayer) {
            this.animationPlayer.destroy();
        }
        let animationFactory;
        const cur = this.getAnimationInfo();
        const pre = Object.assign({}, this.animationInfo);
        if (isFirstChange) {
            animationFactory = this.builder.build([
                style({ transform: `translate(${cur.x}px, ${cur.y}px)` }),
                query('.nz-graph-node-rect', [
                    style({
                        width: `${cur.width}px`,
                        height: `${cur.height}px`
                    })
                ])
            ]);
        }
        else {
            animationFactory = this.builder.build([
                style({ transform: `translate(${pre.x}px, ${pre.y}px)` }),
                query('.nz-graph-node-rect', [
                    style({
                        width: `${pre.width}px`,
                        height: `${pre.height}px`
                    })
                ]),
                group([
                    query('.nz-graph-node-rect', [
                        animate('200ms ease-out', style({
                            width: `${cur.width}px`,
                            height: `${cur.height}px`
                        }))
                    ]),
                    animate('200ms ease-out', style({ transform: `translate(${cur.x}px, ${cur.y}px)` }))
                ])
            ]);
        }
        const done$ = new Subject();
        this.animationInfo = cur;
        this.animationPlayer = animationFactory.create(this.el.nativeElement);
        this.animationPlayer.play();
        this.animationPlayer.onDone(() => {
            // Need this for canvas for now.
            this.renderer2.setAttribute(this.el.nativeElement, 'transform', `translate(${cur.x}, ${cur.y})`);
            done$.next();
            done$.complete();
        });
        return done$.asObservable();
    }
    getAnimationInfo() {
        const { x, y } = this.nodeTransform();
        return {
            width: this.node.width,
            height: this.node.height,
            x,
            y
        };
    }
    nodeTransform() {
        const x = this.computeCXPositionOfNodeShape() - this.node.width / 2;
        const y = this.node.y - this.node.height / 2;
        return { x, y };
    }
    computeCXPositionOfNodeShape() {
        if (this.node.expanded) {
            return this.node.x;
        }
        return this.node.x - this.node.width / 2 + this.node.coreBox.width / 2;
    }
    ngAfterViewInit() {
        this.makeAnimation(true);
    }
}
NzGraphNodeDirective.decorators = [
    { type: Directive, args: [{
                selector: 'svg:g[nz-graph-node]',
                host: {
                    '[id]': 'node.id || node.name',
                    '[class.nz-graph-node-expanded]': 'node.expanded',
                    '[class.nz-graph-group-node]': 'node.type===0',
                    '[class.nz-graph-base-node]': 'node.type===1',
                    '(click)': 'onTriggerClick($event)'
                }
            },] }
];
NzGraphNodeDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: AnimationBuilder },
    { type: Renderer2 }
];
NzGraphNodeDirective.propDecorators = {
    node: [{ type: Input }],
    nodeClick: [{ type: Output }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzGraphSvgContainerComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this.maxZoomLevel = 10;
        this.minZoomLevel = 0.1;
        this.zoom = 1;
        this.zoomEvent = new EventEmitter();
        this.transformEvent = new EventEmitter();
        this.transform = { x: 0, y: 0, k: 1 };
        this.transformStyle = '';
    }
    ngOnInit() {
        this.bind();
    }
    ngOnDestroy() {
        this.unbind();
    }
    bind() {
        this.svgSelect = select(this.containerElement.nativeElement);
        this.zoomController = zoom()
            .scaleExtent([this.minZoomLevel, this.maxZoomLevel])
            .on('zoom', ({ transform }) => {
            const { x, y, k } = transform;
            this.zoom = k;
            this.zoomEvent.emit(k);
            this.transform = transform;
            this.transformEvent.emit(transform);
            this.transformStyle = `translate(${x} ,${y})scale(${k})`;
            this.cdr.detectChanges();
        });
        this.svgSelect.call(this.zoomController, zoomIdentity.translate(0, 0).scale(this.zoom));
    }
    unbind() {
        var _a;
        (_a = this.svgSelect) === null || _a === void 0 ? void 0 : _a.interrupt().selectAll('*').interrupt();
        if (this.zoomController) {
            this.zoomController.on('end', null).on('zoom', null);
            this.transformEvent.complete();
        }
    }
    /**
     * Zoom to fit
     */
    fit(duration = 500, scale = 0.9) {
        const svgRect = this.containerElement.nativeElement.getBoundingClientRect();
        let sceneSize = null;
        try {
            sceneSize = this.zoomElement.nativeElement.getBBox();
            if (sceneSize.width === 0) {
                // There is no scene anymore. We have been detached from the dom.
                return;
            }
        }
        catch (e) {
            // Firefox produced NS_ERROR_FAILURE if we have been
            // detached from the dom.
            return;
        }
        const fitScale = Math.min(svgRect.width / sceneSize.width, svgRect.height / sceneSize.height, 2) * scale;
        const dx = (svgRect.width - sceneSize.width * fitScale) / 2;
        const dy = (svgRect.height - sceneSize.height * fitScale) / 2;
        const params = NZ_GRAPH_LAYOUT_SETTING.graph;
        const transform = zoomIdentity.translate(dx + params.padding.paddingLeft, dy + params.padding.paddingTop).scale(fitScale);
        this.svgSelect
            .transition()
            .duration(duration)
            .call(this.zoomController.transform, transform)
            .on('end.fitted', () => {
            // Remove the listener for the zoomend event,
            // so we don't get called at the end of regular zoom events,
            // just those that fit the graph to screen.
            this.zoomController.on('end.fitted', null);
        });
    }
    // Move node to center
    setNodeToCenter(node) {
        // Make sure this node is under SVG container
        if (!node || !this.containerElement.nativeElement.contains(node)) {
            return;
        }
        const svgRect = this.containerElement.nativeElement.getBoundingClientRect();
        const position = this.getRelativePositionInfo(node);
        const svgTransform = zoomTransform(this.containerElement.nativeElement);
        const centerX = (position.topLeft.x + position.bottomRight.x) / 2;
        const centerY = (position.topLeft.y + position.bottomRight.y) / 2;
        const dx = svgRect.left + svgRect.width / 2 - centerX;
        const dy = svgRect.top + svgRect.height / 2 - centerY;
        select(this.containerElement.nativeElement)
            .transition()
            .duration(250)
            .call(this.zoomController.translateBy, dx / svgTransform.k, dy / svgTransform.k);
    }
    getRelativePositionInfo(node) {
        const nodeBox = node.getBBox();
        const nodeCtm = node.getScreenCTM();
        let pointTL = this.containerElement.nativeElement.createSVGPoint();
        let pointBR = this.containerElement.nativeElement.createSVGPoint();
        pointTL.x = nodeBox.x;
        pointTL.y = nodeBox.y;
        pointBR.x = nodeBox.x + nodeBox.width;
        pointBR.y = nodeBox.y + nodeBox.height;
        pointTL = pointTL.matrixTransform(nodeCtm);
        pointBR = pointBR.matrixTransform(nodeCtm);
        return {
            topLeft: pointTL,
            bottomRight: pointBR
        };
    }
}
NzGraphSvgContainerComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-graph-svg-container',
                exportAs: 'nzGraphSvgContainer',
                template: `
    <svg #container width="100%" height="100%">
      <rect width="100%" height="100%" fill="transparent" class="nz-graph-background"></rect>
      <g #zoom [attr.transform]="transformStyle" class="nz-graph-zoom">
        <ng-content></ng-content>
      </g>
    </svg>
  `,
                host: {
                    '[class.nz-graph-svg-container]': 'true'
                }
            },] }
];
NzGraphSvgContainerComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
NzGraphSvgContainerComponent.propDecorators = {
    containerElement: [{ type: ViewChild, args: ['container', { static: true },] }],
    zoomElement: [{ type: ViewChild, args: ['zoom', { static: true },] }],
    maxZoomLevel: [{ type: Input }],
    minZoomLevel: [{ type: Input }],
    zoom: [{ type: Input }],
    zoomEvent: [{ type: Output }],
    transformEvent: [{ type: Output }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function flattenNodes(renderInfo) {
    const nodes = [];
    let edges = [];
    const dig = (node) => {
        nodes.push(node);
        if (node.type === 0) {
            edges = edges.concat(node.edges);
            node.nodes.forEach(n => dig(n));
        }
    };
    dig(renderInfo);
    return [...nodes];
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/** Checks whether an object is a data source. */
function isDataSource(value) {
    // Check if the value is a DataSource by observing if it has a connect function. Cannot
    // be checked as an `instanceof DataSource` since people could create their own sources
    // that match the interface, but don't extend DataSource.
    return value && typeof value.connect === 'function';
}
class NzGraphComponent {
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

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const COMPONENTS = [
    NzGraphComponent,
    NzGraphSvgContainerComponent,
    NzGraphEdgeDirective,
    NzGraphNodeDirective,
    NzGraphMinimapComponent,
    NzGraphDefsComponent,
    NzCustomGraphNodeDirective
];
class NzGraphModule {
}
NzGraphModule.decorators = [
    { type: NgModule, args: [{
                declarations: [...COMPONENTS],
                imports: [CommonModule, NzIconModule, NzSpinModule],
                exports: [...COMPONENTS]
            },] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NZ_GRAPH_LAYOUT_SETTING, NzCustomGraphNodeDirective, NzGraphComponent, NzGraphData, NzGraphEdgeDirective, NzGraphModule, NzGraphNodeDirective, NzGraphSvgContainerComponent, isDataSource, nzTypeDefinition, NzGraphMinimapComponent as ɵa, NzGraphDefsComponent as ɵb };
//# sourceMappingURL=ng-zorro-antd-graph.js.map
