import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, startWith, takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./resize";
import * as i2 from "@angular/cdk/layout";
export var NzBreakpointEnum;
(function (NzBreakpointEnum) {
    NzBreakpointEnum["xxl"] = "xxl";
    NzBreakpointEnum["xl"] = "xl";
    NzBreakpointEnum["lg"] = "lg";
    NzBreakpointEnum["md"] = "md";
    NzBreakpointEnum["sm"] = "sm";
    NzBreakpointEnum["xs"] = "xs";
})(NzBreakpointEnum || (NzBreakpointEnum = {}));
export const gridResponsiveMap = {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)'
};
export const siderResponsiveMap = {
    xs: '(max-width: 479.98px)',
    sm: '(max-width: 575.98px)',
    md: '(max-width: 767.98px)',
    lg: '(max-width: 991.98px)',
    xl: '(max-width: 1199.98px)',
    xxl: '(max-width: 1599.98px)'
};
export class NzBreakpointService {
    constructor(resizeService, mediaMatcher) {
        this.resizeService = resizeService;
        this.mediaMatcher = mediaMatcher;
        this.destroy$ = new Subject();
        this.resizeService
            .subscribe()
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => { });
    }
    ngOnDestroy() {
        this.destroy$.next();
    }
    subscribe(breakpointMap, fullMap) {
        if (fullMap) {
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            const get = () => this.matchMedia(breakpointMap, true);
            return this.resizeService.subscribe().pipe(map(get), startWith(get()), distinctUntilChanged((x, y) => x[0] === y[0]), map(x => x[1]));
        }
        else {
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            const get = () => this.matchMedia(breakpointMap);
            return this.resizeService.subscribe().pipe(map(get), startWith(get()), distinctUntilChanged());
        }
    }
    matchMedia(breakpointMap, fullMap) {
        let bp = NzBreakpointEnum.md;
        const breakpointBooleanMap = {};
        Object.keys(breakpointMap).map(breakpoint => {
            const castBP = breakpoint;
            const matched = this.mediaMatcher.matchMedia(gridResponsiveMap[castBP]).matches;
            breakpointBooleanMap[breakpoint] = matched;
            if (matched) {
                bp = castBP;
            }
        });
        if (fullMap) {
            return [bp, breakpointBooleanMap];
        }
        else {
            return bp;
        }
    }
}
NzBreakpointService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBreakpointService, deps: [{ token: i1.NzResizeService }, { token: i2.MediaMatcher }], target: i0.ɵɵFactoryTarget.Injectable });
NzBreakpointService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBreakpointService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzBreakpointService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.NzResizeService }, { type: i2.MediaMatcher }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWtwb2ludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29yZS9zZXJ2aWNlcy9icmVha3BvaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUlqRixNQUFNLENBQU4sSUFBWSxnQkFPWDtBQVBELFdBQVksZ0JBQWdCO0lBQzFCLCtCQUFXLENBQUE7SUFDWCw2QkFBUyxDQUFBO0lBQ1QsNkJBQVMsQ0FBQTtJQUNULDZCQUFTLENBQUE7SUFDVCw2QkFBUyxDQUFBO0lBQ1QsNkJBQVMsQ0FBQTtBQUNYLENBQUMsRUFQVyxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBTzNCO0FBTUQsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQWtCO0lBQzlDLEVBQUUsRUFBRSxvQkFBb0I7SUFDeEIsRUFBRSxFQUFFLG9CQUFvQjtJQUN4QixFQUFFLEVBQUUsb0JBQW9CO0lBQ3hCLEVBQUUsRUFBRSxvQkFBb0I7SUFDeEIsRUFBRSxFQUFFLHFCQUFxQjtJQUN6QixHQUFHLEVBQUUscUJBQXFCO0NBQzNCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBa0I7SUFDL0MsRUFBRSxFQUFFLHVCQUF1QjtJQUMzQixFQUFFLEVBQUUsdUJBQXVCO0lBQzNCLEVBQUUsRUFBRSx1QkFBdUI7SUFDM0IsRUFBRSxFQUFFLHVCQUF1QjtJQUMzQixFQUFFLEVBQUUsd0JBQXdCO0lBQzVCLEdBQUcsRUFBRSx3QkFBd0I7Q0FDOUIsQ0FBQztBQUtGLE1BQU0sT0FBTyxtQkFBbUI7SUFHOUIsWUFBb0IsYUFBOEIsRUFBVSxZQUEwQjtRQUFsRSxrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUY5RSxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUdyQyxJQUFJLENBQUMsYUFBYTthQUNmLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlCLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUlELFNBQVMsQ0FBQyxhQUE0QixFQUFFLE9BQWM7UUFDcEQsSUFBSSxPQUFPLEVBQUU7WUFDWCw0RUFBNEU7WUFDNUUsTUFBTSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdkQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FDeEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUNSLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUNoQixvQkFBb0IsQ0FDbEIsQ0FBQyxDQUEyQyxFQUFFLENBQTJDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQzVHLEVBQ0QsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ2YsQ0FBQztTQUNIO2FBQU07WUFDTCw0RUFBNEU7WUFDNUUsTUFBTSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNqRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7U0FDaEc7SUFDSCxDQUFDO0lBSU8sVUFBVSxDQUNoQixhQUE0QixFQUM1QixPQUFjO1FBRWQsSUFBSSxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsRUFBRSxDQUFDO1FBRTdCLE1BQU0sb0JBQW9CLEdBQWtDLEVBQUUsQ0FBQztRQUUvRCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUMxQyxNQUFNLE1BQU0sR0FBRyxVQUE4QixDQUFDO1lBQzlDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBRWhGLG9CQUFvQixDQUFDLFVBQThCLENBQUMsR0FBRyxPQUFPLENBQUM7WUFFL0QsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsRUFBRSxHQUFHLE1BQU0sQ0FBQzthQUNiO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLE9BQU8sRUFBRTtZQUNYLE9BQU8sQ0FBQyxFQUFFLEVBQUUsb0JBQTRDLENBQUMsQ0FBQztTQUMzRDthQUFNO1lBQ0wsT0FBTyxFQUFFLENBQUM7U0FDWDtJQUNILENBQUM7O2dIQTdEVSxtQkFBbUI7b0hBQW5CLG1CQUFtQixjQUZsQixNQUFNOzJGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBNZWRpYU1hdGNoZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvbGF5b3V0JztcbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgc3RhcnRXaXRoLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE56UmVzaXplU2VydmljZSB9IGZyb20gJy4vcmVzaXplJztcblxuZXhwb3J0IGVudW0gTnpCcmVha3BvaW50RW51bSB7XG4gIHh4bCA9ICd4eGwnLFxuICB4bCA9ICd4bCcsXG4gIGxnID0gJ2xnJyxcbiAgbWQgPSAnbWQnLFxuICBzbSA9ICdzbScsXG4gIHhzID0gJ3hzJ1xufVxuXG5leHBvcnQgdHlwZSBCcmVha3BvaW50TWFwID0geyBba2V5IGluIE56QnJlYWtwb2ludEVudW1dOiBzdHJpbmcgfTtcbmV4cG9ydCB0eXBlIEJyZWFrcG9pbnRCb29sZWFuTWFwID0geyBba2V5IGluIE56QnJlYWtwb2ludEVudW1dOiBib29sZWFuIH07XG5leHBvcnQgdHlwZSBOekJyZWFrcG9pbnRLZXkgPSBrZXlvZiB0eXBlb2YgTnpCcmVha3BvaW50RW51bTtcblxuZXhwb3J0IGNvbnN0IGdyaWRSZXNwb25zaXZlTWFwOiBCcmVha3BvaW50TWFwID0ge1xuICB4czogJyhtYXgtd2lkdGg6IDU3NXB4KScsXG4gIHNtOiAnKG1pbi13aWR0aDogNTc2cHgpJyxcbiAgbWQ6ICcobWluLXdpZHRoOiA3NjhweCknLFxuICBsZzogJyhtaW4td2lkdGg6IDk5MnB4KScsXG4gIHhsOiAnKG1pbi13aWR0aDogMTIwMHB4KScsXG4gIHh4bDogJyhtaW4td2lkdGg6IDE2MDBweCknXG59O1xuXG5leHBvcnQgY29uc3Qgc2lkZXJSZXNwb25zaXZlTWFwOiBCcmVha3BvaW50TWFwID0ge1xuICB4czogJyhtYXgtd2lkdGg6IDQ3OS45OHB4KScsXG4gIHNtOiAnKG1heC13aWR0aDogNTc1Ljk4cHgpJyxcbiAgbWQ6ICcobWF4LXdpZHRoOiA3NjcuOThweCknLFxuICBsZzogJyhtYXgtd2lkdGg6IDk5MS45OHB4KScsXG4gIHhsOiAnKG1heC13aWR0aDogMTE5OS45OHB4KScsXG4gIHh4bDogJyhtYXgtd2lkdGg6IDE1OTkuOThweCknXG59O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOekJyZWFrcG9pbnRTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZXNpemVTZXJ2aWNlOiBOelJlc2l6ZVNlcnZpY2UsIHByaXZhdGUgbWVkaWFNYXRjaGVyOiBNZWRpYU1hdGNoZXIpIHtcbiAgICB0aGlzLnJlc2l6ZVNlcnZpY2VcbiAgICAgIC5zdWJzY3JpYmUoKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7fSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgfVxuXG4gIHN1YnNjcmliZShicmVha3BvaW50TWFwOiBCcmVha3BvaW50TWFwKTogT2JzZXJ2YWJsZTxOekJyZWFrcG9pbnRFbnVtPjtcbiAgc3Vic2NyaWJlKGJyZWFrcG9pbnRNYXA6IEJyZWFrcG9pbnRNYXAsIGZ1bGxNYXA6IHRydWUpOiBPYnNlcnZhYmxlPEJyZWFrcG9pbnRCb29sZWFuTWFwPjtcbiAgc3Vic2NyaWJlKGJyZWFrcG9pbnRNYXA6IEJyZWFrcG9pbnRNYXAsIGZ1bGxNYXA/OiB0cnVlKTogT2JzZXJ2YWJsZTxOekJyZWFrcG9pbnRFbnVtIHwgQnJlYWtwb2ludEJvb2xlYW5NYXA+IHtcbiAgICBpZiAoZnVsbE1hcCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1mdW5jdGlvbi1yZXR1cm4tdHlwZVxuICAgICAgY29uc3QgZ2V0ID0gKCkgPT4gdGhpcy5tYXRjaE1lZGlhKGJyZWFrcG9pbnRNYXAsIHRydWUpO1xuICAgICAgcmV0dXJuIHRoaXMucmVzaXplU2VydmljZS5zdWJzY3JpYmUoKS5waXBlKFxuICAgICAgICBtYXAoZ2V0KSxcbiAgICAgICAgc3RhcnRXaXRoKGdldCgpKSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoXG4gICAgICAgICAgKHg6IFtOekJyZWFrcG9pbnRFbnVtLCBCcmVha3BvaW50Qm9vbGVhbk1hcF0sIHk6IFtOekJyZWFrcG9pbnRFbnVtLCBCcmVha3BvaW50Qm9vbGVhbk1hcF0pID0+IHhbMF0gPT09IHlbMF1cbiAgICAgICAgKSxcbiAgICAgICAgbWFwKHggPT4geFsxXSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtZnVuY3Rpb24tcmV0dXJuLXR5cGVcbiAgICAgIGNvbnN0IGdldCA9ICgpID0+IHRoaXMubWF0Y2hNZWRpYShicmVha3BvaW50TWFwKTtcbiAgICAgIHJldHVybiB0aGlzLnJlc2l6ZVNlcnZpY2Uuc3Vic2NyaWJlKCkucGlwZShtYXAoZ2V0KSwgc3RhcnRXaXRoKGdldCgpKSwgZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtYXRjaE1lZGlhKGJyZWFrcG9pbnRNYXA6IEJyZWFrcG9pbnRNYXApOiBOekJyZWFrcG9pbnRFbnVtO1xuICBwcml2YXRlIG1hdGNoTWVkaWEoYnJlYWtwb2ludE1hcDogQnJlYWtwb2ludE1hcCwgZnVsbE1hcDogdHJ1ZSk6IFtOekJyZWFrcG9pbnRFbnVtLCBCcmVha3BvaW50Qm9vbGVhbk1hcF07XG4gIHByaXZhdGUgbWF0Y2hNZWRpYShcbiAgICBicmVha3BvaW50TWFwOiBCcmVha3BvaW50TWFwLFxuICAgIGZ1bGxNYXA/OiB0cnVlXG4gICk6IE56QnJlYWtwb2ludEVudW0gfCBbTnpCcmVha3BvaW50RW51bSwgQnJlYWtwb2ludEJvb2xlYW5NYXBdIHtcbiAgICBsZXQgYnAgPSBOekJyZWFrcG9pbnRFbnVtLm1kO1xuXG4gICAgY29uc3QgYnJlYWtwb2ludEJvb2xlYW5NYXA6IFBhcnRpYWw8QnJlYWtwb2ludEJvb2xlYW5NYXA+ID0ge307XG5cbiAgICBPYmplY3Qua2V5cyhicmVha3BvaW50TWFwKS5tYXAoYnJlYWtwb2ludCA9PiB7XG4gICAgICBjb25zdCBjYXN0QlAgPSBicmVha3BvaW50IGFzIE56QnJlYWtwb2ludEVudW07XG4gICAgICBjb25zdCBtYXRjaGVkID0gdGhpcy5tZWRpYU1hdGNoZXIubWF0Y2hNZWRpYShncmlkUmVzcG9uc2l2ZU1hcFtjYXN0QlBdKS5tYXRjaGVzO1xuXG4gICAgICBicmVha3BvaW50Qm9vbGVhbk1hcFticmVha3BvaW50IGFzIE56QnJlYWtwb2ludEVudW1dID0gbWF0Y2hlZDtcblxuICAgICAgaWYgKG1hdGNoZWQpIHtcbiAgICAgICAgYnAgPSBjYXN0QlA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoZnVsbE1hcCkge1xuICAgICAgcmV0dXJuIFticCwgYnJlYWtwb2ludEJvb2xlYW5NYXAgYXMgQnJlYWtwb2ludEJvb2xlYW5NYXBdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYnA7XG4gICAgfVxuICB9XG59XG4iXX0=