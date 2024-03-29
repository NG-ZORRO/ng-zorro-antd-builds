/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive } from '@angular/core';
import { distinctUntilChanged, map, startWith, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/cdk/resize-observer";
export class NzOverflowItemDirective {
    constructor(nzResizeObserver, elementRef, cdr) {
        this.nzResizeObserver = nzResizeObserver;
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.overflowStyle = undefined;
        this.itemWidth$ = this.nzResizeObserver.observe(this.elementRef.nativeElement).pipe(map(([item]) => item.target.offsetWidth), distinctUntilChanged(), startWith(undefined), tap(width => {
            this.itemWidth = width;
        }));
        this.itemWidth = undefined;
    }
    setItemStyle(display, order) {
        const mergedHidden = !display;
        this.overflowStyle = {
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
NzOverflowItemDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOverflowItemDirective, deps: [{ token: i1.NzResizeObserver }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
NzOverflowItemDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzOverflowItemDirective, selector: "[nzOverflowItem]", host: { properties: { "style": "overflowStyle" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOverflowItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzOverflowItem]',
                    host: {
                        '[style]': 'overflowStyle'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzResizeObserver }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmZsb3ctaXRlbS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2Nkay9vdmVyZmxvdy9vdmVyZmxvdy1pdGVtLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQXFCLFNBQVMsRUFBYyxNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBVTNFLE1BQU0sT0FBTyx1QkFBdUI7SUFXbEMsWUFDVSxnQkFBa0MsRUFDbkMsVUFBc0IsRUFDckIsR0FBc0I7UUFGdEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNuQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3JCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBYmhDLGtCQUFhLEdBQStELFNBQVMsQ0FBQztRQUN0RixlQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FDNUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUUsSUFBSSxDQUFDLE1BQXNCLENBQUMsV0FBVyxDQUFDLEVBQ3pELG9CQUFvQixFQUFFLEVBQ3RCLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFDcEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ1YsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNGLGNBQVMsR0FBdUIsU0FBUyxDQUFDO0lBS3ZDLENBQUM7SUFFSixZQUFZLENBQUMsT0FBZ0IsRUFBRSxLQUFhO1FBQzFDLE1BQU0sWUFBWSxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUc7WUFDbkIsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztZQUNwQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVM7WUFDOUMsS0FBSyxFQUFFLEtBQUs7WUFDWixhQUFhLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVM7WUFDaEQsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTO1NBQ2hELENBQUM7UUFDRixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUM7O29IQTVCVSx1QkFBdUI7d0dBQXZCLHVCQUF1QjsyRkFBdkIsdUJBQXVCO2tCQU5uQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLElBQUksRUFBRTt3QkFDSixTQUFTLEVBQUUsZUFBZTtxQkFDM0I7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwLCBzdGFydFdpdGgsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpSZXNpemVPYnNlcnZlciB9IGZyb20gJ25nLXpvcnJvLWFudGQvY2RrL3Jlc2l6ZS1vYnNlcnZlcic7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuek92ZXJmbG93SXRlbV0nLFxuICBob3N0OiB7XG4gICAgJ1tzdHlsZV0nOiAnb3ZlcmZsb3dTdHlsZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOek92ZXJmbG93SXRlbURpcmVjdGl2ZSB7XG4gIG92ZXJmbG93U3R5bGU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkIH0gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIGl0ZW1XaWR0aCQgPSB0aGlzLm56UmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkucGlwZShcbiAgICBtYXAoKFtpdGVtXSkgPT4gKGl0ZW0udGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5vZmZzZXRXaWR0aCksXG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICBzdGFydFdpdGgodW5kZWZpbmVkKSxcbiAgICB0YXAod2lkdGggPT4ge1xuICAgICAgdGhpcy5pdGVtV2lkdGggPSB3aWR0aDtcbiAgICB9KVxuICApO1xuICBpdGVtV2lkdGg6IG51bWJlciB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuelJlc2l6ZU9ic2VydmVyOiBOelJlc2l6ZU9ic2VydmVyLFxuICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgc2V0SXRlbVN0eWxlKGRpc3BsYXk6IGJvb2xlYW4sIG9yZGVyOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBtZXJnZWRIaWRkZW4gPSAhZGlzcGxheTtcbiAgICB0aGlzLm92ZXJmbG93U3R5bGUgPSB7XG4gICAgICBvcGFjaXR5OiBtZXJnZWRIaWRkZW4gPyAwIDogMSxcbiAgICAgIGhlaWdodDogbWVyZ2VkSGlkZGVuID8gMCA6IHVuZGVmaW5lZCxcbiAgICAgIG92ZXJmbG93WTogbWVyZ2VkSGlkZGVuID8gJ2hpZGRlbicgOiB1bmRlZmluZWQsXG4gICAgICBvcmRlcjogb3JkZXIsXG4gICAgICBwb2ludGVyRXZlbnRzOiBtZXJnZWRIaWRkZW4gPyAnbm9uZScgOiB1bmRlZmluZWQsXG4gICAgICBwb3NpdGlvbjogbWVyZ2VkSGlkZGVuID8gJ2Fic29sdXRlJyA6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG59XG4iXX0=