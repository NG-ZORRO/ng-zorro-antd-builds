import { ChangeDetectionStrategy, Component, EventEmitter, Input, Optional, Output, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
import * as i2 from "@angular/common";
import * as i3 from "ng-zorro-antd/icon";
import * as i4 from "ng-zorro-antd/core/outlet";
export class NzSubMenuTitleComponent {
    constructor(cdr, directionality) {
        this.cdr = cdr;
        this.directionality = directionality;
        this.nzIcon = null;
        this.nzTitle = null;
        this.isMenuInsideDropDown = false;
        this.nzDisabled = false;
        this.paddingLeft = null;
        this.mode = 'vertical';
        this.toggleSubMenu = new EventEmitter();
        this.subMenuMouseState = new EventEmitter();
        this.dir = 'ltr';
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.dir = this.directionality.value;
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    setMouseState(state) {
        if (!this.nzDisabled) {
            this.subMenuMouseState.next(state);
        }
    }
    clickTitle() {
        if (this.mode === 'inline' && !this.nzDisabled) {
            this.toggleSubMenu.emit();
        }
    }
}
NzSubMenuTitleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSubMenuTitleComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzSubMenuTitleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSubMenuTitleComponent, selector: "[nz-submenu-title]", inputs: { nzIcon: "nzIcon", nzTitle: "nzTitle", isMenuInsideDropDown: "isMenuInsideDropDown", nzDisabled: "nzDisabled", paddingLeft: "paddingLeft", mode: "mode" }, outputs: { toggleSubMenu: "toggleSubMenu", subMenuMouseState: "subMenuMouseState" }, host: { listeners: { "click": "clickTitle()", "mouseenter": "setMouseState(true)", "mouseleave": "setMouseState(false)" }, properties: { "class.ant-dropdown-menu-submenu-title": "isMenuInsideDropDown", "class.ant-menu-submenu-title": "!isMenuInsideDropDown", "style.paddingLeft.px": "dir === 'rtl' ? null : paddingLeft ", "style.paddingRight.px": "dir === 'rtl' ? paddingLeft : null" } }, exportAs: ["nzSubmenuTitle"], ngImport: i0, template: `
    <i nz-icon [nzType]="nzIcon" *ngIf="nzIcon"></i>
    <ng-container *nzStringTemplateOutlet="nzTitle">
      <span>{{ nzTitle }}</span>
    </ng-container>
    <ng-content></ng-content>
    <span
      [ngSwitch]="dir"
      *ngIf="isMenuInsideDropDown; else notDropdownTpl"
      class="ant-dropdown-menu-submenu-expand-icon"
    >
      <i *ngSwitchCase="'rtl'" nz-icon nzType="left" class="ant-dropdown-menu-submenu-arrow-icon"></i>
      <i *ngSwitchDefault nz-icon nzType="right" class="ant-dropdown-menu-submenu-arrow-icon"></i>
    </span>
    <ng-template #notDropdownTpl>
      <i class="ant-menu-submenu-arrow"></i>
    </ng-template>
  `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i4.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i2.NgSwitchDefault, selector: "[ngSwitchDefault]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSubMenuTitleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[nz-submenu-title]',
                    exportAs: 'nzSubmenuTitle',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <i nz-icon [nzType]="nzIcon" *ngIf="nzIcon"></i>
    <ng-container *nzStringTemplateOutlet="nzTitle">
      <span>{{ nzTitle }}</span>
    </ng-container>
    <ng-content></ng-content>
    <span
      [ngSwitch]="dir"
      *ngIf="isMenuInsideDropDown; else notDropdownTpl"
      class="ant-dropdown-menu-submenu-expand-icon"
    >
      <i *ngSwitchCase="'rtl'" nz-icon nzType="left" class="ant-dropdown-menu-submenu-arrow-icon"></i>
      <i *ngSwitchDefault nz-icon nzType="right" class="ant-dropdown-menu-submenu-arrow-icon"></i>
    </span>
    <ng-template #notDropdownTpl>
      <i class="ant-menu-submenu-arrow"></i>
    </ng-template>
  `,
                    host: {
                        '[class.ant-dropdown-menu-submenu-title]': 'isMenuInsideDropDown',
                        '[class.ant-menu-submenu-title]': '!isMenuInsideDropDown',
                        '[style.paddingLeft.px]': `dir === 'rtl' ? null : paddingLeft `,
                        '[style.paddingRight.px]': `dir === 'rtl' ? paddingLeft : null`,
                        '(click)': 'clickTitle()',
                        '(mouseenter)': 'setMouseState(true)',
                        '(mouseleave)': 'setMouseState(false)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzIcon: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], isMenuInsideDropDown: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], paddingLeft: [{
                type: Input
            }], mode: [{
                type: Input
            }], toggleSubMenu: [{
                type: Output
            }], subMenuMouseState: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VibWVudS10aXRsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL21lbnUvc3VibWVudS10aXRsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUEsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUVOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0FBcUMzQyxNQUFNLE9BQU8sdUJBQXVCO0lBYWxDLFlBQW9CLEdBQXNCLEVBQXNCLGNBQThCO1FBQTFFLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQXNCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVpyRixXQUFNLEdBQWtCLElBQUksQ0FBQztRQUM3QixZQUFPLEdBQXNDLElBQUksQ0FBQztRQUNsRCx5QkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDN0IsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixnQkFBVyxHQUFrQixJQUFJLENBQUM7UUFDbEMsU0FBSSxHQUFtQixVQUFVLENBQUM7UUFDeEIsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ25DLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFFbkUsUUFBRyxHQUFjLEtBQUssQ0FBQztRQUNmLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO0lBRTBELENBQUM7SUFDbEcsUUFBUTtRQUNOLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7UUFDckMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFvQixFQUFFLEVBQUU7WUFDNUYsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7WUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBYztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQztJQUNELFVBQVU7UUFDUixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUM5QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7b0hBcENVLHVCQUF1Qjt3R0FBdkIsdUJBQXVCLHN0QkE1QnhCOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCVDsyRkFXVSx1QkFBdUI7a0JBakNuQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0oseUNBQXlDLEVBQUUsc0JBQXNCO3dCQUNqRSxnQ0FBZ0MsRUFBRSx1QkFBdUI7d0JBQ3pELHdCQUF3QixFQUFFLHFDQUFxQzt3QkFDL0QseUJBQXlCLEVBQUUsb0NBQW9DO3dCQUMvRCxTQUFTLEVBQUUsY0FBYzt3QkFDekIsY0FBYyxFQUFFLHFCQUFxQjt3QkFDckMsY0FBYyxFQUFFLHNCQUFzQjtxQkFDdkM7aUJBQ0Y7OzBCQWM4QyxRQUFROzRDQVo1QyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNhLGFBQWE7c0JBQS9CLE1BQU07Z0JBQ1ksaUJBQWlCO3NCQUFuQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aW9uLCBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOek1lbnVNb2RlVHlwZSB9IGZyb20gJy4vbWVudS50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1tuei1zdWJtZW51LXRpdGxlXScsXG4gIGV4cG9ydEFzOiAnbnpTdWJtZW51VGl0bGUnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aSBuei1pY29uIFtuelR5cGVdPVwibnpJY29uXCIgKm5nSWY9XCJuekljb25cIj48L2k+XG4gICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56VGl0bGVcIj5cbiAgICAgIDxzcGFuPnt7IG56VGl0bGUgfX08L3NwYW4+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDxzcGFuXG4gICAgICBbbmdTd2l0Y2hdPVwiZGlyXCJcbiAgICAgICpuZ0lmPVwiaXNNZW51SW5zaWRlRHJvcERvd247IGVsc2Ugbm90RHJvcGRvd25UcGxcIlxuICAgICAgY2xhc3M9XCJhbnQtZHJvcGRvd24tbWVudS1zdWJtZW51LWV4cGFuZC1pY29uXCJcbiAgICA+XG4gICAgICA8aSAqbmdTd2l0Y2hDYXNlPVwiJ3J0bCdcIiBuei1pY29uIG56VHlwZT1cImxlZnRcIiBjbGFzcz1cImFudC1kcm9wZG93bi1tZW51LXN1Ym1lbnUtYXJyb3ctaWNvblwiPjwvaT5cbiAgICAgIDxpICpuZ1N3aXRjaERlZmF1bHQgbnotaWNvbiBuelR5cGU9XCJyaWdodFwiIGNsYXNzPVwiYW50LWRyb3Bkb3duLW1lbnUtc3VibWVudS1hcnJvdy1pY29uXCI+PC9pPlxuICAgIDwvc3Bhbj5cbiAgICA8bmctdGVtcGxhdGUgI25vdERyb3Bkb3duVHBsPlxuICAgICAgPGkgY2xhc3M9XCJhbnQtbWVudS1zdWJtZW51LWFycm93XCI+PC9pPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1kcm9wZG93bi1tZW51LXN1Ym1lbnUtdGl0bGVdJzogJ2lzTWVudUluc2lkZURyb3BEb3duJyxcbiAgICAnW2NsYXNzLmFudC1tZW51LXN1Ym1lbnUtdGl0bGVdJzogJyFpc01lbnVJbnNpZGVEcm9wRG93bicsXG4gICAgJ1tzdHlsZS5wYWRkaW5nTGVmdC5weF0nOiBgZGlyID09PSAncnRsJyA/IG51bGwgOiBwYWRkaW5nTGVmdCBgLFxuICAgICdbc3R5bGUucGFkZGluZ1JpZ2h0LnB4XSc6IGBkaXIgPT09ICdydGwnID8gcGFkZGluZ0xlZnQgOiBudWxsYCxcbiAgICAnKGNsaWNrKSc6ICdjbGlja1RpdGxlKCknLFxuICAgICcobW91c2VlbnRlciknOiAnc2V0TW91c2VTdGF0ZSh0cnVlKScsXG4gICAgJyhtb3VzZWxlYXZlKSc6ICdzZXRNb3VzZVN0YXRlKGZhbHNlKSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelN1Yk1lbnVUaXRsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgQElucHV0KCkgbnpJY29uOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpUaXRsZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgaXNNZW51SW5zaWRlRHJvcERvd24gPSBmYWxzZTtcbiAgQElucHV0KCkgbnpEaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBwYWRkaW5nTGVmdDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG1vZGU6IE56TWVudU1vZGVUeXBlID0gJ3ZlcnRpY2FsJztcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHRvZ2dsZVN1Yk1lbnUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBzdWJNZW51TW91c2VTdGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBkaXI6IERpcmVjdGlvbiA9ICdsdHInO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5KSB7fVxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmRpciA9IHRoaXMuZGlyZWN0aW9uYWxpdHkudmFsdWU7XG4gICAgdGhpcy5kaXJlY3Rpb25hbGl0eS5jaGFuZ2U/LnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKGRpcmVjdGlvbjogRGlyZWN0aW9uKSA9PiB7XG4gICAgICB0aGlzLmRpciA9IGRpcmVjdGlvbjtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIHNldE1vdXNlU3RhdGUoc3RhdGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubnpEaXNhYmxlZCkge1xuICAgICAgdGhpcy5zdWJNZW51TW91c2VTdGF0ZS5uZXh0KHN0YXRlKTtcbiAgICB9XG4gIH1cbiAgY2xpY2tUaXRsZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb2RlID09PSAnaW5saW5lJyAmJiAhdGhpcy5uekRpc2FibGVkKSB7XG4gICAgICB0aGlzLnRvZ2dsZVN1Yk1lbnUuZW1pdCgpO1xuICAgIH1cbiAgfVxufVxuIl19