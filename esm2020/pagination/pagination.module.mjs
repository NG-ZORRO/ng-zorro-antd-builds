/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPaginationDefaultComponent } from './pagination-default.component';
import { NzPaginationItemComponent } from './pagination-item.component';
import { NzPaginationOptionsComponent } from './pagination-options.component';
import { NzPaginationSimpleComponent } from './pagination-simple.component';
import { NzPaginationComponent } from './pagination.component';
import * as i0 from "@angular/core";
export class NzPaginationModule {
}
NzPaginationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzPaginationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationModule, declarations: [NzPaginationComponent,
        NzPaginationSimpleComponent,
        NzPaginationOptionsComponent,
        NzPaginationItemComponent,
        NzPaginationDefaultComponent], imports: [BidiModule, CommonModule, FormsModule, NzSelectModule, NzI18nModule, NzIconModule], exports: [NzPaginationComponent] });
NzPaginationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationModule, imports: [[BidiModule, CommonModule, FormsModule, NzSelectModule, NzI18nModule, NzIconModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NzPaginationComponent,
                        NzPaginationSimpleComponent,
                        NzPaginationOptionsComponent,
                        NzPaginationItemComponent,
                        NzPaginationDefaultComponent
                    ],
                    exports: [NzPaginationComponent],
                    imports: [BidiModule, CommonModule, FormsModule, NzSelectModule, NzI18nModule, NzIconModule]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV0RCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFhL0QsTUFBTSxPQUFPLGtCQUFrQjs7K0dBQWxCLGtCQUFrQjtnSEFBbEIsa0JBQWtCLGlCQVQzQixxQkFBcUI7UUFDckIsMkJBQTJCO1FBQzNCLDRCQUE0QjtRQUM1Qix5QkFBeUI7UUFDekIsNEJBQTRCLGFBR3BCLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsWUFBWSxhQURqRixxQkFBcUI7Z0hBR3BCLGtCQUFrQixZQUZwQixDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDOzJGQUVqRixrQkFBa0I7a0JBWDlCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLHFCQUFxQjt3QkFDckIsMkJBQTJCO3dCQUMzQiw0QkFBNEI7d0JBQzVCLHlCQUF5Qjt3QkFDekIsNEJBQTRCO3FCQUM3QjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztvQkFDaEMsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUM7aUJBQzdGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQmlkaU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IE56STE4bk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaTE4bic7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuaW1wb3J0IHsgTnpTZWxlY3RNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3NlbGVjdCc7XG5cbmltcG9ydCB7IE56UGFnaW5hdGlvbkRlZmF1bHRDb21wb25lbnQgfSBmcm9tICcuL3BhZ2luYXRpb24tZGVmYXVsdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpQYWdpbmF0aW9uSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vcGFnaW5hdGlvbi1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelBhZ2luYXRpb25PcHRpb25zQ29tcG9uZW50IH0gZnJvbSAnLi9wYWdpbmF0aW9uLW9wdGlvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IE56UGFnaW5hdGlvblNpbXBsZUNvbXBvbmVudCB9IGZyb20gJy4vcGFnaW5hdGlvbi1zaW1wbGUuY29tcG9uZW50JztcbmltcG9ydCB7IE56UGFnaW5hdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vcGFnaW5hdGlvbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOelBhZ2luYXRpb25Db21wb25lbnQsXG4gICAgTnpQYWdpbmF0aW9uU2ltcGxlQ29tcG9uZW50LFxuICAgIE56UGFnaW5hdGlvbk9wdGlvbnNDb21wb25lbnQsXG4gICAgTnpQYWdpbmF0aW9uSXRlbUNvbXBvbmVudCxcbiAgICBOelBhZ2luYXRpb25EZWZhdWx0Q29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtOelBhZ2luYXRpb25Db21wb25lbnRdLFxuICBpbXBvcnRzOiBbQmlkaU1vZHVsZSwgQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgTnpTZWxlY3RNb2R1bGUsIE56STE4bk1vZHVsZSwgTnpJY29uTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBOelBhZ2luYXRpb25Nb2R1bGUge31cbiJdfQ==