import { __decorate } from "tslib";
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, Host, Inject, Input, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { combineLatest, merge, Subject } from 'rxjs';
import { map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { getPlacementName, POSITION_MAP } from 'ng-zorro-antd/core/overlay';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzMenuItemDirective } from './menu-item.directive';
import { NzIsMenuInsideDropDownToken } from './menu.token';
import { NzSubmenuService } from './submenu.service';
import * as i0 from "@angular/core";
import * as i1 from "./menu.service";
import * as i2 from "./submenu.service";
import * as i3 from "@angular/cdk/platform";
import * as i4 from "@angular/cdk/bidi";
import * as i5 from "ng-zorro-antd/core/no-animation";
import * as i6 from "./submenu-title.component";
import * as i7 from "./submenu-inline-child.component";
import * as i8 from "./submenu-non-inline-child.component";
import * as i9 from "@angular/cdk/overlay";
import * as i10 from "@angular/common";
const listOfVerticalPositions = [
    POSITION_MAP.rightTop,
    POSITION_MAP.right,
    POSITION_MAP.rightBottom,
    POSITION_MAP.leftTop,
    POSITION_MAP.left,
    POSITION_MAP.leftBottom
];
const listOfHorizontalPositions = [POSITION_MAP.bottomLeft];
export class NzSubMenuComponent {
    constructor(nzMenuService, cdr, nzSubmenuService, platform, isMenuInsideDropDown, directionality, noAnimation) {
        this.nzMenuService = nzMenuService;
        this.cdr = cdr;
        this.nzSubmenuService = nzSubmenuService;
        this.platform = platform;
        this.isMenuInsideDropDown = isMenuInsideDropDown;
        this.directionality = directionality;
        this.noAnimation = noAnimation;
        this.nzMenuClassName = '';
        this.nzPaddingLeft = null;
        this.nzTitle = null;
        this.nzIcon = null;
        this.nzOpen = false;
        this.nzDisabled = false;
        this.nzOpenChange = new EventEmitter();
        this.cdkOverlayOrigin = null;
        this.listOfNzSubMenuComponent = null;
        this.listOfNzMenuItemDirective = null;
        this.level = this.nzSubmenuService.level;
        this.destroy$ = new Subject();
        this.position = 'right';
        this.triggerWidth = null;
        this.theme = 'light';
        this.mode = 'vertical';
        this.inlinePaddingLeft = null;
        this.overlayPositions = listOfVerticalPositions;
        this.isSelected = false;
        this.isActive = false;
        this.dir = 'ltr';
    }
    /** set the submenu host open status directly **/
    setOpenStateWithoutDebounce(open) {
        this.nzSubmenuService.setOpenStateWithoutDebounce(open);
    }
    toggleSubMenu() {
        this.setOpenStateWithoutDebounce(!this.nzOpen);
    }
    setMouseEnterState(value) {
        this.isActive = value;
        if (this.mode !== 'inline') {
            this.nzSubmenuService.setMouseEnterTitleOrOverlayState(value);
        }
    }
    setTriggerWidth() {
        if (this.mode === 'horizontal' && this.platform.isBrowser && this.cdkOverlayOrigin) {
            /** TODO: fast dom **/
            this.triggerWidth = this.cdkOverlayOrigin.nativeElement.getBoundingClientRect().width;
        }
    }
    onPositionChange(position) {
        const placement = getPlacementName(position);
        if (placement === 'rightTop' || placement === 'rightBottom' || placement === 'right') {
            this.position = 'right';
        }
        else if (placement === 'leftTop' || placement === 'leftBottom' || placement === 'left') {
            this.position = 'left';
        }
    }
    ngOnInit() {
        /** submenu theme update **/
        this.nzMenuService.theme$.pipe(takeUntil(this.destroy$)).subscribe(theme => {
            this.theme = theme;
            this.cdr.markForCheck();
        });
        /** submenu mode update **/
        this.nzSubmenuService.mode$.pipe(takeUntil(this.destroy$)).subscribe(mode => {
            this.mode = mode;
            if (mode === 'horizontal') {
                this.overlayPositions = listOfHorizontalPositions;
            }
            else if (mode === 'vertical') {
                this.overlayPositions = listOfVerticalPositions;
            }
            this.cdr.markForCheck();
        });
        /** inlineIndent update **/
        combineLatest([this.nzSubmenuService.mode$, this.nzMenuService.inlineIndent$])
            .pipe(takeUntil(this.destroy$))
            .subscribe(([mode, inlineIndent]) => {
            this.inlinePaddingLeft = mode === 'inline' ? this.level * inlineIndent : null;
            this.cdr.markForCheck();
        });
        /** current submenu open status **/
        this.nzSubmenuService.isCurrentSubMenuOpen$.pipe(takeUntil(this.destroy$)).subscribe(open => {
            this.isActive = open;
            if (open !== this.nzOpen) {
                this.setTriggerWidth();
                this.nzOpen = open;
                this.nzOpenChange.emit(this.nzOpen);
                this.cdr.markForCheck();
            }
        });
        this.dir = this.directionality.value;
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.markForCheck();
        });
    }
    ngAfterContentInit() {
        this.setTriggerWidth();
        const listOfNzMenuItemDirective = this.listOfNzMenuItemDirective;
        const changes = listOfNzMenuItemDirective.changes;
        const mergedObservable = merge(...[changes, ...listOfNzMenuItemDirective.map(menu => menu.selected$)]);
        changes
            .pipe(startWith(listOfNzMenuItemDirective), switchMap(() => mergedObservable), startWith(true), map(() => listOfNzMenuItemDirective.some(e => e.nzSelected)), takeUntil(this.destroy$))
            .subscribe(selected => {
            this.isSelected = selected;
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        const { nzOpen } = changes;
        if (nzOpen) {
            this.nzSubmenuService.setOpenStateWithoutDebounce(this.nzOpen);
            this.setTriggerWidth();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzSubMenuComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSubMenuComponent, deps: [{ token: i1.MenuService }, { token: i0.ChangeDetectorRef }, { token: i2.NzSubmenuService }, { token: i3.Platform }, { token: NzIsMenuInsideDropDownToken }, { token: i4.Directionality, optional: true }, { token: i5.NzNoAnimationDirective, host: true, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzSubMenuComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSubMenuComponent, selector: "[nz-submenu]", inputs: { nzMenuClassName: "nzMenuClassName", nzPaddingLeft: "nzPaddingLeft", nzTitle: "nzTitle", nzIcon: "nzIcon", nzOpen: "nzOpen", nzDisabled: "nzDisabled" }, outputs: { nzOpenChange: "nzOpenChange" }, host: { properties: { "class.ant-dropdown-menu-submenu": "isMenuInsideDropDown", "class.ant-dropdown-menu-submenu-disabled": "isMenuInsideDropDown && nzDisabled", "class.ant-dropdown-menu-submenu-open": "isMenuInsideDropDown && nzOpen", "class.ant-dropdown-menu-submenu-selected": "isMenuInsideDropDown && isSelected", "class.ant-dropdown-menu-submenu-vertical": "isMenuInsideDropDown && mode === 'vertical'", "class.ant-dropdown-menu-submenu-horizontal": "isMenuInsideDropDown && mode === 'horizontal'", "class.ant-dropdown-menu-submenu-inline": "isMenuInsideDropDown && mode === 'inline'", "class.ant-dropdown-menu-submenu-active": "isMenuInsideDropDown && isActive", "class.ant-menu-submenu": "!isMenuInsideDropDown", "class.ant-menu-submenu-disabled": "!isMenuInsideDropDown && nzDisabled", "class.ant-menu-submenu-open": "!isMenuInsideDropDown && nzOpen", "class.ant-menu-submenu-selected": "!isMenuInsideDropDown && isSelected", "class.ant-menu-submenu-vertical": "!isMenuInsideDropDown && mode === 'vertical'", "class.ant-menu-submenu-horizontal": "!isMenuInsideDropDown && mode === 'horizontal'", "class.ant-menu-submenu-inline": "!isMenuInsideDropDown && mode === 'inline'", "class.ant-menu-submenu-active": "!isMenuInsideDropDown && isActive", "class.ant-menu-submenu-rtl": "dir === 'rtl'" } }, providers: [NzSubmenuService], queries: [{ propertyName: "listOfNzSubMenuComponent", predicate: NzSubMenuComponent, descendants: true }, { propertyName: "listOfNzMenuItemDirective", predicate: NzMenuItemDirective, descendants: true }], viewQueries: [{ propertyName: "cdkOverlayOrigin", first: true, predicate: CdkOverlayOrigin, descendants: true, read: ElementRef, static: true }], exportAs: ["nzSubmenu"], usesOnChanges: true, ngImport: i0, template: `
    <div
      nz-submenu-title
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      [nzIcon]="nzIcon"
      [nzTitle]="nzTitle"
      [mode]="mode"
      [nzDisabled]="nzDisabled"
      [isMenuInsideDropDown]="isMenuInsideDropDown"
      [paddingLeft]="nzPaddingLeft || inlinePaddingLeft"
      (subMenuMouseState)="setMouseEnterState($event)"
      (toggleSubMenu)="toggleSubMenu()"
    >
      <ng-content select="[title]" *ngIf="!nzTitle"></ng-content>
    </div>
    <div
      *ngIf="mode === 'inline'; else nonInlineTemplate"
      nz-submenu-inline-child
      [mode]="mode"
      [nzOpen]="nzOpen"
      [@.disabled]="noAnimation?.nzNoAnimation"
      [nzNoAnimation]="noAnimation?.nzNoAnimation"
      [menuClass]="nzMenuClassName"
      [templateOutlet]="subMenuTemplate"
    ></div>
    <ng-template #nonInlineTemplate>
      <ng-template
        cdkConnectedOverlay
        (positionChange)="onPositionChange($event)"
        [cdkConnectedOverlayPositions]="overlayPositions"
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayWidth]="triggerWidth!"
        [cdkConnectedOverlayOpen]="nzOpen"
        [cdkConnectedOverlayTransformOriginOn]="'.ant-menu-submenu'"
      >
        <div
          nz-submenu-none-inline-child
          [theme]="theme"
          [mode]="mode"
          [nzOpen]="nzOpen"
          [position]="position"
          [nzDisabled]="nzDisabled"
          [isMenuInsideDropDown]="isMenuInsideDropDown"
          [templateOutlet]="subMenuTemplate"
          [menuClass]="nzMenuClassName"
          [@.disabled]="noAnimation?.nzNoAnimation"
          [nzNoAnimation]="noAnimation?.nzNoAnimation"
          (subMenuMouseState)="setMouseEnterState($event)"
        ></div>
      </ng-template>
    </ng-template>

    <ng-template #subMenuTemplate>
      <ng-content></ng-content>
    </ng-template>
  `, isInline: true, components: [{ type: i6.NzSubMenuTitleComponent, selector: "[nz-submenu-title]", inputs: ["nzIcon", "nzTitle", "isMenuInsideDropDown", "nzDisabled", "paddingLeft", "mode"], outputs: ["toggleSubMenu", "subMenuMouseState"], exportAs: ["nzSubmenuTitle"] }, { type: i7.NzSubmenuInlineChildComponent, selector: "[nz-submenu-inline-child]", inputs: ["templateOutlet", "menuClass", "mode", "nzOpen"], exportAs: ["nzSubmenuInlineChild"] }, { type: i8.NzSubmenuNoneInlineChildComponent, selector: "[nz-submenu-none-inline-child]", inputs: ["menuClass", "theme", "templateOutlet", "isMenuInsideDropDown", "mode", "position", "nzDisabled", "nzOpen"], outputs: ["subMenuMouseState"], exportAs: ["nzSubmenuNoneInlineChild"] }], directives: [{ type: i9.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }, { type: i10.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NzNoAnimationDirective, selector: "[nzNoAnimation]", inputs: ["nzNoAnimation"], exportAs: ["nzNoAnimation"] }, { type: i9.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzSubMenuComponent.prototype, "nzOpen", void 0);
__decorate([
    InputBoolean()
], NzSubMenuComponent.prototype, "nzDisabled", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSubMenuComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[nz-submenu]',
                    exportAs: 'nzSubmenu',
                    providers: [NzSubmenuService],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    template: `
    <div
      nz-submenu-title
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      [nzIcon]="nzIcon"
      [nzTitle]="nzTitle"
      [mode]="mode"
      [nzDisabled]="nzDisabled"
      [isMenuInsideDropDown]="isMenuInsideDropDown"
      [paddingLeft]="nzPaddingLeft || inlinePaddingLeft"
      (subMenuMouseState)="setMouseEnterState($event)"
      (toggleSubMenu)="toggleSubMenu()"
    >
      <ng-content select="[title]" *ngIf="!nzTitle"></ng-content>
    </div>
    <div
      *ngIf="mode === 'inline'; else nonInlineTemplate"
      nz-submenu-inline-child
      [mode]="mode"
      [nzOpen]="nzOpen"
      [@.disabled]="noAnimation?.nzNoAnimation"
      [nzNoAnimation]="noAnimation?.nzNoAnimation"
      [menuClass]="nzMenuClassName"
      [templateOutlet]="subMenuTemplate"
    ></div>
    <ng-template #nonInlineTemplate>
      <ng-template
        cdkConnectedOverlay
        (positionChange)="onPositionChange($event)"
        [cdkConnectedOverlayPositions]="overlayPositions"
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayWidth]="triggerWidth!"
        [cdkConnectedOverlayOpen]="nzOpen"
        [cdkConnectedOverlayTransformOriginOn]="'.ant-menu-submenu'"
      >
        <div
          nz-submenu-none-inline-child
          [theme]="theme"
          [mode]="mode"
          [nzOpen]="nzOpen"
          [position]="position"
          [nzDisabled]="nzDisabled"
          [isMenuInsideDropDown]="isMenuInsideDropDown"
          [templateOutlet]="subMenuTemplate"
          [menuClass]="nzMenuClassName"
          [@.disabled]="noAnimation?.nzNoAnimation"
          [nzNoAnimation]="noAnimation?.nzNoAnimation"
          (subMenuMouseState)="setMouseEnterState($event)"
        ></div>
      </ng-template>
    </ng-template>

    <ng-template #subMenuTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
                    host: {
                        '[class.ant-dropdown-menu-submenu]': `isMenuInsideDropDown`,
                        '[class.ant-dropdown-menu-submenu-disabled]': `isMenuInsideDropDown && nzDisabled`,
                        '[class.ant-dropdown-menu-submenu-open]': `isMenuInsideDropDown && nzOpen`,
                        '[class.ant-dropdown-menu-submenu-selected]': `isMenuInsideDropDown && isSelected`,
                        '[class.ant-dropdown-menu-submenu-vertical]': `isMenuInsideDropDown && mode === 'vertical'`,
                        '[class.ant-dropdown-menu-submenu-horizontal]': `isMenuInsideDropDown && mode === 'horizontal'`,
                        '[class.ant-dropdown-menu-submenu-inline]': `isMenuInsideDropDown && mode === 'inline'`,
                        '[class.ant-dropdown-menu-submenu-active]': `isMenuInsideDropDown && isActive`,
                        '[class.ant-menu-submenu]': `!isMenuInsideDropDown`,
                        '[class.ant-menu-submenu-disabled]': `!isMenuInsideDropDown && nzDisabled`,
                        '[class.ant-menu-submenu-open]': `!isMenuInsideDropDown && nzOpen`,
                        '[class.ant-menu-submenu-selected]': `!isMenuInsideDropDown && isSelected`,
                        '[class.ant-menu-submenu-vertical]': `!isMenuInsideDropDown && mode === 'vertical'`,
                        '[class.ant-menu-submenu-horizontal]': `!isMenuInsideDropDown && mode === 'horizontal'`,
                        '[class.ant-menu-submenu-inline]': `!isMenuInsideDropDown && mode === 'inline'`,
                        '[class.ant-menu-submenu-active]': `!isMenuInsideDropDown && isActive`,
                        '[class.ant-menu-submenu-rtl]': `dir === 'rtl'`
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.MenuService }, { type: i0.ChangeDetectorRef }, { type: i2.NzSubmenuService }, { type: i3.Platform }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NzIsMenuInsideDropDownToken]
                }] }, { type: i4.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i5.NzNoAnimationDirective, decorators: [{
                    type: Host
                }, {
                    type: Optional
                }] }]; }, propDecorators: { nzMenuClassName: [{
                type: Input
            }], nzPaddingLeft: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzIcon: [{
                type: Input
            }], nzOpen: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzOpenChange: [{
                type: Output
            }], cdkOverlayOrigin: [{
                type: ViewChild,
                args: [CdkOverlayOrigin, { static: true, read: ElementRef }]
            }], listOfNzSubMenuComponent: [{
                type: ContentChildren,
                args: [NzSubMenuComponent, { descendants: true }]
            }], listOfNzMenuItemDirective: [{
                type: ContentChildren,
                args: [NzMenuItemDirective, { descendants: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VibWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL21lbnUvc3VibWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE9BQU8sRUFBRSxnQkFBZ0IsRUFBa0MsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RixPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixJQUFJLEVBQ0osTUFBTSxFQUNOLEtBQUssRUFJTCxRQUFRLEVBQ1IsTUFBTSxFQUlOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd0RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFNUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTVELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUUzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7Ozs7Ozs7O0FBRXJELE1BQU0sdUJBQXVCLEdBQUc7SUFDOUIsWUFBWSxDQUFDLFFBQVE7SUFDckIsWUFBWSxDQUFDLEtBQUs7SUFDbEIsWUFBWSxDQUFDLFdBQVc7SUFDeEIsWUFBWSxDQUFDLE9BQU87SUFDcEIsWUFBWSxDQUFDLElBQUk7SUFDakIsWUFBWSxDQUFDLFVBQVU7Q0FDeEIsQ0FBQztBQUNGLE1BQU0seUJBQXlCLEdB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QUE0Qzt3QkFDL0UsaUNBQWlDLEVBQUUsbUNBQW1DO3dCQUN0RSw4QkFBOEIsRUFBRSxlQUFlO3FCQUNoRDtpQkFDRjs7MEJBa0VJLE1BQU07MkJBQUMsMkJBQTJCOzswQkFDbEMsUUFBUTs7MEJBQ1IsSUFBSTs7MEJBQUksUUFBUTs0Q0EvRFYsZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ21CLE1BQU07c0JBQTlCLEtBQUs7Z0JBQ21CLFVBQVU7c0JBQWxDLEtBQUs7Z0JBQ2EsWUFBWTtzQkFBOUIsTUFBTTtnQkFDMEQsZ0JBQWdCO3NCQUFoRixTQUFTO3VCQUFDLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO2dCQUUvRCx3QkFBd0I7c0JBRHZCLGVBQWU7dUJBQUMsa0JBQWtCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO2dCQUcxRCx5QkFBeUI7c0JBRHhCLGVBQWU7dUJBQUMsbUJBQW1CLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aW9uLCBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IENka092ZXJsYXlPcmlnaW4sIENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdCxcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIG1lcmdlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE56Tm9BbmltYXRpb25EaXJlY3RpdmUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvbm8tYW5pbWF0aW9uJztcbmltcG9ydCB7IGdldFBsYWNlbWVudE5hbWUsIFBPU0lUSU9OX01BUCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9vdmVybGF5JztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IE56TWVudUl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL21lbnUtaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWVudVNlcnZpY2UgfSBmcm9tICcuL21lbnUuc2VydmljZSc7XG5pbXBvcnQgeyBOeklzTWVudUluc2lkZURyb3BEb3duVG9rZW4gfSBmcm9tICcuL21lbnUudG9rZW4nO1xuaW1wb3J0IHsgTnpNZW51TW9kZVR5cGUsIE56TWVudVRoZW1lVHlwZSB9IGZyb20gJy4vbWVudS50eXBlcyc7XG5pbXBvcnQgeyBOelN1Ym1lbnVTZXJ2aWNlIH0gZnJvbSAnLi9zdWJtZW51LnNlcnZpY2UnO1xuXG5jb25zdCBsaXN0T2ZWZXJ0aWNhbFBvc2l0aW9ucyA9IFtcbiAgUE9TSVRJT05fTUFQLnJpZ2h0VG9wLFxuICBQT1NJVElPTl9NQVAucmlnaHQsXG4gIFBPU0lUSU9OX01BUC5yaWdodEJvdHRvbSxcbiAgUE9TSVRJT05fTUFQLmxlZnRUb3AsXG4gIFBPU0lUSU9OX01BUC5sZWZ0LFxuICBQT1NJVElPTl9NQVAubGVmdEJvdHRvbVxuXTtcbmNvbnN0IGxpc3RPZkhvcml6b250YWxQb3NpdGlvbnMgPSBbUE9TSVRJT05fTUFQLmJvdHRvbUxlZnRdO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbbnotc3VibWVudV0nLFxuICBleHBvcnRBczogJ256U3VibWVudScsXG4gIHByb3ZpZGVyczogW056U3VibWVudVNlcnZpY2VdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgbnotc3VibWVudS10aXRsZVxuICAgICAgY2RrT3ZlcmxheU9yaWdpblxuICAgICAgI29yaWdpbj1cImNka092ZXJsYXlPcmlnaW5cIlxuICAgICAgW256SWNvbl09XCJuekljb25cIlxuICAgICAgW256VGl0bGVdPVwibnpUaXRsZVwiXG4gICAgICBbbW9kZV09XCJtb2RlXCJcbiAgICAgIFtuekRpc2FibGVkXT1cIm56RGlzYWJsZWRcIlxuICAgICAgW2lzTWVudUluc2lkZURyb3BEb3duXT1cImlzTWVudUluc2lkZURyb3BEb3duXCJcbiAgICAgIFtwYWRkaW5nTGVmdF09XCJuelBhZGRpbmdMZWZ0IHx8IGlubGluZVBhZGRpbmdMZWZ0XCJcbiAgICAgIChzdWJNZW51TW91c2VTdGF0ZSk9XCJzZXRNb3VzZUVudGVyU3RhdGUoJGV2ZW50KVwiXG4gICAgICAodG9nZ2xlU3ViTWVudSk9XCJ0b2dnbGVTdWJNZW51KClcIlxuICAgID5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlt0aXRsZV1cIiAqbmdJZj1cIiFuelRpdGxlXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIDxkaXZcbiAgICAgICpuZ0lmPVwibW9kZSA9PT0gJ2lubGluZSc7IGVsc2Ugbm9uSW5saW5lVGVtcGxhdGVcIlxuICAgICAgbnotc3VibWVudS1pbmxpbmUtY2hpbGRcbiAgICAgIFttb2RlXT1cIm1vZGVcIlxuICAgICAgW256T3Blbl09XCJuek9wZW5cIlxuICAgICAgW0AuZGlzYWJsZWRdPVwibm9BbmltYXRpb24/Lm56Tm9BbmltYXRpb25cIlxuICAgICAgW256Tm9BbmltYXRpb25dPVwibm9BbmltYXRpb24/Lm56Tm9BbmltYXRpb25cIlxuICAgICAgW21lbnVDbGFzc109XCJuek1lbnVDbGFzc05hbWVcIlxuICAgICAgW3RlbXBsYXRlT3V0bGV0XT1cInN1Yk1lbnVUZW1wbGF0ZVwiXG4gICAgPjwvZGl2PlxuICAgIDxuZy10ZW1wbGF0ZSAjbm9uSW5saW5lVGVtcGxhdGU+XG4gICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgY2RrQ29ubmVjdGVkT3ZlcmxheVxuICAgICAgICAocG9zaXRpb25DaGFuZ2UpPVwib25Qb3NpdGlvbkNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbnNdPVwib3ZlcmxheVBvc2l0aW9uc1wiXG4gICAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3JpZ2luXT1cIm9yaWdpblwiXG4gICAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5V2lkdGhdPVwidHJpZ2dlcldpZHRoIVwiXG4gICAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3Blbl09XCJuek9wZW5cIlxuICAgICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheVRyYW5zZm9ybU9yaWdpbk9uXT1cIicuYW50LW1lbnUtc3VibWVudSdcIlxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgbnotc3VibWVudS1ub25lLWlubGluZS1jaGlsZFxuICAgICAgICAgIFt0aGVtZV09XCJ0aGVtZVwiXG4gICAgICAgICAgW21vZGVdPVwibW9kZVwiXG4gICAgICAgICAgW256T3Blbl09XCJuek9wZW5cIlxuICAgICAgICAgIFtwb3NpdGlvbl09XCJwb3NpdGlvblwiXG4gICAgICAgICAgW256RGlzYWJsZWRdPVwibnpEaXNhYmxlZFwiXG4gICAgICAgICAgW2lzTWVudUluc2lkZURyb3BEb3duXT1cImlzTWVudUluc2lkZURyb3BEb3duXCJcbiAgICAgICAgICBbdGVtcGxhdGVPdXRsZXRdPVwic3ViTWVudVRlbXBsYXRlXCJcbiAgICAgICAgICBbbWVudUNsYXNzXT1cIm56TWVudUNsYXNzTmFtZVwiXG4gICAgICAgICAgW0AuZGlzYWJsZWRdPVwibm9BbmltYXRpb24/Lm56Tm9BbmltYXRpb25cIlxuICAgICAgICAgIFtuek5vQW5pbWF0aW9uXT1cIm5vQW5pbWF0aW9uPy5uek5vQW5pbWF0aW9uXCJcbiAgICAgICAgICAoc3ViTWVudU1vdXNlU3RhdGUpPVwic2V0TW91c2VFbnRlclN0YXRlKCRldmVudClcIlxuICAgICAgICA+PC9kaXY+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8bmctdGVtcGxhdGUgI3N1Yk1lbnVUZW1wbGF0ZT5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtZHJvcGRvd24tbWVudS1zdWJtZW51XSc6IGBpc01lbnVJbnNpZGVEcm9wRG93bmAsXG4gICAgJ1tjbGFzcy5hbnQtZHJvcGRvd24tbWVudS1zdWJtZW51LWRpc2FibGVkXSc6IGBpc01lbnVJbnNpZGVEcm9wRG93biAmJiBuekRpc2FibGVkYCxcbiAgICAnW2NsYXNzLmFudC1kcm9wZG93bi1tZW51LXN1Ym1lbnUtb3Blbl0nOiBgaXNNZW51SW5zaWRlRHJvcERvd24gJiYgbnpPcGVuYCxcbiAgICAnW2NsYXNzLmFudC1kcm9wZG93bi1tZW51LXN1Ym1lbnUtc2VsZWN0ZWRdJzogYGlzTWVudUluc2lkZURyb3BEb3duICYmIGlzU2VsZWN0ZWRgLFxuICAgICdbY2xhc3MuYW50LWRyb3Bkb3duLW1lbnUtc3VibWVudS12ZXJ0aWNhbF0nOiBgaXNNZW51SW5zaWRlRHJvcERvd24gJiYgbW9kZSA9PT0gJ3ZlcnRpY2FsJ2AsXG4gICAgJ1tjbGFzcy5hbnQtZHJvcGRvd24tbWVudS1zdWJtZW51LWhvcml6b250YWxdJzogYGlzTWVudUluc2lkZURyb3BEb3duICYmIG1vZGUgPT09ICdob3Jpem9udGFsJ2AsXG4gICAgJ1tjbGFzcy5hbnQtZHJvcGRvd24tbWVudS1zdWJtZW51LWlubGluZV0nOiBgaXNNZW51SW5zaWRlRHJvcERvd24gJiYgbW9kZSA9PT0gJ2lubGluZSdgLFxuICAgICdbY2xhc3MuYW50LWRyb3Bkb3duLW1lbnUtc3VibWVudS1hY3RpdmVdJzogYGlzTWVudUluc2lkZURyb3BEb3duICYmIGlzQWN0aXZlYCxcbiAgICAnW2NsYXNzLmFudC1tZW51LXN1Ym1lbnVdJzogYCFpc01lbnVJbnNpZGVEcm9wRG93bmAsXG4gICAgJ1tjbGFzcy5hbnQtbWVudS1zdWJtZW51LWRpc2FibGVkXSc6IGAhaXNNZW51SW5zaWRlRHJvcERvd24gJiYgbnpEaXNhYmxlZGAsXG4gICAgJ1tjbGFzcy5hbnQtbWVudS1zdWJtZW51LW9wZW5dJzogYCFpc01lbnVJbnNpZGVEcm9wRG93biAmJiBuek9wZW5gLFxuICAgICdbY2xhc3MuYW50LW1lbnUtc3VibWVudS1zZWxlY3RlZF0nOiBgIWlzTWVudUluc2lkZURyb3BEb3duICYmIGlzU2VsZWN0ZWRgLFxuICAgICdbY2xhc3MuYW50LW1lbnUtc3VibWVudS12ZXJ0aWNhbF0nOiBgIWlzTWVudUluc2lkZURyb3BEb3duICYmIG1vZGUgPT09ICd2ZXJ0aWNhbCdgLFxuICAgICdbY2xhc3MuYW50LW1lbnUtc3VibWVudS1ob3Jpem9udGFsXSc6IGAhaXNNZW51SW5zaWRlRHJvcERvd24gJiYgbW9kZSA9PT0gJ2hvcml6b250YWwnYCxcbiAgICAnW2NsYXNzLmFudC1tZW51LXN1Ym1lbnUtaW5saW5lXSc6IGAhaXNNZW51SW5zaWRlRHJvcERvd24gJiYgbW9kZSA9PT0gJ2lubGluZSdgLFxuICAgICdbY2xhc3MuYW50LW1lbnUtc3VibWVudS1hY3RpdmVdJzogYCFpc01lbnVJbnNpZGVEcm9wRG93biAmJiBpc0FjdGl2ZWAsXG4gICAgJ1tjbGFzcy5hbnQtbWVudS1zdWJtZW51LXJ0bF0nOiBgZGlyID09PSAncnRsJ2BcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelN1Yk1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzIHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256T3BlbjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEaXNhYmxlZDogQm9vbGVhbklucHV0O1xuXG4gIEBJbnB1dCgpIG56TWVudUNsYXNzTmFtZTogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIG56UGFkZGluZ0xlZnQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuelRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuekljb246IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpPcGVuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekRpc2FibGVkID0gZmFsc2U7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuek9wZW5DaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQFZpZXdDaGlsZChDZGtPdmVybGF5T3JpZ2luLCB7IHN0YXRpYzogdHJ1ZSwgcmVhZDogRWxlbWVudFJlZiB9KSBjZGtPdmVybGF5T3JpZ2luOiBFbGVtZW50UmVmIHwgbnVsbCA9IG51bGw7XG4gIEBDb250ZW50Q2hpbGRyZW4oTnpTdWJNZW51Q29tcG9uZW50LCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gIGxpc3RPZk56U3ViTWVudUNvbXBvbmVudDogUXVlcnlMaXN0PE56U3ViTWVudUNvbXBvbmVudD4gfCBudWxsID0gbnVsbDtcbiAgQENvbnRlbnRDaGlsZHJlbihOek1lbnVJdGVtRGlyZWN0aXZlLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gIGxpc3RPZk56TWVudUl0ZW1EaXJlY3RpdmU6IFF1ZXJ5TGlzdDxOek1lbnVJdGVtRGlyZWN0aXZlPiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGxldmVsID0gdGhpcy5uelN1Ym1lbnVTZXJ2aWNlLmxldmVsO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcG9zaXRpb24gPSAncmlnaHQnO1xuICB0cmlnZ2VyV2lkdGg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICB0aGVtZTogTnpNZW51VGhlbWVUeXBlID0gJ2xpZ2h0JztcbiAgbW9kZTogTnpNZW51TW9kZVR5cGUgPSAndmVydGljYWwnO1xuICBpbmxpbmVQYWRkaW5nTGVmdDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIG92ZXJsYXlQb3NpdGlvbnMgPSBsaXN0T2ZWZXJ0aWNhbFBvc2l0aW9ucztcbiAgaXNTZWxlY3RlZCA9IGZhbHNlO1xuICBpc0FjdGl2ZSA9IGZhbHNlO1xuICBkaXI6IERpcmVjdGlvbiA9ICdsdHInO1xuXG4gIC8qKiBzZXQgdGhlIHN1Ym1lbnUgaG9zdCBvcGVuIHN0YXR1cyBkaXJlY3RseSAqKi9cbiAgc2V0T3BlblN0YXRlV2l0aG91dERlYm91bmNlKG9wZW46IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLm56U3VibWVudVNlcnZpY2Uuc2V0T3BlblN0YXRlV2l0aG91dERlYm91bmNlKG9wZW4pO1xuICB9XG5cbiAgdG9nZ2xlU3ViTWVudSgpOiB2b2lkIHtcbiAgICB0aGlzLnNldE9wZW5TdGF0ZVdpdGhvdXREZWJvdW5jZSghdGhpcy5uek9wZW4pO1xuICB9XG5cbiAgc2V0TW91c2VFbnRlclN0YXRlKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IHZhbHVlO1xuICAgIGlmICh0aGlzLm1vZGUgIT09ICdpbmxpbmUnKSB7XG4gICAgICB0aGlzLm56U3VibWVudVNlcnZpY2Uuc2V0TW91c2VFbnRlclRpdGxlT3JPdmVybGF5U3RhdGUodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHNldFRyaWdnZXJXaWR0aCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb2RlID09PSAnaG9yaXpvbnRhbCcgJiYgdGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIgJiYgdGhpcy5jZGtPdmVybGF5T3JpZ2luKSB7XG4gICAgICAvKiogVE9ETzogZmFzdCBkb20gKiovXG4gICAgICB0aGlzLnRyaWdnZXJXaWR0aCA9IHRoaXMuY2RrT3ZlcmxheU9yaWdpbiEubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICB9XG4gIH1cblxuICBvblBvc2l0aW9uQ2hhbmdlKHBvc2l0aW9uOiBDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2UpOiB2b2lkIHtcbiAgICBjb25zdCBwbGFjZW1lbnQgPSBnZXRQbGFjZW1lbnROYW1lKHBvc2l0aW9uKTtcbiAgICBpZiAocGxhY2VtZW50ID09PSAncmlnaHRUb3AnIHx8IHBsYWNlbWVudCA9PT0gJ3JpZ2h0Qm90dG9tJyB8fCBwbGFjZW1lbnQgPT09ICdyaWdodCcpIHtcbiAgICAgIHRoaXMucG9zaXRpb24gPSAncmlnaHQnO1xuICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09PSAnbGVmdFRvcCcgfHwgcGxhY2VtZW50ID09PSAnbGVmdEJvdHRvbScgfHwgcGxhY2VtZW50ID09PSAnbGVmdCcpIHtcbiAgICAgIHRoaXMucG9zaXRpb24gPSAnbGVmdCc7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG56TWVudVNlcnZpY2U6IE1lbnVTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwdWJsaWMgbnpTdWJtZW51U2VydmljZTogTnpTdWJtZW51U2VydmljZSxcbiAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICBASW5qZWN0KE56SXNNZW51SW5zaWRlRHJvcERvd25Ub2tlbikgcHVibGljIGlzTWVudUluc2lkZURyb3BEb3duOiBib29sZWFuLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5LFxuICAgIEBIb3N0KCkgQE9wdGlvbmFsKCkgcHVibGljIG5vQW5pbWF0aW9uPzogTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLyoqIHN1Ym1lbnUgdGhlbWUgdXBkYXRlICoqL1xuICAgIHRoaXMubnpNZW51U2VydmljZS50aGVtZSQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSh0aGVtZSA9PiB7XG4gICAgICB0aGlzLnRoZW1lID0gdGhlbWU7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgICAvKiogc3VibWVudSBtb2RlIHVwZGF0ZSAqKi9cbiAgICB0aGlzLm56U3VibWVudVNlcnZpY2UubW9kZSQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZShtb2RlID0+IHtcbiAgICAgIHRoaXMubW9kZSA9IG1vZGU7XG4gICAgICBpZiAobW9kZSA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVBvc2l0aW9ucyA9IGxpc3RPZkhvcml6b250YWxQb3NpdGlvbnM7XG4gICAgICB9IGVsc2UgaWYgKG1vZGUgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5UG9zaXRpb25zID0gbGlzdE9mVmVydGljYWxQb3NpdGlvbnM7XG4gICAgICB9XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgICAvKiogaW5saW5lSW5kZW50IHVwZGF0ZSAqKi9cbiAgICBjb21iaW5lTGF0ZXN0KFt0aGlzLm56U3VibWVudVNlcnZpY2UubW9kZSQsIHRoaXMubnpNZW51U2VydmljZS5pbmxpbmVJbmRlbnQkXSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKFttb2RlLCBpbmxpbmVJbmRlbnRdKSA9PiB7XG4gICAgICAgIHRoaXMuaW5saW5lUGFkZGluZ0xlZnQgPSBtb2RlID09PSAnaW5saW5lJyA/IHRoaXMubGV2ZWwgKiBpbmxpbmVJbmRlbnQgOiBudWxsO1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICAgIC8qKiBjdXJyZW50IHN1Ym1lbnUgb3BlbiBzdGF0dXMgKiovXG4gICAgdGhpcy5uelN1Ym1lbnVTZXJ2aWNlLmlzQ3VycmVudFN1Yk1lbnVPcGVuJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKG9wZW4gPT4ge1xuICAgICAgdGhpcy5pc0FjdGl2ZSA9IG9wZW47XG4gICAgICBpZiAob3BlbiAhPT0gdGhpcy5uek9wZW4pIHtcbiAgICAgICAgdGhpcy5zZXRUcmlnZ2VyV2lkdGgoKTtcbiAgICAgICAgdGhpcy5uek9wZW4gPSBvcGVuO1xuICAgICAgICB0aGlzLm56T3BlbkNoYW5nZS5lbWl0KHRoaXMubnpPcGVuKTtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmRpciA9IHRoaXMuZGlyZWN0aW9uYWxpdHkudmFsdWU7XG4gICAgdGhpcy5kaXJlY3Rpb25hbGl0eS5jaGFuZ2U/LnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKGRpcmVjdGlvbjogRGlyZWN0aW9uKSA9PiB7XG4gICAgICB0aGlzLmRpciA9IGRpcmVjdGlvbjtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0VHJpZ2dlcldpZHRoKCk7XG4gICAgY29uc3QgbGlzdE9mTnpNZW51SXRlbURpcmVjdGl2ZSA9IHRoaXMubGlzdE9mTnpNZW51SXRlbURpcmVjdGl2ZTtcbiAgICBjb25zdCBjaGFuZ2VzID0gbGlzdE9mTnpNZW51SXRlbURpcmVjdGl2ZSEuY2hhbmdlcztcbiAgICBjb25zdCBtZXJnZWRPYnNlcnZhYmxlID0gbWVyZ2UoLi4uW2NoYW5nZXMsIC4uLmxpc3RPZk56TWVudUl0ZW1EaXJlY3RpdmUhLm1hcChtZW51ID0+IG1lbnUuc2VsZWN0ZWQkKV0pO1xuICAgIGNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBzdGFydFdpdGgobGlzdE9mTnpNZW51SXRlbURpcmVjdGl2ZSksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiBtZXJnZWRPYnNlcnZhYmxlKSxcbiAgICAgICAgc3RhcnRXaXRoKHRydWUpLFxuICAgICAgICBtYXAoKCkgPT4gbGlzdE9mTnpNZW51SXRlbURpcmVjdGl2ZSEuc29tZShlID0+IGUubnpTZWxlY3RlZCkpLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoc2VsZWN0ZWQgPT4ge1xuICAgICAgICB0aGlzLmlzU2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56T3BlbiB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpPcGVuKSB7XG4gICAgICB0aGlzLm56U3VibWVudVNlcnZpY2Uuc2V0T3BlblN0YXRlV2l0aG91dERlYm91bmNlKHRoaXMubnpPcGVuKTtcbiAgICAgIHRoaXMuc2V0VHJpZ2dlcldpZHRoKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=