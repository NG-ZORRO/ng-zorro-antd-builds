/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Pipe } from '@angular/core';
import { isNumberFinite, toDecimal } from 'ng-zorro-antd/core/util';
export class NzBytesPipe {
    transform(input, decimal = 0, from = 'B', to) {
        if (!(isNumberFinite(input) && isNumberFinite(decimal) && decimal % 1 === 0 && decimal >= 0)) {
            return input;
        }
        let bytes = input;
        let unit = from;
        while (unit !== 'B') {
            bytes *= 1024;
            unit = NzBytesPipe.formats[unit].prev;
        }
        if (to) {
            const format = NzBytesPipe.formats[to];
            const result = toDecimal(NzBytesPipe.calculateResult(format, bytes), decimal);
            return NzBytesPipe.formatResult(result, to);
        }
        for (const key in NzBytesPipe.formats) {
            if (NzBytesPipe.formats.hasOwnProperty(key)) {
                const format = NzBytesPipe.formats[key];
                if (bytes < format.max) {
                    const result = toDecimal(NzBytesPipe.calculateResult(format, bytes), decimal);
                    return NzBytesPipe.formatResult(result, key);
                }
            }
        }
    }
    static formatResult(result, unit) {
        return `${result} ${unit}`;
    }
    static calculateResult(format, bytes) {
        const prev = format.prev ? NzBytesPipe.formats[format.prev] : undefined;
        return prev ? bytes / prev.max : bytes;
    }
}
NzBytesPipe.formats = {
    B: { max: 1024 },
    kB: { max: Math.pow(1024, 2), prev: 'B' },
    KB: { max: Math.pow(1024, 2), prev: 'B' },
    MB: { max: Math.pow(1024, 3), prev: 'kB' },
    GB: { max: Math.pow(1024, 4), prev: 'MB' },
    TB: { max: Number.MAX_SAFE_INTEGER, prev: 'GB' }
};
NzBytesPipe.decorators = [
    { type: Pipe, args: [{
                name: 'nzBytes'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotYnl0ZXMucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9jb21wb25lbnRzL3BpcGVzLyIsInNvdXJjZXMiOlsibnotYnl0ZXMucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRCxPQUFPLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBT3BFLE1BQU0sT0FBTyxXQUFXO0lBVXRCLFNBQVMsQ0FBQyxLQUFnQixFQUFFLFVBQWtCLENBQUMsRUFBRSxPQUFpQixHQUFHLEVBQUUsRUFBYTtRQUNsRixJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsRUFBRTtZQUM1RixPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixPQUFPLElBQUksS0FBSyxHQUFHLEVBQUU7WUFDbkIsS0FBSyxJQUFJLElBQUksQ0FBQztZQUNkLElBQUksR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUssQ0FBQztTQUN4QztRQUVELElBQUksRUFBRSxFQUFFO1lBQ04sTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUV2QyxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFOUUsT0FBTyxXQUFXLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztTQUM3QztRQUVELEtBQUssTUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtZQUNyQyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQyxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxFQUFFO29CQUN0QixNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBRTlFLE9BQU8sV0FBVyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7aUJBQzlDO2FBQ0Y7U0FDRjtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQWMsRUFBRSxJQUFZO1FBQzlDLE9BQU8sR0FBRyxNQUFNLElBQUksSUFBSSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELE1BQU0sQ0FBQyxlQUFlLENBQUMsTUFBd0MsRUFBRSxLQUFhO1FBQzVFLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDeEUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDekMsQ0FBQzs7QUFoRE0sbUJBQU8sR0FBd0Q7SUFDcEUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtJQUNoQixFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUN6QyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUN6QyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtJQUMxQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtJQUMxQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLGdCQUFnQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7Q0FDakQsQ0FBQzs7WUFYSCxJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLFNBQVM7YUFDaEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgaXNOdW1iZXJGaW5pdGUsIHRvRGVjaW1hbCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuZXhwb3J0IHR5cGUgQnl0ZVVuaXQgPSAnQicgfCAna0InIHwgJ0tCJyB8ICdNQicgfCAnR0InIHwgJ1RCJztcblxuQFBpcGUoe1xuICBuYW1lOiAnbnpCeXRlcydcbn0pXG5leHBvcnQgY2xhc3MgTnpCeXRlc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgc3RhdGljIGZvcm1hdHM6IHsgW2tleTogc3RyaW5nXTogeyBtYXg6IG51bWJlcjsgcHJldj86IEJ5dGVVbml0IH0gfSA9IHtcbiAgICBCOiB7IG1heDogMTAyNCB9LFxuICAgIGtCOiB7IG1heDogTWF0aC5wb3coMTAyNCwgMiksIHByZXY6ICdCJyB9LFxuICAgIEtCOiB7IG1heDogTWF0aC5wb3coMTAyNCwgMiksIHByZXY6ICdCJyB9LFxuICAgIE1COiB7IG1heDogTWF0aC5wb3coMTAyNCwgMyksIHByZXY6ICdrQicgfSxcbiAgICBHQjogeyBtYXg6IE1hdGgucG93KDEwMjQsIDQpLCBwcmV2OiAnTUInIH0sXG4gICAgVEI6IHsgbWF4OiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiwgcHJldjogJ0dCJyB9XG4gIH07XG5cbiAgdHJhbnNmb3JtKGlucHV0OiBOelNhZmVBbnksIGRlY2ltYWw6IG51bWJlciA9IDAsIGZyb206IEJ5dGVVbml0ID0gJ0InLCB0bz86IEJ5dGVVbml0KTogTnpTYWZlQW55IHtcbiAgICBpZiAoIShpc051bWJlckZpbml0ZShpbnB1dCkgJiYgaXNOdW1iZXJGaW5pdGUoZGVjaW1hbCkgJiYgZGVjaW1hbCAlIDEgPT09IDAgJiYgZGVjaW1hbCA+PSAwKSkge1xuICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH1cblxuICAgIGxldCBieXRlcyA9IGlucHV0O1xuICAgIGxldCB1bml0ID0gZnJvbTtcbiAgICB3aGlsZSAodW5pdCAhPT0gJ0InKSB7XG4gICAgICBieXRlcyAqPSAxMDI0O1xuICAgICAgdW5pdCA9IE56Qnl0ZXNQaXBlLmZvcm1hdHNbdW5pdF0ucHJldiE7XG4gICAgfVxuXG4gICAgaWYgKHRvKSB7XG4gICAgICBjb25zdCBmb3JtYXQgPSBOekJ5dGVzUGlwZS5mb3JtYXRzW3RvXTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gdG9EZWNpbWFsKE56Qnl0ZXNQaXBlLmNhbGN1bGF0ZVJlc3VsdChmb3JtYXQsIGJ5dGVzKSwgZGVjaW1hbCk7XG5cbiAgICAgIHJldHVybiBOekJ5dGVzUGlwZS5mb3JtYXRSZXN1bHQocmVzdWx0LCB0byk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gTnpCeXRlc1BpcGUuZm9ybWF0cykge1xuICAgICAgaWYgKE56Qnl0ZXNQaXBlLmZvcm1hdHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBjb25zdCBmb3JtYXQgPSBOekJ5dGVzUGlwZS5mb3JtYXRzW2tleV07XG4gICAgICAgIGlmIChieXRlcyA8IGZvcm1hdC5tYXgpIHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSB0b0RlY2ltYWwoTnpCeXRlc1BpcGUuY2FsY3VsYXRlUmVzdWx0KGZvcm1hdCwgYnl0ZXMpLCBkZWNpbWFsKTtcblxuICAgICAgICAgIHJldHVybiBOekJ5dGVzUGlwZS5mb3JtYXRSZXN1bHQocmVzdWx0LCBrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZvcm1hdFJlc3VsdChyZXN1bHQ6IG51bWJlciwgdW5pdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7cmVzdWx0fSAke3VuaXR9YDtcbiAgfVxuXG4gIHN0YXRpYyBjYWxjdWxhdGVSZXN1bHQoZm9ybWF0OiB7IG1heDogbnVtYmVyOyBwcmV2PzogQnl0ZVVuaXQgfSwgYnl0ZXM6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgcHJldiA9IGZvcm1hdC5wcmV2ID8gTnpCeXRlc1BpcGUuZm9ybWF0c1tmb3JtYXQucHJldl0gOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHByZXYgPyBieXRlcyAvIHByZXYubWF4IDogYnl0ZXM7XG4gIH1cbn1cbiJdfQ==