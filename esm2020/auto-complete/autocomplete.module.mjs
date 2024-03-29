/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAutocompleteOptgroupComponent } from './autocomplete-optgroup.component';
import { NzAutocompleteOptionComponent } from './autocomplete-option.component';
import { NzAutocompleteTriggerDirective } from './autocomplete-trigger.directive';
import { NzAutocompleteComponent } from './autocomplete.component';
import * as i0 from "@angular/core";
export class NzAutocompleteModule {
}
NzAutocompleteModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAutocompleteModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzAutocompleteModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAutocompleteModule, declarations: [NzAutocompleteComponent,
        NzAutocompleteOptionComponent,
        NzAutocompleteTriggerDirective,
        NzAutocompleteOptgroupComponent], imports: [BidiModule, CommonModule, OverlayModule, FormsModule, NzOutletModule, NzNoAnimationModule, NzInputModule], exports: [NzAutocompleteComponent,
        NzAutocompleteOptionComponent,
        NzAutocompleteTriggerDirective,
        NzAutocompleteOptgroupComponent] });
NzAutocompleteModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAutocompleteModule, imports: [[BidiModule, CommonModule, OverlayModule, FormsModule, NzOutletModule, NzNoAnimationModule, NzInputModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAutocompleteModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NzAutocompleteComponent,
                        NzAutocompleteOptionComponent,
                        NzAutocompleteTriggerDirective,
                        NzAutocompleteOptgroupComponent
                    ],
                    exports: [
                        NzAutocompleteComponent,
                        NzAutocompleteOptionComponent,
                        NzAutocompleteTriggerDirective,
                        NzAutocompleteOptgroupComponent
                    ],
                    imports: [BidiModule, CommonModule, OverlayModule, FormsModule, NzOutletModule, NzNoAnimationModule, NzInputModule]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvYXV0by1jb21wbGV0ZS9hdXRvY29tcGxldGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFcEQsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEYsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEYsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDbEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0FBaUJuRSxNQUFNLE9BQU8sb0JBQW9COztpSEFBcEIsb0JBQW9CO2tIQUFwQixvQkFBb0IsaUJBYjdCLHVCQUF1QjtRQUN2Qiw2QkFBNkI7UUFDN0IsOEJBQThCO1FBQzlCLCtCQUErQixhQVF2QixVQUFVLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFLGFBQWEsYUFMaEgsdUJBQXVCO1FBQ3ZCLDZCQUE2QjtRQUM3Qiw4QkFBOEI7UUFDOUIsK0JBQStCO2tIQUl0QixvQkFBb0IsWUFGdEIsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFLGFBQWEsQ0FBQzsyRkFFeEcsb0JBQW9CO2tCQWZoQyxRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWix1QkFBdUI7d0JBQ3ZCLDZCQUE2Qjt3QkFDN0IsOEJBQThCO3dCQUM5QiwrQkFBK0I7cUJBQ2hDO29CQUNELE9BQU8sRUFBRTt3QkFDUCx1QkFBdUI7d0JBQ3ZCLDZCQUE2Qjt3QkFDN0IsOEJBQThCO3dCQUM5QiwrQkFBK0I7cUJBQ2hDO29CQUNELE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsbUJBQW1CLEVBQUUsYUFBYSxDQUFDO2lCQUNwSCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEJpZGlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgTnpOb0FuaW1hdGlvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9uby1hbmltYXRpb24nO1xuaW1wb3J0IHsgTnpPdXRsZXRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvb3V0bGV0JztcbmltcG9ydCB7IE56SW5wdXRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2lucHV0JztcblxuaW1wb3J0IHsgTnpBdXRvY29tcGxldGVPcHRncm91cENvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLW9wdGdyb3VwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOekF1dG9jb21wbGV0ZU9wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLW9wdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpBdXRvY29tcGxldGVUcmlnZ2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9hdXRvY29tcGxldGUtdHJpZ2dlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpBdXRvY29tcGxldGVDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOekF1dG9jb21wbGV0ZUNvbXBvbmVudCxcbiAgICBOekF1dG9jb21wbGV0ZU9wdGlvbkNvbXBvbmVudCxcbiAgICBOekF1dG9jb21wbGV0ZVRyaWdnZXJEaXJlY3RpdmUsXG4gICAgTnpBdXRvY29tcGxldGVPcHRncm91cENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTnpBdXRvY29tcGxldGVDb21wb25lbnQsXG4gICAgTnpBdXRvY29tcGxldGVPcHRpb25Db21wb25lbnQsXG4gICAgTnpBdXRvY29tcGxldGVUcmlnZ2VyRGlyZWN0aXZlLFxuICAgIE56QXV0b2NvbXBsZXRlT3B0Z3JvdXBDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW0JpZGlNb2R1bGUsIENvbW1vbk1vZHVsZSwgT3ZlcmxheU1vZHVsZSwgRm9ybXNNb2R1bGUsIE56T3V0bGV0TW9kdWxlLCBOek5vQW5pbWF0aW9uTW9kdWxlLCBOeklucHV0TW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBOekF1dG9jb21wbGV0ZU1vZHVsZSB7fVxuIl19