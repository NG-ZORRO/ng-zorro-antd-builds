/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive } from '@angular/core';
import { map, startWith, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/cdk/resize-observer";
export class NzOverflowRestDirective {
    constructor(nzResizeObserver, elementRef, cdr) {
        this.nzResizeObserver = nzResizeObserver;
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.restStyle = undefined;
        this.restWidth$ = this.nzResizeObserver.observe(this.elementRef.nativeElement).pipe(map(([item]) => item.target.offsetWidth), startWith(0), tap(width => (this.restWidth = width)));
        this.restWidth = 0;
    }
    setRestStyle(display, order) {
        const mergedHidden = !display;
        this.restStyle = {
            opacity: mergedHidden ? 0 : 1,
            height: mergedHidden ? 0 : undefined,
            overflowY: mergedHidden ? 'hidden' : undefined,
            order: order,
            pointerEvents: mergedHidden ? 'none' : undefined,
            position: mergedHidden ? 'absolute' : undefined
        };
        this.cdr.detectChanges();
    }
}
NzOverflowRestDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOverflowRestDirective, deps: [{ token: i1.NzResizeObserver }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
NzOverflowRestDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzOverflowRestDirective, selector: "[nzOverflowRest]", host: { properties: { "style": "restStyle" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOverflowRestDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzOverflowRest]',
                    host: {
                        '[style]': 'restStyle'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzResizeObserver }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmZsb3ctcmVzdC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2Nkay9vdmVyZmxvdy9vdmVyZmxvdy1yZXN0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQXFCLFNBQVMsRUFBYyxNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBVXJELE1BQU0sT0FBTyx1QkFBdUI7SUFRbEMsWUFDVSxnQkFBa0MsRUFDbEMsVUFBc0IsRUFDdEIsR0FBc0I7UUFGdEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBVmhDLGNBQVMsR0FBK0QsU0FBUyxDQUFDO1FBQ2xGLGVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUM1RSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBRSxJQUFJLENBQUMsTUFBc0IsQ0FBQyxXQUFXLENBQUMsRUFDekQsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUNaLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUN2QyxDQUFDO1FBQ0YsY0FBUyxHQUFHLENBQUMsQ0FBQztJQUtYLENBQUM7SUFFSixZQUFZLENBQUMsT0FBZ0IsRUFBRSxLQUFhO1FBQzFDLE1BQU0sWUFBWSxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUc7WUFDZixPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO1lBQ3BDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUztZQUM5QyxLQUFLLEVBQUUsS0FBSztZQUNaLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUztZQUNoRCxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVM7U0FDaEQsQ0FBQztRQUNGLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7b0hBekJVLHVCQUF1Qjt3R0FBdkIsdUJBQXVCOzJGQUF2Qix1QkFBdUI7a0JBTm5DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsSUFBSSxFQUFFO3dCQUNKLFNBQVMsRUFBRSxXQUFXO3FCQUN2QjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1hcCwgc3RhcnRXaXRoLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE56UmVzaXplT2JzZXJ2ZXIgfSBmcm9tICduZy16b3Jyby1hbnRkL2Nkay9yZXNpemUtb2JzZXJ2ZXInO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbnpPdmVyZmxvd1Jlc3RdJyxcbiAgaG9zdDoge1xuICAgICdbc3R5bGVdJzogJ3Jlc3RTdHlsZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOek92ZXJmbG93UmVzdERpcmVjdGl2ZSB7XG4gIHJlc3RTdHlsZTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQgfSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgcmVzdFdpZHRoJCA9IHRoaXMubnpSZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5waXBlKFxuICAgIG1hcCgoW2l0ZW1dKSA9PiAoaXRlbS50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLm9mZnNldFdpZHRoKSxcbiAgICBzdGFydFdpdGgoMCksXG4gICAgdGFwKHdpZHRoID0+ICh0aGlzLnJlc3RXaWR0aCA9IHdpZHRoKSlcbiAgKTtcbiAgcmVzdFdpZHRoID0gMDtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuelJlc2l6ZU9ic2VydmVyOiBOelJlc2l6ZU9ic2VydmVyLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuXG4gIHNldFJlc3RTdHlsZShkaXNwbGF5OiBib29sZWFuLCBvcmRlcjogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbWVyZ2VkSGlkZGVuID0gIWRpc3BsYXk7XG4gICAgdGhpcy5yZXN0U3R5bGUgPSB7XG4gICAgICBvcGFjaXR5OiBtZXJnZWRIaWRkZW4gPyAwIDogMSxcbiAgICAgIGhlaWdodDogbWVyZ2VkSGlkZGVuID8gMCA6IHVuZGVmaW5lZCxcbiAgICAgIG92ZXJmbG93WTogbWVyZ2VkSGlkZGVuID8gJ2hpZGRlbicgOiB1bmRlZmluZWQsXG4gICAgICBvcmRlcjogb3JkZXIsXG4gICAgICBwb2ludGVyRXZlbnRzOiBtZXJnZWRIaWRkZW4gPyAnbm9uZScgOiB1bmRlZmluZWQsXG4gICAgICBwb3NpdGlvbjogbWVyZ2VkSGlkZGVuID8gJ2Fic29sdXRlJyA6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG59XG4iXX0=