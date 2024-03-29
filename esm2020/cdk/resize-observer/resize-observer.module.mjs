/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { NgModule } from '@angular/core';
import { NzResizeObserverDirective } from './resize-observer.directive';
import { NzResizeObserverFactory } from './resize-observer.service';
import * as i0 from "@angular/core";
export class NzResizeObserverModule {
}
NzResizeObserverModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeObserverModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzResizeObserverModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeObserverModule, declarations: [NzResizeObserverDirective], exports: [NzResizeObserverDirective] });
NzResizeObserverModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeObserverModule, providers: [NzResizeObserverFactory] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeObserverModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [NzResizeObserverFactory],
                    declarations: [NzResizeObserverDirective],
                    exports: [NzResizeObserverDirective]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLW9ic2VydmVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY2RrL3Jlc2l6ZS1vYnNlcnZlci9yZXNpemUtb2JzZXJ2ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDeEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBT3BFLE1BQU0sT0FBTyxzQkFBc0I7O21IQUF0QixzQkFBc0I7b0hBQXRCLHNCQUFzQixpQkFIbEIseUJBQXlCLGFBQzlCLHlCQUF5QjtvSEFFeEIsc0JBQXNCLGFBSnRCLENBQUMsdUJBQXVCLENBQUM7MkZBSXpCLHNCQUFzQjtrQkFMbEMsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztvQkFDcEMsWUFBWSxFQUFFLENBQUMseUJBQXlCLENBQUM7b0JBQ3pDLE9BQU8sRUFBRSxDQUFDLHlCQUF5QixDQUFDO2lCQUNyQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56UmVzaXplT2JzZXJ2ZXJEaXJlY3RpdmUgfSBmcm9tICcuL3Jlc2l6ZS1vYnNlcnZlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpSZXNpemVPYnNlcnZlckZhY3RvcnkgfSBmcm9tICcuL3Jlc2l6ZS1vYnNlcnZlci5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbTnpSZXNpemVPYnNlcnZlckZhY3RvcnldLFxuICBkZWNsYXJhdGlvbnM6IFtOelJlc2l6ZU9ic2VydmVyRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW056UmVzaXplT2JzZXJ2ZXJEaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIE56UmVzaXplT2JzZXJ2ZXJNb2R1bGUge31cbiJdfQ==