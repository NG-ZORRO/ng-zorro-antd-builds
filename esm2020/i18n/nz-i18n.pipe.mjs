/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./nz-i18n.service";
export class NzI18nPipe {
    constructor(_locale) {
        this._locale = _locale;
    }
    transform(path, keyValue) {
        return this._locale.translate(path, keyValue);
    }
}
NzI18nPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzI18nPipe, deps: [{ token: i1.NzI18nService }], target: i0.ɵɵFactoryTarget.Pipe });
NzI18nPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzI18nPipe, name: "nzI18n" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzI18nPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'nzI18n'
                }]
        }], ctorParameters: function () { return [{ type: i1.NzI18nService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotaTE4bi5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9pMThuL256LWkxOG4ucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7O0FBT3BELE1BQU0sT0FBTyxVQUFVO0lBQ3JCLFlBQW9CLE9BQXNCO1FBQXRCLFlBQU8sR0FBUCxPQUFPLENBQWU7SUFBRyxDQUFDO0lBRTlDLFNBQVMsQ0FBQyxJQUFZLEVBQUUsUUFBaUI7UUFDdkMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7dUdBTFUsVUFBVTtxR0FBVixVQUFVOzJGQUFWLFVBQVU7a0JBSHRCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLFFBQVE7aUJBQ2YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56STE4blNlcnZpY2UgfSBmcm9tICcuL256LWkxOG4uc2VydmljZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ256STE4bidcbn0pXG5leHBvcnQgY2xhc3MgTnpJMThuUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9sb2NhbGU6IE56STE4blNlcnZpY2UpIHt9XG5cbiAgdHJhbnNmb3JtKHBhdGg6IHN0cmluZywga2V5VmFsdWU/OiBvYmplY3QpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9sb2NhbGUudHJhbnNsYXRlKHBhdGgsIGtleVZhbHVlKTtcbiAgfVxufVxuIl19