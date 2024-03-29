import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, ViewChild, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { warn } from 'ng-zorro-antd/core/logger';
import { isNil, InputBoolean } from 'ng-zorro-antd/core/util';
import * as i2 from 'ng-zorro-antd/core/services';
import * as i3 from 'ng-zorro-antd/image';
import { NzImageModule as NzImageModule$1 } from 'ng-zorro-antd/image';
import { BidiModule } from '@angular/cdk/bidi';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPipesModule } from 'ng-zorro-antd/pipes';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function isFixedSize(size) {
    return typeof size === 'number' || /^(\d)+(px)?$/.test(size);
}
function normalizeSrc(src) {
    return src[0] === '/' ? src.slice(1) : src;
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const defaultImageSrcLoader = ({ src }) => {
    return src;
};
/**
 * AliObjectsLoader return format
 * {domain}/{src}?x-oss-process=image/resize,w_{width}
 */
function createAliObjectsLoader(domain) {
    return ({ src, width }) => {
        const params = isNil(width) ? '' : `?x-oss-process=image/resize,w_${width}`;
        return `${domain}/${normalizeSrc(src)}${params}`;
    };
}
/**
 * ImgixLoader return format
 * {domain}/{src}?format=auto&fit=max&w={width}
 */
function createImgixLoader(domain) {
    return ({ src, width }) => {
        const params = isNil(width) ? '' : `&fit=max&w=${width}`;
        return `${domain}/${normalizeSrc(src)}?format=auto${params}`;
    };
}
/**
 * CloudinaryLoader return format
 * {domain}/c_limit,q_auto,w_{width}/{src}
 */
function createCloudinaryLoader(domain) {
    return ({ src, width }) => {
        const params = isNil(width) ? '' : `,w_${width}`;
        return `${domain}/c_limit,q_auto${params}/${normalizeSrc(src)}`;
    };
}

const NZ_CONFIG_MODULE_NAME = 'imageExperimental';
const sizeBreakpoints = [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];
class NzImageViewComponent {
    constructor(cdr, nzConfigService, imagePreloadService) {
        this.cdr = cdr;
        this.nzConfigService = nzConfigService;
        this.imagePreloadService = imagePreloadService;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzSrc = '';
        this.nzAlt = '';
        this.nzWidth = 'auto';
        this.nzHeight = 'auto';
        this.nzSrcLoader = defaultImageSrcLoader;
        this.nzAutoSrcset = false;
        this.nzPriority = false;
        this.nzFallback = null;
        this.nzPlaceholder = null;
        this.nzDisablePreview = false;
        this.src = '';
        this.width = 'auto';
        this.height = 'auto';
        this.srcset = '';
        this.destroy$ = new Subject();
        this.reloadDisposeHandler = () => void 0;
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.composeImageAttrs();
            this.cdr.markForCheck();
        });
    }
    ngOnInit() {
        if (this.nzPriority) {
            this.preload();
        }
    }
    ngOnChanges(changes) {
        const { nzLoader, nzSrc, nzOptimize } = changes;
        if (nzSrc || nzLoader || nzOptimize) {
            this.composeImageAttrs();
        }
    }
    ngOnDestroy() {
        this.reloadDisposeHandler();
        this.destroy$.next();
        this.destroy$.complete();
    }
    preload() {
        this.reloadDisposeHandler = this.imagePreloadService.addPreload({
            src: this.src,
            srcset: this.srcset
        });
    }
    optimizable() {
        if (this.nzAutoSrcset) {
            if (!isFixedSize(this.nzWidth) || !isFixedSize(this.nzHeight)) {
                warn(`When using "nzAutoSrcset" you should use a fixed size width and height, for more information please refer to CLS (https://web.dev/cls/) performance metrics`);
                return false;
            }
            if (this.nzSrc.endsWith('.svg')) {
                warn(`SVG does not need to be optimized`);
                return false;
            }
            if (this.nzSrc.startsWith('data:')) {
                warn(`Data URLs cannot be optimized`);
                return false;
            }
            return true;
        }
        return false;
    }
    composeImageAttrs() {
        const loader = this.getLoader();
        if (!this.optimizable()) {
            this.src = loader({ src: this.nzSrc });
            this.width = this.nzWidth;
            this.height = this.nzHeight;
            return;
        }
        this.width = typeof this.nzWidth === 'number' ? this.nzWidth : parseInt(this.nzWidth, 10);
        this.height = typeof this.nzHeight === 'number' ? this.nzHeight : parseInt(this.nzHeight, 10);
        const widths = this.convertWidths(this.width, sizeBreakpoints);
        this.src = loader({ src: this.nzSrc, width: widths[0] });
        this.srcset = widths
            .map((w, i) => `${loader({
            src: this.nzSrc,
            width: w
        })} ${i + 1}x`)
            .join(', ');
    }
    getLoader() {
        return this.nzSrcLoader || defaultImageSrcLoader;
    }
    convertWidths(width, optimizeSizes) {
        const allSizes = [...optimizeSizes].sort((a, b) => a - b);
        return [
            ...new Set(
            // 2x scale is sufficient
            // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
            [width, width * 2].map(w => allSizes.find(p => p >= w) || w))
        ];
    }
}
NzImageViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageViewComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.NzConfigService }, { token: i2.ImagePreloadService }], target: i0.ɵɵFactoryTarget.Component });
NzImageViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzImageViewComponent, selector: "nz-image", inputs: { nzSrc: "nzSrc", nzAlt: "nzAlt", nzWidth: "nzWidth", nzHeight: "nzHeight", nzSrcLoader: "nzSrcLoader", nzAutoSrcset: "nzAutoSrcset", nzPriority: "nzPriority", nzFallback: "nzFallback", nzPlaceholder: "nzPlaceholder", nzDisablePreview: "nzDisablePreview" }, viewQueries: [{ propertyName: "imageRef", first: true, predicate: ["imageRef"], descendants: true }], exportAs: ["nzImage"], usesOnChanges: true, ngImport: i0, template: `
    <img
      #imageRef
      nz-image
      [nzSrc]="src"
      [nzSrcset]="srcset"
      [nzDisablePreview]="nzDisablePreview"
      [nzFallback]="nzFallback"
      [nzPlaceholder]="nzPlaceholder"
      [attr.width]="width"
      [attr.height]="height"
      [attr.srcset]="srcset"
      [attr.alt]="nzAlt || null"
    />
  `, isInline: true, directives: [{ type: i3.NzImageDirective, selector: "img[nz-image]", inputs: ["nzSrc", "nzSrcset", "nzDisablePreview", "nzFallback", "nzPlaceholder"], exportAs: ["nzImage"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    WithConfig()
], NzImageViewComponent.prototype, "nzSrcLoader", void 0);
__decorate([
    InputBoolean(),
    WithConfig()
], NzImageViewComponent.prototype, "nzAutoSrcset", void 0);
__decorate([
    InputBoolean()
], NzImageViewComponent.prototype, "nzPriority", void 0);
__decorate([
    WithConfig()
], NzImageViewComponent.prototype, "nzFallback", void 0);
__decorate([
    WithConfig()
], NzImageViewComponent.prototype, "nzPlaceholder", void 0);
__decorate([
    InputBoolean(),
    WithConfig()
], NzImageViewComponent.prototype, "nzDisablePreview", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-image',
                    exportAs: 'nzImage',
                    template: `
    <img
      #imageRef
      nz-image
      [nzSrc]="src"
      [nzSrcset]="srcset"
      [nzDisablePreview]="nzDisablePreview"
      [nzFallback]="nzFallback"
      [nzPlaceholder]="nzPlaceholder"
      [attr.width]="width"
      [attr.height]="height"
      [attr.srcset]="srcset"
      [attr.alt]="nzAlt || null"
    />
  `,
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.NzConfigService }, { type: i2.ImagePreloadService }]; }, propDecorators: { nzSrc: [{
                type: Input
            }], nzAlt: [{
                type: Input
            }], nzWidth: [{
                type: Input
            }], nzHeight: [{
                type: Input
            }], nzSrcLoader: [{
                type: Input
            }], nzAutoSrcset: [{
                type: Input
            }], nzPriority: [{
                type: Input
            }], nzFallback: [{
                type: Input
            }], nzPlaceholder: [{
                type: Input
            }], nzDisablePreview: [{
                type: Input
            }], imageRef: [{
                type: ViewChild,
                args: ['imageRef']
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzImageModule {
}
NzImageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzImageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageModule, declarations: [NzImageViewComponent], imports: [BidiModule,
        OverlayModule,
        PortalModule,
        DragDropModule,
        CommonModule,
        NzIconModule,
        NzPipesModule,
        PlatformModule,
        NzImageModule$1], exports: [NzImageViewComponent] });
NzImageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageModule, imports: [[
            BidiModule,
            OverlayModule,
            PortalModule,
            DragDropModule,
            CommonModule,
            NzIconModule,
            NzPipesModule,
            PlatformModule,
            NzImageModule$1
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        BidiModule,
                        OverlayModule,
                        PortalModule,
                        DragDropModule,
                        CommonModule,
                        NzIconModule,
                        NzPipesModule,
                        PlatformModule,
                        NzImageModule$1
                    ],
                    exports: [NzImageViewComponent],
                    declarations: [NzImageViewComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NZ_CONFIG_MODULE_NAME, NzImageModule, NzImageViewComponent, createAliObjectsLoader, createCloudinaryLoader, createImgixLoader, defaultImageSrcLoader, isFixedSize, normalizeSrc };
//# sourceMappingURL=ng-zorro-antd-experimental-image.mjs.map
