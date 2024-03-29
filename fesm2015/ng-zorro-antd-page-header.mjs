import * as i4 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Directive, EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Optional, Input, Output, ContentChild, NgModule } from '@angular/core';
import * as i5 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import * as i6 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { __decorate } from 'tslib';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import * as i2 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { PREFIX } from 'ng-zorro-antd/core/logger';
import * as i3 from 'ng-zorro-antd/cdk/resize-observer';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzPageHeaderTitleDirective {
}
NzPageHeaderTitleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderTitleDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzPageHeaderTitleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzPageHeaderTitleDirective, selector: "nz-page-header-title, [nz-page-header-title]", host: { classAttribute: "ant-page-header-heading-title" }, exportAs: ["nzPageHeaderTitle"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderTitleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-page-header-title, [nz-page-header-title]',
                    exportAs: 'nzPageHeaderTitle',
                    host: {
                        class: 'ant-page-header-heading-title'
                    }
                }]
        }] });
class NzPageHeaderSubtitleDirective {
}
NzPageHeaderSubtitleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderSubtitleDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzPageHeaderSubtitleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzPageHeaderSubtitleDirective, selector: "nz-page-header-subtitle, [nz-page-header-subtitle]", host: { classAttribute: "ant-page-header-heading-sub-title" }, exportAs: ["nzPageHeaderSubtitle"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderSubtitleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-page-header-subtitle, [nz-page-header-subtitle]',
                    exportAs: 'nzPageHeaderSubtitle',
                    host: {
                        class: 'ant-page-header-heading-sub-title'
                    }
                }]
        }] });
class NzPageHeaderContentDirective {
}
NzPageHeaderContentDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderContentDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzPageHeaderContentDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzPageHeaderContentDirective, selector: "nz-page-header-content, [nz-page-header-content]", host: { classAttribute: "ant-page-header-content" }, exportAs: ["nzPageHeaderContent"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderContentDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-page-header-content, [nz-page-header-content]',
                    exportAs: 'nzPageHeaderContent',
                    host: {
                        class: 'ant-page-header-content'
                    }
                }]
        }] });
class NzPageHeaderTagDirective {
}
NzPageHeaderTagDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderTagDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzPageHeaderTagDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzPageHeaderTagDirective, selector: "nz-page-header-tags, [nz-page-header-tags]", host: { classAttribute: "ant-page-header-heading-tags" }, exportAs: ["nzPageHeaderTags"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderTagDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-page-header-tags, [nz-page-header-tags]',
                    exportAs: 'nzPageHeaderTags',
                    host: {
                        class: 'ant-page-header-heading-tags'
                    }
                }]
        }] });
class NzPageHeaderExtraDirective {
}
NzPageHeaderExtraDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderExtraDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzPageHeaderExtraDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzPageHeaderExtraDirective, selector: "nz-page-header-extra, [nz-page-header-extra]", host: { classAttribute: "ant-page-header-heading-extra" }, exportAs: ["nzPageHeaderExtra"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderExtraDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-page-header-extra, [nz-page-header-extra]',
                    exportAs: 'nzPageHeaderExtra',
                    host: {
                        class: 'ant-page-header-heading-extra'
                    }
                }]
        }] });
class NzPageHeaderFooterDirective {
}
NzPageHeaderFooterDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderFooterDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzPageHeaderFooterDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzPageHeaderFooterDirective, selector: "nz-page-header-footer, [nz-page-header-footer]", host: { classAttribute: "ant-page-header-footer" }, exportAs: ["nzPageHeaderFooter"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderFooterDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-page-header-footer, [nz-page-header-footer]',
                    exportAs: 'nzPageHeaderFooter',
                    host: {
                        class: 'ant-page-header-footer'
                    }
                }]
        }] });
class NzPageHeaderBreadcrumbDirective {
}
NzPageHeaderBreadcrumbDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderBreadcrumbDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzPageHeaderBreadcrumbDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzPageHeaderBreadcrumbDirective, selector: "nz-breadcrumb[nz-page-header-breadcrumb]", exportAs: ["nzPageHeaderBreadcrumb"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderBreadcrumbDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-breadcrumb[nz-page-header-breadcrumb]',
                    exportAs: 'nzPageHeaderBreadcrumb'
                }]
        }] });
class NzPageHeaderAvatarDirective {
}
NzPageHeaderAvatarDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderAvatarDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzPageHeaderAvatarDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzPageHeaderAvatarDirective, selector: "nz-avatar[nz-page-header-avatar]", exportAs: ["nzPageHeaderAvatar"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderAvatarDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-avatar[nz-page-header-avatar]',
                    exportAs: 'nzPageHeaderAvatar'
                }]
        }] });

const NZ_CONFIG_MODULE_NAME = 'pageHeader';
class NzPageHeaderComponent {
    constructor(location, nzConfigService, elementRef, nzResizeObserver, cdr, directionality) {
        this.location = location;
        this.nzConfigService = nzConfigService;
        this.elementRef = elementRef;
        this.nzResizeObserver = nzResizeObserver;
        this.cdr = cdr;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzBackIcon = null;
        this.nzGhost = true;
        this.nzBack = new EventEmitter();
        this.compact = false;
        this.destroy$ = new Subject();
        this.dir = 'ltr';
    }
    ngOnInit() {
        var _a;
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    ngAfterViewInit() {
        this.nzResizeObserver
            .observe(this.elementRef)
            .pipe(map(([entry]) => entry.contentRect.width), takeUntil(this.destroy$))
            .subscribe((width) => {
            this.compact = width < 768;
            this.cdr.markForCheck();
        });
    }
    onBack() {
        if (this.nzBack.observers.length) {
            this.nzBack.emit();
        }
        else {
            if (!this.location) {
                throw new Error(`${PREFIX} you should import 'RouterModule' or register 'Location' if you want to use 'nzBack' default event!`);
            }
            this.location.back();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    getBackIcon() {
        if (this.dir === 'rtl') {
            return 'arrow-right';
        }
        return 'arrow-left';
    }
}
NzPageHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderComponent, deps: [{ token: i1.Location, optional: true }, { token: i2.NzConfigService }, { token: i0.ElementRef }, { token: i3.NzResizeObserver }, { token: i0.ChangeDetectorRef }, { token: i4.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzPageHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzPageHeaderComponent, selector: "nz-page-header", inputs: { nzBackIcon: "nzBackIcon", nzTitle: "nzTitle", nzSubtitle: "nzSubtitle", nzGhost: "nzGhost" }, outputs: { nzBack: "nzBack" }, host: { properties: { "class.has-footer": "nzPageHeaderFooter", "class.ant-page-header-ghost": "nzGhost", "class.has-breadcrumb": "nzPageHeaderBreadcrumb", "class.ant-page-header-compact": "compact", "class.ant-page-header-rtl": "dir === 'rtl'" }, classAttribute: "ant-page-header" }, queries: [{ propertyName: "nzPageHeaderFooter", first: true, predicate: NzPageHeaderFooterDirective, descendants: true }, { propertyName: "nzPageHeaderBreadcrumb", first: true, predicate: NzPageHeaderBreadcrumbDirective, descendants: true }], exportAs: ["nzPageHeader"], ngImport: i0, template: `
    <ng-content select="nz-breadcrumb[nz-page-header-breadcrumb]"></ng-content>

    <div class="ant-page-header-heading">
      <div class="ant-page-header-heading-left">
        <!--back-->
        <div *ngIf="nzBackIcon !== null" (click)="onBack()" class="ant-page-header-back">
          <div role="button" tabindex="0" class="ant-page-header-back-button">
            <ng-container *nzStringTemplateOutlet="nzBackIcon; let backIcon">
              <i nz-icon [nzType]="backIcon || getBackIcon()" nzTheme="outline"></i>
            </ng-container>
          </div>
        </div>
        <!--avatar-->
        <ng-content select="nz-avatar[nz-page-header-avatar]"></ng-content>
        <!--title-->
        <span class="ant-page-header-heading-title" *ngIf="nzTitle">
          <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
        </span>
        <ng-content *ngIf="!nzTitle" select="nz-page-header-title, [nz-page-header-title]"></ng-content>
        <!--subtitle-->
        <span class="ant-page-header-heading-sub-title" *ngIf="nzSubtitle">
          <ng-container *nzStringTemplateOutlet="nzSubtitle">{{ nzSubtitle }}</ng-container>
        </span>
        <ng-content *ngIf="!nzSubtitle" select="nz-page-header-subtitle, [nz-page-header-subtitle]"></ng-content>
        <ng-content select="nz-page-header-tags, [nz-page-header-tags]"></ng-content>
      </div>

      <ng-content select="nz-page-header-extra, [nz-page-header-extra]"></ng-content>
    </div>

    <ng-content select="nz-page-header-content, [nz-page-header-content]"></ng-content>
    <ng-content select="nz-page-header-footer, [nz-page-header-footer]"></ng-content>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    WithConfig()
], NzPageHeaderComponent.prototype, "nzGhost", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-page-header',
                    exportAs: 'nzPageHeader',
                    template: `
    <ng-content select="nz-breadcrumb[nz-page-header-breadcrumb]"></ng-content>

    <div class="ant-page-header-heading">
      <div class="ant-page-header-heading-left">
        <!--back-->
        <div *ngIf="nzBackIcon !== null" (click)="onBack()" class="ant-page-header-back">
          <div role="button" tabindex="0" class="ant-page-header-back-button">
            <ng-container *nzStringTemplateOutlet="nzBackIcon; let backIcon">
              <i nz-icon [nzType]="backIcon || getBackIcon()" nzTheme="outline"></i>
            </ng-container>
          </div>
        </div>
        <!--avatar-->
        <ng-content select="nz-avatar[nz-page-header-avatar]"></ng-content>
        <!--title-->
        <span class="ant-page-header-heading-title" *ngIf="nzTitle">
          <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
        </span>
        <ng-content *ngIf="!nzTitle" select="nz-page-header-title, [nz-page-header-title]"></ng-content>
        <!--subtitle-->
        <span class="ant-page-header-heading-sub-title" *ngIf="nzSubtitle">
          <ng-container *nzStringTemplateOutlet="nzSubtitle">{{ nzSubtitle }}</ng-container>
        </span>
        <ng-content *ngIf="!nzSubtitle" select="nz-page-header-subtitle, [nz-page-header-subtitle]"></ng-content>
        <ng-content select="nz-page-header-tags, [nz-page-header-tags]"></ng-content>
      </div>

      <ng-content select="nz-page-header-extra, [nz-page-header-extra]"></ng-content>
    </div>

    <ng-content select="nz-page-header-content, [nz-page-header-content]"></ng-content>
    <ng-content select="nz-page-header-footer, [nz-page-header-footer]"></ng-content>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'ant-page-header',
                        '[class.has-footer]': 'nzPageHeaderFooter',
                        '[class.ant-page-header-ghost]': 'nzGhost',
                        '[class.has-breadcrumb]': 'nzPageHeaderBreadcrumb',
                        '[class.ant-page-header-compact]': 'compact',
                        '[class.ant-page-header-rtl]': `dir === 'rtl'`
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: i1.Location, decorators: [{
                        type: Optional
                    }] }, { type: i2.NzConfigService }, { type: i0.ElementRef }, { type: i3.NzResizeObserver }, { type: i0.ChangeDetectorRef }, { type: i4.Directionality, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { nzBackIcon: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzSubtitle: [{
                type: Input
            }], nzGhost: [{
                type: Input
            }], nzBack: [{
                type: Output
            }], nzPageHeaderFooter: [{
                type: ContentChild,
                args: [NzPageHeaderFooterDirective, { static: false }]
            }], nzPageHeaderBreadcrumb: [{
                type: ContentChild,
                args: [NzPageHeaderBreadcrumbDirective, { static: false }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const NzPageHeaderCells = [
    NzPageHeaderTitleDirective,
    NzPageHeaderSubtitleDirective,
    NzPageHeaderContentDirective,
    NzPageHeaderTagDirective,
    NzPageHeaderExtraDirective,
    NzPageHeaderFooterDirective,
    NzPageHeaderBreadcrumbDirective,
    NzPageHeaderAvatarDirective
];
class NzPageHeaderModule {
}
NzPageHeaderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzPageHeaderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderModule, declarations: [NzPageHeaderComponent, NzPageHeaderTitleDirective,
        NzPageHeaderSubtitleDirective,
        NzPageHeaderContentDirective,
        NzPageHeaderTagDirective,
        NzPageHeaderExtraDirective,
        NzPageHeaderFooterDirective,
        NzPageHeaderBreadcrumbDirective,
        NzPageHeaderAvatarDirective], imports: [BidiModule, CommonModule, NzOutletModule, NzIconModule], exports: [NzPageHeaderComponent, NzPageHeaderTitleDirective,
        NzPageHeaderSubtitleDirective,
        NzPageHeaderContentDirective,
        NzPageHeaderTagDirective,
        NzPageHeaderExtraDirective,
        NzPageHeaderFooterDirective,
        NzPageHeaderBreadcrumbDirective,
        NzPageHeaderAvatarDirective] });
NzPageHeaderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderModule, imports: [[BidiModule, CommonModule, NzOutletModule, NzIconModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BidiModule, CommonModule, NzOutletModule, NzIconModule],
                    exports: [NzPageHeaderComponent, NzPageHeaderCells],
                    declarations: [NzPageHeaderComponent, NzPageHeaderCells]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzPageHeaderAvatarDirective, NzPageHeaderBreadcrumbDirective, NzPageHeaderComponent, NzPageHeaderContentDirective, NzPageHeaderExtraDirective, NzPageHeaderFooterDirective, NzPageHeaderModule, NzPageHeaderSubtitleDirective, NzPageHeaderTagDirective, NzPageHeaderTitleDirective };
//# sourceMappingURL=ng-zorro-antd-page-header.mjs.map
