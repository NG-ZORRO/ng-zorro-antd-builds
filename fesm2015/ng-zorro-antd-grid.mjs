import * as i0 from '@angular/core';
import { Directive, Optional, Input, Host, NgModule } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i3 from 'ng-zorro-antd/core/services';
import { gridResponsiveMap } from 'ng-zorro-antd/core/services';
import * as i1 from '@angular/cdk/layout';
import { LayoutModule } from '@angular/cdk/layout';
import * as i2 from '@angular/cdk/platform';
import { PlatformModule } from '@angular/cdk/platform';
import * as i4 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import { isNotNil } from 'ng-zorro-antd/core/util';
import { CommonModule } from '@angular/common';

class NzRowDirective {
    constructor(elementRef, renderer, mediaMatcher, ngZone, platform, breakpointService, directionality) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.mediaMatcher = mediaMatcher;
        this.ngZone = ngZone;
        this.platform = platform;
        this.breakpointService = breakpointService;
        this.directionality = directionality;
        this.nzAlign = null;
        this.nzJustify = null;
        this.nzGutter = null;
        this.actualGutter$ = new ReplaySubject(1);
        this.dir = 'ltr';
        this.destroy$ = new Subject();
    }
    getGutter() {
        const results = [null, null];
        const gutter = this.nzGutter || 0;
        const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, null];
        normalizedGutter.forEach((g, index) => {
            if (typeof g === 'object' && g !== null) {
                results[index] = null;
                Object.keys(gridResponsiveMap).map((screen) => {
                    const bp = screen;
                    if (this.mediaMatcher.matchMedia(gridResponsiveMap[bp]).matches && g[bp]) {
                        results[index] = g[bp];
                    }
                });
            }
            else {
                results[index] = Number(g) || null;
            }
        });
        return results;
    }
    setGutterStyle() {
        const [horizontalGutter, verticalGutter] = this.getGutter();
        this.actualGutter$.next([horizontalGutter, verticalGutter]);
        const renderGutter = (name, gutter) => {
            const nativeElement = this.elementRef.nativeElement;
            if (gutter !== null) {
                this.renderer.setStyle(nativeElement, name, `-${gutter / 2}px`);
            }
        };
        renderGutter('margin-left', horizontalGutter);
        renderGutter('margin-right', horizontalGutter);
        renderGutter('margin-top', verticalGutter);
        renderGutter('margin-bottom', verticalGutter);
    }
    ngOnInit() {
        var _a;
        this.dir = this.directionality.value;
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
        });
        this.setGutterStyle();
    }
    ngOnChanges(changes) {
        if (changes.nzGutter) {
            this.setGutterStyle();
        }
    }
    ngAfterViewInit() {
        if (this.platform.isBrowser) {
            this.breakpointService
                .subscribe(gridResponsiveMap)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                this.setGutterStyle();
            });
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzRowDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRowDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.MediaMatcher }, { token: i0.NgZone }, { token: i2.Platform }, { token: i3.NzBreakpointService }, { token: i4.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NzRowDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzRowDirective, selector: "[nz-row],nz-row,nz-form-item", inputs: { nzAlign: "nzAlign", nzJustify: "nzJustify", nzGutter: "nzGutter" }, host: { properties: { "class.ant-row-top": "nzAlign === 'top'", "class.ant-row-middle": "nzAlign === 'middle'", "class.ant-row-bottom": "nzAlign === 'bottom'", "class.ant-row-start": "nzJustify === 'start'", "class.ant-row-end": "nzJustify === 'end'", "class.ant-row-center": "nzJustify === 'center'", "class.ant-row-space-around": "nzJustify === 'space-around'", "class.ant-row-space-between": "nzJustify === 'space-between'", "class.ant-row-rtl": "dir === \"rtl\"" }, classAttribute: "ant-row" }, exportAs: ["nzRow"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRowDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-row],nz-row,nz-form-item',
                    exportAs: 'nzRow',
                    host: {
                        class: 'ant-row',
                        '[class.ant-row-top]': `nzAlign === 'top'`,
                        '[class.ant-row-middle]': `nzAlign === 'middle'`,
                        '[class.ant-row-bottom]': `nzAlign === 'bottom'`,
                        '[class.ant-row-start]': `nzJustify === 'start'`,
                        '[class.ant-row-end]': `nzJustify === 'end'`,
                        '[class.ant-row-center]': `nzJustify === 'center'`,
                        '[class.ant-row-space-around]': `nzJustify === 'space-around'`,
                        '[class.ant-row-space-between]': `nzJustify === 'space-between'`,
                        '[class.ant-row-rtl]': `dir === "rtl"`
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.MediaMatcher }, { type: i0.NgZone }, { type: i2.Platform }, { type: i3.NzBreakpointService }, { type: i4.Directionality, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { nzAlign: [{
                type: Input
            }], nzJustify: [{
                type: Input
            }], nzGutter: [{
                type: Input
            }] } });

class NzColDirective {
    constructor(elementRef, nzRowDirective, renderer, directionality) {
        this.elementRef = elementRef;
        this.nzRowDirective = nzRowDirective;
        this.renderer = renderer;
        this.directionality = directionality;
        this.classMap = {};
        this.destroy$ = new Subject();
        this.hostFlexStyle = null;
        this.dir = 'ltr';
        this.nzFlex = null;
        this.nzSpan = null;
        this.nzOrder = null;
        this.nzOffset = null;
        this.nzPush = null;
        this.nzPull = null;
        this.nzXs = null;
        this.nzSm = null;
        this.nzMd = null;
        this.nzLg = null;
        this.nzXl = null;
        this.nzXXl = null;
    }
    setHostClassMap() {
        const hostClassMap = Object.assign({ ['ant-col']: true, [`ant-col-${this.nzSpan}`]: isNotNil(this.nzSpan), [`ant-col-order-${this.nzOrder}`]: isNotNil(this.nzOrder), [`ant-col-offset-${this.nzOffset}`]: isNotNil(this.nzOffset), [`ant-col-pull-${this.nzPull}`]: isNotNil(this.nzPull), [`ant-col-push-${this.nzPush}`]: isNotNil(this.nzPush), ['ant-col-rtl']: this.dir === 'rtl' }, this.generateClass());
        for (const i in this.classMap) {
            if (this.classMap.hasOwnProperty(i)) {
                this.renderer.removeClass(this.elementRef.nativeElement, i);
            }
        }
        this.classMap = Object.assign({}, hostClassMap);
        for (const i in this.classMap) {
            if (this.classMap.hasOwnProperty(i) && this.classMap[i]) {
                this.renderer.addClass(this.elementRef.nativeElement, i);
            }
        }
    }
    setHostFlexStyle() {
        this.hostFlexStyle = this.parseFlex(this.nzFlex);
    }
    parseFlex(flex) {
        if (typeof flex === 'number') {
            return `${flex} ${flex} auto`;
        }
        else if (typeof flex === 'string') {
            if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
                return `0 0 ${flex}`;
            }
        }
        return flex;
    }
    generateClass() {
        const listOfSizeInputName = ['nzXs', 'nzSm', 'nzMd', 'nzLg', 'nzXl', 'nzXXl'];
        const listClassMap = {};
        listOfSizeInputName.forEach(name => {
            const sizeName = name.replace('nz', '').toLowerCase();
            if (isNotNil(this[name])) {
                if (typeof this[name] === 'number' || typeof this[name] === 'string') {
                    listClassMap[`ant-col-${sizeName}-${this[name]}`] = true;
                }
                else {
                    const embedded = this[name];
                    const prefixArray = ['span', 'pull', 'push', 'offset', 'order'];
                    prefixArray.forEach(prefix => {
                        const prefixClass = prefix === 'span' ? '-' : `-${prefix}-`;
                        listClassMap[`ant-col-${sizeName}${prefixClass}${embedded[prefix]}`] =
                            embedded && isNotNil(embedded[prefix]);
                    });
                }
            }
        });
        return listClassMap;
    }
    ngOnInit() {
        this.dir = this.directionality.value;
        this.directionality.change.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.setHostClassMap();
        });
        this.setHostClassMap();
        this.setHostFlexStyle();
    }
    ngOnChanges(changes) {
        this.setHostClassMap();
        const { nzFlex } = changes;
        if (nzFlex) {
            this.setHostFlexStyle();
        }
    }
    ngAfterViewInit() {
        if (this.nzRowDirective) {
            this.nzRowDirective.actualGutter$
                .pipe(takeUntil(this.destroy$))
                .subscribe(([horizontalGutter, verticalGutter]) => {
                const renderGutter = (name, gutter) => {
                    const nativeElement = this.elementRef.nativeElement;
                    if (gutter !== null) {
                        this.renderer.setStyle(nativeElement, name, `${gutter / 2}px`);
                    }
                };
                renderGutter('padding-left', horizontalGutter);
                renderGutter('padding-right', horizontalGutter);
                renderGutter('padding-top', verticalGutter);
                renderGutter('padding-bottom', verticalGutter);
            });
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzColDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzColDirective, deps: [{ token: i0.ElementRef }, { token: NzRowDirective, host: true, optional: true }, { token: i0.Renderer2 }, { token: i4.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NzColDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzColDirective, selector: "[nz-col],nz-col,nz-form-control,nz-form-label", inputs: { nzFlex: "nzFlex", nzSpan: "nzSpan", nzOrder: "nzOrder", nzOffset: "nzOffset", nzPush: "nzPush", nzPull: "nzPull", nzXs: "nzXs", nzSm: "nzSm", nzMd: "nzMd", nzLg: "nzLg", nzXl: "nzXl", nzXXl: "nzXXl" }, host: { properties: { "style.flex": "hostFlexStyle" } }, exportAs: ["nzCol"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzColDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-col],nz-col,nz-form-control,nz-form-label',
                    exportAs: 'nzCol',
                    host: {
                        '[style.flex]': 'hostFlexStyle'
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: NzRowDirective, decorators: [{
                        type: Optional
                    }, {
                        type: Host
                    }] }, { type: i0.Renderer2 }, { type: i4.Directionality, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { nzFlex: [{
                type: Input
            }], nzSpan: [{
                type: Input
            }], nzOrder: [{
                type: Input
            }], nzOffset: [{
                type: Input
            }], nzPush: [{
                type: Input
            }], nzPull: [{
                type: Input
            }], nzXs: [{
                type: Input
            }], nzSm: [{
                type: Input
            }], nzMd: [{
                type: Input
            }], nzLg: [{
                type: Input
            }], nzXl: [{
                type: Input
            }], nzXXl: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzGridModule {
}
NzGridModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzGridModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzGridModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzGridModule, declarations: [NzColDirective, NzRowDirective], imports: [BidiModule, CommonModule, LayoutModule, PlatformModule], exports: [NzColDirective, NzRowDirective] });
NzGridModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzGridModule, imports: [[BidiModule, CommonModule, LayoutModule, PlatformModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzGridModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzColDirective, NzRowDirective],
                    exports: [NzColDirective, NzRowDirective],
                    imports: [BidiModule, CommonModule, LayoutModule, PlatformModule]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzColDirective, NzGridModule, NzRowDirective };
//# sourceMappingURL=ng-zorro-antd-grid.mjs.map
