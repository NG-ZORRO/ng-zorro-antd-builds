/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/empty";
import * as i2 from "@angular/cdk/scrolling";
import * as i3 from "./option-item-group.component";
import * as i4 from "./option-item.component";
import * as i5 from "@angular/common";
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
    onItemClick(value) {
        this.itemClick.emit(value);
    }
    onItemHover(value) {
        // TODO: keydown.enter won't activate this value
        this.activatedValue = value;
    }
    trackValue(_index, option) {
        return option.key;
    }
    onScrolledIndexChange(index) {
        this.scrolledIndex = index;
        if (index === this.listOfContainerItem.length - this.maxItemLength) {
            this.scrollToBottom.emit();
        }
    }
    scrollToActivatedValue() {
        const index = this.listOfContainerItem.findIndex(item => this.compareWith(item.key, this.activatedValue));
        if (index < this.scrolledIndex || index >= this.scrolledIndex + this.maxItemLength) {
            this.cdkVirtualScrollViewport.scrollToIndex(index || 0);
        }
    }
    ngOnChanges(changes) {
        const { listOfContainerItem, activatedValue } = changes;
        if (listOfContainerItem || activatedValue) {
            this.scrollToActivatedValue();
        }
    }
    ngAfterViewInit() {
        setTimeout(() => this.scrollToActivatedValue());
    }
}
NzOptionContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOptionContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzOptionContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzOptionContainerComponent, selector: "nz-option-container", inputs: { notFoundContent: "notFoundContent", menuItemSelectedIcon: "menuItemSelectedIcon", dropdownRender: "dropdownRender", activatedValue: "activatedValue", listOfSelectedValue: "listOfSelectedValue", compareWith: "compareWith", mode: "mode", matchWidth: "matchWidth", itemSize: "itemSize", maxItemLength: "maxItemLength", listOfContainerItem: "listOfContainerItem" }, outputs: { itemClick: "itemClick", scrollToBottom: "scrollToBottom" }, host: { classAttribute: "ant-select-dropdown" }, viewQueries: [{ propertyName: "cdkVirtualScrollViewport", first: true, predicate: CdkVirtualScrollViewport, descendants: true, static: true }], exportAs: ["nzOptionContainer"], usesOnChanges: true, ngImport: i0, template: `
    <div>
      <div *ngIf="listOfContainerItem.length === 0" class="ant-select-item-empty">
        <nz-embed-empty nzComponentName="select" [specificContent]="notFoundContent!"></nz-embed-empty>
      </div>
      <cdk-virtual-scroll-viewport
        [class.full-width]="!matchWidth"
        [itemSize]="itemSize"
        [maxBufferPx]="itemSize * maxItemLength"
        [minBufferPx]="itemSize * maxItemLength"
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
  `, isInline: true, components: [{ type: i1.NzEmbedEmptyComponent, selector: "nz-embed-empty", inputs: ["nzComponentName", "specificContent"], exportAs: ["nzEmbedEmpty"] }, { type: i2.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }, { type: i3.NzOptionItemGroupComponent, selector: "nz-option-item-group", inputs: ["nzLabel"] }, { type: i4.NzOptionItemComponent, selector: "nz-option-item", inputs: ["grouped", "customContent", "template", "disabled", "showState", "label", "value", "activatedValue", "listOfSelectedValue", "icon", "compareWith"], outputs: ["itemClick", "itemHover"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { type: i2.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { type: i5.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i5.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOptionContainerComponent, decorators: [{
            type: Component,
            args: [{
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
        [minBufferPx]="itemSize * maxItemLength"
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
                    host: { class: 'ant-select-dropdown' }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { notFoundContent: [{
                type: Input
            }], menuItemSelectedIcon: [{
                type: Input
            }], dropdownRender: [{
                type: Input
            }], activatedValue: [{
                type: Input
            }], listOfSelectedValue: [{
                type: Input
            }], compareWith: [{
                type: Input
            }], mode: [{
                type: Input
            }], matchWidth: [{
                type: Input
            }], itemSize: [{
                type: Input
            }], maxItemLength: [{
                type: Input
            }], listOfContainerItem: [{
                type: Input
            }], itemClick: [{
                type: Output
            }], scrollToBottom: [{
                type: Output
            }], cdkVirtualScrollViewport: [{
                type: ViewChild,
                args: [CdkVirtualScrollViewport, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3NlbGVjdC9vcHRpb24tY29udGFpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFHTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDOzs7Ozs7O0FBMkR2QixNQUFNLE9BQU8sMEJBQTBCO0lBaUJyQztRQWhCUyxvQkFBZSxHQUFnRCxTQUFTLENBQUM7UUFDekUseUJBQW9CLEdBQWtDLElBQUksQ0FBQztRQUMzRCxtQkFBYyxHQUFrQyxJQUFJLENBQUM7UUFDckQsbUJBQWMsR0FBcUIsSUFBSSxDQUFDO1FBQ3hDLHdCQUFtQixHQUFnQixFQUFFLENBQUM7UUFFdEMsU0FBSSxHQUFxQixTQUFTLENBQUM7UUFDbkMsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2Qsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsd0JBQW1CLEdBQTRCLEVBQUUsQ0FBQztRQUN4QyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQWEsQ0FBQztRQUMxQyxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFFckQsa0JBQWEsR0FBRyxDQUFDLENBQUM7SUFFWCxDQUFDO0lBRWhCLFdBQVcsQ0FBQyxLQUFnQjtRQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQWdCO1FBQzFCLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBRUQsVUFBVSxDQUFDLE1BQWMsRUFBRSxNQUE2QjtRQUN0RCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQUVELHFCQUFxQixDQUFDLEtBQWE7UUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2xFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBRUQsc0JBQXNCO1FBQ3BCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDMUcsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2xGLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxhQUFhLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsY0FBYyxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ3hELElBQUksbUJBQW1CLElBQUksY0FBYyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1NBQy9CO0lBQ0gsQ0FBQztJQUNELGVBQWU7UUFDYixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDOzt1SEF0RFUsMEJBQTBCOzJHQUExQiwwQkFBMEIsaW1CQWMxQix3QkFBd0Isb0hBN0R6Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Q1Q7MkZBR1UsMEJBQTBCO2tCQXJEdEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Q1Q7b0JBQ0QsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFO2lCQUN2QzswRUFFVSxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csbUJBQW1CO3NCQUEzQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFDYSxTQUFTO3NCQUEzQixNQUFNO2dCQUNZLGNBQWM7c0JBQWhDLE1BQU07Z0JBQ2dELHdCQUF3QjtzQkFBOUUsU0FBUzt1QkFBQyx3QkFBd0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgTnpTZWxlY3RJdGVtSW50ZXJmYWNlLCBOelNlbGVjdE1vZGVUeXBlIH0gZnJvbSAnLi9zZWxlY3QudHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1vcHRpb24tY29udGFpbmVyJyxcbiAgZXhwb3J0QXM6ICduek9wdGlvbkNvbnRhaW5lcicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2PlxuICAgICAgPGRpdiAqbmdJZj1cImxpc3RPZkNvbnRhaW5lckl0ZW0ubGVuZ3RoID09PSAwXCIgY2xhc3M9XCJhbnQtc2VsZWN0LWl0ZW0tZW1wdHlcIj5cbiAgICAgICAgPG56LWVtYmVkLWVtcHR5IG56Q29tcG9uZW50TmFtZT1cInNlbGVjdFwiIFtzcGVjaWZpY0NvbnRlbnRdPVwibm90Rm91bmRDb250ZW50IVwiPjwvbnotZW1iZWQtZW1wdHk+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxjZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnRcbiAgICAgICAgW2NsYXNzLmZ1bGwtd2lkdGhdPVwiIW1hdGNoV2lkdGhcIlxuICAgICAgICBbaXRlbVNpemVdPVwiaXRlbVNpemVcIlxuICAgICAgICBbbWF4QnVmZmVyUHhdPVwiaXRlbVNpemUgKiBtYXhJdGVtTGVuZ3RoXCJcbiAgICAgICAgW21pbkJ1ZmZlclB4XT1cIml0ZW1TaXplICogbWF4SXRlbUxlbmd0aFwiXG4gICAgICAgIChzY3JvbGxlZEluZGV4Q2hhbmdlKT1cIm9uU2Nyb2xsZWRJbmRleENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJsaXN0T2ZDb250YWluZXJJdGVtLmxlbmd0aCAqIGl0ZW1TaXplXCJcbiAgICAgICAgW3N0eWxlLm1heC1oZWlnaHQucHhdPVwiaXRlbVNpemUgKiBtYXhJdGVtTGVuZ3RoXCJcbiAgICAgID5cbiAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgY2RrVmlydHVhbEZvclxuICAgICAgICAgIFtjZGtWaXJ0dWFsRm9yT2ZdPVwibGlzdE9mQ29udGFpbmVySXRlbVwiXG4gICAgICAgICAgW2Nka1ZpcnR1YWxGb3JUcmFja0J5XT1cInRyYWNrVmFsdWVcIlxuICAgICAgICAgIFtjZGtWaXJ0dWFsRm9yVGVtcGxhdGVDYWNoZVNpemVdPVwiMFwiXG4gICAgICAgICAgbGV0LWl0ZW1cbiAgICAgICAgPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cIml0ZW0udHlwZVwiPlxuICAgICAgICAgICAgPG56LW9wdGlvbi1pdGVtLWdyb3VwICpuZ1N3aXRjaENhc2U9XCInZ3JvdXAnXCIgW256TGFiZWxdPVwiaXRlbS5ncm91cExhYmVsXCI+PC9uei1vcHRpb24taXRlbS1ncm91cD5cbiAgICAgICAgICAgIDxuei1vcHRpb24taXRlbVxuICAgICAgICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ2l0ZW0nXCJcbiAgICAgICAgICAgICAgW2ljb25dPVwibWVudUl0ZW1TZWxlY3RlZEljb25cIlxuICAgICAgICAgICAgICBbY3VzdG9tQ29udGVudF09XCJpdGVtLm56Q3VzdG9tQ29udGVudFwiXG4gICAgICAgICAgICAgIFt0ZW1wbGF0ZV09XCJpdGVtLnRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgW2dyb3VwZWRdPVwiISFpdGVtLmdyb3VwTGFiZWxcIlxuICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiaXRlbS5uekRpc2FibGVkXCJcbiAgICAgICAgICAgICAgW3Nob3dTdGF0ZV09XCJtb2RlID09PSAndGFncycgfHwgbW9kZSA9PT0gJ211bHRpcGxlJ1wiXG4gICAgICAgICAgICAgIFtsYWJlbF09XCJpdGVtLm56TGFiZWxcIlxuICAgICAgICAgICAgICBbY29tcGFyZVdpdGhdPVwiY29tcGFyZVdpdGhcIlxuICAgICAgICAgICAgICBbYWN0aXZhdGVkVmFsdWVdPVwiYWN0aXZhdGVkVmFsdWVcIlxuICAgICAgICAgICAgICBbbGlzdE9mU2VsZWN0ZWRWYWx1ZV09XCJsaXN0T2ZTZWxlY3RlZFZhbHVlXCJcbiAgICAgICAgICAgICAgW3ZhbHVlXT1cIml0ZW0ubnpWYWx1ZVwiXG4gICAgICAgICAgICAgIChpdGVtSG92ZXIpPVwib25JdGVtSG92ZXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgIChpdGVtQ2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICA+PC9uei1vcHRpb24taXRlbT5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0PlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImRyb3Bkb3duUmVuZGVyXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDogeyBjbGFzczogJ2FudC1zZWxlY3QtZHJvcGRvd24nIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpPcHRpb25Db250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBub3RGb3VuZENvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIG1lbnVJdGVtU2VsZWN0ZWRJY29uOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGRyb3Bkb3duUmVuZGVyOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGFjdGl2YXRlZFZhbHVlOiBOelNhZmVBbnkgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbGlzdE9mU2VsZWN0ZWRWYWx1ZTogTnpTYWZlQW55W10gPSBbXTtcbiAgQElucHV0KCkgY29tcGFyZVdpdGghOiAobzE6IE56U2FmZUFueSwgbzI6IE56U2FmZUFueSkgPT4gYm9vbGVhbjtcbiAgQElucHV0KCkgbW9kZTogTnpTZWxlY3RNb2RlVHlwZSA9ICdkZWZhdWx0JztcbiAgQElucHV0KCkgbWF0Y2hXaWR0aCA9IHRydWU7XG4gIEBJbnB1dCgpIGl0ZW1TaXplID0gMzI7XG4gIEBJbnB1dCgpIG1heEl0ZW1MZW5ndGggPSA4O1xuICBASW5wdXQoKSBsaXN0T2ZDb250YWluZXJJdGVtOiBOelNlbGVjdEl0ZW1JbnRlcmZhY2VbXSA9IFtdO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgaXRlbUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxOelNhZmVBbnk+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBzY3JvbGxUb0JvdHRvbSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQFZpZXdDaGlsZChDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQsIHsgc3RhdGljOiB0cnVlIH0pIGNka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCE6IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydDtcbiAgcHJpdmF0ZSBzY3JvbGxlZEluZGV4ID0gMDtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgb25JdGVtQ2xpY2sodmFsdWU6IE56U2FmZUFueSk6IHZvaWQge1xuICAgIHRoaXMuaXRlbUNsaWNrLmVtaXQodmFsdWUpO1xuICB9XG5cbiAgb25JdGVtSG92ZXIodmFsdWU6IE56U2FmZUFueSk6IHZvaWQge1xuICAgIC8vIFRPRE86IGtleWRvd24uZW50ZXIgd29uJ3QgYWN0aXZhdGUgdGhpcyB2YWx1ZVxuICAgIHRoaXMuYWN0aXZhdGVkVmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHRyYWNrVmFsdWUoX2luZGV4OiBudW1iZXIsIG9wdGlvbjogTnpTZWxlY3RJdGVtSW50ZXJmYWNlKTogTnpTYWZlQW55IHtcbiAgICByZXR1cm4gb3B0aW9uLmtleTtcbiAgfVxuXG4gIG9uU2Nyb2xsZWRJbmRleENoYW5nZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zY3JvbGxlZEluZGV4ID0gaW5kZXg7XG4gICAgaWYgKGluZGV4ID09PSB0aGlzLmxpc3RPZkNvbnRhaW5lckl0ZW0ubGVuZ3RoIC0gdGhpcy5tYXhJdGVtTGVuZ3RoKSB7XG4gICAgICB0aGlzLnNjcm9sbFRvQm90dG9tLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICBzY3JvbGxUb0FjdGl2YXRlZFZhbHVlKCk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5saXN0T2ZDb250YWluZXJJdGVtLmZpbmRJbmRleChpdGVtID0+IHRoaXMuY29tcGFyZVdpdGgoaXRlbS5rZXksIHRoaXMuYWN0aXZhdGVkVmFsdWUpKTtcbiAgICBpZiAoaW5kZXggPCB0aGlzLnNjcm9sbGVkSW5kZXggfHwgaW5kZXggPj0gdGhpcy5zY3JvbGxlZEluZGV4ICsgdGhpcy5tYXhJdGVtTGVuZ3RoKSB7XG4gICAgICB0aGlzLmNka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydC5zY3JvbGxUb0luZGV4KGluZGV4IHx8IDApO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IGxpc3RPZkNvbnRhaW5lckl0ZW0sIGFjdGl2YXRlZFZhbHVlIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChsaXN0T2ZDb250YWluZXJJdGVtIHx8IGFjdGl2YXRlZFZhbHVlKSB7XG4gICAgICB0aGlzLnNjcm9sbFRvQWN0aXZhdGVkVmFsdWUoKTtcbiAgICB9XG4gIH1cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zY3JvbGxUb0FjdGl2YXRlZFZhbHVlKCkpO1xuICB9XG59XG4iXX0=