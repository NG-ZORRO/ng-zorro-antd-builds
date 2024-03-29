/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Host, Optional } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./date-picker.component";
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class NzMonthPickerComponent {
    constructor(datePicker) {
        this.datePicker = datePicker;
        this.datePicker.nzMode = 'month';
    }
}
NzMonthPickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMonthPickerComponent, deps: [{ token: i1.NzDatePickerComponent, host: true, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NzMonthPickerComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzMonthPickerComponent, selector: "nz-month-picker", exportAs: ["nzMonthPicker"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMonthPickerComponent, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-month-picker',
                    exportAs: 'nzMonthPicker'
                }]
        }], ctorParameters: function () { return [{ type: i1.NzDatePickerComponent, decorators: [{
                    type: Optional
                }, {
                    type: Host
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvZGF0ZS1waWNrZXIvbW9udGgtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQVExRCxrRUFBa0U7QUFDbEUsTUFBTSxPQUFPLHNCQUFzQjtJQUNqQyxZQUF1QyxVQUFpQztRQUFqQyxlQUFVLEdBQVYsVUFBVSxDQUF1QjtRQUN0RSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7SUFDbkMsQ0FBQzs7bUhBSFUsc0JBQXNCO3VHQUF0QixzQkFBc0I7MkZBQXRCLHNCQUFzQjtrQkFMbEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsZUFBZTtpQkFDMUI7OzBCQUdjLFFBQVE7OzBCQUFJLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56RGF0ZVBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS1waWNrZXIuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbnotbW9udGgtcGlja2VyJyxcbiAgZXhwb3J0QXM6ICduek1vbnRoUGlja2VyJ1xufSlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvZGlyZWN0aXZlLWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIE56TW9udGhQaWNrZXJDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASG9zdCgpIHB1YmxpYyBkYXRlUGlja2VyOiBOekRhdGVQaWNrZXJDb21wb25lbnQpIHtcbiAgICB0aGlzLmRhdGVQaWNrZXIubnpNb2RlID0gJ21vbnRoJztcbiAgfVxufVxuIl19