import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { toCssPixel } from 'ng-zorro-antd/core/util';
import { NzMNContainerComponent } from 'ng-zorro-antd/message';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "./notification.component";
import * as i3 from "@angular/common";
const NZ_CONFIG_MODULE_NAME = 'notification';
const NZ_NOTIFICATION_DEFAULT_CONFIG = {
    nzTop: '24px',
    nzBottom: '24px',
    nzPlacement: 'topRight',
    nzDuration: 4500,
    nzMaxStack: 7,
    nzPauseOnHover: true,
    nzAnimate: true,
    nzDirection: 'ltr'
};
export class NzNotificationContainerComponent extends NzMNContainerComponent {
    constructor(cdr, nzConfigService) {
        super(cdr, nzConfigService);
        this.dir = 'ltr';
        this.instances = [];
        this.topLeftInstances = [];
        this.topRightInstances = [];
        this.bottomLeftInstances = [];
        this.bottomRightInstances = [];
        const config = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME);
        this.dir = config?.nzDirection || 'ltr';
    }
    create(notification) {
        const noti = this.onCreate(notification);
        const key = noti.options.nzKey;
        const notificationWithSameKey = this.instances.find(msg => msg.options.nzKey === notification.options.nzKey);
        if (key && notificationWithSameKey) {
            this.replaceNotification(notificationWithSameKey, noti);
        }
        else {
            if (this.instances.length >= this.config.nzMaxStack) {
                this.instances = this.instances.slice(1);
            }
            this.instances = [...this.instances, noti];
        }
        this.readyInstances();
        return noti;
    }
    onCreate(instance) {
        instance.options = this.mergeOptions(instance.options);
        instance.onClose = new Subject();
        instance.onClick = new Subject();
        return instance;
    }
    subscribeConfigChange() {
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.updateConfig();
            const config = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME);
            if (config) {
                const { nzDirection } = config;
                this.dir = nzDirection || this.dir;
            }
        });
    }
    updateConfig() {
        this.config = {
            ...NZ_NOTIFICATION_DEFAULT_CONFIG,
            ...this.config,
            ...this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME)
        };
        this.top = toCssPixel(this.config.nzTop);
        this.bottom = toCssPixel(this.config.nzBottom);
        this.cdr.markForCheck();
    }
    replaceNotification(old, _new) {
        old.title = _new.title;
        old.content = _new.content;
        old.template = _new.template;
        old.type = _new.type;
        old.options = _new.options;
    }
    readyInstances() {
        this.topLeftInstances = this.instances.filter(m => m.options.nzPlacement === 'topLeft');
        this.topRightInstances = this.instances.filter(m => m.options.nzPlacement === 'topRight' || !m.options.nzPlacement);
        this.bottomLeftInstances = this.instances.filter(m => m.options.nzPlacement === 'bottomLeft');
        this.bottomRightInstances = this.instances.filter(m => m.options.nzPlacement === 'bottomRight');
        this.cdr.detectChanges();
    }
    mergeOptions(options) {
        const { nzDuration, nzAnimate, nzPauseOnHover, nzPlacement } = this.config;
        return { nzDuration, nzAnimate, nzPauseOnHover, nzPlacement, ...options };
    }
}
NzNotificationContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzNotificationContainerComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.NzConfigService }], target: i0.ɵɵFactoryTarget.Component });
NzNotificationContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzNotificationContainerComponent, selector: "nz-notification-container", exportAs: ["nzNotificationContainer"], usesInheritance: true, ngImport: i0, template: `
    <div
      class="ant-notification ant-notification-topLeft"
      [class.ant-notification-rtl]="dir === 'rtl'"
      [style.top]="top"
      [style.left]="'0px'"
    >
      <nz-notification
        *ngFor="let instance of topLeftInstances"
        [instance]="instance"
        [placement]="config.nzPlacement"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-notification>
    </div>
    <div
      class="ant-notification ant-notification-topRight"
      [class.ant-notification-rtl]="dir === 'rtl'"
      [style.top]="top"
      [style.right]="'0px'"
    >
      <nz-notification
        *ngFor="let instance of topRightInstances"
        [instance]="instance"
        [placement]="config.nzPlacement"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-notification>
    </div>
    <div
      class="ant-notification ant-notification-bottomLeft"
      [class.ant-notification-rtl]="dir === 'rtl'"
      [style.bottom]="bottom"
      [style.left]="'0px'"
    >
      <nz-notification
        *ngFor="let instance of bottomLeftInstances"
        [instance]="instance"
        [placement]="config.nzPlacement"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-notification>
    </div>
    <div
      class="ant-notification ant-notification-bottomRight"
      [class.ant-notification-rtl]="dir === 'rtl'"
      [style.bottom]="bottom"
      [style.right]="'0px'"
    >
      <nz-notification
        *ngFor="let instance of bottomRightInstances"
        [instance]="instance"
        [placement]="config.nzPlacement"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-notification>
    </div>
  `, isInline: true, components: [{ type: i2.NzNotificationComponent, selector: "nz-notification", inputs: ["instance", "index", "placement"], outputs: ["destroyed"], exportAs: ["nzNotification"] }], directives: [{ type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzNotificationContainerComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-notification-container',
                    exportAs: 'nzNotificationContainer',
                    preserveWhitespaces: false,
                    template: `
    <div
      class="ant-notification ant-notification-topLeft"
      [class.ant-notification-rtl]="dir === 'rtl'"
      [style.top]="top"
      [style.left]="'0px'"
    >
      <nz-notification
        *ngFor="let instance of topLeftInstances"
        [instance]="instance"
        [placement]="config.nzPlacement"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-notification>
    </div>
    <div
      class="ant-notification ant-notification-topRight"
      [class.ant-notification-rtl]="dir === 'rtl'"
      [style.top]="top"
      [style.right]="'0px'"
    >
      <nz-notification
        *ngFor="let instance of topRightInstances"
        [instance]="instance"
        [placement]="config.nzPlacement"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-notification>
    </div>
    <div
      class="ant-notification ant-notification-bottomLeft"
      [class.ant-notification-rtl]="dir === 'rtl'"
      [style.bottom]="bottom"
      [style.left]="'0px'"
    >
      <nz-notification
        *ngFor="let instance of bottomLeftInstances"
        [instance]="instance"
        [placement]="config.nzPlacement"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-notification>
    </div>
    <div
      class="ant-notification ant-notification-bottomRight"
      [class.ant-notification-rtl]="dir === 'rtl'"
      [style.bottom]="bottom"
      [style.right]="'0px'"
    >
      <nz-notification
        *ngFor="let instance of bottomRightInstances"
        [instance]="instance"
        [placement]="config.nzPlacement"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-notification>
    </div>
  `
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.NzConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24tY29udGFpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQSxPQUFPLEVBQUUsdUJBQXVCLEVBQXFCLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUczQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7O0FBSS9ELE1BQU0scUJBQXFCLEdBQUcsY0FBYyxDQUFDO0FBRTdDLE1BQU0sOEJBQThCLEdBQWlDO0lBQ25FLEtBQUssRUFBRSxNQUFNO0lBQ2IsUUFBUSxFQUFFLE1BQU07SUFDaEIsV0FBVyxFQUFFLFVBQVU7SUFDdkIsVUFBVSxFQUFFLElBQUk7SUFDaEIsVUFBVSxFQUFFLENBQUM7SUFDYixjQUFjLEVBQUUsSUFBSTtJQUNwQixTQUFTLEVBQUUsSUFBSTtJQUNmLFdBQVcsRUFBRSxLQUFLO0NBQ25CLENBQUM7QUErREYsTUFBTSxPQUFPLGdDQUFpQyxTQUFRLHNCQUFzQjtJQVcxRSxZQUFZLEdBQXNCLEVBQUUsZUFBZ0M7UUFDbEUsS0FBSyxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztRQVg5QixRQUFHLEdBQWMsS0FBSyxDQUFDO1FBSWQsY0FBUyxHQUF3QyxFQUFFLENBQUM7UUFDN0QscUJBQWdCLEdBQXdDLEVBQUUsQ0FBQztRQUMzRCxzQkFBaUIsR0FBd0MsRUFBRSxDQUFDO1FBQzVELHdCQUFtQixHQUF3QyxFQUFFLENBQUM7UUFD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QVcsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxHQUFHLE9BQU8sRUFBRSxDQUFDO0lBQzVFLENBQUM7OzZIQTNGVSxnQ0FBZ0M7aUhBQWhDLGdDQUFnQywrSEF2RGpDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFEVDsyRkFFVSxnQ0FBZ0M7a0JBN0Q1QyxTQUFTO21CQUFDO29CQUNULGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFEVDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOb3RpZmljYXRpb25Db25maWcsIE56Q29uZmlnU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9jb25maWcnO1xuaW1wb3J0IHsgdG9Dc3NQaXhlbCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IE56TU5Db250YWluZXJDb21wb25lbnQgfSBmcm9tICduZy16b3Jyby1hbnRkL21lc3NhZ2UnO1xuXG5pbXBvcnQgeyBOek5vdGlmaWNhdGlvbkRhdGEsIE56Tm90aWZpY2F0aW9uRGF0YU9wdGlvbnMgfSBmcm9tICcuL3R5cGluZ3MnO1xuXG5jb25zdCBOWl9DT05GSUdfTU9EVUxFX05BTUUgPSAnbm90aWZpY2F0aW9uJztcblxuY29uc3QgTlpfTk9USUZJQ0FUSU9OX0RFRkFVTFRfQ09ORklHOiBSZXF1aXJlZDxOb3RpZmljYXRpb25Db25maWc+ID0ge1xuICBuelRvcDogJzI0cHgnLFxuICBuekJvdHRvbTogJzI0cHgnLFxuICBuelBsYWNlbWVudDogJ3RvcFJpZ2h0JyxcbiAgbnpEdXJhdGlvbjogNDUwMCxcbiAgbnpNYXhTdGFjazogNyxcbiAgbnpQYXVzZU9uSG92ZXI6IHRydWUsXG4gIG56QW5pbWF0ZTogdHJ1ZSxcbiAgbnpEaXJlY3Rpb246ICdsdHInXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yOiAnbnotbm90aWZpY2F0aW9uLWNvbnRhaW5lcicsXG4gIGV4cG9ydEFzOiAnbnpOb3RpZmljYXRpb25Db250YWluZXInLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cImFudC1ub3RpZmljYXRpb24gYW50LW5vdGlmaWNhdGlvbi10b3BMZWZ0XCJcbiAgICAgIFtjbGFzcy5hbnQtbm90aWZpY2F0aW9uLXJ0bF09XCJkaXIgPT09ICdydGwnXCJcbiAgICAgIFtzdHlsZS50b3BdPVwidG9wXCJcbiAgICAgIFtzdHlsZS5sZWZ0XT1cIicwcHgnXCJcbiAgICA+XG4gICAgICA8bnotbm90aWZpY2F0aW9uXG4gICAgICAgICpuZ0Zvcj1cImxldCBpbnN0YW5jZSBvZiB0b3BMZWZ0SW5zdGFuY2VzXCJcbiAgICAgICAgW2luc3RhbmNlXT1cImluc3RhbmNlXCJcbiAgICAgICAgW3BsYWNlbWVudF09XCJjb25maWcubnpQbGFjZW1lbnRcIlxuICAgICAgICAoZGVzdHJveWVkKT1cInJlbW92ZSgkZXZlbnQuaWQsICRldmVudC51c2VyQWN0aW9uKVwiXG4gICAgICA+PC9uei1ub3RpZmljYXRpb24+XG4gICAgPC9kaXY+XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJhbnQtbm90aWZpY2F0aW9uIGFudC1ub3RpZmljYXRpb24tdG9wUmlnaHRcIlxuICAgICAgW2NsYXNzLmFudC1ub3RpZmljYXRpb24tcnRsXT1cImRpciA9PT0gJ3J0bCdcIlxuICAgICAgW3N0eWxlLnRvcF09XCJ0b3BcIlxuICAgICAgW3N0eWxlLnJpZ2h0XT1cIicwcHgnXCJcbiAgICA+XG4gICAgICA8bnotbm90aWZpY2F0aW9uXG4gICAgICAgICpuZ0Zvcj1cImxldCBpbnN0YW5jZSBvZiB0b3BSaWdodEluc3RhbmNlc1wiXG4gICAgICAgIFtpbnN0YW5jZV09XCJpbnN0YW5jZVwiXG4gICAgICAgIFtwbGFjZW1lbnRdPVwiY29uZmlnLm56UGxhY2VtZW50XCJcbiAgICAgICAgKGRlc3Ryb3llZCk9XCJyZW1vdmUoJGV2ZW50LmlkLCAkZXZlbnQudXNlckFjdGlvbilcIlxuICAgICAgPjwvbnotbm90aWZpY2F0aW9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwiYW50LW5vdGlmaWNhdGlvbiBhbnQtbm90aWZpY2F0aW9uLWJvdHRvbUxlZnRcIlxuICAgICAgW2NsYXNzLmFudC1ub3RpZmljYXRpb24tcnRsXT1cImRpciA9PT0gJ3J0bCdcIlxuICAgICAgW3N0eWxlLmJvdHRvbV09XCJib3R0b21cIlxuICAgICAgW3N0eWxlLmxlZnRdPVwiJzBweCdcIlxuICAgID5cbiAgICAgIDxuei1ub3RpZmljYXRpb25cbiAgICAgICAgKm5nRm9yPVwibGV0IGluc3RhbmNlIG9mIGJvdHRvbUxlZnRJbnN0YW5jZXNcIlxuICAgICAgICBbaW5zdGFuY2VdPVwiaW5zdGFuY2VcIlxuICAgICAgICBbcGxhY2VtZW50XT1cImNvbmZpZy5uelBsYWNlbWVudFwiXG4gICAgICAgIChkZXN0cm95ZWQpPVwicmVtb3ZlKCRldmVudC5pZCwgJGV2ZW50LnVzZXJBY3Rpb24pXCJcbiAgICAgID48L256LW5vdGlmaWNhdGlvbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cImFudC1ub3RpZmljYXRpb24gYW50LW5vdGlmaWNhdGlvbi1ib3R0b21SaWdodFwiXG4gICAgICBbY2xhc3MuYW50LW5vdGlmaWNhdGlvbi1ydGxdPVwiZGlyID09PSAncnRsJ1wiXG4gICAgICBbc3R5bGUuYm90dG9tXT1cImJvdHRvbVwiXG4gICAgICBbc3R5bGUucmlnaHRdPVwiJzBweCdcIlxuICAgID5cbiAgICAgIDxuei1ub3RpZmljYXRpb25cbiAgICAgICAgKm5nRm9yPVwibGV0IGluc3RhbmNlIG9mIGJvdHRvbVJpZ2h0SW5zdGFuY2VzXCJcbiAgICAgICAgW2luc3RhbmNlXT1cImluc3RhbmNlXCJcbiAgICAgICAgW3BsYWNlbWVudF09XCJjb25maWcubnpQbGFjZW1lbnRcIlxuICAgICAgICAoZGVzdHJveWVkKT1cInJlbW92ZSgkZXZlbnQuaWQsICRldmVudC51c2VyQWN0aW9uKVwiXG4gICAgICA+PC9uei1ub3RpZmljYXRpb24+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTnpOb3RpZmljYXRpb25Db250YWluZXJDb21wb25lbnQgZXh0ZW5kcyBOek1OQ29udGFpbmVyQ29tcG9uZW50IHtcbiAgZGlyOiBEaXJlY3Rpb24gPSAnbHRyJztcbiAgYm90dG9tPzogc3RyaW5nIHwgbnVsbDtcbiAgdG9wPzogc3RyaW5nIHwgbnVsbDtcbiAgb3ZlcnJpZGUgY29uZmlnITogUmVxdWlyZWQ8Tm90aWZpY2F0aW9uQ29uZmlnPjsgLy8gaW5pdGlhbGl6ZWQgYnkgcGFyZW50IGNsYXNzIGNvbnN0cnVjdG9yXG4gIG92ZXJyaWRlIGluc3RhbmNlczogQXJyYXk8UmVxdWlyZWQ8TnpOb3RpZmljYXRpb25EYXRhPj4gPSBbXTtcbiAgdG9wTGVmdEluc3RhbmNlczogQXJyYXk8UmVxdWlyZWQ8TnpOb3RpZmljYXRpb25EYXRhPj4gPSBbXTtcbiAgdG9wUmlnaHRJbnN0YW5jZXM6IEFycmF5PFJlcXVpcmVkPE56Tm90aWZpY2F0aW9uRGF0YT4+ID0gW107XG4gIGJvdHRvbUxlZnRJbnN0YW5jZXM6IEFycmF5PFJlcXVpcmVkPE56Tm90aWZpY2F0aW9uRGF0YT4+ID0gW107XG4gIGJvdHRvbVJpZ2h0SW5zdGFuY2VzOiBBcnJheTxSZXF1aXJlZDxOek5vdGlmaWNhdGlvbkRhdGE+PiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlKSB7XG4gICAgc3VwZXIoY2RyLCBuekNvbmZpZ1NlcnZpY2UpO1xuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMubnpDb25maWdTZXJ2aWNlLmdldENvbmZpZ0ZvckNvbXBvbmVudChOWl9DT05GSUdfTU9EVUxFX05BTUUpO1xuICAgIHRoaXMuZGlyID0gY29uZmlnPy5uekRpcmVjdGlvbiB8fCAnbHRyJztcbiAgfVxuXG4gIG92ZXJyaWRlIGNyZWF0ZShub3RpZmljYXRpb246IE56Tm90aWZpY2F0aW9uRGF0YSk6IFJlcXVpcmVkPE56Tm90aWZpY2F0aW9uRGF0YT4ge1xuICAgIGNvbnN0IG5vdGkgPSB0aGlzLm9uQ3JlYXRlKG5vdGlmaWNhdGlvbik7XG4gICAgY29uc3Qga2V5ID0gbm90aS5vcHRpb25zLm56S2V5O1xuICAgIGNvbnN0IG5vdGlmaWNhdGlvbldpdGhTYW1lS2V5ID0gdGhpcy5pbnN0YW5jZXMuZmluZChcbiAgICAgIG1zZyA9PiBtc2cub3B0aW9ucy5uektleSA9PT0gKG5vdGlmaWNhdGlvbi5vcHRpb25zIGFzIFJlcXVpcmVkPE56Tm90aWZpY2F0aW9uRGF0YU9wdGlvbnM+KS5uektleVxuICAgICk7XG4gICAgaWYgKGtleSAmJiBub3RpZmljYXRpb25XaXRoU2FtZUtleSkge1xuICAgICAgdGhpcy5yZXBsYWNlTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbldpdGhTYW1lS2V5LCBub3RpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuaW5zdGFuY2VzLmxlbmd0aCA+PSB0aGlzLmNvbmZpZy5uek1heFN0YWNrKSB7XG4gICAgICAgIHRoaXMuaW5zdGFuY2VzID0gdGhpcy5pbnN0YW5jZXMuc2xpY2UoMSk7XG4gICAgICB9XG4gICAgICB0aGlzLmluc3RhbmNlcyA9IFsuLi50aGlzLmluc3RhbmNlcywgbm90aV07XG4gICAgfVxuXG4gICAgdGhpcy5yZWFkeUluc3RhbmNlcygpO1xuXG4gICAgcmV0dXJuIG5vdGk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgb25DcmVhdGUoaW5zdGFuY2U6IE56Tm90aWZpY2F0aW9uRGF0YSk6IFJlcXVpcmVkPE56Tm90aWZpY2F0aW9uRGF0YT4ge1xuICAgIGluc3RhbmNlLm9wdGlvbnMgPSB0aGlzLm1lcmdlT3B0aW9ucyhpbnN0YW5jZS5vcHRpb25zKTtcbiAgICBpbnN0YW5jZS5vbkNsb3NlID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcbiAgICBpbnN0YW5jZS5vbkNsaWNrID0gbmV3IFN1YmplY3Q8TW91c2VFdmVudD4oKTtcbiAgICByZXR1cm4gaW5zdGFuY2UgYXMgUmVxdWlyZWQ8TnpOb3RpZmljYXRpb25EYXRhPjtcbiAgfVxuXG4gIHByb3RlY3RlZCBzdWJzY3JpYmVDb25maWdDaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5uekNvbmZpZ1NlcnZpY2VcbiAgICAgIC5nZXRDb25maWdDaGFuZ2VFdmVudEZvckNvbXBvbmVudChOWl9DT05GSUdfTU9EVUxFX05BTUUpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVDb25maWcoKTtcbiAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5uekNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlnRm9yQ29tcG9uZW50KE5aX0NPTkZJR19NT0RVTEVfTkFNRSk7XG4gICAgICAgIGlmIChjb25maWcpIHtcbiAgICAgICAgICBjb25zdCB7IG56RGlyZWN0aW9uIH0gPSBjb25maWc7XG4gICAgICAgICAgdGhpcy5kaXIgPSBuekRpcmVjdGlvbiB8fCB0aGlzLmRpcjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgdXBkYXRlQ29uZmlnKCk6IHZvaWQge1xuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgLi4uTlpfTk9USUZJQ0FUSU9OX0RFRkFVTFRfQ09ORklHLFxuICAgICAgLi4udGhpcy5jb25maWcsXG4gICAgICAuLi50aGlzLm56Q29uZmlnU2VydmljZS5nZXRDb25maWdGb3JDb21wb25lbnQoTlpfQ09ORklHX01PRFVMRV9OQU1FKVxuICAgIH07XG5cbiAgICB0aGlzLnRvcCA9IHRvQ3NzUGl4ZWwodGhpcy5jb25maWcubnpUb3AhKTtcbiAgICB0aGlzLmJvdHRvbSA9IHRvQ3NzUGl4ZWwodGhpcy5jb25maWcubnpCb3R0b20hKTtcblxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXBsYWNlTm90aWZpY2F0aW9uKG9sZDogTnpOb3RpZmljYXRpb25EYXRhLCBfbmV3OiBOek5vdGlmaWNhdGlvbkRhdGEpOiB2b2lkIHtcbiAgICBvbGQudGl0bGUgPSBfbmV3LnRpdGxlO1xuICAgIG9sZC5jb250ZW50ID0gX25ldy5jb250ZW50O1xuICAgIG9sZC50ZW1wbGF0ZSA9IF9uZXcudGVtcGxhdGU7XG4gICAgb2xkLnR5cGUgPSBfbmV3LnR5cGU7XG4gICAgb2xkLm9wdGlvbnMgPSBfbmV3Lm9wdGlvbnM7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgcmVhZHlJbnN0YW5jZXMoKTogdm9pZCB7XG4gICAgdGhpcy50b3BMZWZ0SW5zdGFuY2VzID0gdGhpcy5pbnN0YW5jZXMuZmlsdGVyKG0gPT4gbS5vcHRpb25zLm56UGxhY2VtZW50ID09PSAndG9wTGVmdCcpO1xuICAgIHRoaXMudG9wUmlnaHRJbnN0YW5jZXMgPSB0aGlzLmluc3RhbmNlcy5maWx0ZXIobSA9PiBtLm9wdGlvbnMubnpQbGFjZW1lbnQgPT09ICd0b3BSaWdodCcgfHwgIW0ub3B0aW9ucy5uelBsYWNlbWVudCk7XG4gICAgdGhpcy5ib3R0b21MZWZ0SW5zdGFuY2VzID0gdGhpcy5pbnN0YW5jZXMuZmlsdGVyKG0gPT4gbS5vcHRpb25zLm56UGxhY2VtZW50ID09PSAnYm90dG9tTGVmdCcpO1xuICAgIHRoaXMuYm90dG9tUmlnaHRJbnN0YW5jZXMgPSB0aGlzLmluc3RhbmNlcy5maWx0ZXIobSA9PiBtLm9wdGlvbnMubnpQbGFjZW1lbnQgPT09ICdib3R0b21SaWdodCcpO1xuXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIG1lcmdlT3B0aW9ucyhvcHRpb25zPzogTnpOb3RpZmljYXRpb25EYXRhT3B0aW9ucyk6IE56Tm90aWZpY2F0aW9uRGF0YU9wdGlvbnMge1xuICAgIGNvbnN0IHsgbnpEdXJhdGlvbiwgbnpBbmltYXRlLCBuelBhdXNlT25Ib3ZlciwgbnpQbGFjZW1lbnQgfSA9IHRoaXMuY29uZmlnO1xuICAgIHJldHVybiB7IG56RHVyYXRpb24sIG56QW5pbWF0ZSwgbnpQYXVzZU9uSG92ZXIsIG56UGxhY2VtZW50LCAuLi5vcHRpb25zIH07XG4gIH1cbn1cbiJdfQ==