/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCheckboxGroupComponent } from './checkbox-group.component';
import { NzCheckboxWrapperComponent } from './checkbox-wrapper.component';
import { NzCheckboxComponent } from './checkbox.component';
import * as i0 from "@angular/core";
export class NzCheckboxModule {
}
NzCheckboxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCheckboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzCheckboxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCheckboxModule, declarations: [NzCheckboxComponent, NzCheckboxGroupComponent, NzCheckboxWrapperComponent], imports: [BidiModule, CommonModule, FormsModule, A11yModule], exports: [NzCheckboxComponent, NzCheckboxGroupComponent, NzCheckboxWrapperComponent] });
NzCheckboxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCheckboxModule, imports: [[BidiModule, CommonModule, FormsModule, A11yModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCheckboxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BidiModule, CommonModule, FormsModule, A11yModule],
                    declarations: [NzCheckboxComponent, NzCheckboxGroupComponent, NzCheckboxWrapperComponent],
                    exports: [NzCheckboxComponent, NzCheckboxGroupComponent, NzCheckboxWrapperComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9jaGVja2JveC9jaGVja2JveC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDMUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0FBTzNELE1BQU0sT0FBTyxnQkFBZ0I7OzZHQUFoQixnQkFBZ0I7OEdBQWhCLGdCQUFnQixpQkFIWixtQkFBbUIsRUFBRSx3QkFBd0IsRUFBRSwwQkFBMEIsYUFEOUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsVUFBVSxhQUVqRCxtQkFBbUIsRUFBRSx3QkFBd0IsRUFBRSwwQkFBMEI7OEdBRXhFLGdCQUFnQixZQUpsQixDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQzsyRkFJakQsZ0JBQWdCO2tCQUw1QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQztvQkFDNUQsWUFBWSxFQUFFLENBQUMsbUJBQW1CLEVBQUUsd0JBQXdCLEVBQUUsMEJBQTBCLENBQUM7b0JBQ3pGLE9BQU8sRUFBRSxDQUFDLG1CQUFtQixFQUFFLHdCQUF3QixFQUFFLDBCQUEwQixDQUFDO2lCQUNyRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBCaWRpTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgTnpDaGVja2JveEdyb3VwQ29tcG9uZW50IH0gZnJvbSAnLi9jaGVja2JveC1ncm91cC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpDaGVja2JveFdyYXBwZXJDb21wb25lbnQgfSBmcm9tICcuL2NoZWNrYm94LXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE56Q2hlY2tib3hDb21wb25lbnQgfSBmcm9tICcuL2NoZWNrYm94LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtCaWRpTW9kdWxlLCBDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBBMTF5TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTnpDaGVja2JveENvbXBvbmVudCwgTnpDaGVja2JveEdyb3VwQ29tcG9uZW50LCBOekNoZWNrYm94V3JhcHBlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtOekNoZWNrYm94Q29tcG9uZW50LCBOekNoZWNrYm94R3JvdXBDb21wb25lbnQsIE56Q2hlY2tib3hXcmFwcGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOekNoZWNrYm94TW9kdWxlIHt9XG4iXX0=