/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class NzEllipsisPipe {
    transform(value, length, suffix = '') {
        if (typeof value !== 'string') {
            return value;
        }
        const len = typeof length === 'undefined' ? value.length : length;
        if (value.length <= len) {
            return value;
        }
        return value.substring(0, len) + suffix;
    }
}
NzEllipsisPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzEllipsisPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
NzEllipsisPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzEllipsisPipe, name: "nzEllipsis" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzEllipsisPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'nzEllipsis'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotZWxsaXBzaXMucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvcGlwZXMvbnotZWxsaXBzaXMucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFPcEQsTUFBTSxPQUFPLGNBQWM7SUFDekIsU0FBUyxDQUFDLEtBQWdCLEVBQUUsTUFBZSxFQUFFLFNBQWlCLEVBQUU7UUFDOUQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE1BQU0sR0FBRyxHQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBRWxFLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUU7WUFDdkIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDO0lBQzFDLENBQUM7OzJHQWJVLGNBQWM7eUdBQWQsY0FBYzsyRkFBZCxjQUFjO2tCQUgxQixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxZQUFZO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuQFBpcGUoe1xuICBuYW1lOiAnbnpFbGxpcHNpcydcbn0pXG5leHBvcnQgY2xhc3MgTnpFbGxpcHNpc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlOiBOelNhZmVBbnksIGxlbmd0aD86IG51bWJlciwgc3VmZml4OiBzdHJpbmcgPSAnJyk6IE56U2FmZUFueSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBsZW4gPSB0eXBlb2YgbGVuZ3RoID09PSAndW5kZWZpbmVkJyA/IHZhbHVlLmxlbmd0aCA6IGxlbmd0aDtcblxuICAgIGlmICh2YWx1ZS5sZW5ndGggPD0gbGVuKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlLnN1YnN0cmluZygwLCBsZW4pICsgc3VmZml4O1xuICB9XG59XG4iXX0=