/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Inject, Input, Optional, SkipSelf, ViewChild, ViewEncapsulation } from '@angular/core';
import { NzIsMenuInsideDropDownToken } from './menu.token';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/outlet";
import * as i2 from "@angular/common";
export function MenuGroupFactory(isMenuInsideDropDownToken) {
    return isMenuInsideDropDownToken ? isMenuInsideDropDownToken : false;
}
export class NzMenuGroupComponent {
    constructor(elementRef, renderer, isMenuInsideDropDown) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.isMenuInsideDropDown = isMenuInsideDropDown;
        const className = this.isMenuInsideDropDown ? 'ant-dropdown-menu-item-group' : 'ant-menu-item-group';
        this.renderer.addClass(elementRef.nativeElement, className);
    }
    ngAfterViewInit() {
        const ulElement = this.titleElement.nativeElement.nextElementSibling;
        if (ulElement) {
            /** add classname to ul **/
            const className = this.isMenuInsideDropDown ? 'ant-dropdown-menu-item-group-list' : 'ant-menu-item-group-list';
            this.renderer.addClass(ulElement, className);
        }
    }
}
NzMenuGroupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMenuGroupComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: NzIsMenuInsideDropDownToken }], target: i0.ɵɵFactoryTarget.Component });
NzMenuGroupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzMenuGroupComponent, selector: "[nz-menu-group]", inputs: { nzTitle: "nzTitle" }, providers: [
        /** check if menu inside dropdown-menu component **/
        {
            provide: NzIsMenuInsideDropDownToken,
            useFactory: MenuGroupFactory,
            deps: [[new SkipSelf(), new Optional(), NzIsMenuInsideDropDownToken]]
        }
    ], viewQueries: [{ propertyName: "titleElement", first: true, predicate: ["titleElement"], descendants: true }], exportAs: ["nzMenuGroup"], ngImport: i0, template: `
    <div
      [class.ant-menu-item-group-title]="!isMenuInsideDropDown"
      [class.ant-dropdown-menu-item-group-title]="isMenuInsideDropDown"
      #titleElement
    >
      <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      <ng-content select="[title]" *ngIf="!nzTitle"></ng-content>
    </div>
    <ng-content></ng-content>
  `, isInline: true, directives: [{ type: i1.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMenuGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[nz-menu-group]',
                    exportAs: 'nzMenuGroup',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        /** check if menu inside dropdown-menu component **/
                        {
                            provide: NzIsMenuInsideDropDownToken,
                            useFactory: MenuGroupFactory,
                            deps: [[new SkipSelf(), new Optional(), NzIsMenuInsideDropDownToken]]
                        }
                    ],
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <div
      [class.ant-menu-item-group-title]="!isMenuInsideDropDown"
      [class.ant-dropdown-menu-item-group-title]="isMenuInsideDropDown"
      #titleElement
    >
      <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      <ng-content select="[title]" *ngIf="!nzTitle"></ng-content>
    </div>
    <ng-content></ng-content>
  `,
                    preserveWhitespaces: false
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NzIsMenuInsideDropDownToken]
                }] }]; }, propDecorators: { nzTitle: [{
                type: Input
            }], titleElement: [{
                type: ViewChild,
                args: ['titleElement']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1ncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL21lbnUvbWVudS1ncm91cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBRVQsTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBRVIsUUFBUSxFQUVSLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sY0FBYyxDQUFDOzs7O0FBRTNELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyx5QkFBa0M7SUFDakUsT0FBTyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUN2RSxDQUFDO0FBMkJELE1BQU0sT0FBTyxvQkFBb0I7SUFJL0IsWUFDUyxVQUFzQixFQUNyQixRQUFtQixFQUNpQixvQkFBNkI7UUFGbEUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNyQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ2lCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBUztRQUV6RSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQztRQUNyRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxlQUFlO1FBQ2IsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQWEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUM7UUFDdEUsSUFBSSxTQUFTLEVBQUU7WUFDYiwyQkFBMkI7WUFDM0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLENBQUMsMEJBQTBCLENBQUM7WUFDL0csSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQzlDO0lBQ0gsQ0FBQzs7aUhBcEJVLG9CQUFvQixxRUFPckIsMkJBQTJCO3FHQVAxQixvQkFBb0IsMEVBdEJwQjtRQUNULG9EQUFvRDtRQUNwRDtZQUNFLE9BQU8sRUFBRSwyQkFBMkI7WUFDcEMsVUFBVSxFQUFFLGdCQUFnQjtZQUM1QixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsSUFBSSxRQUFRLEVBQUUsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO1NBQ3RFO0tBQ0YsbUtBRVM7Ozs7Ozs7Ozs7R0FVVDsyRkFHVSxvQkFBb0I7a0JBMUJoQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSxhQUFhO29CQUN2QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsU0FBUyxFQUFFO3dCQUNULG9EQUFvRDt3QkFDcEQ7NEJBQ0UsT0FBTyxFQUFFLDJCQUEyQjs0QkFDcEMsVUFBVSxFQUFFLGdCQUFnQjs0QkFDNUIsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLElBQUksUUFBUSxFQUFFLEVBQUUsMkJBQTJCLENBQUMsQ0FBQzt5QkFDdEU7cUJBQ0Y7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7OztHQVVUO29CQUNELG1CQUFtQixFQUFFLEtBQUs7aUJBQzNCOzswQkFRSSxNQUFNOzJCQUFDLDJCQUEyQjs0Q0FONUIsT0FBTztzQkFBZixLQUFLO2dCQUNxQixZQUFZO3NCQUF0QyxTQUFTO3VCQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPcHRpb25hbCxcbiAgUmVuZGVyZXIyLFxuICBTa2lwU2VsZixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56SXNNZW51SW5zaWRlRHJvcERvd25Ub2tlbiB9IGZyb20gJy4vbWVudS50b2tlbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBNZW51R3JvdXBGYWN0b3J5KGlzTWVudUluc2lkZURyb3BEb3duVG9rZW46IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgcmV0dXJuIGlzTWVudUluc2lkZURyb3BEb3duVG9rZW4gPyBpc01lbnVJbnNpZGVEcm9wRG93blRva2VuIDogZmFsc2U7XG59XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbbnotbWVudS1ncm91cF0nLFxuICBleHBvcnRBczogJ256TWVudUdyb3VwJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1xuICAgIC8qKiBjaGVjayBpZiBtZW51IGluc2lkZSBkcm9wZG93bi1tZW51IGNvbXBvbmVudCAqKi9cbiAgICB7XG4gICAgICBwcm92aWRlOiBOeklzTWVudUluc2lkZURyb3BEb3duVG9rZW4sXG4gICAgICB1c2VGYWN0b3J5OiBNZW51R3JvdXBGYWN0b3J5LFxuICAgICAgZGVwczogW1tuZXcgU2tpcFNlbGYoKSwgbmV3IE9wdGlvbmFsKCksIE56SXNNZW51SW5zaWRlRHJvcERvd25Ub2tlbl1dXG4gICAgfVxuICBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIFtjbGFzcy5hbnQtbWVudS1pdGVtLWdyb3VwLXRpdGxlXT1cIiFpc01lbnVJbnNpZGVEcm9wRG93blwiXG4gICAgICBbY2xhc3MuYW50LWRyb3Bkb3duLW1lbnUtaXRlbS1ncm91cC10aXRsZV09XCJpc01lbnVJbnNpZGVEcm9wRG93blwiXG4gICAgICAjdGl0bGVFbGVtZW50XG4gICAgPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56VGl0bGVcIj57eyBuelRpdGxlIH19PC9uZy1jb250YWluZXI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbdGl0bGVdXCIgKm5nSWY9XCIhbnpUaXRsZVwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIGAsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIE56TWVudUdyb3VwQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIG56VGl0bGU/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQFZpZXdDaGlsZCgndGl0bGVFbGVtZW50JykgdGl0bGVFbGVtZW50PzogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQEluamVjdChOeklzTWVudUluc2lkZURyb3BEb3duVG9rZW4pIHB1YmxpYyBpc01lbnVJbnNpZGVEcm9wRG93bjogYm9vbGVhblxuICApIHtcbiAgICBjb25zdCBjbGFzc05hbWUgPSB0aGlzLmlzTWVudUluc2lkZURyb3BEb3duID8gJ2FudC1kcm9wZG93bi1tZW51LWl0ZW0tZ3JvdXAnIDogJ2FudC1tZW51LWl0ZW0tZ3JvdXAnO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBjbGFzc05hbWUpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IHVsRWxlbWVudCA9IHRoaXMudGl0bGVFbGVtZW50IS5uYXRpdmVFbGVtZW50Lm5leHRFbGVtZW50U2libGluZztcbiAgICBpZiAodWxFbGVtZW50KSB7XG4gICAgICAvKiogYWRkIGNsYXNzbmFtZSB0byB1bCAqKi9cbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHRoaXMuaXNNZW51SW5zaWRlRHJvcERvd24gPyAnYW50LWRyb3Bkb3duLW1lbnUtaXRlbS1ncm91cC1saXN0JyA6ICdhbnQtbWVudS1pdGVtLWdyb3VwLWxpc3QnO1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh1bEVsZW1lbnQsIGNsYXNzTmFtZSk7XG4gICAgfVxuICB9XG59XG4iXX0=