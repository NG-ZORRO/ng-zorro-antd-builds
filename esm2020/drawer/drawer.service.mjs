import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzDrawerComponent } from './drawer.component';
import { NzDrawerServiceModule } from './drawer.service.module';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
export class DrawerBuilderForService {
    constructor(overlay, options) {
        this.overlay = overlay;
        this.options = options;
        this.unsubscribe$ = new Subject();
        /** pick {@link NzDrawerOptions.nzOnCancel} and omit this option */
        const { nzOnCancel, ...componentOption } = this.options;
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
NzDrawerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDrawerService, deps: [{ token: i1.Overlay }], target: i0.ɵɵFactoryTarget.Injectable });
NzDrawerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDrawerService, providedIn: NzDrawerServiceModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDrawerService, decorators: [{
            type: Injectable,
            args: [{ providedIn: NzDrawerServiceModule }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2RyYXdlci9kcmF3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU0zQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7O0FBRWhFLE1BQU0sT0FBTyx1QkFBdUI7SUFLbEMsWUFBb0IsT0FBZ0IsRUFBVSxPQUF3QjtRQUFsRCxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFGOUQsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBR3pDLG1FQUFtRTtRQUNuRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBZSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ3pGLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDcEMseURBQXlEO1FBQ3pELElBQUksQ0FBQyxTQUFTLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDNUUsSUFBSSxDQUFDLFNBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDdEMsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUMzQixJQUFJLFFBQVEsS0FBSyxLQUFLLEVBQUU7d0JBQ3RCLElBQUksQ0FBQyxTQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7cUJBQ3pCO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFNBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUN6QjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQzFFLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxTQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFtQztRQUMvQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNGO0FBR0QsTUFBTSxPQUFPLGVBQWU7SUFDMUIsWUFBb0IsT0FBZ0I7UUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztJQUFHLENBQUM7SUFFeEMsTUFBTSxDQUNKLE9BQXlEO1FBRXpELE9BQU8sSUFBSSx1QkFBdUIsQ0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hGLENBQUM7OzRHQVBVLGVBQWU7Z0hBQWYsZUFBZSxjQURGLHFCQUFxQjsyRkFDbEMsZUFBZTtrQkFEM0IsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IE92ZXJsYXksIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgTnpEcmF3ZXJPcHRpb25zLCBOekRyYXdlck9wdGlvbnNPZkNvbXBvbmVudCB9IGZyb20gJy4vZHJhd2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgTnpEcmF3ZXJSZWYgfSBmcm9tICcuL2RyYXdlci1yZWYnO1xuaW1wb3J0IHsgTnpEcmF3ZXJDb21wb25lbnQgfSBmcm9tICcuL2RyYXdlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpEcmF3ZXJTZXJ2aWNlTW9kdWxlIH0gZnJvbSAnLi9kcmF3ZXIuc2VydmljZS5tb2R1bGUnO1xuXG5leHBvcnQgY2xhc3MgRHJhd2VyQnVpbGRlckZvclNlcnZpY2U8VCwgUj4ge1xuICBwcml2YXRlIGRyYXdlclJlZjogTnpEcmF3ZXJDb21wb25lbnQ8VCwgUj4gfCBudWxsO1xuICBwcml2YXRlIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWY7XG4gIHByaXZhdGUgdW5zdWJzY3JpYmUkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksIHByaXZhdGUgb3B0aW9uczogTnpEcmF3ZXJPcHRpb25zKSB7XG4gICAgLyoqIHBpY2sge0BsaW5rIE56RHJhd2VyT3B0aW9ucy5uek9uQ2FuY2VsfSBhbmQgb21pdCB0aGlzIG9wdGlvbiAqL1xuICAgIGNvbnN0IHsgbnpPbkNhbmNlbCwgLi4uY29tcG9uZW50T3B0aW9uIH0gPSB0aGlzLm9wdGlvbnM7XG4gICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSgpO1xuICAgIHRoaXMuZHJhd2VyUmVmID0gdGhpcy5vdmVybGF5UmVmLmF0dGFjaChuZXcgQ29tcG9uZW50UG9ydGFsKE56RHJhd2VyQ29tcG9uZW50KSkuaW5zdGFuY2U7XG4gICAgdGhpcy51cGRhdGVPcHRpb25zKGNvbXBvbmVudE9wdGlvbik7XG4gICAgLy8gUHJldmVudCByZXBlYXRlZGx5IG9wZW4gZHJhd2VyIHdoZW4gdGFwIGZvY3VzIGVsZW1lbnQuXG4gICAgdGhpcy5kcmF3ZXJSZWYuc2F2ZVByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCgpO1xuICAgIHRoaXMuZHJhd2VyUmVmLm56T25WaWV3SW5pdC5waXBlKHRha2VVbnRpbCh0aGlzLnVuc3Vic2NyaWJlJCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmRyYXdlclJlZiEub3BlbigpO1xuICAgIH0pO1xuICAgIHRoaXMuZHJhd2VyUmVmLm56T25DbG9zZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKG56T25DYW5jZWwpIHtcbiAgICAgICAgbnpPbkNhbmNlbCgpLnRoZW4oY2FuQ2xvc2UgPT4ge1xuICAgICAgICAgIGlmIChjYW5DbG9zZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd2VyUmVmIS5jbG9zZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRyYXdlclJlZiEuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZHJhd2VyUmVmLmFmdGVyQ2xvc2UucGlwZSh0YWtlVW50aWwodGhpcy51bnN1YnNjcmliZSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICAgIHRoaXMuZHJhd2VyUmVmID0gbnVsbDtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmUkLm5leHQoKTtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmUkLmNvbXBsZXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRJbnN0YW5jZSgpOiBOekRyYXdlclJlZjxULCBSPiB7XG4gICAgcmV0dXJuIHRoaXMuZHJhd2VyUmVmITtcbiAgfVxuXG4gIHVwZGF0ZU9wdGlvbnMob3B0aW9uczogTnpEcmF3ZXJPcHRpb25zT2ZDb21wb25lbnQpOiB2b2lkIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuZHJhd2VyUmVmISwgb3B0aW9ucyk7XG4gIH1cbn1cblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiBOekRyYXdlclNlcnZpY2VNb2R1bGUgfSlcbmV4cG9ydCBjbGFzcyBOekRyYXdlclNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXkpIHt9XG5cbiAgY3JlYXRlPFQgPSBOelNhZmVBbnksIEQgPSB1bmRlZmluZWQsIFIgPSBOelNhZmVBbnk+KFxuICAgIG9wdGlvbnM6IE56RHJhd2VyT3B0aW9uczxULCBEIGV4dGVuZHMgdW5kZWZpbmVkID8ge30gOiBEPlxuICApOiBOekRyYXdlclJlZjxULCBSPiB7XG4gICAgcmV0dXJuIG5ldyBEcmF3ZXJCdWlsZGVyRm9yU2VydmljZTxULCBSPih0aGlzLm92ZXJsYXksIG9wdGlvbnMpLmdldEluc3RhbmNlKCk7XG4gIH1cbn1cbiJdfQ==