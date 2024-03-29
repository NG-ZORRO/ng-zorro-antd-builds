/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopoverComponent, NzPopoverDirective } from './popover';
import * as i0 from "@angular/core";
export class NzPopoverModule {
}
NzPopoverModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPopoverModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzPopoverModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPopoverModule, declarations: [NzPopoverDirective, NzPopoverComponent], imports: [BidiModule,
        CommonModule,
        OverlayModule,
        NzOutletModule,
        NzOverlayModule,
        NzNoAnimationModule,
        NzToolTipModule], exports: [NzPopoverDirective, NzPopoverComponent] });
NzPopoverModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPopoverModule, imports: [[
            BidiModule,
            CommonModule,
            OverlayModule,
            NzOutletModule,
            NzOverlayModule,
            NzNoAnimationModule,
            NzToolTipModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPopoverModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [NzPopoverDirective, NzPopoverComponent],
                    entryComponents: [NzPopoverComponent],
                    declarations: [NzPopoverDirective, NzPopoverComponent],
                    imports: [
                        BidiModule,
                        CommonModule,
                        OverlayModule,
                        NzOutletModule,
                        NzOverlayModule,
                        NzNoAnimationModule,
                        NzToolTipModule
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxXQUFXLENBQUM7O0FBZ0JuRSxNQUFNLE9BQU8sZUFBZTs7NEdBQWYsZUFBZTs2R0FBZixlQUFlLGlCQVhYLGtCQUFrQixFQUFFLGtCQUFrQixhQUVuRCxVQUFVO1FBQ1YsWUFBWTtRQUNaLGFBQWE7UUFDYixjQUFjO1FBQ2QsZUFBZTtRQUNmLG1CQUFtQjtRQUNuQixlQUFlLGFBVlAsa0JBQWtCLEVBQUUsa0JBQWtCOzZHQWFyQyxlQUFlLFlBVmpCO1lBQ1AsVUFBVTtZQUNWLFlBQVk7WUFDWixhQUFhO1lBQ2IsY0FBYztZQUNkLGVBQWU7WUFDZixtQkFBbUI7WUFDbkIsZUFBZTtTQUNoQjsyRkFFVSxlQUFlO2tCQWQzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDO29CQUNqRCxlQUFlLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztvQkFDckMsWUFBWSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsa0JBQWtCLENBQUM7b0JBQ3RELE9BQU8sRUFBRTt3QkFDUCxVQUFVO3dCQUNWLFlBQVk7d0JBQ1osYUFBYTt3QkFDYixjQUFjO3dCQUNkLGVBQWU7d0JBQ2YsbUJBQW1CO3dCQUNuQixlQUFlO3FCQUNoQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEJpZGlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56Tm9BbmltYXRpb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvbm8tYW5pbWF0aW9uJztcbmltcG9ydCB7IE56T3V0bGV0TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL291dGxldCc7XG5pbXBvcnQgeyBOek92ZXJsYXlNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvb3ZlcmxheSc7XG5pbXBvcnQgeyBOelRvb2xUaXBNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3Rvb2x0aXAnO1xuXG5pbXBvcnQgeyBOelBvcG92ZXJDb21wb25lbnQsIE56UG9wb3ZlckRpcmVjdGl2ZSB9IGZyb20gJy4vcG9wb3Zlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtOelBvcG92ZXJEaXJlY3RpdmUsIE56UG9wb3ZlckNvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogW056UG9wb3ZlckNvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW056UG9wb3ZlckRpcmVjdGl2ZSwgTnpQb3BvdmVyQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW1xuICAgIEJpZGlNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE92ZXJsYXlNb2R1bGUsXG4gICAgTnpPdXRsZXRNb2R1bGUsXG4gICAgTnpPdmVybGF5TW9kdWxlLFxuICAgIE56Tm9BbmltYXRpb25Nb2R1bGUsXG4gICAgTnpUb29sVGlwTW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTnpQb3BvdmVyTW9kdWxlIHt9XG4iXX0=