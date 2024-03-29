/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Input } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class NzCellFixedDirective {
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.nzRight = false;
        this.nzLeft = false;
        this.colspan = null;
        this.colSpan = null;
        this.changes$ = new Subject();
        this.isAutoLeft = false;
        this.isAutoRight = false;
        this.isFixedLeft = false;
        this.isFixedRight = false;
        this.isFixed = false;
    }
    setAutoLeftWidth(autoLeft) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'left', autoLeft);
    }
    setAutoRightWidth(autoRight) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'right', autoRight);
    }
    setIsFirstRight(isFirstRight) {
        this.setFixClass(isFirstRight, 'ant-table-cell-fix-right-first');
    }
    setIsLastLeft(isLastLeft) {
        this.setFixClass(isLastLeft, 'ant-table-cell-fix-left-last');
    }
    setFixClass(flag, className) {
        // the setFixClass function may call many times, so remove it first.
        this.renderer.removeClass(this.elementRef.nativeElement, className);
        if (flag) {
            this.renderer.addClass(this.elementRef.nativeElement, className);
        }
    }
    ngOnChanges() {
        this.setIsFirstRight(false);
        this.setIsLastLeft(false);
        this.isAutoLeft = this.nzLeft === '' || this.nzLeft === true;
        this.isAutoRight = this.nzRight === '' || this.nzRight === true;
        this.isFixedLeft = this.nzLeft !== false;
        this.isFixedRight = this.nzRight !== false;
        this.isFixed = this.isFixedLeft || this.isFixedRight;
        const validatePx = (value) => {
            if (typeof value === 'string' && value !== '') {
                return value;
            }
            else {
                return null;
            }
        };
        this.setAutoLeftWidth(validatePx(this.nzLeft));
        this.setAutoRightWidth(validatePx(this.nzRight));
        this.changes$.next();
    }
}
NzCellFixedDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCellFixedDirective, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NzCellFixedDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzCellFixedDirective, selector: "td[nzRight],th[nzRight],td[nzLeft],th[nzLeft]", inputs: { nzRight: "nzRight", nzLeft: "nzLeft", colspan: "colspan", colSpan: "colSpan" }, host: { properties: { "class.ant-table-cell-fix-right": "isFixedRight", "class.ant-table-cell-fix-left": "isFixedLeft", "style.position": "isFixed? 'sticky' : null" } }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCellFixedDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'td[nzRight],th[nzRight],td[nzLeft],th[nzLeft]',
                    host: {
                        '[class.ant-table-cell-fix-right]': `isFixedRight`,
                        '[class.ant-table-cell-fix-left]': `isFixedLeft`,
                        '[style.position]': `isFixed? 'sticky' : null`
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }]; }, propDecorators: { nzRight: [{
                type: Input
            }], nzLeft: [{
                type: Input
            }], colspan: [{
                type: Input
            }], colSpan: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1maXhlZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb21wb25lbnRzL3RhYmxlL3NyYy9jZWxsL2NlbGwtZml4ZWQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQWMsS0FBSyxFQUF3QixNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQVUvQixNQUFNLE9BQU8sb0JBQW9CO0lBcUMvQixZQUFvQixRQUFtQixFQUFVLFVBQXNCO1FBQW5ELGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBcEM5RCxZQUFPLEdBQXFCLEtBQUssQ0FBQztRQUNsQyxXQUFNLEdBQXFCLEtBQUssQ0FBQztRQUNqQyxZQUFPLEdBQWtCLElBQUksQ0FBQztRQUM5QixZQUFPLEdBQWtCLElBQUksQ0FBQztRQUN2QyxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUMvQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLFlBQU8sR0FBRyxLQUFLLENBQUM7SUEyQjBELENBQUM7SUF6QjNFLGdCQUFnQixDQUFDLFFBQXVCO1FBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsaUJBQWlCLENBQUMsU0FBd0I7UUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFRCxlQUFlLENBQUMsWUFBcUI7UUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsYUFBYSxDQUFDLFVBQW1CO1FBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLDhCQUE4QixDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVPLFdBQVcsQ0FBQyxJQUFhLEVBQUUsU0FBaUI7UUFDbEQsb0VBQW9FO1FBQ3BFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXBFLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDbEU7SUFDSCxDQUFDO0lBSUQsV0FBVztRQUNULElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDO1FBQzdELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUM7UUFDaEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQztRQUN6QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxDQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3JELE1BQU0sVUFBVSxHQUFHLENBQUMsS0FBdUIsRUFBaUIsRUFBRTtZQUM1RCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO2dCQUM3QyxPQUFPLEtBQUssQ0FBQzthQUNkO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDO2FBQ2I7UUFDSCxDQUFDLENBQUM7UUFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDOztpSEF6RFUsb0JBQW9CO3FHQUFwQixvQkFBb0I7MkZBQXBCLG9CQUFvQjtrQkFSaEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsK0NBQStDO29CQUN6RCxJQUFJLEVBQUU7d0JBQ0osa0NBQWtDLEVBQUUsY0FBYzt3QkFDbEQsaUNBQWlDLEVBQUUsYUFBYTt3QkFDaEQsa0JBQWtCLEVBQUUsMEJBQTBCO3FCQUMvQztpQkFDRjt5SEFFVSxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkNoYW5nZXMsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0ZFtuelJpZ2h0XSx0aFtuelJpZ2h0XSx0ZFtuekxlZnRdLHRoW256TGVmdF0nLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtdGFibGUtY2VsbC1maXgtcmlnaHRdJzogYGlzRml4ZWRSaWdodGAsXG4gICAgJ1tjbGFzcy5hbnQtdGFibGUtY2VsbC1maXgtbGVmdF0nOiBgaXNGaXhlZExlZnRgLFxuICAgICdbc3R5bGUucG9zaXRpb25dJzogYGlzRml4ZWQ/ICdzdGlja3knIDogbnVsbGBcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekNlbGxGaXhlZERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIG56UmlnaHQ6IHN0cmluZyB8IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgbnpMZWZ0OiBzdHJpbmcgfCBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGNvbHNwYW46IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBjb2xTcGFuOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgY2hhbmdlcyQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBpc0F1dG9MZWZ0ID0gZmFsc2U7XG4gIGlzQXV0b1JpZ2h0ID0gZmFsc2U7XG4gIGlzRml4ZWRMZWZ0ID0gZmFsc2U7XG4gIGlzRml4ZWRSaWdodCA9IGZhbHNlO1xuICBpc0ZpeGVkID0gZmFsc2U7XG5cbiAgc2V0QXV0b0xlZnRXaWR0aChhdXRvTGVmdDogc3RyaW5nIHwgbnVsbCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgYXV0b0xlZnQpO1xuICB9XG5cbiAgc2V0QXV0b1JpZ2h0V2lkdGgoYXV0b1JpZ2h0OiBzdHJpbmcgfCBudWxsKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3JpZ2h0JywgYXV0b1JpZ2h0KTtcbiAgfVxuXG4gIHNldElzRmlyc3RSaWdodChpc0ZpcnN0UmlnaHQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnNldEZpeENsYXNzKGlzRmlyc3RSaWdodCwgJ2FudC10YWJsZS1jZWxsLWZpeC1yaWdodC1maXJzdCcpO1xuICB9XG5cbiAgc2V0SXNMYXN0TGVmdChpc0xhc3RMZWZ0OiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5zZXRGaXhDbGFzcyhpc0xhc3RMZWZ0LCAnYW50LXRhYmxlLWNlbGwtZml4LWxlZnQtbGFzdCcpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRGaXhDbGFzcyhmbGFnOiBib29sZWFuLCBjbGFzc05hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIC8vIHRoZSBzZXRGaXhDbGFzcyBmdW5jdGlvbiBtYXkgY2FsbCBtYW55IHRpbWVzLCBzbyByZW1vdmUgaXQgZmlyc3QuXG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgY2xhc3NOYW1lKTtcblxuICAgIGlmIChmbGFnKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBjbGFzc05hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxuXG4gIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0SXNGaXJzdFJpZ2h0KGZhbHNlKTtcbiAgICB0aGlzLnNldElzTGFzdExlZnQoZmFsc2UpO1xuICAgIHRoaXMuaXNBdXRvTGVmdCA9IHRoaXMubnpMZWZ0ID09PSAnJyB8fCB0aGlzLm56TGVmdCA9PT0gdHJ1ZTtcbiAgICB0aGlzLmlzQXV0b1JpZ2h0ID0gdGhpcy5uelJpZ2h0ID09PSAnJyB8fCB0aGlzLm56UmlnaHQgPT09IHRydWU7XG4gICAgdGhpcy5pc0ZpeGVkTGVmdCA9IHRoaXMubnpMZWZ0ICE9PSBmYWxzZTtcbiAgICB0aGlzLmlzRml4ZWRSaWdodCA9IHRoaXMubnpSaWdodCAhPT0gZmFsc2U7XG4gICAgdGhpcy5pc0ZpeGVkID0gdGhpcy5pc0ZpeGVkTGVmdCB8fCB0aGlzLmlzRml4ZWRSaWdodDtcbiAgICBjb25zdCB2YWxpZGF0ZVB4ID0gKHZhbHVlOiBzdHJpbmcgfCBib29sZWFuKTogc3RyaW5nIHwgbnVsbCA9PiB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLnNldEF1dG9MZWZ0V2lkdGgodmFsaWRhdGVQeCh0aGlzLm56TGVmdCkpO1xuICAgIHRoaXMuc2V0QXV0b1JpZ2h0V2lkdGgodmFsaWRhdGVQeCh0aGlzLm56UmlnaHQpKTtcbiAgICB0aGlzLmNoYW5nZXMkLm5leHQoKTtcbiAgfVxufVxuIl19