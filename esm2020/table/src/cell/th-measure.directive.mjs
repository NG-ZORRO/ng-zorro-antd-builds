/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { isNil } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
export class NzThMeasureDirective {
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.changes$ = new Subject();
        this.nzWidth = null;
        this.colspan = null;
        this.colSpan = null;
        this.rowspan = null;
        this.rowSpan = null;
    }
    ngOnChanges(changes) {
        const { nzWidth, colspan, rowspan, colSpan, rowSpan } = changes;
        if (colspan || colSpan) {
            const col = this.colspan || this.colSpan;
            if (!isNil(col)) {
                this.renderer.setAttribute(this.elementRef.nativeElement, 'colspan', `${col}`);
            }
            else {
                this.renderer.removeAttribute(this.elementRef.nativeElement, 'colspan');
            }
        }
        if (rowspan || rowSpan) {
            const row = this.rowspan || this.rowSpan;
            if (!isNil(row)) {
                this.renderer.setAttribute(this.elementRef.nativeElement, 'rowspan', `${row}`);
            }
            else {
                this.renderer.removeAttribute(this.elementRef.nativeElement, 'rowspan');
            }
        }
        if (nzWidth || colspan) {
            this.changes$.next();
        }
    }
}
NzThMeasureDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzThMeasureDirective, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NzThMeasureDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzThMeasureDirective, selector: "th", inputs: { nzWidth: "nzWidth", colspan: "colspan", colSpan: "colSpan", rowspan: "rowspan", rowSpan: "rowSpan" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzThMeasureDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'th'
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }]; }, propDecorators: { nzWidth: [{
                type: Input
            }], colspan: [{
                type: Input
            }], colSpan: [{
                type: Input
            }], rowspan: [{
                type: Input
            }], rowSpan: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGgtbWVhc3VyZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb21wb25lbnRzL3RhYmxlL3NyYy9jZWxsL3RoLW1lYXN1cmUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQWMsS0FBSyxFQUF1QyxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFLaEQsTUFBTSxPQUFPLG9CQUFvQjtJQU8vQixZQUFvQixRQUFtQixFQUFVLFVBQXNCO1FBQW5ELGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBTnZFLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ2hCLFlBQU8sR0FBa0IsSUFBSSxDQUFDO1FBQzlCLFlBQU8sR0FBMkIsSUFBSSxDQUFDO1FBQ3ZDLFlBQU8sR0FBMkIsSUFBSSxDQUFDO1FBQ3ZDLFlBQU8sR0FBMkIsSUFBSSxDQUFDO1FBQ3ZDLFlBQU8sR0FBMkIsSUFBSSxDQUFDO0lBQzBCLENBQUM7SUFDM0UsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ2hFLElBQUksT0FBTyxJQUFJLE9BQU8sRUFBRTtZQUN0QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDZixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2FBQ2hGO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3pFO1NBQ0Y7UUFDRCxJQUFJLE9BQU8sSUFBSSxPQUFPLEVBQUU7WUFDdEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQzthQUNoRjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN6RTtTQUNGO1FBQ0QsSUFBSSxPQUFPLElBQUksT0FBTyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDdEI7SUFDSCxDQUFDOztpSEE3QlUsb0JBQW9CO3FHQUFwQixvQkFBb0I7MkZBQXBCLG9CQUFvQjtrQkFIaEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsSUFBSTtpQkFDZjt5SEFHVSxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBSZW5kZXJlcjIsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgaXNOaWwgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RoJ1xufSlcbmV4cG9ydCBjbGFzcyBOelRoTWVhc3VyZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIGNoYW5nZXMkID0gbmV3IFN1YmplY3QoKTtcbiAgQElucHV0KCkgbnpXaWR0aDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGNvbHNwYW46IHN0cmluZyB8IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBjb2xTcGFuOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcm93c3Bhbjogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHJvd1NwYW46IHN0cmluZyB8IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbnpXaWR0aCwgY29sc3Bhbiwgcm93c3BhbiwgY29sU3Bhbiwgcm93U3BhbiB9ID0gY2hhbmdlcztcbiAgICBpZiAoY29sc3BhbiB8fCBjb2xTcGFuKSB7XG4gICAgICBjb25zdCBjb2wgPSB0aGlzLmNvbHNwYW4gfHwgdGhpcy5jb2xTcGFuO1xuICAgICAgaWYgKCFpc05pbChjb2wpKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnY29sc3BhbicsIGAke2NvbH1gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnY29sc3BhbicpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocm93c3BhbiB8fCByb3dTcGFuKSB7XG4gICAgICBjb25zdCByb3cgPSB0aGlzLnJvd3NwYW4gfHwgdGhpcy5yb3dTcGFuO1xuICAgICAgaWYgKCFpc05pbChyb3cpKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAncm93c3BhbicsIGAke3Jvd31gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAncm93c3BhbicpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAobnpXaWR0aCB8fCBjb2xzcGFuKSB7XG4gICAgICB0aGlzLmNoYW5nZXMkLm5leHQoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==