/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResizeObserverModule } from 'ng-zorro-antd/cdk/resize-observer';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFilterTriggerComponent } from './addon/filter-trigger.component';
import { NzTableFilterComponent } from './addon/filter.component';
import { NzRowExpandButtonDirective } from './addon/row-expand-button.directive';
import { NzRowIndentDirective } from './addon/row-indent.directive';
import { NzTableSelectionComponent } from './addon/selection.component';
import { NzTableSortersComponent } from './addon/sorters.component';
import { NzCellFixedDirective } from './cell/cell-fixed.directive';
import { NzTableCellDirective } from './cell/cell.directive';
import { NzTdAddOnComponent } from './cell/td-addon.component';
import { NzThAddOnComponent } from './cell/th-addon.component';
import { NzThMeasureDirective } from './cell/th-measure.directive';
import { NzThSelectionComponent } from './cell/th-selection.component';
import { NzCellAlignDirective } from './styled/align.directive';
import { NzCellEllipsisDirective } from './styled/ellipsis.directive';
import { NzCellBreakWordDirective } from './styled/word-break.directive';
import { NzTableContentComponent } from './table/table-content.component';
import { NzTableFixedRowComponent } from './table/table-fixed-row.component';
import { NzTableInnerDefaultComponent } from './table/table-inner-default.component';
import { NzTableInnerScrollComponent } from './table/table-inner-scroll.component';
import { NzTableVirtualScrollDirective } from './table/table-virtual-scroll.directive';
import { NzTableComponent } from './table/table.component';
import { NzTbodyComponent } from './table/tbody.component';
import { NzTheadComponent } from './table/thead.component';
import { NzTableTitleFooterComponent } from './table/title-footer.component';
import { NzTrExpandDirective } from './table/tr-expand.directive';
import { NzTrMeasureComponent } from './table/tr-measure.component';
import { NzTrDirective } from './table/tr.directive';
import * as i0 from "@angular/core";
export class NzTableModule {
}
NzTableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzTableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableModule, declarations: [NzTableComponent,
        NzThAddOnComponent,
        NzTableCellDirective,
        NzThMeasureDirective,
        NzTdAddOnComponent,
        NzTheadComponent,
        NzTbodyComponent,
        NzTrDirective,
        NzTrExpandDirective,
        NzTableVirtualScrollDirective,
        NzCellFixedDirective,
        NzTableContentComponent,
        NzTableTitleFooterComponent,
        NzTableInnerDefaultComponent,
        NzTableInnerScrollComponent,
        NzTrMeasureComponent,
        NzRowIndentDirective,
        NzRowExpandButtonDirective,
        NzCellBreakWordDirective,
        NzCellAlignDirective,
        NzTableSortersComponent,
        NzTableFilterComponent,
        NzTableSelectionComponent,
        NzCellEllipsisDirective,
        NzFilterTriggerComponent,
        NzTableFixedRowComponent,
        NzThSelectionComponent], imports: [BidiModule,
        NzMenuModule,
        FormsModule,
        NzOutletModule,
        NzRadioModule,
        NzCheckboxModule,
        NzDropDownModule,
        NzButtonModule,
        CommonModule,
        PlatformModule,
        NzPaginationModule,
        NzResizeObserverModule,
        NzSpinModule,
        NzI18nModule,
        NzIconModule,
        NzEmptyModule,
        ScrollingModule], exports: [NzTableComponent,
        NzThAddOnComponent,
        NzTableCellDirective,
        NzThMeasureDirective,
        NzTdAddOnComponent,
        NzTheadComponent,
        NzTbodyComponent,
        NzTrDirective,
        NzTableVirtualScrollDirective,
        NzCellFixedDirective,
        NzFilterTriggerComponent,
        NzTrExpandDirective,
        NzCellBreakWordDirective,
        NzCellAlignDirective,
        NzCellEllipsisDirective,
        NzTableFixedRowComponent,
        NzThSelectionComponent] });
NzTableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableModule, imports: [[
            BidiModule,
            NzMenuModule,
            FormsModule,
            NzOutletModule,
            NzRadioModule,
            NzCheckboxModule,
            NzDropDownModule,
            NzButtonModule,
            CommonModule,
            PlatformModule,
            NzPaginationModule,
            NzResizeObserverModule,
            NzSpinModule,
            NzI18nModule,
            NzIconModule,
            NzEmptyModule,
            ScrollingModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NzTableComponent,
                        NzThAddOnComponent,
                        NzTableCellDirective,
                        NzThMeasureDirective,
                        NzTdAddOnComponent,
                        NzTheadComponent,
                        NzTbodyComponent,
                        NzTrDirective,
                        NzTrExpandDirective,
                        NzTableVirtualScrollDirective,
                        NzCellFixedDirective,
                        NzTableContentComponent,
                        NzTableTitleFooterComponent,
                        NzTableInnerDefaultComponent,
                        NzTableInnerScrollComponent,
                        NzTrMeasureComponent,
                        NzRowIndentDirective,
                        NzRowExpandButtonDirective,
                        NzCellBreakWordDirective,
                        NzCellAlignDirective,
                        NzTableSortersComponent,
                        NzTableFilterComponent,
                        NzTableSelectionComponent,
                        NzCellEllipsisDirective,
                        NzFilterTriggerComponent,
                        NzTableFixedRowComponent,
                        NzThSelectionComponent
                    ],
                    exports: [
                        NzTableComponent,
                        NzThAddOnComponent,
                        NzTableCellDirective,
                        NzThMeasureDirective,
                        NzTdAddOnComponent,
                        NzTheadComponent,
                        NzTbodyComponent,
                        NzTrDirective,
                        NzTableVirtualScrollDirective,
                        NzCellFixedDirective,
                        NzFilterTriggerComponent,
                        NzTrExpandDirective,
                        NzCellBreakWordDirective,
                        NzCellAlignDirective,
                        NzCellEllipsisDirective,
                        NzTableFixedRowComponent,
                        NzThSelectionComponent
                    ],
                    imports: [
                        BidiModule,
                        NzMenuModule,
                        FormsModule,
                        NzOutletModule,
                        NzRadioModule,
                        NzCheckboxModule,
                        NzDropDownModule,
                        NzButtonModule,
                        CommonModule,
                        PlatformModule,
                        NzPaginationModule,
                        NzResizeObserverModule,
                        NzSpinModule,
                        NzI18nModule,
                        NzIconModule,
                        NzEmptyModule,
                        ScrollingModule
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy90YWJsZS9zcmMvdGFibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDM0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxF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QWdCO3dCQUNoQixrQkFBa0I7d0JBQ2xCLG9CQUFvQjt3QkFDcEIsb0JBQW9CO3dCQUNwQixrQkFBa0I7d0JBQ2xCLGdCQUFnQjt3QkFDaEIsZ0JBQWdCO3dCQUNoQixhQUFhO3dCQUNiLDZCQUE2Qjt3QkFDN0Isb0JBQW9CO3dCQUNwQix3QkFBd0I7d0JBQ3hCLG1CQUFtQjt3QkFDbkIsd0JBQXdCO3dCQUN4QixvQkFBb0I7d0JBQ3BCLHVCQUF1Qjt3QkFDdkIsd0JBQXdCO3dCQUN4QixzQkFBc0I7cUJBQ3ZCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxVQUFVO3dCQUNWLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxjQUFjO3dCQUNkLGFBQWE7d0JBQ2IsZ0JBQWdCO3dCQUNoQixnQkFBZ0I7d0JBQ2hCLGNBQWM7d0JBQ2QsWUFBWTt3QkFDWixjQUFjO3dCQUNkLGtCQUFrQjt3QkFDbEIsc0JBQXNCO3dCQUN0QixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixhQUFhO3dCQUNiLGVBQWU7cUJBQ2hCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQmlkaU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IFBsYXRmb3JtTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IFNjcm9sbGluZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgTnpCdXR0b25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2J1dHRvbic7XG5pbXBvcnQgeyBOelJlc2l6ZU9ic2VydmVyTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jZGsvcmVzaXplLW9ic2VydmVyJztcbmltcG9ydCB7IE56Q2hlY2tib3hNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NoZWNrYm94JztcbmltcG9ydCB7IE56T3V0bGV0TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL291dGxldCc7XG5pbXBvcnQgeyBOekRyb3BEb3duTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9kcm9wZG93bic7XG5pbXBvcnQgeyBOekVtcHR5TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9lbXB0eSc7XG5pbXBvcnQgeyBOekkxOG5Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcbmltcG9ydCB7IE56TWVudU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbWVudSc7XG5pbXBvcnQgeyBOelBhZ2luYXRpb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3BhZ2luYXRpb24nO1xuaW1wb3J0IHsgTnpSYWRpb01vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvcmFkaW8nO1xuaW1wb3J0IHsgTnpTcGluTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9zcGluJztcblxuaW1wb3J0IHsgTnpGaWx0ZXJUcmlnZ2VyQ29tcG9uZW50IH0gZnJvbSAnLi9hZGRvbi9maWx0ZXItdHJpZ2dlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpUYWJsZUZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vYWRkb24vZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelJvd0V4cGFuZEJ1dHRvbkRpcmVjdGl2ZSB9IGZyb20gJy4vYWRkb24vcm93LWV4cGFuZC1idXR0b24uZGlyZWN0aXZlJztcbmltcG9ydCB7IE56Um93SW5kZW50RGlyZWN0aXZlIH0gZnJvbSAnLi9hZGRvbi9yb3ctaW5kZW50LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOelRhYmxlU2VsZWN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9hZGRvbi9zZWxlY3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7IE56VGFibGVTb3J0ZXJzQ29tcG9uZW50IH0gZnJvbSAnLi9hZGRvbi9zb3J0ZXJzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOekNlbGxGaXhlZERpcmVjdGl2ZSB9IGZyb20gJy4vY2VsbC9jZWxsLWZpeGVkLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOelRhYmxlQ2VsbERpcmVjdGl2ZSB9IGZyb20gJy4vY2VsbC9jZWxsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOelRkQWRkT25Db21wb25lbnQgfSBmcm9tICcuL2NlbGwvdGQtYWRkb24uY29tcG9uZW50JztcbmltcG9ydCB7IE56VGhBZGRPbkNvbXBvbmVudCB9IGZyb20gJy4vY2VsbC90aC1hZGRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpUaE1lYXN1cmVEaXJlY3RpdmUgfSBmcm9tICcuL2NlbGwvdGgtbWVhc3VyZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpUaFNlbGVjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY2VsbC90aC1zZWxlY3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7IE56Q2VsbEFsaWduRGlyZWN0aXZlIH0gZnJvbSAnLi9zdHlsZWQvYWxpZ24uZGlyZWN0aXZlJztcbmltcG9ydCB7IE56Q2VsbEVsbGlwc2lzRGlyZWN0aXZlIH0gZnJvbSAnLi9zdHlsZWQvZWxsaXBzaXMuZGlyZWN0aXZlJztcbmltcG9ydCB7IE56Q2VsbEJyZWFrV29yZERpcmVjdGl2ZSB9IGZyb20gJy4vc3R5bGVkL3dvcmQtYnJlYWsuZGlyZWN0aXZlJztcbmltcG9ydCB7IE56VGFibGVDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS90YWJsZS1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelRhYmxlRml4ZWRSb3dDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlL3RhYmxlLWZpeGVkLXJvdy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpUYWJsZUlubmVyRGVmYXVsdENvbXBvbmVudCB9IGZyb20gJy4vdGFibGUvdGFibGUtaW5uZXItZGVmYXVsdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpUYWJsZUlubmVyU2Nyb2xsQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS90YWJsZS1pbm5lci1zY3JvbGwuY29tcG9uZW50JztcbmltcG9ydCB7IE56VGFibGVWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlIH0gZnJvbSAnLi90YWJsZS90YWJsZS12aXJ0dWFsLXNjcm9sbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUvdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IE56VGJvZHlDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlL3Rib2R5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelRoZWFkQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS90aGVhZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpUYWJsZVRpdGxlRm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS90aXRsZS1mb290ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE56VHJFeHBhbmREaXJlY3RpdmUgfSBmcm9tICcuL3RhYmxlL3RyLWV4cGFuZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpUck1lYXN1cmVDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlL3RyLW1lYXN1cmUuY29tcG9uZW50JztcbmltcG9ydCB7IE56VHJEaXJlY3RpdmUgfSBmcm9tICcuL3RhYmxlL3RyLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE56VGFibGVDb21wb25lbnQsXG4gICAgTnpUaEFkZE9uQ29tcG9uZW50LFxuICAgIE56VGFibGVDZWxsRGlyZWN0aXZlLFxuICAgIE56VGhNZWFzdXJlRGlyZWN0aXZlLFxuICAgIE56VGRBZGRPbkNvbXBvbmVudCxcbiAgICBOelRoZWFkQ29tcG9uZW50LFxuICAgIE56VGJvZHlDb21wb25lbnQsXG4gICAgTnpUckRpcmVjdGl2ZSxcbiAgICBOelRyRXhwYW5kRGlyZWN0aXZlLFxuICAgIE56VGFibGVWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlLFxuICAgIE56Q2VsbEZpeGVkRGlyZWN0aXZlLFxuICAgIE56VGFibGVDb250ZW50Q29tcG9uZW50LFxuICAgIE56VGFibGVUaXRsZUZvb3RlckNvbXBvbmVudCxcbiAgICBOelRhYmxlSW5uZXJEZWZhdWx0Q29tcG9uZW50LFxuICAgIE56VGFibGVJbm5lclNjcm9sbENvbXBvbmVudCxcbiAgICBOelRyTWVhc3VyZUNvbXBvbmVudCxcbiAgICBOelJvd0luZGVudERpcmVjdGl2ZSxcbiAgICBOelJvd0V4cGFuZEJ1dHRvbkRpcmVjdGl2ZSxcbiAgICBOekNlbGxCcmVha1dvcmREaXJlY3RpdmUsXG4gICAgTnpDZWxsQWxpZ25EaXJlY3RpdmUsXG4gICAgTnpUYWJsZVNvcnRlcnNDb21wb25lbnQsXG4gICAgTnpUYWJsZUZpbHRlckNvbXBvbmVudCxcbiAgICBOelRhYmxlU2VsZWN0aW9uQ29tcG9uZW50LFxuICAgIE56Q2VsbEVsbGlwc2lzRGlyZWN0aXZlLFxuICAgIE56RmlsdGVyVHJpZ2dlckNvbXBvbmVudCxcbiAgICBOelRhYmxlRml4ZWRSb3dDb21wb25lbnQsXG4gICAgTnpUaFNlbGVjdGlvbkNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTnpUYWJsZUNvbXBvbmVudCxcbiAgICBOelRoQWRkT25Db21wb25lbnQsXG4gICAgTnpUYWJsZUNlbGxEaXJlY3RpdmUsXG4gICAgTnpUaE1lYXN1cmVEaXJlY3RpdmUsXG4gICAgTnpUZEFkZE9uQ29tcG9uZW50LFxuICAgIE56VGhlYWRDb21wb25lbnQsXG4gICAgTnpUYm9keUNvbXBvbmVudCxcbiAgICBOelRyRGlyZWN0aXZlLFxuICAgIE56VGFibGVWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlLFxuICAgIE56Q2VsbEZpeGVkRGlyZWN0aXZlLFxuICAgIE56RmlsdGVyVHJpZ2dlckNvbXBvbmVudCxcbiAgICBOelRyRXhwYW5kRGlyZWN0aXZlLFxuICAgIE56Q2VsbEJyZWFrV29yZERpcmVjdGl2ZSxcbiAgICBOekNlbGxBbGlnbkRpcmVjdGl2ZSxcbiAgICBOekNlbGxFbGxpcHNpc0RpcmVjdGl2ZSxcbiAgICBOelRhYmxlRml4ZWRSb3dDb21wb25lbnQsXG4gICAgTnpUaFNlbGVjdGlvbkNvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQmlkaU1vZHVsZSxcbiAgICBOek1lbnVNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTnpPdXRsZXRNb2R1bGUsXG4gICAgTnpSYWRpb01vZHVsZSxcbiAgICBOekNoZWNrYm94TW9kdWxlLFxuICAgIE56RHJvcERvd25Nb2R1bGUsXG4gICAgTnpCdXR0b25Nb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFBsYXRmb3JtTW9kdWxlLFxuICAgIE56UGFnaW5hdGlvbk1vZHVsZSxcbiAgICBOelJlc2l6ZU9ic2VydmVyTW9kdWxlLFxuICAgIE56U3Bpbk1vZHVsZSxcbiAgICBOekkxOG5Nb2R1bGUsXG4gICAgTnpJY29uTW9kdWxlLFxuICAgIE56RW1wdHlNb2R1bGUsXG4gICAgU2Nyb2xsaW5nTW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTnpUYWJsZU1vZHVsZSB7fVxuIl19