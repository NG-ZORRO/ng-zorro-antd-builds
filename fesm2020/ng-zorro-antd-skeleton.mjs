import * as i0 from '@angular/core';
import { Directive, Input, Component, ChangeDetectionStrategy, ViewEncapsulation, NgModule } from '@angular/core';
import { InputBoolean, toCssPixel } from 'ng-zorro-antd/core/util';
import { __decorate } from 'tslib';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import { BidiModule } from '@angular/cdk/bidi';

class NzSkeletonElementDirective {
    constructor() {
        this.nzActive = false;
        this.nzBlock = false;
    }
}
NzSkeletonElementDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonElementDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzSkeletonElementDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzSkeletonElementDirective, selector: "nz-skeleton-element", inputs: { nzActive: "nzActive", nzType: "nzType", nzBlock: "nzBlock" }, host: { properties: { "class.ant-skeleton-active": "nzActive", "class.ant-skeleton-block": "nzBlock" }, classAttribute: "ant-skeleton ant-skeleton-element" }, ngImport: i0 });
__decorate([
    InputBoolean()
], NzSkeletonElementDirective.prototype, "nzBlock", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonElementDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-skeleton-element',
                    host: {
                        class: 'ant-skeleton ant-skeleton-element',
                        '[class.ant-skeleton-active]': 'nzActive',
                        '[class.ant-skeleton-block]': 'nzBlock'
                    }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { nzActive: [{
                type: Input
            }], nzType: [{
                type: Input
            }], nzBlock: [{
                type: Input
            }] } });
class NzSkeletonElementButtonComponent {
    constructor() {
        this.nzShape = 'default';
        this.nzSize = 'default';
    }
}
NzSkeletonElementButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonElementButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzSkeletonElementButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSkeletonElementButtonComponent, selector: "nz-skeleton-element[nzType=\"button\"]", inputs: { nzShape: "nzShape", nzSize: "nzSize" }, ngImport: i0, template: `
    <span
      class="ant-skeleton-button"
      [class.ant-skeleton-button-round]="nzShape === 'round'"
      [class.ant-skeleton-button-circle]="nzShape === 'circle'"
      [class.ant-skeleton-button-lg]="nzSize === 'large'"
      [class.ant-skeleton-button-sm]="nzSize === 'small'"
    ></span>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonElementButtonComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'nz-skeleton-element[nzType="button"]',
                    template: `
    <span
      class="ant-skeleton-button"
      [class.ant-skeleton-button-round]="nzShape === 'round'"
      [class.ant-skeleton-button-circle]="nzShape === 'circle'"
      [class.ant-skeleton-button-lg]="nzSize === 'large'"
      [class.ant-skeleton-button-sm]="nzSize === 'small'"
    ></span>
  `
                }]
        }], propDecorators: { nzShape: [{
                type: Input
            }], nzSize: [{
                type: Input
            }] } });
class NzSkeletonElementAvatarComponent {
    constructor() {
        this.nzShape = 'circle';
        this.nzSize = 'default';
        this.styleMap = {};
    }
    ngOnChanges(changes) {
        if (changes.nzSize && typeof this.nzSize === 'number') {
            const sideLength = `${this.nzSize}px`;
            this.styleMap = { width: sideLength, height: sideLength, 'line-height': sideLength };
        }
        else {
            this.styleMap = {};
        }
    }
}
NzSkeletonElementAvatarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonElementAvatarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzSkeletonElementAvatarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSkeletonElementAvatarComponent, selector: "nz-skeleton-element[nzType=\"avatar\"]", inputs: { nzShape: "nzShape", nzSize: "nzSize" }, usesOnChanges: true, ngImport: i0, template: `
    <span
      class="ant-skeleton-avatar"
      [class.ant-skeleton-avatar-square]="nzShape === 'square'"
      [class.ant-skeleton-avatar-circle]="nzShape === 'circle'"
      [class.ant-skeleton-avatar-lg]="nzSize === 'large'"
      [class.ant-skeleton-avatar-sm]="nzSize === 'small'"
      [ngStyle]="styleMap"
    ></span>
  `, isInline: true, directives: [{ type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonElementAvatarComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'nz-skeleton-element[nzType="avatar"]',
                    template: `
    <span
      class="ant-skeleton-avatar"
      [class.ant-skeleton-avatar-square]="nzShape === 'square'"
      [class.ant-skeleton-avatar-circle]="nzShape === 'circle'"
      [class.ant-skeleton-avatar-lg]="nzSize === 'large'"
      [class.ant-skeleton-avatar-sm]="nzSize === 'small'"
      [ngStyle]="styleMap"
    ></span>
  `
                }]
        }], propDecorators: { nzShape: [{
                type: Input
            }], nzSize: [{
                type: Input
            }] } });
class NzSkeletonElementInputComponent {
    constructor() {
        this.nzSize = 'default';
    }
}
NzSkeletonElementInputComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonElementInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzSkeletonElementInputComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSkeletonElementInputComponent, selector: "nz-skeleton-element[nzType=\"input\"]", inputs: { nzSize: "nzSize" }, ngImport: i0, template: `
    <span
      class="ant-skeleton-input"
      [class.ant-skeleton-input-lg]="nzSize === 'large'"
      [class.ant-skeleton-input-sm]="nzSize === 'small'"
    ></span>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonElementInputComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'nz-skeleton-element[nzType="input"]',
                    template: `
    <span
      class="ant-skeleton-input"
      [class.ant-skeleton-input-lg]="nzSize === 'large'"
      [class.ant-skeleton-input-sm]="nzSize === 'small'"
    ></span>
  `
                }]
        }], propDecorators: { nzSize: [{
                type: Input
            }] } });
class NzSkeletonElementImageComponent {
}
NzSkeletonElementImageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonElementImageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzSkeletonElementImageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSkeletonElementImageComponent, selector: "nz-skeleton-element[nzType=\"image\"]", ngImport: i0, template: `
    <span class="ant-skeleton-image">
      <svg class="ant-skeleton-image-svg" viewBox="0 0 1098 1024" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z"
          class="ant-skeleton-image-path"
        />
      </svg>
    </span>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonElementImageComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'nz-skeleton-element[nzType="image"]',
                    template: `
    <span class="ant-skeleton-image">
      <svg class="ant-skeleton-image-svg" viewBox="0 0 1098 1024" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z"
          class="ant-skeleton-image-path"
        />
      </svg>
    </span>
  `
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzSkeletonComponent {
    constructor(cdr, renderer, elementRef) {
        this.cdr = cdr;
        this.nzActive = false;
        this.nzLoading = true;
        this.nzRound = false;
        this.nzTitle = true;
        this.nzAvatar = false;
        this.nzParagraph = true;
        this.rowsList = [];
        this.widthList = [];
        renderer.addClass(elementRef.nativeElement, 'ant-skeleton');
    }
    toCSSUnit(value = '') {
        return toCssPixel(value);
    }
    getTitleProps() {
        const hasAvatar = !!this.nzAvatar;
        const hasParagraph = !!this.nzParagraph;
        let width = '';
        if (!hasAvatar && hasParagraph) {
            width = '38%';
        }
        else if (hasAvatar && hasParagraph) {
            width = '50%';
        }
        return { width, ...this.getProps(this.nzTitle) };
    }
    getAvatarProps() {
        const shape = !!this.nzTitle && !this.nzParagraph ? 'square' : 'circle';
        const size = 'large';
        return { shape, size, ...this.getProps(this.nzAvatar) };
    }
    getParagraphProps() {
        const hasAvatar = !!this.nzAvatar;
        const hasTitle = !!this.nzTitle;
        const basicProps = {};
        // Width
        if (!hasAvatar || !hasTitle) {
            basicProps.width = '61%';
        }
        // Rows
        if (!hasAvatar && hasTitle) {
            basicProps.rows = 3;
        }
        else {
            basicProps.rows = 2;
        }
        return { ...basicProps, ...this.getProps(this.nzParagraph) };
    }
    getProps(prop) {
        return prop && typeof prop === 'object' ? prop : {};
    }
    getWidthList() {
        const { width, rows } = this.paragraph;
        let widthList = [];
        if (width && Array.isArray(width)) {
            widthList = width;
        }
        else if (width && !Array.isArray(width)) {
            widthList = [];
            widthList[rows - 1] = width;
        }
        return widthList;
    }
    updateProps() {
        this.title = this.getTitleProps();
        this.avatar = this.getAvatarProps();
        this.paragraph = this.getParagraphProps();
        this.rowsList = [...Array(this.paragraph.rows)];
        this.widthList = this.getWidthList();
        this.cdr.markForCheck();
    }
    ngOnInit() {
        this.updateProps();
    }
    ngOnChanges(changes) {
        if (changes.nzTitle || changes.nzAvatar || changes.nzParagraph) {
            this.updateProps();
        }
    }
}
NzSkeletonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NzSkeletonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSkeletonComponent, selector: "nz-skeleton", inputs: { nzActive: "nzActive", nzLoading: "nzLoading", nzRound: "nzRound", nzTitle: "nzTitle", nzAvatar: "nzAvatar", nzParagraph: "nzParagraph" }, host: { properties: { "class.ant-skeleton-with-avatar": "!!nzAvatar", "class.ant-skeleton-active": "nzActive", "class.ant-skeleton-round": "!!nzRound" } }, exportAs: ["nzSkeleton"], usesOnChanges: true, ngImport: i0, template: `
    <ng-container *ngIf="nzLoading">
      <div class="ant-skeleton-header" *ngIf="!!nzAvatar">
        <nz-skeleton-element
          nzType="avatar"
          [nzSize]="avatar.size || 'default'"
          [nzShape]="avatar.shape || 'circle'"
        ></nz-skeleton-element>
      </div>
      <div class="ant-skeleton-content">
        <h3 *ngIf="!!nzTitle" class="ant-skeleton-title" [style.width]="toCSSUnit(title.width)"></h3>
        <ul *ngIf="!!nzParagraph" class="ant-skeleton-paragraph">
          <li *ngFor="let row of rowsList; let i = index" [style.width]="toCSSUnit(widthList[i])"></li>
        </ul>
      </div>
    </ng-container>
    <ng-container *ngIf="!nzLoading">
      <ng-content></ng-content>
    </ng-container>
  `, isInline: true, components: [{ type: NzSkeletonElementAvatarComponent, selector: "nz-skeleton-element[nzType=\"avatar\"]", inputs: ["nzShape", "nzSize"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: NzSkeletonElementDirective, selector: "nz-skeleton-element", inputs: ["nzActive", "nzType", "nzBlock"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-skeleton',
                    exportAs: 'nzSkeleton',
                    host: {
                        '[class.ant-skeleton-with-avatar]': '!!nzAvatar',
                        '[class.ant-skeleton-active]': 'nzActive',
                        '[class.ant-skeleton-round]': '!!nzRound'
                    },
                    template: `
    <ng-container *ngIf="nzLoading">
      <div class="ant-skeleton-header" *ngIf="!!nzAvatar">
        <nz-skeleton-element
          nzType="avatar"
          [nzSize]="avatar.size || 'default'"
          [nzShape]="avatar.shape || 'circle'"
        ></nz-skeleton-element>
      </div>
      <div class="ant-skeleton-content">
        <h3 *ngIf="!!nzTitle" class="ant-skeleton-title" [style.width]="toCSSUnit(title.width)"></h3>
        <ul *ngIf="!!nzParagraph" class="ant-skeleton-paragraph">
          <li *ngFor="let row of rowsList; let i = index" [style.width]="toCSSUnit(widthList[i])"></li>
        </ul>
      </div>
    </ng-container>
    <ng-container *ngIf="!nzLoading">
      <ng-content></ng-content>
    </ng-container>
  `
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i0.ElementRef }]; }, propDecorators: { nzActive: [{
                type: Input
            }], nzLoading: [{
                type: Input
            }], nzRound: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzAvatar: [{
                type: Input
            }], nzParagraph: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzSkeletonModule {
}
NzSkeletonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzSkeletonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonModule, declarations: [NzSkeletonComponent,
        NzSkeletonElementDirective,
        NzSkeletonElementButtonComponent,
        NzSkeletonElementAvatarComponent,
        NzSkeletonElementImageComponent,
        NzSkeletonElementInputComponent], imports: [BidiModule, CommonModule], exports: [NzSkeletonComponent,
        NzSkeletonElementDirective,
        NzSkeletonElementButtonComponent,
        NzSkeletonElementAvatarComponent,
        NzSkeletonElementImageComponent,
        NzSkeletonElementInputComponent] });
NzSkeletonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonModule, imports: [[BidiModule, CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSkeletonModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NzSkeletonComponent,
                        NzSkeletonElementDirective,
                        NzSkeletonElementButtonComponent,
                        NzSkeletonElementAvatarComponent,
                        NzSkeletonElementImageComponent,
                        NzSkeletonElementInputComponent
                    ],
                    imports: [BidiModule, CommonModule],
                    exports: [
                        NzSkeletonComponent,
                        NzSkeletonElementDirective,
                        NzSkeletonElementButtonComponent,
                        NzSkeletonElementAvatarComponent,
                        NzSkeletonElementImageComponent,
                        NzSkeletonElementInputComponent
                    ]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzSkeletonComponent, NzSkeletonElementAvatarComponent, NzSkeletonElementButtonComponent, NzSkeletonElementDirective, NzSkeletonElementImageComponent, NzSkeletonElementInputComponent, NzSkeletonModule };
//# sourceMappingURL=ng-zorro-antd-skeleton.mjs.map
