import { __decorate } from "tslib";
import { ContentChildren, Directive, Inject, Input, Optional } from '@angular/core';
import { NavigationEnd, RouterLink, RouterLinkWithHref } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzIsMenuInsideDropDownToken } from './menu.token';
import * as i0 from "@angular/core";
import * as i1 from "./menu.service";
import * as i2 from "./submenu.service";
import * as i3 from "@angular/cdk/bidi";
import * as i4 from "@angular/router";
export class NzMenuItemDirective {
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
NzMenuItemDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMenuItemDirective, deps: [{ token: i1.MenuService }, { token: i0.ChangeDetectorRef }, { token: i2.NzSubmenuService, optional: true }, { token: NzIsMenuInsideDropDownToken }, { token: i3.Directionality, optional: true }, { token: i4.RouterLink, optional: true }, { token: i4.RouterLinkWithHref, optional: true }, { token: i4.Router, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
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
        }], ctorParameters: function () { return [{ type: i1.MenuService }, { type: i0.ChangeDetectorRef }, { type: i2.NzSubmenuService, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NzIsMenuInsideDropDownToken]
                }] }, { type: i3.Directionality, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1pdGVtLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvbWVudS9tZW51LWl0ZW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFNQSxPQUFPLEVBR0wsZUFBZSxFQUNmLFNBQVMsRUFDVCxNQUFNLEVBQ04sS0FBSyxFQUlMLFFBQVEsRUFHVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFVLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hGLE9BQU8sRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBR3ZELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7O0FBb0IzRCxNQUFNLE9BQU8sbUJBQW1CO0lBbUY5QixZQUNVLGFBQTBCLEVBQzFCLEdBQXNCLEVBQ1YsZ0JBQWtDLEVBQ1Ysb0JBQTZCLEVBQ3JELGNBQThCLEVBQzlCLFVBQXVCLEVBQ3ZCLGtCQUF1QyxFQUN2QyxNQUFlO1FBUDNCLGtCQUFhLEdBQWIsYUFBYSxDQUFhO1FBQzFCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ1YscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNWLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBUztRQUNyRCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZUFBVSxHQUFWLFVBQVUsQ0FBYTtRQUN2Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO1FBQ3ZDLFdBQU0sR0FBTixNQUFNLENBQVM7UUFwRjdCLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ2pDLFVBQUssR0FBRyxJQUFJLENB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bUI7a0JBakIvQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSxZQUFZO29CQUN0QixJQUFJLEVBQUU7d0JBQ0osZ0NBQWdDLEVBQUUsc0JBQXNCO3dCQUN4RCx5Q0FBeUMsRUFBRSxvQ0FBb0M7d0JBQy9FLHVDQUF1QyxFQUFFLGtDQUFrQzt3QkFDM0UseUNBQXlDLEVBQUUsb0NBQW9DO3dCQUMvRSx1QkFBdUIsRUFBRSx1QkFBdUI7d0JBQ2hELGdDQUFnQyxFQUFFLHFDQUFxQzt3QkFDdkUsOEJBQThCLEVBQUUsbUNBQW1DO3dCQUNuRSxnQ0FBZ0MsRUFBRSxxQ0FBcUM7d0JBQ3ZFLHdCQUF3QixFQUFFLDJEQUEyRDt3QkFDckYseUJBQXlCLEVBQUUsMkRBQTJEO3dCQUN0RixTQUFTLEVBQUUsdUJBQXVCO3FCQUNuQztpQkFDRjs7MEJBdUZJLFFBQVE7OzBCQUNSLE1BQU07MkJBQUMsMkJBQTJCOzswQkFDbEMsUUFBUTs7MEJBQ1IsUUFBUTs7MEJBQ1IsUUFBUTs7MEJBQ1IsUUFBUTs0Q0EvRUYsYUFBYTtzQkFBckIsS0FBSztnQkFDbUIsVUFBVTtzQkFBbEMsS0FBSztnQkFDbUIsVUFBVTtzQkFBbEMsS0FBSztnQkFDbUIsUUFBUTtzQkFBaEMsS0FBSztnQkFDbUIsa0JBQWtCO3NCQUExQyxLQUFLO2dCQUNtQixhQUFhO3NCQUFyQyxLQUFLO2dCQUM4QyxnQkFBZ0I7c0JBQW5FLGVBQWU7dUJBQUMsVUFBVSxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtnQkFDVSx3QkFBd0I7c0JBQW5GLGVBQWU7dUJBQUMsa0JBQWtCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aW9uLCBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFF1ZXJ5TGlzdCxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdmlnYXRpb25FbmQsIFJvdXRlciwgUm91dGVyTGluaywgUm91dGVyTGlua1dpdGhIcmVmIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5pbXBvcnQgeyBNZW51U2VydmljZSB9IGZyb20gJy4vbWVudS5zZXJ2aWNlJztcbmltcG9ydCB7IE56SXNNZW51SW5zaWRlRHJvcERvd25Ub2tlbiB9IGZyb20gJy4vbWVudS50b2tlbic7XG5pbXBvcnQgeyBOelN1Ym1lbnVTZXJ2aWNlIH0gZnJvbSAnLi9zdWJtZW51LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbnotbWVudS1pdGVtXScsXG4gIGV4cG9ydEFzOiAnbnpNZW51SXRlbScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1kcm9wZG93bi1tZW51LWl0ZW1dJzogYGlzTWVudUluc2lkZURyb3BEb3duYCxcbiAgICAnW2NsYXNzLmFudC1kcm9wZG93bi1tZW51LWl0ZW0tc2VsZWN0ZWRdJzogYGlzTWVudUluc2lkZURyb3BEb3duICYmIG56U2VsZWN0ZWRgLFxuICAgICdbY2xhc3MuYW50LWRyb3Bkb3duLW1lbnUtaXRlbS1kYW5nZXJdJzogYGlzTWVudUluc2lkZURyb3BEb3duICYmIG56RGFuZ2VyYCxcbiAgICAnW2NsYXNzLmFudC1kcm9wZG93bi1tZW51LWl0ZW0tZGlzYWJsZWRdJzogYGlzTWVudUluc2lkZURyb3BEb3duICYmIG56RGlzYWJsZWRgLFxuICAgICdbY2xhc3MuYW50LW1lbnUtaXRlbV0nOiBgIWlzTWVudUluc2lkZURyb3BEb3duYCxcbiAgICAnW2NsYXNzLmFudC1tZW51LWl0ZW0tc2VsZWN0ZWRdJzogYCFpc01lbnVJbnNpZGVEcm9wRG93biAmJiBuelNlbGVjdGVkYCxcbiAgICAnW2NsYXNzLmFudC1tZW51LWl0ZW0tZGFuZ2VyXSc6IGAhaXNNZW51SW5zaWRlRHJvcERvd24gJiYgbnpEYW5nZXJgLFxuICAgICdbY2xhc3MuYW50LW1lbnUtaXRlbS1kaXNhYmxlZF0nOiBgIWlzTWVudUluc2lkZURyb3BEb3duICYmIG56RGlzYWJsZWRgLFxuICAgICdbc3R5bGUucGFkZGluZ0xlZnQucHhdJzogYGRpciA9PT0gJ3J0bCcgPyBudWxsIDogbnpQYWRkaW5nTGVmdCB8fCBpbmxpbmVQYWRkaW5nTGVmdGAsXG4gICAgJ1tzdHlsZS5wYWRkaW5nUmlnaHQucHhdJzogYGRpciA9PT0gJ3J0bCcgPyBuelBhZGRpbmdMZWZ0IHx8IGlubGluZVBhZGRpbmdMZWZ0IDogbnVsbGAsXG4gICAgJyhjbGljayknOiAnY2xpY2tNZW51SXRlbSgkZXZlbnQpJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56TWVudUl0ZW1EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBBZnRlckNvbnRlbnRJbml0IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2VsZWN0ZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RGFuZ2VyOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uek1hdGNoUm91dGVyRXhhY3Q6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256TWF0Y2hSb3V0ZXI6IEJvb2xlYW5JbnB1dDtcblxuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcbiAgbGV2ZWwgPSB0aGlzLm56U3VibWVudVNlcnZpY2UgPyB0aGlzLm56U3VibWVudVNlcnZpY2UubGV2ZWwgKyAxIDogMTtcbiAgc2VsZWN0ZWQkID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcbiAgaW5saW5lUGFkZGluZ0xlZnQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBkaXI6IERpcmVjdGlvbiA9ICdsdHInO1xuICBASW5wdXQoKSBuelBhZGRpbmdMZWZ0PzogbnVtYmVyO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpEaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpTZWxlY3RlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpEYW5nZXIgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56TWF0Y2hSb3V0ZXJFeGFjdCA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpNYXRjaFJvdXRlciA9IGZhbHNlO1xuICBAQ29udGVudENoaWxkcmVuKFJvdXRlckxpbmssIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgbGlzdE9mUm91dGVyTGluayE6IFF1ZXJ5TGlzdDxSb3V0ZXJMaW5rPjtcbiAgQENvbnRlbnRDaGlsZHJlbihSb3V0ZXJMaW5rV2l0aEhyZWYsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgbGlzdE9mUm91dGVyTGlua1dpdGhIcmVmITogUXVlcnlMaXN0PFJvdXRlckxpbmtXaXRoSHJlZj47XG5cbiAgLyoqIGNsZWFyIGFsbCBpdGVtIHNlbGVjdGVkIHN0YXR1cyBleGNlcHQgdGhpcyAqL1xuICBjbGlja01lbnVJdGVtKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uekRpc2FibGVkKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm56TWVudVNlcnZpY2Uub25EZXNjZW5kYW50TWVudUl0ZW1DbGljayh0aGlzKTtcbiAgICAgIGlmICh0aGlzLm56U3VibWVudVNlcnZpY2UpIHtcbiAgICAgICAgLyoqIG1lbnUgaXRlbSBpbnNpZGUgdGhlIHN1Ym1lbnUgKiovXG4gICAgICAgIHRoaXMubnpTdWJtZW51U2VydmljZS5vbkNoaWxkTWVudUl0ZW1DbGljayh0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKiBtZW51IGl0ZW0gaW5zaWRlIHRoZSByb290IG1lbnUgKiovXG4gICAgICAgIHRoaXMubnpNZW51U2VydmljZS5vbkNoaWxkTWVudUl0ZW1DbGljayh0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRTZWxlY3RlZFN0YXRlKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5uelNlbGVjdGVkID0gdmFsdWU7XG4gICAgdGhpcy5zZWxlY3RlZCQubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVJvdXRlckFjdGl2ZSgpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICAhdGhpcy5saXN0T2ZSb3V0ZXJMaW5rIHx8XG4gICAgICAhdGhpcy5saXN0T2ZSb3V0ZXJMaW5rV2l0aEhyZWYgfHxcbiAgICAgICF0aGlzLnJvdXRlciB8fFxuICAgICAgIXRoaXMucm91dGVyLm5hdmlnYXRlZCB8fFxuICAgICAgIXRoaXMubnpNYXRjaFJvdXRlclxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IGhhc0FjdGl2ZUxpbmtzID0gdGhpcy5oYXNBY3RpdmVMaW5rcygpO1xuICAgICAgaWYgKHRoaXMubnpTZWxlY3RlZCAhPT0gaGFzQWN0aXZlTGlua3MpIHtcbiAgICAgICAgdGhpcy5uelNlbGVjdGVkID0gaGFzQWN0aXZlTGlua3M7XG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRTdGF0ZSh0aGlzLm56U2VsZWN0ZWQpO1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgaGFzQWN0aXZlTGlua3MoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgaXNBY3RpdmVDaGVja0ZuID0gdGhpcy5pc0xpbmtBY3RpdmUodGhpcy5yb3V0ZXIhKTtcbiAgICByZXR1cm4gKFxuICAgICAgKHRoaXMucm91dGVyTGluayAmJiBpc0FjdGl2ZUNoZWNrRm4odGhpcy5yb3V0ZXJMaW5rKSkgfHxcbiAgICAgICh0aGlzLnJvdXRlckxpbmtXaXRoSHJlZiAmJiBpc0FjdGl2ZUNoZWNrRm4odGhpcy5yb3V0ZXJMaW5rV2l0aEhyZWYpKSB8fFxuICAgICAgdGhpcy5saXN0T2ZSb3V0ZXJMaW5rLnNvbWUoaXNBY3RpdmVDaGVja0ZuKSB8fFxuICAgICAgdGhpcy5saXN0T2ZSb3V0ZXJMaW5rV2l0aEhyZWYuc29tZShpc0FjdGl2ZUNoZWNrRm4pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNMaW5rQWN0aXZlKHJvdXRlcjogUm91dGVyKTogKGxpbms6IFJvdXRlckxpbmsgfCBSb3V0ZXJMaW5rV2l0aEhyZWYpID0+IGJvb2xlYW4ge1xuICAgIHJldHVybiAobGluazogUm91dGVyTGluayB8IFJvdXRlckxpbmtXaXRoSHJlZikgPT5cbiAgICAgIHJvdXRlci5pc0FjdGl2ZShsaW5rLnVybFRyZWUgfHwgJycsIHtcbiAgICAgICAgcGF0aHM6IHRoaXMubnpNYXRjaFJvdXRlckV4YWN0ID8gJ2V4YWN0JyA6ICdzdWJzZXQnLFxuICAgICAgICBxdWVyeVBhcmFtczogdGhpcy5uek1hdGNoUm91dGVyRXhhY3QgPyAnZXhhY3QnIDogJ3N1YnNldCcsXG4gICAgICAgIGZyYWdtZW50OiAnaWdub3JlZCcsXG4gICAgICAgIG1hdHJpeFBhcmFtczogJ2lnbm9yZWQnXG4gICAgICB9KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbnpNZW51U2VydmljZTogTWVudVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgbnpTdWJtZW51U2VydmljZTogTnpTdWJtZW51U2VydmljZSxcbiAgICBASW5qZWN0KE56SXNNZW51SW5zaWRlRHJvcERvd25Ub2tlbikgcHVibGljIGlzTWVudUluc2lkZURyb3BEb3duOiBib29sZWFuLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5LFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGVyTGluaz86IFJvdXRlckxpbmssXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZXJMaW5rV2l0aEhyZWY/OiBSb3V0ZXJMaW5rV2l0aEhyZWYsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZXI/OiBSb3V0ZXJcbiAgKSB7XG4gICAgaWYgKHJvdXRlcikge1xuICAgICAgdGhpcy5yb3V0ZXIhLmV2ZW50cy5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JCksXG4gICAgICAgIGZpbHRlcihlID0+IGUgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKVxuICAgICAgKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZVJvdXRlckFjdGl2ZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLyoqIHN0b3JlIG9yaWdpbiBwYWRkaW5nIGluIHBhZGRpbmcgKi9cbiAgICBjb21iaW5lTGF0ZXN0KFt0aGlzLm56TWVudVNlcnZpY2UubW9kZSQsIHRoaXMubnpNZW51U2VydmljZS5pbmxpbmVJbmRlbnQkXSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKFttb2RlLCBpbmxpbmVJbmRlbnRdKSA9PiB7XG4gICAgICAgIHRoaXMuaW5saW5lUGFkZGluZ0xlZnQgPSBtb2RlID09PSAnaW5saW5lJyA/IHRoaXMubGV2ZWwgKiBpbmxpbmVJbmRlbnQgOiBudWxsO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLmRpciA9IHRoaXMuZGlyZWN0aW9uYWxpdHkudmFsdWU7XG4gICAgdGhpcy5kaXJlY3Rpb25hbGl0eS5jaGFuZ2U/LnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKGRpcmVjdGlvbjogRGlyZWN0aW9uKSA9PiB7XG4gICAgICB0aGlzLmRpciA9IGRpcmVjdGlvbjtcbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmxpc3RPZlJvdXRlckxpbmsuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHRoaXMudXBkYXRlUm91dGVyQWN0aXZlKCkpO1xuICAgIHRoaXMubGlzdE9mUm91dGVyTGlua1dpdGhIcmVmLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnVwZGF0ZVJvdXRlckFjdGl2ZSgpKTtcbiAgICB0aGlzLnVwZGF0ZVJvdXRlckFjdGl2ZSgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLm56U2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWRTdGF0ZSh0aGlzLm56U2VsZWN0ZWQpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19