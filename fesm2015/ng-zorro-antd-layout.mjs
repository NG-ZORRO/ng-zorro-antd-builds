import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, EventEmitter, ContentChild, Output, Optional, ContentChildren, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { __decorate } from 'tslib';
import * as i2$1 from 'ng-zorro-antd/core/services';
import { siderResponsiveMap } from 'ng-zorro-antd/core/services';
import { toCssPixel, inNextTick, InputBoolean } from 'ng-zorro-antd/core/util';
import { NzMenuDirective } from 'ng-zorro-antd/menu';
import * as i1$1 from '@angular/cdk/platform';
import { PlatformModule } from '@angular/cdk/platform';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i1$2 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import { LayoutModule } from '@angular/cdk/layout';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzContentComponent {
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.renderer.addClass(this.elementRef.nativeElement, 'ant-layout-content');
    }
}
NzContentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzContentComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
NzContentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzContentComponent, selector: "nz-content", exportAs: ["nzContent"], ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzContentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-content',
                    exportAs: 'nzContent',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: ` <ng-content></ng-content> `
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzFooterComponent {
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.renderer.addClass(this.elementRef.nativeElement, 'ant-layout-footer');
    }
}
NzFooterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzFooterComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
NzFooterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzFooterComponent, selector: "nz-footer", exportAs: ["nzFooter"], ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzFooterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-footer',
                    exportAs: 'nzFooter',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: ` <ng-content></ng-content> `
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzHeaderComponent {
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.renderer.addClass(this.elementRef.nativeElement, 'ant-layout-header');
    }
}
NzHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzHeaderComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
NzHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzHeaderComponent, selector: "nz-header", exportAs: ["nzHeader"], ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-header',
                    exportAs: 'nzHeader',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    template: ` <ng-content></ng-content> `
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzSiderTriggerComponent {
    constructor() {
        this.nzCollapsed = false;
        this.nzReverseArrow = false;
        this.nzZeroTrigger = null;
        this.nzTrigger = undefined;
        this.matchBreakPoint = false;
        this.nzCollapsedWidth = null;
        this.siderWidth = null;
        this.nzBreakpoint = null;
        this.isZeroTrigger = false;
        this.isNormalTrigger = false;
    }
    updateTriggerType() {
        this.isZeroTrigger =
            this.nzCollapsedWidth === 0 && ((this.nzBreakpoint && this.matchBreakPoint) || !this.nzBreakpoint);
        this.isNormalTrigger = this.nzCollapsedWidth !== 0;
    }
    ngOnInit() {
        this.updateTriggerType();
    }
    ngOnChanges() {
        this.updateTriggerType();
    }
}
NzSiderTriggerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSiderTriggerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzSiderTriggerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSiderTriggerComponent, selector: "[nz-sider-trigger]", inputs: { nzCollapsed: "nzCollapsed", nzReverseArrow: "nzReverseArrow", nzZeroTrigger: "nzZeroTrigger", nzTrigger: "nzTrigger", matchBreakPoint: "matchBreakPoint", nzCollapsedWidth: "nzCollapsedWidth", siderWidth: "siderWidth", nzBreakpoint: "nzBreakpoint" }, host: { properties: { "class.ant-layout-sider-trigger": "isNormalTrigger", "style.width": "isNormalTrigger ? siderWidth : null", "class.ant-layout-sider-zero-width-trigger": "isZeroTrigger", "class.ant-layout-sider-zero-width-trigger-right": "isZeroTrigger && nzReverseArrow", "class.ant-layout-sider-zero-width-trigger-left": "isZeroTrigger && !nzReverseArrow" } }, exportAs: ["nzSiderTrigger"], usesOnChanges: true, ngImport: i0, template: `
    <ng-container *ngIf="isZeroTrigger">
      <ng-template [ngTemplateOutlet]="nzZeroTrigger || defaultZeroTrigger"></ng-template>
    </ng-container>
    <ng-container *ngIf="isNormalTrigger">
      <ng-template [ngTemplateOutlet]="nzTrigger || defaultTrigger"></ng-template>
    </ng-container>
    <ng-template #defaultTrigger>
      <i nz-icon [nzType]="nzCollapsed ? 'right' : 'left'" *ngIf="!nzReverseArrow"></i>
      <i nz-icon [nzType]="nzCollapsed ? 'left' : 'right'" *ngIf="nzReverseArrow"></i>
    </ng-template>
    <ng-template #defaultZeroTrigger>
      <i nz-icon nzType="bars"></i>
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSiderTriggerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[nz-sider-trigger]',
                    exportAs: 'nzSiderTrigger',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-container *ngIf="isZeroTrigger">
      <ng-template [ngTemplateOutlet]="nzZeroTrigger || defaultZeroTrigger"></ng-template>
    </ng-container>
    <ng-container *ngIf="isNormalTrigger">
      <ng-template [ngTemplateOutlet]="nzTrigger || defaultTrigger"></ng-template>
    </ng-container>
    <ng-template #defaultTrigger>
      <i nz-icon [nzType]="nzCollapsed ? 'right' : 'left'" *ngIf="!nzReverseArrow"></i>
      <i nz-icon [nzType]="nzCollapsed ? 'left' : 'right'" *ngIf="nzReverseArrow"></i>
    </ng-template>
    <ng-template #defaultZeroTrigger>
      <i nz-icon nzType="bars"></i>
    </ng-template>
  `,
                    host: {
                        '[class.ant-layout-sider-trigger]': 'isNormalTrigger',
                        '[style.width]': 'isNormalTrigger ? siderWidth : null',
                        '[class.ant-layout-sider-zero-width-trigger]': 'isZeroTrigger',
                        '[class.ant-layout-sider-zero-width-trigger-right]': 'isZeroTrigger && nzReverseArrow',
                        '[class.ant-layout-sider-zero-width-trigger-left]': 'isZeroTrigger && !nzReverseArrow'
                    }
                }]
        }], propDecorators: { nzCollapsed: [{
                type: Input
            }], nzReverseArrow: [{
                type: Input
            }], nzZeroTrigger: [{
                type: Input
            }], nzTrigger: [{
                type: Input
            }], matchBreakPoint: [{
                type: Input
            }], nzCollapsedWidth: [{
                type: Input
            }], siderWidth: [{
                type: Input
            }], nzBreakpoint: [{
                type: Input
            }] } });

class NzSiderComponent {
    constructor(platform, cdr, breakpointService) {
        this.platform = platform;
        this.cdr = cdr;
        this.breakpointService = breakpointService;
        this.destroy$ = new Subject();
        this.nzMenuDirective = null;
        this.nzCollapsedChange = new EventEmitter();
        this.nzWidth = 200;
        this.nzTheme = 'dark';
        this.nzCollapsedWidth = 80;
        this.nzBreakpoint = null;
        this.nzZeroTrigger = null;
        this.nzTrigger = undefined;
        this.nzReverseArrow = false;
        this.nzCollapsible = false;
        this.nzCollapsed = false;
        this.matchBreakPoint = false;
        this.flexSetting = null;
        this.widthSetting = null;
    }
    updateStyleMap() {
        this.widthSetting = this.nzCollapsed ? `${this.nzCollapsedWidth}px` : toCssPixel(this.nzWidth);
        this.flexSetting = `0 0 ${this.widthSetting}`;
        this.cdr.markForCheck();
    }
    updateMenuInlineCollapsed() {
        if (this.nzMenuDirective && this.nzMenuDirective.nzMode === 'inline' && this.nzCollapsedWidth !== 0) {
            this.nzMenuDirective.setInlineCollapsed(this.nzCollapsed);
        }
    }
    setCollapsed(collapsed) {
        if (collapsed !== this.nzCollapsed) {
            this.nzCollapsed = collapsed;
            this.nzCollapsedChange.emit(collapsed);
            this.updateMenuInlineCollapsed();
            this.updateStyleMap();
            this.cdr.markForCheck();
        }
    }
    ngOnInit() {
        this.updateStyleMap();
        if (this.platform.isBrowser) {
            this.breakpointService
                .subscribe(siderResponsiveMap, true)
                .pipe(takeUntil(this.destroy$))
                .subscribe(map => {
                const breakpoint = this.nzBreakpoint;
                if (breakpoint) {
                    inNextTick().subscribe(() => {
                        this.matchBreakPoint = !map[breakpoint];
                        this.setCollapsed(this.matchBreakPoint);
                        this.cdr.markForCheck();
                    });
                }
            });
        }
    }
    ngOnChanges(changes) {
        const { nzCollapsed, nzCollapsedWidth, nzWidth } = changes;
        if (nzCollapsed || nzCollapsedWidth || nzWidth) {
            this.updateStyleMap();
        }
        if (nzCollapsed) {
            this.updateMenuInlineCollapsed();
        }
    }
    ngAfterContentInit() {
        this.updateMenuInlineCollapsed();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzSiderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSiderComponent, deps: [{ token: i1$1.Platform }, { token: i0.ChangeDetectorRef }, { token: i2$1.NzBreakpointService }], target: i0.ɵɵFactoryTarget.Component });
NzSiderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSiderComponent, selector: "nz-sider", inputs: { nzWidth: "nzWidth", nzTheme: "nzTheme", nzCollapsedWidth: "nzCollapsedWidth", nzBreakpoint: "nzBreakpoint", nzZeroTrigger: "nzZeroTrigger", nzTrigger: "nzTrigger", nzReverseArrow: "nzReverseArrow", nzCollapsible: "nzCollapsible", nzCollapsed: "nzCollapsed" }, outputs: { nzCollapsedChange: "nzCollapsedChange" }, host: { properties: { "class.ant-layout-sider-zero-width": "nzCollapsed && nzCollapsedWidth === 0", "class.ant-layout-sider-light": "nzTheme === 'light'", "class.ant-layout-sider-dark": "nzTheme === 'dark'", "class.ant-layout-sider-collapsed": "nzCollapsed", "class.ant-layout-sider-has-trigger": "nzCollapsible && nzTrigger !== null", "style.flex": "flexSetting", "style.maxWidth": "widthSetting", "style.minWidth": "widthSetting", "style.width": "widthSetting" }, classAttribute: "ant-layout-sider" }, queries: [{ propertyName: "nzMenuDirective", first: true, predicate: NzMenuDirective, descendants: true }], exportAs: ["nzSider"], usesOnChanges: true, ngImport: i0, template: `
    <div class="ant-layout-sider-children">
      <ng-content></ng-content>
    </div>
    <div
      *ngIf="nzCollapsible && nzTrigger !== null"
      nz-sider-trigger
      [matchBreakPoint]="matchBreakPoint"
      [nzCollapsedWidth]="nzCollapsedWidth"
      [nzCollapsed]="nzCollapsed"
      [nzBreakpoint]="nzBreakpoint"
      [nzReverseArrow]="nzReverseArrow"
      [nzTrigger]="nzTrigger"
      [nzZeroTrigger]="nzZeroTrigger"
      [siderWidth]="widthSetting"
      (click)="setCollapsed(!nzCollapsed)"
    ></div>
  `, isInline: true, components: [{ type: NzSiderTriggerComponent, selector: "[nz-sider-trigger]", inputs: ["nzCollapsed", "nzReverseArrow", "nzZeroTrigger", "nzTrigger", "matchBreakPoint", "nzCollapsedWidth", "siderWidth", "nzBreakpoint"], exportAs: ["nzSiderTrigger"] }], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzSiderComponent.prototype, "nzReverseArrow", void 0);
__decorate([
    InputBoolean()
], NzSiderComponent.prototype, "nzCollapsible", void 0);
__decorate([
    InputBoolean()
], NzSiderComponent.prototype, "nzCollapsed", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSiderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-sider',
                    exportAs: 'nzSider',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <div class="ant-layout-sider-children">
      <ng-content></ng-content>
    </div>
    <div
      *ngIf="nzCollapsible && nzTrigger !== null"
      nz-sider-trigger
      [matchBreakPoint]="matchBreakPoint"
      [nzCollapsedWidth]="nzCollapsedWidth"
      [nzCollapsed]="nzCollapsed"
      [nzBreakpoint]="nzBreakpoint"
      [nzReverseArrow]="nzReverseArrow"
      [nzTrigger]="nzTrigger"
      [nzZeroTrigger]="nzZeroTrigger"
      [siderWidth]="widthSetting"
      (click)="setCollapsed(!nzCollapsed)"
    ></div>
  `,
                    host: {
                        class: 'ant-layout-sider',
                        '[class.ant-layout-sider-zero-width]': `nzCollapsed && nzCollapsedWidth === 0`,
                        '[class.ant-layout-sider-light]': `nzTheme === 'light'`,
                        '[class.ant-layout-sider-dark]': `nzTheme === 'dark'`,
                        '[class.ant-layout-sider-collapsed]': `nzCollapsed`,
                        '[class.ant-layout-sider-has-trigger]': `nzCollapsible && nzTrigger !== null`,
                        '[style.flex]': 'flexSetting',
                        '[style.maxWidth]': 'widthSetting',
                        '[style.minWidth]': 'widthSetting',
                        '[style.width]': 'widthSetting'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1$1.Platform }, { type: i0.ChangeDetectorRef }, { type: i2$1.NzBreakpointService }]; }, propDecorators: { nzMenuDirective: [{
                type: ContentChild,
                args: [NzMenuDirective]
            }], nzCollapsedChange: [{
                type: Output
            }], nzWidth: [{
                type: Input
            }], nzTheme: [{
                type: Input
            }], nzCollapsedWidth: [{
                type: Input
            }], nzBreakpoint: [{
                type: Input
            }], nzZeroTrigger: [{
                type: Input
            }], nzTrigger: [{
                type: Input
            }], nzReverseArrow: [{
                type: Input
            }], nzCollapsible: [{
                type: Input
            }], nzCollapsed: [{
                type: Input
            }] } });

class NzLayoutComponent {
    constructor(directionality) {
        this.directionality = directionality;
        this.dir = 'ltr';
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        var _a;
        this.dir = this.directionality.value;
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzLayoutComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzLayoutComponent, deps: [{ token: i1$2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzLayoutComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzLayoutComponent, selector: "nz-layout", host: { properties: { "class.ant-layout-rtl": "dir === 'rtl'", "class.ant-layout-has-sider": "listOfNzSiderComponent.length > 0" }, classAttribute: "ant-layout" }, queries: [{ propertyName: "listOfNzSiderComponent", predicate: NzSiderComponent }], exportAs: ["nzLayout"], ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzLayoutComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-layout',
                    exportAs: 'nzLayout',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    template: ` <ng-content></ng-content> `,
                    host: {
                        class: 'ant-layout',
                        '[class.ant-layout-rtl]': `dir === 'rtl'`,
                        '[class.ant-layout-has-sider]': 'listOfNzSiderComponent.length > 0'
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: i1$2.Directionality, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { listOfNzSiderComponent: [{
                type: ContentChildren,
                args: [NzSiderComponent]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzLayoutModule {
}
NzLayoutModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzLayoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzLayoutModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzLayoutModule, declarations: [NzLayoutComponent,
        NzHeaderComponent,
        NzContentComponent,
        NzFooterComponent,
        NzSiderComponent,
        NzSiderTriggerComponent], imports: [BidiModule, CommonModule, NzIconModule, LayoutModule, PlatformModule], exports: [NzLayoutComponent, NzHeaderComponent, NzContentComponent, NzFooterComponent, NzSiderComponent] });
NzLayoutModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzLayoutModule, imports: [[BidiModule, CommonModule, NzIconModule, LayoutModule, PlatformModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzLayoutModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NzLayoutComponent,
                        NzHeaderComponent,
                        NzContentComponent,
                        NzFooterComponent,
                        NzSiderComponent,
                        NzSiderTriggerComponent
                    ],
                    exports: [NzLayoutComponent, NzHeaderComponent, NzContentComponent, NzFooterComponent, NzSiderComponent],
                    imports: [BidiModule, CommonModule, NzIconModule, LayoutModule, PlatformModule]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzContentComponent, NzFooterComponent, NzHeaderComponent, NzLayoutComponent, NzLayoutModule, NzSiderComponent, NzSiderTriggerComponent as ɵNzSiderTriggerComponent };
//# sourceMappingURL=ng-zorro-antd-layout.mjs.map
