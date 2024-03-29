import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Optional, Host, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { zoomBadgeMotion } from 'ng-zorro-antd/core/animation';
import * as i1$1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i2 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i3 from 'ng-zorro-antd/core/no-animation';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i6 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { ObserversModule } from '@angular/cdk/observers';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const badgePresetColors = [
    'pink',
    'red',
    'yellow',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'magenta',
    'volcano',
    'gold',
    'lime'
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzBadgeSupComponent {
    constructor() {
        this.nzStyle = null;
        this.nzDot = false;
        this.nzOverflowCount = 99;
        this.disableAnimation = false;
        this.noAnimation = false;
        this.maxNumberArray = [];
        this.countArray = [];
        this.count = 0;
        this.countSingleArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
    generateMaxNumberArray() {
        this.maxNumberArray = this.nzOverflowCount.toString().split('');
    }
    ngOnInit() {
        this.generateMaxNumberArray();
    }
    ngOnChanges(changes) {
        const { nzOverflowCount, nzCount } = changes;
        if (nzCount && typeof nzCount.currentValue === 'number') {
            this.count = Math.max(0, nzCount.currentValue);
            this.countArray = this.count
                .toString()
                .split('')
                .map(item => +item);
        }
        if (nzOverflowCount) {
            this.generateMaxNumberArray();
        }
    }
}
NzBadgeSupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBadgeSupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzBadgeSupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzBadgeSupComponent, selector: "nz-badge-sup", inputs: { nzOffset: "nzOffset", nzTitle: "nzTitle", nzStyle: "nzStyle", nzDot: "nzDot", nzOverflowCount: "nzOverflowCount", disableAnimation: "disableAnimation", nzCount: "nzCount", noAnimation: "noAnimation" }, host: { properties: { "@.disabled": "disableAnimation", "@zoomBadgeMotion": "", "attr.title": "nzTitle === null ? '' : nzTitle || nzCount", "style": "nzStyle", "style.right.px": "nzOffset && nzOffset[0] ? -nzOffset[0] : null", "style.margin-top.px": "nzOffset && nzOffset[1] ? nzOffset[1] : null", "class.ant-badge-count": "!nzDot", "class.ant-badge-dot": "nzDot", "class.ant-badge-multiple-words": "countArray.length >= 2" }, classAttribute: "ant-scroll-number" }, exportAs: ["nzBadgeSup"], usesOnChanges: true, ngImport: i0, template: `
    <ng-container *ngIf="count <= nzOverflowCount; else overflowTemplate">
      <span
        [nzNoAnimation]="noAnimation"
        *ngFor="let n of maxNumberArray; let i = index"
        class="ant-scroll-number-only"
        [style.transform]="'translateY(' + -countArray[i] * 100 + '%)'"
      >
        <ng-container *ngIf="!nzDot && countArray[i] !== undefined">
          <p
            *ngFor="let p of countSingleArray"
            class="ant-scroll-number-only-unit"
            [class.current]="p === countArray[i]"
          >
            {{ p }}
          </p>
        </ng-container>
      </span>
    </ng-container>
    <ng-template #overflowTemplate>{{ nzOverflowCount }}+</ng-template>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NzNoAnimationDirective, selector: "[nzNoAnimation]", inputs: ["nzNoAnimation"], exportAs: ["nzNoAnimation"] }], animations: [zoomBadgeMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBadgeSupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-badge-sup',
                    exportAs: 'nzBadgeSup',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [zoomBadgeMotion],
                    template: `
    <ng-container *ngIf="count <= nzOverflowCount; else overflowTemplate">
      <span
        [nzNoAnimation]="noAnimation"
        *ngFor="let n of maxNumberArray; let i = index"
        class="ant-scroll-number-only"
        [style.transform]="'translateY(' + -countArray[i] * 100 + '%)'"
      >
        <ng-container *ngIf="!nzDot && countArray[i] !== undefined">
          <p
            *ngFor="let p of countSingleArray"
            class="ant-scroll-number-only-unit"
            [class.current]="p === countArray[i]"
          >
            {{ p }}
          </p>
        </ng-container>
      </span>
    </ng-container>
    <ng-template #overflowTemplate>{{ nzOverflowCount }}+</ng-template>
  `,
                    host: {
                        class: 'ant-scroll-number',
                        '[@.disabled]': `disableAnimation`,
                        '[@zoomBadgeMotion]': '',
                        '[attr.title]': `nzTitle === null ? '' : nzTitle || nzCount`,
                        '[style]': `nzStyle`,
                        '[style.right.px]': `nzOffset && nzOffset[0] ? -nzOffset[0] : null`,
                        '[style.margin-top.px]': `nzOffset && nzOffset[1] ? nzOffset[1] : null`,
                        '[class.ant-badge-count]': `!nzDot`,
                        '[class.ant-badge-dot]': `nzDot`,
                        '[class.ant-badge-multiple-words]': `countArray.length >= 2`
                    }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { nzOffset: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzStyle: [{
                type: Input
            }], nzDot: [{
                type: Input
            }], nzOverflowCount: [{
                type: Input
            }], disableAnimation: [{
                type: Input
            }], nzCount: [{
                type: Input
            }], noAnimation: [{
                type: Input
            }] } });

const NZ_CONFIG_MODULE_NAME = 'badge';
class NzBadgeComponent {
    constructor(nzConfigService, renderer, cdr, elementRef, directionality, noAnimation) {
        this.nzConfigService = nzConfigService;
        this.renderer = renderer;
        this.cdr = cdr;
        this.elementRef = elementRef;
        this.directionality = directionality;
        this.noAnimation = noAnimation;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.showSup = false;
        this.presetColor = null;
        this.dir = 'ltr';
        this.destroy$ = new Subject();
        this.nzShowZero = false;
        this.nzShowDot = true;
        this.nzStandalone = false;
        this.nzDot = false;
        this.nzOverflowCount = 99;
        this.nzColor = undefined;
        this.nzStyle = null;
        this.nzText = null;
    }
    ngOnInit() {
        var _a;
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.prepareBadgeForRtl();
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
        this.prepareBadgeForRtl();
    }
    ngOnChanges(changes) {
        const { nzColor, nzShowDot, nzDot, nzCount, nzShowZero } = changes;
        if (nzColor) {
            this.presetColor = this.nzColor && badgePresetColors.indexOf(this.nzColor) !== -1 ? this.nzColor : null;
        }
        if (nzShowDot || nzDot || nzCount || nzShowZero) {
            this.showSup = (this.nzShowDot && this.nzDot) || this.nzCount > 0 || (this.nzCount <= 0 && this.nzShowZero);
        }
    }
    prepareBadgeForRtl() {
        if (this.isRtlLayout) {
            this.renderer.addClass(this.elementRef.nativeElement, 'ant-badge-rtl');
        }
        else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'ant-badge-rtl');
        }
    }
    get isRtlLayout() {
        return this.dir === 'rtl';
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzBadgeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBadgeComponent, deps: [{ token: i1$1.NzConfigService }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i2.Directionality, optional: true }, { token: i3.NzNoAnimationDirective, host: true, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzBadgeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzBadgeComponent, selector: "nz-badge", inputs: { nzShowZero: "nzShowZero", nzShowDot: "nzShowDot", nzStandalone: "nzStandalone", nzDot: "nzDot", nzOverflowCount: "nzOverflowCount", nzColor: "nzColor", nzStyle: "nzStyle", nzText: "nzText", nzTitle: "nzTitle", nzStatus: "nzStatus", nzCount: "nzCount", nzOffset: "nzOffset" }, host: { properties: { "class.ant-badge-status": "nzStatus", "class.ant-badge-not-a-wrapper": "!!(nzStandalone || nzStatus || nzColor)" }, classAttribute: "ant-badge" }, exportAs: ["nzBadge"], usesOnChanges: true, ngImport: i0, template: `
    <ng-container *ngIf="nzStatus || nzColor">
      <span
        class="ant-badge-status-dot ant-badge-status-{{ nzStatus || presetColor }}"
        [style.background]="!presetColor && nzColor"
        [ngStyle]="nzStyle"
      ></span>
      <span class="ant-badge-status-text">
        <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
      </span>
    </ng-container>
    <ng-content></ng-content>
    <ng-container *nzStringTemplateOutlet="nzCount">
      <nz-badge-sup
        *ngIf="showSup"
        [nzOffset]="nzOffset"
        [nzTitle]="nzTitle"
        [nzStyle]="nzStyle"
        [nzDot]="nzDot"
        [nzOverflowCount]="nzOverflowCount"
        [disableAnimation]="!!(nzStandalone || nzStatus || nzColor || noAnimation?.nzNoAnimation)"
        [nzCount]="nzCount"
        [noAnimation]="!!noAnimation?.nzNoAnimation"
      ></nz-badge-sup>
    </ng-container>
  `, isInline: true, components: [{ type: NzBadgeSupComponent, selector: "nz-badge-sup", inputs: ["nzOffset", "nzTitle", "nzStyle", "nzDot", "nzOverflowCount", "disableAnimation", "nzCount", "noAnimation"], exportAs: ["nzBadgeSup"] }], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i6.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], animations: [zoomBadgeMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzBadgeComponent.prototype, "nzShowZero", void 0);
__decorate([
    InputBoolean()
], NzBadgeComponent.prototype, "nzShowDot", void 0);
__decorate([
    InputBoolean()
], NzBadgeComponent.prototype, "nzStandalone", void 0);
__decorate([
    InputBoolean()
], NzBadgeComponent.prototype, "nzDot", void 0);
__decorate([
    WithConfig()
], NzBadgeComponent.prototype, "nzOverflowCount", void 0);
__decorate([
    WithConfig()
], NzBadgeComponent.prototype, "nzColor", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBadgeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-badge',
                    exportAs: 'nzBadge',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [zoomBadgeMotion],
                    template: `
    <ng-container *ngIf="nzStatus || nzColor">
      <span
        class="ant-badge-status-dot ant-badge-status-{{ nzStatus || presetColor }}"
        [style.background]="!presetColor && nzColor"
        [ngStyle]="nzStyle"
      ></span>
      <span class="ant-badge-status-text">
        <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
      </span>
    </ng-container>
    <ng-content></ng-content>
    <ng-container *nzStringTemplateOutlet="nzCount">
      <nz-badge-sup
        *ngIf="showSup"
        [nzOffset]="nzOffset"
        [nzTitle]="nzTitle"
        [nzStyle]="nzStyle"
        [nzDot]="nzDot"
        [nzOverflowCount]="nzOverflowCount"
        [disableAnimation]="!!(nzStandalone || nzStatus || nzColor || noAnimation?.nzNoAnimation)"
        [nzCount]="nzCount"
        [noAnimation]="!!noAnimation?.nzNoAnimation"
      ></nz-badge-sup>
    </ng-container>
  `,
                    host: {
                        class: 'ant-badge',
                        '[class.ant-badge-status]': 'nzStatus',
                        '[class.ant-badge-not-a-wrapper]': '!!(nzStandalone || nzStatus || nzColor)'
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: i1$1.NzConfigService }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i2.Directionality, decorators: [{
                        type: Optional
                    }] }, { type: i3.NzNoAnimationDirective, decorators: [{
                        type: Host
                    }, {
                        type: Optional
                    }] }];
    }, propDecorators: { nzShowZero: [{
                type: Input
            }], nzShowDot: [{
                type: Input
            }], nzStandalone: [{
                type: Input
            }], nzDot: [{
                type: Input
            }], nzOverflowCount: [{
                type: Input
            }], nzColor: [{
                type: Input
            }], nzStyle: [{
                type: Input
            }], nzText: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzStatus: [{
                type: Input
            }], nzCount: [{
                type: Input
            }], nzOffset: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzRibbonComponent {
    constructor() {
        this.nzPlacement = 'end';
        this.nzText = null;
        this.presetColor = null;
    }
    ngOnChanges(changes) {
        const { nzColor } = changes;
        if (nzColor) {
            this.presetColor = this.nzColor && badgePresetColors.indexOf(this.nzColor) !== -1 ? this.nzColor : null;
        }
    }
}
NzRibbonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRibbonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzRibbonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzRibbonComponent, selector: "nz-ribbon", inputs: { nzColor: "nzColor", nzPlacement: "nzPlacement", nzText: "nzText" }, host: { classAttribute: "ant-ribbon-wrapper" }, exportAs: ["nzRibbon"], usesOnChanges: true, ngImport: i0, template: `
    <ng-content></ng-content>
    <div
      class="ant-ribbon"
      [class]="presetColor && 'ant-ribbon-color-' + presetColor"
      [class.ant-ribbon-placement-end]="nzPlacement === 'end'"
      [class.ant-ribbon-placement-start]="nzPlacement === 'start'"
      [style.background-color]="!presetColor && nzColor"
    >
      <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
      <div class="ant-ribbon-corner" [style.color]="!presetColor && nzColor"></div>
    </div>
  `, isInline: true, directives: [{ type: i6.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRibbonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-ribbon',
                    exportAs: 'nzRibbon',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-content></ng-content>
    <div
      class="ant-ribbon"
      [class]="presetColor && 'ant-ribbon-color-' + presetColor"
      [class.ant-ribbon-placement-end]="nzPlacement === 'end'"
      [class.ant-ribbon-placement-start]="nzPlacement === 'start'"
      [style.background-color]="!presetColor && nzColor"
    >
      <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
      <div class="ant-ribbon-corner" [style.color]="!presetColor && nzColor"></div>
    </div>
  `,
                    host: { class: 'ant-ribbon-wrapper' }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { nzColor: [{
                type: Input
            }], nzPlacement: [{
                type: Input
            }], nzText: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzBadgeModule {
}
NzBadgeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBadgeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzBadgeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBadgeModule, declarations: [NzBadgeComponent, NzBadgeSupComponent, NzRibbonComponent], imports: [BidiModule, CommonModule, ObserversModule, NzOutletModule, NzNoAnimationModule], exports: [NzBadgeComponent, NzRibbonComponent] });
NzBadgeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBadgeModule, imports: [[BidiModule, CommonModule, ObserversModule, NzOutletModule, NzNoAnimationModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBadgeModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzBadgeComponent, NzBadgeSupComponent, NzRibbonComponent],
                    exports: [NzBadgeComponent, NzRibbonComponent],
                    imports: [BidiModule, CommonModule, ObserversModule, NzOutletModule, NzNoAnimationModule]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzBadgeComponent, NzBadgeModule, NzRibbonComponent };
//# sourceMappingURL=ng-zorro-antd-badge.mjs.map
