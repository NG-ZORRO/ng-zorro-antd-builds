/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { EventEmitter, Injectable, NgZone } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Mock synchronous NgZone implementation that can be used
 * to flush out `onStable` subscriptions in tests.
 *
 * via: https://github.com/angular/angular/blob/master/packages/core/testing/src/ng_zone_mock.ts
 *
 * @docs-private
 */
export class MockNgZone extends NgZone {
    constructor() {
        super({ enableLongStackTrace: false });
        this.onStable = new EventEmitter(false);
    }
    run(fn) {
        return fn();
    }
    runOutsideAngular(fn) {
        return fn();
    }
    simulateZoneExit() {
        this.onStable.emit(null);
    }
}
MockNgZone.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: MockNgZone, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MockNgZone.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: MockNgZone });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: MockNgZone, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay1uZy16b25lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jb3JlL3Rlc3RpbmcvbW9jay1uZy16b25lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFJakU7Ozs7Ozs7R0FPRztBQUVILE1BQU0sT0FBTyxVQUFXLFNBQVEsTUFBTTtJQUdwQztRQUNFLEtBQUssQ0FBQyxFQUFFLG9CQUFvQixFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFIaEMsYUFBUSxHQUE0QixJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUlyRSxDQUFDO0lBRVEsR0FBRyxDQUFDLEVBQVk7UUFDdkIsT0FBTyxFQUFFLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFUSxpQkFBaUIsQ0FBQyxFQUFZO1FBQ3JDLE9BQU8sRUFBRSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7dUdBakJVLFVBQVU7MkdBQVYsVUFBVTsyRkFBVixVQUFVO2tCQUR0QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuLyoqXG4gKiBNb2NrIHN5bmNocm9ub3VzIE5nWm9uZSBpbXBsZW1lbnRhdGlvbiB0aGF0IGNhbiBiZSB1c2VkXG4gKiB0byBmbHVzaCBvdXQgYG9uU3RhYmxlYCBzdWJzY3JpcHRpb25zIGluIHRlc3RzLlxuICpcbiAqIHZpYTogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9ibG9iL21hc3Rlci9wYWNrYWdlcy9jb3JlL3Rlc3Rpbmcvc3JjL25nX3pvbmVfbW9jay50c1xuICpcbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vY2tOZ1pvbmUgZXh0ZW5kcyBOZ1pvbmUge1xuICBvdmVycmlkZSBvblN0YWJsZTogRXZlbnRFbWl0dGVyPE56U2FmZUFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcih7IGVuYWJsZUxvbmdTdGFja1RyYWNlOiBmYWxzZSB9KTtcbiAgfVxuXG4gIG92ZXJyaWRlIHJ1bihmbjogRnVuY3Rpb24pOiBOelNhZmVBbnkge1xuICAgIHJldHVybiBmbigpO1xuICB9XG5cbiAgb3ZlcnJpZGUgcnVuT3V0c2lkZUFuZ3VsYXIoZm46IEZ1bmN0aW9uKTogTnpTYWZlQW55IHtcbiAgICByZXR1cm4gZm4oKTtcbiAgfVxuXG4gIHNpbXVsYXRlWm9uZUV4aXQoKTogdm9pZCB7XG4gICAgdGhpcy5vblN0YWJsZS5lbWl0KG51bGwpO1xuICB9XG59XG4iXX0=