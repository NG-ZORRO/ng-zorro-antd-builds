/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzRadioButtonDirective } from './radio-button.directive';
import { NzRadioGroupComponent } from './radio-group.component';
import { NzRadioComponent } from './radio.component';
import * as i0 from "@angular/core";
export class NzRadioModule {
}
NzRadioModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRadioModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzRadioModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRadioModule, declarations: [NzRadioComponent, NzRadioButtonDirective, NzRadioGroupComponent], imports: [BidiModule, CommonModule, FormsModule], exports: [NzRadioComponent, NzRadioButtonDirective, NzRadioGroupComponent] });
NzRadioModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRadioModule, imports: [[BidiModule, CommonModule, FormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRadioModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BidiModule, CommonModule, FormsModule],
                    exports: [NzRadioComponent, NzRadioButtonDirective, NzRadioGroupComponent],
                    declarations: [NzRadioComponent, NzRadioButtonDirective, NzRadioGroupComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9yYWRpby9yYWRpby5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFPckQsTUFBTSxPQUFPLGFBQWE7OzBHQUFiLGFBQWE7MkdBQWIsYUFBYSxpQkFGVCxnQkFBZ0IsRUFBRSxzQkFBc0IsRUFBRSxxQkFBcUIsYUFGcEUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLGFBQ3JDLGdCQUFnQixFQUFFLHNCQUFzQixFQUFFLHFCQUFxQjsyR0FHOUQsYUFBYSxZQUpmLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLENBQUM7MkZBSXJDLGFBQWE7a0JBTHpCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLENBQUM7b0JBQ2hELE9BQU8sRUFBRSxDQUFDLGdCQUFnQixFQUFFLHNCQUFzQixFQUFFLHFCQUFxQixDQUFDO29CQUMxRSxZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxzQkFBc0IsRUFBRSxxQkFBcUIsQ0FBQztpQkFDaEYiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBCaWRpTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgTnpSYWRpb0J1dHRvbkRpcmVjdGl2ZSB9IGZyb20gJy4vcmFkaW8tYnV0dG9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOelJhZGlvR3JvdXBDb21wb25lbnQgfSBmcm9tICcuL3JhZGlvLWdyb3VwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelJhZGlvQ29tcG9uZW50IH0gZnJvbSAnLi9yYWRpby5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQmlkaU1vZHVsZSwgQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZV0sXG4gIGV4cG9ydHM6IFtOelJhZGlvQ29tcG9uZW50LCBOelJhZGlvQnV0dG9uRGlyZWN0aXZlLCBOelJhZGlvR3JvdXBDb21wb25lbnRdLFxuICBkZWNsYXJhdGlvbnM6IFtOelJhZGlvQ29tcG9uZW50LCBOelJhZGlvQnV0dG9uRGlyZWN0aXZlLCBOelJhZGlvR3JvdXBDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE56UmFkaW9Nb2R1bGUge31cbiJdfQ==