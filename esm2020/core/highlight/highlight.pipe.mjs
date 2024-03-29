/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
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
NzHighlightPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzHighlightPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
NzHighlightPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzHighlightPipe, name: "nzHighlight" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzHighlightPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'nzHighlight',
                    pure: true
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvcmUvaGlnaGxpZ2h0L2hpZ2hsaWdodC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUVwRCxzREFBc0Q7QUFDdEQsTUFBTSxxQkFBcUIsR0FBRyxpQ0FBaUMsQ0FBQztBQUNoRSw2QkFBNkI7QUFDN0IsTUFBTSx1QkFBdUIsR0FBRyxlQUFlLENBQUM7QUFFaEQ7Ozs7R0FJRztBQUNILFNBQVMsY0FBYyxDQUFDLEtBQWE7SUFDbkMsT0FBTyxLQUFLO1NBQ1QsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUM7U0FDdEIsT0FBTyxDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDaEQsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sS0FBSyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsT0FBTyxHQUFHLENBQUM7SUFDbEUsQ0FBQyxDQUFDO1NBQ0QsT0FBTyxDQUFDLHVCQUF1QixFQUFFLENBQUMsS0FBYSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztTQUNoRixPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQztTQUNyQixPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLENBQUM7QUFNRCxNQUFNLE9BQU8sZUFBZTtJQUo1QjtRQUtVLG9CQUFlLEdBQXFCLENBQUMsb0JBQW9CLEVBQUUscUJBQXFCLENBQUMsQ0FBQztLQWMzRjtJQVpDLFNBQVMsQ0FBQyxLQUFhLEVBQUUsY0FBc0IsRUFBRSxLQUFjLEVBQUUsS0FBYztRQUM3RSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ25CLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxnRUFBZ0U7UUFDaEUsTUFBTSxXQUFXLEdBQUcsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsRUFBRSxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwRyxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkcsT0FBTyxjQUFjLENBQUMsU0FBUyxDQUFDO2FBQzdCLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7YUFDL0YsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDbEUsQ0FBQzs7NEdBZFUsZUFBZTswR0FBZixlQUFlOzJGQUFmLGVBQWU7a0JBSjNCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRSxJQUFJO2lCQUNYIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyBSZWd1bGFyIEV4cHJlc3Npb25zIGZvciBwYXJzaW5nIHRhZ3MgYW5kIGF0dHJpYnV0ZXNcbmNvbnN0IFNVUlJPR0FURV9QQUlSX1JFR0VYUCA9IC9bXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdL2c7XG4vLyAhIHRvIH4gaXMgdGhlIEFTQ0lJIHJhbmdlLlxuY29uc3QgTk9OX0FMUEhBTlVNRVJJQ19SRUdFWFAgPSAvKFteXFwjLX4gfCFdKS9nO1xuXG4vKipcbiAqIEVzY2FwZXMgYWxsIHBvdGVudGlhbGx5IGRhbmdlcm91cyBjaGFyYWN0ZXJzLCBzbyB0aGF0IHRoZVxuICogcmVzdWx0aW5nIHN0cmluZyBjYW4gYmUgc2FmZWx5IGluc2VydGVkIGludG8gYXR0cmlidXRlIG9yXG4gKiBlbGVtZW50IHRleHQuXG4gKi9cbmZ1bmN0aW9uIGVuY29kZUVudGl0aWVzKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gdmFsdWVcbiAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxuICAgIC5yZXBsYWNlKFNVUlJPR0FURV9QQUlSX1JFR0VYUCwgKG1hdGNoOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGhpID0gbWF0Y2guY2hhckNvZGVBdCgwKTtcbiAgICAgIGNvbnN0IGxvdyA9IG1hdGNoLmNoYXJDb2RlQXQoMSk7XG4gICAgICByZXR1cm4gYCYjJHsoaGkgLSAweGQ4MDApICogMHg0MDAgKyAobG93IC0gMHhkYzAwKSArIDB4MTAwMDB9O2A7XG4gICAgfSlcbiAgICAucmVwbGFjZShOT05fQUxQSEFOVU1FUklDX1JFR0VYUCwgKG1hdGNoOiBzdHJpbmcpID0+IGAmIyR7bWF0Y2guY2hhckNvZGVBdCgwKX07YClcbiAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKTtcbn1cblxuQFBpcGUoe1xuICBuYW1lOiAnbnpIaWdobGlnaHQnLFxuICBwdXJlOiB0cnVlXG59KVxuZXhwb3J0IGNsYXNzIE56SGlnaGxpZ2h0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBwcml2YXRlIFVOSVFVRV9XUkFQUEVSUzogW3N0cmluZywgc3RyaW5nXSA9IFsnIyM9PS1vcGVuX3RhZy09PSMjJywgJyMjPT0tY2xvc2VfdGFnLT09IyMnXTtcblxuICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZywgaGlnaGxpZ2h0VmFsdWU6IHN0cmluZywgZmxhZ3M/OiBzdHJpbmcsIGtsYXNzPzogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgaWYgKCFoaWdobGlnaHRWYWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIC8vIEVzY2FwZXMgcmVnZXgga2V5d29yZCB0byBpbnRlcnByZXQgdGhlc2UgY2hhcmFjdGVycyBsaXRlcmFsbHlcbiAgICBjb25zdCBzZWFyY2hWYWx1ZSA9IG5ldyBSZWdFeHAoaGlnaGxpZ2h0VmFsdWUucmVwbGFjZSgvKFsuKis/Xj0hOiR7fSgpfFtcXF1cXC9cXFxcXSkvZywgJ1xcXFwkJicpLCBmbGFncyk7XG4gICAgY29uc3Qgd3JhcFZhbHVlID0gdmFsdWUucmVwbGFjZShzZWFyY2hWYWx1ZSwgYCR7dGhpcy5VTklRVUVfV1JBUFBFUlNbMF19JCYke3RoaXMuVU5JUVVFX1dSQVBQRVJTWzFdfWApO1xuICAgIHJldHVybiBlbmNvZGVFbnRpdGllcyh3cmFwVmFsdWUpXG4gICAgICAucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMuVU5JUVVFX1dSQVBQRVJTWzBdLCAnZycpLCBrbGFzcyA/IGA8c3BhbiBjbGFzcz1cIiR7a2xhc3N9XCI+YCA6ICc8c3Bhbj4nKVxuICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLlVOSVFVRV9XUkFQUEVSU1sxXSwgJ2cnKSwgJzwvc3Bhbj4nKTtcbiAgfVxufVxuIl19