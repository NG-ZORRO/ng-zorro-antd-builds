/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerContentDirective } from './drawer-content.directive';
import { NzDrawerComponent } from './drawer.component';
import { NzDrawerServiceModule } from './drawer.service.module';
import * as i0 from "@angular/core";
export class NzDrawerModule {
}
NzDrawerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDrawerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzDrawerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDrawerModule, declarations: [NzDrawerComponent, NzDrawerContentDirective], imports: [BidiModule,
        CommonModule,
        OverlayModule,
        PortalModule,
        NzIconModule,
        NzOutletModule,
        NzNoAnimationModule,
        NzDrawerServiceModule], exports: [NzDrawerComponent, NzDrawerContentDirective] });
NzDrawerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDrawerModule, imports: [[
            BidiModule,
            CommonModule,
            OverlayModule,
            PortalModule,
            NzIconModule,
            NzOutletModule,
            NzNoAnimationModule,
            NzDrawerServiceModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDrawerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        BidiModule,
                        CommonModule,
                        OverlayModule,
                        PortalModule,
                        NzIconModule,
                        NzOutletModule,
                        NzNoAnimationModule,
                        NzDrawerServiceModule
                    ],
                    exports: [NzDrawerComponent, NzDrawerContentDirective],
                    declarations: [NzDrawerComponent, NzDrawerContentDirective],
                    entryComponents: [NzDrawerComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvZHJhd2VyL2RyYXdlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFpQmhFLE1BQU0sT0FBTyxjQUFjOzsyR0FBZCxjQUFjOzRHQUFkLGNBQWMsaUJBSFYsaUJBQWlCLEVBQUUsd0JBQXdCLGFBVnhELFVBQVU7UUFDVixZQUFZO1FBQ1osYUFBYTtRQUNiLFlBQVk7UUFDWixZQUFZO1FBQ1osY0FBYztRQUNkLG1CQUFtQjtRQUNuQixxQkFBcUIsYUFFYixpQkFBaUIsRUFBRSx3QkFBd0I7NEdBSTFDLGNBQWMsWUFkaEI7WUFDUCxVQUFVO1lBQ1YsWUFBWTtZQUNaLGFBQWE7WUFDYixZQUFZO1lBQ1osWUFBWTtZQUNaLGNBQWM7WUFDZCxtQkFBbUI7WUFDbkIscUJBQXFCO1NBQ3RCOzJGQUtVLGNBQWM7a0JBZjFCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFVBQVU7d0JBQ1YsWUFBWTt3QkFDWixhQUFhO3dCQUNiLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixjQUFjO3dCQUNkLG1CQUFtQjt3QkFDbkIscUJBQXFCO3FCQUN0QjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSx3QkFBd0IsQ0FBQztvQkFDdEQsWUFBWSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsd0JBQXdCLENBQUM7b0JBQzNELGVBQWUsRUFBRSxDQUFDLGlCQUFpQixDQUFDO2lCQUNyQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEJpZGlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpOb0FuaW1hdGlvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9uby1hbmltYXRpb24nO1xuaW1wb3J0IHsgTnpPdXRsZXRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvb3V0bGV0JztcbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5cbmltcG9ydCB7IE56RHJhd2VyQ29udGVudERpcmVjdGl2ZSB9IGZyb20gJy4vZHJhd2VyLWNvbnRlbnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE56RHJhd2VyQ29tcG9uZW50IH0gZnJvbSAnLi9kcmF3ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE56RHJhd2VyU2VydmljZU1vZHVsZSB9IGZyb20gJy4vZHJhd2VyLnNlcnZpY2UubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEJpZGlNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE92ZXJsYXlNb2R1bGUsXG4gICAgUG9ydGFsTW9kdWxlLFxuICAgIE56SWNvbk1vZHVsZSxcbiAgICBOek91dGxldE1vZHVsZSxcbiAgICBOek5vQW5pbWF0aW9uTW9kdWxlLFxuICAgIE56RHJhd2VyU2VydmljZU1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbTnpEcmF3ZXJDb21wb25lbnQsIE56RHJhd2VyQ29udGVudERpcmVjdGl2ZV0sXG4gIGRlY2xhcmF0aW9uczogW056RHJhd2VyQ29tcG9uZW50LCBOekRyYXdlckNvbnRlbnREaXJlY3RpdmVdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOekRyYXdlckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTnpEcmF3ZXJNb2R1bGUge31cbiJdfQ==