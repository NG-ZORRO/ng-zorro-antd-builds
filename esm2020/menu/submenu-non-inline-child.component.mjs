import { ChangeDetectionStrategy, Component, EventEmitter, Input, Optional, Output, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { slideMotion, zoomBigMotion } from 'ng-zorro-antd/core/animation';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
import * as i2 from "@angular/common";
export class NzSubmenuNoneInlineChildComponent {
    constructor(directionality) {
        this.directionality = directionality;
        this.menuClass = '';
        this.theme = 'light';
        this.templateOutlet = null;
        this.isMenuInsideDropDown = false;
        this.mode = 'vertical';
        this.position = 'right';
        this.nzDisabled = false;
        this.nzOpen = false;
        this.subMenuMouseState = new EventEmitter();
        this.expandState = 'collapsed';
        this.dir = 'ltr';
        this.destroy$ = new Subject();
    }
    setMouseState(state) {
        if (!this.nzDisabled) {
            this.subMenuMouseState.next(state);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    calcMotionState() {
        if (this.nzOpen) {
            if (this.mode === 'horizontal') {
                this.expandState = 'bottom';
            }
            else if (this.mode === 'vertical') {
                this.expandState = 'active';
            }
        }
        else {
            this.expandState = 'collapsed';
        }
    }
    ngOnInit() {
        this.calcMotionState();
        this.dir = this.directionality.value;
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
        });
    }
    ngOnChanges(changes) {
        const { mode, nzOpen } = changes;
        if (mode || nzOpen) {
            this.calcMotionState();
        }
    }
}
NzSubmenuNoneInlineChildComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSubmenuNoneInlineChildComponent, deps: [{ token: i1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzSubmenuNoneInlineChildComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSubmenuNoneInlineChildComponent, selector: "[nz-submenu-none-inline-child]", inputs: { menuClass: "menuClass", theme: "theme", templateOutlet: "templateOutlet", isMenuInsideDropDown: "isMenuInsideDropDown", mode: "mode", position: "position", nzDisabled: "nzDisabled", nzOpen: "nzOpen" }, outputs: { subMenuMouseState: "subMenuMouseState" }, host: { listeners: { "mouseenter": "setMouseState(true)", "mouseleave": "setMouseState(false)" }, properties: { "class.ant-menu-light": "theme === 'light'", "class.ant-menu-dark": "theme === 'dark'", "class.ant-menu-submenu-placement-bottom": "mode === 'horizontal'", "class.ant-menu-submenu-placement-right": "mode === 'vertical' && position === 'right'", "class.ant-menu-submenu-placement-left": "mode === 'vertical' && position === 'left'", "class.ant-menu-submenu-rtl": "dir ===\"rtl\"", "@slideMotion": "expandState", "@zoomBigMotion": "expandState" }, classAttribute: "ant-menu-submenu ant-menu-submenu-popup" }, exportAs: ["nzSubmenuNoneInlineChild"], usesOnChanges: true, ngImport: i0, template: `
    <div
      [class.ant-dropdown-menu]="isMenuInsideDropDown"
      [class.ant-menu]="!isMenuInsideDropDown"
      [class.ant-dropdown-menu-vertical]="isMenuInsideDropDown"
      [class.ant-menu-vertical]="!isMenuInsideDropDown"
      [class.ant-dropdown-menu-sub]="isMenuInsideDropDown"
      [class.ant-menu-sub]="!isMenuInsideDropDown"
      [class.ant-menu-rtl]="dir === 'rtl'"
      [ngClass]="menuClass"
    >
      <ng-template [ngTemplateOutlet]="templateOutlet"></ng-template>
    </div>
  `, isInline: true, directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [zoomBigMotion, slideMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSubmenuNoneInlineChildComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[nz-submenu-none-inline-child]',
                    exportAs: 'nzSubmenuNoneInlineChild',
                    encapsulation: ViewEncapsulation.None,
                    animations: [zoomBigMotion, slideMotion],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <div
      [class.ant-dropdown-menu]="isMenuInsideDropDown"
      [class.ant-menu]="!isMenuInsideDropDown"
      [class.ant-dropdown-menu-vertical]="isMenuInsideDropDown"
      [class.ant-menu-vertical]="!isMenuInsideDropDown"
      [class.ant-dropdown-menu-sub]="isMenuInsideDropDown"
      [class.ant-menu-sub]="!isMenuInsideDropDown"
      [class.ant-menu-rtl]="dir === 'rtl'"
      [ngClass]="menuClass"
    >
      <ng-template [ngTemplateOutlet]="templateOutlet"></ng-template>
    </div>
  `,
                    host: {
                        class: 'ant-menu-submenu ant-menu-submenu-popup',
                        '[class.ant-menu-light]': "theme === 'light'",
                        '[class.ant-menu-dark]': "theme === 'dark'",
                        '[class.ant-menu-submenu-placement-bottom]': "mode === 'horizontal'",
                        '[class.ant-menu-submenu-placement-right]': "mode === 'vertical' && position === 'right'",
                        '[class.ant-menu-submenu-placement-left]': "mode === 'vertical' && position === 'left'",
                        '[class.ant-menu-submenu-rtl]': 'dir ==="rtl"',
                        '[@slideMotion]': 'expandState',
                        '[@zoomBigMotion]': 'expandState',
                        '(mouseenter)': 'setMouseState(true)',
                        '(mouseleave)': 'setMouseState(false)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { menuClass: [{
                type: Input
            }], theme: [{
                type: Input
            }], templateOutlet: [{
                type: Input
            }], isMenuInsideDropDown: [{
                type: Input
            }], mode: [{
                type: Input
            }], position: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzOpen: [{
                type: Input
            }], subMenuMouseState: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VibWVudS1ub24taW5saW5lLWNoaWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvbWVudS9zdWJtZW51LW5vbi1pbmxpbmUtY2hpbGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBSUwsUUFBUSxFQUNSLE1BQU0sRUFHTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7OztBQXVDMUUsTUFBTSxPQUFPLGlDQUFpQztJQVc1QyxZQUFnQyxjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFWckQsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUN2QixVQUFLLEdBQW9CLE9BQU8sQ0FBQztRQUNqQyxtQkFBYyxHQUFrQyxJQUFJLENBQUM7UUFDckQseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzdCLFNBQUksR0FBbUIsVUFBVSxDQUFDO1FBQ2xDLGFBQVEsR0FBRyxPQUFPLENBQUM7UUFDbkIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ0wsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQVNuRSxnQkFBVyxHQUFHLFdBQVcsQ0FBQztRQUMxQixRQUFHLEdBQWMsS0FBSyxDQUFDO1FBQ2YsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7SUFUMEIsQ0FBQztJQUVsRSxhQUFhLENBQUMsS0FBYztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQztJQUtELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUNELGVBQWU7UUFDYixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssWUFBWSxFQUFFO2dCQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQzthQUM3QjtpQkFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO2dCQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQzthQUM3QjtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztTQUNoQztJQUNILENBQUM7SUFDRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXZCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7UUFDckMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFvQixFQUFFLEVBQUU7WUFDNUYsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ2pDLElBQUksSUFBSSxJQUFJLE1BQU0sRUFBRTtZQUNsQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDeEI7SUFDSCxDQUFDOzs4SEFsRFUsaUNBQWlDO2tIQUFqQyxpQ0FBaUMsdS9CQTVCbEM7Ozs7Ozs7Ozs7Ozs7R0FhVCwrT0FmVyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUM7MkZBOEI3QixpQ0FBaUM7a0JBbEM3QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQ0FBZ0M7b0JBQzFDLFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxVQUFVLEVBQUUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDO29CQUN4QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7O0dBYVQ7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSx5Q0FBeUM7d0JBQ2hELHdCQUF3QixFQUFFLG1CQUFtQjt3QkFDN0MsdUJBQXVCLEVBQUUsa0JBQWtCO3dCQUMzQywyQ0FBMkMsRUFBRSx1QkFBdUI7d0JBQ3BFLDBDQUEwQyxFQUFFLDZDQUE2Qzt3QkFDekYseUNBQXlDLEVBQUUsNENBQTRDO3dCQUN2Riw4QkFBOEIsRUFBRSxjQUFjO3dCQUM5QyxnQkFBZ0IsRUFBRSxhQUFhO3dCQUMvQixrQkFBa0IsRUFBRSxhQUFhO3dCQUNqQyxjQUFjLEVBQUUscUJBQXFCO3dCQUNyQyxjQUFjLEVBQUUsc0JBQXNCO3FCQUN2QztpQkFDRjs7MEJBWWMsUUFBUTs0Q0FWWixTQUFTO3NCQUFqQixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDYSxpQkFBaUI7c0JBQW5DLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBzbGlkZU1vdGlvbiwgem9vbUJpZ01vdGlvbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9hbmltYXRpb24nO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgTnpNZW51TW9kZVR5cGUsIE56TWVudVRoZW1lVHlwZSB9IGZyb20gJy4vbWVudS50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1tuei1zdWJtZW51LW5vbmUtaW5saW5lLWNoaWxkXScsXG4gIGV4cG9ydEFzOiAnbnpTdWJtZW51Tm9uZUlubGluZUNoaWxkJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgYW5pbWF0aW9uczogW3pvb21CaWdNb3Rpb24sIHNsaWRlTW90aW9uXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgW2NsYXNzLmFudC1kcm9wZG93bi1tZW51XT1cImlzTWVudUluc2lkZURyb3BEb3duXCJcbiAgICAgIFtjbGFzcy5hbnQtbWVudV09XCIhaXNNZW51SW5zaWRlRHJvcERvd25cIlxuICAgICAgW2NsYXNzLmFudC1kcm9wZG93bi1tZW51LXZlcnRpY2FsXT1cImlzTWVudUluc2lkZURyb3BEb3duXCJcbiAgICAgIFtjbGFzcy5hbnQtbWVudS12ZXJ0aWNhbF09XCIhaXNNZW51SW5zaWRlRHJvcERvd25cIlxuICAgICAgW2NsYXNzLmFudC1kcm9wZG93bi1tZW51LXN1Yl09XCJpc01lbnVJbnNpZGVEcm9wRG93blwiXG4gICAgICBbY2xhc3MuYW50LW1lbnUtc3ViXT1cIiFpc01lbnVJbnNpZGVEcm9wRG93blwiXG4gICAgICBbY2xhc3MuYW50LW1lbnUtcnRsXT1cImRpciA9PT0gJ3J0bCdcIlxuICAgICAgW25nQ2xhc3NdPVwibWVudUNsYXNzXCJcbiAgICA+XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVPdXRsZXRcIj48L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtbWVudS1zdWJtZW51IGFudC1tZW51LXN1Ym1lbnUtcG9wdXAnLFxuICAgICdbY2xhc3MuYW50LW1lbnUtbGlnaHRdJzogXCJ0aGVtZSA9PT0gJ2xpZ2h0J1wiLFxuICAgICdbY2xhc3MuYW50LW1lbnUtZGFya10nOiBcInRoZW1lID09PSAnZGFyaydcIixcbiAgICAnW2NsYXNzLmFudC1tZW51LXN1Ym1lbnUtcGxhY2VtZW50LWJvdHRvbV0nOiBcIm1vZGUgPT09ICdob3Jpem9udGFsJ1wiLFxuICAgICdbY2xhc3MuYW50LW1lbnUtc3VibWVudS1wbGFjZW1lbnQtcmlnaHRdJzogXCJtb2RlID09PSAndmVydGljYWwnICYmIHBvc2l0aW9uID09PSAncmlnaHQnXCIsXG4gICAgJ1tjbGFzcy5hbnQtbWVudS1zdWJtZW51LXBsYWNlbWVudC1sZWZ0XSc6IFwibW9kZSA9PT0gJ3ZlcnRpY2FsJyAmJiBwb3NpdGlvbiA9PT0gJ2xlZnQnXCIsXG4gICAgJ1tjbGFzcy5hbnQtbWVudS1zdWJtZW51LXJ0bF0nOiAnZGlyID09PVwicnRsXCInLFxuICAgICdbQHNsaWRlTW90aW9uXSc6ICdleHBhbmRTdGF0ZScsXG4gICAgJ1tAem9vbUJpZ01vdGlvbl0nOiAnZXhwYW5kU3RhdGUnLFxuICAgICcobW91c2VlbnRlciknOiAnc2V0TW91c2VTdGF0ZSh0cnVlKScsXG4gICAgJyhtb3VzZWxlYXZlKSc6ICdzZXRNb3VzZVN0YXRlKGZhbHNlKSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelN1Ym1lbnVOb25lSW5saW5lQ2hpbGRDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgbWVudUNsYXNzOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgdGhlbWU6IE56TWVudVRoZW1lVHlwZSA9ICdsaWdodCc7XG4gIEBJbnB1dCgpIHRlbXBsYXRlT3V0bGV0OiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGlzTWVudUluc2lkZURyb3BEb3duID0gZmFsc2U7XG4gIEBJbnB1dCgpIG1vZGU6IE56TWVudU1vZGVUeXBlID0gJ3ZlcnRpY2FsJztcbiAgQElucHV0KCkgcG9zaXRpb24gPSAncmlnaHQnO1xuICBASW5wdXQoKSBuekRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56T3BlbiA9IGZhbHNlO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgc3ViTWVudU1vdXNlU3RhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXJlY3Rpb25hbGl0eTogRGlyZWN0aW9uYWxpdHkpIHt9XG5cbiAgc2V0TW91c2VTdGF0ZShzdGF0ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICghdGhpcy5uekRpc2FibGVkKSB7XG4gICAgICB0aGlzLnN1Yk1lbnVNb3VzZVN0YXRlLm5leHQoc3RhdGUpO1xuICAgIH1cbiAgfVxuICBleHBhbmRTdGF0ZSA9ICdjb2xsYXBzZWQnO1xuICBkaXI6IERpcmVjdGlvbiA9ICdsdHInO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbiAgY2FsY01vdGlvblN0YXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56T3Blbikge1xuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIHRoaXMuZXhwYW5kU3RhdGUgPSAnYm90dG9tJztcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlID09PSAndmVydGljYWwnKSB7XG4gICAgICAgIHRoaXMuZXhwYW5kU3RhdGUgPSAnYWN0aXZlJztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5leHBhbmRTdGF0ZSA9ICdjb2xsYXBzZWQnO1xuICAgIH1cbiAgfVxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGNNb3Rpb25TdGF0ZSgpO1xuXG4gICAgdGhpcy5kaXIgPSB0aGlzLmRpcmVjdGlvbmFsaXR5LnZhbHVlO1xuICAgIHRoaXMuZGlyZWN0aW9uYWxpdHkuY2hhbmdlPy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChkaXJlY3Rpb246IERpcmVjdGlvbikgPT4ge1xuICAgICAgdGhpcy5kaXIgPSBkaXJlY3Rpb247XG4gICAgfSk7XG4gIH1cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbW9kZSwgbnpPcGVuIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChtb2RlIHx8IG56T3Blbikge1xuICAgICAgdGhpcy5jYWxjTW90aW9uU3RhdGUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==