import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import * as i0 from "@angular/core";
import * as i1 from "./slider.service";
import * as i2 from "ng-zorro-antd/tooltip";
import * as i3 from "@angular/common";
export class NzSliderHandleComponent {
    constructor(sliderService, cdr) {
        this.sliderService = sliderService;
        this.cdr = cdr;
        this.tooltipVisible = 'default';
        this.active = false;
        this.dir = 'ltr';
        this.style = {};
        this.enterHandle = () => {
            if (!this.sliderService.isDragging) {
                this.toggleTooltip(true);
                this.updateTooltipPosition();
                this.cdr.detectChanges();
            }
        };
        this.leaveHandle = () => {
            if (!this.sliderService.isDragging) {
                this.toggleTooltip(false);
                this.cdr.detectChanges();
            }
        };
    }
    ngOnChanges(changes) {
        const { offset, value, active, tooltipVisible, reverse, dir } = changes;
        if (offset || reverse || dir) {
            this.updateStyle();
        }
        if (value) {
            this.updateTooltipTitle();
            this.updateTooltipPosition();
        }
        if (active) {
            if (active.currentValue) {
                this.toggleTooltip(true);
            }
            else {
                this.toggleTooltip(false);
            }
        }
        if (tooltipVisible?.currentValue === 'always') {
            Promise.resolve().then(() => this.toggleTooltip(true, true));
        }
    }
    focus() {
        this.handleEl?.nativeElement.focus();
    }
    toggleTooltip(show, force = false) {
        if (!force && (this.tooltipVisible !== 'default' || !this.tooltip)) {
            return;
        }
        if (show) {
            this.tooltip?.show();
        }
        else {
            this.tooltip?.hide();
        }
    }
    updateTooltipTitle() {
        this.tooltipTitle = this.tooltipFormatter ? this.tooltipFormatter(this.value) : `${this.value}`;
    }
    updateTooltipPosition() {
        if (this.tooltip) {
            Promise.resolve().then(() => this.tooltip?.updatePosition());
        }
    }
    updateStyle() {
        const vertical = this.vertical;
        const reverse = this.reverse;
        const offset = this.offset;
        const positionStyle = vertical
            ? {
                [reverse ? 'top' : 'bottom']: `${offset}%`,
                [reverse ? 'bottom' : 'top']: 'auto',
                transform: reverse ? null : `translateY(+50%)`
            }
            : {
                ...this.getHorizontalStylePosition(),
                transform: `translateX(${reverse ? (this.dir === 'rtl' ? '-' : '+') : this.dir === 'rtl' ? '+' : '-'}50%)`
            };
        this.style = positionStyle;
        this.cdr.markForCheck();
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
NzSliderHandleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSliderHandleComponent, deps: [{ token: i1.NzSliderService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NzSliderHandleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSliderHandleComponent, selector: "nz-slider-handle", inputs: { vertical: "vertical", reverse: "reverse", offset: "offset", value: "value", tooltipVisible: "tooltipVisible", tooltipPlacement: "tooltipPlacement", tooltipFormatter: "tooltipFormatter", active: "active", dir: "dir" }, host: { listeners: { "mouseenter": "enterHandle()", "mouseleave": "leaveHandle()" } }, viewQueries: [{ propertyName: "handleEl", first: true, predicate: ["handle"], descendants: true }, { propertyName: "tooltip", first: true, predicate: NzTooltipDirective, descendants: true }], exportAs: ["nzSliderHandle"], usesOnChanges: true, ngImport: i0, template: `
    <div
      #handle
      class="ant-slider-handle"
      tabindex="0"
      nz-tooltip
      [ngStyle]="style"
      [nzTooltipTitle]="tooltipFormatter === null || tooltipVisible === 'never' ? null : tooltipTitle"
      [nzTooltipTrigger]="null"
      [nzTooltipPlacement]="tooltipPlacement"
    ></div>
  `, isInline: true, directives: [{ type: i2.NzTooltipDirective, selector: "[nz-tooltip]", inputs: ["nzTooltipTitle", "nzTooltipTitleContext", "nz-tooltip", "nzTooltipTrigger", "nzTooltipPlacement", "nzTooltipOrigin", "nzTooltipVisible", "nzTooltipMouseEnterDelay", "nzTooltipMouseLeaveDelay", "nzTooltipOverlayClassName", "nzTooltipOverlayStyle", "nzTooltipArrowPointAtCenter", "nzTooltipColor"], outputs: ["nzTooltipVisibleChange"], exportAs: ["nzTooltip"] }, { type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzSliderHandleComponent.prototype, "active", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSliderHandleComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-slider-handle',
                    exportAs: 'nzSliderHandle',
                    preserveWhitespaces: false,
                    template: `
    <div
      #handle
      class="ant-slider-handle"
      tabindex="0"
      nz-tooltip
      [ngStyle]="style"
      [nzTooltipTitle]="tooltipFormatter === null || tooltipVisible === 'never' ? null : tooltipTitle"
      [nzTooltipTrigger]="null"
      [nzTooltipPlacement]="tooltipPlacement"
    ></div>
  `,
                    host: {
                        '(mouseenter)': 'enterHandle()',
                        '(mouseleave)': 'leaveHandle()'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzSliderService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { handleEl: [{
                type: ViewChild,
                args: ['handle', { static: false }]
            }], tooltip: [{
                type: ViewChild,
                args: [NzTooltipDirective, { static: false }]
            }], vertical: [{
                type: Input
            }], reverse: [{
                type: Input
            }], offset: [{
                type: Input
            }], value: [{
                type: Input
            }], tooltipVisible: [{
                type: Input
            }], tooltipPlacement: [{
                type: Input
            }], tooltipFormatter: [{
                type: Input
            }], active: [{
                type: Input
            }], dir: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvc2xpZGVyL2hhbmRsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUVULEtBQUssRUFHTCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7QUE0QjNELE1BQU0sT0FBTyx1QkFBdUI7SUFtQmxDLFlBQW9CLGFBQThCLEVBQVUsR0FBc0I7UUFBOUQsa0JBQWEsR0FBYixhQUFhLENBQWlCO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFUekUsbUJBQWMsR0FBd0IsU0FBUyxDQUFDO1FBR2hDLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDL0IsUUFBRyxHQUFjLEtBQUssQ0FBQztRQUdoQyxVQUFLLEdBQXFCLEVBQUUsQ0FBQztRQTZCN0IsZ0JBQVcsR0FBRyxHQUFTLEVBQUU7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFO2dCQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUMxQjtRQUNILENBQUMsQ0FBQztRQUVGLGdCQUFXLEdBQUcsR0FBUyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUs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QUFFLEtBQUs7b0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7R0FXVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osY0FBYyxFQUFFLGVBQWU7d0JBQy9CLGNBQWMsRUFBRSxlQUFlO3FCQUNoQztpQkFDRjtzSUFJeUMsUUFBUTtzQkFBL0MsU0FBUzt1QkFBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUNZLE9BQU87c0JBQXhELFNBQVM7dUJBQUMsa0JBQWtCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUV2QyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDbUIsTUFBTTtzQkFBOUIsS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3Rpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOZ1N0eWxlSW50ZXJmYWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IE56VG9vbHRpcERpcmVjdGl2ZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvdG9vbHRpcCc7XG5cbmltcG9ydCB7IE56U2xpZGVyU2VydmljZSB9IGZyb20gJy4vc2xpZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTnpTbGlkZXJTaG93VG9vbHRpcCB9IGZyb20gJy4vdHlwaW5ncyc7XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6ICduei1zbGlkZXItaGFuZGxlJyxcbiAgZXhwb3J0QXM6ICduelNsaWRlckhhbmRsZScsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgICNoYW5kbGVcbiAgICAgIGNsYXNzPVwiYW50LXNsaWRlci1oYW5kbGVcIlxuICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgIG56LXRvb2x0aXBcbiAgICAgIFtuZ1N0eWxlXT1cInN0eWxlXCJcbiAgICAgIFtuelRvb2x0aXBUaXRsZV09XCJ0b29sdGlwRm9ybWF0dGVyID09PSBudWxsIHx8IHRvb2x0aXBWaXNpYmxlID09PSAnbmV2ZXInID8gbnVsbCA6IHRvb2x0aXBUaXRsZVwiXG4gICAgICBbbnpUb29sdGlwVHJpZ2dlcl09XCJudWxsXCJcbiAgICAgIFtuelRvb2x0aXBQbGFjZW1lbnRdPVwidG9vbHRpcFBsYWNlbWVudFwiXG4gICAgPjwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgJyhtb3VzZWVudGVyKSc6ICdlbnRlckhhbmRsZSgpJyxcbiAgICAnKG1vdXNlbGVhdmUpJzogJ2xlYXZlSGFuZGxlKCknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpTbGlkZXJIYW5kbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfYWN0aXZlOiBCb29sZWFuSW5wdXQ7XG5cbiAgQFZpZXdDaGlsZCgnaGFuZGxlJywgeyBzdGF0aWM6IGZhbHNlIH0pIGhhbmRsZUVsPzogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChOelRvb2x0aXBEaXJlY3RpdmUsIHsgc3RhdGljOiBmYWxzZSB9KSB0b29sdGlwPzogTnpUb29sdGlwRGlyZWN0aXZlO1xuXG4gIEBJbnB1dCgpIHZlcnRpY2FsPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcmV2ZXJzZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIG9mZnNldD86IG51bWJlcjtcbiAgQElucHV0KCkgdmFsdWU/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHRvb2x0aXBWaXNpYmxlOiBOelNsaWRlclNob3dUb29sdGlwID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKSB0b29sdGlwUGxhY2VtZW50Pzogc3RyaW5nO1xuICBASW5wdXQoKSB0b29sdGlwRm9ybWF0dGVyPzogbnVsbCB8ICgodmFsdWU6IG51bWJlcikgPT4gc3RyaW5nKTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIGFjdGl2ZSA9IGZhbHNlO1xuICBASW5wdXQoKSBkaXI6IERpcmVjdGlvbiA9ICdsdHInO1xuXG4gIHRvb2x0aXBUaXRsZT86IHN0cmluZztcbiAgc3R5bGU6IE5nU3R5bGVJbnRlcmZhY2UgPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNsaWRlclNlcnZpY2U6IE56U2xpZGVyU2VydmljZSwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG9mZnNldCwgdmFsdWUsIGFjdGl2ZSwgdG9vbHRpcFZpc2libGUsIHJldmVyc2UsIGRpciB9ID0gY2hhbmdlcztcblxuICAgIGlmIChvZmZzZXQgfHwgcmV2ZXJzZSB8fCBkaXIpIHtcbiAgICAgIHRoaXMudXBkYXRlU3R5bGUoKTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlVG9vbHRpcFRpdGxlKCk7XG4gICAgICB0aGlzLnVwZGF0ZVRvb2x0aXBQb3NpdGlvbigpO1xuICAgIH1cblxuICAgIGlmIChhY3RpdmUpIHtcbiAgICAgIGlmIChhY3RpdmUuY3VycmVudFZhbHVlKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlVG9vbHRpcCh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudG9nZ2xlVG9vbHRpcChmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRvb2x0aXBWaXNpYmxlPy5jdXJyZW50VmFsdWUgPT09ICdhbHdheXMnKSB7XG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHRoaXMudG9nZ2xlVG9vbHRpcCh0cnVlLCB0cnVlKSk7XG4gICAgfVxuICB9XG5cbiAgZW50ZXJIYW5kbGUgPSAoKTogdm9pZCA9PiB7XG4gICAgaWYgKCF0aGlzLnNsaWRlclNlcnZpY2UuaXNEcmFnZ2luZykge1xuICAgICAgdGhpcy50b2dnbGVUb29sdGlwKHRydWUpO1xuICAgICAgdGhpcy51cGRhdGVUb29sdGlwUG9zaXRpb24oKTtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH07XG5cbiAgbGVhdmVIYW5kbGUgPSAoKTogdm9pZCA9PiB7XG4gICAgaWYgKCF0aGlzLnNsaWRlclNlcnZpY2UuaXNEcmFnZ2luZykge1xuICAgICAgdGhpcy50b2dnbGVUb29sdGlwKGZhbHNlKTtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH07XG5cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVFbD8ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgcHJpdmF0ZSB0b2dnbGVUb29sdGlwKHNob3c6IGJvb2xlYW4sIGZvcmNlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAoIWZvcmNlICYmICh0aGlzLnRvb2x0aXBWaXNpYmxlICE9PSAnZGVmYXVsdCcgfHwgIXRoaXMudG9vbHRpcCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoc2hvdykge1xuICAgICAgdGhpcy50b29sdGlwPy5zaG93KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudG9vbHRpcD8uaGlkZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlVG9vbHRpcFRpdGxlKCk6IHZvaWQge1xuICAgIHRoaXMudG9vbHRpcFRpdGxlID0gdGhpcy50b29sdGlwRm9ybWF0dGVyID8gdGhpcy50b29sdGlwRm9ybWF0dGVyKHRoaXMudmFsdWUhKSA6IGAke3RoaXMudmFsdWV9YDtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlVG9vbHRpcFBvc2l0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRvb2x0aXApIHtcbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gdGhpcy50b29sdGlwPy51cGRhdGVQb3NpdGlvbigpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVN0eWxlKCk6IHZvaWQge1xuICAgIGNvbnN0IHZlcnRpY2FsID0gdGhpcy52ZXJ0aWNhbDtcbiAgICBjb25zdCByZXZlcnNlID0gdGhpcy5yZXZlcnNlO1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuXG4gICAgY29uc3QgcG9zaXRpb25TdHlsZSA9IHZlcnRpY2FsXG4gICAgICA/IHtcbiAgICAgICAgICBbcmV2ZXJzZSA/ICd0b3AnIDogJ2JvdHRvbSddOiBgJHtvZmZzZXR9JWAsXG4gICAgICAgICAgW3JldmVyc2UgPyAnYm90dG9tJyA6ICd0b3AnXTogJ2F1dG8nLFxuICAgICAgICAgIHRyYW5zZm9ybTogcmV2ZXJzZSA/IG51bGwgOiBgdHJhbnNsYXRlWSgrNTAlKWBcbiAgICAgICAgfVxuICAgICAgOiB7XG4gICAgICAgICAgLi4udGhpcy5nZXRIb3Jpem9udGFsU3R5bGVQb3NpdGlvbigpLFxuICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHtyZXZlcnNlID8gKHRoaXMuZGlyID09PSAncnRsJyA/ICctJyA6ICcrJykgOiB0aGlzLmRpciA9PT0gJ3J0bCcgPyAnKycgOiAnLSd9NTAlKWBcbiAgICAgICAgfTtcblxuICAgIHRoaXMuc3R5bGUgPSBwb3NpdGlvblN0eWxlO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRIb3Jpem9udGFsU3R5bGVQb3NpdGlvbigpOiB7IGxlZnQ6IHN0cmluZzsgcmlnaHQ6IHN0cmluZyB9IHtcbiAgICBsZXQgbGVmdCA9IHRoaXMucmV2ZXJzZSA/ICdhdXRvJyA6IGAke3RoaXMub2Zmc2V0fSVgO1xuICAgIGxldCByaWdodCA9IHRoaXMucmV2ZXJzZSA/IGAke3RoaXMub2Zmc2V0fSVgIDogJ2F1dG8nO1xuICAgIGlmICh0aGlzLmRpciA9PT0gJ3J0bCcpIHtcbiAgICAgIGNvbnN0IHRtcCA9IGxlZnQ7XG4gICAgICBsZWZ0ID0gcmlnaHQ7XG4gICAgICByaWdodCA9IHRtcDtcbiAgICB9XG4gICAgcmV0dXJuIHsgbGVmdCwgcmlnaHQgfTtcbiAgfVxufVxuIl19