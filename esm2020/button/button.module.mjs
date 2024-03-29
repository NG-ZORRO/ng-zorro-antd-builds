/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ɵNzTransitionPatchModule as NzTransitionPatchModule } from 'ng-zorro-antd/core/transition-patch';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonGroupComponent } from './button-group.component';
import { NzButtonComponent } from './button.component';
import * as i0 from "@angular/core";
export class NzButtonModule {
}
NzButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzButtonModule, declarations: [NzButtonComponent, NzButtonGroupComponent], imports: [BidiModule, CommonModule, NzWaveModule, NzIconModule, NzTransitionPatchModule], exports: [NzButtonComponent, NzButtonGroupComponent, NzTransitionPatchModule, NzWaveModule] });
NzButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzButtonModule, imports: [[BidiModule, CommonModule, NzWaveModule, NzIconModule, NzTransitionPatchModule], NzTransitionPatchModule, NzWaveModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzButtonComponent, NzButtonGroupComponent],
                    exports: [NzButtonComponent, NzButtonGroupComponent, NzTransitionPatchModule, NzWaveModule],
                    imports: [BidiModule, CommonModule, NzWaveModule, NzIconModule, NzTransitionPatchModule]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSx3QkFBd0IsSUFBSSx1QkFBdUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBT3ZELE1BQU0sT0FBTyxjQUFjOzsyR0FBZCxjQUFjOzRHQUFkLGNBQWMsaUJBSlYsaUJBQWlCLEVBQUUsc0JBQXNCLGFBRTlDLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSx1QkFBdUIsYUFEN0UsaUJBQWlCLEVBQUUsc0JBQXNCLEVBQUUsdUJBQXVCLEVBQUUsWUFBWTs0R0FHL0UsY0FBYyxZQUZoQixDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSx1QkFBdUIsQ0FBQyxFQURuQyx1QkFBdUIsRUFBRSxZQUFZOzJGQUcvRSxjQUFjO2tCQUwxQixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLGlCQUFpQixFQUFFLHNCQUFzQixDQUFDO29CQUN6RCxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxzQkFBc0IsRUFBRSx1QkFBdUIsRUFBRSxZQUFZLENBQUM7b0JBQzNGLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSx1QkFBdUIsQ0FBQztpQkFDekYiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBCaWRpTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IMm1TnpUcmFuc2l0aW9uUGF0Y2hNb2R1bGUgYXMgTnpUcmFuc2l0aW9uUGF0Y2hNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHJhbnNpdGlvbi1wYXRjaCc7XG5pbXBvcnQgeyBOeldhdmVNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvd2F2ZSc7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuXG5pbXBvcnQgeyBOekJ1dHRvbkdyb3VwQ29tcG9uZW50IH0gZnJvbSAnLi9idXR0b24tZ3JvdXAuY29tcG9uZW50JztcbmltcG9ydCB7IE56QnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9idXR0b24uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTnpCdXR0b25Db21wb25lbnQsIE56QnV0dG9uR3JvdXBDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTnpCdXR0b25Db21wb25lbnQsIE56QnV0dG9uR3JvdXBDb21wb25lbnQsIE56VHJhbnNpdGlvblBhdGNoTW9kdWxlLCBOeldhdmVNb2R1bGVdLFxuICBpbXBvcnRzOiBbQmlkaU1vZHVsZSwgQ29tbW9uTW9kdWxlLCBOeldhdmVNb2R1bGUsIE56SWNvbk1vZHVsZSwgTnpUcmFuc2l0aW9uUGF0Y2hNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIE56QnV0dG9uTW9kdWxlIHt9XG4iXX0=