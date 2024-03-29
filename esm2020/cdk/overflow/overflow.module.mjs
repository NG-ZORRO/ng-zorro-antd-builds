/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { NgModule } from '@angular/core';
import { NzResizeObserverModule } from 'ng-zorro-antd/cdk/resize-observer';
import { NzOverflowContainerComponent } from './overflow-container.component';
import { NzOverflowItemDirective } from './overflow-item.directive';
import { NzOverflowRestDirective } from './overflow-rest.directive';
import { NzOverflowSuffixDirective } from './overflow-suffix.directive';
import * as i0 from "@angular/core";
export class NzOverflowModule {
}
NzOverflowModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOverflowModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzOverflowModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOverflowModule, declarations: [NzOverflowContainerComponent,
        NzOverflowItemDirective,
        NzOverflowRestDirective,
        NzOverflowSuffixDirective], imports: [NzResizeObserverModule], exports: [NzOverflowContainerComponent, NzOverflowItemDirective, NzOverflowRestDirective, NzOverflowSuffixDirective] });
NzOverflowModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOverflowModule, imports: [[NzResizeObserverModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOverflowModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzResizeObserverModule],
                    declarations: [
                        NzOverflowContainerComponent,
                        NzOverflowItemDirective,
                        NzOverflowRestDirective,
                        NzOverflowSuffixDirective
                    ],
                    exports: [NzOverflowContainerComponent, NzOverflowItemDirective, NzOverflowRestDirective, NzOverflowSuffixDirective]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmZsb3cubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jZGsvb3ZlcmZsb3cvb3ZlcmZsb3cubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFM0UsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDcEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDcEUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0FBWXhFLE1BQU0sT0FBTyxnQkFBZ0I7OzZHQUFoQixnQkFBZ0I7OEdBQWhCLGdCQUFnQixpQkFQekIsNEJBQTRCO1FBQzVCLHVCQUF1QjtRQUN2Qix1QkFBdUI7UUFDdkIseUJBQXlCLGFBTGpCLHNCQUFzQixhQU90Qiw0QkFBNEIsRUFBRSx1QkFBdUIsRUFBRSx1QkFBdUIsRUFBRSx5QkFBeUI7OEdBRXhHLGdCQUFnQixZQVRsQixDQUFDLHNCQUFzQixDQUFDOzJGQVN0QixnQkFBZ0I7a0JBVjVCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7b0JBQ2pDLFlBQVksRUFBRTt3QkFDWiw0QkFBNEI7d0JBQzVCLHVCQUF1Qjt3QkFDdkIsdUJBQXVCO3dCQUN2Qix5QkFBeUI7cUJBQzFCO29CQUNELE9BQU8sRUFBRSxDQUFDLDRCQUE0QixFQUFFLHVCQUF1QixFQUFFLHVCQUF1QixFQUFFLHlCQUF5QixDQUFDO2lCQUNySCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56UmVzaXplT2JzZXJ2ZXJNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2Nkay9yZXNpemUtb2JzZXJ2ZXInO1xuXG5pbXBvcnQgeyBOek92ZXJmbG93Q29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9vdmVyZmxvdy1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE56T3ZlcmZsb3dJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi9vdmVyZmxvdy1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOek92ZXJmbG93UmVzdERpcmVjdGl2ZSB9IGZyb20gJy4vb3ZlcmZsb3ctcmVzdC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpPdmVyZmxvd1N1ZmZpeERpcmVjdGl2ZSB9IGZyb20gJy4vb3ZlcmZsb3ctc3VmZml4LmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtOelJlc2l6ZU9ic2VydmVyTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTnpPdmVyZmxvd0NvbnRhaW5lckNvbXBvbmVudCxcbiAgICBOek92ZXJmbG93SXRlbURpcmVjdGl2ZSxcbiAgICBOek92ZXJmbG93UmVzdERpcmVjdGl2ZSxcbiAgICBOek92ZXJmbG93U3VmZml4RGlyZWN0aXZlXG4gIF0sXG4gIGV4cG9ydHM6IFtOek92ZXJmbG93Q29udGFpbmVyQ29tcG9uZW50LCBOek92ZXJmbG93SXRlbURpcmVjdGl2ZSwgTnpPdmVyZmxvd1Jlc3REaXJlY3RpdmUsIE56T3ZlcmZsb3dTdWZmaXhEaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIE56T3ZlcmZsb3dNb2R1bGUge31cbiJdfQ==