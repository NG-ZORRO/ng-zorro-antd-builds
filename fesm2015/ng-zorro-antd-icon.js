import { PlatformModule } from '@angular/cdk/platform';
import { InjectionToken, ɵɵdefineInjectable, ɵɵinject, RendererFactory2, Injectable, Optional, Inject, Self, Directive, ElementRef, Renderer2, Input, NgModule } from '@angular/core';
import { __decorate, __metadata } from 'tslib';
import { IconService, IconDirective } from '@ant-design/icons-angular';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { DOCUMENT } from '@angular/common';
import { HttpBackend } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { warn } from 'ng-zorro-antd/core/logger';
import { Subject } from 'rxjs';
import { BarsOutline, CalendarOutline, CaretUpFill, CaretUpOutline, CaretDownFill, CaretDownOutline, CheckCircleFill, CheckCircleOutline, CheckOutline, ClockCircleOutline, CloseCircleOutline, CloseCircleFill, CloseOutline, CopyOutline, DoubleLeftOutline, DoubleRightOutline, DownOutline, EditOutline, EllipsisOutline, ExclamationCircleFill, ExclamationCircleOutline, EyeOutline, FileFill, FileOutline, FilterFill, InfoCircleFill, InfoCircleOutline, LeftOutline, LoadingOutline, PaperClipOutline, QuestionCircleOutline, RightOutline, RotateRightOutline, RotateLeftOutline, StarFill, SearchOutline, UploadOutline, VerticalAlignTopOutline, UpOutline, SwapRightOutline, ZoomInOutline, ZoomOutOutline } from '@ant-design/icons-angular/icons';

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
        this.onConfigChange();
        this.addIcon(...NZ_ICONS_USED_BY_ZORRO, ...(icons || []));
        this.configDefaultTwotoneColor();
        this.configDefaultTheme();
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
        this.nzConfigService.getConfigChangeEventForComponent('icon').subscribe(() => {
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
NzIconService.ɵprov = ɵɵdefineInjectable({ factory: function NzIconService_Factory() { return new NzIconService(ɵɵinject(RendererFactory2), ɵɵinject(DomSanitizer), ɵɵinject(NzConfigService), ɵɵinject(HttpBackend, 8), ɵɵinject(DOCUMENT, 8), ɵɵinject(NZ_ICONS, 8)); }, token: NzIconService, providedIn: "root" });
NzIconService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
NzIconService.ctorParameters = () => [
    { type: RendererFactory2 },
    { type: DomSanitizer },
    { type: NzConfigService },
    { type: HttpBackend, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] },
    { type: Array, decorators: [{ type: Optional }, { type: Inject, args: [NZ_ICONS,] }] }
];
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
NzIconPatchService.decorators = [
    { type: Injectable }
];
NzIconPatchService.ctorParameters = () => [
    { type: Array, decorators: [{ type: Self }, { type: Inject, args: [NZ_ICONS_PATCH,] }] },
    { type: NzIconService }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzIconDirective extends IconDirective {
    constructor(elementRef, iconService, renderer, iconPatch) {
        super(iconService, elementRef, renderer);
        this.iconService = iconService;
        this.renderer = renderer;
        this.cacheClassName = null;
        this.nzRotate = 0;
        this.spin = false;
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
    /**
     * Replacement of `changeIcon` for more modifications.
     */
    changeIcon2() {
        this.setClassName();
        this._changeIcon().then(svgOrRemove => {
            if (svgOrRemove) {
                this.setSVGData(svgOrRemove);
                this.handleSpin(svgOrRemove);
                this.handleRotate(svgOrRemove);
            }
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
NzIconDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nz-icon]',
                exportAs: 'nzIcon',
                host: {
                    '[class.anticon]': 'true'
                }
            },] }
];
NzIconDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NzIconService },
    { type: Renderer2 },
    { type: NzIconPatchService, decorators: [{ type: Optional }] }
];
NzIconDirective.propDecorators = {
    nzSpin: [{ type: Input }],
    nzRotate: [{ type: Input }],
    nzType: [{ type: Input }],
    nzTheme: [{ type: Input }],
    nzTwotoneColor: [{ type: Input }],
    nzIconfont: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NzIconDirective.prototype, "nzSpin", null);

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
NzIconModule.decorators = [
    { type: NgModule, args: [{
                exports: [NzIconDirective],
                declarations: [NzIconDirective],
                imports: [PlatformModule]
            },] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DEFAULT_TWOTONE_COLOR, NZ_ICONS, NZ_ICONS_PATCH, NZ_ICONS_USED_BY_ZORRO, NZ_ICON_DEFAULT_TWOTONE_COLOR, NzIconDirective, NzIconModule, NzIconPatchService, NzIconService };
//# sourceMappingURL=ng-zorro-antd-icon.js.map
