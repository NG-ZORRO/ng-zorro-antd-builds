import { PlatformModule } from '@angular/cdk/platform';
import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Optional, Inject, Self, Directive, Input, NgModule } from '@angular/core';
import { __decorate } from 'tslib';
import { Subject, from } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IconService, IconDirective } from '@ant-design/icons-angular';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { DOCUMENT } from '@angular/common';
import { warn } from 'ng-zorro-antd/core/logger';
import { BarsOutline, CalendarOutline, CaretUpFill, CaretUpOutline, CaretDownFill, CaretDownOutline, CheckCircleFill, CheckCircleOutline, CheckOutline, ClockCircleOutline, CloseCircleOutline, CloseCircleFill, CloseOutline, CopyOutline, DoubleLeftOutline, DoubleRightOutline, DownOutline, EditOutline, EllipsisOutline, ExclamationCircleFill, ExclamationCircleOutline, EyeOutline, FileFill, FileOutline, FilterFill, InfoCircleFill, InfoCircleOutline, LeftOutline, LoadingOutline, PaperClipOutline, QuestionCircleOutline, RightOutline, RotateRightOutline, RotateLeftOutline, StarFill, SearchOutline, UploadOutline, VerticalAlignTopOutline, UpOutline, SwapRightOutline, ZoomInOutline, ZoomOutOutline } from '@ant-design/icons-angular/icons';
import * as i1 from '@angular/platform-browser';
import * as i2 from 'ng-zorro-antd/core/config';
import * as i3 from '@angular/common/http';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const NZ_ICONS_USED_BY_ZORRO = [
    BarsOutline,
    CalendarOutline,
    CaretUpFill,
    CaretUpOutline,
    CaretDownFill,
    CaretDownOutline,
    CheckCircleFill,
    CheckCircleOutline,
    CheckOutline,
    ClockCircleOutline,
    CloseCircleOutline,
    CloseCircleFill,
    CloseOutline,
    CopyOutline,
    DoubleLeftOutline,
    DoubleRightOutline,
    DownOutline,
    EditOutline,
    EllipsisOutline,
    ExclamationCircleFill,
    ExclamationCircleOutline,
    EyeOutline,
    FileFill,
    FileOutline,
    FilterFill,
    InfoCircleFill,
    InfoCircleOutline,
    LeftOutline,
    LoadingOutline,
    PaperClipOutline,
    QuestionCircleOutline,
    RightOutline,
    RotateRightOutline,
    RotateLeftOutline,
    StarFill,
    SearchOutline,
    StarFill,
    UploadOutline,
    VerticalAlignTopOutline,
    UpOutline,
    SwapRightOutline,
    ZoomInOutline,
    ZoomOutOutline
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const NZ_ICONS = new InjectionToken('nz_icons');
const NZ_ICON_DEFAULT_TWOTONE_COLOR = new InjectionToken('nz_icon_default_twotone_color');
const DEFAULT_TWOTONE_COLOR = '#1890ff';
/**
 * It should be a global singleton, otherwise registered icons could not be found.
 */
class NzIconService extends IconService {
    constructor(rendererFactory, sanitizer, nzConfigService, handler, _document, icons) {
        super(rendererFactory, handler, _document, sanitizer);
        this.nzConfigService = nzConfigService;
        this.configUpdated$ = new Subject();
        this.iconfontCache = new Set();
        this.subscription = null;
        this.onConfigChange();
        this.addIcon(...NZ_ICONS_USED_BY_ZORRO, ...(icons || []));
        this.configDefaultTwotoneColor();
        this.configDefaultTheme();
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }
    normalizeSvgElement(svg) {
        if (!svg.getAttribute('viewBox')) {
            this._renderer.setAttribute(svg, 'viewBox', '0 0 1024 1024');
        }
        if (!svg.getAttribute('width') || !svg.getAttribute('height')) {
            this._renderer.setAttribute(svg, 'width', '1em');
            this._renderer.setAttribute(svg, 'height', '1em');
        }
        if (!svg.getAttribute('fill')) {
            this._renderer.setAttribute(svg, 'fill', 'currentColor');
        }
    }
    fetchFromIconfont(opt) {
        const { scriptUrl } = opt;
        if (this._document && !this.iconfontCache.has(scriptUrl)) {
            const script = this._renderer.createElement('script');
            this._renderer.setAttribute(script, 'src', scriptUrl);
            this._renderer.setAttribute(script, 'data-namespace', scriptUrl.replace(/^(https?|http):/g, ''));
            this._renderer.appendChild(this._document.body, script);
            this.iconfontCache.add(scriptUrl);
        }
    }
    createIconfontIcon(type) {
        return this._createSVGElementFromString(`<svg><use xlink:href="${type}"></svg>`);
    }
    onConfigChange() {
        this.subscription = this.nzConfigService.getConfigChangeEventForComponent('icon').subscribe(() => {
            this.configDefaultTwotoneColor();
            this.configDefaultTheme();
            this.configUpdated$.next();
        });
    }
    configDefaultTheme() {
        const iconConfig = this.getConfig();
        this.defaultTheme = iconConfig.nzTheme || 'outline';
    }
    configDefaultTwotoneColor() {
        const iconConfig = this.getConfig();
        const defaultTwotoneColor = iconConfig.nzTwotoneColor || DEFAULT_TWOTONE_COLOR;
        let primaryColor = DEFAULT_TWOTONE_COLOR;
        if (defaultTwotoneColor) {
            if (defaultTwotoneColor.startsWith('#')) {
                primaryColor = defaultTwotoneColor;
            }
            else {
                warn('Twotone color must be a hex color!');
            }
        }
        this.twoToneColor = { primaryColor };
    }
    getConfig() {
        return this.nzConfigService.getConfigForComponent('icon') || {};
    }
}
NzIconService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzIconService, deps: [{ token: i0.RendererFactory2 }, { token: i1.DomSanitizer }, { token: i2.NzConfigService }, { token: i3.HttpBackend, optional: true }, { token: DOCUMENT, optional: true }, { token: NZ_ICONS, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
NzIconService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzIconService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzIconService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () {
        return [{ type: i0.RendererFactory2 }, { type: i1.DomSanitizer }, { type: i2.NzConfigService }, { type: i3.HttpBackend, decorators: [{
                        type: Optional
                    }] }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [DOCUMENT]
                    }] }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [NZ_ICONS]
                    }] }];
    } });
const NZ_ICONS_PATCH = new InjectionToken('nz_icons_patch');
class NzIconPatchService {
    constructor(extraIcons, rootIconService) {
        this.extraIcons = extraIcons;
        this.rootIconService = rootIconService;
        this.patched = false;
    }
    doPatch() {
        if (this.patched) {
            return;
        }
        this.extraIcons.forEach(iconDefinition => this.rootIconService.addIcon(iconDefinition));
        this.patched = true;
    }
}
NzIconPatchService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzIconPatchService, deps: [{ token: NZ_ICONS_PATCH, self: true }, { token: NzIconService }], target: i0.ɵɵFactoryTarget.Injectable });
NzIconPatchService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzIconPatchService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzIconPatchService, decorators: [{
            type: Injectable
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Self
                    }, {
                        type: Inject,
                        args: [NZ_ICONS_PATCH]
                    }] }, { type: NzIconService }];
    } });

class NzIconDirective extends IconDirective {
    constructor(ngZone, changeDetectorRef, elementRef, iconService, renderer, iconPatch) {
        super(iconService, elementRef, renderer);
        this.ngZone = ngZone;
        this.changeDetectorRef = changeDetectorRef;
        this.iconService = iconService;
        this.renderer = renderer;
        this.cacheClassName = null;
        this.nzRotate = 0;
        this.spin = false;
        this.destroy$ = new Subject();
        if (iconPatch) {
            iconPatch.doPatch();
        }
        this.el = elementRef.nativeElement;
    }
    set nzSpin(value) {
        this.spin = value;
    }
    set nzType(value) {
        this.type = value;
    }
    set nzTheme(value) {
        this.theme = value;
    }
    set nzTwotoneColor(value) {
        this.twoToneColor = value;
    }
    set nzIconfont(value) {
        this.iconfont = value;
    }
    ngOnChanges(changes) {
        const { nzType, nzTwotoneColor, nzSpin, nzTheme, nzRotate } = changes;
        if (nzType || nzTwotoneColor || nzSpin || nzTheme) {
            this.changeIcon2();
        }
        else if (nzRotate) {
            this.handleRotate(this.el.firstChild);
        }
        else {
            this._setSVGElement(this.iconService.createIconfontIcon(`#${this.iconfont}`));
        }
    }
    ngOnInit() {
        this.renderer.setAttribute(this.el, 'class', `anticon ${this.el.className}`.trim());
    }
    /**
     * If custom content is provided, try to normalize SVG elements.
     */
    ngAfterContentChecked() {
        if (!this.type) {
            const children = this.el.children;
            let length = children.length;
            if (!this.type && children.length) {
                while (length--) {
                    const child = children[length];
                    if (child.tagName.toLowerCase() === 'svg') {
                        this.iconService.normalizeSvgElement(child);
                    }
                }
            }
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
    }
    /**
     * Replacement of `changeIcon` for more modifications.
     */
    changeIcon2() {
        this.setClassName();
        // We don't need to re-enter the Angular zone for adding classes or attributes through the renderer.
        this.ngZone.runOutsideAngular(() => {
            from(this._changeIcon())
                .pipe(takeUntil(this.destroy$))
                .subscribe(svgOrRemove => {
                // The _changeIcon method would call Renderer to remove the element of the old icon,
                // which would call `markElementAsRemoved` eventually,
                // so we should call `detectChanges` to tell Angular remove the DOM node.
                // #7186
                this.changeDetectorRef.detectChanges();
                if (svgOrRemove) {
                    this.setSVGData(svgOrRemove);
                    this.handleSpin(svgOrRemove);
                    this.handleRotate(svgOrRemove);
                }
            });
        });
    }
    handleSpin(svg) {
        if (this.spin || this.type === 'loading') {
            this.renderer.addClass(svg, 'anticon-spin');
        }
        else {
            this.renderer.removeClass(svg, 'anticon-spin');
        }
    }
    handleRotate(svg) {
        if (this.nzRotate) {
            this.renderer.setAttribute(svg, 'style', `transform: rotate(${this.nzRotate}deg)`);
        }
        else {
            this.renderer.removeAttribute(svg, 'style');
        }
    }
    setClassName() {
        if (this.cacheClassName) {
            this.renderer.removeClass(this.el, this.cacheClassName);
        }
        this.cacheClassName = `anticon-${this.type}`;
        this.renderer.addClass(this.el, this.cacheClassName);
    }
    setSVGData(svg) {
        this.renderer.setAttribute(svg, 'data-icon', this.type);
        this.renderer.setAttribute(svg, 'aria-hidden', 'true');
    }
}
NzIconDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzIconDirective, deps: [{ token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: NzIconService }, { token: i0.Renderer2 }, { token: NzIconPatchService, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NzIconDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzIconDirective, selector: "[nz-icon]", inputs: { nzSpin: "nzSpin", nzRotate: "nzRotate", nzType: "nzType", nzTheme: "nzTheme", nzTwotoneColor: "nzTwotoneColor", nzIconfont: "nzIconfont" }, host: { properties: { "class.anticon": "true" } }, exportAs: ["nzIcon"], usesInheritance: true, usesOnChanges: true, ngImport: i0 });
__decorate([
    InputBoolean()
], NzIconDirective.prototype, "nzSpin", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzIconDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-icon]',
                    exportAs: 'nzIcon',
                    host: {
                        '[class.anticon]': 'true'
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: NzIconService }, { type: i0.Renderer2 }, { type: NzIconPatchService, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { nzSpin: [{
                type: Input
            }], nzRotate: [{
                type: Input
            }], nzType: [{
                type: Input
            }], nzTheme: [{
                type: Input
            }], nzTwotoneColor: [{
                type: Input
            }], nzIconfont: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzIconModule {
    static forRoot(icons) {
        return {
            ngModule: NzIconModule,
            providers: [
                {
                    provide: NZ_ICONS,
                    useValue: icons
                }
            ]
        };
    }
    static forChild(icons) {
        return {
            ngModule: NzIconModule,
            providers: [
                NzIconPatchService,
                {
                    provide: NZ_ICONS_PATCH,
                    useValue: icons
                }
            ]
        };
    }
}
NzIconModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzIconModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzIconModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzIconModule, declarations: [NzIconDirective], imports: [PlatformModule], exports: [NzIconDirective] });
NzIconModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzIconModule, imports: [[PlatformModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzIconModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [NzIconDirective],
                    declarations: [NzIconDirective],
                    imports: [PlatformModule]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DEFAULT_TWOTONE_COLOR, NZ_ICONS, NZ_ICONS_PATCH, NZ_ICONS_USED_BY_ZORRO, NZ_ICON_DEFAULT_TWOTONE_COLOR, NzIconDirective, NzIconModule, NzIconPatchService, NzIconService };
//# sourceMappingURL=ng-zorro-antd-icon.mjs.map
