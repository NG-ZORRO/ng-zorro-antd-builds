import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Optional, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * User should provide an object implements this interface to set global configurations.
 */
const NZ_CONFIG = new InjectionToken('nz-config');

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const isDefined = function (value) {
    return value !== undefined;
};
class NzConfigService {
    constructor(defaultConfig) {
        this.configUpdated$ = new Subject();
        this.config = defaultConfig || {};
    }
    getConfig() {
        return this.config;
    }
    getConfigForComponent(componentName) {
        return this.config[componentName];
    }
    getConfigChangeEventForComponent(componentName) {
        return this.configUpdated$.pipe(filter(n => n === componentName), mapTo(undefined));
    }
    set(componentName, value) {
        this.config[componentName] = { ...this.config[componentName], ...value };
        this.configUpdated$.next(componentName);
    }
}
NzConfigService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzConfigService, deps: [{ token: NZ_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
NzConfigService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzConfigService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzConfigService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NZ_CONFIG]
                }] }]; } });
/* eslint-disable no-invalid-this */
/**
 * This decorator is used to decorate properties. If a property is decorated, it would try to load default value from
 * config.
 */
// eslint-disable-next-line
function WithConfig() {
    return function ConfigDecorator(target, propName, originalDescriptor) {
        const privatePropName = `$$__zorroConfigDecorator__${propName}`;
        Object.defineProperty(target, privatePropName, {
            configurable: true,
            writable: true,
            enumerable: false
        });
        return {
            get() {
                const originalValue = originalDescriptor?.get ? originalDescriptor.get.bind(this)() : this[privatePropName];
                const assignedByUser = (this.propertyAssignCounter?.[propName] || 0) > 1;
                const configValue = this.nzConfigService.getConfigForComponent(this._nzModuleName)?.[propName];
                if (assignedByUser && isDefined(originalValue)) {
                    return originalValue;
                }
                else {
                    return isDefined(configValue) ? configValue : originalValue;
                }
            },
            set(value) {
                // If the value is assigned, we consider the newly assigned value as 'assigned by user'.
                this.propertyAssignCounter = this.propertyAssignCounter || {};
                this.propertyAssignCounter[propName] = (this.propertyAssignCounter[propName] || 0) + 1;
                if (originalDescriptor?.set) {
                    originalDescriptor.set.bind(this)(value);
                }
                else {
                    this[privatePropName] = value;
                }
            },
            configurable: true,
            enumerable: true
        };
    };
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NZ_CONFIG, NzConfigService, WithConfig };
//# sourceMappingURL=ng-zorro-antd-core-config.mjs.map
