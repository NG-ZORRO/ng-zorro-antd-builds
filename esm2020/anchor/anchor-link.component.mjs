import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./anchor.component";
import * as i2 from "@angular/cdk/platform";
import * as i3 from "@angular/common";
export class NzAnchorLinkComponent {
    constructor(elementRef, anchorComp, platform, renderer) {
        this.elementRef = elementRef;
        this.anchorComp = anchorComp;
        this.platform = platform;
        this.renderer = renderer;
        this.nzHref = '#';
        this.titleStr = '';
        this.renderer.addClass(elementRef.nativeElement, 'ant-anchor-link');
    }
    set nzTitle(value) {
        if (value instanceof TemplateRef) {
            this.titleStr = null;
            this.titleTpl = value;
        }
        else {
            this.titleStr = value;
        }
    }
    ngOnInit() {
        this.anchorComp.registerLink(this);
    }
    getLinkTitleElement() {
        return this.linkTitle.nativeElement;
    }
    setActive() {
        this.renderer.addClass(this.elementRef.nativeElement, 'ant-anchor-link-active');
    }
    unsetActive() {
        this.renderer.removeClass(this.elementRef.nativeElement, 'ant-anchor-link-active');
    }
    goToClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.platform.isBrowser) {
            this.anchorComp.handleScrollTo(this);
        }
    }
    ngOnDestroy() {
        this.anchorComp.unregisterLink(this);
    }
}
NzAnchorLinkComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAnchorLinkComponent, deps: [{ token: i0.ElementRef }, { token: i1.NzAnchorComponent }, { token: i2.Platform }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
NzAnchorLinkComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzAnchorLinkComponent, selector: "nz-link", inputs: { nzHref: "nzHref", nzTitle: "nzTitle" }, queries: [{ propertyName: "nzTemplate", first: true, predicate: ["nzTemplate"], descendants: true }], viewQueries: [{ propertyName: "linkTitle", first: true, predicate: ["linkTitle"], descendants: true }], exportAs: ["nzLink"], ngImport: i0, template: `
    <a #linkTitle (click)="goToClick($event)" href="{{ nzHref }}" class="ant-anchor-link-title" title="{{ titleStr }}">
      <span *ngIf="titleStr; else titleTpl || nzTemplate">{{ titleStr }}</span>
    </a>
    <ng-content></ng-content>
  `, isInline: true, directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAnchorLinkComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-link',
                    exportAs: 'nzLink',
                    preserveWhitespaces: false,
                    template: `
    <a #linkTitle (click)="goToClick($event)" href="{{ nzHref }}" class="ant-anchor-link-title" title="{{ titleStr }}">
      <span *ngIf="titleStr; else titleTpl || nzTemplate">{{ titleStr }}</span>
    </a>
    <ng-content></ng-content>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NzAnchorComponent }, { type: i2.Platform }, { type: i0.Renderer2 }]; }, propDecorators: { nzHref: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzTemplate: [{
                type: ContentChild,
                args: ['nzTemplate', { static: false }]
            }], linkTitle: [{
                type: ViewChild,
                args: ['linkTitle']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5jaG9yLWxpbmsuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9hbmNob3IvYW5jaG9yLWxpbmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFFWixLQUFLLEVBSUwsV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7Ozs7O0FBbUJ2QixNQUFNLE9BQU8scUJBQXFCO0lBbUJoQyxZQUNTLFVBQXNCLEVBQ3JCLFVBQTZCLEVBQzdCLFFBQWtCLEVBQ2xCLFFBQW1CO1FBSHBCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDckIsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFDN0IsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBdEJwQixXQUFNLEdBQUcsR0FBRyxDQUFDO1FBRXRCLGFBQVEsR0FBa0IsRUFBRSxDQUFDO1FBc0IzQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDdEUsQ0FBQztJQXBCRCxJQUNJLE9BQU8sQ0FBQyxLQUFpQztRQUMzQyxJQUFJLEtBQUssWUFBWSxXQUFXLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7U0FDdkI7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQWNELFFBQVE7UUFDTixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsbUJBQW1CO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7SUFDdEMsQ0FBQztJQUVELFNBQVM7UUFDUCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRUQsU0FBUyxDQUFDLENBQVE7UUFDaEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNwQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO1lBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDOztrSEF0RFUscUJBQXFCO3NHQUFyQixxQkFBcUIscVVBVHRCOzs7OztHQUtUOzJGQUlVLHFCQUFxQjtrQkFiakMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsU0FBUztvQkFDbkIsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLFFBQVEsRUFBRTs7Ozs7R0FLVDtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEO2dMQUVVLE1BQU07c0JBQWQsS0FBSztnQkFNRixPQUFPO3NCQURWLEtBQUs7Z0JBVXlDLFVBQVU7c0JBQXhELFlBQVk7dUJBQUMsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFDckIsU0FBUztzQkFBaEMsU0FBUzt1QkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IE56QW5jaG9yQ29tcG9uZW50IH0gZnJvbSAnLi9hbmNob3IuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotbGluaycsXG4gIGV4cG9ydEFzOiAnbnpMaW5rJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGEgI2xpbmtUaXRsZSAoY2xpY2spPVwiZ29Ub0NsaWNrKCRldmVudClcIiBocmVmPVwie3sgbnpIcmVmIH19XCIgY2xhc3M9XCJhbnQtYW5jaG9yLWxpbmstdGl0bGVcIiB0aXRsZT1cInt7IHRpdGxlU3RyIH19XCI+XG4gICAgICA8c3BhbiAqbmdJZj1cInRpdGxlU3RyOyBlbHNlIHRpdGxlVHBsIHx8IG56VGVtcGxhdGVcIj57eyB0aXRsZVN0ciB9fTwvc3Bhbj5cbiAgICA8L2E+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICBgLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOekFuY2hvckxpbmtDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIG56SHJlZiA9ICcjJztcblxuICB0aXRsZVN0cjogc3RyaW5nIHwgbnVsbCA9ICcnO1xuICB0aXRsZVRwbD86IFRlbXBsYXRlUmVmPE56U2FmZUFueT47XG5cbiAgQElucHV0KClcbiAgc2V0IG56VGl0bGUodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+KSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgIHRoaXMudGl0bGVTdHIgPSBudWxsO1xuICAgICAgdGhpcy50aXRsZVRwbCA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRpdGxlU3RyID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgQENvbnRlbnRDaGlsZCgnbnpUZW1wbGF0ZScsIHsgc3RhdGljOiBmYWxzZSB9KSBuelRlbXBsYXRlITogVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBWaWV3Q2hpbGQoJ2xpbmtUaXRsZScpIGxpbmtUaXRsZSE6IEVsZW1lbnRSZWY8SFRNTEFuY2hvckVsZW1lbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgYW5jaG9yQ29tcDogTnpBbmNob3JDb21wb25lbnQsXG4gICAgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYW50LWFuY2hvci1saW5rJyk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmFuY2hvckNvbXAucmVnaXN0ZXJMaW5rKHRoaXMpO1xuICB9XG5cbiAgZ2V0TGlua1RpdGxlRWxlbWVudCgpOiBIVE1MQW5jaG9yRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMubGlua1RpdGxlLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBzZXRBY3RpdmUoKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FudC1hbmNob3ItbGluay1hY3RpdmUnKTtcbiAgfVxuXG4gIHVuc2V0QWN0aXZlKCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhbnQtYW5jaG9yLWxpbmstYWN0aXZlJyk7XG4gIH1cblxuICBnb1RvQ2xpY2soZTogRXZlbnQpOiB2b2lkIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAodGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHRoaXMuYW5jaG9yQ29tcC5oYW5kbGVTY3JvbGxUbyh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmFuY2hvckNvbXAudW5yZWdpc3RlckxpbmsodGhpcyk7XG4gIH1cbn1cbiJdfQ==