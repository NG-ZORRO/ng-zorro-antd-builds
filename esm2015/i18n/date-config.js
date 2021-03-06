/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { InjectionToken } from '@angular/core';
export const NZ_DATE_CONFIG = new InjectionToken('date-config');
export const NZ_DATE_CONFIG_DEFAULT = {
    firstDayOfWeek: undefined
};
export function mergeDateConfig(config) {
    return Object.assign(Object.assign({}, NZ_DATE_CONFIG_DEFAULT), config);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2kxOG4vZGF0ZS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVEvQyxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQWUsYUFBYSxDQUFDLENBQUM7QUFFOUUsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQWlCO0lBQ2xELGNBQWMsRUFBRSxTQUFTO0NBQzFCLENBQUM7QUFFRixNQUFNLFVBQVUsZUFBZSxDQUFDLE1BQW9CO0lBQ2xELHVDQUFZLHNCQUFzQixHQUFLLE1BQU0sRUFBRztBQUNsRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFdlZWtEYXlJbmRleCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90aW1lJztcblxuZXhwb3J0IGludGVyZmFjZSBOekRhdGVDb25maWcge1xuICAvKiogQ3VzdG9taXplIHRoZSBmaXJzdCBkYXkgb2YgYSB3ZWVrICovXG4gIGZpcnN0RGF5T2ZXZWVrPzogV2Vla0RheUluZGV4O1xufVxuXG5leHBvcnQgY29uc3QgTlpfREFURV9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48TnpEYXRlQ29uZmlnPignZGF0ZS1jb25maWcnKTtcblxuZXhwb3J0IGNvbnN0IE5aX0RBVEVfQ09ORklHX0RFRkFVTFQ6IE56RGF0ZUNvbmZpZyA9IHtcbiAgZmlyc3REYXlPZldlZWs6IHVuZGVmaW5lZFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRGF0ZUNvbmZpZyhjb25maWc6IE56RGF0ZUNvbmZpZyk6IE56RGF0ZUNvbmZpZyB7XG4gIHJldHVybiB7IC4uLk5aX0RBVEVfQ09ORklHX0RFRkFVTFQsIC4uLmNvbmZpZyB9O1xufVxuIl19