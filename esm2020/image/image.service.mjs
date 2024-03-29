import { OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, Optional } from '@angular/core';
import { IMAGE_PREVIEW_MASK_CLASS_NAME, NZ_CONFIG_MODULE_NAME } from './image-config';
import { NzImagePreviewOptions } from './image-preview-options';
import { NzImagePreviewRef } from './image-preview-ref';
import { NzImagePreviewComponent } from './image-preview.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "ng-zorro-antd/core/config";
import * as i3 from "@angular/cdk/bidi";
export class NzImageService {
    constructor(overlay, injector, nzConfigService, directionality) {
        this.overlay = overlay;
        this.injector = injector;
        this.nzConfigService = nzConfigService;
        this.directionality = directionality;
    }
    preview(images, options) {
        return this.display(images, options);
    }
    display(images, config) {
        const configMerged = { ...new NzImagePreviewOptions(), ...(config ?? {}) };
        const overlayRef = this.createOverlay(configMerged);
        const previewComponent = this.attachPreviewComponent(overlayRef, configMerged);
        previewComponent.setImages(images);
        const previewRef = new NzImagePreviewRef(previewComponent, configMerged, overlayRef);
        previewComponent.previewRef = previewRef;
        return previewRef;
    }
    attachPreviewComponent(overlayRef, config) {
        const injector = Injector.create({
            parent: this.injector,
            providers: [
                { provide: OverlayRef, useValue: overlayRef },
                { provide: NzImagePreviewOptions, useValue: config }
            ]
        });
        const containerPortal = new ComponentPortal(NzImagePreviewComponent, null, injector);
        const containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    }
    createOverlay(config) {
        const globalConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME) || {};
        const overLayConfig = new OverlayConfig({
            hasBackdrop: true,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy: this.overlay.position().global(),
            disposeOnNavigation: config.nzCloseOnNavigation ?? globalConfig.nzCloseOnNavigation ?? true,
            backdropClass: IMAGE_PREVIEW_MASK_CLASS_NAME,
            direction: config.nzDirection || globalConfig.nzDirection || this.directionality.value
        });
        return this.overlay.create(overLayConfig);
    }
}
NzImageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageService, deps: [{ token: i1.Overlay }, { token: i0.Injector }, { token: i2.NzConfigService }, { token: i3.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
NzImageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.Injector }, { type: i2.NzConfigService }, { type: i3.Directionality, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvaW1hZ2UvaW1hZ2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQSxPQUFPLEVBQVcsYUFBYSxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJL0QsT0FBTyxFQUFFLDZCQUE2QixFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEYsT0FBTyxFQUFXLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7O0FBT3BFLE1BQU0sT0FBTyxjQUFjO0lBQ3pCLFlBQ1UsT0FBZ0IsRUFDaEIsUUFBa0IsRUFDbEIsZUFBZ0MsRUFDcEIsY0FBOEI7UUFIMUMsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNwQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFDakQsQ0FBQztJQUVKLE9BQU8sQ0FBQyxNQUFpQixFQUFFLE9BQStCO1FBQ3hELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVPLE9BQU8sQ0FBQyxNQUFpQixFQUFFLE1BQThCO1FBQy9ELE1BQU0sWUFBWSxHQUFHLEVBQUUsR0FBRyxJQUFJLHFCQUFxQixFQUFFLEVBQUUsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQzNFLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDcEQsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQy9FLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxNQUFNLFVBQVUsR0FBRyxJQUFJLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVyRixnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQ3pDLE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFFTyxzQkFBc0IsQ0FBQyxVQUFzQixFQUFFLE1BQTZCO1FBQ2xGLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDL0IsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3JCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRTtnQkFDN0MsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTthQUNyRDtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sZUFBZSxHQUFHLElBQUksZUFBZSxDQUFDLHVCQUF1QixFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNyRixNQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRXhELE9BQU8sWUFBWSxDQUFDLFFBQVEsQ0FBQztJQUMvQixDQUFDO0lBRU8sYUFBYSxDQUFDLE1BQTZCO1FBQ2pELE1BQU0sWUFBWSxHQUFJLElBQUksQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMscUJBQXFCLENBQWlCLElBQUksRUFBRSxDQUFDO1FBQzlHLE1BQU0sYUFBYSxHQUFHLElBQUksYUFBYSxDQUFDO1lBQ3RDLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLGNBQWMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRTtZQUNyRCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRTtZQUNsRCxtQkFBbUIsRUFBRSxNQUFNLENBQUMsbUJBQW1CLElBQUksWUFBWSxDQUFDLG1CQUFtQixJQUFJLElBQUk7WUFDM0YsYUFBYSxFQUFFLDZCQUE2QjtZQUM1QyxTQUFTLEVBQUUsTUFBTSxDQUFDLFdBQVcsSUFBSSxZQUFZLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSztTQUN2RixDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7OzJHQWxEVSxjQUFjOytHQUFkLGNBQWM7MkZBQWQsY0FBYztrQkFEMUIsVUFBVTs7MEJBTU4sUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgT3ZlcmxheSwgT3ZlcmxheUNvbmZpZywgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEltYWdlQ29uZmlnLCBOekNvbmZpZ1NlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcblxuaW1wb3J0IHsgSU1BR0VfUFJFVklFV19NQVNLX0NMQVNTX05BTUUsIE5aX0NPTkZJR19NT0RVTEVfTkFNRSB9IGZyb20gJy4vaW1hZ2UtY29uZmlnJztcbmltcG9ydCB7IE56SW1hZ2UsIE56SW1hZ2VQcmV2aWV3T3B0aW9ucyB9IGZyb20gJy4vaW1hZ2UtcHJldmlldy1vcHRpb25zJztcbmltcG9ydCB7IE56SW1hZ2VQcmV2aWV3UmVmIH0gZnJvbSAnLi9pbWFnZS1wcmV2aWV3LXJlZic7XG5pbXBvcnQgeyBOekltYWdlUHJldmlld0NvbXBvbmVudCB9IGZyb20gJy4vaW1hZ2UtcHJldmlldy5jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE56SW1hZ2VTZXJ2aWNlIHtcbiAgcHJldmlldyhpbWFnZXM6IE56SW1hZ2VbXSwgb3B0aW9uPzogTnpJbWFnZVByZXZpZXdPcHRpb25zKTogTnpJbWFnZVByZXZpZXdSZWY7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOekltYWdlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSxcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5XG4gICkge31cblxuICBwcmV2aWV3KGltYWdlczogTnpJbWFnZVtdLCBvcHRpb25zPzogTnpJbWFnZVByZXZpZXdPcHRpb25zKTogTnpJbWFnZVByZXZpZXdSZWYge1xuICAgIHJldHVybiB0aGlzLmRpc3BsYXkoaW1hZ2VzLCBvcHRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgZGlzcGxheShpbWFnZXM6IE56SW1hZ2VbXSwgY29uZmlnPzogTnpJbWFnZVByZXZpZXdPcHRpb25zKTogTnpJbWFnZVByZXZpZXdSZWYge1xuICAgIGNvbnN0IGNvbmZpZ01lcmdlZCA9IHsgLi4ubmV3IE56SW1hZ2VQcmV2aWV3T3B0aW9ucygpLCAuLi4oY29uZmlnID8/IHt9KSB9O1xuICAgIGNvbnN0IG92ZXJsYXlSZWYgPSB0aGlzLmNyZWF0ZU92ZXJsYXkoY29uZmlnTWVyZ2VkKTtcbiAgICBjb25zdCBwcmV2aWV3Q29tcG9uZW50ID0gdGhpcy5hdHRhY2hQcmV2aWV3Q29tcG9uZW50KG92ZXJsYXlSZWYsIGNvbmZpZ01lcmdlZCk7XG4gICAgcHJldmlld0NvbXBvbmVudC5zZXRJbWFnZXMoaW1hZ2VzKTtcbiAgICBjb25zdCBwcmV2aWV3UmVmID0gbmV3IE56SW1hZ2VQcmV2aWV3UmVmKHByZXZpZXdDb21wb25lbnQsIGNvbmZpZ01lcmdlZCwgb3ZlcmxheVJlZik7XG5cbiAgICBwcmV2aWV3Q29tcG9uZW50LnByZXZpZXdSZWYgPSBwcmV2aWV3UmVmO1xuICAgIHJldHVybiBwcmV2aWV3UmVmO1xuICB9XG5cbiAgcHJpdmF0ZSBhdHRhY2hQcmV2aWV3Q29tcG9uZW50KG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsIGNvbmZpZzogTnpJbWFnZVByZXZpZXdPcHRpb25zKTogTnpJbWFnZVByZXZpZXdDb21wb25lbnQge1xuICAgIGNvbnN0IGluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHtcbiAgICAgIHBhcmVudDogdGhpcy5pbmplY3RvcixcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IE92ZXJsYXlSZWYsIHVzZVZhbHVlOiBvdmVybGF5UmVmIH0sXG4gICAgICAgIHsgcHJvdmlkZTogTnpJbWFnZVByZXZpZXdPcHRpb25zLCB1c2VWYWx1ZTogY29uZmlnIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbnRhaW5lclBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwoTnpJbWFnZVByZXZpZXdDb21wb25lbnQsIG51bGwsIGluamVjdG9yKTtcbiAgICBjb25zdCBjb250YWluZXJSZWYgPSBvdmVybGF5UmVmLmF0dGFjaChjb250YWluZXJQb3J0YWwpO1xuXG4gICAgcmV0dXJuIGNvbnRhaW5lclJlZi5pbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlT3ZlcmxheShjb25maWc6IE56SW1hZ2VQcmV2aWV3T3B0aW9ucyk6IE92ZXJsYXlSZWYge1xuICAgIGNvbnN0IGdsb2JhbENvbmZpZyA9ICh0aGlzLm56Q29uZmlnU2VydmljZS5nZXRDb25maWdGb3JDb21wb25lbnQoTlpfQ09ORklHX01PRFVMRV9OQU1FKSBhcyBJbWFnZUNvbmZpZykgfHwge307XG4gICAgY29uc3Qgb3ZlckxheUNvbmZpZyA9IG5ldyBPdmVybGF5Q29uZmlnKHtcbiAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMub3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLmJsb2NrKCksXG4gICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLm92ZXJsYXkucG9zaXRpb24oKS5nbG9iYWwoKSxcbiAgICAgIGRpc3Bvc2VPbk5hdmlnYXRpb246IGNvbmZpZy5uekNsb3NlT25OYXZpZ2F0aW9uID8/IGdsb2JhbENvbmZpZy5uekNsb3NlT25OYXZpZ2F0aW9uID8/IHRydWUsXG4gICAgICBiYWNrZHJvcENsYXNzOiBJTUFHRV9QUkVWSUVXX01BU0tfQ0xBU1NfTkFNRSxcbiAgICAgIGRpcmVjdGlvbjogY29uZmlnLm56RGlyZWN0aW9uIHx8IGdsb2JhbENvbmZpZy5uekRpcmVjdGlvbiB8fCB0aGlzLmRpcmVjdGlvbmFsaXR5LnZhbHVlXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5vdmVybGF5LmNyZWF0ZShvdmVyTGF5Q29uZmlnKTtcbiAgfVxufVxuIl19