(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/collections'), require('rxjs'), require('rxjs/operators'), require('@angular/common'), require('@angular/core'), require('ng-zorro-antd/icon'), require('ng-zorro-antd/spin'), require('d3-shape'), require('d3-drag'), require('d3-selection'), require('d3-zoom'), require('@angular/animations'), require('@nx-component/hierarchy-graph'), require('ng-zorro-antd/core/util')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/graph', ['exports', '@angular/cdk/collections', 'rxjs', 'rxjs/operators', '@angular/common', '@angular/core', 'ng-zorro-antd/icon', 'ng-zorro-antd/spin', 'd3-shape', 'd3-drag', 'd3-selection', 'd3-zoom', '@angular/animations', '@nx-component/hierarchy-graph', 'ng-zorro-antd/core/util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].graph = {}), global.ng.cdk.collections, global.rxjs, global.rxjs.operators, global.ng.common, global.ng.core, global['ng-zorro-antd'].icon, global['ng-zorro-antd'].spin, global.d3Shape, global.d3Drag, global.d3Selection, global.d3Zoom, global.ng.animations, global.hierarchyGraph, global['ng-zorro-antd'].core.util));
}(this, (function (exports, collections, rxjs, operators, common, core, icon, spin, d3Shape, d3Drag, d3Selection, d3Zoom, animations, hierarchyGraph, util) { 'use strict';

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    function nzTypeDefinition() {
        return function (item) { return item; };
    }
    var NZ_GRAPH_LAYOUT_SETTING = {
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

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var NzGraphData = /** @class */ (function () {
        function NzGraphData(source) {
            var _a;
            this._data = new rxjs.BehaviorSubject({});
            /** A selection model with multi-selection to track expansion status. */
            this.expansionModel = new collections.SelectionModel(true);
            if (source) {
                (_a = this.expansionModel) === null || _a === void 0 ? void 0 : _a.clear();
                this.dataSource = source;
                this._data.next(source);
            }
        }
        /** Toggles one single data node's expanded/collapsed state. */
        NzGraphData.prototype.toggle = function (nodeName) {
            this.expansionModel.toggle(nodeName);
        };
        /** Expands one single data node. */
        NzGraphData.prototype.expand = function (nodeName) {
            this.expansionModel.select(nodeName);
        };
        /** Collapses one single data node. */
        NzGraphData.prototype.collapse = function (nodeName) {
            this.expansionModel.deselect(nodeName);
        };
        /** Whether a given data node is expanded or not. Returns true if the data node is expanded. */
        NzGraphData.prototype.isExpanded = function (nodeName) {
            return this.expansionModel.isSelected(nodeName);
        };
        /** Collapse all dataNodes in the tree. */
        NzGraphData.prototype.collapseAll = function () {
            this.expansionModel.clear();
        };
        NzGraphData.prototype.expandAll = function () {
            var _b;
            (_b = this.expansionModel).select.apply(_b, __spread(Object.keys(this._data.value.compound || {})));
        };
        NzGraphData.prototype.setData = function (data) {
            var _a;
            (_a = this.expansionModel) === null || _a === void 0 ? void 0 : _a.clear();
            this.dataSource = data;
            this._data.next(data);
        };
        NzGraphData.prototype.connect = function () {
            var _this = this;
            var changes = [this._data, this.expansionModel.changed];
            return rxjs.merge.apply(void 0, __spread(changes)).pipe(operators.map(function () { return _this._data.value; }));
        };
        NzGraphData.prototype.disconnect = function () {
            // do nothing for now
        };
        return NzGraphData;
    }());

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NzCustomGraphNodeDirective = /** @class */ (function () {
        function NzCustomGraphNodeDirective() {
        }
        return NzCustomGraphNodeDirective;
    }());
    NzCustomGraphNodeDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[nzGraphNode]',
                    exportAs: 'nzGraphNode'
                },] }
    ];

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NzGraphDefsComponent = /** @class */ (function () {
        function NzGraphDefsComponent() {
        }
        return NzGraphDefsComponent;
    }());
    NzGraphDefsComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'svg:defs[nz-graph-defs]',
                    template: "\n    <svg:marker\n      class=\"nz-graph-edge-marker\"\n      id=\"edge-end-arrow\"\n      viewBox=\"1 0 20 20\"\n      refX=\"9\"\n      refY=\"3.5\"\n      markerWidth=\"10\"\n      markerHeight=\"10\"\n      orient=\"auto\"\n    >\n      <svg:polygon points=\"0 0, 10 3.5, 0 7\"></svg:polygon>\n    </svg:marker>\n  "
                },] }
    ];
    NzGraphDefsComponent.ctorParameters = function () { return []; };

    var NzGraphEdgeDirective = /** @class */ (function () {
        function NzGraphEdgeDirective(elementRef, ngZone) {
            this.elementRef = elementRef;
            this.ngZone = ngZone;
            this.line = d3Shape.line()
                .x(function (d) { return d.x; })
                .y(function (d) { return d.y; })
                .curve(d3Shape.curveBasis);
            this.el = this.elementRef.nativeElement;
        }
        Object.defineProperty(NzGraphEdgeDirective.prototype, "id", {
            get: function () {
                var _a;
                return ((_a = this.edge) === null || _a === void 0 ? void 0 : _a.id) || this.edge.v + "--" + this.edge.w;
            },
            enumerable: false,
            configurable: true
        });
        NzGraphEdgeDirective.prototype.ngOnInit = function () {
            this.setElementData();
        };
        NzGraphEdgeDirective.prototype.setLine = function () {
            var adjoiningPath = this.getAdjoiningEdgeElement();
            if (adjoiningPath) {
                var adjoiningPoint = adjoiningPath
                    .getPointAtLength(this.edge.inbound ? adjoiningPath.getTotalLength() : 0)
                    .matrixTransform(adjoiningPath.getCTM())
                    .matrixTransform(this.el.getCTM().inverse());
                var points = __spread(this.edge.points);
                var index = this.edge.inbound ? 0 : points.length - 1;
                points[index].x = adjoiningPoint.x;
                points[index].y = adjoiningPoint.y;
                this.setPath(this.line(points));
            }
            else {
                this.setPath(this.line(this.edge.points));
            }
        };
        NzGraphEdgeDirective.prototype.setPath = function (d) {
            this.el.setAttribute('d', d);
        };
        NzGraphEdgeDirective.prototype.setElementData = function () {
            this.el.setAttribute('data-edge', this.edge.v + "--" + this.edge.w);
            this.el.setAttribute('data-v', "" + this.edge.v);
            this.el.setAttribute('data-w', "" + this.edge.w);
        };
        NzGraphEdgeDirective.prototype.getAdjoiningEdgeElement = function () {
            var adjoiningEdge = this.edge.adjoiningEdge;
            if (adjoiningEdge) {
                return document.querySelector("path[data-edge=\"" + adjoiningEdge.v + "--" + adjoiningEdge.w + "\"]");
            }
            else {
                return null;
            }
        };
        NzGraphEdgeDirective.prototype.ngOnChanges = function (_changes) {
            var _this = this;
            this.ngZone.onStable.pipe(operators.take(1)).subscribe(function () {
                _this.setLine();
            });
        };
        return NzGraphEdgeDirective;
    }());
    NzGraphEdgeDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'svg:path[nz-graph-edge]',
                    host: {
                        '[class.nz-graph-edge-line]': 'true',
                        '[id]': 'id'
                    }
                },] }
    ];
    NzGraphEdgeDirective.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.NgZone }
    ]; };
    NzGraphEdgeDirective.propDecorators = {
        edge: [{ type: core.Input }]
    };

    var FRAC_VIEWPOINT_AREA = 0.8;
    var Minimap = /** @class */ (function () {
        function Minimap(svg, zoomG, mainZoom, minimap, maxWandH, labelPadding) {
            var _this = this;
            this.svg = svg;
            this.labelPadding = labelPadding;
            this.zoomG = zoomG;
            this.mainZoom = mainZoom;
            this.maxWandH = maxWandH;
            var minimapElement = d3Selection.select(minimap);
            var minimapSvgElement = minimapElement.select('svg');
            var viewpointElement = minimapSvgElement.select('rect');
            this.canvas = minimapElement.select('canvas.viewport').node();
            this.canvasRect = this.canvas.getBoundingClientRect();
            var handleEvent = function (event) {
                var minimapOffset = _this.minimapOffset();
                var width = Number(viewpointElement.attr('width'));
                var height = Number(viewpointElement.attr('height'));
                var clickCoords = d3Selection.pointer(event, minimapSvgElement.node());
                _this.viewpointCoord.x = clickCoords[0] - width / 2 - minimapOffset.x;
                _this.viewpointCoord.y = clickCoords[1] - height / 2 - minimapOffset.y;
                _this.updateViewpoint();
            };
            this.viewpointCoord = { x: 0, y: 0 };
            var dragEvent = d3Drag.drag().subject(Object).on('drag', handleEvent);
            viewpointElement.datum(this.viewpointCoord).call(dragEvent);
            // Make the minimap clickable.
            minimapSvgElement.on('click', function (event) {
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
        Minimap.prototype.minimapOffset = function () {
            return {
                x: (this.canvasRect.width - this.minimapSize.width) / 2,
                y: (this.canvasRect.height - this.minimapSize.height) / 2
            };
        };
        Minimap.prototype.updateViewpoint = function () {
            // Update the coordinates of the viewpoint rectangle.
            d3Selection.select(this.viewpoint).attr('x', this.viewpointCoord.x).attr('y', this.viewpointCoord.y);
            // Update the translation vector of the main svg to reflect the
            // new viewpoint.
            var mainX = (-this.viewpointCoord.x * this.scaleMain) / this.scaleMinimap;
            var mainY = (-this.viewpointCoord.y * this.scaleMain) / this.scaleMinimap;
            d3Selection.select(this.svg).call(this.mainZoom.transform, d3Zoom.zoomIdentity.translate(mainX, mainY).scale(this.scaleMain));
        };
        Minimap.prototype.update = function () {
            var e_1, _a, e_2, _b;
            var _this = this;
            var sceneSize = null;
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
            var svgSelection = d3Selection.select(this.svg);
            // Read all the style rules in the document and embed them into the svg.
            // The svg needs to be self contained, i.e. all the style rules need to be
            // embedded so the canvas output matches the origin.
            var stylesText = '';
            try {
                for (var _c = __values(new Array(document.styleSheets.length).keys()), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var k = _d.value;
                    try {
                        var cssRules = document.styleSheets[k].cssRules || document.styleSheets[k].rules;
                        if (cssRules == null) {
                            continue;
                        }
                        try {
                            for (var _e = (e_2 = void 0, __values(new Array(cssRules.length).keys())), _f = _e.next(); !_f.done; _f = _e.next()) {
                                var i = _f.value;
                                // Remove tf-* selectors from the styles.
                                stylesText += cssRules[i].cssText.replace(/ ?tf-[\w-]+ ?/g, '') + '\n';
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                    catch (e) {
                        if (e.name !== 'SecurityError') {
                            throw e;
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // Temporarily add the css rules to the main svg.
            var svgStyle = svgSelection.append('style');
            svgStyle.text(stylesText);
            // Temporarily remove the zoom/pan transform from the main svg since we
            // want the minimap to show a zoomed-out and centered view.
            var zoomGSelection = d3Selection.select(this.zoomG);
            var zoomTransform = zoomGSelection.attr('transform');
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
            var minimapOffset = this.minimapOffset();
            // Update the size of the minimap's svg, the buffer canvas and the
            // viewpoint rect.
            d3Selection.select(this.minimapSvg).attr(this.minimapSize);
            d3Selection.select(this.canvasBuffer).attr(this.minimapSize);
            if (this.translate != null && this.zoom != null) {
                // Update the viewpoint rectangle shape since the aspect ratio of the
                // map has changed.
                requestAnimationFrame(function () { return _this.zoom(); });
            }
            // Serialize the main svg to a string which will be used as the rendering
            // content for the canvas.
            var svgXml = new XMLSerializer().serializeToString(this.svg);
            // Now that the svg is serialized for rendering, remove the temporarily
            // assigned styles, explicit width and height and bring back the pan/zoom
            // transform.
            svgStyle.remove();
            svgSelection.attr('width', '100%').attr('height', '100%');
            zoomGSelection.attr('transform', zoomTransform);
            var image = new Image();
            image.onload = function () {
                // Draw the svg content onto the buffer canvas.
                var context = _this.canvasBuffer.getContext('2d');
                context.clearRect(0, 0, _this.canvasBuffer.width, _this.canvasBuffer.height);
                context.drawImage(image, minimapOffset.x, minimapOffset.y, _this.minimapSize.width, _this.minimapSize.height);
                requestAnimationFrame(function () {
                    var _a;
                    // Hide the old canvas and show the new buffer canvas.
                    d3Selection.select(_this.canvasBuffer).style('display', 'block');
                    d3Selection.select(_this.canvas).style('display', 'none');
                    // Swap the two canvases.
                    _a = __read([_this.canvasBuffer, _this.canvas], 2), _this.canvas = _a[0], _this.canvasBuffer = _a[1];
                });
            };
            image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgXml);
        };
        /**
         * Handles changes in zooming/panning. Should be called from the main svg
         * to notify that a zoom/pan was performed and this minimap will update it's
         * viewpoint rectangle.
         * @param transform
         */
        Minimap.prototype.zoom = function (transform) {
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
            var svgRect = this.svg.getBoundingClientRect();
            var minimapOffset = this.minimapOffset();
            var viewpointSelection = d3Selection.select(this.viewpoint);
            this.viewpointCoord.x = (-this.translate[0] * this.scaleMinimap) / this.scaleMain;
            this.viewpointCoord.y = (-this.translate[1] * this.scaleMinimap) / this.scaleMain;
            var viewpointWidth = (svgRect.width * this.scaleMinimap) / this.scaleMain;
            var viewpointHeight = (svgRect.height * this.scaleMinimap) / this.scaleMain;
            viewpointSelection
                .attr('x', this.viewpointCoord.x + minimapOffset.x)
                .attr('y', this.viewpointCoord.y + minimapOffset.y)
                .attr('width', viewpointWidth)
                .attr('height', viewpointHeight);
            // Show/hide the minimap depending on the viewpoint area as fraction of the
            // whole minimap.
            var mapWidth = this.minimapSize.width;
            var mapHeight = this.minimapSize.height;
            var x = this.viewpointCoord.x;
            var y = this.viewpointCoord.y;
            var w = Math.min(Math.max(0, x + viewpointWidth), mapWidth) - Math.min(Math.max(0, x), mapWidth);
            var h = Math.min(Math.max(0, y + viewpointHeight), mapHeight) - Math.min(Math.max(0, y), mapHeight);
            var fracIntersect = (w * h) / (mapWidth * mapHeight);
            if (fracIntersect < FRAC_VIEWPOINT_AREA) {
                this.minimap.classList.remove('hidden');
            }
            else {
                this.minimap.classList.add('hidden');
            }
        };
        return Minimap;
    }());

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NzGraphMinimapComponent = /** @class */ (function () {
        function NzGraphMinimapComponent(elementRef) {
            this.elementRef = elementRef;
        }
        NzGraphMinimapComponent.prototype.ngOnInit = function () { };
        NzGraphMinimapComponent.prototype.init = function (svgEle, zoomEle, zoomBehavior) {
            this.minimap = new Minimap(svgEle, zoomEle, zoomBehavior, this.elementRef.nativeElement, NZ_GRAPH_LAYOUT_SETTING.minimap.size, NZ_GRAPH_LAYOUT_SETTING.subscene.meta.labelHeight);
        };
        NzGraphMinimapComponent.prototype.zoom = function (transform) {
            if (this.minimap) {
                this.minimap.zoom(transform);
            }
        };
        NzGraphMinimapComponent.prototype.update = function () {
            if (this.minimap) {
                this.minimap.update();
            }
        };
        return NzGraphMinimapComponent;
    }());
    NzGraphMinimapComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'nz-graph-minimap',
                    template: "\n    <svg>\n      <defs>\n        <filter id=\"minimapDropShadow\" x=\"-20%\" y=\"-20%\" width=\"150%\" height=\"150%\">\n          <feOffset result=\"offOut\" in=\"SourceGraphic\" dx=\"1\" dy=\"1\"></feOffset>\n          <feColorMatrix\n            result=\"matrixOut\"\n            in=\"offOut\"\n            type=\"matrix\"\n            values=\"0.1 0 0 0 0 0 0.1 0 0 0 0 0 0.1 0 0 0 0 0 0.5 0\"\n          ></feColorMatrix>\n          <feGaussianBlur result=\"blurOut\" in=\"matrixOut\" stdDeviation=\"2\"></feGaussianBlur>\n          <feBlend in=\"SourceGraphic\" in2=\"blurOut\" mode=\"normal\"></feBlend>\n        </filter>\n      </defs>\n      <rect></rect>\n    </svg>\n    <canvas class=\"viewport\"></canvas>\n    <!-- Additional canvas to use as buffer to avoid flickering between updates -->\n    <canvas class=\"buffer\"></canvas>\n  ",
                    host: {
                        '[class.nz-graph-minimap]': 'true'
                    }
                },] }
    ];
    NzGraphMinimapComponent.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NzGraphNodeDirective = /** @class */ (function () {
        function NzGraphNodeDirective(el, builder, renderer2) {
            this.el = el;
            this.builder = builder;
            this.renderer2 = renderer2;
            this.nodeClick = new core.EventEmitter();
            this.animationInfo = null;
            this.animationPlayer = null;
        }
        NzGraphNodeDirective.prototype.onTriggerClick = function (event) {
            event.preventDefault();
            this.nodeClick.emit(this.node);
        };
        NzGraphNodeDirective.prototype.makeAnimation = function (isFirstChange) {
            var _this = this;
            if (isFirstChange === void 0) { isFirstChange = false; }
            if (this.animationPlayer) {
                this.animationPlayer.destroy();
            }
            var animationFactory;
            var cur = this.getAnimationInfo();
            var pre = Object.assign({}, this.animationInfo);
            if (isFirstChange) {
                animationFactory = this.builder.build([
                    animations.style({ transform: "translate(" + cur.x + "px, " + cur.y + "px)" }),
                    animations.query('.nz-graph-node-rect', [
                        animations.style({
                            width: cur.width + "px",
                            height: cur.height + "px"
                        })
                    ])
                ]);
            }
            else {
                animationFactory = this.builder.build([
                    animations.style({ transform: "translate(" + pre.x + "px, " + pre.y + "px)" }),
                    animations.query('.nz-graph-node-rect', [
                        animations.style({
                            width: pre.width + "px",
                            height: pre.height + "px"
                        })
                    ]),
                    animations.group([
                        animations.query('.nz-graph-node-rect', [
                            animations.animate('200ms ease-out', animations.style({
                                width: cur.width + "px",
                                height: cur.height + "px"
                            }))
                        ]),
                        animations.animate('200ms ease-out', animations.style({ transform: "translate(" + cur.x + "px, " + cur.y + "px)" }))
                    ])
                ]);
            }
            var done$ = new rxjs.Subject();
            this.animationInfo = cur;
            this.animationPlayer = animationFactory.create(this.el.nativeElement);
            this.animationPlayer.play();
            this.animationPlayer.onDone(function () {
                // Need this for canvas for now.
                _this.renderer2.setAttribute(_this.el.nativeElement, 'transform', "translate(" + cur.x + ", " + cur.y + ")");
                done$.next();
                done$.complete();
            });
            return done$.asObservable();
        };
        NzGraphNodeDirective.prototype.getAnimationInfo = function () {
            var _a = this.nodeTransform(), x = _a.x, y = _a.y;
            return {
                width: this.node.width,
                height: this.node.height,
                x: x,
                y: y
            };
        };
        NzGraphNodeDirective.prototype.nodeTransform = function () {
            var x = this.computeCXPositionOfNodeShape() - this.node.width / 2;
            var y = this.node.y - this.node.height / 2;
            return { x: x, y: y };
        };
        NzGraphNodeDirective.prototype.computeCXPositionOfNodeShape = function () {
            if (this.node.expanded) {
                return this.node.x;
            }
            return this.node.x - this.node.width / 2 + this.node.coreBox.width / 2;
        };
        NzGraphNodeDirective.prototype.ngAfterViewInit = function () {
            this.makeAnimation(true);
        };
        return NzGraphNodeDirective;
    }());
    NzGraphNodeDirective.decorators = [
        { type: core.Directive, args: [{
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
    NzGraphNodeDirective.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: animations.AnimationBuilder },
        { type: core.Renderer2 }
    ]; };
    NzGraphNodeDirective.propDecorators = {
        node: [{ type: core.Input }],
        nodeClick: [{ type: core.Output }]
    };

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NzGraphSvgContainerComponent = /** @class */ (function () {
        function NzGraphSvgContainerComponent(cdr) {
            this.cdr = cdr;
            this.maxZoomLevel = 10;
            this.minZoomLevel = 0.1;
            this.zoom = 1;
            this.zoomEvent = new core.EventEmitter();
            this.transformEvent = new core.EventEmitter();
            this.transform = { x: 0, y: 0, k: 1 };
            this.transformStyle = '';
        }
        NzGraphSvgContainerComponent.prototype.ngOnInit = function () {
            this.bind();
        };
        NzGraphSvgContainerComponent.prototype.ngOnDestroy = function () {
            this.unbind();
        };
        NzGraphSvgContainerComponent.prototype.bind = function () {
            var _this = this;
            this.svgSelect = d3Selection.select(this.containerElement.nativeElement);
            this.zoomController = d3Zoom.zoom()
                .scaleExtent([this.minZoomLevel, this.maxZoomLevel])
                .on('zoom', function (_b) {
                var transform = _b.transform;
                var x = transform.x, y = transform.y, k = transform.k;
                _this.zoom = k;
                _this.zoomEvent.emit(k);
                _this.transform = transform;
                _this.transformEvent.emit(transform);
                _this.transformStyle = "translate(" + x + " ," + y + ")scale(" + k + ")";
                _this.cdr.detectChanges();
            });
            this.svgSelect.call(this.zoomController, d3Zoom.zoomIdentity.translate(0, 0).scale(this.zoom));
        };
        NzGraphSvgContainerComponent.prototype.unbind = function () {
            var _a;
            (_a = this.svgSelect) === null || _a === void 0 ? void 0 : _a.interrupt().selectAll('*').interrupt();
            if (this.zoomController) {
                this.zoomController.on('end', null).on('zoom', null);
                this.transformEvent.complete();
            }
        };
        /**
         * Zoom to fit
         */
        NzGraphSvgContainerComponent.prototype.fit = function (duration, scale) {
            var _this = this;
            if (duration === void 0) { duration = 500; }
            if (scale === void 0) { scale = 0.9; }
            var svgRect = this.containerElement.nativeElement.getBoundingClientRect();
            var sceneSize = null;
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
            var fitScale = Math.min(svgRect.width / sceneSize.width, svgRect.height / sceneSize.height, 2) * scale;
            var dx = (svgRect.width - sceneSize.width * fitScale) / 2;
            var dy = (svgRect.height - sceneSize.height * fitScale) / 2;
            var params = NZ_GRAPH_LAYOUT_SETTING.graph;
            var transform = d3Zoom.zoomIdentity.translate(dx + params.padding.paddingLeft, dy + params.padding.paddingTop).scale(fitScale);
            this.svgSelect
                .transition()
                .duration(duration)
                .call(this.zoomController.transform, transform)
                .on('end.fitted', function () {
                // Remove the listener for the zoomend event,
                // so we don't get called at the end of regular zoom events,
                // just those that fit the graph to screen.
                _this.zoomController.on('end.fitted', null);
            });
        };
        // Move node to center
        NzGraphSvgContainerComponent.prototype.setNodeToCenter = function (node) {
            // Make sure this node is under SVG container
            if (!node || !this.containerElement.nativeElement.contains(node)) {
                return;
            }
            var svgRect = this.containerElement.nativeElement.getBoundingClientRect();
            var position = this.getRelativePositionInfo(node);
            var svgTransform = d3Zoom.zoomTransform(this.containerElement.nativeElement);
            var centerX = (position.topLeft.x + position.bottomRight.x) / 2;
            var centerY = (position.topLeft.y + position.bottomRight.y) / 2;
            var dx = svgRect.left + svgRect.width / 2 - centerX;
            var dy = svgRect.top + svgRect.height / 2 - centerY;
            d3Selection.select(this.containerElement.nativeElement)
                .transition()
                .duration(250)
                .call(this.zoomController.translateBy, dx / svgTransform.k, dy / svgTransform.k);
        };
        NzGraphSvgContainerComponent.prototype.getRelativePositionInfo = function (node) {
            var nodeBox = node.getBBox();
            var nodeCtm = node.getScreenCTM();
            var pointTL = this.containerElement.nativeElement.createSVGPoint();
            var pointBR = this.containerElement.nativeElement.createSVGPoint();
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
        };
        return NzGraphSvgContainerComponent;
    }());
    NzGraphSvgContainerComponent.decorators = [
        { type: core.Component, args: [{
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    selector: 'nz-graph-svg-container',
                    exportAs: 'nzGraphSvgContainer',
                    template: "\n    <svg #container width=\"100%\" height=\"100%\">\n      <rect width=\"100%\" height=\"100%\" fill=\"transparent\" class=\"nz-graph-background\"></rect>\n      <g #zoom [attr.transform]=\"transformStyle\" class=\"nz-graph-zoom\">\n        <ng-content></ng-content>\n      </g>\n    </svg>\n  ",
                    host: {
                        '[class.nz-graph-svg-container]': 'true'
                    }
                },] }
    ];
    NzGraphSvgContainerComponent.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef }
    ]; };
    NzGraphSvgContainerComponent.propDecorators = {
        containerElement: [{ type: core.ViewChild, args: ['container', { static: true },] }],
        zoomElement: [{ type: core.ViewChild, args: ['zoom', { static: true },] }],
        maxZoomLevel: [{ type: core.Input }],
        minZoomLevel: [{ type: core.Input }],
        zoom: [{ type: core.Input }],
        zoomEvent: [{ type: core.Output }],
        transformEvent: [{ type: core.Output }]
    };

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    function flattenNodes(renderInfo) {
        var nodes = [];
        var edges = [];
        var dig = function (node) {
            nodes.push(node);
            if (node.type === 0) {
                edges = edges.concat(node.edges);
                node.nodes.forEach(function (n) { return dig(n); });
            }
        };
        dig(renderInfo);
        return __spread(nodes);
    }

    /** Checks whether an object is a data source. */
    function isDataSource(value) {
        // Check if the value is a DataSource by observing if it has a connect function. Cannot
        // be checked as an `instanceof DataSource` since people could create their own sources
        // that match the interface, but don't extend DataSource.
        return value && typeof value.connect === 'function';
    }
    var NzGraphComponent = /** @class */ (function () {
        function NzGraphComponent(cdr, ngZone, elementRef) {
            this.cdr = cdr;
            this.ngZone = ngZone;
            this.elementRef = elementRef;
            this.nzRankDirection = 'LR';
            this.nzShowMinimap = false;
            this.nzShowArrow = false;
            this.nzZoom = 1;
            this.nzAutoSize = false;
            this.nzGraphInitialized = new core.EventEmitter();
            this.nzZoomInit = new core.EventEmitter();
            this.nzTransformEvent = new core.EventEmitter();
            this.nzNodeClick = new core.EventEmitter();
            this.renderInfo = { labelHeight: 0 };
            this.mapOfNodeAttr = {};
            this.mapOfEdgeAttr = {};
            this.customNodeTemplate = null;
            this.typedNodes = nzTypeDefinition();
            this.layoutSetting = NZ_GRAPH_LAYOUT_SETTING;
            this.destroy$ = new rxjs.Subject();
            this.nodeTrackByFun = function (_, node) { return node.name; };
            this.edgeTrackByFun = function (_, edge) { return edge.v + "-" + edge.w; };
            this.subGraphTransform = function (node) {
                var x = node.x - node.coreBox.width / 2.0;
                var y = node.y - node.height / 2.0 + node.paddingTop / 2.0;
                return "translate(" + x + ", " + y + ")";
            };
            this.coreTransform = function (node) {
                return "translate(0, " + node.labelHeight + ")";
            };
            this.cdr.detach();
        }
        Object.defineProperty(NzGraphComponent.prototype, "customNode", {
            set: function (value) {
                if (value) {
                    this.customNodeTemplate = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        NzGraphComponent.prototype.ngOnInit = function () {
            if (this.dataSource !== this.nzGraphData) {
                this._switchDataSource(this.nzGraphData);
            }
        };
        NzGraphComponent.prototype.ngOnChanges = function (changes) {
            var nzAutoFit = changes.nzAutoFit, nzRankDirection = changes.nzRankDirection, nzGraphData = changes.nzGraphData, nzGraphLayoutSettings = changes.nzGraphLayoutSettings;
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
        };
        NzGraphComponent.prototype.ngAfterViewInit = function () {
            this.autoFit();
            this.cdr.detectChanges();
            this.drawMinimap(true);
        };
        NzGraphComponent.prototype.ngAfterContentChecked = function () {
            if (this.dataSource && !this._dataSubscription) {
                this.observeRenderChanges();
            }
        };
        NzGraphComponent.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
            if (this.dataSource && typeof this.dataSource.disconnect === 'function') {
                this.dataSource.disconnect();
            }
            if (this._dataSubscription) {
                this._dataSubscription.unsubscribe();
                this._dataSubscription = null;
            }
        };
        /**
         * Transform event
         */
        NzGraphComponent.prototype.triggerTransform = function ($event) {
            this.nzZoom = $event.k;
            if (this.minimap) {
                this.minimap.zoom($event);
            }
            this.nzTransformEvent.emit($event);
            this.cdr.markForCheck();
        };
        /**
         * Emit event
         */
        NzGraphComponent.prototype.clickNode = function (node) {
            this.nzNodeClick.emit(node);
        };
        /**
         * Move graph to center
         */
        NzGraphComponent.prototype.autoFit = function () {
            var _a;
            if (this.renderInfo) {
                (_a = this.svgContainerComponent) === null || _a === void 0 ? void 0 : _a.fit(0);
            }
        };
        /**
         * Refactor
         */
        NzGraphComponent.prototype.toggleNode = function (node, expanded) {
            if (expanded) {
                // collapse it
                this.nzGraphData.collapse(node);
            }
            else {
                // expand it
                this.nzGraphData.expand(node);
            }
        };
        NzGraphComponent.prototype.renderGraph = function (data, options) {
            var renderInfo = this.buildGraphInfo(data, options);
            // TODO
            // Need better performance
            this.setRenderInfo(renderInfo, false);
            if (this.nzAutoSize) {
                this.resizeNodes(renderInfo, options);
            }
            this.cdr.detectChanges();
        };
        /**
         * Switch to the provided data source by resetting the data and unsubscribing from the current
         * render change subscription if one exists. If the data source is null, interpret this by
         * clearing the node outlet. Otherwise start listening for new data.
         */
        NzGraphComponent.prototype._switchDataSource = function (dataSource) {
            if (this.dataSource && typeof this.dataSource.disconnect === 'function') {
                this.nzGraphData.disconnect();
            }
            if (this._dataSubscription) {
                this._dataSubscription.unsubscribe();
                this._dataSubscription = null;
            }
            this.dataSource = dataSource;
            this.observeRenderChanges();
        };
        /** Set up a subscription for the data provided by the data source. */
        NzGraphComponent.prototype.observeRenderChanges = function () {
            var _this = this;
            var dataStream;
            var graphOptions = {
                rankDirection: this.nzRankDirection
            };
            if (isDataSource(this.dataSource)) {
                dataStream = this.dataSource.connect();
            }
            if (dataStream) {
                this._dataSubscription = dataStream.pipe(operators.takeUntil(this.destroy$)).subscribe(function (data) {
                    graphOptions = {
                        rankDirection: _this.nzRankDirection,
                        expanded: _this.nzGraphData.expansionModel.selected
                    };
                    _this.renderGraph(data, graphOptions);
                    _this.cdr.detectChanges();
                });
            }
            else {
                throw Error("A valid data source must be provided.");
            }
        };
        NzGraphComponent.prototype.setRenderInfo = function (renderInfo, asPatch) {
            var _this = this;
            if (asPatch === void 0) { asPatch = true; }
            if (asPatch) {
                this.assignRenderInfo(renderInfo);
            }
            else {
                this.renderInfo = renderInfo;
            }
            this.ngZone.onStable.pipe(operators.take(1)).subscribe(function () {
                _this.makeNodesAnimation().subscribe();
            });
        };
        NzGraphComponent.prototype.buildGraphInfo = function (data, options) {
            var _this = this;
            this.parseInfo(data);
            var renderInfo = hierarchyGraph.buildGraph(data, options, this.layoutSetting);
            var dig = function (nodes) {
                nodes.forEach(function (node) {
                    if (node.type === 1 && _this.mapOfNodeAttr.hasOwnProperty(node.name)) {
                        Object.assign(node, _this.mapOfNodeAttr[node.name]);
                    }
                    else if (node.type === 0) {
                        node.edges.forEach(function (edge) {
                            if (_this.mapOfEdgeAttr.hasOwnProperty(edge.v + "-" + edge.w)) {
                                Object.assign(edge, _this.mapOfEdgeAttr[edge.v + "-" + edge.w]);
                            }
                        });
                        dig(node.nodes);
                    }
                });
            };
            dig(renderInfo.nodes);
            // Assign data to edges of root graph
            renderInfo.edges.forEach(function (edge) {
                if (_this.mapOfEdgeAttr.hasOwnProperty(edge.v + "-" + edge.w)) {
                    Object.assign(edge, _this.mapOfEdgeAttr[edge.v + "-" + edge.w]);
                }
            });
            return renderInfo;
        };
        NzGraphComponent.prototype.resizeNodes = function (renderInfo, options) {
            var _this = this;
            this.ngZone.onStable
                .asObservable()
                .pipe(operators.take(1))
                .subscribe(function () {
                var dataSource = _this.dataSource.dataSource;
                _this.elementRef.nativeElement.querySelectorAll('[nz-graph-node]').forEach(function (nodeEle) {
                    var contentEle = nodeEle.querySelector('.nz-graph-node-wrapper');
                    if (contentEle) {
                        var height = contentEle.getBoundingClientRect().height;
                        var width = contentEle.getBoundingClientRect().width;
                        // Element id type is string
                        var targetNode = flattenNodes(renderInfo).find(function (n) { return "" + n.name === nodeEle.id; });
                        var nodeName_1 = targetNode && targetNode.name;
                        var node = dataSource.nodes.find(function (n) { return n.id === nodeName_1; });
                        if (node) {
                            node.height = height / _this.nzZoom;
                            node.width = width / _this.nzZoom;
                        }
                    }
                });
                var newRenderInfo = _this.buildGraphInfo(dataSource, options);
                _this.setRenderInfo(newRenderInfo, false);
            });
        };
        NzGraphComponent.prototype.assignRenderInfo = function (renderInfo) {
            this.renderInfo.edges = renderInfo.edges;
            this.renderInfo.nodes.forEach(function (node, index) {
                Object.assign(node, renderInfo.nodes[index]);
            });
        };
        NzGraphComponent.prototype.makeNodesAnimation = function () {
            var _this = this;
            return rxjs.forkJoin.apply(void 0, __spread(this.graphNodes.map(function (node) { return node.makeAnimation(); }))).pipe(operators.tap(function () {
                _this.drawMinimap();
            }), operators.finalize(function () {
                _this.cdr.detectChanges();
            }));
        };
        NzGraphComponent.prototype.parseInfo = function (data) {
            var _this = this;
            data.nodes.forEach(function (n) {
                _this.mapOfNodeAttr[n.id] = n;
            });
            data.edges.forEach(function (e) {
                _this.mapOfEdgeAttr[e.v + "-" + e.w] = e;
            });
        };
        NzGraphComponent.prototype.drawMinimap = function (forceRerender) {
            if (forceRerender === void 0) { forceRerender = false; }
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
        };
        return NzGraphComponent;
    }());
    NzGraphComponent.decorators = [
        { type: core.Component, args: [{
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    selector: 'nz-graph',
                    exportAs: 'nzGraph',
                    template: "\n    <ng-content></ng-content>\n    <nz-graph-svg-container (transformEvent)=\"triggerTransform($event)\">\n      <svg:defs nz-graph-defs></svg:defs>\n      <ng-container [ngTemplateOutlet]=\"groupTemplate\" [ngTemplateOutletContext]=\"{ renderInfo: renderInfo, type: 'root' }\"></ng-container>\n    </nz-graph-svg-container>\n\n    <nz-graph-minimap *ngIf=\"nzShowMinimap\"></nz-graph-minimap>\n\n    <ng-template #groupTemplate let-renderInfo=\"renderInfo\" let-type=\"type\">\n      <svg:g [attr.transform]=\"type === 'sub' ? subGraphTransform(renderInfo) : null\">\n        <svg:g class=\"core\" [attr.transform]=\"coreTransform(renderInfo)\">\n          <svg:g class=\"nz-graph-edges\">\n            <svg:g class=\"nz-graph-edge\" *ngFor=\"let edge of renderInfo.edges; let index = index; trackBy: edgeTrackByFun\">\n              <svg:path\n                class=\"nz-graph-edge-line\"\n                nz-graph-edge\n                [attr.marker-end]=\"nzShowArrow ? 'url(#edge-end-arrow)' : null\"\n                [edge]=\"edge\"\n              ></svg:path>\n              <svg:text class=\"nz-graph-edge-text\" text-anchor=\"middle\" dy=\"20\" *ngIf=\"edge.label\">\n                <textPath [attr.href]=\"'#' + edge.v + '--' + edge.w\" startOffset=\"50%\">{{ edge.label }}</textPath>\n              </svg:text>\n            </svg:g>\n          </svg:g>\n\n          <svg:g class=\"nz-graph-nodes\">\n            <svg:g\n              class=\"nz-graph-node\"\n              [class.nz-graph-custom-node]=\"!!customNodeTemplate\"\n              [style.display]=\"node.type === 2 ? 'none' : null\"\n              *ngFor=\"let node of typedNodes(renderInfo.nodes); trackBy: nodeTrackByFun\"\n            >\n              <svg:g nz-graph-node [node]=\"node\" (nodeClick)=\"clickNode($event)\">\n                <svg:rect class=\"nz-graph-node-rect\"></svg:rect>\n                <foreignObject x=\"0\" y=\"0\" [attr.width]=\"node.width\" [attr.height]=\"node.height\">\n                  <xhtml:div class=\"nz-graph-node-wrapper\">\n                    <ng-container\n                      *ngIf=\"customNodeTemplate\"\n                      [ngTemplateOutlet]=\"customNodeTemplate\"\n                      [ngTemplateOutletContext]=\"{ $implicit: node, group: node.type === 0 }\"\n                    ></ng-container>\n                    <div class=\"node-content\" *ngIf=\"!customNodeTemplate\">\n                      <div class=\"title\">\n                        {{ node.name }}\n                        <i\n                          class=\"action-icon\"\n                          *ngIf=\"node.type === 0\"\n                          nz-icon\n                          [nzType]=\"node.expanded ? 'minus' : 'plus'\"\n                          nzTheme=\"outline\"\n                          (click)=\"toggleNode(node.name, node.expanded)\"\n                        ></i>\n                      </div>\n                      <div class=\"label\" *ngIf=\"!node.expanded\">{{ node.label }}</div>\n                    </div>\n                  </xhtml:div>\n                </foreignObject>\n              </svg:g>\n\n              <ng-container\n                *ngIf=\"node.expanded\"\n                [ngTemplateOutlet]=\"groupTemplate\"\n                [ngTemplateOutletContext]=\"{ renderInfo: node, type: 'sub' }\"\n              ></ng-container>\n            </svg:g>\n          </svg:g>\n        </svg:g>\n      </svg:g>\n    </ng-template>\n  ",
                    host: {
                        '[class.nz-graph]': 'true',
                        '[class.nz-graph-auto-fit]': 'nzAutoSize'
                    }
                },] }
    ];
    NzGraphComponent.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef },
        { type: core.NgZone },
        { type: core.ElementRef }
    ]; };
    NzGraphComponent.propDecorators = {
        graphNodes: [{ type: core.ViewChildren, args: [NzGraphNodeDirective,] }],
        svgContainerComponent: [{ type: core.ViewChild, args: [NzGraphSvgContainerComponent,] }],
        minimap: [{ type: core.ViewChild, args: [NzGraphMinimapComponent,] }],
        customNode: [{ type: core.ContentChild, args: [NzCustomGraphNodeDirective, { static: false, read: core.TemplateRef },] }],
        nzGraphData: [{ type: core.Input }],
        nzRankDirection: [{ type: core.Input }],
        nzGraphLayoutSettings: [{ type: core.Input }],
        nzShowMinimap: [{ type: core.Input }],
        nzShowArrow: [{ type: core.Input }],
        nzZoom: [{ type: core.Input }],
        nzAutoSize: [{ type: core.Input }],
        nzGraphInitialized: [{ type: core.Output }],
        nzZoomInit: [{ type: core.Output }],
        nzTransformEvent: [{ type: core.Output }],
        nzNodeClick: [{ type: core.Output }]
    };
    __decorate([
        util.InputBoolean(),
        __metadata("design:type", Object)
    ], NzGraphComponent.prototype, "nzShowMinimap", void 0);
    __decorate([
        util.InputBoolean(),
        __metadata("design:type", Object)
    ], NzGraphComponent.prototype, "nzShowArrow", void 0);
    __decorate([
        util.InputBoolean(),
        __metadata("design:type", Object)
    ], NzGraphComponent.prototype, "nzAutoSize", void 0);

    var COMPONENTS = [
        NzGraphComponent,
        NzGraphSvgContainerComponent,
        NzGraphEdgeDirective,
        NzGraphNodeDirective,
        NzGraphMinimapComponent,
        NzGraphDefsComponent,
        NzCustomGraphNodeDirective
    ];
    var NzGraphModule = /** @class */ (function () {
        function NzGraphModule() {
        }
        return NzGraphModule;
    }());
    NzGraphModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: __spread(COMPONENTS),
                    imports: [common.CommonModule, icon.NzIconModule, spin.NzSpinModule],
                    exports: __spread(COMPONENTS)
                },] }
    ];

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NZ_GRAPH_LAYOUT_SETTING = NZ_GRAPH_LAYOUT_SETTING;
    exports.NzCustomGraphNodeDirective = NzCustomGraphNodeDirective;
    exports.NzGraphComponent = NzGraphComponent;
    exports.NzGraphData = NzGraphData;
    exports.NzGraphEdgeDirective = NzGraphEdgeDirective;
    exports.NzGraphModule = NzGraphModule;
    exports.NzGraphNodeDirective = NzGraphNodeDirective;
    exports.NzGraphSvgContainerComponent = NzGraphSvgContainerComponent;
    exports.isDataSource = isDataSource;
    exports.nzTypeDefinition = nzTypeDefinition;
    exports.ɵa = NzGraphMinimapComponent;
    exports.ɵb = NzGraphDefsComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-graph.umd.js.map
