/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Pipe } from '@angular/core';
import { isNil } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
export class NzSafeNullPipe {
    transform(value, replace = '') {
        if (isNil(value)) {
            return replace;
        }
        return value;
    }
}
NzSafeNullPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSafeNullPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
NzSafeNullPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSafeNullPipe, name: "nzSafeNull" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSafeNullPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'nzSafeNull'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotc2FmZS1udWxsLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3BpcGVzL256LXNhZmUtbnVsbC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFLaEQsTUFBTSxPQUFPLGNBQWM7SUFDekIsU0FBUyxDQUFJLEtBQVEsRUFBRSxVQUFrQixFQUFFO1FBQ3pDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hCLE9BQU8sT0FBTyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzsyR0FOVSxjQUFjO3lHQUFkLGNBQWM7MkZBQWQsY0FBYztrQkFIMUIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsWUFBWTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGlzTmlsIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICduelNhZmVOdWxsJ1xufSlcbmV4cG9ydCBjbGFzcyBOelNhZmVOdWxsUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm08VD4odmFsdWU6IFQsIHJlcGxhY2U6IHN0cmluZyA9ICcnKTogVCB8IHN0cmluZyB7XG4gICAgaWYgKGlzTmlsKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHJlcGxhY2U7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuIl19