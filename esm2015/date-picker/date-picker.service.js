/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Injectable } from '@angular/core';
import { CandyDate, cloneDate, normalizeRangeValue } from 'ng-zorro-antd/core/time';
import { ReplaySubject, Subject } from 'rxjs';
export class DatePickerService {
    constructor() {
        this.activeInput = 'left';
        this.arrowLeft = 0;
        this.isRange = false;
        this.valueChange$ = new ReplaySubject(1);
        this.emitValue$ = new Subject();
        this.inputPartChange$ = new Subject();
    }
    initValue() {
        if (this.isRange) {
            this.initialValue = [];
        }
        else {
            this.initialValue = null;
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
DatePickerService.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFtQyxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3JILE9BQU8sRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSTlDLE1BQU0sT0FBTyxpQkFBaUI7SUFEOUI7UUFLRSxnQkFBVyxHQUFrQixNQUFNLENBQUM7UUFDcEMsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBRWhCLGlCQUFZLEdBQUcsSUFBSSxhQUFhLENBQWtCLENBQUMsQ0FBQyxDQUFDO1FBQ3JELGVBQVUsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQ2pDLHFCQUFnQixHQUFHLElBQUksT0FBTyxFQUFpQixDQUFDO0lBc0RsRCxDQUFDO0lBcERDLFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7U0FDeEI7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELFFBQVEsQ0FBQyxRQUF5QixJQUFJLENBQUMsS0FBSztRQUMxQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakM7YUFBTTtZQUNMLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUNoQjtJQUNILENBQUM7SUFFRCxTQUFTLENBQUMsS0FBc0I7UUFDOUIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBRSxLQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUN0RTthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLEtBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDcEQ7SUFDSCxDQUFDO0lBRUQsYUFBYSxDQUFDLEtBQXNCLEVBQUUsZ0JBQXlCLEtBQUssRUFBRSxPQUF1QixPQUFPO1FBQ2xHLE1BQU0sWUFBWSxHQUE2QztZQUM3RCxJQUFJLEVBQUUsT0FBTztZQUNiLEtBQUssRUFBRSxNQUFNO1lBQ2IsSUFBSSxFQUFFLFFBQVE7U0FDZixDQUFDO1FBQ0YsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsbUJBQW1CLENBQUMsS0FBb0IsRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNsSDthQUFNO1lBQ0wsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEM7SUFDSCxDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQXNCO1FBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsY0FBYyxDQUFDLE9BQXNCLElBQUksQ0FBQyxXQUFXO1FBQ25ELE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7O1lBaEVGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbmR5RGF0ZSwgY2xvbmVEYXRlLCBDb21wYXRpYmxlVmFsdWUsIE5vcm1hbGl6ZWRNb2RlLCBub3JtYWxpemVSYW5nZVZhbHVlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3RpbWUnO1xuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29tcGF0aWJsZURhdGUsIE56RGF0ZU1vZGUsIFJhbmdlUGFydFR5cGUgfSBmcm9tICcuL3N0YW5kYXJkLXR5cGVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGVQaWNrZXJTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgaW5pdGlhbFZhbHVlPzogQ29tcGF0aWJsZVZhbHVlO1xuICB2YWx1ZSE6IENvbXBhdGlibGVWYWx1ZTtcbiAgYWN0aXZlRGF0ZT86IENvbXBhdGlibGVWYWx1ZTtcbiAgYWN0aXZlSW5wdXQ6IFJhbmdlUGFydFR5cGUgPSAnbGVmdCc7XG4gIGFycm93TGVmdDogbnVtYmVyID0gMDtcbiAgaXNSYW5nZSA9IGZhbHNlO1xuXG4gIHZhbHVlQ2hhbmdlJCA9IG5ldyBSZXBsYXlTdWJqZWN0PENvbXBhdGlibGVWYWx1ZT4oMSk7XG4gIGVtaXRWYWx1ZSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBpbnB1dFBhcnRDaGFuZ2UkID0gbmV3IFN1YmplY3Q8UmFuZ2VQYXJ0VHlwZT4oKTtcblxuICBpbml0VmFsdWUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNSYW5nZSkge1xuICAgICAgdGhpcy5pbml0aWFsVmFsdWUgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbml0aWFsVmFsdWUgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLnNldFZhbHVlKHRoaXMuaW5pdGlhbFZhbHVlKTtcbiAgfVxuXG4gIGhhc1ZhbHVlKHZhbHVlOiBDb21wYXRpYmxlVmFsdWUgPSB0aGlzLnZhbHVlKTogYm9vbGVhbiB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gISF2YWx1ZVswXSB8fCAhIXZhbHVlWzFdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gISF2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBtYWtlVmFsdWUodmFsdWU/OiBDb21wYXRpYmxlRGF0ZSk6IENvbXBhdGlibGVWYWx1ZSB7XG4gICAgaWYgKHRoaXMuaXNSYW5nZSkge1xuICAgICAgcmV0dXJuIHZhbHVlID8gKHZhbHVlIGFzIERhdGVbXSkubWFwKHZhbCA9PiBuZXcgQ2FuZHlEYXRlKHZhbCkpIDogW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWx1ZSA/IG5ldyBDYW5keURhdGUodmFsdWUgYXMgRGF0ZSkgOiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHNldEFjdGl2ZURhdGUodmFsdWU6IENvbXBhdGlibGVWYWx1ZSwgaGFzVGltZVBpY2tlcjogYm9vbGVhbiA9IGZhbHNlLCBtb2RlOiBOb3JtYWxpemVkTW9kZSA9ICdtb250aCcpOiB2b2lkIHtcbiAgICBjb25zdCBwYXJlbnRQYW5lbHM6IHsgW2tleSBpbiBOekRhdGVNb2RlXT86IE5vcm1hbGl6ZWRNb2RlIH0gPSB7XG4gICAgICBkYXRlOiAnbW9udGgnLFxuICAgICAgbW9udGg6ICd5ZWFyJyxcbiAgICAgIHllYXI6ICdkZWNhZGUnXG4gICAgfTtcbiAgICBpZiAodGhpcy5pc1JhbmdlKSB7XG4gICAgICB0aGlzLmFjdGl2ZURhdGUgPSBub3JtYWxpemVSYW5nZVZhbHVlKHZhbHVlIGFzIENhbmR5RGF0ZVtdLCBoYXNUaW1lUGlja2VyLCBwYXJlbnRQYW5lbHNbbW9kZV0sIHRoaXMuYWN0aXZlSW5wdXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFjdGl2ZURhdGUgPSBjbG9uZURhdGUodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHNldFZhbHVlKHZhbHVlOiBDb21wYXRpYmxlVmFsdWUpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy52YWx1ZUNoYW5nZSQubmV4dCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIGdldEFjdGl2ZUluZGV4KHBhcnQ6IFJhbmdlUGFydFR5cGUgPSB0aGlzLmFjdGl2ZUlucHV0KTogbnVtYmVyIHtcbiAgICByZXR1cm4geyBsZWZ0OiAwLCByaWdodDogMSB9W3BhcnRdO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZUNoYW5nZSQuY29tcGxldGUoKTtcbiAgICB0aGlzLmVtaXRWYWx1ZSQuY29tcGxldGUoKTtcbiAgICB0aGlzLmlucHV0UGFydENoYW5nZSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19