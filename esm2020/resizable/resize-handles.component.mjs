/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./resize-handle.component";
import * as i2 from "@angular/common";
export const DEFAULT_RESIZE_DIRECTION = [
    'bottomRight',
    'topRight',
    'bottomLeft',
    'topLeft',
    'bottom',
    'right',
    'top',
    'left'
];
export class NzResizeHandlesComponent {
    constructor() {
        this.nzDirections = DEFAULT_RESIZE_DIRECTION;
        this.directions = new Set(this.nzDirections);
    }
    ngOnChanges(changes) {
        if (changes.nzDirections) {
            this.directions = new Set(changes.nzDirections.currentValue);
        }
    }
}
NzResizeHandlesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeHandlesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzResizeHandlesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzResizeHandlesComponent, selector: "nz-resize-handles", inputs: { nzDirections: "nzDirections" }, exportAs: ["nzResizeHandles"], usesOnChanges: true, ngImport: i0, template: ` <nz-resize-handle *ngFor="let dir of directions" [nzDirection]="dir"></nz-resize-handle> `, isInline: true, components: [{ type: i1.NzResizeHandleComponent, selector: "nz-resize-handle, [nz-resize-handle]", inputs: ["nzDirection"], outputs: ["nzMouseDown"], exportAs: ["nzResizeHandle"] }], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResizeHandlesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-resize-handles',
                    exportAs: 'nzResizeHandles',
                    template: ` <nz-resize-handle *ngFor="let dir of directions" [nzDirection]="dir"></nz-resize-handle> `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { nzDirections: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLWhhbmRsZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9yZXNpemFibGUvcmVzaXplLWhhbmRsZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQzs7OztBQUlwRyxNQUFNLENBQUMsTUFBTSx3QkFBd0IsR0FBd0I7SUFDM0QsYUFBYTtJQUNiLFVBQVU7SUFDVixZQUFZO0lBQ1osU0FBUztJQUNULFFBQVE7SUFDUixPQUFPO0lBQ1AsS0FBSztJQUNMLE1BQU07Q0FDUCxDQUFDO0FBUUYsTUFBTSxPQUFPLHdCQUF3QjtJQUluQztRQUhTLGlCQUFZLEdBQXdCLHdCQUF3QixDQUFDO1FBSXBFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUM5RDtJQUNILENBQUM7O3FIQVpVLHdCQUF3Qjt5R0FBeEIsd0JBQXdCLHVKQUh6Qiw0RkFBNEY7MkZBRzNGLHdCQUF3QjtrQkFOcEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsNEZBQTRGO29CQUN0RyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7MEVBRVUsWUFBWTtzQkFBcEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpSZXNpemVEaXJlY3Rpb24gfSBmcm9tICcuL3Jlc2l6ZS1oYW5kbGUuY29tcG9uZW50JztcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkVTSVpFX0RJUkVDVElPTjogTnpSZXNpemVEaXJlY3Rpb25bXSA9IFtcbiAgJ2JvdHRvbVJpZ2h0JyxcbiAgJ3RvcFJpZ2h0JyxcbiAgJ2JvdHRvbUxlZnQnLFxuICAndG9wTGVmdCcsXG4gICdib3R0b20nLFxuICAncmlnaHQnLFxuICAndG9wJyxcbiAgJ2xlZnQnXG5dO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1yZXNpemUtaGFuZGxlcycsXG4gIGV4cG9ydEFzOiAnbnpSZXNpemVIYW5kbGVzJyxcbiAgdGVtcGxhdGU6IGAgPG56LXJlc2l6ZS1oYW5kbGUgKm5nRm9yPVwibGV0IGRpciBvZiBkaXJlY3Rpb25zXCIgW256RGlyZWN0aW9uXT1cImRpclwiPjwvbnotcmVzaXplLWhhbmRsZT4gYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTnpSZXNpemVIYW5kbGVzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgbnpEaXJlY3Rpb25zOiBOelJlc2l6ZURpcmVjdGlvbltdID0gREVGQVVMVF9SRVNJWkVfRElSRUNUSU9OO1xuICBkaXJlY3Rpb25zOiBTZXQ8TnpSZXNpemVEaXJlY3Rpb24+O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZGlyZWN0aW9ucyA9IG5ldyBTZXQodGhpcy5uekRpcmVjdGlvbnMpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLm56RGlyZWN0aW9ucykge1xuICAgICAgdGhpcy5kaXJlY3Rpb25zID0gbmV3IFNldChjaGFuZ2VzLm56RGlyZWN0aW9ucy5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgfVxufVxuIl19