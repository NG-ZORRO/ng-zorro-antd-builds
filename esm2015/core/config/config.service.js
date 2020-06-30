/**
 * @fileoverview added by tsickle
 * Generated from: config.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
const isDefined = (/**
 * @param {?=} value
 * @return {?}
 */
function (value) {
    return value !== undefined;
});
const ɵ0 = isDefined;
export class NzConfigService {
    /**
     * @param {?=} defaultConfig
     */
    constructor(defaultConfig) {
        this.configUpdated$ = new Subject();
        this.config = defaultConfig || {};
    }
    /**
     * @template T
     * @param {?} componentName
     * @return {?}
     */
    getConfigForComponent(componentName) {
        return this.config[componentName];
    }
    /**
     * @param {?} componentName
     * @return {?}
     */
    getConfigChangeEventForComponent(componentName) {
        return this.configUpdated$.pipe(filter((/**
         * @param {?} n
         * @return {?}
         */
        n => n === componentName)), mapTo(undefined));
    }
    /**
     * @template T
     * @param {?} componentName
     * @param {?} value
     * @return {?}
     */
    set(componentName, value) {
        this.config[componentName] = Object.assign(Object.assign({}, this.config[componentName]), value);
        this.configUpdated$.next(componentName);
    }
}
NzConfigService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NzConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NZ_CONFIG,] }] }
];
/** @nocollapse */ NzConfigService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NzConfigService_Factory() { return new NzConfigService(i0.ɵɵinject(i1.NZ_CONFIG, 8)); }, token: NzConfigService, providedIn: "root" });
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
        const privatePropName = `$$__assignedValue__${propName}`;
        Object.defineProperty(target, privatePropName, {
            configurable: true,
            writable: true,
            enumerable: false
        });
        return {
            /**
             * @return {?}
             */
            get() {
                /** @type {?} */
                const originalValue = (originalDescriptor === null || originalDescriptor === void 0 ? void 0 : originalDescriptor.get) ? originalDescriptor.get.bind(this)() : this[privatePropName];
                /** @type {?} */
                const assignedByUser = (this.assignmentCount[propName] || 0) > 1;
                if (assignedByUser && isDefined(originalValue)) {
                    return originalValue;
                }
                /** @type {?} */
                const componentConfig = this.nzConfigService.getConfigForComponent(componentName) || {};
                /** @type {?} */
                const configValue = componentConfig[propName];
                /** @type {?} */
                const ret = isDefined(configValue) ? configValue : originalValue;
                return ret;
            },
            /**
             * @param {?=} value
             * @return {?}
             */
            set(value) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnLyIsInNvdXJjZXMiOlsiY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdELE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvQyxPQUFPLEVBQUUsU0FBUyxFQUF5QixNQUFNLFVBQVUsQ0FBQzs7OztNQUV0RCxTQUFTOzs7O0FBQUcsVUFBVSxLQUFpQjtJQUMzQyxPQUFPLEtBQUssS0FBSyxTQUFTLENBQUM7QUFDN0IsQ0FBQyxDQUFBOztBQUtELE1BQU0sT0FBTyxlQUFlOzs7O0lBTTFCLFlBQTJDLGFBQXdCO1FBTDNELG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQWtCLENBQUM7UUFNckQsSUFBSSxDQUFDLE1BQU0sR0FBRyxhQUFhLElBQUksRUFBRSxDQUFDO0lBQ3BDLENBQUM7Ozs7OztJQUVELHFCQUFxQixDQUF3QixhQUFnQjtRQUMzRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFRCxnQ0FBZ0MsQ0FBQyxhQUEwQjtRQUN6RCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUM3QixNQUFNOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssYUFBYSxFQUFDLEVBQ2hDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FDakIsQ0FBQztJQUNKLENBQUM7Ozs7Ozs7SUFFRCxHQUFHLENBQXdCLGFBQWdCLEVBQUUsS0FBa0I7UUFDN0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsbUNBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBSyxLQUFLLENBQUUsQ0FBQztRQUN6RSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMxQyxDQUFDOzs7WUEzQkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7OzRDQU9jLFFBQVEsWUFBSSxNQUFNLFNBQUMsU0FBUzs7Ozs7Ozs7SUFMekMseUNBQXVEOzs7Ozs7SUFHdkQsaUNBQXlCOzs7Ozs7Ozs7OztBQThCM0IsTUFBTSxVQUFVLFVBQVUsQ0FBSSxhQUEwQjtJQUN0RDs7Ozs7O0lBQU8sU0FBUyxlQUFlLENBQUMsTUFBaUIsRUFBRSxRQUFtQixFQUFFLGtCQUErQzs7Y0FDL0csZUFBZSxHQUFHLHNCQUFzQixRQUFRLEVBQUU7UUFFeEQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsZUFBZSxFQUFFO1lBQzdDLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsVUFBVSxFQUFFLEtBQUs7U0FDbEIsQ0FBQyxDQUFDO1FBRUgsT0FBTzs7OztZQUNMLEdBQUc7O3NCQUNLLGFBQWEsR0FBRyxDQUFBLGtCQUFrQixhQUFsQixrQkFBa0IsdUJBQWxCLGtCQUFrQixDQUFFLEdBQUcsRUFBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDOztzQkFDckcsY0FBYyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO2dCQUVoRSxJQUFJLGNBQWMsSUFBSSxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUU7b0JBQzlDLE9BQU8sYUFBYSxDQUFDO2lCQUN0Qjs7c0JBRUssZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRTs7c0JBQ2pGLFdBQVcsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDOztzQkFDdkMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxhQUFhO2dCQUVoRSxPQUFPLEdBQUcsQ0FBQztZQUNiLENBQUM7Ozs7O1lBQ0QsR0FBRyxDQUFDLEtBQVM7Z0JBQ1gsd0ZBQXdGO2dCQUN4RixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLElBQUksRUFBRSxDQUFDO2dCQUNsRCxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRTNFLElBQUksa0JBQWtCLGFBQWxCLGtCQUFrQix1QkFBbEIsa0JBQWtCLENBQUUsR0FBRyxFQUFFO29CQUMzQixrQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMxQztxQkFBTTtvQkFDTCxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsS0FBSyxDQUFDO2lCQUMvQjtZQUNILENBQUM7WUFDRCxZQUFZLEVBQUUsSUFBSTtZQUNsQixVQUFVLEVBQUUsSUFBSTtTQUNqQixDQUFDO0lBQ0osQ0FBQyxFQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IGZpbHRlciwgbWFwVG8gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE5aX0NPTkZJRywgTnpDb25maWcsIE56Q29uZmlnS2V5IH0gZnJvbSAnLi9jb25maWcnO1xuXG5jb25zdCBpc0RlZmluZWQgPSBmdW5jdGlvbiAodmFsdWU/OiBOelNhZmVBbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQ7XG59O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOekNvbmZpZ1NlcnZpY2Uge1xuICBwcml2YXRlIGNvbmZpZ1VwZGF0ZWQkID0gbmV3IFN1YmplY3Q8a2V5b2YgTnpDb25maWc+KCk7XG5cbiAgLyoqIEdsb2JhbCBjb25maWcgaG9sZGluZyBwcm9wZXJ0eS4gKi9cbiAgcHJpdmF0ZSBjb25maWc6IE56Q29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoTlpfQ09ORklHKSBkZWZhdWx0Q29uZmlnPzogTnpDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGRlZmF1bHRDb25maWcgfHwge307XG4gIH1cblxuICBnZXRDb25maWdGb3JDb21wb25lbnQ8VCBleHRlbmRzIE56Q29uZmlnS2V5Pihjb21wb25lbnROYW1lOiBUKTogTnpDb25maWdbVF0ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ1tjb21wb25lbnROYW1lXTtcbiAgfVxuXG4gIGdldENvbmZpZ0NoYW5nZUV2ZW50Rm9yQ29tcG9uZW50KGNvbXBvbmVudE5hbWU6IE56Q29uZmlnS2V5KTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnVXBkYXRlZCQucGlwZShcbiAgICAgIGZpbHRlcihuID0+IG4gPT09IGNvbXBvbmVudE5hbWUpLFxuICAgICAgbWFwVG8odW5kZWZpbmVkKVxuICAgICk7XG4gIH1cblxuICBzZXQ8VCBleHRlbmRzIE56Q29uZmlnS2V5Pihjb21wb25lbnROYW1lOiBULCB2YWx1ZTogTnpDb25maWdbVF0pOiB2b2lkIHtcbiAgICB0aGlzLmNvbmZpZ1tjb21wb25lbnROYW1lXSA9IHsgLi4udGhpcy5jb25maWdbY29tcG9uZW50TmFtZV0sIC4uLnZhbHVlIH07XG4gICAgdGhpcy5jb25maWdVcGRhdGVkJC5uZXh0KGNvbXBvbmVudE5hbWUpO1xuICB9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlOm5vLWludmFsaWQtdGhpc1xuXG4vKipcbiAqIFRoaXMgZGVjb3JhdG9yIGlzIHVzZWQgdG8gZGVjb3JhdGUgcHJvcGVydGllcy4gSWYgYSBwcm9wZXJ0eSBpcyBkZWNvcmF0ZWQsIGl0IHdvdWxkIHRyeSB0byBsb2FkIGRlZmF1bHQgdmFsdWUgZnJvbVxuICogY29uZmlnLlxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dHlwZWRlZlxuZXhwb3J0IGZ1bmN0aW9uIFdpdGhDb25maWc8VD4oY29tcG9uZW50TmFtZTogTnpDb25maWdLZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIENvbmZpZ0RlY29yYXRvcih0YXJnZXQ6IE56U2FmZUFueSwgcHJvcE5hbWU6IE56U2FmZUFueSwgb3JpZ2luYWxEZXNjcmlwdG9yPzogVHlwZWRQcm9wZXJ0eURlc2NyaXB0b3I8VD4pOiBOelNhZmVBbnkge1xuICAgIGNvbnN0IHByaXZhdGVQcm9wTmFtZSA9IGAkJF9fYXNzaWduZWRWYWx1ZV9fJHtwcm9wTmFtZX1gO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJpdmF0ZVByb3BOYW1lLCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZ2V0KCk6IFQgfCB1bmRlZmluZWQge1xuICAgICAgICBjb25zdCBvcmlnaW5hbFZhbHVlID0gb3JpZ2luYWxEZXNjcmlwdG9yPy5nZXQgPyBvcmlnaW5hbERlc2NyaXB0b3IuZ2V0LmJpbmQodGhpcykoKSA6IHRoaXNbcHJpdmF0ZVByb3BOYW1lXTtcbiAgICAgICAgY29uc3QgYXNzaWduZWRCeVVzZXIgPSAodGhpcy5hc3NpZ25tZW50Q291bnRbcHJvcE5hbWVdIHx8IDApID4gMTtcblxuICAgICAgICBpZiAoYXNzaWduZWRCeVVzZXIgJiYgaXNEZWZpbmVkKG9yaWdpbmFsVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIG9yaWdpbmFsVmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb21wb25lbnRDb25maWcgPSB0aGlzLm56Q29uZmlnU2VydmljZS5nZXRDb25maWdGb3JDb21wb25lbnQoY29tcG9uZW50TmFtZSkgfHwge307XG4gICAgICAgIGNvbnN0IGNvbmZpZ1ZhbHVlID0gY29tcG9uZW50Q29uZmlnW3Byb3BOYW1lXTtcbiAgICAgICAgY29uc3QgcmV0ID0gaXNEZWZpbmVkKGNvbmZpZ1ZhbHVlKSA/IGNvbmZpZ1ZhbHVlIDogb3JpZ2luYWxWYWx1ZTtcblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfSxcbiAgICAgIHNldCh2YWx1ZT86IFQpOiB2b2lkIHtcbiAgICAgICAgLy8gSWYgdGhlIHZhbHVlIGlzIGFzc2lnbmVkLCB3ZSBjb25zaWRlciB0aGUgbmV3bHkgYXNzaWduZWQgdmFsdWUgYXMgJ2Fzc2lnbmVkIGJ5IHVzZXInLlxuICAgICAgICB0aGlzLmFzc2lnbm1lbnRDb3VudCA9IHRoaXMuYXNzaWdubWVudENvdW50IHx8IHt9O1xuICAgICAgICB0aGlzLmFzc2lnbm1lbnRDb3VudFtwcm9wTmFtZV0gPSAodGhpcy5hc3NpZ25tZW50Q291bnRbcHJvcE5hbWVdIHx8IDApICsgMTtcblxuICAgICAgICBpZiAob3JpZ2luYWxEZXNjcmlwdG9yPy5zZXQpIHtcbiAgICAgICAgICBvcmlnaW5hbERlc2NyaXB0b3Iuc2V0LmJpbmQodGhpcykodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXNbcHJpdmF0ZVByb3BOYW1lXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH07XG4gIH07XG59XG4iXX0=