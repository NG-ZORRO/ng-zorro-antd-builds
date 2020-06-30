/**
 * @fileoverview added by tsickle
 * Generated from: drawer.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __rest } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzDrawerComponent } from './drawer.component';
import { NzDrawerServiceModule } from './drawer.service.module';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "./drawer.service.module";
/**
 * @template R
 */
var /**
 * @template R
 */
DrawerBuilderForService = /** @class */ (function () {
    function DrawerBuilderForService(overlay, options) {
        var _this = this;
        this.overlay = overlay;
        this.options = options;
        this.unsubscribe$ = new Subject();
        /**
         * pick {\@link NzDrawerOptions.nzOnCancel} and omit this option
         */
        var _a = this.options, nzOnCancel = _a.nzOnCancel, componentOption = __rest(_a, ["nzOnCancel"]);
        this.overlayRef = this.overlay.create();
        this.drawerRef = this.overlayRef.attach(new ComponentPortal(NzDrawerComponent));
        this.updateOptions(componentOption);
        // Prevent repeatedly open drawer when tap focus element.
        (/** @type {?} */ (this.drawerRef)).instance.savePreviouslyFocusedElement();
        (/** @type {?} */ (this.drawerRef)).instance.nzOnViewInit.pipe(takeUntil(this.unsubscribe$)).subscribe((/**
         * @return {?}
         */
        function () {
            (/** @type {?} */ (_this.drawerRef)).instance.open();
        }));
        (/** @type {?} */ (this.drawerRef)).instance.nzOnClose.subscribe((/**
         * @return {?}
         */
        function () {
            if (nzOnCancel) {
                nzOnCancel().then((/**
                 * @param {?} canClose
                 * @return {?}
                 */
                function (canClose) {
                    if (canClose !== false) {
                        (/** @type {?} */ (_this.drawerRef)).instance.close();
                    }
                }));
            }
            else {
                (/** @type {?} */ (_this.drawerRef)).instance.close();
            }
        }));
        (/** @type {?} */ (this.drawerRef)).instance.afterClose.pipe(takeUntil(this.unsubscribe$)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.overlayRef.dispose();
            _this.drawerRef = null;
            _this.unsubscribe$.next();
            _this.unsubscribe$.complete();
        }));
    }
    /**
     * @return {?}
     */
    DrawerBuilderForService.prototype.getInstance = /**
     * @return {?}
     */
    function () {
        return (/** @type {?} */ (this.drawerRef)) && (/** @type {?} */ (this.drawerRef)).instance;
    };
    /**
     * @param {?} options
     * @return {?}
     */
    DrawerBuilderForService.prototype.updateOptions = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        Object.assign((/** @type {?} */ (this.drawerRef)).instance, options);
    };
    return DrawerBuilderForService;
}());
/**
 * @template R
 */
export { DrawerBuilderForService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DrawerBuilderForService.prototype.drawerRef;
    /**
     * @type {?}
     * @private
     */
    DrawerBuilderForService.prototype.overlayRef;
    /**
     * @type {?}
     * @private
     */
    DrawerBuilderForService.prototype.unsubscribe$;
    /**
     * @type {?}
     * @private
     */
    DrawerBuilderForService.prototype.overlay;
    /**
     * @type {?}
     * @private
     */
    DrawerBuilderForService.prototype.options;
}
var NzDrawerService = /** @class */ (function () {
    function NzDrawerService(overlay) {
        this.overlay = overlay;
    }
    /**
     * @template T, D, R
     * @param {?} options
     * @return {?}
     */
    NzDrawerService.prototype.create = /**
     * @template T, D, R
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return new DrawerBuilderForService(this.overlay, options).getInstance();
    };
    NzDrawerService.decorators = [
        { type: Injectable, args: [{ providedIn: NzDrawerServiceModule },] }
    ];
    /** @nocollapse */
    NzDrawerService.ctorParameters = function () { return [
        { type: Overlay }
    ]; };
    /** @nocollapse */ NzDrawerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NzDrawerService_Factory() { return new NzDrawerService(i0.ɵɵinject(i1.Overlay)); }, token: NzDrawerService, providedIn: i2.NzDrawerServiceModule });
    return NzDrawerService;
}());
export { NzDrawerService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NzDrawerService.prototype.overlay;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkL2RyYXdlci8iLCJzb3VyY2VzIjpbImRyYXdlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsT0FBTyxFQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBZ0IsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzNDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7O0FBRWhFOzs7O0lBS0UsaUNBQW9CLE9BQWdCLEVBQVUsT0FBd0I7UUFBdEUsaUJBNkJDO1FBN0JtQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFGOUQsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDOzs7O1lBSW5DLGlCQUFpRCxFQUEvQywwQkFBVSxFQUFFLDRDQUFrQjtRQUN0QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNwQyx5REFBeUQ7UUFDekQsbUJBQUEsSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO1FBQ3hELG1CQUFBLElBQUksQ0FBQyxTQUFTLEVBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsU0FBUzs7O1FBQUM7WUFDakYsbUJBQUEsS0FBSSxDQUFDLFNBQVMsRUFBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQyxDQUFDLEVBQUMsQ0FBQztRQUNILG1CQUFBLElBQUksQ0FBQyxTQUFTLEVBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVM7OztRQUFDO1lBQzNDLElBQUksVUFBVSxFQUFFO2dCQUNkLFVBQVUsRUFBRSxDQUFDLElBQUk7Ozs7Z0JBQUMsVUFBQSxRQUFRO29CQUN4QixJQUFJLFFBQVEsS0FBSyxLQUFLLEVBQUU7d0JBQ3RCLG1CQUFBLEtBQUksQ0FBQyxTQUFTLEVBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7cUJBQ2xDO2dCQUNILENBQUMsRUFBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsbUJBQUEsS0FBSSxDQUFDLFNBQVMsRUFBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNsQztRQUNILENBQUMsRUFBQyxDQUFDO1FBRUgsbUJBQUEsSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxTQUFTOzs7UUFBQztZQUMvRSxLQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzFCLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDekIsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMvQixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCw2Q0FBVzs7O0lBQVg7UUFDRSxPQUFPLG1CQUFBLElBQUksQ0FBQyxTQUFTLEVBQUMsSUFBSSxtQkFBQSxJQUFJLENBQUMsU0FBUyxFQUFDLENBQUMsUUFBUSxDQUFDO0lBQ3JELENBQUM7Ozs7O0lBRUQsK0NBQWE7Ozs7SUFBYixVQUFjLE9BQW1DO1FBQy9DLE1BQU0sQ0FBQyxNQUFNLENBQUMsbUJBQUEsSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBQ0gsOEJBQUM7QUFBRCxDQUFDLEFBM0NELElBMkNDOzs7Ozs7Ozs7O0lBMUNDLDRDQUEwRDs7Ozs7SUFDMUQsNkNBQStCOzs7OztJQUMvQiwrQ0FBMkM7Ozs7O0lBRS9CLDBDQUF3Qjs7Ozs7SUFBRSwwQ0FBZ0M7O0FBd0N4RTtJQUVFLHlCQUFvQixPQUFnQjtRQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO0lBQUcsQ0FBQzs7Ozs7O0lBRXhDLGdDQUFNOzs7OztJQUFOLFVBQW9ELE9BQXlEO1FBQzNHLE9BQU8sSUFBSSx1QkFBdUIsQ0FBSSxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzdFLENBQUM7O2dCQU5GLFVBQVUsU0FBQyxFQUFFLFVBQVUsRUFBRSxxQkFBcUIsRUFBRTs7OztnQkF4RHhDLE9BQU87OzswQkFMaEI7Q0FvRUMsQUFQRCxJQU9DO1NBTlksZUFBZTs7Ozs7O0lBQ2Qsa0NBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgT3ZlcmxheSwgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50UmVmLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTnpEcmF3ZXJPcHRpb25zLCBOekRyYXdlck9wdGlvbnNPZkNvbXBvbmVudCB9IGZyb20gJy4vZHJhd2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgTnpEcmF3ZXJSZWYgfSBmcm9tICcuL2RyYXdlci1yZWYnO1xuaW1wb3J0IHsgTnpEcmF3ZXJDb21wb25lbnQgfSBmcm9tICcuL2RyYXdlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpEcmF3ZXJTZXJ2aWNlTW9kdWxlIH0gZnJvbSAnLi9kcmF3ZXIuc2VydmljZS5tb2R1bGUnO1xuXG5leHBvcnQgY2xhc3MgRHJhd2VyQnVpbGRlckZvclNlcnZpY2U8Uj4ge1xuICBwcml2YXRlIGRyYXdlclJlZjogQ29tcG9uZW50UmVmPE56RHJhd2VyQ29tcG9uZW50PiB8IG51bGw7XG4gIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZjtcbiAgcHJpdmF0ZSB1bnN1YnNjcmliZSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSwgcHJpdmF0ZSBvcHRpb25zOiBOekRyYXdlck9wdGlvbnMpIHtcbiAgICAvKiogcGljayB7QGxpbmsgTnpEcmF3ZXJPcHRpb25zLm56T25DYW5jZWx9IGFuZCBvbWl0IHRoaXMgb3B0aW9uICovXG4gICAgY29uc3QgeyBuek9uQ2FuY2VsLCAuLi5jb21wb25lbnRPcHRpb24gfSA9IHRoaXMub3B0aW9ucztcbiAgICB0aGlzLm92ZXJsYXlSZWYgPSB0aGlzLm92ZXJsYXkuY3JlYXRlKCk7XG4gICAgdGhpcy5kcmF3ZXJSZWYgPSB0aGlzLm92ZXJsYXlSZWYuYXR0YWNoKG5ldyBDb21wb25lbnRQb3J0YWwoTnpEcmF3ZXJDb21wb25lbnQpKTtcbiAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoY29tcG9uZW50T3B0aW9uKTtcbiAgICAvLyBQcmV2ZW50IHJlcGVhdGVkbHkgb3BlbiBkcmF3ZXIgd2hlbiB0YXAgZm9jdXMgZWxlbWVudC5cbiAgICB0aGlzLmRyYXdlclJlZiEuaW5zdGFuY2Uuc2F2ZVByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCgpO1xuICAgIHRoaXMuZHJhd2VyUmVmIS5pbnN0YW5jZS5uek9uVmlld0luaXQucGlwZSh0YWtlVW50aWwodGhpcy51bnN1YnNjcmliZSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5kcmF3ZXJSZWYhLmluc3RhbmNlLm9wZW4oKTtcbiAgICB9KTtcbiAgICB0aGlzLmRyYXdlclJlZiEuaW5zdGFuY2UubnpPbkNsb3NlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAobnpPbkNhbmNlbCkge1xuICAgICAgICBuek9uQ2FuY2VsKCkudGhlbihjYW5DbG9zZSA9PiB7XG4gICAgICAgICAgaWYgKGNhbkNsb3NlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5kcmF3ZXJSZWYhLmluc3RhbmNlLmNsb3NlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZHJhd2VyUmVmIS5pbnN0YW5jZS5jbG9zZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5kcmF3ZXJSZWYhLmluc3RhbmNlLmFmdGVyQ2xvc2UucGlwZSh0YWtlVW50aWwodGhpcy51bnN1YnNjcmliZSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICAgIHRoaXMuZHJhd2VyUmVmID0gbnVsbDtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmUkLm5leHQoKTtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmUkLmNvbXBsZXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRJbnN0YW5jZSgpOiBOekRyYXdlclJlZjxSPiB7XG4gICAgcmV0dXJuIHRoaXMuZHJhd2VyUmVmISAmJiB0aGlzLmRyYXdlclJlZiEuaW5zdGFuY2U7XG4gIH1cblxuICB1cGRhdGVPcHRpb25zKG9wdGlvbnM6IE56RHJhd2VyT3B0aW9uc09mQ29tcG9uZW50KTogdm9pZCB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLmRyYXdlclJlZiEuaW5zdGFuY2UsIG9wdGlvbnMpO1xuICB9XG59XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogTnpEcmF3ZXJTZXJ2aWNlTW9kdWxlIH0pXG5leHBvcnQgY2xhc3MgTnpEcmF3ZXJTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5KSB7fVxuXG4gIGNyZWF0ZTxUID0gTnpTYWZlQW55LCBEID0gdW5kZWZpbmVkLCBSID0gTnpTYWZlQW55PihvcHRpb25zOiBOekRyYXdlck9wdGlvbnM8VCwgRCBleHRlbmRzIHVuZGVmaW5lZCA/IHt9IDogRD4pOiBOekRyYXdlclJlZjxSPiB7XG4gICAgcmV0dXJuIG5ldyBEcmF3ZXJCdWlsZGVyRm9yU2VydmljZTxSPih0aGlzLm92ZXJsYXksIG9wdGlvbnMpLmdldEluc3RhbmNlKCk7XG4gIH1cbn1cbiJdfQ==