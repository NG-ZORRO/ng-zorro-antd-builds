import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { Directive, Input, TemplateRef, Component, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, Optional, ContentChild, ContentChildren, NgModule } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import * as i2 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';

class NzCardGridDirective {
    constructor() {
        this.nzHoverable = true;
    }
}
NzCardGridDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCardGridDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzCardGridDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzCardGridDirective, selector: "[nz-card-grid]", inputs: { nzHoverable: "nzHoverable" }, host: { properties: { "class.ant-card-hoverable": "nzHoverable" }, classAttribute: "ant-card-grid" }, exportAs: ["nzCardGrid"], ngImport: i0 });
__decorate([
    InputBoolean()
], NzCardGridDirective.prototype, "nzHoverable", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCardGridDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-card-grid]',
                    exportAs: 'nzCardGrid',
                    host: {
                        class: 'ant-card-grid',
                        '[class.ant-card-hoverable]': 'nzHoverable'
                    }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { nzHoverable: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCardTabComponent {
}
NzCardTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCardTabComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzCardTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzCardTabComponent, selector: "nz-card-tab", viewQueries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true, static: true }], exportAs: ["nzCardTab"], ngImport: i0, template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCardTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-card-tab',
                    exportAs: 'nzCardTab',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `
                }]
        }], propDecorators: { template: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCardLoadingComponent {
    constructor() {
        this.listOfLoading = [
            ['ant-col-22'],
            ['ant-col-8', 'ant-col-15'],
            ['ant-col-6', 'ant-col-18'],
            ['ant-col-13', 'ant-col-9'],
            ['ant-col-4', 'ant-col-3', 'ant-col-16'],
            ['ant-col-8', 'ant-col-6', 'ant-col-8']
        ];
    }
}
NzCardLoadingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCardLoadingComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzCardLoadingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzCardLoadingComponent, selector: "nz-card-loading", host: { classAttribute: "ant-card-loading-content" }, exportAs: ["nzCardLoading"], ngImport: i0, template: `
    <div class="ant-card-loading-content">
      <div class="ant-row" style="margin-left: -4px; margin-right: -4px;" *ngFor="let listOfClassName of listOfLoading">
        <div
          *ngFor="let className of listOfClassName"
          [ngClass]="className"
          style="padding-left: 4px; padding-right: 4px;"
        >
          <div class="ant-card-loading-block"></div>
        </div>
      </div>
    </div>
  `, isInline: true, directives: [{ type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCardLoadingComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-card-loading',
                    exportAs: 'nzCardLoading',
                    template: `
    <div class="ant-card-loading-content">
      <div class="ant-row" style="margin-left: -4px; margin-right: -4px;" *ngFor="let listOfClassName of listOfLoading">
        <div
          *ngFor="let className of listOfClassName"
          [ngClass]="className"
          style="padding-left: 4px; padding-right: 4px;"
        >
          <div class="ant-card-loading-block"></div>
        </div>
      </div>
    </div>
  `,
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: { class: 'ant-card-loading-content' }
                }]
        }], ctorParameters: function () { return []; } });

const NZ_CONFIG_MODULE_NAME = 'card';
class NzCardComponent {
    constructor(nzConfigService, cdr, directionality) {
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzBordered = true;
        this.nzBorderless = false;
        this.nzLoading = false;
        this.nzHoverable = false;
        this.nzBodyStyle = null;
        this.nzActions = [];
        this.nzType = null;
        this.nzSize = 'default';
        this.dir = 'ltr';
        this.destroy$ = new Subject();
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.cdr.markForCheck();
        });
    }
    ngOnInit() {
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzCardComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCardComponent, deps: [{ token: i1.NzConfigService }, { token: i0.ChangeDetectorRef }, { token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzCardComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzCardComponent, selector: "nz-card", inputs: { nzBordered: "nzBordered", nzBorderless: "nzBorderless", nzLoading: "nzLoading", nzHoverable: "nzHoverable", nzBodyStyle: "nzBodyStyle", nzCover: "nzCover", nzActions: "nzActions", nzType: "nzType", nzSize: "nzSize", nzTitle: "nzTitle", nzExtra: "nzExtra" }, host: { properties: { "class.ant-card-loading": "nzLoading", "class.ant-card-bordered": "nzBorderless === false && nzBordered", "class.ant-card-hoverable": "nzHoverable", "class.ant-card-small": "nzSize === \"small\"", "class.ant-card-contain-grid": "listOfNzCardGridDirective && listOfNzCardGridDirective.length", "class.ant-card-type-inner": "nzType === \"inner\"", "class.ant-card-contain-tabs": "!!listOfNzCardTabComponent", "class.ant-card-rtl": "dir === 'rtl'" }, classAttribute: "ant-card" }, queries: [{ propertyName: "listOfNzCardTabComponent", first: true, predicate: NzCardTabComponent, descendants: true }, { propertyName: "listOfNzCardGridDirective", predicate: NzCardGridDirective }], exportAs: ["nzCard"], ngImport: i0, template: `
    <div class="ant-card-head" *ngIf="nzTitle || nzExtra || listOfNzCardTabComponent">
      <div class="ant-card-head-wrapper">
        <div class="ant-card-head-title" *ngIf="nzTitle">
          <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
        </div>
        <div class="ant-card-extra" *ngIf="nzExtra">
          <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
        </div>
      </div>
      <ng-container *ngIf="listOfNzCardTabComponent">
        <ng-template [ngTemplateOutlet]="listOfNzCardTabComponent.template"></ng-template>
      </ng-container>
    </div>
    <div class="ant-card-cover" *ngIf="nzCover">
      <ng-template [ngTemplateOutlet]="nzCover"></ng-template>
    </div>
    <div class="ant-card-body" [ngStyle]="nzBodyStyle">
      <ng-container *ngIf="!nzLoading; else loadingTemplate">
        <ng-content></ng-content>
      </ng-container>
      <ng-template #loadingTemplate>
        <nz-card-loading></nz-card-loading>
      </ng-template>
    </div>
    <ul class="ant-card-actions" *ngIf="nzActions.length">
      <li *ngFor="let action of nzActions" [style.width.%]="100 / nzActions.length">
        <span><ng-template [ngTemplateOutlet]="action"></ng-template></span>
      </li>
    </ul>
  `, isInline: true, components: [{ type: NzCardLoadingComponent, selector: "nz-card-loading", exportAs: ["nzCardLoading"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i4.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    WithConfig(),
    InputBoolean()
], NzCardComponent.prototype, "nzBordered", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzCardComponent.prototype, "nzBorderless", void 0);
__decorate([
    InputBoolean()
], NzCardComponent.prototype, "nzLoading", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzCardComponent.prototype, "nzHoverable", void 0);
__decorate([
    WithConfig()
], NzCardComponent.prototype, "nzSize", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCardComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-card',
                    exportAs: 'nzCard',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <div class="ant-card-head" *ngIf="nzTitle || nzExtra || listOfNzCardTabComponent">
      <div class="ant-card-head-wrapper">
        <div class="ant-card-head-title" *ngIf="nzTitle">
          <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
        </div>
        <div class="ant-card-extra" *ngIf="nzExtra">
          <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
        </div>
      </div>
      <ng-container *ngIf="listOfNzCardTabComponent">
        <ng-template [ngTemplateOutlet]="listOfNzCardTabComponent.template"></ng-template>
      </ng-container>
    </div>
    <div class="ant-card-cover" *ngIf="nzCover">
      <ng-template [ngTemplateOutlet]="nzCover"></ng-template>
    </div>
    <div class="ant-card-body" [ngStyle]="nzBodyStyle">
      <ng-container *ngIf="!nzLoading; else loadingTemplate">
        <ng-content></ng-content>
      </ng-container>
      <ng-template #loadingTemplate>
        <nz-card-loading></nz-card-loading>
      </ng-template>
    </div>
    <ul class="ant-card-actions" *ngIf="nzActions.length">
      <li *ngFor="let action of nzActions" [style.width.%]="100 / nzActions.length">
        <span><ng-template [ngTemplateOutlet]="action"></ng-template></span>
      </li>
    </ul>
  `,
                    host: {
                        class: 'ant-card',
                        '[class.ant-card-loading]': 'nzLoading',
                        '[class.ant-card-bordered]': 'nzBorderless === false && nzBordered',
                        '[class.ant-card-hoverable]': 'nzHoverable',
                        '[class.ant-card-small]': 'nzSize === "small"',
                        '[class.ant-card-contain-grid]': 'listOfNzCardGridDirective && listOfNzCardGridDirective.length',
                        '[class.ant-card-type-inner]': 'nzType === "inner"',
                        '[class.ant-card-contain-tabs]': '!!listOfNzCardTabComponent',
                        '[class.ant-card-rtl]': `dir === 'rtl'`
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzConfigService }, { type: i0.ChangeDetectorRef }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzBordered: [{
                type: Input
            }], nzBorderless: [{
                type: Input
            }], nzLoading: [{
                type: Input
            }], nzHoverable: [{
                type: Input
            }], nzBodyStyle: [{
                type: Input
            }], nzCover: [{
                type: Input
            }], nzActions: [{
                type: Input
            }], nzType: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzExtra: [{
                type: Input
            }], listOfNzCardTabComponent: [{
                type: ContentChild,
                args: [NzCardTabComponent, { static: false }]
            }], listOfNzCardGridDirective: [{
                type: ContentChildren,
                args: [NzCardGridDirective]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCardMetaComponent {
    constructor() {
        this.nzTitle = null;
        this.nzDescription = null;
        this.nzAvatar = null;
    }
}
NzCardMetaComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCardMetaComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzCardMetaComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzCardMetaComponent, selector: "nz-card-meta", inputs: { nzTitle: "nzTitle", nzDescription: "nzDescription", nzAvatar: "nzAvatar" }, host: { classAttribute: "ant-card-meta" }, exportAs: ["nzCardMeta"], ngImport: i0, template: `
    <div class="ant-card-meta-avatar" *ngIf="nzAvatar">
      <ng-template [ngTemplateOutlet]="nzAvatar"></ng-template>
    </div>
    <div class="ant-card-meta-detail" *ngIf="nzTitle || nzDescription">
      <div class="ant-card-meta-title" *ngIf="nzTitle">
        <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      </div>
      <div class="ant-card-meta-description" *ngIf="nzDescription">
        <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
      </div>
    </div>
  `, isInline: true, directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i5.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCardMetaComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-card-meta',
                    exportAs: 'nzCardMeta',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <div class="ant-card-meta-avatar" *ngIf="nzAvatar">
      <ng-template [ngTemplateOutlet]="nzAvatar"></ng-template>
    </div>
    <div class="ant-card-meta-detail" *ngIf="nzTitle || nzDescription">
      <div class="ant-card-meta-title" *ngIf="nzTitle">
        <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      </div>
      <div class="ant-card-meta-description" *ngIf="nzDescription">
        <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
      </div>
    </div>
  `,
                    host: { class: 'ant-card-meta' }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { nzTitle: [{
                type: Input
            }], nzDescription: [{
                type: Input
            }], nzAvatar: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCardModule {
}
NzCardModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzCardModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCardModule, declarations: [NzCardComponent, NzCardGridDirective, NzCardMetaComponent, NzCardLoadingComponent, NzCardTabComponent], imports: [CommonModule, NzOutletModule], exports: [BidiModule,
        NzCardComponent,
        NzCardGridDirective,
        NzCardMetaComponent,
        NzCardLoadingComponent,
        NzCardTabComponent] });
NzCardModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCardModule, imports: [[CommonModule, NzOutletModule], BidiModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NzOutletModule],
                    declarations: [NzCardComponent, NzCardGridDirective, NzCardMetaComponent, NzCardLoadingComponent, NzCardTabComponent],
                    exports: [
                        BidiModule,
                        NzCardComponent,
                        NzCardGridDirective,
                        NzCardMetaComponent,
                        NzCardLoadingComponent,
                        NzCardTabComponent
                    ]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzCardComponent, NzCardGridDirective, NzCardLoadingComponent, NzCardMetaComponent, NzCardModule, NzCardTabComponent };
//# sourceMappingURL=ng-zorro-antd-card.mjs.map
