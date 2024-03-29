/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Optional } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./modal-ref";
export class NzModalFooterDirective {
    constructor(nzModalRef, templateRef) {
        this.nzModalRef = nzModalRef;
        this.templateRef = templateRef;
        if (this.nzModalRef) {
            this.nzModalRef.updateConfig({
                nzFooter: this.templateRef
            });
        }
    }
}
NzModalFooterDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzModalFooterDirective, deps: [{ token: i1.NzModalRef, optional: true }, { token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NzModalFooterDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzModalFooterDirective, selector: "[nzModalFooter]", exportAs: ["nzModalFooter"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzModalFooterDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzModalFooter]',
                    exportAs: 'nzModalFooter'
                }]
        }], ctorParameters: function () { return [{ type: i1.NzModalRef, decorators: [{
                    type: Optional
                }] }, { type: i0.TemplateRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtZm9vdGVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwtZm9vdGVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBZSxNQUFNLGVBQWUsQ0FBQzs7O0FBUWpFLE1BQU0sT0FBTyxzQkFBc0I7SUFDakMsWUFBZ0MsVUFBc0IsRUFBUyxXQUE0QjtRQUEzRCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBQ3pGLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztnQkFDM0IsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXO2FBQzNCLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7bUhBUFUsc0JBQXNCO3VHQUF0QixzQkFBc0I7MkZBQXRCLHNCQUFzQjtrQkFKbEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsZUFBZTtpQkFDMUI7OzBCQUVjLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIE9wdGlvbmFsLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOek1vZGFsUmVmIH0gZnJvbSAnLi9tb2RhbC1yZWYnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbnpNb2RhbEZvb3Rlcl0nLFxuICBleHBvcnRBczogJ256TW9kYWxGb290ZXInXG59KVxuZXhwb3J0IGNsYXNzIE56TW9kYWxGb290ZXJEaXJlY3RpdmUge1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBwcml2YXRlIG56TW9kYWxSZWY6IE56TW9kYWxSZWYsIHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8e30+KSB7XG4gICAgaWYgKHRoaXMubnpNb2RhbFJlZikge1xuICAgICAgdGhpcy5uek1vZGFsUmVmLnVwZGF0ZUNvbmZpZyh7XG4gICAgICAgIG56Rm9vdGVyOiB0aGlzLnRlbXBsYXRlUmVmXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==