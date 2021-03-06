/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzSpaceItemLegacyComponent } from './space-item.component';
import { NzSpaceItemDirective } from './space-item.directive';
import { NzSpaceComponent } from './space.component';
export class NzSpaceModule {
}
NzSpaceModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NzSpaceComponent, NzSpaceItemLegacyComponent, NzSpaceItemDirective],
                exports: [NzSpaceComponent, NzSpaceItemLegacyComponent, NzSpaceItemDirective],
                imports: [BidiModule, CommonModule]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhY2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9zcGFjZS9zcGFjZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBT3JELE1BQU0sT0FBTyxhQUFhOzs7WUFMekIsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLGdCQUFnQixFQUFFLDBCQUEwQixFQUFFLG9CQUFvQixDQUFDO2dCQUNsRixPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSwwQkFBMEIsRUFBRSxvQkFBb0IsQ0FBQztnQkFDN0UsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQzthQUNwQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEJpZGlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpTcGFjZUl0ZW1MZWdhY3lDb21wb25lbnQgfSBmcm9tICcuL3NwYWNlLWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IE56U3BhY2VJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi9zcGFjZS1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOelNwYWNlQ29tcG9uZW50IH0gZnJvbSAnLi9zcGFjZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOelNwYWNlQ29tcG9uZW50LCBOelNwYWNlSXRlbUxlZ2FjeUNvbXBvbmVudCwgTnpTcGFjZUl0ZW1EaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbTnpTcGFjZUNvbXBvbmVudCwgTnpTcGFjZUl0ZW1MZWdhY3lDb21wb25lbnQsIE56U3BhY2VJdGVtRGlyZWN0aXZlXSxcbiAgaW1wb3J0czogW0JpZGlNb2R1bGUsIENvbW1vbk1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgTnpTcGFjZU1vZHVsZSB7fVxuIl19