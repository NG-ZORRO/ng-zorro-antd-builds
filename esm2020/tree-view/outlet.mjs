/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CdkTreeNodeOutlet, CDK_TREE_NODE_OUTLET_NODE } from '@angular/cdk/tree';
import { Directive, Inject, Optional } from '@angular/core';
import * as i0 from "@angular/core";
export class NzTreeNodeOutletDirective {
    constructor(viewContainer, _node) {
        this.viewContainer = viewContainer;
        this._node = _node;
    }
}
NzTreeNodeOutletDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeOutletDirective, deps: [{ token: i0.ViewContainerRef }, { token: CDK_TREE_NODE_OUTLET_NODE, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NzTreeNodeOutletDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeOutletDirective, selector: "[nzTreeNodeOutlet]", providers: [
        {
            provide: CdkTreeNodeOutlet,
            useExisting: NzTreeNodeOutletDirective
        }
    ], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeOutletDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzTreeNodeOutlet]',
                    providers: [
                        {
                            provide: CdkTreeNodeOutlet,
                            useExisting: NzTreeNodeOutletDirective
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [CDK_TREE_NODE_OUTLET_NODE]
                }, {
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy90cmVlLXZpZXcvb3V0bGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBb0IsTUFBTSxlQUFlLENBQUM7O0FBYTlFLE1BQU0sT0FBTyx5QkFBeUI7SUFDcEMsWUFDUyxhQUErQixFQUNnQixLQUFpQjtRQURoRSxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFDZ0IsVUFBSyxHQUFMLEtBQUssQ0FBWTtJQUN0RSxDQUFDOztzSEFKTyx5QkFBeUIsa0RBRzFCLHlCQUF5QjswR0FIeEIseUJBQXlCLDZDQVB6QjtRQUNUO1lBQ0UsT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixXQUFXLEVBQUUseUJBQXlCO1NBQ3ZDO0tBQ0Y7MkZBRVUseUJBQXlCO2tCQVRyQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLDJCQUEyQjt5QkFDdkM7cUJBQ0Y7aUJBQ0Y7OzBCQUlJLE1BQU07MkJBQUMseUJBQXlCOzswQkFBRyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2RrVHJlZU5vZGVPdXRsZXQsIENES19UUkVFX05PREVfT1VUTEVUX05PREUgfSBmcm9tICdAYW5ndWxhci9jZGsvdHJlZSc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEluamVjdCwgT3B0aW9uYWwsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW256VHJlZU5vZGVPdXRsZXRdJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogQ2RrVHJlZU5vZGVPdXRsZXQsXG4gICAgICB1c2VFeGlzdGluZzogTnpUcmVlTm9kZU91dGxldERpcmVjdGl2ZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOelRyZWVOb2RlT3V0bGV0RGlyZWN0aXZlIGltcGxlbWVudHMgQ2RrVHJlZU5vZGVPdXRsZXQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBASW5qZWN0KENES19UUkVFX05PREVfT1VUTEVUX05PREUpIEBPcHRpb25hbCgpIHB1YmxpYyBfbm9kZT86IE56U2FmZUFueVxuICApIHt9XG59XG4iXX0=