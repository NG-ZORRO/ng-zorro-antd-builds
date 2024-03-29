/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderAvatarDirective, NzPageHeaderBreadcrumbDirective, NzPageHeaderContentDirective, NzPageHeaderExtraDirective, NzPageHeaderFooterDirective, NzPageHeaderSubtitleDirective, NzPageHeaderTagDirective, NzPageHeaderTitleDirective } from './page-header-cells';
import { NzPageHeaderComponent } from './page-header.component';
import * as i0 from "@angular/core";
const NzPageHeaderCells = [
    NzPageHeaderTitleDirective,
    NzPageHeaderSubtitleDirective,
    NzPageHeaderContentDirective,
    NzPageHeaderTagDirective,
    NzPageHeaderExtraDirective,
    NzPageHeaderFooterDirective,
    NzPageHeaderBreadcrumbDirective,
    NzPageHeaderAvatarDirective
];
export class NzPageHeaderModule {
}
NzPageHeaderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzPageHeaderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderModule, declarations: [NzPageHeaderComponent, NzPageHeaderTitleDirective,
        NzPageHeaderSubtitleDirective,
        NzPageHeaderContentDirective,
        NzPageHeaderTagDirective,
        NzPageHeaderExtraDirective,
        NzPageHeaderFooterDirective,
        NzPageHeaderBreadcrumbDirective,
        NzPageHeaderAvatarDirective], imports: [BidiModule, CommonModule, NzOutletModule, NzIconModule], exports: [NzPageHeaderComponent, NzPageHeaderTitleDirective,
        NzPageHeaderSubtitleDirective,
        NzPageHeaderContentDirective,
        NzPageHeaderTagDirective,
        NzPageHeaderExtraDirective,
        NzPageHeaderFooterDirective,
        NzPageHeaderBreadcrumbDirective,
        NzPageHeaderAvatarDirective] });
NzPageHeaderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderModule, imports: [[BidiModule, CommonModule, NzOutletModule, NzIconModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BidiModule, CommonModule, NzOutletModule, NzIconModule],
                    exports: [NzPageHeaderComponent, NzPageHeaderCells],
                    declarations: [NzPageHeaderComponent, NzPageHeaderCells]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQsT0FBTyxFQUNMLDJCQUEyQixFQUMzQiwrQkFBK0IsRUFDL0IsNEJBQTRCLEVBQzVCLDBCQUEwQixFQUMxQiwyQkFBMkIsRUFDM0IsNkJBQTZCLEVBQzdCLHdCQUF3QixFQUN4QiwwQkFBMEIsRUFDM0IsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFFaEUsTUFBTSxpQkFBaUIsR0FBRztJQUN4QiwwQkFBMEI7SUFDMUIsNkJBQTZCO0lBQzdCLDRCQUE0QjtJQUM1Qix3QkFBd0I7SUFDeEIsMEJBQTBCO0lBQzFCLDJCQUEyQjtJQUMzQiwrQkFBK0I7SUFDL0IsMkJBQTJCO0NBQzVCLENBQUM7QUFPRixNQUFNLE9BQU8sa0JBQWtCOzsrR0FBbEIsa0JBQWtCO2dIQUFsQixrQkFBa0IsaUJBRmQscUJBQXFCLEVBYnBDLDBCQUEwQjtRQUMxQiw2QkFBNkI7UUFDN0IsNEJBQTRCO1FBQzVCLHdCQUF3QjtRQUN4QiwwQkFBMEI7UUFDMUIsMkJBQTJCO1FBQzNCLCtCQUErQjtRQUMvQiwyQkFBMkIsYUFJakIsVUFBVSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsWUFBWSxhQUN0RCxxQkFBcUIsRUFaL0IsMEJBQTBCO1FBQzFCLDZCQUE2QjtRQUM3Qiw0QkFBNEI7UUFDNUIsd0JBQXdCO1FBQ3hCLDBCQUEwQjtRQUMxQiwyQkFBMkI7UUFDM0IsK0JBQStCO1FBQy9CLDJCQUEyQjtnSEFRaEIsa0JBQWtCLFlBSnBCLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsWUFBWSxDQUFDOzJGQUl0RCxrQkFBa0I7a0JBTDlCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsWUFBWSxDQUFDO29CQUNqRSxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxpQkFBaUIsQ0FBQztvQkFDbkQsWUFBWSxFQUFFLENBQUMscUJBQXFCLEVBQUUsaUJBQWlCLENBQUM7aUJBQ3pEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQmlkaU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOek91dGxldE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9vdXRsZXQnO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcblxuaW1wb3J0IHtcbiAgTnpQYWdlSGVhZGVyQXZhdGFyRGlyZWN0aXZlLFxuICBOelBhZ2VIZWFkZXJCcmVhZGNydW1iRGlyZWN0aXZlLFxuICBOelBhZ2VIZWFkZXJDb250ZW50RGlyZWN0aXZlLFxuICBOelBhZ2VIZWFkZXJFeHRyYURpcmVjdGl2ZSxcbiAgTnpQYWdlSGVhZGVyRm9vdGVyRGlyZWN0aXZlLFxuICBOelBhZ2VIZWFkZXJTdWJ0aXRsZURpcmVjdGl2ZSxcbiAgTnpQYWdlSGVhZGVyVGFnRGlyZWN0aXZlLFxuICBOelBhZ2VIZWFkZXJUaXRsZURpcmVjdGl2ZVxufSBmcm9tICcuL3BhZ2UtaGVhZGVyLWNlbGxzJztcbmltcG9ydCB7IE56UGFnZUhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vcGFnZS1oZWFkZXIuY29tcG9uZW50JztcblxuY29uc3QgTnpQYWdlSGVhZGVyQ2VsbHMgPSBbXG4gIE56UGFnZUhlYWRlclRpdGxlRGlyZWN0aXZlLFxuICBOelBhZ2VIZWFkZXJTdWJ0aXRsZURpcmVjdGl2ZSxcbiAgTnpQYWdlSGVhZGVyQ29udGVudERpcmVjdGl2ZSxcbiAgTnpQYWdlSGVhZGVyVGFnRGlyZWN0aXZlLFxuICBOelBhZ2VIZWFkZXJFeHRyYURpcmVjdGl2ZSxcbiAgTnpQYWdlSGVhZGVyRm9vdGVyRGlyZWN0aXZlLFxuICBOelBhZ2VIZWFkZXJCcmVhZGNydW1iRGlyZWN0aXZlLFxuICBOelBhZ2VIZWFkZXJBdmF0YXJEaXJlY3RpdmVcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtCaWRpTW9kdWxlLCBDb21tb25Nb2R1bGUsIE56T3V0bGV0TW9kdWxlLCBOekljb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbTnpQYWdlSGVhZGVyQ29tcG9uZW50LCBOelBhZ2VIZWFkZXJDZWxsc10sXG4gIGRlY2xhcmF0aW9uczogW056UGFnZUhlYWRlckNvbXBvbmVudCwgTnpQYWdlSGVhZGVyQ2VsbHNdXG59KVxuZXhwb3J0IGNsYXNzIE56UGFnZUhlYWRlck1vZHVsZSB7fVxuIl19