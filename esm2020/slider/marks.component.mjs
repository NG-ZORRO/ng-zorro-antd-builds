import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class NzSliderMarksComponent {
    constructor() {
        this.lowerBound = null;
        this.upperBound = null;
        this.marksArray = [];
        this.vertical = false;
        this.included = false;
        this.marks = [];
    }
    ngOnChanges(changes) {
        const { marksArray, lowerBound, upperBound, reverse } = changes;
        if (marksArray || reverse) {
            this.buildMarks();
        }
        if (marksArray || lowerBound || upperBound || reverse) {
            this.togglePointActive();
        }
    }
    trackById(_index, mark) {
        return mark.value;
    }
    buildMarks() {
        const range = this.max - this.min;
        this.marks = this.marksArray.map(mark => {
            const { value, offset, config } = mark;
            const style = this.getMarkStyles(value, range, config);
            const label = isConfigObject(config) ? config.label : config;
            return {
                label,
                offset,
                style,
                value,
                config,
                active: false
            };
        });
    }
    getMarkStyles(value, range, config) {
        let style;
        const markValue = this.reverse ? this.max + this.min - value : value;
        if (this.vertical) {
            style = {
                marginBottom: '-50%',
                bottom: `${((markValue - this.min) / range) * 100}%`
            };
        }
        else {
            style = {
                transform: `translate3d(-50%, 0, 0)`,
                left: `${((markValue - this.min) / range) * 100}%`
            };
        }
        if (isConfigObject(config) && config.style) {
            style = { ...style, ...config.style };
        }
        return style;
    }
    togglePointActive() {
        if (this.marks && this.lowerBound !== null && this.upperBound !== null) {
            this.marks.forEach(mark => {
                const value = mark.value;
                const isActive = (!this.included && value === this.upperBound) ||
                    (this.included && value <= this.upperBound && value >= this.lowerBound);
                mark.active = isActive;
            });
        }
    }
}
NzSliderMarksComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSliderMarksComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzSliderMarksComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSliderMarksComponent, selector: "nz-slider-marks", inputs: { lowerBound: "lowerBound", upperBound: "upperBound", marksArray: "marksArray", min: "min", max: "max", vertical: "vertical", included: "included", reverse: "reverse" }, exportAs: ["nzSliderMarks"], usesOnChanges: true, ngImport: i0, template: `
    <div class="ant-slider-mark">
      <span
        class="ant-slider-mark-text"
        *ngFor="let attr of marks; trackBy: trackById"
        [class.ant-slider-mark-active]="attr.active"
        [ngStyle]="attr.style!"
        [innerHTML]="attr.label"
      ></span>
    </div>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzSliderMarksComponent.prototype, "vertical", void 0);
__decorate([
    InputBoolean()
], NzSliderMarksComponent.prototype, "included", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSliderMarksComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    selector: 'nz-slider-marks',
                    exportAs: 'nzSliderMarks',
                    template: `
    <div class="ant-slider-mark">
      <span
        class="ant-slider-mark-text"
        *ngFor="let attr of marks; trackBy: trackById"
        [class.ant-slider-mark-active]="attr.active"
        [ngStyle]="attr.style!"
        [innerHTML]="attr.label"
      ></span>
    </div>
  `
                }]
        }], propDecorators: { lowerBound: [{
                type: Input
            }], upperBound: [{
                type: Input
            }], marksArray: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], vertical: [{
                type: Input
            }], included: [{
                type: Input
            }], reverse: [{
                type: Input
            }] } });
function isConfigObject(config) {
    return typeof config !== 'string';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9zbGlkZXIvbWFya3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBNEIsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHdkgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7QUFzQnZELE1BQU0sT0FBTyxzQkFBc0I7SUFsQm5DO1FBc0JXLGVBQVUsR0FBa0IsSUFBSSxDQUFDO1FBQ2pDLGVBQVUsR0FBa0IsSUFBSSxDQUFDO1FBQ2pDLGVBQVUsR0FBcUIsRUFBRSxDQUFDO1FBR2xCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUcxQyxVQUFLLEdBQXNCLEVBQUUsQ0FBQztLQXdFL0I7SUF0RUMsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFFaEUsSUFBSSxVQUFVLElBQUksT0FBTyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQjtRQUVELElBQUksVUFBVSxJQUFJLFVBQVUsSUFBSSxVQUFVLElBQUksT0FBTyxFQUFFO1lBQ3JELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFjLEVBQUUsSUFBcUI7UUFDN0MsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFTyxVQUFVO1FBQ2hCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUVsQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3RDLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQztZQUN2QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDdkQsTUFBTSxLQUFLLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFFN0QsT0FBTztnQkFDTCxLQUFLO2dCQUNMLE1BQU07Z0JBQ04sS0FBSztnQkFDTCxLQUFLO2dCQUNMLE1BQU07Z0JBQ04sTUFBTSxFQUFFLEtBQUs7YUFDZCxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sYUFBYSxDQUFDLEtBQWEsRUFBRSxLQUFhLEVBQUUsTUFBYztRQUNoRSxJQUFJLEtBQUssQ0FBQztRQUNWLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUVyRSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsS0FBSyxHQUFHO2dCQUNOLFlBQVksRUFBRSxNQUFNO2dCQUNwQixNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUc7YUFDckQsQ0FBQztTQUNIO2FBQU07WUFDTCxLQUFLLEdBQUc7Z0JBQ04sU0FBUyxFQUFFLHlCQUF5QjtnQkFDcEMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHO2FBQ25ELENBQUM7U0FDSDtRQUVELElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDMUMsS0FBSyxHQUFHLEVBQUUsR0FBRyxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDdkM7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFTyxpQkFBaUI7UUFDdkIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFO1lBQ3RFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUN6QixNQUFNLFFBQVEsR0FDWixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQztvQkFDN0MsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsVUFBVyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsVUFBVyxDQUFDLENBQUM7Z0JBRTVFLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzttSEFwRlUsc0JBQXNCO3VHQUF0QixzQkFBc0IsMlJBWnZCOzs7Ozs7Ozs7O0dBVVQ7QUFXd0I7SUFBZixZQUFZLEVBQUU7d0RBQWtCO0FBQ2pCO0lBQWYsWUFBWSxFQUFFO3dEQUFrQjsyRkFWL0Isc0JBQXNCO2tCQWxCbEMsU0FBUzttQkFBQztvQkFDVCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7R0FVVDtpQkFDRjs4QkFLVSxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUNtQixRQUFRO3NCQUFoQyxLQUFLO2dCQUNtQixRQUFRO3NCQUFoQyxLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSzs7QUE0RVIsU0FBUyxjQUFjLENBQUMsTUFBYztJQUNwQyxPQUFPLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQztBQUNwQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOZ1N0eWxlSW50ZXJmYWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuaW1wb3J0IHsgTnpEaXNwbGF5ZWRNYXJrLCBOekV4dGVuZGVkTWFyaywgTnpNYXJrLCBOek1hcmtPYmogfSBmcm9tICcuL3R5cGluZ3MnO1xuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBzZWxlY3RvcjogJ256LXNsaWRlci1tYXJrcycsXG4gIGV4cG9ydEFzOiAnbnpTbGlkZXJNYXJrcycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFudC1zbGlkZXItbWFya1wiPlxuICAgICAgPHNwYW5cbiAgICAgICAgY2xhc3M9XCJhbnQtc2xpZGVyLW1hcmstdGV4dFwiXG4gICAgICAgICpuZ0Zvcj1cImxldCBhdHRyIG9mIG1hcmtzOyB0cmFja0J5OiB0cmFja0J5SWRcIlxuICAgICAgICBbY2xhc3MuYW50LXNsaWRlci1tYXJrLWFjdGl2ZV09XCJhdHRyLmFjdGl2ZVwiXG4gICAgICAgIFtuZ1N0eWxlXT1cImF0dHIuc3R5bGUhXCJcbiAgICAgICAgW2lubmVySFRNTF09XCJhdHRyLmxhYmVsXCJcbiAgICAgID48L3NwYW4+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTnpTbGlkZXJNYXJrc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV92ZXJ0aWNhbDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfaW5jbHVkZWQ6IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBsb3dlckJvdW5kOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgdXBwZXJCb3VuZDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG1hcmtzQXJyYXk6IE56RXh0ZW5kZWRNYXJrW10gPSBbXTtcbiAgQElucHV0KCkgbWluITogbnVtYmVyO1xuICBASW5wdXQoKSBtYXghOiBudW1iZXI7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSB2ZXJ0aWNhbCA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgaW5jbHVkZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgcmV2ZXJzZSE6IGJvb2xlYW47XG5cbiAgbWFya3M6IE56RGlzcGxheWVkTWFya1tdID0gW107XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbWFya3NBcnJheSwgbG93ZXJCb3VuZCwgdXBwZXJCb3VuZCwgcmV2ZXJzZSB9ID0gY2hhbmdlcztcblxuICAgIGlmIChtYXJrc0FycmF5IHx8IHJldmVyc2UpIHtcbiAgICAgIHRoaXMuYnVpbGRNYXJrcygpO1xuICAgIH1cblxuICAgIGlmIChtYXJrc0FycmF5IHx8IGxvd2VyQm91bmQgfHwgdXBwZXJCb3VuZCB8fCByZXZlcnNlKSB7XG4gICAgICB0aGlzLnRvZ2dsZVBvaW50QWN0aXZlKCk7XG4gICAgfVxuICB9XG5cbiAgdHJhY2tCeUlkKF9pbmRleDogbnVtYmVyLCBtYXJrOiBOekRpc3BsYXllZE1hcmspOiBudW1iZXIge1xuICAgIHJldHVybiBtYXJrLnZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZE1hcmtzKCk6IHZvaWQge1xuICAgIGNvbnN0IHJhbmdlID0gdGhpcy5tYXggLSB0aGlzLm1pbjtcblxuICAgIHRoaXMubWFya3MgPSB0aGlzLm1hcmtzQXJyYXkubWFwKG1hcmsgPT4ge1xuICAgICAgY29uc3QgeyB2YWx1ZSwgb2Zmc2V0LCBjb25maWcgfSA9IG1hcms7XG4gICAgICBjb25zdCBzdHlsZSA9IHRoaXMuZ2V0TWFya1N0eWxlcyh2YWx1ZSwgcmFuZ2UsIGNvbmZpZyk7XG4gICAgICBjb25zdCBsYWJlbCA9IGlzQ29uZmlnT2JqZWN0KGNvbmZpZykgPyBjb25maWcubGFiZWwgOiBjb25maWc7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxhYmVsLFxuICAgICAgICBvZmZzZXQsXG4gICAgICAgIHN0eWxlLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICBhY3RpdmU6IGZhbHNlXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRNYXJrU3R5bGVzKHZhbHVlOiBudW1iZXIsIHJhbmdlOiBudW1iZXIsIGNvbmZpZzogTnpNYXJrKTogTmdTdHlsZUludGVyZmFjZSB7XG4gICAgbGV0IHN0eWxlO1xuICAgIGNvbnN0IG1hcmtWYWx1ZSA9IHRoaXMucmV2ZXJzZSA/IHRoaXMubWF4ICsgdGhpcy5taW4gLSB2YWx1ZSA6IHZhbHVlO1xuXG4gICAgaWYgKHRoaXMudmVydGljYWwpIHtcbiAgICAgIHN0eWxlID0ge1xuICAgICAgICBtYXJnaW5Cb3R0b206ICctNTAlJyxcbiAgICAgICAgYm90dG9tOiBgJHsoKG1hcmtWYWx1ZSAtIHRoaXMubWluKSAvIHJhbmdlKSAqIDEwMH0lYFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUgPSB7XG4gICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKC01MCUsIDAsIDApYCxcbiAgICAgICAgbGVmdDogYCR7KChtYXJrVmFsdWUgLSB0aGlzLm1pbikgLyByYW5nZSkgKiAxMDB9JWBcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKGlzQ29uZmlnT2JqZWN0KGNvbmZpZykgJiYgY29uZmlnLnN0eWxlKSB7XG4gICAgICBzdHlsZSA9IHsgLi4uc3R5bGUsIC4uLmNvbmZpZy5zdHlsZSB9O1xuICAgIH1cblxuICAgIHJldHVybiBzdHlsZTtcbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlUG9pbnRBY3RpdmUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubWFya3MgJiYgdGhpcy5sb3dlckJvdW5kICE9PSBudWxsICYmIHRoaXMudXBwZXJCb3VuZCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5tYXJrcy5mb3JFYWNoKG1hcmsgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IG1hcmsudmFsdWU7XG4gICAgICAgIGNvbnN0IGlzQWN0aXZlID1cbiAgICAgICAgICAoIXRoaXMuaW5jbHVkZWQgJiYgdmFsdWUgPT09IHRoaXMudXBwZXJCb3VuZCkgfHxcbiAgICAgICAgICAodGhpcy5pbmNsdWRlZCAmJiB2YWx1ZSA8PSB0aGlzLnVwcGVyQm91bmQhICYmIHZhbHVlID49IHRoaXMubG93ZXJCb3VuZCEpO1xuXG4gICAgICAgIG1hcmsuYWN0aXZlID0gaXNBY3RpdmU7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNDb25maWdPYmplY3QoY29uZmlnOiBOek1hcmspOiBjb25maWcgaXMgTnpNYXJrT2JqIHtcbiAgcmV0dXJuIHR5cGVvZiBjb25maWcgIT09ICdzdHJpbmcnO1xufVxuIl19