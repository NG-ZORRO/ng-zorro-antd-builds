/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { NgModule } from '@angular/core';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import * as i0 from "@angular/core";
const antDesignIcons = AllIcons;
const icons = Object.keys(antDesignIcons).map(key => {
    const i = antDesignIcons[key];
    return i;
});
/**
 * Include this module in every testing spec, except `icon.spec.ts`.
 */
// @dynamic
export class NzIconTestModule {
}
NzIconTestModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzIconTestModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzIconTestModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzIconTestModule, exports: [NzIconModule] });
NzIconTestModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzIconTestModule, providers: [
        {
            provide: NZ_ICONS,
            useValue: icons
        }
    ], imports: [NzIconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzIconTestModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [NzIconModule],
                    providers: [
                        {
                            provide: NZ_ICONS,
                            useValue: icons
                        }
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotaWNvbi10ZXN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvaWNvbi90ZXN0aW5nL256LWljb24tdGVzdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd6QyxPQUFPLEtBQUssUUFBUSxNQUFNLGlDQUFpQyxDQUFDO0FBRTVELE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBRTVELE1BQU0sY0FBYyxHQUFHLFFBRXRCLENBQUM7QUFFRixNQUFNLEtBQUssR0FBcUIsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7SUFDcEUsTUFBTSxDQUFDLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxDQUFDLENBQUM7QUFFSDs7R0FFRztBQUNILFdBQVc7QUFVWCxNQUFNLE9BQU8sZ0JBQWdCOzs2R0FBaEIsZ0JBQWdCOzhHQUFoQixnQkFBZ0IsWUFSakIsWUFBWTs4R0FRWCxnQkFBZ0IsYUFQaEI7UUFDVDtZQUNFLE9BQU8sRUFBRSxRQUFRO1lBQ2pCLFFBQVEsRUFBRSxLQUFLO1NBQ2hCO0tBQ0YsWUFOUyxZQUFZOzJGQVFYLGdCQUFnQjtrQkFUNUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsUUFBUTs0QkFDakIsUUFBUSxFQUFFLEtBQUs7eUJBQ2hCO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSWNvbkRlZmluaXRpb24gfSBmcm9tICdAYW50LWRlc2lnbi9pY29ucy1hbmd1bGFyJztcbmltcG9ydCAqIGFzIEFsbEljb25zIGZyb20gJ0BhbnQtZGVzaWduL2ljb25zLWFuZ3VsYXIvaWNvbnMnO1xuXG5pbXBvcnQgeyBOekljb25Nb2R1bGUsIE5aX0lDT05TIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcblxuY29uc3QgYW50RGVzaWduSWNvbnMgPSBBbGxJY29ucyBhcyB7XG4gIFtrZXk6IHN0cmluZ106IEljb25EZWZpbml0aW9uO1xufTtcblxuY29uc3QgaWNvbnM6IEljb25EZWZpbml0aW9uW10gPSBPYmplY3Qua2V5cyhhbnREZXNpZ25JY29ucykubWFwKGtleSA9PiB7XG4gIGNvbnN0IGkgPSBhbnREZXNpZ25JY29uc1trZXldO1xuICByZXR1cm4gaTtcbn0pO1xuXG4vKipcbiAqIEluY2x1ZGUgdGhpcyBtb2R1bGUgaW4gZXZlcnkgdGVzdGluZyBzcGVjLCBleGNlcHQgYGljb24uc3BlYy50c2AuXG4gKi9cbi8vIEBkeW5hbWljXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbTnpJY29uTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTlpfSUNPTlMsXG4gICAgICB1c2VWYWx1ZTogaWNvbnNcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTnpJY29uVGVzdE1vZHVsZSB7fVxuIl19