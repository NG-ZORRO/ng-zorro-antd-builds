import { __rest } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzDrawerComponent } from './drawer.component';
import { NzDrawerServiceModule } from './drawer.service.module';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "./drawer.service.module";
export class DrawerBuilderForService {
    constructor(overlay, options) {
        this.overlay = overlay;
        this.options = options;
        this.unsubscribe$ = new Subject();
        /** pick {@link NzDrawerOptions.nzOnCancel} and omit this option */
        const _a = this.options, { nzOnCancel } = _a, componentOption = __rest(_a, ["nzOnCancel"]);
        this.overlayRef = this.overlay.create();
        this.drawerRef = this.overlayRef.attach(new ComponentPortal(NzDrawerComponent)).instance;
        this.updateOptions(componentOption);
        // Prevent repeatedly open drawer when tap focus element.
        this.drawerRef.savePreviouslyFocusedElement();
        this.drawerRef.nzOnViewInit.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.drawerRef.open();
        });
        this.drawerRef.nzOnClose.subscribe(() => {
            if (nzOnCancel) {
                nzOnCancel().then(canClose => {
                    if (canClose !== false) {
                        this.drawerRef.close();
                    }
                });
            }
            else {
                this.drawerRef.close();
            }
        });
        this.drawerRef.afterClose.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.overlayRef.dispose();
            this.drawerRef = null;
            this.unsubscribe$.next();
            this.unsubscribe$.complete();
        });
    }
    getInstance() {
        return this.drawerRef;
    }
    updateOptions(options) {
        Object.assign(this.drawerRef, options);
    }
}
export class NzDrawerService {
    constructor(overlay) {
        this.overlay = overlay;
    }
    create(options) {
        return new DrawerBuilderForService(this.overlay, options).getInstance();
    }
}
NzDrawerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NzDrawerService_Factory() { return new NzDrawerService(i0.ɵɵinject(i1.Overlay)); }, token: NzDrawerService, providedIn: i2.NzDrawerServiceModule });
NzDrawerService.decorators = [
    { type: Injectable, args: [{ providedIn: NzDrawerServiceModule },] }
];
NzDrawerService.ctorParameters = () => [
    { type: Overlay }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2RyYXdlci9kcmF3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLE9BQU8sRUFBYyxNQUFNLHNCQUFzQixDQUFDO0FBQzNELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzNDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7O0FBRWhFLE1BQU0sT0FBTyx1QkFBdUI7SUFLbEMsWUFBb0IsT0FBZ0IsRUFBVSxPQUF3QjtRQUFsRCxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFGOUQsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBR3pDLG1FQUFtRTtRQUNuRSxNQUFNLEtBQXFDLElBQUksQ0FBQyxPQUFPLEVBQWpELEVBQUUsVUFBVSxPQUFxQyxFQUFoQyxlQUFlLGNBQWhDLGNBQWtDLENBQWUsQ0FBQztRQUN4RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ3pGLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDcEMseURBQXlEO1FBQ3pELElBQUksQ0FBQyxTQUFTLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDNUUsSUFBSSxDQUFDLFNBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDdEMsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUMzQixJQUFJLFFBQVEsS0FBSyxLQUFLLEVBQUU7d0JBQ3RCLElBQUksQ0FBQyxTQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7cUJBQ3pCO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFNBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUN6QjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQzFFLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxTQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFtQztRQUMvQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNGO0FBR0QsTUFBTSxPQUFPLGVBQWU7SUFDMUIsWUFBb0IsT0FBZ0I7UUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztJQUFHLENBQUM7SUFFeEMsTUFBTSxDQUE4QyxPQUF5RDtRQUMzRyxPQUFPLElBQUksdUJBQXVCLENBQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNoRixDQUFDOzs7O1lBTkYsVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLHFCQUFxQixFQUFFOzs7WUF4RHhDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBPdmVybGF5LCBPdmVybGF5UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTnpEcmF3ZXJPcHRpb25zLCBOekRyYXdlck9wdGlvbnNPZkNvbXBvbmVudCB9IGZyb20gJy4vZHJhd2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgTnpEcmF3ZXJSZWYgfSBmcm9tICcuL2RyYXdlci1yZWYnO1xuaW1wb3J0IHsgTnpEcmF3ZXJDb21wb25lbnQgfSBmcm9tICcuL2RyYXdlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpEcmF3ZXJTZXJ2aWNlTW9kdWxlIH0gZnJvbSAnLi9kcmF3ZXIuc2VydmljZS5tb2R1bGUnO1xuXG5leHBvcnQgY2xhc3MgRHJhd2VyQnVpbGRlckZvclNlcnZpY2U8VCwgUj4ge1xuICBwcml2YXRlIGRyYXdlclJlZjogTnpEcmF3ZXJDb21wb25lbnQ8VCwgUj4gfCBudWxsO1xuICBwcml2YXRlIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWY7XG4gIHByaXZhdGUgdW5zdWJzY3JpYmUkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksIHByaXZhdGUgb3B0aW9uczogTnpEcmF3ZXJPcHRpb25zKSB7XG4gICAgLyoqIHBpY2sge0BsaW5rIE56RHJhd2VyT3B0aW9ucy5uek9uQ2FuY2VsfSBhbmQgb21pdCB0aGlzIG9wdGlvbiAqL1xuICAgIGNvbnN0IHsgbnpPbkNhbmNlbCwgLi4uY29tcG9uZW50T3B0aW9uIH0gPSB0aGlzLm9wdGlvbnM7XG4gICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSgpO1xuICAgIHRoaXMuZHJhd2VyUmVmID0gdGhpcy5vdmVybGF5UmVmLmF0dGFjaChuZXcgQ29tcG9uZW50UG9ydGFsKE56RHJhd2VyQ29tcG9uZW50KSkuaW5zdGFuY2U7XG4gICAgdGhpcy51cGRhdGVPcHRpb25zKGNvbXBvbmVudE9wdGlvbik7XG4gICAgLy8gUHJldmVudCByZXBlYXRlZGx5IG9wZW4gZHJhd2VyIHdoZW4gdGFwIGZvY3VzIGVsZW1lbnQuXG4gICAgdGhpcy5kcmF3ZXJSZWYuc2F2ZVByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCgpO1xuICAgIHRoaXMuZHJhd2VyUmVmLm56T25WaWV3SW5pdC5waXBlKHRha2VVbnRpbCh0aGlzLnVuc3Vic2NyaWJlJCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmRyYXdlclJlZiEub3BlbigpO1xuICAgIH0pO1xuICAgIHRoaXMuZHJhd2VyUmVmLm56T25DbG9zZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKG56T25DYW5jZWwpIHtcbiAgICAgICAgbnpPbkNhbmNlbCgpLnRoZW4oY2FuQ2xvc2UgPT4ge1xuICAgICAgICAgIGlmIChjYW5DbG9zZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd2VyUmVmIS5jbG9zZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRyYXdlclJlZiEuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZHJhd2VyUmVmLmFmdGVyQ2xvc2UucGlwZSh0YWtlVW50aWwodGhpcy51bnN1YnNjcmliZSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICAgIHRoaXMuZHJhd2VyUmVmID0gbnVsbDtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmUkLm5leHQoKTtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmUkLmNvbXBsZXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRJbnN0YW5jZSgpOiBOekRyYXdlclJlZjxULCBSPiB7XG4gICAgcmV0dXJuIHRoaXMuZHJhd2VyUmVmITtcbiAgfVxuXG4gIHVwZGF0ZU9wdGlvbnMob3B0aW9uczogTnpEcmF3ZXJPcHRpb25zT2ZDb21wb25lbnQpOiB2b2lkIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuZHJhd2VyUmVmISwgb3B0aW9ucyk7XG4gIH1cbn1cblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiBOekRyYXdlclNlcnZpY2VNb2R1bGUgfSlcbmV4cG9ydCBjbGFzcyBOekRyYXdlclNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXkpIHt9XG5cbiAgY3JlYXRlPFQgPSBOelNhZmVBbnksIEQgPSB1bmRlZmluZWQsIFIgPSBOelNhZmVBbnk+KG9wdGlvbnM6IE56RHJhd2VyT3B0aW9uczxULCBEIGV4dGVuZHMgdW5kZWZpbmVkID8ge30gOiBEPik6IE56RHJhd2VyUmVmPFQsIFI+IHtcbiAgICByZXR1cm4gbmV3IERyYXdlckJ1aWxkZXJGb3JTZXJ2aWNlPFQsIFI+KHRoaXMub3ZlcmxheSwgb3B0aW9ucykuZ2V0SW5zdGFuY2UoKTtcbiAgfVxufVxuIl19