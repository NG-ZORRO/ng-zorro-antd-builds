import { __decorate } from "tslib";
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean, InputNumber } from 'ng-zorro-antd/core/util';
import { getOffsetTop } from './util';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "ng-zorro-antd/core/services";
import * as i3 from "@angular/cdk/platform";
import * as i4 from "ng-zorro-antd/affix";
import * as i5 from "@angular/common";
const NZ_CONFIG_MODULE_NAME = 'anchor';
const sharpMatcherRegx = /#([^#]+)$/;
export class NzAnchorComponent {
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
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.NzConfigService }, { type: i2.NzScrollService }, { type: i0.ChangeDetectorRef }, { type: i3.Platform }, { type: i0.NgZone }, { type: i0.Renderer2 }]; }, propDecorators: { ink: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5jaG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvYW5jaG9yL2FuY2hvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFJTCxNQUFNLEVBR04sU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpELE9BQU8sRUFBZ0MsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFHckYsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUdwRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sUUFBUSxDQUFDOzs7Ozs7O0FBT3RDLE1BQU0scUJBQXFCLEdBQWdCLFFBQVEsQ0FBQztBQUNwRCxNQUFNLGdCQUFnQixHQUFHLFdBQVcsQ0FBQztBQXdCckMsTUFBTSxPQUFPLGlCQUFpQjtJQXlDNUIsWUFDNEIsR0FBYyxFQUNqQyxlQUFnQyxFQUMvQixTQUEwQixFQUMxQixHQUFzQixFQUN0QixRQUFrQixFQUNsQixJQUFZLEVBQ1osUUFBbUI7UUFORCxRQUFHLEdBQUgsR0FBRyxDQUFXO1FBQ2pDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUMvQixjQUFTLEdBQVQsU0FBUyxDQUFpQjtRQUMxQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixhQUFRLEdB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Ozs7O0dBY1Q7QUFhd0I7SUFBZixZQUFZLEVBQUU7a0RBQWdCO0FBS3hDO0lBRkMsVUFBVSxFQUFFO0lBQ1osWUFBWSxFQUFFOzJEQUNtQjtBQUtsQztJQUZDLFVBQVUsRUFBRTtJQUNaLFdBQVcsRUFBRTttREFDTztBQUtyQjtJQUZDLFdBQVcsQ0FBQyxTQUFTLENBQUM7SUFDdEIsVUFBVSxFQUFVO3NEQUNZOzJGQXhCdEIsaUJBQWlCO2tCQXRCN0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7R0FjVDtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzswQkEyQ0ksTUFBTTsyQkFBQyxRQUFROzRNQW5DMkIsR0FBRztzQkFBL0MsU0FBUzt1QkFBQyxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUVWLE9BQU87c0JBQS9CLEtBQUs7Z0JBS04sZ0JBQWdCO3NCQUhmLEtBQUs7Z0JBUU4sUUFBUTtzQkFIUCxLQUFLO2dCQVFOLFdBQVc7c0JBSFYsS0FBSztnQkFLRyxXQUFXO3NCQUFuQixLQUFLO2dCQUVhLE9BQU87c0JBQXpCLE1BQU07Z0JBQ1ksUUFBUTtzQkFBMUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwsIHRocm90dGxlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpDb25maWdLZXksIE56Q29uZmlnU2VydmljZSwgV2l0aENvbmZpZyB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9jb25maWcnO1xuaW1wb3J0IHsgTnpTY3JvbGxTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3NlcnZpY2VzJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgTmdTdHlsZUludGVyZmFjZSwgTnVtYmVySW5wdXQsIE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4sIElucHV0TnVtYmVyIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5pbXBvcnQgeyBOekFuY2hvckxpbmtDb21wb25lbnQgfSBmcm9tICcuL2FuY2hvci1saW5rLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBnZXRPZmZzZXRUb3AgfSBmcm9tICcuL3V0aWwnO1xuXG5pbnRlcmZhY2UgU2VjdGlvbiB7XG4gIGNvbXA6IE56QW5jaG9yTGlua0NvbXBvbmVudDtcbiAgdG9wOiBudW1iZXI7XG59XG5cbmNvbnN0IE5aX0NPTkZJR19NT0RVTEVfTkFNRTogTnpDb25maWdLZXkgPSAnYW5jaG9yJztcbmNvbnN0IHNoYXJwTWF0Y2hlclJlZ3ggPSAvIyhbXiNdKykkLztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotYW5jaG9yJyxcbiAgZXhwb3J0QXM6ICduekFuY2hvcicsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuei1hZmZpeCAqbmdJZj1cIm56QWZmaXg7IGVsc2UgY29udGVudFwiIFtuek9mZnNldFRvcF09XCJuek9mZnNldFRvcFwiIFtuelRhcmdldF09XCJjb250YWluZXJcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L256LWFmZml4PlxuICAgIDxuZy10ZW1wbGF0ZSAjY29udGVudD5cbiAgICAgIDxkaXYgY2xhc3M9XCJhbnQtYW5jaG9yLXdyYXBwZXJcIiBbbmdTdHlsZV09XCJ3cmFwcGVyU3R5bGVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC1hbmNob3JcIiBbbmdDbGFzc109XCJ7ICdhbnQtYW5jaG9yLWZpeGVkJzogIW56QWZmaXggJiYgIW56U2hvd0lua0luRml4ZWQgfVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtYW5jaG9yLWlua1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFudC1hbmNob3ItaW5rLWJhbGxcIiAjaW5rPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOekFuY2hvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcbiAgcmVhZG9ubHkgX256TW9kdWxlTmFtZTogTnpDb25maWdLZXkgPSBOWl9DT05GSUdfTU9EVUxFX05BTUU7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekFmZml4OiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dJbmtJbkZpeGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekJvdW5kczogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uek9mZnNldFRvcDogTnVtYmVySW5wdXQ7XG5cbiAgQFZpZXdDaGlsZCgnaW5rJywgeyBzdGF0aWM6IGZhbHNlIH0pIHByaXZhdGUgaW5rITogRWxlbWVudFJlZjtcblxuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpBZmZpeCA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgQFdpdGhDb25maWcoKVxuICBASW5wdXRCb29sZWFuKClcbiAgbnpTaG93SW5rSW5GaXhlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIEBXaXRoQ29uZmlnKClcbiAgQElucHV0TnVtYmVyKClcbiAgbnpCb3VuZHM6IG51bWJlciA9IDU7XG5cbiAgQElucHV0KClcbiAgQElucHV0TnVtYmVyKHVuZGVmaW5lZClcbiAgQFdpdGhDb25maWc8bnVtYmVyPigpXG4gIG56T2Zmc2V0VG9wPzogbnVtYmVyID0gdW5kZWZpbmVkO1xuXG4gIEBJbnB1dCgpIG56Q29udGFpbmVyPzogc3RyaW5nIHwgSFRNTEVsZW1lbnQ7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56U2Nyb2xsID0gbmV3IEV2ZW50RW1pdHRlcjxOekFuY2hvckxpbmtDb21wb25lbnQ+KCk7XG5cbiAgdmlzaWJsZSA9IGZhbHNlO1xuICB3cmFwcGVyU3R5bGU6IE5nU3R5bGVJbnRlcmZhY2UgPSB7ICdtYXgtaGVpZ2h0JzogJzEwMHZoJyB9O1xuXG4gIGNvbnRhaW5lcj86IEhUTUxFbGVtZW50IHwgV2luZG93O1xuXG4gIHByaXZhdGUgbGlua3M6IE56QW5jaG9yTGlua0NvbXBvbmVudFtdID0gW107XG4gIHByaXZhdGUgYW5pbWF0aW5nID0gZmFsc2U7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIGhhbmRsZVNjcm9sbFRpbWVvdXRJRCA9IC0xO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jOiBOelNhZmVBbnksXG4gICAgcHVibGljIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgc2Nyb2xsU3J2OiBOelNjcm9sbFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHt9XG5cbiAgcmVnaXN0ZXJMaW5rKGxpbms6IE56QW5jaG9yTGlua0NvbXBvbmVudCk6IHZvaWQge1xuICAgIHRoaXMubGlua3MucHVzaChsaW5rKTtcbiAgfVxuXG4gIHVucmVnaXN0ZXJMaW5rKGxpbms6IE56QW5jaG9yTGlua0NvbXBvbmVudCk6IHZvaWQge1xuICAgIHRoaXMubGlua3Muc3BsaWNlKHRoaXMubGlua3MuaW5kZXhPZihsaW5rKSwgMSk7XG4gIH1cblxuICBwcml2YXRlIGdldENvbnRhaW5lcigpOiBIVE1MRWxlbWVudCB8IFdpbmRvdyB7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyIHx8IHdpbmRvdztcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlZ2lzdGVyU2Nyb2xsRXZlbnQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmhhbmRsZVNjcm9sbFRpbWVvdXRJRCk7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZWdpc3RlclNjcm9sbEV2ZW50KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGZyb21FdmVudCh0aGlzLmdldENvbnRhaW5lcigpLCAnc2Nyb2xsJylcbiAgICAgICAgLnBpcGUodGhyb3R0bGVUaW1lKDUwKSwgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuaGFuZGxlU2Nyb2xsKCkpO1xuICAgIH0pO1xuICAgIC8vIEJyb3dzZXIgd291bGQgbWFpbnRhaW4gdGhlIHNjcm9sbGluZyBwb3NpdGlvbiB3aGVuIHJlZnJlc2hpbmcuXG4gICAgLy8gU28gd2UgaGF2ZSB0byBkZWxheSBjYWxjdWxhdGlvbiBpbiBhdm9pZCBvZiBnZXR0aW5nIGEgaW5jb3JyZWN0IHJlc3VsdC5cbiAgICB0aGlzLmhhbmRsZVNjcm9sbFRpbWVvdXRJRCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oYW5kbGVTY3JvbGwoKSk7XG4gIH1cblxuICBoYW5kbGVTY3JvbGwoKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgdGhpcy5hbmltYXRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzZWN0aW9uczogU2VjdGlvbltdID0gW107XG4gICAgY29uc3Qgc2NvcGUgPSAodGhpcy5uek9mZnNldFRvcCB8fCAwKSArIHRoaXMubnpCb3VuZHM7XG4gICAgdGhpcy5saW5rcy5mb3JFYWNoKGNvbXAgPT4ge1xuICAgICAgY29uc3Qgc2hhcnBMaW5rTWF0Y2ggPSBzaGFycE1hdGNoZXJSZWd4LmV4ZWMoY29tcC5uekhyZWYudG9TdHJpbmcoKSk7XG4gICAgICBpZiAoIXNoYXJwTGlua01hdGNoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZG9jLmdldEVsZW1lbnRCeUlkKHNoYXJwTGlua01hdGNoWzFdKTtcbiAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgY29uc3QgdG9wID0gZ2V0T2Zmc2V0VG9wKHRhcmdldCwgdGhpcy5nZXRDb250YWluZXIoKSk7XG4gICAgICAgIGlmICh0b3AgPCBzY29wZSkge1xuICAgICAgICAgIHNlY3Rpb25zLnB1c2goe1xuICAgICAgICAgICAgdG9wLFxuICAgICAgICAgICAgY29tcFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnZpc2libGUgPSAhIXNlY3Rpb25zLmxlbmd0aDtcbiAgICBpZiAoIXRoaXMudmlzaWJsZSkge1xuICAgICAgdGhpcy5jbGVhckFjdGl2ZSgpO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXhTZWN0aW9uID0gc2VjdGlvbnMucmVkdWNlKChwcmV2LCBjdXJyKSA9PiAoY3Vyci50b3AgPiBwcmV2LnRvcCA/IGN1cnIgOiBwcmV2KSk7XG4gICAgICB0aGlzLmhhbmRsZUFjdGl2ZShtYXhTZWN0aW9uLmNvbXApO1xuICAgIH1cbiAgICB0aGlzLnNldFZpc2libGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJBY3RpdmUoKTogdm9pZCB7XG4gICAgdGhpcy5saW5rcy5mb3JFYWNoKGkgPT4ge1xuICAgICAgaS51bnNldEFjdGl2ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVBY3RpdmUoY29tcDogTnpBbmNob3JMaW5rQ29tcG9uZW50KTogdm9pZCB7XG4gICAgdGhpcy5jbGVhckFjdGl2ZSgpO1xuICAgIGNvbXAuc2V0QWN0aXZlKCk7XG4gICAgY29uc3QgbGlua05vZGUgPSBjb21wLmdldExpbmtUaXRsZUVsZW1lbnQoKTtcbiAgICB0aGlzLmluay5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IGAke2xpbmtOb2RlLm9mZnNldFRvcCArIGxpbmtOb2RlLmNsaWVudEhlaWdodCAvIDIgLSA0LjV9cHhgO1xuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgdGhpcy5zZXRWaXNpYmxlKCk7XG4gICAgdGhpcy5uelNjcm9sbC5lbWl0KGNvbXApO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRWaXNpYmxlKCk6IHZvaWQge1xuICAgIGNvbnN0IHZpc2libGUgPSB0aGlzLnZpc2libGU7XG4gICAgY29uc3QgdmlzaWJsZUNsYXNzbmFtZSA9ICd2aXNpYmxlJztcbiAgICBpZiAodGhpcy5pbmspIHtcbiAgICAgIGlmICh2aXNpYmxlKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5pbmsubmF0aXZlRWxlbWVudCwgdmlzaWJsZUNsYXNzbmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuaW5rLm5hdGl2ZUVsZW1lbnQsIHZpc2libGVDbGFzc25hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVNjcm9sbFRvKGxpbmtDb21wOiBOekFuY2hvckxpbmtDb21wb25lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuZG9jLnF1ZXJ5U2VsZWN0b3IobGlua0NvbXAubnpIcmVmKTtcbiAgICBpZiAoIWVsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5hbmltYXRpbmcgPSB0cnVlO1xuICAgIGNvbnN0IGNvbnRhaW5lclNjcm9sbFRvcCA9IHRoaXMuc2Nyb2xsU3J2LmdldFNjcm9sbCh0aGlzLmdldENvbnRhaW5lcigpKTtcbiAgICBjb25zdCBlbE9mZnNldFRvcCA9IGdldE9mZnNldFRvcChlbCwgdGhpcy5nZXRDb250YWluZXIoKSk7XG4gICAgY29uc3QgdGFyZ2V0U2Nyb2xsVG9wID0gY29udGFpbmVyU2Nyb2xsVG9wICsgZWxPZmZzZXRUb3AgLSAodGhpcy5uek9mZnNldFRvcCB8fCAwKTtcbiAgICB0aGlzLnNjcm9sbFNydi5zY3JvbGxUbyh0aGlzLmdldENvbnRhaW5lcigpLCB0YXJnZXRTY3JvbGxUb3AsIHtcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGFuZGxlQWN0aXZlKGxpbmtDb21wKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLm56Q2xpY2suZW1pdChsaW5rQ29tcC5uekhyZWYpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbnpPZmZzZXRUb3AsIG56Q29udGFpbmVyIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChuek9mZnNldFRvcCkge1xuICAgICAgdGhpcy53cmFwcGVyU3R5bGUgPSB7XG4gICAgICAgICdtYXgtaGVpZ2h0JzogYGNhbGMoMTAwdmggLSAke3RoaXMubnpPZmZzZXRUb3B9cHgpYFxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKG56Q29udGFpbmVyKSB7XG4gICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLm56Q29udGFpbmVyO1xuICAgICAgdGhpcy5jb250YWluZXIgPSB0eXBlb2YgY29udGFpbmVyID09PSAnc3RyaW5nJyA/IHRoaXMuZG9jLnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyKSA6IGNvbnRhaW5lcjtcbiAgICAgIHRoaXMucmVnaXN0ZXJTY3JvbGxFdmVudCgpO1xuICAgIH1cbiAgfVxufVxuIl19