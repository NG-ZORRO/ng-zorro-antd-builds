/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Optional } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../table-style.service";
export class NzTableCellDirective {
    constructor(nzTableStyleService) {
        this.isInsideTable = false;
        this.isInsideTable = !!nzTableStyleService;
    }
}
NzTableCellDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableCellDirective, deps: [{ token: i1.NzTableStyleService, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NzTableCellDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTableCellDirective, selector: "th:not(.nz-disable-th):not([mat-cell]), td:not(.nz-disable-td):not([mat-cell])", host: { properties: { "class.ant-table-cell": "isInsideTable" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableCellDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'th:not(.nz-disable-th):not([mat-cell]), td:not(.nz-disable-td):not([mat-cell])',
                    host: {
                        '[class.ant-table-cell]': 'isInsideTable'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzTableStyleService, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb21wb25lbnRzL3RhYmxlL3NyYy9jZWxsL2NlbGwuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFVcEQsTUFBTSxPQUFPLG9CQUFvQjtJQUUvQixZQUF3QixtQkFBd0M7UUFEaEUsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsbUJBQW1CLENBQUM7SUFDN0MsQ0FBQzs7aUhBSlUsb0JBQW9CO3FHQUFwQixvQkFBb0I7MkZBQXBCLG9CQUFvQjtrQkFOaEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0ZBQWdGO29CQUMxRixJQUFJLEVBQUU7d0JBQ0osd0JBQXdCLEVBQUUsZUFBZTtxQkFDMUM7aUJBQ0Y7OzBCQUdjLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56VGFibGVTdHlsZVNlcnZpY2UgfSBmcm9tICcuLi90YWJsZS1zdHlsZS5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGg6bm90KC5uei1kaXNhYmxlLXRoKTpub3QoW21hdC1jZWxsXSksIHRkOm5vdCgubnotZGlzYWJsZS10ZCk6bm90KFttYXQtY2VsbF0pJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LXRhYmxlLWNlbGxdJzogJ2lzSW5zaWRlVGFibGUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUYWJsZUNlbGxEaXJlY3RpdmUge1xuICBpc0luc2lkZVRhYmxlID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIG56VGFibGVTdHlsZVNlcnZpY2U6IE56VGFibGVTdHlsZVNlcnZpY2UpIHtcbiAgICB0aGlzLmlzSW5zaWRlVGFibGUgPSAhIW56VGFibGVTdHlsZVNlcnZpY2U7XG4gIH1cbn1cbiJdfQ==