/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSliderHandleComponent } from './handle.component';
import { NzSliderMarksComponent } from './marks.component';
import { NzSliderComponent } from './slider.component';
import { NzSliderStepComponent } from './step.component';
import { NzSliderTrackComponent } from './track.component';
import * as i0 from "@angular/core";
export class NzSliderModule {
}
NzSliderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSliderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzSliderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSliderModule, declarations: [NzSliderComponent,
        NzSliderTrackComponent,
        NzSliderHandleComponent,
        NzSliderStepComponent,
        NzSliderMarksComponent], imports: [BidiModule, CommonModule, PlatformModule, NzToolTipModule], exports: [NzSliderComponent,
        NzSliderTrackComponent,
        NzSliderHandleComponent,
        NzSliderStepComponent,
        NzSliderMarksComponent] });
NzSliderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSliderModule, imports: [[BidiModule, CommonModule, PlatformModule, NzToolTipModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSliderModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [
                        NzSliderComponent,
                        NzSliderTrackComponent,
                        NzSliderHandleComponent,
                        NzSliderStepComponent,
                        NzSliderMarksComponent
                    ],
                    declarations: [
                        NzSliderComponent,
                        NzSliderTrackComponent,
                        NzSliderHandleComponent,
                        NzSliderStepComponent,
                        NzSliderMarksComponent
                    ],
                    imports: [BidiModule, CommonModule, PlatformModule, NzToolTipModule]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvc2xpZGVyL3NsaWRlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFeEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDN0QsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDM0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDekQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBbUIzRCxNQUFNLE9BQU8sY0FBYzs7MkdBQWQsY0FBYzs0R0FBZCxjQUFjLGlCQVJ2QixpQkFBaUI7UUFDakIsc0JBQXNCO1FBQ3RCLHVCQUF1QjtRQUN2QixxQkFBcUI7UUFDckIsc0JBQXNCLGFBRWQsVUFBVSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsZUFBZSxhQWJqRSxpQkFBaUI7UUFDakIsc0JBQXNCO1FBQ3RCLHVCQUF1QjtRQUN2QixxQkFBcUI7UUFDckIsc0JBQXNCOzRHQVdiLGNBQWMsWUFGaEIsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxlQUFlLENBQUM7MkZBRXpELGNBQWM7a0JBakIxQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxpQkFBaUI7d0JBQ2pCLHNCQUFzQjt3QkFDdEIsdUJBQXVCO3dCQUN2QixxQkFBcUI7d0JBQ3JCLHNCQUFzQjtxQkFDdkI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLGlCQUFpQjt3QkFDakIsc0JBQXNCO3dCQUN0Qix1QkFBdUI7d0JBQ3ZCLHFCQUFxQjt3QkFDckIsc0JBQXNCO3FCQUN2QjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxlQUFlLENBQUM7aUJBQ3JFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQmlkaU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IFBsYXRmb3JtTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOelRvb2xUaXBNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3Rvb2x0aXAnO1xuXG5pbXBvcnQgeyBOelNsaWRlckhhbmRsZUNvbXBvbmVudCB9IGZyb20gJy4vaGFuZGxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelNsaWRlck1hcmtzQ29tcG9uZW50IH0gZnJvbSAnLi9tYXJrcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpTbGlkZXJDb21wb25lbnQgfSBmcm9tICcuL3NsaWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpTbGlkZXJTdGVwQ29tcG9uZW50IH0gZnJvbSAnLi9zdGVwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelNsaWRlclRyYWNrQ29tcG9uZW50IH0gZnJvbSAnLi90cmFjay5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbXG4gICAgTnpTbGlkZXJDb21wb25lbnQsXG4gICAgTnpTbGlkZXJUcmFja0NvbXBvbmVudCxcbiAgICBOelNsaWRlckhhbmRsZUNvbXBvbmVudCxcbiAgICBOelNsaWRlclN0ZXBDb21wb25lbnQsXG4gICAgTnpTbGlkZXJNYXJrc0NvbXBvbmVudFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOelNsaWRlckNvbXBvbmVudCxcbiAgICBOelNsaWRlclRyYWNrQ29tcG9uZW50LFxuICAgIE56U2xpZGVySGFuZGxlQ29tcG9uZW50LFxuICAgIE56U2xpZGVyU3RlcENvbXBvbmVudCxcbiAgICBOelNsaWRlck1hcmtzQ29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtCaWRpTW9kdWxlLCBDb21tb25Nb2R1bGUsIFBsYXRmb3JtTW9kdWxlLCBOelRvb2xUaXBNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIE56U2xpZGVyTW9kdWxlIHt9XG4iXX0=