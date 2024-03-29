/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule as ImageModule } from 'ng-zorro-antd/image';
import { NzPipesModule } from 'ng-zorro-antd/pipes';
import { NzImageViewComponent } from './image.component';
import * as i0 from "@angular/core";
export class NzImageModule {
}
NzImageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzImageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageModule, declarations: [NzImageViewComponent], imports: [BidiModule,
        OverlayModule,
        PortalModule,
        DragDropModule,
        CommonModule,
        NzIconModule,
        NzPipesModule,
        PlatformModule,
        ImageModule], exports: [NzImageViewComponent] });
NzImageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageModule, imports: [[
            BidiModule,
            OverlayModule,
            PortalModule,
            DragDropModule,
            CommonModule,
            NzIconModule,
            NzPipesModule,
            PlatformModule,
            ImageModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        BidiModule,
                        OverlayModule,
                        PortalModule,
                        DragDropModule,
                        CommonModule,
                        NzIconModule,
                        NzPipesModule,
                        PlatformModule,
                        ImageModule
                    ],
                    exports: [NzImageViewComponent],
                    declarations: [NzImageViewComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9leHBlcmltZW50YWwvaW1hZ2UvaW1hZ2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxhQUFhLElBQUksV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXBELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQWlCekQsTUFBTSxPQUFPLGFBQWE7OzBHQUFiLGFBQWE7MkdBQWIsYUFBYSxpQkFGVCxvQkFBb0IsYUFYakMsVUFBVTtRQUNWLGFBQWE7UUFDYixZQUFZO1FBQ1osY0FBYztRQUNkLFlBQVk7UUFDWixZQUFZO1FBQ1osYUFBYTtRQUNiLGNBQWM7UUFDZCxXQUFXLGFBRUgsb0JBQW9COzJHQUduQixhQUFhLFlBZGY7WUFDUCxVQUFVO1lBQ1YsYUFBYTtZQUNiLFlBQVk7WUFDWixjQUFjO1lBQ2QsWUFBWTtZQUNaLFlBQVk7WUFDWixhQUFhO1lBQ2IsY0FBYztZQUNkLFdBQVc7U0FDWjsyRkFJVSxhQUFhO2tCQWZ6QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxVQUFVO3dCQUNWLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixjQUFjO3dCQUNkLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixhQUFhO3dCQUNiLGNBQWM7d0JBQ2QsV0FBVztxQkFDWjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDL0IsWUFBWSxFQUFFLENBQUMsb0JBQW9CLENBQUM7aUJBQ3JDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQmlkaU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IERyYWdEcm9wTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgUGxhdGZvcm1Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcbmltcG9ydCB7IE56SW1hZ2VNb2R1bGUgYXMgSW1hZ2VNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ltYWdlJztcbmltcG9ydCB7IE56UGlwZXNNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3BpcGVzJztcblxuaW1wb3J0IHsgTnpJbWFnZVZpZXdDb21wb25lbnQgfSBmcm9tICcuL2ltYWdlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBCaWRpTW9kdWxlLFxuICAgIE92ZXJsYXlNb2R1bGUsXG4gICAgUG9ydGFsTW9kdWxlLFxuICAgIERyYWdEcm9wTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBOekljb25Nb2R1bGUsXG4gICAgTnpQaXBlc01vZHVsZSxcbiAgICBQbGF0Zm9ybU1vZHVsZSxcbiAgICBJbWFnZU1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbTnpJbWFnZVZpZXdDb21wb25lbnRdLFxuICBkZWNsYXJhdGlvbnM6IFtOekltYWdlVmlld0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTnpJbWFnZU1vZHVsZSB7fVxuIl19