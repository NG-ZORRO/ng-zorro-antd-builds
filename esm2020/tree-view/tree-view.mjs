/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CdkTree } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { treeCollapseMotion } from 'ng-zorro-antd/core/animation';
import { NzTreeNodeOutletDirective } from './outlet';
import { NzTreeView } from './tree';
import * as i0 from "@angular/core";
import * as i1 from "./outlet";
export class NzTreeViewComponent extends NzTreeView {
    constructor() {
        super(...arguments);
        this._afterViewInit = false;
    }
    ngAfterViewInit() {
        Promise.resolve().then(() => {
            this._afterViewInit = true;
            this.changeDetectorRef.markForCheck();
        });
    }
}
NzTreeViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeViewComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
NzTreeViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeViewComponent, selector: "nz-tree-view", host: { properties: { "class.ant-tree-block-node": "nzDirectoryTree || nzBlockNode", "class.ant-tree-directory": "nzDirectoryTree", "class.ant-tree-rtl": "dir === 'rtl'" }, classAttribute: "ant-tree" }, providers: [
        { provide: CdkTree, useExisting: NzTreeViewComponent },
        { provide: NzTreeView, useExisting: NzTreeViewComponent }
    ], viewQueries: [{ propertyName: "nodeOutlet", first: true, predicate: NzTreeNodeOutletDirective, descendants: true, static: true }], exportAs: ["nzTreeView"], usesInheritance: true, ngImport: i0, template: `
    <div class="ant-tree-list-holder">
      <div
        [@.disabled]="!_afterViewInit || noAnimation?.nzNoAnimation"
        [@treeCollapseMotion]="_nodeOutlet.viewContainer.length"
        class="ant-tree-list-holder-inner"
      >
        <ng-container nzTreeNodeOutlet></ng-container>
      </div>
    </div>
  `, isInline: true, directives: [{ type: i1.NzTreeNodeOutletDirective, selector: "[nzTreeNodeOutlet]" }], animations: [treeCollapseMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tree-view',
                    exportAs: 'nzTreeView',
                    template: `
    <div class="ant-tree-list-holder">
      <div
        [@.disabled]="!_afterViewInit || noAnimation?.nzNoAnimation"
        [@treeCollapseMotion]="_nodeOutlet.viewContainer.length"
        class="ant-tree-list-holder-inner"
      >
        <ng-container nzTreeNodeOutlet></ng-container>
      </div>
    </div>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        { provide: CdkTree, useExisting: NzTreeViewComponent },
                        { provide: NzTreeView, useExisting: NzTreeViewComponent }
                    ],
                    host: {
                        class: 'ant-tree',
                        '[class.ant-tree-block-node]': 'nzDirectoryTree || nzBlockNode',
                        '[class.ant-tree-directory]': 'nzDirectoryTree',
                        '[class.ant-tree-rtl]': `dir === 'rtl'`
                    },
                    animations: [treeCollapseMotion]
                }]
        }], propDecorators: { nodeOutlet: [{
                type: ViewChild,
                args: [NzTreeNodeOutletDirective, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy90cmVlLXZpZXcvdHJlZS12aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM1QyxPQUFPLEVBQWlCLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFaEgsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFbEUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxRQUFRLENBQUM7OztBQThCcEMsTUFBTSxPQUFPLG1CQUF1QixTQUFRLFVBQWE7SUE1QnpEOztRQThCRSxtQkFBYyxHQUFHLEtBQUssQ0FBQztLQU94QjtJQU5DLGVBQWU7UUFDYixPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUMxQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUMzQixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztnSEFSVSxtQkFBbUI7b0dBQW5CLG1CQUFtQixrUEFabkI7UUFDVCxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFO1FBQ3RELEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUU7S0FDMUQsc0VBVVUseUJBQXlCLCtHQTFCMUI7Ozs7Ozs7Ozs7R0FVVCxvSEFhVyxDQUFDLGtCQUFrQixDQUFDOzJGQUVyQixtQkFBbUI7a0JBNUIvQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QixRQUFRLEVBQUUsWUFBWTtvQkFDdEIsUUFBUSxFQUFFOzs7Ozs7Ozs7O0dBVVQ7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxTQUFTLEVBQUU7d0JBQ1QsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcscUJBQXFCLEVBQUU7d0JBQ3RELEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLHFCQUFxQixFQUFFO3FCQUMxRDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLFVBQVU7d0JBQ2pCLDZCQUE2QixFQUFFLGdDQUFnQzt3QkFDL0QsNEJBQTRCLEVBQUUsaUJBQWlCO3dCQUMvQyxzQkFBc0IsRUFBRSxlQUFlO3FCQUN4QztvQkFDRCxVQUFVLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztpQkFDakM7OEJBRXlELFVBQVU7c0JBQWpFLFNBQVM7dUJBQUMseUJBQXlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2RrVHJlZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90cmVlJztcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgdHJlZUNvbGxhcHNlTW90aW9uIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2FuaW1hdGlvbic7XG5cbmltcG9ydCB7IE56VHJlZU5vZGVPdXRsZXREaXJlY3RpdmUgfSBmcm9tICcuL291dGxldCc7XG5pbXBvcnQgeyBOelRyZWVWaWV3IH0gZnJvbSAnLi90cmVlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdHJlZS12aWV3JyxcbiAgZXhwb3J0QXM6ICduelRyZWVWaWV3JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiYW50LXRyZWUtbGlzdC1ob2xkZXJcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgW0AuZGlzYWJsZWRdPVwiIV9hZnRlclZpZXdJbml0IHx8IG5vQW5pbWF0aW9uPy5uek5vQW5pbWF0aW9uXCJcbiAgICAgICAgW0B0cmVlQ29sbGFwc2VNb3Rpb25dPVwiX25vZGVPdXRsZXQudmlld0NvbnRhaW5lci5sZW5ndGhcIlxuICAgICAgICBjbGFzcz1cImFudC10cmVlLWxpc3QtaG9sZGVyLWlubmVyXCJcbiAgICAgID5cbiAgICAgICAgPG5nLWNvbnRhaW5lciBuelRyZWVOb2RlT3V0bGV0PjwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IENka1RyZWUsIHVzZUV4aXN0aW5nOiBOelRyZWVWaWV3Q29tcG9uZW50IH0sXG4gICAgeyBwcm92aWRlOiBOelRyZWVWaWV3LCB1c2VFeGlzdGluZzogTnpUcmVlVmlld0NvbXBvbmVudCB9XG4gIF0sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC10cmVlJyxcbiAgICAnW2NsYXNzLmFudC10cmVlLWJsb2NrLW5vZGVdJzogJ256RGlyZWN0b3J5VHJlZSB8fCBuekJsb2NrTm9kZScsXG4gICAgJ1tjbGFzcy5hbnQtdHJlZS1kaXJlY3RvcnldJzogJ256RGlyZWN0b3J5VHJlZScsXG4gICAgJ1tjbGFzcy5hbnQtdHJlZS1ydGxdJzogYGRpciA9PT0gJ3J0bCdgXG4gIH0sXG4gIGFuaW1hdGlvbnM6IFt0cmVlQ29sbGFwc2VNb3Rpb25dXG59KVxuZXhwb3J0IGNsYXNzIE56VHJlZVZpZXdDb21wb25lbnQ8VD4gZXh0ZW5kcyBOelRyZWVWaWV3PFQ+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBWaWV3Q2hpbGQoTnpUcmVlTm9kZU91dGxldERpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUgfSkgbm9kZU91dGxldCE6IE56VHJlZU5vZGVPdXRsZXREaXJlY3RpdmU7XG4gIF9hZnRlclZpZXdJbml0ID0gZmFsc2U7XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuX2FmdGVyVmlld0luaXQgPSB0cnVlO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxufVxuIl19