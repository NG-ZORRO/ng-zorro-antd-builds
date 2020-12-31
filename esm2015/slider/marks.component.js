/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
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
        const { marksArray, lowerBound, upperBound } = changes;
        if (marksArray) {
            this.buildMarks();
        }
        if (marksArray || lowerBound || upperBound) {
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
        if (this.vertical) {
            style = {
                marginBottom: '-50%',
                bottom: `${((value - this.min) / range) * 100}%`
            };
        }
        else {
            style = {
                transform: `translate3d(-50%, 0, 0)`,
                left: `${((value - this.min) / range) * 100}%`
            };
        }
        if (isConfigObject(config) && config.style) {
            style = Object.assign(Object.assign({}, style), config.style);
        }
        return style;
    }
    togglePointActive() {
        if (this.marks && this.lowerBound !== null && this.upperBound !== null) {
            this.marks.forEach(mark => {
                const value = mark.value;
                const isActive = (!this.included && value === this.upperBound) || (this.included && value <= this.upperBound && value >= this.lowerBound);
                mark.active = isActive;
            });
        }
    }
}
NzSliderMarksComponent.decorators = [
    { type: Component, args: [{
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
      >
      </span>
    </div>
  `
            },] }
];
NzSliderMarksComponent.propDecorators = {
    lowerBound: [{ type: Input }],
    upperBound: [{ type: Input }],
    marksArray: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    vertical: [{ type: Input }],
    included: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSliderMarksComponent.prototype, "vertical", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSliderMarksComponent.prototype, "included", void 0);
function isConfigObject(config) {
    return typeof config !== 'string';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL2NvbXBvbmVudHMvc2xpZGVyLyIsInNvdXJjZXMiOlsibWFya3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBNEIsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBdUJ2RCxNQUFNLE9BQU8sc0JBQXNCO0lBbkJuQztRQXVCVyxlQUFVLEdBQWtCLElBQUksQ0FBQztRQUNqQyxlQUFVLEdBQWtCLElBQUksQ0FBQztRQUNqQyxlQUFVLEdBQXFCLEVBQUUsQ0FBQztRQUdsQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFMUMsVUFBSyxHQUFzQixFQUFFLENBQUM7SUFzRWhDLENBQUM7SUFwRUMsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUV2RCxJQUFJLFVBQVUsRUFBRTtZQUNkLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQjtRQUVELElBQUksVUFBVSxJQUFJLFVBQVUsSUFBSSxVQUFVLEVBQUU7WUFDMUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQWMsRUFBRSxJQUFxQjtRQUM3QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVPLFVBQVU7UUFDaEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBRWxDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENB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dXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOZ1N0eWxlSW50ZXJmYWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuaW1wb3J0IHsgTnpEaXNwbGF5ZWRNYXJrLCBOekV4dGVuZGVkTWFyaywgTnpNYXJrLCBOek1hcmtPYmogfSBmcm9tICcuL3R5cGluZ3MnO1xuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBzZWxlY3RvcjogJ256LXNsaWRlci1tYXJrcycsXG4gIGV4cG9ydEFzOiAnbnpTbGlkZXJNYXJrcycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFudC1zbGlkZXItbWFya1wiPlxuICAgICAgPHNwYW5cbiAgICAgICAgY2xhc3M9XCJhbnQtc2xpZGVyLW1hcmstdGV4dFwiXG4gICAgICAgICpuZ0Zvcj1cImxldCBhdHRyIG9mIG1hcmtzOyB0cmFja0J5OiB0cmFja0J5SWRcIlxuICAgICAgICBbY2xhc3MuYW50LXNsaWRlci1tYXJrLWFjdGl2ZV09XCJhdHRyLmFjdGl2ZVwiXG4gICAgICAgIFtuZ1N0eWxlXT1cImF0dHIuc3R5bGUhXCJcbiAgICAgICAgW2lubmVySFRNTF09XCJhdHRyLmxhYmVsXCJcbiAgICAgID5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOelNsaWRlck1hcmtzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3ZlcnRpY2FsOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9pbmNsdWRlZDogQm9vbGVhbklucHV0O1xuXG4gIEBJbnB1dCgpIGxvd2VyQm91bmQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSB1cHBlckJvdW5kOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbWFya3NBcnJheTogTnpFeHRlbmRlZE1hcmtbXSA9IFtdO1xuICBASW5wdXQoKSBtaW4hOiBudW1iZXI7XG4gIEBJbnB1dCgpIG1heCE6IG51bWJlcjtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIHZlcnRpY2FsID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBpbmNsdWRlZCA9IGZhbHNlO1xuXG4gIG1hcmtzOiBOekRpc3BsYXllZE1hcmtbXSA9IFtdO1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG1hcmtzQXJyYXksIGxvd2VyQm91bmQsIHVwcGVyQm91bmQgfSA9IGNoYW5nZXM7XG5cbiAgICBpZiAobWFya3NBcnJheSkge1xuICAgICAgdGhpcy5idWlsZE1hcmtzKCk7XG4gICAgfVxuXG4gICAgaWYgKG1hcmtzQXJyYXkgfHwgbG93ZXJCb3VuZCB8fCB1cHBlckJvdW5kKSB7XG4gICAgICB0aGlzLnRvZ2dsZVBvaW50QWN0aXZlKCk7XG4gICAgfVxuICB9XG5cbiAgdHJhY2tCeUlkKF9pbmRleDogbnVtYmVyLCBtYXJrOiBOekRpc3BsYXllZE1hcmspOiBudW1iZXIge1xuICAgIHJldHVybiBtYXJrLnZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZE1hcmtzKCk6IHZvaWQge1xuICAgIGNvbnN0IHJhbmdlID0gdGhpcy5tYXggLSB0aGlzLm1pbjtcblxuICAgIHRoaXMubWFya3MgPSB0aGlzLm1hcmtzQXJyYXkubWFwKG1hcmsgPT4ge1xuICAgICAgY29uc3QgeyB2YWx1ZSwgb2Zmc2V0LCBjb25maWcgfSA9IG1hcms7XG4gICAgICBjb25zdCBzdHlsZSA9IHRoaXMuZ2V0TWFya1N0eWxlcyh2YWx1ZSwgcmFuZ2UsIGNvbmZpZyk7XG4gICAgICBjb25zdCBsYWJlbCA9IGlzQ29uZmlnT2JqZWN0KGNvbmZpZykgPyBjb25maWcubGFiZWwgOiBjb25maWc7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxhYmVsLFxuICAgICAgICBvZmZzZXQsXG4gICAgICAgIHN0eWxlLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICBhY3RpdmU6IGZhbHNlXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRNYXJrU3R5bGVzKHZhbHVlOiBudW1iZXIsIHJhbmdlOiBudW1iZXIsIGNvbmZpZzogTnpNYXJrKTogTmdTdHlsZUludGVyZmFjZSB7XG4gICAgbGV0IHN0eWxlO1xuXG4gICAgaWYgKHRoaXMudmVydGljYWwpIHtcbiAgICAgIHN0eWxlID0ge1xuICAgICAgICBtYXJnaW5Cb3R0b206ICctNTAlJyxcbiAgICAgICAgYm90dG9tOiBgJHsoKHZhbHVlIC0gdGhpcy5taW4pIC8gcmFuZ2UpICogMTAwfSVgXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZSA9IHtcbiAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoLTUwJSwgMCwgMClgLFxuICAgICAgICBsZWZ0OiBgJHsoKHZhbHVlIC0gdGhpcy5taW4pIC8gcmFuZ2UpICogMTAwfSVgXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChpc0NvbmZpZ09iamVjdChjb25maWcpICYmIGNvbmZpZy5zdHlsZSkge1xuICAgICAgc3R5bGUgPSB7IC4uLnN0eWxlLCAuLi5jb25maWcuc3R5bGUgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3R5bGU7XG4gIH1cblxuICBwcml2YXRlIHRvZ2dsZVBvaW50QWN0aXZlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1hcmtzICYmIHRoaXMubG93ZXJCb3VuZCAhPT0gbnVsbCAmJiB0aGlzLnVwcGVyQm91bmQgIT09IG51bGwpIHtcbiAgICAgIHRoaXMubWFya3MuZm9yRWFjaChtYXJrID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBtYXJrLnZhbHVlO1xuICAgICAgICBjb25zdCBpc0FjdGl2ZSA9XG4gICAgICAgICAgKCF0aGlzLmluY2x1ZGVkICYmIHZhbHVlID09PSB0aGlzLnVwcGVyQm91bmQpIHx8ICh0aGlzLmluY2x1ZGVkICYmIHZhbHVlIDw9IHRoaXMudXBwZXJCb3VuZCEgJiYgdmFsdWUgPj0gdGhpcy5sb3dlckJvdW5kISk7XG5cbiAgICAgICAgbWFyay5hY3RpdmUgPSBpc0FjdGl2ZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpc0NvbmZpZ09iamVjdChjb25maWc6IE56TWFyayk6IGNvbmZpZyBpcyBOek1hcmtPYmoge1xuICByZXR1cm4gdHlwZW9mIGNvbmZpZyAhPT0gJ3N0cmluZyc7XG59XG4iXX0=