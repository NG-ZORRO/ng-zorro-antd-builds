import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Optional, Output, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isPresetColor, isStatusColor, presetColors, statusColors } from 'ng-zorro-antd/core/color';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
import * as i2 from "@angular/common";
import * as i3 from "ng-zorro-antd/icon";
export class NzTagComponent {
    constructor(cdr, renderer, elementRef, directionality) {
        this.cdr = cdr;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.directionality = directionality;
        this.isPresetColor = false;
        this.nzMode = 'default';
        this.nzChecked = false;
        this.nzOnClose = new EventEmitter();
        this.nzCheckedChange = new EventEmitter();
        this.dir = 'ltr';
        this.destroy$ = new Subject();
    }
    updateCheckedStatus() {
        if (this.nzMode === 'checkable') {
            this.nzChecked = !this.nzChecked;
            this.nzCheckedChange.emit(this.nzChecked);
        }
    }
    closeTag(e) {
        this.nzOnClose.emit(e);
        if (!e.defaultPrevented) {
            this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), this.elementRef.nativeElement);
        }
    }
    clearPresetColor() {
        const hostElement = this.elementRef.nativeElement;
        // /(ant-tag-(?:pink|red|...))/g
        const regexp = new RegExp(`(ant-tag-(?:${[...presetColors, ...statusColors].join('|')}))`, 'g');
        const classname = hostElement.classList.toString();
        const matches = [];
        let match = regexp.exec(classname);
        while (match !== null) {
            matches.push(match[1]);
            match = regexp.exec(classname);
        }
        hostElement.classList.remove(...matches);
    }
    setPresetColor() {
        const hostElement = this.elementRef.nativeElement;
        this.clearPresetColor();
        if (!this.nzColor) {
            this.isPresetColor = false;
        }
        else {
            this.isPresetColor = isPresetColor(this.nzColor) || isStatusColor(this.nzColor);
        }
        if (this.isPresetColor) {
            hostElement.classList.add(`ant-tag-${this.nzColor}`);
        }
    }
    ngOnInit() {
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    ngOnChanges(changes) {
        const { nzColor } = changes;
        if (nzColor) {
            this.setPresetColor();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzTagComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTagComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzTagComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTagComponent, selector: "nz-tag", inputs: { nzMode: "nzMode", nzColor: "nzColor", nzChecked: "nzChecked" }, outputs: { nzOnClose: "nzOnClose", nzCheckedChange: "nzCheckedChange" }, host: { listeners: { "click": "updateCheckedStatus()" }, properties: { "style.background-color": "isPresetColor ? '' : nzColor", "class.ant-tag-has-color": "nzColor && !isPresetColor", "class.ant-tag-checkable": "nzMode === 'checkable'", "class.ant-tag-checkable-checked": "nzChecked", "class.ant-tag-rtl": "dir === 'rtl'" }, classAttribute: "ant-tag" }, exportAs: ["nzTag"], usesOnChanges: true, ngImport: i0, template: `
    <ng-content></ng-content>
    <i
      nz-icon
      nzType="close"
      class="ant-tag-close-icon"
      *ngIf="nzMode === 'closeable'"
      tabindex="-1"
      (click)="closeTag($event)"
    ></i>
  `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzTagComponent.prototype, "nzChecked", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTagComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tag',
                    exportAs: 'nzTag',
                    preserveWhitespaces: false,
                    template: `
    <ng-content></ng-content>
    <i
      nz-icon
      nzType="close"
      class="ant-tag-close-icon"
      *ngIf="nzMode === 'closeable'"
      tabindex="-1"
      (click)="closeTag($event)"
    ></i>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'ant-tag',
                        '[style.background-color]': `isPresetColor ? '' : nzColor`,
                        '[class.ant-tag-has-color]': `nzColor && !isPresetColor`,
                        '[class.ant-tag-checkable]': `nzMode === 'checkable'`,
                        '[class.ant-tag-checkable-checked]': `nzChecked`,
                        '[class.ant-tag-rtl]': `dir === 'rtl'`,
                        '(click)': 'updateCheckedStatus()'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i1.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzMode: [{
                type: Input
            }], nzColor: [{
                type: Input
            }], nzChecked: [{
                type: Input
            }], nzOnClose: [{
                type: Output
            }], nzCheckedChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvdGFnL3RhZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBSUwsUUFBUSxFQUNSLE1BQU0sRUFHTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUNMLGFBQWEsRUFDYixhQUFhLEVBR2IsWUFBWSxFQUNaLFlBQVksRUFDYixNQUFNLDBCQUEwQixDQUFDO0FBRWxDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7QUE2QnZELE1BQU0sT0FBTyxjQUFjO0lBV3pCLFlBQ1UsR0FBc0IsRUFDdEIsUUFBbUIsRUFDbkIsVUFBc0IsRUFDVixjQUE4QjtRQUgxQyxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDVixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFicEQsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDYixXQUFNLEdBQTBDLFNBQVMsQ0FBQztRQUUxQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBQzNDLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUNqRSxRQUFHLEdBQWMsS0FBSyxDQUFDO1FBQ2YsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7SUFPcEMsQ0FBQztJQUVKLG1CQUFtQjtRQUNqQixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssV0FBVyxFQUFF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SSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDOzsyR0E5RVUsY0FBYzsrRkFBZCxjQUFjLDhrQkF2QmY7Ozs7Ozs7Ozs7R0FVVDtBQWtCd0I7SUFBZixZQUFZLEVBQUU7aURBQW1COzJGQUxoQyxjQUFjO2tCQTNCMUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsUUFBUTtvQkFDbEIsUUFBUSxFQUFFLE9BQU87b0JBQ2pCLG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7OztHQVVUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxTQUFTO3dCQUNoQiwwQkFBMEIsRUFBRSw4QkFBOEI7d0JBQzFELDJCQUEyQixFQUFFLDJCQUEyQjt3QkFDeEQsMkJBQTJCLEVBQUUsd0JBQXdCO3dCQUNyRCxtQ0FBbUMsRUFBRSxXQUFXO3dCQUNoRCxxQkFBcUIsRUFBRSxlQUFlO3dCQUN0QyxTQUFTLEVBQUUsdUJBQXVCO3FCQUNuQztpQkFDRjs7MEJBZ0JJLFFBQVE7NENBWkYsTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDbUIsU0FBUztzQkFBakMsS0FBSztnQkFDYSxTQUFTO3NCQUEzQixNQUFNO2dCQUNZLGVBQWU7c0JBQWpDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7XG4gIGlzUHJlc2V0Q29sb3IsXG4gIGlzU3RhdHVzQ29sb3IsXG4gIE56UHJlc2V0Q29sb3IsXG4gIE56U3RhdHVzQ29sb3IsXG4gIHByZXNldENvbG9ycyxcbiAgc3RhdHVzQ29sb3JzXG59IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9jb2xvcic7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei10YWcnLFxuICBleHBvcnRBczogJ256VGFnJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDxpXG4gICAgICBuei1pY29uXG4gICAgICBuelR5cGU9XCJjbG9zZVwiXG4gICAgICBjbGFzcz1cImFudC10YWctY2xvc2UtaWNvblwiXG4gICAgICAqbmdJZj1cIm56TW9kZSA9PT0gJ2Nsb3NlYWJsZSdcIlxuICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAoY2xpY2spPVwiY2xvc2VUYWcoJGV2ZW50KVwiXG4gICAgPjwvaT5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC10YWcnLFxuICAgICdbc3R5bGUuYmFja2dyb3VuZC1jb2xvcl0nOiBgaXNQcmVzZXRDb2xvciA/ICcnIDogbnpDb2xvcmAsXG4gICAgJ1tjbGFzcy5hbnQtdGFnLWhhcy1jb2xvcl0nOiBgbnpDb2xvciAmJiAhaXNQcmVzZXRDb2xvcmAsXG4gICAgJ1tjbGFzcy5hbnQtdGFnLWNoZWNrYWJsZV0nOiBgbnpNb2RlID09PSAnY2hlY2thYmxlJ2AsXG4gICAgJ1tjbGFzcy5hbnQtdGFnLWNoZWNrYWJsZS1jaGVja2VkXSc6IGBuekNoZWNrZWRgLFxuICAgICdbY2xhc3MuYW50LXRhZy1ydGxdJzogYGRpciA9PT0gJ3J0bCdgLFxuICAgICcoY2xpY2spJzogJ3VwZGF0ZUNoZWNrZWRTdGF0dXMoKSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRhZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpDaGVja2VkOiBCb29sZWFuSW5wdXQ7XG4gIGlzUHJlc2V0Q29sb3IgPSBmYWxzZTtcbiAgQElucHV0KCkgbnpNb2RlOiAnZGVmYXVsdCcgfCAnY2xvc2VhYmxlJyB8ICdjaGVja2FibGUnID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKSBuekNvbG9yPzogc3RyaW5nIHwgTnpTdGF0dXNDb2xvciB8IE56UHJlc2V0Q29sb3I7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekNoZWNrZWQgPSBmYWxzZTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56T25DbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Q2hlY2tlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgZGlyOiBEaXJlY3Rpb24gPSAnbHRyJztcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXJlY3Rpb25hbGl0eTogRGlyZWN0aW9uYWxpdHlcbiAgKSB7fVxuXG4gIHVwZGF0ZUNoZWNrZWRTdGF0dXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpNb2RlID09PSAnY2hlY2thYmxlJykge1xuICAgICAgdGhpcy5uekNoZWNrZWQgPSAhdGhpcy5uekNoZWNrZWQ7XG4gICAgICB0aGlzLm56Q2hlY2tlZENoYW5nZS5lbWl0KHRoaXMubnpDaGVja2VkKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZVRhZyhlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5uek9uQ2xvc2UuZW1pdChlKTtcbiAgICBpZiAoIWUuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbGVhclByZXNldENvbG9yKCk6IHZvaWQge1xuICAgIGNvbnN0IGhvc3RFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgLy8gLyhhbnQtdGFnLSg/OnBpbmt8cmVkfC4uLikpL2dcbiAgICBjb25zdCByZWdleHAgPSBuZXcgUmVnRXhwKGAoYW50LXRhZy0oPzoke1suLi5wcmVzZXRDb2xvcnMsIC4uLnN0YXR1c0NvbG9yc10uam9pbignfCcpfSkpYCwgJ2cnKTtcbiAgICBjb25zdCBjbGFzc25hbWUgPSBob3N0RWxlbWVudC5jbGFzc0xpc3QudG9TdHJpbmcoKTtcbiAgICBjb25zdCBtYXRjaGVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGxldCBtYXRjaDogUmVnRXhwRXhlY0FycmF5IHwgbnVsbCA9IHJlZ2V4cC5leGVjKGNsYXNzbmFtZSk7XG4gICAgd2hpbGUgKG1hdGNoICE9PSBudWxsKSB7XG4gICAgICBtYXRjaGVzLnB1c2gobWF0Y2hbMV0pO1xuICAgICAgbWF0Y2ggPSByZWdleHAuZXhlYyhjbGFzc25hbWUpO1xuICAgIH1cbiAgICBob3N0RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKC4uLm1hdGNoZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRQcmVzZXRDb2xvcigpOiB2b2lkIHtcbiAgICBjb25zdCBob3N0RWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuICAgIHRoaXMuY2xlYXJQcmVzZXRDb2xvcigpO1xuICAgIGlmICghdGhpcy5uekNvbG9yKSB7XG4gICAgICB0aGlzLmlzUHJlc2V0Q29sb3IgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc1ByZXNldENvbG9yID0gaXNQcmVzZXRDb2xvcih0aGlzLm56Q29sb3IpIHx8IGlzU3RhdHVzQ29sb3IodGhpcy5uekNvbG9yKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNQcmVzZXRDb2xvcikge1xuICAgICAgaG9zdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChgYW50LXRhZy0ke3RoaXMubnpDb2xvcn1gKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmRpcmVjdGlvbmFsaXR5LmNoYW5nZT8ucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoZGlyZWN0aW9uOiBEaXJlY3Rpb24pID0+IHtcbiAgICAgIHRoaXMuZGlyID0gZGlyZWN0aW9uO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kaXIgPSB0aGlzLmRpcmVjdGlvbmFsaXR5LnZhbHVlO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbnpDb2xvciB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpDb2xvcikge1xuICAgICAgdGhpcy5zZXRQcmVzZXRDb2xvcigpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19