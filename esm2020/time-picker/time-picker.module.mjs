/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTimePickerPanelComponent } from './time-picker-panel.component';
import { NzTimePickerComponent } from './time-picker.component';
import * as i0 from "@angular/core";
export class NzTimePickerModule {
}
NzTimePickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTimePickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzTimePickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTimePickerModule, declarations: [NzTimePickerComponent, NzTimePickerPanelComponent], imports: [BidiModule,
        CommonModule,
        FormsModule,
        NzI18nModule,
        OverlayModule,
        NzIconModule,
        NzOverlayModule,
        NzOutletModule,
        NzButtonModule], exports: [NzTimePickerPanelComponent, NzTimePickerComponent] });
NzTimePickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTimePickerModule, imports: [[
            BidiModule,
            CommonModule,
            FormsModule,
            NzI18nModule,
            OverlayModule,
            NzIconModule,
            NzOverlayModule,
            NzOutletModule,
            NzButtonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTimePickerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzTimePickerComponent, NzTimePickerPanelComponent],
                    exports: [NzTimePickerPanelComponent, NzTimePickerComponent],
                    imports: [
                        BidiModule,
                        CommonModule,
                        FormsModule,
                        NzI18nModule,
                        OverlayModule,
                        NzIconModule,
                        NzOverlayModule,
                        NzOutletModule,
                        NzButtonModule
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy90aW1lLXBpY2tlci90aW1lLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFpQmhFLE1BQU0sT0FBTyxrQkFBa0I7OytHQUFsQixrQkFBa0I7Z0hBQWxCLGtCQUFrQixpQkFkZCxxQkFBcUIsRUFBRSwwQkFBMEIsYUFHOUQsVUFBVTtRQUNWLFlBQVk7UUFDWixXQUFXO1FBQ1gsWUFBWTtRQUNaLGFBQWE7UUFDYixZQUFZO1FBQ1osZUFBZTtRQUNmLGNBQWM7UUFDZCxjQUFjLGFBVk4sMEJBQTBCLEVBQUUscUJBQXFCO2dIQWFoRCxrQkFBa0IsWUFacEI7WUFDUCxVQUFVO1lBQ1YsWUFBWTtZQUNaLFdBQVc7WUFDWCxZQUFZO1lBQ1osYUFBYTtZQUNiLFlBQVk7WUFDWixlQUFlO1lBQ2YsY0FBYztZQUNkLGNBQWM7U0FDZjsyRkFFVSxrQkFBa0I7a0JBZjlCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMscUJBQXFCLEVBQUUsMEJBQTBCLENBQUM7b0JBQ2pFLE9BQU8sRUFBRSxDQUFDLDBCQUEwQixFQUFFLHFCQUFxQixDQUFDO29CQUM1RCxPQUFPLEVBQUU7d0JBQ1AsVUFBVTt3QkFDVixZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsWUFBWTt3QkFDWixhQUFhO3dCQUNiLFlBQVk7d0JBQ1osZUFBZTt3QkFDZixjQUFjO3dCQUNkLGNBQWM7cUJBQ2Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBCaWRpTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IE56QnV0dG9uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9idXR0b24nO1xuaW1wb3J0IHsgTnpPdXRsZXRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvb3V0bGV0JztcbmltcG9ydCB7IE56T3ZlcmxheU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9vdmVybGF5JztcbmltcG9ydCB7IE56STE4bk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaTE4bic7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuXG5pbXBvcnQgeyBOelRpbWVQaWNrZXJQYW5lbENvbXBvbmVudCB9IGZyb20gJy4vdGltZS1waWNrZXItcGFuZWwuY29tcG9uZW50JztcbmltcG9ydCB7IE56VGltZVBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vdGltZS1waWNrZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTnpUaW1lUGlja2VyQ29tcG9uZW50LCBOelRpbWVQaWNrZXJQYW5lbENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtOelRpbWVQaWNrZXJQYW5lbENvbXBvbmVudCwgTnpUaW1lUGlja2VyQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW1xuICAgIEJpZGlNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE56STE4bk1vZHVsZSxcbiAgICBPdmVybGF5TW9kdWxlLFxuICAgIE56SWNvbk1vZHVsZSxcbiAgICBOek92ZXJsYXlNb2R1bGUsXG4gICAgTnpPdXRsZXRNb2R1bGUsXG4gICAgTnpCdXR0b25Nb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOelRpbWVQaWNrZXJNb2R1bGUge31cbiJdfQ==