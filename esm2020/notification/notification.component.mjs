/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { notificationMotion } from 'ng-zorro-antd/core/animation';
import { NzMNComponent } from 'ng-zorro-antd/message';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "ng-zorro-antd/icon";
import * as i3 from "ng-zorro-antd/core/outlet";
export class NzNotificationComponent extends NzMNComponent {
    constructor(cdr) {
        super(cdr);
        this.destroyed = new EventEmitter();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.instance.onClick.complete();
    }
    onClick(event) {
        this.instance.onClick.next(event);
    }
    close() {
        this.destroy(true);
    }
    get state() {
        if (this.instance.state === 'enter') {
            if (this.placement === 'topLeft' || this.placement === 'bottomLeft') {
                return 'enterLeft';
            }
            else {
                return 'enterRight';
            }
        }
        else {
            return this.instance.state;
        }
    }
}
NzNotificationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzNotificationComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NzNotificationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzNotificationComponent, selector: "nz-notification", inputs: { instance: "instance", index: "index", placement: "placement" }, outputs: { destroyed: "destroyed" }, exportAs: ["nzNotification"], usesInheritance: true, ngImport: i0, template: `
    <div
      class="ant-notification-notice ant-notification-notice-closable"
      [ngStyle]="instance.options?.nzStyle || null"
      [ngClass]="instance.options?.nzClass || ''"
      [@notificationMotion]="state"
      (@notificationMotion.done)="animationStateChanged.next($event)"
      (click)="onClick($event)"
      (mouseenter)="onEnter()"
      (mouseleave)="onLeave()"
    >
      <div *ngIf="!instance.template" class="ant-notification-notice-content">
        <div
          class="ant-notification-notice-content"
          [ngClass]="{ 'ant-notification-notice-with-icon': instance.type !== 'blank' }"
        >
          <div [class.ant-notification-notice-with-icon]="instance.type !== 'blank'">
            <ng-container [ngSwitch]="instance.type">
              <i
                *ngSwitchCase="'success'"
                nz-icon
                nzType="check-circle"
                class="ant-notification-notice-icon ant-notification-notice-icon-success"
              ></i>
              <i
                *ngSwitchCase="'info'"
                nz-icon
                nzType="info-circle"
                class="ant-notification-notice-icon ant-notification-notice-icon-info"
              ></i>
              <i
                *ngSwitchCase="'warning'"
                nz-icon
                nzType="exclamation-circle"
                class="ant-notification-notice-icon ant-notification-notice-icon-warning"
              ></i>
              <i
                *ngSwitchCase="'error'"
                nz-icon
                nzType="close-circle"
                class="ant-notification-notice-icon ant-notification-notice-icon-error"
              ></i>
            </ng-container>
            <div class="ant-notification-notice-message" [innerHTML]="instance.title"></div>
            <div class="ant-notification-notice-description" [innerHTML]="instance.content"></div>
          </div>
        </div>
      </div>
      <ng-template
        [ngIf]="instance.template"
        [ngTemplateOutlet]="instance.template!"
        [ngTemplateOutletContext]="{ $implicit: this, data: instance.options?.nzData }"
      ></ng-template>
      <a tabindex="0" class="ant-notification-notice-close" (click)="close()">
        <span class="ant-notification-notice-close-x">
          <ng-container *ngIf="instance.options?.nzCloseIcon; else iconTpl">
            <ng-container *nzStringTemplateOutlet="instance.options?.nzCloseIcon; let closeIcon">
              <i nz-icon [nzType]="closeIcon"></i>
            </ng-container>
          </ng-container>
          <ng-template #iconTpl>
            <i nz-icon nzType="close" class="ant-notification-close-icon"></i>
          </ng-template>
        </span>
      </a>
    </div>
  `, isInline: true, directives: [{ type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i2.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i3.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], animations: [notificationMotion], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzNotificationComponent, decorators: [{
            type: Component,
            args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-notification',
                    exportAs: 'nzNotification',
                    preserveWhitespaces: false,
                    animations: [notificationMotion],
                    template: `
    <div
      class="ant-notification-notice ant-notification-notice-closable"
      [ngStyle]="instance.options?.nzStyle || null"
      [ngClass]="instance.options?.nzClass || ''"
      [@notificationMotion]="state"
      (@notificationMotion.done)="animationStateChanged.next($event)"
      (click)="onClick($event)"
      (mouseenter)="onEnter()"
      (mouseleave)="onLeave()"
    >
      <div *ngIf="!instance.template" class="ant-notification-notice-content">
        <div
          class="ant-notification-notice-content"
          [ngClass]="{ 'ant-notification-notice-with-icon': instance.type !== 'blank' }"
        >
          <div [class.ant-notification-notice-with-icon]="instance.type !== 'blank'">
            <ng-container [ngSwitch]="instance.type">
              <i
                *ngSwitchCase="'success'"
                nz-icon
                nzType="check-circle"
                class="ant-notification-notice-icon ant-notification-notice-icon-success"
              ></i>
              <i
                *ngSwitchCase="'info'"
                nz-icon
                nzType="info-circle"
                class="ant-notification-notice-icon ant-notification-notice-icon-info"
              ></i>
              <i
                *ngSwitchCase="'warning'"
                nz-icon
                nzType="exclamation-circle"
                class="ant-notification-notice-icon ant-notification-notice-icon-warning"
              ></i>
              <i
                *ngSwitchCase="'error'"
                nz-icon
                nzType="close-circle"
                class="ant-notification-notice-icon ant-notification-notice-icon-error"
              ></i>
            </ng-container>
            <div class="ant-notification-notice-message" [innerHTML]="instance.title"></div>
            <div class="ant-notification-notice-description" [innerHTML]="instance.content"></div>
          </div>
        </div>
      </div>
      <ng-template
        [ngIf]="instance.template"
        [ngTemplateOutlet]="instance.template!"
        [ngTemplateOutletContext]="{ $implicit: this, data: instance.options?.nzData }"
      ></ng-template>
      <a tabindex="0" class="ant-notification-notice-close" (click)="close()">
        <span class="ant-notification-notice-close-x">
          <ng-container *ngIf="instance.options?.nzCloseIcon; else iconTpl">
            <ng-container *nzStringTemplateOutlet="instance.options?.nzCloseIcon; let closeIcon">
              <i nz-icon [nzType]="closeIcon"></i>
            </ng-container>
          </ng-container>
          <ng-template #iconTpl>
            <i nz-icon nzType="close" class="ant-notification-close-icon"></i>
          </ng-template>
        </span>
      </a>
    </div>
  `
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { instance: [{
                type: Input
            }], index: [{
                type: Input
            }], placement: [{
                type: Input
            }], destroyed: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFxQixTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEgsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7OztBQThFdEQsTUFBTSxPQUFPLHVCQUF3QixTQUFRLGFBQWE7SUFPeEQsWUFBWSxHQUFzQjtRQUNoQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFIZSxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQXVDLENBQUM7SUFJaEcsQ0FBQztJQUVRLFdBQVc7UUFDbEIsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBaUI7UUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxPQUFPLEVBQUU7WUFDbkMsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFlBQVksRUFBRTtnQkFDbkUsT0FBTyxXQUFXLENBQUM7YUFDcEI7aUJBQU07Z0JBQ0wsT0FBTyxZQUFZLENBQUM7YUFDckI7U0FDRjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztTQUM1QjtJQUNILENBQUM7O29IQWxDVSx1QkFBdUI7d0dBQXZCLHVCQUF1QiwyTkFwRXhCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrRVQsdTNCQW5FVyxDQUFDLGtCQUFrQixDQUFDOzJGQXFFckIsdUJBQXVCO2tCQTFFbkMsU0FBUzttQkFBQztvQkFDVCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsVUFBVSxFQUFFLENBQUMsa0JBQWtCLENBQUM7b0JBQ2hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0VUO2lCQUNGO3dHQUVtQixRQUFRO3NCQUF6QixLQUFLO2dCQUNZLEtBQUs7c0JBQXRCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFFc0IsU0FBUztzQkFBcEMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBub3RpZmljYXRpb25Nb3Rpb24gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvYW5pbWF0aW9uJztcbmltcG9ydCB7IE56TU5Db21wb25lbnQgfSBmcm9tICduZy16b3Jyby1hbnRkL21lc3NhZ2UnO1xuXG5pbXBvcnQgeyBOek5vdGlmaWNhdGlvbkRhdGEgfSBmcm9tICcuL3R5cGluZ3MnO1xuXG5AQ29tcG9uZW50KHtcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6ICduei1ub3RpZmljYXRpb24nLFxuICBleHBvcnRBczogJ256Tm90aWZpY2F0aW9uJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGFuaW1hdGlvbnM6IFtub3RpZmljYXRpb25Nb3Rpb25dLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwiYW50LW5vdGlmaWNhdGlvbi1ub3RpY2UgYW50LW5vdGlmaWNhdGlvbi1ub3RpY2UtY2xvc2FibGVcIlxuICAgICAgW25nU3R5bGVdPVwiaW5zdGFuY2Uub3B0aW9ucz8ubnpTdHlsZSB8fCBudWxsXCJcbiAgICAgIFtuZ0NsYXNzXT1cImluc3RhbmNlLm9wdGlvbnM/Lm56Q2xhc3MgfHwgJydcIlxuICAgICAgW0Bub3RpZmljYXRpb25Nb3Rpb25dPVwic3RhdGVcIlxuICAgICAgKEBub3RpZmljYXRpb25Nb3Rpb24uZG9uZSk9XCJhbmltYXRpb25TdGF0ZUNoYW5nZWQubmV4dCgkZXZlbnQpXCJcbiAgICAgIChjbGljayk9XCJvbkNsaWNrKCRldmVudClcIlxuICAgICAgKG1vdXNlZW50ZXIpPVwib25FbnRlcigpXCJcbiAgICAgIChtb3VzZWxlYXZlKT1cIm9uTGVhdmUoKVwiXG4gICAgPlxuICAgICAgPGRpdiAqbmdJZj1cIiFpbnN0YW5jZS50ZW1wbGF0ZVwiIGNsYXNzPVwiYW50LW5vdGlmaWNhdGlvbi1ub3RpY2UtY29udGVudFwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJhbnQtbm90aWZpY2F0aW9uLW5vdGljZS1jb250ZW50XCJcbiAgICAgICAgICBbbmdDbGFzc109XCJ7ICdhbnQtbm90aWZpY2F0aW9uLW5vdGljZS13aXRoLWljb24nOiBpbnN0YW5jZS50eXBlICE9PSAnYmxhbmsnIH1cIlxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBbY2xhc3MuYW50LW5vdGlmaWNhdGlvbi1ub3RpY2Utd2l0aC1pY29uXT1cImluc3RhbmNlLnR5cGUgIT09ICdibGFuaydcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cImluc3RhbmNlLnR5cGVcIj5cbiAgICAgICAgICAgICAgPGlcbiAgICAgICAgICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ3N1Y2Nlc3MnXCJcbiAgICAgICAgICAgICAgICBuei1pY29uXG4gICAgICAgICAgICAgICAgbnpUeXBlPVwiY2hlY2stY2lyY2xlXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImFudC1ub3RpZmljYXRpb24tbm90aWNlLWljb24gYW50LW5vdGlmaWNhdGlvbi1ub3RpY2UtaWNvbi1zdWNjZXNzXCJcbiAgICAgICAgICAgICAgPjwvaT5cbiAgICAgICAgICAgICAgPGlcbiAgICAgICAgICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ2luZm8nXCJcbiAgICAgICAgICAgICAgICBuei1pY29uXG4gICAgICAgICAgICAgICAgbnpUeXBlPVwiaW5mby1jaXJjbGVcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiYW50LW5vdGlmaWNhdGlvbi1ub3RpY2UtaWNvbiBhbnQtbm90aWZpY2F0aW9uLW5vdGljZS1pY29uLWluZm9cIlxuICAgICAgICAgICAgICA+PC9pPlxuICAgICAgICAgICAgICA8aVxuICAgICAgICAgICAgICAgICpuZ1N3aXRjaENhc2U9XCInd2FybmluZydcIlxuICAgICAgICAgICAgICAgIG56LWljb25cbiAgICAgICAgICAgICAgICBuelR5cGU9XCJleGNsYW1hdGlvbi1jaXJjbGVcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiYW50LW5vdGlmaWNhdGlvbi1ub3RpY2UtaWNvbiBhbnQtbm90aWZpY2F0aW9uLW5vdGljZS1pY29uLXdhcm5pbmdcIlxuICAgICAgICAgICAgICA+PC9pPlxuICAgICAgICAgICAgICA8aVxuICAgICAgICAgICAgICAgICpuZ1N3aXRjaENhc2U9XCInZXJyb3InXCJcbiAgICAgICAgICAgICAgICBuei1pY29uXG4gICAgICAgICAgICAgICAgbnpUeXBlPVwiY2xvc2UtY2lyY2xlXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImFudC1ub3RpZmljYXRpb24tbm90aWNlLWljb24gYW50LW5vdGlmaWNhdGlvbi1ub3RpY2UtaWNvbi1lcnJvclwiXG4gICAgICAgICAgICAgID48L2k+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtbm90aWZpY2F0aW9uLW5vdGljZS1tZXNzYWdlXCIgW2lubmVySFRNTF09XCJpbnN0YW5jZS50aXRsZVwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFudC1ub3RpZmljYXRpb24tbm90aWNlLWRlc2NyaXB0aW9uXCIgW2lubmVySFRNTF09XCJpbnN0YW5jZS5jb250ZW50XCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgW25nSWZdPVwiaW5zdGFuY2UudGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJpbnN0YW5jZS50ZW1wbGF0ZSFcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IHRoaXMsIGRhdGE6IGluc3RhbmNlLm9wdGlvbnM/Lm56RGF0YSB9XCJcbiAgICAgID48L25nLXRlbXBsYXRlPlxuICAgICAgPGEgdGFiaW5kZXg9XCIwXCIgY2xhc3M9XCJhbnQtbm90aWZpY2F0aW9uLW5vdGljZS1jbG9zZVwiIChjbGljayk9XCJjbG9zZSgpXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYW50LW5vdGlmaWNhdGlvbi1ub3RpY2UtY2xvc2UteFwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpbnN0YW5jZS5vcHRpb25zPy5uekNsb3NlSWNvbjsgZWxzZSBpY29uVHBsXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwiaW5zdGFuY2Uub3B0aW9ucz8ubnpDbG9zZUljb247IGxldCBjbG9zZUljb25cIj5cbiAgICAgICAgICAgICAgPGkgbnotaWNvbiBbbnpUeXBlXT1cImNsb3NlSWNvblwiPjwvaT5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaWNvblRwbD5cbiAgICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiY2xvc2VcIiBjbGFzcz1cImFudC1ub3RpZmljYXRpb24tY2xvc2UtaWNvblwiPjwvaT5cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2E+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTnpOb3RpZmljYXRpb25Db21wb25lbnQgZXh0ZW5kcyBOek1OQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KCkgb3ZlcnJpZGUgaW5zdGFuY2UhOiBSZXF1aXJlZDxOek5vdGlmaWNhdGlvbkRhdGE+O1xuICBASW5wdXQoKSBvdmVycmlkZSBpbmRleCE6IG51bWJlcjtcbiAgQElucHV0KCkgcGxhY2VtZW50Pzogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBvdmVycmlkZSByZWFkb25seSBkZXN0cm95ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHsgaWQ6IHN0cmluZzsgdXNlckFjdGlvbjogYm9vbGVhbiB9PigpO1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzdXBlcihjZHIpO1xuICB9XG5cbiAgb3ZlcnJpZGUgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICB0aGlzLmluc3RhbmNlLm9uQ2xpY2suY29tcGxldGUoKTtcbiAgfVxuXG4gIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmluc3RhbmNlLm9uQ2xpY2submV4dChldmVudCk7XG4gIH1cblxuICBjbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kodHJ1ZSk7XG4gIH1cblxuICBnZXQgc3RhdGUoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodGhpcy5pbnN0YW5jZS5zdGF0ZSA9PT0gJ2VudGVyJykge1xuICAgICAgaWYgKHRoaXMucGxhY2VtZW50ID09PSAndG9wTGVmdCcgfHwgdGhpcy5wbGFjZW1lbnQgPT09ICdib3R0b21MZWZ0Jykge1xuICAgICAgICByZXR1cm4gJ2VudGVyTGVmdCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJ2VudGVyUmlnaHQnO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZS5zdGF0ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==