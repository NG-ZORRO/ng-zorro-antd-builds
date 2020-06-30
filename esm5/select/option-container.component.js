/**
 * @fileoverview added by tsickle
 * Generated from: option-container.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
var NzOptionContainerComponent = /** @class */ (function () {
    function NzOptionContainerComponent() {
        this.notFoundContent = undefined;
        this.menuItemSelectedIcon = null;
        this.dropdownRender = null;
        this.activatedValue = null;
        this.listOfSelectedValue = [];
        this.mode = 'default';
        this.matchWidth = true;
        this.itemSize = 32;
        this.maxItemLength = 8;
        this.listOfContainerItem = [];
        this.itemClick = new EventEmitter();
        this.scrollToBottom = new EventEmitter();
        this.scrolledIndex = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    NzOptionContainerComponent.prototype.onItemClick = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.itemClick.emit(value);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NzOptionContainerComponent.prototype.onItemHover = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // TODO: keydown.enter won't activate this value
        this.activatedValue = value;
    };
    /**
     * @param {?} _index
     * @param {?} option
     * @return {?}
     */
    NzOptionContainerComponent.prototype.trackValue = /**
     * @param {?} _index
     * @param {?} option
     * @return {?}
     */
    function (_index, option) {
        return option.key;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NzOptionContainerComponent.prototype.onScrolledIndexChange = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.scrolledIndex = index;
        if (index === this.listOfContainerItem.length - this.maxItemLength) {
            this.scrollToBottom.emit();
        }
    };
    /**
     * @return {?}
     */
    NzOptionContainerComponent.prototype.scrollToActivatedValue = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var index = this.listOfContainerItem.findIndex((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this.compareWith(item.key, _this.activatedValue); }));
        if (index < this.scrolledIndex || index >= this.scrolledIndex + this.maxItemLength) {
            this.cdkVirtualScrollViewport.scrollToIndex(index || 0);
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzOptionContainerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var listOfContainerItem = changes.listOfContainerItem, activatedValue = changes.activatedValue;
        if (listOfContainerItem || activatedValue) {
            this.scrollToActivatedValue();
        }
    };
    /**
     * @return {?}
     */
    NzOptionContainerComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () { return _this.scrollToActivatedValue(); }));
    };
    NzOptionContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-option-container',
                    exportAs: 'nzOptionContainer',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    template: "\n    <div>\n      <div *ngIf=\"listOfContainerItem.length === 0\" class=\"ant-select-item-empty\">\n        <nz-embed-empty nzComponentName=\"select\" [specificContent]=\"notFoundContent!\"></nz-embed-empty>\n      </div>\n      <cdk-virtual-scroll-viewport\n        [class.full-width]=\"!matchWidth\"\n        [itemSize]=\"itemSize\"\n        [maxBufferPx]=\"itemSize * maxItemLength\"\n        [minBufferPx]=\"itemSize\"\n        (scrolledIndexChange)=\"onScrolledIndexChange($event)\"\n        [style.height.px]=\"listOfContainerItem.length * itemSize\"\n        [style.max-height.px]=\"itemSize * maxItemLength\"\n      >\n        <ng-template\n          cdkVirtualFor\n          [cdkVirtualForOf]=\"listOfContainerItem\"\n          [cdkVirtualForTrackBy]=\"trackValue\"\n          [cdkVirtualForTemplateCacheSize]=\"0\"\n          let-item\n        >\n          <ng-container [ngSwitch]=\"item.type\">\n            <nz-option-item-group *ngSwitchCase=\"'group'\" [nzLabel]=\"item.groupLabel\"></nz-option-item-group>\n            <nz-option-item\n              *ngSwitchCase=\"'item'\"\n              [icon]=\"menuItemSelectedIcon\"\n              [customContent]=\"item.nzCustomContent\"\n              [template]=\"item.template\"\n              [grouped]=\"!!item.groupLabel\"\n              [disabled]=\"item.nzDisabled\"\n              [showState]=\"mode === 'tags' || mode === 'multiple'\"\n              [label]=\"item.nzLabel\"\n              [compareWith]=\"compareWith\"\n              [activatedValue]=\"activatedValue\"\n              [listOfSelectedValue]=\"listOfSelectedValue\"\n              [value]=\"item.nzValue\"\n              (itemHover)=\"onItemHover($event)\"\n              (itemClick)=\"onItemClick($event)\"\n            ></nz-option-item>\n          </ng-container>\n        </ng-template>\n      </cdk-virtual-scroll-viewport>\n      <ng-template [ngTemplateOutlet]=\"dropdownRender\"></ng-template>\n    </div>\n  ",
                    host: {
                        '[class.ant-select-dropdown]': 'true'
                    }
                }] }
    ];
    NzOptionContainerComponent.propDecorators = {
        notFoundContent: [{ type: Input }],
        menuItemSelectedIcon: [{ type: Input }],
        dropdownRender: [{ type: Input }],
        activatedValue: [{ type: Input }],
        listOfSelectedValue: [{ type: Input }],
        compareWith: [{ type: Input }],
        mode: [{ type: Input }],
        matchWidth: [{ type: Input }],
        itemSize: [{ type: Input }],
        maxItemLength: [{ type: Input }],
        listOfContainerItem: [{ type: Input }],
        itemClick: [{ type: Output }],
        scrollToBottom: [{ type: Output }],
        cdkVirtualScrollViewport: [{ type: ViewChild, args: [CdkVirtualScrollViewport, { static: true },] }]
    };
    return NzOptionContainerComponent;
}());
export { NzOptionContainerComponent };
if (false) {
    /** @type {?} */
    NzOptionContainerComponent.prototype.notFoundContent;
    /** @type {?} */
    NzOptionContainerComponent.prototype.menuItemSelectedIcon;
    /** @type {?} */
    NzOptionContainerComponent.prototype.dropdownRender;
    /** @type {?} */
    NzOptionContainerComponent.prototype.activatedValue;
    /** @type {?} */
    NzOptionContainerComponent.prototype.listOfSelectedValue;
    /** @type {?} */
    NzOptionContainerComponent.prototype.compareWith;
    /** @type {?} */
    NzOptionContainerComponent.prototype.mode;
    /** @type {?} */
    NzOptionContainerComponent.prototype.matchWidth;
    /** @type {?} */
    NzOptionContainerComponent.prototype.itemSize;
    /** @type {?} */
    NzOptionContainerComponent.prototype.maxItemLength;
    /** @type {?} */
    NzOptionContainerComponent.prototype.listOfContainerItem;
    /** @type {?} */
    NzOptionContainerComponent.prototype.itemClick;
    /** @type {?} */
    NzOptionContainerComponent.prototype.scrollToBottom;
    /** @type {?} */
    NzOptionContainerComponent.prototype.cdkVirtualScrollViewport;
    /**
     * @type {?}
     * @private
     */
    NzOptionContainerComponent.prototype.scrolledIndex;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkL3NlbGVjdC8iLCJzb3VyY2VzIjpbIm9wdGlvbi1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xFLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUdOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFJdkI7SUFBQTtRQXdEVyxvQkFBZSxHQUFnRCxTQUFTLENBQUM7UUFDekUseUJBQW9CLEdBQWtDLElBQUksQ0FBQztRQUMzRCxtQkFBYyxHQUFrQyxJQUFJLENBQUM7UUFDckQsbUJBQWMsR0FBcUIsSUFBSSxDQUFDO1FBQ3hDLHdCQUFtQixHQUFnQixFQUFFLENBQUM7UUFFdEMsU0FBSSxHQUFxQixTQUFTLENBQUM7UUFDbkMsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2Qsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsd0JBQW1CLEdBQTRCLEVBQUUsQ0FBQztRQUN4QyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQWEsQ0FBQztRQUMxQyxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFFckQsa0JBQWEsR0FBRyxDQUFDLENBQUM7SUFzQzVCLENBQUM7Ozs7O0lBcENDLGdEQUFXOzs7O0lBQVgsVUFBWSxLQUFnQjtRQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7OztJQUVELGdEQUFXOzs7O0lBQVgsVUFBWSxLQUFnQjtRQUMxQixnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQzs7Ozs7O0lBRUQsK0NBQVU7Ozs7O0lBQVYsVUFBVyxNQUFjLEVBQUUsTUFBNkI7UUFDdEQsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7Ozs7O0lBRUQsMERBQXFCOzs7O0lBQXJCLFVBQXNCLEtBQWE7UUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2xFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDNUI7SUFDSCxDQUFDOzs7O0lBRUQsMkRBQXNCOzs7SUFBdEI7UUFBQSxpQkFLQzs7WUFKTyxLQUFLLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFJLENBQUMsY0FBYyxDQUFDLEVBQS9DLENBQStDLEVBQUM7UUFDekcsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2xGLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxhQUFhLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxnREFBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFDeEIsSUFBQSxpREFBbUIsRUFBRSx1Q0FBYztRQUMzQyxJQUFJLG1CQUFtQixJQUFJLGNBQWMsRUFBRTtZQUN6QyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztTQUMvQjtJQUNILENBQUM7Ozs7SUFDRCxvREFBZTs7O0lBQWY7UUFBQSxpQkFFQztRQURDLFVBQVU7OztRQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsc0JBQXNCLEVBQUUsRUFBN0IsQ0FBNkIsRUFBQyxDQUFDO0lBQ2xELENBQUM7O2dCQTNHRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxtQkFBbUIsRUFBRSxLQUFLO29CQUMxQixRQUFRLEVBQUUsZzZEQTRDVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osNkJBQTZCLEVBQUUsTUFBTTtxQkFDdEM7aUJBQ0Y7OztrQ0FFRSxLQUFLO3VDQUNMLEtBQUs7aUNBQ0wsS0FBSztpQ0FDTCxLQUFLO3NDQUNMLEtBQUs7OEJBQ0wsS0FBSzt1QkFDTCxLQUFLOzZCQUNMLEtBQUs7MkJBQ0wsS0FBSztnQ0FDTCxLQUFLO3NDQUNMLEtBQUs7NEJBQ0wsTUFBTTtpQ0FDTixNQUFNOzJDQUNOLFNBQVMsU0FBQyx3QkFBd0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7O0lBdUN2RCxpQ0FBQztDQUFBLEFBNUdELElBNEdDO1NBckRZLDBCQUEwQjs7O0lBQ3JDLHFEQUFrRjs7SUFDbEYsMERBQW9FOztJQUNwRSxvREFBOEQ7O0lBQzlELG9EQUFpRDs7SUFDakQseURBQStDOztJQUMvQyxpREFBaUU7O0lBQ2pFLDBDQUE0Qzs7SUFDNUMsZ0RBQTJCOztJQUMzQiw4Q0FBdUI7O0lBQ3ZCLG1EQUEyQjs7SUFDM0IseURBQTJEOztJQUMzRCwrQ0FBNkQ7O0lBQzdELG9EQUE2RDs7SUFDN0QsOERBQTJHOzs7OztJQUMzRyxtREFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOelNlbGVjdEl0ZW1JbnRlcmZhY2UsIE56U2VsZWN0TW9kZVR5cGUgfSBmcm9tICcuL3NlbGVjdC50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LW9wdGlvbi1jb250YWluZXInLFxuICBleHBvcnRBczogJ256T3B0aW9uQ29udGFpbmVyJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXY+XG4gICAgICA8ZGl2ICpuZ0lmPVwibGlzdE9mQ29udGFpbmVySXRlbS5sZW5ndGggPT09IDBcIiBjbGFzcz1cImFudC1zZWxlY3QtaXRlbS1lbXB0eVwiPlxuICAgICAgICA8bnotZW1iZWQtZW1wdHkgbnpDb21wb25lbnROYW1lPVwic2VsZWN0XCIgW3NwZWNpZmljQ29udGVudF09XCJub3RGb3VuZENvbnRlbnQhXCI+PC9uei1lbWJlZC1lbXB0eT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGNkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydFxuICAgICAgICBbY2xhc3MuZnVsbC13aWR0aF09XCIhbWF0Y2hXaWR0aFwiXG4gICAgICAgIFtpdGVtU2l6ZV09XCJpdGVtU2l6ZVwiXG4gICAgICAgIFttYXhCdWZmZXJQeF09XCJpdGVtU2l6ZSAqIG1heEl0ZW1MZW5ndGhcIlxuICAgICAgICBbbWluQnVmZmVyUHhdPVwiaXRlbVNpemVcIlxuICAgICAgICAoc2Nyb2xsZWRJbmRleENoYW5nZSk9XCJvblNjcm9sbGVkSW5kZXhDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwibGlzdE9mQ29udGFpbmVySXRlbS5sZW5ndGggKiBpdGVtU2l6ZVwiXG4gICAgICAgIFtzdHlsZS5tYXgtaGVpZ2h0LnB4XT1cIml0ZW1TaXplICogbWF4SXRlbUxlbmd0aFwiXG4gICAgICA+XG4gICAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAgIGNka1ZpcnR1YWxGb3JcbiAgICAgICAgICBbY2RrVmlydHVhbEZvck9mXT1cImxpc3RPZkNvbnRhaW5lckl0ZW1cIlxuICAgICAgICAgIFtjZGtWaXJ0dWFsRm9yVHJhY2tCeV09XCJ0cmFja1ZhbHVlXCJcbiAgICAgICAgICBbY2RrVmlydHVhbEZvclRlbXBsYXRlQ2FjaGVTaXplXT1cIjBcIlxuICAgICAgICAgIGxldC1pdGVtXG4gICAgICAgID5cbiAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJpdGVtLnR5cGVcIj5cbiAgICAgICAgICAgIDxuei1vcHRpb24taXRlbS1ncm91cCAqbmdTd2l0Y2hDYXNlPVwiJ2dyb3VwJ1wiIFtuekxhYmVsXT1cIml0ZW0uZ3JvdXBMYWJlbFwiPjwvbnotb3B0aW9uLWl0ZW0tZ3JvdXA+XG4gICAgICAgICAgICA8bnotb3B0aW9uLWl0ZW1cbiAgICAgICAgICAgICAgKm5nU3dpdGNoQ2FzZT1cIidpdGVtJ1wiXG4gICAgICAgICAgICAgIFtpY29uXT1cIm1lbnVJdGVtU2VsZWN0ZWRJY29uXCJcbiAgICAgICAgICAgICAgW2N1c3RvbUNvbnRlbnRdPVwiaXRlbS5uekN1c3RvbUNvbnRlbnRcIlxuICAgICAgICAgICAgICBbdGVtcGxhdGVdPVwiaXRlbS50ZW1wbGF0ZVwiXG4gICAgICAgICAgICAgIFtncm91cGVkXT1cIiEhaXRlbS5ncm91cExhYmVsXCJcbiAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIml0ZW0ubnpEaXNhYmxlZFwiXG4gICAgICAgICAgICAgIFtzaG93U3RhdGVdPVwibW9kZSA9PT0gJ3RhZ3MnIHx8IG1vZGUgPT09ICdtdWx0aXBsZSdcIlxuICAgICAgICAgICAgICBbbGFiZWxdPVwiaXRlbS5uekxhYmVsXCJcbiAgICAgICAgICAgICAgW2NvbXBhcmVXaXRoXT1cImNvbXBhcmVXaXRoXCJcbiAgICAgICAgICAgICAgW2FjdGl2YXRlZFZhbHVlXT1cImFjdGl2YXRlZFZhbHVlXCJcbiAgICAgICAgICAgICAgW2xpc3RPZlNlbGVjdGVkVmFsdWVdPVwibGlzdE9mU2VsZWN0ZWRWYWx1ZVwiXG4gICAgICAgICAgICAgIFt2YWx1ZV09XCJpdGVtLm56VmFsdWVcIlxuICAgICAgICAgICAgICAoaXRlbUhvdmVyKT1cIm9uSXRlbUhvdmVyKCRldmVudClcIlxuICAgICAgICAgICAgICAoaXRlbUNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgPjwvbnotb3B0aW9uLWl0ZW0+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L2Nkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydD5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJkcm9wZG93blJlbmRlclwiPjwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtZHJvcGRvd25dJzogJ3RydWUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpPcHRpb25Db250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBub3RGb3VuZENvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIG1lbnVJdGVtU2VsZWN0ZWRJY29uOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGRyb3Bkb3duUmVuZGVyOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGFjdGl2YXRlZFZhbHVlOiBOelNhZmVBbnkgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbGlzdE9mU2VsZWN0ZWRWYWx1ZTogTnpTYWZlQW55W10gPSBbXTtcbiAgQElucHV0KCkgY29tcGFyZVdpdGghOiAobzE6IE56U2FmZUFueSwgbzI6IE56U2FmZUFueSkgPT4gYm9vbGVhbjtcbiAgQElucHV0KCkgbW9kZTogTnpTZWxlY3RNb2RlVHlwZSA9ICdkZWZhdWx0JztcbiAgQElucHV0KCkgbWF0Y2hXaWR0aCA9IHRydWU7XG4gIEBJbnB1dCgpIGl0ZW1TaXplID0gMzI7XG4gIEBJbnB1dCgpIG1heEl0ZW1MZW5ndGggPSA4O1xuICBASW5wdXQoKSBsaXN0T2ZDb250YWluZXJJdGVtOiBOelNlbGVjdEl0ZW1JbnRlcmZhY2VbXSA9IFtdO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgaXRlbUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxOelNhZmVBbnk+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBzY3JvbGxUb0JvdHRvbSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQFZpZXdDaGlsZChDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQsIHsgc3RhdGljOiB0cnVlIH0pIGNka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCE6IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydDtcbiAgcHJpdmF0ZSBzY3JvbGxlZEluZGV4ID0gMDtcblxuICBvbkl0ZW1DbGljayh2YWx1ZTogTnpTYWZlQW55KTogdm9pZCB7XG4gICAgdGhpcy5pdGVtQ2xpY2suZW1pdCh2YWx1ZSk7XG4gIH1cblxuICBvbkl0ZW1Ib3Zlcih2YWx1ZTogTnpTYWZlQW55KTogdm9pZCB7XG4gICAgLy8gVE9ETzoga2V5ZG93bi5lbnRlciB3b24ndCBhY3RpdmF0ZSB0aGlzIHZhbHVlXG4gICAgdGhpcy5hY3RpdmF0ZWRWYWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgdHJhY2tWYWx1ZShfaW5kZXg6IG51bWJlciwgb3B0aW9uOiBOelNlbGVjdEl0ZW1JbnRlcmZhY2UpOiBOelNhZmVBbnkge1xuICAgIHJldHVybiBvcHRpb24ua2V5O1xuICB9XG5cbiAgb25TY3JvbGxlZEluZGV4Q2hhbmdlKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnNjcm9sbGVkSW5kZXggPSBpbmRleDtcbiAgICBpZiAoaW5kZXggPT09IHRoaXMubGlzdE9mQ29udGFpbmVySXRlbS5sZW5ndGggLSB0aGlzLm1heEl0ZW1MZW5ndGgpIHtcbiAgICAgIHRoaXMuc2Nyb2xsVG9Cb3R0b20uZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIHNjcm9sbFRvQWN0aXZhdGVkVmFsdWUoKTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmxpc3RPZkNvbnRhaW5lckl0ZW0uZmluZEluZGV4KGl0ZW0gPT4gdGhpcy5jb21wYXJlV2l0aChpdGVtLmtleSwgdGhpcy5hY3RpdmF0ZWRWYWx1ZSkpO1xuICAgIGlmIChpbmRleCA8IHRoaXMuc2Nyb2xsZWRJbmRleCB8fCBpbmRleCA+PSB0aGlzLnNjcm9sbGVkSW5kZXggKyB0aGlzLm1heEl0ZW1MZW5ndGgpIHtcbiAgICAgIHRoaXMuY2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0LnNjcm9sbFRvSW5kZXgoaW5kZXggfHwgMCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbGlzdE9mQ29udGFpbmVySXRlbSwgYWN0aXZhdGVkVmFsdWUgfSA9IGNoYW5nZXM7XG4gICAgaWYgKGxpc3RPZkNvbnRhaW5lckl0ZW0gfHwgYWN0aXZhdGVkVmFsdWUpIHtcbiAgICAgIHRoaXMuc2Nyb2xsVG9BY3RpdmF0ZWRWYWx1ZSgpO1xuICAgIH1cbiAgfVxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnNjcm9sbFRvQWN0aXZhdGVkVmFsdWUoKSk7XG4gIH1cbn1cbiJdfQ==