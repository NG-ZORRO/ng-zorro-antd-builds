/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmComponent, NzPopconfirmDirective } from './popconfirm';
import * as i0 from "@angular/core";
export class NzPopconfirmModule {
}
NzPopconfirmModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPopconfirmModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzPopconfirmModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPopconfirmModule, declarations: [NzPopconfirmComponent, NzPopconfirmDirective], imports: [BidiModule,
        CommonModule,
        NzButtonModule,
        OverlayModule,
        NzI18nModule,
        NzIconModule,
        NzOutletModule,
        NzOverlayModule,
        NzNoAnimationModule,
        NzToolTipModule,
        A11yModule], exports: [NzPopconfirmComponent, NzPopconfirmDirective] });
NzPopconfirmModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPopconfirmModule, imports: [[
            BidiModule,
            CommonModule,
            NzButtonModule,
            OverlayModule,
            NzI18nModule,
            NzIconModule,
            NzOutletModule,
            NzOverlayModule,
            NzNoAnimationModule,
            NzToolTipModule,
            A11yModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPopconfirmModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzPopconfirmComponent, NzPopconfirmDirective],
                    exports: [NzPopconfirmComponent, NzPopconfirmDirective],
                    entryComponents: [NzPopconfirmComponent],
                    imports: [
                        BidiModule,
                        CommonModule,
                        NzButtonModule,
                        OverlayModule,
                        NzI18nModule,
                        NzIconModule,
                        NzOutletModule,
                        NzOverlayModule,
                        NzNoAnimationModule,
                        NzToolTipModule,
                        A11yModule
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wY29uZmlybS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3BvcGNvbmZpcm0vcG9wY29uZmlybS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFeEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sY0FBYyxDQUFDOztBQW9CNUUsTUFBTSxPQUFPLGtCQUFrQjs7K0dBQWxCLGtCQUFrQjtnSEFBbEIsa0JBQWtCLGlCQWpCZCxxQkFBcUIsRUFBRSxxQkFBcUIsYUFJekQsVUFBVTtRQUNWLFlBQVk7UUFDWixjQUFjO1FBQ2QsYUFBYTtRQUNiLFlBQVk7UUFDWixZQUFZO1FBQ1osY0FBYztRQUNkLGVBQWU7UUFDZixtQkFBbUI7UUFDbkIsZUFBZTtRQUNmLFVBQVUsYUFiRixxQkFBcUIsRUFBRSxxQkFBcUI7Z0hBZ0IzQyxrQkFBa0IsWUFkcEI7WUFDUCxVQUFVO1lBQ1YsWUFBWTtZQUNaLGNBQWM7WUFDZCxhQUFhO1lBQ2IsWUFBWTtZQUNaLFlBQVk7WUFDWixjQUFjO1lBQ2QsZUFBZTtZQUNmLG1CQUFtQjtZQUNuQixlQUFlO1lBQ2YsVUFBVTtTQUNYOzJGQUVVLGtCQUFrQjtrQkFsQjlCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMscUJBQXFCLEVBQUUscUJBQXFCLENBQUM7b0JBQzVELE9BQU8sRUFBRSxDQUFDLHFCQUFxQixFQUFFLHFCQUFxQixDQUFDO29CQUN2RCxlQUFlLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztvQkFDeEMsT0FBTyxFQUFFO3dCQUNQLFVBQVU7d0JBQ1YsWUFBWTt3QkFDWixjQUFjO3dCQUNkLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixZQUFZO3dCQUNaLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixtQkFBbUI7d0JBQ25CLGVBQWU7d0JBQ2YsVUFBVTtxQkFDWDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBCaWRpTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOekJ1dHRvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvYnV0dG9uJztcbmltcG9ydCB7IE56Tm9BbmltYXRpb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvbm8tYW5pbWF0aW9uJztcbmltcG9ydCB7IE56T3V0bGV0TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL291dGxldCc7XG5pbXBvcnQgeyBOek92ZXJsYXlNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvb3ZlcmxheSc7XG5pbXBvcnQgeyBOekkxOG5Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcbmltcG9ydCB7IE56VG9vbFRpcE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvdG9vbHRpcCc7XG5cbmltcG9ydCB7IE56UG9wY29uZmlybUNvbXBvbmVudCwgTnpQb3Bjb25maXJtRGlyZWN0aXZlIH0gZnJvbSAnLi9wb3Bjb25maXJtJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTnpQb3Bjb25maXJtQ29tcG9uZW50LCBOelBvcGNvbmZpcm1EaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbTnpQb3Bjb25maXJtQ29tcG9uZW50LCBOelBvcGNvbmZpcm1EaXJlY3RpdmVdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOelBvcGNvbmZpcm1Db21wb25lbnRdLFxuICBpbXBvcnRzOiBbXG4gICAgQmlkaU1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTnpCdXR0b25Nb2R1bGUsXG4gICAgT3ZlcmxheU1vZHVsZSxcbiAgICBOekkxOG5Nb2R1bGUsXG4gICAgTnpJY29uTW9kdWxlLFxuICAgIE56T3V0bGV0TW9kdWxlLFxuICAgIE56T3ZlcmxheU1vZHVsZSxcbiAgICBOek5vQW5pbWF0aW9uTW9kdWxlLFxuICAgIE56VG9vbFRpcE1vZHVsZSxcbiAgICBBMTF5TW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTnpQb3Bjb25maXJtTW9kdWxlIHt9XG4iXX0=