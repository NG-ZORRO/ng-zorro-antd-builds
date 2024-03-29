/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class NzMentionService {
    constructor() {
        this.triggerChange$ = new Subject();
    }
    triggerChanged() {
        return this.triggerChange$.asObservable();
    }
    registerTrigger(trigger) {
        if (this.trigger !== trigger) {
            this.trigger = trigger;
            this.triggerChange$.next(trigger);
        }
    }
    ngOnDestroy() {
        this.triggerChange$.complete();
    }
}
NzMentionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMentionService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NzMentionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMentionService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMentionService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9tZW50aW9uL21lbnRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBSzNDLE1BQU0sT0FBTyxnQkFBZ0I7SUFEN0I7UUFHVSxtQkFBYyxHQUFHLElBQUksT0FBTyxFQUE2QixDQUFDO0tBZ0JuRTtJQWRDLGNBQWM7UUFDWixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVELGVBQWUsQ0FBQyxPQUFrQztRQUNoRCxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFFO1lBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2pDLENBQUM7OzZHQWpCVSxnQkFBZ0I7aUhBQWhCLGdCQUFnQjsyRkFBaEIsZ0JBQWdCO2tCQUQ1QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE56TWVudGlvblRyaWdnZXJEaXJlY3RpdmUgfSBmcm9tICcuL21lbnRpb24tdHJpZ2dlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOek1lbnRpb25TZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSB0cmlnZ2VyPzogTnpNZW50aW9uVHJpZ2dlckRpcmVjdGl2ZTtcbiAgcHJpdmF0ZSB0cmlnZ2VyQ2hhbmdlJCA9IG5ldyBTdWJqZWN0PE56TWVudGlvblRyaWdnZXJEaXJlY3RpdmU+KCk7XG5cbiAgdHJpZ2dlckNoYW5nZWQoKTogT2JzZXJ2YWJsZTxOek1lbnRpb25UcmlnZ2VyRGlyZWN0aXZlPiB7XG4gICAgcmV0dXJuIHRoaXMudHJpZ2dlckNoYW5nZSQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICByZWdpc3RlclRyaWdnZXIodHJpZ2dlcjogTnpNZW50aW9uVHJpZ2dlckRpcmVjdGl2ZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRyaWdnZXIgIT09IHRyaWdnZXIpIHtcbiAgICAgIHRoaXMudHJpZ2dlciA9IHRyaWdnZXI7XG4gICAgICB0aGlzLnRyaWdnZXJDaGFuZ2UkLm5leHQodHJpZ2dlcik7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy50cmlnZ2VyQ2hhbmdlJC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=