/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzSpaceItemDirective } from './space-item.directive';
import { NzSpaceComponent } from './space.component';
import * as i0 from "@angular/core";
export class NzSpaceModule {
}
NzSpaceModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSpaceModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzSpaceModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSpaceModule, declarations: [NzSpaceComponent, NzSpaceItemDirective], imports: [BidiModule, CommonModule], exports: [NzSpaceComponent, NzSpaceItemDirective] });
NzSpaceModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSpaceModule, imports: [[BidiModule, CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSpaceModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzSpaceComponent, NzSpaceItemDirective],
                    exports: [NzSpaceComponent, NzSpaceItemDirective],
                    imports: [BidiModule, CommonModule]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhY2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9zcGFjZS9zcGFjZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQU9yRCxNQUFNLE9BQU8sYUFBYTs7MEdBQWIsYUFBYTsyR0FBYixhQUFhLGlCQUpULGdCQUFnQixFQUFFLG9CQUFvQixhQUUzQyxVQUFVLEVBQUUsWUFBWSxhQUR4QixnQkFBZ0IsRUFBRSxvQkFBb0I7MkdBR3JDLGFBQWEsWUFGZixDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUM7MkZBRXhCLGFBQWE7a0JBTHpCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsb0JBQW9CLENBQUM7b0JBQ3RELE9BQU8sRUFBRSxDQUFDLGdCQUFnQixFQUFFLG9CQUFvQixDQUFDO29CQUNqRCxPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDO2lCQUNwQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEJpZGlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpTcGFjZUl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL3NwYWNlLWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IE56U3BhY2VDb21wb25lbnQgfSBmcm9tICcuL3NwYWNlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW056U3BhY2VDb21wb25lbnQsIE56U3BhY2VJdGVtRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW056U3BhY2VDb21wb25lbnQsIE56U3BhY2VJdGVtRGlyZWN0aXZlXSxcbiAgaW1wb3J0czogW0JpZGlNb2R1bGUsIENvbW1vbk1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgTnpTcGFjZU1vZHVsZSB7fVxuIl19