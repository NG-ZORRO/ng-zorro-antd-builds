import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { InjectionToken, Injectable, SkipSelf, Optional, Inject, Directive, Input, ContentChildren, EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, Output, ElementRef, Host, ViewChild, NgModule } from '@angular/core';
import { Subject, BehaviorSubject, merge, combineLatest } from 'rxjs';
import { map, mergeMap, filter, mapTo, auditTime, distinctUntilChanged, takeUntil, startWith, switchMap } from 'rxjs/operators';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i4 from '@angular/router';
import { NavigationEnd, RouterLink, RouterLinkWithHref } from '@angular/router';
import * as i1 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i9 from '@angular/cdk/overlay';
import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { POSITION_MAP, getPlacementName } from 'ng-zorro-antd/core/overlay';
import * as i3$1 from '@angular/cdk/platform';
import { PlatformModule } from '@angular/cdk/platform';
import * as i5 from 'ng-zorro-antd/core/no-animation';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i4$1 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { collapseMotion, zoomBigMotion, slideMotion } from 'ng-zorro-antd/core/animation';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const NzIsMenuInsideDropDownToken = new InjectionToken('NzIsInDropDownMenuToken');
const NzMenuServiceLocalToken = new InjectionToken('NzMenuServiceLocalToken');

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class MenuService {
    constructor() {
        /** all descendant menu click **/
        this.descendantMenuItemClick$ = new Subject();
        /** child menu item click **/
        this.childMenuItemClick$ = new Subject();
        this.theme$ = new BehaviorSubject('light');
        this.mode$ = new BehaviorSubject('vertical');
        this.inlineIndent$ = new BehaviorSubject(24);
        this.isChildSubMenuOpen$ = new BehaviorSubject(false);
    }
    onDescendantMenuItemClick(menu) {
        this.descendantMenuItemClick$.next(menu);
    }
    onChildMenuItemClick(menu) {
        this.childMenuItemClick$.next(menu);
    }
    setMode(mode) {
        this.mode$.next(mode);
    }
    setTheme(theme) {
        this.theme$.next(theme);
    }
    setInlineIndent(indent) {
        this.inlineIndent$.next(indent);
    }
}
MenuService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: MenuService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MenuService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: MenuService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: MenuService, decorators: [{
            type: Injectable
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzSubmenuService {
    constructor(nzHostSubmenuService, nzMenuService, isMenuInsideDropDown) {
        this.nzHostSubmenuService = nzHostSubmenuService;
        this.nzMenuService = nzMenuService;
        this.isMenuInsideDropDown = isMenuInsideDropDown;
        this.mode$ = this.nzMenuService.mode$.pipe(map(mode => {
            if (mode === 'inline') {
                return 'inline';
                /** if inside another submenu, set the mode to vertical **/
            }
            else if (mode === 'vertical' || this.nzHostSubmenuService) {
                return 'vertical';
            }
            else {
                return 'horizontal';
            }
        }));
        this.level = 1;
        this.isCurrentSubMenuOpen$ = new BehaviorSubject(false);
        this.isChildSubMenuOpen$ = new BehaviorSubject(false);
        /** submenu title & overlay mouse enter status **/
        this.isMouseEnterTitleOrOverlay$ = new Subject();
        this.childMenuItemClick$ = new Subject();
        this.destroy$ = new Subject();
        if (this.nzHostSubmenuService) {
            this.level = this.nzHostSubmenuService.level + 1;
        }
        /** close if menu item clicked **/
        const isClosedByMenuItemClick = this.childMenuItemClick$.pipe(mergeMap(() => this.mode$), filter(mode => mode !== 'inline' || this.isMenuInsideDropDown), mapTo(false));
        const isCurrentSubmenuOpen$ = merge(this.isMouseEnterTitleOrOverlay$, isClosedByMenuItemClick);
        /** combine the child submenu status with current submenu status to calculate host submenu open **/
        const isSubMenuOpenWithDebounce$ = combineLatest([this.isChildSubMenuOpen$, isCurrentSubmenuOpen$]).pipe(map(([isChildSubMenuOpen, isCurrentSubmenuOpen]) => isChildSubMenuOpen || isCurrentSubmenuOpen), auditTime(150), distinctUntilChanged(), takeUntil(this.destroy$));
        isSubMenuOpenWithDebounce$.pipe(distinctUntilChanged()).subscribe(data => {
            this.setOpenStateWithoutDebounce(data);
            if (this.nzHostSubmenuService) {
                /** set parent submenu's child submenu open status **/
                this.nzHostSubmenuService.isChildSubMenuOpen$.next(data);
            }
            else {
                this.nzMenuService.isChildSubMenuOpen$.next(data);
            }
        });
    }
    /**
     * menu item inside submenu clicked
     *
     * @param menu
     */
    onChildMenuItemClick(menu) {
        this.childMenuItemClick$.next(menu);
    }
    setOpenStateWithoutDebounce(value) {
        this.isCurrentSubMenuOpen$.next(value);
    }
    setMouseEnterTitleOrOverlayState(value) {
        this.isMouseEnterTitleOrOverlay$.next(value);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzSubmenuService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSubmenuService, deps: [{ token: NzSubmenuService, optional: true, skipSelf: true }, { token: MenuService }, { token: NzIsMenuInsideDropDownToken }], target: i0.ɵɵFactoryTarget.Injectable });
NzSubmenuService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSubmenuService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSubmenuService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: NzSubmenuService, decorators: [{
                    type: SkipSelf
                }, {
                    type: Optional
                }] }, { type: MenuService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NzIsMenuInsideDropDownToken]
                }] }]; } });

class NzMenuItemDirective {
    constructor(nzMenuService, cdr, nzSubmenuService, isMenuInsideDropDown, directionality, routerLink, routerLinkWithHref, router) {
        this.nzMenuService = nzMenuService;
        this.cdr = cdr;
        this.nzSubmenuService = nzSubmenuService;
        this.isMenuInsideDropDown = isMenuInsideDropDown;
        this.directionality = directionality;
        this.routerLink = routerLink;
        this.routerLinkWithHref = routerLinkWithHref;
        this.router = router;
        this.destroy$ = new Subject();
        this.level = this.nzSubmenuService ? this.nzSubmenuService.level + 1 : 1;
        this.selected$ = new Subject();
        this.inlinePaddingLeft = null;
        this.dir = 'ltr';
        this.nzDisabled = false;
        this.nzSelected = false;
        this.nzDanger = false;
        this.nzMatchRouterExact = false;
        this.nzMatchRouter = false;
        if (router) {
            this.router.events.pipe(takeUntil(this.destroy$), filter(e => e instanceof NavigationEnd)).subscribe(() => {
                this.updateRouterActive();
            });
        }
    }
    /** clear all item selected status except this */
    clickMenuItem(e) {
        if (this.nzDisabled) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            this.nzMenuService.onDescendantMenuItemClick(this);
            if (this.nzSubmenuService) {
                /** menu item inside the submenu **/
                this.nzSubmenuService.onChildMenuItemClick(this);
            }
            else {
                /** menu item inside the root menu **/
                this.nzMenuService.onChildMenuItemClick(this);
            }
        }
    }
    setSelectedState(value) {
        this.nzSelected = value;
        this.selected$.next(value);
    }
    updateRouterActive() {
        if (!this.listOfRouterLink ||
            !this.listOfRouterLinkWithHref ||
            !this.router ||
            !this.router.navigated ||
            !this.nzMatchRouter) {
            return;
        }
        Promise.resolve().then(() => {
            const hasActiveLinks = this.hasActiveLinks();
            if (this.nzSelected !== hasActiveLinks) {
                this.nzSelected = hasActiveLinks;
                this.setSelectedState(this.nzSelected);
                this.cdr.markForCheck();
            }
        });
    }
    hasActiveLinks() {
        const isActiveCheckFn = this.isLinkActive(this.router);
        return ((this.routerLink && isActiveCheckFn(this.routerLink)) ||
            (this.routerLinkWithHref && isActiveCheckFn(this.routerLinkWithHref)) ||
            this.listOfRouterLink.some(isActiveCheckFn) ||
            this.listOfRouterLinkWithHref.some(isActiveCheckFn));
    }
    isLinkActive(router) {
        return (link) => router.isActive(link.urlTree || '', {
            paths: this.nzMatchRouterExact ? 'exact' : 'subset',
            queryParams: this.nzMatchRouterExact ? 'exact' : 'subset',
            fragment: 'ignored',
            matrixParams: 'ignored'
        });
    }
    ngOnInit() {
        /** store origin padding in padding */
        combineLatest([this.nzMenuService.mode$, this.nzMenuService.inlineIndent$])
            .pipe(takeUntil(this.destroy$))
            .subscribe(([mode, inlineIndent]) => {
            this.inlinePaddingLeft = mode === 'inline' ? this.level * inlineIndent : null;
        });
        this.dir = this.directionality.value;
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
        });
    }
    ngAfterContentInit() {
        this.listOfRouterLink.changes.pipe(takeUntil(this.destroy$)).subscribe(() => this.updateRouterActive());
        this.listOfRouterLinkWithHref.changes.pipe(takeUntil(this.destroy$)).subscribe(() => this.updateRouterActive());
        this.updateRouterActive();
    }
    ngOnChanges(changes) {
        if (changes.nzSelected) {
            this.setSelectedState(this.nzSelected);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzMenuItemDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMenuItemDirective, deps: [{ token: MenuService }, { token: i0.ChangeDetectorRef }, { token: NzSubmenuService, optional: true }, { token: NzIsMenuInsideDropDownToken }, { token: i1.Directionality, optional: true }, { token: i4.RouterLink, optional: true }, { token: i4.RouterLinkWithHref, optional: true }, { token: i4.Router, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NzMenuItemDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzMenuItemDirective, selector: "[nz-menu-item]", inputs: { nzPaddingLeft: "nzPaddingLeft", nzDisabled: "nzDisabled", nzSelected: "nzSelected", nzDanger: "nzDanger", nzMatchRouterExact: "nzMatchRouterExact", nzMatchRouter: "nzMatchRouter" }, host: { listeners: { "click": "clickMenuItem($event)" }, properties: { "class.ant-dropdown-menu-item": "isMenuInsideDropDown", "class.ant-dropdown-menu-item-selected": "isMenuInsideDropDown && nzSelected", "class.ant-dropdown-menu-item-danger": "isMenuInsideDropDown && nzDanger", "class.ant-dropdown-menu-item-disabled": "isMenuInsideDropDown && nzDisabled", "class.ant-menu-item": "!isMenuInsideDropDown", "class.ant-menu-item-selected": "!isMenuInsideDropDown && nzSelected", "class.ant-menu-item-danger": "!isMenuInsideDropDown && nzDanger", "class.ant-menu-item-disabled": "!isMenuInsideDropDown && nzDisabled", "style.paddingLeft.px": "dir === 'rtl' ? null : nzPaddingLeft || inlinePaddingLeft", "style.paddingRight.px": "dir === 'rtl' ? nzPaddingLeft || inlinePaddingLeft : null" } }, queries: [{ propertyName: "listOfRouterLink", predicate: RouterLink, descendants: true }, { propertyName: "listOfRouterLinkWithHref", predicate: RouterLinkWithHref, descendants: true }], exportAs: ["nzMenuItem"], usesOnChanges: true, ngImport: i0 });
__decorate([
    InputBoolean()
], NzMenuItemDirective.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean()
], NzMenuItemDirective.prototype, "nzSelected", void 0);
__decorate([
    InputBoolean()
], NzMenuItemDirective.prototype, "nzDanger", void 0);
__decorate([
    InputBoolean()
], NzMenuItemDirective.prototype, "nzMatchRouterExact", void 0);
__decorate([
    InputBoolean()
], NzMenuItemDirective.prototype, "nzMatchRouter", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMenuItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-menu-item]',
                    exportAs: 'nzMenuItem',
                    host: {
                        '[class.ant-dropdown-menu-item]': `isMenuInsideDropDown`,
                        '[class.ant-dropdown-menu-item-selected]': `isMenuInsideDropDown && nzSelected`,
                        '[class.ant-dropdown-menu-item-danger]': `isMenuInsideDropDown && nzDanger`,
                        '[class.ant-dropdown-menu-item-disabled]': `isMenuInsideDropDown && nzDisabled`,
                        '[class.ant-menu-item]': `!isMenuInsideDropDown`,
                        '[class.ant-menu-item-selected]': `!isMenuInsideDropDown && nzSelected`,
                        '[class.ant-menu-item-danger]': `!isMenuInsideDropDown && nzDanger`,
                        '[class.ant-menu-item-disabled]': `!isMenuInsideDropDown && nzDisabled`,
                        '[style.paddingLeft.px]': `dir === 'rtl' ? null : nzPaddingLeft || inlinePaddingLeft`,
                        '[style.paddingRight.px]': `dir === 'rtl' ? nzPaddingLeft || inlinePaddingLeft : null`,
                        '(click)': 'clickMenuItem($event)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: MenuService }, { type: i0.ChangeDetectorRef }, { type: NzSubmenuService, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NzIsMenuInsideDropDownToken]
                }] }, { type: i1.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i4.RouterLink, decorators: [{
                    type: Optional
                }] }, { type: i4.RouterLinkWithHref, decorators: [{
                    type: Optional
                }] }, { type: i4.Router, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzPaddingLeft: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzSelected: [{
                type: Input
            }], nzDanger: [{
                type: Input
            }], nzMatchRouterExact: [{
                type: Input
            }], nzMatchRouter: [{
                type: Input
            }], listOfRouterLink: [{
                type: ContentChildren,
                args: [RouterLink, { descendants: true }]
            }], listOfRouterLinkWithHref: [{
                type: ContentChildren,
                args: [RouterLinkWithHref, { descendants: true }]
            }] } });

class NzSubMenuTitleComponent {
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
  `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i4$1.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i2.NgSwitchDefault, selector: "[ngSwitchDefault]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
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

class NzSubmenuInlineChildComponent {
    constructor(elementRef, renderer, directionality) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.directionality = directionality;
        this.templateOutlet = null;
        this.menuClass = '';
        this.mode = 'vertical';
        this.nzOpen = false;
        this.listOfCacheClassName = [];
        this.expandState = 'collapsed';
        this.dir = 'ltr';
        this.destroy$ = new Subject();
    }
    calcMotionState() {
        if (this.nzOpen) {
            this.expandState = 'expanded';
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
        const { mode, nzOpen, menuClass } = changes;
        if (mode || nzOpen) {
            this.calcMotionState();
        }
        if (menuClass) {
            if (this.listOfCacheClassName.length) {
                this.listOfCacheClassName
                    .filter(item => !!item)
                    .forEach(className => {
                    this.renderer.removeClass(this.elementRef.nativeElement, className);
                });
            }
            if (this.menuClass) {
                this.listOfCacheClassName = this.menuClass.split(' ');
                this.listOfCacheClassName
                    .filter(item => !!item)
                    .forEach(className => {
                    this.renderer.addClass(this.elementRef.nativeElement, className);
                });
            }
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzSubmenuInlineChildComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSubmenuInlineChildComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzSubmenuInlineChildComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSubmenuInlineChildComponent, selector: "[nz-submenu-inline-child]", inputs: { templateOutlet: "templateOutlet", menuClass: "menuClass", mode: "mode", nzOpen: "nzOpen" }, host: { properties: { "class.ant-menu-rtl": "dir === 'rtl'", "@collapseMotion": "expandState" }, classAttribute: "ant-menu ant-menu-inline ant-menu-sub" }, exportAs: ["nzSubmenuInlineChild"], usesOnChanges: true, ngImport: i0, template: ` <ng-template [ngTemplateOutlet]="templateOutlet"></ng-template> `, isInline: true, directives: [{ type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [collapseMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSubmenuInlineChildComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[nz-submenu-inline-child]',
                    animations: [collapseMotion],
                    exportAs: 'nzSubmenuInlineChild',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: ` <ng-template [ngTemplateOutlet]="templateOutlet"></ng-template> `,
                    host: {
                        class: 'ant-menu ant-menu-inline ant-menu-sub',
                        '[class.ant-menu-rtl]': `dir === 'rtl'`,
                        '[@collapseMotion]': 'expandState'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { templateOutlet: [{
                type: Input
            }], menuClass: [{
                type: Input
            }], mode: [{
                type: Input
            }], nzOpen: [{
                type: Input
            }] } });

class NzSubmenuNoneInlineChildComponent {
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

const listOfVerticalPositions = [
    POSITION_MAP.rightTop,
    POSITION_MAP.right,
    POSITION_MAP.rightBottom,
    POSITION_MAP.leftTop,
    POSITION_MAP.left,
    POSITION_MAP.leftBottom
];
const listOfHorizontalPositions = [POSITION_MAP.bottomLeft];
class NzSubMenuComponent {
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
NzSubMenuComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSubMenuComponent, deps: [{ token: MenuService }, { token: i0.ChangeDetectorRef }, { token: NzSubmenuService }, { token: i3$1.Platform }, { token: NzIsMenuInsideDropDownToken }, { token: i1.Directionality, optional: true }, { token: i5.NzNoAnimationDirective, host: true, optional: true }], target: i0.ɵɵFactoryTarget.Component });
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
  `, isInline: true, components: [{ type: NzSubMenuTitleComponent, selector: "[nz-submenu-title]", inputs: ["nzIcon", "nzTitle", "isMenuInsideDropDown", "nzDisabled", "paddingLeft", "mode"], outputs: ["toggleSubMenu", "subMenuMouseState"], exportAs: ["nzSubmenuTitle"] }, { type: NzSubmenuInlineChildComponent, selector: "[nz-submenu-inline-child]", inputs: ["templateOutlet", "menuClass", "mode", "nzOpen"], exportAs: ["nzSubmenuInlineChild"] }, { type: NzSubmenuNoneInlineChildComponent, selector: "[nz-submenu-none-inline-child]", inputs: ["menuClass", "theme", "templateOutlet", "isMenuInsideDropDown", "mode", "position", "nzDisabled", "nzOpen"], outputs: ["subMenuMouseState"], exportAs: ["nzSubmenuNoneInlineChild"] }], directives: [{ type: i9.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NzNoAnimationDirective, selector: "[nzNoAnimation]", inputs: ["nzNoAnimation"], exportAs: ["nzNoAnimation"] }, { type: i9.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
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
        }], ctorParameters: function () { return [{ type: MenuService }, { type: i0.ChangeDetectorRef }, { type: NzSubmenuService }, { type: i3$1.Platform }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NzIsMenuInsideDropDownToken]
                }] }, { type: i1.Directionality, decorators: [{
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

function MenuServiceFactory(serviceInsideDropDown, serviceOutsideDropDown) {
    return serviceInsideDropDown ? serviceInsideDropDown : serviceOutsideDropDown;
}
function MenuDropDownTokenFactory(isMenuInsideDropDownToken) {
    return isMenuInsideDropDownToken ? isMenuInsideDropDownToken : false;
}
class NzMenuDirective {
    constructor(nzMenuService, isMenuInsideDropDown, cdr, directionality) {
        this.nzMenuService = nzMenuService;
        this.isMenuInsideDropDown = isMenuInsideDropDown;
        this.cdr = cdr;
        this.directionality = directionality;
        this.nzInlineIndent = 24;
        this.nzTheme = 'light';
        this.nzMode = 'vertical';
        this.nzInlineCollapsed = false;
        this.nzSelectable = !this.isMenuInsideDropDown;
        this.nzClick = new EventEmitter();
        this.actualMode = 'vertical';
        this.dir = 'ltr';
        this.inlineCollapsed$ = new BehaviorSubject(this.nzInlineCollapsed);
        this.mode$ = new BehaviorSubject(this.nzMode);
        this.destroy$ = new Subject();
        this.listOfOpenedNzSubMenuComponent = [];
    }
    setInlineCollapsed(inlineCollapsed) {
        this.nzInlineCollapsed = inlineCollapsed;
        this.inlineCollapsed$.next(inlineCollapsed);
    }
    updateInlineCollapse() {
        if (this.listOfNzMenuItemDirective) {
            if (this.nzInlineCollapsed) {
                this.listOfOpenedNzSubMenuComponent = this.listOfNzSubMenuComponent.filter(submenu => submenu.nzOpen);
                this.listOfNzSubMenuComponent.forEach(submenu => submenu.setOpenStateWithoutDebounce(false));
            }
            else {
                this.listOfOpenedNzSubMenuComponent.forEach(submenu => submenu.setOpenStateWithoutDebounce(true));
                this.listOfOpenedNzSubMenuComponent = [];
            }
        }
    }
    ngOnInit() {
        combineLatest([this.inlineCollapsed$, this.mode$])
            .pipe(takeUntil(this.destroy$))
            .subscribe(([inlineCollapsed, mode]) => {
            this.actualMode = inlineCollapsed ? 'vertical' : mode;
            this.nzMenuService.setMode(this.actualMode);
            this.cdr.markForCheck();
        });
        this.nzMenuService.descendantMenuItemClick$.pipe(takeUntil(this.destroy$)).subscribe(menu => {
            this.nzClick.emit(menu);
            if (this.nzSelectable && !menu.nzMatchRouter) {
                this.listOfNzMenuItemDirective.forEach(item => item.setSelectedState(item === menu));
            }
        });
        this.dir = this.directionality.value;
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.nzMenuService.setMode(this.actualMode);
            this.cdr.markForCheck();
        });
    }
    ngAfterContentInit() {
        this.inlineCollapsed$.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.updateInlineCollapse();
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        const { nzInlineCollapsed, nzInlineIndent, nzTheme, nzMode } = changes;
        if (nzInlineCollapsed) {
            this.inlineCollapsed$.next(this.nzInlineCollapsed);
        }
        if (nzInlineIndent) {
            this.nzMenuService.setInlineIndent(this.nzInlineIndent);
        }
        if (nzTheme) {
            this.nzMenuService.setTheme(this.nzTheme);
        }
        if (nzMode) {
            this.mode$.next(this.nzMode);
            if (!changes.nzMode.isFirstChange() && this.listOfNzSubMenuComponent) {
                this.listOfNzSubMenuComponent.forEach(submenu => submenu.setOpenStateWithoutDebounce(false));
            }
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzMenuDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMenuDirective, deps: [{ token: MenuService }, { token: NzIsMenuInsideDropDownToken }, { token: i0.ChangeDetectorRef }, { token: i1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NzMenuDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzMenuDirective, selector: "[nz-menu]", inputs: { nzInlineIndent: "nzInlineIndent", nzTheme: "nzTheme", nzMode: "nzMode", nzInlineCollapsed: "nzInlineCollapsed", nzSelectable: "nzSelectable" }, outputs: { nzClick: "nzClick" }, host: { properties: { "class.ant-dropdown-menu": "isMenuInsideDropDown", "class.ant-dropdown-menu-root": "isMenuInsideDropDown", "class.ant-dropdown-menu-light": "isMenuInsideDropDown && nzTheme === 'light'", "class.ant-dropdown-menu-dark": "isMenuInsideDropDown && nzTheme === 'dark'", "class.ant-dropdown-menu-vertical": "isMenuInsideDropDown && actualMode === 'vertical'", "class.ant-dropdown-menu-horizontal": "isMenuInsideDropDown && actualMode === 'horizontal'", "class.ant-dropdown-menu-inline": "isMenuInsideDropDown && actualMode === 'inline'", "class.ant-dropdown-menu-inline-collapsed": "isMenuInsideDropDown && nzInlineCollapsed", "class.ant-menu": "!isMenuInsideDropDown", "class.ant-menu-root": "!isMenuInsideDropDown", "class.ant-menu-light": "!isMenuInsideDropDown && nzTheme === 'light'", "class.ant-menu-dark": "!isMenuInsideDropDown && nzTheme === 'dark'", "class.ant-menu-vertical": "!isMenuInsideDropDown && actualMode === 'vertical'", "class.ant-menu-horizontal": "!isMenuInsideDropDown && actualMode === 'horizontal'", "class.ant-menu-inline": "!isMenuInsideDropDown && actualMode === 'inline'", "class.ant-menu-inline-collapsed": "!isMenuInsideDropDown && nzInlineCollapsed", "class.ant-menu-rtl": "dir === 'rtl'" } }, providers: [
        {
            provide: NzMenuServiceLocalToken,
            useClass: MenuService
        },
        /** use the top level service **/
        {
            provide: MenuService,
            useFactory: MenuServiceFactory,
            deps: [[new SkipSelf(), new Optional(), MenuService], NzMenuServiceLocalToken]
        },
        /** check if menu inside dropdown-menu component **/
        {
            provide: NzIsMenuInsideDropDownToken,
            useFactory: MenuDropDownTokenFactory,
            deps: [[new SkipSelf(), new Optional(), NzIsMenuInsideDropDownToken]]
        }
    ], queries: [{ propertyName: "listOfNzMenuItemDirective", predicate: NzMenuItemDirective, descendants: true }, { propertyName: "listOfNzSubMenuComponent", predicate: NzSubMenuComponent, descendants: true }], exportAs: ["nzMenu"], usesOnChanges: true, ngImport: i0 });
__decorate([
    InputBoolean()
], NzMenuDirective.prototype, "nzInlineCollapsed", void 0);
__decorate([
    InputBoolean()
], NzMenuDirective.prototype, "nzSelectable", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMenuDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-menu]',
                    exportAs: 'nzMenu',
                    providers: [
                        {
                            provide: NzMenuServiceLocalToken,
                            useClass: MenuService
                        },
                        /** use the top level service **/
                        {
                            provide: MenuService,
                            useFactory: MenuServiceFactory,
                            deps: [[new SkipSelf(), new Optional(), MenuService], NzMenuServiceLocalToken]
                        },
                        /** check if menu inside dropdown-menu component **/
                        {
                            provide: NzIsMenuInsideDropDownToken,
                            useFactory: MenuDropDownTokenFactory,
                            deps: [[new SkipSelf(), new Optional(), NzIsMenuInsideDropDownToken]]
                        }
                    ],
                    host: {
                        '[class.ant-dropdown-menu]': `isMenuInsideDropDown`,
                        '[class.ant-dropdown-menu-root]': `isMenuInsideDropDown`,
                        '[class.ant-dropdown-menu-light]': `isMenuInsideDropDown && nzTheme === 'light'`,
                        '[class.ant-dropdown-menu-dark]': `isMenuInsideDropDown && nzTheme === 'dark'`,
                        '[class.ant-dropdown-menu-vertical]': `isMenuInsideDropDown && actualMode === 'vertical'`,
                        '[class.ant-dropdown-menu-horizontal]': `isMenuInsideDropDown && actualMode === 'horizontal'`,
                        '[class.ant-dropdown-menu-inline]': `isMenuInsideDropDown && actualMode === 'inline'`,
                        '[class.ant-dropdown-menu-inline-collapsed]': `isMenuInsideDropDown && nzInlineCollapsed`,
                        '[class.ant-menu]': `!isMenuInsideDropDown`,
                        '[class.ant-menu-root]': `!isMenuInsideDropDown`,
                        '[class.ant-menu-light]': `!isMenuInsideDropDown && nzTheme === 'light'`,
                        '[class.ant-menu-dark]': `!isMenuInsideDropDown && nzTheme === 'dark'`,
                        '[class.ant-menu-vertical]': `!isMenuInsideDropDown && actualMode === 'vertical'`,
                        '[class.ant-menu-horizontal]': `!isMenuInsideDropDown && actualMode === 'horizontal'`,
                        '[class.ant-menu-inline]': `!isMenuInsideDropDown && actualMode === 'inline'`,
                        '[class.ant-menu-inline-collapsed]': `!isMenuInsideDropDown && nzInlineCollapsed`,
                        '[class.ant-menu-rtl]': `dir === 'rtl'`
                    }
                }]
        }], ctorParameters: function () { return [{ type: MenuService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NzIsMenuInsideDropDownToken]
                }] }, { type: i0.ChangeDetectorRef }, { type: i1.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { listOfNzMenuItemDirective: [{
                type: ContentChildren,
                args: [NzMenuItemDirective, { descendants: true }]
            }], listOfNzSubMenuComponent: [{
                type: ContentChildren,
                args: [NzSubMenuComponent, { descendants: true }]
            }], nzInlineIndent: [{
                type: Input
            }], nzTheme: [{
                type: Input
            }], nzMode: [{
                type: Input
            }], nzInlineCollapsed: [{
                type: Input
            }], nzSelectable: [{
                type: Input
            }], nzClick: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function MenuGroupFactory(isMenuInsideDropDownToken) {
    return isMenuInsideDropDownToken ? isMenuInsideDropDownToken : false;
}
class NzMenuGroupComponent {
    constructor(elementRef, renderer, isMenuInsideDropDown) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.isMenuInsideDropDown = isMenuInsideDropDown;
        const className = this.isMenuInsideDropDown ? 'ant-dropdown-menu-item-group' : 'ant-menu-item-group';
        this.renderer.addClass(elementRef.nativeElement, className);
    }
    ngAfterViewInit() {
        const ulElement = this.titleElement.nativeElement.nextElementSibling;
        if (ulElement) {
            /** add classname to ul **/
            const className = this.isMenuInsideDropDown ? 'ant-dropdown-menu-item-group-list' : 'ant-menu-item-group-list';
            this.renderer.addClass(ulElement, className);
        }
    }
}
NzMenuGroupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMenuGroupComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: NzIsMenuInsideDropDownToken }], target: i0.ɵɵFactoryTarget.Component });
NzMenuGroupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzMenuGroupComponent, selector: "[nz-menu-group]", inputs: { nzTitle: "nzTitle" }, providers: [
        /** check if menu inside dropdown-menu component **/
        {
            provide: NzIsMenuInsideDropDownToken,
            useFactory: MenuGroupFactory,
            deps: [[new SkipSelf(), new Optional(), NzIsMenuInsideDropDownToken]]
        }
    ], viewQueries: [{ propertyName: "titleElement", first: true, predicate: ["titleElement"], descendants: true }], exportAs: ["nzMenuGroup"], ngImport: i0, template: `
    <div
      [class.ant-menu-item-group-title]="!isMenuInsideDropDown"
      [class.ant-dropdown-menu-item-group-title]="isMenuInsideDropDown"
      #titleElement
    >
      <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      <ng-content select="[title]" *ngIf="!nzTitle"></ng-content>
    </div>
    <ng-content></ng-content>
  `, isInline: true, directives: [{ type: i4$1.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMenuGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[nz-menu-group]',
                    exportAs: 'nzMenuGroup',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        /** check if menu inside dropdown-menu component **/
                        {
                            provide: NzIsMenuInsideDropDownToken,
                            useFactory: MenuGroupFactory,
                            deps: [[new SkipSelf(), new Optional(), NzIsMenuInsideDropDownToken]]
                        }
                    ],
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <div
      [class.ant-menu-item-group-title]="!isMenuInsideDropDown"
      [class.ant-dropdown-menu-item-group-title]="isMenuInsideDropDown"
      #titleElement
    >
      <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      <ng-content select="[title]" *ngIf="!nzTitle"></ng-content>
    </div>
    <ng-content></ng-content>
  `,
                    preserveWhitespaces: false
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NzIsMenuInsideDropDownToken]
                }] }]; }, propDecorators: { nzTitle: [{
                type: Input
            }], titleElement: [{
                type: ViewChild,
                args: ['titleElement']
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzMenuDividerDirective {
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.renderer.addClass(elementRef.nativeElement, 'ant-dropdown-menu-item-divider');
    }
}
NzMenuDividerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMenuDividerDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
NzMenuDividerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzMenuDividerDirective, selector: "[nz-menu-divider]", exportAs: ["nzMenuDivider"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMenuDividerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-menu-divider]',
                    exportAs: 'nzMenuDivider'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzMenuModule {
}
NzMenuModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzMenuModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMenuModule, declarations: [NzMenuDirective,
        NzMenuItemDirective,
        NzSubMenuComponent,
        NzMenuDividerDirective,
        NzMenuGroupComponent,
        NzSubMenuTitleComponent,
        NzSubmenuInlineChildComponent,
        NzSubmenuNoneInlineChildComponent], imports: [BidiModule, CommonModule, PlatformModule, OverlayModule, NzIconModule, NzNoAnimationModule, NzOutletModule], exports: [NzMenuDirective, NzMenuItemDirective, NzSubMenuComponent, NzMenuDividerDirective, NzMenuGroupComponent] });
NzMenuModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMenuModule, imports: [[BidiModule, CommonModule, PlatformModule, OverlayModule, NzIconModule, NzNoAnimationModule, NzOutletModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BidiModule, CommonModule, PlatformModule, OverlayModule, NzIconModule, NzNoAnimationModule, NzOutletModule],
                    declarations: [
                        NzMenuDirective,
                        NzMenuItemDirective,
                        NzSubMenuComponent,
                        NzMenuDividerDirective,
                        NzMenuGroupComponent,
                        NzSubMenuTitleComponent,
                        NzSubmenuInlineChildComponent,
                        NzSubmenuNoneInlineChildComponent
                    ],
                    exports: [NzMenuDirective, NzMenuItemDirective, NzSubMenuComponent, NzMenuDividerDirective, NzMenuGroupComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MenuDropDownTokenFactory, MenuGroupFactory, MenuService, MenuServiceFactory, NzIsMenuInsideDropDownToken, NzMenuDirective, NzMenuDividerDirective, NzMenuGroupComponent, NzMenuItemDirective, NzMenuModule, NzMenuServiceLocalToken, NzSubMenuComponent, NzSubMenuTitleComponent, NzSubmenuInlineChildComponent, NzSubmenuNoneInlineChildComponent, NzSubmenuService };
//# sourceMappingURL=ng-zorro-antd-menu.mjs.map
