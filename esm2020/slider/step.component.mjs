import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class NzSliderStepComponent {
    constructor() {
        this.lowerBound = null;
        this.upperBound = null;
        this.marksArray = [];
        this.vertical = false;
        this.included = false;
        this.steps = [];
    }
    ngOnChanges(changes) {
        const { marksArray, lowerBound, upperBound, reverse } = changes;
        if (marksArray || reverse) {
            this.buildSteps();
        }
        if (marksArray || lowerBound || upperBound || reverse) {
            this.togglePointActive();
        }
    }
    trackById(_index, step) {
        return step.value;
    }
    buildSteps() {
        const orient = this.vertical ? 'bottom' : 'left';
        this.steps = this.marksArray.map(mark => {
            const { value, config } = mark;
            let offset = mark.offset;
            const range = this.max - this.min;
            if (this.reverse) {
                offset = ((this.max - value) / range) * 100;
            }
            return {
                value,
                offset,
                config,
                active: false,
                style: {
                    [orient]: `${offset}%`
                }
            };
        });
    }
    togglePointActive() {
        if (this.steps && this.lowerBound !== null && this.upperBound !== null) {
            this.steps.forEach(step => {
                const value = step.value;
                const isActive = (!this.included && value === this.upperBound) ||
                    (this.included && value <= this.upperBound && value >= this.lowerBound);
                step.active = isActive;
            });
        }
    }
}
NzSliderStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSliderStepComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzSliderStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSliderStepComponent, selector: "nz-slider-step", inputs: { lowerBound: "lowerBound", upperBound: "upperBound", marksArray: "marksArray", min: "min", max: "max", vertical: "vertical", included: "included", reverse: "reverse" }, exportAs: ["nzSliderStep"], usesOnChanges: true, ngImport: i0, template: `
    <div class="ant-slider-step">
      <span
        class="ant-slider-dot"
        *ngFor="let mark of steps; trackBy: trackById"
        [class.ant-slider-dot-active]="mark.active"
        [ngStyle]="mark.style!"
      ></span>
    </div>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzSliderStepComponent.prototype, "vertical", void 0);
__decorate([
    InputBoolean()
], NzSliderStepComponent.prototype, "included", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSliderStepComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-slider-step',
                    exportAs: 'nzSliderStep',
                    preserveWhitespaces: false,
                    template: `
    <div class="ant-slider-step">
      <span
        class="ant-slider-dot"
        *ngFor="let mark of steps; trackBy: trackById"
        [class.ant-slider-dot-active]="mark.active"
        [ngStyle]="mark.style!"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3NsaWRlci9zdGVwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTRCLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3ZILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7O0FBcUJ2RCxNQUFNLE9BQU8scUJBQXFCO0lBakJsQztRQXFCVyxlQUFVLEdBQWtCLElBQUksQ0FBQztRQUNqQyxlQUFVLEdBQWtCLElBQUksQ0FBQztRQUNqQyxlQUFVLEdBQXFCLEVBQUUsQ0FBQztRQUdsQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFHMUMsVUFBSyxHQUFzQixFQUFFLENBQUM7S0FvRC9CO0lBbERDLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBRWhFLElBQUksVUFBVSxJQUFJLE9BQU8sRUFBRTtZQUN6QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbkI7UUFDRCxJQUFJLFVBQVUsSUFBSSxVQUFVLElBQUksVUFBVSxJQUFJLE9BQU8sRUFBRTtZQUNyRCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUMxQjtJQUNILENBQUM7SUFFRCxTQUFTLENBQUMsTUFBYyxFQUFFLElBQXFCO1FBQzdDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRU8sVUFBVTtRQUNoQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUVqRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3RDLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQy9CLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDekIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBRWxDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDaEIsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQzthQUM3QztZQUVELE9BQU87Z0JBQ0wsS0FBSztnQkFDTCxNQUFNO2dCQUNOLE1BQU07Z0JBQ04sTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsS0FBSyxFQUFFO29CQUNMLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxNQUFNLEdBQUc7aUJBQ3ZCO2FBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLGlCQUFpQjtRQUN2QixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7WUFDdEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3hCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3pCLE1BQU0sUUFBUSxHQUNaLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDO29CQUM3QyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFXLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFXLENBQUMsQ0FBQztnQkFDNUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7O2tIQWhFVSxxQkFBcUI7c0dBQXJCLHFCQUFxQix5UkFYdEI7Ozs7Ozs7OztHQVNUO0FBV3dCO0lBQWYsWUFBWSxFQUFFO3VEQUFrQjtBQUNqQjtJQUFmLFlBQVksRUFBRTt1REFBa0I7MkZBVi9CLHFCQUFxQjtrQkFqQmpDLFNBQVM7bUJBQUM7b0JBQ1QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsY0FBYztvQkFDeEIsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsUUFBUSxFQUFFOzs7Ozs7Ozs7R0FTVDtpQkFDRjs4QkFLVSxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUNtQixRQUFRO3NCQUFoQyxLQUFLO2dCQUNtQixRQUFRO3NCQUFoQyxLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IE56RGlzcGxheWVkU3RlcCwgTnpFeHRlbmRlZE1hcmsgfSBmcm9tICcuL3R5cGluZ3MnO1xuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yOiAnbnotc2xpZGVyLXN0ZXAnLFxuICBleHBvcnRBczogJ256U2xpZGVyU3RlcCcsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJhbnQtc2xpZGVyLXN0ZXBcIj5cbiAgICAgIDxzcGFuXG4gICAgICAgIGNsYXNzPVwiYW50LXNsaWRlci1kb3RcIlxuICAgICAgICAqbmdGb3I9XCJsZXQgbWFyayBvZiBzdGVwczsgdHJhY2tCeTogdHJhY2tCeUlkXCJcbiAgICAgICAgW2NsYXNzLmFudC1zbGlkZXItZG90LWFjdGl2ZV09XCJtYXJrLmFjdGl2ZVwiXG4gICAgICAgIFtuZ1N0eWxlXT1cIm1hcmsuc3R5bGUhXCJcbiAgICAgID48L3NwYW4+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTnpTbGlkZXJTdGVwQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3ZlcnRpY2FsOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9pbmNsdWRlZDogQm9vbGVhbklucHV0O1xuXG4gIEBJbnB1dCgpIGxvd2VyQm91bmQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSB1cHBlckJvdW5kOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbWFya3NBcnJheTogTnpFeHRlbmRlZE1hcmtbXSA9IFtdO1xuICBASW5wdXQoKSBtaW4hOiBudW1iZXI7XG4gIEBJbnB1dCgpIG1heCE6IG51bWJlcjtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIHZlcnRpY2FsID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBpbmNsdWRlZCA9IGZhbHNlO1xuICBASW5wdXQoKSByZXZlcnNlITogYm9vbGVhbjtcblxuICBzdGVwczogTnpEaXNwbGF5ZWRTdGVwW10gPSBbXTtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBtYXJrc0FycmF5LCBsb3dlckJvdW5kLCB1cHBlckJvdW5kLCByZXZlcnNlIH0gPSBjaGFuZ2VzO1xuXG4gICAgaWYgKG1hcmtzQXJyYXkgfHwgcmV2ZXJzZSkge1xuICAgICAgdGhpcy5idWlsZFN0ZXBzKCk7XG4gICAgfVxuICAgIGlmIChtYXJrc0FycmF5IHx8IGxvd2VyQm91bmQgfHwgdXBwZXJCb3VuZCB8fCByZXZlcnNlKSB7XG4gICAgICB0aGlzLnRvZ2dsZVBvaW50QWN0aXZlKCk7XG4gICAgfVxuICB9XG5cbiAgdHJhY2tCeUlkKF9pbmRleDogbnVtYmVyLCBzdGVwOiBOekRpc3BsYXllZFN0ZXApOiBudW1iZXIge1xuICAgIHJldHVybiBzdGVwLnZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZFN0ZXBzKCk6IHZvaWQge1xuICAgIGNvbnN0IG9yaWVudCA9IHRoaXMudmVydGljYWwgPyAnYm90dG9tJyA6ICdsZWZ0JztcblxuICAgIHRoaXMuc3RlcHMgPSB0aGlzLm1hcmtzQXJyYXkubWFwKG1hcmsgPT4ge1xuICAgICAgY29uc3QgeyB2YWx1ZSwgY29uZmlnIH0gPSBtYXJrO1xuICAgICAgbGV0IG9mZnNldCA9IG1hcmsub2Zmc2V0O1xuICAgICAgY29uc3QgcmFuZ2UgPSB0aGlzLm1heCAtIHRoaXMubWluO1xuXG4gICAgICBpZiAodGhpcy5yZXZlcnNlKSB7XG4gICAgICAgIG9mZnNldCA9ICgodGhpcy5tYXggLSB2YWx1ZSkgLyByYW5nZSkgKiAxMDA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlLFxuICAgICAgICBvZmZzZXQsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBbb3JpZW50XTogYCR7b2Zmc2V0fSVgXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHRvZ2dsZVBvaW50QWN0aXZlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN0ZXBzICYmIHRoaXMubG93ZXJCb3VuZCAhPT0gbnVsbCAmJiB0aGlzLnVwcGVyQm91bmQgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuc3RlcHMuZm9yRWFjaChzdGVwID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBzdGVwLnZhbHVlO1xuICAgICAgICBjb25zdCBpc0FjdGl2ZSA9XG4gICAgICAgICAgKCF0aGlzLmluY2x1ZGVkICYmIHZhbHVlID09PSB0aGlzLnVwcGVyQm91bmQpIHx8XG4gICAgICAgICAgKHRoaXMuaW5jbHVkZWQgJiYgdmFsdWUgPD0gdGhpcy51cHBlckJvdW5kISAmJiB2YWx1ZSA+PSB0aGlzLmxvd2VyQm91bmQhKTtcbiAgICAgICAgc3RlcC5hY3RpdmUgPSBpc0FjdGl2ZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19