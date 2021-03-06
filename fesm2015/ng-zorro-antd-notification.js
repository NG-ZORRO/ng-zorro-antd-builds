import { EventEmitter, Component, ViewEncapsulation, ChangeDetectorRef, Input, Output, ChangeDetectionStrategy, NgModule, ɵɵdefineInjectable, ɵɵinject, INJECTOR, Injectable, Injector } from '@angular/core';
import { notificationMotion } from 'ng-zorro-antd/core/animation';
import { NzMNComponent, NzMNContainerComponent, NzMNService } from 'ng-zorro-antd/message';
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule, Overlay } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { toCssPixel } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzSingletonService } from 'ng-zorro-antd/core/services';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzNotificationComponent extends NzMNComponent {
    constructor(cdr) {
        super(cdr);
        this.destroyed = new EventEmitter();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.instance.onClick.complete();
    }
    onClick(event) {
        this.instance.onClick.next(event);
    }
    close() {
        this.destroy(true);
    }
    get state() {
        if (this.instance.state === 'enter') {
            if (this.placement === 'topLeft' || this.placement === 'bottomLeft') {
                return 'enterLeft';
            }
            else {
                return 'enterRight';
            }
        }
        else {
            return this.instance.state;
        }
    }
}
NzNotificationComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-notification',
                exportAs: 'nzNotification',
                preserveWhitespaces: false,
                animations: [notificationMotion],
                template: `
    <div
      class="ant-notification-notice ant-notification-notice-closable"
      [ngStyle]="instance.options?.nzStyle || null"
      [ngClass]="instance.options?.nzClass || ''"
      [@notificationMotion]="state"
      (@notificationMotion.done)="animationStateChanged.next($event)"
      (click)="onClick($event)"
      (mouseenter)="onEnter()"
      (mouseleave)="onLeave()"
    >
      <div *ngIf="!instance.template" class="ant-notification-notice-content">
        <div class="ant-notification-notice-content" [ngClass]="{ 'ant-notification-notice-with-icon': instance.type !== 'blank' }">
          <div [class.ant-notification-notice-with-icon]="instance.type !== 'blank'">
            <ng-container [ngSwitch]="instance.type">
              <i
                *ngSwitchCase="'success'"
                nz-icon
                nzType="check-circle"
                class="ant-notification-notice-icon ant-notification-notice-icon-success"
              ></i>
              <i
                *ngSwitchCase="'info'"
                nz-icon
                nzType="info-circle"
                class="ant-notification-notice-icon ant-notification-notice-icon-info"
              ></i>
              <i
                *ngSwitchCase="'warning'"
                nz-icon
                nzType="exclamation-circle"
                class="ant-notification-notice-icon ant-notification-notice-icon-warning"
              ></i>
              <i
                *ngSwitchCase="'error'"
                nz-icon
                nzType="close-circle"
                class="ant-notification-notice-icon ant-notification-notice-icon-error"
              ></i>
            </ng-container>
            <div class="ant-notification-notice-message" [innerHTML]="instance.title"></div>
            <div class="ant-notification-notice-description" [innerHTML]="instance.content"></div>
          </div>
        </div>
      </div>
      <ng-template
        [ngIf]="instance.template"
        [ngTemplateOutlet]="instance.template!"
        [ngTemplateOutletContext]="{ $implicit: this, data: instance.options?.nzData }"
      ></ng-template>
      <a tabindex="0" class="ant-notification-notice-close" (click)="close()">
        <span class="ant-notification-notice-close-x">
          <ng-container *ngIf="instance.options?.nzCloseIcon; else iconTpl">
            <ng-container *nzStringTemplateOutlet="instance.options?.nzCloseIcon; let closeIcon">
              <i nz-icon [nzType]="closeIcon"></i>
            </ng-container>
          </ng-container>
          <ng-template #iconTpl>
            <i nz-icon nzType="close" class="ant-notification-close-icon"></i>
          </ng-template>
        </span>
      </a>
    </div>
  `
            },] }
];
NzNotificationComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
NzNotificationComponent.propDecorators = {
    instance: [{ type: Input }],
    placement: [{ type: Input }],
    index: [{ type: Input }],
    destroyed: [{ type: Output }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const NZ_CONFIG_MODULE_NAME = 'notification';
const NZ_NOTIFICATION_DEFAULT_CONFIG = {
    nzTop: '24px',
    nzBottom: '24px',
    nzPlacement: 'topRight',
    nzDuration: 4500,
    nzMaxStack: 7,
    nzPauseOnHover: true,
    nzAnimate: true,
    nzDirection: 'ltr'
};
class NzNotificationContainerComponent extends NzMNContainerComponent {
    constructor(cdr, nzConfigService) {
        super(cdr, nzConfigService);
        this.dir = 'ltr';
        this.instances = [];
        this.topLeftInstances = [];
        this.topRightInstances = [];
        this.bottomLeftInstances = [];
        this.bottomRightInstances = [];
        const config = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME);
        this.dir = (config === null || config === void 0 ? void 0 : config.nzDirection) || 'ltr';
    }
    create(notification) {
        const noti = this.onCreate(notification);
        const key = noti.options.nzKey;
        const notificationWithSameKey = this.instances.find(msg => msg.options.nzKey === notification.options.nzKey);
        if (key && notificationWithSameKey) {
            this.replaceNotification(notificationWithSameKey, noti);
        }
        else {
            if (this.instances.length >= this.config.nzMaxStack) {
                this.instances = this.instances.slice(1);
            }
            this.instances = [...this.instances, noti];
        }
        this.readyInstances();
        return noti;
    }
    onCreate(instance) {
        instance.options = this.mergeOptions(instance.options);
        instance.onClose = new Subject();
        instance.onClick = new Subject();
        return instance;
    }
    subscribeConfigChange() {
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.updateConfig();
            const config = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME);
            if (config) {
                const { nzDirection } = config;
                this.dir = nzDirection || this.dir;
            }
        });
    }
    updateConfig() {
        this.config = Object.assign(Object.assign(Object.assign({}, NZ_NOTIFICATION_DEFAULT_CONFIG), this.config), this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME));
        this.top = toCssPixel(this.config.nzTop);
        this.bottom = toCssPixel(this.config.nzBottom);
        this.cdr.markForCheck();
    }
    replaceNotification(old, _new) {
        old.title = _new.title;
        old.content = _new.content;
        old.template = _new.template;
        old.type = _new.type;
        old.options = _new.options;
    }
    readyInstances() {
        this.topLeftInstances = this.instances.filter(m => m.options.nzPlacement === 'topLeft');
        this.topRightInstances = this.instances.filter(m => m.options.nzPlacement === 'topRight' || !m.options.nzPlacement);
        this.bottomLeftInstances = this.instances.filter(m => m.options.nzPlacement === 'bottomLeft');
        this.bottomRightInstances = this.instances.filter(m => m.options.nzPlacement === 'bottomRight');
        this.cdr.detectChanges();
    }
    mergeOptions(options) {
        const { nzDuration, nzAnimate, nzPauseOnHover, nzPlacement } = this.config;
        return Object.assign({ nzDuration, nzAnimate, nzPauseOnHover, nzPlacement: nzPlacement }, options);
    }
}
NzNotificationContainerComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-notification-container',
                exportAs: 'nzNotificationContainer',
                preserveWhitespaces: false,
                template: `
    <div
      class="ant-notification ant-notification-topLeft"
      [class.ant-notification-rtl]="dir === 'rtl'"
      [style.top]="top"
      [style.left]="'0px'"
    >
      <nz-notification
        *ngFor="let instance of topLeftInstances"
        [instance]="instance"
        [placement]="config.nzPlacement"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-notification>
    </div>
    <div
      class="ant-notification ant-notification-topRight"
      [class.ant-notification-rtl]="dir === 'rtl'"
      [style.top]="top"
      [style.right]="'0px'"
    >
      <nz-notification
        *ngFor="let instance of topRightInstances"
        [instance]="instance"
        [placement]="config.nzPlacement"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-notification>
    </div>
    <div
      class="ant-notification ant-notification-bottomLeft"
      [class.ant-notification-rtl]="dir === 'rtl'"
      [style.bottom]="bottom"
      [style.left]="'0px'"
    >
      <nz-notification
        *ngFor="let instance of bottomLeftInstances"
        [instance]="instance"
        [placement]="config.nzPlacement"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-notification>
    </div>
    <div
      class="ant-notification ant-notification-bottomRight"
      [class.ant-notification-rtl]="dir === 'rtl'"
      [style.bottom]="bottom"
      [style.right]="'0px'"
    >
      <nz-notification
        *ngFor="let instance of bottomRightInstances"
        [instance]="instance"
        [placement]="config.nzPlacement"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-notification>
    </div>
  `
            },] }
];
NzNotificationContainerComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NzConfigService }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzNotificationServiceModule {
}
NzNotificationServiceModule.decorators = [
    { type: NgModule }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzNotificationModule {
}
NzNotificationModule.decorators = [
    { type: NgModule, args: [{
                imports: [BidiModule, CommonModule, OverlayModule, NzIconModule, NzOutletModule, NzNotificationServiceModule],
                declarations: [NzNotificationComponent, NzNotificationContainerComponent],
                entryComponents: [NzNotificationContainerComponent]
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
let notificationId = 0;
class NzNotificationService extends NzMNService {
    constructor(nzSingletonService, overlay, injector) {
        super(nzSingletonService, overlay, injector);
        this.componentPrefix = 'notification-';
    }
    success(title, content, options) {
        return this.createInstance({ type: 'success', title, content }, options);
    }
    error(title, content, options) {
        return this.createInstance({ type: 'error', title, content }, options);
    }
    info(title, content, options) {
        return this.createInstance({ type: 'info', title, content }, options);
    }
    warning(title, content, options) {
        return this.createInstance({ type: 'warning', title, content }, options);
    }
    blank(title, content, options) {
        return this.createInstance({ type: 'blank', title, content }, options);
    }
    create(type, title, content, options) {
        return this.createInstance({ type, title, content }, options);
    }
    template(template, options) {
        return this.createInstance({ template }, options);
    }
    generateMessageId() {
        return `${this.componentPrefix}-${notificationId++}`;
    }
    createInstance(message, options) {
        this.container = this.withContainer(NzNotificationContainerComponent);
        return this.container.create(Object.assign(Object.assign({}, message), {
            createdAt: new Date(),
            messageId: this.generateMessageId(),
            options
        }));
    }
}
NzNotificationService.ɵprov = ɵɵdefineInjectable({ factory: function NzNotificationService_Factory() { return new NzNotificationService(ɵɵinject(NzSingletonService), ɵɵinject(Overlay), ɵɵinject(INJECTOR)); }, token: NzNotificationService, providedIn: NzNotificationServiceModule });
NzNotificationService.decorators = [
    { type: Injectable, args: [{
                providedIn: NzNotificationServiceModule
            },] }
];
NzNotificationService.ctorParameters = () => [
    { type: NzSingletonService },
    { type: Overlay },
    { type: Injector }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzNotificationComponent, NzNotificationContainerComponent, NzNotificationModule, NzNotificationService, NzNotificationServiceModule };
//# sourceMappingURL=ng-zorro-antd-notification.js.map
