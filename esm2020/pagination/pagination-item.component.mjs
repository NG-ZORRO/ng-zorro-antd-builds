/* eslint-disable */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "ng-zorro-antd/icon";
export class NzPaginationItemComponent {
    constructor() {
        this.active = false;
        this.index = null;
        this.disabled = false;
        this.direction = 'ltr';
        this.type = null;
        this.itemRender = null;
        this.diffIndex = new EventEmitter();
        this.gotoIndex = new EventEmitter();
        this.title = null;
    }
    clickItem() {
        if (!this.disabled) {
            if (this.type === 'page') {
                this.gotoIndex.emit(this.index);
            }
            else {
                this.diffIndex.emit({
                    next: 1,
                    prev: -1,
                    prev_5: -5,
                    next_5: 5
                }[this.type]);
            }
        }
    }
    ngOnChanges(changes) {
        const { locale, index, type } = changes;
        if (locale || index || type) {
            this.title = {
                page: `${this.index}`,
                next: this.locale?.next_page,
                prev: this.locale?.prev_page,
                prev_5: this.locale?.prev_5,
                next_5: this.locale?.next_5
            }[this.type];
        }
    }
}
NzPaginationItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzPaginationItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzPaginationItemComponent, selector: "li[nz-pagination-item]", inputs: { active: "active", locale: "locale", index: "index", disabled: "disabled", direction: "direction", type: "type", itemRender: "itemRender" }, outputs: { diffIndex: "diffIndex", gotoIndex: "gotoIndex" }, host: { listeners: { "click": "clickItem()" }, properties: { "class.ant-pagination-prev": "type === 'prev'", "class.ant-pagination-next": "type === 'next'", "class.ant-pagination-item": "type === 'page'", "class.ant-pagination-jump-prev": "type === 'prev_5'", "class.ant-pagination-jump-prev-custom-icon": "type === 'prev_5'", "class.ant-pagination-jump-next": "type === 'next_5'", "class.ant-pagination-jump-next-custom-icon": "type === 'next_5'", "class.ant-pagination-disabled": "disabled", "class.ant-pagination-item-active": "active", "attr.title": "title" } }, usesOnChanges: true, ngImport: i0, template: `
    <ng-template #renderItemTemplate let-type let-page="page">
      <ng-container [ngSwitch]="type">
        <a *ngSwitchCase="'page'">{{ page }}</a>
        <button type="button" [disabled]="disabled" class="ant-pagination-item-link" *ngSwitchCase="'prev'">
          <ng-container [ngSwitch]="direction">
            <i *ngSwitchCase="'rtl'" nz-icon nzType="right"></i>
            <i *ngSwitchDefault nz-icon nzType="left"></i>
          </ng-container>
        </button>
        <button type="button" [disabled]="disabled" class="ant-pagination-item-link" *ngSwitchCase="'next'">
          <ng-container [ngSwitch]="direction">
            <i *ngSwitchCase="'rtl'" nz-icon nzType="left"></i>
            <i *ngSwitchDefault nz-icon nzType="right"></i>
          </ng-container>
        </button>
        <ng-container *ngSwitchDefault>
          <a class="ant-pagination-item-link" [ngSwitch]="type">
            <div class="ant-pagination-item-container" *ngSwitchDefault>
              <ng-container [ngSwitch]="type">
                <ng-container *ngSwitchCase="'prev_5'" [ngSwitch]="direction">
                  <i *ngSwitchCase="'rtl'" nz-icon nzType="double-right" class="ant-pagination-item-link-icon"></i>
                  <i *ngSwitchDefault nz-icon nzType="double-left" class="ant-pagination-item-link-icon"></i>
                </ng-container>
                <ng-container *ngSwitchCase="'next_5'" [ngSwitch]="direction">
                  <i *ngSwitchCase="'rtl'" nz-icon nzType="double-left" class="ant-pagination-item-link-icon"></i>
                  <i *ngSwitchDefault nz-icon nzType="double-right" class="ant-pagination-item-link-icon"></i>
                </ng-container>
              </ng-container>
              <span class="ant-pagination-item-ellipsis">•••</span>
            </div>
          </a>
        </ng-container>
      </ng-container>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="itemRender || renderItemTemplate"
      [ngTemplateOutletContext]="{ $implicit: type, page: index }"
    ></ng-template>
  `, isInline: true, directives: [{ type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i2.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationItemComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'li[nz-pagination-item]',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-template #renderItemTemplate let-type let-page="page">
      <ng-container [ngSwitch]="type">
        <a *ngSwitchCase="'page'">{{ page }}</a>
        <button type="button" [disabled]="disabled" class="ant-pagination-item-link" *ngSwitchCase="'prev'">
          <ng-container [ngSwitch]="direction">
            <i *ngSwitchCase="'rtl'" nz-icon nzType="right"></i>
            <i *ngSwitchDefault nz-icon nzType="left"></i>
          </ng-container>
        </button>
        <button type="button" [disabled]="disabled" class="ant-pagination-item-link" *ngSwitchCase="'next'">
          <ng-container [ngSwitch]="direction">
            <i *ngSwitchCase="'rtl'" nz-icon nzType="left"></i>
            <i *ngSwitchDefault nz-icon nzType="right"></i>
          </ng-container>
        </button>
        <ng-container *ngSwitchDefault>
          <a class="ant-pagination-item-link" [ngSwitch]="type">
            <div class="ant-pagination-item-container" *ngSwitchDefault>
              <ng-container [ngSwitch]="type">
                <ng-container *ngSwitchCase="'prev_5'" [ngSwitch]="direction">
                  <i *ngSwitchCase="'rtl'" nz-icon nzType="double-right" class="ant-pagination-item-link-icon"></i>
                  <i *ngSwitchDefault nz-icon nzType="double-left" class="ant-pagination-item-link-icon"></i>
                </ng-container>
                <ng-container *ngSwitchCase="'next_5'" [ngSwitch]="direction">
                  <i *ngSwitchCase="'rtl'" nz-icon nzType="double-left" class="ant-pagination-item-link-icon"></i>
                  <i *ngSwitchDefault nz-icon nzType="double-right" class="ant-pagination-item-link-icon"></i>
                </ng-container>
              </ng-container>
              <span class="ant-pagination-item-ellipsis">•••</span>
            </div>
          </a>
        </ng-container>
      </ng-container>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="itemRender || renderItemTemplate"
      [ngTemplateOutletContext]="{ $implicit: type, page: index }"
    ></ng-template>
  `,
                    host: {
                        '[class.ant-pagination-prev]': `type === 'prev'`,
                        '[class.ant-pagination-next]': `type === 'next'`,
                        '[class.ant-pagination-item]': `type === 'page'`,
                        '[class.ant-pagination-jump-prev]': `type === 'prev_5'`,
                        '[class.ant-pagination-jump-prev-custom-icon]': `type === 'prev_5'`,
                        '[class.ant-pagination-jump-next]': `type === 'next_5'`,
                        '[class.ant-pagination-jump-next-custom-icon]': `type === 'next_5'`,
                        '[class.ant-pagination-disabled]': 'disabled',
                        '[class.ant-pagination-item-active]': 'active',
                        '[attr.title]': 'title',
                        '(click)': 'clickItem()'
                    }
                }]
        }], propDecorators: { active: [{
                type: Input
            }], locale: [{
                type: Input
            }], index: [{
                type: Input
            }], disabled: [{
                type: Input
            }], direction: [{
                type: Input
            }], type: [{
                type: Input
            }], itemRender: [{
                type: Input
            }], diffIndex: [{
                type: Output
            }], gotoIndex: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9CQUFvQjtBQUNwQjs7O0dBR0c7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFHTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7Ozs7QUFnRXZCLE1BQU0sT0FBTyx5QkFBeUI7SUEzRHRDO1FBK0RXLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFFZixVQUFLLEdBQWtCLElBQUksQ0FBQztRQUM1QixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsU0FBSSxHQUF1QyxJQUFJLENBQUM7UUFDaEQsZUFBVSxHQUFvRCxJQUFJLENBQUM7UUFDekQsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDdkMsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDMUQsVUFBSyxHQUFrQixJQUFJLENBQUM7S0FtQzdCO0lBakNDLFNBQVM7UUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO2dCQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBTSxDQUFDLENBQUM7YUFDbEM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBRWY7b0JBQ0UsSUFBSSxFQUFFLENBQUM7b0JBQ1AsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDUixNQUFNLEVBQUUsQ0FBQyxDQUFDO29CQUNWLE1BQU0sRUFBRSxDQUFDO2lCQUVaLENBQUMsSUFBSSxDQUFDLElBQUssQ0FBQyxDQUNkLENBQUM7YUFDSDtTQUNGO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDeEMsSUFBSSxNQUFNLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtZQUMzQixJQUFJLENBQUMsS0FBSyxHQUNSO2dCQUNFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVM7Z0JBQzVCLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVM7Z0JBQzVCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU07Z0JBQzNCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU07YUFFOUIsQ0FBQyxJQUFJLENBQUMsSUFBSyxDQUFDLENBQUM7U0FDZjtJQUNILENBQUM7O3NIQS9DVSx5QkFBeUI7MEdBQXpCLHlCQUF5Qiw2MUJBdEQxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUNUOzJGQWVVLHlCQUF5QjtrQkEzRHJDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVDVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osNkJBQTZCLEVBQUUsaUJBQWlCO3dCQUNoRCw2QkFBNkIsRUFBRSxpQkFBaUI7d0JBQ2hELDZCQUE2QixFQUFFLGlCQUFpQjt3QkFDaEQsa0NBQWtDLEVBQUUsbUJBQW1CO3dCQUN2RCw4Q0FBOEMsRUFBRSxtQkFBbUI7d0JBQ25FLGtDQUFrQyxFQUFFLG1CQUFtQjt3QkFDdkQsOENBQThDLEVBQUUsbUJBQW1CO3dCQUNuRSxpQ0FBaUMsRUFBRSxVQUFVO3dCQUM3QyxvQ0FBb0MsRUFBRSxRQUFRO3dCQUM5QyxjQUFjLEVBQUUsT0FBTzt3QkFDdkIsU0FBUyxFQUFFLGFBQWE7cUJBQ3pCO2lCQUNGOzhCQUtVLE1BQU07c0JBQWQsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDYSxTQUFTO3NCQUEzQixNQUFNO2dCQUNZLFNBQVM7c0JBQTNCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOelBhZ2luYXRpb25JMThuSW50ZXJmYWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcbmltcG9ydCB7IFBhZ2luYXRpb25JdGVtUmVuZGVyQ29udGV4dCwgUGFnaW5hdGlvbkl0ZW1UeXBlIH0gZnJvbSAnLi9wYWdpbmF0aW9uLnR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGlbbnotcGFnaW5hdGlvbi1pdGVtXScsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI3JlbmRlckl0ZW1UZW1wbGF0ZSBsZXQtdHlwZSBsZXQtcGFnZT1cInBhZ2VcIj5cbiAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cInR5cGVcIj5cbiAgICAgICAgPGEgKm5nU3dpdGNoQ2FzZT1cIidwYWdlJ1wiPnt7IHBhZ2UgfX08L2E+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIGNsYXNzPVwiYW50LXBhZ2luYXRpb24taXRlbS1saW5rXCIgKm5nU3dpdGNoQ2FzZT1cIidwcmV2J1wiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cImRpcmVjdGlvblwiPlxuICAgICAgICAgICAgPGkgKm5nU3dpdGNoQ2FzZT1cIidydGwnXCIgbnotaWNvbiBuelR5cGU9XCJyaWdodFwiPjwvaT5cbiAgICAgICAgICAgIDxpICpuZ1N3aXRjaERlZmF1bHQgbnotaWNvbiBuelR5cGU9XCJsZWZ0XCI+PC9pPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgY2xhc3M9XCJhbnQtcGFnaW5hdGlvbi1pdGVtLWxpbmtcIiAqbmdTd2l0Y2hDYXNlPVwiJ25leHQnXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiZGlyZWN0aW9uXCI+XG4gICAgICAgICAgICA8aSAqbmdTd2l0Y2hDYXNlPVwiJ3J0bCdcIiBuei1pY29uIG56VHlwZT1cImxlZnRcIj48L2k+XG4gICAgICAgICAgICA8aSAqbmdTd2l0Y2hEZWZhdWx0IG56LWljb24gbnpUeXBlPVwicmlnaHRcIj48L2k+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaERlZmF1bHQ+XG4gICAgICAgICAgPGEgY2xhc3M9XCJhbnQtcGFnaW5hdGlvbi1pdGVtLWxpbmtcIiBbbmdTd2l0Y2hdPVwidHlwZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFudC1wYWdpbmF0aW9uLWl0ZW0tY29udGFpbmVyXCIgKm5nU3dpdGNoRGVmYXVsdD5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwidHlwZVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIidwcmV2XzUnXCIgW25nU3dpdGNoXT1cImRpcmVjdGlvblwiPlxuICAgICAgICAgICAgICAgICAgPGkgKm5nU3dpdGNoQ2FzZT1cIidydGwnXCIgbnotaWNvbiBuelR5cGU9XCJkb3VibGUtcmlnaHRcIiBjbGFzcz1cImFudC1wYWdpbmF0aW9uLWl0ZW0tbGluay1pY29uXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgPGkgKm5nU3dpdGNoRGVmYXVsdCBuei1pY29uIG56VHlwZT1cImRvdWJsZS1sZWZ0XCIgY2xhc3M9XCJhbnQtcGFnaW5hdGlvbi1pdGVtLWxpbmstaWNvblwiPjwvaT5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCInbmV4dF81J1wiIFtuZ1N3aXRjaF09XCJkaXJlY3Rpb25cIj5cbiAgICAgICAgICAgICAgICAgIDxpICpuZ1N3aXRjaENhc2U9XCIncnRsJ1wiIG56LWljb24gbnpUeXBlPVwiZG91YmxlLWxlZnRcIiBjbGFzcz1cImFudC1wYWdpbmF0aW9uLWl0ZW0tbGluay1pY29uXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgPGkgKm5nU3dpdGNoRGVmYXVsdCBuei1pY29uIG56VHlwZT1cImRvdWJsZS1yaWdodFwiIGNsYXNzPVwiYW50LXBhZ2luYXRpb24taXRlbS1saW5rLWljb25cIj48L2k+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFudC1wYWdpbmF0aW9uLWl0ZW0tZWxsaXBzaXNcIj7igKLigKLigKI8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIml0ZW1SZW5kZXIgfHwgcmVuZGVySXRlbVRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogdHlwZSwgcGFnZTogaW5kZXggfVwiXG4gICAgPjwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1wYWdpbmF0aW9uLXByZXZdJzogYHR5cGUgPT09ICdwcmV2J2AsXG4gICAgJ1tjbGFzcy5hbnQtcGFnaW5hdGlvbi1uZXh0XSc6IGB0eXBlID09PSAnbmV4dCdgLFxuICAgICdbY2xhc3MuYW50LXBhZ2luYXRpb24taXRlbV0nOiBgdHlwZSA9PT0gJ3BhZ2UnYCxcbiAgICAnW2NsYXNzLmFudC1wYWdpbmF0aW9uLWp1bXAtcHJldl0nOiBgdHlwZSA9PT0gJ3ByZXZfNSdgLFxuICAgICdbY2xhc3MuYW50LXBhZ2luYXRpb24tanVtcC1wcmV2LWN1c3RvbS1pY29uXSc6IGB0eXBlID09PSAncHJldl81J2AsXG4gICAgJ1tjbGFzcy5hbnQtcGFnaW5hdGlvbi1qdW1wLW5leHRdJzogYHR5cGUgPT09ICduZXh0XzUnYCxcbiAgICAnW2NsYXNzLmFudC1wYWdpbmF0aW9uLWp1bXAtbmV4dC1jdXN0b20taWNvbl0nOiBgdHlwZSA9PT0gJ25leHRfNSdgLFxuICAgICdbY2xhc3MuYW50LXBhZ2luYXRpb24tZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLmFudC1wYWdpbmF0aW9uLWl0ZW0tYWN0aXZlXSc6ICdhY3RpdmUnLFxuICAgICdbYXR0ci50aXRsZV0nOiAndGl0bGUnLFxuICAgICcoY2xpY2spJzogJ2NsaWNrSXRlbSgpJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56UGFnaW5hdGlvbkl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfdHlwZTogUGFnaW5hdGlvbkl0ZW1UeXBlIHwgc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2luZGV4OiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gIEBJbnB1dCgpIGFjdGl2ZSA9IGZhbHNlO1xuICBASW5wdXQoKSBsb2NhbGUhOiBOelBhZ2luYXRpb25JMThuSW50ZXJmYWNlO1xuICBASW5wdXQoKSBpbmRleDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRpcmVjdGlvbiA9ICdsdHInO1xuICBASW5wdXQoKSB0eXBlOiBQYWdpbmF0aW9uSXRlbVR5cGUgfCBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgaXRlbVJlbmRlcjogVGVtcGxhdGVSZWY8UGFnaW5hdGlvbkl0ZW1SZW5kZXJDb250ZXh0PiB8IG51bGwgPSBudWxsO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgZGlmZkluZGV4ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBnb3RvSW5kZXggPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgdGl0bGU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIGNsaWNrSXRlbSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdwYWdlJykge1xuICAgICAgICB0aGlzLmdvdG9JbmRleC5lbWl0KHRoaXMuaW5kZXghKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGlmZkluZGV4LmVtaXQoXG4gICAgICAgICAgKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuZXh0OiAxLFxuICAgICAgICAgICAgICBwcmV2OiAtMSxcbiAgICAgICAgICAgICAgcHJldl81OiAtNSxcbiAgICAgICAgICAgICAgbmV4dF81OiA1XG4gICAgICAgICAgICB9IGFzIE56U2FmZUFueVxuICAgICAgICAgIClbdGhpcy50eXBlIV1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBsb2NhbGUsIGluZGV4LCB0eXBlIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChsb2NhbGUgfHwgaW5kZXggfHwgdHlwZSkge1xuICAgICAgdGhpcy50aXRsZSA9IChcbiAgICAgICAge1xuICAgICAgICAgIHBhZ2U6IGAke3RoaXMuaW5kZXh9YCxcbiAgICAgICAgICBuZXh0OiB0aGlzLmxvY2FsZT8ubmV4dF9wYWdlLFxuICAgICAgICAgIHByZXY6IHRoaXMubG9jYWxlPy5wcmV2X3BhZ2UsXG4gICAgICAgICAgcHJldl81OiB0aGlzLmxvY2FsZT8ucHJldl81LFxuICAgICAgICAgIG5leHRfNTogdGhpcy5sb2NhbGU/Lm5leHRfNVxuICAgICAgICB9IGFzIE56U2FmZUFueVxuICAgICAgKVt0aGlzLnR5cGUhXTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==