/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagComponent } from './tag.component';
import * as i0 from "@angular/core";
export class NzTagModule {
}
NzTagModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTagModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzTagModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTagModule, declarations: [NzTagComponent], imports: [BidiModule, CommonModule, FormsModule, NzIconModule], exports: [NzTagComponent] });
NzTagModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTagModule, imports: [[BidiModule, CommonModule, FormsModule, NzIconModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTagModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BidiModule, CommonModule, FormsModule, NzIconModule],
                    declarations: [NzTagComponent],
                    exports: [NzTagComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvdGFnL3RhZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQU9qRCxNQUFNLE9BQU8sV0FBVzs7d0dBQVgsV0FBVzt5R0FBWCxXQUFXLGlCQUhQLGNBQWMsYUFEbkIsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxhQUVuRCxjQUFjO3lHQUViLFdBQVcsWUFKYixDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksQ0FBQzsyRkFJbkQsV0FBVztrQkFMdkIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUM7b0JBQzlELFlBQVksRUFBRSxDQUFDLGNBQWMsQ0FBQztvQkFDOUIsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO2lCQUMxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEJpZGlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuXG5pbXBvcnQgeyBOelRhZ0NvbXBvbmVudCB9IGZyb20gJy4vdGFnLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtCaWRpTW9kdWxlLCBDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBOekljb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOelRhZ0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtOelRhZ0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTnpUYWdNb2R1bGUge31cbiJdfQ==