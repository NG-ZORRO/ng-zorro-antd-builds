/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Pipe } from '@angular/core';
// Regular Expressions for parsing tags and attributes
const SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
// ! to ~ is the ASCII range.
const NON_ALPHANUMERIC_REGEXP = /([^\#-~ |!])/g;
/**
 * Escapes all potentially dangerous characters, so that the
 * resulting string can be safely inserted into attribute or
 * element text.
 */
function encodeEntities(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(SURROGATE_PAIR_REGEXP, (match) => {
        const hi = match.charCodeAt(0);
        const low = match.charCodeAt(1);
        return `&#${(hi - 0xd800) * 0x400 + (low - 0xdc00) + 0x10000};`;
    })
        .replace(NON_ALPHANUMERIC_REGEXP, (match) => `&#${match.charCodeAt(0)};`)
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
export class NzHighlightPipe {
    constructor() {
        this.UNIQUE_WRAPPERS = ['##==-open_tag-==##', '##==-close_tag-==##'];
    }
    transform(value, highlightValue, flags, klass) {
        if (!highlightValue) {
            return value;
        }
        // Escapes regex keyword to interpret these characters literally
        const searchValue = new RegExp(highlightValue.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$&'), flags);
        const wrapValue = value.replace(searchValue, `${this.UNIQUE_WRAPPERS[0]}$&${this.UNIQUE_WRAPPERS[1]}`);
        return encodeEntities(wrapValue)
            .replace(new RegExp(this.UNIQUE_WRAPPERS[0], 'g'), klass ? `<span class="${klass}">` : '<span>')
            .replace(new RegExp(this.UNIQUE_WRAPPERS[1], 'g'), '</span>');
    }
}
NzHighlightPipe.decorators = [
    { type: Pipe, args: [{
                name: 'nzHighlight',
                pure: true
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvcmUvaGlnaGxpZ2h0L2hpZ2hsaWdodC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBELHNEQUFzRDtBQUN0RCxNQUFNLHFCQUFxQixHQUFHLGlDQUFpQyxDQUFDO0FBQ2hFLDZCQUE2QjtBQUM3QixNQUFNLHVCQUF1QixHQUFHLGVBQWUsQ0FBQztBQUVoRDs7OztHQUlHO0FBQ0gsU0FBUyxjQUFjLENBQUMsS0FBYTtJQUNuQyxPQUFPLEtBQUs7U0FDVCxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztTQUN0QixPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNoRCxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsT0FBTyxLQUFLLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxPQUFPLEdBQUcsQ0FBQztJQUNsRSxDQUFDLENBQUM7U0FDRCxPQUFPLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUFDLEtBQUssS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1NBQ2hGLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO1NBQ3JCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDM0IsQ0FBQztBQU1ELE1BQU0sT0FBTyxlQUFlO0lBSjVCO1FBS1Usb0JBQWUsR0FBcUIsQ0FBQyxvQkFBb0IsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0lBYzVGLENBQUM7SUFaQyxTQUFTLENBQUMsS0FBYSxFQUFFLGNBQXNCLEVBQUUsS0FBYyxFQUFFLEtBQWM7UUFDN0UsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNuQixPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsZ0VBQWdFO1FBQ2hFLE1BQU0sV0FBVyxHQUFHLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLEVBQUUsTUFBTSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEcsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZHLE9BQU8sY0FBYyxDQUFDLFNBQVMsQ0FBQzthQUM3QixPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO2FBQy9GLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7OztZQWxCRixJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLElBQUksRUFBRSxJQUFJO2FBQ1giLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8vIFJlZ3VsYXIgRXhwcmVzc2lvbnMgZm9yIHBhcnNpbmcgdGFncyBhbmQgYXR0cmlidXRlc1xuY29uc3QgU1VSUk9HQVRFX1BBSVJfUkVHRVhQID0gL1tcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl0vZztcbi8vICEgdG8gfiBpcyB0aGUgQVNDSUkgcmFuZ2UuXG5jb25zdCBOT05fQUxQSEFOVU1FUklDX1JFR0VYUCA9IC8oW15cXCMtfiB8IV0pL2c7XG5cbi8qKlxuICogRXNjYXBlcyBhbGwgcG90ZW50aWFsbHkgZGFuZ2Vyb3VzIGNoYXJhY3RlcnMsIHNvIHRoYXQgdGhlXG4gKiByZXN1bHRpbmcgc3RyaW5nIGNhbiBiZSBzYWZlbHkgaW5zZXJ0ZWQgaW50byBhdHRyaWJ1dGUgb3JcbiAqIGVsZW1lbnQgdGV4dC5cbiAqL1xuZnVuY3Rpb24gZW5jb2RlRW50aXRpZXModmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiB2YWx1ZVxuICAgIC5yZXBsYWNlKC8mL2csICcmYW1wOycpXG4gICAgLnJlcGxhY2UoU1VSUk9HQVRFX1BBSVJfUkVHRVhQLCAobWF0Y2g6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgaGkgPSBtYXRjaC5jaGFyQ29kZUF0KDApO1xuICAgICAgY29uc3QgbG93ID0gbWF0Y2guY2hhckNvZGVBdCgxKTtcbiAgICAgIHJldHVybiBgJiMkeyhoaSAtIDB4ZDgwMCkgKiAweDQwMCArIChsb3cgLSAweGRjMDApICsgMHgxMDAwMH07YDtcbiAgICB9KVxuICAgIC5yZXBsYWNlKE5PTl9BTFBIQU5VTUVSSUNfUkVHRVhQLCAobWF0Y2g6IHN0cmluZykgPT4gYCYjJHttYXRjaC5jaGFyQ29kZUF0KDApfTtgKVxuICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpO1xufVxuXG5AUGlwZSh7XG4gIG5hbWU6ICduekhpZ2hsaWdodCcsXG4gIHB1cmU6IHRydWVcbn0pXG5leHBvcnQgY2xhc3MgTnpIaWdobGlnaHRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHByaXZhdGUgVU5JUVVFX1dSQVBQRVJTOiBbc3RyaW5nLCBzdHJpbmddID0gWycjIz09LW9wZW5fdGFnLT09IyMnLCAnIyM9PS1jbG9zZV90YWctPT0jIyddO1xuXG4gIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nLCBoaWdobGlnaHRWYWx1ZTogc3RyaW5nLCBmbGFncz86IHN0cmluZywga2xhc3M/OiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAoIWhpZ2hsaWdodFZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gRXNjYXBlcyByZWdleCBrZXl3b3JkIHRvIGludGVycHJldCB0aGVzZSBjaGFyYWN0ZXJzIGxpdGVyYWxseVxuICAgIGNvbnN0IHNlYXJjaFZhbHVlID0gbmV3IFJlZ0V4cChoaWdobGlnaHRWYWx1ZS5yZXBsYWNlKC8oWy4qKz9ePSE6JHt9KCl8W1xcXVxcL1xcXFxdKS9nLCAnXFxcXCQmJyksIGZsYWdzKTtcbiAgICBjb25zdCB3cmFwVmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHNlYXJjaFZhbHVlLCBgJHt0aGlzLlVOSVFVRV9XUkFQUEVSU1swXX0kJiR7dGhpcy5VTklRVUVfV1JBUFBFUlNbMV19YCk7XG4gICAgcmV0dXJuIGVuY29kZUVudGl0aWVzKHdyYXBWYWx1ZSlcbiAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5VTklRVUVfV1JBUFBFUlNbMF0sICdnJyksIGtsYXNzID8gYDxzcGFuIGNsYXNzPVwiJHtrbGFzc31cIj5gIDogJzxzcGFuPicpXG4gICAgICAucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMuVU5JUVVFX1dSQVBQRVJTWzFdLCAnZycpLCAnPC9zcGFuPicpO1xuICB9XG59XG4iXX0=