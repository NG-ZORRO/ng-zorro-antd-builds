/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import differenceInCalendarMonths from 'date-fns/differenceInCalendarMonths';
import differenceInCalendarYears from 'date-fns/differenceInCalendarYears';
import differenceInHours from 'date-fns/differenceInHours';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import isFirstDayOfMonth from 'date-fns/isFirstDayOfMonth';
import isLastDayOfMonth from 'date-fns/isLastDayOfMonth';
import isSameDay from 'date-fns/isSameDay';
import isSameHour from 'date-fns/isSameHour';
import isSameMinute from 'date-fns/isSameMinute';
import isSameMonth from 'date-fns/isSameMonth';
import isSameSecond from 'date-fns/isSameSecond';
import isSameYear from 'date-fns/isSameYear';
import isToday from 'date-fns/isToday';
import isValid from 'date-fns/isValid';
import setDay from 'date-fns/setDay';
import setMonth from 'date-fns/setMonth';
import setYear from 'date-fns/setYear';
import startOfMonth from 'date-fns/startOfMonth';
import startOfWeek from 'date-fns/startOfWeek';
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
        if (activePart === 'left') {
            newEnd = newStart.add(1, type);
        }
        else {
            newStart = newEnd.add(-1, type);
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
                break;
            case 'year':
                return this.addYears(amount);
                break;
            case 'month':
                return this.addMonths(amount);
                break;
            default:
                return this.addMonths(amount);
                break;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuZHktZGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29yZS90aW1lL2NhbmR5LWRhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxTQUFTLE1BQU0sb0JBQW9CLENBQUM7QUFDM0MsT0FBTyxRQUFRLE1BQU0sbUJBQW1CLENBQUM7QUFDekMsT0FBTyx3QkFBd0IsTUFBTSxtQ0FBbUMsQ0FBQztBQUN6RSxPQUFPLDBCQUEwQixNQUFNLHFDQUFxQyxDQUFDO0FBQzdFLE9BQU8seUJBQXlCLE1BQU0sb0NBQW9DLENBQUM7QUFDM0UsT0FBTyxpQkFBaUIsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLG1CQUFtQixNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sbUJBQW1CLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxpQkFBaUIsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLGdCQUFnQixNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sU0FBUyxNQUFNLG9CQUFvQixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLHFCQUFxQixDQUFDO0FBQzdDLE9BQU8sWUFBWSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sWUFBWSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sVUFBVSxNQUFNLHFCQUFxQixDQUFDO0FBQzdDLE9BQU8sT0FBTyxNQUFNLGtCQUFrQixDQUFDO0FBQ3ZDLE9BQU8sT0FBTyxNQUFNLGtCQUFrQixDQUFDO0FBQ3ZDLE9BQU8sTUFBTSxNQUFNLGlCQUFpQixDQUFDO0FBQ3JDLE9BQU8sUUFBUSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pDLE9BQU8sT0FBTyxNQUFNLGtCQUFrQixDQUFDO0FBQ3ZDLE9BQU8sWUFBWSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8s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QUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxtQ0FBbUM7SUFDbkMsT0FBTztRQUNMLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsT0FBTztRQUNMLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELGdCQUFnQjtRQUNkLE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTyxZQUFZLENBQUMsSUFBZTtRQUNsQyxPQUFPLElBQUksWUFBWSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUM1RCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgYWRkTW9udGhzIGZyb20gJ2RhdGUtZm5zL2FkZE1vbnRocyc7XG5pbXBvcnQgYWRkWWVhcnMgZnJvbSAnZGF0ZS1mbnMvYWRkWWVhcnMnO1xuaW1wb3J0IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyBmcm9tICdkYXRlLWZucy9kaWZmZXJlbmNlSW5DYWxlbmRhckRheXMnO1xuaW1wb3J0IGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzIGZyb20gJ2RhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzJztcbmltcG9ydCBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzIGZyb20gJ2RhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyWWVhcnMnO1xuaW1wb3J0IGRpZmZlcmVuY2VJbkhvdXJzIGZyb20gJ2RhdGUtZm5zL2RpZmZlcmVuY2VJbkhvdXJzJztcbmltcG9ydCBkaWZmZXJlbmNlSW5NaW51dGVzIGZyb20gJ2RhdGUtZm5zL2RpZmZlcmVuY2VJbk1pbnV0ZXMnO1xuaW1wb3J0IGRpZmZlcmVuY2VJblNlY29uZHMgZnJvbSAnZGF0ZS1mbnMvZGlmZmVyZW5jZUluU2Vjb25kcyc7XG5pbXBvcnQgaXNGaXJzdERheU9mTW9udGggZnJvbSAnZGF0ZS1mbnMvaXNGaXJzdERheU9mTW9udGgnO1xuaW1wb3J0IGlzTGFzdERheU9mTW9udGggZnJvbSAnZGF0ZS1mbnMvaXNMYXN0RGF5T2ZNb250aCc7XG5pbXBvcnQgaXNTYW1lRGF5IGZyb20gJ2RhdGUtZm5zL2lzU2FtZURheSc7XG5pbXBvcnQgaXNTYW1lSG91ciBmcm9tICdkYXRlLWZucy9pc1NhbWVIb3VyJztcbmltcG9ydCBpc1NhbWVNaW51dGUgZnJvbSAnZGF0ZS1mbnMvaXNTYW1lTWludXRlJztcbmltcG9ydCBpc1NhbWVNb250aCBmcm9tICdkYXRlLWZucy9pc1NhbWVNb250aCc7XG5pbXBvcnQgaXNTYW1lU2Vjb25kIGZyb20gJ2RhdGUtZm5zL2lzU2FtZVNlY29uZCc7XG5pbXBvcnQgaXNTYW1lWWVhciBmcm9tICdkYXRlLWZucy9pc1NhbWVZZWFyJztcbmltcG9ydCBpc1RvZGF5IGZyb20gJ2RhdGUtZm5zL2lzVG9kYXknO1xuaW1wb3J0IGlzVmFsaWQgZnJvbSAnZGF0ZS1mbnMvaXNWYWxpZCc7XG5pbXBvcnQgc2V0RGF5IGZyb20gJ2RhdGUtZm5zL3NldERheSc7XG5pbXBvcnQgc2V0TW9udGggZnJvbSAnZGF0ZS1mbnMvc2V0TW9udGgnO1xuaW1wb3J0IHNldFllYXIgZnJvbSAnZGF0ZS1mbnMvc2V0WWVhcic7XG5pbXBvcnQgc3RhcnRPZk1vbnRoIGZyb20gJ2RhdGUtZm5zL3N0YXJ0T2ZNb250aCc7XG5pbXBvcnQgc3RhcnRPZldlZWsgZnJvbSAnZGF0ZS1mbnMvc3RhcnRPZldlZWsnO1xuaW1wb3J0IHsgd2FybiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9sb2dnZXInO1xuaW1wb3J0IHsgSW5kZXhhYmxlT2JqZWN0LCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5leHBvcnQgdHlwZSBDYW5keURhdGVNb2RlID0gJ2RlY2FkZScgfCAneWVhcicgfCAnbW9udGgnIHwgJ2RheScgfCAnaG91cicgfCAnbWludXRlJyB8ICdzZWNvbmQnO1xuZXhwb3J0IHR5cGUgTm9ybWFsaXplZE1vZGUgPSAnZGVjYWRlJyB8ICd5ZWFyJyB8ICdtb250aCc7XG5leHBvcnQgdHlwZSBXZWVrRGF5SW5kZXggPSAwIHwgMSB8IDIgfCAzIHwgNCB8IDUgfCA2O1xuZXhwb3J0IHR5cGUgQ2FuZHlEYXRlVHlwZSA9IENhbmR5RGF0ZSB8IERhdGUgfCBudWxsO1xuZXhwb3J0IHR5cGUgU2luZ2xlVmFsdWUgPSBDYW5keURhdGUgfCBudWxsO1xuZXhwb3J0IHR5cGUgQ29tcGF0aWJsZVZhbHVlID0gU2luZ2xlVmFsdWUgfCBTaW5nbGVWYWx1ZVtdO1xuXG5leHBvcnQgZnVuY3Rpb24gd3JvbmdTb3J0T3JkZXIocmFuZ2VWYWx1ZTogU2luZ2xlVmFsdWVbXSk6IGJvb2xlYW4ge1xuICBjb25zdCBbc3RhcnQsIGVuZF0gPSByYW5nZVZhbHVlO1xuICByZXR1cm4gISFzdGFydCAmJiAhIWVuZCAmJiBlbmQuaXNCZWZvcmVEYXkoc3RhcnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplUmFuZ2VWYWx1ZShcbiAgdmFsdWU6IFNpbmdsZVZhbHVlW10sXG4gIGhhc1RpbWVQaWNrZXI6IGJvb2xlYW4sXG4gIHR5cGU6IE5vcm1hbGl6ZWRNb2RlID0gJ21vbnRoJyxcbiAgYWN0aXZlUGFydDogJ2xlZnQnIHwgJ3JpZ2h0JyA9ICdsZWZ0J1xuKTogQ2FuZHlEYXRlW10ge1xuICBjb25zdCBbc3RhcnQsIGVuZF0gPSB2YWx1ZTtcbiAgbGV0IG5ld1N0YXJ0OiBDYW5keURhdGUgPSBzdGFydCB8fCBuZXcgQ2FuZHlEYXRlKCk7XG4gIGxldCBuZXdFbmQ6IENhbmR5RGF0ZSA9IGVuZCB8fCAoaGFzVGltZVBpY2tlciA/IG5ld1N0YXJ0IDogbmV3U3RhcnQuYWRkKDEsIHR5cGUpKTtcblxuICBpZiAoc3RhcnQgJiYgIWVuZCkge1xuICAgIG5ld1N0YXJ0ID0gc3RhcnQ7XG4gICAgbmV3RW5kID0gaGFzVGltZVBpY2tlciA/IHN0YXJ0IDogc3RhcnQuYWRkKDEsIHR5cGUpO1xuICB9IGVsc2UgaWYgKCFzdGFydCAmJiBlbmQpIHtcbiAgICBuZXdTdGFydCA9IGhhc1RpbWVQaWNrZXIgPyBlbmQgOiBlbmQuYWRkKC0xLCB0eXBlKTtcbiAgICBuZXdFbmQgPSBlbmQ7XG4gIH0gZWxzZSBpZiAoc3RhcnQgJiYgZW5kICYmICFoYXNUaW1lUGlja2VyKSB7XG4gICAgaWYgKGFjdGl2ZVBhcnQgPT09ICdsZWZ0Jykge1xuICAgICAgbmV3RW5kID0gbmV3U3RhcnQuYWRkKDEsIHR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdTdGFydCA9IG5ld0VuZC5hZGQoLTEsIHR5cGUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gW25ld1N0YXJ0LCBuZXdFbmRdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvbmVEYXRlKHZhbHVlOiBDb21wYXRpYmxlVmFsdWUpOiBDb21wYXRpYmxlVmFsdWUge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUubWFwKHYgPT4gKHYgaW5zdGFuY2VvZiBDYW5keURhdGUgPyB2LmNsb25lKCkgOiBudWxsKSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQ2FuZHlEYXRlID8gdmFsdWUuY2xvbmUoKSA6IG51bGw7XG4gIH1cbn1cblxuLyoqXG4gKiBXcmFwcGluZyBraW5kIEFQSXMgZm9yIGRhdGUgb3BlcmF0aW5nIGFuZCB1bmlmeVxuICogTk9URTogZXZlcnkgbmV3IEFQSSByZXR1cm4gbmV3IENhbmR5RGF0ZSBvYmplY3Qgd2l0aG91dCBzaWRlIGVmZmVjdHMgdG8gdGhlIGZvcm1lciBEYXRlIG9iamVjdFxuICogTk9URTogbW9zdCBBUElzIGFyZSBiYXNlZCBvbiBsb2NhbCB0aW1lIG90aGVyIHRoYW4gY3VzdG9taXplZCBsb2NhbGUgaWQgKHRoaXMgbmVlZHMgdG9iZSBzdXBwb3J0IGluIGZ1dHVyZSlcbiAqIFRPRE86IHN1cHBvcnQgZm9ybWF0KCkgYWdhaW5zdCB0byBhbmd1bGFyJ3MgY29yZSBBUElcbiAqL1xuZXhwb3J0IGNsYXNzIENhbmR5RGF0ZSBpbXBsZW1lbnRzIEluZGV4YWJsZU9iamVjdCB7XG4gIG5hdGl2ZURhdGU6IERhdGU7XG4gIC8vIGxvY2FsZTogc3RyaW5nOyAvLyBDdXN0b20gc3BlY2lmaWVkIGxvY2FsZSBJRFxuXG4gIGNvbnN0cnVjdG9yKGRhdGU/OiBEYXRlIHwgc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgaWYgKGRhdGUpIHtcbiAgICAgIGlmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICB0aGlzLm5hdGl2ZURhdGUgPSBkYXRlO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGRhdGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHdhcm4oJ1RoZSBzdHJpbmcgdHlwZSBpcyBub3QgcmVjb21tZW5kZWQgZm9yIGRhdGUtcGlja2VyLCB1c2UgXCJEYXRlXCIgdHlwZScpO1xuICAgICAgICB0aGlzLm5hdGl2ZURhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGlucHV0IGRhdGUgdHlwZSBpcyBub3Qgc3VwcG9ydGVkIChcIkRhdGVcIiBpcyBub3cgcmVjb21tZW5kZWQpJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubmF0aXZlRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgY2FsZW5kYXJTdGFydChvcHRpb25zPzogeyB3ZWVrU3RhcnRzT246IFdlZWtEYXlJbmRleCB8IHVuZGVmaW5lZCB9KTogQ2FuZHlEYXRlIHtcbiAgICByZXR1cm4gbmV3IENhbmR5RGF0ZShzdGFydE9mV2VlayhzdGFydE9mTW9udGgodGhpcy5uYXRpdmVEYXRlKSwgb3B0aW9ucykpO1xuICB9XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIHwgTmF0aXZlIHNob3J0Y3V0c1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcXG5cbiAgZ2V0WWVhcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm5hdGl2ZURhdGUuZ2V0RnVsbFllYXIoKTtcbiAgfVxuXG4gIGdldE1vbnRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMubmF0aXZlRGF0ZS5nZXRNb250aCgpO1xuICB9XG5cbiAgZ2V0RGF5KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMubmF0aXZlRGF0ZS5nZXREYXkoKTtcbiAgfVxuXG4gIGdldFRpbWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5uYXRpdmVEYXRlLmdldFRpbWUoKTtcbiAgfVxuXG4gIGdldERhdGUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5uYXRpdmVEYXRlLmdldERhdGUoKTtcbiAgfVxuXG4gIGdldEhvdXJzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMubmF0aXZlRGF0ZS5nZXRIb3VycygpO1xuICB9XG5cbiAgZ2V0TWludXRlcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm5hdGl2ZURhdGUuZ2V0TWludXRlcygpO1xuICB9XG5cbiAgZ2V0U2Vjb25kcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm5hdGl2ZURhdGUuZ2V0U2Vjb25kcygpO1xuICB9XG5cbiAgZ2V0TWlsbGlzZWNvbmRzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMubmF0aXZlRGF0ZS5nZXRNaWxsaXNlY29uZHMoKTtcbiAgfVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyB8IE5ldyBpbXBsZW1lbnRpbmcgQVBJc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICBjbG9uZSgpOiBDYW5keURhdGUge1xuICAgIHJldHVybiBuZXcgQ2FuZHlEYXRlKG5ldyBEYXRlKHRoaXMubmF0aXZlRGF0ZSkpO1xuICB9XG5cbiAgc2V0SG1zKGhvdXI6IG51bWJlciwgbWludXRlOiBudW1iZXIsIHNlY29uZDogbnVtYmVyKTogQ2FuZHlEYXRlIHtcbiAgICBjb25zdCBuZXdEYXRlID0gbmV3IERhdGUodGhpcy5uYXRpdmVEYXRlLnNldEhvdXJzKGhvdXIsIG1pbnV0ZSwgc2Vjb25kKSk7XG4gICAgcmV0dXJuIG5ldyBDYW5keURhdGUobmV3RGF0ZSk7XG4gIH1cblxuICBzZXRZZWFyKHllYXI6IG51bWJlcik6IENhbmR5RGF0ZSB7XG4gICAgcmV0dXJuIG5ldyBDYW5keURhdGUoc2V0WWVhcih0aGlzLm5hdGl2ZURhdGUsIHllYXIpKTtcbiAgfVxuXG4gIGFkZFllYXJzKGFtb3VudDogbnVtYmVyKTogQ2FuZHlEYXRlIHtcbiAgICByZXR1cm4gbmV3IENhbmR5RGF0ZShhZGRZZWFycyh0aGlzLm5hdGl2ZURhdGUsIGFtb3VudCkpO1xuICB9XG5cbiAgLy8gTk9URTogbW9udGggc3RhcnRzIGZyb20gMFxuICAvLyBOT1RFOiBEb24ndCB1c2UgdGhlIG5hdGl2ZSBBUEkgZm9yIG1vbnRoIG1hbmlwdWxhdGlvbiBhcyBpdCBub3QgcmVzdHJpY3QgdGhlIGRhdGUgd2hlbiBpdCBvdmVyZmxvd3MsIGVnLiAobmV3IERhdGUoJzIwMTgtNy0zMScpKS5zZXRNb250aCgxKSB3aWxsIGJlIGRhdGUgb2YgMjAxOC0zLTAzIGluc3RlYWQgb2YgMjAxOC0yLTI4XG4gIHNldE1vbnRoKG1vbnRoOiBudW1iZXIpOiBDYW5keURhdGUge1xuICAgIHJldHVybiBuZXcgQ2FuZHlEYXRlKHNldE1vbnRoKHRoaXMubmF0aXZlRGF0ZSwgbW9udGgpKTtcbiAgfVxuXG4gIGFkZE1vbnRocyhhbW91bnQ6IG51bWJlcik6IENhbmR5RGF0ZSB7XG4gICAgcmV0dXJuIG5ldyBDYW5keURhdGUoYWRkTW9udGhzKHRoaXMubmF0aXZlRGF0ZSwgYW1vdW50KSk7XG4gIH1cblxuICBzZXREYXkoZGF5OiBudW1iZXIsIG9wdGlvbnM/OiB7IHdlZWtTdGFydHNPbjogV2Vla0RheUluZGV4IH0pOiBDYW5keURhdGUge1xuICAgIHJldHVybiBuZXcgQ2FuZHlEYXRlKHNldERheSh0aGlzLm5hdGl2ZURhdGUsIGRheSwgb3B0aW9ucykpO1xuICB9XG5cbiAgc2V0RGF0ZShhbW91bnQ6IG51bWJlcik6IENhbmR5RGF0ZSB7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHRoaXMubmF0aXZlRGF0ZSk7XG4gICAgZGF0ZS5zZXREYXRlKGFtb3VudCk7XG4gICAgcmV0dXJuIG5ldyBDYW5keURhdGUoZGF0ZSk7XG4gIH1cblxuICBhZGREYXlzKGFtb3VudDogbnVtYmVyKTogQ2FuZHlEYXRlIHtcbiAgICByZXR1cm4gdGhpcy5zZXREYXRlKHRoaXMuZ2V0RGF0ZSgpICsgYW1vdW50KTtcbiAgfVxuXG4gIGFkZChhbW91bnQ6IG51bWJlciwgbW9kZTogTm9ybWFsaXplZE1vZGUpOiBDYW5keURhdGUge1xuICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgY2FzZSAnZGVjYWRlJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkWWVhcnMoYW1vdW50ICogMTApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICByZXR1cm4gdGhpcy5hZGRZZWFycyhhbW91bnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkTW9udGhzKGFtb3VudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkTW9udGhzKGFtb3VudCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlzU2FtZShkYXRlOiBDYW5keURhdGVUeXBlLCBncmFpbjogQ2FuZHlEYXRlTW9kZSA9ICdkYXknKTogYm9vbGVhbiB7XG4gICAgbGV0IGZuO1xuICAgIHN3aXRjaCAoZ3JhaW4pIHtcbiAgICAgIGNhc2UgJ2RlY2FkZSc6XG4gICAgICAgIGZuID0gKHByZTogRGF0ZSwgbmV4dDogRGF0ZSkgPT4gTWF0aC5hYnMocHJlLmdldEZ1bGxZZWFyKCkgLSBuZXh0LmdldEZ1bGxZZWFyKCkpIDwgMTE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgIGZuID0gaXNTYW1lWWVhcjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtb250aCc6XG4gICAgICAgIGZuID0gaXNTYW1lTW9udGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgZm4gPSBpc1NhbWVEYXk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgIGZuID0gaXNTYW1lSG91cjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICBmbiA9IGlzU2FtZU1pbnV0ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICBmbiA9IGlzU2FtZVNlY29uZDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBmbiA9IGlzU2FtZURheTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBmbih0aGlzLm5hdGl2ZURhdGUsIHRoaXMudG9OYXRpdmVEYXRlKGRhdGUpKTtcbiAgfVxuXG4gIGlzU2FtZVllYXIoZGF0ZTogQ2FuZHlEYXRlVHlwZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzU2FtZShkYXRlLCAneWVhcicpO1xuICB9XG5cbiAgaXNTYW1lTW9udGgoZGF0ZTogQ2FuZHlEYXRlVHlwZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzU2FtZShkYXRlLCAnbW9udGgnKTtcbiAgfVxuXG4gIGlzU2FtZURheShkYXRlOiBDYW5keURhdGVUeXBlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNTYW1lKGRhdGUsICdkYXknKTtcbiAgfVxuXG4gIGlzU2FtZUhvdXIoZGF0ZTogQ2FuZHlEYXRlVHlwZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzU2FtZShkYXRlLCAnaG91cicpO1xuICB9XG5cbiAgaXNTYW1lTWludXRlKGRhdGU6IENhbmR5RGF0ZVR5cGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc1NhbWUoZGF0ZSwgJ21pbnV0ZScpO1xuICB9XG5cbiAgaXNTYW1lU2Vjb25kKGRhdGU6IENhbmR5RGF0ZVR5cGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc1NhbWUoZGF0ZSwgJ3NlY29uZCcpO1xuICB9XG5cbiAgaXNCZWZvcmUoZGF0ZTogQ2FuZHlEYXRlVHlwZSwgZ3JhaW46IENhbmR5RGF0ZU1vZGUgPSAnZGF5Jyk6IGJvb2xlYW4ge1xuICAgIGlmIChkYXRlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBmbjtcbiAgICBzd2l0Y2ggKGdyYWluKSB7XG4gICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgZm4gPSBkaWZmZXJlbmNlSW5DYWxlbmRhclllYXJzO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgZm4gPSBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkYXknOlxuICAgICAgICBmbiA9IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgZm4gPSBkaWZmZXJlbmNlSW5Ib3VycztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICBmbiA9IGRpZmZlcmVuY2VJbk1pbnV0ZXM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgZm4gPSBkaWZmZXJlbmNlSW5TZWNvbmRzO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGZuID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIGZuKHRoaXMubmF0aXZlRGF0ZSwgdGhpcy50b05hdGl2ZURhdGUoZGF0ZSkpIDwgMDtcbiAgfVxuXG4gIGlzQmVmb3JlWWVhcihkYXRlOiBDYW5keURhdGVUeXBlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNCZWZvcmUoZGF0ZSwgJ3llYXInKTtcbiAgfVxuXG4gIGlzQmVmb3JlTW9udGgoZGF0ZTogQ2FuZHlEYXRlVHlwZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzQmVmb3JlKGRhdGUsICdtb250aCcpO1xuICB9XG5cbiAgaXNCZWZvcmVEYXkoZGF0ZTogQ2FuZHlEYXRlVHlwZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzQmVmb3JlKGRhdGUsICdkYXknKTtcbiAgfVxuXG4gIC8vIEVxdWFsIHRvIHRvZGF5IGFjY3VyYXRlIHRvIFwiZGF5XCJcbiAgaXNUb2RheSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNUb2RheSh0aGlzLm5hdGl2ZURhdGUpO1xuICB9XG5cbiAgaXNWYWxpZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNWYWxpZCh0aGlzLm5hdGl2ZURhdGUpO1xuICB9XG5cbiAgaXNGaXJzdERheU9mTW9udGgoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzRmlyc3REYXlPZk1vbnRoKHRoaXMubmF0aXZlRGF0ZSk7XG4gIH1cblxuICBpc0xhc3REYXlPZk1vbnRoKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc0xhc3REYXlPZk1vbnRoKHRoaXMubmF0aXZlRGF0ZSk7XG4gIH1cblxuICBwcml2YXRlIHRvTmF0aXZlRGF0ZShkYXRlOiBOelNhZmVBbnkpOiBEYXRlIHtcbiAgICByZXR1cm4gZGF0ZSBpbnN0YW5jZW9mIENhbmR5RGF0ZSA/IGRhdGUubmF0aXZlRGF0ZSA6IGRhdGU7XG4gIH1cbn1cbiJdfQ==