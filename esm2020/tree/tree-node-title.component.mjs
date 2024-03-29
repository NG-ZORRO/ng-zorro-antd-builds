/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./tree-drop-indicator.component";
import * as i2 from "@angular/common";
import * as i3 from "ng-zorro-antd/icon";
import * as i4 from "ng-zorro-antd/core/highlight";
export class NzTreeNodeTitleComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this.treeTemplate = null;
        this.selectMode = false;
        // Drag indicator
        this.showIndicator = true;
    }
    get canDraggable() {
        return this.draggable && !this.isDisabled ? true : null;
    }
    get matchedValue() {
        return this.isMatched ? this.searchValue : '';
    }
    get isSwitcherOpen() {
        return this.isExpanded && !this.isLeaf;
    }
    get isSwitcherClose() {
        return !this.isExpanded && !this.isLeaf;
    }
    ngOnChanges(changes) {
        const { showIndicator, dragPosition } = changes;
        if (showIndicator || dragPosition) {
            this.cdr.markForCheck();
        }
    }
}
NzTreeNodeTitleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeTitleComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NzTreeNodeTitleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeTitleComponent, selector: "nz-tree-node-title", inputs: { searchValue: "searchValue", treeTemplate: "treeTemplate", draggable: "draggable", showIcon: "showIcon", selectMode: "selectMode", context: "context", icon: "icon", title: "title", isLoading: "isLoading", isSelected: "isSelected", isDisabled: "isDisabled", isMatched: "isMatched", isExpanded: "isExpanded", isLeaf: "isLeaf", showIndicator: "showIndicator", dragPosition: "dragPosition" }, host: { properties: { "attr.title": "title", "attr.draggable": "canDraggable", "attr.aria-grabbed": "canDraggable", "class.draggable": "canDraggable", "class.ant-select-tree-node-content-wrapper": "selectMode", "class.ant-select-tree-node-content-wrapper-open": "selectMode && isSwitcherOpen", "class.ant-select-tree-node-content-wrapper-close": "selectMode && isSwitcherClose", "class.ant-select-tree-node-selected": "selectMode && isSelected", "class.ant-tree-node-content-wrapper": "!selectMode", "class.ant-tree-node-content-wrapper-open": "!selectMode && isSwitcherOpen", "class.ant-tree-node-content-wrapper-close": "!selectMode && isSwitcherClose", "class.ant-tree-node-selected": "!selectMode && isSelected" } }, usesOnChanges: true, ngImport: i0, template: `
    <ng-template
      [ngTemplateOutlet]="treeTemplate"
      [ngTemplateOutletContext]="{ $implicit: context, origin: context.origin }"
    ></ng-template>
    <ng-container *ngIf="!treeTemplate">
      <span
        *ngIf="icon && showIcon"
        [class.ant-tree-icon__open]="isSwitcherOpen"
        [class.ant-tree-icon__close]="isSwitcherClose"
        [class.ant-tree-icon_loading]="isLoading"
        [class.ant-select-tree-iconEle]="selectMode"
        [class.ant-tree-iconEle]="!selectMode"
      >
        <span
          [class.ant-select-tree-iconEle]="selectMode"
          [class.ant-select-tree-icon__customize]="selectMode"
          [class.ant-tree-iconEle]="!selectMode"
          [class.ant-tree-icon__customize]="!selectMode"
        >
          <i nz-icon *ngIf="icon" [nzType]="icon"></i>
        </span>
      </span>
      <span class="ant-tree-title" [innerHTML]="title | nzHighlight: matchedValue:'i':'font-highlight'"></span>
      <nz-tree-drop-indicator
        *ngIf="showIndicator"
        [dropPosition]="dragPosition"
        [level]="context.level"
      ></nz-tree-drop-indicator>
    </ng-container>
  `, isInline: true, components: [{ type: i1.NzTreeDropIndicatorComponent, selector: "nz-tree-drop-indicator", inputs: ["dropPosition", "level", "direction"], exportAs: ["NzTreeDropIndicator"] }], directives: [{ type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], pipes: { "nzHighlight": i4.NzHighlightPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeTitleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tree-node-title',
                    template: `
    <ng-template
      [ngTemplateOutlet]="treeTemplate"
      [ngTemplateOutletContext]="{ $implicit: context, origin: context.origin }"
    ></ng-template>
    <ng-container *ngIf="!treeTemplate">
      <span
        *ngIf="icon && showIcon"
        [class.ant-tree-icon__open]="isSwitcherOpen"
        [class.ant-tree-icon__close]="isSwitcherClose"
        [class.ant-tree-icon_loading]="isLoading"
        [class.ant-select-tree-iconEle]="selectMode"
        [class.ant-tree-iconEle]="!selectMode"
      >
        <span
          [class.ant-select-tree-iconEle]="selectMode"
          [class.ant-select-tree-icon__customize]="selectMode"
          [class.ant-tree-iconEle]="!selectMode"
          [class.ant-tree-icon__customize]="!selectMode"
        >
          <i nz-icon *ngIf="icon" [nzType]="icon"></i>
        </span>
      </span>
      <span class="ant-tree-title" [innerHTML]="title | nzHighlight: matchedValue:'i':'font-highlight'"></span>
      <nz-tree-drop-indicator
        *ngIf="showIndicator"
        [dropPosition]="dragPosition"
        [level]="context.level"
      ></nz-tree-drop-indicator>
    </ng-container>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    host: {
                        '[attr.title]': 'title',
                        '[attr.draggable]': 'canDraggable',
                        '[attr.aria-grabbed]': 'canDraggable',
                        '[class.draggable]': 'canDraggable',
                        '[class.ant-select-tree-node-content-wrapper]': `selectMode`,
                        '[class.ant-select-tree-node-content-wrapper-open]': `selectMode && isSwitcherOpen`,
                        '[class.ant-select-tree-node-content-wrapper-close]': `selectMode && isSwitcherClose`,
                        '[class.ant-select-tree-node-selected]': `selectMode && isSelected`,
                        '[class.ant-tree-node-content-wrapper]': `!selectMode`,
                        '[class.ant-tree-node-content-wrapper-open]': `!selectMode && isSwitcherOpen`,
                        '[class.ant-tree-node-content-wrapper-close]': `!selectMode && isSwitcherClose`,
                        '[class.ant-tree-node-selected]': `!selectMode && isSelected`
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { searchValue: [{
                type: Input
            }], treeTemplate: [{
                type: Input
            }], draggable: [{
                type: Input
            }], showIcon: [{
                type: Input
            }], selectMode: [{
                type: Input
            }], context: [{
                type: Input
            }], icon: [{
                type: Input
            }], title: [{
                type: Input
            }], isLoading: [{
                type: Input
            }], isSelected: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], isMatched: [{
                type: Input
            }], isExpanded: [{
                type: Input
            }], isLeaf: [{
                type: Input
            }], showIndicator: [{
                type: Input
            }], dragPosition: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLXRpdGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvdHJlZS90cmVlLW5vZGUtdGl0bGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULEtBQUssRUFJTixNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBc0R2QixNQUFNLE9BQU8sd0JBQXdCO0lBbUNuQyxZQUFvQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQWpDakMsaUJBQVksR0FBNkUsSUFBSSxDQUFDO1FBRzlGLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFVNUIsaUJBQWlCO1FBQ1Isa0JBQWEsR0FBRyxJQUFJLENBQUM7SUFtQmUsQ0FBQztJQWhCOUMsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDMUQsQ0FBQztJQUVELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFFRCxJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN6QyxDQUFDO0lBRUQsSUFBSSxlQUFlO1FBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMxQyxDQUFDO0lBSUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ2hELElBQUksYUFBYSxJQUFJLFlBQVksRUFBRTtZQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQzs7cUhBMUNVLHdCQUF3Qjt5R0FBeEIsd0JBQXdCLDhxQ0FoRHpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4QlQ7MkZBa0JVLHdCQUF3QjtrQkFsRHBDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4QlQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLElBQUksRUFBRTt3QkFDSixjQUFjLEVBQUUsT0FBTzt3QkFDdkIsa0JBQWtCLEVBQUUsY0FBYzt3QkFDbEMscUJBQXFCLEVBQUUsY0FBYzt3QkFDckMsbUJBQW1CLEVBQUUsY0FBYzt3QkFDbkMsOENBQThDLEVBQUUsWUFBWTt3QkFDNUQsbURBQW1ELEVBQUUsOEJBQThCO3dCQUNuRixvREFBb0QsRUFBRSwrQkFBK0I7d0JBQ3JGLHVDQUF1QyxFQUFFLDBCQUEwQjt3QkFDbkUsdUNBQXVDLEVBQUUsYUFBYTt3QkFDdEQsNENBQTRDLEVBQUUsK0JBQStCO3dCQUM3RSw2Q0FBNkMsRUFBRSxnQ0FBZ0M7d0JBQy9FLGdDQUFnQyxFQUFFLDJCQUEyQjtxQkFDOUQ7aUJBQ0Y7d0dBRVUsV0FBVztzQkFBbkIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBRUcsYUFBYTtzQkFBckIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOelRyZWVOb2RlLCBOelRyZWVOb2RlT3B0aW9ucyB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90cmVlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdHJlZS1ub2RlLXRpdGxlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRyZWVUZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IGNvbnRleHQsIG9yaWdpbjogY29udGV4dC5vcmlnaW4gfVwiXG4gICAgPjwvbmctdGVtcGxhdGU+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF0cmVlVGVtcGxhdGVcIj5cbiAgICAgIDxzcGFuXG4gICAgICAgICpuZ0lmPVwiaWNvbiAmJiBzaG93SWNvblwiXG4gICAgICAgIFtjbGFzcy5hbnQtdHJlZS1pY29uX19vcGVuXT1cImlzU3dpdGNoZXJPcGVuXCJcbiAgICAgICAgW2NsYXNzLmFudC10cmVlLWljb25fX2Nsb3NlXT1cImlzU3dpdGNoZXJDbG9zZVwiXG4gICAgICAgIFtjbGFzcy5hbnQtdHJlZS1pY29uX2xvYWRpbmddPVwiaXNMb2FkaW5nXCJcbiAgICAgICAgW2NsYXNzLmFudC1zZWxlY3QtdHJlZS1pY29uRWxlXT1cInNlbGVjdE1vZGVcIlxuICAgICAgICBbY2xhc3MuYW50LXRyZWUtaWNvbkVsZV09XCIhc2VsZWN0TW9kZVwiXG4gICAgICA+XG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgW2NsYXNzLmFudC1zZWxlY3QtdHJlZS1pY29uRWxlXT1cInNlbGVjdE1vZGVcIlxuICAgICAgICAgIFtjbGFzcy5hbnQtc2VsZWN0LXRyZWUtaWNvbl9fY3VzdG9taXplXT1cInNlbGVjdE1vZGVcIlxuICAgICAgICAgIFtjbGFzcy5hbnQtdHJlZS1pY29uRWxlXT1cIiFzZWxlY3RNb2RlXCJcbiAgICAgICAgICBbY2xhc3MuYW50LXRyZWUtaWNvbl9fY3VzdG9taXplXT1cIiFzZWxlY3RNb2RlXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxpIG56LWljb24gKm5nSWY9XCJpY29uXCIgW256VHlwZV09XCJpY29uXCI+PC9pPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImFudC10cmVlLXRpdGxlXCIgW2lubmVySFRNTF09XCJ0aXRsZSB8IG56SGlnaGxpZ2h0OiBtYXRjaGVkVmFsdWU6J2knOidmb250LWhpZ2hsaWdodCdcIj48L3NwYW4+XG4gICAgICA8bnotdHJlZS1kcm9wLWluZGljYXRvclxuICAgICAgICAqbmdJZj1cInNob3dJbmRpY2F0b3JcIlxuICAgICAgICBbZHJvcFBvc2l0aW9uXT1cImRyYWdQb3NpdGlvblwiXG4gICAgICAgIFtsZXZlbF09XCJjb250ZXh0LmxldmVsXCJcbiAgICAgID48L256LXRyZWUtZHJvcC1pbmRpY2F0b3I+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgaG9zdDoge1xuICAgICdbYXR0ci50aXRsZV0nOiAndGl0bGUnLFxuICAgICdbYXR0ci5kcmFnZ2FibGVdJzogJ2NhbkRyYWdnYWJsZScsXG4gICAgJ1thdHRyLmFyaWEtZ3JhYmJlZF0nOiAnY2FuRHJhZ2dhYmxlJyxcbiAgICAnW2NsYXNzLmRyYWdnYWJsZV0nOiAnY2FuRHJhZ2dhYmxlJyxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtdHJlZS1ub2RlLWNvbnRlbnQtd3JhcHBlcl0nOiBgc2VsZWN0TW9kZWAsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LXRyZWUtbm9kZS1jb250ZW50LXdyYXBwZXItb3Blbl0nOiBgc2VsZWN0TW9kZSAmJiBpc1N3aXRjaGVyT3BlbmAsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LXRyZWUtbm9kZS1jb250ZW50LXdyYXBwZXItY2xvc2VdJzogYHNlbGVjdE1vZGUgJiYgaXNTd2l0Y2hlckNsb3NlYCxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtdHJlZS1ub2RlLXNlbGVjdGVkXSc6IGBzZWxlY3RNb2RlICYmIGlzU2VsZWN0ZWRgLFxuICAgICdbY2xhc3MuYW50LXRyZWUtbm9kZS1jb250ZW50LXdyYXBwZXJdJzogYCFzZWxlY3RNb2RlYCxcbiAgICAnW2NsYXNzLmFudC10cmVlLW5vZGUtY29udGVudC13cmFwcGVyLW9wZW5dJzogYCFzZWxlY3RNb2RlICYmIGlzU3dpdGNoZXJPcGVuYCxcbiAgICAnW2NsYXNzLmFudC10cmVlLW5vZGUtY29udGVudC13cmFwcGVyLWNsb3NlXSc6IGAhc2VsZWN0TW9kZSAmJiBpc1N3aXRjaGVyQ2xvc2VgLFxuICAgICdbY2xhc3MuYW50LXRyZWUtbm9kZS1zZWxlY3RlZF0nOiBgIXNlbGVjdE1vZGUgJiYgaXNTZWxlY3RlZGBcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRyZWVOb2RlVGl0bGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBzZWFyY2hWYWx1ZSE6IHN0cmluZztcbiAgQElucHV0KCkgdHJlZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogTnpUcmVlTm9kZTsgb3JpZ2luOiBOelRyZWVOb2RlT3B0aW9ucyB9PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBkcmFnZ2FibGUhOiBib29sZWFuO1xuICBASW5wdXQoKSBzaG93SWNvbiE6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNlbGVjdE1vZGUgPSBmYWxzZTtcbiAgQElucHV0KCkgY29udGV4dCE6IE56VHJlZU5vZGU7XG4gIEBJbnB1dCgpIGljb24hOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRpdGxlITogc3RyaW5nO1xuICBASW5wdXQoKSBpc0xvYWRpbmchOiBib29sZWFuO1xuICBASW5wdXQoKSBpc1NlbGVjdGVkITogYm9vbGVhbjtcbiAgQElucHV0KCkgaXNEaXNhYmxlZCE6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGlzTWF0Y2hlZCE6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGlzRXhwYW5kZWQhOiBib29sZWFuO1xuICBASW5wdXQoKSBpc0xlYWYhOiBib29sZWFuO1xuICAvLyBEcmFnIGluZGljYXRvclxuICBASW5wdXQoKSBzaG93SW5kaWNhdG9yID0gdHJ1ZTtcbiAgQElucHV0KCkgZHJhZ1Bvc2l0aW9uPzogbnVtYmVyO1xuXG4gIGdldCBjYW5EcmFnZ2FibGUoKTogYm9vbGVhbiB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmRyYWdnYWJsZSAmJiAhdGhpcy5pc0Rpc2FibGVkID8gdHJ1ZSA6IG51bGw7XG4gIH1cblxuICBnZXQgbWF0Y2hlZFZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaXNNYXRjaGVkID8gdGhpcy5zZWFyY2hWYWx1ZSA6ICcnO1xuICB9XG5cbiAgZ2V0IGlzU3dpdGNoZXJPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzRXhwYW5kZWQgJiYgIXRoaXMuaXNMZWFmO1xuICB9XG5cbiAgZ2V0IGlzU3dpdGNoZXJDbG9zZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaXNFeHBhbmRlZCAmJiAhdGhpcy5pc0xlYWY7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgc2hvd0luZGljYXRvciwgZHJhZ1Bvc2l0aW9uIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChzaG93SW5kaWNhdG9yIHx8IGRyYWdQb3NpdGlvbikge1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG59XG4iXX0=