/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { CdkTree, CdkTreeNodeOutletContext } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { NzTreeNodeOutletDirective } from './outlet';
import { NzTreeView } from './tree';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/scrolling";
import * as i2 from "./node";
import * as i3 from "./outlet";
const DEFAULT_SIZE = 28;
export class NzTreeVirtualScrollViewComponent extends NzTreeView {
    constructor() {
        super(...arguments);
        this.nzItemSize = DEFAULT_SIZE;
        this.nzMinBufferPx = DEFAULT_SIZE * 5;
        this.nzMaxBufferPx = DEFAULT_SIZE * 10;
        this.nodes = [];
        this.innerTrackBy = i => i;
    }
    ngOnChanges(changes) {
        if (changes.trackBy) {
            if (typeof changes.trackBy.currentValue === 'function') {
                this.innerTrackBy = (index, n) => this.trackBy(index, n.data);
            }
            else {
                this.innerTrackBy = i => i;
            }
        }
    }
    renderNodeChanges(data) {
        this.nodes = new Array(...data).map((n, i) => this.createNode(n, i));
        this._dataSourceChanged.next();
    }
    createNode(nodeData, index) {
        const node = this._getNodeDef(nodeData, index);
        const context = new CdkTreeNodeOutletContext(nodeData);
        if (this.treeControl.getLevel) {
            context.level = this.treeControl.getLevel(nodeData);
        }
        else {
            context.level = 0;
        }
        return {
            data: nodeData,
            context,
            nodeDef: node
        };
    }
}
NzTreeVirtualScrollViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeVirtualScrollViewComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
NzTreeVirtualScrollViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeVirtualScrollViewComponent, selector: "nz-tree-virtual-scroll-view", inputs: { nzItemSize: "nzItemSize", nzMinBufferPx: "nzMinBufferPx", nzMaxBufferPx: "nzMaxBufferPx", trackBy: "trackBy" }, host: { properties: { "class.ant-tree-block-node": "nzDirectoryTree || nzBlockNode", "class.ant-tree-directory": "nzDirectoryTree", "class.ant-tree-rtl": "dir === 'rtl'" }, classAttribute: "ant-tree" }, providers: [
        { provide: NzTreeView, useExisting: NzTreeVirtualScrollViewComponent },
        { provide: CdkTree, useExisting: NzTreeVirtualScrollViewComponent }
    ], viewQueries: [{ propertyName: "nodeOutlet", first: true, predicate: NzTreeNodeOutletDirective, descendants: true, static: true }, { propertyName: "virtualScrollViewport", first: true, predicate: CdkVirtualScrollViewport, descendants: true, static: true }], exportAs: ["nzTreeVirtualScrollView"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: `
    <div class="ant-tree-list">
      <cdk-virtual-scroll-viewport
        class="ant-tree-list-holder"
        [itemSize]="nzItemSize"
        [minBufferPx]="nzMinBufferPx"
        [maxBufferPx]="nzMaxBufferPx"
      >
        <ng-container *cdkVirtualFor="let item of nodes; let i = index; trackBy: innerTrackBy">
          <ng-template nzTreeVirtualScrollNodeOutlet [data]="item"></ng-template>
        </ng-container>
      </cdk-virtual-scroll-viewport>
    </div>
    <ng-container nzTreeNodeOutlet></ng-container>
  `, isInline: true, components: [{ type: i1.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }], directives: [{ type: i1.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { type: i1.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { type: i2.NzTreeVirtualScrollNodeOutletDirective, selector: "[nzTreeVirtualScrollNodeOutlet]", inputs: ["data"] }, { type: i3.NzTreeNodeOutletDirective, selector: "[nzTreeNodeOutlet]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeVirtualScrollViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tree-virtual-scroll-view',
                    exportAs: 'nzTreeVirtualScrollView',
                    template: `
    <div class="ant-tree-list">
      <cdk-virtual-scroll-viewport
        class="ant-tree-list-holder"
        [itemSize]="nzItemSize"
        [minBufferPx]="nzMinBufferPx"
        [maxBufferPx]="nzMaxBufferPx"
      >
        <ng-container *cdkVirtualFor="let item of nodes; let i = index; trackBy: innerTrackBy">
          <ng-template nzTreeVirtualScrollNodeOutlet [data]="item"></ng-template>
        </ng-container>
      </cdk-virtual-scroll-viewport>
    </div>
    <ng-container nzTreeNodeOutlet></ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        { provide: NzTreeView, useExisting: NzTreeVirtualScrollViewComponent },
                        { provide: CdkTree, useExisting: NzTreeVirtualScrollViewComponent }
                    ],
                    host: {
                        class: 'ant-tree',
                        '[class.ant-tree-block-node]': 'nzDirectoryTree || nzBlockNode',
                        '[class.ant-tree-directory]': 'nzDirectoryTree',
                        '[class.ant-tree-rtl]': `dir === 'rtl'`
                    }
                }]
        }], propDecorators: { nodeOutlet: [{
                type: ViewChild,
                args: [NzTreeNodeOutletDirective, { static: true }]
            }], virtualScrollViewport: [{
                type: ViewChild,
                args: [CdkVirtualScrollViewport, { static: true }]
            }], nzItemSize: [{
                type: Input
            }], nzMinBufferPx: [{
                type: Input
            }], nzMaxBufferPx: [{
                type: Input
            }], trackBy: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aXJ0dWFsLXNjcm9sbC12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy90cmVlLXZpZXcvdHJlZS12aXJ0dWFsLXNjcm9sbC12aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxLQUFLLEVBSUwsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7Ozs7QUFFcEMsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBaUN4QixNQUFNLE9BQU8sZ0NBQW9DLFNBQVEsVUFBYTtJQS9CdEU7O1FBbUNXLGVBQVUsR0FBRyxZQUFZLENBQUM7UUFDMUIsa0JBQWEsR0FBRyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLGtCQUFhLEdBQUcsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUUzQyxVQUFLLEdBQW9DLEVBQUUsQ0FBQztRQUM1QyxpQkFBWSxHQUE4QyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztLQStCbEU7SUE3QkMsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNuQixJQUFJLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEtBQUssVUFBVSxFQUFFO2dCQUN0RCxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsS0FBYSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3ZFO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDNUI7U0FDRjtJQUNILENBQUM7SUFFUSxpQkFBaUIsQ0FBQyxJQUF3QjtRQUNqRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVPLFVBQVUsQ0FBQyxRQUFXLEVBQUUsS0FBYTtRQUMzQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvQyxNQUFNLE9BQU8sR0FBRyxJQUFJLHdCQUF3QixDQUFJLFFBQVEsQ0FBQyxDQUFDO1FBQzFELElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUU7WUFDN0IsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNyRDthQUFNO1lBQ0wsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDbkI7UUFDRCxPQUFPO1lBQ0wsSUFBSSxFQUFFLFFBQVE7WUFDZCxPQUFPO1lBQ1AsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDO0lBQ0osQ0FBQzs7NkhBdkNVLGdDQUFnQztpSEFBaEMsZ0NBQWdDLDJYQVhoQztRQUNULEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsZ0NBQWdDLEVBQUU7UUFDdEUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxnQ0FBZ0MsRUFBRTtLQUNwRSxzRUFTVSx5QkFBeUIsc0dBQ3pCLHdCQUF3QixpSkE5QnpCOzs7Ozs7Ozs7Ozs7OztHQWNUOzJGQWNVLGdDQUFnQztrQkEvQjVDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtvQkFDdkMsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztHQWNUO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsU0FBUyxFQUFFO3dCQUNULEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLGtDQUFrQyxFQUFFO3dCQUN0RSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxrQ0FBa0MsRUFBRTtxQkFDcEU7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxVQUFVO3dCQUNqQiw2QkFBNkIsRUFBRSxnQ0FBZ0M7d0JBQy9ELDRCQUE0QixFQUFFLGlCQUFpQjt3QkFDL0Msc0JBQXNCLEVBQUUsZUFBZTtxQkFDeEM7aUJBQ0Y7OEJBRWtFLFVBQVU7c0JBQTFFLFNBQVM7dUJBQUMseUJBQXlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUNVLHFCQUFxQjtzQkFBcEYsU0FBUzt1QkFBQyx3QkFBd0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBRTVDLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNZLE9BQU87c0JBQXhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IENka1RyZWUsIENka1RyZWVOb2RlT3V0bGV0Q29udGV4dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90cmVlJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRyYWNrQnlGdW5jdGlvbixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpUcmVlVmlydHVhbE5vZGVEYXRhIH0gZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7IE56VHJlZU5vZGVPdXRsZXREaXJlY3RpdmUgfSBmcm9tICcuL291dGxldCc7XG5pbXBvcnQgeyBOelRyZWVWaWV3IH0gZnJvbSAnLi90cmVlJztcblxuY29uc3QgREVGQVVMVF9TSVpFID0gMjg7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXRyZWUtdmlydHVhbC1zY3JvbGwtdmlldycsXG4gIGV4cG9ydEFzOiAnbnpUcmVlVmlydHVhbFNjcm9sbFZpZXcnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJhbnQtdHJlZS1saXN0XCI+XG4gICAgICA8Y2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0XG4gICAgICAgIGNsYXNzPVwiYW50LXRyZWUtbGlzdC1ob2xkZXJcIlxuICAgICAgICBbaXRlbVNpemVdPVwibnpJdGVtU2l6ZVwiXG4gICAgICAgIFttaW5CdWZmZXJQeF09XCJuek1pbkJ1ZmZlclB4XCJcbiAgICAgICAgW21heEJ1ZmZlclB4XT1cIm56TWF4QnVmZmVyUHhcIlxuICAgICAgPlxuICAgICAgICA8bmctY29udGFpbmVyICpjZGtWaXJ0dWFsRm9yPVwibGV0IGl0ZW0gb2Ygbm9kZXM7IGxldCBpID0gaW5kZXg7IHRyYWNrQnk6IGlubmVyVHJhY2tCeVwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuelRyZWVWaXJ0dWFsU2Nyb2xsTm9kZU91dGxldCBbZGF0YV09XCJpdGVtXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2Nkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydD5cbiAgICA8L2Rpdj5cbiAgICA8bmctY29udGFpbmVyIG56VHJlZU5vZGVPdXRsZXQ+PC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IE56VHJlZVZpZXcsIHVzZUV4aXN0aW5nOiBOelRyZWVWaXJ0dWFsU2Nyb2xsVmlld0NvbXBvbmVudCB9LFxuICAgIHsgcHJvdmlkZTogQ2RrVHJlZSwgdXNlRXhpc3Rpbmc6IE56VHJlZVZpcnR1YWxTY3JvbGxWaWV3Q29tcG9uZW50IH1cbiAgXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LXRyZWUnLFxuICAgICdbY2xhc3MuYW50LXRyZWUtYmxvY2stbm9kZV0nOiAnbnpEaXJlY3RvcnlUcmVlIHx8IG56QmxvY2tOb2RlJyxcbiAgICAnW2NsYXNzLmFudC10cmVlLWRpcmVjdG9yeV0nOiAnbnpEaXJlY3RvcnlUcmVlJyxcbiAgICAnW2NsYXNzLmFudC10cmVlLXJ0bF0nOiBgZGlyID09PSAncnRsJ2BcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRyZWVWaXJ0dWFsU2Nyb2xsVmlld0NvbXBvbmVudDxUPiBleHRlbmRzIE56VHJlZVZpZXc8VD4gaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBAVmlld0NoaWxkKE56VHJlZU5vZGVPdXRsZXREaXJlY3RpdmUsIHsgc3RhdGljOiB0cnVlIH0pIHJlYWRvbmx5IG5vZGVPdXRsZXQhOiBOelRyZWVOb2RlT3V0bGV0RGlyZWN0aXZlO1xuICBAVmlld0NoaWxkKENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCwgeyBzdGF0aWM6IHRydWUgfSkgcmVhZG9ubHkgdmlydHVhbFNjcm9sbFZpZXdwb3J0ITogQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0O1xuXG4gIEBJbnB1dCgpIG56SXRlbVNpemUgPSBERUZBVUxUX1NJWkU7XG4gIEBJbnB1dCgpIG56TWluQnVmZmVyUHggPSBERUZBVUxUX1NJWkUgKiA1O1xuICBASW5wdXQoKSBuek1heEJ1ZmZlclB4ID0gREVGQVVMVF9TSVpFICogMTA7XG4gIEBJbnB1dCgpIG92ZXJyaWRlIHRyYWNrQnkhOiBUcmFja0J5RnVuY3Rpb248VD47XG4gIG5vZGVzOiBBcnJheTxOelRyZWVWaXJ0dWFsTm9kZURhdGE8VD4+ID0gW107XG4gIGlubmVyVHJhY2tCeTogVHJhY2tCeUZ1bmN0aW9uPE56VHJlZVZpcnR1YWxOb2RlRGF0YTxUPj4gPSBpID0+IGk7XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLnRyYWNrQnkpIHtcbiAgICAgIGlmICh0eXBlb2YgY2hhbmdlcy50cmFja0J5LmN1cnJlbnRWYWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLmlubmVyVHJhY2tCeSA9IChpbmRleDogbnVtYmVyLCBuKSA9PiB0aGlzLnRyYWNrQnkoaW5kZXgsIG4uZGF0YSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmlubmVyVHJhY2tCeSA9IGkgPT4gaTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvdmVycmlkZSByZW5kZXJOb2RlQ2hhbmdlcyhkYXRhOiBUW10gfCByZWFkb25seSBUW10pOiB2b2lkIHtcbiAgICB0aGlzLm5vZGVzID0gbmV3IEFycmF5KC4uLmRhdGEpLm1hcCgobiwgaSkgPT4gdGhpcy5jcmVhdGVOb2RlKG4sIGkpKTtcbiAgICB0aGlzLl9kYXRhU291cmNlQ2hhbmdlZC5uZXh0KCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZU5vZGUobm9kZURhdGE6IFQsIGluZGV4OiBudW1iZXIpOiBOelRyZWVWaXJ0dWFsTm9kZURhdGE8VD4ge1xuICAgIGNvbnN0IG5vZGUgPSB0aGlzLl9nZXROb2RlRGVmKG5vZGVEYXRhLCBpbmRleCk7XG4gICAgY29uc3QgY29udGV4dCA9IG5ldyBDZGtUcmVlTm9kZU91dGxldENvbnRleHQ8VD4obm9kZURhdGEpO1xuICAgIGlmICh0aGlzLnRyZWVDb250cm9sLmdldExldmVsKSB7XG4gICAgICBjb250ZXh0LmxldmVsID0gdGhpcy50cmVlQ29udHJvbC5nZXRMZXZlbChub2RlRGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRleHQubGV2ZWwgPSAwO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogbm9kZURhdGEsXG4gICAgICBjb250ZXh0LFxuICAgICAgbm9kZURlZjogbm9kZVxuICAgIH07XG4gIH1cbn1cbiJdfQ==