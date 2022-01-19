import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Input, Optional } from '@angular/core';
import { from, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IconDirective } from '@ant-design/icons-angular';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "./icon.service";
export class NzIconDirective extends IconDirective {
    constructor(ngZone, changeDetectorRef, elementRef, iconService, renderer, iconPatch) {
        super(iconService, elementRef, renderer);
        this.ngZone = ngZone;
        this.changeDetectorRef = changeDetectorRef;
        this.iconService = iconService;
        this.renderer = renderer;
        this.cacheClassName = null;
        this.nzRotate = 0;
        this.spin = false;
        this.destroy$ = new Subject();
        if (iconPatch) {
            iconPatch.doPatch();
        }
        this.el = elementRef.nativeElement;
    }
    set nzSpin(value) {
        this.spin = value;
    }
    set nzType(value) {
        this.type = value;
    }
    set nzTheme(value) {
        this.theme = value;
    }
    set nzTwotoneColor(value) {
        this.twoToneColor = value;
    }
    set nzIconfont(value) {
        this.iconfont = value;
    }
    ngOnChanges(changes) {
        const { nzType, nzTwotoneColor, nzSpin, nzTheme, nzRotate } = changes;
        if (nzType || nzTwotoneColor || nzSpin || nzTheme) {
            this.changeIcon2();
        }
        else if (nzRotate) {
            this.handleRotate(this.el.firstChild);
        }
        else {
            this._setSVGElement(this.iconService.createIconfontIcon(`#${this.iconfont}`));
        }
    }
    ngOnInit() {
        this.renderer.setAttribute(this.el, 'class', `anticon ${this.el.className}`.trim());
    }
    /**
     * If custom content is provided, try to normalize SVG elements.
     */
    ngAfterContentChecked() {
        if (!this.type) {
            const children = this.el.children;
            let length = children.length;
            if (!this.type && children.length) {
                while (length--) {
                    const child = children[length];
                    if (child.tagName.toLowerCase() === 'svg') {
                        this.iconService.normalizeSvgElement(child);
                    }
                }
            }
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
    }
    /**
     * Replacement of `changeIcon` for more modifications.
     */
    changeIcon2() {
        this.setClassName();
        // We don't need to re-enter the Angular zone for adding classes or attributes through the renderer.
        this.ngZone.runOutsideAngular(() => {
            from(this._changeIcon())
                .pipe(takeUntil(this.destroy$))
                .subscribe(svgOrRemove => {
                // The _changeIcon method would call Renderer to remove the element of the old icon,
                // which would call `markElementAsRemoved` eventually,
                // so we should call `detectChanges` to tell Angular remove the DOM node.
                // #7186
                this.changeDetectorRef.detectChanges();
                if (svgOrRemove) {
                    this.setSVGData(svgOrRemove);
                    this.handleSpin(svgOrRemove);
                    this.handleRotate(svgOrRemove);
                }
            });
        });
    }
    handleSpin(svg) {
        if (this.spin || this.type === 'loading') {
            this.renderer.addClass(svg, 'anticon-spin');
        }
        else {
            this.renderer.removeClass(svg, 'anticon-spin');
        }
    }
    handleRotate(svg) {
        if (this.nzRotate) {
            this.renderer.setAttribute(svg, 'style', `transform: rotate(${this.nzRotate}deg)`);
        }
        else {
            this.renderer.removeAttribute(svg, 'style');
        }
    }
    setClassName() {
        if (this.cacheClassName) {
            this.renderer.removeClass(this.el, this.cacheClassName);
        }
        this.cacheClassName = `anticon-${this.type}`;
        this.renderer.addClass(this.el, this.cacheClassName);
    }
    setSVGData(svg) {
        this.renderer.setAttribute(svg, 'data-icon', this.type);
        this.renderer.setAttribute(svg, 'aria-hidden', 'true');
    }
}
NzIconDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzIconDirective, deps: [{ token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i1.NzIconService }, { token: i0.Renderer2 }, { token: i1.NzIconPatchService, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NzIconDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzIconDirective, selector: "[nz-icon]", inputs: { nzSpin: "nzSpin", nzRotate: "nzRotate", nzType: "nzType", nzTheme: "nzTheme", nzTwotoneColor: "nzTwotoneColor", nzIconfont: "nzIconfont" }, host: { properties: { "class.anticon": "true" } }, exportAs: ["nzIcon"], usesInheritance: true, usesOnChanges: true, ngImport: i0 });
__decorate([
    InputBoolean()
], NzIconDirective.prototype, "nzSpin", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzIconDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-icon]',
                    exportAs: 'nzIcon',
                    host: {
                        '[class.anticon]': 'true'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i1.NzIconService }, { type: i0.Renderer2 }, { type: i1.NzIconPatchService, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzSpin: [{
                type: Input
            }], nzRotate: [{
                type: Input
            }], nzType: [{
                type: Input
            }], nzTheme: [{
                type: Input
            }], nzTwotoneColor: [{
                type: Input
            }], nzIconfont: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2ljb24vaWNvbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFHTCxTQUFTLEVBRVQsS0FBSyxFQUtMLFFBQVEsRUFHVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGFBQWEsRUFBYSxNQUFNLDJCQUEyQixDQUFDO0FBR3JFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7O0FBV3ZELE1BQU0sT0FBTyxlQUFnQixTQUFRLGFBQWE7SUF3Q2hELFlBQ21CLE1BQWMsRUFDZCxpQkFBb0MsRUFDckQsVUFBc0IsRUFDZixXQUEwQixFQUMxQixRQUFtQixFQUNkLFNBQTZCO1FBRXpDLEtBQUssQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBUHhCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBRTlDLGdCQUFXLEdBQVgsV0FBVyxDQUFlO1FBQzFCLGFBQVEsR0FBUixRQUFRLENBQVc7UUExQzVCLG1CQUFjLEdBQWtCLElBQUksQ0FBQztRQU81QixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBMEJ0QixTQUFJLEdBQVksS0FBSyxDQUFDO1FBRXRCLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBWXJDLElBQUksU0FBUyxFQUFFO1lBQ2IsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3JCO1FBRUQsSUFBSSxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQ3JDLENBQUM7SUFqREQsSUFB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LFlBQVksQ0FBQyxHQUFHLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFjLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pELENBQUM7OzRHQXBKVSxlQUFlO2dHQUFmLGVBQWU7QUFNMUI7SUFEQyxZQUFZLEVBQUU7NkNBR2Q7MkZBUlUsZUFBZTtrQkFQM0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLElBQUksRUFBRTt3QkFDSixpQkFBaUIsRUFBRSxNQUFNO3FCQUMxQjtpQkFDRjs7MEJBK0NJLFFBQVE7NENBeENQLE1BQU07c0JBRlQsS0FBSztnQkFNRyxRQUFRO3NCQUFoQixLQUFLO2dCQUdGLE1BQU07c0JBRFQsS0FBSztnQkFNRixPQUFPO3NCQURWLEtBQUs7Z0JBTUYsY0FBYztzQkFEakIsS0FBSztnQkFNRixVQUFVO3NCQURiLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBJY29uRGlyZWN0aXZlLCBUaGVtZVR5cGUgfSBmcm9tICdAYW50LWRlc2lnbi9pY29ucy1hbmd1bGFyJztcblxuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuaW1wb3J0IHsgTnpJY29uUGF0Y2hTZXJ2aWNlLCBOekljb25TZXJ2aWNlIH0gZnJvbSAnLi9pY29uLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbnotaWNvbl0nLFxuICBleHBvcnRBczogJ256SWNvbicsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudGljb25dJzogJ3RydWUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpJY29uRGlyZWN0aXZlIGV4dGVuZHMgSWNvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRDaGVja2VkLCBPbkRlc3Ryb3kge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTcGluOiBCb29sZWFuSW5wdXQ7XG5cbiAgY2FjaGVDbGFzc05hbWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKVxuICBASW5wdXRCb29sZWFuKClcbiAgc2V0IG56U3Bpbih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuc3BpbiA9IHZhbHVlO1xuICB9XG5cbiAgQElucHV0KCkgbnpSb3RhdGU6IG51bWJlciA9IDA7XG5cbiAgQElucHV0KClcbiAgc2V0IG56VHlwZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy50eXBlID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpUaGVtZSh2YWx1ZTogVGhlbWVUeXBlKSB7XG4gICAgdGhpcy50aGVtZSA9IHZhbHVlO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56VHdvdG9uZUNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnR3b1RvbmVDb2xvciA9IHZhbHVlO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56SWNvbmZvbnQodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuaWNvbmZvbnQgPSB2YWx1ZTtcbiAgfVxuXG4gIGhvc3RDbGFzcz86IHN0cmluZztcblxuICBwcml2YXRlIHJlYWRvbmx5IGVsOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBpY29uZm9udD86IHN0cmluZztcbiAgcHJpdmF0ZSBzcGluOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBpY29uU2VydmljZTogTnpJY29uU2VydmljZSxcbiAgICBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBAT3B0aW9uYWwoKSBpY29uUGF0Y2g6IE56SWNvblBhdGNoU2VydmljZVxuICApIHtcbiAgICBzdXBlcihpY29uU2VydmljZSwgZWxlbWVudFJlZiwgcmVuZGVyZXIpO1xuXG4gICAgaWYgKGljb25QYXRjaCkge1xuICAgICAgaWNvblBhdGNoLmRvUGF0Y2goKTtcbiAgICB9XG5cbiAgICB0aGlzLmVsID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgb3ZlcnJpZGUgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbnpUeXBlLCBuelR3b3RvbmVDb2xvciwgbnpTcGluLCBuelRoZW1lLCBuelJvdGF0ZSB9ID0gY2hhbmdlcztcblxuICAgIGlmIChuelR5cGUgfHwgbnpUd290b25lQ29sb3IgfHwgbnpTcGluIHx8IG56VGhlbWUpIHtcbiAgICAgIHRoaXMuY2hhbmdlSWNvbjIoKTtcbiAgICB9IGVsc2UgaWYgKG56Um90YXRlKSB7XG4gICAgICB0aGlzLmhhbmRsZVJvdGF0ZSh0aGlzLmVsLmZpcnN0Q2hpbGQgYXMgU1ZHRWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NldFNWR0VsZW1lbnQodGhpcy5pY29uU2VydmljZS5jcmVhdGVJY29uZm9udEljb24oYCMke3RoaXMuaWNvbmZvbnR9YCkpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWwsICdjbGFzcycsIGBhbnRpY29uICR7dGhpcy5lbC5jbGFzc05hbWV9YC50cmltKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIGN1c3RvbSBjb250ZW50IGlzIHByb3ZpZGVkLCB0cnkgdG8gbm9ybWFsaXplIFNWRyBlbGVtZW50cy5cbiAgICovXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMudHlwZSkge1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmVsLmNoaWxkcmVuO1xuICAgICAgbGV0IGxlbmd0aCA9IGNoaWxkcmVuLmxlbmd0aDtcbiAgICAgIGlmICghdGhpcy50eXBlICYmIGNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgICBjb25zdCBjaGlsZCA9IGNoaWxkcmVuW2xlbmd0aF07XG4gICAgICAgICAgaWYgKGNoaWxkLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3N2ZycpIHtcbiAgICAgICAgICAgIHRoaXMuaWNvblNlcnZpY2Uubm9ybWFsaXplU3ZnRWxlbWVudChjaGlsZCBhcyBTVkdFbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlbWVudCBvZiBgY2hhbmdlSWNvbmAgZm9yIG1vcmUgbW9kaWZpY2F0aW9ucy5cbiAgICovXG4gIHByaXZhdGUgY2hhbmdlSWNvbjIoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRDbGFzc05hbWUoKTtcblxuICAgIC8vIFdlIGRvbid0IG5lZWQgdG8gcmUtZW50ZXIgdGhlIEFuZ3VsYXIgem9uZSBmb3IgYWRkaW5nIGNsYXNzZXMgb3IgYXR0cmlidXRlcyB0aHJvdWdoIHRoZSByZW5kZXJlci5cbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBmcm9tKHRoaXMuX2NoYW5nZUljb24oKSlcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKHN2Z09yUmVtb3ZlID0+IHtcbiAgICAgICAgICAvLyBUaGUgX2NoYW5nZUljb24gbWV0aG9kIHdvdWxkIGNhbGwgUmVuZGVyZXIgdG8gcmVtb3ZlIHRoZSBlbGVtZW50IG9mIHRoZSBvbGQgaWNvbixcbiAgICAgICAgICAvLyB3aGljaCB3b3VsZCBjYWxsIGBtYXJrRWxlbWVudEFzUmVtb3ZlZGAgZXZlbnR1YWxseSxcbiAgICAgICAgICAvLyBzbyB3ZSBzaG91bGQgY2FsbCBgZGV0ZWN0Q2hhbmdlc2AgdG8gdGVsbCBBbmd1bGFyIHJlbW92ZSB0aGUgRE9NIG5vZGUuXG4gICAgICAgICAgLy8gIzcxODZcbiAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcblxuICAgICAgICAgIGlmIChzdmdPclJlbW92ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTVkdEYXRhKHN2Z09yUmVtb3ZlKTtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlU3BpbihzdmdPclJlbW92ZSk7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVJvdGF0ZShzdmdPclJlbW92ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlU3Bpbihzdmc6IFNWR0VsZW1lbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zcGluIHx8IHRoaXMudHlwZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHN2ZywgJ2FudGljb24tc3BpbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHN2ZywgJ2FudGljb24tc3BpbicpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlUm90YXRlKHN2ZzogU1ZHRWxlbWVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56Um90YXRlKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShzdmcsICdzdHlsZScsIGB0cmFuc2Zvcm06IHJvdGF0ZSgke3RoaXMubnpSb3RhdGV9ZGVnKWApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZShzdmcsICdzdHlsZScpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0Q2xhc3NOYW1lKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNhY2hlQ2xhc3NOYW1lKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwsIHRoaXMuY2FjaGVDbGFzc05hbWUpO1xuICAgIH1cbiAgICB0aGlzLmNhY2hlQ2xhc3NOYW1lID0gYGFudGljb24tJHt0aGlzLnR5cGV9YDtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwsIHRoaXMuY2FjaGVDbGFzc05hbWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRTVkdEYXRhKHN2ZzogU1ZHRWxlbWVudCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHN2ZywgJ2RhdGEtaWNvbicsIHRoaXMudHlwZSBhcyBzdHJpbmcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHN2ZywgJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgfVxufVxuIl19