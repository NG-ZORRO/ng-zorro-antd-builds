/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "ng-zorro-antd/core/outlet";
import * as i3 from "ng-zorro-antd/icon";
export class NzTreeNodeSwitcherComponent {
    constructor() {
        this.nzSelectMode = false;
    }
    get isShowLineIcon() {
        return !this.isLeaf && !!this.nzShowLine;
    }
    get isShowSwitchIcon() {
        return !this.isLeaf && !this.nzShowLine;
    }
    get isSwitcherOpen() {
        return !!this.isExpanded && !this.isLeaf;
    }
    get isSwitcherClose() {
        return !this.isExpanded && !this.isLeaf;
    }
}
NzTreeNodeSwitcherComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeSwitcherComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzTreeNodeSwitcherComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodeSwitcherComponent, selector: "nz-tree-node-switcher", inputs: { nzShowExpand: "nzShowExpand", nzShowLine: "nzShowLine", nzExpandedIcon: "nzExpandedIcon", nzSelectMode: "nzSelectMode", context: "context", isLeaf: "isLeaf", isLoading: "isLoading", isExpanded: "isExpanded" }, host: { properties: { "class.ant-select-tree-switcher": "nzSelectMode", "class.ant-select-tree-switcher-noop": "nzSelectMode && isLeaf", "class.ant-select-tree-switcher_open": "nzSelectMode && isSwitcherOpen", "class.ant-select-tree-switcher_close": "nzSelectMode && isSwitcherClose", "class.ant-tree-switcher": "!nzSelectMode", "class.ant-tree-switcher-noop": "!nzSelectMode && isLeaf", "class.ant-tree-switcher_open": "!nzSelectMode && isSwitcherOpen", "class.ant-tree-switcher_close": "!nzSelectMode && isSwitcherClose" } }, ngImport: i0, template: `
    <ng-container *ngIf="isShowSwitchIcon">
      <ng-container *ngIf="!isLoading; else loadingTemplate">
        <ng-container *nzStringTemplateOutlet="nzExpandedIcon; context: { $implicit: context, origin: context.origin }">
          <i
            nz-icon
            nzType="caret-down"
            [class.ant-select-tree-switcher-icon]="nzSelectMode"
            [class.ant-tree-switcher-icon]="!nzSelectMode"
          ></i>
        </ng-container>
      </ng-container>
    </ng-container>
    <ng-container *ngIf="nzShowLine">
      <ng-container *ngIf="!isLoading; else loadingTemplate">
        <ng-container *nzStringTemplateOutlet="nzExpandedIcon; context: { $implicit: context, origin: context.origin }">
          <i
            *ngIf="isShowLineIcon"
            nz-icon
            [nzType]="isSwitcherOpen ? 'minus-square' : 'plus-square'"
            class="ant-tree-switcher-line-icon"
          ></i>
          <i *ngIf="!isShowLineIcon" nz-icon nzType="file" class="ant-tree-switcher-line-icon"></i>
        </ng-container>
      </ng-container>
    </ng-container>
    <ng-template #loadingTemplate>
      <i nz-icon nzType="loading" [nzSpin]="true" class="ant-tree-switcher-loading-icon"></i>
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i3.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodeSwitcherComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tree-node-switcher',
                    template: `
    <ng-container *ngIf="isShowSwitchIcon">
      <ng-container *ngIf="!isLoading; else loadingTemplate">
        <ng-container *nzStringTemplateOutlet="nzExpandedIcon; context: { $implicit: context, origin: context.origin }">
          <i
            nz-icon
            nzType="caret-down"
            [class.ant-select-tree-switcher-icon]="nzSelectMode"
            [class.ant-tree-switcher-icon]="!nzSelectMode"
          ></i>
        </ng-container>
      </ng-container>
    </ng-container>
    <ng-container *ngIf="nzShowLine">
      <ng-container *ngIf="!isLoading; else loadingTemplate">
        <ng-container *nzStringTemplateOutlet="nzExpandedIcon; context: { $implicit: context, origin: context.origin }">
          <i
            *ngIf="isShowLineIcon"
            nz-icon
            [nzType]="isSwitcherOpen ? 'minus-square' : 'plus-square'"
            class="ant-tree-switcher-line-icon"
          ></i>
          <i *ngIf="!isShowLineIcon" nz-icon nzType="file" class="ant-tree-switcher-line-icon"></i>
        </ng-container>
      </ng-container>
    </ng-container>
    <ng-template #loadingTemplate>
      <i nz-icon nzType="loading" [nzSpin]="true" class="ant-tree-switcher-loading-icon"></i>
    </ng-template>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    host: {
                        '[class.ant-select-tree-switcher]': 'nzSelectMode',
                        '[class.ant-select-tree-switcher-noop]': 'nzSelectMode && isLeaf',
                        '[class.ant-select-tree-switcher_open]': 'nzSelectMode && isSwitcherOpen',
                        '[class.ant-select-tree-switcher_close]': 'nzSelectMode && isSwitcherClose',
                        '[class.ant-tree-switcher]': '!nzSelectMode',
                        '[class.ant-tree-switcher-noop]': '!nzSelectMode && isLeaf',
                        '[class.ant-tree-switcher_open]': '!nzSelectMode && isSwitcherOpen',
                        '[class.ant-tree-switcher_close]': '!nzSelectMode && isSwitcherClose'
                    }
                }]
        }], propDecorators: { nzShowExpand: [{
                type: Input
            }], nzShowLine: [{
                type: Input
            }], nzExpandedIcon: [{
                type: Input
            }], nzSelectMode: [{
                type: Input
            }], context: [{
                type: Input
            }], isLeaf: [{
                type: Input
            }], isLoading: [{
                type: Input
            }], isExpanded: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLXN3aXRjaGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvdHJlZS90cmVlLW5vZGUtc3dpdGNoZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFlLE1BQU0sZUFBZSxDQUFDOzs7OztBQWlEdkYsTUFBTSxPQUFPLDJCQUEyQjtJQTdDeEM7UUFpRFcsaUJBQVksR0FBRyxLQUFLLENBQUM7S0FxQi9CO0lBZkMsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNDLENBQUM7SUFFRCxJQUFJLGdCQUFnQjtRQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDMUMsQ0FBQztJQUVELElBQUksY0FBYztRQUNoQixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMzQyxDQUFDO0lBRUQsSUFBSSxlQUFlO1FBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMxQyxDQUFDOzt3SEF4QlUsMkJBQTJCOzRHQUEzQiwyQkFBMkIseXlCQTNDNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJUOzJGQWNVLDJCQUEyQjtrQkE3Q3ZDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsSUFBSSxFQUFFO3dCQUNKLGtDQUFrQyxFQUFFLGNBQWM7d0JBQ2xELHVDQUF1QyxFQUFFLHdCQUF3Qjt3QkFDakUsdUNBQXVDLEVBQUUsZ0NBQWdDO3dCQUN6RSx3Q0FBd0MsRUFBRSxpQ0FBaUM7d0JBQzNFLDJCQUEyQixFQUFFLGVBQWU7d0JBQzVDLGdDQUFnQyxFQUFFLHlCQUF5Qjt3QkFDM0QsZ0NBQWdDLEVBQUUsaUNBQWlDO3dCQUNuRSxpQ0FBaUMsRUFBRSxrQ0FBa0M7cUJBQ3RFO2lCQUNGOzhCQUVVLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpUcmVlTm9kZSwgTnpUcmVlTm9kZU9wdGlvbnMgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHJlZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXRyZWUtbm9kZS1zd2l0Y2hlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzU2hvd1N3aXRjaEljb25cIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXNMb2FkaW5nOyBlbHNlIGxvYWRpbmdUZW1wbGF0ZVwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpFeHBhbmRlZEljb247IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBjb250ZXh0LCBvcmlnaW46IGNvbnRleHQub3JpZ2luIH1cIj5cbiAgICAgICAgICA8aVxuICAgICAgICAgICAgbnotaWNvblxuICAgICAgICAgICAgbnpUeXBlPVwiY2FyZXQtZG93blwiXG4gICAgICAgICAgICBbY2xhc3MuYW50LXNlbGVjdC10cmVlLXN3aXRjaGVyLWljb25dPVwibnpTZWxlY3RNb2RlXCJcbiAgICAgICAgICAgIFtjbGFzcy5hbnQtdHJlZS1zd2l0Y2hlci1pY29uXT1cIiFuelNlbGVjdE1vZGVcIlxuICAgICAgICAgID48L2k+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm56U2hvd0xpbmVcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXNMb2FkaW5nOyBlbHNlIGxvYWRpbmdUZW1wbGF0ZVwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpFeHBhbmRlZEljb247IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBjb250ZXh0LCBvcmlnaW46IGNvbnRleHQub3JpZ2luIH1cIj5cbiAgICAgICAgICA8aVxuICAgICAgICAgICAgKm5nSWY9XCJpc1Nob3dMaW5lSWNvblwiXG4gICAgICAgICAgICBuei1pY29uXG4gICAgICAgICAgICBbbnpUeXBlXT1cImlzU3dpdGNoZXJPcGVuID8gJ21pbnVzLXNxdWFyZScgOiAncGx1cy1zcXVhcmUnXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYW50LXRyZWUtc3dpdGNoZXItbGluZS1pY29uXCJcbiAgICAgICAgICA+PC9pPlxuICAgICAgICAgIDxpICpuZ0lmPVwiIWlzU2hvd0xpbmVJY29uXCIgbnotaWNvbiBuelR5cGU9XCJmaWxlXCIgY2xhc3M9XCJhbnQtdHJlZS1zd2l0Y2hlci1saW5lLWljb25cIj48L2k+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLXRlbXBsYXRlICNsb2FkaW5nVGVtcGxhdGU+XG4gICAgICA8aSBuei1pY29uIG56VHlwZT1cImxvYWRpbmdcIiBbbnpTcGluXT1cInRydWVcIiBjbGFzcz1cImFudC10cmVlLXN3aXRjaGVyLWxvYWRpbmctaWNvblwiPjwvaT5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtdHJlZS1zd2l0Y2hlcl0nOiAnbnpTZWxlY3RNb2RlJyxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtdHJlZS1zd2l0Y2hlci1ub29wXSc6ICduelNlbGVjdE1vZGUgJiYgaXNMZWFmJyxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtdHJlZS1zd2l0Y2hlcl9vcGVuXSc6ICduelNlbGVjdE1vZGUgJiYgaXNTd2l0Y2hlck9wZW4nLFxuICAgICdbY2xhc3MuYW50LXNlbGVjdC10cmVlLXN3aXRjaGVyX2Nsb3NlXSc6ICduelNlbGVjdE1vZGUgJiYgaXNTd2l0Y2hlckNsb3NlJyxcbiAgICAnW2NsYXNzLmFudC10cmVlLXN3aXRjaGVyXSc6ICchbnpTZWxlY3RNb2RlJyxcbiAgICAnW2NsYXNzLmFudC10cmVlLXN3aXRjaGVyLW5vb3BdJzogJyFuelNlbGVjdE1vZGUgJiYgaXNMZWFmJyxcbiAgICAnW2NsYXNzLmFudC10cmVlLXN3aXRjaGVyX29wZW5dJzogJyFuelNlbGVjdE1vZGUgJiYgaXNTd2l0Y2hlck9wZW4nLFxuICAgICdbY2xhc3MuYW50LXRyZWUtc3dpdGNoZXJfY2xvc2VdJzogJyFuelNlbGVjdE1vZGUgJiYgaXNTd2l0Y2hlckNsb3NlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VHJlZU5vZGVTd2l0Y2hlckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIG56U2hvd0V4cGFuZD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIG56U2hvd0xpbmU/OiBib29sZWFuO1xuICBASW5wdXQoKSBuekV4cGFuZGVkSWNvbj86IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBOelRyZWVOb2RlOyBvcmlnaW46IE56VHJlZU5vZGVPcHRpb25zIH0+O1xuICBASW5wdXQoKSBuelNlbGVjdE1vZGUgPSBmYWxzZTtcbiAgQElucHV0KCkgY29udGV4dCE6IE56VHJlZU5vZGU7XG4gIEBJbnB1dCgpIGlzTGVhZj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGlzTG9hZGluZz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGlzRXhwYW5kZWQ/OiBib29sZWFuO1xuXG4gIGdldCBpc1Nob3dMaW5lSWNvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaXNMZWFmICYmICEhdGhpcy5uelNob3dMaW5lO1xuICB9XG5cbiAgZ2V0IGlzU2hvd1N3aXRjaEljb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmlzTGVhZiAmJiAhdGhpcy5uelNob3dMaW5lO1xuICB9XG5cbiAgZ2V0IGlzU3dpdGNoZXJPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuaXNFeHBhbmRlZCAmJiAhdGhpcy5pc0xlYWY7XG4gIH1cblxuICBnZXQgaXNTd2l0Y2hlckNsb3NlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5pc0V4cGFuZGVkICYmICF0aGlzLmlzTGVhZjtcbiAgfVxufVxuIl19