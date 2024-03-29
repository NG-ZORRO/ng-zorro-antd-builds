import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "ng-zorro-antd/icon";
export class NzRateItemComponent {
    constructor() {
        this.index = 0;
        this.allowHalf = false;
        this.itemHover = new EventEmitter();
        this.itemClick = new EventEmitter();
    }
    hoverRate(isHalf) {
        this.itemHover.next(isHalf && this.allowHalf);
    }
    clickRate(isHalf) {
        this.itemClick.next(isHalf && this.allowHalf);
    }
}
NzRateItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRateItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzRateItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzRateItemComponent, selector: "[nz-rate-item]", inputs: { character: "character", index: "index", allowHalf: "allowHalf" }, outputs: { itemHover: "itemHover", itemClick: "itemClick" }, exportAs: ["nzRateItem"], ngImport: i0, template: `
    <div
      class="ant-rate-star-second"
      (mouseover)="hoverRate(false); $event.stopPropagation()"
      (click)="clickRate(false)"
    >
      <ng-template
        [ngTemplateOutlet]="character || defaultCharacter"
        [ngTemplateOutletContext]="{ $implicit: index }"
      ></ng-template>
    </div>
    <div class="ant-rate-star-first" (mouseover)="hoverRate(true); $event.stopPropagation()" (click)="clickRate(true)">
      <ng-template
        [ngTemplateOutlet]="character || defaultCharacter"
        [ngTemplateOutletContext]="{ $implicit: index }"
      ></ng-template>
    </div>

    <ng-template #defaultCharacter>
      <i nz-icon nzType="star" nzTheme="fill"></i>
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzRateItemComponent.prototype, "allowHalf", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRateItemComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: '[nz-rate-item]',
                    exportAs: 'nzRateItem',
                    template: `
    <div
      class="ant-rate-star-second"
      (mouseover)="hoverRate(false); $event.stopPropagation()"
      (click)="clickRate(false)"
    >
      <ng-template
        [ngTemplateOutlet]="character || defaultCharacter"
        [ngTemplateOutletContext]="{ $implicit: index }"
      ></ng-template>
    </div>
    <div class="ant-rate-star-first" (mouseover)="hoverRate(true); $event.stopPropagation()" (click)="clickRate(true)">
      <ng-template
        [ngTemplateOutlet]="character || defaultCharacter"
        [ngTemplateOutletContext]="{ $implicit: index }"
      ></ng-template>
    </div>

    <ng-template #defaultCharacter>
      <i nz-icon nzType="star" nzTheme="fill"></i>
    </ng-template>
  `
                }]
        }], propDecorators: { character: [{
                type: Input
            }], index: [{
                type: Input
            }], allowHalf: [{
                type: Input
            }], itemHover: [{
                type: Output
            }], itemClick: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0ZS1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvcmF0ZS9yYXRlLWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFFTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7O0FBOEJ2RCxNQUFNLE9BQU8sbUJBQW1CO0lBNUJoQztRQWdDVyxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ00sY0FBUyxHQUFZLEtBQUssQ0FBQztRQUNqQyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN4QyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztLQVM1RDtJQVBDLFNBQVMsQ0FBQyxNQUFlO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFlO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7Z0hBZlUsbUJBQW1CO29HQUFuQixtQkFBbUIseU5BdkJwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJUO0FBT3dCO0lBQWYsWUFBWSxFQUFFO3NEQUE0QjsyRkFMekMsbUJBQW1CO2tCQTVCL0IsU0FBUzttQkFBQztvQkFDVCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCVDtpQkFDRjs4QkFJVSxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDbUIsU0FBUztzQkFBakMsS0FBSztnQkFDYSxTQUFTO3NCQUEzQixNQUFNO2dCQUNZLFNBQVM7c0JBQTNCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvcjogJ1tuei1yYXRlLWl0ZW1dJyxcbiAgZXhwb3J0QXM6ICduelJhdGVJdGVtJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cImFudC1yYXRlLXN0YXItc2Vjb25kXCJcbiAgICAgIChtb3VzZW92ZXIpPVwiaG92ZXJSYXRlKGZhbHNlKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCJcbiAgICAgIChjbGljayk9XCJjbGlja1JhdGUoZmFsc2UpXCJcbiAgICA+XG4gICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY2hhcmFjdGVyIHx8IGRlZmF1bHRDaGFyYWN0ZXJcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IGluZGV4IH1cIlxuICAgICAgPjwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImFudC1yYXRlLXN0YXItZmlyc3RcIiAobW91c2VvdmVyKT1cImhvdmVyUmF0ZSh0cnVlKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCIgKGNsaWNrKT1cImNsaWNrUmF0ZSh0cnVlKVwiPlxuICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNoYXJhY3RlciB8fCBkZWZhdWx0Q2hhcmFjdGVyXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBpbmRleCB9XCJcbiAgICAgID48L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuXG4gICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0Q2hhcmFjdGVyPlxuICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJzdGFyXCIgbnpUaGVtZT1cImZpbGxcIj48L2k+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOelJhdGVJdGVtQ29tcG9uZW50IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2FsbG93SGFsZjogQm9vbGVhbklucHV0O1xuXG4gIEBJbnB1dCgpIGNoYXJhY3RlciE6IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBASW5wdXQoKSBpbmRleCA9IDA7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBhbGxvd0hhbGY6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGl0ZW1Ib3ZlciA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGl0ZW1DbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBob3ZlclJhdGUoaXNIYWxmOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5pdGVtSG92ZXIubmV4dChpc0hhbGYgJiYgdGhpcy5hbGxvd0hhbGYpO1xuICB9XG5cbiAgY2xpY2tSYXRlKGlzSGFsZjogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuaXRlbUNsaWNrLm5leHQoaXNIYWxmICYmIHRoaXMuYWxsb3dIYWxmKTtcbiAgfVxufVxuIl19