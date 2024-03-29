/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class NzToCssUnitPipe {
    transform(value, defaultUnit = 'px') {
        const absoluteLengthUnit = ['cm', 'mm', 'Q', 'in', 'pc', 'pt', 'px'];
        const relativeLengthUnit = ['em', 'ex', 'ch', 'rem', '1h', 'vw', 'vh', 'vmin', 'vmax'];
        const percentagesUnit = ['%'];
        const listOfUnit = [...absoluteLengthUnit, ...relativeLengthUnit, ...percentagesUnit];
        let unit = 'px';
        if (listOfUnit.some(u => u === defaultUnit)) {
            unit = defaultUnit;
        }
        return typeof value === 'number' ? `${value}${unit}` : `${value}`;
    }
}
NzToCssUnitPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzToCssUnitPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
NzToCssUnitPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzToCssUnitPipe, name: "nzToCssUnit" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzToCssUnitPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'nzToCssUnit'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotY3NzLXVuaXQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvcGlwZXMvbnotY3NzLXVuaXQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFLcEQsTUFBTSxPQUFPLGVBQWU7SUFDMUIsU0FBUyxDQUFDLEtBQXNCLEVBQUUsY0FBc0IsSUFBSTtRQUMxRCxNQUFNLGtCQUFrQixHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckUsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkYsTUFBTSxlQUFlLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQUcsa0JBQWtCLEVBQUUsR0FBRyxrQkFBa0IsRUFBRSxHQUFHLGVBQWUsQ0FBQyxDQUFDO1FBQ3RGLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssV0FBVyxDQUFDLEVBQUU7WUFDM0MsSUFBSSxHQUFHLFdBQVcsQ0FBQztTQUNwQjtRQUNELE9BQU8sT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQztJQUNwRSxDQUFDOzs0R0FYVSxlQUFlOzBHQUFmLGVBQWU7MkZBQWYsZUFBZTtrQkFIM0IsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsYUFBYTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ256VG9Dc3NVbml0J1xufSlcbmV4cG9ydCBjbGFzcyBOelRvQ3NzVW5pdFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcsIGRlZmF1bHRVbml0OiBzdHJpbmcgPSAncHgnKTogc3RyaW5nIHtcbiAgICBjb25zdCBhYnNvbHV0ZUxlbmd0aFVuaXQgPSBbJ2NtJywgJ21tJywgJ1EnLCAnaW4nLCAncGMnLCAncHQnLCAncHgnXTtcbiAgICBjb25zdCByZWxhdGl2ZUxlbmd0aFVuaXQgPSBbJ2VtJywgJ2V4JywgJ2NoJywgJ3JlbScsICcxaCcsICd2dycsICd2aCcsICd2bWluJywgJ3ZtYXgnXTtcbiAgICBjb25zdCBwZXJjZW50YWdlc1VuaXQgPSBbJyUnXTtcbiAgICBjb25zdCBsaXN0T2ZVbml0ID0gWy4uLmFic29sdXRlTGVuZ3RoVW5pdCwgLi4ucmVsYXRpdmVMZW5ndGhVbml0LCAuLi5wZXJjZW50YWdlc1VuaXRdO1xuICAgIGxldCB1bml0ID0gJ3B4JztcbiAgICBpZiAobGlzdE9mVW5pdC5zb21lKHUgPT4gdSA9PT0gZGVmYXVsdFVuaXQpKSB7XG4gICAgICB1bml0ID0gZGVmYXVsdFVuaXQ7XG4gICAgfVxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInID8gYCR7dmFsdWV9JHt1bml0fWAgOiBgJHt2YWx1ZX1gO1xuICB9XG59XG4iXX0=