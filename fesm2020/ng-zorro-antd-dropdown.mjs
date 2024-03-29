import { __decorate } from 'tslib';
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { TemplatePortal } from '@angular/cdk/portal';
import * as i0 from '@angular/core';
import { EventEmitter, Directive, Input, Output, NgModule, Host, Optional, TemplateRef, Component, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, Injectable } from '@angular/core';
import { Subject, BehaviorSubject, merge, fromEvent, EMPTY, combineLatest, Subscription } from 'rxjs';
import { mapTo, map, switchMap, filter, auditTime, distinctUntilChanged, takeUntil, take } from 'rxjs/operators';
import * as i1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { POSITION_MAP, NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i2 from '@angular/cdk/overlay';
import { OverlayModule, ConnectionPositionPair } from '@angular/cdk/overlay';
import * as i3 from '@angular/cdk/platform';
import { PlatformModule } from '@angular/cdk/platform';
import * as i2$1 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as i1$1 from 'ng-zorro-antd/button';
import { NzButtonModule } from 'ng-zorro-antd/button';
import * as i3$1 from 'ng-zorro-antd/core/no-animation';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i1$2 from 'ng-zorro-antd/menu';
import { MenuService, NzIsMenuInsideDropDownToken, NzMenuModule } from 'ng-zorro-antd/menu';
import { slideMotion } from 'ng-zorro-antd/core/animation';

const NZ_CONFIG_MODULE_NAME = 'dropDown';
const listOfPositions$1 = [
    POSITION_MAP.bottomLeft,
    POSITION_MAP.bottomRight,
    POSITION_MAP.topRight,
    POSITION_MAP.topLeft
];
class NzDropDownDirective {
    constructor(nzConfigService, elementRef, overlay, renderer, viewContainerRef, platform) {
        this.nzConfigService = nzConfigService;
        this.elementRef = elementRef;
        this.overlay = overlay;
        this.renderer = renderer;
        this.viewContainerRef = viewContainerRef;
        this.platform = platform;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.overlayRef = null;
        this.destroy$ = new Subject();
        this.positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.elementRef.nativeElement)
            .withLockedPosition()
            .withTransformOriginOn('.ant-dropdown');
        this.inputVisible$ = new BehaviorSubject(false);
        this.nzTrigger$ = new BehaviorSubject('hover');
        this.overlayClose$ = new Subject();
        this.nzDropdownMenu = null;
        this.nzTrigger = 'hover';
        this.nzMatchWidthElement = null;
        this.nzBackdrop = false;
        this.nzClickHide = true;
        this.nzDisabled = false;
        this.nzVisible = false;
        this.nzOverlayClassName = '';
        this.nzOverlayStyle = {};
        this.nzPlacement = 'bottomLeft';
        this.nzVisibleChange = new EventEmitter();
    }
    setDropdownMenuValue(key, value) {
        if (this.nzDropdownMenu) {
            this.nzDropdownMenu.setValue(key, value);
        }
    }
    ngAfterViewInit() {
        if (this.nzDropdownMenu) {
            const nativeElement = this.elementRef.nativeElement;
            /** host mouse state **/
            const hostMouseState$ = merge(fromEvent(nativeElement, 'mouseenter').pipe(mapTo(true)), fromEvent(nativeElement, 'mouseleave').pipe(mapTo(false)));
            /** menu mouse state **/
            const menuMouseState$ = this.nzDropdownMenu.mouseState$;
            /** merged mouse state **/
            const mergedMouseState$ = merge(menuMouseState$, hostMouseState$);
            /** host click state **/
            const hostClickState$ = fromEvent(nativeElement, 'click').pipe(map(() => !this.nzVisible));
            /** visible state switch by nzTrigger **/
            const visibleStateByTrigger$ = this.nzTrigger$.pipe(switchMap(trigger => {
                if (trigger === 'hover') {
                    return mergedMouseState$;
                }
                else if (trigger === 'click') {
                    return hostClickState$;
                }
                else {
                    return EMPTY;
                }
            }));
            const descendantMenuItemClick$ = this.nzDropdownMenu.descendantMenuItemClick$.pipe(filter(() => this.nzClickHide), mapTo(false));
            const domTriggerVisible$ = merge(visibleStateByTrigger$, descendantMenuItemClick$, this.overlayClose$).pipe(filter(() => !this.nzDisabled));
            const visible$ = merge(this.inputVisible$, domTriggerVisible$);
            combineLatest([visible$, this.nzDropdownMenu.isChildSubMenuOpen$])
                .pipe(map(([visible, sub]) => visible || sub), auditTime(150), distinctUntilChanged(), filter(() => this.platform.isBrowser), takeUntil(this.destroy$))
                .subscribe((visible) => {
                const element = this.nzMatchWidthElement ? this.nzMatchWidthElement.nativeElement : nativeElement;
                const triggerWidth = element.getBoundingClientRect().width;
                if (this.nzVisible !== visible) {
                    this.nzVisibleChange.emit(visible);
                }
                this.nzVisible = visible;
                if (visible) {
                    /** set up overlayRef **/
                    if (!this.overlayRef) {
                        /** new overlay **/
                        this.overlayRef = this.overlay.create({
                            positionStrategy: this.positionStrategy,
                            minWidth: triggerWidth,
                            disposeOnNavigation: true,
                            hasBackdrop: this.nzBackdrop && this.nzTrigger === 'click',
                            scrollStrategy: this.overlay.scrollStrategies.reposition()
                        });
                        merge(this.overlayRef.backdropClick(), this.overlayRef.detachments(), this.overlayRef
                            .outsidePointerEvents()
                            .pipe(filter((e) => !this.elementRef.nativeElement.contains(e.target))), this.overlayRef.keydownEvents().pipe(filter(e => e.keyCode === ESCAPE && !hasModifierKey(e))))
                            .pipe(takeUntil(this.destroy$))
                            .subscribe(() => {
                            this.overlayClose$.next(false);
                        });
                    }
                    else {
                        /** update overlay config **/
                        const overlayConfig = this.overlayRef.getConfig();
                        overlayConfig.minWidth = triggerWidth;
                    }
                    /** open dropdown with animation **/
                    this.positionStrategy.withPositions([POSITION_MAP[this.nzPlacement], ...listOfPositions$1]);
                    /** reset portal if needed **/
                    if (!this.portal || this.portal.templateRef !== this.nzDropdownMenu.templateRef) {
                        this.portal = new TemplatePortal(this.nzDropdownMenu.templateRef, this.viewContainerRef);
                    }
                    this.overlayRef.attach(this.portal);
                }
                else {
                    /** detach overlayRef if needed **/
                    if (this.overlayRef) {
                        this.overlayRef.detach();
                    }
                }
            });
            this.nzDropdownMenu.animationStateChange$.pipe(takeUntil(this.destroy$)).subscribe(event => {
                if (event.toState === 'void') {
                    if (this.overlayRef) {
                        this.overlayRef.dispose();
                    }
                    this.overlayRef = null;
                }
            });
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    }
    ngOnChanges(changes) {
        const { nzVisible, nzDisabled, nzOverlayClassName, nzOverlayStyle, nzTrigger } = changes;
        if (nzTrigger) {
            this.nzTrigger$.next(this.nzTrigger);
        }
        if (nzVisible) {
            this.inputVisible$.next(this.nzVisible);
        }
        if (nzDisabled) {
            const nativeElement = this.elementRef.nativeElement;
            if (this.nzDisabled) {
                this.renderer.setAttribute(nativeElement, 'disabled', '');
                this.inputVisible$.next(false);
            }
            else {
                this.renderer.removeAttribute(nativeElement, 'disabled');
            }
        }
        if (nzOverlayClassName) {
            this.setDropdownMenuValue('nzOverlayClassName', this.nzOverlayClassName);
        }
        if (nzOverlayStyle) {
            this.setDropdownMenuValue('nzOverlayStyle', this.nzOverlayStyle);
        }
    }
}
NzDropDownDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDropDownDirective, deps: [{ token: i1.NzConfigService }, { token: i0.ElementRef }, { token: i2.Overlay }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i3.Platform }], target: i0.ɵɵFactoryTarget.Directive });
NzDropDownDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzDropDownDirective, selector: "[nz-dropdown]", inputs: { nzDropdownMenu: "nzDropdownMenu", nzTrigger: "nzTrigger", nzMatchWidthElement: "nzMatchWidthElement", nzBackdrop: "nzBackdrop", nzClickHide: "nzClickHide", nzDisabled: "nzDisabled", nzVisible: "nzVisible", nzOverlayClassName: "nzOverlayClassName", nzOverlayStyle: "nzOverlayStyle", nzPlacement: "nzPlacement" }, outputs: { nzVisibleChange: "nzVisibleChange" }, host: { classAttribute: "ant-dropdown-trigger" }, exportAs: ["nzDropdown"], usesOnChanges: true, ngImport: i0 });
__decorate([
    WithConfig(),
    InputBoolean()
], NzDropDownDirective.prototype, "nzBackdrop", void 0);
__decorate([
    InputBoolean()
], NzDropDownDirective.prototype, "nzClickHide", void 0);
__decorate([
    InputBoolean()
], NzDropDownDirective.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean()
], NzDropDownDirective.prototype, "nzVisible", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDropDownDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-dropdown]',
                    exportAs: 'nzDropdown',
                    host: {
                        class: 'ant-dropdown-trigger'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzConfigService }, { type: i0.ElementRef }, { type: i2.Overlay }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i3.Platform }]; }, propDecorators: { nzDropdownMenu: [{
                type: Input
            }], nzTrigger: [{
                type: Input
            }], nzMatchWidthElement: [{
                type: Input
            }], nzBackdrop: [{
                type: Input
            }], nzClickHide: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzVisible: [{
                type: Input
            }], nzOverlayClassName: [{
                type: Input
            }], nzOverlayStyle: [{
                type: Input
            }], nzPlacement: [{
                type: Input
            }], nzVisibleChange: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzContextMenuServiceModule {
}
NzContextMenuServiceModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzContextMenuServiceModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzContextMenuServiceModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzContextMenuServiceModule });
NzContextMenuServiceModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzContextMenuServiceModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzContextMenuServiceModule, decorators: [{
            type: NgModule
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzDropDownADirective {
    constructor() { }
}
NzDropDownADirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDropDownADirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzDropDownADirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzDropDownADirective, selector: "a[nz-dropdown]", host: { classAttribute: "ant-dropdown-link" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDropDownADirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'a[nz-dropdown]',
                    host: {
                        class: 'ant-dropdown-link'
                    }
                }]
        }], ctorParameters: function () { return []; } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzDropdownButtonDirective {
    constructor(renderer, nzButtonGroupComponent, elementRef) {
        this.renderer = renderer;
        this.nzButtonGroupComponent = nzButtonGroupComponent;
        this.elementRef = elementRef;
    }
    ngAfterViewInit() {
        const parentElement = this.renderer.parentNode(this.elementRef.nativeElement);
        if (this.nzButtonGroupComponent && parentElement) {
            this.renderer.addClass(parentElement, 'ant-dropdown-button');
        }
    }
}
NzDropdownButtonDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDropdownButtonDirective, deps: [{ token: i0.Renderer2 }, { token: i1$1.NzButtonGroupComponent, host: true, optional: true }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NzDropdownButtonDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzDropdownButtonDirective, selector: "[nz-button][nz-dropdown]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDropdownButtonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-button][nz-dropdown]'
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i1$1.NzButtonGroupComponent, decorators: [{
                    type: Host
                }, {
                    type: Optional
                }] }, { type: i0.ElementRef }]; } });

class NzDropdownMenuComponent {
    constructor(cdr, elementRef, renderer, viewContainerRef, nzMenuService, directionality, noAnimation) {
        this.cdr = cdr;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.viewContainerRef = viewContainerRef;
        this.nzMenuService = nzMenuService;
        this.directionality = directionality;
        this.noAnimation = noAnimation;
        this.mouseState$ = new BehaviorSubject(false);
        this.isChildSubMenuOpen$ = this.nzMenuService.isChildSubMenuOpen$;
        this.descendantMenuItemClick$ = this.nzMenuService.descendantMenuItemClick$;
        this.animationStateChange$ = new EventEmitter();
        this.nzOverlayClassName = '';
        this.nzOverlayStyle = {};
        this.dir = 'ltr';
        this.destroy$ = new Subject();
    }
    onAnimationEvent(event) {
        this.animationStateChange$.emit(event);
    }
    setMouseState(visible) {
        this.mouseState$.next(visible);
    }
    setValue(key, value) {
        this[key] = value;
        this.cdr.markForCheck();
    }
    ngOnInit() {
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    ngAfterContentInit() {
        this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), this.elementRef.nativeElement);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzDropdownMenuComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDropdownMenuComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i1$2.MenuService }, { token: i2$1.Directionality, optional: true }, { token: i3$1.NzNoAnimationDirective, host: true, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzDropdownMenuComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzDropdownMenuComponent, selector: "nz-dropdown-menu", providers: [
        MenuService,
        /** menu is inside dropdown-menu component **/
        {
            provide: NzIsMenuInsideDropDownToken,
            useValue: true
        }
    ], viewQueries: [{ propertyName: "templateRef", first: true, predicate: TemplateRef, descendants: true, static: true }], exportAs: ["nzDropdownMenu"], ngImport: i0, template: `
    <ng-template>
      <div
        class="ant-dropdown"
        [class.ant-dropdown-rtl]="dir === 'rtl'"
        [ngClass]="nzOverlayClassName"
        [ngStyle]="nzOverlayStyle"
        @slideMotion
        (@slideMotion.done)="onAnimationEvent($event)"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        (mouseenter)="setMouseState(true)"
        (mouseleave)="setMouseState(false)"
      >
        <ng-content></ng-content>
      </div>
    </ng-template>
  `, isInline: true, directives: [{ type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i3$1.NzNoAnimationDirective, selector: "[nzNoAnimation]", inputs: ["nzNoAnimation"], exportAs: ["nzNoAnimation"] }], animations: [slideMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDropdownMenuComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `nz-dropdown-menu`,
                    exportAs: `nzDropdownMenu`,
                    animations: [slideMotion],
                    providers: [
                        MenuService,
                        /** menu is inside dropdown-menu component **/
                        {
                            provide: NzIsMenuInsideDropDownToken,
                            useValue: true
                        }
                    ],
                    template: `
    <ng-template>
      <div
        class="ant-dropdown"
        [class.ant-dropdown-rtl]="dir === 'rtl'"
        [ngClass]="nzOverlayClassName"
        [ngStyle]="nzOverlayStyle"
        @slideMotion
        (@slideMotion.done)="onAnimationEvent($event)"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        (mouseenter)="setMouseState(true)"
        (mouseleave)="setMouseState(false)"
      >
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i1$2.MenuService }, { type: i2$1.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i3$1.NzNoAnimationDirective, decorators: [{
                    type: Host
                }, {
                    type: Optional
                }] }]; }, propDecorators: { templateRef: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzDropDownModule {
}
NzDropDownModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDropDownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzDropDownModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDropDownModule, declarations: [NzDropDownDirective, NzDropDownADirective, NzDropdownMenuComponent, NzDropdownButtonDirective], imports: [BidiModule,
        CommonModule,
        OverlayModule,
        FormsModule,
        NzButtonModule,
        NzMenuModule,
        NzIconModule,
        NzNoAnimationModule,
        PlatformModule,
        NzOverlayModule,
        NzContextMenuServiceModule,
        NzOutletModule], exports: [NzMenuModule, NzDropDownDirective, NzDropDownADirective, NzDropdownMenuComponent, NzDropdownButtonDirective] });
NzDropDownModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDropDownModule, imports: [[
            BidiModule,
            CommonModule,
            OverlayModule,
            FormsModule,
            NzButtonModule,
            NzMenuModule,
            NzIconModule,
            NzNoAnimationModule,
            PlatformModule,
            NzOverlayModule,
            NzContextMenuServiceModule,
            NzOutletModule
        ], NzMenuModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzDropDownModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        BidiModule,
                        CommonModule,
                        OverlayModule,
                        FormsModule,
                        NzButtonModule,
                        NzMenuModule,
                        NzIconModule,
                        NzNoAnimationModule,
                        PlatformModule,
                        NzOverlayModule,
                        NzContextMenuServiceModule,
                        NzOutletModule
                    ],
                    entryComponents: [NzDropdownMenuComponent],
                    declarations: [NzDropDownDirective, NzDropDownADirective, NzDropdownMenuComponent, NzDropdownButtonDirective],
                    exports: [NzMenuModule, NzDropDownDirective, NzDropDownADirective, NzDropdownMenuComponent, NzDropdownButtonDirective]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const listOfPositions = [
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'top' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'end', overlayY: 'top' })
];
class NzContextMenuService {
    constructor(overlay) {
        this.overlay = overlay;
        this.overlayRef = null;
        this.closeSubscription = Subscription.EMPTY;
    }
    create($event, nzDropdownMenuComponent) {
        this.close(true);
        const { x, y } = $event;
        if ($event instanceof MouseEvent) {
            $event.preventDefault();
        }
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo({ x, y })
            .withPositions(listOfPositions)
            .withTransformOriginOn('.ant-dropdown');
        this.overlayRef = this.overlay.create({
            positionStrategy,
            disposeOnNavigation: true,
            scrollStrategy: this.overlay.scrollStrategies.close()
        });
        this.closeSubscription = merge(nzDropdownMenuComponent.descendantMenuItemClick$, fromEvent(document, 'click').pipe(filter(event => !!this.overlayRef && !this.overlayRef.overlayElement.contains(event.target)), 
        /** handle firefox contextmenu event **/
        filter(event => event.button !== 2), take(1))).subscribe(() => {
            this.close();
        });
        this.overlayRef.attach(new TemplatePortal(nzDropdownMenuComponent.templateRef, nzDropdownMenuComponent.viewContainerRef));
    }
    close(clear = false) {
        if (this.overlayRef) {
            this.overlayRef.detach();
            if (clear) {
                this.overlayRef.dispose();
            }
            this.overlayRef = null;
            this.closeSubscription.unsubscribe();
        }
    }
}
NzContextMenuService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzContextMenuService, deps: [{ token: i2.Overlay }], target: i0.ɵɵFactoryTarget.Injectable });
NzContextMenuService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzContextMenuService, providedIn: NzContextMenuServiceModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzContextMenuService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: NzContextMenuServiceModule
                }]
        }], ctorParameters: function () { return [{ type: i2.Overlay }]; } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzContextMenuService, NzContextMenuServiceModule, NzDropDownADirective, NzDropDownDirective, NzDropDownModule, NzDropdownButtonDirective, NzDropdownMenuComponent };
//# sourceMappingURL=ng-zorro-antd-dropdown.mjs.map
