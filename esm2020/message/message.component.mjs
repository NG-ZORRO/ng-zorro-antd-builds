/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { moveUpMotion } from 'ng-zorro-antd/core/animation';
import { NzMNComponent } from './base';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "ng-zorro-antd/icon";
import * as i3 from "ng-zorro-antd/core/outlet";
export class NzMessageComponent extends NzMNComponent {
    constructor(cdr) {
        super(cdr);
        this.destroyed = new EventEmitter();
    }
}
NzMessageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMessageComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NzMessageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzMessageComponent, selector: "nz-message", inputs: { instance: "instance" }, outputs: { destroyed: "destroyed" }, exportAs: ["nzMessage"], usesInheritance: true, ngImport: i0, template: `
    <div
      class="ant-message-notice"
      [@moveUpMotion]="instance.state"
      (@moveUpMotion.done)="animationStateChanged.next($event)"
      (mouseenter)="onEnter()"
      (mouseleave)="onLeave()"
    >
      <div class="ant-message-notice-content">
        <div class="ant-message-custom-content" [ngClass]="'ant-message-' + instance.type">
          <ng-container [ngSwitch]="instance.type">
            <i *ngSwitchCase="'success'" nz-icon nzType="check-circle"></i>
            <i *ngSwitchCase="'info'" nz-icon nzType="info-circle"></i>
            <i *ngSwitchCase="'warning'" nz-icon nzType="exclamation-circle"></i>
            <i *ngSwitchCase="'error'" nz-icon nzType="close-circle"></i>
            <i *ngSwitchCase="'loading'" nz-icon nzType="loading"></i>
          </ng-container>
          <ng-container *nzStringTemplateOutlet="instance.content">
            <span [innerHTML]="instance.content"></span>
          </ng-container>
        </div>
      </div>
    </div>
  `, isInline: true, directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i2.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i3.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], animations: [moveUpMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMessageComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-message',
                    exportAs: 'nzMessage',
                    preserveWhitespaces: false,
                    animations: [moveUpMotion],
                    template: `
    <div
      class="ant-message-notice"
      [@moveUpMotion]="instance.state"
      (@moveUpMotion.done)="animationStateChanged.next($event)"
      (mouseenter)="onEnter()"
      (mouseleave)="onLeave()"
    >
      <div class="ant-message-notice-content">
        <div class="ant-message-custom-content" [ngClass]="'ant-message-' + instance.type">
          <ng-container [ngSwitch]="instance.type">
            <i *ngSwitchCase="'success'" nz-icon nzType="check-circle"></i>
            <i *ngSwitchCase="'info'" nz-icon nzType="info-circle"></i>
            <i *ngSwitchCase="'warning'" nz-icon nzType="exclamation-circle"></i>
            <i *ngSwitchCase="'error'" nz-icon nzType="close-circle"></i>
            <i *ngSwitchCase="'loading'" nz-icon nzType="loading"></i>
          </ng-container>
          <ng-container *nzStringTemplateOutlet="instance.content">
            <span [innerHTML]="instance.content"></span>
          </ng-container>
        </div>
      </div>
    </div>
  `
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { instance: [{
                type: Input
            }], destroyed: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL21lc3NhZ2UvbWVzc2FnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sUUFBUSxDQUFDOzs7OztBQW1DdkMsTUFBTSxPQUFPLGtCQUFtQixTQUFRLGFBQWE7SUFJbkQsWUFBWSxHQUFzQjtRQUNoQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFIZSxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQXVDLENBQUM7SUFJaEcsQ0FBQzs7K0dBTlUsa0JBQWtCO21HQUFsQixrQkFBa0IseUtBekJuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1QlQsNG1CQXhCVyxDQUFDLFlBQVksQ0FBQzsyRkEwQmYsa0JBQWtCO2tCQWhDOUIsU0FBUzttQkFBQztvQkFDVCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUUsV0FBVztvQkFDckIsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsVUFBVSxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUMxQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJUO2lCQUNGO3dHQUVtQixRQUFRO3NCQUF6QixLQUFLO2dCQUNzQixTQUFTO3NCQUFwQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBtb3ZlVXBNb3Rpb24gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvYW5pbWF0aW9uJztcblxuaW1wb3J0IHsgTnpNTkNvbXBvbmVudCB9IGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgeyBOek1lc3NhZ2VEYXRhIH0gZnJvbSAnLi90eXBpbmdzJztcblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvcjogJ256LW1lc3NhZ2UnLFxuICBleHBvcnRBczogJ256TWVzc2FnZScsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBhbmltYXRpb25zOiBbbW92ZVVwTW90aW9uXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cImFudC1tZXNzYWdlLW5vdGljZVwiXG4gICAgICBbQG1vdmVVcE1vdGlvbl09XCJpbnN0YW5jZS5zdGF0ZVwiXG4gICAgICAoQG1vdmVVcE1vdGlvbi5kb25lKT1cImFuaW1hdGlvblN0YXRlQ2hhbmdlZC5uZXh0KCRldmVudClcIlxuICAgICAgKG1vdXNlZW50ZXIpPVwib25FbnRlcigpXCJcbiAgICAgIChtb3VzZWxlYXZlKT1cIm9uTGVhdmUoKVwiXG4gICAgPlxuICAgICAgPGRpdiBjbGFzcz1cImFudC1tZXNzYWdlLW5vdGljZS1jb250ZW50XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtbWVzc2FnZS1jdXN0b20tY29udGVudFwiIFtuZ0NsYXNzXT1cIidhbnQtbWVzc2FnZS0nICsgaW5zdGFuY2UudHlwZVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cImluc3RhbmNlLnR5cGVcIj5cbiAgICAgICAgICAgIDxpICpuZ1N3aXRjaENhc2U9XCInc3VjY2VzcydcIiBuei1pY29uIG56VHlwZT1cImNoZWNrLWNpcmNsZVwiPjwvaT5cbiAgICAgICAgICAgIDxpICpuZ1N3aXRjaENhc2U9XCInaW5mbydcIiBuei1pY29uIG56VHlwZT1cImluZm8tY2lyY2xlXCI+PC9pPlxuICAgICAgICAgICAgPGkgKm5nU3dpdGNoQ2FzZT1cIid3YXJuaW5nJ1wiIG56LWljb24gbnpUeXBlPVwiZXhjbGFtYXRpb24tY2lyY2xlXCI+PC9pPlxuICAgICAgICAgICAgPGkgKm5nU3dpdGNoQ2FzZT1cIidlcnJvcidcIiBuei1pY29uIG56VHlwZT1cImNsb3NlLWNpcmNsZVwiPjwvaT5cbiAgICAgICAgICAgIDxpICpuZ1N3aXRjaENhc2U9XCInbG9hZGluZydcIiBuei1pY29uIG56VHlwZT1cImxvYWRpbmdcIj48L2k+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cImluc3RhbmNlLmNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwiaW5zdGFuY2UuY29udGVudFwiPjwvc3Bhbj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOek1lc3NhZ2VDb21wb25lbnQgZXh0ZW5kcyBOek1OQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBvdmVycmlkZSBpbnN0YW5jZSE6IFJlcXVpcmVkPE56TWVzc2FnZURhdGE+O1xuICBAT3V0cHV0KCkgb3ZlcnJpZGUgcmVhZG9ubHkgZGVzdHJveWVkID0gbmV3IEV2ZW50RW1pdHRlcjx7IGlkOiBzdHJpbmc7IHVzZXJBY3Rpb246IGJvb2xlYW4gfT4oKTtcblxuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgc3VwZXIoY2RyKTtcbiAgfVxufVxuIl19