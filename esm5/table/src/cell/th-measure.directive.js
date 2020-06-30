/**
 * @fileoverview added by tsickle
 * Generated from: src/cell/th-measure.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { isNil } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
var NzThMeasureDirective = /** @class */ (function () {
    function NzThMeasureDirective(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.changes$ = new Subject();
        this.nzWidth = null;
        this.colspan = null;
        this.rowspan = null;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    NzThMeasureDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var nzWidth = changes.nzWidth, colspan = changes.colspan, rowspan = changes.rowspan;
        if (colspan) {
            if (!isNil(this.colspan)) {
                this.renderer.setAttribute(this.elementRef.nativeElement, 'colspan', "" + this.colspan);
            }
            else {
                this.renderer.removeAttribute(this.elementRef.nativeElement, 'colspan');
            }
        }
        if (rowspan) {
            if (!isNil(this.rowspan)) {
                this.renderer.setAttribute(this.elementRef.nativeElement, 'rowspan', "" + this.rowspan);
            }
            else {
                this.renderer.removeAttribute(this.elementRef.nativeElement, 'rowspan');
            }
        }
        if (nzWidth || colspan) {
            this.changes$.next();
        }
    };
    NzThMeasureDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'th'
                },] }
    ];
    /** @nocollapse */
    NzThMeasureDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    NzThMeasureDirective.propDecorators = {
        nzWidth: [{ type: Input }],
        colspan: [{ type: Input }],
        rowspan: [{ type: Input }]
    };
    return NzThMeasureDirective;
}());
export { NzThMeasureDirective };
if (false) {
    /** @type {?} */
    NzThMeasureDirective.prototype.changes$;
    /** @type {?} */
    NzThMeasureDirective.prototype.nzWidth;
    /** @type {?} */
    NzThMeasureDirective.prototype.colspan;
    /** @type {?} */
    NzThMeasureDirective.prototype.rowspan;
    /**
     * @type {?}
     * @private
     */
    NzThMeasureDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    NzThMeasureDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGgtbWVhc3VyZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkL3RhYmxlLyIsInNvdXJjZXMiOlsic3JjL2NlbGwvdGgtbWVhc3VyZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBSUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDbEcsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0I7SUFRRSw4QkFBb0IsUUFBbUIsRUFBVSxVQUFzQjtRQUFuRCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUp2RSxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNoQixZQUFPLEdBQWtCLElBQUksQ0FBQztRQUM5QixZQUFPLEdBQTJCLElBQUksQ0FBQztRQUN2QyxZQUFPLEdBQTJCLElBQUksQ0FBQztJQUMwQixDQUFDOzs7OztJQUMzRSwwQ0FBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFDeEIsSUFBQSx5QkFBTyxFQUFFLHlCQUFPLEVBQUUseUJBQU87UUFDakMsSUFBSSxPQUFPLEVBQUU7WUFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLEtBQUcsSUFBSSxDQUFDLE9BQVMsQ0FBQyxDQUFDO2FBQ3pGO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3pFO1NBQ0Y7UUFDRCxJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsS0FBRyxJQUFJLENBQUMsT0FBUyxDQUFDLENBQUM7YUFDekY7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDekU7U0FDRjtRQUNELElBQUksT0FBTyxJQUFJLE9BQU8sRUFBRTtZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQzs7Z0JBNUJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsSUFBSTtpQkFDZjs7OztnQkFOaUQsU0FBUztnQkFBdkMsVUFBVTs7OzBCQVMzQixLQUFLOzBCQUNMLEtBQUs7MEJBQ0wsS0FBSzs7SUFzQlIsMkJBQUM7Q0FBQSxBQTdCRCxJQTZCQztTQTFCWSxvQkFBb0I7OztJQUMvQix3Q0FBeUI7O0lBQ3pCLHVDQUF1Qzs7SUFDdkMsdUNBQWdEOztJQUNoRCx1Q0FBZ0Q7Ozs7O0lBQ3BDLHdDQUEyQjs7Ozs7SUFBRSwwQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBSZW5kZXJlcjIsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzTmlsIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0aCdcbn0pXG5leHBvcnQgY2xhc3MgTnpUaE1lYXN1cmVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBjaGFuZ2VzJCA9IG5ldyBTdWJqZWN0KCk7XG4gIEBJbnB1dCgpIG56V2lkdGg6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBjb2xzcGFuOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcm93c3Bhbjogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBueldpZHRoLCBjb2xzcGFuLCByb3dzcGFuIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChjb2xzcGFuKSB7XG4gICAgICBpZiAoIWlzTmlsKHRoaXMuY29sc3BhbikpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdjb2xzcGFuJywgYCR7dGhpcy5jb2xzcGFufWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdjb2xzcGFuJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChyb3dzcGFuKSB7XG4gICAgICBpZiAoIWlzTmlsKHRoaXMucm93c3BhbikpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdyb3dzcGFuJywgYCR7dGhpcy5yb3dzcGFufWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdyb3dzcGFuJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChueldpZHRoIHx8IGNvbHNwYW4pIHtcbiAgICAgIHRoaXMuY2hhbmdlcyQubmV4dCgpO1xuICAgIH1cbiAgfVxufVxuIl19