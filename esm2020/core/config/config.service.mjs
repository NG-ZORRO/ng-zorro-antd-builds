/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Inject, Injectable, Optional } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';
import { NZ_CONFIG } from './config';
import * as i0 from "@angular/core";
const isDefined = function (value) {
    return value !== undefined;
};
export class NzConfigService {
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
export function WithConfig() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvcmUvY29uZmlnL2NvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJL0MsT0FBTyxFQUF5QixTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7O0FBRTVELE1BQU0sU0FBUyxHQUFHLFVBQVUsS0FBaUI7SUFDM0MsT0FBTyxLQUFLLEtBQUssU0FBUyxDQUFDO0FBQzdCLENBQUMsQ0FBQztBQUtGLE1BQU0sT0FBTyxlQUFlO0lBTTFCLFlBQTJDLGFBQXdCO1FBTDNELG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQWtCLENBQUM7UUFNckQsSUFBSSxDQUFDLE1BQU0sR0FBRyxhQUFhLElBQUksRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxxQkFBcUIsQ0FBd0IsYUFBZ0I7UUFDM0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxnQ0FBZ0MsQ0FBQyxhQUEwQjtRQUN6RCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUM3QixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssYUFBYSxDQUFDLEVBQ2hDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FDakIsQ0FBQztJQUNKLENBQUM7SUFFRCxHQUFHLENBQXdCLGFBQWdCLEVBQUUsS0FBa0I7UUFDN0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDO1FBQ3pFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzFDLENBQUM7OzRHQTVCVSxlQUFlLGtCQU1NLFNBQVM7Z0hBTjlCLGVBQWUsY0FGZCxNQUFNOzJGQUVQLGVBQWU7a0JBSDNCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFPYyxRQUFROzswQkFBSSxNQUFNOzJCQUFDLFNBQVM7O0FBeUIzQyxvQ0FBb0M7QUFFcEM7OztHQUdHO0FBQ0gsMkJBQTJCO0FBQzNCLE1BQU0sVUFBVSxVQUFVO0lBQ3hCLE9BQU8sU0FBUyxlQUFlLENBQzdCLE1BQWlCLEVBQ2pCLFFBQW1CLEVBQ25CLGtCQUErQztRQUUvQyxNQUFNLGVBQWUsR0FBRyw2QkFBNkIsUUFBUSxFQUFFLENBQUM7UUFFaEUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsZUFBZSxFQUFFO1lBQzdDLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsVUFBVSxFQUFFLEtBQUs7U0FDbEIsQ0FBQyxDQUFDO1FBRUgsT0FBTztZQUNMLEdBQUc7Z0JBQ0QsTUFBTSxhQUFhLEdBQUcsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDNUcsTUFBTSxjQUFjLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3pFLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQy9GLElBQUksY0FBYyxJQUFJLFNBQVMsQ0FBQyxhQUFhLENBQUMsRUFBRTtvQkFDOUMsT0FBTyxhQUFhLENBQUM7aUJBQ3RCO3FCQUFNO29CQUNMLE9BQU8sU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztpQkFDN0Q7WUFDSCxDQUFDO1lBQ0QsR0FBRyxDQUFDLEtBQVM7Z0JBQ1gsd0ZBQXdGO2dCQUN4RixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixJQUFJLEVBQUUsQ0FBQztnQkFDOUQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFdkYsSUFBSSxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7b0JBQzNCLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBTSxDQUFDLENBQUM7aUJBQzNDO3FCQUFNO29CQUNMLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxLQUFLLENBQUM7aUJBQy9CO1lBQ0gsQ0FBQztZQUNELFlBQVksRUFBRSxJQUFJO1lBQ2xCLFVBQVUsRUFBRSxJQUFJO1NBQ2pCLENBQUM7SUFDSixDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXBUbyB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgTnpDb25maWcsIE56Q29uZmlnS2V5LCBOWl9DT05GSUcgfSBmcm9tICcuL2NvbmZpZyc7XG5cbmNvbnN0IGlzRGVmaW5lZCA9IGZ1bmN0aW9uICh2YWx1ZT86IE56U2FmZUFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZDtcbn07XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE56Q29uZmlnU2VydmljZSB7XG4gIHByaXZhdGUgY29uZmlnVXBkYXRlZCQgPSBuZXcgU3ViamVjdDxrZXlvZiBOekNvbmZpZz4oKTtcblxuICAvKiogR2xvYmFsIGNvbmZpZyBob2xkaW5nIHByb3BlcnR5LiAqL1xuICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZzogTnpDb25maWc7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChOWl9DT05GSUcpIGRlZmF1bHRDb25maWc/OiBOekNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gZGVmYXVsdENvbmZpZyB8fCB7fTtcbiAgfVxuXG4gIGdldENvbmZpZygpOiBOekNvbmZpZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnO1xuICB9XG5cbiAgZ2V0Q29uZmlnRm9yQ29tcG9uZW50PFQgZXh0ZW5kcyBOekNvbmZpZ0tleT4oY29tcG9uZW50TmFtZTogVCk6IE56Q29uZmlnW1RdIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWdbY29tcG9uZW50TmFtZV07XG4gIH1cblxuICBnZXRDb25maWdDaGFuZ2VFdmVudEZvckNvbXBvbmVudChjb21wb25lbnROYW1lOiBOekNvbmZpZ0tleSk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ1VwZGF0ZWQkLnBpcGUoXG4gICAgICBmaWx0ZXIobiA9PiBuID09PSBjb21wb25lbnROYW1lKSxcbiAgICAgIG1hcFRvKHVuZGVmaW5lZClcbiAgICApO1xuICB9XG5cbiAgc2V0PFQgZXh0ZW5kcyBOekNvbmZpZ0tleT4oY29tcG9uZW50TmFtZTogVCwgdmFsdWU6IE56Q29uZmlnW1RdKTogdm9pZCB7XG4gICAgdGhpcy5jb25maWdbY29tcG9uZW50TmFtZV0gPSB7IC4uLnRoaXMuY29uZmlnW2NvbXBvbmVudE5hbWVdLCAuLi52YWx1ZSB9O1xuICAgIHRoaXMuY29uZmlnVXBkYXRlZCQubmV4dChjb21wb25lbnROYW1lKTtcbiAgfVxufVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cblxuLyoqXG4gKiBUaGlzIGRlY29yYXRvciBpcyB1c2VkIHRvIGRlY29yYXRlIHByb3BlcnRpZXMuIElmIGEgcHJvcGVydHkgaXMgZGVjb3JhdGVkLCBpdCB3b3VsZCB0cnkgdG8gbG9hZCBkZWZhdWx0IHZhbHVlIGZyb21cbiAqIGNvbmZpZy5cbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG5leHBvcnQgZnVuY3Rpb24gV2l0aENvbmZpZzxUPigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIENvbmZpZ0RlY29yYXRvcihcbiAgICB0YXJnZXQ6IE56U2FmZUFueSxcbiAgICBwcm9wTmFtZTogTnpTYWZlQW55LFxuICAgIG9yaWdpbmFsRGVzY3JpcHRvcj86IFR5cGVkUHJvcGVydHlEZXNjcmlwdG9yPFQ+XG4gICk6IE56U2FmZUFueSB7XG4gICAgY29uc3QgcHJpdmF0ZVByb3BOYW1lID0gYCQkX196b3Jyb0NvbmZpZ0RlY29yYXRvcl9fJHtwcm9wTmFtZX1gO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJpdmF0ZVByb3BOYW1lLCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZ2V0KCk6IFQgfCB1bmRlZmluZWQge1xuICAgICAgICBjb25zdCBvcmlnaW5hbFZhbHVlID0gb3JpZ2luYWxEZXNjcmlwdG9yPy5nZXQgPyBvcmlnaW5hbERlc2NyaXB0b3IuZ2V0LmJpbmQodGhpcykoKSA6IHRoaXNbcHJpdmF0ZVByb3BOYW1lXTtcbiAgICAgICAgY29uc3QgYXNzaWduZWRCeVVzZXIgPSAodGhpcy5wcm9wZXJ0eUFzc2lnbkNvdW50ZXI/Lltwcm9wTmFtZV0gfHwgMCkgPiAxO1xuICAgICAgICBjb25zdCBjb25maWdWYWx1ZSA9IHRoaXMubnpDb25maWdTZXJ2aWNlLmdldENvbmZpZ0ZvckNvbXBvbmVudCh0aGlzLl9uek1vZHVsZU5hbWUpPy5bcHJvcE5hbWVdO1xuICAgICAgICBpZiAoYXNzaWduZWRCeVVzZXIgJiYgaXNEZWZpbmVkKG9yaWdpbmFsVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIG9yaWdpbmFsVmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGlzRGVmaW5lZChjb25maWdWYWx1ZSkgPyBjb25maWdWYWx1ZSA6IG9yaWdpbmFsVmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXQodmFsdWU/OiBUKTogdm9pZCB7XG4gICAgICAgIC8vIElmIHRoZSB2YWx1ZSBpcyBhc3NpZ25lZCwgd2UgY29uc2lkZXIgdGhlIG5ld2x5IGFzc2lnbmVkIHZhbHVlIGFzICdhc3NpZ25lZCBieSB1c2VyJy5cbiAgICAgICAgdGhpcy5wcm9wZXJ0eUFzc2lnbkNvdW50ZXIgPSB0aGlzLnByb3BlcnR5QXNzaWduQ291bnRlciB8fCB7fTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0eUFzc2lnbkNvdW50ZXJbcHJvcE5hbWVdID0gKHRoaXMucHJvcGVydHlBc3NpZ25Db3VudGVyW3Byb3BOYW1lXSB8fCAwKSArIDE7XG5cbiAgICAgICAgaWYgKG9yaWdpbmFsRGVzY3JpcHRvcj8uc2V0KSB7XG4gICAgICAgICAgb3JpZ2luYWxEZXNjcmlwdG9yLnNldC5iaW5kKHRoaXMpKHZhbHVlISk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpc1twcml2YXRlUHJvcE5hbWVdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfTtcbiAgfTtcbn1cbiJdfQ==