/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/dropdown";
import * as i2 from "./tab-add-button.component";
import * as i3 from "ng-zorro-antd/icon";
import * as i4 from "@angular/common";
import * as i5 from "ng-zorro-antd/menu";
import * as i6 from "ng-zorro-antd/core/outlet";
export class NzTabNavOperationComponent {
    constructor(cdr, elementRef) {
        this.cdr = cdr;
        this.elementRef = elementRef;
        this.items = [];
        this.addable = false;
        this.addIcon = 'plus';
        this.addClicked = new EventEmitter();
        this.selected = new EventEmitter();
        this.closeAnimationWaitTimeoutId = -1;
        this.menuOpened = false;
        this.element = this.elementRef.nativeElement;
    }
    onSelect(item) {
        if (!item.disabled) {
            // ignore nzCanDeactivate
            item.tab.nzClick.emit();
            this.selected.emit(item);
        }
    }
    onContextmenu(item, e) {
        if (!item.disabled) {
            item.tab.nzContextmenu.emit(e);
        }
    }
    showItems() {
        clearTimeout(this.closeAnimationWaitTimeoutId);
        this.menuOpened = true;
        this.cdr.markForCheck();
    }
    menuVisChange(visible) {
        if (!visible) {
            this.closeAnimationWaitTimeoutId = setTimeout(() => {
                this.menuOpened = false;
                this.cdr.markForCheck();
            }, 150);
        }
    }
    getElementWidth() {
        return this.element?.offsetWidth || 0;
    }
    getElementHeight() {
        return this.element?.offsetHeight || 0;
    }
    ngOnDestroy() {
        clearTimeout(this.closeAnimationWaitTimeoutId);
    }
}
NzTabNavOperationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTabNavOperationComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NzTabNavOperationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTabNavOperationComponent, selector: "nz-tab-nav-operation", inputs: { items: "items", addable: "addable", addIcon: "addIcon" }, outputs: { addClicked: "addClicked", selected: "selected" }, host: { properties: { "class.ant-tabs-nav-operations-hidden": "items.length === 0" }, classAttribute: "ant-tabs-nav-operations" }, exportAs: ["nzTabNavOperation"], ngImport: i0, template: `
    <button
      nz-dropdown
      class="ant-tabs-nav-more"
      type="button"
      tabindex="-1"
      aria-hidden="true"
      nzOverlayClassName="nz-tabs-dropdown"
      #dropdownTrigger="nzDropdown"
      [nzDropdownMenu]="menu"
      [nzOverlayStyle]="{ minWidth: '46px' }"
      [nzMatchWidthElement]="null"
      (nzVisibleChange)="menuVisChange($event)"
      (mouseenter)="showItems()"
    >
      <i nz-icon nzType="ellipsis"></i>
    </button>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu *ngIf="menuOpened">
        <li
          nz-menu-item
          *ngFor="let item of items"
          class="ant-tabs-dropdown-menu-item"
          [class.ant-tabs-dropdown-menu-item-disabled]="item.disabled"
          [nzSelected]="item.active"
          [nzDisabled]="item.disabled"
          (click)="onSelect(item)"
          (contextmenu)="onContextmenu(item, $event)"
        >
          <ng-container *nzStringTemplateOutlet="item.tab.label; context: { visible: false }">
            {{ item.tab.label }}
          </ng-container>
        </li>
      </ul>
    </nz-dropdown-menu>
    <button *ngIf="addable" nz-tab-add-button [addIcon]="addIcon" (click)="addClicked.emit()"></button>
  `, isInline: true, components: [{ type: i1.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { type: i2.NzTabAddButtonComponent, selector: "nz-tab-add-button, button[nz-tab-add-button]", inputs: ["addIcon"] }], directives: [{ type: i1.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { type: i3.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.NzMenuItemDirective, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { type: i6.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTabNavOperationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tab-nav-operation',
                    exportAs: 'nzTabNavOperation',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <button
      nz-dropdown
      class="ant-tabs-nav-more"
      type="button"
      tabindex="-1"
      aria-hidden="true"
      nzOverlayClassName="nz-tabs-dropdown"
      #dropdownTrigger="nzDropdown"
      [nzDropdownMenu]="menu"
      [nzOverlayStyle]="{ minWidth: '46px' }"
      [nzMatchWidthElement]="null"
      (nzVisibleChange)="menuVisChange($event)"
      (mouseenter)="showItems()"
    >
      <i nz-icon nzType="ellipsis"></i>
    </button>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu *ngIf="menuOpened">
        <li
          nz-menu-item
          *ngFor="let item of items"
          class="ant-tabs-dropdown-menu-item"
          [class.ant-tabs-dropdown-menu-item-disabled]="item.disabled"
          [nzSelected]="item.active"
          [nzDisabled]="item.disabled"
          (click)="onSelect(item)"
          (contextmenu)="onContextmenu(item, $event)"
        >
          <ng-container *nzStringTemplateOutlet="item.tab.label; context: { visible: false }">
            {{ item.tab.label }}
          </ng-container>
        </li>
      </ul>
    </nz-dropdown-menu>
    <button *ngIf="addable" nz-tab-add-button [addIcon]="addIcon" (click)="addClicked.emit()"></button>
  `,
                    host: {
                        class: 'ant-tabs-nav-operations',
                        '[class.ant-tabs-nav-operations-hidden]': 'items.length === 0'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; }, propDecorators: { items: [{
                type: Input
            }], addable: [{
                type: Input
            }], addIcon: [{
                type: Input
            }], addClicked: [{
                type: Output
            }], selected: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLW5hdi1vcGVyYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy90YWJzL3RhYi1uYXYtb3BlcmF0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFFTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0FBc0R2QixNQUFNLE9BQU8sMEJBQTBCO0lBV3JDLFlBQW1CLEdBQXNCLEVBQVUsVUFBbUM7UUFBbkUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQVY3RSxVQUFLLEdBQTRCLEVBQUUsQ0FBQztRQUNwQyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLFlBQU8sR0FBb0MsTUFBTSxDQUFDO1FBRXhDLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ3RDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBeUIsQ0FBQztRQUN4RSxnQ0FBMkIsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNqQyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBSWpCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7SUFDL0MsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUEyQjtRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQix5QkFBeUI7WUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRUQsYUFBYSxDQUFDLElBQTJCLEVBQUUsQ0FBYTtRQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBQ0QsU0FBUztRQUNQLFlBQVksQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZ0I7UUFDNUIsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLElBQUksQ0FBQywyQkFBMkIsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUMxQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDVDtJQUNILENBQUM7SUFFRCxlQUFlO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLFdBQVcsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELGdCQUFnQjtRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxZQUFZLElBQUksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxXQUFXO1FBQ1QsWUFBWSxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQ2pELENBQUM7O3VIQXJEVSwwQkFBMEI7MkdBQTFCLDBCQUEwQixpV0ExQzNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQ1Q7MkZBTVUsMEJBQTBCO2tCQWhEdEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixtQkFBbUIsRUFBRSxLQUFLO29CQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0NUO29CQUNELElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUseUJBQXlCO3dCQUNoQyx3Q0FBd0MsRUFBRSxvQkFBb0I7cUJBQy9EO2lCQUNGO2lJQUVVLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUVhLFVBQVU7c0JBQTVCLE1BQU07Z0JBQ1ksUUFBUTtzQkFBMUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBOelRhYk5hdkl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL3RhYi1uYXYtaXRlbS5kaXJlY3RpdmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei10YWItbmF2LW9wZXJhdGlvbicsXG4gIGV4cG9ydEFzOiAnbnpUYWJOYXZPcGVyYXRpb24nLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGJ1dHRvblxuICAgICAgbnotZHJvcGRvd25cbiAgICAgIGNsYXNzPVwiYW50LXRhYnMtbmF2LW1vcmVcIlxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICBuek92ZXJsYXlDbGFzc05hbWU9XCJuei10YWJzLWRyb3Bkb3duXCJcbiAgICAgICNkcm9wZG93blRyaWdnZXI9XCJuekRyb3Bkb3duXCJcbiAgICAgIFtuekRyb3Bkb3duTWVudV09XCJtZW51XCJcbiAgICAgIFtuek92ZXJsYXlTdHlsZV09XCJ7IG1pbldpZHRoOiAnNDZweCcgfVwiXG4gICAgICBbbnpNYXRjaFdpZHRoRWxlbWVudF09XCJudWxsXCJcbiAgICAgIChuelZpc2libGVDaGFuZ2UpPVwibWVudVZpc0NoYW5nZSgkZXZlbnQpXCJcbiAgICAgIChtb3VzZWVudGVyKT1cInNob3dJdGVtcygpXCJcbiAgICA+XG4gICAgICA8aSBuei1pY29uIG56VHlwZT1cImVsbGlwc2lzXCI+PC9pPlxuICAgIDwvYnV0dG9uPlxuICAgIDxuei1kcm9wZG93bi1tZW51ICNtZW51PVwibnpEcm9wZG93bk1lbnVcIj5cbiAgICAgIDx1bCBuei1tZW51ICpuZ0lmPVwibWVudU9wZW5lZFwiPlxuICAgICAgICA8bGlcbiAgICAgICAgICBuei1tZW51LWl0ZW1cbiAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtc1wiXG4gICAgICAgICAgY2xhc3M9XCJhbnQtdGFicy1kcm9wZG93bi1tZW51LWl0ZW1cIlxuICAgICAgICAgIFtjbGFzcy5hbnQtdGFicy1kcm9wZG93bi1tZW51LWl0ZW0tZGlzYWJsZWRdPVwiaXRlbS5kaXNhYmxlZFwiXG4gICAgICAgICAgW256U2VsZWN0ZWRdPVwiaXRlbS5hY3RpdmVcIlxuICAgICAgICAgIFtuekRpc2FibGVkXT1cIml0ZW0uZGlzYWJsZWRcIlxuICAgICAgICAgIChjbGljayk9XCJvblNlbGVjdChpdGVtKVwiXG4gICAgICAgICAgKGNvbnRleHRtZW51KT1cIm9uQ29udGV4dG1lbnUoaXRlbSwgJGV2ZW50KVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbS50YWIubGFiZWw7IGNvbnRleHQ6IHsgdmlzaWJsZTogZmFsc2UgfVwiPlxuICAgICAgICAgICAge3sgaXRlbS50YWIubGFiZWwgfX1cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9uei1kcm9wZG93bi1tZW51PlxuICAgIDxidXR0b24gKm5nSWY9XCJhZGRhYmxlXCIgbnotdGFiLWFkZC1idXR0b24gW2FkZEljb25dPVwiYWRkSWNvblwiIChjbGljayk9XCJhZGRDbGlja2VkLmVtaXQoKVwiPjwvYnV0dG9uPlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtdGFicy1uYXYtb3BlcmF0aW9ucycsXG4gICAgJ1tjbGFzcy5hbnQtdGFicy1uYXYtb3BlcmF0aW9ucy1oaWRkZW5dJzogJ2l0ZW1zLmxlbmd0aCA9PT0gMCdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRhYk5hdk9wZXJhdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGl0ZW1zOiBOelRhYk5hdkl0ZW1EaXJlY3RpdmVbXSA9IFtdO1xuICBASW5wdXQoKSBhZGRhYmxlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGFkZEljb246IHN0cmluZyB8IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gPSAncGx1cyc7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGFkZENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8TnpUYWJOYXZJdGVtRGlyZWN0aXZlPigpO1xuICBjbG9zZUFuaW1hdGlvbldhaXRUaW1lb3V0SWQgPSAtMTtcbiAgbWVudU9wZW5lZCA9IGZhbHNlO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gICAgdGhpcy5lbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBvblNlbGVjdChpdGVtOiBOelRhYk5hdkl0ZW1EaXJlY3RpdmUpOiB2b2lkIHtcbiAgICBpZiAoIWl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgIC8vIGlnbm9yZSBuekNhbkRlYWN0aXZhdGVcbiAgICAgIGl0ZW0udGFiLm56Q2xpY2suZW1pdCgpO1xuICAgICAgdGhpcy5zZWxlY3RlZC5lbWl0KGl0ZW0pO1xuICAgIH1cbiAgfVxuXG4gIG9uQ29udGV4dG1lbnUoaXRlbTogTnpUYWJOYXZJdGVtRGlyZWN0aXZlLCBlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCFpdGVtLmRpc2FibGVkKSB7XG4gICAgICBpdGVtLnRhYi5uekNvbnRleHRtZW51LmVtaXQoZSk7XG4gICAgfVxuICB9XG4gIHNob3dJdGVtcygpOiB2b2lkIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5jbG9zZUFuaW1hdGlvbldhaXRUaW1lb3V0SWQpO1xuICAgIHRoaXMubWVudU9wZW5lZCA9IHRydWU7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBtZW51VmlzQ2hhbmdlKHZpc2libGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoIXZpc2libGUpIHtcbiAgICAgIHRoaXMuY2xvc2VBbmltYXRpb25XYWl0VGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMubWVudU9wZW5lZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0sIDE1MCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RWxlbWVudFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudD8ub2Zmc2V0V2lkdGggfHwgMDtcbiAgfVxuXG4gIGdldEVsZW1lbnRIZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50Py5vZmZzZXRIZWlnaHQgfHwgMDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmNsb3NlQW5pbWF0aW9uV2FpdFRpbWVvdXRJZCk7XG4gIH1cbn1cbiJdfQ==