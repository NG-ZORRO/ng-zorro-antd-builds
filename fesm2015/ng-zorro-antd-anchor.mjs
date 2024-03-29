import * as i0 from '@angular/core';
import { EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, Inject, ViewChild, Input, Output, TemplateRef, ContentChild, NgModule } from '@angular/core';
import { __decorate } from 'tslib';
import * as i5 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import { Subject, fromEvent } from 'rxjs';
import { throttleTime, takeUntil } from 'rxjs/operators';
import * as i1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean, InputNumber } from 'ng-zorro-antd/core/util';
import * as i2 from 'ng-zorro-antd/core/services';
import * as i3 from '@angular/cdk/platform';
import { PlatformModule } from '@angular/cdk/platform';
import * as i4 from 'ng-zorro-antd/affix';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { BidiModule } from '@angular/cdk/bidi';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function getOffsetTop(element, container) {
    if (!element || !element.getClientRects().length) {
        return 0;
    }
    const rect = element.getBoundingClientRect();
    if (rect.width || rect.height) {
        if (container === window) {
            const documentElement = element.ownerDocument.documentElement;
            return rect.top - documentElement.clientTop;
        }
        return rect.top - container.getBoundingClientRect().top;
    }
    return rect.top;
}

const NZ_CONFIG_MODULE_NAME = 'anchor';
const sharpMatcherRegx = /#([^#]+)$/;
class NzAnchorComponent {
    constructor(doc, nzConfigService, scrollSrv, cdr, platform, zone, renderer) {
        this.doc = doc;
        this.nzConfigService = nzConfigService;
        this.scrollSrv = scrollSrv;
        this.cdr = cdr;
        this.platform = platform;
        this.zone = zone;
        this.renderer = renderer;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzAffix = true;
        this.nzShowInkInFixed = false;
        this.nzBounds = 5;
        this.nzOffsetTop = undefined;
        this.nzClick = new EventEmitter();
        this.nzScroll = new EventEmitter();
        this.visible = false;
        this.wrapperStyle = { 'max-height': '100vh' };
        this.links = [];
        this.animating = false;
        this.destroy$ = new Subject();
        this.handleScrollTimeoutID = -1;
    }
    registerLink(link) {
        this.links.push(link);
    }
    unregisterLink(link) {
        this.links.splice(this.links.indexOf(link), 1);
    }
    getContainer() {
        return this.container || window;
    }
    ngAfterViewInit() {
        this.registerScrollEvent();
    }
    ngOnDestroy() {
        clearTimeout(this.handleScrollTimeoutID);
        this.destroy$.next();
        this.destroy$.complete();
    }
    registerScrollEvent() {
        if (!this.platform.isBrowser) {
            return;
        }
        this.destroy$.next();
        this.zone.runOutsideAngular(() => {
            fromEvent(this.getContainer(), 'scroll')
                .pipe(throttleTime(50), takeUntil(this.destroy$))
                .subscribe(() => this.handleScroll());
        });
        // Browser would maintain the scrolling position when refreshing.
        // So we have to delay calculation in avoid of getting a incorrect result.
        this.handleScrollTimeoutID = setTimeout(() => this.handleScroll());
    }
    handleScroll() {
        if (typeof document === 'undefined' || this.animating) {
            return;
        }
        const sections = [];
        const scope = (this.nzOffsetTop || 0) + this.nzBounds;
        this.links.forEach(comp => {
            const sharpLinkMatch = sharpMatcherRegx.exec(comp.nzHref.toString());
            if (!sharpLinkMatch) {
                return;
            }
            const target = this.doc.getElementById(sharpLinkMatch[1]);
            if (target) {
                const top = getOffsetTop(target, this.getContainer());
                if (top < scope) {
                    sections.push({
                        top,
                        comp
                    });
                }
            }
        });
        this.visible = !!sections.length;
        if (!this.visible) {
            this.clearActive();
            this.cdr.detectChanges();
        }
        else {
            const maxSection = sections.reduce((prev, curr) => (curr.top > prev.top ? curr : prev));
            this.handleActive(maxSection.comp);
        }
        this.setVisible();
    }
    clearActive() {
        this.links.forEach(i => {
            i.unsetActive();
        });
    }
    handleActive(comp) {
        this.clearActive();
        comp.setActive();
        const linkNode = comp.getLinkTitleElement();
        this.ink.nativeElement.style.top = `${linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5}px`;
        this.visible = true;
        this.setVisible();
        this.nzScroll.emit(comp);
    }
    setVisible() {
        const visible = this.visible;
        const visibleClassname = 'visible';
        if (this.ink) {
            if (visible) {
                this.renderer.addClass(this.ink.nativeElement, visibleClassname);
            }
            else {
                this.renderer.removeClass(this.ink.nativeElement, visibleClassname);
            }
        }
    }
    handleScrollTo(linkComp) {
        const el = this.doc.querySelector(linkComp.nzHref);
        if (!el) {
            return;
        }
        this.animating = true;
        const containerScrollTop = this.scrollSrv.getScroll(this.getContainer());
        const elOffsetTop = getOffsetTop(el, this.getContainer());
        const targetScrollTop = containerScrollTop + elOffsetTop - (this.nzOffsetTop || 0);
        this.scrollSrv.scrollTo(this.getContainer(), targetScrollTop, {
            callback: () => {
                this.animating = false;
                this.handleActive(linkComp);
            }
        });
        this.nzClick.emit(linkComp.nzHref);
    }
    ngOnChanges(changes) {
        const { nzOffsetTop, nzContainer } = changes;
        if (nzOffsetTop) {
            this.wrapperStyle = {
                'max-height': `calc(100vh - ${this.nzOffsetTop}px)`
            };
        }
        if (nzContainer) {
            const container = this.nzContainer;
            this.container = typeof container === 'string' ? this.doc.querySelector(container) : container;
            this.registerScrollEvent();
        }
    }
}
NzAnchorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAnchorComponent, deps: [{ token: DOCUMENT }, { token: i1.NzConfigService }, { token: i2.NzScrollService }, { token: i0.ChangeDetectorRef }, { token: i3.Platform }, { token: i0.NgZone }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
NzAnchorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzAnchorComponent, selector: "nz-anchor", inputs: { nzAffix: "nzAffix", nzShowInkInFixed: "nzShowInkInFixed", nzBounds: "nzBounds", nzOffsetTop: "nzOffsetTop", nzContainer: "nzContainer" }, outputs: { nzClick: "nzClick", nzScroll: "nzScroll" }, viewQueries: [{ propertyName: "ink", first: true, predicate: ["ink"], descendants: true }], exportAs: ["nzAnchor"], usesOnChanges: true, ngImport: i0, template: `
    <nz-affix *ngIf="nzAffix; else content" [nzOffsetTop]="nzOffsetTop" [nzTarget]="container">
      <ng-template [ngTemplateOutlet]="content"></ng-template>
    </nz-affix>
    <ng-template #content>
      <div class="ant-anchor-wrapper" [ngStyle]="wrapperStyle">
        <div class="ant-anchor" [ngClass]="{ 'ant-anchor-fixed': !nzAffix && !nzShowInkInFixed }">
          <div class="ant-anchor-ink">
            <div class="ant-anchor-ink-ball" #ink></div>
          </div>
          <ng-content></ng-content>
        </div>
      </div>
    </ng-template>
  `, isInline: true, components: [{ type: i4.NzAffixComponent, selector: "nz-affix", inputs: ["nzTarget", "nzOffsetTop", "nzOffsetBottom"], outputs: ["nzChange"], exportAs: ["nzAffix"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i5.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzAnchorComponent.prototype, "nzAffix", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzAnchorComponent.prototype, "nzShowInkInFixed", void 0);
__decorate([
    WithConfig(),
    InputNumber()
], NzAnchorComponent.prototype, "nzBounds", void 0);
__decorate([
    InputNumber(undefined),
    WithConfig()
], NzAnchorComponent.prototype, "nzOffsetTop", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAnchorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-anchor',
                    exportAs: 'nzAnchor',
                    preserveWhitespaces: false,
                    template: `
    <nz-affix *ngIf="nzAffix; else content" [nzOffsetTop]="nzOffsetTop" [nzTarget]="container">
      <ng-template [ngTemplateOutlet]="content"></ng-template>
    </nz-affix>
    <ng-template #content>
      <div class="ant-anchor-wrapper" [ngStyle]="wrapperStyle">
        <div class="ant-anchor" [ngClass]="{ 'ant-anchor-fixed': !nzAffix && !nzShowInkInFixed }">
          <div class="ant-anchor-ink">
            <div class="ant-anchor-ink-ball" #ink></div>
          </div>
          <ng-content></ng-content>
        </div>
      </div>
    </ng-template>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [DOCUMENT]
                    }] }, { type: i1.NzConfigService }, { type: i2.NzScrollService }, { type: i0.ChangeDetectorRef }, { type: i3.Platform }, { type: i0.NgZone }, { type: i0.Renderer2 }];
    }, propDecorators: { ink: [{
                type: ViewChild,
                args: ['ink', { static: false }]
            }], nzAffix: [{
                type: Input
            }], nzShowInkInFixed: [{
                type: Input
            }], nzBounds: [{
                type: Input
            }], nzOffsetTop: [{
                type: Input
            }], nzContainer: [{
                type: Input
            }], nzClick: [{
                type: Output
            }], nzScroll: [{
                type: Output
            }] } });

class NzAnchorLinkComponent {
    constructor(elementRef, anchorComp, platform, renderer) {
        this.elementRef = elementRef;
        this.anchorComp = anchorComp;
        this.platform = platform;
        this.renderer = renderer;
        this.nzHref = '#';
        this.titleStr = '';
        this.renderer.addClass(elementRef.nativeElement, 'ant-anchor-link');
    }
    set nzTitle(value) {
        if (value instanceof TemplateRef) {
            this.titleStr = null;
            this.titleTpl = value;
        }
        else {
            this.titleStr = value;
        }
    }
    ngOnInit() {
        this.anchorComp.registerLink(this);
    }
    getLinkTitleElement() {
        return this.linkTitle.nativeElement;
    }
    setActive() {
        this.renderer.addClass(this.elementRef.nativeElement, 'ant-anchor-link-active');
    }
    unsetActive() {
        this.renderer.removeClass(this.elementRef.nativeElement, 'ant-anchor-link-active');
    }
    goToClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.platform.isBrowser) {
            this.anchorComp.handleScrollTo(this);
        }
    }
    ngOnDestroy() {
        this.anchorComp.unregisterLink(this);
    }
}
NzAnchorLinkComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAnchorLinkComponent, deps: [{ token: i0.ElementRef }, { token: NzAnchorComponent }, { token: i3.Platform }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
NzAnchorLinkComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzAnchorLinkComponent, selector: "nz-link", inputs: { nzHref: "nzHref", nzTitle: "nzTitle" }, queries: [{ propertyName: "nzTemplate", first: true, predicate: ["nzTemplate"], descendants: true }], viewQueries: [{ propertyName: "linkTitle", first: true, predicate: ["linkTitle"], descendants: true }], exportAs: ["nzLink"], ngImport: i0, template: `
    <a #linkTitle (click)="goToClick($event)" href="{{ nzHref }}" class="ant-anchor-link-title" title="{{ titleStr }}">
      <span *ngIf="titleStr; else titleTpl || nzTemplate">{{ titleStr }}</span>
    </a>
    <ng-content></ng-content>
  `, isInline: true, directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAnchorLinkComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-link',
                    exportAs: 'nzLink',
                    preserveWhitespaces: false,
                    template: `
    <a #linkTitle (click)="goToClick($event)" href="{{ nzHref }}" class="ant-anchor-link-title" title="{{ titleStr }}">
      <span *ngIf="titleStr; else titleTpl || nzTemplate">{{ titleStr }}</span>
    </a>
    <ng-content></ng-content>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: NzAnchorComponent }, { type: i3.Platform }, { type: i0.Renderer2 }]; }, propDecorators: { nzHref: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzTemplate: [{
                type: ContentChild,
                args: ['nzTemplate', { static: false }]
            }], linkTitle: [{
                type: ViewChild,
                args: ['linkTitle']
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzAnchorModule {
}
NzAnchorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAnchorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzAnchorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAnchorModule, declarations: [NzAnchorComponent, NzAnchorLinkComponent], imports: [BidiModule, CommonModule, NzAffixModule, PlatformModule], exports: [NzAnchorComponent, NzAnchorLinkComponent] });
NzAnchorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAnchorModule, imports: [[BidiModule, CommonModule, NzAffixModule, PlatformModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAnchorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzAnchorComponent, NzAnchorLinkComponent],
                    exports: [NzAnchorComponent, NzAnchorLinkComponent],
                    imports: [BidiModule, CommonModule, NzAffixModule, PlatformModule]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzAnchorComponent, NzAnchorLinkComponent, NzAnchorModule };
//# sourceMappingURL=ng-zorro-antd-anchor.mjs.map
