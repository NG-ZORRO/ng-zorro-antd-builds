/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Pipe } from '@angular/core';
import { sum } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
export class NzAggregatePipe {
    transform(value, method) {
        if (!Array.isArray(value)) {
            return value;
        }
        if (value.length === 0) {
            return undefined;
        }
        switch (method) {
            case 'sum':
                return sum(value);
            case 'avg':
                return sum(value) / value.length;
            case 'max':
                return Math.max(...value);
            case 'min':
                return Math.min(...value);
            default:
                throw Error(`Invalid Pipe Arguments: Aggregate pipe doesn't support this type`);
        }
    }
}
NzAggregatePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAggregatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
NzAggregatePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAggregatePipe, name: "nzAggregate" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAggregatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'nzAggregate'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotYWdncmVnYXRlLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3BpcGVzL256LWFnZ3JlZ2F0ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFPOUMsTUFBTSxPQUFPLGVBQWU7SUFDMUIsU0FBUyxDQUFDLEtBQWUsRUFBRSxNQUF1QjtRQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN6QixPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN0QixPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUVELFFBQVEsTUFBTSxFQUFFO1lBQ2QsS0FBSyxLQUFLO2dCQUNSLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BCLEtBQUssS0FBSztnQkFDUixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQ25DLEtBQUssS0FBSztnQkFDUixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztZQUM1QixLQUFLLEtBQUs7Z0JBQ1IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDNUI7Z0JBQ0UsTUFBTSxLQUFLLENBQUMsa0VBQWtFLENBQUMsQ0FBQztTQUNuRjtJQUNILENBQUM7OzRHQXRCVSxlQUFlOzBHQUFmLGVBQWU7MkZBQWYsZUFBZTtrQkFIM0IsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsYUFBYTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IHN1bSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuZXhwb3J0IHR5cGUgQWdncmVnYXRlTWV0aG9kID0gJ3N1bScgfCAnbWF4JyB8ICdtaW4nIHwgJ2F2Zyc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ256QWdncmVnYXRlJ1xufSlcbmV4cG9ydCBjbGFzcyBOekFnZ3JlZ2F0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlOiBudW1iZXJbXSwgbWV0aG9kOiBBZ2dyZWdhdGVNZXRob2QpOiB1bmRlZmluZWQgfCBudW1iZXIge1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgICBjYXNlICdzdW0nOlxuICAgICAgICByZXR1cm4gc3VtKHZhbHVlKTtcbiAgICAgIGNhc2UgJ2F2Zyc6XG4gICAgICAgIHJldHVybiBzdW0odmFsdWUpIC8gdmFsdWUubGVuZ3RoO1xuICAgICAgY2FzZSAnbWF4JzpcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KC4uLnZhbHVlKTtcbiAgICAgIGNhc2UgJ21pbic6XG4gICAgICAgIHJldHVybiBNYXRoLm1pbiguLi52YWx1ZSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBQaXBlIEFyZ3VtZW50czogQWdncmVnYXRlIHBpcGUgZG9lc24ndCBzdXBwb3J0IHRoaXMgdHlwZWApO1xuICAgIH1cbiAgfVxufVxuIl19