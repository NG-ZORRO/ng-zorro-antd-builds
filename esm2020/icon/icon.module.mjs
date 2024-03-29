/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { PlatformModule } from '@angular/cdk/platform';
import { NgModule } from '@angular/core';
import { NzIconDirective } from './icon.directive';
import { NzIconPatchService, NZ_ICONS, NZ_ICONS_PATCH } from './icon.service';
import * as i0 from "@angular/core";
export class NzIconModule {
    static forRoot(icons) {
        return {
            ngModule: NzIconModule,
            providers: [
                {
                    provide: NZ_ICONS,
                    useValue: icons
                }
            ]
        };
    }
    static forChild(icons) {
        return {
            ngModule: NzIconModule,
            providers: [
                NzIconPatchService,
                {
                    provide: NZ_ICONS_PATCH,
                    useValue: icons
                }
            ]
        };
    }
}
NzIconModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzIconModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzIconModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzIconModule, declarations: [NzIconDirective], imports: [PlatformModule], exports: [NzIconDirective] });
NzIconModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzIconModule, imports: [[PlatformModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzIconModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [NzIconDirective],
                    declarations: [NzIconDirective],
                    imports: [PlatformModule]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2ljb24vaWNvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTlELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQU85RSxNQUFNLE9BQU8sWUFBWTtJQUN2QixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQXVCO1FBQ3BDLE9BQU87WUFDTCxRQUFRLEVBQUUsWUFBWTtZQUN0QixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLFFBQVE7b0JBQ2pCLFFBQVEsRUFBRSxLQUFLO2lCQUNoQjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQXVCO1FBQ3JDLE9BQU87WUFDTCxRQUFRLEVBQUUsWUFBWTtZQUN0QixTQUFTLEVBQUU7Z0JBQ1Qsa0JBQWtCO2dCQUNsQjtvQkFDRSxPQUFPLEVBQUUsY0FBYztvQkFDdkIsUUFBUSxFQUFFLEtBQUs7aUJBQ2hCO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7eUdBeEJVLFlBQVk7MEdBQVosWUFBWSxpQkFIUixlQUFlLGFBQ3BCLGNBQWMsYUFGZCxlQUFlOzBHQUlkLFlBQVksWUFGZCxDQUFDLGNBQWMsQ0FBQzsyRkFFZCxZQUFZO2tCQUx4QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztvQkFDMUIsWUFBWSxFQUFFLENBQUMsZUFBZSxDQUFDO29CQUMvQixPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUM7aUJBQzFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgUGxhdGZvcm1Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSWNvbkRlZmluaXRpb24gfSBmcm9tICdAYW50LWRlc2lnbi9pY29ucy1hbmd1bGFyJztcblxuaW1wb3J0IHsgTnpJY29uRGlyZWN0aXZlIH0gZnJvbSAnLi9pY29uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOekljb25QYXRjaFNlcnZpY2UsIE5aX0lDT05TLCBOWl9JQ09OU19QQVRDSCB9IGZyb20gJy4vaWNvbi5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW056SWNvbkRpcmVjdGl2ZV0sXG4gIGRlY2xhcmF0aW9uczogW056SWNvbkRpcmVjdGl2ZV0sXG4gIGltcG9ydHM6IFtQbGF0Zm9ybU1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgTnpJY29uTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoaWNvbnM6IEljb25EZWZpbml0aW9uW10pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE56SWNvbk1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTnpJY29uTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBOWl9JQ09OUyxcbiAgICAgICAgICB1c2VWYWx1ZTogaWNvbnNcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZm9yQ2hpbGQoaWNvbnM6IEljb25EZWZpbml0aW9uW10pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE56SWNvbk1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTnpJY29uTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE56SWNvblBhdGNoU2VydmljZSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE5aX0lDT05TX1BBVENILFxuICAgICAgICAgIHVzZVZhbHVlOiBpY29uc1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19