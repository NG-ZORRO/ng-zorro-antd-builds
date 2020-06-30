/**
 * @fileoverview added by tsickle
 * Generated from: timeline.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ReplaySubject } from 'rxjs';
var TimelineService = /** @class */ (function () {
    function TimelineService() {
        this.check$ = new ReplaySubject(1);
    }
    /**
     * @return {?}
     */
    TimelineService.prototype.markForCheck = /**
     * @return {?}
     */
    function () {
        this.check$.next();
    };
    return TimelineService;
}());
export { TimelineService };
if (false) {
    /** @type {?} */
    TimelineService.prototype.check$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvdGltZWxpbmUvIiwic291cmNlcyI6WyJ0aW1lbGluZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUlBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFckM7SUFBQTtRQUNFLFdBQU0sR0FBRyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUloQyxDQUFDOzs7O0lBSEMsc0NBQVk7OztJQUFaO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQzs7OztJQUpDLGlDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5pbXBvcnQgeyBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBjbGFzcyBUaW1lbGluZVNlcnZpY2Uge1xuICBjaGVjayQgPSBuZXcgUmVwbGF5U3ViamVjdCgxKTtcbiAgbWFya0ZvckNoZWNrKCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2skLm5leHQoKTtcbiAgfVxufVxuIl19