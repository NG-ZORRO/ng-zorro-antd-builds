/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/cdk/resize-observer";
export class NzOverflowSuffixDirective {
    constructor(nzResizeObserver, elementRef, cdr) {
        this.nzResizeObserver = nzResizeObserver;
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.suffixStyle = {};
        this.suffixWidth$ = this.nzResizeObserver.observe(this.elementRef.nativeElement).pipe(map(([item]) => item.target.offsetWidth), tap(width => (this.suffixWidth = width)));
        this.suffixWidth = 0;
    }
    setSuffixStyle(start, order) {
        if (start !== null) {
            this.suffixStyle = {
                position: 'absolute',
                left: `${start}px`,
                top: 0,
                opacity: 1,
                order: order
            };
        }
        else {
            this.suffixStyle = {
                opacity: 1,
                order: order
            };
        }
        this.cdr.detectChanges();
    }
}
NzOverflowSuffixDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOverflowSuffixDirective, deps: [{ token: i1.NzResizeObserver }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
NzOverflowSuffixDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzOverflowSuffixDirective, selector: "[nzOverflowSuffix]", host: { properties: { "style": "suffixStyle" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzOverflowSuffixDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzOverflowSuffix]',
                    host: {
                        '[style]': 'suffixStyle'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzResizeObserver }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmZsb3ctc3VmZml4LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY2RrL292ZXJmbG93L292ZXJmbG93LXN1ZmZpeC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFxQixTQUFTLEVBQWMsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBVTFDLE1BQU0sT0FBTyx5QkFBeUI7SUFPcEMsWUFDVSxnQkFBa0MsRUFDbEMsVUFBc0IsRUFDdEIsR0FBc0I7UUFGdEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBVGhDLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGlCQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FDOUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUUsSUFBSSxDQUFDLE1BQXNCLENBQUMsV0FBVyxDQUFDLEVBQ3pELEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUN6QyxDQUFDO1FBQ0YsZ0JBQVcsR0FBRyxDQUFDLENBQUM7SUFLYixDQUFDO0lBRUosY0FBYyxDQUFDLEtBQW9CLEVBQUUsS0FBYTtRQUNoRCxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRztnQkFDakIsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLElBQUksRUFBRSxHQUFHLEtBQUssSUFBSTtnQkFDbEIsR0FBRyxFQUFFLENBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUM7Z0JBQ1YsS0FBSyxFQUFFLEtBQUs7YUFDYixDQUFDO1NBQ0g7YUFBTTtZQUNMLElBQUksQ0FBQyxXQUFXLEdBQUc7Z0JBQ2pCLE9BQU8sRUFBRSxDQUFDO2dCQUNWLEtBQUssRUFBRSxLQUFLO2FBQ2IsQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDOztzSEE3QlUseUJBQXlCOzBHQUF6Qix5QkFBeUI7MkZBQXpCLHlCQUF5QjtrQkFOckMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixJQUFJLEVBQUU7d0JBQ0osU0FBUyxFQUFFLGFBQWE7cUJBQ3pCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE56UmVzaXplT2JzZXJ2ZXIgfSBmcm9tICduZy16b3Jyby1hbnRkL2Nkay9yZXNpemUtb2JzZXJ2ZXInO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbnpPdmVyZmxvd1N1ZmZpeF0nLFxuICBob3N0OiB7XG4gICAgJ1tzdHlsZV0nOiAnc3VmZml4U3R5bGUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpPdmVyZmxvd1N1ZmZpeERpcmVjdGl2ZSB7XG4gIHN1ZmZpeFN0eWxlID0ge307XG4gIHN1ZmZpeFdpZHRoJCA9IHRoaXMubnpSZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5waXBlKFxuICAgIG1hcCgoW2l0ZW1dKSA9PiAoaXRlbS50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLm9mZnNldFdpZHRoKSxcbiAgICB0YXAod2lkdGggPT4gKHRoaXMuc3VmZml4V2lkdGggPSB3aWR0aCkpXG4gICk7XG4gIHN1ZmZpeFdpZHRoID0gMDtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuelJlc2l6ZU9ic2VydmVyOiBOelJlc2l6ZU9ic2VydmVyLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuXG4gIHNldFN1ZmZpeFN0eWxlKHN0YXJ0OiBudW1iZXIgfCBudWxsLCBvcmRlcjogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHN0YXJ0ICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnN1ZmZpeFN0eWxlID0ge1xuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgbGVmdDogYCR7c3RhcnR9cHhgLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIG9yZGVyOiBvcmRlclxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdWZmaXhTdHlsZSA9IHtcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgb3JkZXI6IG9yZGVyXG4gICAgICB9O1xuICAgIH1cbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cbn1cbiJdfQ==