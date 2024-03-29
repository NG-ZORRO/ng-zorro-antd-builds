import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { InputBoolean, InputNumber } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class NzSliderTrackComponent {
    constructor() {
        this.offset = 0;
        this.reverse = false;
        this.dir = 'ltr';
        this.length = 0;
        this.vertical = false;
        this.included = false;
        this.style = {};
    }
    ngOnChanges() {
        const vertical = this.vertical;
        const reverse = this.reverse;
        const visibility = this.included ? 'visible' : 'hidden';
        const offset = this.offset;
        const length = this.length;
        const positonStyle = vertical
            ? {
                [reverse ? 'top' : 'bottom']: `${offset}%`,
                [reverse ? 'bottom' : 'top']: 'auto',
                height: `${length}%`,
                visibility
            }
            : {
                ...this.getHorizontalStylePosition(),
                width: `${length}%`,
                visibility
            };
        this.style = positonStyle;
    }
    getHorizontalStylePosition() {
        let left = this.reverse ? 'auto' : `${this.offset}%`;
        let right = this.reverse ? `${this.offset}%` : 'auto';
        if (this.dir === 'rtl') {
            const tmp = left;
            left = right;
            right = tmp;
        }
        return { left, right };
    }
}
NzSliderTrackComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSliderTrackComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzSliderTrackComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSliderTrackComponent, selector: "nz-slider-track", inputs: { offset: "offset", reverse: "reverse", dir: "dir", length: "length", vertical: "vertical", included: "included" }, exportAs: ["nzSliderTrack"], usesOnChanges: true, ngImport: i0, template: ` <div class="ant-slider-track" [ngStyle]="style"></div> `, isInline: true, directives: [{ type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputNumber()
], NzSliderTrackComponent.prototype, "offset", void 0);
__decorate([
    InputBoolean()
], NzSliderTrackComponent.prototype, "reverse", void 0);
__decorate([
    InputNumber()
], NzSliderTrackComponent.prototype, "length", void 0);
__decorate([
    InputBoolean()
], NzSliderTrackComponent.prototype, "vertical", void 0);
__decorate([
    InputBoolean()
], NzSliderTrackComponent.prototype, "included", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSliderTrackComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-slider-track',
                    exportAs: 'nzSliderTrack',
                    preserveWhitespaces: false,
                    template: ` <div class="ant-slider-track" [ngStyle]="style"></div> `
                }]
        }], propDecorators: { offset: [{
                type: Input
            }], reverse: [{
                type: Input
            }], dir: [{
                type: Input
            }], length: [{
                type: Input
            }], vertical: [{
                type: Input
            }], included: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9zbGlkZXIvdHJhY2suY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFNQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBYSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd4RyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7QUFtQnBFLE1BQU0sT0FBTyxzQkFBc0I7SUFSbkM7UUFlMEIsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUNsQixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pDLFFBQUcsR0FBYyxLQUFLLENBQUM7UUFDUixXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUUxQyxVQUFLLEdBQXVCLEVBQUUsQ0FBQztLQW1DaEM7SUFqQ0MsV0FBVztRQUNULE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDL0IsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUN4RCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFM0IsTUFBTSxZQUFZLEdBQXVCLFFBQVE7WUFDL0MsQ0FBQyxDQUFDO2dCQUNFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsTUFBTSxHQUFHO2dCQUMxQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNO2dCQUNwQyxNQUFNLEVBQUUsR0FBRyxNQUFNLEdBQUc7Z0JBQ3BCLFVBQVU7YUFDWDtZQUNILENBQUMsQ0FBQztnQkFDRSxHQUFHLElBQUksQ0FBQywwQkFBMEIsRUFBRTtnQkFDcEMsS0FBSyxFQUFFLEdBQUcsTUFBTSxHQUFHO2dCQUNuQixVQUFVO2FBQ1gsQ0FBQztRQUVOLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO0lBQzVCLENBQUM7SUFFTywwQkFBMEI7UUFDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztRQUNyRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3RELElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLEVBQUU7WUFDdEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksR0FBRyxLQUFLLENBQUM7WUFDYixLQUFLLEdBQUcsR0FBRyxDQUFDO1NBQ2I7UUFDRCxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQ3pCLENBQUM7O21IQWhEVSxzQkFBc0I7dUdBQXRCLHNCQUFzQixxT0FGdkIsMERBQTBEO0FBUzVDO0lBQWQsV0FBVyxFQUFFO3NEQUFvQjtBQUNsQjtJQUFmLFlBQVksRUFBRTt1REFBMEI7QUFFMUI7SUFBZCxXQUFXLEVBQUU7c0RBQW9CO0FBQ2xCO0lBQWYsWUFBWSxFQUFFO3dEQUFrQjtBQUNqQjtJQUFmLFlBQVksRUFBRTt3REFBa0I7MkZBWi9CLHNCQUFzQjtrQkFSbEMsU0FBUzttQkFBQztvQkFDVCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSxlQUFlO29CQUN6QixtQkFBbUIsRUFBRSxLQUFLO29CQUMxQixRQUFRLEVBQUUsMERBQTBEO2lCQUNyRTs4QkFReUIsTUFBTTtzQkFBN0IsS0FBSztnQkFDbUIsT0FBTztzQkFBL0IsS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ2tCLE1BQU07c0JBQTdCLEtBQUs7Z0JBQ21CLFFBQVE7c0JBQWhDLEtBQUs7Z0JBQ21CLFFBQVE7c0JBQWhDLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3Rpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE51bWJlcklucHV0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiwgSW5wdXROdW1iZXIgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTnpTbGlkZXJUcmFja1N0eWxlIHtcbiAgYm90dG9tPzogc3RyaW5nIHwgbnVsbDtcbiAgaGVpZ2h0Pzogc3RyaW5nIHwgbnVsbDtcbiAgbGVmdD86IHN0cmluZyB8IG51bGw7XG4gIHJpZ2h0Pzogc3RyaW5nIHwgbnVsbDtcbiAgd2lkdGg/OiBzdHJpbmcgfCBudWxsO1xuICB2aXNpYmlsaXR5Pzogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yOiAnbnotc2xpZGVyLXRyYWNrJyxcbiAgZXhwb3J0QXM6ICduelNsaWRlclRyYWNrJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHRlbXBsYXRlOiBgIDxkaXYgY2xhc3M9XCJhbnQtc2xpZGVyLXRyYWNrXCIgW25nU3R5bGVdPVwic3R5bGVcIj48L2Rpdj4gYFxufSlcbmV4cG9ydCBjbGFzcyBOelNsaWRlclRyYWNrQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX29mZnNldDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9sZW5ndGg6IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfdmVydGljYWw6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2luY2x1ZGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yZXZlcnNlOiBCb29sZWFuSW5wdXQ7XG5cbiAgQElucHV0KCkgQElucHV0TnVtYmVyKCkgb2Zmc2V0OiBudW1iZXIgPSAwO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgcmV2ZXJzZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBkaXI6IERpcmVjdGlvbiA9ICdsdHInO1xuICBASW5wdXQoKSBASW5wdXROdW1iZXIoKSBsZW5ndGg6IG51bWJlciA9IDA7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSB2ZXJ0aWNhbCA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgaW5jbHVkZWQgPSBmYWxzZTtcblxuICBzdHlsZTogTnpTbGlkZXJUcmFja1N0eWxlID0ge307XG5cbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgY29uc3QgdmVydGljYWwgPSB0aGlzLnZlcnRpY2FsO1xuICAgIGNvbnN0IHJldmVyc2UgPSB0aGlzLnJldmVyc2U7XG4gICAgY29uc3QgdmlzaWJpbGl0eSA9IHRoaXMuaW5jbHVkZWQgPyAndmlzaWJsZScgOiAnaGlkZGVuJztcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLmxlbmd0aDtcblxuICAgIGNvbnN0IHBvc2l0b25TdHlsZTogTnpTbGlkZXJUcmFja1N0eWxlID0gdmVydGljYWxcbiAgICAgID8ge1xuICAgICAgICAgIFtyZXZlcnNlID8gJ3RvcCcgOiAnYm90dG9tJ106IGAke29mZnNldH0lYCxcbiAgICAgICAgICBbcmV2ZXJzZSA/ICdib3R0b20nIDogJ3RvcCddOiAnYXV0bycsXG4gICAgICAgICAgaGVpZ2h0OiBgJHtsZW5ndGh9JWAsXG4gICAgICAgICAgdmlzaWJpbGl0eVxuICAgICAgICB9XG4gICAgICA6IHtcbiAgICAgICAgICAuLi50aGlzLmdldEhvcml6b250YWxTdHlsZVBvc2l0aW9uKCksXG4gICAgICAgICAgd2lkdGg6IGAke2xlbmd0aH0lYCxcbiAgICAgICAgICB2aXNpYmlsaXR5XG4gICAgICAgIH07XG5cbiAgICB0aGlzLnN0eWxlID0gcG9zaXRvblN0eWxlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRIb3Jpem9udGFsU3R5bGVQb3NpdGlvbigpOiB7IGxlZnQ6IHN0cmluZzsgcmlnaHQ6IHN0cmluZyB9IHtcbiAgICBsZXQgbGVmdCA9IHRoaXMucmV2ZXJzZSA/ICdhdXRvJyA6IGAke3RoaXMub2Zmc2V0fSVgO1xuICAgIGxldCByaWdodCA9IHRoaXMucmV2ZXJzZSA/IGAke3RoaXMub2Zmc2V0fSVgIDogJ2F1dG8nO1xuICAgIGlmICh0aGlzLmRpciA9PT0gJ3J0bCcpIHtcbiAgICAgIGNvbnN0IHRtcCA9IGxlZnQ7XG4gICAgICBsZWZ0ID0gcmlnaHQ7XG4gICAgICByaWdodCA9IHRtcDtcbiAgICB9XG4gICAgcmV0dXJuIHsgbGVmdCwgcmlnaHQgfTtcbiAgfVxufVxuIl19