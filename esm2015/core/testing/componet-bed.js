/**
 * @fileoverview added by tsickle
 * Generated from: componet-bed.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export function createComponentBed(component, options = {
    providers: [],
    declarations: [],
    imports: []
}) {
    const { imports, declarations, providers } = options;
    /** @type {?} */
    const config = {
        imports: [NoopAnimationsModule, CommonModule, ...(imports || [])],
        declarations: [component, ...(declarations || [])],
        schemas: [NO_ERRORS_SCHEMA],
        providers: providers || []
    };
    /** @type {?} */
    const bed = TestBed.configureTestingModule(config);
    /** @type {?} */
    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    return {
        bed,
        fixture,
        nativeElement: fixture.nativeElement,
        debugElement: fixture.debugElement,
        component: fixture.componentInstance
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZXQtYmVkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC9jb3JlL3Rlc3RpbmcvIiwic291cmNlcyI6WyJjb21wb25ldC1iZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUEwQixnQkFBZ0IsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQW9CLE9BQU8sRUFBaUIsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7Ozs7QUFHNUUsa0NBTUM7OztJQUxDLDJCQUFtQjs7SUFDbkIsK0JBQTZCOztJQUM3QixxQ0FBMkI7O0lBQzNCLG9DQUEyQjs7SUFDM0IsaUNBQWE7Ozs7Ozs7O0FBRWYsTUFBTSxVQUFVLGtCQUFrQixDQUNoQyxTQUFrQixFQUNsQixVQUErQjtJQUM3QixTQUFTLEVBQUUsRUFBRTtJQUNiLFlBQVksRUFBRSxFQUFFO0lBQ2hCLE9BQU8sRUFBRSxFQUFFO0NBQ1o7VUFFSyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLEdBQUcsT0FBTzs7VUFDOUMsTUFBTSxHQUFHO1FBQ2IsT0FBTyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsWUFBWSxFQUFFLEdBQUcsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUM7UUFDakUsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLENBQUM7UUFDbEQsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7UUFDM0IsU0FBUyxFQUFFLFNBQVMsSUFBSSxFQUFFO0tBQzNCOztVQUNLLEdBQUcsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDOztVQUM1QyxPQUFPLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBSSxTQUFTLENBQUM7SUFDckQsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3hCLE9BQU87UUFDTCxHQUFHO1FBQ0gsT0FBTztRQUNQLGFBQWEsRUFBRSxPQUFPLENBQUMsYUFBYTtRQUNwQyxZQUFZLEVBQUUsT0FBTyxDQUFDLFlBQVk7UUFDbEMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxpQkFBaUI7S0FDckMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVidWdFbGVtZW50LCBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50Rml4dHVyZSwgVGVzdEJlZCwgVGVzdEJlZFN0YXRpYyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvdGVzdGluZyc7XG5pbXBvcnQgeyBOb29wQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5cbnR5cGUgQ29tcG9uZW50QmVkT3B0aW9ucyA9IFBpY2s8TmdNb2R1bGUsICdwcm92aWRlcnMnIHwgJ2RlY2xhcmF0aW9ucycgfCAnaW1wb3J0cyc+O1xuZXhwb3J0IGludGVyZmFjZSBDb21wb25lbnRCZWQ8VD4ge1xuICBiZWQ6IFRlc3RCZWRTdGF0aWM7XG4gIGZpeHR1cmU6IENvbXBvbmVudEZpeHR1cmU8VD47XG4gIG5hdGl2ZUVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBkZWJ1Z0VsZW1lbnQ6IERlYnVnRWxlbWVudDtcbiAgY29tcG9uZW50OiBUO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudEJlZDxUPihcbiAgY29tcG9uZW50OiBUeXBlPFQ+LFxuICBvcHRpb25zOiBDb21wb25lbnRCZWRPcHRpb25zID0ge1xuICAgIHByb3ZpZGVyczogW10sXG4gICAgZGVjbGFyYXRpb25zOiBbXSxcbiAgICBpbXBvcnRzOiBbXVxuICB9XG4pOiBDb21wb25lbnRCZWQ8VD4ge1xuICBjb25zdCB7IGltcG9ydHMsIGRlY2xhcmF0aW9ucywgcHJvdmlkZXJzIH0gPSBvcHRpb25zO1xuICBjb25zdCBjb25maWcgPSB7XG4gICAgaW1wb3J0czogW05vb3BBbmltYXRpb25zTW9kdWxlLCBDb21tb25Nb2R1bGUsIC4uLihpbXBvcnRzIHx8IFtdKV0sXG4gICAgZGVjbGFyYXRpb25zOiBbY29tcG9uZW50LCAuLi4oZGVjbGFyYXRpb25zIHx8IFtdKV0sXG4gICAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUFdLFxuICAgIHByb3ZpZGVyczogcHJvdmlkZXJzIHx8IFtdXG4gIH07XG4gIGNvbnN0IGJlZCA9IFRlc3RCZWQuY29uZmlndXJlVGVzdGluZ01vZHVsZShjb25maWcpO1xuICBjb25zdCBmaXh0dXJlID0gVGVzdEJlZC5jcmVhdGVDb21wb25lbnQ8VD4oY29tcG9uZW50KTtcbiAgZml4dHVyZS5kZXRlY3RDaGFuZ2VzKCk7XG4gIHJldHVybiB7XG4gICAgYmVkLFxuICAgIGZpeHR1cmUsXG4gICAgbmF0aXZlRWxlbWVudDogZml4dHVyZS5uYXRpdmVFbGVtZW50LFxuICAgIGRlYnVnRWxlbWVudDogZml4dHVyZS5kZWJ1Z0VsZW1lbnQsXG4gICAgY29tcG9uZW50OiBmaXh0dXJlLmNvbXBvbmVudEluc3RhbmNlXG4gIH07XG59XG4iXX0=