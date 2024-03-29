/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { CandyDate, cloneDate, normalizeRangeValue } from 'ng-zorro-antd/core/time';
import * as i0 from "@angular/core";
export class DatePickerService {
    constructor() {
        this.activeInput = 'left';
        this.arrowLeft = 0;
        this.isRange = false;
        this.valueChange$ = new ReplaySubject(1);
        this.emitValue$ = new Subject();
        this.inputPartChange$ = new Subject();
    }
    initValue(reset = false) {
        if (reset) {
            this.initialValue = this.isRange ? [] : null;
        }
        this.setValue(this.initialValue);
    }
    hasValue(value = this.value) {
        if (Array.isArray(value)) {
            return !!value[0] || !!value[1];
        }
        else {
            return !!value;
        }
    }
    makeValue(value) {
        if (this.isRange) {
            return value ? value.map(val => new CandyDate(val)) : [];
        }
        else {
            return value ? new CandyDate(value) : null;
        }
    }
    setActiveDate(value, hasTimePicker = false, mode = 'month') {
        const parentPanels = {
            date: 'month',
            month: 'year',
            year: 'decade'
        };
        if (this.isRange) {
            this.activeDate = normalizeRangeValue(value, hasTimePicker, parentPanels[mode], this.activeInput);
        }
        else {
            this.activeDate = cloneDate(value);
        }
    }
    setValue(value) {
        this.value = value;
        this.valueChange$.next(this.value);
    }
    getActiveIndex(part = this.activeInput) {
        return { left: 0, right: 1 }[part];
    }
    ngOnDestroy() {
        this.valueChange$.complete();
        this.emitValue$.complete();
        this.inputPartChange$.complete();
    }
}
DatePickerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DatePickerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DatePickerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DatePickerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DatePickerService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTlDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFtQyxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztBQUtySCxNQUFNLE9BQU8saUJBQWlCO0lBRDlCO1FBS0UsZ0JBQVcsR0FBa0IsTUFBTSxDQUFDO1FBQ3BDLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUVoQixpQkFBWSxHQUFHLElBQUksYUFBYSxDQUFrQixDQUFDLENBQUMsQ0FBQztRQUNyRCxlQUFVLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUNqQyxxQkFBZ0IsR0FBRyxJQUFJLE9BQU8sRUFBaUIsQ0FBQztLQXFEakQ7SUFuREMsU0FBUyxDQUFDLFFBQWlCLEtBQUs7UUFDOUIsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQzlDO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELFFBQVEsQ0FBQyxRQUF5QixJQUFJLENBQUMsS0FBSztRQUMxQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakM7YUFBTTtZQUNMLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUNoQjtJQUNILENBQUM7SUFFRCxTQUFTLENBQUMsS0FBc0I7UUFDOUIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBRSxLQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUN0RTthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLEtBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDcEQ7SUFDSCxDQUFDO0lBRUQsYUFBYSxDQUFDLEtBQXNCLEVBQUUsZ0JBQXlCLEtBQUssRUFBRSxPQUF1QixPQUFPO1FBQ2xHLE1BQU0sWUFBWSxHQUE2QztZQUM3RCxJQUFJLEVBQUUsT0FBTztZQUNiLEtBQUssRUFBRSxNQUFNO1lBQ2IsSUFBSSxFQUFFLFFBQVE7U0FDZixDQUFDO1FBQ0YsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsbUJBQW1CLENBQUMsS0FBb0IsRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNsSDthQUFNO1lBQ0wsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEM7SUFDSCxDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQXNCO1FBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsY0FBYyxDQUFDLE9BQXNCLElBQUksQ0FBQyxXQUFXO1FBQ25ELE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7OEdBOURVLGlCQUFpQjtrSEFBakIsaUJBQWlCOzJGQUFqQixpQkFBaUI7a0JBRDdCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlcGxheVN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQ2FuZHlEYXRlLCBjbG9uZURhdGUsIENvbXBhdGlibGVWYWx1ZSwgTm9ybWFsaXplZE1vZGUsIG5vcm1hbGl6ZVJhbmdlVmFsdWUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdGltZSc7XG5cbmltcG9ydCB7IENvbXBhdGlibGVEYXRlLCBOekRhdGVNb2RlLCBSYW5nZVBhcnRUeXBlIH0gZnJvbSAnLi9zdGFuZGFyZC10eXBlcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRlUGlja2VyU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGluaXRpYWxWYWx1ZSE6IENvbXBhdGlibGVWYWx1ZTtcbiAgdmFsdWUhOiBDb21wYXRpYmxlVmFsdWU7XG4gIGFjdGl2ZURhdGU/OiBDb21wYXRpYmxlVmFsdWU7XG4gIGFjdGl2ZUlucHV0OiBSYW5nZVBhcnRUeXBlID0gJ2xlZnQnO1xuICBhcnJvd0xlZnQ6IG51bWJlciA9IDA7XG4gIGlzUmFuZ2UgPSBmYWxzZTtcblxuICB2YWx1ZUNoYW5nZSQgPSBuZXcgUmVwbGF5U3ViamVjdDxDb21wYXRpYmxlVmFsdWU+KDEpO1xuICBlbWl0VmFsdWUkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgaW5wdXRQYXJ0Q2hhbmdlJCA9IG5ldyBTdWJqZWN0PFJhbmdlUGFydFR5cGU+KCk7XG5cbiAgaW5pdFZhbHVlKHJlc2V0OiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAocmVzZXQpIHtcbiAgICAgIHRoaXMuaW5pdGlhbFZhbHVlID0gdGhpcy5pc1JhbmdlID8gW10gOiBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuc2V0VmFsdWUodGhpcy5pbml0aWFsVmFsdWUpO1xuICB9XG5cbiAgaGFzVmFsdWUodmFsdWU6IENvbXBhdGlibGVWYWx1ZSA9IHRoaXMudmFsdWUpOiBib29sZWFuIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiAhIXZhbHVlWzBdIHx8ICEhdmFsdWVbMV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAhIXZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIG1ha2VWYWx1ZSh2YWx1ZT86IENvbXBhdGlibGVEYXRlKTogQ29tcGF0aWJsZVZhbHVlIHtcbiAgICBpZiAodGhpcy5pc1JhbmdlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPyAodmFsdWUgYXMgRGF0ZVtdKS5tYXAodmFsID0+IG5ldyBDYW5keURhdGUodmFsKSkgOiBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbHVlID8gbmV3IENhbmR5RGF0ZSh2YWx1ZSBhcyBEYXRlKSA6IG51bGw7XG4gICAgfVxuICB9XG5cbiAgc2V0QWN0aXZlRGF0ZSh2YWx1ZTogQ29tcGF0aWJsZVZhbHVlLCBoYXNUaW1lUGlja2VyOiBib29sZWFuID0gZmFsc2UsIG1vZGU6IE5vcm1hbGl6ZWRNb2RlID0gJ21vbnRoJyk6IHZvaWQge1xuICAgIGNvbnN0IHBhcmVudFBhbmVsczogeyBba2V5IGluIE56RGF0ZU1vZGVdPzogTm9ybWFsaXplZE1vZGUgfSA9IHtcbiAgICAgIGRhdGU6ICdtb250aCcsXG4gICAgICBtb250aDogJ3llYXInLFxuICAgICAgeWVhcjogJ2RlY2FkZSdcbiAgICB9O1xuICAgIGlmICh0aGlzLmlzUmFuZ2UpIHtcbiAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IG5vcm1hbGl6ZVJhbmdlVmFsdWUodmFsdWUgYXMgQ2FuZHlEYXRlW10sIGhhc1RpbWVQaWNrZXIsIHBhcmVudFBhbmVsc1ttb2RlXSwgdGhpcy5hY3RpdmVJbnB1dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IGNsb25lRGF0ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgc2V0VmFsdWUodmFsdWU6IENvbXBhdGlibGVWYWx1ZSk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlJC5uZXh0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgZ2V0QWN0aXZlSW5kZXgocGFydDogUmFuZ2VQYXJ0VHlwZSA9IHRoaXMuYWN0aXZlSW5wdXQpOiBudW1iZXIge1xuICAgIHJldHVybiB7IGxlZnQ6IDAsIHJpZ2h0OiAxIH1bcGFydF07XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlJC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuZW1pdFZhbHVlJC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuaW5wdXRQYXJ0Q2hhbmdlJC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=