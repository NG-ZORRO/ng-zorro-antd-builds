(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/cdk/bidi'), require('@angular/cdk/platform'), require('@angular/common'), require('ng-zorro-antd/core/outlet'), require('ng-zorro-antd/icon')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/timeline', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/cdk/bidi', '@angular/cdk/platform', '@angular/common', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/icon'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].timeline = {}), global.ng.core, global.rxjs, global.rxjs.operators, global.ng.cdk.bidi, global.ng.cdk.platform, global.ng.common, global['ng-zorro-antd'].core.outlet, global['ng-zorro-antd'].icon));
}(this, (function (exports, core, rxjs, operators, bidi, platform, common, outlet, icon) { 'use strict';

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var TimelineService = /** @class */ (function () {
        function TimelineService() {
            this.check$ = new rxjs.ReplaySubject(1);
        }
        TimelineService.prototype.markForCheck = function () {
            this.check$.next();
        };
        return TimelineService;
    }());
    TimelineService.decorators = [
        { type: core.Injectable }
    ];

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var TimelineModes = ['left', 'alternate', 'right', 'custom'];
    var TimelinePositions = ['left', 'right'];
    var TimelineTimeDefaultColors = ['red', 'blue', 'green', 'grey', 'gray'];

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    function isDefaultColor(color) {
        return TimelineTimeDefaultColors.findIndex(function (i) { return i === color; }) !== -1;
    }
    var NzTimelineItemComponent = /** @class */ (function () {
        function NzTimelineItemComponent(cdr, timelineService) {
            this.cdr = cdr;
            this.timelineService = timelineService;
            this.nzColor = 'blue';
            this.isLast = false;
            this.borderColor = null;
        }
        NzTimelineItemComponent.prototype.ngOnChanges = function (changes) {
            this.timelineService.markForCheck();
            if (changes.nzColor) {
                this.updateCustomColor();
            }
        };
        NzTimelineItemComponent.prototype.detectChanges = function () {
            this.cdr.detectChanges();
        };
        NzTimelineItemComponent.prototype.updateCustomColor = function () {
            this.borderColor = isDefaultColor(this.nzColor) ? null : this.nzColor;
        };
        return NzTimelineItemComponent;
    }());
    NzTimelineItemComponent.decorators = [
        { type: core.Component, args: [{
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    selector: 'nz-timeline-item, [nz-timeline-item]',
                    exportAs: 'nzTimelineItem',
                    template: "\n    <ng-template #template>\n      <li\n        class=\"ant-timeline-item\"\n        [class.ant-timeline-item-right]=\"(nzPosition || position) === 'right'\"\n        [class.ant-timeline-item-left]=\"(nzPosition || position) === 'left'\"\n        [class.ant-timeline-item-last]=\"isLast\"\n      >\n        <div class=\"ant-timeline-item-tail\"></div>\n        <div\n          class=\"ant-timeline-item-head\"\n          [class.ant-timeline-item-head-red]=\"nzColor === 'red'\"\n          [class.ant-timeline-item-head-blue]=\"nzColor === 'blue'\"\n          [class.ant-timeline-item-head-green]=\"nzColor === 'green'\"\n          [class.ant-timeline-item-head-gray]=\"nzColor === 'gray'\"\n          [class.ant-timeline-item-head-custom]=\"!!nzDot\"\n          [style.border-color]=\"borderColor\"\n        >\n          <ng-container *nzStringTemplateOutlet=\"nzDot\">{{ nzDot }}</ng-container>\n        </div>\n        <div class=\"ant-timeline-item-content\">\n          <ng-content></ng-content>\n        </div>\n      </li>\n    </ng-template>\n  "
                },] }
    ];
    NzTimelineItemComponent.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef },
        { type: TimelineService }
    ]; };
    NzTimelineItemComponent.propDecorators = {
        template: [{ type: core.ViewChild, args: ['template', { static: false },] }],
        nzPosition: [{ type: core.Input }],
        nzColor: [{ type: core.Input }],
        nzDot: [{ type: core.Input }]
    };

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NzTimelineComponent = /** @class */ (function () {
        function NzTimelineComponent(cdr, timelineService, directionality) {
            this.cdr = cdr;
            this.timelineService = timelineService;
            this.directionality = directionality;
            this.nzMode = 'left';
            this.nzReverse = false;
            this.isPendingBoolean = false;
            this.timelineItems = [];
            this.dir = 'ltr';
            this.destroy$ = new rxjs.Subject();
        }
        NzTimelineComponent.prototype.ngOnChanges = function (changes) {
            var nzMode = changes.nzMode, nzReverse = changes.nzReverse, nzPending = changes.nzPending;
            if (simpleChangeActivated(nzMode) || simpleChangeActivated(nzReverse)) {
                this.updateChildren();
            }
            if (nzPending) {
                this.isPendingBoolean = nzPending.currentValue === true;
            }
        };
        NzTimelineComponent.prototype.ngOnInit = function () {
            var _this = this;
            var _a;
            this.timelineService.check$.pipe(operators.takeUntil(this.destroy$)).subscribe(function () {
                _this.cdr.markForCheck();
            });
            (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(operators.takeUntil(this.destroy$)).subscribe(function (direction) {
                _this.dir = direction;
                _this.cdr.detectChanges();
            });
            this.dir = this.directionality.value;
        };
        NzTimelineComponent.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.updateChildren();
            this.listOfItems.changes.pipe(operators.takeUntil(this.destroy$)).subscribe(function () {
                _this.updateChildren();
            });
        };
        NzTimelineComponent.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        NzTimelineComponent.prototype.updateChildren = function () {
            var _this = this;
            if (this.listOfItems && this.listOfItems.length) {
                var length_1 = this.listOfItems.length;
                this.listOfItems.forEach(function (item, index) {
                    item.isLast = !_this.nzReverse ? index === length_1 - 1 : index === 0;
                    item.position = getInferredTimelineItemPosition(index, _this.nzMode);
                    item.detectChanges();
                });
                this.timelineItems = this.nzReverse ? this.listOfItems.toArray().reverse() : this.listOfItems.toArray();
            }
            this.cdr.markForCheck();
        };
        return NzTimelineComponent;
    }());
    NzTimelineComponent.decorators = [
        { type: core.Component, args: [{
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    selector: 'nz-timeline',
                    providers: [TimelineService],
                    exportAs: 'nzTimeline',
                    template: "\n    <ul\n      class=\"ant-timeline\"\n      [class.ant-timeline-right]=\"nzMode === 'right'\"\n      [class.ant-timeline-alternate]=\"nzMode === 'alternate' || nzMode === 'custom'\"\n      [class.ant-timeline-pending]=\"!!nzPending\"\n      [class.ant-timeline-reverse]=\"nzReverse\"\n      [class.ant-timeline-rtl]=\"dir === 'rtl'\"\n    >\n      <!-- pending dot (reversed) -->\n      <ng-container *ngIf=\"nzReverse\" [ngTemplateOutlet]=\"pendingTemplate\"></ng-container>\n      <!-- timeline items -->\n      <ng-container *ngFor=\"let item of timelineItems\">\n        <ng-template [ngTemplateOutlet]=\"item.template\"></ng-template>\n      </ng-container>\n      <ng-container *ngIf=\"!nzReverse\" [ngTemplateOutlet]=\"pendingTemplate\"></ng-container>\n      <!-- pending dot -->\n    </ul>\n    <ng-template #pendingTemplate>\n      <li *ngIf=\"nzPending\" class=\"ant-timeline-item ant-timeline-item-pending\">\n        <div class=\"ant-timeline-item-tail\"></div>\n        <div class=\"ant-timeline-item-head ant-timeline-item-head-custom ant-timeline-item-head-blue\">\n          <ng-container *nzStringTemplateOutlet=\"nzPendingDot\">\n            {{ nzPendingDot }}\n            <i *ngIf=\"!nzPendingDot\" nz-icon nzType=\"loading\"></i>\n          </ng-container>\n        </div>\n        <div class=\"ant-timeline-item-content\">\n          <ng-container *nzStringTemplateOutlet=\"nzPending\">\n            {{ isPendingBoolean ? '' : nzPending }}\n          </ng-container>\n        </div>\n      </li>\n    </ng-template>\n    <!-- Grasp items -->\n    <ng-content></ng-content>\n  "
                },] }
    ];
    NzTimelineComponent.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef },
        { type: TimelineService },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] }
    ]; };
    NzTimelineComponent.propDecorators = {
        listOfItems: [{ type: core.ContentChildren, args: [NzTimelineItemComponent,] }],
        nzMode: [{ type: core.Input }],
        nzPending: [{ type: core.Input }],
        nzPendingDot: [{ type: core.Input }],
        nzReverse: [{ type: core.Input }]
    };
    function simpleChangeActivated(simpleChange) {
        return !!(simpleChange && (simpleChange.previousValue !== simpleChange.currentValue || simpleChange.isFirstChange()));
    }
    function getInferredTimelineItemPosition(index, mode) {
        return mode === 'custom'
            ? undefined
            : mode === 'left'
                ? 'left'
                : mode === 'right'
                    ? 'right'
                    : mode === 'alternate' && index % 2 === 0
                        ? 'left'
                        : 'right';
    }

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */
    var NzTimelineModule = /** @class */ (function () {
        function NzTimelineModule() {
        }
        return NzTimelineModule;
    }());
    NzTimelineModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [NzTimelineItemComponent, NzTimelineComponent],
                    exports: [NzTimelineItemComponent, NzTimelineComponent],
                    imports: [bidi.BidiModule, common.CommonModule, platform.PlatformModule, icon.NzIconModule, outlet.NzOutletModule]
                },] }
    ];

    /**
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NzTimelineComponent = NzTimelineComponent;
    exports.NzTimelineItemComponent = NzTimelineItemComponent;
    exports.NzTimelineModule = NzTimelineModule;
    exports.TimelineService = TimelineService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-timeline.umd.js.map
