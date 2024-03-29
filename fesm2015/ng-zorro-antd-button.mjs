import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { ElementRef, Component, ChangeDetectionStrategy, ViewEncapsulation, Optional, ContentChild, Input, NgModule } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, startWith, filter } from 'rxjs/operators';
import * as i1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i4 from 'ng-zorro-antd/icon';
import { NzIconDirective, NzIconModule } from 'ng-zorro-antd/icon';
import * as i2 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5 from 'ng-zorro-antd/core/transition-patch';
import { ɵNzTransitionPatchModule } from 'ng-zorro-antd/core/transition-patch';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';

const NZ_CONFIG_MODULE_NAME = 'button';
class NzButtonComponent {
    constructor(ngZone, elementRef, cdr, renderer, nzConfigService, directionality) {
        this.ngZone = ngZone;
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.renderer = renderer;
        this.nzConfigService = nzConfigService;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzBlock = false;
        this.nzGhost = false;
        this.nzSearch = false;
        this.nzLoading = false;
        this.nzDanger = false;
        this.disabled = false;
        this.tabIndex = null;
        this.nzType = null;
        this.nzShape = null;
        this.nzSize = 'default';
        this.dir = 'ltr';
        this.destroy$ = new Subject();
        this.loading$ = new Subject();
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.cdr.markForCheck();
        });
    }
    insertSpan(nodes, renderer) {
        nodes.forEach(node => {
            if (node.nodeName === '#text') {
                const span = renderer.createElement('span');
                const parent = renderer.parentNode(node);
                renderer.insertBefore(parent, span, node);
                renderer.appendChild(span, node);
            }
        });
    }
    assertIconOnly(element, renderer) {
        const listOfNode = Array.from(element.childNodes);
        const iconCount = listOfNode.filter(node => node.nodeName === 'I').length;
        const noText = listOfNode.every(node => node.nodeName !== '#text');
        const noSpan = listOfNode.every(node => node.nodeName !== 'SPAN');
        const isIconOnly = noSpan && noText && iconCount >= 1;
        if (isIconOnly) {
            renderer.addClass(element, 'ant-btn-icon-only');
        }
    }
    ngOnInit() {
        var _a;
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
        this.ngZone.runOutsideAngular(() => {
            // Caretaker note: this event listener could've been added through `host.click` or `HostListener`.
            // The compiler generates the `ɵɵlistener` instruction which wraps the actual listener internally into the
            // function, which runs `markDirty()` before running the actual listener (the decorated class method).
            // Since we're preventing the default behavior and stopping event propagation this doesn't require Angular to run the change detection.
            fromEvent(this.elementRef.nativeElement, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                var _a;
                if (this.disabled && ((_a = event.target) === null || _a === void 0 ? void 0 : _a.tagName) === 'A') {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                }
            });
        });
    }
    ngOnChanges(changes) {
        const { nzLoading } = changes;
        if (nzLoading) {
            this.loading$.next(this.nzLoading);
        }
    }
    ngAfterViewInit() {
        this.assertIconOnly(this.elementRef.nativeElement, this.renderer);
        this.insertSpan(this.elementRef.nativeElement.childNodes, this.renderer);
    }
    ngAfterContentInit() {
        this.loading$
            .pipe(startWith(this.nzLoading), filter(() => !!this.nzIconDirectiveElement), takeUntil(this.destroy$))
            .subscribe(loading => {
            const nativeElement = this.nzIconDirectiveElement.nativeElement;
            if (loading) {
                this.renderer.setStyle(nativeElement, 'display', 'none');
            }
            else {
                this.renderer.removeStyle(nativeElement, 'display');
            }
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzButtonComponent, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i1.NzConfigService }, { token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: { nzBlock: "nzBlock", nzGhost: "nzGhost", nzSearch: "nzSearch", nzLoading: "nzLoading", nzDanger: "nzDanger", disabled: "disabled", tabIndex: "tabIndex", nzType: "nzType", nzShape: "nzShape", nzSize: "nzSize" }, host: { properties: { "class.ant-btn-primary": "nzType === 'primary'", "class.ant-btn-dashed": "nzType === 'dashed'", "class.ant-btn-link": "nzType === 'link'", "class.ant-btn-text": "nzType === 'text'", "class.ant-btn-circle": "nzShape === 'circle'", "class.ant-btn-round": "nzShape === 'round'", "class.ant-btn-lg": "nzSize === 'large'", "class.ant-btn-sm": "nzSize === 'small'", "class.ant-btn-dangerous": "nzDanger", "class.ant-btn-loading": "nzLoading", "class.ant-btn-background-ghost": "nzGhost", "class.ant-btn-block": "nzBlock", "class.ant-input-search-button": "nzSearch", "class.ant-btn-rtl": "dir === 'rtl'", "attr.tabindex": "disabled ? -1 : (tabIndex === null ? null : tabIndex)", "attr.disabled": "disabled || null" }, classAttribute: "ant-btn" }, queries: [{ propertyName: "nzIconDirectiveElement", first: true, predicate: NzIconDirective, descendants: true, read: ElementRef }], exportAs: ["nzButton"], usesOnChanges: true, ngImport: i0, template: `
    <i nz-icon nzType="loading" *ngIf="nzLoading"></i>
    <ng-content></ng-content>
  `, isInline: true, directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i5.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzButtonComponent.prototype, "nzBlock", void 0);
__decorate([
    InputBoolean()
], NzButtonComponent.prototype, "nzGhost", void 0);
__decorate([
    InputBoolean()
], NzButtonComponent.prototype, "nzSearch", void 0);
__decorate([
    InputBoolean()
], NzButtonComponent.prototype, "nzLoading", void 0);
__decorate([
    InputBoolean()
], NzButtonComponent.prototype, "nzDanger", void 0);
__decorate([
    InputBoolean()
], NzButtonComponent.prototype, "disabled", void 0);
__decorate([
    WithConfig()
], NzButtonComponent.prototype, "nzSize", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzButtonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'button[nz-button], a[nz-button]',
                    exportAs: 'nzButton',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <i nz-icon nzType="loading" *ngIf="nzLoading"></i>
    <ng-content></ng-content>
  `,
                    host: {
                        class: 'ant-btn',
                        '[class.ant-btn-primary]': `nzType === 'primary'`,
                        '[class.ant-btn-dashed]': `nzType === 'dashed'`,
                        '[class.ant-btn-link]': `nzType === 'link'`,
                        '[class.ant-btn-text]': `nzType === 'text'`,
                        '[class.ant-btn-circle]': `nzShape === 'circle'`,
                        '[class.ant-btn-round]': `nzShape === 'round'`,
                        '[class.ant-btn-lg]': `nzSize === 'large'`,
                        '[class.ant-btn-sm]': `nzSize === 'small'`,
                        '[class.ant-btn-dangerous]': `nzDanger`,
                        '[class.ant-btn-loading]': `nzLoading`,
                        '[class.ant-btn-background-ghost]': `nzGhost`,
                        '[class.ant-btn-block]': `nzBlock`,
                        '[class.ant-input-search-button]': `nzSearch`,
                        '[class.ant-btn-rtl]': `dir === 'rtl'`,
                        '[attr.tabindex]': 'disabled ? -1 : (tabIndex === null ? null : tabIndex)',
                        '[attr.disabled]': 'disabled || null'
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: i0.NgZone }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i1.NzConfigService }, { type: i2.Directionality, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { nzIconDirectiveElement: [{
                type: ContentChild,
                args: [NzIconDirective, { read: ElementRef }]
            }], nzBlock: [{
                type: Input
            }], nzGhost: [{
                type: Input
            }], nzSearch: [{
                type: Input
            }], nzLoading: [{
                type: Input
            }], nzDanger: [{
                type: Input
            }], disabled: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], nzType: [{
                type: Input
            }], nzShape: [{
                type: Input
            }], nzSize: [{
                type: Input
            }] } });

class NzButtonGroupComponent {
    constructor(directionality) {
        this.directionality = directionality;
        this.nzSize = 'default';
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
NzButtonGroupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzButtonGroupComponent, deps: [{ token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzButtonGroupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzButtonGroupComponent, selector: "nz-button-group", inputs: { nzSize: "nzSize" }, host: { properties: { "class.ant-btn-group-lg": "nzSize === 'large'", "class.ant-btn-group-sm": "nzSize === 'small'", "class.ant-btn-group-rtl": "dir === 'rtl'" }, classAttribute: "ant-btn-group" }, exportAs: ["nzButtonGroup"], ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzButtonGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-button-group',
                    exportAs: 'nzButtonGroup',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'ant-btn-group',
                        '[class.ant-btn-group-lg]': `nzSize === 'large'`,
                        '[class.ant-btn-group-sm]': `nzSize === 'small'`,
                        '[class.ant-btn-group-rtl]': `dir === 'rtl'`
                    },
                    preserveWhitespaces: false,
                    template: ` <ng-content></ng-content> `
                }]
        }], ctorParameters: function () {
        return [{ type: i2.Directionality, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { nzSize: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzButtonModule {
}
NzButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzButtonModule, declarations: [NzButtonComponent, NzButtonGroupComponent], imports: [BidiModule, CommonModule, NzWaveModule, NzIconModule, ɵNzTransitionPatchModule], exports: [NzButtonComponent, NzButtonGroupComponent, ɵNzTransitionPatchModule, NzWaveModule] });
NzButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzButtonModule, imports: [[BidiModule, CommonModule, NzWaveModule, NzIconModule, ɵNzTransitionPatchModule], ɵNzTransitionPatchModule, NzWaveModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzButtonComponent, NzButtonGroupComponent],
                    exports: [NzButtonComponent, NzButtonGroupComponent, ɵNzTransitionPatchModule, NzWaveModule],
                    imports: [BidiModule, CommonModule, NzWaveModule, NzIconModule, ɵNzTransitionPatchModule]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzButtonComponent, NzButtonGroupComponent, NzButtonModule };
//# sourceMappingURL=ng-zorro-antd-button.mjs.map
