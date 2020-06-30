/**
 * @fileoverview added by tsickle
 * Generated from: componet-bed.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __spread } from "tslib";
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
/**
 * @record
 * @template T
 */
export function ComponentBed() { }
if (false) {
    /** @type {?} */
    ComponentBed.prototype.bed;
    /** @type {?} */
    ComponentBed.prototype.fixture;
    /** @type {?} */
    ComponentBed.prototype.nativeElement;
    /** @type {?} */
    ComponentBed.prototype.debugElement;
    /** @type {?} */
    ComponentBed.prototype.component;
}
/**
 * @template T
 * @param {?} component
 * @param {?=} options
 * @return {?}
 */
export function createComponentBed(component, options) {
    if (options === void 0) { options = {
        providers: [],
        declarations: [],
        imports: []
    }; }
    var imports = options.imports, declarations = options.declarations, providers = options.providers;
    /** @type {?} */
    var config = {
        imports: __spread([NoopAnimationsModule, CommonModule], (imports || [])),
        declarations: __spread([component], (declarations || [])),
        schemas: [NO_ERRORS_SCHEMA],
        providers: providers || []
    };
    /** @type {?} */
    var bed = TestBed.configureTestingModule(config);
    /** @type {?} */
    var fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    return {
        bed: bed,
        fixture: fixture,
        nativeElement: fixture.nativeElement,
        debugElement: fixture.debugElement,
        component: fixture.componentInstance
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZXQtYmVkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC9jb3JlL3Rlc3RpbmcvIiwic291cmNlcyI6WyJjb21wb25ldC1iZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBMEIsZ0JBQWdCLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFvQixPQUFPLEVBQWlCLE1BQU0sdUJBQXVCLENBQUM7QUFDakYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7O0FBRzVFLGtDQU1DOzs7SUFMQywyQkFBbUI7O0lBQ25CLCtCQUE2Qjs7SUFDN0IscUNBQTJCOztJQUMzQixvQ0FBMkI7O0lBQzNCLGlDQUFhOzs7Ozs7OztBQUVmLE1BQU0sVUFBVSxrQkFBa0IsQ0FDaEMsU0FBa0IsRUFDbEIsT0FJQztJQUpELHdCQUFBLEVBQUE7UUFDRSxTQUFTLEVBQUUsRUFBRTtRQUNiLFlBQVksRUFBRSxFQUFFO1FBQ2hCLE9BQU8sRUFBRSxFQUFFO0tBQ1o7SUFFTyxJQUFBLHlCQUFPLEVBQUUsbUNBQVksRUFBRSw2QkFBUzs7UUFDbEMsTUFBTSxHQUFHO1FBQ2IsT0FBTyxZQUFHLG9CQUFvQixFQUFFLFlBQVksR0FBSyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNqRSxZQUFZLFlBQUcsU0FBUyxHQUFLLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO1FBQzNCLFNBQVMsRUFBRSxTQUFTLElBQUksRUFBRTtLQUMzQjs7UUFDSyxHQUFHLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQzs7UUFDNUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUksU0FBUyxDQUFDO0lBQ3JELE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN4QixPQUFPO1FBQ0wsR0FBRyxLQUFBO1FBQ0gsT0FBTyxTQUFBO1FBQ1AsYUFBYSxFQUFFLE9BQU8sQ0FBQyxhQUFhO1FBQ3BDLFlBQVksRUFBRSxPQUFPLENBQUMsWUFBWTtRQUNsQyxTQUFTLEVBQUUsT0FBTyxDQUFDLGlCQUFpQjtLQUNyQyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWJ1Z0VsZW1lbnQsIE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnRGaXh0dXJlLCBUZXN0QmVkLCBUZXN0QmVkU3RhdGljIH0gZnJvbSAnQGFuZ3VsYXIvY29yZS90ZXN0aW5nJztcbmltcG9ydCB7IE5vb3BBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcblxudHlwZSBDb21wb25lbnRCZWRPcHRpb25zID0gUGljazxOZ01vZHVsZSwgJ3Byb3ZpZGVycycgfCAnZGVjbGFyYXRpb25zJyB8ICdpbXBvcnRzJz47XG5leHBvcnQgaW50ZXJmYWNlIENvbXBvbmVudEJlZDxUPiB7XG4gIGJlZDogVGVzdEJlZFN0YXRpYztcbiAgZml4dHVyZTogQ29tcG9uZW50Rml4dHVyZTxUPjtcbiAgbmF0aXZlRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIGRlYnVnRWxlbWVudDogRGVidWdFbGVtZW50O1xuICBjb21wb25lbnQ6IFQ7XG59XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50QmVkPFQ+KFxuICBjb21wb25lbnQ6IFR5cGU8VD4sXG4gIG9wdGlvbnM6IENvbXBvbmVudEJlZE9wdGlvbnMgPSB7XG4gICAgcHJvdmlkZXJzOiBbXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtdLFxuICAgIGltcG9ydHM6IFtdXG4gIH1cbik6IENvbXBvbmVudEJlZDxUPiB7XG4gIGNvbnN0IHsgaW1wb3J0cywgZGVjbGFyYXRpb25zLCBwcm92aWRlcnMgfSA9IG9wdGlvbnM7XG4gIGNvbnN0IGNvbmZpZyA9IHtcbiAgICBpbXBvcnRzOiBbTm9vcEFuaW1hdGlvbnNNb2R1bGUsIENvbW1vbk1vZHVsZSwgLi4uKGltcG9ydHMgfHwgW10pXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtjb21wb25lbnQsIC4uLihkZWNsYXJhdGlvbnMgfHwgW10pXSxcbiAgICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV0sXG4gICAgcHJvdmlkZXJzOiBwcm92aWRlcnMgfHwgW11cbiAgfTtcbiAgY29uc3QgYmVkID0gVGVzdEJlZC5jb25maWd1cmVUZXN0aW5nTW9kdWxlKGNvbmZpZyk7XG4gIGNvbnN0IGZpeHR1cmUgPSBUZXN0QmVkLmNyZWF0ZUNvbXBvbmVudDxUPihjb21wb25lbnQpO1xuICBmaXh0dXJlLmRldGVjdENoYW5nZXMoKTtcbiAgcmV0dXJuIHtcbiAgICBiZWQsXG4gICAgZml4dHVyZSxcbiAgICBuYXRpdmVFbGVtZW50OiBmaXh0dXJlLm5hdGl2ZUVsZW1lbnQsXG4gICAgZGVidWdFbGVtZW50OiBmaXh0dXJlLmRlYnVnRWxlbWVudCxcbiAgICBjb21wb25lbnQ6IGZpeHR1cmUuY29tcG9uZW50SW5zdGFuY2VcbiAgfTtcbn1cbiJdfQ==