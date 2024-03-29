/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { ObserversModule } from '@angular/cdk/observers';
import { PlatformModule } from '@angular/cdk/platform';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabAddButtonComponent } from './tab-add-button.component';
import { NzTabBodyComponent } from './tab-body.component';
import { NzTabCloseButtonComponent } from './tab-close-button.component';
import { NzTabLinkDirective, NzTabLinkTemplateDirective } from './tab-link.directive';
import { NzTabNavBarComponent } from './tab-nav-bar.component';
import { NzTabNavItemDirective } from './tab-nav-item.directive';
import { NzTabNavOperationComponent } from './tab-nav-operation.component';
import { NzTabScrollListDirective } from './tab-scroll-list.directive';
import { NzTabComponent } from './tab.component';
import { NzTabDirective } from './tab.directive';
import { NzTabsInkBarDirective } from './tabs-ink-bar.directive';
import { NzTabSetComponent } from './tabset.component';
import * as i0 from "@angular/core";
const DIRECTIVES = [
    NzTabSetComponent,
    NzTabComponent,
    NzTabNavBarComponent,
    NzTabNavItemDirective,
    NzTabsInkBarDirective,
    NzTabScrollListDirective,
    NzTabNavOperationComponent,
    NzTabAddButtonComponent,
    NzTabCloseButtonComponent,
    NzTabDirective,
    NzTabBodyComponent,
    NzTabLinkDirective,
    NzTabLinkTemplateDirective
];
export class NzTabsModule {
}
NzTabsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTabsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzTabsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTabsModule, declarations: [NzTabSetComponent,
        NzTabComponent,
        NzTabNavBarComponent,
        NzTabNavItemDirective,
        NzTabsInkBarDirective,
        NzTabScrollListDirective,
        NzTabNavOperationComponent,
        NzTabAddButtonComponent,
        NzTabCloseButtonComponent,
        NzTabDirective,
        NzTabBodyComponent,
        NzTabLinkDirective,
        NzTabLinkTemplateDirective], imports: [BidiModule,
        CommonModule,
        ObserversModule,
        NzIconModule,
        NzOutletModule,
        PlatformModule,
        A11yModule,
        CdkScrollableModule,
        NzDropDownModule], exports: [NzTabSetComponent,
        NzTabComponent,
        NzTabNavBarComponent,
        NzTabNavItemDirective,
        NzTabsInkBarDirective,
        NzTabScrollListDirective,
        NzTabNavOperationComponent,
        NzTabAddButtonComponent,
        NzTabCloseButtonComponent,
        NzTabDirective,
        NzTabBodyComponent,
        NzTabLinkDirective,
        NzTabLinkTemplateDirective] });
NzTabsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTabsModule, imports: [[
            BidiModule,
            CommonModule,
            ObserversModule,
            NzIconModule,
            NzOutletModule,
            PlatformModule,
            A11yModule,
            CdkScrollableModule,
            NzDropDownModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTabsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [DIRECTIVES],
                    exports: [DIRECTIVES],
                    imports: [
                        BidiModule,
                        CommonModule,
                        ObserversModule,
                        NzIconModule,
                        NzOutletModule,
                        PlatformModule,
                        A11yModule,
                        CdkScrollableModule,
                        NzDropDownModule
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3RhYnMvdGFicy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDckUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDekUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLDBCQUEwQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDakUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0UsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7QUFFdkQsTUFBTSxVQUFVLEdBQUc7SUFDakIsaUJBQWlCO0lBQ2pCLGNBQWM7SUFDZCxvQkFBb0I7SUFDcEIscUJBQXFCO0lBQ3JCLHFCQUFxQjtJQUNyQix3QkFBd0I7SUFDeEIsMEJBQTBCO0lBQzFCLHVCQUF1QjtJQUN2Qix5QkFBeUI7SUFDekIsY0FBYztJQUNkLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsMEJBQTBCO0NBQzNCLENBQUM7QUFpQkYsTUFBTSxPQUFPLFlBQVk7O3lHQUFaLFlBQVk7MEdBQVosWUFBWSxpQkE5QnZCLGlCQUFpQjtRQUNqQixjQUFjO1FBQ2Qsb0JBQW9CO1FBQ3BCLHFCQUFxQjtRQUNyQixxQkFBcUI7UUFDckIsd0JBQXdCO1FBQ3hCLDBCQUEwQjtRQUMxQix1QkFBdUI7UUFDdkIseUJBQXlCO1FBQ3pCLGNBQWM7UUFDZCxrQkFBa0I7UUFDbEIsa0JBQWtCO1FBQ2xCLDBCQUEwQixhQU94QixVQUFVO1FBQ1YsWUFBWTtRQUNaLGVBQWU7UUFDZixZQUFZO1FBQ1osY0FBYztRQUNkLGNBQWM7UUFDZCxVQUFVO1FBQ1YsbUJBQW1CO1FBQ25CLGdCQUFnQixhQTNCbEIsaUJBQWlCO1FBQ2pCLGNBQWM7UUFDZCxvQkFBb0I7UUFDcEIscUJBQXFCO1FBQ3JCLHFCQUFxQjtRQUNyQix3QkFBd0I7UUFDeEIsMEJBQTBCO1FBQzFCLHVCQUF1QjtRQUN2Qix5QkFBeUI7UUFDekIsY0FBYztRQUNkLGtCQUFrQjtRQUNsQixrQkFBa0I7UUFDbEIsMEJBQTBCOzBHQWtCZixZQUFZLFlBWmQ7WUFDUCxVQUFVO1lBQ1YsWUFBWTtZQUNaLGVBQWU7WUFDZixZQUFZO1lBQ1osY0FBYztZQUNkLGNBQWM7WUFDZCxVQUFVO1lBQ1YsbUJBQW1CO1lBQ25CLGdCQUFnQjtTQUNqQjsyRkFFVSxZQUFZO2tCQWZ4QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLFVBQVUsQ0FBQztvQkFDMUIsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNyQixPQUFPLEVBQUU7d0JBQ1AsVUFBVTt3QkFDVixZQUFZO3dCQUNaLGVBQWU7d0JBQ2YsWUFBWTt3QkFDWixjQUFjO3dCQUNkLGNBQWM7d0JBQ2QsVUFBVTt3QkFDVixtQkFBbUI7d0JBQ25CLGdCQUFnQjtxQkFDakI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQmlkaU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IE9ic2VydmVyc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vYnNlcnZlcnMnO1xuaW1wb3J0IHsgUGxhdGZvcm1Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgQ2RrU2Nyb2xsYWJsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56T3V0bGV0TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL291dGxldCc7XG5pbXBvcnQgeyBOekRyb3BEb3duTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9kcm9wZG93bic7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuXG5pbXBvcnQgeyBOelRhYkFkZEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vdGFiLWFkZC1idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IE56VGFiQm9keUNvbXBvbmVudCB9IGZyb20gJy4vdGFiLWJvZHkuY29tcG9uZW50JztcbmltcG9ydCB7IE56VGFiQ2xvc2VCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL3RhYi1jbG9zZS1idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IE56VGFiTGlua0RpcmVjdGl2ZSwgTnpUYWJMaW5rVGVtcGxhdGVEaXJlY3RpdmUgfSBmcm9tICcuL3RhYi1saW5rLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOelRhYk5hdkJhckNvbXBvbmVudCB9IGZyb20gJy4vdGFiLW5hdi1iYXIuY29tcG9uZW50JztcbmltcG9ydCB7IE56VGFiTmF2SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vdGFiLW5hdi1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOelRhYk5hdk9wZXJhdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vdGFiLW5hdi1vcGVyYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IE56VGFiU2Nyb2xsTGlzdERpcmVjdGl2ZSB9IGZyb20gJy4vdGFiLXNjcm9sbC1saXN0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOelRhYkNvbXBvbmVudCB9IGZyb20gJy4vdGFiLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelRhYkRpcmVjdGl2ZSB9IGZyb20gJy4vdGFiLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOelRhYnNJbmtCYXJEaXJlY3RpdmUgfSBmcm9tICcuL3RhYnMtaW5rLWJhci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpUYWJTZXRDb21wb25lbnQgfSBmcm9tICcuL3RhYnNldC5jb21wb25lbnQnO1xuXG5jb25zdCBESVJFQ1RJVkVTID0gW1xuICBOelRhYlNldENvbXBvbmVudCxcbiAgTnpUYWJDb21wb25lbnQsXG4gIE56VGFiTmF2QmFyQ29tcG9uZW50LFxuICBOelRhYk5hdkl0ZW1EaXJlY3RpdmUsXG4gIE56VGFic0lua0JhckRpcmVjdGl2ZSxcbiAgTnpUYWJTY3JvbGxMaXN0RGlyZWN0aXZlLFxuICBOelRhYk5hdk9wZXJhdGlvbkNvbXBvbmVudCxcbiAgTnpUYWJBZGRCdXR0b25Db21wb25lbnQsXG4gIE56VGFiQ2xvc2VCdXR0b25Db21wb25lbnQsXG4gIE56VGFiRGlyZWN0aXZlLFxuICBOelRhYkJvZHlDb21wb25lbnQsXG4gIE56VGFiTGlua0RpcmVjdGl2ZSxcbiAgTnpUYWJMaW5rVGVtcGxhdGVEaXJlY3RpdmVcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0RJUkVDVElWRVNdLFxuICBleHBvcnRzOiBbRElSRUNUSVZFU10sXG4gIGltcG9ydHM6IFtcbiAgICBCaWRpTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBPYnNlcnZlcnNNb2R1bGUsXG4gICAgTnpJY29uTW9kdWxlLFxuICAgIE56T3V0bGV0TW9kdWxlLFxuICAgIFBsYXRmb3JtTW9kdWxlLFxuICAgIEExMXlNb2R1bGUsXG4gICAgQ2RrU2Nyb2xsYWJsZU1vZHVsZSxcbiAgICBOekRyb3BEb3duTW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTnpUYWJzTW9kdWxlIHt9XG4iXX0=