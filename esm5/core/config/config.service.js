/**
 * @fileoverview added by tsickle
 * Generated from: config.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Inject, Injectable, Optional } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';
import { NZ_CONFIG } from './config';
import * as i0 from "@angular/core";
import * as i1 from "./config";
/** @type {?} */
var isDefined = (/**
 * @param {?=} value
 * @return {?}
 */
function (value) {
    return value !== undefined;
});
var ɵ0 = isDefined;
var NzConfigService = /** @class */ (function () {
    function NzConfigService(defaultConfig) {
        this.configUpdated$ = new Subject();
        this.config = defaultConfig || {};
    }
    /**
     * @template T
     * @param {?} componentName
     * @return {?}
     */
    NzConfigService.prototype.getConfigForComponent = /**
     * @template T
     * @param {?} componentName
     * @return {?}
     */
    function (componentName) {
        return this.config[componentName];
    };
    /**
     * @param {?} componentName
     * @return {?}
     */
    NzConfigService.prototype.getConfigChangeEventForComponent = /**
     * @param {?} componentName
     * @return {?}
     */
    function (componentName) {
        return this.configUpdated$.pipe(filter((/**
         * @param {?} n
         * @return {?}
         */
        function (n) { return n === componentName; })), mapTo(undefined));
    };
    /**
     * @template T
     * @param {?} componentName
     * @param {?} value
     * @return {?}
     */
    NzConfigService.prototype.set = /**
     * @template T
     * @param {?} componentName
     * @param {?} value
     * @return {?}
     */
    function (componentName, value) {
        this.config[componentName] = __assign(__assign({}, this.config[componentName]), value);
        this.configUpdated$.next(componentName);
    };
    NzConfigService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NzConfigService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NZ_CONFIG,] }] }
    ]; };
    /** @nocollapse */ NzConfigService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NzConfigService_Factory() { return new NzConfigService(i0.ɵɵinject(i1.NZ_CONFIG, 8)); }, token: NzConfigService, providedIn: "root" });
    return NzConfigService;
}());
export { NzConfigService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NzConfigService.prototype.configUpdated$;
    /**
     * Global config holding property.
     * @type {?}
     * @private
     */
    NzConfigService.prototype.config;
}
// tslint:disable:no-invalid-this
/**
 * This decorator is used to decorate properties. If a property is decorated, it would try to load default value from
 * config.
 * @template T
 * @param {?} componentName
 * @return {?}
 */
// tslint:disable-next-line:typedef
export function WithConfig(componentName) {
    return (/**
     * @param {?} target
     * @param {?} propName
     * @param {?=} originalDescriptor
     * @return {?}
     */
    function ConfigDecorator(target, propName, originalDescriptor) {
        /** @type {?} */
        var privatePropName = "$$__assignedValue__" + propName;
        Object.defineProperty(target, privatePropName, {
            configurable: true,
            writable: true,
            enumerable: false
        });
        return {
            get: /**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var originalValue = (originalDescriptor === null || originalDescriptor === void 0 ? void 0 : originalDescriptor.get) ? originalDescriptor.get.bind(this)() : this[privatePropName];
                /** @type {?} */
                var assignedByUser = (this.assignmentCount[propName] || 0) > 1;
                if (assignedByUser && isDefined(originalValue)) {
                    return originalValue;
                }
                /** @type {?} */
                var componentConfig = this.nzConfigService.getConfigForComponent(componentName) || {};
                /** @type {?} */
                var configValue = componentConfig[propName];
                /** @type {?} */
                var ret = isDefined(configValue) ? configValue : originalValue;
                return ret;
            },
            set: /**
             * @param {?=} value
             * @return {?}
             */
            function (value) {
                // If the value is assigned, we consider the newly assigned value as 'assigned by user'.
                this.assignmentCount = this.assignmentCount || {};
                this.assignmentCount[propName] = (this.assignmentCount[propName] || 0) + 1;
                if (originalDescriptor === null || originalDescriptor === void 0 ? void 0 : originalDescriptor.set) {
                    originalDescriptor.set.bind(this)(value);
                }
                else {
                    this[privatePropName] = value;
                }
            },
            configurable: true,
            enumerable: true
        };
    });
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnLyIsInNvdXJjZXMiOlsiY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU3RCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0MsT0FBTyxFQUFFLFNBQVMsRUFBeUIsTUFBTSxVQUFVLENBQUM7Ozs7SUFFdEQsU0FBUzs7OztBQUFHLFVBQVUsS0FBaUI7SUFDM0MsT0FBTyxLQUFLLEtBQUssU0FBUyxDQUFDO0FBQzdCLENBQUMsQ0FBQTs7QUFFRDtJQVNFLHlCQUEyQyxhQUF3QjtRQUwzRCxtQkFBYyxHQUFHLElBQUksT0FBTyxFQUFrQixDQUFDO1FBTXJELElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxJQUFJLEVBQUUsQ0FBQztJQUNwQyxDQUFDOzs7Ozs7SUFFRCwrQ0FBcUI7Ozs7O0lBQXJCLFVBQTZDLGFBQWdCO1FBQzNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUVELDBEQUFnQzs7OztJQUFoQyxVQUFpQyxhQUEwQjtRQUN6RCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUM3QixNQUFNOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEtBQUssYUFBYSxFQUFuQixDQUFtQixFQUFDLEVBQ2hDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FDakIsQ0FBQztJQUNKLENBQUM7Ozs7Ozs7SUFFRCw2QkFBRzs7Ozs7O0lBQUgsVUFBMkIsYUFBZ0IsRUFBRSxLQUFrQjtRQUM3RCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyx5QkFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFLLEtBQUssQ0FBRSxDQUFDO1FBQ3pFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzFDLENBQUM7O2dCQTNCRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dEQU9jLFFBQVEsWUFBSSxNQUFNLFNBQUMsU0FBUzs7OzBCQTFCM0M7Q0E2Q0MsQUE1QkQsSUE0QkM7U0F6QlksZUFBZTs7Ozs7O0lBQzFCLHlDQUF1RDs7Ozs7O0lBR3ZELGlDQUF5Qjs7Ozs7Ozs7Ozs7QUE4QjNCLE1BQU0sVUFBVSxVQUFVLENBQUksYUFBMEI7SUFDdEQ7Ozs7OztJQUFPLFNBQVMsZUFBZSxDQUFDLE1BQWlCLEVBQUUsUUFBbUIsRUFBRSxrQkFBK0M7O1lBQy9HLGVBQWUsR0FBRyx3QkFBc0IsUUFBVTtRQUV4RCxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUU7WUFDN0MsWUFBWSxFQUFFLElBQUk7WUFDbEIsUUFBUSxFQUFFLElBQUk7WUFDZCxVQUFVLEVBQUUsS0FBSztTQUNsQixDQUFDLENBQUM7UUFFSCxPQUFPO1lBQ0wsR0FBRzs7O1lBQUg7O29CQUNRLGFBQWEsR0FBRyxDQUFBLGtCQUFrQixhQUFsQixrQkFBa0IsdUJBQWxCLGtCQUFrQixDQUFFLEdBQUcsRUFBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDOztvQkFDckcsY0FBYyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO2dCQUVoRSxJQUFJLGNBQWMsSUFBSSxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUU7b0JBQzlDLE9BQU8sYUFBYSxDQUFDO2lCQUN0Qjs7b0JBRUssZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRTs7b0JBQ2pGLFdBQVcsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDOztvQkFDdkMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxhQUFhO2dCQUVoRSxPQUFPLEdBQUcsQ0FBQztZQUNiLENBQUM7WUFDRCxHQUFHOzs7O1lBQUgsVUFBSSxLQUFTO2dCQUNYLHdGQUF3RjtnQkFDeEYsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUUzRSxJQUFJLGtCQUFrQixhQUFsQixrQkFBa0IsdUJBQWxCLGtCQUFrQixDQUFFLEdBQUcsRUFBRTtvQkFDM0Isa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDMUM7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEtBQUssQ0FBQztpQkFDL0I7WUFDSCxDQUFDO1lBQ0QsWUFBWSxFQUFFLElBQUk7WUFDbEIsVUFBVSxFQUFFLElBQUk7U0FDakIsQ0FBQztJQUNKLENBQUMsRUFBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBmaWx0ZXIsIG1hcFRvIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOWl9DT05GSUcsIE56Q29uZmlnLCBOekNvbmZpZ0tleSB9IGZyb20gJy4vY29uZmlnJztcblxuY29uc3QgaXNEZWZpbmVkID0gZnVuY3Rpb24gKHZhbHVlPzogTnpTYWZlQW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkO1xufTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTnpDb25maWdTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjb25maWdVcGRhdGVkJCA9IG5ldyBTdWJqZWN0PGtleW9mIE56Q29uZmlnPigpO1xuXG4gIC8qKiBHbG9iYWwgY29uZmlnIGhvbGRpbmcgcHJvcGVydHkuICovXG4gIHByaXZhdGUgY29uZmlnOiBOekNvbmZpZztcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASW5qZWN0KE5aX0NPTkZJRykgZGVmYXVsdENvbmZpZz86IE56Q29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSBkZWZhdWx0Q29uZmlnIHx8IHt9O1xuICB9XG5cbiAgZ2V0Q29uZmlnRm9yQ29tcG9uZW50PFQgZXh0ZW5kcyBOekNvbmZpZ0tleT4oY29tcG9uZW50TmFtZTogVCk6IE56Q29uZmlnW1RdIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWdbY29tcG9uZW50TmFtZV07XG4gIH1cblxuICBnZXRDb25maWdDaGFuZ2VFdmVudEZvckNvbXBvbmVudChjb21wb25lbnROYW1lOiBOekNvbmZpZ0tleSk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ1VwZGF0ZWQkLnBpcGUoXG4gICAgICBmaWx0ZXIobiA9PiBuID09PSBjb21wb25lbnROYW1lKSxcbiAgICAgIG1hcFRvKHVuZGVmaW5lZClcbiAgICApO1xuICB9XG5cbiAgc2V0PFQgZXh0ZW5kcyBOekNvbmZpZ0tleT4oY29tcG9uZW50TmFtZTogVCwgdmFsdWU6IE56Q29uZmlnW1RdKTogdm9pZCB7XG4gICAgdGhpcy5jb25maWdbY29tcG9uZW50TmFtZV0gPSB7IC4uLnRoaXMuY29uZmlnW2NvbXBvbmVudE5hbWVdLCAuLi52YWx1ZSB9O1xuICAgIHRoaXMuY29uZmlnVXBkYXRlZCQubmV4dChjb21wb25lbnROYW1lKTtcbiAgfVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1pbnZhbGlkLXRoaXNcblxuLyoqXG4gKiBUaGlzIGRlY29yYXRvciBpcyB1c2VkIHRvIGRlY29yYXRlIHByb3BlcnRpZXMuIElmIGEgcHJvcGVydHkgaXMgZGVjb3JhdGVkLCBpdCB3b3VsZCB0cnkgdG8gbG9hZCBkZWZhdWx0IHZhbHVlIGZyb21cbiAqIGNvbmZpZy5cbiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnR5cGVkZWZcbmV4cG9ydCBmdW5jdGlvbiBXaXRoQ29uZmlnPFQ+KGNvbXBvbmVudE5hbWU6IE56Q29uZmlnS2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbiBDb25maWdEZWNvcmF0b3IodGFyZ2V0OiBOelNhZmVBbnksIHByb3BOYW1lOiBOelNhZmVBbnksIG9yaWdpbmFsRGVzY3JpcHRvcj86IFR5cGVkUHJvcGVydHlEZXNjcmlwdG9yPFQ+KTogTnpTYWZlQW55IHtcbiAgICBjb25zdCBwcml2YXRlUHJvcE5hbWUgPSBgJCRfX2Fzc2lnbmVkVmFsdWVfXyR7cHJvcE5hbWV9YDtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByaXZhdGVQcm9wTmFtZSwge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGdldCgpOiBUIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxWYWx1ZSA9IG9yaWdpbmFsRGVzY3JpcHRvcj8uZ2V0ID8gb3JpZ2luYWxEZXNjcmlwdG9yLmdldC5iaW5kKHRoaXMpKCkgOiB0aGlzW3ByaXZhdGVQcm9wTmFtZV07XG4gICAgICAgIGNvbnN0IGFzc2lnbmVkQnlVc2VyID0gKHRoaXMuYXNzaWdubWVudENvdW50W3Byb3BOYW1lXSB8fCAwKSA+IDE7XG5cbiAgICAgICAgaWYgKGFzc2lnbmVkQnlVc2VyICYmIGlzRGVmaW5lZChvcmlnaW5hbFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBvcmlnaW5hbFZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29tcG9uZW50Q29uZmlnID0gdGhpcy5uekNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlnRm9yQ29tcG9uZW50KGNvbXBvbmVudE5hbWUpIHx8IHt9O1xuICAgICAgICBjb25zdCBjb25maWdWYWx1ZSA9IGNvbXBvbmVudENvbmZpZ1twcm9wTmFtZV07XG4gICAgICAgIGNvbnN0IHJldCA9IGlzRGVmaW5lZChjb25maWdWYWx1ZSkgPyBjb25maWdWYWx1ZSA6IG9yaWdpbmFsVmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH0sXG4gICAgICBzZXQodmFsdWU/OiBUKTogdm9pZCB7XG4gICAgICAgIC8vIElmIHRoZSB2YWx1ZSBpcyBhc3NpZ25lZCwgd2UgY29uc2lkZXIgdGhlIG5ld2x5IGFzc2lnbmVkIHZhbHVlIGFzICdhc3NpZ25lZCBieSB1c2VyJy5cbiAgICAgICAgdGhpcy5hc3NpZ25tZW50Q291bnQgPSB0aGlzLmFzc2lnbm1lbnRDb3VudCB8fCB7fTtcbiAgICAgICAgdGhpcy5hc3NpZ25tZW50Q291bnRbcHJvcE5hbWVdID0gKHRoaXMuYXNzaWdubWVudENvdW50W3Byb3BOYW1lXSB8fCAwKSArIDE7XG5cbiAgICAgICAgaWYgKG9yaWdpbmFsRGVzY3JpcHRvcj8uc2V0KSB7XG4gICAgICAgICAgb3JpZ2luYWxEZXNjcmlwdG9yLnNldC5iaW5kKHRoaXMpKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzW3ByaXZhdGVQcm9wTmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9O1xuICB9O1xufVxuIl19