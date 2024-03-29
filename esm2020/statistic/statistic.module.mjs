/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzPipesModule as NzPipesModuleFromCore } from 'ng-zorro-antd/core/pipe';
import { NzCountdownComponent } from './countdown.component';
import { NzStatisticNumberComponent } from './statistic-number.component';
import { NzStatisticComponent } from './statistic.component';
import * as i0 from "@angular/core";
export class NzStatisticModule {
}
NzStatisticModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzStatisticModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzStatisticModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzStatisticModule, declarations: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent], imports: [BidiModule, CommonModule, PlatformModule, NzOutletModule, NzPipesModuleFromCore], exports: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent] });
NzStatisticModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzStatisticModule, imports: [[BidiModule, CommonModule, PlatformModule, NzOutletModule, NzPipesModuleFromCore]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzStatisticModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BidiModule, CommonModule, PlatformModule, NzOutletModule, NzPipesModuleFromCore],
                    declarations: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent],
                    exports: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGlzdGljLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvc3RhdGlzdGljL3N0YXRpc3RpYy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsSUFBSSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRWpGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQU83RCxNQUFNLE9BQU8saUJBQWlCOzs4R0FBakIsaUJBQWlCOytHQUFqQixpQkFBaUIsaUJBSGIsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsMEJBQTBCLGFBRDNFLFVBQVUsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxxQkFBcUIsYUFFL0Usb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsMEJBQTBCOytHQUVyRSxpQkFBaUIsWUFKbkIsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUscUJBQXFCLENBQUM7MkZBSS9FLGlCQUFpQjtrQkFMN0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUscUJBQXFCLENBQUM7b0JBQzFGLFlBQVksRUFBRSxDQUFDLG9CQUFvQixFQUFFLG9CQUFvQixFQUFFLDBCQUEwQixDQUFDO29CQUN0RixPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSwwQkFBMEIsQ0FBQztpQkFDbEYiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBCaWRpTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgUGxhdGZvcm1Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56T3V0bGV0TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL291dGxldCc7XG5pbXBvcnQgeyBOelBpcGVzTW9kdWxlIGFzIE56UGlwZXNNb2R1bGVGcm9tQ29yZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9waXBlJztcblxuaW1wb3J0IHsgTnpDb3VudGRvd25Db21wb25lbnQgfSBmcm9tICcuL2NvdW50ZG93bi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpTdGF0aXN0aWNOdW1iZXJDb21wb25lbnQgfSBmcm9tICcuL3N0YXRpc3RpYy1udW1iZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE56U3RhdGlzdGljQ29tcG9uZW50IH0gZnJvbSAnLi9zdGF0aXN0aWMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0JpZGlNb2R1bGUsIENvbW1vbk1vZHVsZSwgUGxhdGZvcm1Nb2R1bGUsIE56T3V0bGV0TW9kdWxlLCBOelBpcGVzTW9kdWxlRnJvbUNvcmVdLFxuICBkZWNsYXJhdGlvbnM6IFtOelN0YXRpc3RpY0NvbXBvbmVudCwgTnpDb3VudGRvd25Db21wb25lbnQsIE56U3RhdGlzdGljTnVtYmVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW056U3RhdGlzdGljQ29tcG9uZW50LCBOekNvdW50ZG93bkNvbXBvbmVudCwgTnpTdGF0aXN0aWNOdW1iZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE56U3RhdGlzdGljTW9kdWxlIHt9XG4iXX0=