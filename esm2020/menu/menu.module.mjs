/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuDividerDirective } from './menu-divider.directive';
import { NzMenuGroupComponent } from './menu-group.component';
import { NzMenuItemDirective } from './menu-item.directive';
import { NzMenuDirective } from './menu.directive';
import { NzSubmenuInlineChildComponent } from './submenu-inline-child.component';
import { NzSubmenuNoneInlineChildComponent } from './submenu-non-inline-child.component';
import { NzSubMenuTitleComponent } from './submenu-title.component';
import { NzSubMenuComponent } from './submenu.component';
import * as i0 from "@angular/core";
export class NzMenuModule {
}
NzMenuModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzMenuModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMenuModule, declarations: [NzMenuDirective,
        NzMenuItemDirective,
        NzSubMenuComponent,
        NzMenuDividerDirective,
        NzMenuGroupComponent,
        NzSubMenuTitleComponent,
        NzSubmenuInlineChildComponent,
        NzSubmenuNoneInlineChildComponent], imports: [BidiModule, CommonModule, PlatformModule, OverlayModule, NzIconModule, NzNoAnimationModule, NzOutletModule], exports: [NzMenuDirective, NzMenuItemDirective, NzSubMenuComponent, NzMenuDividerDirective, NzMenuGroupComponent] });
NzMenuModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMenuModule, imports: [[BidiModule, CommonModule, PlatformModule, OverlayModule, NzIconModule, NzNoAnimationModule, NzOutletModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BidiModule, CommonModule, PlatformModule, OverlayModule, NzIconModule, NzNoAnimationModule, NzOutletModule],
                    declarations: [
                        NzMenuDirective,
                        NzMenuItemDirective,
                        NzSubMenuComponent,
                        NzMenuDividerDirective,
                        NzMenuGroupComponent,
                        NzSubMenuTitleComponent,
                        NzSubmenuInlineChildComponent,
                        NzSubmenuNoneInlineChildComponent
                    ],
                    exports: [NzMenuDirective, NzMenuItemDirective, NzSubMenuComponent, NzMenuDividerDirective, NzMenuGroupComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL21lbnUvbWVudS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbkQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDakYsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDekYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBZ0J6RCxNQUFNLE9BQU8sWUFBWTs7eUdBQVosWUFBWTswR0FBWixZQUFZLGlCQVhyQixlQUFlO1FBQ2YsbUJBQW1CO1FBQ25CLGtCQUFrQjtRQUNsQixzQkFBc0I7UUFDdEIsb0JBQW9CO1FBQ3BCLHVCQUF1QjtRQUN2Qiw2QkFBNkI7UUFDN0IsaUNBQWlDLGFBVHpCLFVBQVUsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsY0FBYyxhQVcxRyxlQUFlLEVBQUUsbUJBQW1CLEVBQUUsa0JBQWtCLEVBQUUsc0JBQXNCLEVBQUUsb0JBQW9COzBHQUVyRyxZQUFZLFlBYmQsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLGNBQWMsQ0FBQzsyRkFhMUcsWUFBWTtrQkFkeEIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLGNBQWMsQ0FBQztvQkFDckgsWUFBWSxFQUFFO3dCQUNaLGVBQWU7d0JBQ2YsbUJBQW1CO3dCQUNuQixrQkFBa0I7d0JBQ2xCLHNCQUFzQjt3QkFDdEIsb0JBQW9CO3dCQUNwQix1QkFBdUI7d0JBQ3ZCLDZCQUE2Qjt3QkFDN0IsaUNBQWlDO3FCQUNsQztvQkFDRCxPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsbUJBQW1CLEVBQUUsa0JBQWtCLEVBQUUsc0JBQXNCLEVBQUUsb0JBQW9CLENBQUM7aUJBQ2xIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQmlkaU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBQbGF0Zm9ybU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpOb0FuaW1hdGlvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9uby1hbmltYXRpb24nO1xuaW1wb3J0IHsgTnpPdXRsZXRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvb3V0bGV0JztcbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5cbmltcG9ydCB7IE56TWVudURpdmlkZXJEaXJlY3RpdmUgfSBmcm9tICcuL21lbnUtZGl2aWRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpNZW51R3JvdXBDb21wb25lbnQgfSBmcm9tICcuL21lbnUtZ3JvdXAuY29tcG9uZW50JztcbmltcG9ydCB7IE56TWVudUl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL21lbnUtaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpNZW51RGlyZWN0aXZlIH0gZnJvbSAnLi9tZW51LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOelN1Ym1lbnVJbmxpbmVDaGlsZENvbXBvbmVudCB9IGZyb20gJy4vc3VibWVudS1pbmxpbmUtY2hpbGQuY29tcG9uZW50JztcbmltcG9ydCB7IE56U3VibWVudU5vbmVJbmxpbmVDaGlsZENvbXBvbmVudCB9IGZyb20gJy4vc3VibWVudS1ub24taW5saW5lLWNoaWxkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelN1Yk1lbnVUaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vc3VibWVudS10aXRsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpTdWJNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9zdWJtZW51LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtCaWRpTW9kdWxlLCBDb21tb25Nb2R1bGUsIFBsYXRmb3JtTW9kdWxlLCBPdmVybGF5TW9kdWxlLCBOekljb25Nb2R1bGUsIE56Tm9BbmltYXRpb25Nb2R1bGUsIE56T3V0bGV0TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTnpNZW51RGlyZWN0aXZlLFxuICAgIE56TWVudUl0ZW1EaXJlY3RpdmUsXG4gICAgTnpTdWJNZW51Q29tcG9uZW50LFxuICAgIE56TWVudURpdmlkZXJEaXJlY3RpdmUsXG4gICAgTnpNZW51R3JvdXBDb21wb25lbnQsXG4gICAgTnpTdWJNZW51VGl0bGVDb21wb25lbnQsXG4gICAgTnpTdWJtZW51SW5saW5lQ2hpbGRDb21wb25lbnQsXG4gICAgTnpTdWJtZW51Tm9uZUlubGluZUNoaWxkQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtOek1lbnVEaXJlY3RpdmUsIE56TWVudUl0ZW1EaXJlY3RpdmUsIE56U3ViTWVudUNvbXBvbmVudCwgTnpNZW51RGl2aWRlckRpcmVjdGl2ZSwgTnpNZW51R3JvdXBDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE56TWVudU1vZHVsZSB7fVxuIl19