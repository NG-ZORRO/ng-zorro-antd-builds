import { ComponentPortal } from '@angular/cdk/portal';
import { Directive, ChangeDetectorRef, EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, NgModule, ɵɵdefineInjectable, ɵɵinject, INJECTOR, Injectable, Injector, Input, Output } from '@angular/core';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { NzSingletonService } from 'ng-zorro-antd/core/services';
import { toCssPixel } from 'ng-zorro-antd/core/util';
import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { moveUpMotion } from 'ng-zorro-antd/core/animation';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
let globalCounter = 0;
class NzMNService {
    constructor(nzSingletonService, overlay, injector) {
        this.nzSingletonService = nzSingletonService;
        this.overlay = overlay;
        this.injector = injector;
    }
    remove(id) {
        if (this.container) {
            if (id) {
                this.container.remove(id);
            }
            else {
                this.container.removeAll();
            }
        }
    }
    getInstanceId() {
        return `${this.componentPrefix}-${globalCounter++}`;
    }
    withContainer(ctor) {
        let containerInstance = this.nzSingletonService.getSingletonWithKey(this.componentPrefix);
        if (containerInstance) {
            return containerInstance;
        }
        const overlayRef = this.overlay.create({
            hasBackdrop: false,
            scrollStrategy: this.overlay.scrollStrategies.noop(),
            positionStrategy: this.overlay.position().global()
        });
        const componentPortal = new ComponentPortal(ctor, null, this.injector);
        const componentRef = overlayRef.attach(componentPortal);
        const overlayPane = overlayRef.overlayElement;
        overlayPane.style.zIndex = '1010';
        if (!containerInstance) {
            this.container = containerInstance = componentRef.instance;
            this.nzSingletonService.registerSingletonWithKey(this.componentPrefix, containerInstance);
        }
        return containerInstance;
    }
}
class NzMNContainerComponent {
    constructor(cdr, nzConfigService) {
        this.cdr = cdr;
        this.nzConfigService = nzConfigService;
        this.instances = [];
        this.destroy$ = new Subject();
        this.updateConfig();
    }
    ngOnInit() {
        this.subscribeConfigChange();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    create(data) {
        const instance = this.onCreate(data);
        if (this.instances.length >= this.config.nzMaxStack) {
            this.instances = this.instances.slice(1);
        }
        this.instances = [...this.instances, instance];
        this.readyInstances();
        return instance;
    }
    remove(id, userAction = false) {
        this.instances.some((instance, index) => {
            if (instance.messageId === id) {
                this.instances.splice(index, 1);
                this.instances = [...this.instances];
                this.onRemove(instance, userAction);
                this.readyInstances();
                return true;
            }
            return false;
        });
    }
    removeAll() {
        this.instances.forEach(i => this.onRemove(i, false));
        this.instances = [];
        this.readyInstances();
    }
    onCreate(instance) {
        instance.options = this.mergeOptions(instance.options);
        instance.onClose = new Subject();
        return instance;
    }
    onRemove(instance, userAction) {
        instance.onClose.next(userAction);
        instance.onClose.complete();
    }
    readyInstances() {
        this.cdr.detectChanges();
    }
    mergeOptions(options) {
        const { nzDuration, nzAnimate, nzPauseOnHover } = this.config;
        return Object.assign({ nzDuration, nzAnimate, nzPauseOnHover }, options);
    }
}
NzMNContainerComponent.decorators = [
    { type: Directive }
];
NzMNContainerComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NzConfigService }
];
class NzMNComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this.destroyed = new EventEmitter();
        this.animationStateChanged = new Subject();
        this.userAction = false;
        this.eraseTimer = null;
    }
    ngOnInit() {
        this.options = this.instance.options;
        if (this.options.nzAnimate) {
            this.instance.state = 'enter';
            this.animationStateChanged
                .pipe(filter(event => event.phaseName === 'done' && event.toState === 'leave'), take(1))
                .subscribe(() => {
                clearTimeout(this.closeTimer);
                this.destroyed.next({ id: this.instance.messageId, userAction: this.userAction });
            });
        }
        this.autoClose = this.options.nzDuration > 0;
        if (this.autoClose) {
            this.initErase();
            this.startEraseTimeout();
        }
    }
    ngOnDestroy() {
        if (this.autoClose) {
            this.clearEraseTimeout();
        }
        this.animationStateChanged.complete();
    }
    onEnter() {
        if (this.autoClose && this.options.nzPauseOnHover) {
            this.clearEraseTimeout();
            this.updateTTL();
        }
    }
    onLeave() {
        if (this.autoClose && this.options.nzPauseOnHover) {
            this.startEraseTimeout();
        }
    }
    destroy(userAction = false) {
        this.userAction = userAction;
        if (this.options.nzAnimate) {
            this.instance.state = 'leave';
            this.cdr.detectChanges();
            this.closeTimer = setTimeout(() => {
                this.closeTimer = undefined;
                this.destroyed.next({ id: this.instance.messageId, userAction: userAction });
            }, 200);
        }
        else {
            this.destroyed.next({ id: this.instance.messageId, userAction: userAction });
        }
    }
    initErase() {
        this.eraseTTL = this.options.nzDuration;
        this.eraseTimingStart = Date.now();
    }
    updateTTL() {
        if (this.autoClose) {
            this.eraseTTL -= Date.now() - this.eraseTimingStart;
        }
    }
    startEraseTimeout() {
        if (this.eraseTTL > 0) {
            this.clearEraseTimeout();
            this.eraseTimer = setTimeout(() => this.destroy(), this.eraseTTL);
            this.eraseTimingStart = Date.now();
        }
        else {
            this.destroy();
        }
    }
    clearEraseTimeout() {
        if (this.eraseTimer !== null) {
            clearTimeout(this.eraseTimer);
            this.eraseTimer = null;
        }
    }
}
NzMNComponent.decorators = [
    { type: Directive }
];
NzMNComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const NZ_CONFIG_COMPONENT_NAME = 'message';
const NZ_MESSAGE_DEFAULT_CONFIG = {
    nzAnimate: true,
    nzDuration: 3000,
    nzMaxStack: 7,
    nzPauseOnHover: true,
    nzTop: 24,
    nzDirection: 'ltr'
};
class NzMessageContainerComponent extends NzMNContainerComponent {
    constructor(cdr, nzConfigService) {
        super(cdr, nzConfigService);
        this.destroy$ = new Subject();
        this.dir = 'ltr';
        this.instances = [];
        const config = this.nzConfigService.getConfigForComponent(NZ_CONFIG_COMPONENT_NAME);
        this.dir = (config === null || config === void 0 ? void 0 : config.nzDirection) || 'ltr';
    }
    subscribeConfigChange() {
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.updateConfig();
            const config = this.nzConfigService.getConfigForComponent(NZ_CONFIG_COMPONENT_NAME);
            if (config) {
                const { nzDirection } = config;
                this.dir = nzDirection || this.dir;
            }
        });
    }
    updateConfig() {
        this.config = Object.assign(Object.assign(Object.assign({}, NZ_MESSAGE_DEFAULT_CONFIG), this.config), this.nzConfigService.getConfigForComponent(NZ_CONFIG_COMPONENT_NAME));
        this.top = toCssPixel(this.config.nzTop);
        this.cdr.markForCheck();
    }
}
NzMessageContainerComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-message-container',
                exportAs: 'nzMessageContainer',
                preserveWhitespaces: false,
                template: `
    <div class="ant-message" [class.ant-message-rtl]="dir === 'rtl'" [style.top]="top">
      <nz-message *ngFor="let instance of instances" [instance]="instance" (destroyed)="remove($event.id, $event.userAction)"></nz-message>
    </div>
  `
            },] }
];
NzMessageContainerComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NzConfigService }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzMessageServiceModule {
}
NzMessageServiceModule.decorators = [
    { type: NgModule }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzMessageService extends NzMNService {
    constructor(nzSingletonService, overlay, injector) {
        super(nzSingletonService, overlay, injector);
        this.componentPrefix = 'message-';
    }
    success(content, options) {
        return this.createInstance({ type: 'success', content }, options);
    }
    error(content, options) {
        return this.createInstance({ type: 'error', content }, options);
    }
    info(content, options) {
        return this.createInstance({ type: 'info', content }, options);
    }
    warning(content, options) {
        return this.createInstance({ type: 'warning', content }, options);
    }
    loading(content, options) {
        return this.createInstance({ type: 'loading', content }, options);
    }
    create(type, content, options) {
        return this.createInstance({ type, content }, options);
    }
    createInstance(message, options) {
        this.container = this.withContainer(NzMessageContainerComponent);
        return this.container.create(Object.assign(Object.assign({}, message), {
            createdAt: new Date(),
            messageId: this.getInstanceId(),
            options
        }));
    }
}
NzMessageService.ɵprov = ɵɵdefineInjectable({ factory: function NzMessageService_Factory() { return new NzMessageService(ɵɵinject(NzSingletonService), ɵɵinject(Overlay), ɵɵinject(INJECTOR)); }, token: NzMessageService, providedIn: NzMessageServiceModule });
NzMessageService.decorators = [
    { type: Injectable, args: [{
                providedIn: NzMessageServiceModule
            },] }
];
NzMessageService.ctorParameters = () => [
    { type: NzSingletonService },
    { type: Overlay },
    { type: Injector }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzMessageComponent extends NzMNComponent {
    constructor(cdr) {
        super(cdr);
        this.destroyed = new EventEmitter();
    }
}
NzMessageComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-message',
                exportAs: 'nzMessage',
                preserveWhitespaces: false,
                animations: [moveUpMotion],
                template: `
    <div
      class="ant-message-notice"
      [@moveUpMotion]="instance.state"
      (@moveUpMotion.done)="animationStateChanged.next($event)"
      (mouseenter)="onEnter()"
      (mouseleave)="onLeave()"
    >
      <div class="ant-message-notice-content">
        <div class="ant-message-custom-content" [ngClass]="'ant-message-' + instance.type">
          <ng-container [ngSwitch]="instance.type">
            <i *ngSwitchCase="'success'" nz-icon nzType="check-circle"></i>
            <i *ngSwitchCase="'info'" nz-icon nzType="info-circle"></i>
            <i *ngSwitchCase="'warning'" nz-icon nzType="exclamation-circle"></i>
            <i *ngSwitchCase="'error'" nz-icon nzType="close-circle"></i>
            <i *ngSwitchCase="'loading'" nz-icon nzType="loading"></i>
          </ng-container>
          <ng-container *nzStringTemplateOutlet="instance.content">
            <span [innerHTML]="instance.content"></span>
          </ng-container>
        </div>
      </div>
    </div>
  `
            },] }
];
NzMessageComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
NzMessageComponent.propDecorators = {
    instance: [{ type: Input }],
    destroyed: [{ type: Output }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzMessageModule {
}
NzMessageModule.decorators = [
    { type: NgModule, args: [{
                imports: [BidiModule, CommonModule, OverlayModule, NzIconModule, NzOutletModule, NzMessageServiceModule],
                declarations: [NzMessageContainerComponent, NzMessageComponent],
                entryComponents: [NzMessageContainerComponent]
            },] }
];

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

export { NzMNComponent, NzMNContainerComponent, NzMNService, NzMessageComponent, NzMessageContainerComponent, NzMessageModule, NzMessageService, NzMessageServiceModule };
//# sourceMappingURL=ng-zorro-antd-message.js.map
