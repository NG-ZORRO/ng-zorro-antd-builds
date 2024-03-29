import { Injectable } from '@angular/core';
import { NzMNService } from './base';
import { NzMessageContainerComponent } from './message-container.component';
import { NzMessageServiceModule } from './message.service.module';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/services";
import * as i2 from "@angular/cdk/overlay";
export class NzMessageService extends NzMNService {
    constructor(nzSingletonService, overlay, injector) {
        super(nzSingletonService, overlay, injector);
        this.componentPrefix = 'message-';
    }
    success(content, options) {
        return this.createInstance({ type: 'success', content }, options);
    }
    error(content, options) {
        return this.createInstance({ type: 'error', content }, options);
    }
    info(content, options) {
        return this.createInstance({ type: 'info', content }, options);
    }
    warning(content, options) {
        return this.createInstance({ type: 'warning', content }, options);
    }
    loading(content, options) {
        return this.createInstance({ type: 'loading', content }, options);
    }
    create(type, content, options) {
        return this.createInstance({ type, content }, options);
    }
    createInstance(message, options) {
        this.container = this.withContainer(NzMessageContainerComponent);
        return this.container.create({
            ...message,
            ...{
                createdAt: new Date(),
                messageId: this.getInstanceId(),
                options
            }
        });
    }
}
NzMessageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMessageService, deps: [{ token: i1.NzSingletonService }, { token: i2.Overlay }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
NzMessageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMessageService, providedIn: NzMessageServiceModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMessageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: NzMessageServiceModule
                }]
        }], ctorParameters: function () { return [{ type: i1.NzSingletonService }, { type: i2.Overlay }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9tZXNzYWdlL21lc3NhZ2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQSxPQUFPLEVBQUUsVUFBVSxFQUF5QixNQUFNLGVBQWUsQ0FBQztBQUlsRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7O0FBTWxFLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxXQUFXO0lBSS9DLFlBQVksa0JBQXNDLEVBQUUsT0FBZ0IsRUFBRSxRQUFrQjtRQUN0RixLQUFLLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBSHJDLG9CQUFlLEdBQUcsVUFBVSxDQUFDO0lBSXZDLENBQUM7SUFFRCxPQUFPLENBQUMsT0FBbUMsRUFBRSxPQUE4QjtRQUN6RSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxLQUFLLENBQUMsT0FBbUMsRUFBRSxPQUE4QjtRQUN2RSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxJQUFJLENBQUMsT0FBbUMsRUFBRSxPQUE4QjtRQUN0RSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxPQUFPLENBQUMsT0FBbUMsRUFBRSxPQUE4QjtRQUN6RSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxPQUFPLENBQUMsT0FBbUMsRUFBRSxPQUE4QjtRQUN6RSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxNQUFNLENBQ0osSUFBbUUsRUFDbkUsT0FBbUMsRUFDbkMsT0FBOEI7UUFFOUIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFTyxjQUFjLENBQUMsT0FBc0IsRUFBRSxPQUE4QjtRQUMzRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUVqRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1lBQzNCLEdBQUcsT0FBTztZQUNWLEdBQUc7Z0JBQ0QsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO2dCQUNyQixTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDL0IsT0FBTzthQUNSO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7NkdBL0NVLGdCQUFnQjtpSEFBaEIsZ0JBQWdCLGNBRmYsc0JBQXNCOzJGQUV2QixnQkFBZ0I7a0JBSDVCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLHNCQUFzQjtpQkFDbkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBPdmVybGF5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56U2luZ2xldG9uU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9zZXJ2aWNlcyc7XG5cbmltcG9ydCB7IE56TU5TZXJ2aWNlIH0gZnJvbSAnLi9iYXNlJztcbmltcG9ydCB7IE56TWVzc2FnZUNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vbWVzc2FnZS1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE56TWVzc2FnZVNlcnZpY2VNb2R1bGUgfSBmcm9tICcuL21lc3NhZ2Uuc2VydmljZS5tb2R1bGUnO1xuaW1wb3J0IHsgTnpNZXNzYWdlRGF0YSwgTnpNZXNzYWdlRGF0YU9wdGlvbnMsIE56TWVzc2FnZVJlZiB9IGZyb20gJy4vdHlwaW5ncyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogTnpNZXNzYWdlU2VydmljZU1vZHVsZVxufSlcbmV4cG9ydCBjbGFzcyBOek1lc3NhZ2VTZXJ2aWNlIGV4dGVuZHMgTnpNTlNlcnZpY2Uge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgY29udGFpbmVyPzogTnpNZXNzYWdlQ29udGFpbmVyQ29tcG9uZW50O1xuICBwcm90ZWN0ZWQgY29tcG9uZW50UHJlZml4ID0gJ21lc3NhZ2UtJztcblxuICBjb25zdHJ1Y3RvcihuelNpbmdsZXRvblNlcnZpY2U6IE56U2luZ2xldG9uU2VydmljZSwgb3ZlcmxheTogT3ZlcmxheSwgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgc3VwZXIobnpTaW5nbGV0b25TZXJ2aWNlLCBvdmVybGF5LCBpbmplY3Rvcik7XG4gIH1cblxuICBzdWNjZXNzKGNvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+LCBvcHRpb25zPzogTnpNZXNzYWdlRGF0YU9wdGlvbnMpOiBOek1lc3NhZ2VSZWYge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUluc3RhbmNlKHsgdHlwZTogJ3N1Y2Nlc3MnLCBjb250ZW50IH0sIG9wdGlvbnMpO1xuICB9XG5cbiAgZXJyb3IoY29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4sIG9wdGlvbnM/OiBOek1lc3NhZ2VEYXRhT3B0aW9ucyk6IE56TWVzc2FnZVJlZiB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlSW5zdGFuY2UoeyB0eXBlOiAnZXJyb3InLCBjb250ZW50IH0sIG9wdGlvbnMpO1xuICB9XG5cbiAgaW5mbyhjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPiwgb3B0aW9ucz86IE56TWVzc2FnZURhdGFPcHRpb25zKTogTnpNZXNzYWdlUmVmIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVJbnN0YW5jZSh7IHR5cGU6ICdpbmZvJywgY29udGVudCB9LCBvcHRpb25zKTtcbiAgfVxuXG4gIHdhcm5pbmcoY29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4sIG9wdGlvbnM/OiBOek1lc3NhZ2VEYXRhT3B0aW9ucyk6IE56TWVzc2FnZVJlZiB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlSW5zdGFuY2UoeyB0eXBlOiAnd2FybmluZycsIGNvbnRlbnQgfSwgb3B0aW9ucyk7XG4gIH1cblxuICBsb2FkaW5nKGNvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+LCBvcHRpb25zPzogTnpNZXNzYWdlRGF0YU9wdGlvbnMpOiBOek1lc3NhZ2VSZWYge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUluc3RhbmNlKHsgdHlwZTogJ2xvYWRpbmcnLCBjb250ZW50IH0sIG9wdGlvbnMpO1xuICB9XG5cbiAgY3JlYXRlKFxuICAgIHR5cGU6ICdzdWNjZXNzJyB8ICdpbmZvJyB8ICd3YXJuaW5nJyB8ICdlcnJvcicgfCAnbG9hZGluZycgfCBzdHJpbmcsXG4gICAgY29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4sXG4gICAgb3B0aW9ucz86IE56TWVzc2FnZURhdGFPcHRpb25zXG4gICk6IE56TWVzc2FnZVJlZiB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlSW5zdGFuY2UoeyB0eXBlLCBjb250ZW50IH0sIG9wdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVJbnN0YW5jZShtZXNzYWdlOiBOek1lc3NhZ2VEYXRhLCBvcHRpb25zPzogTnpNZXNzYWdlRGF0YU9wdGlvbnMpOiBOek1lc3NhZ2VSZWYge1xuICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy53aXRoQ29udGFpbmVyKE56TWVzc2FnZUNvbnRhaW5lckNvbXBvbmVudCk7XG5cbiAgICByZXR1cm4gdGhpcy5jb250YWluZXIuY3JlYXRlKHtcbiAgICAgIC4uLm1lc3NhZ2UsXG4gICAgICAuLi57XG4gICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKSxcbiAgICAgICAgbWVzc2FnZUlkOiB0aGlzLmdldEluc3RhbmNlSWQoKSxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=