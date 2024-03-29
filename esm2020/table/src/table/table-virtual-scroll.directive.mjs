/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive } from '@angular/core';
import * as i0 from "@angular/core";
export class NzTableVirtualScrollDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
}
NzTableVirtualScrollDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableVirtualScrollDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NzTableVirtualScrollDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTableVirtualScrollDirective, selector: "[nz-virtual-scroll]", exportAs: ["nzVirtualScroll"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableVirtualScrollDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-virtual-scroll]',
                    exportAs: 'nzVirtualScroll'
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtdmlydHVhbC1zY3JvbGwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50cy90YWJsZS9zcmMvdGFibGUvdGFibGUtdmlydHVhbC1zY3JvbGwuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQWUsTUFBTSxlQUFlLENBQUM7O0FBUXZELE1BQU0sT0FBTyw2QkFBNkI7SUFDeEMsWUFBbUIsV0FBeUQ7UUFBekQsZ0JBQVcsR0FBWCxXQUFXLENBQThDO0lBQUcsQ0FBQztJQUVoRixNQUFNLENBQUMsc0JBQXNCLENBQzNCLElBQXNDLEVBQ3RDLElBQWU7UUFFZixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7OzBIQVJVLDZCQUE2Qjs4R0FBN0IsNkJBQTZCOzJGQUE3Qiw2QkFBNkI7a0JBSnpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFLGlCQUFpQjtpQkFDNUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuei12aXJ0dWFsLXNjcm9sbF0nLFxuICBleHBvcnRBczogJ256VmlydHVhbFNjcm9sbCdcbn0pXG5leHBvcnQgY2xhc3MgTnpUYWJsZVZpcnR1YWxTY3JvbGxEaXJlY3RpdmU8VD4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBUOyBpbmRleDogbnVtYmVyIH0+KSB7fVxuXG4gIHN0YXRpYyBuZ1RlbXBsYXRlQ29udGV4dEd1YXJkPFQ+KFxuICAgIF9kaXI6IE56VGFibGVWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlPFQ+LFxuICAgIF9jdHg6IE56U2FmZUFueVxuICApOiBfY3R4IGlzIHsgJGltcGxpY2l0OiBUOyBpbmRleDogbnVtYmVyIH0ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iXX0=