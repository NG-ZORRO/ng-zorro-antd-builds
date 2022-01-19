/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { addMonths, addYears, differenceInCalendarDays, differenceInCalendarMonths, differenceInCalendarYears, differenceInHours, differenceInMinutes, differenceInSeconds, isFirstDayOfMonth, isLastDayOfMonth, isSameDay, isSameHour, isSameMinute, isSameMonth, isSameSecond, isSameYear, isToday, isValid, setDay, setMonth, setYear, startOfMonth, startOfWeek } from 'date-fns';
import { warn } from 'ng-zorro-antd/core/logger';
export function wrongSortOrder(rangeValue) {
    const [start, end] = rangeValue;
    return !!start && !!end && end.isBeforeDay(start);
}
export function normalizeRangeValue(value, hasTimePicker, type = 'month', activePart = 'left') {
    const [start, end] = value;
    let newStart = start || new CandyDate();
    let newEnd = end || (hasTimePicker ? newStart : newStart.add(1, type));
    if (start && !end) {
        newStart = start;
        newEnd = hasTimePicker ? start : start.add(1, type);
    }
    else if (!start && end) {
        newStart = hasTimePicker ? end : end.add(-1, type);
        newEnd = end;
    }
    else if (start && end && !hasTimePicker) {
        if (start.isSame(end, type)) {
            newEnd = newStart.add(1, type);
        }
        else {
            if (activePart === 'left') {
                newEnd = newStart.add(1, type);
            }
            else {
                newStart = newEnd.add(-1, type);
            }
        }
    }
    return [newStart, newEnd];
}
export function cloneDate(value) {
    if (Array.isArray(value)) {
        return value.map(v => (v instanceof CandyDate ? v.clone() : null));
    }
    else {
        return value instanceof CandyDate ? value.clone() : null;
    }
}
/**
 * Wrapping kind APIs for date operating and unify
 * NOTE: every new API return new CandyDate object without side effects to the former Date object
 * NOTE: most APIs are based on local time other than customized locale id (this needs tobe support in future)
 * TODO: support format() against to angular's core API
 */
export class CandyDate {
    // locale: string; // Custom specified locale ID
    constructor(date) {
        if (date) {
            if (date instanceof Date) {
                this.nativeDate = date;
            }
            else if (typeof date === 'string' || typeof date === 'number') {
                warn('The string type is not recommended for date-picker, use "Date" type');
                this.nativeDate = new Date(date);
            }
            else {
                throw new Error('The input date type is not supported ("Date" is now recommended)');
            }
        }
        else {
            this.nativeDate = new Date();
        }
    }
    calendarStart(options) {
        return new CandyDate(startOfWeek(startOfMonth(this.nativeDate), options));
    }
    // ---------------------------------------------------------------------
    // | Native shortcuts
    // -----------------------------------------------------------------------------\
    getYear() {
        return this.nativeDate.getFullYear();
    }
    getMonth() {
        return this.nativeDate.getMonth();
    }
    getDay() {
        return this.nativeDate.getDay();
    }
    getTime() {
        return this.nativeDate.getTime();
    }
    getDate() {
        return this.nativeDate.getDate();
    }
    getHours() {
        return this.nativeDate.getHours();
    }
    getMinutes() {
        return this.nativeDate.getMinutes();
    }
    getSeconds() {
        return this.nativeDate.getSeconds();
    }
    getMilliseconds() {
        return this.nativeDate.getMilliseconds();
    }
    // ---------------------------------------------------------------------
    // | New implementing APIs
    // ---------------------------------------------------------------------
    clone() {
        return new CandyDate(new Date(this.nativeDate));
    }
    setHms(hour, minute, second) {
        const newDate = new Date(this.nativeDate.setHours(hour, minute, second));
        return new CandyDate(newDate);
    }
    setYear(year) {
        return new CandyDate(setYear(this.nativeDate, year));
    }
    addYears(amount) {
        return new CandyDate(addYears(this.nativeDate, amount));
    }
    // NOTE: month starts from 0
    // NOTE: Don't use the native API for month manipulation as it not restrict the date when it overflows, eg. (new Date('2018-7-31')).setMonth(1) will be date of 2018-3-03 instead of 2018-2-28
    setMonth(month) {
        return new CandyDate(setMonth(this.nativeDate, month));
    }
    addMonths(amount) {
        return new CandyDate(addMonths(this.nativeDate, amount));
    }
    setDay(day, options) {
        return new CandyDate(setDay(this.nativeDate, day, options));
    }
    setDate(amount) {
        const date = new Date(this.nativeDate);
        date.setDate(amount);
        return new CandyDate(date);
    }
    addDays(amount) {
        return this.setDate(this.getDate() + amount);
    }
    add(amount, mode) {
        switch (mode) {
            case 'decade':
                return this.addYears(amount * 10);
            case 'year':
                return this.addYears(amount);
            case 'month':
                return this.addMonths(amount);
            default:
                return this.addMonths(amount);
        }
    }
    isSame(date, grain = 'day') {
        let fn;
        switch (grain) {
            case 'decade':
                fn = (pre, next) => Math.abs(pre.getFullYear() - next.getFullYear()) < 11;
                break;
            case 'year':
                fn = isSameYear;
                break;
            case 'month':
                fn = isSameMonth;
                break;
            case 'day':
                fn = isSameDay;
                break;
            case 'hour':
                fn = isSameHour;
                break;
            case 'minute':
                fn = isSameMinute;
                break;
            case 'second':
                fn = isSameSecond;
                break;
            default:
                fn = isSameDay;
                break;
        }
        return fn(this.nativeDate, this.toNativeDate(date));
    }
    isSameYear(date) {
        return this.isSame(date, 'year');
    }
    isSameMonth(date) {
        return this.isSame(date, 'month');
    }
    isSameDay(date) {
        return this.isSame(date, 'day');
    }
    isSameHour(date) {
        return this.isSame(date, 'hour');
    }
    isSameMinute(date) {
        return this.isSame(date, 'minute');
    }
    isSameSecond(date) {
        return this.isSame(date, 'second');
    }
    isBefore(date, grain = 'day') {
        if (date === null) {
            return false;
        }
        let fn;
        switch (grain) {
            case 'year':
                fn = differenceInCalendarYears;
                break;
            case 'month':
                fn = differenceInCalendarMonths;
                break;
            case 'day':
                fn = differenceInCalendarDays;
                break;
            case 'hour':
                fn = differenceInHours;
                break;
            case 'minute':
                fn = differenceInMinutes;
                break;
            case 'second':
                fn = differenceInSeconds;
                break;
            default:
                fn = differenceInCalendarDays;
                break;
        }
        return fn(this.nativeDate, this.toNativeDate(date)) < 0;
    }
    isBeforeYear(date) {
        return this.isBefore(date, 'year');
    }
    isBeforeMonth(date) {
        return this.isBefore(date, 'month');
    }
    isBeforeDay(date) {
        return this.isBefore(date, 'day');
    }
    // Equal to today accurate to "day"
    isToday() {
        return isToday(this.nativeDate);
    }
    isValid() {
        return isValid(this.nativeDate);
    }
    isFirstDayOfMonth() {
        return isFirstDayOfMonth(this.nativeDate);
    }
    isLastDayOfMonth() {
        return isLastDayOfMonth(this.nativeDate);
    }
    toNativeDate(date) {
        return date instanceof CandyDate ? date.nativeDate : date;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuZHktZGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29yZS90aW1lL2NhbmR5LWRhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUNMLFNBQVMsRUFDVCxRQUFRLEVBQ1Isd0JBQXdCLEVBQ3hCLDBCQUEwQixFQUMxQix5QkFBeUIsRUFDekIsaUJBQWlCLEVBQ2pCLG1CQUFtQixFQUNuQixtQkFBbUIsRUFDbkIsaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsWUFBWSxFQUNaLFVBQVUsRUFDVixPQUFPLEVBQ1AsT0FBTyxFQUNQLE1BQU0sRUFDTixRQUFRLEVBQ1IsT0FBTyxFQUNQLFlBQVksRUFDWixXQUFXLEVBQ1osTUFBTSxVQUFVLENBQUM7QUFFbEIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBVWpELE1BQU0sVUFBVSxjQUFjLENBQUMsVUFBeUI7SUFDdEQsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDaEMsT0FBTyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxDQUFDO0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUNqQyxLQUFvQixFQUNwQixhQUFzQixFQUN0QixPQUF1QixPQUFPLEVBQzlCLGFBQStCLE1BQU07SUFFckMsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDM0IsSUFBSSxRQUFRLEdBQWMsS0FBSyxJQUFJLElBQUksU0FBUyxFQUFFLENBQUM7SUFDbkQsSUFBSSxNQUFNLEdBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxRQUFRLENB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QyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUM1RCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBhZGRNb250aHMsXG4gIGFkZFllYXJzLFxuICBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMsXG4gIGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzLFxuICBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzLFxuICBkaWZmZXJlbmNlSW5Ib3VycyxcbiAgZGlmZmVyZW5jZUluTWludXRlcyxcbiAgZGlmZmVyZW5jZUluU2Vjb25kcyxcbiAgaXNGaXJzdERheU9mTW9udGgsXG4gIGlzTGFzdERheU9mTW9udGgsXG4gIGlzU2FtZURheSxcbiAgaXNTYW1lSG91cixcbiAgaXNTYW1lTWludXRlLFxuICBpc1NhbWVNb250aCxcbiAgaXNTYW1lU2Vjb25kLFxuICBpc1NhbWVZZWFyLFxuICBpc1RvZGF5LFxuICBpc1ZhbGlkLFxuICBzZXREYXksXG4gIHNldE1vbnRoLFxuICBzZXRZZWFyLFxuICBzdGFydE9mTW9udGgsXG4gIHN0YXJ0T2ZXZWVrXG59IGZyb20gJ2RhdGUtZm5zJztcblxuaW1wb3J0IHsgd2FybiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9sb2dnZXInO1xuaW1wb3J0IHsgSW5kZXhhYmxlT2JqZWN0LCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5leHBvcnQgdHlwZSBDYW5keURhdGVNb2RlID0gJ2RlY2FkZScgfCAneWVhcicgfCAnbW9udGgnIHwgJ2RheScgfCAnaG91cicgfCAnbWludXRlJyB8ICdzZWNvbmQnO1xuZXhwb3J0IHR5cGUgTm9ybWFsaXplZE1vZGUgPSAnZGVjYWRlJyB8ICd5ZWFyJyB8ICdtb250aCc7XG5leHBvcnQgdHlwZSBXZWVrRGF5SW5kZXggPSAwIHwgMSB8IDIgfCAzIHwgNCB8IDUgfCA2O1xuZXhwb3J0IHR5cGUgQ2FuZHlEYXRlVHlwZSA9IENhbmR5RGF0ZSB8IERhdGUgfCBudWxsO1xuZXhwb3J0IHR5cGUgU2luZ2xlVmFsdWUgPSBDYW5keURhdGUgfCBudWxsO1xuZXhwb3J0IHR5cGUgQ29tcGF0aWJsZVZhbHVlID0gU2luZ2xlVmFsdWUgfCBTaW5nbGVWYWx1ZVtdO1xuXG5leHBvcnQgZnVuY3Rpb24gd3JvbmdTb3J0T3JkZXIocmFuZ2VWYWx1ZTogU2luZ2xlVmFsdWVbXSk6IGJvb2xlYW4ge1xuICBjb25zdCBbc3RhcnQsIGVuZF0gPSByYW5nZVZhbHVlO1xuICByZXR1cm4gISFzdGFydCAmJiAhIWVuZCAmJiBlbmQuaXNCZWZvcmVEYXkoc3RhcnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplUmFuZ2VWYWx1ZShcbiAgdmFsdWU6IFNpbmdsZVZhbHVlW10sXG4gIGhhc1RpbWVQaWNrZXI6IGJvb2xlYW4sXG4gIHR5cGU6IE5vcm1hbGl6ZWRNb2RlID0gJ21vbnRoJyxcbiAgYWN0aXZlUGFydDogJ2xlZnQnIHwgJ3JpZ2h0JyA9ICdsZWZ0J1xuKTogQ2FuZHlEYXRlW10ge1xuICBjb25zdCBbc3RhcnQsIGVuZF0gPSB2YWx1ZTtcbiAgbGV0IG5ld1N0YXJ0OiBDYW5keURhdGUgPSBzdGFydCB8fCBuZXcgQ2FuZHlEYXRlKCk7XG4gIGxldCBuZXdFbmQ6IENhbmR5RGF0ZSA9IGVuZCB8fCAoaGFzVGltZVBpY2tlciA/IG5ld1N0YXJ0IDogbmV3U3RhcnQuYWRkKDEsIHR5cGUpKTtcblxuICBpZiAoc3RhcnQgJiYgIWVuZCkge1xuICAgIG5ld1N0YXJ0ID0gc3RhcnQ7XG4gICAgbmV3RW5kID0gaGFzVGltZVBpY2tlciA/IHN0YXJ0IDogc3RhcnQuYWRkKDEsIHR5cGUpO1xuICB9IGVsc2UgaWYgKCFzdGFydCAmJiBlbmQpIHtcbiAgICBuZXdTdGFydCA9IGhhc1RpbWVQaWNrZXIgPyBlbmQgOiBlbmQuYWRkKC0xLCB0eXBlKTtcbiAgICBuZXdFbmQgPSBlbmQ7XG4gIH0gZWxzZSBpZiAoc3RhcnQgJiYgZW5kICYmICFoYXNUaW1lUGlja2VyKSB7XG4gICAgaWYgKHN0YXJ0LmlzU2FtZShlbmQsIHR5cGUpKSB7XG4gICAgICBuZXdFbmQgPSBuZXdTdGFydC5hZGQoMSwgdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChhY3RpdmVQYXJ0ID09PSAnbGVmdCcpIHtcbiAgICAgICAgbmV3RW5kID0gbmV3U3RhcnQuYWRkKDEsIHR5cGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3U3RhcnQgPSBuZXdFbmQuYWRkKC0xLCB0eXBlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFtuZXdTdGFydCwgbmV3RW5kXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lRGF0ZSh2YWx1ZTogQ29tcGF0aWJsZVZhbHVlKTogQ29tcGF0aWJsZVZhbHVlIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLm1hcCh2ID0+ICh2IGluc3RhbmNlb2YgQ2FuZHlEYXRlID8gdi5jbG9uZSgpIDogbnVsbCkpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIENhbmR5RGF0ZSA/IHZhbHVlLmNsb25lKCkgOiBudWxsO1xuICB9XG59XG5cbi8qKlxuICogV3JhcHBpbmcga2luZCBBUElzIGZvciBkYXRlIG9wZXJhdGluZyBhbmQgdW5pZnlcbiAqIE5PVEU6IGV2ZXJ5IG5ldyBBUEkgcmV0dXJuIG5ldyBDYW5keURhdGUgb2JqZWN0IHdpdGhvdXQgc2lkZSBlZmZlY3RzIHRvIHRoZSBmb3JtZXIgRGF0ZSBvYmplY3RcbiAqIE5PVEU6IG1vc3QgQVBJcyBhcmUgYmFzZWQgb24gbG9jYWwgdGltZSBvdGhlciB0aGFuIGN1c3RvbWl6ZWQgbG9jYWxlIGlkICh0aGlzIG5lZWRzIHRvYmUgc3VwcG9ydCBpbiBmdXR1cmUpXG4gKiBUT0RPOiBzdXBwb3J0IGZvcm1hdCgpIGFnYWluc3QgdG8gYW5ndWxhcidzIGNvcmUgQVBJXG4gKi9cbmV4cG9ydCBjbGFzcyBDYW5keURhdGUgaW1wbGVtZW50cyBJbmRleGFibGVPYmplY3Qge1xuICBuYXRpdmVEYXRlOiBEYXRlO1xuICAvLyBsb2NhbGU6IHN0cmluZzsgLy8gQ3VzdG9tIHNwZWNpZmllZCBsb2NhbGUgSURcblxuICBjb25zdHJ1Y3RvcihkYXRlPzogRGF0ZSB8IHN0cmluZyB8IG51bWJlcikge1xuICAgIGlmIChkYXRlKSB7XG4gICAgICBpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgdGhpcy5uYXRpdmVEYXRlID0gZGF0ZTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBkYXRlID09PSAnbnVtYmVyJykge1xuICAgICAgICB3YXJuKCdUaGUgc3RyaW5nIHR5cGUgaXMgbm90IHJlY29tbWVuZGVkIGZvciBkYXRlLXBpY2tlciwgdXNlIFwiRGF0ZVwiIHR5cGUnKTtcbiAgICAgICAgdGhpcy5uYXRpdmVEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBpbnB1dCBkYXRlIHR5cGUgaXMgbm90IHN1cHBvcnRlZCAoXCJEYXRlXCIgaXMgbm93IHJlY29tbWVuZGVkKScpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5hdGl2ZURhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGNhbGVuZGFyU3RhcnQob3B0aW9ucz86IHsgd2Vla1N0YXJ0c09uOiBXZWVrRGF5SW5kZXggfCB1bmRlZmluZWQgfSk6IENhbmR5RGF0ZSB7XG4gICAgcmV0dXJuIG5ldyBDYW5keURhdGUoc3RhcnRPZldlZWsoc3RhcnRPZk1vbnRoKHRoaXMubmF0aXZlRGF0ZSksIG9wdGlvbnMpKTtcbiAgfVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyB8IE5hdGl2ZSBzaG9ydGN1dHNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXFxuXG4gIGdldFllYXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5uYXRpdmVEYXRlLmdldEZ1bGxZZWFyKCk7XG4gIH1cblxuICBnZXRNb250aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm5hdGl2ZURhdGUuZ2V0TW9udGgoKTtcbiAgfVxuXG4gIGdldERheSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm5hdGl2ZURhdGUuZ2V0RGF5KCk7XG4gIH1cblxuICBnZXRUaW1lKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMubmF0aXZlRGF0ZS5nZXRUaW1lKCk7XG4gIH1cblxuICBnZXREYXRlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMubmF0aXZlRGF0ZS5nZXREYXRlKCk7XG4gIH1cblxuICBnZXRIb3VycygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm5hdGl2ZURhdGUuZ2V0SG91cnMoKTtcbiAgfVxuXG4gIGdldE1pbnV0ZXMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5uYXRpdmVEYXRlLmdldE1pbnV0ZXMoKTtcbiAgfVxuXG4gIGdldFNlY29uZHMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5uYXRpdmVEYXRlLmdldFNlY29uZHMoKTtcbiAgfVxuXG4gIGdldE1pbGxpc2Vjb25kcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm5hdGl2ZURhdGUuZ2V0TWlsbGlzZWNvbmRzKCk7XG4gIH1cblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gfCBOZXcgaW1wbGVtZW50aW5nIEFQSXNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgY2xvbmUoKTogQ2FuZHlEYXRlIHtcbiAgICByZXR1cm4gbmV3IENhbmR5RGF0ZShuZXcgRGF0ZSh0aGlzLm5hdGl2ZURhdGUpKTtcbiAgfVxuXG4gIHNldEhtcyhob3VyOiBudW1iZXIsIG1pbnV0ZTogbnVtYmVyLCBzZWNvbmQ6IG51bWJlcik6IENhbmR5RGF0ZSB7XG4gICAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKHRoaXMubmF0aXZlRGF0ZS5zZXRIb3Vycyhob3VyLCBtaW51dGUsIHNlY29uZCkpO1xuICAgIHJldHVybiBuZXcgQ2FuZHlEYXRlKG5ld0RhdGUpO1xuICB9XG5cbiAgc2V0WWVhcih5ZWFyOiBudW1iZXIpOiBDYW5keURhdGUge1xuICAgIHJldHVybiBuZXcgQ2FuZHlEYXRlKHNldFllYXIodGhpcy5uYXRpdmVEYXRlLCB5ZWFyKSk7XG4gIH1cblxuICBhZGRZZWFycyhhbW91bnQ6IG51bWJlcik6IENhbmR5RGF0ZSB7XG4gICAgcmV0dXJuIG5ldyBDYW5keURhdGUoYWRkWWVhcnModGhpcy5uYXRpdmVEYXRlLCBhbW91bnQpKTtcbiAgfVxuXG4gIC8vIE5PVEU6IG1vbnRoIHN0YXJ0cyBmcm9tIDBcbiAgLy8gTk9URTogRG9uJ3QgdXNlIHRoZSBuYXRpdmUgQVBJIGZvciBtb250aCBtYW5pcHVsYXRpb24gYXMgaXQgbm90IHJlc3RyaWN0IHRoZSBkYXRlIHdoZW4gaXQgb3ZlcmZsb3dzLCBlZy4gKG5ldyBEYXRlKCcyMDE4LTctMzEnKSkuc2V0TW9udGgoMSkgd2lsbCBiZSBkYXRlIG9mIDIwMTgtMy0wMyBpbnN0ZWFkIG9mIDIwMTgtMi0yOFxuICBzZXRNb250aChtb250aDogbnVtYmVyKTogQ2FuZHlEYXRlIHtcbiAgICByZXR1cm4gbmV3IENhbmR5RGF0ZShzZXRNb250aCh0aGlzLm5hdGl2ZURhdGUsIG1vbnRoKSk7XG4gIH1cblxuICBhZGRNb250aHMoYW1vdW50OiBudW1iZXIpOiBDYW5keURhdGUge1xuICAgIHJldHVybiBuZXcgQ2FuZHlEYXRlKGFkZE1vbnRocyh0aGlzLm5hdGl2ZURhdGUsIGFtb3VudCkpO1xuICB9XG5cbiAgc2V0RGF5KGRheTogbnVtYmVyLCBvcHRpb25zPzogeyB3ZWVrU3RhcnRzT246IFdlZWtEYXlJbmRleCB9KTogQ2FuZHlEYXRlIHtcbiAgICByZXR1cm4gbmV3IENhbmR5RGF0ZShzZXREYXkodGhpcy5uYXRpdmVEYXRlLCBkYXksIG9wdGlvbnMpKTtcbiAgfVxuXG4gIHNldERhdGUoYW1vdW50OiBudW1iZXIpOiBDYW5keURhdGUge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aGlzLm5hdGl2ZURhdGUpO1xuICAgIGRhdGUuc2V0RGF0ZShhbW91bnQpO1xuICAgIHJldHVybiBuZXcgQ2FuZHlEYXRlKGRhdGUpO1xuICB9XG5cbiAgYWRkRGF5cyhhbW91bnQ6IG51bWJlcik6IENhbmR5RGF0ZSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0RGF0ZSh0aGlzLmdldERhdGUoKSArIGFtb3VudCk7XG4gIH1cblxuICBhZGQoYW1vdW50OiBudW1iZXIsIG1vZGU6IE5vcm1hbGl6ZWRNb2RlKTogQ2FuZHlEYXRlIHtcbiAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgIGNhc2UgJ2RlY2FkZSc6XG4gICAgICAgIHJldHVybiB0aGlzLmFkZFllYXJzKGFtb3VudCAqIDEwKTtcbiAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICByZXR1cm4gdGhpcy5hZGRZZWFycyhhbW91bnQpO1xuICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICByZXR1cm4gdGhpcy5hZGRNb250aHMoYW1vdW50KTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0aGlzLmFkZE1vbnRocyhhbW91bnQpO1xuICAgIH1cbiAgfVxuXG4gIGlzU2FtZShkYXRlOiBDYW5keURhdGVUeXBlLCBncmFpbjogQ2FuZHlEYXRlTW9kZSA9ICdkYXknKTogYm9vbGVhbiB7XG4gICAgbGV0IGZuO1xuICAgIHN3aXRjaCAoZ3JhaW4pIHtcbiAgICAgIGNhc2UgJ2RlY2FkZSc6XG4gICAgICAgIGZuID0gKHByZTogRGF0ZSwgbmV4dDogRGF0ZSkgPT4gTWF0aC5hYnMocHJlLmdldEZ1bGxZZWFyKCkgLSBuZXh0LmdldEZ1bGxZZWFyKCkpIDwgMTE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgIGZuID0gaXNTYW1lWWVhcjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtb250aCc6XG4gICAgICAgIGZuID0gaXNTYW1lTW9udGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgZm4gPSBpc1NhbWVEYXk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgIGZuID0gaXNTYW1lSG91cjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICBmbiA9IGlzU2FtZU1pbnV0ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICBmbiA9IGlzU2FtZVNlY29uZDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBmbiA9IGlzU2FtZURheTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBmbih0aGlzLm5hdGl2ZURhdGUsIHRoaXMudG9OYXRpdmVEYXRlKGRhdGUpKTtcbiAgfVxuXG4gIGlzU2FtZVllYXIoZGF0ZTogQ2FuZHlEYXRlVHlwZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzU2FtZShkYXRlLCAneWVhcicpO1xuICB9XG5cbiAgaXNTYW1lTW9udGgoZGF0ZTogQ2FuZHlEYXRlVHlwZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzU2FtZShkYXRlLCAnbW9udGgnKTtcbiAgfVxuXG4gIGlzU2FtZURheShkYXRlOiBDYW5keURhdGVUeXBlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNTYW1lKGRhdGUsICdkYXknKTtcbiAgfVxuXG4gIGlzU2FtZUhvdXIoZGF0ZTogQ2FuZHlEYXRlVHlwZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzU2FtZShkYXRlLCAnaG91cicpO1xuICB9XG5cbiAgaXNTYW1lTWludXRlKGRhdGU6IENhbmR5RGF0ZVR5cGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc1NhbWUoZGF0ZSwgJ21pbnV0ZScpO1xuICB9XG5cbiAgaXNTYW1lU2Vjb25kKGRhdGU6IENhbmR5RGF0ZVR5cGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc1NhbWUoZGF0ZSwgJ3NlY29uZCcpO1xuICB9XG5cbiAgaXNCZWZvcmUoZGF0ZTogQ2FuZHlEYXRlVHlwZSwgZ3JhaW46IENhbmR5RGF0ZU1vZGUgPSAnZGF5Jyk6IGJvb2xlYW4ge1xuICAgIGlmIChkYXRlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBmbjtcbiAgICBzd2l0Y2ggKGdyYWluKSB7XG4gICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgZm4gPSBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgZm4gPSBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkYXknOlxuICAgICAgICBmbiA9IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgZm4gPSBkaWZmZXJlbmNlSW5Ib3VycztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICBmbiA9IGRpZmZlcmVuY2VJbk1pbnV0ZXM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgZm4gPSBkaWZmZXJlbmNlSW5TZWNvbmRzO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGZuID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIGZuKHRoaXMubmF0aXZlRGF0ZSwgdGhpcy50b05hdGl2ZURhdGUoZGF0ZSkpIDwgMDtcbiAgfVxuXG4gIGlzQmVmb3JlWWVhcihkYXRlOiBDYW5keURhdGVUeXBlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNCZWZvcmUoZGF0ZSwgJ3llYXInKTtcbiAgfVxuXG4gIGlzQmVmb3JlTW9udGgoZGF0ZTogQ2FuZHlEYXRlVHlwZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzQmVmb3JlKGRhdGUsICdtb250aCcpO1xuICB9XG5cbiAgaXNCZWZvcmVEYXkoZGF0ZTogQ2FuZHlEYXRlVHlwZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzQmVmb3JlKGRhdGUsICdkYXknKTtcbiAgfVxuXG4gIC8vIEVxdWFsIHRvIHRvZGF5IGFjY3VyYXRlIHRvIFwiZGF5XCJcbiAgaXNUb2RheSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNUb2RheSh0aGlzLm5hdGl2ZURhdGUpO1xuICB9XG5cbiAgaXNWYWxpZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNWYWxpZCh0aGlzLm5hdGl2ZURhdGUpO1xuICB9XG5cbiAgaXNGaXJzdERheU9mTW9udGgoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzRmlyc3REYXlPZk1vbnRoKHRoaXMubmF0aXZlRGF0ZSk7XG4gIH1cblxuICBpc0xhc3REYXlPZk1vbnRoKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc0xhc3REYXlPZk1vbnRoKHRoaXMubmF0aXZlRGF0ZSk7XG4gIH1cblxuICBwcml2YXRlIHRvTmF0aXZlRGF0ZShkYXRlOiBOelNhZmVBbnkpOiBEYXRlIHtcbiAgICByZXR1cm4gZGF0ZSBpbnN0YW5jZW9mIENhbmR5RGF0ZSA/IGRhdGUubmF0aXZlRGF0ZSA6IGRhdGU7XG4gIH1cbn1cbiJdfQ==