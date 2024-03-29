/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzCardGridDirective } from './card-grid.directive';
import { NzCardLoadingComponent } from './card-loading.component';
import { NzCardMetaComponent } from './card-meta.component';
import { NzCardTabComponent } from './card-tab.component';
import { NzCardComponent } from './card.component';
import * as i0 from "@angular/core";
export class NzCardModule {
}
NzCardModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzCardModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCardModule, declarations: [NzCardComponent, NzCardGridDirective, NzCardMetaComponent, NzCardLoadingComponent, NzCardTabComponent], imports: [CommonModule, NzOutletModule], exports: [BidiModule,
        NzCardComponent,
        NzCardGridDirective,
        NzCardMetaComponent,
        NzCardLoadingComponent,
        NzCardTabComponent] });
NzCardModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCardModule, imports: [[CommonModule, NzOutletModule], BidiModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NzOutletModule],
                    declarations: [NzCardComponent, NzCardGridDirective, NzCardMetaComponent, NzCardLoadingComponent, NzCardTabComponent],
                    exports: [
                        BidiModule,
                        NzCardComponent,
                        NzCardGridDirective,
                        NzCardMetaComponent,
                        NzCardLoadingComponent,
                        NzCardTabComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2NhcmQvY2FyZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0FBY25ELE1BQU0sT0FBTyxZQUFZOzt5R0FBWixZQUFZOzBHQUFaLFlBQVksaUJBVlIsZUFBZSxFQUFFLG1CQUFtQixFQUFFLG1CQUFtQixFQUFFLHNCQUFzQixFQUFFLGtCQUFrQixhQUQxRyxZQUFZLEVBQUUsY0FBYyxhQUdwQyxVQUFVO1FBQ1YsZUFBZTtRQUNmLG1CQUFtQjtRQUNuQixtQkFBbUI7UUFDbkIsc0JBQXNCO1FBQ3RCLGtCQUFrQjswR0FHVCxZQUFZLFlBWGQsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLEVBR3JDLFVBQVU7MkZBUUQsWUFBWTtrQkFaeEIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDO29CQUN2QyxZQUFZLEVBQUUsQ0FBQyxlQUFlLEVBQUUsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsc0JBQXNCLEVBQUUsa0JBQWtCLENBQUM7b0JBQ3JILE9BQU8sRUFBRTt3QkFDUCxVQUFVO3dCQUNWLGVBQWU7d0JBQ2YsbUJBQW1CO3dCQUNuQixtQkFBbUI7d0JBQ25CLHNCQUFzQjt3QkFDdEIsa0JBQWtCO3FCQUNuQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEJpZGlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpPdXRsZXRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvb3V0bGV0JztcblxuaW1wb3J0IHsgTnpDYXJkR3JpZERpcmVjdGl2ZSB9IGZyb20gJy4vY2FyZC1ncmlkLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOekNhcmRMb2FkaW5nQ29tcG9uZW50IH0gZnJvbSAnLi9jYXJkLWxvYWRpbmcuY29tcG9uZW50JztcbmltcG9ydCB7IE56Q2FyZE1ldGFDb21wb25lbnQgfSBmcm9tICcuL2NhcmQtbWV0YS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpDYXJkVGFiQ29tcG9uZW50IH0gZnJvbSAnLi9jYXJkLXRhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpDYXJkQ29tcG9uZW50IH0gZnJvbSAnLi9jYXJkLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE56T3V0bGV0TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTnpDYXJkQ29tcG9uZW50LCBOekNhcmRHcmlkRGlyZWN0aXZlLCBOekNhcmRNZXRhQ29tcG9uZW50LCBOekNhcmRMb2FkaW5nQ29tcG9uZW50LCBOekNhcmRUYWJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbXG4gICAgQmlkaU1vZHVsZSxcbiAgICBOekNhcmRDb21wb25lbnQsXG4gICAgTnpDYXJkR3JpZERpcmVjdGl2ZSxcbiAgICBOekNhcmRNZXRhQ29tcG9uZW50LFxuICAgIE56Q2FyZExvYWRpbmdDb21wb25lbnQsXG4gICAgTnpDYXJkVGFiQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTnpDYXJkTW9kdWxlIHt9XG4iXX0=