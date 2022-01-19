import { __decorate } from "tslib";
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, Optional, Output, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { merge, of, Subject, Subscription } from 'rxjs';
import { delay, filter, first, startWith, takeUntil } from 'rxjs/operators';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { PREFIX } from 'ng-zorro-antd/core/logger';
import { InputBoolean, wrapIntoObservable } from 'ng-zorro-antd/core/util';
import { NzTabChangeEvent } from './interfaces';
import { NzTabNavBarComponent } from './tab-nav-bar.component';
import { NzTabComponent, NZ_TAB_SET } from './tab.component';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "@angular/cdk/bidi";
import * as i3 from "@angular/router";
import * as i4 from "./tab-nav-bar.component";
import * as i5 from "./tab-close-button.component";
import * as i6 from "./tab-body.component";
import * as i7 from "@angular/common";
import * as i8 from "./tab-nav-item.directive";
import * as i9 from "@angular/cdk/a11y";
import * as i10 from "ng-zorro-antd/core/outlet";
const NZ_CONFIG_MODULE_NAME = 'tabs';
let nextId = 0;
export class NzTabSetComponent {
    constructor(nzConfigService, cdr, directionality, router) {
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this.directionality = directionality;
        this.router = router;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzTabPosition = 'top';
        this.nzCanDeactivate = null;
        this.nzAddIcon = 'plus';
        this.nzTabBarStyle = null;
        this.nzType = 'line';
        this.nzSize = 'default';
        this.nzAnimated = true;
        this.nzTabBarGutter = undefined;
        this.nzHideAdd = false;
        this.nzCentered = false;
        this.nzHideAll = false;
        this.nzLinkRouter = false;
        this.nzLinkExact = true;
        this.nzSelectChange = new EventEmitter(true);
        this.nzSelectedIndexChange = new EventEmitter();
        this.nzTabListScroll = new EventEmitter();
        this.nzClose = new EventEmitter();
        this.nzAdd = new EventEmitter();
        // Pick up only direct descendants under ivy rendering engine
        // We filter out only the tabs that belong to this tab set in `tabs`.
        this.allTabs = new QueryList();
        // All the direct tabs for this tab set
        this.tabs = new QueryList();
        this.dir = 'ltr';
        this.destroy$ = new Subject();
        this.indexToSelect = 0;
        this.selectedIndex = null;
        this.tabLabelSubscription = Subscription.EMPTY;
        this.tabsSubscription = Subscription.EMPTY;
        this.canDeactivateSubscription = Subscription.EMPTY;
        this.tabSetId = nextId++;
    }
    get nzSelectedIndex() {
        return this.selectedIndex;
    }
    set nzSelectedIndex(value) {
        this.indexToSelect = coerceNumberProperty(value, null);
    }
    get position() {
        return ['top', 'bottom'].indexOf(this.nzTabPosition) === -1 ? 'vertical' : 'horizontal';
    }
    get addable() {
        return this.nzType === 'editable-card' && !this.nzHideAdd;
    }
    get closable() {
        return this.nzType === 'editable-card';
    }
    get line() {
        return this.nzType === 'line';
    }
    get inkBarAnimated() {
        return this.line && (typeof this.nzAnimated === 'boolean' ? this.nzAnimated : this.nzAnimated.inkBar);
    }
    get tabPaneAnimated() {
        return (this.position === 'horizontal' &&
            this.line &&
            (typeof this.nzAnimated === 'boolean' ? this.nzAnimated : this.nzAnimated.tabPane));
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
        this.tabs.destroy();
        this.tabLabelSubscription.unsubscribe();
        this.tabsSubscription.unsubscribe();
        this.canDeactivateSubscription.unsubscribe();
    }
    ngAfterContentInit() {
        Promise.resolve().then(() => {
            this.setUpRouter();
        });
        this.subscribeToTabLabels();
        this.subscribeToAllTabChanges();
        // Subscribe to changes in the amount of tabs, in order to be
        // able to re-render the content as new tabs are added or removed.
        this.tabsSubscription = this.tabs.changes.subscribe(() => {
            const indexToSelect = this.clampTabIndex(this.indexToSelect);
            // Maintain the previously-selected tab if a new tab is added or removed and there is no
            // explicit change that selects a different tab.
            if (indexToSelect === this.selectedIndex) {
                const tabs = this.tabs.toArray();
                for (let i = 0; i < tabs.length; i++) {
                    if (tabs[i].isActive) {
                        // Assign both to the `indexToSelect` and `selectedIndex` so we don't fire a changed
                        // event, otherwise the consumer may end up in an infinite loop in some edge cases like
                        // adding a tab within the `nzSelectedIndexChange` event.
                        this.indexToSelect = this.selectedIndex = i;
                        break;
                    }
                }
            }
            this.subscribeToTabLabels();
            this.cdr.markForCheck();
        });
    }
    ngAfterContentChecked() {
        // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
        // the amount of tabs changes before the actual change detection runs.
        const indexToSelect = (this.indexToSelect = this.clampTabIndex(this.indexToSelect));
        // If there is a change in selected index, emit a change event. Should not trigger if
        // the selected index has not yet been initialized.
        if (this.selectedIndex !== indexToSelect) {
            const isFirstRun = this.selectedIndex == null;
            if (!isFirstRun) {
                this.nzSelectChange.emit(this.createChangeEvent(indexToSelect));
            }
            // Changing these values after change detection has run
            // since the checked content may contain references to them.
            Promise.resolve().then(() => {
                this.tabs.forEach((tab, index) => (tab.isActive = index === indexToSelect));
                if (!isFirstRun) {
                    this.nzSelectedIndexChange.emit(indexToSelect);
                }
            });
        }
        // Setup the position for each tab and optionally setup an origin on the next selected tab.
        this.tabs.forEach((tab, index) => {
            tab.position = index - indexToSelect;
            // If there is already a selected tab, then set up an origin for the next selected tab
            // if it doesn't have one already.
            if (this.selectedIndex != null && tab.position === 0 && !tab.origin) {
                tab.origin = indexToSelect - this.selectedIndex;
            }
        });
        if (this.selectedIndex !== indexToSelect) {
            this.selectedIndex = indexToSelect;
            this.cdr.markForCheck();
        }
    }
    onClose(index, e) {
        e.preventDefault();
        e.stopPropagation();
        this.nzClose.emit({ index });
    }
    onAdd() {
        this.nzAdd.emit();
    }
    clampTabIndex(index) {
        return Math.min(this.tabs.length - 1, Math.max(index || 0, 0));
    }
    createChangeEvent(index) {
        const event = new NzTabChangeEvent();
        event.index = index;
        if (this.tabs && this.tabs.length) {
            event.tab = this.tabs.toArray()[index];
            this.tabs.forEach((tab, i) => {
                if (i !== index) {
                    tab.nzDeselect.emit();
                }
            });
            event.tab.nzSelect.emit();
        }
        return event;
    }
    subscribeToTabLabels() {
        if (this.tabLabelSubscription) {
            this.tabLabelSubscription.unsubscribe();
        }
        this.tabLabelSubscription = merge(...this.tabs.map(tab => tab.stateChanges)).subscribe(() => this.cdr.markForCheck());
    }
    subscribeToAllTabChanges() {
        this.allTabs.changes.pipe(startWith(this.allTabs)).subscribe((tabs) => {
            this.tabs.reset(tabs.filter(tab => tab.closestTabSet === this));
            this.tabs.notifyOnChanges();
        });
    }
    canDeactivateFun(pre, next) {
        if (typeof this.nzCanDeactivate === 'function') {
            const observable = wrapIntoObservable(this.nzCanDeactivate(pre, next));
            return observable.pipe(first(), takeUntil(this.destroy$));
        }
        else {
            return of(true);
        }
    }
    clickNavItem(tab, index, e) {
        if (!tab.nzDisabled) {
            // ignore nzCanDeactivate
            tab.nzClick.emit();
            if (!this.isRouterLinkClickEvent(index, e)) {
                this.setSelectedIndex(index);
            }
        }
    }
    isRouterLinkClickEvent(index, event) {
        const target = event.target;
        if (this.nzLinkRouter) {
            return !!this.tabs.toArray()[index]?.linkDirective?.elementRef.nativeElement.contains(target);
        }
        else {
            return false;
        }
    }
    contextmenuNavItem(tab, e) {
        if (!tab.nzDisabled) {
            // ignore nzCanDeactivate
            tab.nzContextmenu.emit(e);
        }
    }
    setSelectedIndex(index) {
        this.canDeactivateSubscription.unsubscribe();
        this.canDeactivateSubscription = this.canDeactivateFun(this.selectedIndex, index).subscribe(can => {
            if (can) {
                this.nzSelectedIndex = index;
                this.tabNavBarRef.focusIndex = index;
                this.cdr.markForCheck();
            }
        });
    }
    getTabIndex(tab, index) {
        if (tab.nzDisabled) {
            return null;
        }
        return this.selectedIndex === index ? 0 : -1;
    }
    getTabContentId(i) {
        return `nz-tabs-${this.tabSetId}-tab-${i}`;
    }
    setUpRouter() {
        if (this.nzLinkRouter) {
            if (!this.router) {
                throw new Error(`${PREFIX} you should import 'RouterModule' if you want to use 'nzLinkRouter'!`);
            }
            this.router.events
                .pipe(takeUntil(this.destroy$), filter(e => e instanceof NavigationEnd), startWith(true), delay(0))
                .subscribe(() => {
                this.updateRouterActive();
                this.cdr.markForCheck();
            });
        }
    }
    updateRouterActive() {
        if (this.router.navigated) {
            const index = this.findShouldActiveTabIndex();
            if (index !== this.selectedIndex) {
                this.setSelectedIndex(index);
            }
            this.nzHideAll = index === -1;
        }
    }
    findShouldActiveTabIndex() {
        const tabs = this.tabs.toArray();
        const isActive = this.isLinkActive(this.router);
        return tabs.findIndex(tab => {
            const c = tab.linkDirective;
            return c ? isActive(c.routerLink) || isActive(c.routerLinkWithHref) : false;
        });
    }
    isLinkActive(router) {
        return (link) => link
            ? router.isActive(link.urlTree || '', {
                paths: this.nzLinkExact ? 'exact' : 'subset',
                queryParams: this.nzLinkExact ? 'exact' : 'subset',
                fragment: 'ignored',
                matrixParams: 'ignored'
            })
            : false;
    }
    getTabContentMarginValue() {
        return -(this.nzSelectedIndex || 0) * 100;
    }
    getTabContentMarginLeft() {
        if (this.tabPaneAnimated) {
            if (this.dir !== 'rtl') {
                return `${this.getTabContentMarginValue()}%`;
            }
        }
        return '';
    }
    getTabContentMarginRight() {
        if (this.tabPaneAnimated) {
            if (this.dir === 'rtl') {
                return `${this.getTabContentMarginValue()}%`;
            }
        }
        return '';
    }
}
NzTabSetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTabSetComponent, deps: [{ token: i1.NzConfigService }, { token: i0.ChangeDetectorRef }, { token: i2.Directionality, optional: true }, { token: i3.Router, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzTabSetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTabSetComponent, selector: "nz-tabset", inputs: { nzSelectedIndex: "nzSelectedIndex", nzTabPosition: "nzTabPosition", nzTabBarExtraContent: "nzTabBarExtraContent", nzCanDeactivate: "nzCanDeactivate", nzAddIcon: "nzAddIcon", nzTabBarStyle: "nzTabBarStyle", nzType: "nzType", nzSize: "nzSize", nzAnimated: "nzAnimated", nzTabBarGutter: "nzTabBarGutter", nzHideAdd: "nzHideAdd", nzCentered: "nzCentered", nzHideAll: "nzHideAll", nzLinkRouter: "nzLinkRouter", nzLinkExact: "nzLinkExact" }, outputs: { nzSelectChange: "nzSelectChange", nzSelectedIndexChange: "nzSelectedIndexChange", nzTabListScroll: "nzTabListScroll", nzClose: "nzClose", nzAdd: "nzAdd" }, host: { properties: { "class.ant-tabs-card": "nzType === 'card' || nzType === 'editable-card'", "class.ant-tabs-editable": "nzType === 'editable-card'", "class.ant-tabs-editable-card": "nzType === 'editable-card'", "class.ant-tabs-centered": "nzCentered", "class.ant-tabs-rtl": "dir === 'rtl'", "class.ant-tabs-top": "nzTabPosition === 'top'", "class.ant-tabs-bottom": "nzTabPosition === 'bottom'", "class.ant-tabs-left": "nzTabPosition === 'left'", "class.ant-tabs-right": "nzTabPosition === 'right'", "class.ant-tabs-default": "nzSize === 'default'", "class.ant-tabs-small": "nzSize === 'small'", "class.ant-tabs-large": "nzSize === 'large'" }, classAttribute: "ant-tabs" }, providers: [
        {
            provide: NZ_TAB_SET,
            useExisting: NzTabSetComponent
        }
    ], queries: [{ propertyName: "allTabs", predicate: NzTabComponent, descendants: true }], viewQueries: [{ propertyName: "tabNavBarRef", first: true, predicate: NzTabNavBarComponent, descendants: true }], exportAs: ["nzTabset"], ngImport: i0, template: `
    <nz-tabs-nav
      *ngIf="tabs.length || addable"
      [ngStyle]="nzTabBarStyle"
      [selectedIndex]="nzSelectedIndex || 0"
      [inkBarAnimated]="inkBarAnimated"
      [addable]="addable"
      [addIcon]="nzAddIcon"
      [hideBar]="nzHideAll"
      [position]="position"
      [extraTemplate]="nzTabBarExtraContent"
      (tabScroll)="nzTabListScroll.emit($event)"
      (selectFocusedIndex)="setSelectedIndex($event)"
      (addClicked)="onAdd()"
    >
      <div
        class="ant-tabs-tab"
        [style.margin-right.px]="position === 'horizontal' ? nzTabBarGutter : null"
        [style.margin-bottom.px]="position === 'vertical' ? nzTabBarGutter : null"
        [class.ant-tabs-tab-active]="nzSelectedIndex === i"
        [class.ant-tabs-tab-disabled]="tab.nzDisabled"
        (click)="clickNavItem(tab, i, $event)"
        (contextmenu)="contextmenuNavItem(tab, $event)"
        *ngFor="let tab of tabs; let i = index"
      >
        <div
          role="tab"
          [attr.tabIndex]="getTabIndex(tab, i)"
          [attr.aria-disabled]="tab.nzDisabled"
          [attr.aria-selected]="nzSelectedIndex === i && !nzHideAll"
          [attr.aria-controls]="getTabContentId(i)"
          [disabled]="tab.nzDisabled"
          [tab]="tab"
          [active]="nzSelectedIndex === i"
          class="ant-tabs-tab-btn"
          nzTabNavItem
          cdkMonitorElementFocus
        >
          <ng-container *nzStringTemplateOutlet="tab.label; context: { visible: true }">{{ tab.label }}</ng-container>
          <button
            nz-tab-close-button
            *ngIf="tab.nzClosable && closable && !tab.nzDisabled"
            [closeIcon]="tab.nzCloseIcon"
            (click)="onClose(i, $event)"
          ></button>
        </div>
      </div>
    </nz-tabs-nav>
    <div class="ant-tabs-content-holder">
      <div
        class="ant-tabs-content"
        [class.ant-tabs-content-top]="nzTabPosition === 'top'"
        [class.ant-tabs-content-bottom]="nzTabPosition === 'bottom'"
        [class.ant-tabs-content-left]="nzTabPosition === 'left'"
        [class.ant-tabs-content-right]="nzTabPosition === 'right'"
        [class.ant-tabs-content-animated]="tabPaneAnimated"
        [style.margin-left]="getTabContentMarginLeft()"
        [style.margin-right]="getTabContentMarginRight()"
      >
        <div
          nz-tab-body
          *ngFor="let tab of tabs; let i = index"
          [active]="nzSelectedIndex === i && !nzHideAll"
          [content]="tab.content"
          [forceRender]="tab.nzForceRender"
          [tabPaneAnimated]="tabPaneAnimated"
        ></div>
      </div>
    </div>
  `, isInline: true, components: [{ type: i4.NzTabNavBarComponent, selector: "nz-tabs-nav", inputs: ["position", "addable", "hideBar", "addIcon", "inkBarAnimated", "extraTemplate", "selectedIndex"], outputs: ["indexFocused", "selectFocusedIndex", "addClicked", "tabScroll"], exportAs: ["nzTabsNav"] }, { type: i5.NzTabCloseButtonComponent, selector: "nz-tab-close-button, button[nz-tab-close-button]", inputs: ["closeIcon"] }, { type: i6.NzTabBodyComponent, selector: "[nz-tab-body]", inputs: ["content", "active", "tabPaneAnimated", "forceRender"], exportAs: ["nzTabBody"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i8.NzTabNavItemDirective, selector: "[nzTabNavItem]", inputs: ["disabled", "tab", "active"] }, { type: i9.CdkMonitorFocus, selector: "[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]", outputs: ["cdkFocusChange"] }, { type: i10.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    WithConfig()
], NzTabSetComponent.prototype, "nzType", void 0);
__decorate([
    WithConfig()
], NzTabSetComponent.prototype, "nzSize", void 0);
__decorate([
    WithConfig()
], NzTabSetComponent.prototype, "nzAnimated", void 0);
__decorate([
    WithConfig()
], NzTabSetComponent.prototype, "nzTabBarGutter", void 0);
__decorate([
    InputBoolean()
], NzTabSetComponent.prototype, "nzHideAdd", void 0);
__decorate([
    InputBoolean()
], NzTabSetComponent.prototype, "nzCentered", void 0);
__decorate([
    InputBoolean()
], NzTabSetComponent.prototype, "nzHideAll", void 0);
__decorate([
    InputBoolean()
], NzTabSetComponent.prototype, "nzLinkRouter", void 0);
__decorate([
    InputBoolean()
], NzTabSetComponent.prototype, "nzLinkExact", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTabSetComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tabset',
                    exportAs: 'nzTabset',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.Default,
                    providers: [
                        {
                            provide: NZ_TAB_SET,
                            useExisting: NzTabSetComponent
                        }
                    ],
                    template: `
    <nz-tabs-nav
      *ngIf="tabs.length || addable"
      [ngStyle]="nzTabBarStyle"
      [selectedIndex]="nzSelectedIndex || 0"
      [inkBarAnimated]="inkBarAnimated"
      [addable]="addable"
      [addIcon]="nzAddIcon"
      [hideBar]="nzHideAll"
      [position]="position"
      [extraTemplate]="nzTabBarExtraContent"
      (tabScroll)="nzTabListScroll.emit($event)"
      (selectFocusedIndex)="setSelectedIndex($event)"
      (addClicked)="onAdd()"
    >
      <div
        class="ant-tabs-tab"
        [style.margin-right.px]="position === 'horizontal' ? nzTabBarGutter : null"
        [style.margin-bottom.px]="position === 'vertical' ? nzTabBarGutter : null"
        [class.ant-tabs-tab-active]="nzSelectedIndex === i"
        [class.ant-tabs-tab-disabled]="tab.nzDisabled"
        (click)="clickNavItem(tab, i, $event)"
        (contextmenu)="contextmenuNavItem(tab, $event)"
        *ngFor="let tab of tabs; let i = index"
      >
        <div
          role="tab"
          [attr.tabIndex]="getTabIndex(tab, i)"
          [attr.aria-disabled]="tab.nzDisabled"
          [attr.aria-selected]="nzSelectedIndex === i && !nzHideAll"
          [attr.aria-controls]="getTabContentId(i)"
          [disabled]="tab.nzDisabled"
          [tab]="tab"
          [active]="nzSelectedIndex === i"
          class="ant-tabs-tab-btn"
          nzTabNavItem
          cdkMonitorElementFocus
        >
          <ng-container *nzStringTemplateOutlet="tab.label; context: { visible: true }">{{ tab.label }}</ng-container>
          <button
            nz-tab-close-button
            *ngIf="tab.nzClosable && closable && !tab.nzDisabled"
            [closeIcon]="tab.nzCloseIcon"
            (click)="onClose(i, $event)"
          ></button>
        </div>
      </div>
    </nz-tabs-nav>
    <div class="ant-tabs-content-holder">
      <div
        class="ant-tabs-content"
        [class.ant-tabs-content-top]="nzTabPosition === 'top'"
        [class.ant-tabs-content-bottom]="nzTabPosition === 'bottom'"
        [class.ant-tabs-content-left]="nzTabPosition === 'left'"
        [class.ant-tabs-content-right]="nzTabPosition === 'right'"
        [class.ant-tabs-content-animated]="tabPaneAnimated"
        [style.margin-left]="getTabContentMarginLeft()"
        [style.margin-right]="getTabContentMarginRight()"
      >
        <div
          nz-tab-body
          *ngFor="let tab of tabs; let i = index"
          [active]="nzSelectedIndex === i && !nzHideAll"
          [content]="tab.content"
          [forceRender]="tab.nzForceRender"
          [tabPaneAnimated]="tabPaneAnimated"
        ></div>
      </div>
    </div>
  `,
                    host: {
                        class: 'ant-tabs',
                        '[class.ant-tabs-card]': `nzType === 'card' || nzType === 'editable-card'`,
                        '[class.ant-tabs-editable]': `nzType === 'editable-card'`,
                        '[class.ant-tabs-editable-card]': `nzType === 'editable-card'`,
                        '[class.ant-tabs-centered]': `nzCentered`,
                        '[class.ant-tabs-rtl]': `dir === 'rtl'`,
                        '[class.ant-tabs-top]': `nzTabPosition === 'top'`,
                        '[class.ant-tabs-bottom]': `nzTabPosition === 'bottom'`,
                        '[class.ant-tabs-left]': `nzTabPosition === 'left'`,
                        '[class.ant-tabs-right]': `nzTabPosition === 'right'`,
                        '[class.ant-tabs-default]': `nzSize === 'default'`,
                        '[class.ant-tabs-small]': `nzSize === 'small'`,
                        '[class.ant-tabs-large]': `nzSize === 'large'`
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzConfigService }, { type: i0.ChangeDetectorRef }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i3.Router, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzSelectedIndex: [{
                type: Input
            }], nzTabPosition: [{
                type: Input
            }], nzTabBarExtraContent: [{
                type: Input
            }], nzCanDeactivate: [{
                type: Input
            }], nzAddIcon: [{
                type: Input
            }], nzTabBarStyle: [{
                type: Input
            }], nzType: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzAnimated: [{
                type: Input
            }], nzTabBarGutter: [{
                type: Input
            }], nzHideAdd: [{
                type: Input
            }], nzCentered: [{
                type: Input
            }], nzHideAll: [{
                type: Input
            }], nzLinkRouter: [{
                type: Input
            }], nzLinkExact: [{
                type: Input
            }], nzSelectChange: [{
                type: Output
            }], nzSelectedIndexChange: [{
                type: Output
            }], nzTabListScroll: [{
                type: Output
            }], nzClose: [{
                type: Output
            }], nzAdd: [{
                type: Output
            }], allTabs: [{
                type: ContentChildren,
                args: [NzTabComponent, { descendants: true }]
            }], tabNavBarRef: [{
                type: ViewChild,
                args: [NzTabNavBarComponent, { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvdGFicy90YWJzZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFRQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RCxPQUFPLEVBR0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsWUFBWSxFQUNaLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFFVCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQTBDLE1BQU0saUJBQWlCLENBQUM7QUFDeEYsT0FBTyxFQUFFLEtBQUssRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTVFLE9BQU8sRUFBZ0MsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUUzRSxPQUFPLEVBRUwsZ0JBQWdCLEVBTWpCLE1BQU0sY0FBYyxDQUFDO0FBQ3RCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7OztBQUU3RCxNQUFNLHFCQUFxQixHQUFnQixNQUFNLENBQUM7QUFFbEQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBb0dmLE1BQU0sT0FBTyxpQkFB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S0FBSztnQkFPRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDaUIsTUFBTTtzQkFBNUIsS0FBSztnQkFDaUIsTUFBTTtzQkFBNUIsS0FBSztnQkFDaUIsVUFBVTtzQkFBaEMsS0FBSztnQkFDaUIsY0FBYztzQkFBcEMsS0FBSztnQkFDbUIsU0FBUztzQkFBakMsS0FBSztnQkFDbUIsVUFBVTtzQkFBbEMsS0FBSztnQkFDbUIsU0FBUztzQkFBakMsS0FBSztnQkFDbUIsWUFBWTtzQkFBcEMsS0FBSztnQkFDbUIsV0FBVztzQkFBbkMsS0FBSztnQkFFYSxjQUFjO3NCQUFoQyxNQUFNO2dCQUNZLHFCQUFxQjtzQkFBdkMsTUFBTTtnQkFDWSxlQUFlO3NCQUFqQyxNQUFNO2dCQUNZLE9BQU87c0JBQXpCLE1BQU07Z0JBQ1ksS0FBSztzQkFBdkIsTUFBTTtnQkFpQ1AsT0FBTztzQkFETixlQUFlO3VCQUFDLGNBQWMsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7Z0JBRUYsWUFBWTtzQkFBL0QsU0FBUzt1QkFBQyxvQkFBb0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG4vKiogZ2V0IHNvbWUgY29kZSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMiAqL1xuXG5pbXBvcnQgeyBEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uRW5kLCBSb3V0ZXIsIFJvdXRlckxpbmssIFJvdXRlckxpbmtXaXRoSHJlZiB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVsYXksIGZpbHRlciwgZmlyc3QsIHN0YXJ0V2l0aCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOekNvbmZpZ0tleSwgTnpDb25maWdTZXJ2aWNlLCBXaXRoQ29uZmlnIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2NvbmZpZyc7XG5pbXBvcnQgeyBQUkVGSVggfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvbG9nZ2VyJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgTnVtYmVySW5wdXQsIE56U2FmZUFueSwgTnpTaXplTERTVHlwZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4sIHdyYXBJbnRvT2JzZXJ2YWJsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuaW1wb3J0IHtcbiAgTnpBbmltYXRlZEludGVyZmFjZSxcbiAgTnpUYWJDaGFuZ2VFdmVudCxcbiAgTnpUYWJQb3NpdGlvbixcbiAgTnpUYWJQb3NpdGlvbk1vZGUsXG4gIE56VGFic0NhbkRlYWN0aXZhdGVGbixcbiAgTnpUYWJTY3JvbGxFdmVudCxcbiAgTnpUYWJUeXBlXG59IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBOelRhYk5hdkJhckNvbXBvbmVudCB9IGZyb20gJy4vdGFiLW5hdi1iYXIuY29tcG9uZW50JztcbmltcG9ydCB7IE56VGFiQ29tcG9uZW50LCBOWl9UQUJfU0VUIH0gZnJvbSAnLi90YWIuY29tcG9uZW50JztcblxuY29uc3QgTlpfQ09ORklHX01PRFVMRV9OQU1FOiBOekNvbmZpZ0tleSA9ICd0YWJzJztcblxubGV0IG5leHRJZCA9IDA7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXRhYnNldCcsXG4gIGV4cG9ydEFzOiAnbnpUYWJzZXQnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOWl9UQUJfU0VULFxuICAgICAgdXNlRXhpc3Rpbmc6IE56VGFiU2V0Q29tcG9uZW50XG4gICAgfVxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuei10YWJzLW5hdlxuICAgICAgKm5nSWY9XCJ0YWJzLmxlbmd0aCB8fCBhZGRhYmxlXCJcbiAgICAgIFtuZ1N0eWxlXT1cIm56VGFiQmFyU3R5bGVcIlxuICAgICAgW3NlbGVjdGVkSW5kZXhdPVwibnpTZWxlY3RlZEluZGV4IHx8IDBcIlxuICAgICAgW2lua0JhckFuaW1hdGVkXT1cImlua0JhckFuaW1hdGVkXCJcbiAgICAgIFthZGRhYmxlXT1cImFkZGFibGVcIlxuICAgICAgW2FkZEljb25dPVwibnpBZGRJY29uXCJcbiAgICAgIFtoaWRlQmFyXT1cIm56SGlkZUFsbFwiXG4gICAgICBbcG9zaXRpb25dPVwicG9zaXRpb25cIlxuICAgICAgW2V4dHJhVGVtcGxhdGVdPVwibnpUYWJCYXJFeHRyYUNvbnRlbnRcIlxuICAgICAgKHRhYlNjcm9sbCk9XCJuelRhYkxpc3RTY3JvbGwuZW1pdCgkZXZlbnQpXCJcbiAgICAgIChzZWxlY3RGb2N1c2VkSW5kZXgpPVwic2V0U2VsZWN0ZWRJbmRleCgkZXZlbnQpXCJcbiAgICAgIChhZGRDbGlja2VkKT1cIm9uQWRkKClcIlxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJhbnQtdGFicy10YWJcIlxuICAgICAgICBbc3R5bGUubWFyZ2luLXJpZ2h0LnB4XT1cInBvc2l0aW9uID09PSAnaG9yaXpvbnRhbCcgPyBuelRhYkJhckd1dHRlciA6IG51bGxcIlxuICAgICAgICBbc3R5bGUubWFyZ2luLWJvdHRvbS5weF09XCJwb3NpdGlvbiA9PT0gJ3ZlcnRpY2FsJyA/IG56VGFiQmFyR3V0dGVyIDogbnVsbFwiXG4gICAgICAgIFtjbGFzcy5hbnQtdGFicy10YWItYWN0aXZlXT1cIm56U2VsZWN0ZWRJbmRleCA9PT0gaVwiXG4gICAgICAgIFtjbGFzcy5hbnQtdGFicy10YWItZGlzYWJsZWRdPVwidGFiLm56RGlzYWJsZWRcIlxuICAgICAgICAoY2xpY2spPVwiY2xpY2tOYXZJdGVtKHRhYiwgaSwgJGV2ZW50KVwiXG4gICAgICAgIChjb250ZXh0bWVudSk9XCJjb250ZXh0bWVudU5hdkl0ZW0odGFiLCAkZXZlbnQpXCJcbiAgICAgICAgKm5nRm9yPVwibGV0IHRhYiBvZiB0YWJzOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgID5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJvbGU9XCJ0YWJcIlxuICAgICAgICAgIFthdHRyLnRhYkluZGV4XT1cImdldFRhYkluZGV4KHRhYiwgaSlcIlxuICAgICAgICAgIFthdHRyLmFyaWEtZGlzYWJsZWRdPVwidGFiLm56RGlzYWJsZWRcIlxuICAgICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwibnpTZWxlY3RlZEluZGV4ID09PSBpICYmICFuekhpZGVBbGxcIlxuICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiZ2V0VGFiQ29udGVudElkKGkpXCJcbiAgICAgICAgICBbZGlzYWJsZWRdPVwidGFiLm56RGlzYWJsZWRcIlxuICAgICAgICAgIFt0YWJdPVwidGFiXCJcbiAgICAgICAgICBbYWN0aXZlXT1cIm56U2VsZWN0ZWRJbmRleCA9PT0gaVwiXG4gICAgICAgICAgY2xhc3M9XCJhbnQtdGFicy10YWItYnRuXCJcbiAgICAgICAgICBuelRhYk5hdkl0ZW1cbiAgICAgICAgICBjZGtNb25pdG9yRWxlbWVudEZvY3VzXG4gICAgICAgID5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwidGFiLmxhYmVsOyBjb250ZXh0OiB7IHZpc2libGU6IHRydWUgfVwiPnt7IHRhYi5sYWJlbCB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG56LXRhYi1jbG9zZS1idXR0b25cbiAgICAgICAgICAgICpuZ0lmPVwidGFiLm56Q2xvc2FibGUgJiYgY2xvc2FibGUgJiYgIXRhYi5uekRpc2FibGVkXCJcbiAgICAgICAgICAgIFtjbG9zZUljb25dPVwidGFiLm56Q2xvc2VJY29uXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvbkNsb3NlKGksICRldmVudClcIlxuICAgICAgICAgID48L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L256LXRhYnMtbmF2PlxuICAgIDxkaXYgY2xhc3M9XCJhbnQtdGFicy1jb250ZW50LWhvbGRlclwiPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cImFudC10YWJzLWNvbnRlbnRcIlxuICAgICAgICBbY2xhc3MuYW50LXRhYnMtY29udGVudC10b3BdPVwibnpUYWJQb3NpdGlvbiA9PT0gJ3RvcCdcIlxuICAgICAgICBbY2xhc3MuYW50LXRhYnMtY29udGVudC1ib3R0b21dPVwibnpUYWJQb3NpdGlvbiA9PT0gJ2JvdHRvbSdcIlxuICAgICAgICBbY2xhc3MuYW50LXRhYnMtY29udGVudC1sZWZ0XT1cIm56VGFiUG9zaXRpb24gPT09ICdsZWZ0J1wiXG4gICAgICAgIFtjbGFzcy5hbnQtdGFicy1jb250ZW50LXJpZ2h0XT1cIm56VGFiUG9zaXRpb24gPT09ICdyaWdodCdcIlxuICAgICAgICBbY2xhc3MuYW50LXRhYnMtY29udGVudC1hbmltYXRlZF09XCJ0YWJQYW5lQW5pbWF0ZWRcIlxuICAgICAgICBbc3R5bGUubWFyZ2luLWxlZnRdPVwiZ2V0VGFiQ29udGVudE1hcmdpbkxlZnQoKVwiXG4gICAgICAgIFtzdHlsZS5tYXJnaW4tcmlnaHRdPVwiZ2V0VGFiQ29udGVudE1hcmdpblJpZ2h0KClcIlxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgbnotdGFiLWJvZHlcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgdGFiIG9mIHRhYnM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICAgIFthY3RpdmVdPVwibnpTZWxlY3RlZEluZGV4ID09PSBpICYmICFuekhpZGVBbGxcIlxuICAgICAgICAgIFtjb250ZW50XT1cInRhYi5jb250ZW50XCJcbiAgICAgICAgICBbZm9yY2VSZW5kZXJdPVwidGFiLm56Rm9yY2VSZW5kZXJcIlxuICAgICAgICAgIFt0YWJQYW5lQW5pbWF0ZWRdPVwidGFiUGFuZUFuaW1hdGVkXCJcbiAgICAgICAgPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC10YWJzJyxcbiAgICAnW2NsYXNzLmFudC10YWJzLWNhcmRdJzogYG56VHlwZSA9PT0gJ2NhcmQnIHx8IG56VHlwZSA9PT0gJ2VkaXRhYmxlLWNhcmQnYCxcbiAgICAnW2NsYXNzLmFudC10YWJzLWVkaXRhYmxlXSc6IGBuelR5cGUgPT09ICdlZGl0YWJsZS1jYXJkJ2AsXG4gICAgJ1tjbGFzcy5hbnQtdGFicy1lZGl0YWJsZS1jYXJkXSc6IGBuelR5cGUgPT09ICdlZGl0YWJsZS1jYXJkJ2AsXG4gICAgJ1tjbGFzcy5hbnQtdGFicy1jZW50ZXJlZF0nOiBgbnpDZW50ZXJlZGAsXG4gICAgJ1tjbGFzcy5hbnQtdGFicy1ydGxdJzogYGRpciA9PT0gJ3J0bCdgLFxuICAgICdbY2xhc3MuYW50LXRhYnMtdG9wXSc6IGBuelRhYlBvc2l0aW9uID09PSAndG9wJ2AsXG4gICAgJ1tjbGFzcy5hbnQtdGFicy1ib3R0b21dJzogYG56VGFiUG9zaXRpb24gPT09ICdib3R0b20nYCxcbiAgICAnW2NsYXNzLmFudC10YWJzLWxlZnRdJzogYG56VGFiUG9zaXRpb24gPT09ICdsZWZ0J2AsXG4gICAgJ1tjbGFzcy5hbnQtdGFicy1yaWdodF0nOiBgbnpUYWJQb3NpdGlvbiA9PT0gJ3JpZ2h0J2AsXG4gICAgJ1tjbGFzcy5hbnQtdGFicy1kZWZhdWx0XSc6IGBuelNpemUgPT09ICdkZWZhdWx0J2AsXG4gICAgJ1tjbGFzcy5hbnQtdGFicy1zbWFsbF0nOiBgbnpTaXplID09PSAnc21hbGwnYCxcbiAgICAnW2NsYXNzLmFudC10YWJzLWxhcmdlXSc6IGBuelNpemUgPT09ICdsYXJnZSdgXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUYWJTZXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIHJlYWRvbmx5IF9uek1vZHVsZU5hbWU6IE56Q29uZmlnS2V5ID0gTlpfQ09ORklHX01PRFVMRV9OQU1FO1xuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekhpZGVBZGQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256SGlkZUFsbDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpDZW50ZXJlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpMaW5rUm91dGVyOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekxpbmtFeGFjdDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTZWxlY3RlZEluZGV4OiBOdW1iZXJJbnB1dDtcblxuICBASW5wdXQoKVxuICBnZXQgbnpTZWxlY3RlZEluZGV4KCk6IG51bWJlciB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSW5kZXg7XG4gIH1cbiAgc2V0IG56U2VsZWN0ZWRJbmRleCh2YWx1ZTogbnVsbCB8IG51bWJlcikge1xuICAgIHRoaXMuaW5kZXhUb1NlbGVjdCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlLCBudWxsKTtcbiAgfVxuICBASW5wdXQoKSBuelRhYlBvc2l0aW9uOiBOelRhYlBvc2l0aW9uID0gJ3RvcCc7XG4gIEBJbnB1dCgpIG56VGFiQmFyRXh0cmFDb250ZW50PzogVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIG56Q2FuRGVhY3RpdmF0ZTogTnpUYWJzQ2FuRGVhY3RpdmF0ZUZuIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56QWRkSWNvbjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8TnpTYWZlQW55PiA9ICdwbHVzJztcbiAgQElucHV0KCkgbnpUYWJCYXJTdHlsZTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56VHlwZTogTnpUYWJUeXBlID0gJ2xpbmUnO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56U2l6ZTogTnpTaXplTERTVHlwZSA9ICdkZWZhdWx0JztcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBuekFuaW1hdGVkOiBOekFuaW1hdGVkSW50ZXJmYWNlIHwgYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgbnpUYWJCYXJHdXR0ZXI/OiBudW1iZXIgPSB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekhpZGVBZGQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56Q2VudGVyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56SGlkZUFsbCA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpMaW5rUm91dGVyID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekxpbmtFeGFjdCA9IHRydWU7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56U2VsZWN0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8TnpUYWJDaGFuZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE56VGFiQ2hhbmdlRXZlbnQ+KHRydWUpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpTZWxlY3RlZEluZGV4Q2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpUYWJMaXN0U2Nyb2xsID0gbmV3IEV2ZW50RW1pdHRlcjxOelRhYlNjcm9sbEV2ZW50PigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpDbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8eyBpbmRleDogbnVtYmVyIH0+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekFkZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBnZXQgcG9zaXRpb24oKTogTnpUYWJQb3NpdGlvbk1vZGUge1xuICAgIHJldHVybiBbJ3RvcCcsICdib3R0b20nXS5pbmRleE9mKHRoaXMubnpUYWJQb3NpdGlvbikgPT09IC0xID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJztcbiAgfVxuXG4gIGdldCBhZGRhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm56VHlwZSA9PT0gJ2VkaXRhYmxlLWNhcmQnICYmICF0aGlzLm56SGlkZUFkZDtcbiAgfVxuXG4gIGdldCBjbG9zYWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5uelR5cGUgPT09ICdlZGl0YWJsZS1jYXJkJztcbiAgfVxuXG4gIGdldCBsaW5lKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm56VHlwZSA9PT0gJ2xpbmUnO1xuICB9XG5cbiAgZ2V0IGlua0JhckFuaW1hdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmxpbmUgJiYgKHR5cGVvZiB0aGlzLm56QW5pbWF0ZWQgPT09ICdib29sZWFuJyA/IHRoaXMubnpBbmltYXRlZCA6IHRoaXMubnpBbmltYXRlZC5pbmtCYXIpO1xuICB9XG5cbiAgZ2V0IHRhYlBhbmVBbmltYXRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5wb3NpdGlvbiA9PT0gJ2hvcml6b250YWwnICYmXG4gICAgICB0aGlzLmxpbmUgJiZcbiAgICAgICh0eXBlb2YgdGhpcy5uekFuaW1hdGVkID09PSAnYm9vbGVhbicgPyB0aGlzLm56QW5pbWF0ZWQgOiB0aGlzLm56QW5pbWF0ZWQudGFiUGFuZSlcbiAgICApO1xuICB9XG5cbiAgLy8gUGljayB1cCBvbmx5IGRpcmVjdCBkZXNjZW5kYW50cyB1bmRlciBpdnkgcmVuZGVyaW5nIGVuZ2luZVxuICAvLyBXZSBmaWx0ZXIgb3V0IG9ubHkgdGhlIHRhYnMgdGhhdCBiZWxvbmcgdG8gdGhpcyB0YWIgc2V0IGluIGB0YWJzYC5cbiAgQENvbnRlbnRDaGlsZHJlbihOelRhYkNvbXBvbmVudCwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICBhbGxUYWJzOiBRdWVyeUxpc3Q8TnpUYWJDb21wb25lbnQ+ID0gbmV3IFF1ZXJ5TGlzdDxOelRhYkNvbXBvbmVudD4oKTtcbiAgQFZpZXdDaGlsZChOelRhYk5hdkJhckNvbXBvbmVudCwgeyBzdGF0aWM6IGZhbHNlIH0pIHRhYk5hdkJhclJlZiE6IE56VGFiTmF2QmFyQ29tcG9uZW50O1xuXG4gIC8vIEFsbCB0aGUgZGlyZWN0IHRhYnMgZm9yIHRoaXMgdGFiIHNldFxuICB0YWJzOiBRdWVyeUxpc3Q8TnpUYWJDb21wb25lbnQ+ID0gbmV3IFF1ZXJ5TGlzdDxOelRhYkNvbXBvbmVudD4oKTtcblxuICBkaXI6IERpcmVjdGlvbiA9ICdsdHInO1xuICBwcml2YXRlIHJlYWRvbmx5IHRhYlNldElkITogbnVtYmVyO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBpbmRleFRvU2VsZWN0OiBudW1iZXIgfCBudWxsID0gMDtcbiAgcHJpdmF0ZSBzZWxlY3RlZEluZGV4OiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSB0YWJMYWJlbFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSB0YWJzU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIGNhbkRlYWN0aXZhdGVTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJvdXRlcjogUm91dGVyXG4gICkge1xuICAgIHRoaXMudGFiU2V0SWQgPSBuZXh0SWQrKztcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZGlyID0gdGhpcy5kaXJlY3Rpb25hbGl0eS52YWx1ZTtcbiAgICB0aGlzLmRpcmVjdGlvbmFsaXR5LmNoYW5nZT8ucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoZGlyZWN0aW9uOiBEaXJlY3Rpb24pID0+IHtcbiAgICAgIHRoaXMuZGlyID0gZGlyZWN0aW9uO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICAgIHRoaXMudGFicy5kZXN0cm95KCk7XG4gICAgdGhpcy50YWJMYWJlbFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMudGFic1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuY2FuRGVhY3RpdmF0ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5zZXRVcFJvdXRlcigpO1xuICAgIH0pO1xuICAgIHRoaXMuc3Vic2NyaWJlVG9UYWJMYWJlbHMoKTtcbiAgICB0aGlzLnN1YnNjcmliZVRvQWxsVGFiQ2hhbmdlcygpO1xuXG4gICAgLy8gU3Vic2NyaWJlIHRvIGNoYW5nZXMgaW4gdGhlIGFtb3VudCBvZiB0YWJzLCBpbiBvcmRlciB0byBiZVxuICAgIC8vIGFibGUgdG8gcmUtcmVuZGVyIHRoZSBjb250ZW50IGFzIG5ldyB0YWJzIGFyZSBhZGRlZCBvciByZW1vdmVkLlxuICAgIHRoaXMudGFic1N1YnNjcmlwdGlvbiA9IHRoaXMudGFicy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBpbmRleFRvU2VsZWN0ID0gdGhpcy5jbGFtcFRhYkluZGV4KHRoaXMuaW5kZXhUb1NlbGVjdCk7XG5cbiAgICAgIC8vIE1haW50YWluIHRoZSBwcmV2aW91c2x5LXNlbGVjdGVkIHRhYiBpZiBhIG5ldyB0YWIgaXMgYWRkZWQgb3IgcmVtb3ZlZCBhbmQgdGhlcmUgaXMgbm9cbiAgICAgIC8vIGV4cGxpY2l0IGNoYW5nZSB0aGF0IHNlbGVjdHMgYSBkaWZmZXJlbnQgdGFiLlxuICAgICAgaWYgKGluZGV4VG9TZWxlY3QgPT09IHRoaXMuc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICBjb25zdCB0YWJzID0gdGhpcy50YWJzLnRvQXJyYXkoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAodGFic1tpXS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgLy8gQXNzaWduIGJvdGggdG8gdGhlIGBpbmRleFRvU2VsZWN0YCBhbmQgYHNlbGVjdGVkSW5kZXhgIHNvIHdlIGRvbid0IGZpcmUgYSBjaGFuZ2VkXG4gICAgICAgICAgICAvLyBldmVudCwgb3RoZXJ3aXNlIHRoZSBjb25zdW1lciBtYXkgZW5kIHVwIGluIGFuIGluZmluaXRlIGxvb3AgaW4gc29tZSBlZGdlIGNhc2VzIGxpa2VcbiAgICAgICAgICAgIC8vIGFkZGluZyBhIHRhYiB3aXRoaW4gdGhlIGBuelNlbGVjdGVkSW5kZXhDaGFuZ2VgIGV2ZW50LlxuICAgICAgICAgICAgdGhpcy5pbmRleFRvU2VsZWN0ID0gdGhpcy5zZWxlY3RlZEluZGV4ID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5zdWJzY3JpYmVUb1RhYkxhYmVscygpO1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XG4gICAgLy8gRG9uJ3QgY2xhbXAgdGhlIGBpbmRleFRvU2VsZWN0YCBpbW1lZGlhdGVseSBpbiB0aGUgc2V0dGVyIGJlY2F1c2UgaXQgY2FuIGhhcHBlbiB0aGF0XG4gICAgLy8gdGhlIGFtb3VudCBvZiB0YWJzIGNoYW5nZXMgYmVmb3JlIHRoZSBhY3R1YWwgY2hhbmdlIGRldGVjdGlvbiBydW5zLlxuICAgIGNvbnN0IGluZGV4VG9TZWxlY3QgPSAodGhpcy5pbmRleFRvU2VsZWN0ID0gdGhpcy5jbGFtcFRhYkluZGV4KHRoaXMuaW5kZXhUb1NlbGVjdCkpO1xuXG4gICAgLy8gSWYgdGhlcmUgaXMgYSBjaGFuZ2UgaW4gc2VsZWN0ZWQgaW5kZXgsIGVtaXQgYSBjaGFuZ2UgZXZlbnQuIFNob3VsZCBub3QgdHJpZ2dlciBpZlxuICAgIC8vIHRoZSBzZWxlY3RlZCBpbmRleCBoYXMgbm90IHlldCBiZWVuIGluaXRpYWxpemVkLlxuICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXggIT09IGluZGV4VG9TZWxlY3QpIHtcbiAgICAgIGNvbnN0IGlzRmlyc3RSdW4gPSB0aGlzLnNlbGVjdGVkSW5kZXggPT0gbnVsbDtcblxuICAgICAgaWYgKCFpc0ZpcnN0UnVuKSB7XG4gICAgICAgIHRoaXMubnpTZWxlY3RDaGFuZ2UuZW1pdCh0aGlzLmNyZWF0ZUNoYW5nZUV2ZW50KGluZGV4VG9TZWxlY3QpKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2hhbmdpbmcgdGhlc2UgdmFsdWVzIGFmdGVyIGNoYW5nZSBkZXRlY3Rpb24gaGFzIHJ1blxuICAgICAgLy8gc2luY2UgdGhlIGNoZWNrZWQgY29udGVudCBtYXkgY29udGFpbiByZWZlcmVuY2VzIHRvIHRoZW0uXG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy50YWJzLmZvckVhY2goKHRhYiwgaW5kZXgpID0+ICh0YWIuaXNBY3RpdmUgPSBpbmRleCA9PT0gaW5kZXhUb1NlbGVjdCkpO1xuXG4gICAgICAgIGlmICghaXNGaXJzdFJ1bikge1xuICAgICAgICAgIHRoaXMubnpTZWxlY3RlZEluZGV4Q2hhbmdlLmVtaXQoaW5kZXhUb1NlbGVjdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFNldHVwIHRoZSBwb3NpdGlvbiBmb3IgZWFjaCB0YWIgYW5kIG9wdGlvbmFsbHkgc2V0dXAgYW4gb3JpZ2luIG9uIHRoZSBuZXh0IHNlbGVjdGVkIHRhYi5cbiAgICB0aGlzLnRhYnMuZm9yRWFjaCgodGFiOiBOelRhYkNvbXBvbmVudCwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgdGFiLnBvc2l0aW9uID0gaW5kZXggLSBpbmRleFRvU2VsZWN0O1xuXG4gICAgICAvLyBJZiB0aGVyZSBpcyBhbHJlYWR5IGEgc2VsZWN0ZWQgdGFiLCB0aGVuIHNldCB1cCBhbiBvcmlnaW4gZm9yIHRoZSBuZXh0IHNlbGVjdGVkIHRhYlxuICAgICAgLy8gaWYgaXQgZG9lc24ndCBoYXZlIG9uZSBhbHJlYWR5LlxuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleCAhPSBudWxsICYmIHRhYi5wb3NpdGlvbiA9PT0gMCAmJiAhdGFiLm9yaWdpbikge1xuICAgICAgICB0YWIub3JpZ2luID0gaW5kZXhUb1NlbGVjdCAtIHRoaXMuc2VsZWN0ZWRJbmRleDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXggIT09IGluZGV4VG9TZWxlY3QpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4VG9TZWxlY3Q7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBvbkNsb3NlKGluZGV4OiBudW1iZXIsIGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLm56Q2xvc2UuZW1pdCh7IGluZGV4IH0pO1xuICB9XG5cbiAgb25BZGQoKTogdm9pZCB7XG4gICAgdGhpcy5uekFkZC5lbWl0KCk7XG4gIH1cblxuICBwcml2YXRlIGNsYW1wVGFiSW5kZXgoaW5kZXg6IG51bWJlciB8IG51bGwpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLm1pbih0aGlzLnRhYnMubGVuZ3RoIC0gMSwgTWF0aC5tYXgoaW5kZXggfHwgMCwgMCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDaGFuZ2VFdmVudChpbmRleDogbnVtYmVyKTogTnpUYWJDaGFuZ2VFdmVudCB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgTnpUYWJDaGFuZ2VFdmVudCgpO1xuICAgIGV2ZW50LmluZGV4ID0gaW5kZXg7XG4gICAgaWYgKHRoaXMudGFicyAmJiB0aGlzLnRhYnMubGVuZ3RoKSB7XG4gICAgICBldmVudC50YWIgPSB0aGlzLnRhYnMudG9BcnJheSgpW2luZGV4XTtcbiAgICAgIHRoaXMudGFicy5mb3JFYWNoKCh0YWIsIGkpID0+IHtcbiAgICAgICAgaWYgKGkgIT09IGluZGV4KSB7XG4gICAgICAgICAgdGFiLm56RGVzZWxlY3QuZW1pdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGV2ZW50LnRhYi5uelNlbGVjdC5lbWl0KCk7XG4gICAgfVxuICAgIHJldHVybiBldmVudDtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9UYWJMYWJlbHMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudGFiTGFiZWxTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMudGFiTGFiZWxTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICB0aGlzLnRhYkxhYmVsU3Vic2NyaXB0aW9uID0gbWVyZ2UoLi4udGhpcy50YWJzLm1hcCh0YWIgPT4gdGFiLnN0YXRlQ2hhbmdlcykpLnN1YnNjcmliZSgoKSA9PlxuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb0FsbFRhYkNoYW5nZXMoKTogdm9pZCB7XG4gICAgdGhpcy5hbGxUYWJzLmNoYW5nZXMucGlwZShzdGFydFdpdGgodGhpcy5hbGxUYWJzKSkuc3Vic2NyaWJlKCh0YWJzOiBRdWVyeUxpc3Q8TnpUYWJDb21wb25lbnQ+KSA9PiB7XG4gICAgICB0aGlzLnRhYnMucmVzZXQodGFicy5maWx0ZXIodGFiID0+IHRhYi5jbG9zZXN0VGFiU2V0ID09PSB0aGlzKSk7XG4gICAgICB0aGlzLnRhYnMubm90aWZ5T25DaGFuZ2VzKCk7XG4gICAgfSk7XG4gIH1cblxuICBjYW5EZWFjdGl2YXRlRnVuKHByZTogbnVtYmVyLCBuZXh0OiBudW1iZXIpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBpZiAodHlwZW9mIHRoaXMubnpDYW5EZWFjdGl2YXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zdCBvYnNlcnZhYmxlID0gd3JhcEludG9PYnNlcnZhYmxlKHRoaXMubnpDYW5EZWFjdGl2YXRlKHByZSwgbmV4dCkpO1xuICAgICAgcmV0dXJuIG9ic2VydmFibGUucGlwZShmaXJzdCgpLCB0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb2YodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgY2xpY2tOYXZJdGVtKHRhYjogTnpUYWJDb21wb25lbnQsIGluZGV4OiBudW1iZXIsIGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRhYi5uekRpc2FibGVkKSB7XG4gICAgICAvLyBpZ25vcmUgbnpDYW5EZWFjdGl2YXRlXG4gICAgICB0YWIubnpDbGljay5lbWl0KCk7XG4gICAgICBpZiAoIXRoaXMuaXNSb3V0ZXJMaW5rQ2xpY2tFdmVudChpbmRleCwgZSkpIHtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZEluZGV4KGluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGlzUm91dGVyTGlua0NsaWNrRXZlbnQoaW5kZXg6IG51bWJlciwgZXZlbnQ6IE1vdXNlRXZlbnQpOiBib29sZWFuIHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgaWYgKHRoaXMubnpMaW5rUm91dGVyKSB7XG4gICAgICByZXR1cm4gISF0aGlzLnRhYnMudG9BcnJheSgpW2luZGV4XT8ubGlua0RpcmVjdGl2ZT8uZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHRhcmdldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjb250ZXh0bWVudU5hdkl0ZW0odGFiOiBOelRhYkNvbXBvbmVudCwgZTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGFiLm56RGlzYWJsZWQpIHtcbiAgICAgIC8vIGlnbm9yZSBuekNhbkRlYWN0aXZhdGVcbiAgICAgIHRhYi5uekNvbnRleHRtZW51LmVtaXQoZSk7XG4gICAgfVxuICB9XG5cbiAgc2V0U2VsZWN0ZWRJbmRleChpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5jYW5EZWFjdGl2YXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5jYW5EZWFjdGl2YXRlU3Vic2NyaXB0aW9uID0gdGhpcy5jYW5EZWFjdGl2YXRlRnVuKHRoaXMuc2VsZWN0ZWRJbmRleCEsIGluZGV4KS5zdWJzY3JpYmUoY2FuID0+IHtcbiAgICAgIGlmIChjYW4pIHtcbiAgICAgICAgdGhpcy5uelNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy50YWJOYXZCYXJSZWYuZm9jdXNJbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldFRhYkluZGV4KHRhYjogTnpUYWJDb21wb25lbnQsIGluZGV4OiBudW1iZXIpOiBudW1iZXIgfCBudWxsIHtcbiAgICBpZiAodGFiLm56RGlzYWJsZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEluZGV4ID09PSBpbmRleCA/IDAgOiAtMTtcbiAgfVxuXG4gIGdldFRhYkNvbnRlbnRJZChpOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgbnotdGFicy0ke3RoaXMudGFiU2V0SWR9LXRhYi0ke2l9YDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0VXBSb3V0ZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpMaW5rUm91dGVyKSB7XG4gICAgICBpZiAoIXRoaXMucm91dGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtQUkVGSVh9IHlvdSBzaG91bGQgaW1wb3J0ICdSb3V0ZXJNb2R1bGUnIGlmIHlvdSB3YW50IHRvIHVzZSAnbnpMaW5rUm91dGVyJyFgKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucm91dGVyLmV2ZW50c1xuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JCksXG4gICAgICAgICAgZmlsdGVyKGUgPT4gZSBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpLFxuICAgICAgICAgIHN0YXJ0V2l0aCh0cnVlKSxcbiAgICAgICAgICBkZWxheSgwKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMudXBkYXRlUm91dGVyQWN0aXZlKCk7XG4gICAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUm91dGVyQWN0aXZlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJvdXRlci5uYXZpZ2F0ZWQpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maW5kU2hvdWxkQWN0aXZlVGFiSW5kZXgoKTtcbiAgICAgIGlmIChpbmRleCAhPT0gdGhpcy5zZWxlY3RlZEluZGV4KSB7XG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRJbmRleChpbmRleCk7XG4gICAgICB9XG4gICAgICB0aGlzLm56SGlkZUFsbCA9IGluZGV4ID09PSAtMTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZpbmRTaG91bGRBY3RpdmVUYWJJbmRleCgpOiBudW1iZXIge1xuICAgIGNvbnN0IHRhYnMgPSB0aGlzLnRhYnMudG9BcnJheSgpO1xuICAgIGNvbnN0IGlzQWN0aXZlID0gdGhpcy5pc0xpbmtBY3RpdmUodGhpcy5yb3V0ZXIpO1xuXG4gICAgcmV0dXJuIHRhYnMuZmluZEluZGV4KHRhYiA9PiB7XG4gICAgICBjb25zdCBjID0gdGFiLmxpbmtEaXJlY3RpdmU7XG4gICAgICByZXR1cm4gYyA/IGlzQWN0aXZlKGMucm91dGVyTGluaykgfHwgaXNBY3RpdmUoYy5yb3V0ZXJMaW5rV2l0aEhyZWYpIDogZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGlzTGlua0FjdGl2ZShyb3V0ZXI6IFJvdXRlcik6IChsaW5rPzogUm91dGVyTGluayB8IFJvdXRlckxpbmtXaXRoSHJlZikgPT4gYm9vbGVhbiB7XG4gICAgcmV0dXJuIChsaW5rPzogUm91dGVyTGluayB8IFJvdXRlckxpbmtXaXRoSHJlZikgPT5cbiAgICAgIGxpbmtcbiAgICAgICAgPyByb3V0ZXIuaXNBY3RpdmUobGluay51cmxUcmVlIHx8ICcnLCB7XG4gICAgICAgICAgICBwYXRoczogdGhpcy5uekxpbmtFeGFjdCA/ICdleGFjdCcgOiAnc3Vic2V0JyxcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB0aGlzLm56TGlua0V4YWN0ID8gJ2V4YWN0JyA6ICdzdWJzZXQnLFxuICAgICAgICAgICAgZnJhZ21lbnQ6ICdpZ25vcmVkJyxcbiAgICAgICAgICAgIG1hdHJpeFBhcmFtczogJ2lnbm9yZWQnXG4gICAgICAgICAgfSlcbiAgICAgICAgOiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VGFiQ29udGVudE1hcmdpblZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIC0odGhpcy5uelNlbGVjdGVkSW5kZXggfHwgMCkgKiAxMDA7XG4gIH1cblxuICBnZXRUYWJDb250ZW50TWFyZ2luTGVmdCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLnRhYlBhbmVBbmltYXRlZCkge1xuICAgICAgaWYgKHRoaXMuZGlyICE9PSAncnRsJykge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRUYWJDb250ZW50TWFyZ2luVmFsdWUoKX0lYDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGdldFRhYkNvbnRlbnRNYXJnaW5SaWdodCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLnRhYlBhbmVBbmltYXRlZCkge1xuICAgICAgaWYgKHRoaXMuZGlyID09PSAncnRsJykge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRUYWJDb250ZW50TWFyZ2luVmFsdWUoKX0lYDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG59XG4iXX0=