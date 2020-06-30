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
export class NzOptionContainerComponent {
    constructor() {
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
    onItemClick(value) {
        this.itemClick.emit(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onItemHover(value) {
        // TODO: keydown.enter won't activate this value
        this.activatedValue = value;
    }
    /**
     * @param {?} _index
     * @param {?} option
     * @return {?}
     */
    trackValue(_index, option) {
        return option.key;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    onScrolledIndexChange(index) {
        this.scrolledIndex = index;
        if (index === this.listOfContainerItem.length - this.maxItemLength) {
            this.scrollToBottom.emit();
        }
    }
    /**
     * @return {?}
     */
    scrollToActivatedValue() {
        /** @type {?} */
        const index = this.listOfContainerItem.findIndex((/**
         * @param {?} item
         * @return {?}
         */
        item => this.compareWith(item.key, this.activatedValue)));
        if (index < this.scrolledIndex || index >= this.scrolledIndex + this.maxItemLength) {
            this.cdkVirtualScrollViewport.scrollToIndex(index || 0);
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const { listOfContainerItem, activatedValue } = changes;
        if (listOfContainerItem || activatedValue) {
            this.scrollToActivatedValue();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        setTimeout((/**
         * @return {?}
         */
        () => this.scrollToActivatedValue()));
    }
}
NzOptionContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-option-container',
                exportAs: 'nzOptionContainer',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                template: `
    <div>
      <div *ngIf="listOfContainerItem.length === 0" class="ant-select-item-empty">
        <nz-embed-empty nzComponentName="select" [specificContent]="notFoundContent!"></nz-embed-empty>
      </div>
      <cdk-virtual-scroll-viewport
        [class.full-width]="!matchWidth"
        [itemSize]="itemSize"
        [maxBufferPx]="itemSize * maxItemLength"
        [minBufferPx]="itemSize"
        (scrolledIndexChange)="onScrolledIndexChange($event)"
        [style.height.px]="listOfContainerItem.length * itemSize"
        [style.max-height.px]="itemSize * maxItemLength"
      >
        <ng-template
          cdkVirtualFor
          [cdkVirtualForOf]="listOfContainerItem"
          [cdkVirtualForTrackBy]="trackValue"
          [cdkVirtualForTemplateCacheSize]="0"
          let-item
        >
          <ng-container [ngSwitch]="item.type">
            <nz-option-item-group *ngSwitchCase="'group'" [nzLabel]="item.groupLabel"></nz-option-item-group>
            <nz-option-item
              *ngSwitchCase="'item'"
              [icon]="menuItemSelectedIcon"
              [customContent]="item.nzCustomContent"
              [template]="item.template"
              [grouped]="!!item.groupLabel"
              [disabled]="item.nzDisabled"
              [showState]="mode === 'tags' || mode === 'multiple'"
              [label]="item.nzLabel"
              [compareWith]="compareWith"
              [activatedValue]="activatedValue"
              [listOfSelectedValue]="listOfSelectedValue"
              [value]="item.nzValue"
              (itemHover)="onItemHover($event)"
              (itemClick)="onItemClick($event)"
            ></nz-option-item>
          </ng-container>
        </ng-template>
      </cdk-virtual-scroll-viewport>
      <ng-template [ngTemplateOutlet]="dropdownRender"></ng-template>
    </div>
  `,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkL3NlbGVjdC8iLCJzb3VyY2VzIjpbIm9wdGlvbi1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xFLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUdOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUEyRHZCLE1BQU0sT0FBTywwQkFBMEI7SUF2RHZDO1FBd0RXLG9CQUFlLEdBQWdELFNBQVMsQ0FBQztRQUN6RSx5QkFBb0IsR0FBa0MsSUFBSSxDQUFDO1FBQzNELG1CQUFjLEdBQWtDLElBQUksQ0FBQztRQUNyRCxtQkFBYyxHQUFxQixJQUFJLENBQUM7UUFDeEMsd0JBQW1CLEdBQWdCLEVBQUUsQ0FBQztRQUV0QyxTQUFJLEdBQXFCLFNBQVMsQ0FBQztRQUNuQyxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQix3QkFBbUIsR0FBNEIsRUFBRSxDQUFDO1FBQ3hDLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBYSxDQUFDO1FBQzFDLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUVyRCxrQkFBYSxHQUFHLENBQUMsQ0FBQztJQXNDNUIsQ0FBQzs7Ozs7SUFwQ0MsV0FBVyxDQUFDLEtBQWdCO1FBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLEtBQWdCO1FBQzFCLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDOzs7Ozs7SUFFRCxVQUFVLENBQUMsTUFBYyxFQUFFLE1BQTZCO1FBQ3RELE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDOzs7OztJQUVELHFCQUFxQixDQUFDLEtBQWE7UUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2xFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDNUI7SUFDSCxDQUFDOzs7O0lBRUQsc0JBQXNCOztjQUNkLEtBQUssR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUzs7OztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBQztRQUN6RyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDbEYsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGFBQWEsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDekQ7SUFDSCxDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjtjQUMxQixFQUFFLG1CQUFtQixFQUFFLGNBQWMsRUFBRSxHQUFHLE9BQU87UUFDdkQsSUFBSSxtQkFBbUIsSUFBSSxjQUFjLEVBQUU7WUFDekMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7U0FDL0I7SUFDSCxDQUFDOzs7O0lBQ0QsZUFBZTtRQUNiLFVBQVU7OztRQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxFQUFDLENBQUM7SUFDbEQsQ0FBQzs7O1lBM0dGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Q1Q7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLDZCQUE2QixFQUFFLE1BQU07aUJBQ3RDO2FBQ0Y7Ozs4QkFFRSxLQUFLO21DQUNMLEtBQUs7NkJBQ0wsS0FBSzs2QkFDTCxLQUFLO2tDQUNMLEtBQUs7MEJBQ0wsS0FBSzttQkFDTCxLQUFLO3lCQUNMLEtBQUs7dUJBQ0wsS0FBSzs0QkFDTCxLQUFLO2tDQUNMLEtBQUs7d0JBQ0wsTUFBTTs2QkFDTixNQUFNO3VDQUNOLFNBQVMsU0FBQyx3QkFBd0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Ozs7SUFickQscURBQWtGOztJQUNsRiwwREFBb0U7O0lBQ3BFLG9EQUE4RDs7SUFDOUQsb0RBQWlEOztJQUNqRCx5REFBK0M7O0lBQy9DLGlEQUFpRTs7SUFDakUsMENBQTRDOztJQUM1QyxnREFBMkI7O0lBQzNCLDhDQUF1Qjs7SUFDdkIsbURBQTJCOztJQUMzQix5REFBMkQ7O0lBQzNELCtDQUE2RDs7SUFDN0Qsb0RBQTZEOztJQUM3RCw4REFBMkc7Ozs7O0lBQzNHLG1EQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56U2VsZWN0SXRlbUludGVyZmFjZSwgTnpTZWxlY3RNb2RlVHlwZSB9IGZyb20gJy4vc2VsZWN0LnR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotb3B0aW9uLWNvbnRhaW5lcicsXG4gIGV4cG9ydEFzOiAnbnpPcHRpb25Db250YWluZXInLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdj5cbiAgICAgIDxkaXYgKm5nSWY9XCJsaXN0T2ZDb250YWluZXJJdGVtLmxlbmd0aCA9PT0gMFwiIGNsYXNzPVwiYW50LXNlbGVjdC1pdGVtLWVtcHR5XCI+XG4gICAgICAgIDxuei1lbWJlZC1lbXB0eSBuekNvbXBvbmVudE5hbWU9XCJzZWxlY3RcIiBbc3BlY2lmaWNDb250ZW50XT1cIm5vdEZvdW5kQ29udGVudCFcIj48L256LWVtYmVkLWVtcHR5PlxuICAgICAgPC9kaXY+XG4gICAgICA8Y2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0XG4gICAgICAgIFtjbGFzcy5mdWxsLXdpZHRoXT1cIiFtYXRjaFdpZHRoXCJcbiAgICAgICAgW2l0ZW1TaXplXT1cIml0ZW1TaXplXCJcbiAgICAgICAgW21heEJ1ZmZlclB4XT1cIml0ZW1TaXplICogbWF4SXRlbUxlbmd0aFwiXG4gICAgICAgIFttaW5CdWZmZXJQeF09XCJpdGVtU2l6ZVwiXG4gICAgICAgIChzY3JvbGxlZEluZGV4Q2hhbmdlKT1cIm9uU2Nyb2xsZWRJbmRleENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJsaXN0T2ZDb250YWluZXJJdGVtLmxlbmd0aCAqIGl0ZW1TaXplXCJcbiAgICAgICAgW3N0eWxlLm1heC1oZWlnaHQucHhdPVwiaXRlbVNpemUgKiBtYXhJdGVtTGVuZ3RoXCJcbiAgICAgID5cbiAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgY2RrVmlydHVhbEZvclxuICAgICAgICAgIFtjZGtWaXJ0dWFsRm9yT2ZdPVwibGlzdE9mQ29udGFpbmVySXRlbVwiXG4gICAgICAgICAgW2Nka1ZpcnR1YWxGb3JUcmFja0J5XT1cInRyYWNrVmFsdWVcIlxuICAgICAgICAgIFtjZGtWaXJ0dWFsRm9yVGVtcGxhdGVDYWNoZVNpemVdPVwiMFwiXG4gICAgICAgICAgbGV0LWl0ZW1cbiAgICAgICAgPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cIml0ZW0udHlwZVwiPlxuICAgICAgICAgICAgPG56LW9wdGlvbi1pdGVtLWdyb3VwICpuZ1N3aXRjaENhc2U9XCInZ3JvdXAnXCIgW256TGFiZWxdPVwiaXRlbS5ncm91cExhYmVsXCI+PC9uei1vcHRpb24taXRlbS1ncm91cD5cbiAgICAgICAgICAgIDxuei1vcHRpb24taXRlbVxuICAgICAgICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ2l0ZW0nXCJcbiAgICAgICAgICAgICAgW2ljb25dPVwibWVudUl0ZW1TZWxlY3RlZEljb25cIlxuICAgICAgICAgICAgICBbY3VzdG9tQ29udGVudF09XCJpdGVtLm56Q3VzdG9tQ29udGVudFwiXG4gICAgICAgICAgICAgIFt0ZW1wbGF0ZV09XCJpdGVtLnRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgW2dyb3VwZWRdPVwiISFpdGVtLmdyb3VwTGFiZWxcIlxuICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiaXRlbS5uekRpc2FibGVkXCJcbiAgICAgICAgICAgICAgW3Nob3dTdGF0ZV09XCJtb2RlID09PSAndGFncycgfHwgbW9kZSA9PT0gJ211bHRpcGxlJ1wiXG4gICAgICAgICAgICAgIFtsYWJlbF09XCJpdGVtLm56TGFiZWxcIlxuICAgICAgICAgICAgICBbY29tcGFyZVdpdGhdPVwiY29tcGFyZVdpdGhcIlxuICAgICAgICAgICAgICBbYWN0aXZhdGVkVmFsdWVdPVwiYWN0aXZhdGVkVmFsdWVcIlxuICAgICAgICAgICAgICBbbGlzdE9mU2VsZWN0ZWRWYWx1ZV09XCJsaXN0T2ZTZWxlY3RlZFZhbHVlXCJcbiAgICAgICAgICAgICAgW3ZhbHVlXT1cIml0ZW0ubnpWYWx1ZVwiXG4gICAgICAgICAgICAgIChpdGVtSG92ZXIpPVwib25JdGVtSG92ZXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgIChpdGVtQ2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICA+PC9uei1vcHRpb24taXRlbT5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0PlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImRyb3Bkb3duUmVuZGVyXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LXNlbGVjdC1kcm9wZG93bl0nOiAndHJ1ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOek9wdGlvbkNvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIG5vdEZvdW5kQ29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgbWVudUl0ZW1TZWxlY3RlZEljb246IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgZHJvcGRvd25SZW5kZXI6IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgYWN0aXZhdGVkVmFsdWU6IE56U2FmZUFueSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBsaXN0T2ZTZWxlY3RlZFZhbHVlOiBOelNhZmVBbnlbXSA9IFtdO1xuICBASW5wdXQoKSBjb21wYXJlV2l0aCE6IChvMTogTnpTYWZlQW55LCBvMjogTnpTYWZlQW55KSA9PiBib29sZWFuO1xuICBASW5wdXQoKSBtb2RlOiBOelNlbGVjdE1vZGVUeXBlID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKSBtYXRjaFdpZHRoID0gdHJ1ZTtcbiAgQElucHV0KCkgaXRlbVNpemUgPSAzMjtcbiAgQElucHV0KCkgbWF4SXRlbUxlbmd0aCA9IDg7XG4gIEBJbnB1dCgpIGxpc3RPZkNvbnRhaW5lckl0ZW06IE56U2VsZWN0SXRlbUludGVyZmFjZVtdID0gW107XG4gIEBPdXRwdXQoKSByZWFkb25seSBpdGVtQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE56U2FmZUFueT4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHNjcm9sbFRvQm90dG9tID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAVmlld0NoaWxkKENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCwgeyBzdGF0aWM6IHRydWUgfSkgY2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0ITogQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0O1xuICBwcml2YXRlIHNjcm9sbGVkSW5kZXggPSAwO1xuXG4gIG9uSXRlbUNsaWNrKHZhbHVlOiBOelNhZmVBbnkpOiB2b2lkIHtcbiAgICB0aGlzLml0ZW1DbGljay5lbWl0KHZhbHVlKTtcbiAgfVxuXG4gIG9uSXRlbUhvdmVyKHZhbHVlOiBOelNhZmVBbnkpOiB2b2lkIHtcbiAgICAvLyBUT0RPOiBrZXlkb3duLmVudGVyIHdvbid0IGFjdGl2YXRlIHRoaXMgdmFsdWVcbiAgICB0aGlzLmFjdGl2YXRlZFZhbHVlID0gdmFsdWU7XG4gIH1cblxuICB0cmFja1ZhbHVlKF9pbmRleDogbnVtYmVyLCBvcHRpb246IE56U2VsZWN0SXRlbUludGVyZmFjZSk6IE56U2FmZUFueSB7XG4gICAgcmV0dXJuIG9wdGlvbi5rZXk7XG4gIH1cblxuICBvblNjcm9sbGVkSW5kZXhDaGFuZ2UoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc2Nyb2xsZWRJbmRleCA9IGluZGV4O1xuICAgIGlmIChpbmRleCA9PT0gdGhpcy5saXN0T2ZDb250YWluZXJJdGVtLmxlbmd0aCAtIHRoaXMubWF4SXRlbUxlbmd0aCkge1xuICAgICAgdGhpcy5zY3JvbGxUb0JvdHRvbS5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgc2Nyb2xsVG9BY3RpdmF0ZWRWYWx1ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMubGlzdE9mQ29udGFpbmVySXRlbS5maW5kSW5kZXgoaXRlbSA9PiB0aGlzLmNvbXBhcmVXaXRoKGl0ZW0ua2V5LCB0aGlzLmFjdGl2YXRlZFZhbHVlKSk7XG4gICAgaWYgKGluZGV4IDwgdGhpcy5zY3JvbGxlZEluZGV4IHx8IGluZGV4ID49IHRoaXMuc2Nyb2xsZWRJbmRleCArIHRoaXMubWF4SXRlbUxlbmd0aCkge1xuICAgICAgdGhpcy5jZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQuc2Nyb2xsVG9JbmRleChpbmRleCB8fCAwKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBsaXN0T2ZDb250YWluZXJJdGVtLCBhY3RpdmF0ZWRWYWx1ZSB9ID0gY2hhbmdlcztcbiAgICBpZiAobGlzdE9mQ29udGFpbmVySXRlbSB8fCBhY3RpdmF0ZWRWYWx1ZSkge1xuICAgICAgdGhpcy5zY3JvbGxUb0FjdGl2YXRlZFZhbHVlKCk7XG4gICAgfVxuICB9XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2Nyb2xsVG9BY3RpdmF0ZWRWYWx1ZSgpKTtcbiAgfVxufVxuIl19