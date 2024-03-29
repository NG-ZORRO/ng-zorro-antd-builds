import { Injectable } from '@angular/core';
import { NzMNService } from 'ng-zorro-antd/message';
import { NzNotificationContainerComponent } from './notification-container.component';
import { NzNotificationServiceModule } from './notification.service.module';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/services";
import * as i2 from "@angular/cdk/overlay";
let notificationId = 0;
export class NzNotificationService extends NzMNService {
    constructor(nzSingletonService, overlay, injector) {
        super(nzSingletonService, overlay, injector);
        this.componentPrefix = 'notification-';
    }
    success(title, content, options) {
        return this.createInstance({ type: 'success', title, content }, options);
    }
    error(title, content, options) {
        return this.createInstance({ type: 'error', title, content }, options);
    }
    info(title, content, options) {
        return this.createInstance({ type: 'info', title, content }, options);
    }
    warning(title, content, options) {
        return this.createInstance({ type: 'warning', title, content }, options);
    }
    blank(title, content, options) {
        return this.createInstance({ type: 'blank', title, content }, options);
    }
    create(type, title, content, options) {
        return this.createInstance({ type, title, content }, options);
    }
    template(template, options) {
        return this.createInstance({ template }, options);
    }
    generateMessageId() {
        return `${this.componentPrefix}-${notificationId++}`;
    }
    createInstance(message, options) {
        this.container = this.withContainer(NzNotificationContainerComponent);
        return this.container.create({
            ...message,
            ...{
                createdAt: new Date(),
                messageId: this.generateMessageId(),
                options
            }
        });
    }
}
NzNotificationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzNotificationService, deps: [{ token: i1.NzSingletonService }, { token: i2.Overlay }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
NzNotificationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzNotificationService, providedIn: NzNotificationServiceModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzNotificationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: NzNotificationServiceModule
                }]
        }], ctorParameters: function () { return [{ type: i1.NzSingletonService }, { type: i2.Overlay }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQSxPQUFPLEVBQUUsVUFBVSxFQUF5QixNQUFNLGVBQWUsQ0FBQztBQUdsRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFcEQsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdEYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7QUFHNUUsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO0FBS3ZCLE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxXQUFXO0lBSXBELFlBQVksa0JBQXNDLEVBQUUsT0FBZ0IsRUFBRSxRQUFrQjtRQUN0RixLQUFLLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBSHJDLG9CQUFlLEdBQUcsZUFBZSxDQUFDO0lBSTVDLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBYSxFQUFFLE9BQWUsRUFBRSxPQUFtQztRQUN6RSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQWEsRUFBRSxPQUFlLEVBQUUsT0FBbUM7UUFDdkUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELElBQUksQ0FBQyxLQUFhLEVBQUUsT0FBZSxFQUFFLE9BQW1DO1FBQ3RFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBYSxFQUFFLE9BQWUsRUFBRSxPQUFtQztRQUN6RSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQWEsRUFBRSxPQUFlLEVBQUUsT0FBbUM7UUFDdkUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELE1BQU0sQ0FDSixJQUFpRSxFQUNqRSxLQUFhLEVBQ2IsT0FBZSxFQUNmLE9BQW1DO1FBRW5DLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELFFBQVEsQ0FBQyxRQUF5QixFQUFFLE9BQW1DO1FBQ3JFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFUyxpQkFBaUI7UUFDekIsT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLElBQUksY0FBYyxFQUFFLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRU8sY0FBYyxDQUFDLE9BQTJCLEVBQUUsT0FBbUM7UUFDckYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFFdEUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztZQUMzQixHQUFHLE9BQU87WUFDVixHQUFHO2dCQUNELFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRTtnQkFDckIsU0FBUyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtnQkFDbkMsT0FBTzthQUNSO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7a0hBeERVLHFCQUFxQjtzSEFBckIscUJBQXFCLGNBRnBCLDJCQUEyQjsyRkFFNUIscUJBQXFCO2tCQUhqQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSwyQkFBMkI7aUJBQ3hDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgT3ZlcmxheSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOelNpbmdsZXRvblNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvc2VydmljZXMnO1xuaW1wb3J0IHsgTnpNTlNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL21lc3NhZ2UnO1xuXG5pbXBvcnQgeyBOek5vdGlmaWNhdGlvbkNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vbm90aWZpY2F0aW9uLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpOb3RpZmljYXRpb25TZXJ2aWNlTW9kdWxlIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uc2VydmljZS5tb2R1bGUnO1xuaW1wb3J0IHsgTnpOb3RpZmljYXRpb25EYXRhLCBOek5vdGlmaWNhdGlvbkRhdGFPcHRpb25zLCBOek5vdGlmaWNhdGlvblJlZiB9IGZyb20gJy4vdHlwaW5ncyc7XG5cbmxldCBub3RpZmljYXRpb25JZCA9IDA7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogTnpOb3RpZmljYXRpb25TZXJ2aWNlTW9kdWxlXG59KVxuZXhwb3J0IGNsYXNzIE56Tm90aWZpY2F0aW9uU2VydmljZSBleHRlbmRzIE56TU5TZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGNvbnRhaW5lciE6IE56Tm90aWZpY2F0aW9uQ29udGFpbmVyQ29tcG9uZW50O1xuICBwcm90ZWN0ZWQgY29tcG9uZW50UHJlZml4ID0gJ25vdGlmaWNhdGlvbi0nO1xuXG4gIGNvbnN0cnVjdG9yKG56U2luZ2xldG9uU2VydmljZTogTnpTaW5nbGV0b25TZXJ2aWNlLCBvdmVybGF5OiBPdmVybGF5LCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICBzdXBlcihuelNpbmdsZXRvblNlcnZpY2UsIG92ZXJsYXksIGluamVjdG9yKTtcbiAgfVxuXG4gIHN1Y2Nlc3ModGl0bGU6IHN0cmluZywgY29udGVudDogc3RyaW5nLCBvcHRpb25zPzogTnpOb3RpZmljYXRpb25EYXRhT3B0aW9ucyk6IE56Tm90aWZpY2F0aW9uUmVmIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVJbnN0YW5jZSh7IHR5cGU6ICdzdWNjZXNzJywgdGl0bGUsIGNvbnRlbnQgfSwgb3B0aW9ucyk7XG4gIH1cblxuICBlcnJvcih0aXRsZTogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcsIG9wdGlvbnM/OiBOek5vdGlmaWNhdGlvbkRhdGFPcHRpb25zKTogTnpOb3RpZmljYXRpb25SZWYge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUluc3RhbmNlKHsgdHlwZTogJ2Vycm9yJywgdGl0bGUsIGNvbnRlbnQgfSwgb3B0aW9ucyk7XG4gIH1cblxuICBpbmZvKHRpdGxlOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZywgb3B0aW9ucz86IE56Tm90aWZpY2F0aW9uRGF0YU9wdGlvbnMpOiBOek5vdGlmaWNhdGlvblJlZiB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlSW5zdGFuY2UoeyB0eXBlOiAnaW5mbycsIHRpdGxlLCBjb250ZW50IH0sIG9wdGlvbnMpO1xuICB9XG5cbiAgd2FybmluZyh0aXRsZTogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcsIG9wdGlvbnM/OiBOek5vdGlmaWNhdGlvbkRhdGFPcHRpb25zKTogTnpOb3RpZmljYXRpb25SZWYge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUluc3RhbmNlKHsgdHlwZTogJ3dhcm5pbmcnLCB0aXRsZSwgY29udGVudCB9LCBvcHRpb25zKTtcbiAgfVxuXG4gIGJsYW5rKHRpdGxlOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZywgb3B0aW9ucz86IE56Tm90aWZpY2F0aW9uRGF0YU9wdGlvbnMpOiBOek5vdGlmaWNhdGlvblJlZiB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlSW5zdGFuY2UoeyB0eXBlOiAnYmxhbmsnLCB0aXRsZSwgY29udGVudCB9LCBvcHRpb25zKTtcbiAgfVxuXG4gIGNyZWF0ZShcbiAgICB0eXBlOiAnc3VjY2VzcycgfCAnaW5mbycgfCAnd2FybmluZycgfCAnZXJyb3InIHwgJ2JsYW5rJyB8IHN0cmluZyxcbiAgICB0aXRsZTogc3RyaW5nLFxuICAgIGNvbnRlbnQ6IHN0cmluZyxcbiAgICBvcHRpb25zPzogTnpOb3RpZmljYXRpb25EYXRhT3B0aW9uc1xuICApOiBOek5vdGlmaWNhdGlvblJlZiB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlSW5zdGFuY2UoeyB0eXBlLCB0aXRsZSwgY29udGVudCB9LCBvcHRpb25zKTtcbiAgfVxuXG4gIHRlbXBsYXRlKHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjx7fT4sIG9wdGlvbnM/OiBOek5vdGlmaWNhdGlvbkRhdGFPcHRpb25zKTogTnpOb3RpZmljYXRpb25SZWYge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUluc3RhbmNlKHsgdGVtcGxhdGUgfSwgb3B0aW9ucyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2VuZXJhdGVNZXNzYWdlSWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGhpcy5jb21wb25lbnRQcmVmaXh9LSR7bm90aWZpY2F0aW9uSWQrK31gO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVJbnN0YW5jZShtZXNzYWdlOiBOek5vdGlmaWNhdGlvbkRhdGEsIG9wdGlvbnM/OiBOek5vdGlmaWNhdGlvbkRhdGFPcHRpb25zKTogTnpOb3RpZmljYXRpb25SZWYge1xuICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy53aXRoQ29udGFpbmVyKE56Tm90aWZpY2F0aW9uQ29udGFpbmVyQ29tcG9uZW50KTtcblxuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5jcmVhdGUoe1xuICAgICAgLi4ubWVzc2FnZSxcbiAgICAgIC4uLntcbiAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLFxuICAgICAgICBtZXNzYWdlSWQ6IHRoaXMuZ2VuZXJhdGVNZXNzYWdlSWQoKSxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=