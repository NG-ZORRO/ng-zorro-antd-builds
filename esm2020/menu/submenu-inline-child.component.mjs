import { ChangeDetectionStrategy, Component, Input, Optional, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { collapseMotion } from 'ng-zorro-antd/core/animation';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
import * as i2 from "@angular/common";
export class NzSubmenuInlineChildComponent {
    constructor(elementRef, renderer, directionality) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.directionality = directionality;
        this.templateOutlet = null;
        this.menuClass = '';
        this.mode = 'vertical';
        this.nzOpen = false;
        this.listOfCacheClassName = [];
        this.expandState = 'collapsed';
        this.dir = 'ltr';
        this.destroy$ = new Subject();
    }
    calcMotionState() {
        if (this.nzOpen) {
            this.expandState = 'expanded';
        }
        else {
            this.expandState = 'collapsed';
        }
    }
    ngOnInit() {
        this.calcMotionState();
        this.dir = this.directionality.value;
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
        });
    }
    ngOnChanges(changes) {
        const { mode, nzOpen, menuClass } = changes;
        if (mode || nzOpen) {
            this.calcMotionState();
        }
        if (menuClass) {
            if (this.listOfCacheClassName.length) {
                this.listOfCacheClassName
                    .filter(item => !!item)
                    .forEach(className => {
                    this.renderer.removeClass(this.elementRef.nativeElement, className);
                });
            }
            if (this.menuClass) {
                this.listOfCacheClassName = this.menuClass.split(' ');
                this.listOfCacheClassName
                    .filter(item => !!item)
                    .forEach(className => {
                    this.renderer.addClass(this.elementRef.nativeElement, className);
                });
            }
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzSubmenuInlineChildComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSubmenuInlineChildComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzSubmenuInlineChildComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSubmenuInlineChildComponent, selector: "[nz-submenu-inline-child]", inputs: { templateOutlet: "templateOutlet", menuClass: "menuClass", mode: "mode", nzOpen: "nzOpen" }, host: { properties: { "class.ant-menu-rtl": "dir === 'rtl'", "@collapseMotion": "expandState" }, classAttribute: "ant-menu ant-menu-inline ant-menu-sub" }, exportAs: ["nzSubmenuInlineChild"], usesOnChanges: true, ngImport: i0, template: ` <ng-template [ngTemplateOutlet]="templateOutlet"></ng-template> `, isInline: true, directives: [{ type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [collapseMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSubmenuInlineChildComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[nz-submenu-inline-child]',
                    animations: [collapseMotion],
                    exportAs: 'nzSubmenuInlineChild',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: ` <ng-template [ngTemplateOutlet]="templateOutlet"></ng-template> `,
                    host: {
                        class: 'ant-menu ant-menu-inline ant-menu-sub',
                        '[class.ant-menu-rtl]': `dir === 'rtl'`,
                        '[@collapseMotion]': 'expandState'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { templateOutlet: [{
                type: Input
            }], menuClass: [{
                type: Input
            }], mode: [{
                type: Input
            }], nzOpen: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VibWVudS1pbmxpbmUtY2hpbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9tZW51L3N1Ym1lbnUtaW5saW5lLWNoaWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFFVCxLQUFLLEVBSUwsUUFBUSxFQUlSLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7Ozs7QUFrQjlELE1BQU0sT0FBTyw2QkFBNkI7SUFVeEMsWUFDVSxVQUFzQixFQUN0QixRQUFtQixFQUNQLGNBQThCO1FBRjFDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNQLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVozQyxtQkFBYyxHQUFrQyxJQUFJLENBQUM7UUFDckQsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUN2QixTQUFJLEdBQW1CLFVBQVUsQ0FBQztRQUNsQyxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLHlCQUFvQixHQUFhLEVBQUUsQ0FBQztRQUNwQyxnQkFBVyxHQUFHLFdBQVcsQ0FBQztRQUMxQixRQUFHLEdBQWMsS0FBSyxDQUFDO1FBQ2YsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7SUFNcEMsQ0FBQztJQUVKLGVBQWU7UUFDYixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztTQUMvQjthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBQ0QsUUFBUTtRQUNOLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV2QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBb0IsRUFBRSxFQUFFO1lBQzVGLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDNUMsSUFBSSxJQUFJLElBQUksTUFBTSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN4QjtRQUNELElBQUksU0FBUyxFQUFFO1lBQ2IsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFO2dCQUNwQyxJQUFJLENBQUMsb0JBQW9CO3FCQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO3FCQUN0QixPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUN0RSxDQUFDLENBQUMsQ0FBQzthQUNOO1lBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNsQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxvQkFBb0I7cUJBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7cUJBQ3RCLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ25FLENBQUMsQ0FBQyxDQUFDO2FBQ047U0FDRjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7OzBIQTFEVSw2QkFBNkI7OEdBQTdCLDZCQUE2Qiw0WEFQOUIsbUVBQW1FLG9LQUpqRSxDQUFDLGNBQWMsQ0FBQzsyRkFXakIsNkJBQTZCO2tCQWJ6QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLFVBQVUsRUFBRSxDQUFDLGNBQWMsQ0FBQztvQkFDNUIsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxRQUFRLEVBQUUsbUVBQW1FO29CQUM3RSxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLHVDQUF1Qzt3QkFDOUMsc0JBQXNCLEVBQUUsZUFBZTt3QkFDdkMsbUJBQW1CLEVBQUUsYUFBYTtxQkFDbkM7aUJBQ0Y7OzBCQWNJLFFBQVE7NENBWkYsY0FBYztzQkFBdEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgY29sbGFwc2VNb3Rpb24gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvYW5pbWF0aW9uJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IE56TWVudU1vZGVUeXBlIH0gZnJvbSAnLi9tZW51LnR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW256LXN1Ym1lbnUtaW5saW5lLWNoaWxkXScsXG4gIGFuaW1hdGlvbnM6IFtjb2xsYXBzZU1vdGlvbl0sXG4gIGV4cG9ydEFzOiAnbnpTdWJtZW51SW5saW5lQ2hpbGQnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlT3V0bGV0XCI+PC9uZy10ZW1wbGF0ZT4gYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LW1lbnUgYW50LW1lbnUtaW5saW5lIGFudC1tZW51LXN1YicsXG4gICAgJ1tjbGFzcy5hbnQtbWVudS1ydGxdJzogYGRpciA9PT0gJ3J0bCdgLFxuICAgICdbQGNvbGxhcHNlTW90aW9uXSc6ICdleHBhbmRTdGF0ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelN1Ym1lbnVJbmxpbmVDaGlsZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSB0ZW1wbGF0ZU91dGxldDogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBtZW51Q2xhc3M6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBtb2RlOiBOek1lbnVNb2RlVHlwZSA9ICd2ZXJ0aWNhbCc7XG4gIEBJbnB1dCgpIG56T3BlbiA9IGZhbHNlO1xuICBsaXN0T2ZDYWNoZUNsYXNzTmFtZTogc3RyaW5nW10gPSBbXTtcbiAgZXhwYW5kU3RhdGUgPSAnY29sbGFwc2VkJztcbiAgZGlyOiBEaXJlY3Rpb24gPSAnbHRyJztcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eVxuICApIHt9XG5cbiAgY2FsY01vdGlvblN0YXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56T3Blbikge1xuICAgICAgdGhpcy5leHBhbmRTdGF0ZSA9ICdleHBhbmRlZCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZXhwYW5kU3RhdGUgPSAnY29sbGFwc2VkJztcbiAgICB9XG4gIH1cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jYWxjTW90aW9uU3RhdGUoKTtcblxuICAgIHRoaXMuZGlyID0gdGhpcy5kaXJlY3Rpb25hbGl0eS52YWx1ZTtcbiAgICB0aGlzLmRpcmVjdGlvbmFsaXR5LmNoYW5nZT8ucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoZGlyZWN0aW9uOiBEaXJlY3Rpb24pID0+IHtcbiAgICAgIHRoaXMuZGlyID0gZGlyZWN0aW9uO1xuICAgIH0pO1xuICB9XG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG1vZGUsIG56T3BlbiwgbWVudUNsYXNzIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChtb2RlIHx8IG56T3Blbikge1xuICAgICAgdGhpcy5jYWxjTW90aW9uU3RhdGUoKTtcbiAgICB9XG4gICAgaWYgKG1lbnVDbGFzcykge1xuICAgICAgaWYgKHRoaXMubGlzdE9mQ2FjaGVDbGFzc05hbWUubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubGlzdE9mQ2FjaGVDbGFzc05hbWVcbiAgICAgICAgICAuZmlsdGVyKGl0ZW0gPT4gISFpdGVtKVxuICAgICAgICAgIC5mb3JFYWNoKGNsYXNzTmFtZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBjbGFzc05hbWUpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubWVudUNsYXNzKSB7XG4gICAgICAgIHRoaXMubGlzdE9mQ2FjaGVDbGFzc05hbWUgPSB0aGlzLm1lbnVDbGFzcy5zcGxpdCgnICcpO1xuICAgICAgICB0aGlzLmxpc3RPZkNhY2hlQ2xhc3NOYW1lXG4gICAgICAgICAgLmZpbHRlcihpdGVtID0+ICEhaXRlbSlcbiAgICAgICAgICAuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgY2xhc3NOYW1lKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==