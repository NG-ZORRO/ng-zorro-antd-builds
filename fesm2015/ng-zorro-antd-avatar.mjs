import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, ViewChild, NgModule } from '@angular/core';
import * as i1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputNumber } from 'ng-zorro-antd/core/util';
import * as i2 from '@angular/cdk/platform';
import { PlatformModule } from '@angular/cdk/platform';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BidiModule } from '@angular/cdk/bidi';

const NZ_CONFIG_MODULE_NAME = 'avatar';
class NzAvatarComponent {
    constructor(nzConfigService, elementRef, cdr, platform) {
        this.nzConfigService = nzConfigService;
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.platform = platform;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzShape = 'circle';
        this.nzSize = 'default';
        this.nzGap = 4;
        this.nzError = new EventEmitter();
        this.hasText = false;
        this.hasSrc = true;
        this.hasIcon = false;
        this.textStyles = {};
        this.classMap = {};
        this.customSize = null;
        this.el = this.elementRef.nativeElement;
    }
    imgError($event) {
        this.nzError.emit($event);
        if (!$event.defaultPrevented) {
            this.hasSrc = false;
            this.hasIcon = false;
            this.hasText = false;
            if (this.nzIcon) {
                this.hasIcon = true;
            }
            else if (this.nzText) {
                this.hasText = true;
            }
            this.cdr.detectChanges();
            this.setSizeStyle();
            this.notifyCalc();
        }
    }
    ngOnChanges() {
        this.hasText = !this.nzSrc && !!this.nzText;
        this.hasIcon = !this.nzSrc && !!this.nzIcon;
        this.hasSrc = !!this.nzSrc;
        this.setSizeStyle();
        this.notifyCalc();
    }
    calcStringSize() {
        if (!this.hasText) {
            return;
        }
        const childrenWidth = this.textEl.nativeElement.offsetWidth;
        const avatarWidth = this.el.getBoundingClientRect().width;
        const offset = this.nzGap * 2 < avatarWidth ? this.nzGap * 2 : 8;
        const scale = avatarWidth - offset < childrenWidth ? (avatarWidth - offset) / childrenWidth : 1;
        this.textStyles = {
            transform: `scale(${scale}) translateX(-50%)`
        };
        if (this.customSize) {
            Object.assign(this.textStyles, {
                lineHeight: this.customSize
            });
        }
        this.cdr.detectChanges();
    }
    notifyCalc() {
        // If use ngAfterViewChecked, always demands more computations, so......
        if (this.platform.isBrowser) {
            setTimeout(() => {
                this.calcStringSize();
            });
        }
    }
    setSizeStyle() {
        if (typeof this.nzSize === 'number') {
            this.customSize = `${this.nzSize}px`;
        }
        else {
            this.customSize = null;
        }
        this.cdr.markForCheck();
    }
}
NzAvatarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAvatarComponent, deps: [{ token: i1.NzConfigService }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i2.Platform }], target: i0.ɵɵFactoryTarget.Component });
NzAvatarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzAvatarComponent, selector: "nz-avatar", inputs: { nzShape: "nzShape", nzSize: "nzSize", nzGap: "nzGap", nzText: "nzText", nzSrc: "nzSrc", nzSrcSet: "nzSrcSet", nzAlt: "nzAlt", nzIcon: "nzIcon" }, outputs: { nzError: "nzError" }, host: { properties: { "class.ant-avatar-lg": "nzSize === 'large'", "class.ant-avatar-sm": "nzSize === 'small'", "class.ant-avatar-square": "nzShape === 'square'", "class.ant-avatar-circle": "nzShape === 'circle'", "class.ant-avatar-icon": "nzIcon", "class.ant-avatar-image": "hasSrc ", "style.width": "customSize", "style.height": "customSize", "style.line-height": "customSize", "style.font-size.px": "(hasIcon && customSize) ? $any(nzSize) / 2 : null" }, classAttribute: "ant-avatar" }, viewQueries: [{ propertyName: "textEl", first: true, predicate: ["textEl"], descendants: true }], exportAs: ["nzAvatar"], usesOnChanges: true, ngImport: i0, template: `
    <i nz-icon *ngIf="nzIcon && hasIcon" [nzType]="nzIcon"></i>
    <img *ngIf="nzSrc && hasSrc" [src]="nzSrc" [attr.srcset]="nzSrcSet" [attr.alt]="nzAlt" (error)="imgError($event)" />
    <span class="ant-avatar-string" #textEl [ngStyle]="textStyles" *ngIf="nzText && hasText">{{ nzText }}</span>
  `, isInline: true, directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    WithConfig()
], NzAvatarComponent.prototype, "nzShape", void 0);
__decorate([
    WithConfig()
], NzAvatarComponent.prototype, "nzSize", void 0);
__decorate([
    WithConfig(),
    InputNumber()
], NzAvatarComponent.prototype, "nzGap", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAvatarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-avatar',
                    exportAs: 'nzAvatar',
                    template: `
    <i nz-icon *ngIf="nzIcon && hasIcon" [nzType]="nzIcon"></i>
    <img *ngIf="nzSrc && hasSrc" [src]="nzSrc" [attr.srcset]="nzSrcSet" [attr.alt]="nzAlt" (error)="imgError($event)" />
    <span class="ant-avatar-string" #textEl [ngStyle]="textStyles" *ngIf="nzText && hasText">{{ nzText }}</span>
  `,
                    host: {
                        class: 'ant-avatar',
                        '[class.ant-avatar-lg]': `nzSize === 'large'`,
                        '[class.ant-avatar-sm]': `nzSize === 'small'`,
                        '[class.ant-avatar-square]': `nzShape === 'square'`,
                        '[class.ant-avatar-circle]': `nzShape === 'circle'`,
                        '[class.ant-avatar-icon]': `nzIcon`,
                        '[class.ant-avatar-image]': `hasSrc `,
                        '[style.width]': 'customSize',
                        '[style.height]': 'customSize',
                        '[style.line-height]': 'customSize',
                        // nzSize type is number when customSize is true
                        '[style.font-size.px]': '(hasIcon && customSize) ? $any(nzSize) / 2 : null'
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i1.NzConfigService }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i2.Platform }]; }, propDecorators: { nzShape: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzGap: [{
                type: Input
            }], nzText: [{
                type: Input
            }], nzSrc: [{
                type: Input
            }], nzSrcSet: [{
                type: Input
            }], nzAlt: [{
                type: Input
            }], nzIcon: [{
                type: Input
            }], nzError: [{
                type: Output
            }], textEl: [{
                type: ViewChild,
                args: ['textEl', { static: false }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzAvatarGroupComponent {
}
NzAvatarGroupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAvatarGroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzAvatarGroupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzAvatarGroupComponent, selector: "nz-avatar-group", host: { classAttribute: "ant-avatar-group" }, exportAs: ["nzAvatarGroup"], ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAvatarGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-avatar-group',
                    exportAs: 'nzAvatarGroup',
                    template: ` <ng-content></ng-content> `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'ant-avatar-group'
                    }
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzAvatarModule {
}
NzAvatarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAvatarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzAvatarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAvatarModule, declarations: [NzAvatarComponent, NzAvatarGroupComponent], imports: [BidiModule, CommonModule, NzIconModule, PlatformModule], exports: [NzAvatarComponent, NzAvatarGroupComponent] });
NzAvatarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAvatarModule, imports: [[BidiModule, CommonModule, NzIconModule, PlatformModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAvatarModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzAvatarComponent, NzAvatarGroupComponent],
                    exports: [NzAvatarComponent, NzAvatarGroupComponent],
                    imports: [BidiModule, CommonModule, NzIconModule, PlatformModule]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzAvatarComponent, NzAvatarGroupComponent, NzAvatarModule };
//# sourceMappingURL=ng-zorro-antd-avatar.mjs.map
