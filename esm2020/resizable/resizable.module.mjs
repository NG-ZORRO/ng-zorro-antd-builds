/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzResizableDirective } from './resizable.directive';
import { NzResizeHandleComponent } from './resize-handle.component';
import { NzResizeHandlesComponent } from './resize-handles.component';
import * as i0 from "@angular/core";
export class NzResizableModule {
}
NzResizableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzResizableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizableModule, declarations: [NzResizableDirective, NzResizeHandleComponent, NzResizeHandlesComponent], imports: [CommonModule], exports: [NzResizableDirective, NzResizeHandleComponent, NzResizeHandlesComponent] });
NzResizableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizableModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [NzResizableDirective, NzResizeHandleComponent, NzResizeHandlesComponent],
                    exports: [NzResizableDirective, NzResizeHandleComponent, NzResizeHandlesComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvcmVzaXphYmxlL3Jlc2l6YWJsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDcEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0FBT3RFLE1BQU0sT0FBTyxpQkFBaUI7OzhHQUFqQixpQkFBaUI7K0dBQWpCLGlCQUFpQixpQkFIYixvQkFBb0IsRUFBRSx1QkFBdUIsRUFBRSx3QkFBd0IsYUFENUUsWUFBWSxhQUVaLG9CQUFvQixFQUFFLHVCQUF1QixFQUFFLHdCQUF3QjsrR0FFdEUsaUJBQWlCLFlBSm5CLENBQUMsWUFBWSxDQUFDOzJGQUlaLGlCQUFpQjtrQkFMN0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFlBQVksRUFBRSxDQUFDLG9CQUFvQixFQUFFLHVCQUF1QixFQUFFLHdCQUF3QixDQUFDO29CQUN2RixPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSx1QkFBdUIsRUFBRSx3QkFBd0IsQ0FBQztpQkFDbkYiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpSZXNpemFibGVEaXJlY3RpdmUgfSBmcm9tICcuL3Jlc2l6YWJsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpSZXNpemVIYW5kbGVDb21wb25lbnQgfSBmcm9tICcuL3Jlc2l6ZS1oYW5kbGUuY29tcG9uZW50JztcbmltcG9ydCB7IE56UmVzaXplSGFuZGxlc0NvbXBvbmVudCB9IGZyb20gJy4vcmVzaXplLWhhbmRsZXMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW056UmVzaXphYmxlRGlyZWN0aXZlLCBOelJlc2l6ZUhhbmRsZUNvbXBvbmVudCwgTnpSZXNpemVIYW5kbGVzQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW056UmVzaXphYmxlRGlyZWN0aXZlLCBOelJlc2l6ZUhhbmRsZUNvbXBvbmVudCwgTnpSZXNpemVIYW5kbGVzQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOelJlc2l6YWJsZU1vZHVsZSB7fVxuIl19