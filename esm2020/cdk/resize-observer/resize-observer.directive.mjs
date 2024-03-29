import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "./resize-observer.service";
export class NzResizeObserverDirective {
    constructor(nzResizeObserver, elementRef) {
        this.nzResizeObserver = nzResizeObserver;
        this.elementRef = elementRef;
        this.nzResizeObserve = new EventEmitter();
        this.nzResizeObserverDisabled = false;
        this.currentSubscription = null;
    }
    subscribe() {
        this.unsubscribe();
        this.currentSubscription = this.nzResizeObserver.observe(this.elementRef).subscribe(this.nzResizeObserve);
    }
    unsubscribe() {
        this.currentSubscription?.unsubscribe();
    }
    ngAfterContentInit() {
        if (!this.currentSubscription && !this.nzResizeObserverDisabled) {
            this.subscribe();
        }
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    ngOnChanges(changes) {
        const { nzResizeObserve } = changes;
        if (nzResizeObserve) {
            if (this.nzResizeObserverDisabled) {
                this.unsubscribe();
            }
            else {
                this.subscribe();
            }
        }
    }
}
NzResizeObserverDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeObserverDirective, deps: [{ token: i1.NzResizeObserver }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NzResizeObserverDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzResizeObserverDirective, selector: "[nzResizeObserver]", inputs: { nzResizeObserverDisabled: "nzResizeObserverDisabled" }, outputs: { nzResizeObserve: "nzResizeObserve" }, usesOnChanges: true, ngImport: i0 });
__decorate([
    InputBoolean()
], NzResizeObserverDirective.prototype, "nzResizeObserverDisabled", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeObserverDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzResizeObserver]'
                }]
        }], ctorParameters: function () { return [{ type: i1.NzResizeObserver }, { type: i0.ElementRef }]; }, propDecorators: { nzResizeObserve: [{
                type: Output
            }], nzResizeObserverDisabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLW9ic2VydmVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY2RrL3Jlc2l6ZS1vYnNlcnZlci9yZXNpemUtb2JzZXJ2ZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBRUwsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUVQLE1BQU0sZUFBZSxDQUFDO0FBSXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7O0FBT3ZELE1BQU0sT0FBTyx5QkFBeUI7SUFlcEMsWUFBb0IsZ0JBQWtDLEVBQVUsVUFBbUM7UUFBL0UscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBYmhGLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQXlCLENBQUM7UUFDdEQsNkJBQXdCLEdBQUcsS0FBSyxDQUFDO1FBQ2xELHdCQUFtQixHQUF3QixJQUFJLENBQUM7SUFXOEMsQ0FBQztJQVQvRixTQUFTO1FBQ2YsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzVHLENBQUM7SUFFTyxXQUFXO1FBQ2pCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBSUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLElBQUksQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUU7WUFDL0QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxNQUFNLEVBQUUsZUFBZSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ3BDLElBQUksZUFBZSxFQUFFO1lBQ25CLElBQUksSUFBSSxDQUFDLHdCQUF3QixFQUFFO2dCQUNqQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDcEI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ2xCO1NBQ0Y7SUFDSCxDQUFDOztzSEFwQ1UseUJBQXlCOzBHQUF6Qix5QkFBeUI7QUFHWDtJQUFmLFlBQVksRUFBRTsyRUFBa0M7MkZBSC9DLHlCQUF5QjtrQkFIckMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2lCQUMvQjtnSUFHb0IsZUFBZTtzQkFBakMsTUFBTTtnQkFDa0Isd0JBQXdCO3NCQUFoRCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IE56UmVzaXplT2JzZXJ2ZXIgfSBmcm9tICcuL3Jlc2l6ZS1vYnNlcnZlci5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW256UmVzaXplT2JzZXJ2ZXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBOelJlc2l6ZU9ic2VydmVyRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpSZXNpemVPYnNlcnZlckRpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuelJlc2l6ZU9ic2VydmUgPSBuZXcgRXZlbnRFbWl0dGVyPFJlc2l6ZU9ic2VydmVyRW50cnlbXT4oKTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56UmVzaXplT2JzZXJ2ZXJEaXNhYmxlZCA9IGZhbHNlO1xuICBwcml2YXRlIGN1cnJlbnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgc3Vic2NyaWJlKCk6IHZvaWQge1xuICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmN1cnJlbnRTdWJzY3JpcHRpb24gPSB0aGlzLm56UmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsZW1lbnRSZWYpLnN1YnNjcmliZSh0aGlzLm56UmVzaXplT2JzZXJ2ZSk7XG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlKCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudFN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbnpSZXNpemVPYnNlcnZlcjogTnpSZXNpemVPYnNlcnZlciwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge31cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmN1cnJlbnRTdWJzY3JpcHRpb24gJiYgIXRoaXMubnpSZXNpemVPYnNlcnZlckRpc2FibGVkKSB7XG4gICAgICB0aGlzLnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56UmVzaXplT2JzZXJ2ZSB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpSZXNpemVPYnNlcnZlKSB7XG4gICAgICBpZiAodGhpcy5uelJlc2l6ZU9ic2VydmVyRGlzYWJsZWQpIHtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==